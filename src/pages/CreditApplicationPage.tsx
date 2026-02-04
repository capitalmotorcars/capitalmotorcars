import { Layout } from '@/components/layout/Layout';
import { SEO } from '@/components/SEO';
import { PageHero } from '@/components/ui/PageHero';
import { SectionDivider } from '@/components/ui/SectionDivider';
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
    <section className="py-8 md:py-16 lg:py-20 section-bg">
      <div
        ref={ref}
        className={`container mx-auto px-4 lg:px-8 max-w-3xl scroll-reveal ${isRevealed ? 'revealed' : ''}`}
      >
        <div className="glass-card-theme form-card-theme p-4 sm:p-6 md:p-10">
          <CreditApplicationForm />
        </div>
      </div>
    </section>
  );
}
