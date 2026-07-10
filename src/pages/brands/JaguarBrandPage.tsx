import { Link } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { SEO } from '@/components/SEO';
import { JsonLd, createWebPageSchema } from '@/components/JsonLd';
import { ServiceHero } from '@/components/services/ServiceHero';
import { TrustStatsBar } from '@/components/shared/TrustStatsBar';
import { ContactForm } from '@/components/forms/ContactForm';
import { Phone, ArrowRight, ShieldCheck, CheckCircle2, Zap, Landmark, BadgeDollarSign } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

export default function JaguarBrandPage() {
  return (
    <Layout>
      <SEO
        title="2026 Jaguar Lease Deals NJ & NY | Zero Down Specials"
        description="Lease a 2026 Jaguar in NJ & NY - F-Pace, E-Pace, and I-Pace zero down specials. British performance luxury at broker pricing."
        seoKeywords={['2026 Jaguar lease deals NJ', 'Jaguar lease specials NY', 'zero down Jaguar lease', 'Jaguar broker NJ']}
        ogImage="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/2017_Jaguar_F-Type_V6_R-Dynamic_Automatic_3.0_Front.jpg/1280px-2017_Jaguar_F-Type_V6_R-Dynamic_Automatic_3.0_Front.jpg"
        canonicalPath="/brand/jaguar"
      />
      <JsonLd data={[
        createWebPageSchema({
          name: "Jaguar Lease Deals NJ & NY",
          description: "Affordable Jaguar leasing broker in New Jersey offering aggressive specials.",
          url: "https://www.capitalmotorcars.com/brand/jaguar"
        })
      ]} />

      {/* Section 1: Hero */}
      <ServiceHero
        badge="Best Value"
        title="2026 Jaguar Lease Deals"
        highlightedTitle=""
        subtitle="Lease a 2026 Jaguar in NJ & NY - F-Pace, E-Pace, and I-Pace zero down specials. British performance luxury at broker pricing."
        heroImage="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/2017_Jaguar_F-Type_V6_R-Dynamic_Automatic_3.0_Front.jpg/1280px-2017_Jaguar_F-Type_V6_R-Dynamic_Automatic_3.0_Front.jpg"
        primaryAction={{ label: "View SUVs", href: "/vehicles/suv" }}
        secondaryAction={{ label: "Call Us", href: "tel:+12015095555", icon: Phone }}
      />
      
      {/* Section 2: Trust Stats */}
      <TrustStatsBar />

      {/* Section 3: Intro & Benefits */}
      <section className="py-16 bg-muted/10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-black uppercase mb-4">The Art of Performance</h2>
            <p className="text-lg text-muted-foreground">Jaguar builds cars for those who believe performance and beauty are inseparable. The F-Pace SUV, E-Pace crossover, and all-electric I-Pace provide distinct British character that no German or American luxury brand can replicate.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 rounded-3xl bg-card border border-border/50 text-center flex flex-col items-center hover:border-accent transition-colors">
              <ShieldCheck className="w-12 h-12 text-accent mb-4" />
              <h3 className="text-xl font-bold mb-4">Jaguar Design DNA</h3>
              <p className="text-muted-foreground">Every Jaguar carries the brand's unbroken design thread - powerful haunches, a low roofline, and the iconic leaper bonnet badge.</p>
            </div>
            <div className="p-8 rounded-3xl bg-card border border-border/50 text-center flex flex-col items-center hover:border-accent transition-colors">
              <Zap className="w-12 h-12 text-accent mb-4" />
              <h3 className="text-xl font-bold mb-4">All-Aluminum Architecture</h3>
              <p className="text-muted-foreground">Jaguar's riveted and bonded all-aluminum body is lighter and more rigid than steel - improving agility, efficiency, and crash protection simultaneously.</p>
            </div>
            <div className="p-8 rounded-3xl bg-card border border-border/50 text-center flex flex-col items-center hover:border-accent transition-colors">
              <CheckCircle2 className="w-12 h-12 text-accent mb-4" />
              <h3 className="text-xl font-bold mb-4">Meridian Sound</h3>
              <p className="text-muted-foreground">Developed with Meridian Audio's reference sound science, Jaguar's optional 825W system delivers concert-quality audio in every cabin.</p>
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
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/2017_Jaguar_F-Type_V6_R-Dynamic_Automatic_3.0_Front.jpg/1280px-2017_Jaguar_F-Type_V6_R-Dynamic_Automatic_3.0_Front.jpg" alt="Jaguar Heritage" className="w-full h-full object-cover" />
              </div>
            </div>
            <div className="md:w-1/2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent text-sm font-bold mb-6">
                <Landmark className="w-4 h-4" />
                Brand Heritage
              </div>
              <h2 className="text-3xl font-black uppercase mb-6">The <span className="text-accent italic">Jaguar</span> Legacy</h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                William Lyons founded SS Cars Limited in 1922, renaming it Jaguar after WWII. The XK120, E-Type, and XJ6 built Jaguar's reputation for beautiful, fast automobiles. The E-Type - called 'the most beautiful car ever made' by Enzo Ferrari - defines automotive design history. Today, Jaguar's I-Pace electric SUV won World Car of the Year 2019, proving the cat can hunt in a new era.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: Models */}
      <section className="py-16 bg-muted/10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black uppercase mb-4">Popular Jaguar <span className="text-accent italic">Models</span></h2>
            <p className="text-muted-foreground">Explore our most requested vehicle categories for Jaguar.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="p-8 rounded-3xl bg-card border border-border/50 text-center hover:border-accent transition-colors">
              <h3 className="text-xl font-bold mb-4">Jaguar SUVs</h3>
              <p className="text-muted-foreground mb-6">Spacious, capable, and commanding. The perfect choice for families and adventure seekers.</p>
              <Link to="/vehicles/suv" className="text-accent font-bold hover:underline flex items-center justify-center gap-2">Lease Specials <ArrowRight className="w-4 h-4" /></Link>
            </div>
            <div className="p-8 rounded-3xl bg-card border border-border/50 text-center hover:border-accent transition-colors">
              <h3 className="text-xl font-bold mb-4">Jaguar Sedans</h3>
              <p className="text-muted-foreground mb-6">Sleek, efficient, and comfortable. Ideal for daily commuting and city driving.</p>
              <Link to="/vehicles/sedan" className="text-accent font-bold hover:underline flex items-center justify-center gap-2">Lease Specials <ArrowRight className="w-4 h-4" /></Link>
            </div>
            <div className="p-8 rounded-3xl bg-card border border-border/50 text-center hover:border-accent transition-colors">
              <h3 className="text-xl font-bold mb-4">Jaguar Trucks/Crossovers</h3>
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
            <h2 className="text-3xl font-black uppercase mb-6 relative z-10">Why Lease a Jaguar?</h2>
            <p className="text-xl text-muted-foreground relative z-10 leading-relaxed">
              Jaguar's British character and performance credentials come at a premium purchase price but often with competitive lease money factors from Jaguar Financial. Leasing keeps you under Jaguar's 5-year/60,000-mile powertrain warranty while enabling you to experience new I-Pace electric or F-Pace Sport models with each lease cycle.
            </p>
          </div>
        </div>
      </section>

      {/* Section 7: FAQs */}
      <section className="py-16 bg-muted/10">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black uppercase mb-4">Jaguar Leasing <span className="text-accent italic">FAQ</span></h2>
          </div>
          <Accordion type="single" collapsible className="w-full">
            
            <AccordionItem value="item-1" className="bg-card mb-4 rounded-xl px-6 border-none">
              <AccordionTrigger className="text-lg font-bold hover:no-underline hover:text-accent">
                Is the Jaguar I-Pace a good electric SUV?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-base">
                The I-Pace won World Car of the Year 2019 and offers 292 miles of range, stunning design, and genuine sports car dynamics. It's our most distinctive electric lease option in NJ.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-2" className="bg-card mb-4 rounded-xl px-6 border-none">
              <AccordionTrigger className="text-lg font-bold hover:no-underline hover:text-accent">
                How does the Jaguar F-Pace compare to a BMW X3?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-base">
                The F-Pace has a longer wheelbase, more rear seat space, and arguably more striking design. The X3 edges it on technology features, but the F-Pace wins on character and exclusivity.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-3" className="bg-card mb-4 rounded-xl px-6 border-none">
              <AccordionTrigger className="text-lg font-bold hover:no-underline hover:text-accent">
                What warranty does Jaguar offer on leases?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-base">
                Jaguar provides a 5-year/60,000-mile powertrain warranty and a 3-year/36,000-mile comprehensive warranty - covering your entire 36-month lease with full protection.
              </AccordionContent>
            </AccordionItem>
            
          </Accordion>
        </div>
      </section>

      {/* Section 8: Process */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-black uppercase mb-4">How to Lease a <span className="text-accent italic">Jaguar</span></h2>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { step: '1', title: 'Choose Your Model', desc: 'Select your preferred Jaguar model and trim.' },
              { step: '2', title: 'Get a Quote', desc: 'We negotiate the lowest money factor for you.' },
              { step: '3', title: 'Credit Approval', desc: 'Fast, secure credit application process.' },
              { step: '4', title: 'Free Delivery', desc: 'Your new Jaguar delivered to your door.' },
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
            <h2 className="text-2xl font-black uppercase mb-6 text-center">Request a Jaguar Quote</h2>
            <ContactForm source="Jaguar Landing Page" />
          </div>
        </div>
      </section>
    </Layout>
  );
}
