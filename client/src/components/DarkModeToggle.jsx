import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useDarkMode } from '../contexts/DarkModeContext';

const DarkModeToggle = ({ className = "" }) => {
  const { isDarkMode, toggleDarkMode, isLoading } = useDarkMode();

  if (isLoading) {
    return (
      <div className={`relative w-8 h-8 flex items-center justify-center ${className}`}>
        <div className="w-5 h-5 rounded-full bg-gray-300 dark:bg-gray-600 animate-pulse"></div>
      </div>
    );
  }

  return (
    <button
      onClick={toggleDarkMode}
      className={`relative group w-8 h-8 flex items-center justify-center rounded-full bg-gray-100/80 dark:bg-gray-800/80 hover:bg-gray-200/80 dark:hover:bg-gray-700/80 transition-all duration-300 ease-in-out border border-gray-200/50 dark:border-gray-700/50 shadow-sm hover:shadow-lg backdrop-blur-sm cursor-pointer ${className}`}
      aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
      aria-pressed={isDarkMode}
    >
      <div className="relative w-4 h-4 overflow-hidden">
        {/* Sun Icon */}
        <Sun 
          className={`absolute inset-0 w-4 h-4 text-amber-500 transition-all duration-500 ease-in-out transform ${
            isDarkMode 
              ? 'rotate-180 scale-0 opacity-0 translate-y-2' 
              : 'rotate-0 scale-100 opacity-100 translate-y-0'
          }`}
        />
        
        {/* Moon Icon */}
        <Moon 
          className={`absolute inset-0 w-4 h-4 text-indigo-400 transition-all duration-500 ease-in-out transform ${
            isDarkMode 
              ? 'rotate-0 scale-100 opacity-100 translate-y-0' 
              : '-rotate-180 scale-0 opacity-0 -translate-y-2'
          }`}
        />
      </div>
      
      {/* Enhanced Tooltip */}
      <div className="absolute top-full right-0 mt-3 px-3 py-1.5 text-xs font-medium text-white bg-gray-900/90 dark:bg-gray-100/90 dark:text-gray-900 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap z-50 backdrop-blur-sm border border-gray-700/20 dark:border-gray-300/20 pointer-events-none transform translate-y-1 group-hover:translate-y-0">
        {isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
        {/* Tooltip arrow */}
        <div className="absolute bottom-full right-3 w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-gray-900/90 dark:border-b-gray-100/90"></div>
      </div>
      
      {/* Ripple effect */}
      <div className="absolute inset-0 rounded-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-active:translate-x-full transition-transform duration-500"></div>
      </div>
    </button>
  );
};

export default DarkModeToggle;
