import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router';

function Profile() {
    const { user } = useAuth();
    const navigate = useNavigate();

    // Sample resumes data - replace with actual data from your backend
    const resumes = [
        {
            id: 1,
            name: 'Software_Engineer_Resume.pdf',
            uploadedAt: 'Feb 5, 2026',
            atsScore: 92,
            isBest: true,
            bestReason: 'Highest ATS score with optimal keyword matching and clean formatting.',
        },
        {
            id: 2,
            name: 'Full_Stack_Developer_Resume.pdf',
            uploadedAt: 'Jan 28, 2026',
            atsScore: 85,
            isBest: false,
        },
        {
            id: 3,
            name: 'Resume_v1.pdf',
            uploadedAt: 'Jan 15, 2026',
            atsScore: 78,
            isBest: false,
        },
    ];

    const bestResume = resumes.find(r => r.isBest);

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                {/* Back Button */}
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 mb-8 text-slate-400 hover:text-white transition-colors group"
                >
                    <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    <span className="text-sm font-medium">Back to Dashboard</span>
                </button>

                {/* Profile Card */}
                <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-xl border border-slate-700/50 shadow-2xl">
                    {/* Decorative gradient orb */}
                    <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-500/20 rounded-full blur-3xl"></div>
                    <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-purple-500/20 rounded-full blur-3xl"></div>

                    <div className="relative p-4 sm:p-6 md:p-8">
                        {/* Header with Avatar */}
                        <div className="flex flex-col sm:flex-row items-center gap-6 mb-8">
                            {/* Avatar */}
                            <div className="relative">
                                <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-4xl font-bold text-white shadow-lg shadow-blue-500/25">
                                    {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                                </div>
                                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-4 border-slate-800"></div>
                            </div>

                            {/* User Basic Info */}
                            <div className="flex-1 text-center sm:text-left">
                                <h1 className="text-2xl font-bold text-white mb-1">
                                    {user?.name || 'Your Name'}
                                </h1>
                                <p className="text-slate-400 text-sm">Profile Overview</p>
                            </div>
                        </div>

                        {/* Info Cards Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                            {/* Email Card */}
                            <div className="bg-slate-800/50 rounded-2xl p-5 border border-slate-700/50 hover:border-purple-500/30 transition-colors">
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center">
                                        <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                    <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">Email</span>
                                </div>
                                <p className="text-white font-semibold truncate">{user?.email || 'Not provided'}</p>
                            </div>

                            {/* College Card */}
                            <div className="bg-slate-800/50 rounded-2xl p-5 border border-slate-700/50 hover:border-emerald-500/30 transition-colors">
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                                        <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                                        </svg>
                                    </div>
                                    <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">College</span>
                                </div>
                                <p className="text-white font-semibold">{user?.collegeName || 'Not provided'}</p>
                            </div>
                        </div>

                        {/* Resumes Section */}
                        <div className="bg-slate-800/30 rounded-2xl p-4 sm:p-6 border border-slate-700/50">
                            <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-orange-500/20 flex items-center justify-center">
                                        <svg className="w-5 h-5 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h2 className="text-lg font-semibold text-white">Your Resumes</h2>
                                        <p className="text-xs text-slate-500">{resumes.length} resume{resumes.length !== 1 ? 's' : ''} uploaded</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => navigate('/resumeUpload')}
                                    className="px-4 py-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 rounded-xl text-sm font-medium transition-colors flex items-center gap-2"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                    </svg>
                                    Upload New
                                </button>
                            </div>

                            {/* Best Resume Highlight */}
                            {bestResume && resumes.length > 1 && (
                                <div className="mb-4 p-4 rounded-xl bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border border-emerald-500/30">
                                    <div className="flex items-start gap-3">
                                        <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                                            <svg className="w-4 h-4 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className="text-emerald-400 font-semibold text-sm">Best Resume</span>
                                                <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-400 text-xs font-medium rounded-full">
                                                    {bestResume.atsScore}% ATS
                                                </span>
                                            </div>
                                            <p className="text-slate-300 text-sm">{bestResume.bestReason}</p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Resume List */}
                            <div className="space-y-3">
                                {resumes.length === 0 ? (
                                    <div className="text-center py-8">
                                        <div className="w-16 h-16 rounded-2xl bg-slate-700/50 flex items-center justify-center mx-auto mb-4">
                                            <svg className="w-8 h-8 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                            </svg>
                                        </div>
                                        <p className="text-slate-400 mb-2">No resumes uploaded yet</p>
                                        <button
                                            onClick={() => navigate('/resumeUpload')}
                                            className="text-blue-400 hover:text-blue-300 text-sm font-medium"
                                        >
                                            Upload your first resume
                                        </button>
                                    </div>
                                ) : (
                                    resumes.map((resume) => (
                                        <div
                                            key={resume.id}
                                            className={`flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 sm:p-4 rounded-xl border transition-all hover:bg-slate-700/30 gap-3 sm:gap-0 ${resume.isBest
                                                ? 'bg-emerald-500/5 border-emerald-500/30'
                                                : 'bg-slate-800/30 border-slate-700/50'
                                                }`}
                                        >
                                            <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                                                <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${resume.isBest ? 'bg-emerald-500/20' : 'bg-red-500/20'
                                                    }`}>
                                                    <svg className={`w-5 h-5 sm:w-6 sm:h-6 ${resume.isBest ? 'text-emerald-400' : 'text-red-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                                    </svg>
                                                </div>
                                                <div className="min-w-0">
                                                    <div className="flex items-center gap-2 flex-wrap">
                                                        <p className="text-white font-medium text-sm sm:text-base truncate">{resume.name}</p>
                                                        {resume.isBest && (
                                                            <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-400 text-xs font-medium rounded-full flex items-center gap-1 flex-shrink-0">
                                                                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                                </svg>
                                                                Best
                                                            </span>
                                                        )}
                                                    </div>
                                                    <p className="text-slate-500 text-xs sm:text-sm">Uploaded {resume.uploadedAt}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center justify-between sm:justify-end gap-3 sm:gap-4 pl-13 sm:pl-0">
                                                <div className="text-left sm:text-right">
                                                    <p className={`text-base sm:text-lg font-bold ${resume.atsScore >= 85 ? 'text-emerald-400' :
                                                        resume.atsScore >= 70 ? 'text-yellow-400' : 'text-red-400'
                                                        }`}>
                                                        {resume.atsScore}%
                                                    </p>
                                                    <p className="text-slate-500 text-xs">ATS Score</p>
                                                </div>
                                                <div className="flex gap-1">
                                                    <button className="p-2 rounded-lg hover:bg-slate-700/50 text-slate-400 hover:text-white transition-colors">
                                                        <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                        </svg>
                                                    </button>
                                                    <button className="p-2 rounded-lg hover:bg-slate-700/50 text-slate-400 hover:text-white transition-colors">
                                                        <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                                        </svg>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;