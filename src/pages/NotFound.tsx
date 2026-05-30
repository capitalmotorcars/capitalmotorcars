import { SEO } from '@/components/SEO';
import { JsonLd, createBreadcrumbSchema } from '@/components/JsonLd';
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted px-4">
      <SEO
        title="404 Page Not Found | Capital Motor Cars Support Center"
        description="The page you requested could not be found on Capital Motor Cars."
        noindex
      />
      <JsonLd
        data={createBreadcrumbSchema([
          { name: 'Home', url: 'https://www.capitalmotorcars.com/' },
          { name: '404', url: `https://www.capitalmotorcars.com${location.pathname}` },
        ])}
      />
      <div className="text-center max-w-md w-full">
        <h1 className="mb-4 text-3xl sm:text-4xl font-bold line-clamp-2 max-w-[95vw] sm:max-w-none">404</h1>
        <p className="mb-6 text-lg sm:text-xl text-muted-foreground">Oops! Page not found</p>
        <a
          href="/"
          className="inline-flex items-center justify-center min-h-[44px] px-6 py-3 rounded-md bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
        >
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
