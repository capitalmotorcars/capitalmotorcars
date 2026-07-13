import { Link } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { SEO } from '@/components/SEO';
import { JsonLd, createWebPageSchema } from '@/components/JsonLd';
import { ServiceHero } from '@/components/services/ServiceHero';
import { TrustStatsBar } from '@/components/shared/TrustStatsBar';
import { ContactForm } from '@/components/forms/ContactForm';
import { Phone, ArrowRight, ShieldCheck, CheckCircle2, Zap, Landmark, BadgeDollarSign } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

export default function BuickBrandPage() {
  return (
    <Layout>
      <SEO
        title="2026 Buick Lease Deals NJ & NY | Zero Down Specials"
        description="Lease a 2026 Buick in NJ & NY - Enclave, Encore GX, and Envision zero down specials. Premium American comfort at broker pricing."
        seoKeywords={['2026 Buick lease deals NJ', 'Buick lease specials NY', 'zero down Buick lease', 'Buick broker NJ']}
        ogImage="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/2022_Buick_Enclave_%27Essense%27_%28facelift%29%2C_front_6.1.22.jpg/1280px-2022_Buick_Enclave_%27Essense%27_%28facelift%29%2C_front_6.1.22.jpg"
        canonicalPath="/brand/buick"
      />
      <JsonLd data={[
        createWebPageSchema({
          name: "Buick Lease Deals NJ & NY",
          description: "Affordable Buick leasing broker in New Jersey offering aggressive specials.",
          url: "https://www.capitalmotorcars.com/brand/buick"
        })
      ]} />

      {/* Section 1: Hero */}
      <ServiceHero
        badge="Best Value"
        title="2026 Buick Lease Deals"
        highlightedTitle=""
        subtitle="Lease a 2026 Buick in NJ & NY - Enclave, Encore GX, and Envision zero down specials. Premium American comfort at broker pricing."
        heroImage="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/2022_Buick_Enclave_%27Essense%27_%28facelift%29%2C_front_6.1.22.jpg/1280px-2022_Buick_Enclave_%27Essense%27_%28facelift%29%2C_front_6.1.22.jpg"
        primaryAction={{ label: "View SUVs", href: "/vehicles/suv" }}
        secondaryAction={{ label: "Call Us", href: "tel:+12015095555", icon: Phone }}
      />
      
      {/* Section 2: Trust Stats */}
      <TrustStatsBar />

      {/* Section 3: Intro & Benefits */}
      <section className="py-16 bg-muted/10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-black uppercase mb-4">Quiet Tuning. Unmatched Comfort.</h2>
            <p className="text-lg text-muted-foreground">Buick has reinvented itself as a modern premium brand - QuietTuning noise suppression, Bose audio, and premium interiors at mainstream prices. The Enclave, Encore GX, and Envision target buyers seeking a step above Chevrolet without full luxury pricing.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 rounded-3xl bg-card border border-border/50 text-center flex flex-col items-center hover:border-accent transition-colors">
              <ShieldCheck className="w-12 h-12 text-accent mb-4" />
              <h3 className="text-xl font-bold mb-4">QuietTuning®</h3>
              <p className="text-muted-foreground">Buick's acoustic engineering - triple-sealed doors, acoustic laminated glass, and noise-canceling technology - creates one of the quietest cabins in the mainstream segment.</p>
            </div>
            <div className="p-8 rounded-3xl bg-card border border-border/50 text-center flex flex-col items-center hover:border-accent transition-colors">
              <Zap className="w-12 h-12 text-accent mb-4" />
              <h3 className="text-xl font-bold mb-4">Available Bose Audio</h3>
              <p className="text-muted-foreground">Available Bose Performance Series 10-speaker audio system with AudioPilot noise compensation delivers premium sound regardless of road noise.</p>
            </div>
            <div className="p-8 rounded-3xl bg-card border border-border/50 text-center flex flex-col items-center hover:border-accent transition-colors">
              <CheckCircle2 className="w-12 h-12 text-accent mb-4" />
              <h3 className="text-xl font-bold mb-4">Driver Confidence Package</h3>
              <p className="text-muted-foreground">Standard safety suite includes Forward Automatic Braking, Lane Keep Assist, and following distance indicators across all Buick models.</p>
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
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/2022_Buick_Enclave_%27Essense%27_%28facelift%29%2C_front_6.1.22.jpg/1280px-2022_Buick_Enclave_%27Essense%27_%28facelift%29%2C_front_6.1.22.jpg" alt="Buick Heritage" className="w-full h-full object-cover" />
              </div>
            </div>
            <div className="md:w-1/2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent text-sm font-bold mb-6">
                <Landmark className="w-4 h-4" />
                Brand Heritage
              </div>
              <h2 className="text-3xl font-black uppercase mb-6">The <span className="text-accent italic">Buick</span> Legacy</h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                Buick is America's oldest surviving automobile brand, founded by David Dunbar Buick in 1899. Buick is also one of General Motors' founding brands - William Durant used Buick's profits to fund GM's creation in 1908. Remarkably, Buick is enormously popular in China - selling more Buicks there than in the US - making it a genuinely global premium brand with a 125-year heritage.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: Models */}
      <section className="py-16 bg-muted/10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black uppercase mb-4">Popular Buick <span className="text-accent italic">Models</span></h2>
            <p className="text-muted-foreground">Explore our most requested vehicle categories for Buick.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="p-8 rounded-3xl bg-card border border-border/50 text-center hover:border-accent transition-colors">
              <h3 className="text-xl font-bold mb-4">Buick SUVs</h3>
              <p className="text-muted-foreground mb-6">Spacious, capable, and commanding. The perfect choice for families and adventure seekers.</p>
              <Link to="/vehicles/suv" className="text-accent font-bold hover:underline flex items-center justify-center gap-2">Lease Specials <ArrowRight className="w-4 h-4" /></Link>
            </div>
            <div className="p-8 rounded-3xl bg-card border border-border/50 text-center hover:border-accent transition-colors">
              <h3 className="text-xl font-bold mb-4">Buick Sedans</h3>
              <p className="text-muted-foreground mb-6">Sleek, efficient, and comfortable. Ideal for daily commuting and city driving.</p>
              <Link to="/vehicles/sedan" className="text-accent font-bold hover:underline flex items-center justify-center gap-2">Lease Specials <ArrowRight className="w-4 h-4" /></Link>
            </div>
            <div className="p-8 rounded-3xl bg-card border border-border/50 text-center hover:border-accent transition-colors">
              <h3 className="text-xl font-bold mb-4">Buick Trucks/Crossovers</h3>
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
            <h2 className="text-3xl font-black uppercase mb-6 relative z-10">Why Lease a Buick?</h2>
            <p className="text-xl text-muted-foreground relative z-10 leading-relaxed">
              GM Financial provides competitive Buick lease incentives, with the Enclave and Encore GX frequently offering attractive money factors. Buick's premium positioning between Chevrolet and Cadillac creates strong value for lessees seeking comfort and technology without Cadillac's premium lease payment.
            </p>
          </div>
        </div>
      </section>

      {/* Section 7: FAQs */}
      <section className="py-16 bg-muted/10">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black uppercase mb-4">Buick Leasing <span className="text-accent italic">FAQ</span></h2>
          </div>
          <Accordion type="single" collapsible className="w-full">
            
            <AccordionItem value="item-1" className="bg-card mb-4 rounded-xl px-6 border-none">
              <AccordionTrigger className="text-lg font-bold hover:no-underline hover:text-accent">
                How does a Buick Enclave compare to a Chevrolet Traverse?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-base">
                The Enclave shares the Traverse platform but adds QuietTuning acoustic treatment, more premium interior materials, standard driver assistance features, and exclusive design - making it the quieter, more refined choice.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-2" className="bg-card mb-4 rounded-xl px-6 border-none">
              <AccordionTrigger className="text-lg font-bold hover:no-underline hover:text-accent">
                Is Buick a luxury brand?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-base">
                Buick positions itself as a 'premium' brand - above mainstream Chevrolet but below luxury Cadillac. In China, Buick is perceived as a full luxury brand on par with Mercedes-Benz.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-3" className="bg-card mb-4 rounded-xl px-6 border-none">
              <AccordionTrigger className="text-lg font-bold hover:no-underline hover:text-accent">
                What Buick models are best for leasing?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-base">
                The Buick Envision and Encore GX offer the best lease values in the lineup - competitive monthly payments, premium QuietTuning interiors, and GM Financial lease support.
              </AccordionContent>
            </AccordionItem>
            
          </Accordion>
        </div>
      </section>

      {/* Section 8: Process */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-black uppercase mb-4">How to Lease a <span className="text-accent italic">Buick</span></h2>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { step: '1', title: 'Choose Your Model', desc: 'Select your preferred Buick model and trim.' },
              { step: '2', title: 'Get a Quote', desc: 'We negotiate the lowest money factor for you.' },
              { step: '3', title: 'Credit Approval', desc: 'Fast, secure credit application process.' },
              { step: '4', title: 'Free Delivery', desc: 'Your new Buick delivered to your door.' },
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
            <h2 className="text-2xl font-black uppercase mb-6 text-center">Request a Buick Quote</h2>
            <ContactForm source="Buick Landing Page" />
          </div>
        </div>
      </section>
    </Layout>
  );
}
