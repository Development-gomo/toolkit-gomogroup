'use client';

import { useEffect, useState } from 'react';

type ThemeMode = 'light' | 'dark';

function applyTheme(mode: ThemeMode) {
  document.documentElement.dataset.theme = mode;
}

function getInitialTheme(): ThemeMode {
  if (typeof window === 'undefined') {
    return 'light';
  }

  const storedTheme = window.localStorage.getItem('gomotoolkit-theme');

  if (storedTheme === 'dark' || storedTheme === 'light') {
    return storedTheme;
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState<ThemeMode>(getInitialTheme);

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  function toggleTheme() {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';

    setTheme(nextTheme);
    applyTheme(nextTheme);
    window.localStorage.setItem('gomotoolkit-theme', nextTheme);
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="inline-flex items-center justify-center rounded-[8px] border border-[color:var(--secondary-border)] bg-transparent px-3 py-[0.4rem] text-[0.8125rem] font-semibold text-[color:var(--secondary-fg)] transition-[background,border-color] duration-150 hover:bg-[color:var(--surface)] hover:border-[color:var(--accent)]"
      aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      suppressHydrationWarning
    >
      {theme === 'dark' ? 'Light mode' : 'Dark mode'}
    </button>
  );
}
