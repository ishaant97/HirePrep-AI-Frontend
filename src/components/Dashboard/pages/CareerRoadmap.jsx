import { useResume } from '../../../context/ResumeContext';

/* ── Score Ring (reused pattern) ── */
function ScoreRing({ score, size = 120 }) {
    const radius = (size - 16) / 2;
    const stroke = 8;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (score / 100) * circumference;
    const color =
        score >= 80 ? 'stroke-emerald-400' :
            score >= 60 ? 'stroke-yellow-400' :
                score >= 40 ? 'stroke-orange-400' : 'stroke-red-400';
    const textColor =
        score >= 80 ? 'text-emerald-400' :
            score >= 60 ? 'text-yellow-400' :
                score >= 40 ? 'text-orange-400' : 'text-red-400';

    return (
        <div className="relative" style={{ width: size, height: size }}>
            <svg className="w-full h-full -rotate-90" viewBox={`0 0 ${size} ${size}`}>
                <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="currentColor"
                    strokeWidth={stroke} className="text-gray-700/40" />
                <circle cx={size / 2} cy={size / 2} r={radius} fill="none"
                    strokeWidth={stroke} strokeLinecap="round"
                    strokeDasharray={circumference} strokeDashoffset={offset}
                    className={`${color} transition-all duration-1000 ease-out`} />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className={`text-2xl font-bold ${textColor}`}>{score}</span>
                <span className="text-gray-500 text-[10px]">/ 100</span>
            </div>
        </div>
    );
}

/* ── Bullet List Card ── */
function BulletCard({ title, items, icon, accentFrom, accentTo, dotColor }) {
    if (!items?.length) return null;
    return (
        <div className="bg-gray-800/40 border border-gray-700/40 rounded-2xl overflow-hidden">
            <div className={`px-5 py-3.5 bg-gradient-to-r ${accentFrom} ${accentTo} border-b border-gray-700/30 flex items-center gap-3`}>
                <span className="text-lg">{icon}</span>
                <h4 className="text-white font-semibold text-sm">{title}</h4>
                <span className="ml-auto text-xs text-gray-400 bg-gray-800/60 px-2 py-0.5 rounded-full">{items.length}</span>
            </div>
            <ul className="p-4 space-y-2.5">
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

/* ── Timeline Phase Card ── */
function PhaseCard({ phase, label, icon, color, borderColor, sections }) {
    return (
        <div className="relative">
            {/* Timeline dot + line */}
            <div className="flex items-start gap-4">
                <div className="flex flex-col items-center flex-shrink-0">
                    <div className={`w-12 h-12 rounded-xl ${color} flex items-center justify-center text-2xl shadow-lg`}>
                        {icon}
                    </div>
                    <div className={`w-0.5 flex-1 mt-2 ${borderColor} opacity-30 min-h-[20px]`} />
                </div>

                <div className="flex-1 pb-8 space-y-4 min-w-0">
                    {/* Phase header */}
                    <div>
                        <h3 className="text-lg font-bold text-white">{label}</h3>
                        <p className="text-xs text-gray-500 uppercase tracking-wider font-medium mt-0.5">{phase}</p>
                    </div>

                    {/* Phase sections grid */}
                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                        {sections.map((sec, i) => (
                            <BulletCard key={i} {...sec} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

/* ── Impact Card ── */
function ImpactCard({ icon, title, description }) {
    return (
        <div className="bg-gray-800/40 border border-gray-700/40 rounded-2xl p-5 flex gap-4 items-start">
            <div className="w-11 h-11 rounded-xl bg-emerald-500/10 flex items-center justify-center text-xl flex-shrink-0">
                {icon}
            </div>
            <div className="min-w-0">
                <h4 className="text-white font-semibold text-sm">{title}</h4>
                <p className="text-gray-400 text-sm mt-1 leading-relaxed">{description}</p>
            </div>
        </div>
    );
}

function CareerRoadmap() {
    const { activeResumeId, analytics, analyticsStatus, analyticsLoading, analyticsError } = useResume();

    const roadmap = analytics?.career_roadmap;

    /* ── loading or analytics still generating ── */
    if (analyticsLoading || analyticsStatus === 'pending' || analyticsStatus === 'processing') {
        return (
            <div className="space-y-6">
                <div>
                    <h1 className="text-2xl font-bold text-white flex items-center gap-3">
                        <span className="text-3xl">🗺️</span>
                        Career Roadmap
                    </h1>
                    <p className="text-gray-400 mt-1">AI-generated personalized career path</p>
                </div>
                <div className="flex flex-col items-center justify-center py-16 space-y-6">
                    <div className="relative w-24 h-24">
                        <div className="w-24 h-24 border-4 border-yellow-500/20 border-t-yellow-500 rounded-full animate-spin" />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-2xl">🗺️</span>
                        </div>
                    </div>
                    <div className="text-center space-y-2">
                        <h2 className="text-lg font-semibold text-white">Generating your career roadmap…</h2>
                        <p className="text-gray-400 text-sm max-w-md">
                            Our AI is building a personalized career path based on your resume. This usually takes 1–2 minutes.
                        </p>
                    </div>
                    {/* Skeleton placeholders */}
                    <div className="w-full max-w-4xl space-y-4 mt-4">
                        {[...Array(3)].map((_, i) => (
                            <div key={i} className="flex gap-4 items-start">
                                <div className="w-12 h-12 rounded-xl bg-gray-700/40 animate-pulse flex-shrink-0" />
                                <div className="flex-1 space-y-3">
                                    <div className="w-40 h-4 rounded bg-gray-700/40 animate-pulse" />
                                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-3">
                                        <div className="h-28 rounded-2xl bg-gray-800/40 animate-pulse" />
                                        <div className="h-28 rounded-2xl bg-gray-800/40 animate-pulse" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    /* ── no resume selected ── */
    if (!activeResumeId) {
        return (
            <div className="space-y-6">
                <div>
                    <h1 className="text-2xl font-bold text-white flex items-center gap-3">
                        <span className="text-3xl">🗺️</span>
                        Career Roadmap
                    </h1>
                    <p className="text-gray-400 mt-1">AI-generated personalized career path</p>
                </div>
                <div className="flex flex-col items-center justify-center py-32 space-y-4">
                    <div className="w-20 h-20 bg-gray-800/60 rounded-2xl flex items-center justify-center text-4xl">📄</div>
                    <h2 className="text-xl font-semibold text-white">No Resume Selected</h2>
                    <p className="text-gray-400 text-sm max-w-sm text-center">Select a resume from the navbar to view your career roadmap.</p>
                </div>
            </div>
        );
    }

    /* ── error or failed ── */
    if (analyticsError || analyticsStatus === 'failed') {
        return (
            <div className="space-y-6">
                <div>
                    <h1 className="text-2xl font-bold text-white flex items-center gap-3">
                        <span className="text-3xl">🗺️</span>
                        Career Roadmap
                    </h1>
                    <p className="text-gray-400 mt-1">AI-generated personalized career path</p>
                </div>
                <div className="flex flex-col items-center justify-center py-32 space-y-4">
                    <div className="w-20 h-20 bg-red-500/10 rounded-2xl flex items-center justify-center text-4xl">⚠️</div>
                    <h2 className="text-xl font-semibold text-white">Analytics Generation Failed</h2>
                    <p className="text-gray-400 text-sm max-w-sm text-center">
                        {analyticsError || "Career roadmap generation failed. Please try again."}
                    </p>
                </div>
            </div>
        );
    }

    /* ── no roadmap data yet ── */
    if (!roadmap) {
        return (
            <div className="space-y-6">
                <div>
                    <h1 className="text-2xl font-bold text-white flex items-center gap-3">
                        <span className="text-3xl">🗺️</span>
                        Career Roadmap
                    </h1>
                    <p className="text-gray-400 mt-1">AI-generated personalized career path</p>
                </div>
                <div className="bg-gray-800/50 border border-gray-700/50 rounded-2xl p-12 text-center">
                    <div className="w-20 h-20 bg-gradient-to-br from-yellow-500/20 to-orange-500/20 rounded-2xl flex items-center justify-center text-5xl mx-auto mb-6">
                        🗺️
                    </div>
                    <h2 className="text-xl font-semibold text-white mb-2">No Career Roadmap Yet</h2>
                    <p className="text-gray-400 max-w-md mx-auto">
                        Career roadmap data is not available for this resume yet.
                    </p>
                </div>
            </div>
        );
    }

    /* ── Destructure data ── */
    const { career_profile_summary, roadmap: phases, impact_projection, priority_actions_ranked } = roadmap;
    const shortTerm = phases?.short_term_0_3_months;
    const midTerm = phases?.mid_term_3_6_months;
    const longTerm = phases?.long_term_6_12_months;

    return (
        <div className="space-y-8 pb-10">
            {/* ── Page Header ── */}
            <div>
                <h1 className="text-2xl font-bold text-white flex items-center gap-3">
                    <span className="text-3xl">🗺️</span>
                    Career Roadmap
                </h1>
                <p className="text-gray-400 mt-1">AI-generated personalized career path based on your resume</p>
            </div>

            {/* ═══ PROFILE SUMMARY BANNER ═══ */}
            {career_profile_summary && (
                <div className="relative bg-gradient-to-r from-purple-600/10 to-indigo-600/10 border border-purple-500/25 rounded-2xl p-6 overflow-hidden">
                    <div className="absolute -top-16 -right-16 w-48 h-48 bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />

                    <div className="flex flex-col lg:flex-row gap-6 items-start">
                        {/* Score ring */}
                        {career_profile_summary.role_alignment_score_estimate != null && (
                            <div className="flex flex-col items-center flex-shrink-0">
                                <ScoreRing score={career_profile_summary.role_alignment_score_estimate} />
                                <span className="text-xs text-gray-400 mt-2 font-medium">Alignment Score</span>
                            </div>
                        )}

                        <div className="flex-1 min-w-0 space-y-3 z-10">
                            <div className="flex items-center gap-2">
                                <span className="text-lg">📋</span>
                                <h2 className="text-white font-semibold">Career Profile Summary</h2>
                            </div>

                            {career_profile_summary.current_positioning && (
                                <p className="text-gray-300 text-sm leading-relaxed">
                                    {career_profile_summary.current_positioning}
                                </p>
                            )}

                            {career_profile_summary.key_gap_themes?.length > 0 && (
                                <div className="pt-2">
                                    <p className="text-xs text-gray-500 uppercase tracking-wider font-medium mb-2">Key Gap Themes</p>
                                    <div className="flex flex-wrap gap-2">
                                        {career_profile_summary.key_gap_themes.map((gap, i) => (
                                            <span key={i} className="px-3 py-1.5 bg-red-500/10 text-red-300 border border-red-500/20 rounded-lg text-xs leading-relaxed">
                                                {gap}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* ═══ ROADMAP TIMELINE ═══ */}
            <div>
                <div className="flex items-center gap-2 mb-6">
                    <span className="text-lg">🛤️</span>
                    <h2 className="text-xl font-bold text-white">Your Roadmap</h2>
                </div>

                <div className="space-y-2">
                    {/* ── Short Term (0-3 months) ── */}
                    {shortTerm && (
                        <PhaseCard
                            phase="0 – 3 Months"
                            label="Short Term Goals"
                            icon="🚀"
                            color="bg-blue-500/15"
                            borderColor="bg-blue-500"
                            sections={[
                                shortTerm.technical_skills_to_focus?.length > 0 && {
                                    title: 'Technical Skills to Focus',
                                    items: shortTerm.technical_skills_to_focus,
                                    icon: '🛠️',
                                    accentFrom: 'from-blue-600/10',
                                    accentTo: 'to-cyan-600/10',
                                    dotColor: 'bg-blue-400',
                                },
                                shortTerm.projects_to_build_or_improve?.length > 0 && {
                                    title: 'Projects to Build / Improve',
                                    items: shortTerm.projects_to_build_or_improve,
                                    icon: '🔨',
                                    accentFrom: 'from-cyan-600/10',
                                    accentTo: 'to-teal-600/10',
                                    dotColor: 'bg-cyan-400',
                                },
                                shortTerm.resume_optimization_steps?.length > 0 && {
                                    title: 'Resume Optimization',
                                    items: shortTerm.resume_optimization_steps,
                                    icon: '📄',
                                    accentFrom: 'from-violet-600/10',
                                    accentTo: 'to-purple-600/10',
                                    dotColor: 'bg-violet-400',
                                },
                                shortTerm.interview_preparation_strategy?.length > 0 && {
                                    title: 'Interview Preparation',
                                    items: shortTerm.interview_preparation_strategy,
                                    icon: '🎤',
                                    accentFrom: 'from-amber-600/10',
                                    accentTo: 'to-yellow-600/10',
                                    dotColor: 'bg-amber-400',
                                },
                                shortTerm.profile_building_strategy?.length > 0 && {
                                    title: 'Profile Building',
                                    items: shortTerm.profile_building_strategy,
                                    icon: '🌐',
                                    accentFrom: 'from-emerald-600/10',
                                    accentTo: 'to-green-600/10',
                                    dotColor: 'bg-emerald-400',
                                },
                            ].filter(Boolean)}
                        />
                    )}

                    {/* ── Mid Term (3-6 months) ── */}
                    {midTerm && (
                        <PhaseCard
                            phase="3 – 6 Months"
                            label="Mid Term Goals"
                            icon="📈"
                            color="bg-yellow-500/15"
                            borderColor="bg-yellow-500"
                            sections={[
                                midTerm.advanced_skills_to_develop?.length > 0 && {
                                    title: 'Advanced Skills to Develop',
                                    items: midTerm.advanced_skills_to_develop,
                                    icon: '⚡',
                                    accentFrom: 'from-yellow-600/10',
                                    accentTo: 'to-amber-600/10',
                                    dotColor: 'bg-yellow-400',
                                },
                                midTerm.high_impact_projects?.length > 0 && {
                                    title: 'High Impact Projects',
                                    items: midTerm.high_impact_projects,
                                    icon: '💎',
                                    accentFrom: 'from-orange-600/10',
                                    accentTo: 'to-red-600/10',
                                    dotColor: 'bg-orange-400',
                                },
                                midTerm.certifications_or_specializations?.length > 0 && {
                                    title: 'Certifications / Specializations',
                                    items: midTerm.certifications_or_specializations,
                                    icon: '🏆',
                                    accentFrom: 'from-rose-600/10',
                                    accentTo: 'to-pink-600/10',
                                    dotColor: 'bg-rose-400',
                                },
                                midTerm.internship_or_experience_strategy?.length > 0 && {
                                    title: 'Internship / Experience Strategy',
                                    items: midTerm.internship_or_experience_strategy,
                                    icon: '💼',
                                    accentFrom: 'from-indigo-600/10',
                                    accentTo: 'to-blue-600/10',
                                    dotColor: 'bg-indigo-400',
                                },
                            ].filter(Boolean)}
                        />
                    )}

                    {/* ── Long Term (6-12 months) ── */}
                    {longTerm && (
                        <PhaseCard
                            phase="6 – 12 Months"
                            label="Long Term Goals"
                            icon="🎯"
                            color="bg-emerald-500/15"
                            borderColor="bg-emerald-500"
                            sections={[
                                longTerm.specialization_direction?.length > 0 && {
                                    title: 'Specialization Direction',
                                    items: longTerm.specialization_direction,
                                    icon: '🧭',
                                    accentFrom: 'from-emerald-600/10',
                                    accentTo: 'to-teal-600/10',
                                    dotColor: 'bg-emerald-400',
                                },
                                longTerm.portfolio_strengthening?.length > 0 && {
                                    title: 'Portfolio Strengthening',
                                    items: longTerm.portfolio_strengthening,
                                    icon: '📁',
                                    accentFrom: 'from-teal-600/10',
                                    accentTo: 'to-cyan-600/10',
                                    dotColor: 'bg-teal-400',
                                },
                                longTerm.placement_strategy?.length > 0 && {
                                    title: 'Placement Strategy',
                                    items: longTerm.placement_strategy,
                                    icon: '🎯',
                                    accentFrom: 'from-green-600/10',
                                    accentTo: 'to-emerald-600/10',
                                    dotColor: 'bg-green-400',
                                },
                            ].filter(Boolean)}
                        />
                    )}
                </div>
            </div>

            {/* ═══ IMPACT PROJECTION ═══ */}
            {impact_projection && (
                <div>
                    <div className="flex items-center gap-2 mb-4">
                        <span className="text-lg">📊</span>
                        <h2 className="text-xl font-bold text-white">Expected Impact</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {impact_projection.resume_strength_improvement && (
                            <ImpactCard
                                icon="📄"
                                title="Resume Strength"
                                description={impact_projection.resume_strength_improvement}
                            />
                        )}
                        {impact_projection.profile_competitiveness_boost && (
                            <ImpactCard
                                icon="🚀"
                                title="Competitiveness Boost"
                                description={impact_projection.profile_competitiveness_boost}
                            />
                        )}
                        {impact_projection.expected_outcome_if_followed && (
                            <ImpactCard
                                icon="🎯"
                                title="Expected Outcome"
                                description={impact_projection.expected_outcome_if_followed}
                            />
                        )}
                    </div>
                </div>
            )}

            {/* ═══ PRIORITY ACTIONS ═══ */}
            {priority_actions_ranked?.length > 0 && (
                <div>
                    <div className="flex items-center gap-2 mb-4">
                        <span className="text-lg">⚡</span>
                        <h2 className="text-xl font-bold text-white">Priority Actions</h2>
                        <span className="text-xs text-gray-400 bg-gray-800/60 px-2.5 py-0.5 rounded-full ml-1">Ranked</span>
                    </div>
                    <div className="bg-gray-800/40 border border-gray-700/40 rounded-2xl overflow-hidden divide-y divide-gray-700/30">
                        {priority_actions_ranked.map((action, i) => (
                            <div key={i} className="flex items-start gap-4 px-5 py-4 hover:bg-gray-700/20 transition-colors">
                                <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 text-sm font-bold ${i === 0 ? 'bg-yellow-500/20 text-yellow-400' :
                                    i === 1 ? 'bg-gray-300/10 text-gray-300' :
                                        i === 2 ? 'bg-amber-700/20 text-amber-500' :
                                            'bg-gray-700/40 text-gray-400'
                                    }`}>
                                    {i + 1}
                                </div>
                                <p className="text-sm text-gray-300 leading-relaxed">{action}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default CareerRoadmap;
