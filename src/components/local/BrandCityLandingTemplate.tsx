import { Link } from 'react-router-dom';
import { ArrowRight, MapPin, Sparkles, ShieldCheck, Clock, CheckCircle2, Star } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { SEO } from '@/components/SEO';
import { JsonLd, createBreadcrumbSchema, createLocalCarBrokerSchema, createFaqSchema } from '@/components/JsonLd';
import { Button } from '@/components/ui/button';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { BackgroundEffects } from '@/components/ui/BackgroundEffects';
import { SectionDividerCreative } from '@/components/ui/SectionDividerCreative';
import { RelatedServices } from '@/components/services/RelatedServices';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export interface BrandCityLandingProps {
  brand: string;
  city: string;
  slug: string;
  heroImage: string;
  seoKeywords: string[];
  description: string;
}

export function BrandCityLandingTemplate({ brand, city, slug, heroImage, seoKeywords, description }: BrandCityLandingProps) {
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
      name: `Capital Motor Cars - \${brand} Broker \${city}`,
      description,
      url: `https://www.capitalmotorcars.com/\${slug}`,
      image: heroImage,
    }),
    createBreadcrumbSchema([
      { name: 'Home', url: 'https://www.capitalmotorcars.com/' },
      { name: `\${brand} Leasing in \${city}`, url: `https://www.capitalmotorcars.com/\${slug}` },
    ]),
    createFaqSchema(faqs),
  ];

  return (
    <Layout>
      <SEO
        title={`\${brand} Lease Deals in \${city}, NJ | Capital Motor Cars`}
        description={description}
        canonicalPath={`/\${slug}`}
        seoKeywords={seoKeywords}
        ogType="website"
      />
      <JsonLd data={schemas} />

      {/* Hero Section (Premium Full-Bleed) */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={heroImage} 
            alt={`\${brand} driving in \${city}`} 
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
                <Link to={`/contact?vehicle=\${brand}`}>Get a {brand} Quote</Link>
              </Button>
            </MagneticButton>
            <Button size="lg" variant="outline" className="h-14 px-8 border-white/20 text-white hover:bg-white/10 backdrop-blur-sm text-base w-full sm:w-auto" asChild>
              <Link to="/deals">View All Live Deals</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Premium Value Props */}
      <section className="py-20 bg-background relative z-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 rounded-3xl bg-muted/30 border border-border/50 hover:border-accent/50 transition-colors">
              <ShieldCheck className="w-10 h-10 text-accent mb-6" />
              <h3 className="text-2xl font-bold mb-4 text-foreground">Zero Hidden Markups</h3>
              <p className="text-muted-foreground leading-relaxed">
                Dealerships inflate money factors to increase their profit. As brokers, we secure buy-rate financing directly from {brand} Financial Services.
              </p>
            </div>
            <div className="p-8 rounded-3xl bg-muted/30 border border-border/50 hover:border-accent/50 transition-colors">
              <Sparkles className="w-10 h-10 text-accent mb-6" />
              <h3 className="text-2xl font-bold mb-4 text-foreground">Bespoke Ordering</h3>
              <p className="text-muted-foreground leading-relaxed">
                Want a specific trim, color, or package? We search nationwide allocations to find the exact {brand} you desire.
              </p>
            </div>
            <div className="p-8 rounded-3xl bg-muted/30 border border-border/50 hover:border-accent/50 transition-colors">
              <Clock className="w-10 h-10 text-accent mb-6" />
              <h3 className="text-2xl font-bold mb-4 text-foreground">Free {city} Delivery</h3>
              <p className="text-muted-foreground leading-relaxed">
                Sign your paperwork digitally and we'll deliver your new {brand} directly to your driveway in {city}.
              </p>
            </div>
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
      <section className="py-24 section-bg text-center">
        <BackgroundEffects />
        <div className="container relative z-10 mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-section mb-6">
              Ready to drive your new {brand}?
            </h2>
            <p className="text-xl text-section-muted mb-10">
              Let us run the numbers. It costs nothing to get a quote from us.
            </p>
            <MagneticButton strength={0.2}>
              <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground glow-blue h-16 px-10 text-lg rounded-2xl">
                <Link to={`/contact?vehicle=\${brand}`}>Start Your {brand} Search <ArrowRight className="ml-2 w-5 h-5" /></Link>
              </Button>
            </MagneticButton>
          </div>
        </div>
      </section>

      <RelatedServices />
    </Layout>
  );
}
