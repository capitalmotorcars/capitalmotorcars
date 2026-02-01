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

      <SectionDivider variant="curved" nextSectionDark />

      <AnimatedCreditSection />
    </Layout>
  );
}

function AnimatedCreditSection() {
  const { ref, isRevealed } = useScrollReveal();

  return (
    <section className="py-8 md:py-16 lg:py-20 bg-[hsl(0_0%_4%)]">
      <div
        ref={ref}
        className={`container mx-auto px-4 lg:px-8 max-w-2xl scroll-reveal ${isRevealed ? 'revealed' : ''}`}
      >
        <div className="glass-card-dark rounded-2xl border border-white/10 bg-white/[0.04] p-4 sm:p-6 md:p-10 [&_label]:text-white [&_input]:bg-white/10 [&_input]:border-white/25 [&_input]:text-white [&_input]:placeholder:text-white/60 [&_input]:focus-visible:ring-accent [&_input]:focus-visible:ring-2 [&_input]:transition-[box-shadow] [&_textarea]:bg-white/10 [&_textarea]:border-white/25 [&_textarea]:text-white [&_textarea]:placeholder:text-white/60 [&_textarea]:focus-visible:ring-accent [&_textarea]:focus-visible:ring-2 [&_textarea]:transition-[box-shadow] [&_.text-muted-foreground]:text-white/90 [&_button:not([type=submit])]:bg-white/10 [&_button:not([type=submit])]:border-white/25 [&_button:not([type=submit])]:text-white [&_button:not([type=submit])_[data-placeholder]]:text-white/60 [&_button:focus-visible]:ring-accent [&_button:focus-visible]:ring-2">
          <CreditApplicationForm />
        </div>
      </div>
    </section>
  );
}
