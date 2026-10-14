import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { ShieldAlert, Sparkles, Home as HomeIcon, User as UserIcon, LogOut, UserPlus, LogIn, X, Lock } from 'lucide-react';
import { useAuth, loginUser, registerUser, logoutUser } from '../lib/users';
import { useAdminAuth } from '../lib/adminAuth';

export function Header() {
  const { currentUser, users } = useAuth();
  const isAdmin = useAdminAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [usernameInput, setUsernameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [authError, setAuthError] = useState('');

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    if (authMode === 'register') {
      const res = registerUser(usernameInput, passwordInput);
      if (!res.success) {
        setAuthError(res.message || 'Registration failed.');
        return;
      }
    } else {
      const res = loginUser(usernameInput, passwordInput);
      if (!res.success) {
        setAuthError(res.message || 'Login failed.');
        return;
      }
    }
    setShowAuthModal(false);
    setUsernameInput('');
    setPasswordInput('');
  };

  const handleQuickSwitch = (username: string) => {
    loginUser(username);
    setShowAuthModal(false);
  };

  return (
    <header className="sticky top-0 z-30 border-b border-[#F0E3CC] bg-[#FFF8EC]/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-3 sm:px-6">
        <NavLink to="/" className="flex items-center gap-2.5 transition hover:opacity-85">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-brand to-brand-light shadow-sm">
            <img src="/hermes-mark.svg" alt="Hermes" className="h-5 w-5 invert" />
          </div>
          <div>
            <div className="flex items-center gap-1.5 leading-none">
              <span className="font-extrabold text-ink text-base tracking-tight">Hulog</span>
              <span className="rounded bg-amber-200/80 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-cocoa">
                Micro-Game
              </span>
            </div>
            <p className="text-[11px] font-semibold text-ink-muted">Hermes Academy · Money Companion</p>
          </div>
        </NavLink>

        {/* Desktop Navigation Links (Removed Ritual & Settings) */}
        <nav className="hidden sm:flex items-center gap-1 text-xs font-bold text-ink-muted">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition ${
                isActive ? 'bg-amber-200/60 text-cocoa shadow-2xs' : 'hover:text-ink hover:bg-black/5'
              }`
            }
          >
            <HomeIcon className="h-3.5 w-3.5" />
            <span>Alkansya</span>
          </NavLink>

          <NavLink
            to="/koleksyon"
            className={({ isActive }) =>
              `flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition ${
                isActive ? 'bg-amber-200/60 text-cocoa shadow-2xs' : 'hover:text-ink hover:bg-black/5'
              }`
            }
          >
            <Sparkles className="h-3.5 w-3.5 text-amber-600" />
            <span>Collection Shelf</span>
          </NavLink>
        </nav>

        {/* Right Actions: Registered User Account & Admin Link */}
        <div className="flex items-center gap-2">
          {/* User Account / Sign In Pill */}
          <button
            onClick={() => setShowAuthModal(true)}
            className="flex items-center gap-1.5 rounded-xl border border-amber-300 bg-amber-100/70 hover:bg-amber-100 px-2.5 py-1.5 text-xs font-bold text-cocoa transition shadow-2xs"
            title="Registered Player Profile"
          >
            <UserIcon className="h-3.5 w-3.5 text-amber-700" />
            <span className="max-w-[100px] truncate">
              {currentUser ? currentUser.username : 'Sign In'}
            </span>
          </button>

          {/* Admin Panel button - Only visible when Admin is logged in */}
          {isAdmin && (
            <NavLink
              to="/admin"
              className="flex items-center gap-1.5 rounded-xl border border-brand bg-brand text-white px-2.5 py-1.5 text-xs font-bold transition shadow-xs hover:bg-brand-light"
              title="Curriculum & Analytics Administration"
            >
              <ShieldAlert className="h-3.5 w-3.5 text-amber-300" />
              <span className="hidden sm:inline font-bold">Admin Panel</span>
            </NavLink>
          )}
        </div>
      </div>

      {/* User Registration & Login Modal (Instant, No Verification) */}
      {showAuthModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm anim-pop">
          <div className="relative w-full max-w-sm rounded-3xl bg-white p-6 shadow-2xl border-2 border-amber-300">
            <button
              onClick={() => setShowAuthModal(false)}
              className="absolute right-4 top-4 rounded-full p-1 text-stone-400 hover:text-stone-700 transition"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="text-center mb-4">
              <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-2xl bg-amber-100 text-amber-700 mb-2">
                <UserIcon className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-black text-ink">
                {currentUser ? `Player: ${currentUser.username}` : authMode === 'login' ? 'Player Login' : 'Register New Player'}
              </h3>
              <p className="text-xs text-ink-muted mt-0.5">
                Sample integration: registered users save their answers for admin stats.
              </p>
            </div>

            {currentUser ? (
              <div className="space-y-4">
                <div className="rounded-2xl bg-stone-50 p-3 border border-stone-200 text-xs">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-ink-muted font-semibold">Active Username:</span>
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
                    Switch to Demo Player:
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
                      setShowAuthModal(false);
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
                    placeholder="Enter any password"
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                    className="w-full rounded-xl border border-stone-200 px-3 py-2 text-xs font-bold text-ink focus:border-brand focus:outline-none"
                  />
                </div>

                {authError && (
                  <p className="text-[11px] font-bold text-rose-500">{authError}</p>
                )}

                <button
                  type="submit"
                  className="btn-flame w-full py-2.5 text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm"
                >
                  {authMode === 'login' ? <LogIn className="h-3.5 w-3.5" /> : <UserPlus className="h-3.5 w-3.5" />}
                  <span>{authMode === 'login' ? 'Sign In & Save Answers' : 'Instant Register'}</span>
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
                      : 'Already have a username? Click here to Log In'}
                  </button>
                </div>

                {/* Admin Portal Gateway */}
                <div className="pt-2 border-t border-stone-100 flex items-center justify-between">
                  <span className="text-[10px] text-ink-muted">Are you a curriculum admin?</span>
                  <NavLink
                    to="/admin"
                    onClick={() => setShowAuthModal(false)}
                    className="text-[11px] font-bold text-amber-700 hover:underline flex items-center gap-1"
                  >
                    <Lock className="h-3 w-3" /> Admin Login (Hestia)
                  </NavLink>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
