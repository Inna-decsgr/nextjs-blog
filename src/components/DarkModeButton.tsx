'use client'

import { useEffect, useState } from 'react';
import { FaMoon, FaSun } from 'react-icons/fa';

interface TThemeButtonProps { }

const LOCAL_STORAGE_KEY = {
  THEME: 'theme',
} as const;

const THEME = {
  LIGHT: 'light',
  DARK: 'dark',
} as const;

const DarkModeButton = ({ }: TThemeButtonProps) => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const theme = localStorage.getItem(LOCAL_STORAGE_KEY.THEME) || THEME.LIGHT;
    if (theme === THEME.DARK) {
      document.querySelector('html')?.classList.add(THEME.DARK);
      setDarkMode(true);
    }
  }, [])

    
  const toggleTheme = () => {
    const htmlEl = document.querySelector('html');
    if (!htmlEl) return;
    
    const updatedDarkMode = !darkMode;
    setDarkMode(updatedDarkMode);
    if (!updatedDarkMode) {
      htmlEl.classList.remove(THEME.DARK);
      localStorage.removeItem(LOCAL_STORAGE_KEY.THEME)
    } else {
      htmlEl.classList.add(THEME.DARK);
      localStorage.setItem(LOCAL_STORAGE_KEY.THEME, THEME.DARK);
    }
  };
  
  return (
    <button onClick={toggleTheme}>
      {!darkMode ? <FaMoon /> : <FaSun />}
    </button>
  )
};

export default DarkModeButton;