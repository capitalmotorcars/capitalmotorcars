import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { CircularProcessVisualization } from './CircularProcessVisualization';
import { useHeroAnimation } from '@/hooks/useHeroAnimation';
import { useParallax } from '@/hooks/useParallax';
import { ArrowRight } from 'lucide-react';
import heroBg from '@/assets/hero-bg.jpg';

export function HeroSection() {
  const heroAnimated = useHeroAnimation();
  const { ref: parallaxRef, offset: parallaxOffset } = useParallax({ speed: 0.12 });

  // Placeholder avatar URLs - diverse, neutral faces
  const avatars = [
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face',
  ];

  return (
    <section className="relative pt-4 pb-8 sm:pt-6 sm:pb-10 lg:pt-6 lg:pb-12 min-h-[auto] overflow-hidden" style={{ backgroundColor: 'hsl(0 0% 3%)' }}>
      {/* Background Image - parallax */}
      <div ref={parallaxRef} className="absolute inset-0 overflow-hidden">
        <img
          src={heroBg}
          alt=""
          loading="eager"
          decoding="async"
          fetchPriority="high"
          className="absolute inset-0 w-full h-full object-cover opacity-20 transition-transform duration-100"
          style={{ transform: `translateY(${parallaxOffset}px)` }}
        />
      </div>
      
      {/* Dark overlay for CDK-style contrast */}
      <div className="absolute inset-0" style={{ backgroundColor: 'hsl(0 0% 3% / 0.85)' }} />

      {/* Gradient fade to next section (dark) - smooth transition */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 md:h-40 pointer-events-none z-[1]"
        style={{ background: 'linear-gradient(to bottom, transparent 0%, hsl(0 0% 4%) 100%)' }}
        aria-hidden
      />

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 z-10 max-w-full">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-center lg:gap-8 xl:gap-12 max-w-6xl lg:mx-auto">
          {/* Left Column - Content - extra bottom spacing on mobile so it never overlaps diagram */}
          <div className="max-w-xl lg:max-w-2xl flex-shrink-0 z-10 lg:pt-0 lg:pb-0 pb-10 sm:pb-12 lg:pb-0 text-center lg:text-left order-1">
            <h1
              className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-3 lg:mb-5 leading-[1.1] hero-animate ${
                heroAnimated ? 'animate-in' : ''
              }`}
            >
              <span className="text-gradient-heading-dark">Find Your Perfect Vehicle with </span>
              <span className="text-gradient-hero-highlight">Zero Dealership Hassle</span>
            </h1>

            {/* Social Proof Badges - ALWAYS below headline */}
            <a
              href="https://share.google/uNNUZv8Ot02uvLzbd"
              target="_blank"
              rel="noopener noreferrer"
              className={`flex flex-col sm:flex-row flex-wrap items-center justify-center lg:justify-start gap-2 lg:gap-3 mb-4 lg:mb-6 hero-animate cursor-pointer hover:opacity-80 transition-opacity ${
                heroAnimated ? 'animate-in' : ''
              }`}
            >
              {/* Avatars + Customer Count */}
              <div className="flex items-center gap-2">
                {/* Overlapping Avatars */}
                <div className="flex -space-x-2">
                  {avatars.map((src, index) => (
                    <img
                      key={index}
                      src={src}
                      alt=""
                      className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 rounded-full border-2 object-cover"
                      style={{ borderColor: 'hsl(0 0% 3%)' }}
                      loading="lazy"
                    />
                  ))}
                </div>
                <span
                  className="inline-flex items-center px-2 py-0.5 sm:px-2.5 sm:py-1 lg:px-3 lg:py-1.5 rounded-full text-[10px] sm:text-[11px] lg:text-xs font-medium text-white"
                  style={{
                    backgroundColor: 'hsl(0 0% 100% / 0.08)',
                    border: '1px solid hsl(0 0% 100% / 0.1)',
                  }}
                >
                  15k+ Customers
                </span>
              </div>
              
              {/* Google Rating Badge */}
              <span
                className="inline-flex items-center gap-1.5 px-2 py-0.5 sm:px-2.5 sm:py-1 lg:px-3 lg:py-1.5 rounded-full text-[10px] sm:text-[11px] lg:text-xs font-medium text-white"
                style={{
                  backgroundColor: 'hsl(0 0% 100% / 0.08)',
                  border: '1px solid hsl(0 0% 100% / 0.1)',
                }}
              >
                {/* Google Icon */}
                <svg className="w-3 h-3 lg:w-3.5 lg:h-3.5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                <span className="text-accent">★★★★★</span>
                5/5 on Google
              </span>
            </a>
            
            <p
              className={`text-base md:text-lg lg:text-xl mb-6 lg:mb-8 leading-relaxed max-w-lg hero-animate delay-1 ${
                heroAnimated ? 'animate-in' : ''
              }`}
              style={{ color: 'hsl(213 27% 84%)' }}
            >
              Capital Motor Cars is your trusted automotive partner. From leasing and financing to maintenance and repairs, we handle everything so you can enjoy the ride.
            </p>

            <div
              className={`flex flex-col sm:flex-row items-stretch sm:items-center justify-center lg:justify-start gap-3 hero-animate delay-2 ${
                heroAnimated ? 'animate-in' : ''
              }`}
            >
              <MagneticButton strength={0.45} className="w-full sm:w-auto">
                <Button
                  asChild
                  size="lg"
                  className="w-full sm:w-auto bg-accent hover:bg-accent/90 text-accent-foreground font-semibold px-8 h-12 shrink-0 glow-blue"
                >
                  <Link to="/contact">
                    Start the process
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </Button>
              </MagneticButton>
              <MagneticButton strength={0.35} className="w-full sm:w-auto">
                <Button
                  asChild
                  variant="ghost"
                  size="lg"
                  className="w-full sm:w-auto h-12 border border-white/30 bg-transparent text-white hover:bg-white/10 hover:text-white hover:border-white/50 font-medium px-6 shrink-0"
                >
                  <Link to="/services">View Services</Link>
                </Button>
              </MagneticButton>
            </div>
          </div>

          {/* Right Column - Process Visualization: below text on mobile (align start = no overlap), right on desktop */}
          <div
            className="flex-none lg:flex-1 flex items-start lg:items-center justify-center min-h-0 mt-6 sm:mt-8 lg:mt-0 order-2 max-w-full lg:min-h-0 shrink-0"
          >
            <div className="w-[90%] max-w-[min(90vw,320px)] sm:max-w-[320px] lg:max-w-[420px] xl:max-w-[440px] aspect-square flex items-center justify-center flex-shrink-0 mx-auto">
              <CircularProcessVisualization />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
