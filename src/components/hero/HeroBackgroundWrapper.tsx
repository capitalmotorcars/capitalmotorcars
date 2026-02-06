import { useParallax } from '@/hooks/useParallax';
import heroBg from '@/assets/bg-dealer.png';
import mobileHeroBg1 from '@/assets/cayenne-mobile.jpg';

import { HeroSpotlight } from '@/components/hero/HeroSpotlight';

interface HeroBackgroundWrapperProps {
  children: React.ReactNode;
}

/**
 * Wraps Hero + How It Works (or any children) so one background image
 * fills the entire area. Keep HeroSection and HowItWorksSection as
 * separate components; this div provides the shared background.
 */
export function HeroBackgroundWrapper({ children }: HeroBackgroundWrapperProps) {
  const { ref: parallaxRef, offset: parallaxOffset } = useParallax({ speed: 1.08 });

  return (
    <div className="relative min-h-[100dvh] bg-muted dark:bg-[hsl(0_0%_4%)]">
      {/* Background image — same height as original hero only, so crop looks identical */}
      <div
        ref={parallaxRef}
        className="absolute top-0 left-0 right-0 h-full overflow-hidden bg-black"
        aria-hidden
      >
        {/* Mobile background */}
        <img
          src={heroBg}
          alt=""
          width={1920}
          height={1080}
          loading="eager"
          decoding="async"
          fetchPriority="high"
          className="absolute inset-0 w-full h-full object-cover opacity-70 dark:opacity-45 md:hidden transition-transform duration-200 ease-out"
        />
        {/* Desktop background */}
        <img
          src={heroBg}
          alt=""
          width={1920}
          height={1080}
          loading="eager"
          decoding="async"
          fetchPriority="high"
          className="absolute inset-0 w-full h-full object-cover opacity-75 dark:opacity-45 hidden md:block transition-transform duration-200 ease-out"
          style={{ transform: `translateY(${parallaxOffset}px) scale(1.10)` }}
        />
      </div>
      <HeroSpotlight />
      {/* Dark mode radial gradient overlay only */}
      <div
        className="absolute inset-0 pointer-events-none hidden dark:block opacity-25"
        style={{
          background: 'radial-gradient(ellipse 80% 70% at 50% 30%, transparent 0%, hsl(0, 0%, 4%) 100%)',
        }}
        aria-hidden
      />
      {/* Dark mode bottom fade only */}
      <div
        className="absolute left-0 right-0 h-40 md:h-48 pointer-events-none z-[1] hidden dark:block hero-bottom-fade-dark"
        style={{ bottom: -8 }}
        aria-hidden
      />

      <div className="relative z-10">{children}</div>
    </div>
  );
}
