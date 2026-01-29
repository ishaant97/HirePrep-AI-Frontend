import { useState } from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import AIChat from './AIChat';
import {
    Overview,
    PlacementProbability,
    JobRoles,
    SkillGapAnalysis,
    CareerRoadmap,
    ATSResumeScore,
    Analytics,
    InterviewQuestions
    // Settings,
} from './pages';

function Dashboard() {
    const [activeSection, setActiveSection] = useState('overview');
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
    const [isChatOpen, setIsChatOpen] = useState(false);

    // Render active page component
    const renderContent = () => {
        switch (activeSection) {
            case 'overview':
                return <Overview />;
            case 'placement':
                return <PlacementProbability />;
            case 'jobs':
                return <JobRoles />;
            case 'skills':
                return <SkillGapAnalysis />;
            case 'roadmap':
                return <CareerRoadmap />;
            case 'ats':
                return <ATSResumeScore />;
            case 'analytics':
                return <Analytics />;
            case 'interview':
                return <InterviewQuestions />;
            // case 'settings':
            //     return <Settings />;
            default:
                return <Overview />;
        }
    };

    return (
        <div className="min-h-screen bg-gray-950">
            {/* Sidebar */}
            <Sidebar
                activeSection={activeSection}
                onSectionChange={setActiveSection}
                isCollapsed={sidebarCollapsed}
                onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
            />

            {/* Navbar */}
            <Navbar
                onOpenChat={() => setIsChatOpen(true)}
                sidebarCollapsed={sidebarCollapsed}
            />

            {/* Main Content Area */}
            <main
                className={`pt-16 min-h-screen transition-all duration-300 ${sidebarCollapsed ? 'pl-20' : 'pl-64'
                    }`}
            >
                <div className="p-6">
                    {renderContent()}
                </div>
            </main>

            {/* AI Chat Drawer */}
            <AIChat isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
        </div>
    );
}

export default Dashboard;