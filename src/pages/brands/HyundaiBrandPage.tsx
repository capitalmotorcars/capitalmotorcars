import { Link } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { SEO } from '@/components/SEO';
import { JsonLd, createWebPageSchema } from '@/components/JsonLd';
import { ServiceHero } from '@/components/services/ServiceHero';
import { TrustStatsBar } from '@/components/shared/TrustStatsBar';
import { ContactForm } from '@/components/forms/ContactForm';
import { Phone, ArrowRight, ShieldCheck, CheckCircle2, Zap, Landmark, BadgeDollarSign } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

export default function HyundaiBrandPage() {
  return (
    <Layout>
      <SEO
        title="2026 Hyundai Lease Deals NJ & NY | Zero Down Specials"
        description="Lease a 2026 Hyundai in NJ & NY — Tucson, Santa Fe, Palisade, and IONIQ 6 zero down specials. Award-winning Korean design at broker pricing."
        seoKeywords={['2026 Hyundai lease deals NJ', 'Hyundai lease specials NY', 'zero down Hyundai lease', 'Hyundai broker NJ']}
        ogImage="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/2024_Hyundai_Sonata_SEL%2C_front_right.jpg/1280px-2024_Hyundai_Sonata_SEL%2C_front_right.jpg"
        canonicalPath="/brand/hyundai"
      />
      <JsonLd data={[
        createWebPageSchema({
          name: "Hyundai Lease Deals NJ & NY",
          description: "Affordable Hyundai leasing broker in New Jersey offering aggressive specials.",
          url: "https://www.capitalmotorcars.com/brand/hyundai"
        })
      ]} />

      {/* Section 1: Hero */}
      <ServiceHero
        badge="Best Value"
        title="2026 Hyundai Lease Deals"
        highlightedTitle=""
        subtitle="Lease a 2026 Hyundai in NJ & NY — Tucson, Santa Fe, Palisade, and IONIQ 6 zero down specials. Award-winning Korean design at broker pricing."
        heroImage="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/2024_Hyundai_Sonata_SEL%2C_front_right.jpg/1280px-2024_Hyundai_Sonata_SEL%2C_front_right.jpg"
        primaryAction={{ label: "View SUVs", href: "/vehicles/suv" }}
        secondaryAction={{ label: "Call Us", href: "tel:+12015095555", icon: Phone }}
      />
      
      {/* Section 2: Trust Stats */}
      <TrustStatsBar />

      {/* Section 3: Intro & Benefits */}
      <section className="py-16 bg-muted/10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-black uppercase mb-4">Progress for Humanity</h2>
            <p className="text-lg text-muted-foreground">Hyundai has transformed from budget brand to design award winner and EV technology leader in under a decade. The Tucson, Santa Fe, Palisade, and IONIQ 6 electric sedan represent class-leading value, design, and technology for NJ & NY drivers.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 rounded-3xl bg-card border border-border/50 text-center flex flex-col items-center hover:border-accent transition-colors">
              <ShieldCheck className="w-12 h-12 text-accent mb-4" />
              <h3 className="text-xl font-bold mb-4">Hyundai SmartSense</h3>
              <p className="text-muted-foreground">Standard on every Hyundai — Forward Collision-Avoidance Assist, Lane Keeping Assist, Driver Attention Warning, and Adaptive Cruise at zero extra cost.</p>
            </div>
            <div className="p-8 rounded-3xl bg-card border border-border/50 text-center flex flex-col items-center hover:border-accent transition-colors">
              <Zap className="w-12 h-12 text-accent mb-4" />
              <h3 className="text-xl font-bold mb-4">Digital Key</h3>
              <p className="text-muted-foreground">Hyundai's Digital Key allows you to lock, unlock, start, and share your vehicle access via smartphone — an innovative feature typically reserved for luxury brands.</p>
            </div>
            <div className="p-8 rounded-3xl bg-card border border-border/50 text-center flex flex-col items-center hover:border-accent transition-colors">
              <CheckCircle2 className="w-12 h-12 text-accent mb-4" />
              <h3 className="text-xl font-bold mb-4">10-Year Powertrain Warranty</h3>
              <p className="text-muted-foreground">Hyundai's industry-leading 10-year/100,000-mile powertrain warranty provides unmatched peace of mind well beyond any lease term.</p>
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
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/2024_Hyundai_Sonata_SEL%2C_front_right.jpg/1280px-2024_Hyundai_Sonata_SEL%2C_front_right.jpg" alt="Hyundai Heritage" className="w-full h-full object-cover" />
              </div>
            </div>
            <div className="md:w-1/2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent text-sm font-bold mb-6">
                <Landmark className="w-4 h-4" />
                Brand Heritage
              </div>
              <h2 className="text-3xl font-black uppercase mb-6">The <span className="text-accent italic">Hyundai</span> Legacy</h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                Founded in 1967, Hyundai initially produced Ford-licensed vehicles before developing its own models. The 1986 Excel's success in North America shocked the automotive establishment with its exceptional value. Hyundai's acquisition of Kia and creation of Genesis luxury brand made it the third-largest automaker globally. The IONIQ 5 and 6 winning multiple World Car of the Year awards signals Hyundai's arrival at the very top of automotive excellence.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: Models */}
      <section className="py-16 bg-muted/10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black uppercase mb-4">Popular Hyundai <span className="text-accent italic">Models</span></h2>
            <p className="text-muted-foreground">Explore our most requested vehicle categories for Hyundai.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="p-8 rounded-3xl bg-card border border-border/50 text-center hover:border-accent transition-colors">
              <h3 className="text-xl font-bold mb-4">Hyundai SUVs</h3>
              <p className="text-muted-foreground mb-6">Spacious, capable, and commanding. The perfect choice for families and adventure seekers.</p>
              <Link to="/vehicles/suv" className="text-accent font-bold hover:underline flex items-center justify-center gap-2">Lease Specials <ArrowRight className="w-4 h-4" /></Link>
            </div>
            <div className="p-8 rounded-3xl bg-card border border-border/50 text-center hover:border-accent transition-colors">
              <h3 className="text-xl font-bold mb-4">Hyundai Sedans</h3>
              <p className="text-muted-foreground mb-6">Sleek, efficient, and comfortable. Ideal for daily commuting and city driving.</p>
              <Link to="/vehicles/sedan" className="text-accent font-bold hover:underline flex items-center justify-center gap-2">Lease Specials <ArrowRight className="w-4 h-4" /></Link>
            </div>
            <div className="p-8 rounded-3xl bg-card border border-border/50 text-center hover:border-accent transition-colors">
              <h3 className="text-xl font-bold mb-4">Hyundai Trucks/Crossovers</h3>
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
            <h2 className="text-3xl font-black uppercase mb-6 relative z-10">Why Lease a Hyundai?</h2>
            <p className="text-xl text-muted-foreground relative z-10 leading-relaxed">
              Hyundai Motor Finance provides outstanding lease incentives — frequently offering the most competitive money factors in the mainstream segment. The IONIQ 6 and IONIQ 5 benefit from $7,500 EV lease credits, making Hyundai EVs genuinely affordable on a monthly basis. Hyundai's strong residual values further enhance lease economics.
            </p>
          </div>
        </div>
      </section>

      {/* Section 7: FAQs */}
      <section className="py-16 bg-muted/10">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black uppercase mb-4">Hyundai Leasing <span className="text-accent italic">FAQ</span></h2>
          </div>
          <Accordion type="single" collapsible className="w-full">
            
            <AccordionItem value="item-1" className="bg-card mb-4 rounded-xl px-6 border-none">
              <AccordionTrigger className="text-lg font-bold hover:no-underline hover:text-accent">
                What is the best Hyundai to lease in NJ?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-base">
                The Hyundai Tucson Hybrid offers exceptional lease value — AWD standard, 38mpg combined, generous safety tech standard, and competitive monthly payments through Hyundai Motor Finance.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-2" className="bg-card mb-4 rounded-xl px-6 border-none">
              <AccordionTrigger className="text-lg font-bold hover:no-underline hover:text-accent">
                Is the Hyundai IONIQ 6 better than a Tesla Model 3?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-base">
                The IONIQ 6 offers faster 800V charging (10-80% in 18 minutes), a more spacious interior, and standard bidirectional charging for powering home devices — advantages in several practical categories.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-3" className="bg-card mb-4 rounded-xl px-6 border-none">
              <AccordionTrigger className="text-lg font-bold hover:no-underline hover:text-accent">
                Does Hyundai's 10-year warranty apply during a lease?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-base">
                The 5-year/60,000-mile comprehensive warranty and 10-year/100,000-mile powertrain warranty both apply — though most 36-month leases fall well within the comprehensive warranty period.
              </AccordionContent>
            </AccordionItem>
            
          </Accordion>
        </div>
      </section>

      {/* Section 8: Process */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-black uppercase mb-4">How to Lease a <span className="text-accent italic">Hyundai</span></h2>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { step: '1', title: 'Choose Your Model', desc: 'Select your preferred Hyundai model and trim.' },
              { step: '2', title: 'Get a Quote', desc: 'We negotiate the lowest money factor for you.' },
              { step: '3', title: 'Credit Approval', desc: 'Fast, secure credit application process.' },
              { step: '4', title: 'Free Delivery', desc: 'Your new Hyundai delivered to your door.' },
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
            <h2 className="text-2xl font-black uppercase mb-6 text-center">Request a Hyundai Quote</h2>
            <ContactForm source="Hyundai Landing Page" />
          </div>
        </div>
      </section>
    </Layout>
  );
}
