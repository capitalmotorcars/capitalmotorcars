import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, CheckCircle2, BarChart3 } from 'lucide-react';
import { useParallax } from '@/hooks/useParallax';

interface Breadcrumb {
  label: string;
  href?: string;
}

interface PageHeroStat {
  label: string;
  value: string;
}

interface PageHeroProps {
  title: string;
  subtitle?: string;
  breadcrumbs?: Breadcrumb[];
  heroImage?: string;
  heroImageAlt?: string;
  children?: ReactNode;
  badge?: string;
  keyPoints?: string[];
  stats?: PageHeroStat[];
}

export function PageHero({
  title,
  subtitle,
  breadcrumbs,
  heroImage,
  heroImageAlt = '',
  children,
  badge,
  keyPoints,
  stats,
}: PageHeroProps) {
  const { ref: parallaxRef, offset: parallaxOffset } = useParallax({ speed: 0.08 });

  return (
    <section className="relative bg-primary py-12 md:py-16 lg:py-20 overflow-hidden">
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

            {/* Optional badge */}
            {badge && (
              <div className="inline-flex items-center gap-2 rounded-full bg-accent/15 px-4 py-1.5 mb-4 text-xs font-medium text-accent-foreground/90 uppercase tracking-[0.12em] animate-fade-in-up">
                <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-accent text-[10px] text-accent-foreground shadow-sm">
                  ★
                </span>
                <span>{badge}</span>
              </div>
            )}

            {/* Title */}
            <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-4 md:mb-6 opacity-0 animate-hero-title">
              {title}
            </h1>

            {/* Subtitle */}
            {subtitle && (
              <p className="text-base md:text-lg text-primary-foreground/80 max-w-2xl opacity-0 animate-hero-subtitle">
                {subtitle}
              </p>
            )}

            {/* Key points */}
            {keyPoints && keyPoints.length > 0 && (
              <ul className="mt-6 grid gap-3 text-sm text-primary-foreground/80 md:grid-cols-2 lg:grid-cols-3">
                {keyPoints.map((point, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-2 animate-fade-in-up"
                    style={{ animationDelay: `${0.15 + index * 0.05}s` }}
                  >
                    <span className="mt-0.5 inline-flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent">
                      <CheckCircle2 className="h-3 w-3" />
                    </span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            )}

            {/* Stats */}
            {stats && stats.length > 0 && (
              <div className="mt-8 flex flex-wrap gap-4 md:gap-6">
                {stats.map((stat) => (
                  <div
                    key={stat.label + stat.value}
                    className="min-w-[130px] rounded-xl bg-primary/10 px-4 py-3 text-primary-foreground/90 shadow-sm backdrop-blur-sm animate-fade-in-up"
                  >
                    <div className="mb-1 flex items-center gap-2 text-xs font-medium uppercase tracking-[0.16em] text-primary-foreground/60">
                      <BarChart3 className="h-3 w-3" />
                      <span>{stat.label}</span>
                    </div>
                    <div className="text-2xl font-semibold leading-tight">
                      {stat.value}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Optional children (buttons, etc.) */}
            {children && (
              <div className="mt-8 opacity-0 animate-hero-children">
                {children}
              </div>
            )}
          </div>

          {/* Hero Image - parallax on scroll */}
          {heroImage && (
            <div ref={parallaxRef} className="hidden lg:block flex-shrink-0">
              <img
                src={heroImage}
                alt={heroImageAlt}
                className="w-[400px] xl:w-[480px] h-auto object-contain drop-shadow-2xl animate-car-drive-in transition-transform duration-100"
                style={{ transform: `translateY(${parallaxOffset}px)` }}
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
