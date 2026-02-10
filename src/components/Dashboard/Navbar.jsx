import { useState, useRef, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from "react-router";

function Navbar({ onOpenChat, sidebarCollapsed }) {
    const { user, logout } = useAuth();
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const dropdownRef = useRef(null);
    const navigate = useNavigate();

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsProfileOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleLogout = async () => {
        try {
            await logout();
        } catch (err) {
            console.error('Logout failed:', err);
        }
    };

    return (
        <header
            className={`fixed top-0 right-0 h-16 bg-gray-900/80 backdrop-blur-md border-b border-purple-500/20 z-30 transition-all duration-300 ${sidebarCollapsed ? 'left-20' : 'left-72'
                }`}
        >
            <div className="h-full px-6 flex items-center justify-between">
                {/* Left Section - Page Title / Breadcrumb */}
                <div className="flex items-center gap-4">
                    <h2 className="text-white font-semibold text-lg">Dashboard</h2>
                </div>

                {/* Right Section - Actions */}
                <div className="flex items-center gap-4">
                    {/* AI Chat Button */}
                    <button
                        onClick={onOpenChat}
                        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl hover:from-purple-500 hover:to-indigo-500 transition-all duration-200 shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 group"
                    >
                        <svg
                            className="w-5 h-5 group-hover:scale-110 transition-transform"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                            />
                        </svg>
                        <span className="font-medium">AI Chat</span>
                        <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                    </button>

                    {/* Notification Bell */}
                    {/* <button className="relative p-2 text-gray-400 hover:text-white hover:bg-gray-800/50 rounded-xl transition-colors">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                            />
                        </svg>
                        <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                    </button> */}

                    {/* Profile Dropdown */}
                    <div className="relative" ref={dropdownRef}>
                        <button
                            onClick={() => setIsProfileOpen(!isProfileOpen)}
                            className="flex items-center gap-3 p-1.5 pr-3 hover:bg-gray-800/50 rounded-xl transition-colors"
                        >
                            <div className="w-9 h-9 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center text-white font-semibold shadow-lg">
                                {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                            </div>
                            <div className="hidden sm:block text-left">
                                <p className="text-white text-sm font-medium">{user?.name || 'User'}</p>
                                <p className="text-gray-400 text-xs">{user?.collegeName || 'Student'}</p>
                            </div>
                            <svg
                                className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${isProfileOpen ? 'rotate-180' : ''
                                    }`}
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>

                        {/* Dropdown Menu */}
                        {isProfileOpen && (
                            <div className="absolute right-0 mt-3 w-72 origin-top-right rounded-2xl border border-slate-700/60 bg-slate-900/95 backdrop-blur-xl shadow-2xl shadow-black/60 ring-1 ring-white/5 overflow-hidden animate-fadeIn">
                                <div className="px-5 py-4 bg-slate-800/60">
                                    <p className="text-white font-semibold">{user?.name || 'User'}</p>
                                    <p className="text-slate-400 text-sm truncate">{user?.email || 'user@email.com'}</p>
                                </div>

                                <div className="p-2 space-y-1">
                                    <button
                                        onClick={() => navigate('/profile')}
                                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800/70 transition-colors"
                                    >
                                        <span className="w-9 h-9 rounded-lg bg-slate-800/80 flex items-center justify-center">
                                            <svg className="w-5 h-5 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                            </svg>
                                        </span>
                                        <span className="font-medium">Profile</span>
                                    </button>

                                    <button
                                        onClick={() => navigate('/resumeUpload')}
                                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800/70 transition-colors"
                                    >
                                        <span className="w-9 h-9 rounded-lg bg-slate-800/80 flex items-center justify-center">
                                            <svg className="w-5 h-5 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                            </svg>
                                        </span>
                                        <span className="font-medium">Upload Resume</span>
                                    </button>
                                </div>

                                <div className="border-t border-slate-800/80 p-2">
                                    <button
                                        onClick={handleLogout}
                                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors"
                                    >
                                        <span className="w-9 h-9 rounded-lg bg-red-500/10 flex items-center justify-center">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                            </svg>
                                        </span>
                                        <span className="font-medium">Logout</span>
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Navbar;
