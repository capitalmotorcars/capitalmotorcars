import { Link } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { SEO } from '@/components/SEO';
import { JsonLd, createWebPageSchema } from '@/components/JsonLd';
import { ServiceHero } from '@/components/services/ServiceHero';
import { TrustStatsBar } from '@/components/shared/TrustStatsBar';
import { ContactForm } from '@/components/forms/ContactForm';
import { Phone, ArrowRight, ShieldCheck, CheckCircle2, Zap, Landmark, BadgeDollarSign } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

export default function FordBrandPage() {
  return (
    <Layout>
      <SEO
        title="2026 Ford Lease Deals NJ & NY | Zero Down Specials"
        description="Lease a 2026 Ford in NJ & NY — Explorer, Mustang, Escape, and F-150 zero down specials. American innovation at broker pricing."
        seoKeywords={['2026 Ford lease deals NJ', 'Ford lease specials NY', 'zero down Ford lease', 'Ford broker NJ']}
        ogImage="https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/Ford_Mustang_VII_GT_Rutesheimer_Autoschau_2025_DSC_9234.jpg/1280px-Ford_Mustang_VII_GT_Rutesheimer_Autoschau_2025_DSC_9234.jpg"
        canonicalPath="/brand/ford"
      />
      <JsonLd data={[
        createWebPageSchema({
          name: "Ford Lease Deals NJ & NY",
          description: "Affordable Ford leasing broker in New Jersey offering aggressive specials.",
          url: "https://www.capitalmotorcars.com/brand/ford"
        })
      ]} />

      {/* Section 1: Hero */}
      <ServiceHero
        badge="Best Value"
        title="2026 Ford Lease Deals"
        highlightedTitle=""
        subtitle="Lease a 2026 Ford in NJ & NY — Explorer, Mustang, Escape, and F-150 zero down specials. American innovation at broker pricing."
        heroImage="https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/Ford_Mustang_VII_GT_Rutesheimer_Autoschau_2025_DSC_9234.jpg/1280px-Ford_Mustang_VII_GT_Rutesheimer_Autoschau_2025_DSC_9234.jpg"
        primaryAction={{ label: "View SUVs", href: "/vehicles/suv" }}
        secondaryAction={{ label: "Call Us", href: "tel:+12015095555", icon: Phone }}
      />
      
      {/* Section 2: Trust Stats */}
      <TrustStatsBar />

      {/* Section 3: Intro & Benefits */}
      <section className="py-16 bg-muted/10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-black uppercase mb-4">Built Ford Tough. Built for You.</h2>
            <p className="text-lg text-muted-foreground">Ford builds America's most iconic vehicles — from the Mustang sports car to the F-150 pickup and Explorer SUV. Ford's performance heritage and American manufacturing excellence make every model a compelling lease choice through Capital Motor Cars in NJ & NY.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 rounded-3xl bg-card border border-border/50 text-center flex flex-col items-center hover:border-accent transition-colors">
              <ShieldCheck className="w-12 h-12 text-accent mb-4" />
              <h3 className="text-xl font-bold mb-4">SYNC 4A Technology</h3>
              <p className="text-muted-foreground">Ford's 15.5" portrait touchscreen with wireless Apple CarPlay, wireless Android Auto, and over-the-air updates keeps technology fresh throughout your lease.</p>
            </div>
            <div className="p-8 rounded-3xl bg-card border border-border/50 text-center flex flex-col items-center hover:border-accent transition-colors">
              <Zap className="w-12 h-12 text-accent mb-4" />
              <h3 className="text-xl font-bold mb-4">BlueCruise Hands-Free</h3>
              <p className="text-muted-foreground">Ford's BlueCruise hands-free highway driving system operates on 130,000+ miles of pre-mapped North American highways.</p>
            </div>
            <div className="p-8 rounded-3xl bg-card border border-border/50 text-center flex flex-col items-center hover:border-accent transition-colors">
              <CheckCircle2 className="w-12 h-12 text-accent mb-4" />
              <h3 className="text-xl font-bold mb-4">PowerBoost Hybrid F-150</h3>
              <p className="text-muted-foreground">The F-150 PowerBoost generates 7,200W of on-board power — enough to run job site tools, home appliances, or tailgate essentials for days.</p>
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
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/Ford_Mustang_VII_GT_Rutesheimer_Autoschau_2025_DSC_9234.jpg/1280px-Ford_Mustang_VII_GT_Rutesheimer_Autoschau_2025_DSC_9234.jpg" alt="Ford Heritage" className="w-full h-full object-cover" />
              </div>
            </div>
            <div className="md:w-1/2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent text-sm font-bold mb-6">
                <Landmark className="w-4 h-4" />
                Brand Heritage
              </div>
              <h2 className="text-3xl font-black uppercase mb-6">The <span className="text-accent italic">Ford</span> Legacy</h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                Henry Ford revolutionized manufacturing in 1913 with the moving assembly line, making the Model T the world's first affordable automobile. Ford has since given us the Mustang (1964), the F-Series (America's best-selling vehicle for 47 consecutive years), and the GT40 that beat Ferrari at Le Mans. Today, the Mustang Mach-E and F-150 Lightning signal Ford's electric future without abandoning its American identity.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: Models */}
      <section className="py-16 bg-muted/10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black uppercase mb-4">Popular Ford <span className="text-accent italic">Models</span></h2>
            <p className="text-muted-foreground">Explore our most requested vehicle categories for Ford.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="p-8 rounded-3xl bg-card border border-border/50 text-center hover:border-accent transition-colors">
              <h3 className="text-xl font-bold mb-4">Ford SUVs</h3>
              <p className="text-muted-foreground mb-6">Spacious, capable, and commanding. The perfect choice for families and adventure seekers.</p>
              <Link to="/vehicles/suv" className="text-accent font-bold hover:underline flex items-center justify-center gap-2">Lease Specials <ArrowRight className="w-4 h-4" /></Link>
            </div>
            <div className="p-8 rounded-3xl bg-card border border-border/50 text-center hover:border-accent transition-colors">
              <h3 className="text-xl font-bold mb-4">Ford Sedans</h3>
              <p className="text-muted-foreground mb-6">Sleek, efficient, and comfortable. Ideal for daily commuting and city driving.</p>
              <Link to="/vehicles/sedan" className="text-accent font-bold hover:underline flex items-center justify-center gap-2">Lease Specials <ArrowRight className="w-4 h-4" /></Link>
            </div>
            <div className="p-8 rounded-3xl bg-card border border-border/50 text-center hover:border-accent transition-colors">
              <h3 className="text-xl font-bold mb-4">Ford Trucks/Crossovers</h3>
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
            <h2 className="text-3xl font-black uppercase mb-6 relative z-10">Why Lease a Ford?</h2>
            <p className="text-xl text-muted-foreground relative z-10 leading-relaxed">
              Ford Motor Credit provides strong competitive lease support on the Explorer, Escape, and Mustang Mach-E EV. The F-150 PowerBoost Hybrid and Mustang Mach-E qualify for EV incentives as leases, making them cost-competitive with conventional alternatives while delivering superior technology.
            </p>
          </div>
        </div>
      </section>

      {/* Section 7: FAQs */}
      <section className="py-16 bg-muted/10">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black uppercase mb-4">Ford Leasing <span className="text-accent italic">FAQ</span></h2>
          </div>
          <Accordion type="single" collapsible className="w-full">
            
            <AccordionItem value="item-1" className="bg-card mb-4 rounded-xl px-6 border-none">
              <AccordionTrigger className="text-lg font-bold hover:no-underline hover:text-accent">
                Is the Ford Mustang Mach-E a good electric lease?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-base">
                The Mach-E qualifies for the $7,500 federal EV credit on leases, delivers up to 312 miles of range, and provides genuinely exciting performance — making it an outstanding EV lease value.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-2" className="bg-card mb-4 rounded-xl px-6 border-none">
              <AccordionTrigger className="text-lg font-bold hover:no-underline hover:text-accent">
                What makes the Ford Explorer a good family lease?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-base">
                The Ford Explorer offers 7-seat capacity, 152.7 cubic feet total cargo space, BlueCruise hands-free driving, and the most comprehensive active safety suite in its class — ideal for NJ families.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-3" className="bg-card mb-4 rounded-xl px-6 border-none">
              <AccordionTrigger className="text-lg font-bold hover:no-underline hover:text-accent">
                Does Ford offer zero down leases?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-base">
                Ford Motor Credit frequently offers zero-down specials on the Explorer and Escape. Contact Capital Motor Cars for current Ford lease specials in NJ.
              </AccordionContent>
            </AccordionItem>
            
          </Accordion>
        </div>
      </section>

      {/* Section 8: Process */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-black uppercase mb-4">How to Lease a <span className="text-accent italic">Ford</span></h2>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { step: '1', title: 'Choose Your Model', desc: 'Select your preferred Ford model and trim.' },
              { step: '2', title: 'Get a Quote', desc: 'We negotiate the lowest money factor for you.' },
              { step: '3', title: 'Credit Approval', desc: 'Fast, secure credit application process.' },
              { step: '4', title: 'Free Delivery', desc: 'Your new Ford delivered to your door.' },
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
            <h2 className="text-2xl font-black uppercase mb-6 text-center">Request a Ford Quote</h2>
            <ContactForm source="Ford Landing Page" />
          </div>
        </div>
      </section>
    </Layout>
  );
}
