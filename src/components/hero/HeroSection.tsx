import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { CircularProcessVisualization } from './CircularProcessVisualization';
import { useHeroAnimation } from '@/hooks/useHeroAnimation';
import { ArrowRight } from 'lucide-react';
import heroBg from '@/assets/hero-bg.jpg';

export function HeroSection() {
  const heroAnimated = useHeroAnimation();

  return (
    <section className="relative bg-primary py-16 lg:py-24 min-h-[600px] lg:min-h-[700px]">
      {/* Background Image */}
      <img
        src={heroBg}
        alt=""
        className="absolute inset-0 w-full h-full object-cover opacity-40"
      />
      
      {/* Dark gradient overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/85 to-primary/70" />

      <div className="relative container mx-auto px-4 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-start lg:gap-12 xl:gap-20">
          {/* Left Column - Content */}
          <div className="max-w-xl flex-shrink-0 z-10 lg:py-12">
            <h1
              className={`text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-[1.1] hero-animate ${
                heroAnimated ? 'animate-in' : ''
              }`}
            >
              Simple, stress-free automotive solutions.
            </h1>
            
            <p
              className={`text-lg md:text-xl text-white/70 mb-8 leading-relaxed max-w-lg hero-animate delay-1 ${
                heroAnimated ? 'animate-in' : ''
              }`}
            >
              Capital Motor Cars helps you lease, finance and maintain your vehicle with a clear process and personalized support.
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
                className="text-white/70 hover:text-white font-medium underline-offset-4 hover:underline transition-colors"
              >
                View Services
              </Link>
            </div>
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
