import { useEffect } from 'react';
import { useResume } from '../../../context/ResumeContext';

function PlacementProbability() {
    const { activeResumeId } = useResume();

    // Placeholder for fetchAnalysis - implement when backend is ready
    const fetchAnalysis = (resumeId) => {
        // TODO: Implement API call to fetch placement probability
        console.log('Fetching placement probability for resume:', resumeId);
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
                    <h1 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2 sm:gap-3">
                        <span className="text-2xl sm:text-3xl">📊</span>
                        Placement Probability
                    </h1>
                    <p className="text-gray-400 mt-1">
                        AI-powered analysis of your placement chances
                    </p>
                </div>
            </div>

            {/* Coming Soon Card */}
            <div className="bg-gray-800/50 border border-gray-700/50 rounded-2xl p-6 sm:p-12 text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-purple-500/20 to-indigo-600/20 rounded-2xl flex items-center justify-center text-5xl mx-auto mb-6">
                    📊
                </div>
                <h2 className="text-xl font-semibold text-white mb-2">Coming Soon</h2>
                <p className="text-gray-400 max-w-md mx-auto">
                    This feature will show your placement probability percentage, confidence range,
                    and the factors affecting your chances.
                </p>
                <div className="mt-6 flex flex-wrap justify-center gap-3">
                    <span className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm">Probability %</span>
                    <span className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm">Confidence Range</span>
                    <span className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm">Factor Analysis</span>
                </div>
            </div>
        </div>
    );
}

export default PlacementProbability;
