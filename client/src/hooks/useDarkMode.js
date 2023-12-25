import { useEffect, useState } from 'react';

const useDarkMode = () => {
  const savedDarkMode = localStorage.getItem('darkMode');
  const initialDarkMode = savedDarkMode ? JSON.parse(savedDarkMode) : false;
  const [darkMode, setDarkMode] = useState(initialDarkMode);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
    document.documentElement.classList.toggle('light', !darkMode);
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  return [darkMode, setDarkMode];
};

export default useDarkMode;
