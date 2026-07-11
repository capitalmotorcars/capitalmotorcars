import { useState, useEffect } from 'react';
import { Layout } from '@/components/layout/Layout';
import { SEO } from '@/components/SEO';
import { JsonLd, createWebPageSchema } from '@/components/JsonLd';
import { ServiceHero } from '@/components/services/ServiceHero';
import { TrustStatsBar } from '@/components/shared/TrustStatsBar';
import { ContactForm } from '@/components/forms/ContactForm';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Phone, ArrowRight, ShieldCheck, CheckCircle2, Zap, Landmark, BadgeDollarSign, LucideIcon } from 'lucide-react';
import { getAllVehicleTypes } from '@/services/vehicleTypeService';
import { VehicleType } from '@/types/vehicle';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { motion } from 'motion/react';

export interface CategoryLandingTemplateProps {
  seoTitle: string;
  seoDescription: string;
  seoKeywords: string[];
  canonicalPath: string;
  heroImage: string;
  categoryName: string;
  heroSubtitle: string;
  benefits: {
    title: string;
    description: string;
    icon: LucideIcon;
  }[];
  faqs: {
    question: string;
    answer: string;
  }[];
  vehicleFilterMatch: (vehicle: VehicleType) => boolean;
}

export function CategoryLandingTemplate({
  seoTitle,
  seoDescription,
  seoKeywords,
  canonicalPath,
  heroImage,
  categoryName,
  heroSubtitle,
  benefits,
  faqs,
  vehicleFilterMatch
}: CategoryLandingTemplateProps) {
  const navigate = useNavigate();
  const [vehicles, setVehicles] = useState<VehicleType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchVehicles() {
      const response = await getAllVehicleTypes();
      if (response.success && response.data) {
        // Filter and get top 3 vehicles for this category
        const matched = response.data.filter(vehicleFilterMatch).slice(0, 3);
        setVehicles(matched);
      }
      setIsLoading(false);
    }
    fetchVehicles();
  }, [vehicleFilterMatch]);

  return (
    <Layout>
      <SEO
        title={seoTitle}
        description={seoDescription}
        seoKeywords={seoKeywords}
        ogImage={heroImage}
        canonicalPath={canonicalPath}
      />
      <JsonLd data={[
        createWebPageSchema({
          name: seoTitle,
          description: seoDescription,
          url: `https://www.capitalmotorcars.com${canonicalPath}`
        })
      ]} />

      <ServiceHero
        badge="Top Deals"
        title={`${categoryName} Lease Deals`}
        highlightedTitle=""
        subtitle={heroSubtitle}
        heroImage={heroImage}
        primaryAction={{ label: "Contact Us", href: "/contact" }}
        secondaryAction={{ label: "Call Us", href: "tel:+12015095555", icon: Phone }}
      />
      
      <TrustStatsBar />

      {/* Popular Models Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-black uppercase mb-4">Popular {categoryName}s</h2>
            <p className="text-lg text-muted-foreground">Check out some of our most aggressively priced and highly requested {categoryName} models available for immediate delivery.</p>
          </div>

          {isLoading ? (
             <div className="flex justify-center py-12"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent"></div></div>
          ) : vehicles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {vehicles.map((vehicle, index) => (
                <motion.div
                  key={vehicle.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-muted/5 rounded-3xl border border-border/50 overflow-hidden flex flex-col hover:border-accent/40 transition-colors group"
                >
                  <div className="p-8 pb-0 flex-1">
                    <h3 className="text-2xl font-black mb-2">{vehicle.name}</h3>
                    {Boolean(vehicle.startingPrice) && (
                      <div className="flex items-baseline gap-1 mb-4">
                        <span className="text-2xl font-bold text-accent">${vehicle.startingPrice}</span>
                        <span className="text-sm text-muted-foreground">/mo</span>
                      </div>
                    )}
                    {vehicle.image && (
                      <div className="relative h-48 mt-4 group-hover:scale-105 transition-transform duration-500">
                        <img src={vehicle.image} alt={vehicle.name} className="w-full h-full object-contain" />
                      </div>
                    )}
                  </div>
                  <div className="p-6 mt-auto">
                    <Button
                      onClick={() => navigate(`/vehicles/${vehicle.slug}`)}
                      className="w-full h-12 rounded-xl bg-accent text-accent-foreground font-bold tracking-wide uppercase text-xs hover:bg-accent/90"
                    >
                      View Specials <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <p className="text-center text-muted-foreground py-8">No specific vehicles found. Contact us for custom quotes on any {categoryName}!</p>
          )}
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 md:py-24 bg-muted/10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black uppercase mb-4">Why Lease a {categoryName}?</h2>
            <p className="text-lg text-muted-foreground">Discover the unique advantages of securing a zero down lease for your next {categoryName}.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div key={index} className="bg-background rounded-[2rem] p-8 border border-border/50 text-center hover:border-accent/40 transition-colors shadow-lg">
                  <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <Icon className="w-8 h-8 text-accent" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{benefit.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{benefit.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-black uppercase mb-4">{categoryName} Leasing FAQs</h2>
            <p className="text-lg text-muted-foreground">Everything you need to know about leasing a {categoryName}.</p>
          </div>
          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="bg-muted/5 border border-border/10 rounded-2xl px-6 data-[state=open]:border-accent/20 transition-colors">
                <AccordionTrigger className="text-left font-bold text-lg hover:no-underline py-6">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed pb-6">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* CTA / Form Section */}
      <section className="py-16 md:py-24 bg-muted/5 relative overflow-hidden border-t border-border/10">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/20 pointer-events-none" />
        <div className="container mx-auto px-4 max-w-4xl text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-black uppercase mb-6">Ready to Lease a {categoryName}?</h2>
          <p className="text-lg text-muted-foreground mb-12">
            Tell us exactly what you're looking for, and our expert brokers will find the perfect match at the lowest price possible.
          </p>
          <div className="bg-background/95 backdrop-blur-xl rounded-[3rem] p-8 md:p-12 border-2 border-accent/20 shadow-2xl relative overflow-hidden text-left">
            <ContactForm 
              source="category_page"
              hideServiceField={true}
              initialValues={{ message: `I am interested in leasing a ${categoryName}. Please contact me with your best zero down lease deals.` }}
            />
          </div>
        </div>
      </section>
    </Layout>
  );
}
