import { Link } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { SEO } from '@/components/SEO';
import { JsonLd, createWebPageSchema } from '@/components/JsonLd';
import { ServiceHero } from '@/components/services/ServiceHero';
import { TrustStatsBar } from '@/components/shared/TrustStatsBar';
import { ContactForm } from '@/components/forms/ContactForm';
import { Phone, ArrowRight, ShieldCheck, CheckCircle2, Zap, Landmark, BadgeDollarSign } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

export default function AstonMartinBrandPage() {
  return (
    <Layout>
      <SEO
        title="2026 Aston Martin Lease Deals NJ & NY | Zero Down Specials"
        description="Lease a 2026 Aston Martin in NJ & NY — exclusive DB12 and Vantage specials. Hand-built British luxury at broker pricing."
        seoKeywords={['2026 Aston Martin lease deals NJ', 'Aston Martin lease specials NY', 'zero down Aston Martin lease', 'Aston Martin broker NJ']}
        ogImage="https://upload.wikimedia.org/wikipedia/commons/thumb/9/92/2018_Aston_Martin_DB11_V8_Automatic_4.0_Front.jpg/1280px-2018_Aston_Martin_DB11_V8_Automatic_4.0_Front.jpg"
        canonicalPath="/brand/aston-martin"
      />
      <JsonLd data={[
        createWebPageSchema({
          name: "Aston Martin Lease Deals NJ & NY",
          description: "Affordable Aston Martin leasing broker in New Jersey offering aggressive specials.",
          url: "https://www.capitalmotorcars.com/brand/aston-martin"
        })
      ]} />

      {/* Section 1: Hero */}
      <ServiceHero
        badge="Best Value"
        title="2026 Aston Martin Lease Deals"
        highlightedTitle=""
        subtitle="Lease a 2026 Aston Martin in NJ & NY — exclusive DB12 and Vantage specials. Hand-built British luxury at broker pricing."
        heroImage="https://upload.wikimedia.org/wikipedia/commons/thumb/9/92/2018_Aston_Martin_DB11_V8_Automatic_4.0_Front.jpg/1280px-2018_Aston_Martin_DB11_V8_Automatic_4.0_Front.jpg"
        primaryAction={{ label: "View SUVs", href: "/vehicles/suv" }}
        secondaryAction={{ label: "Call Us", href: "tel:+12015095555", icon: Phone }}
      />
      
      {/* Section 2: Trust Stats */}
      <TrustStatsBar />

      {/* Section 3: Intro & Benefits */}
      <section className="py-16 bg-muted/10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-black uppercase mb-4">A Work of Art With a Soul</h2>
            <p className="text-lg text-muted-foreground">Aston Martin is one of the world's most exclusive automotive brands. The DB12, Vantage, and DBX707 are hand-built in Gaydon, England — combining British artisanship with blistering performance. Capital Motor Cars provides access to these exclusive vehicles with curated lease structures.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 rounded-3xl bg-card border border-border/50 text-center flex flex-col items-center hover:border-accent transition-colors">
              <ShieldCheck className="w-12 h-12 text-accent mb-4" />
              <h3 className="text-xl font-bold mb-4">Hand-Built Excellence</h3>
              <p className="text-muted-foreground">Every Aston Martin is assembled by hand in Gaydon, England — with each engine signed by the technician who built it.</p>
            </div>
            <div className="p-8 rounded-3xl bg-card border border-border/50 text-center flex flex-col items-center hover:border-accent transition-colors">
              <Zap className="w-12 h-12 text-accent mb-4" />
              <h3 className="text-xl font-bold mb-4">Bespoke Options</h3>
              <p className="text-muted-foreground">Aston Martin's Q personalization division allows virtually unlimited customization of paint, leather, and materials.</p>
            </div>
            <div className="p-8 rounded-3xl bg-card border border-border/50 text-center flex flex-col items-center hover:border-accent transition-colors">
              <CheckCircle2 className="w-12 h-12 text-accent mb-4" />
              <h3 className="text-xl font-bold mb-4">AMG Partnership</h3>
              <p className="text-muted-foreground">Aston Martin's engines are co-developed with Mercedes-AMG, delivering class-leading reliability with exotic character.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: Brand Heritage & Tech */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2">
              <div className="aspect-video rounded-3xl overflow-hidden bg-muted">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/92/2018_Aston_Martin_DB11_V8_Automatic_4.0_Front.jpg/1280px-2018_Aston_Martin_DB11_V8_Automatic_4.0_Front.jpg" alt="Aston Martin Heritage" className="w-full h-full object-cover" />
              </div>
            </div>
            <div className="md:w-1/2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent text-sm font-bold mb-6">
                <Landmark className="w-4 h-4" />
                Brand Heritage
              </div>
              <h2 className="text-3xl font-black uppercase mb-6">The <span className="text-accent italic">Aston Martin</span> Legacy</h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                Founded in 1913 by Lionel Martin and Robert Bamford, Aston Martin became a byword for British grand touring excellence. The brand's James Bond association — spanning 60+ years from the DB5 — makes Aston Martin the world's most cinematic automotive brand. Today, the Valhalla hypercar and DBX707 prove Aston Martin's relevance across every segment.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: Models */}
      <section className="py-16 bg-muted/10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black uppercase mb-4">Popular Aston Martin <span className="text-accent italic">Models</span></h2>
            <p className="text-muted-foreground">Explore our most requested vehicle categories for Aston Martin.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="p-8 rounded-3xl bg-card border border-border/50 text-center hover:border-accent transition-colors">
              <h3 className="text-xl font-bold mb-4">Aston Martin SUVs</h3>
              <p className="text-muted-foreground mb-6">Spacious, capable, and commanding. The perfect choice for families and adventure seekers.</p>
              <Link to="/vehicles/suv" className="text-accent font-bold hover:underline flex items-center justify-center gap-2">Lease Specials <ArrowRight className="w-4 h-4" /></Link>
            </div>
            <div className="p-8 rounded-3xl bg-card border border-border/50 text-center hover:border-accent transition-colors">
              <h3 className="text-xl font-bold mb-4">Aston Martin Sedans</h3>
              <p className="text-muted-foreground mb-6">Sleek, efficient, and comfortable. Ideal for daily commuting and city driving.</p>
              <Link to="/vehicles/sedan" className="text-accent font-bold hover:underline flex items-center justify-center gap-2">Lease Specials <ArrowRight className="w-4 h-4" /></Link>
            </div>
            <div className="p-8 rounded-3xl bg-card border border-border/50 text-center hover:border-accent transition-colors">
              <h3 className="text-xl font-bold mb-4">Aston Martin Trucks/Crossovers</h3>
              <p className="text-muted-foreground mb-6">Versatile and robust vehicles designed for utility and everyday practicality.</p>
              <Link to="/vehicles/truck" className="text-accent font-bold hover:underline flex items-center justify-center gap-2">Lease Specials <ArrowRight className="w-4 h-4" /></Link>
            </div>
          </div>
        </div>
      </section>

      {/* Section 6: Lease Vs Buy */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-card rounded-[2.5rem] p-8 md:p-12 border border-border/50 shadow-lg text-center relative overflow-hidden">
            <div className="absolute -right-8 -top-8 text-accent/5">
              <BadgeDollarSign className="w-64 h-64" />
            </div>
            <h2 className="text-3xl font-black uppercase mb-6 relative z-10">Why Lease a Aston Martin?</h2>
            <p className="text-xl text-muted-foreground relative z-10 leading-relaxed">
              Given Aston Martin's handcrafted nature and limited production volumes, leasing is the wisest way to access this exclusive brand without exposure to bespoke depreciation curves or high-cost maintenance outside of warranty. A lease keeps you protected and in a fresh, current model every few years.
            </p>
          </div>
        </div>
      </section>

      {/* Section 7: FAQs */}
      <section className="py-16 bg-muted/10">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black uppercase mb-4">Aston Martin Leasing <span className="text-accent italic">FAQ</span></h2>
          </div>
          <Accordion type="single" collapsible className="w-full">
            
            <AccordionItem value="item-1" className="bg-card mb-4 rounded-xl px-6 border-none">
              <AccordionTrigger className="text-lg font-bold hover:no-underline hover:text-accent">
                What is the waiting time for a new Aston Martin?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-base">
                Popular configurations can have waiting periods. Capital Motor Cars works directly with authorized dealers to identify in-stock or incoming units to minimize your wait time.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-2" className="bg-card mb-4 rounded-xl px-6 border-none">
              <AccordionTrigger className="text-lg font-bold hover:no-underline hover:text-accent">
                Does Aston Martin offer a maintenance plan?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-base">
                Aston Martin complimentary scheduled maintenance is included for the first 3 years. We recommend structuring leases to align with this coverage window.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-3" className="bg-card mb-4 rounded-xl px-6 border-none">
              <AccordionTrigger className="text-lg font-bold hover:no-underline hover:text-accent">
                Can I lease an Aston Martin DBX707?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-base">
                Yes — the DBX707, the world's most powerful luxury SUV, can be structured on a lease. Contact Capital Motor Cars for personalized pricing on this exclusive vehicle.
              </AccordionContent>
            </AccordionItem>
            
          </Accordion>
        </div>
      </section>

      {/* Section 8: Process */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-black uppercase mb-4">How to Lease a <span className="text-accent italic">Aston Martin</span></h2>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { step: '1', title: 'Choose Your Model', desc: 'Select your preferred Aston Martin model and trim.' },
              { step: '2', title: 'Get a Quote', desc: 'We negotiate the lowest money factor for you.' },
              { step: '3', title: 'Credit Approval', desc: 'Fast, secure credit application process.' },
              { step: '4', title: 'Free Delivery', desc: 'Your new Aston Martin delivered to your door.' },
            ].map((item, i) => (
              <div key={i} className="p-6 rounded-2xl bg-card border border-border/50 relative overflow-hidden group hover:border-accent transition-all">
                <span className="absolute -right-4 -bottom-4 text-8xl font-black text-muted/20 group-hover:text-accent/10 transition-colors pointer-events-none">{item.step}</span>
                <h3 className="text-lg font-bold mb-2 relative z-10">{item.title}</h3>
                <p className="text-sm text-muted-foreground relative z-10">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 9: CTA Form */}
      <section className="py-16 bg-muted/10">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="glass-card-theme form-card-theme p-8 rounded-[2.5rem]">
            <h2 className="text-2xl font-black uppercase mb-6 text-center">Request a Aston Martin Quote</h2>
            <ContactForm source="Aston Martin Landing Page" />
          </div>
        </div>
      </section>
    </Layout>
  );
}
