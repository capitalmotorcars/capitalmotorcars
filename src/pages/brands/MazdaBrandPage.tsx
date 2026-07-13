import { Link } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { SEO } from '@/components/SEO';
import { JsonLd, createWebPageSchema } from '@/components/JsonLd';
import { ServiceHero } from '@/components/services/ServiceHero';
import { TrustStatsBar } from '@/components/shared/TrustStatsBar';
import { ContactForm } from '@/components/forms/ContactForm';
import { Phone, ArrowRight, ShieldCheck, CheckCircle2, Zap, Landmark, BadgeDollarSign } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

export default function MazdaBrandPage() {
  return (
    <Layout>
      <SEO
        title="2026 Mazda Lease Deals NJ & NY | Zero Down Specials"
        description="Lease a 2026 Mazda in NJ & NY - CX-5, CX-50, Mazda3, and CX-90 zero down specials. Japanese premium design at broker pricing."
        seoKeywords={['2026 Mazda lease deals NJ', 'Mazda lease specials NY', 'zero down Mazda lease', 'Mazda broker NJ']}
        ogImage="https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Mazda_Roadster_%28MX-5%29_by_Negawa_Bridge_%28cropped%29.jpg/1280px-Mazda_Roadster_%28MX-5%29_by_Negawa_Bridge_%28cropped%29.jpg"
        canonicalPath="/brand/mazda"
      />
      <JsonLd data={[
        createWebPageSchema({
          name: "Mazda Lease Deals NJ & NY",
          description: "Affordable Mazda leasing broker in New Jersey offering aggressive specials.",
          url: "https://www.capitalmotorcars.com/brand/mazda"
        })
      ]} />

      {/* Section 1: Hero */}
      <ServiceHero
        badge="Best Value"
        title="2026 Mazda Lease Deals"
        highlightedTitle=""
        subtitle="Lease a 2026 Mazda in NJ & NY - CX-5, CX-50, Mazda3, and CX-90 zero down specials. Japanese premium design at broker pricing."
        heroImage="https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Mazda_Roadster_%28MX-5%29_by_Negawa_Bridge_%28cropped%29.jpg/1280px-Mazda_Roadster_%28MX-5%29_by_Negawa_Bridge_%28cropped%29.jpg"
        primaryAction={{ label: "View SUVs", href: "/vehicles/suv" }}
        secondaryAction={{ label: "Call Us", href: "tel:+12015095555", icon: Phone }}
      />
      
      {/* Section 2: Trust Stats */}
      <TrustStatsBar />

      {/* Section 3: Intro & Benefits */}
      <section className="py-16 bg-muted/10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-black uppercase mb-4">Zoom-Zoom. Elevated.</h2>
            <p className="text-lg text-muted-foreground">Mazda builds the most driver-focused mainstream vehicles in the world - Kodo design philosophy, SkyActiv engineering, and a commitment to handling purity that no other mainstream brand matches. The CX-5, CX-50, and Mazda3 are consistently rated among the best in their segments.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 rounded-3xl bg-card border border-border/50 text-center flex flex-col items-center hover:border-accent transition-colors">
              <ShieldCheck className="w-12 h-12 text-accent mb-4" />
              <h3 className="text-xl font-bold mb-4">Kodo Design Philosophy</h3>
              <p className="text-muted-foreground">Mazda's 'Soul of Motion' design language creates dramatically sculptural surfaces that catch light dynamically - producing a premium aesthetic that punches well above the price class.</p>
            </div>
            <div className="p-8 rounded-3xl bg-card border border-border/50 text-center flex flex-col items-center hover:border-accent transition-colors">
              <Zap className="w-12 h-12 text-accent mb-4" />
              <h3 className="text-xl font-bold mb-4">SkyActiv Technology</h3>
              <p className="text-muted-foreground">Mazda's SkyActiv engine technology extracts maximum efficiency and performance from traditional combustion - delivering class-leading fuel economy without hybrid complexity.</p>
            </div>
            <div className="p-8 rounded-3xl bg-card border border-border/50 text-center flex flex-col items-center hover:border-accent transition-colors">
              <CheckCircle2 className="w-12 h-12 text-accent mb-4" />
              <h3 className="text-xl font-bold mb-4">G-Vectoring Control Plus</h3>
              <p className="text-muted-foreground">Mazda's chassis control system subtly adjusts torque during cornering to improve steering feel and stability - creating the most natural handling in the mainstream segment.</p>
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
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Mazda_Roadster_%28MX-5%29_by_Negawa_Bridge_%28cropped%29.jpg/1280px-Mazda_Roadster_%28MX-5%29_by_Negawa_Bridge_%28cropped%29.jpg" alt="Mazda Heritage" className="w-full h-full object-cover" />
              </div>
            </div>
            <div className="md:w-1/2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent text-sm font-bold mb-6">
                <Landmark className="w-4 h-4" />
                Brand Heritage
              </div>
              <h2 className="text-3xl font-black uppercase mb-6">The <span className="text-accent italic">Mazda</span> Legacy</h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                Mazda was founded in 1920 in Hiroshima, Japan, initially manufacturing machine tools before pivoting to vehicles. Mazda is the only automaker to have successfully commercialized the rotary engine - the Wankel RX-7 and RX-8 are legendary for their unique character. The Mazda Miata (MX-5), launched in 1989, is the world's best-selling sports car with over 1.3 million units sold - proving that driver enjoyment is a universal constant.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: Models */}
      <section className="py-16 bg-muted/10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black uppercase mb-4">Popular Mazda <span className="text-accent italic">Models</span></h2>
            <p className="text-muted-foreground">Explore our most requested vehicle categories for Mazda.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="p-8 rounded-3xl bg-card border border-border/50 text-center hover:border-accent transition-colors">
              <h3 className="text-xl font-bold mb-4">Mazda SUVs</h3>
              <p className="text-muted-foreground mb-6">Spacious, capable, and commanding. The perfect choice for families and adventure seekers.</p>
              <Link to="/vehicles/suv" className="text-accent font-bold hover:underline flex items-center justify-center gap-2">Lease Specials <ArrowRight className="w-4 h-4" /></Link>
            </div>
            <div className="p-8 rounded-3xl bg-card border border-border/50 text-center hover:border-accent transition-colors">
              <h3 className="text-xl font-bold mb-4">Mazda Sedans</h3>
              <p className="text-muted-foreground mb-6">Sleek, efficient, and comfortable. Ideal for daily commuting and city driving.</p>
              <Link to="/vehicles/sedan" className="text-accent font-bold hover:underline flex items-center justify-center gap-2">Lease Specials <ArrowRight className="w-4 h-4" /></Link>
            </div>
            <div className="p-8 rounded-3xl bg-card border border-border/50 text-center hover:border-accent transition-colors">
              <h3 className="text-xl font-bold mb-4">Mazda Trucks/Crossovers</h3>
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
            <h2 className="text-3xl font-black uppercase mb-6 relative z-10">Why Lease a Mazda?</h2>
            <p className="text-xl text-muted-foreground relative z-10 leading-relaxed">
              Mazda Financial Services provides competitive lease rates on the CX-5 and CX-50 - two vehicles with excellent residual values due to Mazda's strong quality perception and low volume production approach. Mazda leases offer a premium brand experience at mainstream price points, making the effective value proposition exceptional.
            </p>
          </div>
        </div>
      </section>

      {/* Section 7: FAQs */}
      <section className="py-16 bg-muted/10">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black uppercase mb-4">Mazda Leasing <span className="text-accent italic">FAQ</span></h2>
          </div>
          <Accordion type="single" collapsible className="w-full">
            
            <AccordionItem value="item-1" className="bg-card mb-4 rounded-xl px-6 border-none">
              <AccordionTrigger className="text-lg font-bold hover:no-underline hover:text-accent">
                Is the Mazda CX-5 the best compact SUV to lease?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-base">
                The CX-5 is consistently rated the most premium-feeling compact SUV in its class. Its Kodo design, quiet cabin, and SkyActiv AWD make it our most recommended mainstream SUV lease in NJ.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-2" className="bg-card mb-4 rounded-xl px-6 border-none">
              <AccordionTrigger className="text-lg font-bold hover:no-underline hover:text-accent">
                What is the Mazda Miata like to lease?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-base">
                The Miata is pure driving joy in a lease - lightweight, precise steering, a perfect 50/50 weight balance, and available retractable hardtop (RF). It's the cheapest way to lease a true sports car.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-3" className="bg-card mb-4 rounded-xl px-6 border-none">
              <AccordionTrigger className="text-lg font-bold hover:no-underline hover:text-accent">
                Is Mazda as reliable as Toyota and Honda?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-base">
                Yes - Mazda consistently ranks among the top 3 most reliable brands in JD Power studies, often beating Toyota and Honda. Mazda's engineering focus on simplicity translates directly to reliability.
              </AccordionContent>
            </AccordionItem>
            
          </Accordion>
        </div>
      </section>

      {/* Section 8: Process */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-black uppercase mb-4">How to Lease a <span className="text-accent italic">Mazda</span></h2>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { step: '1', title: 'Choose Your Model', desc: 'Select your preferred Mazda model and trim.' },
              { step: '2', title: 'Get a Quote', desc: 'We negotiate the lowest money factor for you.' },
              { step: '3', title: 'Credit Approval', desc: 'Fast, secure credit application process.' },
              { step: '4', title: 'Free Delivery', desc: 'Your new Mazda delivered to your door.' },
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
            <h2 className="text-2xl font-black uppercase mb-6 text-center">Request a Mazda Quote</h2>
            <ContactForm source="Mazda Landing Page" />
          </div>
        </div>
      </section>
    </Layout>
  );
}
