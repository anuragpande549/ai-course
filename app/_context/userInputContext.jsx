"use client";

import { createContext, useContext, useState } from "react";

export const UserInputContext = createContext();

export const UserContextProvider = ({ children }) => {
    // Tracks the current step in the 5-step flow
    const [activeStep, setActiveStep] = useState(0);

    // Structure mapping to Step 1 & 2 forms UI
    const [userCourseInput, setUserCourseInput] = useState({
        mode: 'manual',
        topic: '',
        description: '',
        category: '',
        level: 'Beginner',
        file: null
    });

    // Step 3 output - The generated JSON syllabus layout structure
    const [courseLayout, setCourseLayout] = useState(null);

    // The UUID generated from Phase 1 saved in PostgreSQL
    const [courseId, setCourseId] = useState(null);

    return (
        <UserInputContext.Provider value={{
            activeStep, setActiveStep,
            userCourseInput, setUserCourseInput,
            courseLayout, setCourseLayout,
            courseId, setCourseId
        }}>
            {children}
        </UserInputContext.Provider>
    );
};

export const useUserContext = () => {
    return useContext(UserInputContext);
};

export default UserContextProvider;
