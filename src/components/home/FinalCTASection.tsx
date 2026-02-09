import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { useScrollReveal } from '@/hooks/useScrollReveal';

export function FinalCTASection() {
  const { ref, isRevealed } = useScrollReveal();

  return (
    <section className="py-16 lg:py-20 px-4 md:px-0 ">
      <div
        ref={ref}
        className={`
          how-it-works-card p-8 mx-auto text-center max-w-3xl
          scroll-reveal ${isRevealed ? 'revealed' : ''}
        `}
      >
        <h2 className="text-xl sm:text-2xl md:text-4xl font-bold text-heading-cta mb-3 sm:mb-4 md:mb-6 max-w-2xl mx-auto leading-tight">
          Looking for a simpler way to handle your next vehicle?
        </h2>
        <p className="text-sm sm:text-base md:text-lg text-muted-foreground dark:text-white/80 mb-5 sm:mb-6 md:mb-8 max-w-xl mx-auto">
          Schedule a call and we'll walk you through the process.
        </p>
        <MagneticButton strength={0.35}>
          <Button
            asChild
            size="lg"
            className="bg-accent hover:bg-accent/90 text-accent-foreground glow-blue w-full sm:w-auto"
          >
            <Link to="/contact">Schedule a Call</Link>
          </Button>
        </MagneticButton>
      </div>
    </section>
  );
}
