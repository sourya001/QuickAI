// Theme initialization script to prevent FOUC
(function() {
  try {
    // Get theme from localStorage or system preference
    const savedTheme = localStorage.getItem('darkMode');
    let isDark = false;
    
    if (savedTheme !== null) {
      isDark = JSON.parse(savedTheme);
    } else {
      isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    
    // Apply theme immediately to prevent flash
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
      root.style.colorScheme = 'dark';
    } else {
      root.classList.remove('dark');
      root.style.colorScheme = 'light';
    }
  } catch (error) {
    // Fallback to light mode if there's an error
    console.warn('Error initializing theme:', error);
  }
})();
