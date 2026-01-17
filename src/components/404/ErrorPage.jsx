import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { useNavigate } from 'react-router';

function ErrorPage() {
    const navigate = useNavigate();

    return (
        <div className="h-screen w-screen bg-gray-900 overflow-hidden flex">
            {/* Left Side - Animation */}
            <div className="w-full lg:w-1/2 flex items-center justify-center bg-gradient-to-br from-purple-900/50 via-gray-900 to-gray-900 p-8">
                <div className="w-full max-w-20xl">
                    <DotLottieReact
                        src="/src/assets/animations/PageNotFound404.lottie"
                        autoplay
                        loop
                    />
                </div>
            </div>

            {/* Right Side - Content */}
            <div className="hidden lg:flex lg:w-1/2 flex-col items-center justify-center bg-gradient-to-bl from-gray-900 via-purple-900/30 to-gray-900 p-12 relative">
                {/* Decorative Background Elements */}
                <div className="absolute top-20 right-20 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-20 left-20 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>

                <div className="z-10 space-y-8 text-center max-w-lg">
                    {/* Error Code */}
                    <div className="relative">
                        <h1 className="text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
                            404
                        </h1>
                        <div className="absolute inset-0 text-9xl font-black text-purple-500/20 blur-sm">
                            404
                        </div>
                    </div>

                    {/* Error Message */}
                    <div className="space-y-4">
                        <h2 className="text-4xl font-bold text-white">Lost in Space?</h2>
                        <p className="text-gray-400 text-lg leading-relaxed">
                            The page you're searching for has drifted into the digital void.
                            Don't worry, we'll help you navigate back!
                        </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex justify-center pt-4">
                        <button
                            onClick={() => navigate(-1)}
                            className="group px-8 py-4 bg-gray-800 hover:bg-gray-700 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 border border-gray-700 hover:border-purple-500/50 focus:outline-none focus:ring-4 focus:ring-gray-700/50"
                        >
                            <span className="flex items-center gap-2">
                                <svg className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                </svg>
                                Go Back
                            </span>
                        </button>
                    </div>

                    {/* Animated Dots */}
                    <div className="flex justify-center gap-3 pt-8">
                        <div className="w-3 h-3 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
                        <div className="w-3 h-3 bg-pink-500 rounded-full animate-bounce" style={{ animationDelay: '0.15s' }}></div>
                        <div className="w-3 h-3 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0.3s' }}></div>
                    </div>
                </div>
            </div>

            {/* Mobile Content - Shown below animation on small screens */}
            <div className="lg:hidden absolute inset-0 flex items-end pb-16 px-6">
                <div className="w-full text-center space-y-6 bg-gray-900/90 backdrop-blur-sm p-6 rounded-2xl">
                    <h1 className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
                        404
                    </h1>
                    <h2 className="text-2xl font-bold text-white">Page Not Found</h2>
                    <div className="flex flex-col gap-3">
                        <button
                            onClick={() => navigate('/')}
                            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg hover:shadow-xl transition-all"
                        >
                            Go Home
                        </button>
                        <button
                            onClick={() => navigate(-1)}
                            className="px-6 py-3 bg-gray-800 text-white font-semibold rounded-lg border border-gray-700 hover:bg-gray-700 transition-all"
                        >
                            Go Back
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ErrorPage;