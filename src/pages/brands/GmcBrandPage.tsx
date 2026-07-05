import { Link } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { SEO } from '@/components/SEO';
import { JsonLd, createWebPageSchema } from '@/components/JsonLd';
import { ServiceHero } from '@/components/services/ServiceHero';
import { TrustStatsBar } from '@/components/shared/TrustStatsBar';
import { ContactForm } from '@/components/forms/ContactForm';
import { Phone, ArrowRight, ShieldCheck, CheckCircle2, Zap, Landmark, BadgeDollarSign } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

export default function GMCBrandPage() {
  return (
    <Layout>
      <SEO
        title="2026 GMC Lease Deals NJ & NY | Zero Down Specials"
        description="Lease a 2026 GMC in NJ & NY — Sierra, Yukon, Terrain, and Hummer EV zero down specials. Professional-grade trucks and SUVs at broker pricing."
        seoKeywords={['2026 GMC lease deals NJ', 'GMC lease specials NY', 'zero down GMC lease', 'GMC broker NJ']}
        ogImage="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/2022_Chevrolet_Silverado_2500HD_High_Country%2C_Front_Left%2C_11-21-2021.jpg/1280px-2022_Chevrolet_Silverado_2500HD_High_Country%2C_Front_Left%2C_11-21-2021.jpg"
        canonicalPath="/brand/gmc"
      />
      <JsonLd data={[
        createWebPageSchema({
          name: "GMC Lease Deals NJ & NY",
          description: "Affordable GMC leasing broker in New Jersey offering aggressive specials.",
          url: "https://www.capitalmotorcars.com/brand/gmc"
        })
      ]} />

      {/* Section 1: Hero */}
      <ServiceHero
        badge="Best Value"
        title="2026 GMC Lease Deals"
        highlightedTitle=""
        subtitle="Lease a 2026 GMC in NJ & NY — Sierra, Yukon, Terrain, and Hummer EV zero down specials. Professional-grade trucks and SUVs at broker pricing."
        heroImage="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/2022_Chevrolet_Silverado_2500HD_High_Country%2C_Front_Left%2C_11-21-2021.jpg/1280px-2022_Chevrolet_Silverado_2500HD_High_Country%2C_Front_Left%2C_11-21-2021.jpg"
        primaryAction={{ label: "View SUVs", href: "/vehicles/suv" }}
        secondaryAction={{ label: "Call Us", href: "tel:+12015095555", icon: Phone }}
      />
      
      {/* Section 2: Trust Stats */}
      <TrustStatsBar />

      {/* Section 3: Intro & Benefits */}
      <section className="py-16 bg-muted/10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-black uppercase mb-4">Professional Grade. Built to Serve.</h2>
            <p className="text-lg text-muted-foreground">GMC builds professional-grade trucks and SUVs for those who demand capability without compromise. The Sierra 1500, Yukon XL, and electric Hummer EV combine imposing presence with genuine work-ready capability and advanced technology for NJ & NY drivers.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 rounded-3xl bg-card border border-border/50 text-center flex flex-col items-center hover:border-accent transition-colors">
              <ShieldCheck className="w-12 h-12 text-accent mb-4" />
              <h3 className="text-xl font-bold mb-4">CarbonPro Carbon Fiber Bed</h3>
              <p className="text-muted-foreground">GMC Sierra's available CarbonPro carbon fiber bed is lighter than steel, 10x stronger, and resistant to dents, corrosion, and UV damage — a professional-grade innovation.</p>
            </div>
            <div className="p-8 rounded-3xl bg-card border border-border/50 text-center flex flex-col items-center hover:border-accent transition-colors">
              <Zap className="w-12 h-12 text-accent mb-4" />
              <h3 className="text-xl font-bold mb-4">MultiPro Tailgate</h3>
              <p className="text-muted-foreground">GMC's 6-function MultiPro Tailgate transforms loading, unloading, and tailgating — with integrated step, inner gate, and load-stopper configurations.</p>
            </div>
            <div className="p-8 rounded-3xl bg-card border border-border/50 text-center flex flex-col items-center hover:border-accent transition-colors">
              <CheckCircle2 className="w-12 h-12 text-accent mb-4" />
              <h3 className="text-xl font-bold mb-4">Hummer EV Watts to Freedom</h3>
              <p className="text-muted-foreground">The GMC Hummer EV's Watts to Freedom launch mode unleashes all 1,000hp in 3 seconds — the most powerful electric pickup truck ever built.</p>
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
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/2022_Chevrolet_Silverado_2500HD_High_Country%2C_Front_Left%2C_11-21-2021.jpg/1280px-2022_Chevrolet_Silverado_2500HD_High_Country%2C_Front_Left%2C_11-21-2021.jpg" alt="GMC Heritage" className="w-full h-full object-cover" />
              </div>
            </div>
            <div className="md:w-1/2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent text-sm font-bold mb-6">
                <Landmark className="w-4 h-4" />
                Brand Heritage
              </div>
              <h2 className="text-3xl font-black uppercase mb-6">The <span className="text-accent italic">GMC</span> Legacy</h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                GMC traces its roots to Rapid Motor Vehicle Company, founded in 1901. GMC became General Motors Truck Company in 1911 — over a century of professional-grade commercial vehicle expertise. GMC's distinctive approach positions trucks and SUVs as premium alternatives to Chevrolet siblings, with unique features like MultiPro Tailgate, CarbonPro bed, and the revolutionary Hummer EV establishing GMC as an innovation leader in the truck segment.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: Models */}
      <section className="py-16 bg-muted/10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black uppercase mb-4">Popular GMC <span className="text-accent italic">Models</span></h2>
            <p className="text-muted-foreground">Explore our most requested vehicle categories for GMC.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="p-8 rounded-3xl bg-card border border-border/50 text-center hover:border-accent transition-colors">
              <h3 className="text-xl font-bold mb-4">GMC SUVs</h3>
              <p className="text-muted-foreground mb-6">Spacious, capable, and commanding. The perfect choice for families and adventure seekers.</p>
              <Link to="/vehicles/suv" className="text-accent font-bold hover:underline flex items-center justify-center gap-2">Lease Specials <ArrowRight className="w-4 h-4" /></Link>
            </div>
            <div className="p-8 rounded-3xl bg-card border border-border/50 text-center hover:border-accent transition-colors">
              <h3 className="text-xl font-bold mb-4">GMC Sedans</h3>
              <p className="text-muted-foreground mb-6">Sleek, efficient, and comfortable. Ideal for daily commuting and city driving.</p>
              <Link to="/vehicles/sedan" className="text-accent font-bold hover:underline flex items-center justify-center gap-2">Lease Specials <ArrowRight className="w-4 h-4" /></Link>
            </div>
            <div className="p-8 rounded-3xl bg-card border border-border/50 text-center hover:border-accent transition-colors">
              <h3 className="text-xl font-bold mb-4">GMC Trucks/Crossovers</h3>
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
            <h2 className="text-3xl font-black uppercase mb-6 relative z-10">Why Lease a GMC?</h2>
            <p className="text-xl text-muted-foreground relative z-10 leading-relaxed">
              GM Financial provides strong lease support on GMC Sierra and Terrain, with the Hummer EV qualifying for significant EV lease credits. GMC's premium positioning versus Chevrolet provides strong residual values on trucks and Yukon SUVs, enabling competitive lease payments relative to payload and capability.
            </p>
          </div>
        </div>
      </section>

      {/* Section 7: FAQs */}
      <section className="py-16 bg-muted/10">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black uppercase mb-4">GMC Leasing <span className="text-accent italic">FAQ</span></h2>
          </div>
          <Accordion type="single" collapsible className="w-full">
            
            <AccordionItem value="item-1" className="bg-card mb-4 rounded-xl px-6 border-none">
              <AccordionTrigger className="text-lg font-bold hover:no-underline hover:text-accent">
                What is the difference between GMC Sierra and Chevy Silverado?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-base">
                The Sierra offers GMC-exclusive features: MultiPro tailgate, CarbonPro carbon fiber bed option, ProGrade trailering technology, and more premium interior materials — commanding a $2,000-5,000 premium over the Silverado.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-2" className="bg-card mb-4 rounded-xl px-6 border-none">
              <AccordionTrigger className="text-lg font-bold hover:no-underline hover:text-accent">
                Is the GMC Hummer EV practical?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-base">
                The Hummer EV's 9,500-pound towing capacity, 13.5" ground clearance, and CrabWalk diagonal driving mode make it genuinely capable. The 329-mile range addresses EV range concerns for most NJ drivers.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-3" className="bg-card mb-4 rounded-xl px-6 border-none">
              <AccordionTrigger className="text-lg font-bold hover:no-underline hover:text-accent">
                What GMC models are best for leasing in NJ?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-base">
                The GMC Terrain is our most popular GMC lease in NJ — competitive payments through GM Financial, good fuel economy, and all the professional-grade styling GMC is known for.
              </AccordionContent>
            </AccordionItem>
            
          </Accordion>
        </div>
      </section>

      {/* Section 8: Process */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-black uppercase mb-4">How to Lease a <span className="text-accent italic">GMC</span></h2>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { step: '1', title: 'Choose Your Model', desc: 'Select your preferred GMC model and trim.' },
              { step: '2', title: 'Get a Quote', desc: 'We negotiate the lowest money factor for you.' },
              { step: '3', title: 'Credit Approval', desc: 'Fast, secure credit application process.' },
              { step: '4', title: 'Free Delivery', desc: 'Your new GMC delivered to your door.' },
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
            <h2 className="text-2xl font-black uppercase mb-6 text-center">Request a GMC Quote</h2>
            <ContactForm source="GMC Landing Page" />
          </div>
        </div>
      </section>
    </Layout>
  );
}
