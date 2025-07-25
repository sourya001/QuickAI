import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const DarkModeContext = createContext();

export const useDarkMode = () => {
  const context = useContext(DarkModeContext);
  if (!context) {
    throw new Error('useDarkMode must be used within a DarkModeProvider');
  }
  return context;
};

const getInitialTheme = () => {
  // Check if we're in the browser
  if (typeof window === 'undefined') return false;
  
  try {
    // Check localStorage first
    const savedTheme = localStorage.getItem('darkMode');
    if (savedTheme !== null) {
      return JSON.parse(savedTheme);
    }
    
    // Fall back to system preference
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  } catch (error) {
    console.warn('Error reading theme preference:', error);
    return false;
  }
};

export const DarkModeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(getInitialTheme);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Prevent flash of wrong theme
    const applyTheme = () => {
      try {
        const root = document.documentElement;
        
        if (isDarkMode) {
          root.classList.add('dark');
          root.style.colorScheme = 'dark';
        } else {
          root.classList.remove('dark');
          root.style.colorScheme = 'light';
        }
        
        // Save to localStorage
        localStorage.setItem('darkMode', JSON.stringify(isDarkMode));
      } catch (error) {
        console.warn('Error applying theme:', error);
      } finally {
        setIsLoading(false);
      }
    };

    applyTheme();
  }, [isDarkMode]);

  // Listen for system theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = (e) => {
      // Only update if no manual preference is saved
      const savedTheme = localStorage.getItem('darkMode');
      if (savedTheme === null) {
        setIsDarkMode(e.matches);
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const toggleDarkMode = useCallback(() => {
    setIsDarkMode(prevMode => !prevMode);
  }, []);

  const setTheme = useCallback((theme) => {
    setIsDarkMode(theme === 'dark');
  }, []);

  return (
    <DarkModeContext.Provider value={{ 
      isDarkMode, 
      toggleDarkMode, 
      setTheme,
      isLoading 
    }}>
      {children}
    </DarkModeContext.Provider>
  );
};
