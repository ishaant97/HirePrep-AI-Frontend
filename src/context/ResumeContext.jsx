/* eslint-disable react-refresh/only-export-components */
import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import api from "../api/axios";

const ResumeContext = createContext();

const POLL_INTERVAL = 5000;   // 5 seconds
const MAX_POLL_ATTEMPTS = 60; // 5 minutes max

export const ResumeProvider = ({ children }) => {
    const [activeResumeId, setActiveResumeId] = useState(null);
    const [resumeList, setResumeList] = useState([]);

    // Analytics state for the currently selected resume
    const [analytics, setAnalytics] = useState(null);
    const [analyticsStatus, setAnalyticsStatus] = useState(null); // "pending" | "processing" | "completed" | "failed"
    const [analyticsLoading, setAnalyticsLoading] = useState(false);
    const [analyticsError, setAnalyticsError] = useState(null);

    // Ref to track polling cleanup
    const pollingCleanupRef = useRef(null);

    // Stop any active polling
    const stopPolling = useCallback(() => {
        if (pollingCleanupRef.current) {
            pollingCleanupRef.current();
            pollingCleanupRef.current = null;
        }
    }, []);

    // Poll analytics for a given resumeId
    const pollAnalytics = useCallback((resumeId) => {
        let attempts = 0;
        const timer = setInterval(async () => {
            attempts++;
            try {
                const res = await api.get(`/resume/analytics/${resumeId}`);
                const { analyticsStatus: status, analytics: data } = res.data;

                setAnalyticsStatus(status);

                if (status === "completed") {
                    setAnalytics(data);
                    setAnalyticsLoading(false);
                    clearInterval(timer);
                } else if (status === "failed") {
                    setAnalyticsError("Analytics generation failed. Please try again.");
                    setAnalyticsLoading(false);
                    clearInterval(timer);
                }
                // "pending" / "processing" → keep polling
            } catch (err) {
                console.error("Polling error:", err);
                if (attempts >= MAX_POLL_ATTEMPTS) {
                    setAnalyticsError("Analytics timed out. Please refresh and try again.");
                    setAnalyticsLoading(false);
                    clearInterval(timer);
                }
            }

            if (attempts >= MAX_POLL_ATTEMPTS) {
                clearInterval(timer);
            }
        }, POLL_INTERVAL);

        // Return cleanup function
        return () => clearInterval(timer);
    }, []);

    // Fetch analytics whenever the active resume changes
    const fetchAnalytics = useCallback(async (resumeId) => {
        // Clean up previous polling
        stopPolling();

        if (!resumeId) {
            setAnalytics(null);
            setAnalyticsStatus(null);
            setAnalyticsError(null);
            setAnalyticsLoading(false);
            return;
        }

        setAnalyticsLoading(true);
        setAnalyticsError(null);
        setAnalytics(null);
        setAnalyticsStatus(null);

        try {
            const res = await api.get(`/resume/analytics/${resumeId}`);
            const { analyticsStatus: status, analytics: data } = res.data;

            setAnalyticsStatus(status);

            if (status === "completed") {
                setAnalytics(data);
                setAnalyticsLoading(false);
            } else if (status === "failed") {
                setAnalyticsError("Analytics generation failed. Please try again.");
                setAnalyticsLoading(false);
            } else {
                // "pending" or "processing" → start polling
                pollingCleanupRef.current = pollAnalytics(resumeId);
            }
        } catch (err) {
            console.error("Failed to fetch resume analytics", err);
            setAnalyticsError(err?.response?.data?.message || "Failed to fetch analytics");
            setAnalytics(null);
            setAnalyticsLoading(false);
        }
    }, [stopPolling, pollAnalytics]);

    useEffect(() => {
        fetchAnalytics(activeResumeId);
    }, [activeResumeId, fetchAnalytics]);

    // Cleanup polling on unmount
    useEffect(() => {
        return () => stopPolling();
    }, [stopPolling]);

    return (
        <ResumeContext.Provider
            value={{
                activeResumeId,
                setActiveResumeId,
                resumeList,
                setResumeList,
                analytics,
                analyticsStatus,
                analyticsLoading,
                analyticsError,
                fetchAnalytics,
            }}
        >
            {children}
        </ResumeContext.Provider>
    );
};

export const useResume = () => useContext(ResumeContext);
