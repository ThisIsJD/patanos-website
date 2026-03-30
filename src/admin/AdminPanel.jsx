import { Routes, Route, Navigate } from 'react-router-dom';
import { useAdminAuth } from './useAdminAuth';
import AdminLogin from './AdminLogin';
import AdminDashboard from './AdminDashboard';

export default function AdminPanel() {
    const { login, logout, isAuthenticated, loading } = useAdminAuth();

    if (loading) {
        return (
            <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center">
                <div className="text-white/50 font-body">Loading...</div>
            </div>
        );
    }

    if (!isAuthenticated) {
        return <AdminLogin onLogin={login} />;
    }

    return <AdminDashboard onLogout={logout} />;
}
