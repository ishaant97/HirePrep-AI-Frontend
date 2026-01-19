import { useState } from 'react';
import { useNavigate } from "react-router";
import { useAuth } from '../../context/AuthContext';

function Signup({ onSwitchToLogin }) {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    // const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [agreeToTerms, setAgreeToTerms] = useState(false);
    const [showTermsModal, setShowTermsModal] = useState(false);
    const { signup } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Add your signup logic here
        try {
            await signup({ name, email, password });
            navigate('/dashboard');
        }
        catch (err) {
            console.log(err);
            if (err.response && err.response.data && err.response.data.message) {
                alert(err.response.data.message);
            }
            else {
                alert("Signup Failed");
            }
        }
        // console.log('Signup:', { name, email, password, agreeToTerms });
    };

    return (
        <div className="space-y-6 md:space-y-8 px-4 sm:px-0">
            {/* Header */}
            <div className="text-center space-y-2">
                <h1 className="text-2xl md:text-3xl font-bold text-white">Create an account</h1>
                <p className="text-sm md:text-base text-gray-400">
                    Already have an account?{' '}
                    <button
                        onClick={onSwitchToLogin}
                        className="text-purple-400 hover:text-purple-300 font-medium transition-colors"
                    >
                        Log in
                    </button>
                </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-3 md:space-y-4">
                {/* Name Field */}
                <div className="w-full">
                    <input
                        type="text"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-3 py-2.5 sm:px-4 sm:py-3 bg-gray-700/70 border border-purple-500/40 focus:border-purple-400 rounded-xl text-sm md:text-base text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-0 transition-all shadow-inner shadow-black/40"
                        required
                    />
                </div>

                {/* Email */}
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2 sm:px-4 sm:py-3 bg-gray-700 border border-gray-600 rounded-lg text-sm md:text-base text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    required
                />

                {/* Password */}
                <div className="relative">
                    <input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-3 py-2 sm:px-4 sm:py-3 bg-gray-700 border border-gray-600 rounded-lg text-sm md:text-base text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                        required
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-300"
                    >
                        {showPassword ? (
                            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                        ) : (
                            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                            </svg>
                        )}
                    </button>
                </div>

                {/* Terms and Conditions */}
                <div className="flex items-start sm:items-center gap-2">
                    <input
                        type="checkbox"
                        id="terms"
                        checked={agreeToTerms}
                        onChange={(e) => setAgreeToTerms(e.target.checked)}
                        className="w-4 h-4 mt-0.5 sm:mt-0 accent-purple-600 cursor-pointer flex-shrink-0"
                        required
                    />
                    <label htmlFor="terms" className="text-xs sm:text-sm text-gray-300">
                        I agree to the{' '}
                        <button
                            type="button"
                            onClick={() => setShowTermsModal(true)}
                            className="text-purple-400 hover:text-purple-300 underline transition-colors"
                        >
                            Terms & Conditions
                        </button>
                    </label>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full py-3 bg-gradient-to-r from-purple-500 via-purple-600 to-indigo-600 text-white text-sm md:text-base font-semibold rounded-2xl transition-all duration-200 shadow-lg shadow-purple-800/60 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-purple-500/40"
                >
                    Create account
                </button>
            </form>

            {/* Terms Modal */}
            {showTermsModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-3 sm:p-4" onClick={() => setShowTermsModal(false)}>
                    <div className="bg-gray-800 rounded-lg p-4 sm:p-5 md:p-6 max-w-lg w-full max-h-[85vh] sm:max-h-[80vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                        <div className="flex justify-between items-center mb-3 sm:mb-4">
                            <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-white">Terms & Conditions</h2>
                            <button
                                onClick={() => setShowTermsModal(false)}
                                className="text-gray-400 hover:text-white transition-colors flex-shrink-0 ml-2"
                            >
                                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        <div className="space-y-3 sm:space-y-4 text-gray-300 text-xs sm:text-sm">
                            <p>
                                Welcome to Smart Placement & Skill Gap Analyzer. By using our platform, you agree to the following terms:
                            </p>
                            <h3 className="font-semibold text-white">1. Use of Service</h3>
                            <p>
                                You agree to use this platform for career guidance and placement assistance purposes. All information provided should be accurate and up-to-date.
                            </p>
                            <h3 className="font-semibold text-white">2. Data Privacy</h3>
                            <p>
                                We collect and process your resume, educational details, and career preferences to provide personalized recommendations. Your data is stored securely and will not be shared without consent.
                            </p>
                            <h3 className="font-semibold text-white">3. AI Predictions</h3>
                            <p>
                                Our ML models provide placement probability and career recommendations based on historical data. These are predictions and not guarantees.
                            </p>
                            <h3 className="font-semibold text-white">4. User Responsibilities</h3>
                            <p>
                                You are responsible for maintaining the confidentiality of your account credentials and for all activities under your account.
                            </p>
                        </div>
                        <button
                            onClick={() => setShowTermsModal(false)}
                            className="mt-4 sm:mt-6 w-full py-2 sm:py-2.5 bg-purple-600 hover:bg-purple-700 text-white text-sm md:text-base rounded-lg transition-colors"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Signup;
