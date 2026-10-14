import { useState } from 'react';
import { NavLink, Outlet, Link, useNavigate } from 'react-router-dom';
import { LayoutDashboard, HelpCircle, Calendar, BarChart3, ArrowLeft, LogOut, ShieldCheck } from 'lucide-react';
import { HestiaMascot } from '../../components/HestiaMascot';
import { loginAdmin, logoutAdmin, useAdminAuth } from '../../lib/adminAuth';

export default function AdminLayout() {
  const isAuthed = useAdminAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErr('');
    const res = loginAdmin(username, password);
    if (!res.success) {
      setErr(res.message || 'Maling username o password.');
    }
  };

  const handleLogout = () => {
    logoutAdmin();
    navigate('/');
  };

  if (!isAuthed) {
    return (
      <div className="min-h-screen bg-canvas flex flex-col justify-center items-center px-4">
        <div className="w-full max-w-sm rounded-3xl bg-white p-6 shadow-xl border border-hairline text-center">
          <HestiaMascot pose="ok" height={90} className="mx-auto mb-2" />
          <h2 className="text-lg font-black text-ink">Admin Panel Login</h2>
          <p className="text-xs text-ink-muted mt-1 mb-4">
            Curriculum Bank & User Response Analytics Portal
          </p>

          <form onSubmit={handleLogin} className="space-y-3 text-left">
            <div>
              <label className="text-[10px] font-extrabold uppercase text-ink-muted block mb-1">
                Admin Username
              </label>
              <input
                type="text"
                placeholder="Username (e.g. Hestia)"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full rounded-xl border border-stone-200 px-3 py-2 text-xs font-bold text-ink focus:border-brand focus:outline-none"
              />
            </div>

            <div>
              <label className="text-[10px] font-extrabold uppercase text-ink-muted block mb-1">
                Admin Password
              </label>
              <input
                type="password"
                placeholder="Password (e.g. HermesHulog)"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border border-stone-200 px-3 py-2 text-xs font-bold text-ink focus:border-brand focus:outline-none"
              />
            </div>

            {err && (
              <p className="text-[11px] font-bold text-rose-500 bg-rose-50 p-2 rounded-xl border border-rose-200">
                {err}
              </p>
            )}

            <button
              type="submit"
              className="w-full rounded-xl bg-brand py-2.5 text-xs font-bold text-white hover:bg-brand-light transition shadow-sm"
            >
              Log In as Administrator
            </button>
          </form>

          <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-[11px] text-ink-muted">
            <span className="flex items-center gap-1 font-semibold text-stone-500">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" /> Protected Portal
            </span>
            <Link to="/" className="text-brand hover:underline font-bold">
              ← Back to WebApp
            </Link>
          </div>
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

            <button
              onClick={handleLogout}
              className="rounded-lg border border-rose-200 bg-rose-50 hover:bg-rose-100 text-rose-700 px-2 py-1.5 text-xs font-bold transition flex items-center gap-1"
              title="Log out of Admin Panel"
            >
              <LogOut className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Logout</span>
            </button>
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
