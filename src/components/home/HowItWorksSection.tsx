import { useScrollReveal } from '@/hooks/useScrollReveal';
import { CircularProcessVisualization } from '@/components/hero/CircularProcessVisualization';
import { HeroSpotlight } from '../hero/HeroSpotlight';

interface HowItWorksSectionProps {
  /** When true, section has transparent background (e.g. inside HeroBackgroundWrapper). */
  transparentBackground?: boolean;
}

export function HowItWorksSection({ transparentBackground }: HowItWorksSectionProps = {}) {
  const { ref, isRevealed } = useScrollReveal(0.12);

  return (
    <section
      id="how-it-works"
      className={`py-16 lg:py-20 relative`}
    >
      
      <div
        ref={ref}
        className={`flex flex-col items-center w-full px-4 sm:px-6 lg:px-8 container mx-auto transition-all duration-700 ease-out ${
          isRevealed ? 'scroll-reveal revealed' : 'scroll-reveal'
        }`}
      >

        <div className="w-full max-w-5xl how-it-works-card pt-6 px-4 md:px-6 md:py-8 md:pt-8 lg:px-10 lg:py-12 lg:pt-12">
          <header className="text-center ">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight mb-2 text-section">
              How It Works
            </h2>
            <p className="text-sm sm:text-base text-section-muted max-w-xl mx-auto">
              From first call to delivery simple steps, no runaround.
            </p>
          </header>
          <CircularProcessVisualization mobileSize={380} hideMobileTitle />
        </div>
      </div>
    </section>
  );
}
