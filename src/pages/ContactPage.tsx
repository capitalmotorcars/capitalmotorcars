import { Layout } from '@/components/layout/Layout';
import { SEO } from '@/components/SEO';
import { JsonLd, organizationSchema } from '@/components/JsonLd';
import { PageHero } from '@/components/ui/PageHero';
import { SectionDivider } from '@/components/ui/SectionDivider';
import { RelatedLinks, contactPageLinks } from '@/components/ui/RelatedLinks';
import { ContactForm } from '@/components/forms/ContactForm';
import { useSearchParams } from 'react-router-dom';
import { useScrollReveal } from '@/hooks/useScrollReveal';

export default function ContactPage() {
  const [searchParams] = useSearchParams();

  const fullName = searchParams.get('fullName') ?? undefined;
  const phone = searchParams.get('phone') ?? undefined;
  const service = searchParams.get('service') ?? undefined;
  const message = searchParams.get('message') ?? undefined;
  const { ref, isRevealed } = useScrollReveal();

  return (
    <Layout>
      <SEO 
        title="Contact Us | Capital Motor Cars"
        description="Get in touch with Capital Motor Cars. Ask questions about car leasing, financing, or end-of-lease services. We respond quickly."
      />
      <JsonLd data={organizationSchema} />
      
      <PageHero
        title="Contact"
        subtitle="If you have any questions or would like to get started, fill out the form and we will respond shortly."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Contact' },
        ]}
      />

      <SectionDivider variant="curved" nextSectionDark />

      <section className="py-8 md:py-14 lg:py-20 bg-[hsl(216_27%_8%)]">
        <div
          ref={ref}
          className={`container mx-auto px-4 lg:px-8 scroll-reveal ${isRevealed ? 'revealed' : ''}`}
        >
          <div className="max-w-xl mx-auto">
            <h2 className="sr-only">Contact Form</h2>
            <div className="border border-white/10 bg-white/[0.06] backdrop-blur-sm p-6 md:p-8 rounded-xl shadow-[0_0_20px_hsl(214_77%_50%_/_0.05)] [&_label]:text-white [&_input]:bg-white/10 [&_input]:border-white/25 [&_input]:text-white [&_input]:placeholder:text-white/60 [&_textarea]:bg-white/10 [&_textarea]:border-white/25 [&_textarea]:text-white [&_textarea]:placeholder:text-white/60 [&_.text-muted-foreground]:text-white/90 [&_button:not([type=submit])]:bg-white/10 [&_button:not([type=submit])]:border-white/25 [&_button:not([type=submit])]:text-white [&_button:not([type=submit])_[data-placeholder]]:text-white/60">
              <ContactForm initialValues={{ fullName, phone, service, message }} />
            </div>
          </div>
        </div>
      </section>

      <RelatedLinks 
        title="More Ways to Connect" 
        links={contactPageLinks} 
        dark
      />
    </Layout>
  );
}
