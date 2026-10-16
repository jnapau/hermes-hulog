import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { ShieldAlert, Sparkles, Home as HomeIcon, User as UserIcon } from 'lucide-react';
import { useAuth } from '../lib/users';
import { AuthModal } from './AuthModal';

export function Header() {
  const { currentUser } = useAuth();
  const isAdmin = currentUser?.is_admin === true;
  const [showAuthModal, setShowAuthModal] = useState(false);

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

        {/* Desktop Navigation Links */}
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
            <span>Home</span>
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

        {/* Right Actions: Registered User Account & Admin Link (Only for Hestia) */}
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

          {/* Admin panel entry - ONLY appears when admin (Hestia) is logged in! */}
          {isAdmin && (
            <NavLink
              to="/admin"
              className="flex items-center gap-1.5 rounded-xl border border-emerald-400 bg-emerald-50 px-2.5 py-1.5 text-xs font-bold text-emerald-800 transition hover:bg-emerald-100 shadow-2xs anim-pop"
              title="Curriculum & Analytics Administration"
            >
              <ShieldAlert className="h-3.5 w-3.5 text-emerald-600" />
              <span className="hidden sm:inline">Admin Panel</span>
            </NavLink>
          )}
        </div>
      </div>

      {/* User Registration & Login Modal */}
      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
    </header>
  );
}
