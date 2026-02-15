import { useEffect } from 'react';
import { useResume } from '../../../context/ResumeContext';

function CareerRoadmap() {
    const { activeResumeId } = useResume();

    // Placeholder for fetchAnalysis - implement when backend is ready
    const fetchAnalysis = (resumeId) => {
        // TODO: Implement API call to fetch career roadmap
        console.log('Fetching career roadmap for resume:', resumeId);
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
                        <span className="text-3xl">🗺️</span>
                        Career Roadmap
                    </h1>
                    <p className="text-gray-400 mt-1">
                        AI-generated personalized career path
                    </p>
                </div>
            </div>

            {/* Coming Soon Card */}
            <div className="bg-gray-800/50 border border-gray-700/50 rounded-2xl p-12 text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-yellow-500/20 to-orange-500/20 rounded-2xl flex items-center justify-center text-5xl mx-auto mb-6">
                    🗺️
                </div>
                <h2 className="text-xl font-semibold text-white mb-2">Coming Soon</h2>
                <p className="text-gray-400 max-w-md mx-auto">
                    This feature will provide a timeline-based roadmap with weekly/monthly milestones
                    and learning resources.
                </p>
                <div className="mt-6 flex flex-wrap justify-center gap-3">
                    <span className="px-3 py-1 bg-yellow-500/20 text-yellow-300 rounded-full text-sm">Timeline</span>
                    <span className="px-3 py-1 bg-yellow-500/20 text-yellow-300 rounded-full text-sm">Milestones</span>
                    <span className="px-3 py-1 bg-yellow-500/20 text-yellow-300 rounded-full text-sm">Resources</span>
                </div>
            </div>
        </div>
    );
}

export default CareerRoadmap;
