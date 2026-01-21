import { Layout } from '@/components/layout/Layout';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { useScrollReveal } from '@/hooks/useScrollReveal';

export default function AboutPage() {
  const { ref, isRevealed } = useScrollReveal();

  return (
    <Layout>
      <section className="bg-primary py-20 md:py-28">
        <div className="container mx-auto px-4 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-6">About Capital Motor Cars</h1>
          <p className="text-lg text-primary-foreground/80 max-w-2xl">
            Capital Motor Cars was built to make automotive decisions easier.
          </p>
        </div>
      </section>

      <section className="py-20 md:py-28 bg-background">
        <div ref={ref} className={`container mx-auto px-4 lg:px-8 scroll-reveal ${isRevealed ? 'revealed' : ''}`}>
          <div className="max-w-3xl mx-auto">
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              We focus on clear communication, realistic options and personal service.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Rather than pushing deals, we help customers understand their choices and move forward with confidence.
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
}
