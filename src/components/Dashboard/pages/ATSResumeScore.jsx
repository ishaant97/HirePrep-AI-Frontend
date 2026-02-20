import { useResume } from '../../../context/ResumeContext';

/* ── helpers ── */
const scoreColor = (pct) => {
    if (pct >= 80) return { text: 'text-emerald-400', bg: 'bg-emerald-500', ring: 'stroke-emerald-400', label: 'Excellent' };
    if (pct >= 60) return { text: 'text-yellow-400', bg: 'bg-yellow-500', ring: 'stroke-yellow-400', label: 'Good' };
    if (pct >= 40) return { text: 'text-orange-400', bg: 'bg-orange-500', ring: 'stroke-orange-400', label: 'Average' };
    return { text: 'text-red-400', bg: 'bg-red-500', ring: 'stroke-red-400', label: 'Needs Work' };
};

const breakdownMeta = {
    section_completeness: { label: 'Section Completeness', max: 10, icon: '📋' },
    contact_score: { label: 'Contact Info', max: 5, icon: '📞' },
    chronology_score: { label: 'Chronology', max: 10, icon: '📅' },
    experience_quality: { label: 'Experience Quality', max: 15, icon: '💼' },
    quantification_score: { label: 'Quantification', max: 10, icon: '📊' },
    action_verbs_score: { label: 'Action Verbs', max: 10, icon: '⚡' },
    skills_score: { label: 'Skills', max: 10, icon: '🛠️' },
    readability_score: { label: 'Readability', max: 10, icon: '👁️' },
    education_score: { label: 'Education', max: 5, icon: '🎓' },
    role_alignment_score: { label: 'Role Alignment', max: 15, icon: '🎯' },
};

/* ── circular score ring ── */
function ScoreRing({ score }) {
    const radius = 70;
    const stroke = 10;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (score / 100) * circumference;
    const { text, ring, label } = scoreColor(score);

    return (
        <div className="relative w-44 h-44 mx-auto">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 160 160">
                <circle cx="80" cy="80" r={radius} fill="none" stroke="currentColor"
                    strokeWidth={stroke} className="text-gray-700/40" />
                <circle cx="80" cy="80" r={radius} fill="none"
                    strokeWidth={stroke} strokeLinecap="round"
                    strokeDasharray={circumference} strokeDashoffset={offset}
                    className={`${ring} transition-all duration-1000 ease-out`} />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className={`text-4xl font-bold ${text}`}>{score}</span>
                <span className="text-gray-400 text-xs mt-1">{label}</span>
            </div>
        </div>
    );
}

/* ── breakdown bar ── */
function BreakdownBar({ name, value }) {
    const meta = breakdownMeta[name] || { label: name, max: 10, icon: '📌' };
    const pct = Math.round((value / meta.max) * 100);
    const { bg } = scoreColor(pct);

    return (
        <div className="group">
            <div className="flex items-center justify-between mb-1.5">
                <span className="text-sm text-gray-300 flex items-center gap-2">
                    <span className="text-base">{meta.icon}</span>
                    {meta.label}
                </span>
                <span className="text-sm font-semibold text-gray-200">
                    {value}<span className="text-gray-500 font-normal">/{meta.max}</span>
                </span>
            </div>
            <div className="h-2.5 bg-gray-700/50 rounded-full overflow-hidden">
                <div
                    className={`h-full ${bg} rounded-full transition-all duration-700 ease-out`}
                    style={{ width: `${pct}%` }}
                />
            </div>
        </div>
    );
}

/* ── list card (strengths / weaknesses / suggestions) ── */
function ListCard({ title, items, icon, accentFrom, accentTo, dotColor }) {
    return (
        <div className="bg-gray-800/40 border border-gray-700/40 rounded-2xl overflow-hidden">
            <div className={`px-5 py-4 bg-gradient-to-r ${accentFrom} ${accentTo} border-b border-gray-700/30 flex items-center gap-3`}>
                <span className="text-xl">{icon}</span>
                <h3 className="text-white font-semibold">{title}</h3>
                <span className="ml-auto text-xs text-gray-400 bg-gray-800/60 px-2.5 py-0.5 rounded-full">{items.length}</span>
            </div>
            <ul className="p-5 space-y-3">
                {items.map((item, i) => (
                    <li key={i} className="flex gap-3 text-sm text-gray-300 leading-relaxed">
                        <span className={`mt-1.5 w-2 h-2 rounded-full ${dotColor} flex-shrink-0`} />
                        {item}
                    </li>
                ))}
            </ul>
        </div>
    );
}

/* ── main component ── */
function ATSResumeScore() {
    const { analytics, analyticsLoading, analyticsError, activeResumeId } = useResume();

    const ats = analytics?.ats_evaluation;

    /* ── loading ── */
    if (analyticsLoading) {
        return (
            <div className="flex flex-col items-center justify-center py-32 space-y-4">
                <div className="w-12 h-12 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin" />
                <p className="text-gray-400">Analyzing your resume…</p>
            </div>
        );
    }

    /* ── no resume selected ── */
    if (!activeResumeId) {
        return (
            <div className="flex flex-col items-center justify-center py-32 space-y-4">
                <div className="w-20 h-20 bg-gray-800/60 rounded-2xl flex items-center justify-center text-4xl">📄</div>
                <h2 className="text-xl font-semibold text-white">No Resume Selected</h2>
                <p className="text-gray-400 text-sm max-w-sm text-center">Select a resume from the navbar to view its ATS evaluation.</p>
            </div>
        );
    }

    /* ── error ── */
    if (analyticsError) {
        return (
            <div className="flex flex-col items-center justify-center py-32 space-y-4">
                <div className="w-20 h-20 bg-red-500/10 rounded-2xl flex items-center justify-center text-4xl">⚠️</div>
                <h2 className="text-xl font-semibold text-white">Failed to Load Analytics</h2>
                <p className="text-gray-400 text-sm max-w-sm text-center">{analyticsError}</p>
            </div>
        );
    }

    /* ── no ATS data yet ── */
    if (!ats) {
        return (
            <div className="flex flex-col items-center justify-center py-32 space-y-4">
                <div className="w-20 h-20 bg-gray-800/60 rounded-2xl flex items-center justify-center text-4xl">📊</div>
                <h2 className="text-xl font-semibold text-white">No ATS Evaluation Yet</h2>
                <p className="text-gray-400 text-sm max-w-sm text-center">ATS evaluation data is not available for this resume yet.</p>
            </div>
        );
    }

    const { ats_score, breakdown, role_analysis, strengths, weaknesses, improvement_suggestions } = ats;

    return (
        <div className="space-y-6 pb-8">
            {/* ── Header ── */}
            <div>
                <h1 className="text-2xl font-bold text-white flex items-center gap-3">
                    <span className="text-3xl">📄</span>
                    ATS Resume Score
                </h1>
                <p className="text-gray-400 mt-1">Detailed ATS compatibility analysis of your resume</p>
            </div>

            {/* ── Top Row: Score Ring + Role Analysis ── */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Score Card */}
                <div className="lg:col-span-1 bg-gray-800/40 border border-gray-700/40 rounded-2xl p-6 flex flex-col items-center justify-center">
                    <p className="text-gray-400 text-sm mb-4 font-medium tracking-wide uppercase">Overall Score</p>
                    <ScoreRing score={ats_score} />
                    <p className="mt-4 text-gray-500 text-xs text-center">Out of 100 based on 10 criteria</p>
                </div>

                {/* Breakdown */}
                <div className="lg:col-span-2 bg-gray-800/40 border border-gray-700/40 rounded-2xl p-6">
                    <div className="flex items-center justify-between mb-5">
                        <h3 className="text-white font-semibold flex items-center gap-2">
                            <span className="text-lg">📊</span> Score Breakdown
                        </h3>
                        {role_analysis && (
                            <div className="flex items-center gap-2 px-3 py-1.5 bg-purple-500/10 border border-purple-500/20 rounded-xl">
                                <span className="text-xs text-gray-400">Role:</span>
                                <span className="text-sm font-medium text-purple-300">{role_analysis.desired_role}</span>
                                <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-400 font-medium">
                                    {role_analysis.role_match_level}
                                </span>
                            </div>
                        )}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                        {breakdown && Object.entries(breakdown).map(([key, value]) => (
                            <BreakdownBar key={key} name={key} value={value} />
                        ))}
                    </div>
                </div>
            </div>

            {/* ── Strengths / Weaknesses / Suggestions ── */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {strengths?.length > 0 && (
                    <ListCard
                        title="Strengths"
                        items={strengths}
                        icon="💪"
                        accentFrom="from-emerald-600/10"
                        accentTo="to-teal-600/10"
                        dotColor="bg-emerald-400"
                    />
                )}
                {weaknesses?.length > 0 && (
                    <ListCard
                        title="Weaknesses"
                        items={weaknesses}
                        icon="⚠️"
                        accentFrom="from-amber-600/10"
                        accentTo="to-orange-600/10"
                        dotColor="bg-amber-400"
                    />
                )}
                {improvement_suggestions?.length > 0 && (
                    <ListCard
                        title="Suggestions"
                        items={improvement_suggestions}
                        icon="💡"
                        accentFrom="from-purple-600/10"
                        accentTo="to-indigo-600/10"
                        dotColor="bg-purple-400"
                    />
                )}
            </div>
        </div>
    );
}

export default ATSResumeScore;
