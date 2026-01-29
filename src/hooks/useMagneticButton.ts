import { useRef, useCallback } from 'react';

const DEFAULT_STRENGTH = 0.35;

interface UseMagneticButtonOptions {
  strength?: number;
}

export function useMagneticButton(options: UseMagneticButtonOptions = {}) {
  const ref = useRef<HTMLDivElement>(null);
  const strength = options.strength ?? DEFAULT_STRENGTH;

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
      const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
      const moveX = x * 12 * strength;
      const moveY = y * 12 * strength;
      el.style.transform = `translate(${moveX}px, ${moveY}px)`;
    },
    [strength]
  );

  const handleMouseLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = '';
  }, []);

  return { ref, handleMouseMove, handleMouseLeave };
}
