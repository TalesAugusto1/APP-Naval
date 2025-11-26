import { useState, useEffect } from 'react';
import { Dimensions } from 'react-native';

interface ResponsiveInfo {
  width: number;
  height: number;
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  breakpoint: 'mobile' | 'tablet' | 'desktop';
}

const BREAKPOINTS = {
  mobile: 600,
  tablet: 900,
};

function getResponsiveInfo(width: number, height: number): ResponsiveInfo {
  const isMobile = width < BREAKPOINTS.mobile;
  const isTablet = width >= BREAKPOINTS.mobile && width < BREAKPOINTS.tablet;
  const isDesktop = width >= BREAKPOINTS.tablet;

  let breakpoint: 'mobile' | 'tablet' | 'desktop';
  if (isMobile) breakpoint = 'mobile';
  else if (isTablet) breakpoint = 'tablet';
  else breakpoint = 'desktop';

  return {
    width,
    height,
    isMobile,
    isTablet,
    isDesktop,
    breakpoint,
  };
}

export function useResponsive(): ResponsiveInfo {
  const [dimensions, setDimensions] = useState(() => {
    const { width, height } = Dimensions.get('window');
    return getResponsiveInfo(width, height);
  });

  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({ window }) => {
      setDimensions(getResponsiveInfo(window.width, window.height));
    });

    return () => subscription?.remove();
  }, []);

  return dimensions;
}
