import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

interface Breadcrumb {
  label: string;
  href?: string;
}

interface PageHeroProps {
  title: string;
  subtitle?: string;
  breadcrumbs?: Breadcrumb[];
  heroImage?: string;
  heroImageAlt?: string;
  children?: ReactNode;
}

export function PageHero({
  title,
  subtitle,
  breadcrumbs,
  heroImage,
  heroImageAlt = '',
  children,
}: PageHeroProps) {
  return (
    <section className="relative bg-primary py-16 md:py-20 overflow-hidden">
      {/* Mesh gradient background for depth */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 50% at 50% -20%, hsl(var(--accent) / 0.15), transparent)',
        }}
      />
      
      {/* Subtle secondary gradient */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 60% 40% at 80% 80%, hsl(var(--accent) / 0.08), transparent)',
        }}
      />

      <div className="container mx-auto px-4 lg:px-8 relative">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
          {/* Text Content */}
          <div className="max-w-xl lg:max-w-2xl flex-shrink-0">
            {/* Breadcrumbs */}
            {breadcrumbs && breadcrumbs.length > 0 && (
              <nav 
                aria-label="Breadcrumb" 
                className="mb-4 opacity-0 animate-hero-breadcrumb"
              >
                <ol className="flex items-center gap-1.5 text-sm text-primary-foreground/60">
                  {breadcrumbs.map((crumb, index) => (
                    <li key={index} className="flex items-center gap-1.5">
                      {crumb.href ? (
                        <Link 
                          to={crumb.href} 
                          className="hover:text-primary-foreground transition-colors"
                        >
                          {crumb.label}
                        </Link>
                      ) : (
                        <span className="text-primary-foreground/80">{crumb.label}</span>
                      )}
                      {index < breadcrumbs.length - 1 && (
                        <ChevronRight className="w-3.5 h-3.5" />
                      )}
                    </li>
                  ))}
                </ol>
              </nav>
            )}

            {/* Accent line */}
            <div 
              className="h-1 bg-accent mb-6 rounded-full opacity-0 animate-accent-line"
              style={{ width: 0 }}
            />

            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-6 opacity-0 animate-hero-title">
              {title}
            </h1>

            {/* Subtitle */}
            {subtitle && (
              <p className="text-lg text-primary-foreground/80 max-w-2xl opacity-0 animate-hero-subtitle">
                {subtitle}
              </p>
            )}

            {/* Optional children (buttons, etc.) */}
            {children && (
              <div className="mt-8 opacity-0 animate-hero-children">
                {children}
              </div>
            )}
          </div>

          {/* Hero Image */}
          {heroImage && (
            <div className="hidden lg:block flex-shrink-0">
              <img
                src={heroImage}
                alt={heroImageAlt}
                className="w-[400px] xl:w-[480px] h-auto object-contain drop-shadow-2xl animate-car-drive-in"
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
