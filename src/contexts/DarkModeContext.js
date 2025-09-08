import React, { createContext, useContext, useState, useEffect } from 'react';

// Create the Dark Mode Context
const DarkModeContext = createContext();

// Custom hook to use dark mode
export const useDarkMode = () => {
  const context = useContext(DarkModeContext);
  if (!context) {
    throw new Error('useDarkMode must be used within a DarkModeProvider');
  }
  return context;
};

// Dark Mode Provider Component
export const DarkModeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);

  // Load dark mode preference from localStorage on mount
  useEffect(() => {
    const savedDarkMode = localStorage.getItem('darkMode');
    if (savedDarkMode !== null) {
      const isDarkMode = JSON.parse(savedDarkMode);
      setDarkMode(isDarkMode);
      applyDarkModeToDocument(isDarkMode);
    }
  }, []);

  // Apply dark mode classes to document
  const applyDarkModeToDocument = (isDarkMode) => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      document.body.classList.add('bg-gray-900', 'text-white');
      document.body.classList.remove('bg-white', 'text-gray-900');
    } else {
      document.documentElement.classList.remove('dark');
      document.body.classList.add('bg-white', 'text-gray-900');
      document.body.classList.remove('bg-gray-900', 'text-white');
    }
  };

  // Toggle dark mode
  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem('darkMode', JSON.stringify(newDarkMode));
    applyDarkModeToDocument(newDarkMode);
  };

  // Enable dark mode
  const enableDarkMode = () => {
    if (!darkMode) {
      toggleDarkMode();
    }
  };

  // Disable dark mode
  const disableDarkMode = () => {
    if (darkMode) {
      toggleDarkMode();
    }
  };

  const value = {
    darkMode,
    toggleDarkMode,
    enableDarkMode,
    disableDarkMode
  };

  return (
    <DarkModeContext.Provider value={value}>
      {children}
    </DarkModeContext.Provider>
  );
};

export default DarkModeContext;
