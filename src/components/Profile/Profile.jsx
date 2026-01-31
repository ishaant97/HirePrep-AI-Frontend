import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router';

function Profile() {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [isEditing, setIsEditing] = useState(false);
    const [activeTab, setActiveTab] = useState('personal');

    // Form state with default values from user context
    const [formData, setFormData] = useState({
        name: user?.name || '',
        email: user?.email || '',
        phone: user?.phone || '',
        linkedin: user?.linkedin || '',
        github: user?.github || '',
        portfolio: user?.portfolio || '',
        collegeName: user?.collegeName || '',
        degree: user?.degree || '',
        branch: user?.branch || '',
        graduationYear: user?.graduationYear || '',
        cgpa: user?.cgpa || '',
        desiredRole: user?.desiredRole || '',
        experienceLevel: user?.experienceLevel || 'fresher',
        location: user?.location || '',
        preferredLocations: user?.preferredLocations || '',
        skills: user?.skills || '',
        bio: user?.bio || '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // TODO: Implement API call to update profile
        console.log('Saving profile:', formData);
        setIsEditing(false);
    };

    const tabs = [
        { id: 'personal', label: 'Personal Info', icon: '👤' },
        { id: 'education', label: 'Education', icon: '🎓' },
        { id: 'career', label: 'Career Goals', icon: '🎯' },
        { id: 'social', label: 'Social Links', icon: '🔗' },
    ];

    return (
        <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: 'var(--bg-primary)' }}>
            <div className="max-w-4xl mx-auto">
                {/* Back Button */}
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 mb-6 transition-colors group"
                    style={{ color: 'var(--text-muted)' }}
                >
                    <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    <span>Back to Dashboard</span>
                </button>

                {/* Profile Header Card */}
                <div className="rounded-2xl p-6 mb-6" style={{ backgroundColor: 'rgba(59, 130, 246, 0.1)', border: '1px solid rgba(59, 130, 246, 0.3)' }}>
                    <div className="flex flex-col sm:flex-row items-center gap-6">
                        {/* Avatar */}
                        <div className="relative">
                            <div className="w-24 h-24 rounded-2xl flex items-center justify-center text-4xl font-bold shadow-xl text-white" style={{ backgroundColor: 'var(--primary)' }}>
                                {formData.name?.charAt(0)?.toUpperCase() || 'U'}
                            </div>
                            <button className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full flex items-center justify-center shadow-lg transition-colors text-white" style={{ backgroundColor: 'var(--primary)' }}>
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                            </button>
                        </div>

                        {/* User Info */}
                        <div className="flex-1 text-center sm:text-left">
                            <h1 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>{formData.name || 'Your Name'}</h1>
                            <p className="mt-1" style={{ color: 'var(--primary)' }}>{formData.desiredRole || 'Set your desired role'}</p>
                            <div className="flex flex-wrap justify-center sm:justify-start gap-3 mt-3">
                                {formData.collegeName && (
                                    <span className="flex items-center gap-1 text-sm" style={{ color: 'var(--text-muted)' }}>
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                                        </svg>
                                        {formData.collegeName}
                                    </span>
                                )}
                                {formData.location && (
                                    <span className="flex items-center gap-1 text-sm" style={{ color: 'var(--text-muted)' }}>
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                        {formData.location}
                                    </span>
                                )}
                            </div>
                        </div>

                        {/* Edit Button */}
                        <button
                            onClick={() => setIsEditing(!isEditing)}
                            className="px-5 py-2.5 rounded-xl font-medium transition-all flex items-center gap-2 shadow-lg"
                            style={isEditing
                                ? { backgroundColor: 'var(--bg-tertiary)', color: 'var(--text-secondary)' }
                                : { backgroundColor: 'var(--primary)', color: 'white' }
                            }
                        >
                            {isEditing ? (
                                <>
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                    Cancel
                                </>
                            ) : (
                                <>
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                    </svg>
                                    Edit Profile
                                </>
                            )}
                        </button>
                    </div>

                    {/* Quick Stats */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-6" style={{ borderTop: '1px solid rgba(59, 130, 246, 0.2)' }}>
                        <div className="text-center">
                            <p className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>85%</p>
                            <p className="text-sm" style={{ color: 'var(--text-muted)' }}>Profile Complete</p>
                        </div>
                        <div className="text-center">
                            <p className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>78%</p>
                            <p className="text-sm" style={{ color: 'var(--text-muted)' }}>Placement Score</p>
                        </div>
                        <div className="text-center">
                            <p className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>12</p>
                            <p className="text-sm" style={{ color: 'var(--text-muted)' }}>Skills Added</p>
                        </div>
                        <div className="text-center">
                            <p className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>3</p>
                            <p className="text-sm" style={{ color: 'var(--text-muted)' }}>Resumes</p>
                        </div>
                    </div>
                </div>

                {/* Tab Navigation */}
                <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium transition-all whitespace-nowrap"
                            style={activeTab === tab.id
                                ? { backgroundColor: 'var(--primary)', color: 'white', boxShadow: '0 10px 15px -3px rgba(59, 130, 246, 0.25)' }
                                : { backgroundColor: 'var(--bg-secondary)', color: 'var(--text-muted)' }
                            }
                        >
                            <span>{tab.icon}</span>
                            <span>{tab.label}</span>
                        </button>
                    ))}
                </div>

                {/* Form Content */}
                <form onSubmit={handleSubmit}>
                    <div className="rounded-2xl p-6" style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border)' }}>
                        {/* Personal Info Tab */}
                        {activeTab === 'personal' && (
                            <div className="space-y-6">
                                <h2 className="text-xl font-semibold flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
                                    <span className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'rgba(59, 130, 246, 0.2)' }}>👤</span>
                                    Personal Information
                                </h2>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <InputField
                                        label="Full Name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        disabled={!isEditing}
                                        placeholder="John Doe"
                                        icon={
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                            </svg>
                                        }
                                    />

                                    <InputField
                                        label="Email Address"
                                        name="email"
                                        type="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        disabled={!isEditing}
                                        placeholder="john@example.com"
                                        icon={
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                            </svg>
                                        }
                                    />

                                    <InputField
                                        label="Phone Number"
                                        name="phone"
                                        type="tel"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        disabled={!isEditing}
                                        placeholder="+91 9876543210"
                                        icon={
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                            </svg>
                                        }
                                    />

                                    <InputField
                                        label="Current Location"
                                        name="location"
                                        value={formData.location}
                                        onChange={handleInputChange}
                                        disabled={!isEditing}
                                        placeholder="Mumbai, India"
                                        icon={
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                        }
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>Bio / About Me</label>
                                    <textarea
                                        name="bio"
                                        value={formData.bio}
                                        onChange={handleInputChange}
                                        disabled={!isEditing}
                                        placeholder="Write a short bio about yourself..."
                                        rows={4}
                                        className={`w-full px-4 py-3 bg-gray-900/50 border rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all resize-none ${isEditing ? 'border-gray-600 hover:border-gray-500' : 'border-gray-700/50 cursor-not-allowed opacity-75'
                                            }`}
                                    />
                                </div>
                            </div>
                        )}

                        {/* Education Tab */}
                        {activeTab === 'education' && (
                            <div className="space-y-6">
                                <h2 className="text-xl font-semibold flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
                                    <span className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'rgba(59, 130, 246, 0.2)' }}>🎓</span>
                                    Education Details
                                </h2>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <InputField
                                        label="College / University Name"
                                        name="collegeName"
                                        value={formData.collegeName}
                                        onChange={handleInputChange}
                                        disabled={!isEditing}
                                        placeholder="IIT Bombay"
                                        icon={
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                                            </svg>
                                        }
                                    />

                                    <InputField
                                        label="Degree"
                                        name="degree"
                                        value={formData.degree}
                                        onChange={handleInputChange}
                                        disabled={!isEditing}
                                        placeholder="B.Tech"
                                        icon={
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                                            </svg>
                                        }
                                    />

                                    <InputField
                                        label="Branch / Major"
                                        name="branch"
                                        value={formData.branch}
                                        onChange={handleInputChange}
                                        disabled={!isEditing}
                                        placeholder="Computer Science"
                                        icon={
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                                            </svg>
                                        }
                                    />

                                    <InputField
                                        label="Graduation Year"
                                        name="graduationYear"
                                        value={formData.graduationYear}
                                        onChange={handleInputChange}
                                        disabled={!isEditing}
                                        placeholder="2026"
                                        icon={
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                        }
                                    />

                                    <InputField
                                        label="CGPA / Percentage"
                                        name="cgpa"
                                        value={formData.cgpa}
                                        onChange={handleInputChange}
                                        disabled={!isEditing}
                                        placeholder="8.5"
                                        icon={
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                                            </svg>
                                        }
                                    />
                                </div>
                            </div>
                        )}

                        {/* Career Goals Tab */}
                        {activeTab === 'career' && (
                            <div className="space-y-6">
                                <h2 className="text-xl font-semibold flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
                                    <span className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'rgba(34, 197, 94, 0.2)' }}>🎯</span>
                                    Career Goals
                                </h2>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <InputField
                                        label="Desired Job Role"
                                        name="desiredRole"
                                        value={formData.desiredRole}
                                        onChange={handleInputChange}
                                        disabled={!isEditing}
                                        placeholder="Full Stack Developer"
                                        icon={
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                            </svg>
                                        }
                                    />

                                    <div>
                                        <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>Experience Level</label>
                                        <select
                                            name="experienceLevel"
                                            value={formData.experienceLevel}
                                            onChange={handleInputChange}
                                            disabled={!isEditing}
                                            className={`w-full px-4 py-3 bg-gray-900/50 border rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all ${isEditing ? 'border-gray-600 hover:border-gray-500' : 'border-gray-700/50 cursor-not-allowed opacity-75'
                                                }`}
                                        >
                                            <option value="fresher">Fresher</option>
                                            <option value="0-1">0-1 Years</option>
                                            <option value="1-3">1-3 Years</option>
                                            <option value="3-5">3-5 Years</option>
                                            <option value="5+">5+ Years</option>
                                        </select>
                                    </div>

                                    <div className="md:col-span-2">
                                        <InputField
                                            label="Preferred Work Locations"
                                            name="preferredLocations"
                                            value={formData.preferredLocations}
                                            onChange={handleInputChange}
                                            disabled={!isEditing}
                                            placeholder="Bangalore, Mumbai, Remote"
                                            icon={
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                            }
                                        />
                                    </div>

                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>Key Skills</label>
                                        <textarea
                                            name="skills"
                                            value={formData.skills}
                                            onChange={handleInputChange}
                                            disabled={!isEditing}
                                            placeholder="React, Node.js, Python, Machine Learning, SQL, Git..."
                                            rows={3}
                                            className={`w-full px-4 py-3 bg-gray-900/50 border rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all resize-none ${isEditing ? 'border-gray-600 hover:border-gray-500' : 'border-gray-700/50 cursor-not-allowed opacity-75'
                                                }`}
                                        />
                                        <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>Separate skills with commas</p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Social Links Tab */}
                        {activeTab === 'social' && (
                            <div className="space-y-6">
                                <h2 className="text-xl font-semibold flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
                                    <span className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'rgba(99, 102, 241, 0.2)' }}>🔗</span>
                                    Social & Professional Links
                                </h2>

                                <div className="grid grid-cols-1 gap-5">
                                    <InputField
                                        label="LinkedIn Profile"
                                        name="linkedin"
                                        value={formData.linkedin}
                                        onChange={handleInputChange}
                                        disabled={!isEditing}
                                        placeholder="https://linkedin.com/in/yourprofile"
                                        icon={
                                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                                            </svg>
                                        }
                                    />

                                    <InputField
                                        label="GitHub Profile"
                                        name="github"
                                        value={formData.github}
                                        onChange={handleInputChange}
                                        disabled={!isEditing}
                                        placeholder="https://github.com/yourusername"
                                        icon={
                                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                            </svg>
                                        }
                                    />

                                    <InputField
                                        label="Portfolio Website"
                                        name="portfolio"
                                        value={formData.portfolio}
                                        onChange={handleInputChange}
                                        disabled={!isEditing}
                                        placeholder="https://yourportfolio.com"
                                        icon={
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                                            </svg>
                                        }
                                    />
                                </div>

                                {/* Social Links Preview */}
                                {(formData.linkedin || formData.github || formData.portfolio) && (
                                    <div className="mt-6 pt-6" style={{ borderTop: '1px solid var(--border)' }}>
                                        <h3 className="text-sm font-medium mb-4" style={{ color: 'var(--text-muted)' }}>Quick Links</h3>
                                        <div className="flex flex-wrap gap-3">
                                            {formData.linkedin && (
                                                <a
                                                    href={formData.linkedin}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex items-center gap-2 px-4 py-2 bg-blue-600/20 text-blue-400 rounded-xl hover:bg-blue-600/30 transition-colors"
                                                >
                                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                                                    </svg>
                                                    LinkedIn
                                                </a>
                                            )}
                                            {formData.github && (
                                                <a
                                                    href={formData.github}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex items-center gap-2 px-4 py-2 bg-gray-600/20 text-gray-300 rounded-xl hover:bg-gray-600/30 transition-colors"
                                                >
                                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                                    </svg>
                                                    GitHub
                                                </a>
                                            )}
                                            {formData.portfolio && (
                                                <a
                                                    href={formData.portfolio}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex items-center gap-2 px-4 py-2 rounded-xl transition-colors"
                                                    style={{ backgroundColor: 'rgba(59, 130, 246, 0.2)', color: 'var(--primary)' }}
                                                >
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                                                    </svg>
                                                    Portfolio
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Save Button */}
                        {isEditing && (
                            <div className="flex justify-end gap-3 mt-8 pt-6" style={{ borderTop: '1px solid var(--border)' }}>
                                <button
                                    type="button"
                                    onClick={() => setIsEditing(false)}
                                    className="px-6 py-2.5 rounded-xl transition-colors font-medium"
                                    style={{ backgroundColor: 'var(--bg-tertiary)', color: 'var(--text-secondary)' }}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-6 py-2.5 rounded-xl transition-all shadow-lg font-medium flex items-center gap-2 text-white"
                                    style={{ backgroundColor: 'var(--primary)' }}
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    Save Changes
                                </button>
                            </div>
                        )}
                    </div>
                </form>

                {/* Resume Section */}
                <div className="rounded-2xl p-6 mt-6" style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border)' }}>
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-semibold flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
                            <span className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'rgba(249, 115, 22, 0.2)' }}>📄</span>
                            Resume
                        </h2>
                        <button
                            onClick={() => navigate('/resumeUpload')}
                            className="px-4 py-2 rounded-xl transition-colors flex items-center gap-2"
                            style={{ backgroundColor: 'rgba(59, 130, 246, 0.2)', color: 'var(--primary)' }}
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                            </svg>
                            Upload New
                        </button>
                    </div>
                    <div className="rounded-xl p-4 flex items-center justify-between" style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border)' }}>
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'rgba(239, 68, 68, 0.2)' }}>
                                <svg className="w-5 h-5" style={{ color: 'var(--error)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                            </div>
                            <div>
                                <p className="font-medium" style={{ color: 'var(--text-primary)' }}>Resume_2026.pdf</p>
                                <p className="text-sm" style={{ color: 'var(--text-muted)' }}>Uploaded on Jan 15, 2026</p>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <button className="p-2 rounded-lg transition-colors" style={{ color: 'var(--text-muted)' }}>
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                </svg>
                            </button>
                            <button className="p-2 rounded-lg transition-colors" style={{ color: 'var(--text-muted)' }}>
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Danger Zone */}
                <div className="rounded-2xl p-6 mt-6" style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)' }}>
                    <h2 className="text-xl font-semibold flex items-center gap-2 mb-4" style={{ color: 'var(--error)' }}>
                        <span className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'rgba(239, 68, 68, 0.2)' }}>⚠️</span>
                        Danger Zone
                    </h2>
                    <p className="mb-4" style={{ color: 'var(--text-muted)' }}>Once you delete your account, there is no going back. Please be certain.</p>
                    <button className="px-4 py-2 rounded-xl transition-colors" style={{ backgroundColor: 'rgba(239, 68, 68, 0.2)', color: 'var(--error)', border: '1px solid rgba(239, 68, 68, 0.3)' }}>
                        Delete Account
                    </button>
                </div>
            </div>
        </div>
    );
}

// Reusable Input Field Component
function InputField({ label, name, type = 'text', value, onChange, disabled, placeholder, icon }) {
    return (
        <div>
            <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>{label}</label>
            <div className="relative">
                {icon && (
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2" style={{ color: 'var(--text-muted)' }}>
                        {icon}
                    </div>
                )}
                <input
                    type={type}
                    name={name}
                    value={value}
                    onChange={onChange}
                    disabled={disabled}
                    placeholder={placeholder}
                    className={`w-full ${icon ? 'pl-11' : 'pl-4'} pr-4 py-3 bg-gray-900/50 border rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all ${disabled ? 'border-gray-700/50 cursor-not-allowed opacity-75' : 'border-gray-600 hover:border-gray-500'
                        }`}
                />
            </div>
        </div>
    );
}

export default Profile;