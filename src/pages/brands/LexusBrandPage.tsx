import { Link } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { SEO } from '@/components/SEO';
import { JsonLd, createWebPageSchema } from '@/components/JsonLd';
import { ServiceHero } from '@/components/services/ServiceHero';
import { TrustStatsBar } from '@/components/shared/TrustStatsBar';
import { ContactForm } from '@/components/forms/ContactForm';
import { Phone, ArrowRight, ShieldCheck, CheckCircle2, Zap, Landmark, BadgeDollarSign } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

export default function LexusBrandPage() {
  return (
    <Layout>
      <SEO
        title="2026 Lexus Lease Deals NJ & NY | Zero Down Specials"
        description="Lease a 2026 Lexus in NJ & NY - zero down specials on the NX, RX, ES, and more. Premium Japanese luxury at broker pricing."
        seoKeywords={['2026 Lexus lease deals NJ', 'Lexus lease specials NY', 'zero down Lexus lease', 'Lexus broker NJ']}
        ogImage="https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/2023_Lexus_LC500_in_Atomic_Silver%2C_front_left.jpg/1280px-2023_Lexus_LC500_in_Atomic_Silver%2C_front_left.jpg"
        canonicalPath="/brand/lexus"
      />
      <JsonLd data={[
        createWebPageSchema({
          name: "Lexus Lease Deals NJ & NY",
          description: "Affordable Lexus leasing broker in New Jersey offering aggressive specials.",
          url: "https://www.capitalmotorcars.com/brand/lexus"
        })
      ]} />

      {/* Section 1: Hero */}
      <ServiceHero
        badge="Best Value"
        title="2026 Lexus Lease Deals"
        highlightedTitle=""
        subtitle="Lease a 2026 Lexus in NJ & NY - zero down specials on the NX, RX, ES, and more. Premium Japanese luxury at broker pricing."
        heroImage="https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/2023_Lexus_LC500_in_Atomic_Silver%2C_front_left.jpg/1280px-2023_Lexus_LC500_in_Atomic_Silver%2C_front_left.jpg"
        primaryAction={{ label: "View SUVs", href: "/vehicles/suv" }}
        secondaryAction={{ label: "Call Us", href: "tel:+12015095555", icon: Phone }}
      />
      
      {/* Section 2: Trust Stats */}
      <TrustStatsBar />

      {/* Section 3: Intro & Benefits */}
      <section className="py-16 bg-muted/10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-black uppercase mb-4">The Pursuit of Perfection</h2>
            <p className="text-lg text-muted-foreground">Lexus redefines luxury with obsessive attention to detail, legendary reliability, and serene cabin refinement. Discover why thousands of NJ & NY drivers choose Lexus - and why leasing is the smartest way to drive one.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 rounded-3xl bg-card border border-border/50 text-center flex flex-col items-center hover:border-accent transition-colors">
              <ShieldCheck className="w-12 h-12 text-accent mb-4" />
              <h3 className="text-xl font-bold mb-4">Legendary Reliability</h3>
              <p className="text-muted-foreground">Lexus consistently tops JD Power reliability rankings, meaning fewer headaches and lower ownership costs throughout your lease.</p>
            </div>
            <div className="p-8 rounded-3xl bg-card border border-border/50 text-center flex flex-col items-center hover:border-accent transition-colors">
              <Zap className="w-12 h-12 text-accent mb-4" />
              <h3 className="text-xl font-bold mb-4">Takumi Craftsmanship</h3>
              <p className="text-muted-foreground">Every Lexus is assembled by Takumi master craftsmen who spend years perfecting hand-finishing techniques found nowhere else.</p>
            </div>
            <div className="p-8 rounded-3xl bg-card border border-border/50 text-center flex flex-col items-center hover:border-accent transition-colors">
              <CheckCircle2 className="w-12 h-12 text-accent mb-4" />
              <h3 className="text-xl font-bold mb-4">Lexus Safety System+</h3>
              <p className="text-muted-foreground">Standard suite of Pre-Collision System, Lane Departure Alert, and Radar Cruise Control keeps you safe on NJ highways.</p>
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
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/2023_Lexus_LC500_in_Atomic_Silver%2C_front_left.jpg/1280px-2023_Lexus_LC500_in_Atomic_Silver%2C_front_left.jpg" alt="Lexus Heritage" className="w-full h-full object-cover" />
              </div>
            </div>
            <div className="md:w-1/2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent text-sm font-bold mb-6">
                <Landmark className="w-4 h-4" />
                Brand Heritage
              </div>
              <h2 className="text-3xl font-black uppercase mb-6">The <span className="text-accent italic">Lexus</span> Legacy</h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                Launched in 1989 with the revolutionary LS 400, Lexus shocked the automotive world by offering S-Class levels of refinement and reliability at a lower price point. Developed in complete secrecy over 6 years, the LS 400 passed 450 quality tests - more than any car before it. Today, Lexus's F Sport performance line and electrified RX and NX SUVs continue that tradition of quiet engineering excellence.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: Models */}
      <section className="py-16 bg-muted/10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black uppercase mb-4">Popular Lexus <span className="text-accent italic">Models</span></h2>
            <p className="text-muted-foreground">Explore our most requested vehicle categories for Lexus.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="p-8 rounded-3xl bg-card border border-border/50 text-center hover:border-accent transition-colors">
              <h3 className="text-xl font-bold mb-4">Lexus SUVs</h3>
              <p className="text-muted-foreground mb-6">Spacious, capable, and commanding. The perfect choice for families and adventure seekers.</p>
              <Link to="/vehicles/suv" className="text-accent font-bold hover:underline flex items-center justify-center gap-2">Lease Specials <ArrowRight className="w-4 h-4" /></Link>
            </div>
            <div className="p-8 rounded-3xl bg-card border border-border/50 text-center hover:border-accent transition-colors">
              <h3 className="text-xl font-bold mb-4">Lexus Sedans</h3>
              <p className="text-muted-foreground mb-6">Sleek, efficient, and comfortable. Ideal for daily commuting and city driving.</p>
              <Link to="/vehicles/sedan" className="text-accent font-bold hover:underline flex items-center justify-center gap-2">Lease Specials <ArrowRight className="w-4 h-4" /></Link>
            </div>
            <div className="p-8 rounded-3xl bg-card border border-border/50 text-center hover:border-accent transition-colors">
              <h3 className="text-xl font-bold mb-4">Lexus Trucks/Crossovers</h3>
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
            <h2 className="text-3xl font-black uppercase mb-6 relative z-10">Why Lease a Lexus?</h2>
            <p className="text-xl text-muted-foreground relative z-10 leading-relaxed">
              Lexus vehicles hold their value exceptionally well, but leasing still provides a substantial advantage - you benefit from Lexus's premium residual values to lower your monthly payment, while Toyota Financial Services backs each lease with competitive money factors. You also never worry about out-of-warranty repairs.
            </p>
          </div>
        </div>
      </section>

      {/* Section 7: FAQs */}
      <section className="py-16 bg-muted/10">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black uppercase mb-4">Lexus Leasing <span className="text-accent italic">FAQ</span></h2>
          </div>
          <Accordion type="single" collapsible className="w-full">
            
            <AccordionItem value="item-1" className="bg-card mb-4 rounded-xl px-6 border-none">
              <AccordionTrigger className="text-lg font-bold hover:no-underline hover:text-accent">
                Does Lexus offer a complimentary maintenance plan with leases?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-base">
                Yes, Lexus Complimentary Maintenance covers all factory-scheduled maintenance for the first 2 years or 25,000 miles, including oil changes and tire rotations.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-2" className="bg-card mb-4 rounded-xl px-6 border-none">
              <AccordionTrigger className="text-lg font-bold hover:no-underline hover:text-accent">
                What Lexus SUV models are most popular for leasing?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-base">
                The Lexus NX and RX are our most requested lease models in NJ & NY, offering the perfect balance of luxury features, fuel efficiency, and competitive monthly payments.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-3" className="bg-card mb-4 rounded-xl px-6 border-none">
              <AccordionTrigger className="text-lg font-bold hover:no-underline hover:text-accent">
                Can I lease a Lexus with bad credit?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-base">
                Toyota Financial Services has flexible approval programs. Contact Capital Motor Cars to review your situation privately - we work with various credit profiles.
              </AccordionContent>
            </AccordionItem>
            
          </Accordion>
        </div>
      </section>

      {/* Section 8: Process */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-black uppercase mb-4">How to Lease a <span className="text-accent italic">Lexus</span></h2>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { step: '1', title: 'Choose Your Model', desc: 'Select your preferred Lexus model and trim.' },
              { step: '2', title: 'Get a Quote', desc: 'We negotiate the lowest money factor for you.' },
              { step: '3', title: 'Credit Approval', desc: 'Fast, secure credit application process.' },
              { step: '4', title: 'Free Delivery', desc: 'Your new Lexus delivered to your door.' },
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
            <h2 className="text-2xl font-black uppercase mb-6 text-center">Request a Lexus Quote</h2>
            <ContactForm source="Lexus Landing Page" />
          </div>
        </div>
      </section>
    </Layout>
  );
}
