import { useRef, useEffect, useState } from 'react';

const DEFAULT_SPEED = 0.15;

interface UseParallaxOptions {
  speed?: number;
}

export function useParallax(options: UseParallaxOptions = {}) {
  const ref = useRef<HTMLDivElement>(null);
  const speed = options.speed ?? DEFAULT_SPEED;
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const handleScroll = () => {
      const rect = el.getBoundingClientRect();
      const centerY = rect.top + rect.height / 2;
      const viewportCenter = window.innerHeight / 2;
      const diff = centerY - viewportCenter;
      setOffset(diff * speed);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed]);

  return { ref, offset };
}
