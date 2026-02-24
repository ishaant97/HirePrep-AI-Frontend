import { useMemo, useState } from 'react';
import api from '../../api/axios';
import { useNavigate } from "react-router";
import { useResume } from '../../context/ResumeContext';
import Loader from '../Loader/Loader';

function ResumeUpload() {
    const navigate = useNavigate();
    const { setActiveResumeId } = useResume();
    const [selectedFile, setSelectedFile] = useState(null);
    const [isDragging, setIsDragging] = useState(false);
    const [isParsing, setIsParsing] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [formData, setFormData] = useState({
        // Personal Information
        name: '',
        email: '',
        phone: '',
        linkedin: '',
        github: '',

        // Academic & Skill Metrics
        cgpa: '',
        tenthPercent: '',
        twelfthPercent: '',
        backlogs: '0',
        communicationRating: '',
        hackathon: 'No',

        // Career
        desiredRole: '',
        // experienceLevel: 'Entry-Level',
        experienceYears: '',

        // Internships
        internships: [{
            company: '',
            role: ''
        }],

        // Skills
        skills: [],

        // Projects (just names)
        projects: [],

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
            formDataToSend.append("resume", selectedFile);

            const res = await api.post("/resume/parseResume", formDataToSend);
            const parsedData = res.data;
            // console.log(parsedData);

            // Reset to defaults, then overlay only what the parser returned
            setFormData({
                name: parsedData.name || '',
                email: parsedData.email || '',
                phone: parsedData.phone || '',
                linkedin: parsedData.linkedin || '',
                github: parsedData.github || '',
                cgpa: parsedData.cgpa?.toString() || '',
                tenthPercent: parsedData.tenth_percent?.toString() || '',
                twelfthPercent: parsedData.twelfth_percent?.toString() || '',
                backlogs: parsedData.backlogs?.toString() || '0',
                communicationRating: parsedData.communication_rating?.toString() || '',
                hackathon: parsedData.hackathon || 'No',
                // desiredRole: parsedData.desired_role || '',
                // experienceLevel: parsedData.experience_level || 'Entry-Level',
                experienceYears: parsedData.experienceYears?.toString() || '',
                skills: parsedData.skills || [],
                projects: parsedData.projects || [],
                certifications: parsedData.certifications || [],
                internships: parsedData.internships?.length > 0
                    ? parsedData.internships
                    : [{ company: '', role: '' }]
            });

            setIsParsing(false);
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

    const addInternship = () => {
        setFormData({
            ...formData,
            internships: [...formData.internships, {
                company: '',
                role: ''
            }]
        });
    };

    const removeItem = (section, index) => {
        const updatedArray = formData[section].filter((_, i) => i !== index);
        setFormData({ ...formData, [section]: updatedArray });
    };

    const requiredFields = [
        { key: 'name', label: 'Full Name' },
        { key: 'email', label: 'Email' },
        { key: 'phone', label: 'Phone' },
        { key: 'desiredRole', label: 'Desired Role' },
        { key: 'experienceYears', label: 'Experience in Years' },
        { key: 'cgpa', label: 'Current CGPA' },
        { key: 'tenthPercent', label: '10th Percentage' },
        { key: 'twelfthPercent', label: '12th Percentage' },
        { key: 'backlogs', label: 'Active Backlogs' },
        { key: 'communicationRating', label: 'Communication Skills' },
        { key: 'hackathon', label: 'Hackathon Participation' },
    ];

    const handleFinalUpload = async () => {
        const missing = requiredFields.filter(f => !formData[f.key]?.toString().trim());
        if (missing.length > 0) {
            alert(`Please fill in the following required fields:\n${missing.map(f => `• ${f.label}`).join('\n')}`);
            return;
        }

        setIsUploading(true);

        try {
            // Filter out empty internships
            const validInternships = formData.internships.filter(
                intern => intern.company.trim() && intern.role.trim()
            );

            const payload = {
                name: formData.name,
                originalFileName: formData.originalFileName,
                email: formData.email,
                phone: formData.phone,
                linkedin: formData.linkedin || undefined,
                github: formData.github || undefined,
                cgpa: formData.cgpa ? parseFloat(formData.cgpa) : undefined,
                tenth_percent: formData.tenthPercent ? parseFloat(formData.tenthPercent) : undefined,
                twelfth_percent: formData.twelfthPercent ? parseFloat(formData.twelfthPercent) : undefined,
                backlogs: formData.backlogs ? parseInt(formData.backlogs) : 0,
                communication_rating: formData.communicationRating ? parseInt(formData.communicationRating) : undefined,
                hackathon: formData.hackathon,
                desired_role: formData.desiredRole || undefined,
                // experience: validInternships.length, // Calculate from internships count
                // experience_level: formData.experienceLevel,
                experience_years: formData.experienceYears ? parseFloat(formData.experienceYears) : undefined,
                skills: formData.skills.length > 0 ? formData.skills : undefined,
                project: formData.projects.length > 0 ? formData.projects : undefined,
                certifications: formData.certifications.length > 0 ? formData.certifications : undefined,
                internships: validInternships.length > 0 ? validInternships : undefined
            };

            const finalFormData = new FormData();
            finalFormData.append("resume", selectedFile);
            finalFormData.append("resumeData", JSON.stringify(payload));

            const res = await api.post("/resume/save", finalFormData);
            const { resumeId } = res.data;

            // Set the newly saved resume as active so polling starts immediately
            if (resumeId) {
                setActiveResumeId(resumeId);
            }

            navigate('/dashboard');
        } catch (error) {
            console.error('Error uploading resume:', error);
            alert(error.response?.data?.message || "Upload failed");
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

                <div className="grid gap-6 lg:grid-cols-[360px_minmax(0,1fr)] flex-1 min-h-0 overflow-hidden pb-4">
                    {/* Left Section - Resume Upload Only */}
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
                                        <label className={labelClass}>Full Name <span className="text-red-400">*</span></label>
                                        <input
                                            className={inputClass}
                                            type="text"
                                            placeholder="John Doe"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className={labelClass}>Email <span className="text-red-400">*</span></label>
                                        <input
                                            className={inputClass}
                                            type="email"
                                            placeholder="john@example.com"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className={labelClass}>Phone <span className="text-red-400">*</span></label>
                                        <input
                                            className={inputClass}
                                            type="tel"
                                            placeholder="+91 234 567 8900"
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
                                        <label className={labelClass}>Desired Role <span className="text-red-400">*</span></label>
                                        <input
                                            className={inputClass}
                                            type="text"
                                            placeholder="Full Stack Developer, etc.."
                                            value={formData.desiredRole}
                                            onChange={(e) => setFormData({ ...formData, desiredRole: e.target.value })}
                                        />
                                    </div>
                                    {/* <div className="space-y-1.5">
                                        <label className={labelClass}>Experience Level</label>
                                        <select
                                            className={inputClass}
                                            value={formData.experienceLevel}
                                            onChange={(e) => setFormData({ ...formData, experienceLevel: e.target.value })}
                                        >
                                            <option value="Entry-Level">Entry-Level</option>
                                            <option value="Mid-Level">Mid-Level</option>
                                            <option value="Senior-Level">Senior-Level</option>
                                        </select>
                                    </div> */}

                                    <div className="space-y-1.5">
                                        <label className={labelClass}>Experience in years <span className="text-red-400">*</span></label>
                                        <input
                                            className={inputClass}
                                            type="number"
                                            step="0.01"
                                            placeholder="e.g. 2.5"
                                            value={formData.experienceYears}
                                            onChange={(e) => setFormData({ ...formData, experienceYears: e.target.value })}
                                        />
                                    </div>
                                </div>
                            </section>

                            {/* Academic & Skill Metrics */}
                            <section className="space-y-4">
                                <h3 className="text-lg font-semibold text-white flex items-center gap-2">📊 Academic & Skill Metrics</h3>
                                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                                    <div className="space-y-1.5">
                                        <label className={labelClass}>Current CGPA (on a scale of 10) <span className="text-red-400">*</span></label>
                                        <input
                                            className={inputClass}
                                            type="number"
                                            step="0.01"
                                            placeholder="e.g. 8.5"
                                            value={formData.cgpa}
                                            onChange={(e) => setFormData({ ...formData, cgpa: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className={labelClass}>10th Percentage (on a scale of 100) <span className="text-red-400">*</span></label>
                                        <input
                                            className={inputClass}
                                            type="number"
                                            step="0.01"
                                            placeholder="e.g. 92.5"
                                            value={formData.tenthPercent}
                                            onChange={(e) => setFormData({ ...formData, tenthPercent: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className={labelClass}>12th Percentage (on a scale of 100) <span className="text-red-400">*</span></label>
                                        <input
                                            className={inputClass}
                                            type="number"
                                            step="0.01"
                                            placeholder="e.g. 89.0"
                                            value={formData.twelfthPercent}
                                            onChange={(e) => setFormData({ ...formData, twelfthPercent: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className={labelClass}>Active Backlogs <span className="text-red-400">*</span></label>
                                        <input
                                            className={inputClass}
                                            type="number"
                                            min="0"
                                            placeholder="Enter 0 if none"
                                            value={formData.backlogs}
                                            onChange={(e) => setFormData({ ...formData, backlogs: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className={labelClass}>Communication Skills (1-5) <span className="text-red-400">*</span></label>
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
                                        <label className={labelClass}>Hackathon Participation <span className="text-red-400">*</span></label>
                                        <select
                                            className={inputClass}
                                            value={formData.hackathon}
                                            onChange={(e) => setFormData({ ...formData, hackathon: e.target.value })}
                                        >
                                            <option value="No">No</option>
                                            <option value="Yes">Yes</option>
                                        </select>
                                    </div>
                                </div>
                            </section>

                            {/* Internships/Experience */}
                            <section className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-lg font-semibold text-white flex items-center gap-2">💼 Internships / Experience</h3>
                                    <button className="rounded-lg bg-purple-600 px-3 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-purple-500" onClick={addInternship}>+ Add Internship</button>
                                </div>
                                <div className="space-y-4">
                                    {formData.internships.map((internship, index) => (
                                        <div key={index} className="space-y-4 rounded-xl border border-purple-500/30 bg-gray-800/50 px-4 py-4">
                                            <div className="flex items-center justify-between">
                                                <span className="text-sm font-semibold text-purple-400">Internship {index + 1}</span>
                                                {formData.internships.length > 1 && (
                                                    <button className="rounded-md bg-rose-500 px-2 py-1 text-xs font-semibold text-white hover:bg-rose-600" onClick={() => removeItem('internships', index)}>🗑️</button>
                                                )}
                                            </div>
                                            <div className="grid gap-4 md:grid-cols-2">
                                                <div className="space-y-1.5">
                                                    <label className={labelClass}>Company Name</label>
                                                    <input
                                                        className={inputClass}
                                                        type="text"
                                                        placeholder="Company Name"
                                                        value={internship.company}
                                                        onChange={(e) => handleInputChange('internships', index, 'company', e.target.value)}
                                                    />
                                                </div>
                                                <div className="space-y-1.5">
                                                    <label className={labelClass}>Role</label>
                                                    <input
                                                        className={inputClass}
                                                        type="text"
                                                        placeholder="Software Developer Intern"
                                                        value={internship.role}
                                                        onChange={(e) => handleInputChange('internships', index, 'role', e.target.value)}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            {/* Projects */}
                            <section className="space-y-4">
                                <h3 className="text-lg font-semibold text-white flex items-center gap-2">🚀 Projects</h3>
                                <div className="space-y-1.5">
                                    <label className={labelClass}>Project Names (comma separated)</label>
                                    <textarea
                                        className={textareaClass}
                                        placeholder="E-commerce App, Portfolio Website, Chat Application..."
                                        value={formData.projects.join(', ')}
                                        onChange={(e) => setFormData({ ...formData, projects: e.target.value.split(',').map(s => s.trim()).filter(s => s) })}
                                        rows="2"
                                    />
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
                                        onChange={(e) => setFormData({ ...formData, skills: e.target.value.split(',').map(s => s.trim()).filter(s => s) })}
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
                                        onChange={(e) => setFormData({ ...formData, certifications: e.target.value.split(',').map(s => s.trim()).filter(s => s) })}
                                        rows="2"
                                    />
                                </div>
                            </section>

                            {/* Final Upload Button */}
                            <div className="flex justify-center pt-2">
                                <button
                                    className="rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:shadow-xl hover:from-purple-500 hover:to-indigo-500 disabled:opacity-60 disabled:cursor-not-allowed"
                                    onClick={handleFinalUpload}
                                    disabled={isUploading}
                                >
                                    {isUploading ? 'Submitting...' : 'Submit Profile'}
                                </button>
                            </div>

                            {/* Full-screen loader overlay */}
                            {isUploading && <Loader message="Saving your profile & generating analytics..." />}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ResumeUpload;