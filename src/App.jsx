import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import ReservePage from './pages/ReservePage';
import DashboardPage from './pages/DashboardPage';

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-6xl mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<Navigate to="/reserve" replace />} />
          <Route path="/reserve" element={<ReservePage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
        </Routes>
      </main>
    </div>
  );
}
