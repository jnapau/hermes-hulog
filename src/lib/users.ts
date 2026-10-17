import { useSyncExternalStore } from 'react';
import { COLLECTIBLES } from '../data/collectibles';
import { todayPH } from './date';
import { configured, reportError, supabase } from './supabase';
export interface User { id: string; username: string; registeredAt: string; is_admin: boolean; coins: number; streak: number; unlocked: number }
export interface AnswerLog { id: string; username: string; questionId: string; userChoice: string; isCorrect: boolean; date: string; timestamp: string }
let state = { currentUser: null as User | null, users: [] as User[], logs: [] as AnswerLog[], equippedLook: null as string | null, loading: true, ownedIds: [] as string[] };
const listeners = new Set<() => void>();
const notify = () => { state = { ...state }; listeners.forEach(l => l()); };
let generation = 0;
async function readRows(table: string, columns = '*') {
  const all: Record<string, any>[] = [];
  for (let offset = 0; ; offset += 500) {
    const { data, error } = await supabase.from(table).select(columns).order('id').range(offset, offset + 499);
    if (error) throw new Error(error.message);
    all.push(...(data || []));
    if (!data || data.length < 500) return all;
  }
}
const userFrom = (p: { id: string; username: string; created_at: string; is_admin: boolean; coins: number; streak: number }, count = 0): User => ({ id: p.id, username: p.username, registeredAt: p.created_at, is_admin: p.is_admin, coins: p.coins, streak: p.streak, unlocked: count });
export async function refreshAccount() {
  const run = ++generation;
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) { state = { currentUser: null, users: [], logs: [], equippedLook: null, ownedIds: [], loading: false }; window.dispatchEvent(new CustomEvent('hulog:hydrate', { detail: {} })); notify(); return; }
  const [profile, collections] = await Promise.all([supabase.from('profiles').select('*').eq('id', session.user.id).single(), supabase.from('user_collections').select('*').eq('user_id', session.user.id)]);
  if (run !== generation) return;
  if (profile.error || collections.error) { state.loading = false; notify(); throw new Error('Your account could not load. Please refresh to try again.'); }
  const p = profile.data;
  state.ownedIds = p.is_admin ? COLLECTIBLES.map(c => c.id) : (collections.data || []).map(c => c.item_id);
  state.currentUser = userFrom(p, state.ownedIds.length);
  state.equippedLook = p.equipped_outfit;
  state.users = [state.currentUser];
  if (p.is_admin) {
    const [users, logs, owned] = await Promise.all([readRows('profiles'), readRows('user_answers'), readRows('user_collections')]);
    if (run !== generation) return;
    state.users = users.map(u => userFrom(u as Parameters<typeof userFrom>[0], u.is_admin ? COLLECTIBLES.length : owned.filter(c => c.user_id === u.id).length));
    state.logs = logs.map(a => ({ id: a.id, username: state.users.find(u => u.id === a.user_id)?.username || 'Deleted user', questionId: a.question_id, userChoice: a.user_choice, isCorrect: a.is_correct, date: a.play_date, timestamp: a.answered_at }));
  } else {
    const { data, error } = await supabase.from('user_answers').select('*').eq('user_id',session.user.id).eq('play_date',todayPH());
    if (run !== generation) return;
    if (error) throw new Error('Your saved answers could not load. Please refresh to retry.');
    state.logs = (data || []).map(a => ({id:a.id,username:p.username,questionId:a.question_id,userChoice:a.user_choice,isCorrect:a.is_correct,date:a.play_date,timestamp:a.answered_at}));
  }
  state.loading = false;
  window.dispatchEvent(new CustomEvent('hulog:hydrate', { detail: p.progress || {} }));
  notify();
}
export function useAuth() { return useSyncExternalStore(cb => { listeners.add(cb); return () => listeners.delete(cb); }, () => state); }
export function getAllUsers() { return state.users; }
export function getAllAnswerLogs() { return state.logs; }
export function getCurrentUser() { return state.currentUser; }
export function getCurrentUsername() { return state.currentUser?.username || null; }
export function getEquippedLook() { return state.equippedLook; }
export function isAdminUser(user?: User | string | null) { return typeof user === 'string' ? state.users.some(u => u.username === user && u.is_admin) : user?.is_admin === true; }
async function authenticate(username: string, password: string, register: boolean) {
  if (!configured) return { success: false, message: 'Account service is not configured. Follow the deployment setup.' };
  if (!/^[a-zA-Z0-9_]{3,24}$/.test(username.trim())) return { success: false, message: 'Use 3–24 letters, numbers, or underscores for your username.' };
  if (password.length < 8) return { success: false, message: 'Use at least 8 characters for your password.' };
  try {
    const credentials = { email: `${username.trim().toLowerCase()}@players.hulog.internal`, password };
    const result = register ? await supabase.auth.signUp({ ...credentials, options: { data: { username: username.trim().toLowerCase() } } }) : await supabase.auth.signInWithPassword(credentials);
    if (result.error) return { success: false, message: register ? result.error.message : 'Unable to sign in. Check your username and password.' };
    if (!result.data.session) return { success: false, message: 'Disable email confirmation in Supabase Auth, then sign in.' };
    await refreshAccount(); return { success: true };
  } catch (e) { return { success: false, message: e instanceof Error ? e.message : 'Account service unavailable. Please retry.' }; }
}
export const loginUser = (u: string, p: string) => authenticate(u, p, false);
export const registerUser = (u: string, p: string) => authenticate(u, p, true);
export async function logoutUser() { const { error } = await supabase.auth.signOut(); if (error) reportError(error.message); else await refreshAccount(); }
export async function recordUserAnswer(questionId: string, userChoice: string, _correct: boolean, _date: string) {
  const { data, error } = await supabase.rpc('submit_answer', { p_question: questionId, p_choice: userChoice });
  if (error) throw new Error(error.message); await refreshAccount(); return data as boolean;
}
export async function setEquippedLook(lookId: string | null) {
  const { error } = await supabase.rpc('equip_item', { p_item: lookId });
  if (error) reportError(error.message); else await refreshAccount();
}
export async function setAdmin(id: string, admin: boolean) {
  const { error } = await supabase.rpc('set_admin', { p_user: id, p_admin: admin });
  if (error) throw new Error(error.message); await refreshAccount();
}
if (configured) {
  supabase.auth.onAuthStateChange(() => { setTimeout(() => { void refreshAccount().catch(reportError); }, 0); });
  void refreshAccount().catch(reportError);
} else { state.loading = false; }
