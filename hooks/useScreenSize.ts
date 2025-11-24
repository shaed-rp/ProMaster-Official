'use client';

import { useState, useEffect } from 'react';

interface ScreenSize {
  isDesktop: boolean;
  isTablet: boolean;
  isMobile: boolean;
  width: number;
  height: number;
}

const DESKTOP_BREAKPOINT = 1024;
const TABLET_BREAKPOINT = 768;

export function useScreenSize(): ScreenSize {
  const [screenSize, setScreenSize] = useState<ScreenSize>({
    isDesktop: false,
    isTablet: false,
    isMobile: true,
    width: 0,
    height: 0,
  });

  useEffect(() => {
    // Set initial size
    const updateScreenSize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      setScreenSize({
        isDesktop: width >= DESKTOP_BREAKPOINT,
        isTablet: width >= TABLET_BREAKPOINT && width < DESKTOP_BREAKPOINT,
        isMobile: width < TABLET_BREAKPOINT,
        width,
        height,
      });
    };

    // Initial call
    updateScreenSize();

    // Add event listener
    window.addEventListener('resize', updateScreenSize);

    // Cleanup
    return () => window.removeEventListener('resize', updateScreenSize);
  }, []);

  return screenSize;
}

