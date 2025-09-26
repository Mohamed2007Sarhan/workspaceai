// Theme script to prevent flash of unstyled content

export const themeScript = `
  (function() {
    try {
      const getCookie = (name) => {
        const value = '; ' + document.cookie;
        const parts = value.split('; ' + name + '=');
        if (parts.length === 2) return parts.pop().split(';').shift();
        return null;
      };

      const theme = getCookie('theme') || localStorage.getItem('theme') || 'light';
      const language = getCookie('language') || localStorage.getItem('language') || 'en';
      
      document.documentElement.className = theme;
      document.documentElement.setAttribute('data-theme', theme);
      document.documentElement.lang = language;
      document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    } catch (e) {
      // Fallback to light theme
      document.documentElement.className = 'light';
      document.documentElement.setAttribute('data-theme', 'light');
    }
  })();
`;
