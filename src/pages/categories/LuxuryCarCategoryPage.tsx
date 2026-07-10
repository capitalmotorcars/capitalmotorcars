import { Layout } from '@/components/layout/Layout';
import { SEO } from '@/components/SEO';
import { JsonLd, createWebPageSchema } from '@/components/JsonLd';
import { ServiceHero } from '@/components/services/ServiceHero';
import { TrustStatsBar } from '@/components/shared/TrustStatsBar';
import { ContactForm } from '@/components/forms/ContactForm';
import { Phone, ArrowRight, ShieldCheck, CheckCircle2, Zap, Landmark, BadgeDollarSign } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

export default function LuxuryCarCategoryPage() {
  return (
    <Layout>
      <SEO
        title="Luxury Car Lease Deals NJ & NY | Zero Down Specials"
        description="Exclusive luxury car lease deals in New Jersey and New York. Lease a Mercedes-Benz, Porsche, or Range Rover with zero down."
        seoKeywords={["Luxury car lease deals NJ","exotic car lease specials NY","zero down luxury lease","Mercedes lease deals","Porsche lease broker"]}
        ogImage="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/2021_Mercedes-Benz_S_580_4MATIC_Front.jpg/1280px-2021_Mercedes-Benz_S_580_4MATIC_Front.jpg"
        canonicalPath="/luxury-lease-deals"
      />
      <JsonLd data={[
        createWebPageSchema({
          name: "Luxury Car Lease Deals NJ & NY | Zero Down Specials",
          description: "Exclusive luxury car lease deals in New Jersey and New York. Lease a Mercedes-Benz, Porsche, or Range Rover with zero down.",
          url: "https://www.capitalmotorcars.com/luxury-lease-deals"
        })
      ]} />

      <ServiceHero
        badge="Top Deals"
        title="Luxury Car Lease Deals"
        highlightedTitle=""
        subtitle="Experience the pinnacle of automotive engineering. We negotiate exclusive lease rates on the world's most prestigious brands."
        heroImage="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/2021_Mercedes-Benz_S_580_4MATIC_Front.jpg/1280px-2021_Mercedes-Benz_S_580_4MATIC_Front.jpg"
        primaryAction={{ label: "View Specials", href: "/deals" }}
        secondaryAction={{ label: "Call Us", href: "tel:+12015095555", icon: Phone }}
      />
      
      <TrustStatsBar />

      <section className="py-16 bg-muted/10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-black uppercase mb-4">Uncompromising Luxury</h2>
            <p className="text-lg text-muted-foreground">Leasing a luxury vehicle allows you to drive a higher caliber car for a lower monthly payment. We handle the negotiations so you can enjoy the ride.</p>
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
              <p className="text-muted-foreground">We handle the paperwork and deliver your new Luxury Car right to your driveway.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-3xl md:text-5xl font-black uppercase mb-6">Ready to Lease a Luxury Car?</h2>
          <p className="text-lg text-muted-foreground mb-10">
            Tell us exactly what you're looking for, and our brokers will find the perfect match at the lowest price possible.
          </p>
          <div className="bg-muted/5 rounded-[3rem] p-8 md:p-12 border-2 border-border/10 shadow-2xl relative overflow-hidden text-left">
            <ContactForm 
              source="category_page"
              hideServiceField={true}
              initialValues={{ message: 'I am interested in leasing a Luxury Car. Please contact me with your best zero down lease deals.' }}
            />
          </div>
        </div>
      </section>
    </Layout>
  );
}
