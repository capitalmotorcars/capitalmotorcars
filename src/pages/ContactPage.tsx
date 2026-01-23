import { Layout } from '@/components/layout/Layout';
import { SEO } from '@/components/SEO';
import { JsonLd, organizationSchema } from '@/components/JsonLd';
import { RelatedLinks, contactPageLinks } from '@/components/ui/RelatedLinks';
import { ContactForm } from '@/components/forms/ContactForm';
import { useSearchParams } from 'react-router-dom';

export default function ContactPage() {
  const [searchParams] = useSearchParams();

  const fullName = searchParams.get('fullName') ?? undefined;
  const phone = searchParams.get('phone') ?? undefined;
  const service = searchParams.get('service') ?? undefined;
  const message = searchParams.get('message') ?? undefined;

  return (
    <Layout>
      <SEO 
        title="Contact Us | Capital Motor Cars"
        description="Get in touch with Capital Motor Cars. Ask questions about car leasing, financing, or end-of-lease services. We respond quickly."
      />
      <JsonLd data={organizationSchema} />
      <section className="bg-primary py-20 md:py-28">
        <div className="container mx-auto px-4 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-6">Contact</h1>
          <p className="text-lg text-primary-foreground/80 max-w-2xl">
            If you have any questions or would like to get started, fill out the form and we will respond shortly.
          </p>
        </div>
      </section>

      <section className="py-20 md:py-28 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-xl mx-auto">
            <h2 className="sr-only">Contact Form</h2>
            <div className="bg-muted p-6 md:p-8 rounded-lg">
              <ContactForm initialValues={{ fullName, phone, service, message }} />
            </div>
          </div>
        </div>
      </section>

      <RelatedLinks 
        title="More Ways to Connect" 
        links={contactPageLinks} 
        className="bg-muted border-t border-border"
      />
    </Layout>
  );
}
