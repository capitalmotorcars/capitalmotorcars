import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { CircularProcessVisualization } from './CircularProcessVisualization';
import { useHeroAnimation } from '@/hooks/useHeroAnimation';
import { ArrowRight } from 'lucide-react';
import heroBg from '@/assets/hero-bg.jpg';

export function HeroSection() {
  const heroAnimated = useHeroAnimation();

  return (
    <section className="relative py-16 lg:py-24 min-h-[600px] lg:min-h-[700px]" style={{ backgroundColor: 'hsl(216 27% 6%)' }}>
      {/* Background Image - subtle */}
      <img
        src={heroBg}
        alt=""
        className="absolute inset-0 w-full h-full object-cover opacity-20"
      />
      
      {/* Dark overlay for CDK-style contrast */}
      <div className="absolute inset-0" style={{ backgroundColor: 'hsl(216 27% 6% / 0.85)' }} />

      <div className="relative container mx-auto px-4 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-start lg:gap-12 xl:gap-20">
          {/* Left Column - Content */}
          <div className="max-w-xl flex-shrink-0 z-10 lg:py-12">
            <h1
              className={`text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-[1.1] hero-animate ${
                heroAnimated ? 'animate-in' : ''
              }`}
            >
              A clear, guided approach to car leasing.
            </h1>
            
            <p
              className={`text-lg md:text-xl mb-8 leading-relaxed max-w-lg hero-animate delay-1 ${
                heroAnimated ? 'animate-in' : ''
              }`}
              style={{ color: 'hsl(213 27% 84%)' }}
            >
              Work with a personal auto consultant who manages the entire process — from search and approval to delivery at your door.
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
                  Schedule a Call
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
              
              <Link
                to="/services"
                className="font-medium underline-offset-4 hover:underline transition-colors"
                style={{ color: 'hsl(213 27% 84%)' }}
              >
                View Services
              </Link>
            </div>

            <p
              className={`mt-4 text-sm hero-animate delay-2 ${heroAnimated ? 'animate-in' : ''}`}
              style={{ color: 'hsl(213 27% 84%)' }}
            >
              One conversation. No pressure.
            </p>
          </div>

          {/* Right Column - Process Visualization */}
          <div
            className={`flex-1 mt-12 lg:mt-0 hero-animate delay-3 ${heroAnimated ? 'animate-in' : ''}`}
          >
            <CircularProcessVisualization />
          </div>
        </div>
      </div>
    </section>
  );
}
