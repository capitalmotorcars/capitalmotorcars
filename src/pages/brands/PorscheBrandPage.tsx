import { Link } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { SEO } from '@/components/SEO';
import { JsonLd, createWebPageSchema } from '@/components/JsonLd';
import { ServiceHero } from '@/components/services/ServiceHero';
import { TrustStatsBar } from '@/components/shared/TrustStatsBar';
import { ContactForm } from '@/components/forms/ContactForm';
import { Phone, ArrowRight, ShieldCheck, CheckCircle2, Zap, Landmark, BadgeDollarSign } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

export default function PorscheBrandPage() {
  return (
    <Layout>
      <SEO
        title="2026 Porsche Lease Deals NJ & NY | Zero Down Specials"
        description="Lease a 2026 Porsche in NJ & NY - broker pricing on the Cayenne, Macan, Taycan, and 911. Zero down options available."
        seoKeywords={['2026 Porsche lease deals NJ', 'Porsche lease specials NY', 'zero down Porsche lease', 'Porsche broker NJ']}
        ogImage="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Porsche_911_No_1000000%2C_70_Years_Porsche_Sports_Car%2C_Berlin_%281X7A3888%29.jpg/1280px-Porsche_911_No_1000000%2C_70_Years_Porsche_Sports_Car%2C_Berlin_%281X7A3888%29.jpg"
        canonicalPath="/brand/porsche"
      />
      <JsonLd data={[
        createWebPageSchema({
          name: "Porsche Lease Deals NJ & NY",
          description: "Affordable Porsche leasing broker in New Jersey offering aggressive specials.",
          url: "https://www.capitalmotorcars.com/brand/porsche"
        })
      ]} />

      {/* Section 1: Hero */}
      <ServiceHero
        badge="Best Value"
        title="2026 Porsche Lease Deals"
        highlightedTitle=""
        subtitle="Lease a 2026 Porsche in NJ & NY - broker pricing on the Cayenne, Macan, Taycan, and 911. Zero down options available."
        heroImage="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Porsche_911_No_1000000%2C_70_Years_Porsche_Sports_Car%2C_Berlin_%281X7A3888%29.jpg/1280px-Porsche_911_No_1000000%2C_70_Years_Porsche_Sports_Car%2C_Berlin_%281X7A3888%29.jpg"
        primaryAction={{ label: "View SUVs", href: "/vehicles/suv" }}
        secondaryAction={{ label: "Call Us", href: "tel:+12015095555", icon: Phone }}
      />
      
      {/* Section 2: Trust Stats */}
      <TrustStatsBar />

      {/* Section 3: Intro & Benefits */}
      <section className="py-16 bg-muted/10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-black uppercase mb-4">Engineered for the Pure Thrill of Driving</h2>
            <p className="text-lg text-muted-foreground">Porsche is the only brand that builds world-class race cars and practical family SUVs with equal brilliance. Lease a Porsche through Capital Motor Cars and experience motorsport DNA in your everyday commute.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 rounded-3xl bg-card border border-border/50 text-center flex flex-col items-center hover:border-accent transition-colors">
              <ShieldCheck className="w-12 h-12 text-accent mb-4" />
              <h3 className="text-xl font-bold mb-4">Motorsport Heritage</h3>
              <p className="text-muted-foreground">24 Hours of Le Mans, Formula E, and the Nürburgring - Porsche's racing pedigree flows directly into every production model.</p>
            </div>
            <div className="p-8 rounded-3xl bg-card border border-border/50 text-center flex flex-col items-center hover:border-accent transition-colors">
              <Zap className="w-12 h-12 text-accent mb-4" />
              <h3 className="text-xl font-bold mb-4">Precision Engineering</h3>
              <p className="text-muted-foreground">From PDK dual-clutch transmissions to PASM active suspension, every Porsche system is engineered to perform at the limit.</p>
            </div>
            <div className="p-8 rounded-3xl bg-card border border-border/50 text-center flex flex-col items-center hover:border-accent transition-colors">
              <CheckCircle2 className="w-12 h-12 text-accent mb-4" />
              <h3 className="text-xl font-bold mb-4">Porsche Communication</h3>
              <p className="text-muted-foreground">The intuitive PCM infotainment system integrates Apple CarPlay, navigation, and vehicle performance data seamlessly.</p>
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
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Porsche_911_No_1000000%2C_70_Years_Porsche_Sports_Car%2C_Berlin_%281X7A3888%29.jpg/1280px-Porsche_911_No_1000000%2C_70_Years_Porsche_Sports_Car%2C_Berlin_%281X7A3888%29.jpg" alt="Porsche Heritage" className="w-full h-full object-cover" />
              </div>
            </div>
            <div className="md:w-1/2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent text-sm font-bold mb-6">
                <Landmark className="w-4 h-4" />
                Brand Heritage
              </div>
              <h2 className="text-3xl font-black uppercase mb-6">The <span className="text-accent italic">Porsche</span> Legacy</h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                Ferdinand Porsche founded the company in 1931, and his grandson Ferry Porsche created the iconic 356 in 1948. The 911, launched in 1963, became the definitive sports car - rear-engined, air-cooled, and unmistakable. Today, the Taycan EV has proven Porsche can electrify without sacrificing soul, setting lap records at Nürburgring and breaking the Nürburgring EV record.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: Models */}
      <section className="py-16 bg-muted/10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black uppercase mb-4">Popular Porsche <span className="text-accent italic">Models</span></h2>
            <p className="text-muted-foreground">Explore our most requested vehicle categories for Porsche.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="p-8 rounded-3xl bg-card border border-border/50 text-center hover:border-accent transition-colors">
              <h3 className="text-xl font-bold mb-4">Porsche SUVs</h3>
              <p className="text-muted-foreground mb-6">Spacious, capable, and commanding. The perfect choice for families and adventure seekers.</p>
              <Link to="/vehicles/suv" className="text-accent font-bold hover:underline flex items-center justify-center gap-2">Lease Specials <ArrowRight className="w-4 h-4" /></Link>
            </div>
            <div className="p-8 rounded-3xl bg-card border border-border/50 text-center hover:border-accent transition-colors">
              <h3 className="text-xl font-bold mb-4">Porsche Sedans</h3>
              <p className="text-muted-foreground mb-6">Sleek, efficient, and comfortable. Ideal for daily commuting and city driving.</p>
              <Link to="/vehicles/sedan" className="text-accent font-bold hover:underline flex items-center justify-center gap-2">Lease Specials <ArrowRight className="w-4 h-4" /></Link>
            </div>
            <div className="p-8 rounded-3xl bg-card border border-border/50 text-center hover:border-accent transition-colors">
              <h3 className="text-xl font-bold mb-4">Porsche Trucks/Crossovers</h3>
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
            <h2 className="text-3xl font-black uppercase mb-6 relative z-10">Why Lease a Porsche?</h2>
            <p className="text-xl text-muted-foreground relative z-10 leading-relaxed">
              Porsche vehicles are among the fastest-depreciating luxury cars in years 1-3, making leasing the financially optimal choice. Leasing also lets you access the Taycan or Cayenne without committing to the rapid evolution of Porsche's electric and performance technology over a multi-year ownership period.
            </p>
          </div>
        </div>
      </section>

      {/* Section 7: FAQs */}
      <section className="py-16 bg-muted/10">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black uppercase mb-4">Porsche Leasing <span className="text-accent italic">FAQ</span></h2>
          </div>
          <Accordion type="single" collapsible className="w-full">
            
            <AccordionItem value="item-1" className="bg-card mb-4 rounded-xl px-6 border-none">
              <AccordionTrigger className="text-lg font-bold hover:no-underline hover:text-accent">
                Can I customize a Porsche lease from the factory?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-base">
                Yes! Porsche's build-to-order program means you can specify your exact color, interior, and options. Capital Motor Cars will structure the lease before factory delivery.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-2" className="bg-card mb-4 rounded-xl px-6 border-none">
              <AccordionTrigger className="text-lg font-bold hover:no-underline hover:text-accent">
                What is the money factor on a Porsche lease?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-base">
                Porsche Financial Services sets money factors monthly based on the model. Our brokers track these closely to advise you on the best time to lock in your lease.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-3" className="bg-card mb-4 rounded-xl px-6 border-none">
              <AccordionTrigger className="text-lg font-bold hover:no-underline hover:text-accent">
                Does the Porsche Taycan qualify for EV tax credits?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-base">
                Yes - Taycan leases from Porsche Financial are typically eligible for the $7,500 federal EV credit applied as a cap cost reduction, significantly lowering your payment.
              </AccordionContent>
            </AccordionItem>
            
          </Accordion>
        </div>
      </section>

      {/* Section 8: Process */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-black uppercase mb-4">How to Lease a <span className="text-accent italic">Porsche</span></h2>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { step: '1', title: 'Choose Your Model', desc: 'Select your preferred Porsche model and trim.' },
              { step: '2', title: 'Get a Quote', desc: 'We negotiate the lowest money factor for you.' },
              { step: '3', title: 'Credit Approval', desc: 'Fast, secure credit application process.' },
              { step: '4', title: 'Free Delivery', desc: 'Your new Porsche delivered to your door.' },
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
            <h2 className="text-2xl font-black uppercase mb-6 text-center">Request a Porsche Quote</h2>
            <ContactForm source="Porsche Landing Page" />
          </div>
        </div>
      </section>
    </Layout>
  );
}
