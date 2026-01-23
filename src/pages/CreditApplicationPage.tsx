import { Layout } from '@/components/layout/Layout';
import { SEO } from '@/components/SEO';
import { CreditApplicationForm } from '@/components/forms/CreditApplicationForm';

export default function CreditApplicationPage() {
  return (
    <Layout>
      <SEO 
        title="Credit Application | Capital Motor Cars"
        description="Start your financing journey with a quick credit application. Get clear answers about your options without unnecessary paperwork."
      />
      <section className="bg-primary py-20 md:py-28">
        <div className="container mx-auto px-4 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-6">Credit Application</h1>
          <p className="text-lg text-primary-foreground/80 max-w-2xl">
            Start your financing journey with a quick preliminary application.
          </p>
        </div>
      </section>

      <section className="py-20 md:py-28 bg-background">
        <div className="container mx-auto px-4 lg:px-8 max-w-2xl">
          <div className="bg-card border border-border p-6 md:p-10 rounded-lg">
            <CreditApplicationForm />
          </div>
        </div>
      </section>
    </Layout>
  );
}
