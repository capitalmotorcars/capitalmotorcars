import { Layout } from '@/components/layout/Layout';
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
            <div className="bg-muted p-6 md:p-8 rounded-lg">
              <ContactForm initialValues={{ fullName, phone, service, message }} />
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
