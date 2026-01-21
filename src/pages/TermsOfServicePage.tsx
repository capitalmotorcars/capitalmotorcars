import { Layout } from '@/components/layout/Layout';

export default function TermsOfServicePage() {
  return (
    <Layout>
      <section className="bg-primary py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-bold text-primary-foreground">Terms of Service</h1>
        </div>
      </section>
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 lg:px-8 max-w-3xl prose prose-gray">
          <p className="text-muted-foreground">Last updated: January 2026</p>
          <h2 className="text-xl font-semibold text-primary mt-8">Acceptance of Terms</h2>
          <p className="text-muted-foreground">By using our website and services, you agree to these terms. If you do not agree, please do not use our services.</p>
          <h2 className="text-xl font-semibold text-primary mt-8">Services</h2>
          <p className="text-muted-foreground">Capital Motor Cars provides automotive leasing, financing, and service solutions. All transactions are subject to credit approval and vehicle availability.</p>
          <h2 className="text-xl font-semibold text-primary mt-8">Limitation of Liability</h2>
          <p className="text-muted-foreground">We are not liable for indirect or consequential damages arising from use of our services.</p>
        </div>
      </section>
    </Layout>
  );
}
