import { useState } from 'react';
import { NavLink, Outlet, Link } from 'react-router-dom';
import { LayoutDashboard, HelpCircle, Calendar, BarChart3, ArrowLeft } from 'lucide-react';
import { HestiaMascot } from '../../components/HestiaMascot';

const PASSCODE = import.meta.env.VITE_ADMIN_PASSCODE || 'hestia2026';

export default function AdminLayout() {
  const [authed, setAuthed] = useState(() => {
    return sessionStorage.getItem('hulog_admin_auth') === 'true';
  });
  const [pin, setPin] = useState('');
  const [err, setErr] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin === PASSCODE) {
      sessionStorage.setItem('hulog_admin_auth', 'true');
      setAuthed(true);
      setErr(false);
    } else {
      setErr(true);
    }
  };

  if (!authed) {
    return (
      <div className="min-h-screen bg-canvas flex flex-col justify-center items-center px-4">
        <div className="w-full max-w-sm rounded-3xl bg-white p-6 shadow-xl border border-hairline text-center">
          <HestiaMascot pose="ok" height={90} className="mx-auto mb-2" />
          <h2 className="text-lg font-black text-ink">Admin Panel Login</h2>
          <p className="text-xs text-ink-muted mt-1 mb-4">
            Hermes Hulog Curriculum & Question Bank Portal
          </p>

          <form onSubmit={handleLogin} className="space-y-3">
            <input
              type="password"
              placeholder="Admin passcode (default: hestia2026)"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              className="w-full rounded-xl border border-stone-200 px-3 py-2 text-xs font-semibold focus:border-brand focus:outline-none"
            />
            {err && <p className="text-[11px] font-bold text-rose-500">Incorrect passcode. Please try again.</p>}
            <button
              type="submit"
              className="w-full rounded-xl bg-brand py-2 text-xs font-bold text-white hover:bg-brand-light transition shadow-sm"
            >
              Access Admin Portal
            </button>
          </form>

          <Link to="/" className="mt-4 inline-block text-[11px] text-ink-muted hover:underline">
            ← Return to Main WebApp
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-canvas flex flex-col text-ink">
      {/* Top Admin Bar */}
      <header className="sticky top-0 z-30 border-b border-hairline bg-white/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
          <div className="flex items-center gap-3">
            <Link to="/" className="text-xs font-bold text-ink-muted hover:text-ink flex items-center gap-1">
              <ArrowLeft className="h-4 w-4" /> Hulog App
            </Link>
            <div className="h-4 w-[1px] bg-hairline" />
            <h1 className="text-sm font-extrabold text-ink flex items-center gap-1.5">
              <span className="rounded bg-brand/10 px-1.5 py-0.5 text-[10px] font-black text-brand">
                ADMIN
              </span>
              Curriculum & Analytics
            </h1>
          </div>

          <nav className="flex items-center gap-1 sm:gap-2">
            <NavLink
              to="/admin"
              end
              className={({ isActive }) =>
                `rounded-lg px-2.5 sm:px-3 py-1.5 text-xs font-bold transition flex items-center gap-1.5 ${
                  isActive ? 'bg-brand text-white shadow-xs' : 'text-ink-muted hover:bg-surface-sunk'
                }`
              }
            >
              <LayoutDashboard className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Overview</span>
            </NavLink>

            <NavLink
              to="/admin/questions"
              className={({ isActive }) =>
                `rounded-lg px-2.5 sm:px-3 py-1.5 text-xs font-bold transition flex items-center gap-1.5 ${
                  isActive ? 'bg-brand text-white shadow-xs' : 'text-ink-muted hover:bg-surface-sunk'
                }`
              }
            >
              <HelpCircle className="h-3.5 w-3.5" />
              <span>Questions</span>
            </NavLink>

            <NavLink
              to="/admin/calendar"
              className={({ isActive }) =>
                `rounded-lg px-2.5 sm:px-3 py-1.5 text-xs font-bold transition flex items-center gap-1.5 ${
                  isActive ? 'bg-brand text-white shadow-xs' : 'text-ink-muted hover:bg-surface-sunk'
                }`
              }
            >
              <Calendar className="h-3.5 w-3.5" />
              <span>Calendar</span>
            </NavLink>

            <NavLink
              to="/admin/statistics"
              className={({ isActive }) =>
                `rounded-lg px-2.5 sm:px-3 py-1.5 text-xs font-bold transition flex items-center gap-1.5 ${
                  isActive ? 'bg-brand text-white shadow-xs' : 'text-ink-muted hover:bg-surface-sunk'
                }`
              }
            >
              <BarChart3 className="h-3.5 w-3.5 text-amber-300" />
              <span>Answer Analytics</span>
            </NavLink>
          </nav>
        </div>
      </header>

      {/* Main Admin Content */}
      <main className="flex-1 mx-auto w-full max-w-6xl p-4 sm:p-6">
        <Outlet />
      </main>
    </div>
  );
}
