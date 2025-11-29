'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { ThemeProvider as MUIThemeProvider, createTheme, CssBaseline } from '@mui/material';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export default function ThemeProvider({ children }) {
  const [mode, setMode] = useState('light');

  useEffect(() => {
    // ตรวจสอบ theme ที่เก็บไว้ใน localStorage
    const savedMode = localStorage.getItem('themeMode') || 'light';
    setMode(savedMode);
  }, []);

  // Sync Tailwind dark mode กับ Material-UI theme
  useEffect(() => {
    const htmlElement = document.documentElement;
    if (mode === 'dark') {
      htmlElement.classList.add('dark');
    } else {
      htmlElement.classList.remove('dark');
    }
  }, [mode]);

  const toggleTheme = () => {
    const newMode = mode === 'light' ? 'dark' : 'light';
    setMode(newMode);
    localStorage.setItem('themeMode', newMode);
  };

  const theme = createTheme({
    palette: {
      mode: mode,
      primary: {
        main: mode === 'light' ? '#1976d2' : '#64b5f6',
        light: '#42a5f5',
        dark: '#1565c0',
      },
      secondary: {
        main: mode === 'light' ? '#0288d1' : '#4fc3f7',
      },
      background: {
        default: mode === 'light' ? '#f5f7fa' : '#0d1117',
        paper: mode === 'light' ? '#ffffff' : '#161b22',
      },
    },
    typography: {
      fontFamily: 'var(--font-prompt), sans-serif',
    },
  });

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme }}>
      <MUIThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MUIThemeProvider>
    </ThemeContext.Provider>
  );
}

