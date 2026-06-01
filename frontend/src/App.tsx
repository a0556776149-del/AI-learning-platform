import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
import HistoryPage from "./pages/HistoryPage";
import AdminLoginPage from "./pages/AdminLoginPage";
import AdminDashboardPage from "./pages/AdminDashboardPage";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RegisterPage />} />
        <Route path="/home" element={
          <ProtectedRoute storageKey="userId" redirectTo="/">
            <HomePage />
          </ProtectedRoute>
        } />
        <Route path="/history" element={
          <ProtectedRoute storageKey="userId" redirectTo="/">
            <HistoryPage />
          </ProtectedRoute>
        } />
        <Route path="/admin/login" element={<AdminLoginPage />} />
        <Route path="/admin" element={
          <ProtectedRoute storageKey="adminToken" redirectTo="/admin/login">
            <AdminDashboardPage />
          </ProtectedRoute>
        } />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
