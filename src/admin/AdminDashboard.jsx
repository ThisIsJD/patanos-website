import { Routes, Route, Navigate, NavLink } from 'react-router-dom';
import patanosLogo from '../assets/Brand/Patanos_logo.png';
import MenuManager from './MenuManager';
import GalleryManager from './GalleryManager';

export default function AdminDashboard({ onLogout }) {
    return (
        <div className="min-h-screen bg-[#0A0A0A] flex flex-col md:flex-row font-body text-white selection:bg-gold selection:text-black">
            {/* Sidebar Navigation */}
            <aside className="w-full md:w-64 bg-[#141414] border-b md:border-b-0 md:border-r border-white/5 flex flex-col pt-8 md:min-h-screen">
                <div className="px-8 flex flex-col items-center md:items-start mb-10">
                    <img src={patanosLogo} alt="Patanos Logo" className="h-10 w-auto mb-2 opacity-90" />
                    <span className="font-display text-gold tracking-widest uppercase text-[10px] opacity-70">Admin System</span>
                </div>

                <nav className="flex-1 px-4 flex flex-row md:flex-col gap-2 overflow-x-auto md:overflow-visible pb-4 md:pb-0">
                    <NavLink
                        to="/admin/menu"
                        className={({ isActive }) =>
                            `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${isActive ? 'bg-gold/10 text-gold border border-gold/20 font-medium' : 'text-white/60 hover:bg-white/5 hover:text-white'}`
                        }
                    >
                        Menu Items
                    </NavLink>
                    <NavLink
                        to="/admin/gallery"
                        className={({ isActive }) =>
                            `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${isActive ? 'bg-gold/10 text-gold border border-gold/20 font-medium' : 'text-white/60 hover:bg-white/5 hover:text-white'}`
                        }
                    >
                        Gallery Photos
                    </NavLink>
                </nav>

                <div className="p-4 mt-auto">
                    <button
                        onClick={onLogout}
                        className="w-full px-4 py-3 text-left text-error/80 hover:text-error hover:bg-error/10 rounded-xl transition-colors text-sm font-medium tracking-wide flex items-center gap-3"
                    >
                        Sign Out
                    </button>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 overflow-x-hidden overflow-y-auto">
                <Routes>
                    <Route path="/" element={<Navigate to="/admin/menu" replace />} />
                    <Route path="/menu" element={<MenuManager />} />
                    <Route path="/gallery" element={<GalleryManager />} />
                </Routes>
            </main>
        </div>
    );
}
