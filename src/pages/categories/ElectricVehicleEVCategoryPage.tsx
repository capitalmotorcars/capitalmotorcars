import { Layout } from '@/components/layout/Layout';
import { SEO } from '@/components/SEO';
import { JsonLd, createWebPageSchema } from '@/components/JsonLd';
import { ServiceHero } from '@/components/services/ServiceHero';
import { TrustStatsBar } from '@/components/shared/TrustStatsBar';
import { ContactForm } from '@/components/forms/ContactForm';
import { Phone, ArrowRight, ShieldCheck, CheckCircle2, Zap, Landmark, BadgeDollarSign } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

export default function ElectricVehicleEVCategoryPage() {
  return (
    <Layout>
      <SEO
        title="EV Lease Deals NJ & NY | Zero Down Electric Car Specials"
        description="Explore the best EV lease deals in NJ & NY. Maximize your EV tax credits and lease a Tesla, Audi e-tron, or BMW iX with zero down."
        seoKeywords={["EV lease deals NJ","electric car lease specials NY","zero down EV lease","Tesla lease broker NJ","BMW iX lease"]}
        ogImage="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Tesla_Model_Y_1.jpg/1280px-Tesla_Model_Y_1.jpg"
        canonicalPath="/ev-lease-deals"
      />
      <JsonLd data={[
        createWebPageSchema({
          name: "EV Lease Deals NJ & NY | Zero Down Electric Car Specials",
          description: "Explore the best EV lease deals in NJ & NY. Maximize your EV tax credits and lease a Tesla, Audi e-tron, or BMW iX with zero down.",
          url: "https://www.capitalmotorcars.com/ev-lease-deals"
        })
      ]} />

      <ServiceHero
        badge="Top Deals"
        title="Electric Vehicle Lease Deals"
        highlightedTitle=""
        subtitle="Capitalize on massive EV tax credits. We pass the $7,500 federal tax credit directly to you for rock-bottom monthly payments."
        heroImage="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Tesla_Model_Y_1.jpg/1280px-Tesla_Model_Y_1.jpg"
        primaryAction={{ label: "View Specials", href: "/deals" }}
        secondaryAction={{ label: "Call Us", href: "tel:+12015095555", icon: Phone }}
      />
      
      <TrustStatsBar />

      <section className="py-16 bg-muted/10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-black uppercase mb-4">The Smart Way to Go Electric</h2>
            <p className="text-lg text-muted-foreground">EV technology evolves rapidly. Leasing an electric vehicle protects you from battery degradation and obsolescence. Drive the future today with minimal risk.</p>
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
              <p className="text-muted-foreground">We handle the paperwork and deliver your new Electric Vehicle (EV) right to your driveway.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-3xl md:text-5xl font-black uppercase mb-6">Ready to Lease a Electric Vehicle (EV)?</h2>
          <p className="text-lg text-muted-foreground mb-10">
            Tell us exactly what you're looking for, and our brokers will find the perfect match at the lowest price possible.
          </p>
          <div className="bg-muted/5 rounded-[3rem] p-8 md:p-12 border-2 border-border/10 shadow-2xl relative overflow-hidden text-left">
            <ContactForm 
              source="category_page"
              hideServiceField={true}
              initialValues={{ message: 'I am interested in leasing a Electric Vehicle (EV). Please contact me with your best zero down lease deals.' }}
            />
          </div>
        </div>
      </section>
    </Layout>
  );
}
