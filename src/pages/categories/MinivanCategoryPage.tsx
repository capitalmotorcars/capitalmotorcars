import { Layout } from '@/components/layout/Layout';
import { SEO } from '@/components/SEO';
import { JsonLd, createWebPageSchema } from '@/components/JsonLd';
import { ServiceHero } from '@/components/services/ServiceHero';
import { TrustStatsBar } from '@/components/shared/TrustStatsBar';
import { ContactForm } from '@/components/forms/ContactForm';
import { Phone, ArrowRight, ShieldCheck, CheckCircle2, Zap, Landmark, BadgeDollarSign } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

export default function MinivanCategoryPage() {
  return (
    <Layout>
      <SEO
        title="Minivan Lease Deals NJ & NY | Family Vehicle Specials"
        description="Find the best minivan lease deals in New Jersey and New York. Zero down leases on the Honda Odyssey, Toyota Sienna, and Chrysler Pacifica."
        seoKeywords={["Minivan lease deals NJ","family car lease specials NY","zero down minivan lease","Honda Odyssey lease","Toyota Sienna lease"]}
        ogImage="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/2021_Honda_Odyssey_Elite_Front.jpg/1280px-2021_Honda_Odyssey_Elite_Front.jpg"
        canonicalPath="/minivan-lease-deals"
      />
      <JsonLd data={[
        createWebPageSchema({
          name: "Minivan Lease Deals NJ & NY | Family Vehicle Specials",
          description: "Find the best minivan lease deals in New Jersey and New York. Zero down leases on the Honda Odyssey, Toyota Sienna, and Chrysler Pacifica.",
          url: "https://www.capitalmotorcars.com/minivan-lease-deals"
        })
      ]} />

      <ServiceHero
        badge="Top Deals"
        title="Minivan Lease Deals"
        highlightedTitle=""
        subtitle="The ultimate family transporters. Discover aggressive lease specials on the safest and most spacious vehicles on the road."
        heroImage="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/2021_Honda_Odyssey_Elite_Front.jpg/1280px-2021_Honda_Odyssey_Elite_Front.jpg"
        primaryAction={{ label: "Contact Us", href: "/contact" }}
        secondaryAction={{ label: "Call Us", href: "tel:+12015095555", icon: Phone }}
      />
      
      <TrustStatsBar />

      <section className="py-16 bg-muted/10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-black uppercase mb-4">Designed for the Modern Family</h2>
            <p className="text-lg text-muted-foreground">Minivans offer unmatched practicality, sliding doors, and entertainment systems. Secure an affordable monthly payment for your family's next adventure.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-background rounded-3xl p-8 border border-border/50 text-center">
              <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <BadgeDollarSign className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-xl font-bold mb-3">Zero Down Options</h3>
              <p className="text-muted-foreground">Keep your cash in your pocket with our sign and drive lease programs.</p>
            </div>
            <div className="bg-background rounded-3xl p-8 border border-border/50 text-center">
              <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <ShieldCheck className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-xl font-bold mb-3">Full Warranty</h3>
              <p className="text-muted-foreground">Drive with peace of mind knowing your vehicle is covered for the duration of the lease.</p>
            </div>
            <div className="bg-background rounded-3xl p-8 border border-border/50 text-center">
              <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-xl font-bold mb-3">Door-to-Door Delivery</h3>
              <p className="text-muted-foreground">We handle the paperwork and deliver your new Minivan right to your driveway.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-3xl md:text-5xl font-black uppercase mb-6">Ready to Lease a Minivan?</h2>
          <p className="text-lg text-muted-foreground mb-10">
            Tell us exactly what you're looking for, and our brokers will find the perfect match at the lowest price possible.
          </p>
          <div className="bg-muted/5 rounded-[3rem] p-8 md:p-12 border-2 border-border/10 shadow-2xl relative overflow-hidden text-left">
            <ContactForm 
              source="category_page"
              hideServiceField={true}
              initialValues={{ message: 'I am interested in leasing a Minivan. Please contact me with your best zero down lease deals.' }}
            />
          </div>
        </div>
      </section>
    </Layout>
  );
}
