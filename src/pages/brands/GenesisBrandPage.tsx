import { Link } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { SEO } from '@/components/SEO';
import { JsonLd, createWebPageSchema } from '@/components/JsonLd';
import { ServiceHero } from '@/components/services/ServiceHero';
import { TrustStatsBar } from '@/components/shared/TrustStatsBar';
import { ContactForm } from '@/components/forms/ContactForm';
import { Phone, ArrowRight, ShieldCheck, CheckCircle2, Zap, Landmark, BadgeDollarSign } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

export default function GenesisBrandPage() {
  return (
    <Layout>
      <SEO
        title="2026 Genesis Lease Deals NJ & NY | Zero Down Specials"
        description="Lease a 2026 Genesis in NJ & NY — GV80, GV70, G80, and Electrified GV80 zero down specials. Korea's ultra-luxury brand at broker pricing."
        seoKeywords={['2026 Genesis lease deals NJ', 'Genesis lease specials NY', 'zero down Genesis lease', 'Genesis broker NJ']}
        ogImage="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/Genesis_G80_IAA_2021_1X7A0229.jpg/1280px-Genesis_G80_IAA_2021_1X7A0229.jpg"
        canonicalPath="/brand/genesis"
      />
      <JsonLd data={[
        createWebPageSchema({
          name: "Genesis Lease Deals NJ & NY",
          description: "Affordable Genesis leasing broker in New Jersey offering aggressive specials.",
          url: "https://www.capitalmotorcars.com/brand/genesis"
        })
      ]} />

      {/* Section 1: Hero */}
      <ServiceHero
        badge="Best Value"
        title="2026 Genesis Lease Deals"
        highlightedTitle=""
        subtitle="Lease a 2026 Genesis in NJ & NY — GV80, GV70, G80, and Electrified GV80 zero down specials. Korea's ultra-luxury brand at broker pricing."
        heroImage="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/Genesis_G80_IAA_2021_1X7A0229.jpg/1280px-Genesis_G80_IAA_2021_1X7A0229.jpg"
        primaryAction={{ label: "View SUVs", href: "/vehicles/suv" }}
        secondaryAction={{ label: "Call Us", href: "tel:+12015095555", icon: Phone }}
      />
      
      {/* Section 2: Trust Stats */}
      <TrustStatsBar />

      {/* Section 3: Intro & Benefits */}
      <section className="py-16 bg-muted/10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-black uppercase mb-4">Luxury Evolved. Details Matter.</h2>
            <p className="text-lg text-muted-foreground">Genesis is Hyundai's ultra-luxury brand — and it's winning industry awards at a pace that embarrasses older European rivals. The GV80, GV70, and G80 offer legitimate luxury at prices well below BMW and Mercedes, while the Electrified GV80 is arguably the world's most beautiful electric SUV.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 rounded-3xl bg-card border border-border/50 text-center flex flex-col items-center hover:border-accent transition-colors">
              <ShieldCheck className="w-12 h-12 text-accent mb-4" />
              <h3 className="text-xl font-bold mb-4">Two Lines Design</h3>
              <p className="text-muted-foreground">Genesis's 'Two Lines' design language creates a cohesive, dramatic visual identity — the crest grille and quad-beam lights are instantly recognizable from any distance.</p>
            </div>
            <div className="p-8 rounded-3xl bg-card border border-border/50 text-center flex flex-col items-center hover:border-accent transition-colors">
              <Zap className="w-12 h-12 text-accent mb-4" />
              <h3 className="text-xl font-bold mb-4">Complimentary Service</h3>
              <p className="text-muted-foreground">Genesis at Home picks up your vehicle for service and returns it — with a complimentary loaner. No dealership waits, ever.</p>
            </div>
            <div className="p-8 rounded-3xl bg-card border border-border/50 text-center flex flex-col items-center hover:border-accent transition-colors">
              <CheckCircle2 className="w-12 h-12 text-accent mb-4" />
              <h3 className="text-xl font-bold mb-4">Genesis Digital Key 2</h3>
              <p className="text-muted-foreground">Ultra-wideband Digital Key 2 allows hands-free approach-and-go without removing your phone — a level of technology typically reserved for $100,000+ vehicles.</p>
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
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/Genesis_G80_IAA_2021_1X7A0229.jpg/1280px-Genesis_G80_IAA_2021_1X7A0229.jpg" alt="Genesis Heritage" className="w-full h-full object-cover" />
              </div>
            </div>
            <div className="md:w-1/2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent text-sm font-bold mb-6">
                <Landmark className="w-4 h-4" />
                Brand Heritage
              </div>
              <h2 className="text-3xl font-black uppercase mb-6">The <span className="text-accent italic">Genesis</span> Legacy</h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                Genesis was launched as an independent luxury brand by Hyundai in 2015, though the name first appeared on the Hyundai Genesis sedan in 2008. Under Chief Designer Luc Donckerwolke (former head of Bentley, Lamborghini, and Audi design), Genesis developed a cohesive luxury identity. The GV80 winning World Car Design of the Year and GV70 taking World Car of the Year confirm Genesis's arrival as a genuine global luxury contender.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: Models */}
      <section className="py-16 bg-muted/10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black uppercase mb-4">Popular Genesis <span className="text-accent italic">Models</span></h2>
            <p className="text-muted-foreground">Explore our most requested vehicle categories for Genesis.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="p-8 rounded-3xl bg-card border border-border/50 text-center hover:border-accent transition-colors">
              <h3 className="text-xl font-bold mb-4">Genesis SUVs</h3>
              <p className="text-muted-foreground mb-6">Spacious, capable, and commanding. The perfect choice for families and adventure seekers.</p>
              <Link to="/vehicles/suv" className="text-accent font-bold hover:underline flex items-center justify-center gap-2">Lease Specials <ArrowRight className="w-4 h-4" /></Link>
            </div>
            <div className="p-8 rounded-3xl bg-card border border-border/50 text-center hover:border-accent transition-colors">
              <h3 className="text-xl font-bold mb-4">Genesis Sedans</h3>
              <p className="text-muted-foreground mb-6">Sleek, efficient, and comfortable. Ideal for daily commuting and city driving.</p>
              <Link to="/vehicles/sedan" className="text-accent font-bold hover:underline flex items-center justify-center gap-2">Lease Specials <ArrowRight className="w-4 h-4" /></Link>
            </div>
            <div className="p-8 rounded-3xl bg-card border border-border/50 text-center hover:border-accent transition-colors">
              <h3 className="text-xl font-bold mb-4">Genesis Trucks/Crossovers</h3>
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
            <h2 className="text-3xl font-black uppercase mb-6 relative z-10">Why Lease a Genesis?</h2>
            <p className="text-xl text-muted-foreground relative z-10 leading-relaxed">
              Genesis offers some of the best lease values in the luxury segment — Hyundai Motor Finance provides competitive money factors, while Genesis's complimentary maintenance program (10 years/unlimited miles for annual service) makes the total cost of lease ownership extremely compelling compared to BMW and Mercedes.
            </p>
          </div>
        </div>
      </section>

      {/* Section 7: FAQs */}
      <section className="py-16 bg-muted/10">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black uppercase mb-4">Genesis Leasing <span className="text-accent italic">FAQ</span></h2>
          </div>
          <Accordion type="single" collapsible className="w-full">
            
            <AccordionItem value="item-1" className="bg-card mb-4 rounded-xl px-6 border-none">
              <AccordionTrigger className="text-lg font-bold hover:no-underline hover:text-accent">
                How does the Genesis GV80 compare to a BMW X5?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-base">
                The GV80 matches the X5 on space, offers a more dramatic design, provides standard complimentary maintenance, and typically leases for $150-200 less per month — making it outstanding luxury lease value.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-2" className="bg-card mb-4 rounded-xl px-6 border-none">
              <AccordionTrigger className="text-lg font-bold hover:no-underline hover:text-accent">
                What is Genesis complimentary maintenance?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-base">
                Genesis provides 3 years of complimentary scheduled maintenance including oil changes and tire rotations — plus their unique valet pickup service where they collect and return your vehicle.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-3" className="bg-card mb-4 rounded-xl px-6 border-none">
              <AccordionTrigger className="text-lg font-bold hover:no-underline hover:text-accent">
                Is the Electrified Genesis GV80 worth leasing?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-base">
                The Electrified GV80 Coupe won World Car Design of the Year 2024 and delivers 483hp with 300+ miles of range. It qualifies for EV lease incentives and represents exceptional design-forward EV value.
              </AccordionContent>
            </AccordionItem>
            
          </Accordion>
        </div>
      </section>

      {/* Section 8: Process */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-black uppercase mb-4">How to Lease a <span className="text-accent italic">Genesis</span></h2>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { step: '1', title: 'Choose Your Model', desc: 'Select your preferred Genesis model and trim.' },
              { step: '2', title: 'Get a Quote', desc: 'We negotiate the lowest money factor for you.' },
              { step: '3', title: 'Credit Approval', desc: 'Fast, secure credit application process.' },
              { step: '4', title: 'Free Delivery', desc: 'Your new Genesis delivered to your door.' },
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
            <h2 className="text-2xl font-black uppercase mb-6 text-center">Request a Genesis Quote</h2>
            <ContactForm source="Genesis Landing Page" />
          </div>
        </div>
      </section>
    </Layout>
  );
}
