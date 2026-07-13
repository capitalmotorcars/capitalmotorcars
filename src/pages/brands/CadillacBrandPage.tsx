import { Link } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { SEO } from '@/components/SEO';
import { JsonLd, createWebPageSchema } from '@/components/JsonLd';
import { ServiceHero } from '@/components/services/ServiceHero';
import { TrustStatsBar } from '@/components/shared/TrustStatsBar';
import { ContactForm } from '@/components/forms/ContactForm';
import { Phone, ArrowRight, ShieldCheck, CheckCircle2, Zap, Landmark, BadgeDollarSign } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

export default function CadillacBrandPage() {
  return (
    <Layout>
      <SEO
        title="2026 Cadillac Lease Deals NJ & NY | Zero Down Specials"
        description="Lease a 2026 Cadillac in NJ & NY - Escalade, XT5, and Lyriq zero down specials. American luxury at its finest with broker pricing."
        seoKeywords={['2026 Cadillac lease deals NJ', 'Cadillac lease specials NY', 'zero down Cadillac lease', 'Cadillac broker NJ']}
        ogImage="https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/2021_Cadillac_Escalade_ESV_4WD_Premium_Luxury_in_Satin_Steel_Metallic%2C_front_right.jpg/1280px-2021_Cadillac_Escalade_ESV_4WD_Premium_Luxury_in_Satin_Steel_Metallic%2C_front_right.jpg"
        canonicalPath="/brand/cadillac"
      />
      <JsonLd data={[
        createWebPageSchema({
          name: "Cadillac Lease Deals NJ & NY",
          description: "Affordable Cadillac leasing broker in New Jersey offering aggressive specials.",
          url: "https://www.capitalmotorcars.com/brand/cadillac"
        })
      ]} />

      {/* Section 1: Hero */}
      <ServiceHero
        badge="Best Value"
        title="2026 Cadillac Lease Deals"
        highlightedTitle=""
        subtitle="Lease a 2026 Cadillac in NJ & NY - Escalade, XT5, and Lyriq zero down specials. American luxury at its finest with broker pricing."
        heroImage="https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/2021_Cadillac_Escalade_ESV_4WD_Premium_Luxury_in_Satin_Steel_Metallic%2C_front_right.jpg/1280px-2021_Cadillac_Escalade_ESV_4WD_Premium_Luxury_in_Satin_Steel_Metallic%2C_front_right.jpg"
        primaryAction={{ label: "View SUVs", href: "/vehicles/suv" }}
        secondaryAction={{ label: "Call Us", href: "tel:+12015095555", icon: Phone }}
      />
      
      {/* Section 2: Trust Stats */}
      <TrustStatsBar />

      {/* Section 3: Intro & Benefits */}
      <section className="py-16 bg-muted/10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-black uppercase mb-4">American Luxury Reimagined</h2>
            <p className="text-lg text-muted-foreground">Cadillac represents the pinnacle of American automotive luxury - combining bold Art & Science design with advanced technology including Super Cruise hands-free driving. The Escalade, XT5, and electric Lyriq offer an unmatched combination of presence and technology.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 rounded-3xl bg-card border border-border/50 text-center flex flex-col items-center hover:border-accent transition-colors">
              <ShieldCheck className="w-12 h-12 text-accent mb-4" />
              <h3 className="text-xl font-bold mb-4">Super Cruise™</h3>
              <p className="text-muted-foreground">Cadillac's hands-free driving technology is the industry's first true hands-free system - available on 200,000+ miles of compatible North American highways.</p>
            </div>
            <div className="p-8 rounded-3xl bg-card border border-border/50 text-center flex flex-col items-center hover:border-accent transition-colors">
              <Zap className="w-12 h-12 text-accent mb-4" />
              <h3 className="text-xl font-bold mb-4">AKG Studio Audio</h3>
              <p className="text-muted-foreground">The AKG 36-speaker audio system in the Escalade delivers reference-quality studio sound with tri-dimensional placement technology.</p>
            </div>
            <div className="p-8 rounded-3xl bg-card border border-border/50 text-center flex flex-col items-center hover:border-accent transition-colors">
              <CheckCircle2 className="w-12 h-12 text-accent mb-4" />
              <h3 className="text-xl font-bold mb-4">CT6 Night Vision</h3>
              <p className="text-muted-foreground">Available night vision with pedestrian and animal detection provides an unmatched safety advantage during nighttime driving.</p>
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
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/2021_Cadillac_Escalade_ESV_4WD_Premium_Luxury_in_Satin_Steel_Metallic%2C_front_right.jpg/1280px-2021_Cadillac_Escalade_ESV_4WD_Premium_Luxury_in_Satin_Steel_Metallic%2C_front_right.jpg" alt="Cadillac Heritage" className="w-full h-full object-cover" />
              </div>
            </div>
            <div className="md:w-1/2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent text-sm font-bold mb-6">
                <Landmark className="w-4 h-4" />
                Brand Heritage
              </div>
              <h2 className="text-3xl font-black uppercase mb-6">The <span className="text-accent italic">Cadillac</span> Legacy</h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                Founded in 1902 and named after the French explorer who founded Detroit, Cadillac was known as 'The Standard of the World' for decades. From introducing the electric self-starter in 1912 to pioneering V8 engines, Cadillac has always led American automotive technology. The Super Cruise hands-free system now positions Cadillac at the forefront of the next autonomous driving revolution.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: Models */}
      <section className="py-16 bg-muted/10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black uppercase mb-4">Popular Cadillac <span className="text-accent italic">Models</span></h2>
            <p className="text-muted-foreground">Explore our most requested vehicle categories for Cadillac.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="p-8 rounded-3xl bg-card border border-border/50 text-center hover:border-accent transition-colors">
              <h3 className="text-xl font-bold mb-4">Cadillac SUVs</h3>
              <p className="text-muted-foreground mb-6">Spacious, capable, and commanding. The perfect choice for families and adventure seekers.</p>
              <Link to="/vehicles/suv" className="text-accent font-bold hover:underline flex items-center justify-center gap-2">Lease Specials <ArrowRight className="w-4 h-4" /></Link>
            </div>
            <div className="p-8 rounded-3xl bg-card border border-border/50 text-center hover:border-accent transition-colors">
              <h3 className="text-xl font-bold mb-4">Cadillac Sedans</h3>
              <p className="text-muted-foreground mb-6">Sleek, efficient, and comfortable. Ideal for daily commuting and city driving.</p>
              <Link to="/vehicles/sedan" className="text-accent font-bold hover:underline flex items-center justify-center gap-2">Lease Specials <ArrowRight className="w-4 h-4" /></Link>
            </div>
            <div className="p-8 rounded-3xl bg-card border border-border/50 text-center hover:border-accent transition-colors">
              <h3 className="text-xl font-bold mb-4">Cadillac Trucks/Crossovers</h3>
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
            <h2 className="text-3xl font-black uppercase mb-6 relative z-10">Why Lease a Cadillac?</h2>
            <p className="text-xl text-muted-foreground relative z-10 leading-relaxed">
              Cadillac's Super Cruise technology, Lyriq electric platform, and continuously updated OLED displays evolve rapidly. Leasing ensures you always access the latest technology generation, while GM Financial typically offers strong Cadillac lease support with competitive residual values on popular models like the XT5 and Escalade.
            </p>
          </div>
        </div>
      </section>

      {/* Section 7: FAQs */}
      <section className="py-16 bg-muted/10">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black uppercase mb-4">Cadillac Leasing <span className="text-accent italic">FAQ</span></h2>
          </div>
          <Accordion type="single" collapsible className="w-full">
            
            <AccordionItem value="item-1" className="bg-card mb-4 rounded-xl px-6 border-none">
              <AccordionTrigger className="text-lg font-bold hover:no-underline hover:text-accent">
                What makes Cadillac Super Cruise different from Tesla Autopilot?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-base">
                Super Cruise uses LiDAR-mapped roads combined with eye-tracking technology to confirm driver attention - making it genuinely hands-free on compatible highways in a way most competitors cannot match.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-2" className="bg-card mb-4 rounded-xl px-6 border-none">
              <AccordionTrigger className="text-lg font-bold hover:no-underline hover:text-accent">
                Is the Cadillac Lyriq a good lease option?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-base">
                The Lyriq is an excellent lease vehicle - it qualifies for the $7,500 federal EV credit applied to the lease, significantly reducing monthly payments on this stunning electric SUV.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-3" className="bg-card mb-4 rounded-xl px-6 border-none">
              <AccordionTrigger className="text-lg font-bold hover:no-underline hover:text-accent">
                How big is the Cadillac Escalade?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-base">
                The standard Escalade offers 72.6 cubic feet of cargo space with the ESV extended version offering even more. It seats up to 8 passengers in supreme comfort with available rear entertainment.
              </AccordionContent>
            </AccordionItem>
            
          </Accordion>
        </div>
      </section>

      {/* Section 8: Process */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-black uppercase mb-4">How to Lease a <span className="text-accent italic">Cadillac</span></h2>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { step: '1', title: 'Choose Your Model', desc: 'Select your preferred Cadillac model and trim.' },
              { step: '2', title: 'Get a Quote', desc: 'We negotiate the lowest money factor for you.' },
              { step: '3', title: 'Credit Approval', desc: 'Fast, secure credit application process.' },
              { step: '4', title: 'Free Delivery', desc: 'Your new Cadillac delivered to your door.' },
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
            <h2 className="text-2xl font-black uppercase mb-6 text-center">Request a Cadillac Quote</h2>
            <ContactForm source="Cadillac Landing Page" />
          </div>
        </div>
      </section>
    </Layout>
  );
}
