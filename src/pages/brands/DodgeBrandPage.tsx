import { Link } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { SEO } from '@/components/SEO';
import { JsonLd, createWebPageSchema } from '@/components/JsonLd';
import { ServiceHero } from '@/components/services/ServiceHero';
import { TrustStatsBar } from '@/components/shared/TrustStatsBar';
import { ContactForm } from '@/components/forms/ContactForm';
import { Phone, ArrowRight, ShieldCheck, CheckCircle2, Zap, Landmark, BadgeDollarSign } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

export default function DodgeBrandPage() {
  return (
    <Layout>
      <SEO
        title="2026 Dodge Lease Deals NJ & NY | Zero Down Specials"
        description="Lease a 2026 Dodge in NJ & NY - Charger Daytona EV, Durango, and Hornet zero down specials. American muscle performance at broker pricing."
        seoKeywords={['2026 Dodge lease deals NJ', 'Dodge lease specials NY', 'zero down Dodge lease', 'Dodge broker NJ']}
        ogImage="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Dodge_Challenger_SRT8_%282015%29_Hirschaid-20220709-RM-120221_%28cropped%29.jpg/1280px-Dodge_Challenger_SRT8_%282015%29_Hirschaid-20220709-RM-120221_%28cropped%29.jpg"
        canonicalPath="/brand/dodge"
      />
      <JsonLd data={[
        createWebPageSchema({
          name: "Dodge Lease Deals NJ & NY",
          description: "Affordable Dodge leasing broker in New Jersey offering aggressive specials.",
          url: "https://www.capitalmotorcars.com/brand/dodge"
        })
      ]} />

      {/* Section 1: Hero */}
      <ServiceHero
        badge="Best Value"
        title="2026 Dodge Lease Deals"
        highlightedTitle=""
        subtitle="Lease a 2026 Dodge in NJ & NY - Charger Daytona EV, Durango, and Hornet zero down specials. American muscle performance at broker pricing."
        heroImage="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Dodge_Challenger_SRT8_%282015%29_Hirschaid-20220709-RM-120221_%28cropped%29.jpg/1280px-Dodge_Challenger_SRT8_%282015%29_Hirschaid-20220709-RM-120221_%28cropped%29.jpg"
        primaryAction={{ label: "View SUVs", href: "/vehicles/suv" }}
        secondaryAction={{ label: "Call Us", href: "tel:+12015095555", icon: Phone }}
      />
      
      {/* Section 2: Trust Stats */}
      <TrustStatsBar />

      {/* Section 3: Intro & Benefits */}
      <section className="py-16 bg-muted/10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-black uppercase mb-4">Domestic. Not Domesticated.</h2>
            <p className="text-lg text-muted-foreground">Dodge builds unapologetically powerful, driver-focused American muscle cars. The Charger Daytona EV redefines what an electric muscle car can be, while the Durango SUV provides three-row capability with genuine performance credentials. Capital Motor Cars provides Dodge lease specials throughout NJ & NY.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 rounded-3xl bg-card border border-border/50 text-center flex flex-col items-center hover:border-accent transition-colors">
              <ShieldCheck className="w-12 h-12 text-accent mb-4" />
              <h3 className="text-xl font-bold mb-4">Fratzonic Exhaust System</h3>
              <p className="text-muted-foreground">The Charger Daytona EV features a patented amplified exhaust system that generates a genuine muscle car sound - even from an electric motor.</p>
            </div>
            <div className="p-8 rounded-3xl bg-card border border-border/50 text-center flex flex-col items-center hover:border-accent transition-colors">
              <Zap className="w-12 h-12 text-accent mb-4" />
              <h3 className="text-xl font-bold mb-4">Direct Connection</h3>
              <p className="text-muted-foreground">Dodge's Direct Connection performance parts program allows over-the-air power upgrades purchased digitally - unlock more horsepower as needed.</p>
            </div>
            <div className="p-8 rounded-3xl bg-card border border-border/50 text-center flex flex-col items-center hover:border-accent transition-colors">
              <CheckCircle2 className="w-12 h-12 text-accent mb-4" />
              <h3 className="text-xl font-bold mb-4">Supercar Performance</h3>
              <p className="text-muted-foreground">The Charger Daytona SRT delivers 670hp and reaches 0-60mph in under 3.3 seconds - genuine supercar performance in an EV muscle car body.</p>
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
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Dodge_Challenger_SRT8_%282015%29_Hirschaid-20220709-RM-120221_%28cropped%29.jpg/1280px-Dodge_Challenger_SRT8_%282015%29_Hirschaid-20220709-RM-120221_%28cropped%29.jpg" alt="Dodge Heritage" className="w-full h-full object-cover" />
              </div>
            </div>
            <div className="md:w-1/2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent text-sm font-bold mb-6">
                <Landmark className="w-4 h-4" />
                Brand Heritage
              </div>
              <h2 className="text-3xl font-black uppercase mb-6">The <span className="text-accent italic">Dodge</span> Legacy</h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                Dodge was founded in 1900 by brothers Horace and John Dodge as a supplier to Ford before launching their own vehicles in 1914. The Dodge Brothers became major Ford shareholders, funding the company that would eventually become Dodge. Dodge's most legendary moment was the L.A. Police Department's adoption of the Challenger - creating the pony car. The Charger and Challenger Hellcat 797hp monsters kept HEMI V8 culture alive into the 2020s.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: Models */}
      <section className="py-16 bg-muted/10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black uppercase mb-4">Popular Dodge <span className="text-accent italic">Models</span></h2>
            <p className="text-muted-foreground">Explore our most requested vehicle categories for Dodge.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="p-8 rounded-3xl bg-card border border-border/50 text-center hover:border-accent transition-colors">
              <h3 className="text-xl font-bold mb-4">Dodge SUVs</h3>
              <p className="text-muted-foreground mb-6">Spacious, capable, and commanding. The perfect choice for families and adventure seekers.</p>
              <Link to="/vehicles/suv" className="text-accent font-bold hover:underline flex items-center justify-center gap-2">Lease Specials <ArrowRight className="w-4 h-4" /></Link>
            </div>
            <div className="p-8 rounded-3xl bg-card border border-border/50 text-center hover:border-accent transition-colors">
              <h3 className="text-xl font-bold mb-4">Dodge Sedans</h3>
              <p className="text-muted-foreground mb-6">Sleek, efficient, and comfortable. Ideal for daily commuting and city driving.</p>
              <Link to="/vehicles/sedan" className="text-accent font-bold hover:underline flex items-center justify-center gap-2">Lease Specials <ArrowRight className="w-4 h-4" /></Link>
            </div>
            <div className="p-8 rounded-3xl bg-card border border-border/50 text-center hover:border-accent transition-colors">
              <h3 className="text-xl font-bold mb-4">Dodge Trucks/Crossovers</h3>
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
            <h2 className="text-3xl font-black uppercase mb-6 relative z-10">Why Lease a Dodge?</h2>
            <p className="text-xl text-muted-foreground relative z-10 leading-relaxed">
              Dodge's transition to electric with the Charger Daytona means lessees will be among the first to experience next-generation American muscle technology. The EV Charger qualifies for EV lease credits through Chrysler Capital, making entry into America's most iconic muscle car brand financially accessible.
            </p>
          </div>
        </div>
      </section>

      {/* Section 7: FAQs */}
      <section className="py-16 bg-muted/10">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black uppercase mb-4">Dodge Leasing <span className="text-accent italic">FAQ</span></h2>
          </div>
          <Accordion type="single" collapsible className="w-full">
            
            <AccordionItem value="item-1" className="bg-card mb-4 rounded-xl px-6 border-none">
              <AccordionTrigger className="text-lg font-bold hover:no-underline hover:text-accent">
                Is the new Dodge Charger Daytona really an EV?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-base">
                Yes - but Dodge designed it specifically to feel like a muscle car: it has a patented sound system, a physical gear selector called the eRupt selector, and available 670hp. It's the world's first electric muscle car.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-2" className="bg-card mb-4 rounded-xl px-6 border-none">
              <AccordionTrigger className="text-lg font-bold hover:no-underline hover:text-accent">
                Can I get a Dodge Durango R/T on a lease?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-base">
                Absolutely - the Durango R/T with 360hp V8 and available 7-seat, tow-rated configuration is an excellent NJ family performance SUV with competitive Chrysler Capital lease rates.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-3" className="bg-card mb-4 rounded-xl px-6 border-none">
              <AccordionTrigger className="text-lg font-bold hover:no-underline hover:text-accent">
                Does the Dodge Charger Daytona qualify for EV credits?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-base">
                The Charger Daytona EV qualifies for applicable federal EV lease credits. Contact Capital Motor Cars to confirm current eligibility and incorporate savings into your lease payment.
              </AccordionContent>
            </AccordionItem>
            
          </Accordion>
        </div>
      </section>

      {/* Section 8: Process */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-black uppercase mb-4">How to Lease a <span className="text-accent italic">Dodge</span></h2>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { step: '1', title: 'Choose Your Model', desc: 'Select your preferred Dodge model and trim.' },
              { step: '2', title: 'Get a Quote', desc: 'We negotiate the lowest money factor for you.' },
              { step: '3', title: 'Credit Approval', desc: 'Fast, secure credit application process.' },
              { step: '4', title: 'Free Delivery', desc: 'Your new Dodge delivered to your door.' },
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
            <h2 className="text-2xl font-black uppercase mb-6 text-center">Request a Dodge Quote</h2>
            <ContactForm source="Dodge Landing Page" />
          </div>
        </div>
      </section>
    </Layout>
  );
}
