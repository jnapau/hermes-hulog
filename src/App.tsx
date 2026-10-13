import { Navigate, Route, Routes } from 'react-router-dom';
import PlayerLayout from './components/PlayerLayout';
import Home from './pages/Home';
import Play from './pages/Play';
import Collection from './pages/Collection';
import Settings from './pages/Settings';
import AdminLayout from './pages/admin/AdminLayout';
import AdminOverview from './pages/admin/AdminOverview';
import AdminQuestions from './pages/admin/AdminQuestions';
import AdminCalendar from './pages/admin/AdminCalendar';

export default function App() {
  return (
    <Routes>
      <Route element={<PlayerLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/koleksyon" element={<Collection />} />
        <Route path="/settings" element={<Settings />} />
      </Route>
      <Route path="/play" element={<Play />} />
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminOverview />} />
        <Route path="questions" element={<AdminQuestions />} />
        <Route path="calendar" element={<AdminCalendar />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
