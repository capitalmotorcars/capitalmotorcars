import { Layout } from '@/components/layout/Layout';
import { ContactForm } from '@/components/forms/ContactForm';

export default function ContactPage() {
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
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
