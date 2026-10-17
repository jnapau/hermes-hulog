import { lazy, Suspense, useEffect, useState } from 'react';
import { CloudStatus } from './components/CloudStatus';
import AdminUsers from './pages/admin/AdminUsers';
const QuestionEditor = lazy(() => import('./pages/admin/QuestionEditor'));
const DashboardAnalytics = lazy(() => import('./pages/admin/DashboardAnalytics'));
import { getAllQuestions } from './lib/customQuestions';
import { useAuth } from './lib/users';
import { Navigate, Route, Routes } from 'react-router-dom';
import PlayerLayout from './components/PlayerLayout';
import Home from './pages/Home';
import Play from './pages/Play';
import Collection from './pages/Collection';
import AdminLayout from './pages/admin/AdminLayout';

export default function App() {
  const { currentUser, loading } = useAuth();
  const [, tick] = useState(0);
  useEffect(() => { const refresh = () => tick(n => n + 1); window.addEventListener('hulog:questions', refresh); return () => window.removeEventListener('hulog:questions', refresh); }, []);
  return (
    <><CloudStatus/>
    <Suspense fallback={<p role="status" className="p-8">Loading…</p>}><Routes>
      <Route element={<PlayerLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/koleksyon" element={loading ? <p className="p-8" role="status">Loading your collection…</p> : currentUser ? <Collection /> : <Navigate to="/" replace />} />
      </Route>
      <Route path="/play" element={loading ? <p className="p-8">Loading your progress…</p> : currentUser ? <Play key={`${currentUser.id}:${getAllQuestions().length > 0}`}/> : <Navigate to="/" replace />} />
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<DashboardAnalytics />} />
        <Route path="questions" element={<QuestionEditor />} />
        <Route path="calendar" element={<Navigate to="/admin/questions" replace />} />
        <Route path="users" element={<AdminUsers />} />
        <Route path="statistics" element={<Navigate to="/admin" replace />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes></Suspense></>
  );
}
