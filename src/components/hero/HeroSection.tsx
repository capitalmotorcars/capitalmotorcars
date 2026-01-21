import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { CircularProcessVisualization } from './CircularProcessVisualization';
import { useHeroAnimation } from '@/hooks/useHeroAnimation';
import { ArrowRight } from 'lucide-react';

export function HeroSection() {
  const heroAnimated = useHeroAnimation();

  return (
    <section className="relative bg-primary overflow-hidden">
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-15"
        style={{
          backgroundImage:
            'url(https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1920&q=80)',
        }}
      />
      
      {/* Subtle gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/95 to-primary/80" />

      <div className="relative container mx-auto px-4 lg:px-8 py-20 md:py-28 lg:py-32">
        <div className="grid lg:grid-cols-[1fr,1.2fr] gap-12 lg:gap-16 items-center">
          {/* Left Column - Content */}
          <div className="max-w-xl">
            <h1
              className={`text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-5 leading-tight hero-animate ${
                heroAnimated ? 'animate-in' : ''
              }`}
            >
              Straightforward car solutions, without the stress.
            </h1>
            
            <p
              className={`text-lg md:text-xl text-primary-foreground/80 mb-8 leading-relaxed hero-animate delay-1 ${
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
                className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold px-8"
              >
                <Link to="/contact">
                  Get Started
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
              
              <Link
                to="/services"
                className="text-primary-foreground/80 hover:text-primary-foreground font-medium text-sm underline-offset-4 hover:underline transition-colors"
              >
                View Services
              </Link>
            </div>
          </div>

          {/* Right Column - Process Visualization */}
          <div
            className={`hero-animate delay-3 ${heroAnimated ? 'animate-in' : ''}`}
          >
            <div className="lg:pl-8">
              <div className="mb-4">
                <span className="text-accent text-sm font-semibold uppercase tracking-wider">
                  How It Works
                </span>
              </div>
              <CircularProcessVisualization />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
