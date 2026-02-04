import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { useHeroAnimation } from '@/hooks/useHeroAnimation';
import { ArrowRight, Search, ChevronDown, Sparkles, SearchCheckIcon } from 'lucide-react';
import { Marquee } from '@/components/ui/Marquee';
import { brands, BrandCard } from '@/components/home/BrandsCarousel';

export function HeroSection() {
  const heroAnimated = useHeroAnimation();

  const avatars = [
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face',
  ];

  const animate = heroAnimated ? 'animate-in' : '';

  const scrollToNext = () => {
    document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-[95dvh] md:min-h-[100dvh] flex flex-col overflow-visible md:overflow-hidden hero-section bg-transparent py-12 md:py-20 lg:py-28 ">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex-1 flex flex-col min-h-0 items-center justify-center">
        <div className="w-full max-w-5xl mx-auto flex flex-col items-center gap-10 md:gap-12">
          {/* Headline, badges, copy, CTAs */}
          <div className="flex flex-col items-center text-center gap-4 md:gap-6 w-full max-w-4xl">
            <h1
              className={` text-3xl  md:text-7xl font-extrabold leading-tight tracking-tight hero-animate text-section ${animate}`}
            >
              <span className="text-gradient-heading-dark">Find Your Perfect Vehicle with zero hassle...</span>
            </h1>

           

            <div className="flex flex-col items-center gap-3 w-full sm:w-auto ">
            <p className={`text-base font-semibold sm:text-base md:text-lg lg:text-2xl  w-full max-w-[750px] leading-relaxed text-white dark:text-white/90 hero-animate delay-1 ${animate}`}>
              Your trusted automotive partner. We handle leasing, financing, and more so you can enjoy the ride.
            </p>
            <div className="flex flex-row items-center gap-3 w-full sm:w-auto">
                <MagneticButton strength={0.45} className="w-full sm:w-auto min-w-0">
                  <Button
                    asChild
                    size="lg"
                    className="w-full sm:w-auto h-11 sm:h-12 rounded-lg border border-accent/40 bg-accent/70 hover:bg-accent/90 hover:border-accent text-accent-foreground font-semibold px-6 sm:px-8 glow-blue shadow-[0_2px_12px_hsl(214_77%_50%_/_0.25)] hover:shadow-[0_4px_18px_hsl(214_77%_55%_/_0.45)] backdrop-blur-sm"
                  >
                    <Link to="/contact">
                      Start the process
                      <ArrowRight className=" w-4 h-4" />
                    </Link>
                  </Button>
                </MagneticButton>
                <MagneticButton strength={0.35} className="w-full sm:w-auto min-w-0">
                  <Button
                    asChild
                    variant="ghost"
                    size="lg"
                    className="w-full sm:w-auto h-11 sm:h-12 rounded-lg border border-white/50 hover:border-white/80 hover:text-white/80 bg-white/20 dark:bg-white/[0.06] text-white/90 dark:text-white/90 hover:bg-white/15 dark:hover:bg-white/10 font-medium px-6 shadow-md shadow-black/5 dark:shadow-black/20 backdrop-blur-sm hover:shadow-lg hover:shadow-black/10 dark:hover:shadow-black/30"
                  >
                    <Link to="/services" className="flex items-center gap-2">
                      Explore services
                      <SearchCheckIcon className=" w-4 h-4" />
                    </Link>
                  </Button>
                </MagneticButton>
              </div>
              </div>
            <div className={`flex flex-col items-center gap-5 w-full max-w-[280px] sm:max-w-none sm:w-auto hero-animate delay-2 ${animate}`}>
             
              <div className="flex flex-col items-center gap-2 w-full max-w-[280px] sm:max-w-md pt-4">
                <span className="text-base font-semibold sm:text-base md:text-lg lg:text-2xl leading-relaxed text-white dark:text-white/90 text-center">
                  Find your perfect vehicle match in just 5 quick questions
                </span>
                <MagneticButton strength={0.35} className="w-full sm:w-auto min-w-0">
                  <Button
                    asChild
                    size="lg"
                className="w-full sm:w-auto h-11 sm:h-12 rounded-lg border border-accent/40 bg-accent/70 hover:bg-accent/90 hover:border-accent text-accent-foreground font-semibold px-6 sm:px-8 glow-blue shadow-[0_2px_12px_hsl(214_77%_50%_/_0.25)] hover:shadow-[0_4px_18px_hsl(214_77%_55%_/_0.45)] backdrop-blur-sm"
                  >
                    <Link to="/vehicles/sedan" className="flex items-center">
                      Find vehicle
                      <Search className="ml-2 w-4 h-4" />
                    </Link>
                  </Button>
                </MagneticButton>
              </div>
            </div>

            
          </div>

          {/* Brands strip */}
          <div className="w-full flex flex-col items-center gap-0">
            <span className="uppercase tracking-[0.18em] font-medium text-xs  md:text-md text-white/60">
              Trusted by famous brands
            </span>
            <div className="relative w-full overflow-hidden  [mask-image:linear-gradient(to_right,transparent_0%,black_8%,black_92%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_right,transparent_0%,black_8%,black_92%,transparent_100%)] [mask-size:100%_100%] [mask-repeat:no-repeat]">
              <Marquee pauseOnHover className="[--duration:60s] [--gap:1rem]">
                {brands.map((brand) => (
                  <BrandCard
                    key={brand.name}
                    name={brand.name}
                    logo={brand.logo}
                    variant="card"
                  />
                ))}
              </Marquee>
            
            </div>

          </div>
            <a
              href="https://share.google/uNNUZv8Ot02uvLzbd"
              target="_blank"
              rel="noopener noreferrer"
              className={`flex flex-wrap items-center justify-center gap-3 sm:gap-4 md:gap-5 hero-animate cursor-pointer hover:opacity-80 transition-opacity ${animate}`}
            >
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="flex -space-x-2 sm:-space-x-3">
                  {avatars.map((src, i) => (
                    <img
                      key={i}
                      src={src}
                      alt=""
                      className="w-8 h-8  md:w-12 md:h-12 rounded-full border-2 sm:border-[3px] border-background dark:border-[hsl(0_0%_3%)] object-cover"
                      loading="lazy"
                    />
                  ))}
                </div>
                <span className="inline-flex items-center px-3 py-1.5 sm:px-4 sm:py-2 md:px-5 md:py-2.5 rounded-full text-sm sm:text-base md:text-md font-semibold bg-muted/80 dark:bg-white/10 border border-border dark:border-white/10 text-foreground dark:text-white">
                  15k+ Customers
                </span>
              </div>
              <span className="inline-flex items-center gap-2 sm:gap-2.5 px-3 py-1.5 sm:px-4 sm:py-2 md:px-5 md:py-2.5 rounded-full text-sm sm:text-base md:text-md font-semibold bg-muted/80 dark:bg-white/10 border border-border dark:border-white/10 text-foreground dark:text-white">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                <span className="text-accent">★★★★★</span>
                5/5 on Google
              </span>
            </a>
        </div>

      </div>

      {/* Animated scroll-down arrow — middle bottom, scrolls to next section */}
      <button
        type="button"
        onClick={scrollToNext}
        aria-label="Scroll to next section"
        className="absolute bottom-10  md:bottom-14  left-1/2 -translate-x-1/2 z-10 flex items-center justify-center text-white/90 hover:text-white transition-colors"
      >
        <ChevronDown className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 hero-scroll-arrow" aria-hidden />
      </button>
    </section>
  );
}
