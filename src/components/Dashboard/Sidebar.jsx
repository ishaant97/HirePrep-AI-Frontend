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

function Sidebar({ activeSection, onSectionChange, isCollapsed, onToggleCollapse }) {
    return (
        <aside
            className={`fixed left-0 top-0 h-screen bg-gray-900/95 backdrop-blur-sm border-r border-purple-500/20 transition-all duration-300 z-40 flex flex-col overflow-visible ${isCollapsed ? 'w-20' : 'w-72'
                }`}
        >
            {/* Logo Section */}
            <div className="p-4 border-b border-purple-500/20">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/30">
                        <span className="text-white font-bold text-lg">H</span>
                    </div>
                    {!isCollapsed && (
                        <div>
                            <h1 className="text-white font-bold text-lg">HirePrep</h1>
                            <p className="text-gray-400 text-xs">Career Assistant</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Toggle Button */}
            <button
                onClick={onToggleCollapse}
                className="absolute -right-5 top-20 flex items-center justify-center w-10 h-10 bg-gray-900 rounded-xl border border-purple-500/30 text-white hover:border-purple-500 hover:bg-gray-800 transition-all duration-200 shadow-lg shadow-purple-500/20 hover:shadow-purple-500/40 group"
            >
                <div className="flex items-center gap-0.5">
                    {/* Dotted lines */}
                    <span className={`flex gap-0.5 transition-opacity duration-200 ${isCollapsed ? 'opacity-0 w-0' : 'opacity-100'}`}>
                        <span className="w-1 h-1 bg-purple-400 rounded-full"></span>
                        <span className="w-1 h-1 bg-purple-400 rounded-full"></span>
                    </span>
                    {/* Arrow */}
                    <svg
                        className={`w-5 h-5 text-purple-400 group-hover:text-purple-300 transition-transform duration-300 ${isCollapsed ? 'rotate-180' : ''}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                    </svg>
                    {/* Dotted lines (right side, visible when collapsed) */}
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
    );
}

export default Sidebar;
