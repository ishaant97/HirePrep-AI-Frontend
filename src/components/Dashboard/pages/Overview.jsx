import { useAuth } from '../../../context/AuthContext';

function Overview() {
    const { user } = useAuth();

    const statsCards = [
        {
            title: 'Placement Probability',
            value: '78%',
            icon: '🎯',
            color: 'from-purple-500 to-indigo-600',
            trend: '+5% from last week',
            trendUp: true,
        },
        {
            title: 'ATS Score',
            value: '85/100',
            icon: '📄',
            color: 'from-blue-500 to-cyan-500',
            trend: 'Good score',
            trendUp: true,
        },
        {
            title: 'Skills Matched',
            value: '12/18',
            icon: '🧠',
            color: 'from-green-500 to-emerald-500',
            trend: '6 skills to improve',
            trendUp: false,
        },
        {
            title: 'Interview Ready',
            value: '65%',
            icon: '🎤',
            color: 'from-orange-500 to-amber-500',
            trend: 'Practice more',
            trendUp: false,
        },
    ];

    const topJobRoles = [
        { role: 'Full Stack Developer', match: 92 },
        { role: 'Backend Engineer', match: 87 },
        { role: 'Software Engineer', match: 50 },
    ];

    // const recentActivity = [
    //     { action: 'Resume analyzed', time: '2 hours ago', icon: '📄' },
    //     { action: 'Skill gap updated', time: '5 hours ago', icon: '🧠' },
    //     { action: 'Interview questions generated', time: '1 day ago', icon: '🎤' },
    // ];

    return (
        <div className="space-y-6">
            {/* Welcome Section */}
            <div className="bg-gradient-to-r from-purple-600/20 to-indigo-600/20 border border-purple-500/30 rounded-2xl p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
                    <div>
                        <h1 className="text-xl sm:text-2xl font-bold text-white">
                            Welcome back, {user?.name?.split(' ')[0] || 'User'}!
                        </h1>
                        <p className="text-sm text-gray-400 mt-1">
                            Here's your career readiness overview for today.
                        </p>
                    </div>
                    {/* <button className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-xl transition-colors flex items-center gap-2 w-fit">
                        <span>View Full Report</span>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button> */}
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                {statsCards.map((card, index) => (
                    <div
                        key={index}
                        className="bg-gray-800/50 border border-gray-700/50 rounded-2xl p-4 sm:p-5 hover:border-purple-500/30 transition-all hover:shadow-lg hover:shadow-purple-500/5 cursor-pointer group"
                    >
                        <div className="flex items-start justify-between">
                            <div>
                                <p className="text-gray-400 text-xs sm:text-sm">{card.title}</p>
                                <p className="text-2xl sm:text-3xl font-bold text-white mt-1 sm:mt-2">{card.value}</p>
                                {/* <div className={`flex items-center gap-1 mt-2 text-xs ${card.trendUp ? 'text-green-400' : 'text-yellow-400'}`}>
                                    {card.trendUp ? (
                                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                                        </svg>
                                    ) : (
                                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    )}
                                    <span>{card.trend}</span>
                                </div> */}
                            </div>
                            <div className={`w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br ${card.color} rounded-xl flex items-center justify-center text-xl sm:text-2xl shadow-lg group-hover:scale-110 transition-transform`}>
                                {card.icon}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Bottom Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
                {/* Top Job Roles */}
                <div className="bg-gray-800/50 border border-gray-700/50 rounded-2xl p-4 sm:p-5">
                    <h3 className="text-white font-semibold mb-3 sm:mb-4 flex items-center gap-2">
                        <span className="text-xl">💼</span>
                        Top Job Matches
                    </h3>
                    <div className="space-y-3">
                        {topJobRoles.map((job, index) => (
                            <div key={index} className="flex items-center justify-between gap-2">
                                <span className="text-gray-300 text-sm truncate">{job.role}</span>
                                <div className="flex items-center gap-2">
                                    <div className="w-24 h-2 bg-gray-700 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full"
                                            style={{ width: `${job.match}%` }}
                                        ></div>
                                    </div>
                                    <span className="text-purple-400 text-sm font-medium w-10">{job.match}%</span>
                                </div>
                            </div>
                        ))}
                    </div>
                    <button className="mt-4 text-purple-400 hover:text-purple-300 text-sm flex items-center gap-1 transition-colors">
                        View all suggestions
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>

                {/* Skill Progress */}
                <div className="bg-gray-800/50 border border-gray-700/50 rounded-2xl p-4 sm:p-5">
                    <h3 className="text-white font-semibold mb-3 sm:mb-4 flex items-center gap-2">
                        <span className="text-xl">🧠</span>
                        Skill Overview
                    </h3>
                    <div className="relative w-40 h-40 mx-auto">
                        <svg className="transform -rotate-90" viewBox="0 0 100 100">
                            <circle
                                className="text-gray-700"
                                strokeWidth="8"
                                stroke="currentColor"
                                fill="transparent"
                                r="42"
                                cx="50"
                                cy="50"
                            />
                            <circle
                                className="text-purple-500"
                                strokeWidth="8"
                                strokeLinecap="round"
                                stroke="currentColor"
                                fill="transparent"
                                r="42"
                                cx="50"
                                cy="50"
                                strokeDasharray={`${(67 / 100) * 264} 264`}
                            />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <span className="text-3xl font-bold text-white">67%</span>
                            <span className="text-gray-400 text-sm">Skills Ready</span>
                        </div>
                    </div>
                    <button className="mt-4 w-full text-center text-purple-400 hover:text-purple-300 text-sm transition-colors">
                        View skill gap analysis
                    </button>
                </div>

                {/* Recent Activity */}
                {/* <div className="bg-gray-800/50 border border-gray-700/50 rounded-2xl p-5">
                    <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                        <span className="text-xl">📈</span>
                        Recent Activity
                    </h3>
                    <div className="space-y-4">
                        {recentActivity.map((activity, index) => (
                            <div key={index} className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-gray-700/50 rounded-xl flex items-center justify-center text-lg">
                                    {activity.icon}
                                </div>
                                <div>
                                    <p className="text-gray-200 text-sm">{activity.action}</p>
                                    <p className="text-gray-500 text-xs">{activity.time}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <button className="mt-4 text-purple-400 hover:text-purple-300 text-sm flex items-center gap-1 transition-colors">
                        View all activity
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </div> */}
            </div>
        </div>
    );
}

export default Overview;
