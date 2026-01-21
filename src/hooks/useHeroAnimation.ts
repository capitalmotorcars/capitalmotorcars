import { useEffect, useState } from 'react';

export function useHeroAnimation() {
  const [isAnimated, setIsAnimated] = useState(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (prefersReducedMotion) {
      setIsAnimated(true);
      return;
    }

    // Small delay to ensure DOM is ready
    const timer = setTimeout(() => {
      setIsAnimated(true);
    }, 50);

    return () => clearTimeout(timer);
  }, []);

  return isAnimated;
}
