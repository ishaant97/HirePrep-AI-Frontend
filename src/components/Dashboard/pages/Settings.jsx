function Settings() {
    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-white flex items-center gap-3">
                        <span className="text-3xl">⚙️</span>
                        Settings
                    </h1>
                    <p className="text-gray-400 mt-1">
                        Manage your account and preferences
                    </p>
                </div>
            </div>

            {/* Coming Soon Card */}
            <div className="bg-gray-800/50 border border-gray-700/50 rounded-2xl p-12 text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-gray-500/20 to-slate-500/20 rounded-2xl flex items-center justify-center text-5xl mx-auto mb-6">
                    ⚙️
                </div>
                <h2 className="text-xl font-semibold text-white mb-2">Coming Soon</h2>
                <p className="text-gray-400 max-w-md mx-auto">
                    This section will allow you to manage your profile, preferences,
                    notifications, and account settings.
                </p>
                <div className="mt-6 flex flex-wrap justify-center gap-3">
                    <span className="px-3 py-1 bg-gray-500/20 text-gray-300 rounded-full text-sm">Profile</span>
                    <span className="px-3 py-1 bg-gray-500/20 text-gray-300 rounded-full text-sm">Preferences</span>
                    <span className="px-3 py-1 bg-gray-500/20 text-gray-300 rounded-full text-sm">Notifications</span>
                </div>
            </div>
        </div>
    );
}

export default Settings;
