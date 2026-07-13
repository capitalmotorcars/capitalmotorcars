import { Link } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { SEO } from '@/components/SEO';
import { JsonLd, createWebPageSchema } from '@/components/JsonLd';
import { ServiceHero } from '@/components/services/ServiceHero';
import { TrustStatsBar } from '@/components/shared/TrustStatsBar';
import { ContactForm } from '@/components/forms/ContactForm';
import { Phone, ArrowRight, ShieldCheck, CheckCircle2, Zap, Landmark, BadgeDollarSign } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

export default function BMWBrandPage() {
  return (
    <Layout>
      <SEO
        title="2026 BMW Lease Deals NJ & NY | Zero Down Specials"
        description="Discover aggressive 2026 BMW lease deals in NJ & NY. Experience the Ultimate Driving Machine with zero down specials on the 3 Series, X5, and more."
        seoKeywords={['2026 BMW lease deals NJ', 'BMW lease specials NY', 'zero down BMW lease', 'BMW broker NJ']}
        ogImage="https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/BMW_M3_Competition_%28G80%29_IMG_4041.jpg/1280px-BMW_M3_Competition_%28G80%29_IMG_4041.jpg"
        canonicalPath="/brand/bmw"
      />
      <JsonLd data={[
        createWebPageSchema({
          name: "BMW Lease Deals NJ & NY",
          description: "Affordable BMW leasing broker in New Jersey offering aggressive specials.",
          url: "https://www.capitalmotorcars.com/brand/bmw"
        })
      ]} />

      {/* Section 1: Hero */}
      <ServiceHero
        badge="Best Value"
        title="2026 BMW Lease Deals"
        highlightedTitle=""
        subtitle="Discover aggressive 2026 BMW lease deals in NJ & NY. Experience the Ultimate Driving Machine with zero down specials on the 3 Series, X5, and more."
        heroImage="https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/BMW_M3_Competition_%28G80%29_IMG_4041.jpg/1280px-BMW_M3_Competition_%28G80%29_IMG_4041.jpg"
        primaryAction={{ label: "View SUVs", href: "/vehicles/suv" }}
        secondaryAction={{ label: "Call Us", href: "tel:+12015095555", icon: Phone }}
      />
      
      {/* Section 2: Trust Stats */}
      <TrustStatsBar />

      {/* Section 3: Intro & Benefits */}
      <section className="py-16 bg-muted/10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-black uppercase mb-4">Experience The Ultimate Driving Machine</h2>
            <p className="text-lg text-muted-foreground">BMW seamlessly blends thrilling performance with unmistakable luxury. Whether you're seeking a sporty sedan or a versatile SAV, our brokers negotiate the perfect lease for your lifestyle - with zero dealer markup.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 rounded-3xl bg-card border border-border/50 text-center flex flex-col items-center hover:border-accent transition-colors">
              <ShieldCheck className="w-12 h-12 text-accent mb-4" />
              <h3 className="text-xl font-bold mb-4">Dynamic Handling</h3>
              <p className="text-muted-foreground">Renowned rear-wheel-drive architecture and xDrive AWD provide unparalleled road grip and precision through every corner.</p>
            </div>
            <div className="p-8 rounded-3xl bg-card border border-border/50 text-center flex flex-col items-center hover:border-accent transition-colors">
              <Zap className="w-12 h-12 text-accent mb-4" />
              <h3 className="text-xl font-bold mb-4">Luxurious Cabins</h3>
              <p className="text-muted-foreground">Step into a world of Vernasca leather, ambient lighting, and the intuitive iDrive 8 infotainment system.</p>
            </div>
            <div className="p-8 rounded-3xl bg-card border border-border/50 text-center flex flex-col items-center hover:border-accent transition-colors">
              <CheckCircle2 className="w-12 h-12 text-accent mb-4" />
              <h3 className="text-xl font-bold mb-4">M Performance</h3>
              <p className="text-muted-foreground">Available M Sport packages elevate aerodynamics, suspension, and power for the true automotive enthusiast.</p>
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
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/BMW_M3_Competition_%28G80%29_IMG_4041.jpg/1280px-BMW_M3_Competition_%28G80%29_IMG_4041.jpg" alt="BMW Heritage" className="w-full h-full object-cover" />
              </div>
            </div>
            <div className="md:w-1/2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent text-sm font-bold mb-6">
                <Landmark className="w-4 h-4" />
                Brand Heritage
              </div>
              <h2 className="text-3xl font-black uppercase mb-6">The <span className="text-accent italic">BMW</span> Legacy</h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                Founded in Bavaria in 1916, BMW has spent over a century perfecting engine dynamics and weight distribution. Their philosophy of 'The Ultimate Driving Machine' is evident in every model, from the rear-wheel-drive 2 Series to the electrifying i4. BMW pioneered the concept of the sports sedan and continues to define the benchmark for driver-focused engineering worldwide.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: Models */}
      <section className="py-16 bg-muted/10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black uppercase mb-4">Popular BMW <span className="text-accent italic">Models</span></h2>
            <p className="text-muted-foreground">Explore our most requested vehicle categories for BMW.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="p-8 rounded-3xl bg-card border border-border/50 text-center hover:border-accent transition-colors">
              <h3 className="text-xl font-bold mb-4">BMW SUVs</h3>
              <p className="text-muted-foreground mb-6">Spacious, capable, and commanding. The perfect choice for families and adventure seekers.</p>
              <Link to="/vehicles/suv" className="text-accent font-bold hover:underline flex items-center justify-center gap-2">Lease Specials <ArrowRight className="w-4 h-4" /></Link>
            </div>
            <div className="p-8 rounded-3xl bg-card border border-border/50 text-center hover:border-accent transition-colors">
              <h3 className="text-xl font-bold mb-4">BMW Sedans</h3>
              <p className="text-muted-foreground mb-6">Sleek, efficient, and comfortable. Ideal for daily commuting and city driving.</p>
              <Link to="/vehicles/sedan" className="text-accent font-bold hover:underline flex items-center justify-center gap-2">Lease Specials <ArrowRight className="w-4 h-4" /></Link>
            </div>
            <div className="p-8 rounded-3xl bg-card border border-border/50 text-center hover:border-accent transition-colors">
              <h3 className="text-xl font-bold mb-4">BMW Trucks/Crossovers</h3>
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
            <h2 className="text-3xl font-black uppercase mb-6 relative z-10">Why Lease a BMW?</h2>
            <p className="text-xl text-muted-foreground relative z-10 leading-relaxed">
              Leasing a BMW protects you from the steep depreciation typical of German luxury cars - BMWs lose 50-60% of their value in the first 3 years. By leasing, you drive a brand new model with full warranty coverage, BMW Ultimate Care maintenance included, and a predictable monthly payment with no surprise repair bills.
            </p>
          </div>
        </div>
      </section>

      {/* Section 7: FAQs */}
      <section className="py-16 bg-muted/10">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black uppercase mb-4">BMW Leasing <span className="text-accent italic">FAQ</span></h2>
          </div>
          <Accordion type="single" collapsible className="w-full">
            
            <AccordionItem value="item-1" className="bg-card mb-4 rounded-xl px-6 border-none">
              <AccordionTrigger className="text-lg font-bold hover:no-underline hover:text-accent">
                What is the standard mileage limit on a BMW lease?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-base">
                Standard BMW leases offer 10,000 miles per year, but you can opt for 7,500, 12,000, or 15,000 miles depending on your commute. Capital Motor Cars will find the right tier to match your driving habits.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-2" className="bg-card mb-4 rounded-xl px-6 border-none">
              <AccordionTrigger className="text-lg font-bold hover:no-underline hover:text-accent">
                Does BMW include maintenance with their leases?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-base">
                Yes! BMW Ultimate Care covers all factory-recommended scheduled maintenance for the first 3 years or 36,000 miles - oil changes, brake fluid, and more included at no cost.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-3" className="bg-card mb-4 rounded-xl px-6 border-none">
              <AccordionTrigger className="text-lg font-bold hover:no-underline hover:text-accent">
                Can I use multiple security deposits (MSD) on a BMW?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-base">
                Yes, BMW Financial Services allows up to 7 refundable security deposits to significantly lower your money factor (interest rate) and monthly payment - a powerful money-saving strategy we use for our clients.
              </AccordionContent>
            </AccordionItem>
            
          </Accordion>
        </div>
      </section>

      {/* Section 8: Process */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-black uppercase mb-4">How to Lease a <span className="text-accent italic">BMW</span></h2>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { step: '1', title: 'Choose Your Model', desc: 'Select your preferred BMW model and trim.' },
              { step: '2', title: 'Get a Quote', desc: 'We negotiate the lowest money factor for you.' },
              { step: '3', title: 'Credit Approval', desc: 'Fast, secure credit application process.' },
              { step: '4', title: 'Free Delivery', desc: 'Your new BMW delivered to your door.' },
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
            <h2 className="text-2xl font-black uppercase mb-6 text-center">Request a BMW Quote</h2>
            <ContactForm source="BMW Landing Page" />
          </div>
        </div>
      </section>
    </Layout>
  );
}
