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
        loading="eager"
        decoding="async"
        fetchPriority="high"
        className="absolute inset-0 w-full h-full object-cover opacity-20"
      />
      
      {/* Dark overlay for CDK-style contrast */}
      <div className="absolute inset-0" style={{ backgroundColor: 'hsl(216 27% 6% / 0.85)' }} />

      <div className="relative container mx-auto px-4 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-start lg:gap-12 xl:gap-20">
          {/* Left Column - Content */}
          <div className="max-w-xl flex-shrink-0 z-10 lg:py-12">
            {/* Social Proof Badges */}
            <div
              className={`flex flex-wrap items-center gap-3 mb-4 hero-animate ${
                heroAnimated ? 'animate-in' : ''
              }`}
            >
              <span
                className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium text-white"
                style={{
                  backgroundColor: 'hsl(0 0% 100% / 0.08)',
                  border: '1px solid hsl(0 0% 100% / 0.1)',
                }}
              >
                15k+ Customers
              </span>
              <span
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium text-white"
                style={{
                  backgroundColor: 'hsl(0 0% 100% / 0.08)',
                  border: '1px solid hsl(0 0% 100% / 0.1)',
                }}
              >
                {/* Google Icon */}
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                <span className="text-accent">★★★★★</span>
                5/5 on Google
              </span>
            </div>

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
              Work with a personal auto consultant who manages the entire process, from search and approval to delivery at your door.
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
