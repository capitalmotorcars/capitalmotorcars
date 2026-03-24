import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export function ScrollToTop() {
  const { pathname, search, hash } = useLocation();

  useEffect(() => {
    // Send page view to Google Analytics (SPA route changes)
    const pagePath = pathname + search;
    if (typeof window.gtag === 'function') {
      window.gtag('config', 'G-9435FK96YE', { page_path: pagePath });
    }
  }, [pathname, search]);

  useEffect(() => {
    if (hash) {
      const id = hash.slice(1);
      const scrollToElement = () => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          return true;
        }
        return false;
      };
      if (!scrollToElement()) {
        const timer = setTimeout(() => scrollToElement(), 300);
        return () => clearTimeout(timer);
      }
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
    }
  }, [pathname, search, hash]);

  return null;
}
