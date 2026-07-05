import { Link } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { SEO } from '@/components/SEO';
import { JsonLd, createWebPageSchema } from '@/components/JsonLd';
import { ServiceHero } from '@/components/services/ServiceHero';
import { TrustStatsBar } from '@/components/shared/TrustStatsBar';
import { ContactForm } from '@/components/forms/ContactForm';
import { Phone, ArrowRight, ShieldCheck, CheckCircle2, Zap, Landmark, BadgeDollarSign } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

export default function LincolnBrandPage() {
  return (
    <Layout>
      <SEO
        title="2026 Lincoln Lease Deals NJ & NY | Zero Down Specials"
        description="Lease a 2026 Lincoln in NJ & NY — Navigator, Aviator, and Nautilus zero down specials. American quiet luxury at broker pricing."
        seoKeywords={['2026 Lincoln lease deals NJ', 'Lincoln lease specials NY', 'zero down Lincoln lease', 'Lincoln broker NJ']}
        ogImage="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/2019_Lincoln_Navigator_%27Reserve%27%2C_front_8.29.20.jpg/1280px-2019_Lincoln_Navigator_%27Reserve%27%2C_front_8.29.20.jpg"
        canonicalPath="/brand/lincoln"
      />
      <JsonLd data={[
        createWebPageSchema({
          name: "Lincoln Lease Deals NJ & NY",
          description: "Affordable Lincoln leasing broker in New Jersey offering aggressive specials.",
          url: "https://www.capitalmotorcars.com/brand/lincoln"
        })
      ]} />

      {/* Section 1: Hero */}
      <ServiceHero
        badge="Best Value"
        title="2026 Lincoln Lease Deals"
        highlightedTitle=""
        subtitle="Lease a 2026 Lincoln in NJ & NY — Navigator, Aviator, and Nautilus zero down specials. American quiet luxury at broker pricing."
        heroImage="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/2019_Lincoln_Navigator_%27Reserve%27%2C_front_8.29.20.jpg/1280px-2019_Lincoln_Navigator_%27Reserve%27%2C_front_8.29.20.jpg"
        primaryAction={{ label: "View SUVs", href: "/vehicles/suv" }}
        secondaryAction={{ label: "Call Us", href: "tel:+12015095555", icon: Phone }}
      />
      
      {/* Section 2: Trust Stats */}
      <TrustStatsBar />

      {/* Section 3: Intro & Benefits */}
      <section className="py-16 bg-muted/10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-black uppercase mb-4">Quiet Luxury. Serious Performance.</h2>
            <p className="text-lg text-muted-foreground">Lincoln has reinvented American luxury — replacing chrome excess with thoughtful design, sanctuary-like cabins, and effortless power. The Navigator, Aviator, and Nautilus offer a uniquely calm, American take on premium SUV ownership with competitive lease payments through Capital Motor Cars.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 rounded-3xl bg-card border border-border/50 text-center flex flex-col items-center hover:border-accent transition-colors">
              <ShieldCheck className="w-12 h-12 text-accent mb-4" />
              <h3 className="text-xl font-bold mb-4">Perfect Position Seating</h3>
              <p className="text-muted-foreground">Lincoln's Perfect Position seats with 30-way adjustability, massage, and active motion offer the most customizable front seat comfort in the segment.</p>
            </div>
            <div className="p-8 rounded-3xl bg-card border border-border/50 text-center flex flex-col items-center hover:border-accent transition-colors">
              <Zap className="w-12 h-12 text-accent mb-4" />
              <h3 className="text-xl font-bold mb-4">Revel Ultima Audio</h3>
              <p className="text-muted-foreground">28 speakers, a 1,400-watt amplifier, and Riveted Glass speaker panels create an acoustic environment that audiophiles choose over concert halls.</p>
            </div>
            <div className="p-8 rounded-3xl bg-card border border-border/50 text-center flex flex-col items-center hover:border-accent transition-colors">
              <CheckCircle2 className="w-12 h-12 text-accent mb-4" />
              <h3 className="text-xl font-bold mb-4">Lincoln Co-Pilot360</h3>
              <p className="text-muted-foreground">Standard suite of driver assistance including Pre-Collision Assist, Lane-Centering, and Active Park Assist for confident NJ driving.</p>
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
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/2019_Lincoln_Navigator_%27Reserve%27%2C_front_8.29.20.jpg/1280px-2019_Lincoln_Navigator_%27Reserve%27%2C_front_8.29.20.jpg" alt="Lincoln Heritage" className="w-full h-full object-cover" />
              </div>
            </div>
            <div className="md:w-1/2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent text-sm font-bold mb-6">
                <Landmark className="w-4 h-4" />
                Brand Heritage
              </div>
              <h2 className="text-3xl font-black uppercase mb-6">The <span className="text-accent italic">Lincoln</span> Legacy</h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                Lincoln was founded in 1917 and acquired by Ford Motor Company in 1922. Named after Abraham Lincoln, the brand has been the preferred transportation of US Presidents — the iconic Lincoln Continental served as the Presidential State Car for decades. Today, Lincoln's 'quiet luxury' philosophy, personalized delivery experiences, and sanctuary cabin design create a distinctly American luxury alternative to German excess.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: Models */}
      <section className="py-16 bg-muted/10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black uppercase mb-4">Popular Lincoln <span className="text-accent italic">Models</span></h2>
            <p className="text-muted-foreground">Explore our most requested vehicle categories for Lincoln.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="p-8 rounded-3xl bg-card border border-border/50 text-center hover:border-accent transition-colors">
              <h3 className="text-xl font-bold mb-4">Lincoln SUVs</h3>
              <p className="text-muted-foreground mb-6">Spacious, capable, and commanding. The perfect choice for families and adventure seekers.</p>
              <Link to="/vehicles/suv" className="text-accent font-bold hover:underline flex items-center justify-center gap-2">Lease Specials <ArrowRight className="w-4 h-4" /></Link>
            </div>
            <div className="p-8 rounded-3xl bg-card border border-border/50 text-center hover:border-accent transition-colors">
              <h3 className="text-xl font-bold mb-4">Lincoln Sedans</h3>
              <p className="text-muted-foreground mb-6">Sleek, efficient, and comfortable. Ideal for daily commuting and city driving.</p>
              <Link to="/vehicles/sedan" className="text-accent font-bold hover:underline flex items-center justify-center gap-2">Lease Specials <ArrowRight className="w-4 h-4" /></Link>
            </div>
            <div className="p-8 rounded-3xl bg-card border border-border/50 text-center hover:border-accent transition-colors">
              <h3 className="text-xl font-bold mb-4">Lincoln Trucks/Crossovers</h3>
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
            <h2 className="text-3xl font-black uppercase mb-6 relative z-10">Why Lease a Lincoln?</h2>
            <p className="text-xl text-muted-foreground relative z-10 leading-relaxed">
              Lincoln offers some of the strongest Ford Motor Credit lease incentives in the luxury segment — particularly on the Aviator and Nautilus. Competitive residual values and attractive money factors make Lincoln leases exceptionally value-driven compared to European equivalents with similar features.
            </p>
          </div>
        </div>
      </section>

      {/* Section 7: FAQs */}
      <section className="py-16 bg-muted/10">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black uppercase mb-4">Lincoln Leasing <span className="text-accent italic">FAQ</span></h2>
          </div>
          <Accordion type="single" collapsible className="w-full">
            
            <AccordionItem value="item-1" className="bg-card mb-4 rounded-xl px-6 border-none">
              <AccordionTrigger className="text-lg font-bold hover:no-underline hover:text-accent">
                How big is the Lincoln Navigator?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-base">
                The Lincoln Navigator offers 103.3 cubic feet of total cargo space in extended form, seating 8 passengers in three rows with significantly more first and second row space than a Cadillac Escalade.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-2" className="bg-card mb-4 rounded-xl px-6 border-none">
              <AccordionTrigger className="text-lg font-bold hover:no-underline hover:text-accent">
                What makes Lincoln different from Ford?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-base">
                Lincoln offers exclusive features unavailable on any Ford: Perfect Position 30-way seats, Revel Ultima audio, a personalized ownership concierge, and unique design language with no shared exterior panels.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-3" className="bg-card mb-4 rounded-xl px-6 border-none">
              <AccordionTrigger className="text-lg font-bold hover:no-underline hover:text-accent">
                Is the Lincoln Aviator plug-in hybrid worth leasing?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-base">
                The Aviator Grand Touring PHEV qualifies for EV incentives and delivers 494hp with 21 miles of electric range — making it an exceptional lease option combining luxury, performance, and efficiency.
              </AccordionContent>
            </AccordionItem>
            
          </Accordion>
        </div>
      </section>

      {/* Section 8: Process */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-black uppercase mb-4">How to Lease a <span className="text-accent italic">Lincoln</span></h2>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { step: '1', title: 'Choose Your Model', desc: 'Select your preferred Lincoln model and trim.' },
              { step: '2', title: 'Get a Quote', desc: 'We negotiate the lowest money factor for you.' },
              { step: '3', title: 'Credit Approval', desc: 'Fast, secure credit application process.' },
              { step: '4', title: 'Free Delivery', desc: 'Your new Lincoln delivered to your door.' },
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
            <h2 className="text-2xl font-black uppercase mb-6 text-center">Request a Lincoln Quote</h2>
            <ContactForm source="Lincoln Landing Page" />
          </div>
        </div>
      </section>
    </Layout>
  );
}
