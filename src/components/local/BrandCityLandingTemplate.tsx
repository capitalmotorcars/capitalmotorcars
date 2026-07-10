import { Link } from 'react-router-dom';
import { getCityData } from '@/data/cityData';
import { ArrowRight, MapPin, Sparkles, ShieldCheck, Clock, CheckCircle2, Star, Car, DollarSign, BadgeCheck, Phone, TrendingDown, Check, X } from 'lucide-react';
import { motion } from 'framer-motion';
import { Layout } from '@/components/layout/Layout';
import { SEO } from '@/components/SEO';
import { JsonLd, createBreadcrumbSchema, createLocalCarBrokerSchema, createFaqSchema } from '@/components/JsonLd';
import { Button } from '@/components/ui/button';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { BackgroundEffects } from '@/components/ui/BackgroundEffects';
import { SectionDividerCreative } from '@/components/ui/SectionDividerCreative';
import { RelatedServices } from '@/components/services/RelatedServices';
import { ContactForm } from '@/components/forms/ContactForm';
import { TrustStatsBar } from '@/components/shared/TrustStatsBar';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export interface BrandModel {
  name: string;
  path: string;
  badge: string;
}

export interface BrandCityLandingProps {
  brand: string;
  city: string;
  slug: string;
  heroImage: string;
  seoKeywords: string[];
  description: string;
  popularModels?: BrandModel[];
}

export function BrandCityLandingTemplate({ brand, city, slug, heroImage, seoKeywords, description, popularModels }: BrandCityLandingProps) {
  const citySlug = city.toLowerCase().replace(/\s+/g, '-');
  const cityData = getCityData(citySlug);
  const faqs = [
    {
      question: `What ${brand} models can I lease through Capital Motor Cars in ${city}?`,
      answer: `Capital Motor Cars can source any current ${brand} model for ${city} residents, including the full sedan, SUV, and coupe lineup. We work with all NJ ${brand} dealers and do not restrict you to one dealer's inventory. Simply tell us the model, trim, and color you want.`,
    },
    {
      question: `How does the ${brand} lease process work for ${city} residents?`,
      answer: `We start with a phone or email consultation to understand your target vehicle and budget. We then submit to multiple NJ ${brand} dealers simultaneously, present you with the best offer (including the actual money factor and residual), you approve the numbers, sign digitally, and we deliver to your door in ${city}. No dealership visit required.`,
    },
    {
      question: `Does Capital Motor Cars mark up the ${brand} money factor in ${city}?`,
      answer: `No. We do not mark up the money factor. ${brand} Financial Services publishes a base money factor each month. Dealers can add up to 0.00200 to earn additional profit. We charge a one-time broker fee and pass through the buy-rate money factor, saving most clients $20-$50 per month compared to dealer financing.`,
    },
    {
      question: `How do I get a ${brand} lease quote in ${city} without visiting a dealership?`,
      answer: `Contact Capital Motor Cars by phone or through our online form. Tell us the ${brand} model, trim level, color, and any packages you want. We will pull current ${brand} Financial Services programs, apply our dealer network pricing, and send you a complete payment breakdown with nothing hidden.`,
    },
    {
      question: `What is the typical lease payment for a ${brand} in ${city}?`,
      answer: `${brand} lease payments in ${city} vary by model and current manufacturer programs. As a broker, we consistently achieve $40-$120/mo less than retail dealer pricing on ${brand} leases by eliminating money factor markup and negotiating selling price below MSRP. Contact us for a current quote on the specific model you want.`,
    },
    {
      question: `Do you deliver leased ${brand} vehicles to ${city}?`,
      answer: `Yes. We deliver to all ${city} addresses at no additional charge. You handle the paperwork digitally and we schedule a delivery time that works for you. Most ${city} deliveries are completed within 1-2 business days of paperwork completion.`,
    },
  ];

  const schemas = [
    createLocalCarBrokerSchema({
      city,
      name: `Capital Motor Cars - ${brand} Broker ${city}`,
      description,
      url: `https://www.capitalmotorcars.com/${slug}`,
      image: heroImage,
    }),
    createBreadcrumbSchema([
      { name: 'Home', url: 'https://www.capitalmotorcars.com/' },
      { name: `${brand} Leasing in ${city}`, url: `https://www.capitalmotorcars.com/${slug}` },
    ]),
    createFaqSchema(faqs),
  ];

  return (
    <Layout>
      <SEO
        title={`${brand} Lease Deals in ${city}, NJ | Capital Motor Cars`}
        description={description}
        canonicalPath={`/${slug}`}
        seoKeywords={seoKeywords}
        ogType="website"
      />
      <JsonLd data={schemas} />

      {/* Hero Section (Premium Full-Bleed) */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={heroImage} 
            alt={`${brand} driving in ${city}`} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/30" />
          <div className="absolute inset-0 bg-black/40" />
        </div>

        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 text-center mt-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/50 backdrop-blur-md border border-white/10 text-white text-sm font-medium tracking-wide mb-8">
            <MapPin className="w-4 h-4 text-accent" /> Exclusive {brand} Pricing for {city} Residents
          </div>
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-white tracking-tight mb-6">
            Wholesale <span className="text-accent">{brand}</span> Leases.
            <br />Delivered to <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/60">{city}</span>.
          </h1>
          <p className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto leading-relaxed mb-10 font-light">
            Skip the dealership games. We negotiate the lowest money factors and highest residuals on new {brand}s, delivering straight to your door in {city}, NJ.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
            <MagneticButton strength={0.4}>
              <Button size="lg" className="h-14 px-8 bg-accent text-accent-foreground hover:bg-accent/90 glow-blue text-base font-bold w-full sm:w-auto" asChild>
                <a href="#quote">Get a {brand} Quote</a>
              </Button>
            </MagneticButton>
            <Button size="lg" variant="outline" className="h-14 px-8 border-white/20 text-white hover:bg-white/10 backdrop-blur-sm text-base w-full sm:w-auto" asChild>
              <Link to="/deals">View All Live Deals</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Trust Stats Bar */}
      <TrustStatsBar 
        className="relative z-20"
        stats={[
          { stat: '760+', label: 'NJ Leases Closed' },
          { stat: 'Buy-Rate', label: 'Money Factor Pricing' },
          { stat: '1 Day', label: 'Quote Turnaround' },
          { stat: 'Free', label: `${city} Delivery` },
        ]} 
      />

      {/* Unique City Context Block */}
      {cityData && (
        <section className="py-12 md:py-16 border-t border-border/40 bg-muted/5">
          <div className="container mx-auto px-4 lg:px-8 max-w-5xl">
            <div className="grid md:grid-cols-2 gap-10 items-start">
              <div>
                <span className="text-accent font-black tracking-[0.4em] uppercase text-[10px] mb-3 block">About {city}</span>
                <h2 className="text-2xl md:text-3xl font-black tracking-tight text-foreground mb-4">
                  {brand} Leasing in <span className="text-accent">{city}, NJ</span>
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-4 text-[16px]">{cityData.intro}</p>
                <p className="text-muted-foreground leading-relaxed text-[15px] border-l-2 border-accent/40 pl-4 italic">{cityData.driveContext}</p>
              </div>
              <div className="space-y-5">
                <div className="p-6 rounded-2xl border border-accent/20 bg-accent/[0.03]">
                  <h3 className="font-black text-foreground mb-2 flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-accent" /> Areas We Serve Near {city}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-3">We deliver to {city} and all surrounding towns in {cityData.county}:</p>
                  <div className="flex flex-wrap gap-2">
                    {cityData.nearbyCities.map((c) => (
                      <span key={c} className="text-xs px-3 py-1.5 rounded-full bg-accent/10 text-accent font-semibold border border-accent/20">{c}</span>
                    ))}
                  </div>
                </div>
                <div className="p-6 rounded-2xl border border-border/60 bg-muted/5">
                  <h3 className="font-black text-foreground mb-2 flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-accent" /> {city} Market Insight
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{cityData.marketNote}</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* How It Works */}
      <section className="py-12 md:py-20 border-t border-border/40 section-bg">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col mb-10 justify-center items-start md:items-center">
            <span className="text-accent font-black tracking-[0.4em] uppercase text-[10px] mb-2">Our Process</span>
            <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-black dark:text-white uppercase">
              How We Lease a {brand} in <span className="text-accent italic">{city}</span>
            </h2>
            <p className="mt-4 text-muted-foreground text-center max-w-2xl">Get a live buyable quote within one business day. No dealer visits, no back-and-forth negotiation.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-5 max-w-5xl mx-auto">
            {[
              { icon: Phone, title: 'Contact Us', desc: `Tell us the ${brand} model and your monthly budget. A quick form or call is all it takes to get started.` },
              { icon: DollarSign, title: 'We Pull Live Pricing', desc: `We access the current ${brand} money factor and residual value, then submit to our dealer network simultaneously.` },
              { icon: BadgeCheck, title: 'You Review Options', desc: 'We present 2 to 3 fully transparent offers showing the selling price, money factor, residual, and exact monthly payment.' },
              { icon: Car, title: `Delivered to ${city}`, desc: `We handle all paperwork and deliver your new ${brand} free to your home or office in ${city}.` },
            ].map((step, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="group p-7 rounded-[2rem] border-2 border-border/60 bg-muted/5 hover:border-accent/40 transition-all relative overflow-hidden">
                <span className="absolute -right-3 -bottom-3 text-7xl font-black text-black/[0.04] dark:text-white/[0.04] leading-none select-none group-hover:text-accent/10 transition-colors">{i + 1}</span>
                <div className="w-12 h-12 rounded-xl bg-accent/10 text-accent flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <step.icon className="w-6 h-6" />
                </div>
                <h3 className="font-black text-xl text-black dark:text-white mb-2 group-hover:text-accent transition-colors">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* What Affects Payment */}
      <section className="py-12 md:py-20 border-t border-border/40">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col mb-10 justify-center items-start md:items-center">
            <span className="text-accent font-black tracking-[0.4em] uppercase text-[10px] mb-2">Lease Education</span>
            <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-black dark:text-white uppercase">
              What Affects Your <span className="text-accent italic">Monthly Payment</span>
            </h2>
            <p className="mt-4 text-muted-foreground text-center max-w-2xl">Here are the four levers that determine your {brand} lease payment, and where we consistently save clients money.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {[
              { icon: DollarSign, title: 'Money Factor', desc: `The lease interest rate. Dealers can mark it up without telling you. We use the manufacturer buy-rate every time, saving ${city} clients $20 to $60 per month.` },
              { icon: TrendingDown, title: 'Residual Value', desc: "The car's projected worth at lease-end, set by the manufacturer. Higher residual = lower payment. We advise you on which models carry the best residuals right now." },
              { icon: BadgeCheck, title: 'Capitalized Cost', desc: 'The negotiated selling price of the vehicle. Every $1,000 below MSRP reduces your monthly payment by about $28 on a 36-month lease. We submit to multiple dealers to find the lowest price.' },
              { icon: Car, title: 'Mileage Allowance', desc: `Standard programs are 10k or 12k miles per year. If your ${city} commute requires more, buying extra miles upfront is typically 40-60% cheaper per mile than paying overages at lease-end.` },
            ].map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="p-7 rounded-[2rem] border-2 border-border/60 bg-muted/5 hover:border-accent/40 transition-all">
                <div className="w-12 h-12 rounded-xl bg-accent/10 text-accent flex items-center justify-center mb-5">
                  <item.icon className="w-6 h-6" />
                </div>
                <h3 className="font-black text-xl text-black dark:text-white mb-3">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Models Grid (Optional) */}
      {popularModels && popularModels.length > 0 && (
        <section className="py-12 md:py-20 border-t border-border/40">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="flex flex-col mb-8 md:mb-16 justify-center items-start md:items-center">
              <span className="text-accent font-black tracking-[0.4em] uppercase text-[10px] mb-2">Models</span>
              <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-black dark:text-white uppercase">
                Popular {brand} Models in <span className="text-accent italic">{city}</span>
              </h2>
              <p className="mt-4 text-muted-foreground text-center max-w-2xl">Explore lease guides and pricing for the top {brand} models requested by {city} drivers.</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {popularModels.map((model, i) => (
                <Link key={i} to={model.path} className="group p-5 rounded-[1.5rem] border-2 border-border/60 bg-muted/5 hover:border-accent hover:bg-accent/5 transition-all">
                  <span className="text-[10px] font-black uppercase tracking-[0.3em] text-accent block mb-1">{model.badge}</span>
                  <div className="font-black text-base text-black dark:text-white group-hover:text-accent transition-colors leading-tight">{model.name}</div>
                  <div className="mt-2 flex items-center gap-1 text-accent text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                    View deals <ArrowRight className="w-3 h-3" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Leasing vs Buying */}
      <section className="py-12 md:py-20 border-t border-border/40">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col mb-10 justify-center items-start md:items-center">
            <span className="text-accent font-black tracking-[0.4em] uppercase text-[10px] mb-2">Comparison</span>
            <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-black dark:text-white uppercase">
              Leasing vs Buying in <span className="text-accent italic">{city}</span>
            </h2>
            <p className="mt-4 text-muted-foreground text-center max-w-2xl">For drivers who upgrade their vehicle every 3 years, leasing consistently wins on cost, flexibility, and keeping pace with technology.</p>
          </div>
          <div className="max-w-4xl mx-auto glass-card-theme rounded-[2rem] overflow-hidden">
            <div className="grid grid-cols-3 bg-accent/10 px-6 py-4 border-b border-border/40">
              <span className="text-xs font-black uppercase tracking-[0.3em] text-muted-foreground">Factor</span>
              <span className="text-xs font-black uppercase tracking-[0.3em] text-accent text-center">Lease</span>
              <span className="text-xs font-black uppercase tracking-[0.3em] text-muted-foreground text-center">Buy / Finance</span>
            </div>
            {[
              { aspect: 'Monthly payment', lease: 'Lower: pay only depreciation', buy: 'Higher: full MSRP financed' },
              { aspect: 'Upfront cost', lease: 'First month + security deposit', buy: '10-20% down payment' },
              { aspect: 'End-of-term options', lease: 'Return, buy, or upgrade easily', buy: 'Must sell or trade a used car' },
              { aspect: 'Mileage', lease: '10k-15k/yr (customizable)', buy: 'Unlimited but affects resale value' },
              { aspect: 'Warranty coverage', lease: 'Factory warranty covers full term', buy: 'Warranty expires mid-ownership' },
              { aspect: 'Latest technology', lease: 'New model every 3 years', buy: 'Same model until you sell it' },
            ].map((row, i) => (
              <div key={i} className={`grid grid-cols-3 px-6 py-4 border-b border-border/30 last:border-0 ${i % 2 === 0 ? '' : 'bg-muted/5'}`}>
                <span className="text-sm font-bold text-foreground self-center">{row.aspect}</span>
                <div className="flex items-center justify-center gap-2">
                  <Check className="w-4 h-4 text-accent shrink-0" strokeWidth={3} />
                  <span className="text-sm text-foreground text-center">{row.lease}</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <X className="w-4 h-4 text-muted-foreground shrink-0" />
                  <span className="text-sm text-muted-foreground text-center">{row.buy}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SectionDividerCreative variant="wave" />

      {/* SEO Content Section */}
      <section className="py-20 section-bg-alt">
        <div className="container mx-auto px-4 lg:px-8 max-w-5xl">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-section mb-6">
                Why Auto Brokers Beat Dealerships in {city}
              </h2>
              <div className="space-y-6 text-section-muted text-lg leading-relaxed">
                <p>
                  When you walk into a {brand} dealership, you are negotiating against professional salespeople whose goal is to maximize profit on the cars they currently have in stock.
                </p>
                <p>
                  At Capital Motor Cars, we represent <strong>you</strong>. We pit multiple dealerships against each other to drive the price down, ensuring you get the true wholesale lease price.
                </p>
                <ul className="space-y-4 mt-6">
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="w-6 h-6 text-accent shrink-0" />
                    <span className="text-foreground font-medium">Access to unadvertised trunk money and incentives.</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="w-6 h-6 text-accent shrink-0" />
                    <span className="text-foreground font-medium">No pressure to buy dealership add-ons.</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="w-6 h-6 text-accent shrink-0" />
                    <span className="text-foreground font-medium">We can handle your lease return and trade-in.</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-accent/20 to-transparent rounded-[3rem] transform rotate-3" />
              <img 
                src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=2000&auto=format&fit=crop" 
                alt="Auto broker handing over keys" 
                className="relative rounded-[3rem] border border-white/10 shadow-2xl object-cover h-[500px] w-full"
              />
              
              <div className="absolute -bottom-6 -left-6 bg-card p-6 rounded-2xl border border-border/50 shadow-xl max-w-[250px]">
                <div className="flex gap-1 mb-2">
                  {[1,2,3,4,5].map(i => <Star key={i} className="w-4 h-4 fill-accent text-accent" />)}
                </div>
                <p className="text-sm italic text-muted-foreground">"Delivered my {brand} right to my office in {city}. Didn't have to step foot in a dealer."</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
          <div className="text-center mb-12">
            <span className="text-accent font-black tracking-[0.4em] uppercase text-[10px] mb-3 block">FAQ</span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              {brand} Leasing in {city}: <span className="text-accent">Common Questions</span>
            </h2>
          </div>
          <div className="glass-card-theme p-4 md:p-8 rounded-[2rem]">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="border-b-border/40 last:border-0">
                  <AccordionTrigger className="text-left text-base font-bold hover:text-accent transition-colors py-5">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-sm pb-5 leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="quote" className="py-24 section-bg text-center scroll-mt-20">
        <BackgroundEffects />
        <div className="container relative z-10 mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-section mb-6">
              Ready to drive your new {brand}?
            </h2>
            <p className="text-xl text-section-muted mb-10">
              Let us run the numbers. Tell us what you want and we'll handle the rest.
            </p>
            <div className="w-full max-w-2xl mx-auto mt-4 text-left">
              <div className="glass-card-theme form-card-theme p-4 sm:p-6 md:p-8 rounded-[2.5rem]">
                <ContactForm source="contact" serviceTitle={`${brand} Leasing ${city}`} compact />
              </div>
            </div>
          </div>
        </div>
      </section>

      <RelatedServices />
    </Layout>
  );
}
