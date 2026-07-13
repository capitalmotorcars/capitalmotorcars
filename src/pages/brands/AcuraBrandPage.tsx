import { Link } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { SEO } from '@/components/SEO';
import { JsonLd, createWebPageSchema } from '@/components/JsonLd';
import { ServiceHero } from '@/components/services/ServiceHero';
import { TrustStatsBar } from '@/components/shared/TrustStatsBar';
import { ContactForm } from '@/components/forms/ContactForm';
import { Phone, ArrowRight, ShieldCheck, CheckCircle2, Zap, Landmark, BadgeDollarSign } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

export default function AcuraBrandPage() {
  return (
    <Layout>
      <SEO
        title="2026 Acura Lease Deals NJ & NY | Zero Down Specials"
        description="Lease a 2026 Acura in NJ & NY - MDX, RDX, and TLX zero down specials. Honda reliability with luxury performance at broker prices."
        seoKeywords={['2026 Acura lease deals NJ', 'Acura lease specials NY', 'zero down Acura lease', 'Acura broker NJ']}
        ogImage="https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/AcuraNSX-05-cropped.jpg/1280px-AcuraNSX-05-cropped.jpg"
        canonicalPath="/brand/acura"
      />
      <JsonLd data={[
        createWebPageSchema({
          name: "Acura Lease Deals NJ & NY",
          description: "Affordable Acura leasing broker in New Jersey offering aggressive specials.",
          url: "https://www.capitalmotorcars.com/brand/acura"
        })
      ]} />

      {/* Section 1: Hero */}
      <ServiceHero
        badge="Best Value"
        title="2026 Acura Lease Deals"
        highlightedTitle=""
        subtitle="Lease a 2026 Acura in NJ & NY - MDX, RDX, and TLX zero down specials. Honda reliability with luxury performance at broker prices."
        heroImage="https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/AcuraNSX-05-cropped.jpg/1280px-AcuraNSX-05-cropped.jpg"
        primaryAction={{ label: "View SUVs", href: "/vehicles/suv" }}
        secondaryAction={{ label: "Call Us", href: "tel:+12015095555", icon: Phone }}
      />
      
      {/* Section 2: Trust Stats */}
      <TrustStatsBar />

      {/* Section 3: Intro & Benefits */}
      <section className="py-16 bg-muted/10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-black uppercase mb-4">Precision Crafted Performance</h2>
            <p className="text-lg text-muted-foreground">Acura delivers the perfect fusion of Japanese reliability and genuine performance luxury. The MDX and RDX are among the most value-packed leases in NJ & NY - and our broker pricing makes them even more accessible.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 rounded-3xl bg-card border border-border/50 text-center flex flex-col items-center hover:border-accent transition-colors">
              <ShieldCheck className="w-12 h-12 text-accent mb-4" />
              <h3 className="text-xl font-bold mb-4">SH-AWD Technology</h3>
              <p className="text-muted-foreground">Acura's Super Handling All-Wheel Drive actively torques between rear wheels for corner-carving capability unmatched in the segment.</p>
            </div>
            <div className="p-8 rounded-3xl bg-card border border-border/50 text-center flex flex-col items-center hover:border-accent transition-colors">
              <Zap className="w-12 h-12 text-accent mb-4" />
              <h3 className="text-xl font-bold mb-4">ELS Studio Audio</h3>
              <p className="text-muted-foreground">Concert-hall acoustic design brought to your cabin - the ELS Studio 3D sound system is a benchmark in its class.</p>
            </div>
            <div className="p-8 rounded-3xl bg-card border border-border/50 text-center flex flex-col items-center hover:border-accent transition-colors">
              <CheckCircle2 className="w-12 h-12 text-accent mb-4" />
              <h3 className="text-xl font-bold mb-4">Honda Reliability</h3>
              <p className="text-muted-foreground">Backed by Honda's legendary engineering, Acura vehicles consistently rank among the most reliable luxury vehicles on the road.</p>
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
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/AcuraNSX-05-cropped.jpg/1280px-AcuraNSX-05-cropped.jpg" alt="Acura Heritage" className="w-full h-full object-cover" />
              </div>
            </div>
            <div className="md:w-1/2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent text-sm font-bold mb-6">
                <Landmark className="w-4 h-4" />
                Brand Heritage
              </div>
              <h2 className="text-3xl font-black uppercase mb-6">The <span className="text-accent italic">Acura</span> Legacy</h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                Acura was launched by Honda in 1986 as North America's first Japanese luxury brand - beating Lexus and Infiniti to market by three years. The original Legend and Integra set benchmarks for performance and value. Today, the NSX supercar demonstrates Acura's capability at the absolute limit, while the MDX remains America's best-selling three-row luxury SUV.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: Models */}
      <section className="py-16 bg-muted/10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black uppercase mb-4">Popular Acura <span className="text-accent italic">Models</span></h2>
            <p className="text-muted-foreground">Explore our most requested vehicle categories for Acura.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="p-8 rounded-3xl bg-card border border-border/50 text-center hover:border-accent transition-colors">
              <h3 className="text-xl font-bold mb-4">Acura SUVs</h3>
              <p className="text-muted-foreground mb-6">Spacious, capable, and commanding. The perfect choice for families and adventure seekers.</p>
              <Link to="/vehicles/suv" className="text-accent font-bold hover:underline flex items-center justify-center gap-2">Lease Specials <ArrowRight className="w-4 h-4" /></Link>
            </div>
            <div className="p-8 rounded-3xl bg-card border border-border/50 text-center hover:border-accent transition-colors">
              <h3 className="text-xl font-bold mb-4">Acura Sedans</h3>
              <p className="text-muted-foreground mb-6">Sleek, efficient, and comfortable. Ideal for daily commuting and city driving.</p>
              <Link to="/vehicles/sedan" className="text-accent font-bold hover:underline flex items-center justify-center gap-2">Lease Specials <ArrowRight className="w-4 h-4" /></Link>
            </div>
            <div className="p-8 rounded-3xl bg-card border border-border/50 text-center hover:border-accent transition-colors">
              <h3 className="text-xl font-bold mb-4">Acura Trucks/Crossovers</h3>
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
            <h2 className="text-3xl font-black uppercase mb-6 relative z-10">Why Lease a Acura?</h2>
            <p className="text-xl text-muted-foreground relative z-10 leading-relaxed">
              Acura offers some of the best lease residual values in the luxury segment, thanks to Honda's strong brand reliability perception. Leasing an Acura means lower monthly payments than comparable German alternatives, with the same levels of technology and safety features, plus full warranty coverage throughout the term.
            </p>
          </div>
        </div>
      </section>

      {/* Section 7: FAQs */}
      <section className="py-16 bg-muted/10">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black uppercase mb-4">Acura Leasing <span className="text-accent italic">FAQ</span></h2>
          </div>
          <Accordion type="single" collapsible className="w-full">
            
            <AccordionItem value="item-1" className="bg-card mb-4 rounded-xl px-6 border-none">
              <AccordionTrigger className="text-lg font-bold hover:no-underline hover:text-accent">
                How does Acura SH-AWD compare to other AWD systems?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-base">
                Unlike passive AWD systems, Acura's SH-AWD actively torques power between each rear wheel independently - this enables true rear-biased handling that no other system in the class can match.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-2" className="bg-card mb-4 rounded-xl px-6 border-none">
              <AccordionTrigger className="text-lg font-bold hover:no-underline hover:text-accent">
                What is the best Acura model to lease in NJ?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-base">
                The Acura RDX A-Spec offers the best combination of lease payment, features, and driver engagement for most NJ commuters. The MDX is ideal for families needing three rows.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-3" className="bg-card mb-4 rounded-xl px-6 border-none">
              <AccordionTrigger className="text-lg font-bold hover:no-underline hover:text-accent">
                Is Acura Care maintenance included in a lease?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-base">
                Acura Care maintenance packages can be prepaid for maximum savings. All leases come with the full 4-year/50,000-mile warranty for worry-free driving.
              </AccordionContent>
            </AccordionItem>
            
          </Accordion>
        </div>
      </section>

      {/* Section 8: Process */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-black uppercase mb-4">How to Lease a <span className="text-accent italic">Acura</span></h2>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { step: '1', title: 'Choose Your Model', desc: 'Select your preferred Acura model and trim.' },
              { step: '2', title: 'Get a Quote', desc: 'We negotiate the lowest money factor for you.' },
              { step: '3', title: 'Credit Approval', desc: 'Fast, secure credit application process.' },
              { step: '4', title: 'Free Delivery', desc: 'Your new Acura delivered to your door.' },
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
            <h2 className="text-2xl font-black uppercase mb-6 text-center">Request a Acura Quote</h2>
            <ContactForm source="Acura Landing Page" />
          </div>
        </div>
      </section>
    </Layout>
  );
}
