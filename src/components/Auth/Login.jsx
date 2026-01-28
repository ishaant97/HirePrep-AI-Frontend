import { useState } from 'react';
import { useNavigate } from "react-router";
import { useAuth } from '../../context/AuthContext';

function Login({ onSwitchToSignup }) {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    // const [rememberMe, setRememberMe] = useState(false);
    const { login } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login({ email, password });
            navigate('/dashboard');
        }
        catch (err) {
            console.log(err);
            if (err.response && err.response.data && err.response.data.message) {
                alert(err.response.data.message);
            } else {
                alert("Login Failed");
            }
        }
        // console.log('Login:', { email, password, rememberMe });
    };

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="text-center space-y-2">
                <h1 className="text-3xl font-bold text-white">Welcome back</h1>
                <p className="text-gray-400">
                    Don't have an account?{' '}
                    <button
                        onClick={onSwitchToSignup}
                        className="text-purple-400 hover:text-purple-300 font-medium transition-colors"
                    >
                        Sign up
                    </button>
                </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Email */}
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-3 py-2.5 sm:px-4 sm:py-3 bg-gray-700/70 border border-purple-500/40 focus:border-purple-400 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-0 transition-all shadow-inner shadow-black/40"
                        required
                    />
                </div>

                {/* Password */}
                <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                        Password
                    </label>
                    <div className="relative">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            id="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-3 py-2.5 sm:px-4 sm:py-3 bg-gray-700/70 border border-purple-500/40 focus:border-purple-400 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-0 transition-all shadow-inner shadow-black/40"
                            required
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-300"
                        >
                            {showPassword ? (
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                </svg>
                            ) : (
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>

                {/* Remember Me & Forgot Password */}
                {/* <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            id="remember"
                            checked={rememberMe}
                            onChange={(e) => setRememberMe(e.target.checked)}
                            className="w-4 h-4 accent-purple-600 cursor-pointer"
                        />
                        <label htmlFor="remember" className="text-sm text-gray-300 cursor-pointer">
                            Remember me
                        </label>
                    </div>
                    <button
                        type="button"
                        className="text-sm text-purple-400 hover:text-purple-300 transition-colors"
                    >
                        Forgot password?
                    </button>
                </div> */}

                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full py-3 bg-gradient-to-r from-purple-500 via-purple-600 to-indigo-600 text-white font-semibold rounded-2xl transition-all duration-200 shadow-lg shadow-purple-800/60 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-purple-500/40"
                >
                    Log in
                </button>
            </form>
        </div>
    );
}

export default Login;
