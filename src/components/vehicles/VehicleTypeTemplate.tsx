import { Layout } from '@/components/layout/Layout';
import { SEO } from '@/components/SEO';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { SectionDivider } from '@/components/ui/SectionDivider';
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

      {/* Hero Section - dark, brand-aligned */}
      <section className="relative min-h-[60vh] flex items-center overflow-hidden" style={{ backgroundColor: 'hsl(0 0% 3%)' }}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,hsl(214_77%_50%_/_0.06),transparent_50%)]" aria-hidden />
        
        <div
          ref={heroRef}
          className={cn(
            'container mx-auto px-4 lg:px-8 py-10 md:py-16 lg:py-24 max-md:py-6 scroll-reveal',
            heroRevealed && 'revealed'
          )}
        >
          <div className="grid lg:grid-cols-2 gap-12 max-md:gap-6 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/[0.08] text-accent text-sm font-medium">
                <Star className="w-4 h-4" />
                {vehicle.name} Vehicles
              </div>
              
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight line-clamp-2">
                <span className="text-gradient-heading-dark">Find Your Perfect </span>
                <span className="text-gradient-hero-highlight">{vehicle.name} Leasing</span>
              </h1>
              
              <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white/85 leading-relaxed max-w-xl">
                {vehicle.description}
              </p>
              
              <div className="flex flex-wrap gap-2 pt-4">
                {vehicle.popularBrands.slice(0, 5).map((brand) => (
                  <span
                    key={brand}
                    className="px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.08] text-sm font-medium text-white/90"
                  >
                    {brand}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="relative flex items-center justify-center w-full max-w-lg min-w-0 h-[260px] sm:h-[280px] md:h-[340px] px-4 md:px-0 rounded-lg ring-1 ring-white/10">
              <div className="absolute inset-0 bg-gradient-to-r from-accent/10 via-transparent to-accent/5 rounded-xl blur-3xl" aria-hidden />
              <img
                src={vehicle.image}
                alt={`${vehicle.name} vehicle`}
                className="relative w-full h-full object-contain drop-shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      <SectionDivider variant="curved" nextSectionDark />

      {/* Highlights Section - dark, glass cards, stagger */}
      <section className="py-8 md:py-16 lg:py-20 bg-[hsl(0_0%_4%)]">
        <div
          ref={highlightsRef}
          className={cn(
            'container mx-auto px-4 lg:px-8 scroll-reveal',
            highlightsRevealed && 'revealed'
          )}
        >
          <SectionHeading
            title={`Why Choose a ${vehicle.name} Vehicle?`}
            subtitle={`Key benefits of ${vehicle.name.toLowerCase()} vehicles`}
            dark
          />
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mt-8 md:mt-12">
            {vehicle.highlights.map((highlight, index) => (
              <div
                key={index}
                className={cn(
                  'group p-4 sm:p-5 md:p-6 rounded-xl border border-white/10 bg-white/[0.06] backdrop-blur-sm hover:border-accent/30 transition-all duration-300 hover:shadow-[0_0_20px_hsl(214_77%_50%_/_0.08)]',
                  highlightsRevealed && 'stagger-in',
                  highlightsRevealed && index === 0 && 'stagger-in-1',
                  highlightsRevealed && index === 1 && 'stagger-in-2',
                  highlightsRevealed && index === 2 && 'stagger-in-3',
                  highlightsRevealed && index === 3 && 'stagger-in-4'
                )}
              >
                <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                  <Zap className="w-6 h-6 text-accent" />
                </div>
                <p className="text-white font-medium">{highlight}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ideal For Section - dark, glass */}
      <section className="py-8 md:py-16 lg:py-20 bg-[hsl(0_0%_4%)]">
        <div
          ref={idealRef}
          className={cn(
            'container mx-auto px-4 lg:px-8 scroll-reveal',
            idealRevealed && 'revealed'
          )}
        >
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/[0.08] text-accent text-sm font-medium mb-6">
                <Users className="w-4 h-4" />
                Perfect Match
              </div>
              
              <h2 className="text-xl sm:text-2xl md:text-4xl font-bold text-white mb-6">
                Who Is This For?
              </h2>
              
              <ul className="space-y-4">
                {vehicle.idealFor.map((item, index) => (
                  <li
                    key={index}
                    className={cn(
                      'flex items-start gap-3',
                      idealRevealed && 'stagger-in',
                      idealRevealed && `stagger-in-${Math.min(index + 1, 8)}`
                    )}
                  >
                    <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-4 h-4 text-accent" />
                    </div>
                    <span className="text-white/85">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              {vehicle.features.slice(0, 4).map((feature, index) => (
                <div
                  key={index}
                  className={cn(
                    'p-4 sm:p-5 rounded-xl border border-white/10 bg-white/[0.06] backdrop-blur-sm hover:border-accent/30 transition-all duration-300',
                    idealRevealed && 'stagger-in',
                    idealRevealed && `stagger-in-${Math.min(index + 1, 8)}`
                  )}
                >
                  <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center mb-3">
                    <Star className="w-5 h-5 text-accent" />
                  </div>
                  <p className="text-sm font-medium text-white">{feature}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - dark, glass */}
      <section className="py-8 md:py-16 lg:py-20 bg-[hsl(0_0%_4%)]">
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
            dark
          />
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mt-8 md:mt-12">
            {vehicle.features.map((feature, index) => (
              <div
                key={index}
                className={cn(
                  'flex items-center gap-4 p-4 rounded-xl border border-white/10 bg-white/[0.06] backdrop-blur-sm hover:border-accent/30 transition-all duration-300',
                  featuresRevealed && 'stagger-in',
                  featuresRevealed && `stagger-in-${Math.min(index + 1, 8)}`
                )}
              >
                <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
                  <Check className="w-5 h-5 text-accent" />
                </div>
                <span className="text-white">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section - dark, glass form */}
      <section className="py-8 md:py-16 lg:py-20 bg-[hsl(0_0%_4%)]">
        <div
          ref={formRef}
          className={cn(
            'container mx-auto px-4 lg:px-8 scroll-reveal',
            formRevealed && 'revealed'
          )}
        >
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-6 md:mb-10">
              <h2 className="text-xl sm:text-2xl md:text-4xl font-bold text-white mb-4">
                Interested in a {vehicle.name} Vehicle?
              </h2>
              <p className="text-lg text-white/85">
                Let us help you find the perfect {vehicle.name.toLowerCase()} vehicle. Fill out the form below and our team will get back to you shortly.
              </p>
            </div>
            
            <div className={cn(
              'border border-white/10 bg-white/[0.06] backdrop-blur-sm rounded-xl p-4 sm:p-6 md:p-8 shadow-[0_0_20px_hsl(214_77%_50%_/_0.05)] [&_label]:text-white [&_input]:bg-white/10 [&_input]:border-white/25 [&_input]:text-white [&_input]:placeholder:text-white/60 [&_textarea]:bg-white/10 [&_textarea]:border-white/25 [&_textarea]:text-white [&_textarea]:placeholder:text-white/60 [&_.text-muted-foreground]:text-white/90 [&_button:not([type=submit])]:bg-white/10 [&_button:not([type=submit])]:border-white/25 [&_button:not([type=submit])]:text-white [&_button:not([type=submit])_[data-placeholder]]:text-white/60',
              formRevealed && 'stagger-in stagger-in-1'
            )}>
              <ContactForm
                source="vehicle"
                vehicleName={vehicle.name}
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
