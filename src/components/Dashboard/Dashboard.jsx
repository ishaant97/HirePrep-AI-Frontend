import { useState, useEffect } from 'react';
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
    const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
    const [isChatOpen, setIsChatOpen] = useState(false);

    // Close mobile sidebar on resize to desktop
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1024) {
                setMobileSidebarOpen(false);
            }
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

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
            // case 'interview':
            //     return <InterviewQuestions />;
            // case 'settings':
            //     return <Settings />;
            default:
                return <Overview />;
        }
    };

    const handleSectionChange = (section) => {
        setActiveSection(section);
        setMobileSidebarOpen(false); // close mobile drawer on nav
    };

    return (
        <div className="min-h-screen bg-gray-950">
            {/* Mobile sidebar backdrop */}
            {mobileSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
                    onClick={() => setMobileSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <Sidebar
                activeSection={activeSection}
                onSectionChange={handleSectionChange}
                isCollapsed={sidebarCollapsed}
                onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
                mobileSidebarOpen={mobileSidebarOpen}
                onCloseMobileSidebar={() => setMobileSidebarOpen(false)}
            />

            {/* Navbar */}
            <Navbar
                onOpenChat={() => setIsChatOpen(true)}
                sidebarCollapsed={sidebarCollapsed}
                onOpenMobileSidebar={() => setMobileSidebarOpen(true)}
            />

            {/* Main Content Area */}
            <main
                className={`pt-16 min-h-screen transition-all duration-300 ${sidebarCollapsed ? 'lg:pl-20' : 'lg:pl-72'
                    }`}
            >
                <div className="p-3 sm:p-4 md:p-6">
                    {renderContent()}
                </div>
            </main>

            {/* AI Chat Drawer */}
            <AIChat isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
        </div>
    );
}

export default Dashboard;