function Loader({ message = "Loading..." }) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/80 backdrop-blur-sm">
            <div className="flex flex-col items-center gap-6">
                {/* Animated rings */}
                <div className="relative w-20 h-20">
                    {/* Outer ring */}
                    <div className="absolute inset-0 rounded-full border-4 border-purple-500/20"></div>
                    {/* Spinning ring */}
                    <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-purple-500 animate-spin"></div>
                    {/* Inner spinning ring (opposite direction) */}
                    <div className="absolute inset-2 rounded-full border-4 border-transparent border-b-indigo-400 animate-spin" style={{ animationDirection: 'reverse', animationDuration: '0.8s' }}></div>
                    {/* Center dot pulse */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-3 h-3 rounded-full bg-purple-400 animate-pulse"></div>
                    </div>
                </div>

                {/* Message */}
                <div className="text-center space-y-2">
                    <p className="text-white text-lg font-medium">{message}</p>
                    {/* Animated dots */}
                    <div className="flex items-center justify-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-purple-400 animate-bounce" style={{ animationDelay: '0ms' }}></span>
                        <span className="w-2 h-2 rounded-full bg-purple-500 animate-bounce" style={{ animationDelay: '150ms' }}></span>
                        <span className="w-2 h-2 rounded-full bg-indigo-400 animate-bounce" style={{ animationDelay: '300ms' }}></span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Loader;
