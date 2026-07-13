import { Link } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { SEO } from '@/components/SEO';
import { JsonLd, createWebPageSchema } from '@/components/JsonLd';
import { ServiceHero } from '@/components/services/ServiceHero';
import { TrustStatsBar } from '@/components/shared/TrustStatsBar';
import { ContactForm } from '@/components/forms/ContactForm';
import { Phone, ArrowRight, ShieldCheck, CheckCircle2, Zap, Landmark, BadgeDollarSign } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

export default function RamBrandPage() {
  return (
    <Layout>
      <SEO
        title="2026 Ram Lease Deals NJ & NY | Zero Down Specials"
        description="Lease a 2026 Ram in NJ & NY - Ram 1500, 2500, and ProMaster zero down specials. America's most refined trucks at broker pricing."
        seoKeywords={['2026 Ram lease deals NJ', 'Ram lease specials NY', 'zero down Ram lease', 'Ram broker NJ']}
        ogImage="https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/2017_Ram_1500_Express_Crew_Cab%2C_front_left%2C_09-02-2022.jpg/1280px-2017_Ram_1500_Express_Crew_Cab%2C_front_left%2C_09-02-2022.jpg"
        canonicalPath="/brand/ram"
      />
      <JsonLd data={[
        createWebPageSchema({
          name: "Ram Lease Deals NJ & NY",
          description: "Affordable Ram leasing broker in New Jersey offering aggressive specials.",
          url: "https://www.capitalmotorcars.com/brand/ram"
        })
      ]} />

      {/* Section 1: Hero */}
      <ServiceHero
        badge="Best Value"
        title="2026 Ram Lease Deals"
        highlightedTitle=""
        subtitle="Lease a 2026 Ram in NJ & NY - Ram 1500, 2500, and ProMaster zero down specials. America's most refined trucks at broker pricing."
        heroImage="https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/2017_Ram_1500_Express_Crew_Cab%2C_front_left%2C_09-02-2022.jpg/1280px-2017_Ram_1500_Express_Crew_Cab%2C_front_left%2C_09-02-2022.jpg"
        primaryAction={{ label: "View SUVs", href: "/vehicles/suv" }}
        secondaryAction={{ label: "Call Us", href: "tel:+12015095555", icon: Phone }}
      />
      
      {/* Section 2: Trust Stats */}
      <TrustStatsBar />

      {/* Section 3: Intro & Benefits */}
      <section className="py-16 bg-muted/10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-black uppercase mb-4">Guts. Glory. Ram.</h2>
            <p className="text-lg text-muted-foreground">Ram builds America's most refined full-size trucks - with class-leading payload, towing, and interior quality that left competitors scrambling to catch up. The Ram 1500, available in TRX performance and 1500 REL luxury form, redefines what a truck can be for NJ & NY drivers.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 rounded-3xl bg-card border border-border/50 text-center flex flex-col items-center hover:border-accent transition-colors">
              <ShieldCheck className="w-12 h-12 text-accent mb-4" />
              <h3 className="text-xl font-bold mb-4">Air Suspension</h3>
              <p className="text-muted-foreground">Ram 1500's available four-corner air suspension provides a car-like ride, adjustable ride height for towing, and automatic leveling - features no other full-size truck offers.</p>
            </div>
            <div className="p-8 rounded-3xl bg-card border border-border/50 text-center flex flex-col items-center hover:border-accent transition-colors">
              <Zap className="w-12 h-12 text-accent mb-4" />
              <h3 className="text-xl font-bold mb-4">12" Uconnect 4C Display</h3>
              <p className="text-muted-foreground">Ram's 12" portrait touchscreen with wireless Apple CarPlay, Ram's exclusive navigation system, and SiriusXM integration leads the segment in infotainment quality.</p>
            </div>
            <div className="p-8 rounded-3xl bg-card border border-border/50 text-center flex flex-col items-center hover:border-accent transition-colors">
              <CheckCircle2 className="w-12 h-12 text-accent mb-4" />
              <h3 className="text-xl font-bold mb-4">eTorque Mild Hybrid</h3>
              <p className="text-muted-foreground">Ram's standard eTorque 48V mild hybrid system provides 130lb-ft of supplemental torque for improved acceleration, fuel economy, and towing capability.</p>
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
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/2017_Ram_1500_Express_Crew_Cab%2C_front_left%2C_09-02-2022.jpg/1280px-2017_Ram_1500_Express_Crew_Cab%2C_front_left%2C_09-02-2022.jpg" alt="Ram Heritage" className="w-full h-full object-cover" />
              </div>
            </div>
            <div className="md:w-1/2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent text-sm font-bold mb-6">
                <Landmark className="w-4 h-4" />
                Brand Heritage
              </div>
              <h2 className="text-3xl font-black uppercase mb-6">The <span className="text-accent italic">Ram</span> Legacy</h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                Ram trucks were produced under Dodge branding from 1981 until Chrysler separated Ram into its own brand in 2010 - recognizing the truck's premium positioning versus other Dodge vehicles. The Ram name references the 1930s Dodge Ram hood ornament. Today, Ram 1500 consistently battles Ford F-150 for America's best-selling truck title, with the TRX's 702hp supercharged HEMI V8 making it the world's most powerful production truck.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: Models */}
      <section className="py-16 bg-muted/10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black uppercase mb-4">Popular Ram <span className="text-accent italic">Models</span></h2>
            <p className="text-muted-foreground">Explore our most requested vehicle categories for Ram.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="p-8 rounded-3xl bg-card border border-border/50 text-center hover:border-accent transition-colors">
              <h3 className="text-xl font-bold mb-4">Ram SUVs</h3>
              <p className="text-muted-foreground mb-6">Spacious, capable, and commanding. The perfect choice for families and adventure seekers.</p>
              <Link to="/vehicles/suv" className="text-accent font-bold hover:underline flex items-center justify-center gap-2">Lease Specials <ArrowRight className="w-4 h-4" /></Link>
            </div>
            <div className="p-8 rounded-3xl bg-card border border-border/50 text-center hover:border-accent transition-colors">
              <h3 className="text-xl font-bold mb-4">Ram Sedans</h3>
              <p className="text-muted-foreground mb-6">Sleek, efficient, and comfortable. Ideal for daily commuting and city driving.</p>
              <Link to="/vehicles/sedan" className="text-accent font-bold hover:underline flex items-center justify-center gap-2">Lease Specials <ArrowRight className="w-4 h-4" /></Link>
            </div>
            <div className="p-8 rounded-3xl bg-card border border-border/50 text-center hover:border-accent transition-colors">
              <h3 className="text-xl font-bold mb-4">Ram Trucks/Crossovers</h3>
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
            <h2 className="text-3xl font-black uppercase mb-6 relative z-10">Why Lease a Ram?</h2>
            <p className="text-xl text-muted-foreground relative z-10 leading-relaxed">
              Chrysler Capital provides competitive Ram 1500 lease incentives, and Ram's strong residual values - driven by sustained demand for premium trucks - enable competitive monthly payments. Truck lessees benefit from accessing Ram's rapidly improving technology (eTorque hybrid, air suspension improvements) with each new lease cycle.
            </p>
          </div>
        </div>
      </section>

      {/* Section 7: FAQs */}
      <section className="py-16 bg-muted/10">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black uppercase mb-4">Ram Leasing <span className="text-accent italic">FAQ</span></h2>
          </div>
          <Accordion type="single" collapsible className="w-full">
            
            <AccordionItem value="item-1" className="bg-card mb-4 rounded-xl px-6 border-none">
              <AccordionTrigger className="text-lg font-bold hover:no-underline hover:text-accent">
                How does the Ram 1500 compare to the Ford F-150?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-base">
                The Ram 1500 leads in interior quality and ride comfort (thanks to air suspension and Uconnect), while the F-150 has advantages in available powertrain options and hybrid efficiency. Both are outstanding trucks.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-2" className="bg-card mb-4 rounded-xl px-6 border-none">
              <AccordionTrigger className="text-lg font-bold hover:no-underline hover:text-accent">
                What is the Ram 1500 TRX?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-base">
                The TRX is a 702hp supercharged V8 off-road performance truck - it accelerates 0-60mph in 4.5 seconds and can jump 10+ feet while maintaining full suspension control. It's the Hellcat of trucks.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-3" className="bg-card mb-4 rounded-xl px-6 border-none">
              <AccordionTrigger className="text-lg font-bold hover:no-underline hover:text-accent">
                Can I tow my boat with a leased Ram 1500?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-base">
                Yes - the Ram 1500 is rated to tow up to 12,750 lbs with proper configuration. Confirm your specific trim's tow rating with Capital Motor Cars when structuring your lease.
              </AccordionContent>
            </AccordionItem>
            
          </Accordion>
        </div>
      </section>

      {/* Section 8: Process */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-black uppercase mb-4">How to Lease a <span className="text-accent italic">Ram</span></h2>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { step: '1', title: 'Choose Your Model', desc: 'Select your preferred Ram model and trim.' },
              { step: '2', title: 'Get a Quote', desc: 'We negotiate the lowest money factor for you.' },
              { step: '3', title: 'Credit Approval', desc: 'Fast, secure credit application process.' },
              { step: '4', title: 'Free Delivery', desc: 'Your new Ram delivered to your door.' },
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
            <h2 className="text-2xl font-black uppercase mb-6 text-center">Request a Ram Quote</h2>
            <ContactForm source="Ram Landing Page" />
          </div>
        </div>
      </section>
    </Layout>
  );
}
