import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { useScrollReveal } from '@/hooks/useScrollReveal';

export function FinalCTASection() {
  const { ref, isRevealed } = useScrollReveal();

  return (
    <section className="py-8 md:py-16 lg:py-20">
      <div
        ref={ref}
        className={`container mx-auto px-4 lg:px-8 text-center max-w-3xl glass-card-theme py-10 md:py-14 scroll-reveal ${isRevealed ? 'revealed' : ''}`}
      >
        <h2 className="text-2xl md:text-4xl font-bold text-gradient-heading-dark mb-4 md:mb-6 max-w-2xl mx-auto">
          Looking for a simpler way to handle your next vehicle?
        </h2>
        <p className="text-base md:text-lg mb-6 md:mb-8 max-w-xl mx-auto">
          Schedule a call and we'll walk you through the process.
        </p>
        <MagneticButton strength={0.35}>
          <Button
            asChild
            size="lg"
            className="bg-accent hover:bg-accent/90 text-accent-foreground glow-blue"
          >
            <Link to="/contact">Schedule a Call</Link>
          </Button>
        </MagneticButton>
      </div>
    </section>
  );
}
