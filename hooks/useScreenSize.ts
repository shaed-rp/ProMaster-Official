'use client';

import { useState, useEffect } from 'react';

interface ScreenSize {
  isDesktop: boolean;
  isTablet: boolean;
  isSmallTablet: boolean;
  isMobile: boolean;
  isSmallMobile: boolean;
  width: number;
  height: number;
}

const DESKTOP_BREAKPOINT = 1024;
const TABLET_BREAKPOINT = 768;
const SMALL_TABLET_BREAKPOINT = 600;
const MOBILE_BREAKPOINT = 480;
const SMALL_MOBILE_BREAKPOINT = 375;

export function useScreenSize(): ScreenSize {
  const [screenSize, setScreenSize] = useState<ScreenSize>(() => {
    // SSR-safe initial state
    if (typeof window === 'undefined') {
      return {
        isDesktop: false,
        isTablet: false,
        isSmallTablet: false,
        isMobile: true,
        isSmallMobile: false,
        width: 0,
        height: 0,
      };
    }

    const width = window.innerWidth;
    const height = window.innerHeight;

    return {
      isDesktop: width >= DESKTOP_BREAKPOINT,
      isTablet: width >= TABLET_BREAKPOINT && width < DESKTOP_BREAKPOINT,
      isSmallTablet: width >= SMALL_TABLET_BREAKPOINT && width < TABLET_BREAKPOINT,
      isMobile: width < TABLET_BREAKPOINT,
      isSmallMobile: width < SMALL_MOBILE_BREAKPOINT,
      width,
      height,
    };
  });

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const updateScreenSize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      setScreenSize({
        isDesktop: width >= DESKTOP_BREAKPOINT,
        isTablet: width >= TABLET_BREAKPOINT && width < DESKTOP_BREAKPOINT,
        isSmallTablet: width >= SMALL_TABLET_BREAKPOINT && width < TABLET_BREAKPOINT,
        isMobile: width < TABLET_BREAKPOINT,
        isSmallMobile: width < SMALL_MOBILE_BREAKPOINT,
        width,
        height,
      });
    };

    // Debounce resize events for better performance
    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(updateScreenSize, 150);
    };

    // Initial call
    updateScreenSize();

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timeoutId);
    };
  }, []);

  return screenSize;
}

