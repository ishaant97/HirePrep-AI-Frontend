import { useAuth } from '../../../context/AuthContext';
import { useResume } from '../../../context/ResumeContext';

const toPercent = (value) => {
    if (typeof value !== 'number' || Number.isNaN(value)) return null;
    const normalized = value <= 1 ? value * 100 : value;
    return Math.max(0, Math.min(100, Math.round(normalized)));
};

const matchLevel = (value) => {
    if (typeof value !== 'number') {
        return {
            label: 'No Data',
            chip: 'text-gray-300 bg-gray-500/10 border-gray-400/20',
        };
    }

    if (value >= 80) {
        return {
            label: 'Excellent',
            chip: 'text-emerald-300 bg-emerald-500/15 border-emerald-400/30',
        };
    }

    if (value >= 60) {
        return {
            label: 'Strong',
            chip: 'text-yellow-300 bg-yellow-500/15 border-yellow-400/30',
        };
    }

    if (value >= 40) {
        return {
            label: 'Improving',
            chip: 'text-orange-300 bg-orange-500/15 border-orange-400/30',
        };
    }

    return {
        label: 'Needs Work',
        chip: 'text-red-300 bg-red-500/15 border-red-400/30',
    };
};

function Overview({ onNavigate }) {
    const { user } = useAuth();
    const { analytics, analyticsStatus, analyticsLoading, analyticsError, activeResumeId } = useResume();

    const ml = analytics?.machine_learning_evaluation;
    const placement = ml?.placement_analysis;
    const ats = analytics?.ats_evaluation;
    const roadmap = analytics?.career_roadmap;

    const roleRecommendations = ml?.role_recommendations || ml?.role_recommedations || [];

    const normalizedRoleRecs = Array.isArray(roleRecommendations)
        ? roleRecommendations
            .map((item) => ({
                role: item?.role || item?.title || 'Role',
                score: toPercent(item?.skill_match_percent ?? item?.match_percentage ?? item?.score),
                rank: item?.rank,
            }))
            .sort((a, b) => {
                const aRank = typeof a.rank === 'number' ? a.rank : Number.MAX_SAFE_INTEGER;
                const bRank = typeof b.rank === 'number' ? b.rank : Number.MAX_SAFE_INTEGER;

                if (aRank !== bRank) return aRank - bRank;
                return (b.score ?? -1) - (a.score ?? -1);
            })
        : [];

    const topRole = normalizedRoleRecs[0];
    const placementPct = toPercent(placement?.final_probability);
    const atsScore = toPercent(ats?.ats_score);
    const topRoleMatch = topRole?.score ?? null;

    const phases = roadmap?.roadmap;
    const phaseCount = [
        phases?.short_term_0_3_months,
        phases?.mid_term_3_6_months,
        phases?.long_term_6_12_months,
    ].filter(Boolean).length;

    const availableSignals = [placementPct, atsScore, topRoleMatch].filter((value) => typeof value === 'number');
    const overallReadiness = availableSignals.length
        ? Math.round(availableSignals.reduce((sum, value) => sum + value, 0) / availableSignals.length)
        : null;

    const placementLevel = matchLevel(placementPct);
    const atsLevel = matchLevel(atsScore);
    const roleLevel = matchLevel(topRoleMatch);

    const readinessData = [
        {
            id: 'placement',
            title: 'Placement Probability',
            value: placementPct != null ? `${placementPct}%` : '--',
            icon: '📊',
            tone: 'from-cyan-500/25 to-blue-500/25 border-cyan-500/30',
            chip: placementLevel.chip,
            status: placementLevel.label,
            note: placement?.interpretation || 'Upload and process a resume to generate placement probability.',
        },
        {
            id: 'ats',
            title: 'ATS Resume Score',
            value: atsScore != null ? `${atsScore}/100` : '--',
            icon: '📄',
            tone: 'from-emerald-500/25 to-teal-500/25 border-emerald-500/30',
            chip: atsLevel.chip,
            status: atsLevel.label,
            note: atsScore != null
                ? 'ATS compatibility based on 10 resume quality criteria.'
                : 'ATS score will appear after analytics is completed.',
        },
        {
            id: 'jobs',
            title: 'Top Role Match',
            value: topRole
                ? `${topRole.role}${topRoleMatch != null ? ` (${topRoleMatch}%)` : ''}`
                : '--',
            icon: '💼',
            tone: 'from-violet-500/25 to-indigo-500/25 border-violet-500/30',
            chip: roleLevel.chip,
            status: roleLevel.label,
            note: topRole
                ? `Best-fit role based on current profile signals: ${topRole.role}.`
                : 'Role recommendations will appear once ML evaluation is available.',
        },
    ];

    const sectionCards = [
        {
            id: 'placement',
            icon: '🎯',
            title: 'Placement Probability',
            description: 'See your ML-based hiring probability and interpretation.',
            badge: 'Prediction Details',
        },
        {
            id: 'jobs',
            icon: '🧭',
            title: 'Job Role Suggestions',
            description: 'Review ranked role recommendations based on your profile.',
            badge: normalizedRoleRecs.length ? `${normalizedRoleRecs.length} Recommendations` : 'Awaiting Data',
        },
        {
            id: 'roadmap',
            icon: '🗺️',
            title: 'Career Roadmap',
            description: 'Follow short, mid, and long-term milestones.',
            badge: phaseCount ? `${phaseCount} Phases Ready` : 'Awaiting Data',
        },
        {
            id: 'ats',
            icon: '✅',
            title: 'ATS Resume Score',
            description: 'Track ATS strength across 10 resume quality criteria.',
            badge: 'Breakdown Insights',
        },
    ];

    return (
        <div className="space-y-6 pb-8">
            <div className="relative overflow-hidden rounded-3xl border border-purple-500/25 bg-gradient-to-r from-purple-600/15 via-indigo-600/10 to-cyan-600/15 p-5 sm:p-7">
                <div className="pointer-events-none absolute -top-24 -right-24 h-56 w-56 rounded-full bg-purple-500/20 blur-3xl" />
                <div className="pointer-events-none absolute -bottom-28 left-12 h-52 w-52 rounded-full bg-cyan-500/20 blur-3xl" />
                <div className="relative flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                    <div>
                        <h1 className="mt-2 text-2xl font-bold text-white sm:text-3xl">
                            Welcome back, {user?.name?.split(' ')[0] || 'User'}
                        </h1>
                        <p className="mt-2 max-w-2xl text-sm text-gray-300 sm:text-base">
                            This overview summarizes every analysis page so you can spot what to improve first and jump directly to the right section.
                        </p>
                        {analyticsLoading || analyticsStatus === 'pending' || analyticsStatus === 'processing' ? (
                            <p className="mt-3 text-xs text-cyan-300">Live analytics are currently processing for this resume.</p>
                        ) : null}
                        {analyticsError || analyticsStatus === 'failed' ? (
                            <p className="mt-3 text-xs text-red-300">{analyticsError || 'Analytics generation failed. Re-upload resume to retry.'}</p>
                        ) : null}
                    </div>

                    <div className="rounded-xl border border-gray-700/50 bg-gray-900/45 px-4 py-3 text-sm sm:min-w-[180px]">
                        <p className="text-gray-400">Overall Readiness</p>
                        <p className="mt-1 text-2xl font-semibold text-emerald-300">
                            {overallReadiness != null ? `${overallReadiness}%` : '--'}
                        </p>
                    </div>
                </div>
            </div>

            {!activeResumeId && (
                <div className="rounded-2xl border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-sm text-amber-200">
                    Select a resume from the navbar to see live overview analytics.
                </div>
            )}

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {readinessData.map((item) => (
                    <div
                        key={item.id}
                        className={`rounded-2xl border bg-gradient-to-br p-4 ${item.tone} transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-purple-500/10`}
                    >
                        <div className="flex items-start justify-between gap-3">
                            <div className="min-w-0">
                                <p className="text-xs uppercase tracking-wider text-gray-400">{item.title}</p>
                                <p className="mt-2 text-xl font-bold text-white">{item.value}</p>
                                <span className={`mt-2 inline-flex rounded-full border px-2 py-0.5 text-xs ${item.chip}`}>
                                    {item.status}
                                </span>
                            </div>
                            <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-gray-900/55 text-2xl shadow-md">
                                {item.icon}
                            </div>
                        </div>
                        <p className="mt-3 text-xs leading-relaxed text-gray-300">{item.note}</p>
                    </div>
                ))}
            </div>

            <div className="rounded-2xl border border-gray-700/40 bg-gray-800/40 p-5 sm:p-6">
                <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <h2 className="text-lg font-semibold text-white">Section Snapshots</h2>
                    <p className="text-xs text-gray-400">Quickly move into a detailed analysis page</p>
                </div>

                <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                    {sectionCards.map((section) => (
                        <button
                            key={section.id}
                            onClick={() => onNavigate?.(section.id)}
                            className="group rounded-xl border border-gray-700/40 bg-gray-900/35 p-4 text-left transition-all hover:-translate-y-0.5 hover:border-purple-500/35 hover:bg-gray-900/60"
                        >
                            <div className="flex items-start justify-between gap-3">
                                <div className="flex items-start gap-3">
                                    <div className="mt-0.5 flex h-10 w-10 items-center justify-center rounded-lg bg-gray-800/80 text-xl">
                                        {section.icon}
                                    </div>
                                    <div className="min-w-0">
                                        <p className="text-sm font-semibold text-white">{section.title}</p>
                                        <p className="mt-1 text-xs leading-relaxed text-gray-400">{section.description}</p>
                                    </div>
                                </div>
                                <span className="rounded-full border border-gray-600/50 bg-gray-800/70 px-2 py-0.5 text-[11px] text-gray-300">
                                    {section.badge}
                                </span>
                            </div>

                            <div className="mt-3 flex items-center gap-1 text-xs text-purple-300 opacity-90 group-hover:text-purple-200">
                                Open section
                                <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </div>
                        </button>
                    ))}
                </div>
            </div>

        </div>
    );
}

export default Overview;
