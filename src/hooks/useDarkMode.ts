import { useEffect, useState } from 'react';

function useDarkMode(): [string, (theme: string) => void] {
  const [theme, setTheme] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') || 'light';
    }
    return 'light';
  });

  const colorTheme = theme === "dark" ? "light" : "dark";

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const root = window.document.documentElement;
      root.classList.remove(colorTheme);
      root.classList.add(theme);
      localStorage.setItem('theme', theme);
    }
  }, [theme, colorTheme]);

  return [colorTheme, setTheme];
}

export default useDarkMode;
