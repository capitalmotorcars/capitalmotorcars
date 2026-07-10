import { Link } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { SEO } from '@/components/SEO';
import { JsonLd, createWebPageSchema } from '@/components/JsonLd';
import { ServiceHero } from '@/components/services/ServiceHero';
import { TrustStatsBar } from '@/components/shared/TrustStatsBar';
import { ContactForm } from '@/components/forms/ContactForm';
import { Phone, ArrowRight, ShieldCheck, CheckCircle2, Zap, Landmark, BadgeDollarSign } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

export default function ChryslerBrandPage() {
  return (
    <Layout>
      <SEO
        title="2026 Chrysler Lease Deals NJ & NY | Zero Down Specials"
        description="Lease a 2026 Chrysler in NJ & NY - Pacifica and Voyager zero down specials. America's most capable minivan at broker pricing."
        seoKeywords={['2026 Chrysler lease deals NJ', 'Chrysler lease specials NY', 'zero down Chrysler lease', 'Chrysler broker NJ']}
        ogImage="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/2016_Chrysler_300_Limited_AWD_front_4.22.19.jpg/1280px-2016_Chrysler_300_Limited_AWD_front_4.22.19.jpg"
        canonicalPath="/brand/chrysler"
      />
      <JsonLd data={[
        createWebPageSchema({
          name: "Chrysler Lease Deals NJ & NY",
          description: "Affordable Chrysler leasing broker in New Jersey offering aggressive specials.",
          url: "https://www.capitalmotorcars.com/brand/chrysler"
        })
      ]} />

      {/* Section 1: Hero */}
      <ServiceHero
        badge="Best Value"
        title="2026 Chrysler Lease Deals"
        highlightedTitle=""
        subtitle="Lease a 2026 Chrysler in NJ & NY - Pacifica and Voyager zero down specials. America's most capable minivan at broker pricing."
        heroImage="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/2016_Chrysler_300_Limited_AWD_front_4.22.19.jpg/1280px-2016_Chrysler_300_Limited_AWD_front_4.22.19.jpg"
        primaryAction={{ label: "View SUVs", href: "/vehicles/suv" }}
        secondaryAction={{ label: "Call Us", href: "tel:+12015095555", icon: Phone }}
      />
      
      {/* Section 2: Trust Stats */}
      <TrustStatsBar />

      {/* Section 3: Intro & Benefits */}
      <section className="py-16 bg-muted/10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-black uppercase mb-4">American Innovation on the Road</h2>
            <p className="text-lg text-muted-foreground">Chrysler invented the modern minivan in 1984 and continues to build the most capable people-movers in America. The Chrysler Pacifica PHEV - the world's only plug-in hybrid minivan - combines family practicality with fuel-saving technology for NJ & NY families.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 rounded-3xl bg-card border border-border/50 text-center flex flex-col items-center hover:border-accent transition-colors">
              <ShieldCheck className="w-12 h-12 text-accent mb-4" />
              <h3 className="text-xl font-bold mb-4">Uconnect 5 Technology</h3>
              <p className="text-muted-foreground">Chrysler's Uconnect 5 with a 10.1" touchscreen provides wireless Apple CarPlay, Android Auto, and navigation with the most intuitive interface in the minivan segment.</p>
            </div>
            <div className="p-8 rounded-3xl bg-card border border-border/50 text-center flex flex-col items-center hover:border-accent transition-colors">
              <Zap className="w-12 h-12 text-accent mb-4" />
              <h3 className="text-xl font-bold mb-4">Stow 'n Go® Seating</h3>
              <p className="text-muted-foreground">Chrysler's patented Stow 'n Go system folds all second and third row seats flat into the floor in seconds - no removal required - creating 140.5 cubic feet of cargo space.</p>
            </div>
            <div className="p-8 rounded-3xl bg-card border border-border/50 text-center flex flex-col items-center hover:border-accent transition-colors">
              <CheckCircle2 className="w-12 h-12 text-accent mb-4" />
              <h3 className="text-xl font-bold mb-4">Pacifica Hybrid PHEV</h3>
              <p className="text-muted-foreground">The Pacifica Hybrid is the world's only plug-in hybrid minivan - delivering 32 miles of pure electric range for NJ school runs before gas engine engagement.</p>
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
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/2016_Chrysler_300_Limited_AWD_front_4.22.19.jpg/1280px-2016_Chrysler_300_Limited_AWD_front_4.22.19.jpg" alt="Chrysler Heritage" className="w-full h-full object-cover" />
              </div>
            </div>
            <div className="md:w-1/2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent text-sm font-bold mb-6">
                <Landmark className="w-4 h-4" />
                Brand Heritage
              </div>
              <h2 className="text-3xl font-black uppercase mb-6">The <span className="text-accent italic">Chrysler</span> Legacy</h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                Walter Chrysler founded Chrysler Corporation in 1925 from the remnants of the Maxwell Motor Company. Chrysler introduced the first minivan - the Dodge Caravan and Plymouth Voyager - in 1984, creating an entirely new vehicle segment. The Chrysler 300 of 2005 revived the brand's American muscle identity. Today, Chrysler focuses exclusively on the Pacifica minivan - continuing its minivan heritage with plug-in hybrid technology.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: Models */}
      <section className="py-16 bg-muted/10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black uppercase mb-4">Popular Chrysler <span className="text-accent italic">Models</span></h2>
            <p className="text-muted-foreground">Explore our most requested vehicle categories for Chrysler.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="p-8 rounded-3xl bg-card border border-border/50 text-center hover:border-accent transition-colors">
              <h3 className="text-xl font-bold mb-4">Chrysler SUVs</h3>
              <p className="text-muted-foreground mb-6">Spacious, capable, and commanding. The perfect choice for families and adventure seekers.</p>
              <Link to="/vehicles/suv" className="text-accent font-bold hover:underline flex items-center justify-center gap-2">Lease Specials <ArrowRight className="w-4 h-4" /></Link>
            </div>
            <div className="p-8 rounded-3xl bg-card border border-border/50 text-center hover:border-accent transition-colors">
              <h3 className="text-xl font-bold mb-4">Chrysler Sedans</h3>
              <p className="text-muted-foreground mb-6">Sleek, efficient, and comfortable. Ideal for daily commuting and city driving.</p>
              <Link to="/vehicles/sedan" className="text-accent font-bold hover:underline flex items-center justify-center gap-2">Lease Specials <ArrowRight className="w-4 h-4" /></Link>
            </div>
            <div className="p-8 rounded-3xl bg-card border border-border/50 text-center hover:border-accent transition-colors">
              <h3 className="text-xl font-bold mb-4">Chrysler Trucks/Crossovers</h3>
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
            <h2 className="text-3xl font-black uppercase mb-6 relative z-10">Why Lease a Chrysler?</h2>
            <p className="text-xl text-muted-foreground relative z-10 leading-relaxed">
              Chrysler Capital provides competitive lease incentives on the Pacifica - particularly the Hybrid PHEV, which qualifies for EV lease credits. Minivans command strong residual values due to sustained demand, making Pacifica leases financially attractive for NJ families who need maximum passenger and cargo capacity.
            </p>
          </div>
        </div>
      </section>

      {/* Section 7: FAQs */}
      <section className="py-16 bg-muted/10">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black uppercase mb-4">Chrysler Leasing <span className="text-accent italic">FAQ</span></h2>
          </div>
          <Accordion type="single" collapsible className="w-full">
            
            <AccordionItem value="item-1" className="bg-card mb-4 rounded-xl px-6 border-none">
              <AccordionTrigger className="text-lg font-bold hover:no-underline hover:text-accent">
                Is the Chrysler Pacifica the best minivan?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-base">
                The Pacifica is widely considered the top minivan - it offers Stow 'n Go™ seating, a PHEV option, panoramic sunroof, and Uconnect 5 technology that the Toyota Sienna and Honda Odyssey cannot fully match.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-2" className="bg-card mb-4 rounded-xl px-6 border-none">
              <AccordionTrigger className="text-lg font-bold hover:no-underline hover:text-accent">
                How many miles of electric range does the Pacifica Hybrid get?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-base">
                The Pacifica Hybrid delivers 32 miles of all-electric range - enough for most NJ school runs, commutes, and errands on electricity alone before the gasoline engine engages.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-3" className="bg-card mb-4 rounded-xl px-6 border-none">
              <AccordionTrigger className="text-lg font-bold hover:no-underline hover:text-accent">
                Can I lease a Chrysler Pacifica with zero down?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-base">
                Yes - Chrysler Capital frequently offers zero-drive-off specials on the Pacifica. Contact Capital Motor Cars for current lease specials applicable in NJ & NY.
              </AccordionContent>
            </AccordionItem>
            
          </Accordion>
        </div>
      </section>

      {/* Section 8: Process */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-black uppercase mb-4">How to Lease a <span className="text-accent italic">Chrysler</span></h2>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { step: '1', title: 'Choose Your Model', desc: 'Select your preferred Chrysler model and trim.' },
              { step: '2', title: 'Get a Quote', desc: 'We negotiate the lowest money factor for you.' },
              { step: '3', title: 'Credit Approval', desc: 'Fast, secure credit application process.' },
              { step: '4', title: 'Free Delivery', desc: 'Your new Chrysler delivered to your door.' },
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
            <h2 className="text-2xl font-black uppercase mb-6 text-center">Request a Chrysler Quote</h2>
            <ContactForm source="Chrysler Landing Page" />
          </div>
        </div>
      </section>
    </Layout>
  );
}
