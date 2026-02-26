import logo from "../../assets/images/logo.jpeg";

const menuItems = [
    { id: 'overview', label: 'Overview', icon: '🏠' },
    { id: 'placement', label: 'Placement Probability', icon: '📊' },
    { id: 'jobs', label: 'Job Role Suggestions', icon: '💼' },
    { id: 'skills', label: 'Skill Gap Analysis', icon: '🧠' },
    { id: 'roadmap', label: 'Career Roadmap', icon: '🗺️' },
    { id: 'ats', label: 'ATS Resume Score', icon: '📄' },
    { id: 'analytics', label: 'Analytics & Graphs', icon: '📈' },
    // { id: 'interview', label: 'Interview Questions', icon: '🎤' }
    // { id: 'settings', label: 'Settings', icon: '⚙️' },
];

function Sidebar({ activeSection, onSectionChange, isCollapsed, onToggleCollapse, mobileSidebarOpen, onCloseMobileSidebar }) {
    return (
        <>
            {/* Desktop Sidebar */}
            <aside
                className={`hidden lg:flex fixed left-0 top-0 h-screen bg-gray-900/95 backdrop-blur-sm border-r border-purple-500/20 transition-all duration-300 z-40 flex-col overflow-visible ${isCollapsed ? 'w-20' : 'w-72'
                    }`}
            >
                {/* Logo Section */}
                <div className={`${isCollapsed ? 'px-2 py-3' : 'px-3 py-2'} border-b border-purple-500/20`}>
                    <div className="flex items-center justify-center">
                        <img src={logo} alt="HirePrep AI Logo" className={`${isCollapsed ? 'w-12 h-12 rounded-lg' : 'w-full h-auto rounded-xl'} object-contain transition-all duration-300`} />
                    </div>
                </div>

                {/* Toggle Button */}
                <button
                    onClick={onToggleCollapse}
                    className="absolute -right-5 top-20 flex items-center justify-center w-10 h-10 bg-gray-900 rounded-xl border border-purple-500/30 text-white hover:border-purple-500 hover:bg-gray-800 transition-all duration-200 shadow-lg shadow-purple-500/20 hover:shadow-purple-500/40 group"
                >
                    <div className="flex items-center gap-0.5">
                        <span className={`flex gap-0.5 transition-opacity duration-200 ${isCollapsed ? 'opacity-0 w-0' : 'opacity-100'}`}>
                            <span className="w-1 h-1 bg-purple-400 rounded-full"></span>
                            <span className="w-1 h-1 bg-purple-400 rounded-full"></span>
                        </span>
                        <svg
                            className={`w-5 h-5 text-purple-400 group-hover:text-purple-300 transition-transform duration-300 ${isCollapsed ? 'rotate-180' : ''}`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                        </svg>
                        <span className={`flex gap-0.5 transition-opacity duration-200 ${isCollapsed ? 'opacity-100' : 'opacity-0 w-0'}`}>
                            <span className="w-1 h-1 bg-purple-400 rounded-full"></span>
                            <span className="w-1 h-1 bg-purple-400 rounded-full"></span>
                        </span>
                    </div>
                </button>

                {/* Navigation Items */}
                <nav className="flex-1 py-4 px-3 overflow-y-auto custom-scrollbar">
                    <ul className="space-y-1">
                        {menuItems.map((item) => (
                            <li key={item.id}>
                                <button
                                    onClick={() => onSectionChange(item.id)}
                                    className={`w-full flex items-center ${isCollapsed ? 'justify-center px-0' : 'gap-3 px-3'} py-3 rounded-xl transition-all duration-200 group ${activeSection === item.id
                                        ? 'bg-gradient-to-r from-purple-600/30 to-indigo-600/30 text-white border border-purple-500/30 shadow-lg shadow-purple-500/10'
                                        : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
                                        }`}
                                    title={isCollapsed ? item.label : ''}
                                >
                                    <span className="text-xl flex-shrink-0">{item.icon}</span>
                                    {!isCollapsed && (
                                        <span className="font-medium">
                                            {item.label}
                                        </span>
                                    )}
                                    {activeSection === item.id && !isCollapsed && (
                                        <div className="ml-auto w-1.5 h-1.5 bg-purple-400 rounded-full"></div>
                                    )}
                                </button>
                            </li>
                        ))}
                    </ul>
                </nav>

                {/* Bottom Section */}
                <div className="p-4 border-t border-purple-500/20">
                    {!isCollapsed && (
                        <div className="bg-gradient-to-r from-purple-600/20 to-indigo-600/20 rounded-xl p-3 border border-purple-500/20">
                            <p className="text-xs text-gray-400">Pro Tip</p>
                            <p className="text-sm text-white mt-1">Use AI Chat for personalized career advice!</p>
                        </div>
                    )}
                </div>
            </aside>

            {/* Mobile Sidebar Drawer */}
            <aside
                className={`lg:hidden fixed left-0 top-0 h-screen w-72 bg-gray-900/98 backdrop-blur-sm border-r border-purple-500/20 z-50 flex flex-col transform transition-transform duration-300 ease-out ${mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'
                    }`}
            >
                {/* Mobile Logo + Close */}
                <div className="px-3 py-2 border-b border-purple-500/20 flex items-center justify-between gap-2">
                    <div className="flex-1 min-w-0">
                        <img src={logo} alt="HirePrep AI Logo" className="w-full max-w-[200px] h-auto object-contain rounded-xl" />
                    </div>
                    <button
                        onClick={onCloseMobileSidebar}
                        className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-xl transition-colors"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Mobile Navigation Items */}
                <nav className="flex-1 py-4 px-3 overflow-y-auto custom-scrollbar">
                    <ul className="space-y-1">
                        {menuItems.map((item) => (
                            <li key={item.id}>
                                <button
                                    onClick={() => onSectionChange(item.id)}
                                    className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 group ${activeSection === item.id
                                        ? 'bg-gradient-to-r from-purple-600/30 to-indigo-600/30 text-white border border-purple-500/30 shadow-lg shadow-purple-500/10'
                                        : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
                                        }`}
                                >
                                    <span className="text-xl flex-shrink-0">{item.icon}</span>
                                    <span className="font-medium">{item.label}</span>
                                    {activeSection === item.id && (
                                        <div className="ml-auto w-1.5 h-1.5 bg-purple-400 rounded-full"></div>
                                    )}
                                </button>
                            </li>
                        ))}
                    </ul>
                </nav>

                {/* Mobile Bottom Section */}
                <div className="p-4 border-t border-purple-500/20">
                    <div className="bg-gradient-to-r from-purple-600/20 to-indigo-600/20 rounded-xl p-3 border border-purple-500/20">
                        <p className="text-xs text-gray-400">Pro Tip</p>
                        <p className="text-sm text-white mt-1">Use AI Chat for personalized career advice!</p>
                    </div>
                </div>
            </aside>
        </>
    );
}

export default Sidebar;
