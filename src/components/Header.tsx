import { NavLink } from 'react-router-dom';
import { ShieldAlert, Sparkles, Home as HomeIcon, Settings as SettingsIcon } from 'lucide-react';

export function Header() {
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

          <NavLink
            to="/settings"
            className={({ isActive }) =>
              `flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition ${
                isActive ? 'bg-amber-200/60 text-cocoa shadow-2xs' : 'hover:text-ink hover:bg-black/5'
              }`
            }
          >
            <SettingsIcon className="h-3.5 w-3.5" />
            <span>Ritual & Settings</span>
          </NavLink>
        </nav>

        <div className="flex items-center gap-2">
          <NavLink
            to="/admin"
            className="flex items-center gap-1.5 rounded-lg border border-[#E3D5BD] bg-white/70 px-2.5 py-1.5 text-xs font-semibold text-ink-muted hover:text-ink hover:bg-white transition"
            title="Curriculum & Analytics Administration"
          >
            <ShieldAlert className="h-3.5 w-3.5 text-flame-deep" />
            <span className="hidden sm:inline">Admin</span>
          </NavLink>
        </div>
      </div>
    </header>
  );
}
