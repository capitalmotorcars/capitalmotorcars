import { Link } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { SEO } from '@/components/SEO';
import { JsonLd, createWebPageSchema } from '@/components/JsonLd';
import { ServiceHero } from '@/components/services/ServiceHero';
import { TrustStatsBar } from '@/components/shared/TrustStatsBar';
import { ContactForm } from '@/components/forms/ContactForm';
import { Phone, ArrowRight, ShieldCheck, CheckCircle2, Zap, Landmark, BadgeDollarSign } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

export default function LamborghiniBrandPage() {
  return (
    <Layout>
      <SEO
        title="2026 Lamborghini Lease Deals NJ & NY | Zero Down Specials"
        description="Lease a 2026 Lamborghini in NJ & NY — Urus, Huracán, and Revuelto specials. Italian supercar performance at broker pricing."
        seoKeywords={['2026 Lamborghini lease deals NJ', 'Lamborghini lease specials NY', 'zero down Lamborghini lease', 'Lamborghini broker NJ']}
        ogImage="https://upload.wikimedia.org/wikipedia/commons/thumb/e/ed/Lamborghini_Aventador_S_%2844554%29.jpg/1280px-Lamborghini_Aventador_S_%2844554%29.jpg"
        canonicalPath="/brand/lamborghini"
      />
      <JsonLd data={[
        createWebPageSchema({
          name: "Lamborghini Lease Deals NJ & NY",
          description: "Affordable Lamborghini leasing broker in New Jersey offering aggressive specials.",
          url: "https://www.capitalmotorcars.com/brand/lamborghini"
        })
      ]} />

      {/* Section 1: Hero */}
      <ServiceHero
        badge="Best Value"
        title="2026 Lamborghini Lease Deals"
        highlightedTitle=""
        subtitle="Lease a 2026 Lamborghini in NJ & NY — Urus, Huracán, and Revuelto specials. Italian supercar performance at broker pricing."
        heroImage="https://upload.wikimedia.org/wikipedia/commons/thumb/e/ed/Lamborghini_Aventador_S_%2844554%29.jpg/1280px-Lamborghini_Aventador_S_%2844554%29.jpg"
        primaryAction={{ label: "View SUVs", href: "/vehicles/suv" }}
        secondaryAction={{ label: "Call Us", href: "tel:+12015095555", icon: Phone }}
      />
      
      {/* Section 2: Trust Stats */}
      <TrustStatsBar />

      {/* Section 3: Intro & Benefits */}
      <section className="py-16 bg-muted/10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-black uppercase mb-4">Expect the Unexpected</h2>
            <p className="text-lg text-muted-foreground">Lamborghini builds the world's most dramatic automobiles. The Urus Super SUV has made the brand accessible for daily driving, while the Huracán and Revuelto remain pinnacles of Italian supercar engineering. Capital Motor Cars provides exclusive access to these extraordinary machines.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 rounded-3xl bg-card border border-border/50 text-center flex flex-col items-center hover:border-accent transition-colors">
              <ShieldCheck className="w-12 h-12 text-accent mb-4" />
              <h3 className="text-xl font-bold mb-4">Naturally Aspirated V10/V12</h3>
              <p className="text-muted-foreground">Lamborghini's naturally aspirated engines deliver a raw, unfiltered soundtrack and power delivery that turbocharged rivals simply cannot replicate.</p>
            </div>
            <div className="p-8 rounded-3xl bg-card border border-border/50 text-center flex flex-col items-center hover:border-accent transition-colors">
              <Zap className="w-12 h-12 text-accent mb-4" />
              <h3 className="text-xl font-bold mb-4">Carbon Fiber Chassis</h3>
              <p className="text-muted-foreground">Lamborghini pioneered carbon fiber monocoque construction in production cars — creating chassis that are simultaneously lighter and stronger than steel or aluminum.</p>
            </div>
            <div className="p-8 rounded-3xl bg-card border border-border/50 text-center flex flex-col items-center hover:border-accent transition-colors">
              <CheckCircle2 className="w-12 h-12 text-accent mb-4" />
              <h3 className="text-xl font-bold mb-4">Scissor Doors</h3>
              <p className="text-muted-foreground">Lamborghini's iconic scissor door design — introduced on the Countach in 1974 — remains a signature that defines the brand's theatrical character.</p>
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
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/ed/Lamborghini_Aventador_S_%2844554%29.jpg/1280px-Lamborghini_Aventador_S_%2844554%29.jpg" alt="Lamborghini Heritage" className="w-full h-full object-cover" />
              </div>
            </div>
            <div className="md:w-1/2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent text-sm font-bold mb-6">
                <Landmark className="w-4 h-4" />
                Brand Heritage
              </div>
              <h2 className="text-3xl font-black uppercase mb-6">The <span className="text-accent italic">Lamborghini</span> Legacy</h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                Ferruccio Lamborghini founded the company in 1963 after a legendary dispute with Enzo Ferrari over clutch quality. His response was to build a better sports car — the 350 GT. The Miura of 1966 invented the mid-engine supercar layout that Ferrari and Porsche would later copy. Today, the Lamborghini Revuelto hybrid V12 produces 1,001hp, continuing the brand's tradition of automotive extremism.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: Models */}
      <section className="py-16 bg-muted/10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black uppercase mb-4">Popular Lamborghini <span className="text-accent italic">Models</span></h2>
            <p className="text-muted-foreground">Explore our most requested vehicle categories for Lamborghini.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="p-8 rounded-3xl bg-card border border-border/50 text-center hover:border-accent transition-colors">
              <h3 className="text-xl font-bold mb-4">Lamborghini SUVs</h3>
              <p className="text-muted-foreground mb-6">Spacious, capable, and commanding. The perfect choice for families and adventure seekers.</p>
              <Link to="/vehicles/suv" className="text-accent font-bold hover:underline flex items-center justify-center gap-2">Lease Specials <ArrowRight className="w-4 h-4" /></Link>
            </div>
            <div className="p-8 rounded-3xl bg-card border border-border/50 text-center hover:border-accent transition-colors">
              <h3 className="text-xl font-bold mb-4">Lamborghini Sedans</h3>
              <p className="text-muted-foreground mb-6">Sleek, efficient, and comfortable. Ideal for daily commuting and city driving.</p>
              <Link to="/vehicles/sedan" className="text-accent font-bold hover:underline flex items-center justify-center gap-2">Lease Specials <ArrowRight className="w-4 h-4" /></Link>
            </div>
            <div className="p-8 rounded-3xl bg-card border border-border/50 text-center hover:border-accent transition-colors">
              <h3 className="text-xl font-bold mb-4">Lamborghini Trucks/Crossovers</h3>
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
            <h2 className="text-3xl font-black uppercase mb-6 relative z-10">Why Lease a Lamborghini?</h2>
            <p className="text-xl text-muted-foreground relative z-10 leading-relaxed">
              Lamborghinis depreciate significantly — the Urus loses 35-40% in 3 years, while the Huracán drops 45-50%. Leasing captures the most exciting ownership window (0-36 months) with full factory warranty, while protecting you from the steepest depreciation cliff. Our broker network secures some of the most competitive structures available on these exotic vehicles.
            </p>
          </div>
        </div>
      </section>

      {/* Section 7: FAQs */}
      <section className="py-16 bg-muted/10">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black uppercase mb-4">Lamborghini Leasing <span className="text-accent italic">FAQ</span></h2>
          </div>
          <Accordion type="single" collapsible className="w-full">
            
            <AccordionItem value="item-1" className="bg-card mb-4 rounded-xl px-6 border-none">
              <AccordionTrigger className="text-lg font-bold hover:no-underline hover:text-accent">
                Can the Lamborghini Urus be a daily driver in NJ?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-base">
                Absolutely. The Urus is designed for daily usability — it fits in standard parking garages, offers 600 miles of range per tank, seats 5, and handles NJ winters with its available rear-wheel steering and all-terrain mode.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-2" className="bg-card mb-4 rounded-xl px-6 border-none">
              <AccordionTrigger className="text-lg font-bold hover:no-underline hover:text-accent">
                What is the monthly payment to lease a Lamborghini?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-base">
                Urus leases typically start around $3,500-$5,000/month depending on configuration and term. Huracán leases vary similarly. Contact us for a precise personalized quote.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-3" className="bg-card mb-4 rounded-xl px-6 border-none">
              <AccordionTrigger className="text-lg font-bold hover:no-underline hover:text-accent">
                How fast is the Lamborghini Huracán?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-base">
                The Huracán Tecnica reaches 0-62mph in 3.2 seconds with a 202mph top speed — powered by a 5.2L naturally aspirated V10 producing 631hp.
              </AccordionContent>
            </AccordionItem>
            
          </Accordion>
        </div>
      </section>

      {/* Section 8: Process */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-black uppercase mb-4">How to Lease a <span className="text-accent italic">Lamborghini</span></h2>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { step: '1', title: 'Choose Your Model', desc: 'Select your preferred Lamborghini model and trim.' },
              { step: '2', title: 'Get a Quote', desc: 'We negotiate the lowest money factor for you.' },
              { step: '3', title: 'Credit Approval', desc: 'Fast, secure credit application process.' },
              { step: '4', title: 'Free Delivery', desc: 'Your new Lamborghini delivered to your door.' },
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
            <h2 className="text-2xl font-black uppercase mb-6 text-center">Request a Lamborghini Quote</h2>
            <ContactForm source="Lamborghini Landing Page" />
          </div>
        </div>
      </section>
    </Layout>
  );
}
