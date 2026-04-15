import { Link, Route, Routes } from 'react-router-dom';
import { create } from 'zustand';
import DashboardPage from './pages/DashboardPage.jsx';
import LoginPage from './pages/LoginPage.jsx';

const useAuthStore = create((set) => ({
  tokenId: null,
  username: null,
  role: null,
  isAuthenticated: false,
  setAuth: (auth) => set({ ...auth, isAuthenticated: true }),
  clearAuth: () =>
    set({ tokenId: null, username: null, role: null, isAuthenticated: false }),
}));

export default function App() {
  const auth = useAuthStore((state) => state);

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <h1>SCCFS</h1>
        <nav>
          <Link to="/">Dashboard</Link>
          <Link to="/login">Login</Link>
        </nav>
        <p className="muted">
          {auth.isAuthenticated
            ? `Signed in as ${auth.username} (${auth.role})`
            : 'Not signed in'}
        </p>
      </aside>
      <main className="content">
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route
            path="/login"
            element={<LoginPage onAuthSuccess={auth.setAuth} />}
          />
        </Routes>
      </main>
    </div>
  );
}
