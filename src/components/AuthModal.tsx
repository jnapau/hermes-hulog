import React, { useState } from 'react';
import { User as UserIcon, LogOut, UserPlus, LogIn, X, CheckCircle } from 'lucide-react';
import { useAuth, loginUser, registerUser, logoutUser } from '../lib/users';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const { currentUser, users } = useAuth();
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [usernameInput, setUsernameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [authError, setAuthError] = useState('');
  const [successNote, setSuccessNote] = useState('');

  if (!isOpen) return null;

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    setSuccessNote('');
    if (authMode === 'register') {
      const res = registerUser(usernameInput, passwordInput);
      if (!res.success) {
        setAuthError(res.message || 'Registration failed.');
        return;
      }
      setSuccessNote('Account registered successfully! All your answers are now saved.');
    } else {
      const res = loginUser(usernameInput, passwordInput);
      if (!res.success) {
        setAuthError(res.message || 'Login failed.');
        return;
      }
    }
    setTimeout(() => {
      onClose();
      setUsernameInput('');
      setPasswordInput('');
      setSuccessNote('');
    }, 600);
  };

  const handleQuickSwitch = (username: string) => {
    loginUser(username);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm anim-pop">
      <div className="relative w-full max-w-sm rounded-3xl bg-white p-6 shadow-2xl border-2 border-amber-300">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-1 text-stone-400 hover:text-stone-700 transition"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="text-center mb-4">
          <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-2xl bg-amber-100 text-amber-700 mb-2">
            <UserIcon className="h-5 w-5" />
          </div>
          <h3 className="text-lg font-black text-ink">
            {currentUser ? `Player: ${currentUser.username}` : authMode === 'login' ? 'Player Login' : 'Instant Player Registration'}
          </h3>
          <p className="text-xs text-ink-muted mt-0.5">
            Registered players save answers to the live Admin Analytics panel. Just username & password, no verification needed.
          </p>
        </div>

        {currentUser ? (
          <div className="space-y-4">
            <div className="rounded-2xl bg-stone-50 p-3 border border-stone-200 text-xs">
              <div className="flex justify-between items-center mb-1">
                <span className="text-ink-muted font-semibold">Logged-in User:</span>
                <span className="font-extrabold text-brand">{currentUser.username}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-ink-muted font-semibold">Registered:</span>
                <span className="text-ink font-medium">{currentUser.registeredAt?.slice(0, 10)}</span>
              </div>
            </div>

            {/* Quick switch to other sample users */}
            <div>
              <span className="text-[11px] font-bold text-ink-muted uppercase block mb-1.5">
                Switch to Another Player:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {users.map((u) => (
                  <button
                    key={u.username}
                    onClick={() => handleQuickSwitch(u.username)}
                    className={`rounded-lg px-2 py-1 text-xs font-bold transition border ${
                      u.username === currentUser.username
                        ? 'bg-brand text-white border-brand'
                        : 'bg-stone-100 text-ink-muted hover:bg-stone-200 border-stone-200'
                    }`}
                  >
                    {u.username}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-2 pt-2 border-t border-stone-100">
              <button
                onClick={() => {
                  logoutUser();
                  onClose();
                }}
                className="w-full rounded-xl border border-stone-300 py-2 text-xs font-bold text-rose-600 hover:bg-rose-50 flex items-center justify-center gap-1.5 transition"
              >
                <LogOut className="h-3.5 w-3.5" /> Sign Out
              </button>
              <button
                onClick={() => {
                  logoutUser();
                  setAuthMode('register');
                }}
                className="w-full rounded-xl bg-amber-100 text-cocoa py-2 text-xs font-bold hover:bg-amber-200 transition"
              >
                + Register New
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleAuthSubmit} className="space-y-3">
            <div>
              <label className="text-[11px] font-extrabold text-ink-muted block mb-1 uppercase">
                Username
              </label>
              <input
                type="text"
                required
                placeholder="e.g. maria_santos"
                value={usernameInput}
                onChange={(e) => setUsernameInput(e.target.value)}
                className="w-full rounded-xl border border-stone-200 px-3 py-2 text-xs font-bold text-ink focus:border-brand focus:outline-none"
              />
            </div>

            <div>
              <label className="text-[11px] font-extrabold text-ink-muted block mb-1 uppercase">
                Password (No verification needed)
              </label>
              <input
                type="password"
                placeholder="Enter password"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                className="w-full rounded-xl border border-stone-200 px-3 py-2 text-xs font-bold text-ink focus:border-brand focus:outline-none"
              />
            </div>

            {authError && (
              <p className="text-[11px] font-bold text-rose-500 bg-rose-50 p-2 rounded-xl border border-rose-200">
                {authError}
              </p>
            )}

            {successNote && (
              <p className="text-[11px] font-bold text-emerald-700 bg-emerald-50 p-2 rounded-xl border border-emerald-200 flex items-center gap-1">
                <CheckCircle className="h-3.5 w-3.5" /> {successNote}
              </p>
            )}

            <button
              type="submit"
              className="btn-flame w-full py-2.5 text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm"
            >
              {authMode === 'login' ? <LogIn className="h-3.5 w-3.5" /> : <UserPlus className="h-3.5 w-3.5" />}
              <span>{authMode === 'login' ? 'Sign In & Save Answers' : 'Instant Register & Play'}</span>
            </button>

            {/* Switch between login and register */}
            <div className="text-center pt-2">
              <button
                type="button"
                onClick={() => {
                  setAuthMode(authMode === 'login' ? 'register' : 'login');
                  setAuthError('');
                }}
                className="text-[11px] font-bold text-brand hover:underline"
              >
                {authMode === 'login'
                  ? "Don't have an account? Click here to Register"
                  : 'Already have an account? Click here to Log In'}
              </button>
            </div>

            {/* Quick demo account select */}
            <div className="pt-2 border-t border-stone-100">
              <span className="text-[10px] font-bold text-ink-muted block mb-1">
                Or select a demo registered user:
              </span>
              <div className="flex flex-wrap gap-1">
                {users.slice(0, 4).map((u) => (
                  <button
                    key={u.username}
                    type="button"
                    onClick={() => handleQuickSwitch(u.username)}
                    className="rounded-md bg-stone-100 px-2 py-0.5 text-[10px] font-bold text-ink-muted hover:bg-amber-100 hover:text-cocoa transition"
                  >
                    {u.username}
                  </button>
                ))}
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
