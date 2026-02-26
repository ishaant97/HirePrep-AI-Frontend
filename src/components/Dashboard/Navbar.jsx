import { useState, useRef, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useResume } from '../../context/ResumeContext';
import { useNavigate } from "react-router";
import api from '../../api/axios';

function Navbar({ onOpenChat, sidebarCollapsed, onOpenMobileSidebar }) {
    const { user, logout } = useAuth();
    const { activeResumeId, setActiveResumeId, resumeList, setResumeList } = useResume();
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [isResumeDropdownOpen, setIsResumeDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
    const resumeDropdownRef = useRef(null);
    const navigate = useNavigate();

    // Get user ID (handle both _id and id formats)
    const userId = user?._id || user?.id;

    // Fetch resumes on mount
    useEffect(() => {
        const fetchResumes = async () => {
            if (userId) {
                try {
                    const res = await api.get(`/resume/user/${userId}`);
                    setResumeList(res.data);
                    // Auto-select first resume if none selected
                    if (!activeResumeId && res.data.length > 0) {
                        setActiveResumeId(res.data[0]._id);
                    }
                } catch (err) {
                    console.error('Failed to fetch resumes:', err);
                }
            }
        };
        fetchResumes();
    }, [userId, setResumeList, setActiveResumeId, activeResumeId]);

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsProfileOpen(false);
            }
            if (resumeDropdownRef.current && !resumeDropdownRef.current.contains(event.target)) {
                setIsResumeDropdownOpen(false);
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
            className={`fixed top-0 right-0 h-16 bg-gray-900/80 backdrop-blur-md border-b border-purple-500/20 z-30 transition-all duration-300 left-0 ${sidebarCollapsed ? 'lg:left-20' : 'lg:left-72'
                }`}
        >
            <div className="h-full px-3 sm:px-4 md:px-6 flex items-center justify-between">
                {/* Left Section - Hamburger + Page Title */}
                <div className="flex items-center gap-2 sm:gap-4">
                    {/* Mobile Hamburger */}
                    <button
                        onClick={onOpenMobileSidebar}
                        className="lg:hidden p-2 text-gray-400 hover:text-white hover:bg-gray-800/50 rounded-xl transition-colors"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                    <h2 className="text-white font-semibold text-base sm:text-lg">Dashboard</h2>
                </div>

                {/* Right Section - Actions */}
                <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
                    {/* Resume Dropdown */}
                    <div className="relative" ref={resumeDropdownRef}>
                        <button
                            onClick={() => setIsResumeDropdownOpen(!isResumeDropdownOpen)}
                            className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-4 py-2 bg-gray-800/50 border border-gray-700/50 text-white rounded-xl hover:bg-gray-700/50 hover:border-purple-500/30 transition-all duration-200"
                        >
                            <svg
                                className="w-5 h-5 text-purple-400 flex-shrink-0"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                />
                            </svg>
                            <span className="hidden sm:inline font-medium text-sm max-w-[120px] md:max-w-[150px] truncate">
                                {resumeList.find(r => r._id === activeResumeId)?.originalFileName || 'Select Resume'}
                            </span>
                            <svg
                                className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${isResumeDropdownOpen ? 'rotate-180' : ''}`}
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>

                        {/* Resume Dropdown Menu */}
                        {isResumeDropdownOpen && (
                            <div className="fixed sm:absolute left-2 right-2 sm:left-auto sm:right-0 mt-3 sm:w-80 origin-top-right rounded-2xl border border-purple-500/20 bg-gray-900/95 backdrop-blur-xl shadow-2xl shadow-purple-500/10 overflow-hidden animate-fadeIn z-50">
                                {/* Header */}
                                <div className="px-5 py-4 bg-gradient-to-r from-purple-600/10 to-indigo-600/10 border-b border-purple-500/20">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/30">
                                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <p className="text-white font-semibold">Your Resumes</p>
                                            <p className="text-purple-300/70 text-xs">{resumeList.length} resume{resumeList.length !== 1 ? 's' : ''} uploaded</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Resume List */}
                                <div className="max-h-72 overflow-y-auto p-2">
                                    {resumeList.length === 0 ? (
                                        <div className="px-4 py-8 text-center">
                                            <div className="w-16 h-16 bg-gray-800/50 rounded-2xl flex items-center justify-center mx-auto mb-3">
                                                <svg className="w-8 h-8 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                                </svg>
                                            </div>
                                            <p className="text-gray-400 text-sm">No resumes uploaded yet</p>
                                            <p className="text-gray-500 text-xs mt-1">Upload your first resume to get started</p>
                                        </div>
                                    ) : (
                                        resumeList.map((resume) => (
                                            <div
                                                key={resume._id}
                                                className={`group flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 cursor-pointer mb-1 ${activeResumeId === resume._id
                                                    ? 'bg-gradient-to-r from-purple-600/20 to-indigo-600/20 border border-purple-500/30'
                                                    : 'hover:bg-gray-800/50 border border-transparent'
                                                    }`}
                                                onClick={() => {
                                                    setActiveResumeId(resume._id);
                                                    setIsResumeDropdownOpen(false);
                                                }}
                                            >
                                                {/* Resume Icon */}
                                                <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors ${activeResumeId === resume._id
                                                    ? 'bg-purple-500/20 text-purple-400'
                                                    : 'bg-gray-800/80 text-gray-400 group-hover:bg-gray-700/80 group-hover:text-gray-300'
                                                    }`}>
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                                    </svg>
                                                </div>

                                                {/* Resume Info */}
                                                <div className="flex-1 min-w-0">
                                                    <p className={`text-sm truncate font-medium ${activeResumeId === resume._id ? 'text-purple-300' : 'text-gray-300'
                                                        }`}>
                                                        {resume.originalFileName}
                                                    </p>
                                                    {activeResumeId === resume._id && (
                                                        <p className="text-xs text-purple-400/70 mt-0.5">Currently selected</p>
                                                    )}
                                                </div>

                                                {/* View Button */}
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        const viewUrl = import.meta.env.DEV
                                                            ? `http://localhost:3000/api/resume/view/${resume._id}`   // development — direct to backend
                                                            : `/api/resume/view/${resume._id}`;                        // production — proxied through Netlify (keeps cookies first-party)
                                                        window.open(viewUrl, '_blank');
                                                    }}
                                                    className="p-2 rounded-lg bg-gray-800/50 hover:bg-purple-500/20 text-gray-400 hover:text-purple-400 transition-all duration-200 opacity-0 group-hover:opacity-100 flex-shrink-0"
                                                    title="View Resume"
                                                >
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                    </svg>
                                                </button>

                                                {/* Selected Indicator */}
                                                {activeResumeId === resume._id && (
                                                    <div className="w-2 h-2 bg-purple-500 rounded-full flex-shrink-0 animate-pulse"></div>
                                                )}
                                            </div>
                                        ))
                                    )}
                                </div>

                                {/* Footer */}
                                <div className="p-2 border-t border-purple-500/10">
                                    <button
                                        onClick={() => {
                                            navigate('/resumeUpload');
                                            setIsResumeDropdownOpen(false);
                                        }}
                                        className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-purple-600/10 to-indigo-600/10 hover:from-purple-600/20 hover:to-indigo-600/20 text-purple-400 hover:text-purple-300 transition-all duration-200 border border-purple-500/20 hover:border-purple-500/30"
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                        </svg>
                                        <span className="text-sm font-medium">Upload New Resume</span>
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* AI Chat Button */}
                    <button
                        onClick={onOpenChat}
                        className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl hover:from-purple-500 hover:to-indigo-500 transition-all duration-200 shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 group"
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
                        <span className="hidden sm:inline font-medium">AI Chat</span>
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
                            <div className="fixed sm:absolute left-2 right-2 sm:left-auto sm:right-0 mt-3 sm:w-80 origin-top-right rounded-2xl border border-purple-500/20 bg-gray-900/95 backdrop-blur-xl shadow-2xl shadow-purple-500/10 overflow-hidden animate-fadeIn z-50">
                                {/* Header */}
                                <div className="px-5 py-4 bg-gradient-to-r from-purple-600/10 to-indigo-600/10 border-b border-purple-500/20">
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center text-white text-lg font-bold shadow-lg shadow-purple-500/30">
                                            {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-white font-semibold truncate">{user?.name || 'User'}</p>
                                            <p className="text-purple-300/70 text-sm truncate">{user?.email || 'user@email.com'}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Menu Items */}
                                <div className="p-2">
                                    <button
                                        onClick={() => {
                                            navigate('/profile');
                                            setIsProfileOpen(false);
                                        }}
                                        className="group w-full flex items-center gap-3 px-3 py-3 rounded-xl text-gray-300 hover:text-white hover:bg-gray-800/50 transition-all duration-200"
                                    >
                                        <span className="w-9 h-9 rounded-lg bg-gray-800/80 group-hover:bg-purple-500/20 flex items-center justify-center transition-colors">
                                            <svg className="w-5 h-5 text-gray-400 group-hover:text-purple-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                            </svg>
                                        </span>
                                        <div className="flex-1 text-left">
                                            <span className="font-medium">Profile</span>
                                            <p className="text-xs text-gray-500 group-hover:text-gray-400">View and edit your profile</p>
                                        </div>
                                        <svg className="w-4 h-4 text-gray-600 group-hover:text-gray-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </button>

                                    <button
                                        onClick={() => {
                                            navigate('/resumeUpload');
                                            setIsProfileOpen(false);
                                        }}
                                        className="group w-full flex items-center gap-3 px-3 py-3 rounded-xl text-gray-300 hover:text-white hover:bg-gray-800/50 transition-all duration-200"
                                    >
                                        <span className="w-9 h-9 rounded-lg bg-gray-800/80 group-hover:bg-purple-500/20 flex items-center justify-center transition-colors">
                                            <svg className="w-5 h-5 text-gray-400 group-hover:text-purple-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                            </svg>
                                        </span>
                                        <div className="flex-1 text-left">
                                            <span className="font-medium">Upload Resume</span>
                                            <p className="text-xs text-gray-500 group-hover:text-gray-400">Add a new resume</p>
                                        </div>
                                        <svg className="w-4 h-4 text-gray-600 group-hover:text-gray-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </button>

                                    {/* <button
                                        onClick={() => {
                                            navigate('/dashboard/settings');
                                            setIsProfileOpen(false);
                                        }}
                                        className="group w-full flex items-center gap-3 px-3 py-3 rounded-xl text-gray-300 hover:text-white hover:bg-gray-800/50 transition-all duration-200"
                                    >
                                        <span className="w-9 h-9 rounded-lg bg-gray-800/80 group-hover:bg-purple-500/20 flex items-center justify-center transition-colors">
                                            <svg className="w-5 h-5 text-gray-400 group-hover:text-purple-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                        </span>
                                        <div className="flex-1 text-left">
                                            <span className="font-medium">Settings</span>
                                            <p className="text-xs text-gray-500 group-hover:text-gray-400">Preferences and account</p>
                                        </div>
                                        <svg className="w-4 h-4 text-gray-600 group-hover:text-gray-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </button> */}
                                </div>

                                {/* Logout */}
                                <div className="p-2 border-t border-purple-500/10">
                                    <button
                                        onClick={handleLogout}
                                        className="group w-full flex items-center gap-3 px-3 py-3 rounded-xl text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all duration-200"
                                    >
                                        <span className="w-9 h-9 rounded-lg bg-red-500/10 group-hover:bg-red-500/20 flex items-center justify-center transition-colors">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                            </svg>
                                        </span>
                                        <div className="flex-1 text-left">
                                            <span className="font-medium">Logout</span>
                                            <p className="text-xs text-red-400/60 group-hover:text-red-400/80">Sign out of your account</p>
                                        </div>
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
