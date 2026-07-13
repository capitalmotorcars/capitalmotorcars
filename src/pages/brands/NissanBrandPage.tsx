import { Link } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { SEO } from '@/components/SEO';
import { JsonLd, createWebPageSchema } from '@/components/JsonLd';
import { ServiceHero } from '@/components/services/ServiceHero';
import { TrustStatsBar } from '@/components/shared/TrustStatsBar';
import { ContactForm } from '@/components/forms/ContactForm';
import { Phone, ArrowRight, ShieldCheck, CheckCircle2, Zap, Landmark, BadgeDollarSign } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

export default function NissanBrandPage() {
  return (
    <Layout>
      <SEO
        title="2026 Nissan Lease Deals NJ & NY | Zero Down Specials"
        description="Lease a 2026 Nissan in NJ & NY - Altima, Rogue, Pathfinder, and Ariya zero down specials. Japanese reliability at broker pricing."
        seoKeywords={['2026 Nissan lease deals NJ', 'Nissan lease specials NY', 'zero down Nissan lease', 'Nissan broker NJ']}
        ogImage="https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/2009-2010_Nissan_GT-R_%28R35%29_coupe_01.jpg/1280px-2009-2010_Nissan_GT-R_%28R35%29_coupe_01.jpg"
        canonicalPath="/brand/nissan"
      />
      <JsonLd data={[
        createWebPageSchema({
          name: "Nissan Lease Deals NJ & NY",
          description: "Affordable Nissan leasing broker in New Jersey offering aggressive specials.",
          url: "https://www.capitalmotorcars.com/brand/nissan"
        })
      ]} />

      {/* Section 1: Hero */}
      <ServiceHero
        badge="Best Value"
        title="2026 Nissan Lease Deals"
        highlightedTitle=""
        subtitle="Lease a 2026 Nissan in NJ & NY - Altima, Rogue, Pathfinder, and Ariya zero down specials. Japanese reliability at broker pricing."
        heroImage="https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/2009-2010_Nissan_GT-R_%28R35%29_coupe_01.jpg/1280px-2009-2010_Nissan_GT-R_%28R35%29_coupe_01.jpg"
        primaryAction={{ label: "View SUVs", href: "/vehicles/suv" }}
        secondaryAction={{ label: "Call Us", href: "tel:+12015095555", icon: Phone }}
      />
      
      {/* Section 2: Trust Stats */}
      <TrustStatsBar />

      {/* Section 3: Intro & Benefits */}
      <section className="py-16 bg-muted/10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-black uppercase mb-4">Innovation That Excites</h2>
            <p className="text-lg text-muted-foreground">Nissan pioneered mass-market electric vehicles with the LEAF and builds some of the most driver-focused mainstream vehicles on the market. The Rogue, Altima, and electric Ariya offer outstanding value and technology for NJ & NY commuters through Capital Motor Cars' broker network.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 rounded-3xl bg-card border border-border/50 text-center flex flex-col items-center hover:border-accent transition-colors">
              <ShieldCheck className="w-12 h-12 text-accent mb-4" />
              <h3 className="text-xl font-bold mb-4">ProPILOT Assist 2.0</h3>
              <p className="text-muted-foreground">Nissan's hands-on highway driving system maintains lane centering, safe following distance, and even changes lanes with driver confirmation - standard on several models.</p>
            </div>
            <div className="p-8 rounded-3xl bg-card border border-border/50 text-center flex flex-col items-center hover:border-accent transition-colors">
              <Zap className="w-12 h-12 text-accent mb-4" />
              <h3 className="text-xl font-bold mb-4">Intelligent Mobility</h3>
              <p className="text-muted-foreground">Nissan's e-POWER hybrid system available on multiple models provides electric-like acceleration efficiency while eliminating range anxiety.</p>
            </div>
            <div className="p-8 rounded-3xl bg-card border border-border/50 text-center flex flex-col items-center hover:border-accent transition-colors">
              <CheckCircle2 className="w-12 h-12 text-accent mb-4" />
              <h3 className="text-xl font-bold mb-4">Safety Shield 360</h3>
              <p className="text-muted-foreground">Nissan's comprehensive 360-degree safety suite includes Rear Automatic Braking, Blind Spot Warning, and Rear Cross Traffic Alert as standard equipment.</p>
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
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/2009-2010_Nissan_GT-R_%28R35%29_coupe_01.jpg/1280px-2009-2010_Nissan_GT-R_%28R35%29_coupe_01.jpg" alt="Nissan Heritage" className="w-full h-full object-cover" />
              </div>
            </div>
            <div className="md:w-1/2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent text-sm font-bold mb-6">
                <Landmark className="w-4 h-4" />
                Brand Heritage
              </div>
              <h2 className="text-3xl font-black uppercase mb-6">The <span className="text-accent italic">Nissan</span> Legacy</h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                Founded in Japan in 1933, Nissan has deep motorsport roots - the Nissan GT-R has held multiple Nürburgring records, and Nissan won Le Mans class victories. The 2011 LEAF became the world's first mass-market EV, selling over 500,000 units globally. Today, Nissan's Ariya electric SUV and Z sports car signal the brand's continued commitment to exciting, accessible technology.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: Models */}
      <section className="py-16 bg-muted/10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black uppercase mb-4">Popular Nissan <span className="text-accent italic">Models</span></h2>
            <p className="text-muted-foreground">Explore our most requested vehicle categories for Nissan.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="p-8 rounded-3xl bg-card border border-border/50 text-center hover:border-accent transition-colors">
              <h3 className="text-xl font-bold mb-4">Nissan SUVs</h3>
              <p className="text-muted-foreground mb-6">Spacious, capable, and commanding. The perfect choice for families and adventure seekers.</p>
              <Link to="/vehicles/suv" className="text-accent font-bold hover:underline flex items-center justify-center gap-2">Lease Specials <ArrowRight className="w-4 h-4" /></Link>
            </div>
            <div className="p-8 rounded-3xl bg-card border border-border/50 text-center hover:border-accent transition-colors">
              <h3 className="text-xl font-bold mb-4">Nissan Sedans</h3>
              <p className="text-muted-foreground mb-6">Sleek, efficient, and comfortable. Ideal for daily commuting and city driving.</p>
              <Link to="/vehicles/sedan" className="text-accent font-bold hover:underline flex items-center justify-center gap-2">Lease Specials <ArrowRight className="w-4 h-4" /></Link>
            </div>
            <div className="p-8 rounded-3xl bg-card border border-border/50 text-center hover:border-accent transition-colors">
              <h3 className="text-xl font-bold mb-4">Nissan Trucks/Crossovers</h3>
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
            <h2 className="text-3xl font-black uppercase mb-6 relative z-10">Why Lease a Nissan?</h2>
            <p className="text-xl text-muted-foreground relative z-10 leading-relaxed">
              Nissan Motor Acceptance Corporation frequently offers competitive lease incentives on the Rogue and Altima - two of the most popular vehicles in NJ. The Ariya EV qualifies for EV lease credits, making Nissan's electric transition accessible at mainstream price points.
            </p>
          </div>
        </div>
      </section>

      {/* Section 7: FAQs */}
      <section className="py-16 bg-muted/10">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black uppercase mb-4">Nissan Leasing <span className="text-accent italic">FAQ</span></h2>
          </div>
          <Accordion type="single" collapsible className="w-full">
            
            <AccordionItem value="item-1" className="bg-card mb-4 rounded-xl px-6 border-none">
              <AccordionTrigger className="text-lg font-bold hover:no-underline hover:text-accent">
                Is the Nissan Rogue good for NJ families?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-base">
                The Rogue is one of NJ's most popular lease choices - offering ProPILOT Assist, a large cargo area, and tri-zone automatic climate control at a competitive monthly payment through Nissan Motor Acceptance.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-2" className="bg-card mb-4 rounded-xl px-6 border-none">
              <AccordionTrigger className="text-lg font-bold hover:no-underline hover:text-accent">
                What makes the Nissan GT-R special?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-base">
                The GT-R 'Godzilla' produces 565hp from a twin-turbo V6 with a dual-clutch transmission and sophisticated AWD - enabling 0-60mph in 2.7 seconds. It remains one of the world's greatest performance bargains.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-3" className="bg-card mb-4 rounded-xl px-6 border-none">
              <AccordionTrigger className="text-lg font-bold hover:no-underline hover:text-accent">
                Does the Nissan Ariya qualify for EV credits?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-base">
                Yes - the Ariya qualifies for EV lease incentives. The Ariya's 300-mile range and bi-directional charging capability make it an excellent electric SUV choice for NJ drivers.
              </AccordionContent>
            </AccordionItem>
            
          </Accordion>
        </div>
      </section>

      {/* Section 8: Process */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-black uppercase mb-4">How to Lease a <span className="text-accent italic">Nissan</span></h2>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { step: '1', title: 'Choose Your Model', desc: 'Select your preferred Nissan model and trim.' },
              { step: '2', title: 'Get a Quote', desc: 'We negotiate the lowest money factor for you.' },
              { step: '3', title: 'Credit Approval', desc: 'Fast, secure credit application process.' },
              { step: '4', title: 'Free Delivery', desc: 'Your new Nissan delivered to your door.' },
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
            <h2 className="text-2xl font-black uppercase mb-6 text-center">Request a Nissan Quote</h2>
            <ContactForm source="Nissan Landing Page" />
          </div>
        </div>
      </section>
    </Layout>
  );
}
