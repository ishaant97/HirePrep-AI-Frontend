/* eslint-disable react-refresh/only-export-components */
import { createContext, useCallback, useContext, useEffect, useState } from "react";
import api from "../api/axios";

const ResumeContext = createContext();

export const ResumeProvider = ({ children }) => {
    const [activeResumeId, setActiveResumeId] = useState(null);
    const [resumeList, setResumeList] = useState([]);

    // Analytics state for the currently selected resume
    const [analytics, setAnalytics] = useState(null);
    const [analyticsLoading, setAnalyticsLoading] = useState(false);
    const [analyticsError, setAnalyticsError] = useState(null);

    // Fetch analytics whenever the active resume changes
    const fetchAnalytics = useCallback(async (resumeId) => {
        if (!resumeId) {
            setAnalytics(null);
            setAnalyticsError(null);
            return;
        }

        setAnalyticsLoading(true);
        setAnalyticsError(null);

        try {
            const res = await api.get(`/resume/analytics/${resumeId}`);
            setAnalytics(res.data);
        } catch (err) {
            console.error("Failed to fetch resume analytics", err);
            setAnalyticsError(err?.response?.data?.message || "Failed to fetch analytics");
            setAnalytics(null);
        } finally {
            setAnalyticsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchAnalytics(activeResumeId);
    }, [activeResumeId, fetchAnalytics]);

    return (
        <ResumeContext.Provider
            value={{
                activeResumeId,
                setActiveResumeId,
                resumeList,
                setResumeList,
                analytics,
                analyticsLoading,
                analyticsError,
            }}
        >
            {children}
        </ResumeContext.Provider>
    );
};

export const useResume = () => useContext(ResumeContext);
