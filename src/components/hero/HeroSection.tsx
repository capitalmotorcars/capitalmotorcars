import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { MagneticButton } from '@/components/ui/MagneticButton';
import {
  VehicleViewer3D,
  VEHICLE_COLORS,
  ANNOTATION_DEFS,
  type VehicleColor,
} from '@/components/hero/VehicleViewer3D';
import { useHeroAnimation } from '@/hooks/useHeroAnimation';
import { ArrowRight, Palette, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

export function HeroSection() {
  const heroAnimated = useHeroAnimation();
  const [selectedColor, setSelectedColor] = useState<VehicleColor>(VEHICLE_COLORS[0]);
  const [selectedAnnotationId, setSelectedAnnotationId] = useState<number | null>(null);

  // Placeholder avatar URLs - diverse, neutral faces
  const avatars = [
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face',
  ];

  return (
    <section className="relative min-h-0 md:min-h-[100dvh] lg:min-h-0 flex flex-col pt-10 pb-[max(0.5rem,env(safe-area-inset-bottom))] md:py-16 md:pb-16 lg:py-24 lg:pb-24 overflow-visible md:overflow-hidden hero-section bg-transparent">
      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 max-w-full flex-1 flex flex-col min-h-0 items-center justify-center">
        <div className="flex flex-col flex-1 min-h-0 gap-6 lg:gap-8 w-full max-w-[82rem] xl:max-w-[88rem] mx-auto">
          {/* Two-column row: 3D viewer + settings sidebar */}
          <div className="flex flex-col lg:flex-row flex-1 min-h-0 gap-4 lg:gap-6 items-stretch lg:min-h-[240px]">
          {/* Left: 3D viewer — full height on desktop */}
          <div className="flex-shrink-0 w-full lg:flex-1 flex flex-col gap-3 order-first lg:min-w-0">
            <div className="hidden lg:block text-center lg:text-left">
              <h2
                className={cn(
                  'text-xl sm:text-2xl font-semibold text-white dark:text-white tracking-tight',
                  heroAnimated && 'animate-in fade-in-0 slide-in-from-bottom-4 duration-500'
                )}
              >
                Explore the Porsche 918 Spyder
              </h2>
              <p
                className={cn(
                  'mt-1.5 text-base text-white/90 dark:text-white/85 max-w-md lg:max-w-none',
                  heroAnimated && 'animate-in fade-in-0 slide-in-from-bottom-4 duration-500 delay-150'
                )}
              >
                Drag to orbit · Tap numbers on the model to zoom to features.
              </p>
            </div>
            <div className="w-full min-h-[160px] sm:min-h-[200px] lg:min-h-[220px] aspect-[4/3] sm:aspect-[16/9] lg:aspect-auto lg:flex-1 max-w-lg sm:max-w-xl md:max-w-2xl lg:max-w-none mx-auto overflow-hidden rounded-2xl flex items-stretch justify-center bg-white/5 dark:bg-black/20 border border-white/10 dark:border-white/10">
              <VehicleViewer3D
                className="w-full h-full min-h-[160px]"
                selectedColor={selectedColor}
                onColorChange={setSelectedColor}
                selectedAnnotationId={selectedAnnotationId}
                onAnnotationSelect={setSelectedAnnotationId}
                hideOverlays={true}
              />
            </div>
            {/* Mobile: short hint under viewer */}
            <p className="lg:hidden text-center text-sm text-white/70 dark:text-white/60">
              Customize color and explore features below.
            </p>
          </div>

          {/* Right: Settings column — colors, key features, CTA */}
          <div className="flex-shrink-0 w-full lg:w-[320px] xl:w-[360px] flex flex-col gap-4 lg:gap-5 order-2">
            <div
              className={cn(
                'rounded-2xl border border-white/10 dark:border-white/10 bg-white/5 dark:bg-black/30 backdrop-blur-sm p-4 sm:p-5 flex flex-col gap-4',
                heroAnimated && 'animate-in fade-in-0 slide-in-from-bottom-4 duration-500 delay-100'
              )}
            >
              <div className="flex items-center gap-2 text-white dark:text-white">
                <Palette className="w-5 h-5 text-accent shrink-0" />
                <span className="font-semibold text-sm uppercase tracking-wider">Exterior color</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {VEHICLE_COLORS.map((c) => (
                  <button
                    key={c.hex}
                    type="button"
                    onClick={() => setSelectedColor(c)}
                    title={c.name}
                    className={cn(
                      'w-9 h-9 rounded-full border-2 shadow-sm transition-all hover:scale-110 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-transparent',
                      selectedColor.hex === c.hex
                        ? 'border-accent ring-2 ring-accent/40 scale-110'
                        : 'border-white/40 hover:border-white/60'
                    )}
                    style={{ backgroundColor: c.swatchHex ?? c.hex }}
                    aria-label={c.name}
                    aria-pressed={selectedColor.hex === c.hex}
                  />
                ))}
              </div>
              <p className="text-xs text-white/70 dark:text-white/60">{selectedColor.name}</p>
            </div>

            <div
              className={cn(
                'rounded-2xl border border-white/10 dark:border-white/10 bg-white/5 dark:bg-black/30 backdrop-blur-sm p-4 sm:p-5 flex flex-col gap-3 flex-1 min-h-0',
                heroAnimated && 'animate-in fade-in-0 slide-in-from-bottom-4 duration-500 delay-200'
              )}
            >
              <div className="flex items-center gap-2 text-white dark:text-white">
                <Sparkles className="w-5 h-5 text-accent shrink-0" />
                <span className="font-semibold text-sm uppercase tracking-wider">Key features</span>
              </div>
              <p className="text-xs text-white/70 dark:text-white/60 mb-1">
                Tap a feature to zoom the 3D view.
              </p>
              <ul className="space-y-1.5 overflow-y-auto flex-1 min-h-0 pr-1">
                {ANNOTATION_DEFS.map((ann) => (
                  <li key={ann.id}>
                    <button
                      type="button"
                      onClick={() =>
                        setSelectedAnnotationId(selectedAnnotationId === ann.id ? null : ann.id)
                      }
                      className={cn(
                        'w-full text-left rounded-lg px-3 py-2 text-sm transition-all border border-transparent',
                        selectedAnnotationId === ann.id
                          ? 'bg-accent/20 border-accent/40 text-white'
                          : 'text-white/85 hover:bg-white/10 hover:text-white border-white/5'
                      )}
                    >
                      <span className="font-medium text-accent mr-1.5">{ann.id}.</span>
                      {ann.description}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          </div>

          {/* Main headline + CTAs — full width below the two-column row */}
          <div className="max-w-xl flex-shrink-0 z-10 mx-auto w-full flex flex-col items-center text-center">
            <h1
              className={`text-[1.75rem] sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-extrabold leading-tight sm:leading-[1.2] line-clamp-none sm:line-clamp-2 max-w-full sm:max-w-xl mb-2 sm:mb-4 lg:mb-5 hero-animate text-section ${
                heroAnimated ? 'animate-in' : ''
              }`}
              style={{ textShadow: '0 2px 12px rgba(0,0,0,0.2)' }}
            >
              <span className="text-gradient-heading-dark">Find Your Perfect Vehicle with </span>
              <span className="text-gradient-hero-highlight">Hassle.</span>
            </h1>

            {/* Social Proof Badges - below headline */}
            <a
              href="https://share.google/uNNUZv8Ot02uvLzbd"
              target="_blank"
              rel="noopener noreferrer"
              className={`flex flex-col sm:flex-row flex-wrap items-center justify-center gap-2 lg:gap-3 mb-1 sm:mb-3 lg:mb-6 hero-animate cursor-pointer hover:opacity-80 transition-opacity ${
                heroAnimated ? 'animate-in' : ''
              }`}
            >
              {/* Avatars + Customer Count */}
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {avatars.map((src, index) => (
                    <img
                      key={index}
                      src={src}
                      alt=""
                      className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 rounded-full border-2 border-background dark:border-[hsl(0_0%_3%)] object-cover"
                      loading="lazy"
                    />
                  ))}
                </div>
                <span className="inline-flex items-center px-2 py-0.5 sm:px-2.5 sm:py-1 lg:px-3 lg:py-1.5 rounded-full text-[10px] sm:text-[11px] lg:text-xs font-medium bg-muted/80 dark:bg-white/10 border border-border dark:border-white/10 text-foreground dark:text-white">
                  15k+ Customers
                </span>
              </div>
              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 sm:px-2.5 sm:py-1 lg:px-3 lg:py-1.5 rounded-full text-[10px] sm:text-[11px] lg:text-xs font-medium bg-muted/80 dark:bg-white/10 border border-border dark:border-white/10 text-foreground dark:text-white">
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

            {/* Subtext */}
            <p
              className={`block text-sm sm:text-base md:text-lg lg:text-xl mb-4 lg:mb-8 leading-relaxed max-w-xl lg:max-w-none hero-animate delay-1 text-white dark:text-white/90 ${
                heroAnimated ? 'animate-in' : ''
              }`}
            >
              Your trusted automotive partner. We handle leasing, financing, and more so you can enjoy the ride.
            </p>

            {/* Mobile: single primary CTA */}
            <div
              className={`sm:hidden flex flex-col items-stretch hero-animate delay-2 ${
                heroAnimated ? 'animate-in' : ''
              }`}
            >
              <MagneticButton strength={0.45} className="w-full min-w-0">
                <Button
                  asChild
                  size="lg"
                  className="w-full h-10 min-h-[40px] rounded-lg bg-accent hover:bg-accent/90 text-accent-foreground font-semibold px-4 py-2 shrink-0 glow-blue text-sm shadow-[0_2px_12px_hsl(214_77%_50%_/_0.25)]"
                >
                  <Link to="/contact">
                    Start the process
                    <ArrowRight className="ml-1.5 w-3.5 h-3.5" />
                  </Link>
                </Button>
              </MagneticButton>
            </div>

            {/* Desktop: both buttons — centered */}
            <div
              className={`hidden sm:flex flex-row flex-wrap items-center justify-center gap-2 sm:gap-3 hero-animate delay-2 ${
                heroAnimated ? 'animate-in' : ''
              }`}
            >
              <MagneticButton strength={0.45} className="w-full sm:w-auto min-w-0">
                <Button
                  asChild
                  size="lg"
                  className="w-full sm:w-auto h-10 min-h-[44px] sm:h-12 bg-accent hover:bg-accent/90 text-accent-foreground font-semibold px-4 sm:px-8 shrink-0 glow-blue text-sm sm:text-base"
                >
                  <Link to="/contact">
                    Start the process
                    <ArrowRight className="ml-1.5 sm:ml-2 w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </Link>
                </Button>
              </MagneticButton>
              <MagneticButton strength={0.35} className="w-full sm:w-auto min-w-0">
                <Button
                  asChild
                  variant="ghost"
                  size="lg"
                  className="w-full sm:w-auto h-10 min-h-[44px] sm:h-12 border border-border dark:border-white/30 bg-transparent text-foreground dark:text-white hover:bg-muted dark:hover:bg-white/10 font-medium px-4 sm:px-6 shrink-0 text-sm sm:text-base"
                >
                  <Link to="/services">View Services</Link>
                </Button>
              </MagneticButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
