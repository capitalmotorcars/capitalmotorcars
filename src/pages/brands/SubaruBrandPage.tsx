import { Link } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { SEO } from '@/components/SEO';
import { JsonLd, createWebPageSchema } from '@/components/JsonLd';
import { ServiceHero } from '@/components/services/ServiceHero';
import { TrustStatsBar } from '@/components/shared/TrustStatsBar';
import { ContactForm } from '@/components/forms/ContactForm';
import { Phone, ArrowRight, ShieldCheck, CheckCircle2, Zap, Landmark, BadgeDollarSign } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

export default function SubaruBrandPage() {
  return (
    <Layout>
      <SEO
        title="2026 Subaru Lease Deals NJ & NY | Zero Down Specials"
        description="Lease a 2026 Subaru in NJ & NY — Outback, Forester, Crosstrek, and Solterra zero down specials. AWD in every model at broker pricing."
        seoKeywords={['2026 Subaru lease deals NJ', 'Subaru lease specials NY', 'zero down Subaru lease', 'Subaru broker NJ']}
        ogImage="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/2026_Subaru_Outback_Wilderness%2C_front_left%2C_05-24-2026.jpg/1280px-2026_Subaru_Outback_Wilderness%2C_front_left%2C_05-24-2026.jpg"
        canonicalPath="/brand/subaru"
      />
      <JsonLd data={[
        createWebPageSchema({
          name: "Subaru Lease Deals NJ & NY",
          description: "Affordable Subaru leasing broker in New Jersey offering aggressive specials.",
          url: "https://www.capitalmotorcars.com/brand/subaru"
        })
      ]} />

      {/* Section 1: Hero */}
      <ServiceHero
        badge="Best Value"
        title="2026 Subaru Lease Deals"
        highlightedTitle=""
        subtitle="Lease a 2026 Subaru in NJ & NY — Outback, Forester, Crosstrek, and Solterra zero down specials. AWD in every model at broker pricing."
        heroImage="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/2026_Subaru_Outback_Wilderness%2C_front_left%2C_05-24-2026.jpg/1280px-2026_Subaru_Outback_Wilderness%2C_front_left%2C_05-24-2026.jpg"
        primaryAction={{ label: "View SUVs", href: "/vehicles/suv" }}
        secondaryAction={{ label: "Call Us", href: "tel:+12015095555", icon: Phone }}
      />
      
      {/* Section 2: Trust Stats */}
      <TrustStatsBar />

      {/* Section 3: Intro & Benefits */}
      <section className="py-16 bg-muted/10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-black uppercase mb-4">Love. It's What Makes a Subaru, a Subaru.</h2>
            <p className="text-lg text-muted-foreground">Subaru is the only mainstream automaker to offer standard all-wheel drive on every single vehicle they sell — a unique advantage for NJ winters. The Outback, Forester, and Crosstrek combine rugged capability with exceptional reliability and Capital Motor Cars' competitive broker lease pricing.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 rounded-3xl bg-card border border-border/50 text-center flex flex-col items-center hover:border-accent transition-colors">
              <ShieldCheck className="w-12 h-12 text-accent mb-4" />
              <h3 className="text-xl font-bold mb-4">Symmetrical AWD — Standard</h3>
              <p className="text-muted-foreground">Subaru's Symmetrical All-Wheel Drive is standard on every model — providing superior traction on NJ snow, ice, and wet roads with no extra cost or decision required.</p>
            </div>
            <div className="p-8 rounded-3xl bg-card border border-border/50 text-center flex flex-col items-center hover:border-accent transition-colors">
              <Zap className="w-12 h-12 text-accent mb-4" />
              <h3 className="text-xl font-bold mb-4">EyeSight® Driver Assist</h3>
              <p className="text-muted-foreground">Subaru's camera-based EyeSight suite provides Pre-Collision Braking, Adaptive Cruise, Lane Centering, and Sway Warning — standard on most trim levels.</p>
            </div>
            <div className="p-8 rounded-3xl bg-card border border-border/50 text-center flex flex-col items-center hover:border-accent transition-colors">
              <CheckCircle2 className="w-12 h-12 text-accent mb-4" />
              <h3 className="text-xl font-bold mb-4">BOXER Engine</h3>
              <p className="text-muted-foreground">Subaru's horizontally-opposed BOXER engine sits lower in the chassis than conventional engines, creating a lower center of gravity for improved handling and stability.</p>
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
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/2026_Subaru_Outback_Wilderness%2C_front_left%2C_05-24-2026.jpg/1280px-2026_Subaru_Outback_Wilderness%2C_front_left%2C_05-24-2026.jpg" alt="Subaru Heritage" className="w-full h-full object-cover" />
              </div>
            </div>
            <div className="md:w-1/2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent text-sm font-bold mb-6">
                <Landmark className="w-4 h-4" />
                Brand Heritage
              </div>
              <h2 className="text-3xl font-black uppercase mb-6">The <span className="text-accent italic">Subaru</span> Legacy</h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                Fuji Heavy Industries (renamed Subaru Corporation in 2017) built Japan's first aircraft engine in 1918 before pivoting to automobiles. The six-star Pleiades constellation in the Subaru logo represents the companies that merged to form Fuji Heavy Industries. Subaru's horizontal BOXER engine and symmetrical AWD philosophy — developed in the 1970s — remain defining brand attributes. Subaru's 4 World Rally Championship victories with the iconic Impreza WRX cemented their performance AWD reputation globally.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: Models */}
      <section className="py-16 bg-muted/10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black uppercase mb-4">Popular Subaru <span className="text-accent italic">Models</span></h2>
            <p className="text-muted-foreground">Explore our most requested vehicle categories for Subaru.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="p-8 rounded-3xl bg-card border border-border/50 text-center hover:border-accent transition-colors">
              <h3 className="text-xl font-bold mb-4">Subaru SUVs</h3>
              <p className="text-muted-foreground mb-6">Spacious, capable, and commanding. The perfect choice for families and adventure seekers.</p>
              <Link to="/vehicles/suv" className="text-accent font-bold hover:underline flex items-center justify-center gap-2">Lease Specials <ArrowRight className="w-4 h-4" /></Link>
            </div>
            <div className="p-8 rounded-3xl bg-card border border-border/50 text-center hover:border-accent transition-colors">
              <h3 className="text-xl font-bold mb-4">Subaru Sedans</h3>
              <p className="text-muted-foreground mb-6">Sleek, efficient, and comfortable. Ideal for daily commuting and city driving.</p>
              <Link to="/vehicles/sedan" className="text-accent font-bold hover:underline flex items-center justify-center gap-2">Lease Specials <ArrowRight className="w-4 h-4" /></Link>
            </div>
            <div className="p-8 rounded-3xl bg-card border border-border/50 text-center hover:border-accent transition-colors">
              <h3 className="text-xl font-bold mb-4">Subaru Trucks/Crossovers</h3>
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
            <h2 className="text-3xl font-black uppercase mb-6 relative z-10">Why Lease a Subaru?</h2>
            <p className="text-xl text-muted-foreground relative z-10 leading-relaxed">
              Subaru Financial Services provides competitive lease rates, and Subaru's strong used-car values — driven by the brand's loyal owner base and AWD desirability — create favorable residuals. Subaru's standard AWD on every vehicle means lessees in NJ get maximum capability without model selection complexity.
            </p>
          </div>
        </div>
      </section>

      {/* Section 7: FAQs */}
      <section className="py-16 bg-muted/10">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black uppercase mb-4">Subaru Leasing <span className="text-accent italic">FAQ</span></h2>
          </div>
          <Accordion type="single" collapsible className="w-full">
            
            <AccordionItem value="item-1" className="bg-card mb-4 rounded-xl px-6 border-none">
              <AccordionTrigger className="text-lg font-bold hover:no-underline hover:text-accent">
                Is a Subaru Outback good for NJ winters?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-base">
                The Outback is arguably the ideal NJ winter vehicle — standard Symmetrical AWD, X-Mode off-road traction control, 8.7" ground clearance, and EyeSight safety technology. It handles NJ snowstorms without drama.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-2" className="bg-card mb-4 rounded-xl px-6 border-none">
              <AccordionTrigger className="text-lg font-bold hover:no-underline hover:text-accent">
                What is Subaru EyeSight and is it reliable?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-base">
                EyeSight uses two stereo cameras for Pre-Collision Braking, Adaptive Cruise, and Lane Centering. It's widely rated among the most reliable and effective driver assistance systems available.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-3" className="bg-card mb-4 rounded-xl px-6 border-none">
              <AccordionTrigger className="text-lg font-bold hover:no-underline hover:text-accent">
                Does Subaru include maintenance with leases?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-base">
                Subaru added a complimentary maintenance plan for 2024+ models covering 2 years/24,000 miles of factory-scheduled maintenance. All leases include the 3-year/36,000-mile comprehensive warranty.
              </AccordionContent>
            </AccordionItem>
            
          </Accordion>
        </div>
      </section>

      {/* Section 8: Process */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-black uppercase mb-4">How to Lease a <span className="text-accent italic">Subaru</span></h2>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { step: '1', title: 'Choose Your Model', desc: 'Select your preferred Subaru model and trim.' },
              { step: '2', title: 'Get a Quote', desc: 'We negotiate the lowest money factor for you.' },
              { step: '3', title: 'Credit Approval', desc: 'Fast, secure credit application process.' },
              { step: '4', title: 'Free Delivery', desc: 'Your new Subaru delivered to your door.' },
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
            <h2 className="text-2xl font-black uppercase mb-6 text-center">Request a Subaru Quote</h2>
            <ContactForm source="Subaru Landing Page" />
          </div>
        </div>
      </section>
    </Layout>
  );
}
