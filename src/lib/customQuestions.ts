import { selectDailyQuestions, type CompletedPlays } from './dailyQuestions';
import { useSyncExternalStore } from 'react';
import type { Question } from '../data/types';
import { configured, reportError, supabase } from './supabase';
let questions: Question[] = [];
const listeners = new Set<() => void>();
export async function refreshQuestions() {
  const rows: Record<string, any>[] = [];
  for (let offset=0;;offset+=500) {
    const { data, error } = await supabase.from('questions').select('*').order('id').range(offset,offset+499);
    if (error) throw new Error('Today’s questions could not load. Please try again shortly.');
    rows.push(...(data || [])); if (!data || data.length<500) break;
  }
  questions = rows.map(row => ({ ...row.payload, id: row.id, sequenceDay: row.sequence_day, scheduledDate: row.scheduled_date, recurringDay: row.recurring_day, slot: row.slot }));
  listeners.forEach(l => l()); window.dispatchEvent(new Event('hulog:questions'));
}
export function getAllQuestions() { return questions; }
export function getCustomQuestions() { return questions; }
export function useAllQuestions() { return useSyncExternalStore(cb => { listeners.add(cb); return () => listeners.delete(cb); }, () => questions); }
export const useCustomQuestions = useAllQuestions;
export async function addCustomQuestion(q: Omit<Question, 'id' | 'communityStats'> & { id?: string; communityStats?: Question['communityStats'] }) {
  const value = { ...q, id: q.id || crypto.randomUUID(), communityStats: q.communityStats || { correctPct: 0, sampleSize: 0 } };
  const { error } = await supabase.from('questions').upsert({ id: value.id, text: value.prompt, choices: value.options || value.items || [], correct_answer: value.answer || '', explanation: value.why, category: value.tier, sequence_day: value.sequenceDay ?? null, scheduled_date: value.scheduledDate || null, recurring_day: value.recurringDay ?? null, slot: value.slot ?? 1, payload: value });
  if (error) throw new Error(error.message); await refreshQuestions(); return value;
}
export async function deleteCustomQuestion(id: string) {
  const { error } = await supabase.from('questions').delete().eq('id', id);
  if (error) throw new Error(error.message); await refreshQuestions();
}
export function dailyQuestions(date: string, plays: CompletedPlays = {}, sequenceOffset = 0) { return selectDailyQuestions(questions,date,plays,sequenceOffset); }
if (configured) void refreshQuestions().catch(reportError);
