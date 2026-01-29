import { Layout } from '@/components/layout/Layout';
import { SEO } from '@/components/SEO';
import { PageHero } from '@/components/ui/PageHero';
import { CreditApplicationForm } from '@/components/forms/CreditApplicationForm';
import { useScrollReveal } from '@/hooks/useScrollReveal';

export default function CreditApplicationPage() {
  return (
    <Layout>
      <SEO 
        title="Credit Application | Capital Motor Cars"
        description="Start your financing journey with a quick credit application. Get clear answers about your options without unnecessary paperwork."
      />
      
      <PageHero
        title="Credit Application"
        subtitle="Start your financing journey with a quick preliminary application."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Services', href: '/services' },
          { label: 'Credit Application' },
        ]}
      />

      <AnimatedCreditSection />
    </Layout>
  );
}

function AnimatedCreditSection() {
  const { ref, isRevealed } = useScrollReveal();

  return (
    <section className="py-20 md:py-28 bg-background">
      <div
        ref={ref}
        className={`container mx-auto px-4 lg:px-8 max-w-2xl scroll-reveal ${isRevealed ? 'revealed' : ''}`}
      >
          <div className="bg-card border border-border p-6 md:p-10 rounded-lg">
            <CreditApplicationForm />
          </div>
        </div>
    </section>
  );
}
