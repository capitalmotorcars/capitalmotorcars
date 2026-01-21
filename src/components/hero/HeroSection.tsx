import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { CircularProcessVisualization } from './CircularProcessVisualization';
import { useHeroAnimation } from '@/hooks/useHeroAnimation';
import { ArrowRight } from 'lucide-react';

export function HeroSection() {
  const heroAnimated = useHeroAnimation();

  return (
    <section className="relative bg-primary overflow-hidden min-h-[600px] lg:min-h-[700px]">
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-10"
        style={{
          backgroundImage:
            'url(https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1920&q=80)',
        }}
      />
      
      {/* Dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary to-primary/90" />

      <div className="relative container mx-auto px-4 lg:px-8 py-20 md:py-28 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Left Column - Content */}
          <div className="max-w-xl z-10">
            <h1
              className={`text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6 leading-[1.1] hero-animate ${
                heroAnimated ? 'animate-in' : ''
              }`}
            >
              Straightforward car solutions, without the stress.
            </h1>
            
            <p
              className={`text-lg md:text-xl text-primary-foreground/70 mb-10 leading-relaxed max-w-lg hero-animate delay-1 ${
                heroAnimated ? 'animate-in' : ''
              }`}
            >
              A clear, guided process from your first conversation to delivery at your door.
            </p>

            <div
              className={`flex flex-col sm:flex-row items-start sm:items-center gap-4 hero-animate delay-2 ${
                heroAnimated ? 'animate-in' : ''
              }`}
            >
              <Button
                asChild
                size="lg"
                className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold px-8 h-12"
              >
                <Link to="/contact">
                  Get Started
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
              
              <Link
                to="/services"
                className="text-primary-foreground/70 hover:text-primary-foreground font-medium underline-offset-4 hover:underline transition-colors"
              >
                View Services
              </Link>
            </div>
          </div>

          {/* Right Column - Large Circular Process - extends past edge */}
          <div
            className={`hidden lg:flex justify-end items-center hero-animate delay-3 ${heroAnimated ? 'animate-in' : ''}`}
          >
            {/* Container that allows overflow to the right */}
            <div className="relative -mr-32 xl:-mr-48">
              <CircularProcessVisualization />
            </div>
          </div>
        </div>

        {/* Mobile Process Steps - Below content */}
        <div className={`lg:hidden mt-12 hero-animate delay-3 ${heroAnimated ? 'animate-in' : ''}`}>
          <CircularProcessVisualization />
        </div>
      </div>
    </section>
  );
}
