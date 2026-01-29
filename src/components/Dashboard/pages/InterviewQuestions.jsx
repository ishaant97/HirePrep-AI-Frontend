function InterviewQuestions() {
    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-white flex items-center gap-3">
                        <span className="text-3xl">🎤</span>
                        Interview Questions
                    </h1>
                    <p className="text-gray-400 mt-1">
                        Personalized interview preparation
                    </p>
                </div>
            </div>

            {/* Coming Soon Card */}
            <div className="bg-gray-800/50 border border-gray-700/50 rounded-2xl p-12 text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-cyan-500/20 to-teal-500/20 rounded-2xl flex items-center justify-center text-5xl mx-auto mb-6">
                    🎤
                </div>
                <h2 className="text-xl font-semibold text-white mb-2">Coming Soon</h2>
                <p className="text-gray-400 max-w-md mx-auto">
                    This feature will provide personalized interview questions based on your profile,
                    with categories for Technical, HR, Project-based, and Behavioral questions.
                </p>
                <div className="mt-6 flex flex-wrap justify-center gap-3">
                    <span className="px-3 py-1 bg-cyan-500/20 text-cyan-300 rounded-full text-sm">Technical</span>
                    <span className="px-3 py-1 bg-cyan-500/20 text-cyan-300 rounded-full text-sm">HR</span>
                    <span className="px-3 py-1 bg-cyan-500/20 text-cyan-300 rounded-full text-sm">Behavioral</span>
                </div>
            </div>
        </div>
    );
}

export default InterviewQuestions;
