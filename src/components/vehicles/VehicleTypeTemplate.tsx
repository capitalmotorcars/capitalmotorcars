import { Layout } from '@/components/layout/Layout';
import { SEO } from '@/components/SEO';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ContactForm } from '@/components/forms/ContactForm';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { Check, Star, Users, Zap } from 'lucide-react';
import { VehicleTypeData } from '@/data/vehicleTypes';
import { cn } from '@/lib/utils';

interface VehicleTypeTemplateProps {
  vehicle: VehicleTypeData;
}

export function VehicleTypeTemplate({ vehicle }: VehicleTypeTemplateProps) {
  const { ref: heroRef, isRevealed: heroRevealed } = useScrollReveal();
  const { ref: highlightsRef, isRevealed: highlightsRevealed } = useScrollReveal();
  const { ref: idealRef, isRevealed: idealRevealed } = useScrollReveal();
  const { ref: featuresRef, isRevealed: featuresRevealed } = useScrollReveal();
  const { ref: formRef, isRevealed: formRevealed } = useScrollReveal();

  return (
    <Layout>
      <SEO title={vehicle.metaTitle} description={vehicle.metaDescription} />

      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center bg-gradient-to-br from-background via-muted/50 to-background overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,hsl(var(--accent)/0.08),transparent_50%)]" />
        
        <div
          ref={heroRef}
          className={cn(
            'container mx-auto px-4 lg:px-8 py-16 md:py-24 scroll-reveal',
            heroRevealed && 'revealed'
          )}
        >
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-medium">
                <Star className="w-4 h-4" />
                {vehicle.name} Vehicles
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                {vehicle.name} Car Leasing
              </h1>
              
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-xl">
                {vehicle.description}
              </p>
              
              <div className="flex flex-wrap gap-2 pt-4">
                {vehicle.popularBrands.slice(0, 5).map((brand) => (
                  <span
                    key={brand}
                    className="px-3 py-1.5 rounded-full bg-muted text-sm font-medium text-foreground/80"
                  >
                    {brand}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="relative flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-r from-accent/10 via-transparent to-accent/5 rounded-3xl blur-3xl" />
              <img
                src={vehicle.image}
                alt={`${vehicle.name} vehicle`}
                className="relative w-full max-w-lg h-auto object-contain drop-shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Highlights Section */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div
          ref={highlightsRef}
          className={cn(
            'container mx-auto px-4 lg:px-8 scroll-reveal',
            highlightsRevealed && 'revealed'
          )}
        >
          <SectionHeading
            title="Why Choose a Luxury Vehicle?"
            subtitle={`Key benefits of ${vehicle.name.toLowerCase()} vehicles`}
          />
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {vehicle.highlights.map((highlight, index) => (
              <div
                key={index}
                className="group p-6 rounded-2xl bg-background border border-border/50 hover:border-accent/30 hover:shadow-lg transition-all duration-300"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                  <Zap className="w-6 h-6 text-accent" />
                </div>
                <p className="text-foreground font-medium">{highlight}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ideal For Section */}
      <section className="py-16 md:py-24">
        <div
          ref={idealRef}
          className={cn(
            'container mx-auto px-4 lg:px-8 scroll-reveal',
            idealRevealed && 'revealed'
          )}
        >
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-medium mb-6">
                <Users className="w-4 h-4" />
                Perfect Match
              </div>
              
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Who Is This For?
              </h2>
              
              <ul className="space-y-4">
                {vehicle.idealFor.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-4 h-4 text-accent" />
                    </div>
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              {vehicle.features.slice(0, 4).map((feature, index) => (
                <div
                  key={index}
                  className="p-5 rounded-xl bg-muted/50 border border-border/30"
                >
                  <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center mb-3">
                    <Star className="w-5 h-5 text-accent" />
                  </div>
                  <p className="text-sm font-medium text-foreground">{feature}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div
          ref={featuresRef}
          className={cn(
            'container mx-auto px-4 lg:px-8 scroll-reveal',
            featuresRevealed && 'revealed'
          )}
        >
          <SectionHeading
            title="Key Features"
            subtitle={`What makes ${vehicle.name.toLowerCase()} vehicles special`}
          />
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {vehicle.features.map((feature, index) => (
              <div
                key={index}
                className="flex items-center gap-4 p-4 rounded-xl bg-background border border-border/50"
              >
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                  <Check className="w-5 h-5 text-accent" />
                </div>
                <span className="text-foreground">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-16 md:py-24">
        <div
          ref={formRef}
          className={cn(
            'container mx-auto px-4 lg:px-8 scroll-reveal',
            formRevealed && 'revealed'
          )}
        >
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Interested in a {vehicle.name} Vehicle?
              </h2>
              <p className="text-lg text-muted-foreground">
                Let us help you find the perfect {vehicle.name.toLowerCase()} vehicle. Fill out the form below and our team will get back to you shortly.
              </p>
            </div>
            
            <div className="bg-background border border-border/50 rounded-2xl p-6 md:p-8 shadow-lg">
              <ContactForm
                initialValues={{ vehicleType: vehicle.slug }}
                hideServiceField
                showVehicleField={false}
              />
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
