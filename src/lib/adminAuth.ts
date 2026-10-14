import { useSyncExternalStore } from 'react';

const ADMIN_AUTH_KEY = 'hulog_admin_auth_v2';
const ADMIN_USERNAME = 'Hestia';
const ADMIN_PASSWORD = 'HermesHulog';

let isAuthed = typeof window !== 'undefined' ? sessionStorage.getItem(ADMIN_AUTH_KEY) === 'true' : false;
const listeners = new Set<() => void>();

function notify() {
  listeners.forEach((l) => l());
}

export function loginAdmin(username: string, password: string): { success: boolean; message?: string } {
  const cleanUser = username.trim();
  const cleanPass = password.trim();

  if (cleanUser === ADMIN_USERNAME && cleanPass === ADMIN_PASSWORD) {
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
    message: 'Invalid credentials. Required: Username: Hestia | Password: HermesHulog',
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
