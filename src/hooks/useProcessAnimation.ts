import { useState, useEffect, useCallback, useRef } from 'react';

interface UseProcessAnimationOptions {
  totalSteps: number;
  intervalMs?: number;
  resumeDelayMs?: number;
}

interface UseProcessAnimationReturn {
  activeStep: number;
  setActiveStep: (step: number) => void;
  pauseAutoAdvance: () => void;
  resumeAutoAdvance: () => void;
  isPaused: boolean;
  prefersReducedMotion: boolean;
}

export function useProcessAnimation({
  totalSteps,
  intervalMs = 3500,
  resumeDelayMs = 5000,
}: UseProcessAnimationOptions): UseProcessAnimationReturn {
  const [activeStep, setActiveStepInternal] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const resumeTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const containerRef = useRef<HTMLElement | null>(null);

  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Clear all timers
  const clearTimers = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    if (resumeTimeoutRef.current) {
      clearTimeout(resumeTimeoutRef.current);
      resumeTimeoutRef.current = null;
    }
  }, []);

  // Start auto-advance
  const startAutoAdvance = useCallback(() => {
    if (prefersReducedMotion) return;
    
    clearTimers();
    intervalRef.current = setInterval(() => {
      setActiveStepInternal((prev) => (prev + 1) % totalSteps);
    }, intervalMs);
  }, [totalSteps, intervalMs, prefersReducedMotion, clearTimers]);

  // Pause auto-advance
  const pauseAutoAdvance = useCallback(() => {
    setIsPaused(true);
    clearTimers();
  }, [clearTimers]);

  // Resume auto-advance after delay
  const resumeAutoAdvance = useCallback(() => {
    if (prefersReducedMotion) return;
    
    clearTimers();
    resumeTimeoutRef.current = setTimeout(() => {
      setIsPaused(false);
      startAutoAdvance();
    }, resumeDelayMs);
  }, [prefersReducedMotion, resumeDelayMs, startAutoAdvance, clearTimers]);

  // Set active step manually (pauses auto-advance)
  const setActiveStep = useCallback((step: number) => {
    setActiveStepInternal(step);
    pauseAutoAdvance();
    resumeAutoAdvance();
  }, [pauseAutoAdvance, resumeAutoAdvance]);

  // Initialize auto-advance on mount
  useEffect(() => {
    if (!prefersReducedMotion) {
      startAutoAdvance();
    }
    return clearTimers;
  }, [prefersReducedMotion, startAutoAdvance, clearTimers]);

  // Visibility detection - pause when not visible
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        pauseAutoAdvance();
      } else if (!isPaused) {
        startAutoAdvance();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [isPaused, pauseAutoAdvance, startAutoAdvance]);

  return {
    activeStep,
    setActiveStep,
    pauseAutoAdvance,
    resumeAutoAdvance,
    isPaused,
    prefersReducedMotion,
  };
}
