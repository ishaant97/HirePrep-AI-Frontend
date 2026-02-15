import { useEffect } from 'react';
import { useResume } from '../../../context/ResumeContext';

function ATSResumeScore() {
    const { activeResumeId } = useResume();

    // Placeholder for fetchAnalysis - implement when backend is ready
    const fetchAnalysis = (resumeId) => {
        // TODO: Implement API call to fetch ATS analysis
        console.log('Fetching ATS analysis for resume:', resumeId);
    };

    useEffect(() => {
        if (activeResumeId) {
            fetchAnalysis(activeResumeId);
        }
    }, [activeResumeId]);

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-white flex items-center gap-3">
                        <span className="text-3xl">📄</span>
                        ATS Resume Score
                    </h1>
                    <p className="text-gray-400 mt-1">
                        Analyze your resume for ATS compatibility
                    </p>
                </div>
            </div>

            {/* Coming Soon Card */}
            <div className="bg-gray-800/50 border border-gray-700/50 rounded-2xl p-12 text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-2xl flex items-center justify-center text-5xl mx-auto mb-6">
                    📄
                </div>
                <h2 className="text-xl font-semibold text-white mb-2">Coming Soon</h2>
                <p className="text-gray-400 max-w-md mx-auto">
                    This feature will provide overall ATS score, section-wise breakdown,
                    and AI-generated improvement suggestions.
                </p>
                <div className="mt-6 flex flex-wrap justify-center gap-3">
                    <span className="px-3 py-1 bg-indigo-500/20 text-indigo-300 rounded-full text-sm">Overall Score</span>
                    <span className="px-3 py-1 bg-indigo-500/20 text-indigo-300 rounded-full text-sm">Section Breakdown</span>
                    <span className="px-3 py-1 bg-indigo-500/20 text-indigo-300 rounded-full text-sm">AI Suggestions</span>
                </div>
            </div>
        </div>
    );
}

export default ATSResumeScore;
