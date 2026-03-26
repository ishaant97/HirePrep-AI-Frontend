import { useResume } from '../../../context/ResumeContext';

const toneByMatch = (score) => {
    if (score >= 80) return { text: 'text-emerald-300', bar: 'bg-emerald-500', badge: 'bg-emerald-500/15 border-emerald-400/30' };
    if (score >= 60) return { text: 'text-yellow-300', bar: 'bg-yellow-500', badge: 'bg-yellow-500/15 border-yellow-400/30' };
    if (score >= 40) return { text: 'text-orange-300', bar: 'bg-orange-500', badge: 'bg-orange-500/15 border-orange-400/30' };
    return { text: 'text-red-300', bar: 'bg-red-500', badge: 'bg-red-500/15 border-red-400/30' };
};

const toPercent = (value) => {
    if (typeof value !== 'number' || Number.isNaN(value)) return null;
    const normalized = value <= 1 ? value * 100 : value;
    return Math.max(0, Math.min(100, Math.round(normalized)));
};

const parseList = (value) => {
    if (!value) return [];
    if (Array.isArray(value)) return value.filter(Boolean).map((item) => String(item));
    if (typeof value === 'string') return [value];
    return [];
};

const normalizeRecommendations = (recommendations) => {
    if (!Array.isArray(recommendations)) return [];

    return recommendations.map((item, index) => {
        const role = item?.role || item?.title || `Role ${index + 1}`;
        const match = toPercent(item?.skill_match_percent ?? item?.match_percentage ?? item?.score);

        return {
            id: item?._id || `${role}-${index}`,
            rank: item?.rank || index + 1,
            role,
            experienceLevel: item?.experience_level || 'Not specified',
            match,
            matchedSkills: parseList(item?.matched_skills),
            skillsToLearn: parseList(item?.skills_to_learn),
        };
    });
};

function SkillPills({ title, items, tone = 'neutral' }) {
    if (!items?.length) return null;

    const color = tone === 'good'
        ? 'bg-emerald-500/15 text-emerald-300 border-emerald-400/25'
        : tone === 'warn'
            ? 'bg-rose-500/15 text-rose-300 border-rose-400/25'
            : 'bg-gray-700/40 text-gray-300 border-gray-600/40';

    return (
        <div>
            <p className="text-xs uppercase tracking-wider text-gray-500 mb-2">{title}</p>
            <div className="flex flex-wrap gap-2">
                {items.map((item, idx) => (
                    <span key={`${item}-${idx}`} className={`text-xs px-2.5 py-1 rounded-full border ${color}`}>
                        {item}
                    </span>
                ))}
            </div>
        </div>
    );
}

function JobRoles() {
    const { analytics, analyticsStatus, analyticsLoading, analyticsError, activeResumeId } = useResume();

    const ml = analytics?.machine_learning_evaluation;
    const roleRecommendations = ml?.role_recommendations || ml?.role_recommedations;
    const roles = normalizeRecommendations(roleRecommendations);

    if (analyticsLoading || analyticsStatus === 'pending' || analyticsStatus === 'processing') {
        return (
            <div className="space-y-6 pb-8">
                <div>
                    <h1 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2 sm:gap-3">
                        <span className="text-2xl sm:text-3xl">💼</span>
                        Job Role Suggestions
                    </h1>
                    <p className="text-gray-400 mt-1">ML-based role recommendations aligned with your profile</p>
                </div>

                <div className="flex flex-col items-center justify-center py-16 space-y-6">
                    <div className="relative w-24 h-24">
                        <div className="w-24 h-24 border-4 border-blue-500/20 border-t-blue-400 rounded-full animate-spin" />
                        <div className="absolute inset-0 flex items-center justify-center text-2xl">🧭</div>
                    </div>
                    <div className="text-center space-y-2">
                        <h2 className="text-lg font-semibold text-white">Finding your best-fit roles...</h2>
                        <p className="text-gray-400 text-sm max-w-md">
                            We are ranking roles based on your resume signals, domain fit, and skill overlap.
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    if (!activeResumeId) {
        return (
            <div className="space-y-6">
                <div>
                    <h1 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2 sm:gap-3">
                        <span className="text-2xl sm:text-3xl">💼</span>
                        Job Role Suggestions
                    </h1>
                    <p className="text-gray-400 mt-1">ML-based role recommendations aligned with your profile</p>
                </div>
                <div className="flex flex-col items-center justify-center py-16 sm:py-32 space-y-4">
                    <div className="w-20 h-20 bg-gray-800/60 rounded-2xl flex items-center justify-center text-4xl">📄</div>
                    <h2 className="text-xl font-semibold text-white">No Resume Selected</h2>
                    <p className="text-gray-400 text-sm max-w-sm text-center">Select a resume from the navbar to view role recommendations.</p>
                </div>
            </div>
        );
    }

    if (analyticsError || analyticsStatus === 'failed') {
        return (
            <div className="flex flex-col items-center justify-center py-16 sm:py-32 space-y-4">
                <div className="w-20 h-20 bg-red-500/10 rounded-2xl flex items-center justify-center text-4xl">⚠️</div>
                <h2 className="text-xl font-semibold text-white">Analytics Generation Failed</h2>
                <p className="text-gray-400 text-sm max-w-sm text-center">
                    {analyticsError || 'Analytics generation failed. Please try uploading your resume again.'}
                </p>
            </div>
        );
    }

    if (!ml || !roles.length) {
        return (
            <div className="flex flex-col items-center justify-center py-16 sm:py-32 space-y-4">
                <div className="w-20 h-20 bg-gray-800/60 rounded-2xl flex items-center justify-center text-4xl">🧭</div>
                <h2 className="text-xl font-semibold text-white">No Role Recommendations Yet</h2>
                <p className="text-gray-400 text-sm max-w-sm text-center">Role recommendation data is not available for this resume yet.</p>
            </div>
        );
    }

    return (
        <div className="space-y-6 pb-8">
            <div>
                <h1 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2 sm:gap-3">
                    <span className="text-2xl sm:text-3xl">💼</span>
                    Job Role Suggestions
                </h1>
                <p className="text-gray-400 mt-1">ML-based role recommendations aligned with your profile</p>
            </div>

            <div className="relative bg-gray-800/45 border border-gray-700/40 rounded-2xl p-6 overflow-hidden">
                <div className="absolute -top-16 -right-12 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
                <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-blue-500/15 border border-blue-400/20 flex items-center justify-center text-2xl">🏁</div>
                    <div>
                        <p className="text-xs text-gray-400 uppercase tracking-wider font-medium">Recommendation Engine</p>
                        <p className="text-lg font-semibold text-white">Top {roles.length} Career Matches</p>
                    </div>
                    <span className="lg:ml-auto text-xs text-blue-300 bg-blue-500/15 border border-blue-400/20 px-3 py-1.5 rounded-full">
                        Ranked by skill match
                    </span>
                </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                {roles.map((role) => {
                    const tone = toneByMatch(role.match ?? 0);

                    return (
                        <div key={role.id} className="bg-gray-800/45 border border-gray-700/40 rounded-2xl p-5">
                            <div className="flex items-start gap-3">
                                <div className="w-9 h-9 rounded-lg bg-gray-700/60 flex items-center justify-center text-sm font-bold text-gray-200">
                                    #{role.rank}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex flex-wrap items-center gap-2">
                                        <h3 className="text-white font-semibold text-lg leading-tight">{role.role}</h3>
                                        {typeof role.match === 'number' && (
                                            <span className={`text-xs px-2.5 py-1 rounded-full border ${tone.badge} ${tone.text}`}>
                                                {role.match}% Match
                                            </span>
                                        )}
                                        <span className="text-xs px-2.5 py-1 rounded-full border border-gray-700/50 text-gray-300 bg-gray-800/65">
                                            {role.experienceLevel}
                                        </span>
                                    </div>
                                    {typeof role.match === 'number' && (
                                        <div className="mt-3 h-2.5 bg-gray-700/50 rounded-full overflow-hidden">
                                            <div className={`h-full ${tone.bar} rounded-full transition-all duration-700 ease-out`} style={{ width: `${role.match}%` }} />
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="mt-4 space-y-3">
                                <SkillPills title="Matched Skills" items={role.matchedSkills} tone="good" />
                                <SkillPills title="Skills To Learn" items={role.skillsToLearn} tone="warn" />
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="bg-gray-800/30 border border-gray-700/30 rounded-2xl p-4 text-sm text-gray-400">
                Recommendations update from your current resume snapshot. Add missing skills, projects, and role-specific keywords to improve ranking.
            </div>
        </div>
    );
}

export default JobRoles;
