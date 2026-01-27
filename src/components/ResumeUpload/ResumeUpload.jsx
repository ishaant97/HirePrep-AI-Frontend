import { useMemo, useState } from 'react';
import api from '../../api/axios';

function ResumeUpload() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [isDragging, setIsDragging] = useState(false);
    const [isParsing, setIsParsing] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [formData, setFormData] = useState({
        // Personal Information
        fullName: '',
        email: '',
        phone: '',
        linkedin: '',
        github: '',
        portfolio: '',

        // Additional Metrics (Manual Input)
        communicationRating: '',
        activeBacklogs: '0',
        tenthPercentage: '',
        twelfthPercentage: '',
        hackathonParticipation: 'No',

        // Education
        education: [{
            school: '',
            degree: '',
            fieldOfStudy: '',
            startDate: '',
            endDate: '',
            cgpa: '',
            description: ''
        }],

        // Experience
        experience: [{
            company: '',
            position: '',
            location: '',
            startDate: '',
            endDate: '',
            description: ''
        }],

        // Skills
        skills: [],

        // Projects
        projects: [{
            name: '',
            description: '',
            technologies: '',
            link: ''
        }],

        // Certifications
        certifications: []
    });

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);

        const file = e.dataTransfer.files[0];
        if (file && (file.type === 'application/pdf')) {
            setSelectedFile(file);
        } else {
            alert('Please upload a PDF file only.');
        }
    };

    const handleFileSelect = (e) => {
        const file = e.target.files[0];
        if (file && (file.type === 'application/pdf')) {
            setSelectedFile(file);
        } else {
            alert('Please upload a PDF file only.');
        }
    };

    const handleParseResume = async () => {
        if (!selectedFile) {
            alert('Please select a resume file first');
            return;
        }

        setIsParsing(true);

        try {
            const formDataToSend = new FormData();
            formDataToSend.append('resume', selectedFile);

            // TODO: Replace with your actual ML Backend Endpoint
            // const response = await fetch('YOUR_ML_BACKEND_URL/parse-resume', {
            //     method: 'POST',
            //     body: formDataToSend
            // });
            // const parsedData = await response.json();

            // NOTE: When integrating, ensure you merge parsedData with existing manual fields
            // setFormData(prev => ({
            //     ...prev,
            //     ...parsedData,
            //     // Ensure manual fields aren't overwritten if the parser sends them as null/undefined
            //     communicationRating: prev.communicationRating,
            //     activeBacklogs: prev.activeBacklogs,
            //     tenthPercentage: prev.tenthPercentage,
            //     twelfthPercentage: prev.twelfthPercentage,
            //     hackathonParticipation: prev.hackathonParticipation
            // }));

            // Mock simulation for UI feedback
            setTimeout(() => {
                alert('Sent to ML Parser. Forms will auto-fill with response data.');
                setIsParsing(false);
            }, 1500);

        } catch (error) {
            console.error('Error parsing resume:', error);
            alert('Failed to parse resume. Please try again.');
            setIsParsing(false);
        }
    };

    const handleInputChange = (section, index, field, value) => {
        if (Array.isArray(formData[section])) {
            const updatedArray = [...formData[section]];
            updatedArray[index][field] = value;
            setFormData({ ...formData, [section]: updatedArray });
        } else {
            setFormData({ ...formData, [field]: value });
        }
    };

    const addEducation = () => {
        setFormData({
            ...formData,
            education: [...formData.education, {
                school: '',
                degree: '',
                fieldOfStudy: '',
                startDate: '',
                endDate: '',
                cgpa: '',
                description: ''
            }]
        });
    };

    const addExperience = () => {
        setFormData({
            ...formData,
            experience: [...formData.experience, {
                company: '',
                position: '',
                location: '',
                startDate: '',
                endDate: '',
                description: ''
            }]
        });
    };

    const addProject = () => {
        setFormData({
            ...formData,
            projects: [...formData.projects, {
                name: '',
                description: '',
                technologies: '',
                link: ''
            }]
        });
    };

    const removeItem = (section, index) => {
        const updatedArray = formData[section].filter((_, i) => i !== index);
        setFormData({ ...formData, [section]: updatedArray });
    };

    const handleFinalUpload = async () => {
        setIsUploading(true);

        try {
            const payload = {
                fullName: formData.fullName,
                email: formData.email,
                phone: formData.phone,
                linkedin: formData.linkedin,
                github: formData.github,
                portfolio: formData.portfolio,
                communicationRating: formData.communicationRating,
                activeBacklogs: formData.activeBacklogs,
                tenthPercentage: formData.tenthPercentage,
                twelfthPercentage: formData.twelfthPercentage,
                hackathonParticipation: formData.hackathonParticipation,
                education: formData.education,
                experience: formData.experience,
                skills: formData.skills,
                projects: formData.projects,
                certifications: formData.certifications
            };

            await api.post("/resume/save", payload);
            alert('Profile submitted successfully for analysis!');
        } catch (error) {
            console.error('Error uploading resume:', error);
            alert('Failed to upload resume. Please try again.');
        } finally {
            setIsUploading(false);
        }
    };

    const dropZoneClasses = useMemo(() => {
        const base = 'relative flex flex-col items-center justify-center gap-4 rounded-2xl border-2 border-dashed border-purple-500/40 bg-gray-700/50 px-6 py-10 text-center transition-all duration-200 cursor-pointer';
        const dragging = isDragging ? ' border-purple-400 bg-purple-900/30 shadow-md scale-[1.01]' : '';
        const hasFile = selectedFile ? ' border-emerald-500 bg-emerald-900/30' : '';
        return `${base}${dragging}${hasFile}`;
    }, [isDragging, selectedFile]);

    const labelClass = 'text-sm font-medium text-gray-300 mb-2';
    const inputClass = 'w-full rounded-lg border border-purple-500/40 bg-gray-700/70 px-3 py-2.5 text-sm text-white placeholder-gray-400 shadow-sm focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-500/30';
    const textareaClass = 'w-full rounded-lg border border-purple-500/40 bg-gray-700/70 px-3 py-2.5 text-sm text-white placeholder-gray-400 shadow-sm focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-500/30 resize-y min-h-[90px]';

    return (
        <div className="h-screen w-screen overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 px-4 py-8 flex flex-col items-center">
            <div className="w-full max-w-7xl flex flex-col h-full space-y-6">
                <div className="text-center text-white space-y-1 shrink-0">
                    <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight drop-shadow-lg">HirePrep AI - Profile Builder</h1>
                    <p className="text-sm sm:text-lg text-purple-200/80">Upload your resume and provide details for Placement Prediction & Analysis</p>
                </div>

                <div className="grid gap-6 lg:grid-cols-[420px_minmax(0,1fr)] flex-1 min-h-0 overflow-hidden pb-4">
                    {/* Left Section - Resume Upload & Manual Metrics */}
                    <div className="lg:h-full overflow-y-auto pr-2 custom-scrollbar space-y-6">
                        <div className="rounded-2xl bg-gray-900/40 backdrop-blur-xl shadow-2xl p-6 space-y-4 border border-white/10">
                            <div className="space-y-1">
                                <h2 className="text-xl font-semibold text-white">Upload Resume</h2>
                                <p className="text-sm text-gray-400">Our Resume parser will extract your details. Please fill in any missing information manually.</p>
                            </div>

                            <div
                                className={dropZoneClasses}
                                onDragOver={handleDragOver}
                                onDragLeave={handleDragLeave}
                                onDrop={handleDrop}
                                onClick={() => document.getElementById('resume-file')?.click()}
                            >
                                <div className="text-5xl">📄</div>
                                <div className="space-y-1">
                                    <p className="text-sm font-semibold text-gray-200 uppercase">
                                        {selectedFile ? selectedFile.name : 'Drop your PDF resume here or click to browse'}
                                    </p>
                                    <p className="text-xs text-gray-400 font-medium">PDF up to 10MB</p>
                                </div>
                                <input
                                    type="file"
                                    id="resume-file"
                                    accept=".pdf"
                                    onChange={handleFileSelect}
                                    className="hidden"
                                />
                                <span className="inline-flex items-center gap-2 rounded-lg bg-purple-600 px-4 py-2 text-sm font-semibold text-white shadow-md transition hover:bg-purple-500">
                                    {selectedFile ? 'Change File' : 'Upload Files'}
                                </span>
                            </div>

                            <button
                                className="w-full rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 px-4 py-3 text-sm font-semibold text-white shadow-lg transition hover:shadow-xl hover:from-purple-500 hover:to-indigo-500 disabled:opacity-60 disabled:cursor-not-allowed"
                                onClick={handleParseResume}
                                disabled={!selectedFile || isParsing}
                            >
                                {isParsing ? 'Processing...' : 'Auto-Fill from Resume'}
                            </button>

                            {selectedFile && (
                                <div className="rounded-xl bg-gray-800/50 border border-purple-500/30 px-3 py-2 text-xs text-gray-300 space-y-1">
                                    <p><span className="font-semibold text-purple-300">Selected File:</span> {selectedFile.name}</p>
                                    <p><span className="font-semibold text-purple-300">Size:</span> {(selectedFile.size / 1024).toFixed(2)} KB</p>
                                </div>
                            )}
                        </div>

                        {/* Academic & Skill Metrics - Manual Input Section */}
                        <div className="rounded-2xl bg-gradient-to-br from-purple-900/40 to-indigo-900/40 backdrop-blur-xl shadow-2xl p-6 space-y-4 border border-purple-500/30">
                            <div className="space-y-1">
                                <h2 className="text-xl font-semibold text-white flex items-center gap-2">📊 Academic & Skill Metrics</h2>
                                <p className="text-sm text-purple-300">Required for prediction models. Please fill manually.</p>
                            </div>
                            <div className="grid gap-4">
                                <div className="space-y-1.5">
                                    <label className={labelClass}>Communication Skills (1-5)</label>
                                    <input
                                        className={inputClass}
                                        type="number"
                                        min="1"
                                        max="5"
                                        placeholder="Rate out of 5"
                                        value={formData.communicationRating}
                                        onChange={(e) => setFormData({ ...formData, communicationRating: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <label className={labelClass}>Active Backlogs</label>
                                    <input
                                        className={inputClass}
                                        type="number"
                                        min="0"
                                        placeholder="Enter 0 if none"
                                        value={formData.activeBacklogs}
                                        onChange={(e) => setFormData({ ...formData, activeBacklogs: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <label className={labelClass}>10th Percentage/CGPA</label>
                                    <input
                                        className={inputClass}
                                        type="number"
                                        step="0.01"
                                        placeholder="e.g. 92.5"
                                        value={formData.tenthPercentage}
                                        onChange={(e) => setFormData({ ...formData, tenthPercentage: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <label className={labelClass}>12th Percentage/CGPA</label>
                                    <input
                                        className={inputClass}
                                        type="number"
                                        step="0.01"
                                        placeholder="e.g. 89.0"
                                        value={formData.twelfthPercentage}
                                        onChange={(e) => setFormData({ ...formData, twelfthPercentage: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <label className={labelClass}>Have you participated in any Hackathons?</label>
                                    <select
                                        className={inputClass}
                                        value={formData.hackathonParticipation}
                                        onChange={(e) => setFormData({ ...formData, hackathonParticipation: e.target.value })}
                                    >
                                        <option value="No">No</option>
                                        <option value="Yes">Yes</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Section - Form Fields */}
                    <div className="rounded-2xl bg-gray-900/40 backdrop-blur-xl shadow-2xl p-6 lg:p-7 overflow-y-auto h-full custom-scrollbar border border-white/10">
                        <div className="space-y-1">
                            <h2 className="text-2xl font-semibold text-white">Profile Details</h2>
                            <p className="text-sm text-gray-400">Review parsed data from your resume</p>
                        </div>

                        <div className="mt-6 space-y-8">
                            {/* Personal Information */}
                            <section className="space-y-4">
                                <h3 className="text-lg font-semibold text-white flex items-center gap-2">📋 Personal Information</h3>
                                <div className="grid gap-4 md:grid-cols-2">
                                    <div className="space-y-1.5">
                                        <label className={labelClass}>Full Name</label>
                                        <input
                                            className={inputClass}
                                            type="text"
                                            placeholder="John Doe"
                                            value={formData.fullName}
                                            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className={labelClass}>Email</label>
                                        <input
                                            className={inputClass}
                                            type="email"
                                            placeholder="john@example.com"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className={labelClass}>Phone</label>
                                        <input
                                            className={inputClass}
                                            type="tel"
                                            placeholder="+1 234 567 8900"
                                            value={formData.phone}
                                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className={labelClass}>LinkedIn</label>
                                        <input
                                            className={inputClass}
                                            type="url"
                                            placeholder="linkedin.com/in/johndoe"
                                            value={formData.linkedin}
                                            onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className={labelClass}>GitHub</label>
                                        <input
                                            className={inputClass}
                                            type="url"
                                            placeholder="github.com/johndoe"
                                            value={formData.github}
                                            onChange={(e) => setFormData({ ...formData, github: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className={labelClass}>Portfolio</label>
                                        <input
                                            className={inputClass}
                                            type="url"
                                            placeholder="johndoe.com"
                                            value={formData.portfolio}
                                            onChange={(e) => setFormData({ ...formData, portfolio: e.target.value })}
                                        />
                                    </div>
                                </div>
                            </section>

                            {/* Education */}
                            <section className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-lg font-semibold text-white flex items-center gap-2">🎓 Education</h3>
                                    <button className="rounded-lg bg-purple-600 px-3 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-purple-500" onClick={addEducation}>+ Add Education</button>
                                </div>
                                <div className="space-y-4">
                                    {formData.education.map((edu, index) => (
                                        <div key={index} className="space-y-4 rounded-xl border border-purple-500/30 bg-gray-800/50 px-4 py-4">
                                            <div className="flex items-center justify-between">
                                                <span className="text-sm font-semibold text-purple-400">Education {index + 1}</span>
                                                {formData.education.length > 1 && (
                                                    <button className="rounded-md bg-rose-500 px-2 py-1 text-xs font-semibold text-white hover:bg-rose-600" onClick={() => removeItem('education', index)}>🗑️</button>
                                                )}
                                            </div>
                                            <div className="grid gap-4 md:grid-cols-2">
                                                <div className="space-y-1.5">
                                                    <label className={labelClass}>School/University</label>
                                                    <input
                                                        className={inputClass}
                                                        type="text"
                                                        placeholder="University Name"
                                                        value={edu.school}
                                                        onChange={(e) => handleInputChange('education', index, 'school', e.target.value)}
                                                    />
                                                </div>
                                                <div className="space-y-1.5">
                                                    <label className={labelClass}>Degree</label>
                                                    <input
                                                        className={inputClass}
                                                        type="text"
                                                        placeholder="Bachelor of Technology"
                                                        value={edu.degree}
                                                        onChange={(e) => handleInputChange('education', index, 'degree', e.target.value)}
                                                    />
                                                </div>
                                                <div className="space-y-1.5">
                                                    <label className={labelClass}>Field of Study</label>
                                                    <input
                                                        className={inputClass}
                                                        type="text"
                                                        placeholder="Computer Science"
                                                        value={edu.fieldOfStudy}
                                                        onChange={(e) => handleInputChange('education', index, 'fieldOfStudy', e.target.value)}
                                                    />
                                                </div>
                                                <div className="space-y-1.5">
                                                    <label className={labelClass}>CGPA/Percentage</label>
                                                    <input
                                                        className={inputClass}
                                                        type="text"
                                                        placeholder="8.5"
                                                        value={edu.cgpa}
                                                        onChange={(e) => handleInputChange('education', index, 'cgpa', e.target.value)}
                                                    />
                                                </div>
                                                <div className="space-y-1.5">
                                                    <label className={labelClass}>Start Date</label>
                                                    <input
                                                        className={inputClass}
                                                        type="month"
                                                        value={edu.startDate}
                                                        onChange={(e) => handleInputChange('education', index, 'startDate', e.target.value)}
                                                    />
                                                </div>
                                                <div className="space-y-1.5">
                                                    <label className={labelClass}>End Date</label>
                                                    <input
                                                        className={inputClass}
                                                        type="month"
                                                        value={edu.endDate}
                                                        onChange={(e) => handleInputChange('education', index, 'endDate', e.target.value)}
                                                    />
                                                </div>
                                            </div>
                                            <div className="space-y-1.5">
                                                <label className={labelClass}>Description</label>
                                                <textarea
                                                    className={textareaClass}
                                                    placeholder="Achievements, relevant coursework, etc."
                                                    value={edu.description}
                                                    onChange={(e) => handleInputChange('education', index, 'description', e.target.value)}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            {/* Experience */}
                            <section className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-lg font-semibold text-white flex items-center gap-2">💼 Work Experience</h3>
                                    <button className="rounded-lg bg-purple-600 px-3 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-purple-500" onClick={addExperience}>+ Add Experience</button>
                                </div>
                                <div className="space-y-4">
                                    {formData.experience.map((exp, index) => (
                                        <div key={index} className="space-y-4 rounded-xl border border-purple-500/30 bg-gray-800/50 px-4 py-4">
                                            <div className="flex items-center justify-between">
                                                <span className="text-sm font-semibold text-purple-400">Experience {index + 1}</span>
                                                {formData.experience.length > 1 && (
                                                    <button className="rounded-md bg-rose-500 px-2 py-1 text-xs font-semibold text-white hover:bg-rose-600" onClick={() => removeItem('experience', index)}>🗑️</button>
                                                )}
                                            </div>
                                            <div className="grid gap-4 md:grid-cols-2">
                                                <div className="space-y-1.5">
                                                    <label className={labelClass}>Company</label>
                                                    <input
                                                        className={inputClass}
                                                        type="text"
                                                        placeholder="Company Name"
                                                        value={exp.company}
                                                        onChange={(e) => handleInputChange('experience', index, 'company', e.target.value)}
                                                    />
                                                </div>
                                                <div className="space-y-1.5">
                                                    <label className={labelClass}>Position</label>
                                                    <input
                                                        className={inputClass}
                                                        type="text"
                                                        placeholder="Software Engineer"
                                                        value={exp.position}
                                                        onChange={(e) => handleInputChange('experience', index, 'position', e.target.value)}
                                                    />
                                                </div>
                                                <div className="space-y-1.5">
                                                    <label className={labelClass}>Location</label>
                                                    <input
                                                        className={inputClass}
                                                        type="text"
                                                        placeholder="New York, NY"
                                                        value={exp.location}
                                                        onChange={(e) => handleInputChange('experience', index, 'location', e.target.value)}
                                                    />
                                                </div>
                                                <div className="space-y-1.5">
                                                    <label className={labelClass}>Start Date</label>
                                                    <input
                                                        className={inputClass}
                                                        type="month"
                                                        value={exp.startDate}
                                                        onChange={(e) => handleInputChange('experience', index, 'startDate', e.target.value)}
                                                    />
                                                </div>
                                                <div className="space-y-1.5">
                                                    <label className={labelClass}>End Date</label>
                                                    <input
                                                        className={inputClass}
                                                        type="month"
                                                        value={exp.endDate}
                                                        onChange={(e) => handleInputChange('experience', index, 'endDate', e.target.value)}
                                                    />
                                                </div>
                                            </div>
                                            <div className="space-y-1.5">
                                                <label className={labelClass}>Description</label>
                                                <textarea
                                                    className={textareaClass}
                                                    placeholder="Describe your responsibilities and achievements..."
                                                    value={exp.description}
                                                    onChange={(e) => handleInputChange('experience', index, 'description', e.target.value)}
                                                    rows="4"
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            {/* Projects */}
                            <section className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-lg font-semibold text-white flex items-center gap-2">🚀 Projects</h3>
                                    <button className="rounded-lg bg-purple-600 px-3 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-purple-500" onClick={addProject}>+ Add Project</button>
                                </div>
                                <div className="space-y-4">
                                    {formData.projects.map((project, index) => (
                                        <div key={index} className="space-y-4 rounded-xl border border-purple-500/30 bg-gray-800/50 px-4 py-4">
                                            <div className="flex items-center justify-between">
                                                <span className="text-sm font-semibold text-purple-400">Project {index + 1}</span>
                                                {formData.projects.length > 1 && (
                                                    <button className="rounded-md bg-rose-500 px-2 py-1 text-xs font-semibold text-white hover:bg-rose-600" onClick={() => removeItem('projects', index)}>🗑️</button>
                                                )}
                                            </div>
                                            <div className="grid gap-4 md:grid-cols-2">
                                                <div className="space-y-1.5">
                                                    <label className={labelClass}>Project Name</label>
                                                    <input
                                                        className={inputClass}
                                                        type="text"
                                                        placeholder="Project Name"
                                                        value={project.name}
                                                        onChange={(e) => handleInputChange('projects', index, 'name', e.target.value)}
                                                    />
                                                </div>
                                                <div className="space-y-1.5">
                                                    <label className={labelClass}>Project Link</label>
                                                    <input
                                                        className={inputClass}
                                                        type="url"
                                                        placeholder="github.com/project"
                                                        value={project.link}
                                                        onChange={(e) => handleInputChange('projects', index, 'link', e.target.value)}
                                                    />
                                                </div>
                                            </div>
                                            <div className="space-y-1.5">
                                                <label className={labelClass}>Technologies Used</label>
                                                <input
                                                    className={inputClass}
                                                    type="text"
                                                    placeholder="React, Node.js, MongoDB..."
                                                    value={project.technologies}
                                                    onChange={(e) => handleInputChange('projects', index, 'technologies', e.target.value)}
                                                />
                                            </div>
                                            <div className="space-y-1.5">
                                                <label className={labelClass}>Description</label>
                                                <textarea
                                                    className={textareaClass}
                                                    placeholder="Describe your project..."
                                                    value={project.description}
                                                    onChange={(e) => handleInputChange('projects', index, 'description', e.target.value)}
                                                    rows="3"
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            {/* Skills */}
                            <section className="space-y-4">
                                <h3 className="text-lg font-semibold text-white flex items-center gap-2">💡 Skills</h3>
                                <div className="space-y-1.5">
                                    <label className={labelClass}>Skills (comma separated)</label>
                                    <textarea
                                        className={textareaClass}
                                        placeholder="JavaScript, React, Node.js, Python, SQL..."
                                        value={formData.skills.join(', ')}
                                        onChange={(e) => setFormData({ ...formData, skills: e.target.value.split(',').map(s => s.trim()) })}
                                        rows="3"
                                    />
                                </div>
                            </section>

                            {/* Certifications */}
                            <section className="space-y-4">
                                <h3 className="text-lg font-semibold text-white flex items-center gap-2">🏆 Certifications</h3>
                                <div className="space-y-1.5">
                                    <label className={labelClass}>Certifications (comma separated)</label>
                                    <textarea
                                        className={textareaClass}
                                        placeholder="AWS Certified Developer, Google Cloud Professional..."
                                        value={formData.certifications.join(', ')}
                                        onChange={(e) => setFormData({ ...formData, certifications: e.target.value.split(',').map(s => s.trim()) })}
                                        rows="3"
                                    />
                                </div>
                            </section>

                            {/* Final Upload Button */}
                            <div className="flex justify-center pt-2">
                                <button
                                    className="rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:shadow-xl hover:from-purple-500 hover:to-indigo-500 disabled:opacity-60 disabled:cursor-not-allowed"
                                    onClick={handleFinalUpload}
                                    disabled={isUploading || !selectedFile}
                                >
                                    {isUploading ? 'Submitting...' : 'Submit Profile'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ResumeUpload;