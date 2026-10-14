/**
 * Registered Users & Actual Answer Gathering Engine.
 *
 * Facilitates sample user registration (username & password, no verification required),
 * personal progression, and centralized answer event logging to power real-time
 * community analytics and admin monitoring.
 */
import { useSyncExternalStore } from 'react';

export interface User {
  username: string;
  password?: string;
  registeredAt: string;
  avatarSeed?: string;
}

export interface AnswerLog {
  id: string;
  username: string;
  questionId: string;
  userChoice: string;
  isCorrect: boolean;
  date: string; // YYYY-MM-DD
  timestamp: string; // ISO
}

const USERS_STORAGE_KEY = 'hulog.registered_users.v1';
const CURRENT_USER_KEY = 'hulog.current_user.v1';
const ANSWER_LOGS_KEY = 'hulog.answer_logs.v1';
const EQUIPPED_LOOK_KEY = 'hulog.equipped_look.v1';

// Seed demo users with realistic learning answers so Admin Panel has rich initial analytics
const INITIAL_USERS: User[] = [
  { username: 'juan_delacruz', password: 'password123', registeredAt: '2026-10-12T08:30:00Z' },
  { username: 'maria_santos', password: 'password123', registeredAt: '2026-10-12T09:15:00Z' },
  { username: 'pedro_penduko', password: 'password123', registeredAt: '2026-10-13T07:45:00Z' },
  { username: 'ana_reyes', password: 'password123', registeredAt: '2026-10-13T10:20:00Z' },
  { username: 'student_tester', password: 'password123', registeredAt: '2026-10-14T06:10:00Z' },
];

const INITIAL_LOGS: AnswerLog[] = [
  { id: 'log-1', username: 'juan_delacruz', questionId: 'Q-101-01', userChoice: 'CORRECT', isCorrect: true, date: '2026-10-12', timestamp: '2026-10-12T08:32:00Z' },
  { id: 'log-2', username: 'juan_delacruz', questionId: 'Q-101-02', userChoice: 'MALI', isCorrect: true, date: '2026-10-12', timestamp: '2026-10-12T08:33:00Z' },
  { id: 'log-3', username: 'juan_delacruz', questionId: 'Q-101-03', userChoice: 'B', isCorrect: true, date: '2026-10-12', timestamp: '2026-10-12T08:34:00Z' },
  
  { id: 'log-4', username: 'maria_santos', questionId: 'Q-101-01', userChoice: 'CORRECT', isCorrect: true, date: '2026-10-12', timestamp: '2026-10-12T09:18:00Z' },
  { id: 'log-5', username: 'maria_santos', questionId: 'Q-101-02', userChoice: 'TAMA', isCorrect: false, date: '2026-10-12', timestamp: '2026-10-12T09:19:00Z' },
  { id: 'log-6', username: 'maria_santos', questionId: 'Q-101-03', userChoice: 'B', isCorrect: true, date: '2026-10-12', timestamp: '2026-10-12T09:20:00Z' },

  { id: 'log-7', username: 'pedro_penduko', questionId: 'Q-102-01', userChoice: 'SCAM', isCorrect: true, date: '2026-10-13', timestamp: '2026-10-13T07:48:00Z' },
  { id: 'log-8', username: 'pedro_penduko', questionId: 'Q-102-02', userChoice: 'TAMA', isCorrect: true, date: '2026-10-13', timestamp: '2026-10-13T07:49:00Z' },
  { id: 'log-9', username: 'pedro_penduko', questionId: 'Q-102-03', userChoice: 'A', isCorrect: false, date: '2026-10-13', timestamp: '2026-10-13T07:50:00Z' },

  { id: 'log-10', username: 'ana_reyes', questionId: 'Q-101-01', userChoice: 'CORRECT', isCorrect: true, date: '2026-10-13', timestamp: '2026-10-13T10:22:00Z' },
  { id: 'log-11', username: 'ana_reyes', questionId: 'Q-102-01', userChoice: 'SCAM', isCorrect: true, date: '2026-10-13', timestamp: '2026-10-13T10:23:00Z' },
  { id: 'log-12', username: 'ana_reyes', questionId: 'Q-103-01', userChoice: 'B', isCorrect: true, date: '2026-10-13', timestamp: '2026-10-13T10:24:00Z' },
  
  { id: 'log-13', username: 'student_tester', questionId: 'Q-101-01', userChoice: 'WRONG', isCorrect: false, date: '2026-10-14', timestamp: '2026-10-14T06:12:00Z' },
  { id: 'log-14', username: 'student_tester', questionId: 'Q-101-02', userChoice: 'MALI', isCorrect: true, date: '2026-10-14', timestamp: '2026-10-14T06:13:00Z' },
  { id: 'log-15', username: 'student_tester', questionId: 'Q-103-02', userChoice: 'A', isCorrect: false, date: '2026-10-14', timestamp: '2026-10-14T06:14:00Z' },
];

function loadUsers(): User[] {
  try {
    const raw = localStorage.getItem(USERS_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(INITIAL_USERS));
      return INITIAL_USERS;
    }
    return JSON.parse(raw);
  } catch {
    return INITIAL_USERS;
  }
}

function loadLogs(): AnswerLog[] {
  try {
    const raw = localStorage.getItem(ANSWER_LOGS_KEY);
    if (!raw) {
      localStorage.setItem(ANSWER_LOGS_KEY, JSON.stringify(INITIAL_LOGS));
      return INITIAL_LOGS;
    }
    return JSON.parse(raw);
  } catch {
    return INITIAL_LOGS;
  }
}

function loadCurrentUser(): string | null {
  try {
    const raw = localStorage.getItem(CURRENT_USER_KEY);
    if (raw) return raw;
    // Default to 'juan_delacruz' for seamless sample demonstration
    return 'juan_delacruz';
  } catch {
    return 'juan_delacruz';
  }
}

let cachedUsers: User[] = typeof window !== 'undefined' ? loadUsers() : INITIAL_USERS;
let cachedLogs: AnswerLog[] = typeof window !== 'undefined' ? loadLogs() : INITIAL_LOGS;
let cachedCurrentUser: string | null = typeof window !== 'undefined' ? loadCurrentUser() : 'juan_delacruz';
let cachedEquippedLook: string | null = typeof window !== 'undefined' ? localStorage.getItem(EQUIPPED_LOOK_KEY) : null;

const listeners = new Set<() => void>();

function notify() {
  listeners.forEach((l) => l());
}

export function getAllUsers(): User[] {
  return cachedUsers;
}

export function getCurrentUsername(): string | null {
  return cachedCurrentUser;
}

export function getCurrentUser(): User | null {
  if (!cachedCurrentUser) return null;
  return cachedUsers.find((u) => u.username.toLowerCase() === cachedCurrentUser?.toLowerCase()) ?? {
    username: cachedCurrentUser,
    registeredAt: new Date().toISOString(),
  };
}

export function getAllAnswerLogs(): AnswerLog[] {
  return cachedLogs;
}

export function registerUser(username: string, password?: string): { success: boolean; message?: string } {
  const cleanUsername = username.trim().toLowerCase();
  if (!cleanUsername) {
    return { success: false, message: 'Please enter a valid username.' };
  }
  if (cleanUsername.length < 3) {
    return { success: false, message: 'Username must be at least 3 characters.' };
  }
  if (cachedUsers.some((u) => u.username.toLowerCase() === cleanUsername)) {
    return { success: false, message: 'Username already exists. You can log in instead!' };
  }

  const newUser: User = {
    username: cleanUsername,
    password: password || 'pass',
    registeredAt: new Date().toISOString(),
  };

  cachedUsers = [newUser, ...cachedUsers];
  cachedCurrentUser = cleanUsername;

  try {
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(cachedUsers));
    localStorage.setItem(CURRENT_USER_KEY, cleanUsername);
  } catch {
    /* storage safe */
  }

  notify();
  return { success: true };
}

export function loginUser(username: string, password?: string): { success: boolean; message?: string } {
  const cleanUsername = username.trim().toLowerCase();
  if (!cleanUsername) {
    return { success: false, message: 'Please enter a username.' };
  }

  const existing = cachedUsers.find((u) => u.username.toLowerCase() === cleanUsername);
  if (!existing) {
    // If not found, automatically register them smoothly (sample app convenience)
    return registerUser(cleanUsername, password);
  }

  cachedCurrentUser = existing.username;
  try {
    localStorage.setItem(CURRENT_USER_KEY, existing.username);
  } catch {
    /* storage safe */
  }

  notify();
  return { success: true };
}

export function logoutUser(): void {
  cachedCurrentUser = null;
  try {
    localStorage.removeItem(CURRENT_USER_KEY);
  } catch {
    /* storage safe */
  }
  notify();
}

export function recordUserAnswer(
  questionId: string,
  userChoice: string,
  isCorrect: boolean,
  date: string,
): void {
  const user = cachedCurrentUser || 'guest_user';
  const newLog: AnswerLog = {
    id: `log-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
    username: user,
    questionId,
    userChoice,
    isCorrect,
    date,
    timestamp: new Date().toISOString(),
  };

  cachedLogs = [newLog, ...cachedLogs];
  try {
    localStorage.setItem(ANSWER_LOGS_KEY, JSON.stringify(cachedLogs));
  } catch {
    /* storage safe */
  }

  notify();
}

export function getEquippedLook(): string | null {
  return cachedEquippedLook;
}

export function setEquippedLook(lookId: string | null): void {
  cachedEquippedLook = lookId;
  try {
    if (lookId) {
      localStorage.setItem(EQUIPPED_LOOK_KEY, lookId);
    } else {
      localStorage.removeItem(EQUIPPED_LOOK_KEY);
    }
  } catch {
    /* storage safe */
  }
  notify();
}

export function useAuth() {
  const state = useSyncExternalStore(
    (cb) => {
      listeners.add(cb);
      return () => listeners.delete(cb);
    },
    () => ({
      currentUser: getCurrentUser(),
      users: cachedUsers,
      logs: cachedLogs,
      equippedLook: cachedEquippedLook,
    }),
    () => ({
      currentUser: getCurrentUser(),
      users: cachedUsers,
      logs: cachedLogs,
      equippedLook: cachedEquippedLook,
    }),
  );

  return state;
}
