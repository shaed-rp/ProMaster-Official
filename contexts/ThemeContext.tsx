'use client';

import React, { createContext, useContext, ReactNode } from 'react';

interface ThemeContextType {
  brandColor: string;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
  brandColor: string;
}

export function ThemeProvider({
  children,
  brandColor,
}: ThemeProviderProps) {
  return (
    <ThemeContext.Provider value={{ brandColor }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextType {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

