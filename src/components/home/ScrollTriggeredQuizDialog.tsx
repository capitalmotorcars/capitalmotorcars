import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Search } from 'lucide-react';

const NAVIGATION_FLAG_KEY = 'quiz-dialog-navigation-flag';
const IS_RELOAD_KEY = 'quiz-dialog-is-reload';

export function ScrollTriggeredQuizDialog() {
  const [open, setOpen] = useState(false);
  const hasTriggered = useRef(false);

  useEffect(() => {
    // Check navigation type
    const checkNavigationType = () => {
      const navEntries = performance.getEntriesByType('navigation') as PerformanceNavigationTiming[];
      const navType = navEntries[0]?.type || 'unknown';
      const isReload = navType === 'reload';

      // If it's a reload, set a flag and clear navigation flag immediately
      if (isReload) {
        sessionStorage.setItem(IS_RELOAD_KEY, 'true');
        sessionStorage.removeItem(NAVIGATION_FLAG_KEY);
        // Clear the reload flag after a short delay
        setTimeout(() => {
          sessionStorage.removeItem(IS_RELOAD_KEY);
        }, 100);
      }

      return isReload;
    };

    // Check immediately
    const isReload = checkNavigationType();

    // Also check after a small delay in case entry wasn't ready
    const timeoutId = setTimeout(() => {
      checkNavigationType();
    }, 0);

    const navigationFlag = sessionStorage.getItem(NAVIGATION_FLAG_KEY);

    // If navigation flag exists and it's not a reload, don't show (this is a navigation back)
    if (navigationFlag === 'true' && !isReload) {
      clearTimeout(timeoutId);
      return;
    }

    // Listen for when user scrolls to the "Discover" section
    const handleIntersection = () => {
      const discoverSection = document.getElementById('discover');
      if (!discoverSection || hasTriggered.current) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && !hasTriggered.current) {
              hasTriggered.current = true;
              setOpen(true);
              observer.disconnect();
            }
          });
        },
        {
          threshold: 0.5, // Trigger when 50% of the section is visible
          rootMargin: '0px'
        }
      );

      observer.observe(discoverSection);

      return () => {
        observer.disconnect();
      };
    };

    const cleanup = handleIntersection();

    return () => {
      clearTimeout(timeoutId);
      if (cleanup) cleanup();
    };
  }, []);

  // Set navigation flag when component unmounts (React Router navigation)
  useEffect(() => {
    return () => {
      // Check if this is a reload - if so, don't set the navigation flag
      const isReload = sessionStorage.getItem(IS_RELOAD_KEY) === 'true';
      if (!isReload) {
        sessionStorage.setItem(NAVIGATION_FLAG_KEY, 'true');
      }
    };
  }, []);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="w-[calc(100%-2rem)] sm:w-full sm:max-w-md focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 rounded-2xl bg-background dark:bg-black/90 dark:border-white/10 rounded-lg">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">
            Not Sure Which Vehicle Fits You Best?
          </DialogTitle>
          <DialogDescription className="text-center text-base">
            <span className="font-bold"></span> Answer just 5 quick questions and we'll help you find the perfect vehicle for your needs.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col items-center gap-4 pt-4">
          <Button
            asChild
            size="lg"
            className="w-full h-12 rounded-lg border border-accent/40 bg-accent hover:bg-accent/90 hover:border-accent text-accent-foreground font-semibold px-8 glow-blue shadow-[0_2px_12px_hsl(214_77%_50%_/_0.25)]"
            onClick={handleClose}
          >
            <Link to="/quiz" className="flex items-center justify-center gap-2">
              Start Quiz
              <Search className="w-4 h-4" />
            </Link>
          </Button>
          <Button
            variant="ghost"
            size="lg"
            onClick={handleClose}
            className="text-sm w-full text-muted-foreground border border-border dark:border-gray-600 hover:bg-muted focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
          >
            Maybe later
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
