import { useEffect } from 'react';
import { useResume } from '../../../context/ResumeContext';

function Analytics() {
    const { activeResumeId } = useResume();

    // Placeholder for fetchAnalysis - implement when backend is ready
    const fetchAnalysis = (resumeId) => {
        // TODO: Implement API call to fetch analytics data
        console.log('Fetching analytics for resume:', resumeId);
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
                        <span className="text-3xl">📈</span>
                        Analytics & Graphs
                    </h1>
                    <p className="text-gray-400 mt-1">
                        Visual insights from your career data
                    </p>
                </div>
            </div>

            {/* Coming Soon Card */}
            <div className="bg-gray-800/50 border border-gray-700/50 rounded-2xl p-12 text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-pink-500/20 to-rose-500/20 rounded-2xl flex items-center justify-center text-5xl mx-auto mb-6">
                    📈
                </div>
                <h2 className="text-xl font-semibold text-white mb-2">Coming Soon</h2>
                <p className="text-gray-400 max-w-md mx-auto">
                    This feature will show skill frequency charts, role popularity graphs,
                    and probability improvement tracking.
                </p>
                <div className="mt-6 flex flex-wrap justify-center gap-3">
                    <span className="px-3 py-1 bg-pink-500/20 text-pink-300 rounded-full text-sm">Skill Trends</span>
                    <span className="px-3 py-1 bg-pink-500/20 text-pink-300 rounded-full text-sm">Role Analysis</span>
                    <span className="px-3 py-1 bg-pink-500/20 text-pink-300 rounded-full text-sm">Progress Tracking</span>
                </div>
            </div>
        </div>
    );
}

export default Analytics;
