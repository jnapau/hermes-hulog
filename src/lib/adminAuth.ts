import { useSyncExternalStore } from 'react';

const ADMIN_AUTH_KEY = 'hulog_admin_auth_v2';
export const ADMIN_DEFAULT_USER = 'Hestia';
export const ADMIN_DEFAULT_PASS = 'HermesHulog';
export const ADMIN_PASSCODE = 'hestia2026';

let isAuthed = typeof window !== 'undefined' ? sessionStorage.getItem(ADMIN_AUTH_KEY) === 'true' : false;
const listeners = new Set<() => void>();

function notify() {
  listeners.forEach((l) => l());
}

export function loginAdmin(username: string, password: string): { success: boolean; message?: string } {
  const cleanUser = username.trim().toLowerCase();
  const cleanPass = password.trim();

  // Accept either Username: Hestia / Password: HermesHulog OR passcode: hestia2026
  const isMatch =
    (cleanUser === ADMIN_DEFAULT_USER.toLowerCase() && cleanPass === ADMIN_DEFAULT_PASS) ||
    cleanPass === ADMIN_PASSCODE ||
    cleanUser === ADMIN_PASSCODE ||
    (cleanUser === 'admin' && cleanPass === ADMIN_PASSCODE);

  if (isMatch) {
    isAuthed = true;
    try {
      sessionStorage.setItem(ADMIN_AUTH_KEY, 'true');
    } catch {
      /* safe */
    }
    notify();
    return { success: true };
  }

  return {
    success: false,
    message: 'Invalid credentials. Required: Username: Hestia | Password: HermesHulog (or passcode: hestia2026)',
  };
}

export function logoutAdmin(): void {
  isAuthed = false;
  try {
    sessionStorage.removeItem(ADMIN_AUTH_KEY);
  } catch {
    /* safe */
  }
  notify();
}

export function isAdminAuthenticated(): boolean {
  return isAuthed;
}

export function useAdminAuth(): boolean {
  return useSyncExternalStore(
    (cb) => {
      listeners.add(cb);
      return () => listeners.delete(cb);
    },
    () => isAuthed,
    () => isAuthed,
  );
}
