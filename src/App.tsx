import { Navigate, Route, Routes } from 'react-router-dom';
import PlayerLayout from './components/PlayerLayout';
import Home from './pages/Home';
import Play from './pages/Play';
import Collection from './pages/Collection';
import AdminLayout from './pages/admin/AdminLayout';
import AdminOverview from './pages/admin/AdminOverview';
import AdminQuestions from './pages/admin/AdminQuestions';
import AdminCalendar from './pages/admin/AdminCalendar';
import AdminStatistics from './pages/admin/AdminStatistics';

export default function App() {
  return (
    <Routes>
      <Route element={<PlayerLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/koleksyon" element={<Collection />} />
      </Route>
      <Route path="/play" element={<Play />} />
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminOverview />} />
        <Route path="questions" element={<AdminQuestions />} />
        <Route path="calendar" element={<AdminCalendar />} />
        <Route path="statistics" element={<AdminStatistics />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
