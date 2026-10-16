import { Link, NavLink, Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../lib/users';
export default function AdminLayout() {
  const { currentUser, loading } = useAuth();
  if (loading) return <p className="p-8" role="status">Checking account…</p>;
  if (!currentUser?.is_admin) return <Navigate to="/" replace/>;
  return <div className="min-h-screen"><header className="admin-header"><Link to="/">← Hulog</Link><strong>Admin Panel</strong><nav aria-label="Administration"><NavLink to="/admin/questions">Questions & Calendar</NavLink><NavLink to="/admin/users">Users Data</NavLink><NavLink end to="/admin">Overview & Analytics</NavLink></nav></header><main className="mx-auto max-w-6xl p-4 sm:p-8"><Outlet/></main></div>;
}
