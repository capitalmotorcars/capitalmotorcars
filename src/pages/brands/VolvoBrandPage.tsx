import { Link } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { SEO } from '@/components/SEO';
import { JsonLd, createWebPageSchema } from '@/components/JsonLd';
import { ServiceHero } from '@/components/services/ServiceHero';
import { TrustStatsBar } from '@/components/shared/TrustStatsBar';
import { ContactForm } from '@/components/forms/ContactForm';
import { Phone, ArrowRight, ShieldCheck, CheckCircle2, Zap, Landmark, BadgeDollarSign } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

export default function VolvoBrandPage() {
  return (
    <Layout>
      <SEO
        title="2026 Volvo Lease Deals NJ & NY | Zero Down Specials"
        description="Lease a 2026 Volvo in NJ & NY - XC90, XC60, and EX90 zero down specials. Swedish safety and luxury at broker pricing."
        seoKeywords={['2026 Volvo lease deals NJ', 'Volvo lease specials NY', 'zero down Volvo lease', 'Volvo broker NJ']}
        ogImage="https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Volvo_XC90_T8_AWD_Plug-in_Hybrid_Plus_%28II%2C_2._Facelift%29_%E2%80%93_f_03102025.jpg/1280px-Volvo_XC90_T8_AWD_Plug-in_Hybrid_Plus_%28II%2C_2._Facelift%29_%E2%80%93_f_03102025.jpg"
        canonicalPath="/brand/volvo"
      />
      <JsonLd data={[
        createWebPageSchema({
          name: "Volvo Lease Deals NJ & NY",
          description: "Affordable Volvo leasing broker in New Jersey offering aggressive specials.",
          url: "https://www.capitalmotorcars.com/brand/volvo"
        })
      ]} />

      {/* Section 1: Hero */}
      <ServiceHero
        badge="Best Value"
        title="2026 Volvo Lease Deals"
        highlightedTitle=""
        subtitle="Lease a 2026 Volvo in NJ & NY - XC90, XC60, and EX90 zero down specials. Swedish safety and luxury at broker pricing."
        heroImage="https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Volvo_XC90_T8_AWD_Plug-in_Hybrid_Plus_%28II%2C_2._Facelift%29_%E2%80%93_f_03102025.jpg/1280px-Volvo_XC90_T8_AWD_Plug-in_Hybrid_Plus_%28II%2C_2._Facelift%29_%E2%80%93_f_03102025.jpg"
        primaryAction={{ label: "View SUVs", href: "/vehicles/suv" }}
        secondaryAction={{ label: "Call Us", href: "tel:+12015095555", icon: Phone }}
      />
      
      {/* Section 2: Trust Stats */}
      <TrustStatsBar />

      {/* Section 3: Intro & Benefits */}
      <section className="py-16 bg-muted/10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-black uppercase mb-4">Designed Around You</h2>
            <p className="text-lg text-muted-foreground">Volvo builds the world's safest cars - but never at the expense of Scandinavian design elegance or driving pleasure. The XC90, XC60, and electric EX90 combine genuine safety leadership with beautiful Swedish minimalism and competitive lease payments.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 rounded-3xl bg-card border border-border/50 text-center flex flex-col items-center hover:border-accent transition-colors">
              <ShieldCheck className="w-12 h-12 text-accent mb-4" />
              <h3 className="text-xl font-bold mb-4">Safety Leadership</h3>
              <p className="text-muted-foreground">Volvo has pledged that no one should be killed or seriously injured in a new Volvo by 2020 - their crash test results consistently lead the industry.</p>
            </div>
            <div className="p-8 rounded-3xl bg-card border border-border/50 text-center flex flex-col items-center hover:border-accent transition-colors">
              <Zap className="w-12 h-12 text-accent mb-4" />
              <h3 className="text-xl font-bold mb-4">Scandinavian Interiors</h3>
              <p className="text-muted-foreground">Volvo's interiors blend driftwood, wool, and open-pore wood in a serene Scandinavian design language that feels genuinely unlike any German competitor.</p>
            </div>
            <div className="p-8 rounded-3xl bg-card border border-border/50 text-center flex flex-col items-center hover:border-accent transition-colors">
              <CheckCircle2 className="w-12 h-12 text-accent mb-4" />
              <h3 className="text-xl font-bold mb-4">Pilot Assist</h3>
              <p className="text-muted-foreground">Volvo's semi-autonomous Pilot Assist handles steering, acceleration, and braking on well-marked roads - one of the smoothest systems in the market.</p>
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
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Volvo_XC90_T8_AWD_Plug-in_Hybrid_Plus_%28II%2C_2._Facelift%29_%E2%80%93_f_03102025.jpg/1280px-Volvo_XC90_T8_AWD_Plug-in_Hybrid_Plus_%28II%2C_2._Facelift%29_%E2%80%93_f_03102025.jpg" alt="Volvo Heritage" className="w-full h-full object-cover" />
              </div>
            </div>
            <div className="md:w-1/2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent text-sm font-bold mb-6">
                <Landmark className="w-4 h-4" />
                Brand Heritage
              </div>
              <h2 className="text-3xl font-black uppercase mb-6">The <span className="text-accent italic">Volvo</span> Legacy</h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                Founded in Gothenburg, Sweden in 1927, Volvo's founding principle was safety - a commitment evidenced by their invention of the three-point seatbelt in 1959. Rather than patent it, Volvo made the invention freely available to all automakers, saving an estimated one million lives. Today, Volvo is owned by Geely and leads the transition to full electrification with the EX90 and C40 Recharge.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: Models */}
      <section className="py-16 bg-muted/10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black uppercase mb-4">Popular Volvo <span className="text-accent italic">Models</span></h2>
            <p className="text-muted-foreground">Explore our most requested vehicle categories for Volvo.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="p-8 rounded-3xl bg-card border border-border/50 text-center hover:border-accent transition-colors">
              <h3 className="text-xl font-bold mb-4">Volvo SUVs</h3>
              <p className="text-muted-foreground mb-6">Spacious, capable, and commanding. The perfect choice for families and adventure seekers.</p>
              <Link to="/vehicles/suv" className="text-accent font-bold hover:underline flex items-center justify-center gap-2">Lease Specials <ArrowRight className="w-4 h-4" /></Link>
            </div>
            <div className="p-8 rounded-3xl bg-card border border-border/50 text-center hover:border-accent transition-colors">
              <h3 className="text-xl font-bold mb-4">Volvo Sedans</h3>
              <p className="text-muted-foreground mb-6">Sleek, efficient, and comfortable. Ideal for daily commuting and city driving.</p>
              <Link to="/vehicles/sedan" className="text-accent font-bold hover:underline flex items-center justify-center gap-2">Lease Specials <ArrowRight className="w-4 h-4" /></Link>
            </div>
            <div className="p-8 rounded-3xl bg-card border border-border/50 text-center hover:border-accent transition-colors">
              <h3 className="text-xl font-bold mb-4">Volvo Trucks/Crossovers</h3>
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
            <h2 className="text-3xl font-black uppercase mb-6 relative z-10">Why Lease a Volvo?</h2>
            <p className="text-xl text-muted-foreground relative z-10 leading-relaxed">
              Volvo's Care by Volvo subscription (essentially a comprehensive lease) and traditional lease options through Volvo Car Financial Services offer some of the most transparent, hassle-free leasing experiences available. The XC60 and XC90 consistently receive competitive money factors due to Volvo's strong residual value performance.
            </p>
          </div>
        </div>
      </section>

      {/* Section 7: FAQs */}
      <section className="py-16 bg-muted/10">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black uppercase mb-4">Volvo Leasing <span className="text-accent italic">FAQ</span></h2>
          </div>
          <Accordion type="single" collapsible className="w-full">
            
            <AccordionItem value="item-1" className="bg-card mb-4 rounded-xl px-6 border-none">
              <AccordionTrigger className="text-lg font-bold hover:no-underline hover:text-accent">
                Which Volvo SUV is best for NJ families?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-base">
                The Volvo XC90 Recharge PHEV is our top recommendation - 7 seats, 35 miles of electric range for NJ commutes, class-leading safety ratings, and a stunning Scandinavian interior.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-2" className="bg-card mb-4 rounded-xl px-6 border-none">
              <AccordionTrigger className="text-lg font-bold hover:no-underline hover:text-accent">
                Does Volvo include maintenance in their leases?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-base">
                Volvo's Volvo Cars Financial Services can include a prepaid maintenance plan. The standard lease includes the comprehensive 4-year/50,000-mile factory warranty.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-3" className="bg-card mb-4 rounded-xl px-6 border-none">
              <AccordionTrigger className="text-lg font-bold hover:no-underline hover:text-accent">
                Is the Volvo EX90 a good electric lease?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-base">
                The EX90 is Volvo's flagship electric SUV with 400 miles of range, Dolby Atmos audio, and advanced LiDAR safety sensing. It qualifies for EV incentives applied to your lease payment.
              </AccordionContent>
            </AccordionItem>
            
          </Accordion>
        </div>
      </section>

      {/* Section 8: Process */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-black uppercase mb-4">How to Lease a <span className="text-accent italic">Volvo</span></h2>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { step: '1', title: 'Choose Your Model', desc: 'Select your preferred Volvo model and trim.' },
              { step: '2', title: 'Get a Quote', desc: 'We negotiate the lowest money factor for you.' },
              { step: '3', title: 'Credit Approval', desc: 'Fast, secure credit application process.' },
              { step: '4', title: 'Free Delivery', desc: 'Your new Volvo delivered to your door.' },
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
            <h2 className="text-2xl font-black uppercase mb-6 text-center">Request a Volvo Quote</h2>
            <ContactForm source="Volvo Landing Page" />
          </div>
        </div>
      </section>
    </Layout>
  );
}
