import { useState } from 'react';
import Login from './Login';
import Signup from './Signup';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

function Auth() {
    const [isLogin, setIsLogin] = useState(true);

    return (
        <div className="min-h-screen h-screen w-screen max-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4 sm:p-6 lg:p-8 overflow-hidden">
            {/* Card Container */}
            <div className="w-full max-w-6xl max-h-[calc(100vh-2rem)] sm:max-h-[calc(100vh-3rem)] lg:max-h-[calc(100vh-4rem)] bg-gray-900/40 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-white/10 mx-auto">
                <div className="flex flex-col lg:flex-row min-h-[540px] lg:min-h-[620px] h-full">
                    {/* Left Side - Animation/Image Section */}
                    <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-purple-600 via-purple-700 to-indigo-900 relative items-center justify-center p-8 xl:p-12">
                        <div className="absolute top-4 sm:top-6 lg:top-8 left-4 sm:left-6 lg:left-8">
                            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight drop-shadow-lg">
                                HirePrep AI
                            </h1>
                        </div>

                        {/* Decorative Elements */}
                        <div className="absolute inset-0 overflow-hidden pointer-events-none">
                            <div className="absolute -top-20 -right-20 w-96 h-96 bg-purple-400 rounded-full opacity-10 blur-3xl"></div>
                            <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-indigo-400 rounded-full opacity-10 blur-3xl"></div>
                        </div>

                        <div className="relative text-center text-white space-y-6 z-10 max-w-lg">
                            {/* Lottie Animation */}
                            <div className="mb-8 transform transition-transform duration-700 hover:scale-105">
                                <div className="w-full h-56 lg:h-64 xl:h-72 flex items-center justify-center">
                                    <DotLottieReact
                                        src="/src/assets/animations/Login.lottie"
                                        autoplay
                                        loop
                                        className="drop-shadow-2xl" />
                                </div>
                            </div>
                            <div className="space-y-3">
                                <p className="text-lg lg:text-xl xl:text-2xl font-semibold text-white/90 leading-relaxed">
                                    AI-powered career guidance and placement assistance
                                </p>
                                <p className="text-sm lg:text-base text-purple-200/80">
                                    Unlock your potential with intelligent career insights
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Right Side - Auth Forms */}
                    <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-8 lg:p-10 xl:p-12 bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm relative">
                        {/* Mobile Logo */}
                        <div className="absolute top-6 left-6 lg:hidden">
                            <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight drop-shadow-lg">
                                HirePrep AI
                            </h1>
                        </div>

                        <div className="w-full max-w-md mt-16 sm:mt-0">
                            {isLogin ? (
                                <Login onSwitchToSignup={() => setIsLogin(false)} />
                            ) : (
                                <Signup onSwitchToLogin={() => setIsLogin(true)} />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Auth;