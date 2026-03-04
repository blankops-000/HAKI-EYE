import { Moon, Sun } from 'lucide-react';
import { useEffect, useState } from 'react';

const STORAGE_KEY = 'uwazi_eye_theme';

function getInitialTheme() {
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved === 'dark' || saved === 'light') {
      return saved;
    }
  } catch {
    return 'dark';
  }
  return 'dark';
}

function applyTheme(theme) {
  document.documentElement.classList.toggle('dark', theme === 'dark');
  try {
    window.localStorage.setItem(STORAGE_KEY, theme);
  } catch {
    // ignore storage restrictions
  }
}

function ThemeToggle({ compactOnMobile = false }) {
  const [theme, setTheme] = useState(() => getInitialTheme());

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((current) => (current === 'dark' ? 'light' : 'dark'));
  };

  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={`inline-flex items-center rounded-lg border border-kenyaGreen bg-white py-2 text-xs font-medium text-kenyaGreen hover:border-kenyaRed hover:text-kenyaRed dark:bg-zinc-800 dark:text-emerald-300 dark:border-emerald-500 ${
        compactOnMobile ? 'gap-0 px-2 sm:gap-2 sm:px-3' : 'gap-2 px-3'
      }`}
      aria-label="Toggle dark mode"
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {isDark ? <Sun size={16} /> : <Moon size={16} />}
      {compactOnMobile ? (
        <span className="hidden sm:inline">{isDark ? 'Light Mode' : 'Dark Mode'}</span>
      ) : (
        <span>{isDark ? 'Light Mode' : 'Dark Mode'}</span>
      )}
    </button>
  );
}

export default ThemeToggle;
