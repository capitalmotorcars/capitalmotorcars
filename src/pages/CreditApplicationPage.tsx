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
    <section className="py-8 md:py-14 lg:py-20 bg-[hsl(216_27%_8%)]">
      <div
        ref={ref}
        className={`container mx-auto px-4 lg:px-8 max-w-2xl scroll-reveal ${isRevealed ? 'revealed' : ''}`}
      >
        <div className="border border-white/10 bg-white/[0.06] backdrop-blur-sm p-6 md:p-10 rounded-xl shadow-[0_0_20px_hsl(214_77%_50%_/_0.05)] [&_label]:text-white [&_input]:bg-white/10 [&_input]:border-white/25 [&_input]:text-white [&_input]:placeholder:text-white/60 [&_textarea]:bg-white/10 [&_textarea]:border-white/25 [&_textarea]:text-white [&_textarea]:placeholder:text-white/60 [&_.text-muted-foreground]:text-white/90 [&_button:not([type=submit])]:bg-white/10 [&_button:not([type=submit])]:border-white/25 [&_button:not([type=submit])]:text-white [&_button:not([type=submit])_[data-placeholder]]:text-white/60">
          <CreditApplicationForm />
        </div>
      </div>
    </section>
  );
}
