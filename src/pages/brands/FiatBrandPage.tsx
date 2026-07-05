import { Link } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { SEO } from '@/components/SEO';
import { JsonLd, createWebPageSchema } from '@/components/JsonLd';
import { ServiceHero } from '@/components/services/ServiceHero';
import { TrustStatsBar } from '@/components/shared/TrustStatsBar';
import { ContactForm } from '@/components/forms/ContactForm';
import { Phone, ArrowRight, ShieldCheck, CheckCircle2, Zap, Landmark, BadgeDollarSign } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

export default function FiatBrandPage() {
  return (
    <Layout>
      <SEO
        title="2026 Fiat Lease Deals NJ & NY | Zero Down Specials"
        description="Lease a 2026 Fiat in NJ & NY — 500e and 500X zero down specials. Italian city car style at broker pricing."
        seoKeywords={['2026 Fiat lease deals NJ', 'Fiat lease specials NY', 'zero down Fiat lease', 'Fiat broker NJ']}
        ogImage="https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Fiat_500_%282007%29_02.JPG/1280px-Fiat_500_%282007%29_02.JPG"
        canonicalPath="/brand/fiat"
      />
      <JsonLd data={[
        createWebPageSchema({
          name: "Fiat Lease Deals NJ & NY",
          description: "Affordable Fiat leasing broker in New Jersey offering aggressive specials.",
          url: "https://www.capitalmotorcars.com/brand/fiat"
        })
      ]} />

      {/* Section 1: Hero */}
      <ServiceHero
        badge="Best Value"
        title="2026 Fiat Lease Deals"
        highlightedTitle=""
        subtitle="Lease a 2026 Fiat in NJ & NY — 500e and 500X zero down specials. Italian city car style at broker pricing."
        heroImage="https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Fiat_500_%282007%29_02.JPG/1280px-Fiat_500_%282007%29_02.JPG"
        primaryAction={{ label: "View SUVs", href: "/vehicles/suv" }}
        secondaryAction={{ label: "Call Us", href: "tel:+12015095555", icon: Phone }}
      />
      
      {/* Section 2: Trust Stats */}
      <TrustStatsBar />

      {/* Section 3: Intro & Benefits */}
      <section className="py-16 bg-muted/10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-black uppercase mb-4">La Dolce Vita on Wheels</h2>
            <p className="text-lg text-muted-foreground">Fiat brings Italian charm and efficiency to city driving. The fully-electric 500e is a design icon reimagined for the EV era — stylish, compact, and ideal for NJ & NY urban environments. Capital Motor Cars provides Fiat lease specials for those who want Italian character with practical city credentials.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 rounded-3xl bg-card border border-border/50 text-center flex flex-col items-center hover:border-accent transition-colors">
              <ShieldCheck className="w-12 h-12 text-accent mb-4" />
              <h3 className="text-xl font-bold mb-4">Retro-Chic Design</h3>
              <p className="text-muted-foreground">The 500's iconic 1957-inspired circular headlights, rounded roof, and cheerful proportions make it the world's most stylish city car.</p>
            </div>
            <div className="p-8 rounded-3xl bg-card border border-border/50 text-center flex flex-col items-center hover:border-accent transition-colors">
              <Zap className="w-12 h-12 text-accent mb-4" />
              <h3 className="text-xl font-bold mb-4">All-Electric 500e</h3>
              <p className="text-muted-foreground">The new 500e delivers 149 miles of range and 117hp — perfect for NJ urban commutes — with Level 2 charging capability for overnight home charging.</p>
            </div>
            <div className="p-8 rounded-3xl bg-card border border-border/50 text-center flex flex-col items-center hover:border-accent transition-colors">
              <CheckCircle2 className="w-12 h-12 text-accent mb-4" />
              <h3 className="text-xl font-bold mb-4">Italian Craftsmanship</h3>
              <p className="text-muted-foreground">Fiat's Italian heritage translates to carefully considered interiors with premium materials, unique color palettes, and design-forward dashboard layouts.</p>
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
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Fiat_500_%282007%29_02.JPG/1280px-Fiat_500_%282007%29_02.JPG" alt="Fiat Heritage" className="w-full h-full object-cover" />
              </div>
            </div>
            <div className="md:w-1/2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent text-sm font-bold mb-6">
                <Landmark className="w-4 h-4" />
                Brand Heritage
              </div>
              <h2 className="text-3xl font-black uppercase mb-6">The <span className="text-accent italic">Fiat</span> Legacy</h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                Fabbrica Italiana Automobili Torino (FIAT) was founded in Turin in 1899 by a group of investors including Giovanni Agnelli. The 1957 Fiat 500 'Cinquecento' motorized post-war Italy — becoming a cultural symbol alongside Vespas and Audrey Hepburn. Over 3.8 million original 500s were built. The modern 500 launched in 2007 captured that same iconic spirit, and the all-electric 500e continues the tradition with zero-emission modern technology.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: Models */}
      <section className="py-16 bg-muted/10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black uppercase mb-4">Popular Fiat <span className="text-accent italic">Models</span></h2>
            <p className="text-muted-foreground">Explore our most requested vehicle categories for Fiat.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="p-8 rounded-3xl bg-card border border-border/50 text-center hover:border-accent transition-colors">
              <h3 className="text-xl font-bold mb-4">Fiat SUVs</h3>
              <p className="text-muted-foreground mb-6">Spacious, capable, and commanding. The perfect choice for families and adventure seekers.</p>
              <Link to="/vehicles/suv" className="text-accent font-bold hover:underline flex items-center justify-center gap-2">Lease Specials <ArrowRight className="w-4 h-4" /></Link>
            </div>
            <div className="p-8 rounded-3xl bg-card border border-border/50 text-center hover:border-accent transition-colors">
              <h3 className="text-xl font-bold mb-4">Fiat Sedans</h3>
              <p className="text-muted-foreground mb-6">Sleek, efficient, and comfortable. Ideal for daily commuting and city driving.</p>
              <Link to="/vehicles/sedan" className="text-accent font-bold hover:underline flex items-center justify-center gap-2">Lease Specials <ArrowRight className="w-4 h-4" /></Link>
            </div>
            <div className="p-8 rounded-3xl bg-card border border-border/50 text-center hover:border-accent transition-colors">
              <h3 className="text-xl font-bold mb-4">Fiat Trucks/Crossovers</h3>
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
            <h2 className="text-3xl font-black uppercase mb-6 relative z-10">Why Lease a Fiat?</h2>
            <p className="text-xl text-muted-foreground relative z-10 leading-relaxed">
              The Fiat 500e is ideally suited to leasing — EVs benefit most from lease structures (through EV credits and predictable operating costs), the 500e's Italian charm is best enjoyed fresh and under warranty, and Stellantis Financial provides accessible lease payments on this stylish city car.
            </p>
          </div>
        </div>
      </section>

      {/* Section 7: FAQs */}
      <section className="py-16 bg-muted/10">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black uppercase mb-4">Fiat Leasing <span className="text-accent italic">FAQ</span></h2>
          </div>
          <Accordion type="single" collapsible className="w-full">
            
            <AccordionItem value="item-1" className="bg-card mb-4 rounded-xl px-6 border-none">
              <AccordionTrigger className="text-lg font-bold hover:no-underline hover:text-accent">
                How far can the Fiat 500e travel on a charge?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-base">
                The Fiat 500e offers approximately 149 miles of EPA-rated range — perfect for NJ & NY city driving, commuting, and weekend errands without range anxiety.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-2" className="bg-card mb-4 rounded-xl px-6 border-none">
              <AccordionTrigger className="text-lg font-bold hover:no-underline hover:text-accent">
                Is the Fiat 500e practical for NJ driving?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-base">
                The 500e is ideal for urban NJ driving — compact enough for city parking, stylish enough to turn heads, and electric enough to avoid the Garden State Parkway gas stops.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-3" className="bg-card mb-4 rounded-xl px-6 border-none">
              <AccordionTrigger className="text-lg font-bold hover:no-underline hover:text-accent">
                Can I charge a Fiat 500e at home?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-base">
                Yes — the 500e supports Level 2 AC charging, restoring full range overnight on a standard 240V home charger. Public DC fast charging provides additional flexibility.
              </AccordionContent>
            </AccordionItem>
            
          </Accordion>
        </div>
      </section>

      {/* Section 8: Process */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-black uppercase mb-4">How to Lease a <span className="text-accent italic">Fiat</span></h2>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { step: '1', title: 'Choose Your Model', desc: 'Select your preferred Fiat model and trim.' },
              { step: '2', title: 'Get a Quote', desc: 'We negotiate the lowest money factor for you.' },
              { step: '3', title: 'Credit Approval', desc: 'Fast, secure credit application process.' },
              { step: '4', title: 'Free Delivery', desc: 'Your new Fiat delivered to your door.' },
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
            <h2 className="text-2xl font-black uppercase mb-6 text-center">Request a Fiat Quote</h2>
            <ContactForm source="Fiat Landing Page" />
          </div>
        </div>
      </section>
    </Layout>
  );
}
