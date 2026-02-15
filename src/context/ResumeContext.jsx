/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from "react";

const ResumeContext = createContext();

export const ResumeProvider = ({ children }) => {
    const [activeResumeId, setActiveResumeId] = useState(null);
    const [resumeList, setResumeList] = useState([]);

    return (
        <ResumeContext.Provider
            value={{
                activeResumeId,
                setActiveResumeId,
                resumeList,
                setResumeList,
            }}
        >
            {children}
        </ResumeContext.Provider>
    );
};

export const useResume = () => useContext(ResumeContext);
