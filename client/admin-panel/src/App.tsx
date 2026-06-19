import { Navigate, Route, Routes } from 'react-router-dom';
import type { ReactElement } from 'react';
import { useAppSelector } from './hooks/redux';
import { AdminLayout } from './layouts/AdminLayout';
import { LoginPage } from './pages/LoginPage';
import { DashboardPage } from './pages/DashboardPage';
import { UsersPage } from './pages/UsersPage';
import { VideosPage } from './pages/VideosPage';
import { CategoriesPage } from './pages/CategoriesPage';
import { AnalyticsPage } from './pages/AnalyticsPage';
import { adminRoutes } from './routes/admin.routes';

function Protected({ children }: { children: ReactElement }) {
  const token = useAppSelector((state) => state.auth.token);
  return token ? children : <Navigate to="/login" replace />;
}

export function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={<Protected><AdminLayout /></Protected>}>
        <Route index element={<DashboardPage />} />
        <Route path={adminRoutes.users} element={<UsersPage />} />
        <Route path={adminRoutes.videos} element={<VideosPage />} />
        <Route path={adminRoutes.categories} element={<CategoriesPage />} />
        <Route path={adminRoutes.analytics} element={<AnalyticsPage />} />
      </Route>
    </Routes>
  );
}
