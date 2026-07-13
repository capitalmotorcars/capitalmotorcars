import { Link } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { SEO } from '@/components/SEO';
import { JsonLd, createWebPageSchema } from '@/components/JsonLd';
import { ServiceHero } from '@/components/services/ServiceHero';
import { TrustStatsBar } from '@/components/shared/TrustStatsBar';
import { ContactForm } from '@/components/forms/ContactForm';
import { Phone, ArrowRight, ShieldCheck, CheckCircle2, Zap, Landmark, BadgeDollarSign } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

export default function MitsubishiBrandPage() {
  return (
    <Layout>
      <SEO
        title="2026 Mitsubishi Lease Deals NJ & NY | Zero Down Specials"
        description="Lease a 2026 Mitsubishi in NJ & NY - Eclipse Cross, Outlander, and Outlander PHEV zero down specials. AWD innovation at broker pricing."
        seoKeywords={['2026 Mitsubishi lease deals NJ', 'Mitsubishi lease specials NY', 'zero down Mitsubishi lease', 'Mitsubishi broker NJ']}
        ogImage="https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/2017-04-02_Mitsubishi_Lancer_Evolution_X_MR_SST_14_%282%29.jpg/1280px-2017-04-02_Mitsubishi_Lancer_Evolution_X_MR_SST_14_%282%29.jpg"
        canonicalPath="/brand/mitsubishi"
      />
      <JsonLd data={[
        createWebPageSchema({
          name: "Mitsubishi Lease Deals NJ & NY",
          description: "Affordable Mitsubishi leasing broker in New Jersey offering aggressive specials.",
          url: "https://www.capitalmotorcars.com/brand/mitsubishi"
        })
      ]} />

      {/* Section 1: Hero */}
      <ServiceHero
        badge="Best Value"
        title="2026 Mitsubishi Lease Deals"
        highlightedTitle=""
        subtitle="Lease a 2026 Mitsubishi in NJ & NY - Eclipse Cross, Outlander, and Outlander PHEV zero down specials. AWD innovation at broker pricing."
        heroImage="https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/2017-04-02_Mitsubishi_Lancer_Evolution_X_MR_SST_14_%282%29.jpg/1280px-2017-04-02_Mitsubishi_Lancer_Evolution_X_MR_SST_14_%282%29.jpg"
        primaryAction={{ label: "View SUVs", href: "/vehicles/suv" }}
        secondaryAction={{ label: "Call Us", href: "tel:+12015095555", icon: Phone }}
      />
      
      {/* Section 2: Trust Stats */}
      <TrustStatsBar />

      {/* Section 3: Intro & Benefits */}
      <section className="py-16 bg-muted/10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-black uppercase mb-4">Drive Your Ambition</h2>
            <p className="text-lg text-muted-foreground">Mitsubishi builds reliable, AWD-focused vehicles with standout value. The Outlander PHEV is a remarkable achievement - the world's first and bestselling plug-in hybrid SUV, offering 38 miles of electric range, all-wheel drive, and spacious 3-row packaging at a price that redefines EV affordability.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 rounded-3xl bg-card border border-border/50 text-center flex flex-col items-center hover:border-accent transition-colors">
              <ShieldCheck className="w-12 h-12 text-accent mb-4" />
              <h3 className="text-xl font-bold mb-4">Super All-Wheel Control</h3>
              <p className="text-muted-foreground">Mitsubishi's S-AWC torque vectoring AWD system independently controls all four wheels, providing exceptional stability on snow, gravel, and slippery NJ roads.</p>
            </div>
            <div className="p-8 rounded-3xl bg-card border border-border/50 text-center flex flex-col items-center hover:border-accent transition-colors">
              <Zap className="w-12 h-12 text-accent mb-4" />
              <h3 className="text-xl font-bold mb-4">Outlander PHEV</h3>
              <p className="text-muted-foreground">The Outlander PHEV delivers 38 miles of all-electric range with a 3.8-mile EV range on battery only - reducing fuel costs dramatically for NJ commuters.</p>
            </div>
            <div className="p-8 rounded-3xl bg-card border border-border/50 text-center flex flex-col items-center hover:border-accent transition-colors">
              <CheckCircle2 className="w-12 h-12 text-accent mb-4" />
              <h3 className="text-xl font-bold mb-4">Mi-Pilot Assist</h3>
              <p className="text-muted-foreground">Mitsubishi's driver assistance system provides adaptive cruise control with lane centering for stress-free NJ highway driving.</p>
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
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/2017-04-02_Mitsubishi_Lancer_Evolution_X_MR_SST_14_%282%29.jpg/1280px-2017-04-02_Mitsubishi_Lancer_Evolution_X_MR_SST_14_%282%29.jpg" alt="Mitsubishi Heritage" className="w-full h-full object-cover" />
              </div>
            </div>
            <div className="md:w-1/2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent text-sm font-bold mb-6">
                <Landmark className="w-4 h-4" />
                Brand Heritage
              </div>
              <h2 className="text-3xl font-black uppercase mb-6">The <span className="text-accent italic">Mitsubishi</span> Legacy</h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                Mitsubishi Motors was spun off from Mitsubishi Heavy Industries in 1970, though the company's roots go back to 1917. The legendary Mitsubishi Lancer Evolution - rally car turned street legend - won 4 World Rally Championships and remains one of motorsport history's most celebrated performance cars. The Outlander PHEV, launched in 2013 and updated through 2024, pioneered the plug-in hybrid SUV segment that every major automaker has since followed.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: Models */}
      <section className="py-16 bg-muted/10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black uppercase mb-4">Popular Mitsubishi <span className="text-accent italic">Models</span></h2>
            <p className="text-muted-foreground">Explore our most requested vehicle categories for Mitsubishi.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="p-8 rounded-3xl bg-card border border-border/50 text-center hover:border-accent transition-colors">
              <h3 className="text-xl font-bold mb-4">Mitsubishi SUVs</h3>
              <p className="text-muted-foreground mb-6">Spacious, capable, and commanding. The perfect choice for families and adventure seekers.</p>
              <Link to="/vehicles/suv" className="text-accent font-bold hover:underline flex items-center justify-center gap-2">Lease Specials <ArrowRight className="w-4 h-4" /></Link>
            </div>
            <div className="p-8 rounded-3xl bg-card border border-border/50 text-center hover:border-accent transition-colors">
              <h3 className="text-xl font-bold mb-4">Mitsubishi Sedans</h3>
              <p className="text-muted-foreground mb-6">Sleek, efficient, and comfortable. Ideal for daily commuting and city driving.</p>
              <Link to="/vehicles/sedan" className="text-accent font-bold hover:underline flex items-center justify-center gap-2">Lease Specials <ArrowRight className="w-4 h-4" /></Link>
            </div>
            <div className="p-8 rounded-3xl bg-card border border-border/50 text-center hover:border-accent transition-colors">
              <h3 className="text-xl font-bold mb-4">Mitsubishi Trucks/Crossovers</h3>
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
            <h2 className="text-3xl font-black uppercase mb-6 relative z-10">Why Lease a Mitsubishi?</h2>
            <p className="text-xl text-muted-foreground relative z-10 leading-relaxed">
              Mitsubishi Financial provides accessible lease rates on the Outlander and Eclipse Cross, with the Outlander PHEV qualifying for federal EV lease credits that significantly reduce monthly payments. Mitsubishi's 10-year/100,000-mile powertrain warranty provides exceptional peace of mind well beyond any lease term.
            </p>
          </div>
        </div>
      </section>

      {/* Section 7: FAQs */}
      <section className="py-16 bg-muted/10">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black uppercase mb-4">Mitsubishi Leasing <span className="text-accent italic">FAQ</span></h2>
          </div>
          <Accordion type="single" collapsible className="w-full">
            
            <AccordionItem value="item-1" className="bg-card mb-4 rounded-xl px-6 border-none">
              <AccordionTrigger className="text-lg font-bold hover:no-underline hover:text-accent">
                What is Mitsubishi's warranty and does it apply to leases?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-base">
                Mitsubishi's industry-leading 10-year/100,000-mile powertrain warranty applies to original owners - leases receive the 5-year/60,000-mile comprehensive warranty, which covers your entire 36-month term.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-2" className="bg-card mb-4 rounded-xl px-6 border-none">
              <AccordionTrigger className="text-lg font-bold hover:no-underline hover:text-accent">
                How does the Mitsubishi Outlander PHEV charge?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-base">
                The Outlander PHEV charges on a standard Level 2 home charger to 80% in approximately 35 minutes, or via a public DC fast charger. The engine charges the battery opportunistically during driving.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-3" className="bg-card mb-4 rounded-xl px-6 border-none">
              <AccordionTrigger className="text-lg font-bold hover:no-underline hover:text-accent">
                Is the Mitsubishi Eclipse Cross good in NJ snow?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-base">
                The Eclipse Cross with S-AWC super all-wheel control is an excellent choice for NJ winter driving - its electronic AWD torque vectoring provides stability that passive AWD systems cannot match.
              </AccordionContent>
            </AccordionItem>
            
          </Accordion>
        </div>
      </section>

      {/* Section 8: Process */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-black uppercase mb-4">How to Lease a <span className="text-accent italic">Mitsubishi</span></h2>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { step: '1', title: 'Choose Your Model', desc: 'Select your preferred Mitsubishi model and trim.' },
              { step: '2', title: 'Get a Quote', desc: 'We negotiate the lowest money factor for you.' },
              { step: '3', title: 'Credit Approval', desc: 'Fast, secure credit application process.' },
              { step: '4', title: 'Free Delivery', desc: 'Your new Mitsubishi delivered to your door.' },
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
            <h2 className="text-2xl font-black uppercase mb-6 text-center">Request a Mitsubishi Quote</h2>
            <ContactForm source="Mitsubishi Landing Page" />
          </div>
        </div>
      </section>
    </Layout>
  );
}
