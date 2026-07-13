import { Link } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { SEO } from '@/components/SEO';
import { JsonLd, createWebPageSchema } from '@/components/JsonLd';
import { ServiceHero } from '@/components/services/ServiceHero';
import { TrustStatsBar } from '@/components/shared/TrustStatsBar';
import { ContactForm } from '@/components/forms/ContactForm';
import { Phone, ArrowRight, ShieldCheck, CheckCircle2, Zap, Landmark, BadgeDollarSign } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

export default function KiaBrandPage() {
  return (
    <Layout>
      <SEO
        title="2026 Kia Lease Deals NJ & NY | Zero Down Specials"
        description="Lease a 2026 Kia in NJ & NY - Telluride, Sportage, EV6, and Sorento zero down specials. Award-winning design at broker pricing."
        seoKeywords={['2026 Kia lease deals NJ', 'Kia lease specials NY', 'zero down Kia lease', 'Kia broker NJ']}
        ogImage="https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/2022_Kia_Telluride_EX_%28facelift%29%2C_front_4.16.23.jpg/1280px-2022_Kia_Telluride_EX_%28facelift%29%2C_front_4.16.23.jpg"
        canonicalPath="/brand/kia"
      />
      <JsonLd data={[
        createWebPageSchema({
          name: "Kia Lease Deals NJ & NY",
          description: "Affordable Kia leasing broker in New Jersey offering aggressive specials.",
          url: "https://www.capitalmotorcars.com/brand/kia"
        })
      ]} />

      {/* Section 1: Hero */}
      <ServiceHero
        badge="Best Value"
        title="2026 Kia Lease Deals"
        highlightedTitle=""
        subtitle="Lease a 2026 Kia in NJ & NY - Telluride, Sportage, EV6, and Sorento zero down specials. Award-winning design at broker pricing."
        heroImage="https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/2022_Kia_Telluride_EX_%28facelift%29%2C_front_4.16.23.jpg/1280px-2022_Kia_Telluride_EX_%28facelift%29%2C_front_4.16.23.jpg"
        primaryAction={{ label: "View SUVs", href: "/vehicles/suv" }}
        secondaryAction={{ label: "Call Us", href: "tel:+12015095555", icon: Phone }}
      />
      
      {/* Section 2: Trust Stats */}
      <TrustStatsBar />

      {/* Section 3: Intro & Benefits */}
      <section className="py-16 bg-muted/10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-black uppercase mb-4">Movement That Inspires</h2>
            <p className="text-lg text-muted-foreground">Kia has become one of the world's most design-forward automakers - the Telluride won MotorTrend SUV of the Year and the EV6 won World Car of the Year. Capital Motor Cars offers exceptional Kia lease specials throughout NJ & NY with zero-down options.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 rounded-3xl bg-card border border-border/50 text-center flex flex-col items-center hover:border-accent transition-colors">
              <ShieldCheck className="w-12 h-12 text-accent mb-4" />
              <h3 className="text-xl font-bold mb-4">Award-Winning Design</h3>
              <p className="text-muted-foreground">Kia's 'Opposites United' design language has earned multiple prestigious design awards - the Telluride and EV6 are widely considered the best-looking in their segments.</p>
            </div>
            <div className="p-8 rounded-3xl bg-card border border-border/50 text-center flex flex-col items-center hover:border-accent transition-colors">
              <Zap className="w-12 h-12 text-accent mb-4" />
              <h3 className="text-xl font-bold mb-4">Kia Drive Wise</h3>
              <p className="text-muted-foreground">Standard Kia Drive Wise safety suite includes Forward Collision-Avoidance, Lane Keeping Assist, and Blind-Spot Collision Avoidance on all models.</p>
            </div>
            <div className="p-8 rounded-3xl bg-card border border-border/50 text-center flex flex-col items-center hover:border-accent transition-colors">
              <CheckCircle2 className="w-12 h-12 text-accent mb-4" />
              <h3 className="text-xl font-bold mb-4">800V Ultra-Fast Charging</h3>
              <p className="text-muted-foreground">The Kia EV6 and EV9 use 800V architecture - enabling 10-80% charging in just 18 minutes at DC fast chargers, making long trips practical.</p>
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
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/2022_Kia_Telluride_EX_%28facelift%29%2C_front_4.16.23.jpg/1280px-2022_Kia_Telluride_EX_%28facelift%29%2C_front_4.16.23.jpg" alt="Kia Heritage" className="w-full h-full object-cover" />
              </div>
            </div>
            <div className="md:w-1/2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent text-sm font-bold mb-6">
                <Landmark className="w-4 h-4" />
                Brand Heritage
              </div>
              <h2 className="text-3xl font-black uppercase mb-6">The <span className="text-accent italic">Kia</span> Legacy</h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                Kia was founded in 1944 as a manufacturer of steel tubing before evolving into Korea's oldest vehicle manufacturer. After partnering with Hyundai in 1998, Kia underwent a dramatic transformation under Chief Design Officer Peter Schreyer - the former Audi designer behind the TT. Today, Kia's Telluride winning consecutive MotorTrend SUV of the Year awards and EV6 taking World Car of the Year 2022 proves the brand's genuine arrival at the global top tier.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: Models */}
      <section className="py-16 bg-muted/10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black uppercase mb-4">Popular Kia <span className="text-accent italic">Models</span></h2>
            <p className="text-muted-foreground">Explore our most requested vehicle categories for Kia.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="p-8 rounded-3xl bg-card border border-border/50 text-center hover:border-accent transition-colors">
              <h3 className="text-xl font-bold mb-4">Kia SUVs</h3>
              <p className="text-muted-foreground mb-6">Spacious, capable, and commanding. The perfect choice for families and adventure seekers.</p>
              <Link to="/vehicles/suv" className="text-accent font-bold hover:underline flex items-center justify-center gap-2">Lease Specials <ArrowRight className="w-4 h-4" /></Link>
            </div>
            <div className="p-8 rounded-3xl bg-card border border-border/50 text-center hover:border-accent transition-colors">
              <h3 className="text-xl font-bold mb-4">Kia Sedans</h3>
              <p className="text-muted-foreground mb-6">Sleek, efficient, and comfortable. Ideal for daily commuting and city driving.</p>
              <Link to="/vehicles/sedan" className="text-accent font-bold hover:underline flex items-center justify-center gap-2">Lease Specials <ArrowRight className="w-4 h-4" /></Link>
            </div>
            <div className="p-8 rounded-3xl bg-card border border-border/50 text-center hover:border-accent transition-colors">
              <h3 className="text-xl font-bold mb-4">Kia Trucks/Crossovers</h3>
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
            <h2 className="text-3xl font-black uppercase mb-6 relative z-10">Why Lease a Kia?</h2>
            <p className="text-xl text-muted-foreground relative z-10 leading-relaxed">
              Kia Finance America provides some of the most competitive lease money factors in the mainstream segment, combined with strong residual values on the Telluride and Sportage. EV6 leases benefit from $7,500 EV credits - making this World Car of the Year winner surprisingly affordable on a monthly basis.
            </p>
          </div>
        </div>
      </section>

      {/* Section 7: FAQs */}
      <section className="py-16 bg-muted/10">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black uppercase mb-4">Kia Leasing <span className="text-accent italic">FAQ</span></h2>
          </div>
          <Accordion type="single" collapsible className="w-full">
            
            <AccordionItem value="item-1" className="bg-card mb-4 rounded-xl px-6 border-none">
              <AccordionTrigger className="text-lg font-bold hover:no-underline hover:text-accent">
                Why did the Kia Telluride win MotorTrend SUV of the Year?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-base">
                The Telluride offers full-size SUV interior space in a mid-size footprint, best-in-class rear seat room, standard 8-inch touchscreen, and exceptional build quality - all at a price that undercuts the Ford Explorer.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-2" className="bg-card mb-4 rounded-xl px-6 border-none">
              <AccordionTrigger className="text-lg font-bold hover:no-underline hover:text-accent">
                How fast does the Kia EV6 charge?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-base">
                With 800V architecture, the EV6 charges from 10-80% in approximately 18 minutes on a 350kW DC fast charger - enabling long NJ/NY road trips with minimal charging stops.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-3" className="bg-card mb-4 rounded-xl px-6 border-none">
              <AccordionTrigger className="text-lg font-bold hover:no-underline hover:text-accent">
                Does Kia's warranty apply to leased vehicles?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-base">
                Yes - Kia's 5-year/60,000-mile comprehensive warranty and 10-year/100,000-mile powertrain warranty both apply to leased vehicles, providing excellent protection throughout your term.
              </AccordionContent>
            </AccordionItem>
            
          </Accordion>
        </div>
      </section>

      {/* Section 8: Process */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-black uppercase mb-4">How to Lease a <span className="text-accent italic">Kia</span></h2>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { step: '1', title: 'Choose Your Model', desc: 'Select your preferred Kia model and trim.' },
              { step: '2', title: 'Get a Quote', desc: 'We negotiate the lowest money factor for you.' },
              { step: '3', title: 'Credit Approval', desc: 'Fast, secure credit application process.' },
              { step: '4', title: 'Free Delivery', desc: 'Your new Kia delivered to your door.' },
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
            <h2 className="text-2xl font-black uppercase mb-6 text-center">Request a Kia Quote</h2>
            <ContactForm source="Kia Landing Page" />
          </div>
        </div>
      </section>
    </Layout>
  );
}
