import { useResume } from '../../../context/ResumeContext';

const scoreTone = (value) => {
    if (value >= 80) return { text: 'text-emerald-300', bar: 'bg-emerald-500', ring: 'stroke-emerald-400', chip: 'bg-emerald-500/15 border-emerald-400/25 text-emerald-300', label: 'High' };
    if (value >= 60) return { text: 'text-yellow-300', bar: 'bg-yellow-500', ring: 'stroke-yellow-400', chip: 'bg-yellow-500/15 border-yellow-400/25 text-yellow-300', label: 'Moderate' };
    if (value >= 40) return { text: 'text-orange-300', bar: 'bg-orange-500', ring: 'stroke-orange-400', chip: 'bg-orange-500/15 border-orange-400/25 text-orange-300', label: 'Improving' };
    return { text: 'text-red-300', bar: 'bg-red-500', ring: 'stroke-red-400', chip: 'bg-red-500/15 border-red-400/25 text-red-300', label: 'Low' };
};

const toPercent = (value) => {
    if (typeof value !== 'number' || Number.isNaN(value)) return null;
    const normalized = value <= 1 ? value * 100 : value;
    return Math.max(0, Math.min(100, Math.round(normalized)));
};

const asCount = (value) => (typeof value === 'number' && Number.isFinite(value) ? Math.max(0, Math.round(value)) : 0);

function ScoreRing({ score }) {
    const safeScore = typeof score === 'number' ? score : 0;
    const radius = 70;
    const stroke = 10;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (safeScore / 100) * circumference;
    const tone = scoreTone(safeScore);

    return (
        <div className="relative w-44 h-44 mx-auto">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 160 160">
                <circle
                    cx="80"
                    cy="80"
                    r={radius}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={stroke}
                    className="text-gray-700/40"
                />
                <circle
                    cx="80"
                    cy="80"
                    r={radius}
                    fill="none"
                    strokeWidth={stroke}
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    className={`${tone.ring} transition-all duration-1000 ease-out`}
                />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className={`text-4xl font-bold ${tone.text}`}>{safeScore}%</span>
            </div>
        </div>
    );
}

function MetricBar({ title, value, maxValue, showPercent = false, color = 'bg-cyan-500' }) {
    const safeValue = asCount(value);
    const safeMax = Math.max(1, asCount(maxValue));
    const width = Math.max(0, Math.min(100, Math.round((safeValue / safeMax) * 100)));

    return (
        <div className="space-y-1.5">
            <div className="flex items-center justify-between">
                <p className="text-sm text-gray-300 font-medium">{title}</p>
                <p className="text-sm font-semibold text-gray-200">
                    {safeValue}
                    {showPercent ? '%' : ''}
                </p>
            </div>
            <div className="h-2.5 bg-gray-700/50 rounded-full overflow-hidden">
                <div className={`${color} h-full rounded-full transition-all duration-700 ease-out`} style={{ width: `${width}%` }} />
            </div>
        </div>
    );
}

function CountCard({ title, value, accent = 'text-gray-200' }) {
    return (
        <div className="rounded-xl border border-gray-700/50 bg-gray-800/55 px-4 py-3">
            <p className="text-[11px] uppercase tracking-wider text-gray-500 font-medium">{title}</p>
            <p className={`text-lg font-semibold mt-1 ${accent}`}>{value}</p>
        </div>
    );
}

function SkillList({ title, items, tone = 'neutral' }) {
    const palette = tone === 'good'
        ? 'bg-emerald-500/15 text-emerald-300 border-emerald-400/25'
        : tone === 'warn'
            ? 'bg-red-500/15 text-red-300 border-red-400/25'
            : tone === 'info'
                ? 'bg-blue-500/15 text-blue-300 border-blue-400/25'
                : 'bg-gray-700/40 text-gray-300 border-gray-600/40';

    if (!items?.length) {
        return (
            <div>
                <p className="text-sm text-gray-200 font-semibold mb-2">{title}</p>
                <p className="text-xs text-gray-500">No items available</p>
            </div>
        );
    }

    return (
        <div>
            <p className="text-sm text-gray-200 font-semibold mb-2">{title}</p>
            <div className="flex flex-wrap gap-2">
                {items.map((item, i) => (
                    <span key={`${item}-${i}`} className={`text-xs px-2.5 py-1 rounded-full border ${palette}`}>
                        {item}
                    </span>
                ))}
            </div>
        </div>
    );
}

function PlacementProbability() {
    const { analytics, analyticsStatus, analyticsLoading, analyticsError, activeResumeId } = useResume();

    const ml = analytics?.machine_learning_evaluation;
    const placement = ml?.placement_analysis;
    const skills = ml?.skill_analysis;

    const probability = toPercent(placement?.final_probability);
    const interpretation = placement?.interpretation;

    const desiredRole = skills?.desired_role || 'Not specified';
    const experienceLevel = skills?.experience_level || 'Not specified';
    const totalSkillsInResume = asCount(skills?.total_skills_in_resume);
    const skillMatchPercent = toPercent(skills?.skill_match_percent) ?? 0;
    const matchedSkills = Array.isArray(skills?.matched_skills) ? skills.matched_skills : [];
    const missingSkills = Array.isArray(skills?.missing_skills) ? skills.missing_skills : [];
    const allSkills = Array.isArray(ml?.skills) ? ml.skills : [];
    const matchedCount = asCount(skills?.matched_count);
    const missingCount = asCount(skills?.missing_count);

    const normalizedMatchedSkills = new Set(
        matchedSkills
            .filter((skill) => typeof skill === 'string')
            .map((skill) => skill.trim().toLowerCase())
    );
    const bonusSkills = allSkills.filter(
        (skill) => typeof skill === 'string' && !normalizedMatchedSkills.has(skill.trim().toLowerCase())
    );

    if (analyticsLoading || analyticsStatus === 'pending' || analyticsStatus === 'processing') {
        return (
            <div className="space-y-6 pb-8">
                <div>
                    <h1 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2 sm:gap-3">
                        <span className="text-2xl sm:text-3xl">📊</span>
                        Placement Probability
                    </h1>
                    <p className="text-gray-400 mt-1">AI-powered prediction of your placement chances</p>
                </div>

                <div className="flex flex-col items-center justify-center py-16 space-y-6">
                    <div className="relative w-24 h-24">
                        <div className="w-24 h-24 border-4 border-cyan-500/20 border-t-cyan-400 rounded-full animate-spin" />
                        <div className="absolute inset-0 flex items-center justify-center text-2xl">🧠</div>
                    </div>
                    <div className="text-center space-y-2">
                        <h2 className="text-lg font-semibold text-white">Generating placement insights...</h2>
                        <p className="text-gray-400 text-sm max-w-md">
                            We are analyzing your resume signal quality and skill alignment for role-level placement readiness.
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
                        <span className="text-2xl sm:text-3xl">📊</span>
                        Placement Probability
                    </h1>
                    <p className="text-gray-400 mt-1">AI-powered prediction of your placement chances</p>
                </div>
                <div className="flex flex-col items-center justify-center py-16 sm:py-32 space-y-4">
                    <div className="w-20 h-20 bg-gray-800/60 rounded-2xl flex items-center justify-center text-4xl">📄</div>
                    <h2 className="text-xl font-semibold text-white">No Resume Selected</h2>
                    <p className="text-gray-400 text-sm max-w-sm text-center">Select a resume from the navbar to view your placement probability.</p>
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

    if (!ml || !placement || !skills) {
        return (
            <div className="flex flex-col items-center justify-center py-16 sm:py-32 space-y-4">
                <div className="w-20 h-20 bg-gray-800/60 rounded-2xl flex items-center justify-center text-4xl">📈</div>
                <h2 className="text-xl font-semibold text-white">No Placement Analysis Yet</h2>
                <p className="text-gray-400 text-sm max-w-sm text-center">Placement insights are not available for this resume yet.</p>
            </div>
        );
    }

    return (
        <div className="space-y-6 pb-8">
            <div>
                <h1 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2 sm:gap-3">
                    <span className="text-2xl sm:text-3xl">📊</span>
                    Placement Probability
                </h1>
                <p className="text-gray-400 mt-1">AI-powered prediction of your placement chances</p>
            </div>

            <div className="relative bg-gray-800/45 border border-gray-700/40 rounded-2xl p-6 overflow-hidden">
                <div className="absolute -top-16 -right-12 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
                <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-cyan-500/15 border border-cyan-400/20 flex items-center justify-center text-2xl">🎯</div>
                    <div>
                        <p className="text-xs text-gray-400 uppercase tracking-wider font-medium">Placement Interpretation</p>
                        <p className="text-base sm:text-lg font-semibold text-white">{interpretation || 'Prediction generated successfully.'}</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1 bg-gray-800/45 border border-gray-700/40 rounded-2xl p-6 flex flex-col items-center justify-center">
                    <p className="text-gray-400 text-sm mb-4 font-medium tracking-wide uppercase">Estimated Placement Odds</p>
                    <ScoreRing score={probability ?? 0} />
                    <p className="mt-4 text-gray-500 text-xs text-center">Final probability from machine learning evaluation</p>
                </div>

                <div className="lg:col-span-2 bg-gray-800/45 border border-gray-700/40 rounded-2xl p-6 space-y-5">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                        <h3 className="text-white font-semibold flex items-center gap-2">
                            <span className="text-lg">🛠️</span>
                            Skill Readiness Analysis
                        </h3>
                        {/* <span className="text-xs text-gray-300 bg-gray-800/70 px-2.5 py-1 rounded-full border border-gray-700/50">
                            {matchedSkills.length + missingSkills.length} Skills Considered
                        </span> */}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="rounded-xl border border-gray-700/50 bg-gray-800/55 px-4 py-3">
                            <p className="text-[11px] uppercase tracking-wider text-gray-500 font-medium">Desired Role</p>
                            <p className="text-sm text-gray-200 font-semibold mt-1">{desiredRole}</p>
                        </div>
                        <div className="rounded-xl border border-gray-700/50 bg-gray-800/55 px-4 py-3">
                            <p className="text-[11px] uppercase tracking-wider text-gray-500 font-medium">Experience Level</p>
                            <p className="text-sm text-gray-200 font-semibold mt-1">{experienceLevel}</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                        <CountCard title="Total Skills In Resume" value={totalSkillsInResume} accent="text-rose-300" />
                        <CountCard title="Matched Count" value={matchedCount} accent="text-emerald-300" />
                        <CountCard title="Missing Count" value={missingCount} accent="text-red-300" />
                        <CountCard title="Bonus Skills" value={Math.max(0, totalSkillsInResume - matchedCount)} accent="text-blue-300" />
                    </div>

                    <div className="space-y-4">
                        <MetricBar title="Skill Match Percent" value={skillMatchPercent} maxValue={100} showPercent color="bg-orange-500" />
                    </div>

                    <div className="pt-1 grid grid-cols-1 xl:grid-cols-3 gap-5">
                        <SkillList title="Matched Skills" items={matchedSkills} tone="good" />
                        <SkillList title="Missing Skills" items={missingSkills} tone="warn" />
                        <SkillList title="Bonus Skills" items={bonusSkills} tone="info" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PlacementProbability;
