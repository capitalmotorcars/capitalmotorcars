import { Link } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { SEO } from '@/components/SEO';
import { JsonLd, createWebPageSchema } from '@/components/JsonLd';
import { ServiceHero } from '@/components/services/ServiceHero';
import { TrustStatsBar } from '@/components/shared/TrustStatsBar';
import { ContactForm } from '@/components/forms/ContactForm';
import { Phone, ArrowRight, ShieldCheck, CheckCircle2, Zap, Landmark, BadgeDollarSign } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

export default function MercedesBenzBrandPage() {
  return (
    <Layout>
      <SEO
        title="2026 Mercedes-Benz Lease Deals NJ & NY | Zero Down Specials"
        description="Get the best 2026 Mercedes-Benz lease deals in New Jersey. Drive a new C-Class, GLE, or S-Class with zero down and low monthly payments."
        seoKeywords={['2026 Mercedes-Benz lease deals NJ', 'Mercedes-Benz lease specials NY', 'zero down Mercedes-Benz lease', 'Mercedes-Benz broker NJ']}
        ogImage="https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Mercedes-Benz_W223_IMG_6663.jpg/1280px-Mercedes-Benz_W223_IMG_6663.jpg"
        canonicalPath="/brand/mercedes-benz"
      />
      <JsonLd data={[
        createWebPageSchema({
          name: "Mercedes-Benz Lease Deals NJ & NY",
          description: "Affordable Mercedes-Benz leasing broker in New Jersey offering aggressive specials.",
          url: "https://www.capitalmotorcars.com/brand/mercedes-benz"
        })
      ]} />

      {/* Section 1: Hero */}
      <ServiceHero
        badge="Best Value"
        title="2026 Mercedes-Benz Lease Deals"
        highlightedTitle=""
        subtitle="Get the best 2026 Mercedes-Benz lease deals in New Jersey. Drive a new C-Class, GLE, or S-Class with zero down and low monthly payments."
        heroImage="https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Mercedes-Benz_W223_IMG_6663.jpg/1280px-Mercedes-Benz_W223_IMG_6663.jpg"
        primaryAction={{ label: "View SUVs", href: "/vehicles/suv" }}
        secondaryAction={{ label: "Call Us", href: "tel:+12015095555", icon: Phone }}
      />
      
      {/* Section 2: Trust Stats */}
      <TrustStatsBar />

      {/* Section 3: Intro & Benefits */}
      <section className="py-16 bg-muted/10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-black uppercase mb-4">The Best or Nothing</h2>
            <p className="text-lg text-muted-foreground">Mercedes-Benz continues to set the benchmark for automotive luxury and innovation. Lease a symbol of prestige and enjoy unparalleled refinement on every drive through New Jersey and New York.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 rounded-3xl bg-card border border-border/50 text-center flex flex-col items-center hover:border-accent transition-colors">
              <ShieldCheck className="w-12 h-12 text-accent mb-4" />
              <h3 className="text-xl font-bold mb-4">MBUX Technology</h3>
              <p className="text-muted-foreground">Interact naturally with your vehicle using the advanced Mercedes-Benz User Experience voice assistant and stunning digital displays.</p>
            </div>
            <div className="p-8 rounded-3xl bg-card border border-border/50 text-center flex flex-col items-center hover:border-accent transition-colors">
              <Zap className="w-12 h-12 text-accent mb-4" />
              <h3 className="text-xl font-bold mb-4">Unmatched Ride Quality</h3>
              <p className="text-muted-foreground">Experience the cloud-like comfort of AIRMATIC air suspension on the highways of NY and NJ, absorbing every road imperfection.</p>
            </div>
            <div className="p-8 rounded-3xl bg-card border border-border/50 text-center flex flex-col items-center hover:border-accent transition-colors">
              <CheckCircle2 className="w-12 h-12 text-accent mb-4" />
              <h3 className="text-xl font-bold mb-4">Exquisite Craftsmanship</h3>
              <p className="text-muted-foreground">From open-pore wood trims to hand-fitted leather, every detail of a Mercedes interior exudes opulent luxury.</p>
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
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Mercedes-Benz_W223_IMG_6663.jpg/1280px-Mercedes-Benz_W223_IMG_6663.jpg" alt="Mercedes-Benz Heritage" className="w-full h-full object-cover" />
              </div>
            </div>
            <div className="md:w-1/2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent text-sm font-bold mb-6">
                <Landmark className="w-4 h-4" />
                Brand Heritage
              </div>
              <h2 className="text-3xl font-black uppercase mb-6">The <span className="text-accent italic">Mercedes-Benz</span> Legacy</h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                As the inventor of the modern automobile in 1886, Mercedes-Benz represents the pinnacle of engineering excellence and safety innovation. Karl Benz's Patent Motorcar was the foundation of a legacy that now spans the C-Class, GLE, and S-Class — each a benchmark in their respective segments. Their relentless 'The Best or Nothing' motto drives every design and engineering decision.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: Models */}
      <section className="py-16 bg-muted/10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black uppercase mb-4">Popular Mercedes-Benz <span className="text-accent italic">Models</span></h2>
            <p className="text-muted-foreground">Explore our most requested vehicle categories for Mercedes-Benz.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="p-8 rounded-3xl bg-card border border-border/50 text-center hover:border-accent transition-colors">
              <h3 className="text-xl font-bold mb-4">Mercedes-Benz SUVs</h3>
              <p className="text-muted-foreground mb-6">Spacious, capable, and commanding. The perfect choice for families and adventure seekers.</p>
              <Link to="/vehicles/suv" className="text-accent font-bold hover:underline flex items-center justify-center gap-2">Lease Specials <ArrowRight className="w-4 h-4" /></Link>
            </div>
            <div className="p-8 rounded-3xl bg-card border border-border/50 text-center hover:border-accent transition-colors">
              <h3 className="text-xl font-bold mb-4">Mercedes-Benz Sedans</h3>
              <p className="text-muted-foreground mb-6">Sleek, efficient, and comfortable. Ideal for daily commuting and city driving.</p>
              <Link to="/vehicles/sedan" className="text-accent font-bold hover:underline flex items-center justify-center gap-2">Lease Specials <ArrowRight className="w-4 h-4" /></Link>
            </div>
            <div className="p-8 rounded-3xl bg-card border border-border/50 text-center hover:border-accent transition-colors">
              <h3 className="text-xl font-bold mb-4">Mercedes-Benz Trucks/Crossovers</h3>
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
            <h2 className="text-3xl font-black uppercase mb-6 relative z-10">Why Lease a Mercedes-Benz?</h2>
            <p className="text-xl text-muted-foreground relative z-10 leading-relaxed">
              A Mercedes-Benz lease lets you experience top-tier luxury at a significantly lower monthly payment than financing, while keeping you protected under a full manufacturer warranty. You'll always drive the latest MBUX technology, the newest safety features, and avoid the massive depreciation hit that hits Mercedes-Benz owners hardest in years 1-3.
            </p>
          </div>
        </div>
      </section>

      {/* Section 7: FAQs */}
      <section className="py-16 bg-muted/10">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black uppercase mb-4">Mercedes-Benz Leasing <span className="text-accent italic">FAQ</span></h2>
          </div>
          <Accordion type="single" collapsible className="w-full">
            
            <AccordionItem value="item-1" className="bg-card mb-4 rounded-xl px-6 border-none">
              <AccordionTrigger className="text-lg font-bold hover:no-underline hover:text-accent">
                Is a down payment required for a Mercedes-Benz lease?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-base">
                No! Capital Motor Cars can structure a true zero-down lease where only your first month's payment and DMV fees are due at signing — no large cash outlay needed.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-2" className="bg-card mb-4 rounded-xl px-6 border-none">
              <AccordionTrigger className="text-lg font-bold hover:no-underline hover:text-accent">
                Can I lease an AMG® model?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-base">
                Absolutely. We specialize in competitive lease structures on high-performance Mercedes-AMG® vehicles, including the C43, GLE63, and GT 63 S.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-3" className="bg-card mb-4 rounded-xl px-6 border-none">
              <AccordionTrigger className="text-lg font-bold hover:no-underline hover:text-accent">
                What happens if I go over my mileage?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-base">
                You can purchase additional miles during the lease at a discounted rate before it ends. At lease termination, any excess miles are typically billed at around $0.25/mile.
              </AccordionContent>
            </AccordionItem>
            
          </Accordion>
        </div>
      </section>

      {/* Section 8: Process */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-black uppercase mb-4">How to Lease a <span className="text-accent italic">Mercedes-Benz</span></h2>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { step: '1', title: 'Choose Your Model', desc: 'Select your preferred Mercedes-Benz model and trim.' },
              { step: '2', title: 'Get a Quote', desc: 'We negotiate the lowest money factor for you.' },
              { step: '3', title: 'Credit Approval', desc: 'Fast, secure credit application process.' },
              { step: '4', title: 'Free Delivery', desc: 'Your new Mercedes-Benz delivered to your door.' },
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
            <h2 className="text-2xl font-black uppercase mb-6 text-center">Request a Mercedes-Benz Quote</h2>
            <ContactForm source="Mercedes-Benz Landing Page" />
          </div>
        </div>
      </section>
    </Layout>
  );
}
