import toast from "react-hot-toast";

// Custom toast utility with consistent styling
const customToast = {
  success: (message, options = {}) => {
    return toast.success(message, {
      duration: 4000,
      style: {
        background: 'var(--bg-card)',
        color: 'var(--text-primary)',
        border: '1px solid #10b981',
        borderRadius: '12px',
        boxShadow: 'var(--shadow-lg)',
        padding: '16px',
        fontSize: '14px',
        fontWeight: '500',
        maxWidth: '400px',
      },
      iconTheme: {
        primary: '#10b981',
        secondary: 'var(--bg-card)',
      },
      ...options,
    });
  },

  error: (message, options = {}) => {
    return toast.error(message, {
      duration: 5000,
      style: {
        background: 'var(--bg-card)',
        color: 'var(--text-primary)',
        border: '1px solid #ef4444',
        borderRadius: '12px',
        boxShadow: 'var(--shadow-lg)',
        padding: '16px',
        fontSize: '14px',
        fontWeight: '500',
        maxWidth: '400px',
      },
      iconTheme: {
        primary: '#ef4444',
        secondary: 'var(--bg-card)',
      },
      ...options,
    });
  },

  loading: (message, options = {}) => {
    return toast.loading(message, {
      style: {
        background: 'var(--bg-card)',
        color: 'var(--text-primary)',
        border: '1px solid var(--border-color)',
        borderRadius: '12px',
        boxShadow: 'var(--shadow-lg)',
        padding: '16px',
        fontSize: '14px',
        fontWeight: '500',
        maxWidth: '400px',
      },
      ...options,
    });
  },

  promise: (promise, messages, options = {}) => {
    return toast.promise(promise, messages, {
      style: {
        background: 'var(--bg-card)',
        color: 'var(--text-primary)',
        borderRadius: '12px',
        boxShadow: 'var(--shadow-lg)',
        padding: '16px',
        fontSize: '14px',
        fontWeight: '500',
        maxWidth: '400px',
      },
      success: {
        style: {
          border: '1px solid #10b981',
        },
        iconTheme: {
          primary: '#10b981',
          secondary: 'var(--bg-card)',
        },
      },
      error: {
        style: {
          border: '1px solid #ef4444',
        },
        iconTheme: {
          primary: '#ef4444',
          secondary: 'var(--bg-card)',
        },
      },
      loading: {
        style: {
          border: '1px solid var(--border-color)',
        },
      },
      ...options,
    });
  },

  // Alias for easier migration
  dismiss: toast.dismiss,
  remove: toast.remove,
};

export default customToast;
