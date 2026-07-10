import { Link } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { SEO } from '@/components/SEO';
import { JsonLd, createWebPageSchema } from '@/components/JsonLd';
import { ServiceHero } from '@/components/services/ServiceHero';
import { TrustStatsBar } from '@/components/shared/TrustStatsBar';
import { ContactForm } from '@/components/forms/ContactForm';
import { Phone, ArrowRight, ShieldCheck, CheckCircle2, Zap, Landmark, BadgeDollarSign } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

export default function InfinitiBrandPage() {
  return (
    <Layout>
      <SEO
        title="2026 Infiniti Lease Deals NJ & NY | Zero Down Specials"
        description="Lease a 2026 Infiniti in NJ & NY - QX50, QX60, and Q50 zero down specials. Japanese luxury performance at broker pricing."
        seoKeywords={['2026 Infiniti lease deals NJ', 'Infiniti lease specials NY', 'zero down Infiniti lease', 'Infiniti broker NJ']}
        ogImage="https://images.unsplash.com/photo-1503376712394-6f921ea6247d?auto=format&fit=crop&w=1600&q=80"
        canonicalPath="/brand/infiniti"
      />
      <JsonLd data={[
        createWebPageSchema({
          name: "Infiniti Lease Deals NJ & NY",
          description: "Affordable Infiniti leasing broker in New Jersey offering aggressive specials.",
          url: "https://www.capitalmotorcars.com/brand/infiniti"
        })
      ]} />

      {/* Section 1: Hero */}
      <ServiceHero
        badge="Best Value"
        title="2026 Infiniti Lease Deals"
        highlightedTitle=""
        subtitle="Lease a 2026 Infiniti in NJ & NY - QX50, QX60, and Q50 zero down specials. Japanese luxury performance at broker pricing."
        heroImage="https://images.unsplash.com/photo-1503376712394-6f921ea6247d?auto=format&fit=crop&w=1600&q=80"
        primaryAction={{ label: "View SUVs", href: "/vehicles/suv" }}
        secondaryAction={{ label: "Call Us", href: "tel:+12015095555", icon: Phone }}
      />
      
      {/* Section 2: Trust Stats */}
      <TrustStatsBar />

      {/* Section 3: Intro & Benefits */}
      <section className="py-16 bg-muted/10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-black uppercase mb-4">Empowering Your Performance</h2>
            <p className="text-lg text-muted-foreground">Infiniti delivers a unique blend of Japanese craftsmanship and performance-inspired luxury. The QX50 with its revolutionary VC-Turbo engine, and the QX60 three-row SUV, offer exceptional value in the luxury segment - particularly through Capital Motor Cars' broker pricing in NJ & NY.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 rounded-3xl bg-card border border-border/50 text-center flex flex-col items-center hover:border-accent transition-colors">
              <ShieldCheck className="w-12 h-12 text-accent mb-4" />
              <h3 className="text-xl font-bold mb-4">VC-Turbo Engine</h3>
              <p className="text-muted-foreground">Infiniti's Variable Compression Turbo engine is the world's first in production - continuously optimizing compression ratio for power or efficiency as you drive.</p>
            </div>
            <div className="p-8 rounded-3xl bg-card border border-border/50 text-center flex flex-col items-center hover:border-accent transition-colors">
              <Zap className="w-12 h-12 text-accent mb-4" />
              <h3 className="text-xl font-bold mb-4">ProPILOT Assist</h3>
              <p className="text-muted-foreground">Infiniti's steering-assist cruise control maintains lane center and safe following distance automatically on highways.</p>
            </div>
            <div className="p-8 rounded-3xl bg-card border border-border/50 text-center flex flex-col items-center hover:border-accent transition-colors">
              <CheckCircle2 className="w-12 h-12 text-accent mb-4" />
              <h3 className="text-xl font-bold mb-4">Nissan Reliability</h3>
              <p className="text-muted-foreground">Built on Nissan's proven engineering foundation, Infiniti vehicles deliver luxury refinement with exceptional long-term reliability.</p>
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
                <img src="https://images.unsplash.com/photo-1503376712394-6f921ea6247d?auto=format&fit=crop&w=1600&q=80" alt="Infiniti Heritage" className="w-full h-full object-cover" />
              </div>
            </div>
            <div className="md:w-1/2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent text-sm font-bold mb-6">
                <Landmark className="w-4 h-4" />
                Brand Heritage
              </div>
              <h2 className="text-3xl font-black uppercase mb-6">The <span className="text-accent italic">Infiniti</span> Legacy</h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                Launched in 1989 alongside Lexus, Infiniti was Nissan's answer to the Japanese luxury invasion. The original Q45 was a bold technological statement with active suspension and no traditional grille. Today, Infiniti's QX50 with its world-first Variable Compression Turbo engine demonstrates the brand's continued commitment to genuine engineering innovation rather than mere badge engineering.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: Models */}
      <section className="py-16 bg-muted/10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black uppercase mb-4">Popular Infiniti <span className="text-accent italic">Models</span></h2>
            <p className="text-muted-foreground">Explore our most requested vehicle categories for Infiniti.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="p-8 rounded-3xl bg-card border border-border/50 text-center hover:border-accent transition-colors">
              <h3 className="text-xl font-bold mb-4">Infiniti SUVs</h3>
              <p className="text-muted-foreground mb-6">Spacious, capable, and commanding. The perfect choice for families and adventure seekers.</p>
              <Link to="/vehicles/suv" className="text-accent font-bold hover:underline flex items-center justify-center gap-2">Lease Specials <ArrowRight className="w-4 h-4" /></Link>
            </div>
            <div className="p-8 rounded-3xl bg-card border border-border/50 text-center hover:border-accent transition-colors">
              <h3 className="text-xl font-bold mb-4">Infiniti Sedans</h3>
              <p className="text-muted-foreground mb-6">Sleek, efficient, and comfortable. Ideal for daily commuting and city driving.</p>
              <Link to="/vehicles/sedan" className="text-accent font-bold hover:underline flex items-center justify-center gap-2">Lease Specials <ArrowRight className="w-4 h-4" /></Link>
            </div>
            <div className="p-8 rounded-3xl bg-card border border-border/50 text-center hover:border-accent transition-colors">
              <h3 className="text-xl font-bold mb-4">Infiniti Trucks/Crossovers</h3>
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
            <h2 className="text-3xl font-black uppercase mb-6 relative z-10">Why Lease a Infiniti?</h2>
            <p className="text-xl text-muted-foreground relative z-10 leading-relaxed">
              Infiniti offers some of the most aggressive lease incentives in the luxury segment - Nissan Motor Acceptance Corporation frequently provides sub-prime money factors and high residual values on QX50 and QX60 models, making the monthly payment surprisingly competitive against mainstream SUVs while offering genuine luxury features.
            </p>
          </div>
        </div>
      </section>

      {/* Section 7: FAQs */}
      <section className="py-16 bg-muted/10">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black uppercase mb-4">Infiniti Leasing <span className="text-accent italic">FAQ</span></h2>
          </div>
          <Accordion type="single" collapsible className="w-full">
            
            <AccordionItem value="item-1" className="bg-card mb-4 rounded-xl px-6 border-none">
              <AccordionTrigger className="text-lg font-bold hover:no-underline hover:text-accent">
                How does the Infiniti QX50 VC-Turbo engine work?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-base">
                The VC-Turbo varies its compression ratio between 8:1 (high power) and 14:1 (maximum efficiency) using a patented multi-link mechanism - delivering both sports car power and hybrid-like fuel economy.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-2" className="bg-card mb-4 rounded-xl px-6 border-none">
              <AccordionTrigger className="text-lg font-bold hover:no-underline hover:text-accent">
                Is the Infiniti QX60 good for NJ families?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-base">
                The QX60 offers 3-row seating, a spacious 82.8 cubic feet of cargo space, and ProPILOT Assist for stress-free NJ highway commuting - making it one of our most popular family lease options.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-3" className="bg-card mb-4 rounded-xl px-6 border-none">
              <AccordionTrigger className="text-lg font-bold hover:no-underline hover:text-accent">
                Can I get a zero down Infiniti lease?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-base">
                Yes! Infiniti's factory incentives frequently enable zero-drive-off leases on the QX50. Contact Capital Motor Cars for current month's specials.
              </AccordionContent>
            </AccordionItem>
            
          </Accordion>
        </div>
      </section>

      {/* Section 8: Process */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-black uppercase mb-4">How to Lease a <span className="text-accent italic">Infiniti</span></h2>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { step: '1', title: 'Choose Your Model', desc: 'Select your preferred Infiniti model and trim.' },
              { step: '2', title: 'Get a Quote', desc: 'We negotiate the lowest money factor for you.' },
              { step: '3', title: 'Credit Approval', desc: 'Fast, secure credit application process.' },
              { step: '4', title: 'Free Delivery', desc: 'Your new Infiniti delivered to your door.' },
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
            <h2 className="text-2xl font-black uppercase mb-6 text-center">Request a Infiniti Quote</h2>
            <ContactForm source="Infiniti Landing Page" />
          </div>
        </div>
      </section>
    </Layout>
  );
}
