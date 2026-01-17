import { useState } from 'react';
import Login from './Login';
import Signup from './Signup';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

function Auth() {
    const [isLogin, setIsLogin] = useState(true);

    return (
        <div className="flex h-screen w-screen bg-gray-900 overflow-hidden">
            {/* Left Side - Animation/Image Section */}
            <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-purple-600 to-indigo-800 relative items-center justify-center p-12">
                <div className="absolute top-8 left-8">
                    <h1 className="text-4xl font-bold text-white">Smart Placement</h1>
                </div>

                <div className="text-center text-white space-y-6 z-10">
                    {/* Placeholder for Lottie Animation */}
                    <div className="mb-8">
                        <div className="w-full h-64 flex items-center justify-center">
                            {/* Add your Lottie animation component here */}
                            <DotLottieReact
                                src="/src/assets/animations/Login.lottie"
                                autoplay
                                loop />
                        </div>
                    </div>
                    <p className="text-xl text-purple-200">
                        AI-powered career guidance and placement assistance
                    </p>
                </div>
            </div>

            {/* Right Side - Auth Forms */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gray-800">
                <div className="w-full max-w-md">
                    {isLogin ? (
                        <Login onSwitchToSignup={() => setIsLogin(false)} />
                    ) : (
                        <Signup onSwitchToLogin={() => setIsLogin(true)} />
                    )}
                </div>
            </div>
        </div>
    );
}

export default Auth;