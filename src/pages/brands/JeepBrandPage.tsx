import { Link } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { SEO } from '@/components/SEO';
import { JsonLd, createWebPageSchema } from '@/components/JsonLd';
import { ServiceHero } from '@/components/services/ServiceHero';
import { TrustStatsBar } from '@/components/shared/TrustStatsBar';
import { ContactForm } from '@/components/forms/ContactForm';
import { Phone, ArrowRight, ShieldCheck, CheckCircle2, Zap, Landmark, BadgeDollarSign } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

export default function JeepBrandPage() {
  return (
    <Layout>
      <SEO
        title="2026 Jeep Lease Deals NJ & NY | Zero Down Specials"
        description="Lease a 2026 Jeep in NJ & NY — Wrangler, Grand Cherokee, and Gladiator zero down specials. America's off-road icon at broker pricing."
        seoKeywords={['2026 Jeep lease deals NJ', 'Jeep lease specials NY', 'zero down Jeep lease', 'Jeep broker NJ']}
        ogImage="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/2018_Jeep_Wrangler_Sahara_Unlimited_Multijet_2.1_Front.jpg/1280px-2018_Jeep_Wrangler_Sahara_Unlimited_Multijet_2.1_Front.jpg"
        canonicalPath="/brand/jeep"
      />
      <JsonLd data={[
        createWebPageSchema({
          name: "Jeep Lease Deals NJ & NY",
          description: "Affordable Jeep leasing broker in New Jersey offering aggressive specials.",
          url: "https://www.capitalmotorcars.com/brand/jeep"
        })
      ]} />

      {/* Section 1: Hero */}
      <ServiceHero
        badge="Best Value"
        title="2026 Jeep Lease Deals"
        highlightedTitle=""
        subtitle="Lease a 2026 Jeep in NJ & NY — Wrangler, Grand Cherokee, and Gladiator zero down specials. America's off-road icon at broker pricing."
        heroImage="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/2018_Jeep_Wrangler_Sahara_Unlimited_Multijet_2.1_Front.jpg/1280px-2018_Jeep_Wrangler_Sahara_Unlimited_Multijet_2.1_Front.jpg"
        primaryAction={{ label: "View SUVs", href: "/vehicles/suv" }}
        secondaryAction={{ label: "Call Us", href: "tel:+12015095555", icon: Phone }}
      />
      
      {/* Section 2: Trust Stats */}
      <TrustStatsBar />

      {/* Section 3: Intro & Benefits */}
      <section className="py-16 bg-muted/10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-black uppercase mb-4">Go Anywhere. Do Anything.</h2>
            <p className="text-lg text-muted-foreground">Jeep builds the world's most iconic off-road vehicles — from the Wrangler that defined the breed to the luxurious Grand Cherokee L. Whether conquering NJ mountain trails or navigating Manhattan streets, Jeep's legendary Trail Rated® capability is always available when you need it.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 rounded-3xl bg-card border border-border/50 text-center flex flex-col items-center hover:border-accent transition-colors">
              <ShieldCheck className="w-12 h-12 text-accent mb-4" />
              <h3 className="text-xl font-bold mb-4">Trail Rated® Certification</h3>
              <p className="text-muted-foreground">Jeep's Trail Rated badge means a vehicle has been proven in traction, water fording, maneuverability, articulation, and ground clearance — a real-world off-road guarantee.</p>
            </div>
            <div className="p-8 rounded-3xl bg-card border border-border/50 text-center flex flex-col items-center hover:border-accent transition-colors">
              <Zap className="w-12 h-12 text-accent mb-4" />
              <h3 className="text-xl font-bold mb-4">Selec-Terrain™ System</h3>
              <p className="text-muted-foreground">One dial selects Auto, Sand, Snow, Mud, or Rock mode — automatically configuring throttle, transmission, AWD torque split, and stability control for any surface.</p>
            </div>
            <div className="p-8 rounded-3xl bg-card border border-border/50 text-center flex flex-col items-center hover:border-accent transition-colors">
              <CheckCircle2 className="w-12 h-12 text-accent mb-4" />
              <h3 className="text-xl font-bold mb-4">4xe Plug-In Hybrid</h3>
              <p className="text-muted-foreground">The Jeep Wrangler 4xe and Grand Cherokee 4xe PHEVs deliver 25+ miles of electric range for daily NJ commutes while maintaining full Trail Rated off-road capability.</p>
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
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/2018_Jeep_Wrangler_Sahara_Unlimited_Multijet_2.1_Front.jpg/1280px-2018_Jeep_Wrangler_Sahara_Unlimited_Multijet_2.1_Front.jpg" alt="Jeep Heritage" className="w-full h-full object-cover" />
              </div>
            </div>
            <div className="md:w-1/2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent text-sm font-bold mb-6">
                <Landmark className="w-4 h-4" />
                Brand Heritage
              </div>
              <h2 className="text-3xl font-black uppercase mb-6">The <span className="text-accent italic">Jeep</span> Legacy</h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                Jeep's origin story is the most patriotic in automotive history: in 1940, the US Army needed a reconnaissance vehicle in 49 days. Willys-Overland delivered the MB Jeep — and the brand has never looked back. The Wrangler is the only production vehicle in continuous development tracing directly to that original WWII Jeep. The Jeep name means freedom to millions worldwide — it's been called the most recognized vehicle silhouette on earth.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: Models */}
      <section className="py-16 bg-muted/10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black uppercase mb-4">Popular Jeep <span className="text-accent italic">Models</span></h2>
            <p className="text-muted-foreground">Explore our most requested vehicle categories for Jeep.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="p-8 rounded-3xl bg-card border border-border/50 text-center hover:border-accent transition-colors">
              <h3 className="text-xl font-bold mb-4">Jeep SUVs</h3>
              <p className="text-muted-foreground mb-6">Spacious, capable, and commanding. The perfect choice for families and adventure seekers.</p>
              <Link to="/vehicles/suv" className="text-accent font-bold hover:underline flex items-center justify-center gap-2">Lease Specials <ArrowRight className="w-4 h-4" /></Link>
            </div>
            <div className="p-8 rounded-3xl bg-card border border-border/50 text-center hover:border-accent transition-colors">
              <h3 className="text-xl font-bold mb-4">Jeep Sedans</h3>
              <p className="text-muted-foreground mb-6">Sleek, efficient, and comfortable. Ideal for daily commuting and city driving.</p>
              <Link to="/vehicles/sedan" className="text-accent font-bold hover:underline flex items-center justify-center gap-2">Lease Specials <ArrowRight className="w-4 h-4" /></Link>
            </div>
            <div className="p-8 rounded-3xl bg-card border border-border/50 text-center hover:border-accent transition-colors">
              <h3 className="text-xl font-bold mb-4">Jeep Trucks/Crossovers</h3>
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
            <h2 className="text-3xl font-black uppercase mb-6 relative z-10">Why Lease a Jeep?</h2>
            <p className="text-xl text-muted-foreground relative z-10 leading-relaxed">
              Jeep Wrangler values are extremely stable — Wranglers hold 60%+ of their value after 3 years, making lease residuals very favorable. The 4xe PHEV Wrangler and Grand Cherokee qualify for EV lease credits through Chrysler Capital, further reducing monthly payments. Jeep leases reward buyers who want to upgrade capability with each new generation.
            </p>
          </div>
        </div>
      </section>

      {/* Section 7: FAQs */}
      <section className="py-16 bg-muted/10">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black uppercase mb-4">Jeep Leasing <span className="text-accent italic">FAQ</span></h2>
          </div>
          <Accordion type="single" collapsible className="w-full">
            
            <AccordionItem value="item-1" className="bg-card mb-4 rounded-xl px-6 border-none">
              <AccordionTrigger className="text-lg font-bold hover:no-underline hover:text-accent">
                Can I remove the Jeep Wrangler's doors and roof?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-base">
                Yes — the Wrangler is uniquely engineered for removable doors and tops. You can convert to a full open-air experience legally on public roads — a feature literally no other vehicle offers.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-2" className="bg-card mb-4 rounded-xl px-6 border-none">
              <AccordionTrigger className="text-lg font-bold hover:no-underline hover:text-accent">
                Is the Jeep Grand Cherokee good for NJ families?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-base">
                The Grand Cherokee L offers 3-row seating for 7, a best-in-class interior quality upgrade with the Summit Reserve trim, and available McIntosh audio — making it an outstanding family SUV for NJ roads.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-3" className="bg-card mb-4 rounded-xl px-6 border-none">
              <AccordionTrigger className="text-lg font-bold hover:no-underline hover:text-accent">
                Does the Jeep Wrangler 4xe qualify for EV credits on a lease?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-base">
                Yes — the Wrangler 4xe PHEV qualifies for applicable EV lease incentives through Chrysler Capital, significantly reducing the monthly payment on America's most iconic off-road vehicle.
              </AccordionContent>
            </AccordionItem>
            
          </Accordion>
        </div>
      </section>

      {/* Section 8: Process */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-black uppercase mb-4">How to Lease a <span className="text-accent italic">Jeep</span></h2>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { step: '1', title: 'Choose Your Model', desc: 'Select your preferred Jeep model and trim.' },
              { step: '2', title: 'Get a Quote', desc: 'We negotiate the lowest money factor for you.' },
              { step: '3', title: 'Credit Approval', desc: 'Fast, secure credit application process.' },
              { step: '4', title: 'Free Delivery', desc: 'Your new Jeep delivered to your door.' },
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
            <h2 className="text-2xl font-black uppercase mb-6 text-center">Request a Jeep Quote</h2>
            <ContactForm source="Jeep Landing Page" />
          </div>
        </div>
      </section>
    </Layout>
  );
}
