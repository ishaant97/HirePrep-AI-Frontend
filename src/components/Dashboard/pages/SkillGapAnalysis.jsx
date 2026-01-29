function SkillGapAnalysis() {
    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-white flex items-center gap-3">
                        <span className="text-3xl">🧠</span>
                        Skill Gap Analysis
                    </h1>
                    <p className="text-gray-400 mt-1">
                        Identify missing skills and areas to improve
                    </p>
                </div>
            </div>

            {/* Coming Soon Card */}
            <div className="bg-gray-800/50 border border-gray-700/50 rounded-2xl p-12 text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-2xl flex items-center justify-center text-5xl mx-auto mb-6">
                    🧠
                </div>
                <h2 className="text-xl font-semibold text-white mb-2">Coming Soon</h2>
                <p className="text-gray-400 max-w-md mx-auto">
                    This feature will compare your current skills with required skills for your target roles,
                    highlighting gaps and strength percentages.
                </p>
                <div className="mt-6 flex flex-wrap justify-center gap-3">
                    <span className="px-3 py-1 bg-green-500/20 text-green-300 rounded-full text-sm">Current Skills</span>
                    <span className="px-3 py-1 bg-green-500/20 text-green-300 rounded-full text-sm">Required Skills</span>
                    <span className="px-3 py-1 bg-green-500/20 text-green-300 rounded-full text-sm">Gap Analysis</span>
                </div>
            </div>
        </div>
    );
}

export default SkillGapAnalysis;
