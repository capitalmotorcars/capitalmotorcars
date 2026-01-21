import { Layout } from '@/components/layout/Layout';

export default function PrivacyPolicyPage() {
  return (
    <Layout>
      <section className="bg-primary py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-bold text-primary-foreground">Privacy Policy</h1>
        </div>
      </section>
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 lg:px-8 max-w-3xl prose prose-gray">
          <p className="text-muted-foreground">Last updated: January 2026</p>
          <h2 className="text-xl font-semibold text-primary mt-8">Information We Collect</h2>
          <p className="text-muted-foreground">We collect information you provide directly, including name, contact details, and vehicle preferences when you use our services or fill out forms.</p>
          <h2 className="text-xl font-semibold text-primary mt-8">How We Use Information</h2>
          <p className="text-muted-foreground">Your information is used to provide services, communicate with you, and improve our offerings. We do not sell your personal information.</p>
          <h2 className="text-xl font-semibold text-primary mt-8">Contact Us</h2>
          <p className="text-muted-foreground">For privacy questions, contact us at privacy@capitalmotorcars.com.</p>
        </div>
      </section>
    </Layout>
  );
}
