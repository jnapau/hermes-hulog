import { getCurrentUser, useAuth } from './users';
export function isAdminAuthenticated() { return getCurrentUser()?.is_admin === true; }
export function useAdminAuth() { return useAuth().currentUser?.is_admin === true; }
