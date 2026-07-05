import { Link } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { SEO } from '@/components/SEO';
import { JsonLd, createWebPageSchema } from '@/components/JsonLd';
import { ServiceHero } from '@/components/services/ServiceHero';
import { TrustStatsBar } from '@/components/shared/TrustStatsBar';
import { ContactForm } from '@/components/forms/ContactForm';
import { Phone, ArrowRight, ShieldCheck, CheckCircle2, Zap, Landmark, BadgeDollarSign } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

export default function ChevroletBrandPage() {
  return (
    <Layout>
      <SEO
        title="2026 Chevrolet Lease Deals NJ & NY | Zero Down Specials"
        description="Lease a 2026 Chevrolet in NJ & NY — Equinox, Silverado, Blazer, and Corvette zero down specials. American performance at broker pricing."
        seoKeywords={['2026 Chevrolet lease deals NJ', 'Chevrolet lease specials NY', 'zero down Chevrolet lease', 'Chevrolet broker NJ']}
        ogImage="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/2021_Chevrolet_Corvette_C8.jpg/1280px-2021_Chevrolet_Corvette_C8.jpg"
        canonicalPath="/brand/chevrolet"
      />
      <JsonLd data={[
        createWebPageSchema({
          name: "Chevrolet Lease Deals NJ & NY",
          description: "Affordable Chevrolet leasing broker in New Jersey offering aggressive specials.",
          url: "https://www.capitalmotorcars.com/brand/chevrolet"
        })
      ]} />

      {/* Section 1: Hero */}
      <ServiceHero
        badge="Best Value"
        title="2026 Chevrolet Lease Deals"
        highlightedTitle=""
        subtitle="Lease a 2026 Chevrolet in NJ & NY — Equinox, Silverado, Blazer, and Corvette zero down specials. American performance at broker pricing."
        heroImage="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/2021_Chevrolet_Corvette_C8.jpg/1280px-2021_Chevrolet_Corvette_C8.jpg"
        primaryAction={{ label: "View SUVs", href: "/vehicles/suv" }}
        secondaryAction={{ label: "Call Us", href: "tel:+12015095555", icon: Phone }}
      />
      
      {/* Section 2: Trust Stats */}
      <TrustStatsBar />

      {/* Section 3: Intro & Benefits */}
      <section className="py-16 bg-muted/10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-black uppercase mb-4">Find New Roads</h2>
            <p className="text-lg text-muted-foreground">Chevrolet builds America's most diverse vehicle lineup — from the Corvette supercar to the Silverado pickup and Equinox SUV. Value, performance, and American durability define every Chevrolet. Capital Motor Cars provides competitive Chevrolet lease specials throughout NJ & NY.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 rounded-3xl bg-card border border-border/50 text-center flex flex-col items-center hover:border-accent transition-colors">
              <ShieldCheck className="w-12 h-12 text-accent mb-4" />
              <h3 className="text-xl font-bold mb-4">Super Cruise™ Available</h3>
              <p className="text-muted-foreground">Chevrolet's available Super Cruise hands-free driving system provides the most advanced driver assistance available on any mainstream American vehicle.</p>
            </div>
            <div className="p-8 rounded-3xl bg-card border border-border/50 text-center flex flex-col items-center hover:border-accent transition-colors">
              <Zap className="w-12 h-12 text-accent mb-4" />
              <h3 className="text-xl font-bold mb-4">ProConnect Infotainment</h3>
              <p className="text-muted-foreground">Available 17.7" diagonal screen with built-in Google navigation, wireless Apple CarPlay, and over-the-air updates across all Chevy models.</p>
            </div>
            <div className="p-8 rounded-3xl bg-card border border-border/50 text-center flex flex-col items-center hover:border-accent transition-colors">
              <CheckCircle2 className="w-12 h-12 text-accent mb-4" />
              <h3 className="text-xl font-bold mb-4">Duramax Diesel Power</h3>
              <p className="text-muted-foreground">Available Duramax 3.0L diesel in the Silverado provides 460lb-ft of torque and 33mpg highway — outstanding efficiency for a full-size truck.</p>
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
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/2021_Chevrolet_Corvette_C8.jpg/1280px-2021_Chevrolet_Corvette_C8.jpg" alt="Chevrolet Heritage" className="w-full h-full object-cover" />
              </div>
            </div>
            <div className="md:w-1/2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent text-sm font-bold mb-6">
                <Landmark className="w-4 h-4" />
                Brand Heritage
              </div>
              <h2 className="text-3xl font-black uppercase mb-6">The <span className="text-accent italic">Chevrolet</span> Legacy</h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                Louis Chevrolet and William Durant co-founded Chevrolet in 1911 specifically to challenge Ford's Model T. The iconic Bowtie logo has become one of the world's most recognized automotive badges. Chevrolet introduced the Corvette in 1953 — America's only true sports car — and the Camaro in 1966. Today, the electric Silverado EV and Equinox EV signal Chevrolet's mainstream electrification leadership.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: Models */}
      <section className="py-16 bg-muted/10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black uppercase mb-4">Popular Chevrolet <span className="text-accent italic">Models</span></h2>
            <p className="text-muted-foreground">Explore our most requested vehicle categories for Chevrolet.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="p-8 rounded-3xl bg-card border border-border/50 text-center hover:border-accent transition-colors">
              <h3 className="text-xl font-bold mb-4">Chevrolet SUVs</h3>
              <p className="text-muted-foreground mb-6">Spacious, capable, and commanding. The perfect choice for families and adventure seekers.</p>
              <Link to="/vehicles/suv" className="text-accent font-bold hover:underline flex items-center justify-center gap-2">Lease Specials <ArrowRight className="w-4 h-4" /></Link>
            </div>
            <div className="p-8 rounded-3xl bg-card border border-border/50 text-center hover:border-accent transition-colors">
              <h3 className="text-xl font-bold mb-4">Chevrolet Sedans</h3>
              <p className="text-muted-foreground mb-6">Sleek, efficient, and comfortable. Ideal for daily commuting and city driving.</p>
              <Link to="/vehicles/sedan" className="text-accent font-bold hover:underline flex items-center justify-center gap-2">Lease Specials <ArrowRight className="w-4 h-4" /></Link>
            </div>
            <div className="p-8 rounded-3xl bg-card border border-border/50 text-center hover:border-accent transition-colors">
              <h3 className="text-xl font-bold mb-4">Chevrolet Trucks/Crossovers</h3>
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
            <h2 className="text-3xl font-black uppercase mb-6 relative z-10">Why Lease a Chevrolet?</h2>
            <p className="text-xl text-muted-foreground relative z-10 leading-relaxed">
              GM Financial provides highly competitive Chevrolet lease incentives, particularly on the Equinox EV (which qualifies for $7,500 EV credits applied to leases) and Silverado. Chevrolet's strong residual values on trucks and SUVs make leasing a financially smart choice in the current market.
            </p>
          </div>
        </div>
      </section>

      {/* Section 7: FAQs */}
      <section className="py-16 bg-muted/10">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black uppercase mb-4">Chevrolet Leasing <span className="text-accent italic">FAQ</span></h2>
          </div>
          <Accordion type="single" collapsible className="w-full">
            
            <AccordionItem value="item-1" className="bg-card mb-4 rounded-xl px-6 border-none">
              <AccordionTrigger className="text-lg font-bold hover:no-underline hover:text-accent">
                Is the Chevy Equinox EV a good lease deal?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-base">
                The Equinox EV is exceptional lease value — starting around $34,995, qualifying for a $7,500 EV lease credit, and delivering 300 miles of range. It's our most requested EV lease in NJ.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-2" className="bg-card mb-4 rounded-xl px-6 border-none">
              <AccordionTrigger className="text-lg font-bold hover:no-underline hover:text-accent">
                What makes the Chevy Corvette C8 special?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-base">
                The C8 moved the Corvette to a mid-engine layout for the first time — enabling 0-60mph in 2.9 seconds from a naturally aspirated V8, at a price that undercuts most European sports cars by $50,000.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-3" className="bg-card mb-4 rounded-xl px-6 border-none">
              <AccordionTrigger className="text-lg font-bold hover:no-underline hover:text-accent">
                What Chevy models are best for leasing in NJ?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-base">
                The Equinox EV, Trax, and Blazer offer outstanding lease values in NJ. The Silverado truck also frequently benefits from strong GM Financial lease support.
              </AccordionContent>
            </AccordionItem>
            
          </Accordion>
        </div>
      </section>

      {/* Section 8: Process */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-black uppercase mb-4">How to Lease a <span className="text-accent italic">Chevrolet</span></h2>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { step: '1', title: 'Choose Your Model', desc: 'Select your preferred Chevrolet model and trim.' },
              { step: '2', title: 'Get a Quote', desc: 'We negotiate the lowest money factor for you.' },
              { step: '3', title: 'Credit Approval', desc: 'Fast, secure credit application process.' },
              { step: '4', title: 'Free Delivery', desc: 'Your new Chevrolet delivered to your door.' },
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
            <h2 className="text-2xl font-black uppercase mb-6 text-center">Request a Chevrolet Quote</h2>
            <ContactForm source="Chevrolet Landing Page" />
          </div>
        </div>
      </section>
    </Layout>
  );
}
