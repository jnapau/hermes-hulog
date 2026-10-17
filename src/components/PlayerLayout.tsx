import { NavLink, Outlet } from 'react-router-dom';
import { Home, Sparkles } from 'lucide-react';
import { Header } from './Header';
import { useAuth } from '../lib/users';

export default function PlayerLayout() {
  const { currentUser } = useAuth();
  return (
    <div className="min-h-screen bg-hulog flex flex-col text-ink">
      <Header />

      <main className="flex-1 player-main">
        <Outlet />
      </main>

      {/* Mobile Sticky Bottom Navigation Bar (Removed Ritual & Settings) */}
      {currentUser && <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-[#F0E3CC] bg-[#FFF8EC]/95 backdrop-blur-md sm:hidden safe-bottom">
        <div className="flex items-center justify-around py-2">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `flex flex-col items-center gap-1 py-1 px-6 text-xs font-bold transition ${
                isActive ? 'text-cocoa bg-amber-100 rounded-xl' : 'text-ink-muted opacity-75'
              }`
            }
          >
            <Home className="h-5 w-5" />
            <span>Home</span>
          </NavLink>

          <NavLink
            to="/koleksyon"
            className={({ isActive }) =>
              `flex flex-col items-center gap-1 py-1 px-6 text-xs font-bold transition ${
                isActive ? 'text-cocoa bg-amber-100 rounded-xl' : 'text-ink-muted opacity-75'
              }`
            }
          >
            <Sparkles className="h-5 w-5" />
            <span>Collection Shelf</span>
          </NavLink>
        </div>
      </nav>}
    </div>
  );
}
