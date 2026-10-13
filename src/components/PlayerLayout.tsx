import { NavLink, Outlet } from 'react-router-dom';
import { Home, Sparkles, Settings as SettingsIcon } from 'lucide-react';
import { Header } from './Header';

export default function PlayerLayout() {
  return (
    <div className="min-h-screen bg-hulog flex flex-col text-ink">
      <Header />

      <main className="flex-1 pb-24 sm:pb-12">
        <Outlet />
      </main>

      {/* Mobile Sticky Bottom Navigation Bar */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-[#F0E3CC] bg-[#FFF8EC]/95 backdrop-blur-md sm:hidden safe-bottom">
        <div className="flex items-center justify-around py-2">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `flex flex-col items-center gap-1 py-1 px-4 text-xs font-bold transition ${
                isActive ? 'text-flame-deep scale-105' : 'text-ink-muted opacity-75'
              }`
            }
          >
            <Home className="h-5 w-5" />
            <span>Alkansya</span>
          </NavLink>

          <NavLink
            to="/koleksyon"
            className={({ isActive }) =>
              `flex flex-col items-center gap-1 py-1 px-4 text-xs font-bold transition ${
                isActive ? 'text-flame-deep scale-105' : 'text-ink-muted opacity-75'
              }`
            }
          >
            <Sparkles className="h-5 w-5" />
            <span>Koleksyon</span>
          </NavLink>

          <NavLink
            to="/settings"
            className={({ isActive }) =>
              `flex flex-col items-center gap-1 py-1 px-4 text-xs font-bold transition ${
                isActive ? 'text-flame-deep scale-105' : 'text-ink-muted opacity-75'
              }`
            }
          >
            <SettingsIcon className="h-5 w-5" />
            <span>Ritwal</span>
          </NavLink>
        </div>
      </nav>
    </div>
  );
}
