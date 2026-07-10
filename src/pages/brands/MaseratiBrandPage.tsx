import { Link } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { SEO } from '@/components/SEO';
import { JsonLd, createWebPageSchema } from '@/components/JsonLd';
import { ServiceHero } from '@/components/services/ServiceHero';
import { TrustStatsBar } from '@/components/shared/TrustStatsBar';
import { ContactForm } from '@/components/forms/ContactForm';
import { Phone, ArrowRight, ShieldCheck, CheckCircle2, Zap, Landmark, BadgeDollarSign } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

export default function MaseratiBrandPage() {
  return (
    <Layout>
      <SEO
        title="2026 Maserati Lease Deals NJ & NY | Zero Down Specials"
        description="Lease a 2026 Maserati in NJ & NY - Ghibli, Levante, and Grecale zero down specials. Italian grand touring at broker pricing."
        seoKeywords={['2026 Maserati lease deals NJ', 'Maserati lease specials NY', 'zero down Maserati lease', 'Maserati broker NJ']}
        ogImage="https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/Maserati_GranTurismo_Trofeo_1X7A0828.jpg/1280px-Maserati_GranTurismo_Trofeo_1X7A0828.jpg"
        canonicalPath="/brand/maserati"
      />
      <JsonLd data={[
        createWebPageSchema({
          name: "Maserati Lease Deals NJ & NY",
          description: "Affordable Maserati leasing broker in New Jersey offering aggressive specials.",
          url: "https://www.capitalmotorcars.com/brand/maserati"
        })
      ]} />

      {/* Section 1: Hero */}
      <ServiceHero
        badge="Best Value"
        title="2026 Maserati Lease Deals"
        highlightedTitle=""
        subtitle="Lease a 2026 Maserati in NJ & NY - Ghibli, Levante, and Grecale zero down specials. Italian grand touring at broker pricing."
        heroImage="https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/Maserati_GranTurismo_Trofeo_1X7A0828.jpg/1280px-Maserati_GranTurismo_Trofeo_1X7A0828.jpg"
        primaryAction={{ label: "View SUVs", href: "/vehicles/suv" }}
        secondaryAction={{ label: "Call Us", href: "tel:+12015095555", icon: Phone }}
      />
      
      {/* Section 2: Trust Stats */}
      <TrustStatsBar />

      {/* Section 3: Intro & Benefits */}
      <section className="py-16 bg-muted/10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-black uppercase mb-4">Excellence Through Passion</h2>
            <p className="text-lg text-muted-foreground">Maserati creates grand touring automobiles of exceptional character - Italian design, Ferrari-connected V6 engines, and a heritage stretching back to 1914 Bologna. The Ghibli, Levante, and new Grecale provide distinctive Italian alternatives to German luxury with captivating personality.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 rounded-3xl bg-card border border-border/50 text-center flex flex-col items-center hover:border-accent transition-colors">
              <ShieldCheck className="w-12 h-12 text-accent mb-4" />
              <h3 className="text-xl font-bold mb-4">Ferrari-Built Engines</h3>
              <p className="text-muted-foreground">The Maserati Nettuno twin-turbo V6 was developed alongside Ferrari - delivering 490hp with a unique pre-chamber combustion system derived from Formula 1.</p>
            </div>
            <div className="p-8 rounded-3xl bg-card border border-border/50 text-center flex flex-col items-center hover:border-accent transition-colors">
              <Zap className="w-12 h-12 text-accent mb-4" />
              <h3 className="text-xl font-bold mb-4">Italian Grand Touring</h3>
              <p className="text-muted-foreground">Maserati's long-wheelbase proportions and GT-oriented chassis tuning prioritize long-distance comfort and effortless highway cruising.</p>
            </div>
            <div className="p-8 rounded-3xl bg-card border border-border/50 text-center flex flex-col items-center hover:border-accent transition-colors">
              <CheckCircle2 className="w-12 h-12 text-accent mb-4" />
              <h3 className="text-xl font-bold mb-4">Sonus Faber Audio</h3>
              <p className="text-muted-foreground">Maserati's optional Sonus Faber audio system is developed by Italy's finest high-fidelity loudspeaker manufacturer - an audiophile experience on wheels.</p>
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
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/Maserati_GranTurismo_Trofeo_1X7A0828.jpg/1280px-Maserati_GranTurismo_Trofeo_1X7A0828.jpg" alt="Maserati Heritage" className="w-full h-full object-cover" />
              </div>
            </div>
            <div className="md:w-1/2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent text-sm font-bold mb-6">
                <Landmark className="w-4 h-4" />
                Brand Heritage
              </div>
              <h2 className="text-3xl font-black uppercase mb-6">The <span className="text-accent italic">Maserati</span> Legacy</h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                The Maserati brothers founded the company in Bologna in 1914, initially building racing cars. The iconic trident logo was inspired by Neptune's trident in Bologna's Piazza Maggiore fountain. Maserati has won 9 World Sportscar Championships and supplied 250F Formula 1 cars. Today, the Grecale Trofeo and MC20 supercar signal a new performance renaissance for this storied Italian brand.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: Models */}
      <section className="py-16 bg-muted/10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black uppercase mb-4">Popular Maserati <span className="text-accent italic">Models</span></h2>
            <p className="text-muted-foreground">Explore our most requested vehicle categories for Maserati.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="p-8 rounded-3xl bg-card border border-border/50 text-center hover:border-accent transition-colors">
              <h3 className="text-xl font-bold mb-4">Maserati SUVs</h3>
              <p className="text-muted-foreground mb-6">Spacious, capable, and commanding. The perfect choice for families and adventure seekers.</p>
              <Link to="/vehicles/suv" className="text-accent font-bold hover:underline flex items-center justify-center gap-2">Lease Specials <ArrowRight className="w-4 h-4" /></Link>
            </div>
            <div className="p-8 rounded-3xl bg-card border border-border/50 text-center hover:border-accent transition-colors">
              <h3 className="text-xl font-bold mb-4">Maserati Sedans</h3>
              <p className="text-muted-foreground mb-6">Sleek, efficient, and comfortable. Ideal for daily commuting and city driving.</p>
              <Link to="/vehicles/sedan" className="text-accent font-bold hover:underline flex items-center justify-center gap-2">Lease Specials <ArrowRight className="w-4 h-4" /></Link>
            </div>
            <div className="p-8 rounded-3xl bg-card border border-border/50 text-center hover:border-accent transition-colors">
              <h3 className="text-xl font-bold mb-4">Maserati Trucks/Crossovers</h3>
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
            <h2 className="text-3xl font-black uppercase mb-6 relative z-10">Why Lease a Maserati?</h2>
            <p className="text-xl text-muted-foreground relative z-10 leading-relaxed">
              Maserati offers attractive lease incentives through Stellantis Financial - the Grecale and Ghibli particularly benefit from aggressive money factors and competitive residuals. Italian vehicles can have higher maintenance costs, making leasing under warranty the financially prudent choice for NJ & NY drivers.
            </p>
          </div>
        </div>
      </section>

      {/* Section 7: FAQs */}
      <section className="py-16 bg-muted/10">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black uppercase mb-4">Maserati Leasing <span className="text-accent italic">FAQ</span></h2>
          </div>
          <Accordion type="single" collapsible className="w-full">
            
            <AccordionItem value="item-1" className="bg-card mb-4 rounded-xl px-6 border-none">
              <AccordionTrigger className="text-lg font-bold hover:no-underline hover:text-accent">
                Is Maserati reliable enough for daily use in NJ?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-base">
                Modern Maserati models built after 2019 have shown substantially improved reliability. Leasing keeps you fully covered under warranty, eliminating any reliability concerns during your ownership period.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-2" className="bg-card mb-4 rounded-xl px-6 border-none">
              <AccordionTrigger className="text-lg font-bold hover:no-underline hover:text-accent">
                How does the Maserati Levante compare to a Porsche Cayenne?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-base">
                The Levante offers more dramatic Italian styling and a more sonorous soundtrack. The Cayenne leads on technology integration and driver engagement. Both are excellent - the choice comes down to character preference.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-3" className="bg-card mb-4 rounded-xl px-6 border-none">
              <AccordionTrigger className="text-lg font-bold hover:no-underline hover:text-accent">
                What is the Maserati Grecale?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-base">
                The Grecale is Maserati's compact luxury SUV competing with the Porsche Macan and BMW X3. Available with mild-hybrid or the 490hp Trofeo V6, it's our fastest-growing lease model in NJ.
              </AccordionContent>
            </AccordionItem>
            
          </Accordion>
        </div>
      </section>

      {/* Section 8: Process */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-black uppercase mb-4">How to Lease a <span className="text-accent italic">Maserati</span></h2>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { step: '1', title: 'Choose Your Model', desc: 'Select your preferred Maserati model and trim.' },
              { step: '2', title: 'Get a Quote', desc: 'We negotiate the lowest money factor for you.' },
              { step: '3', title: 'Credit Approval', desc: 'Fast, secure credit application process.' },
              { step: '4', title: 'Free Delivery', desc: 'Your new Maserati delivered to your door.' },
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
            <h2 className="text-2xl font-black uppercase mb-6 text-center">Request a Maserati Quote</h2>
            <ContactForm source="Maserati Landing Page" />
          </div>
        </div>
      </section>
    </Layout>
  );
}
