import { Link } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { SEO } from '@/components/SEO';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ContactForm } from '@/components/forms/ContactForm';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { Award, Check, Fuel, Gauge, Package, Shield, Star, TrendingUp, Users, Zap } from 'lucide-react';
import { VehicleTypeData, vehicleTypes } from '@/data/vehicleTypes';
import type { FuelType } from '@/data/vehicleTypes';
import { cn } from '@/lib/utils';

function formatFuel(fuel: FuelType): string {
  return fuel.charAt(0).toUpperCase() + fuel.slice(1);
}
function formatCargo(space: 'small' | 'medium' | 'large'): string {
  return space.charAt(0).toUpperCase() + space.slice(1);
}

const BENEFIT_ICONS = [Zap, Shield, TrendingUp, Award] as const;

interface VehicleTypeTemplateProps {
  vehicle: VehicleTypeData;
}

export function VehicleTypeTemplate({ vehicle }: VehicleTypeTemplateProps) {
  const { ref: heroRef, isRevealed: heroRevealed } = useScrollReveal();
  const { ref: browseRef, isRevealed: browseRevealed } = useScrollReveal();
  const { ref: highlightsRef, isRevealed: highlightsRevealed } = useScrollReveal();
  const { ref: idealRef, isRevealed: idealRevealed } = useScrollReveal();
  const { ref: formRef, isRevealed: formRevealed } = useScrollReveal();

  return (
    <Layout>
      <SEO
        title={vehicle.metaTitle}
        description={vehicle.metaDescription}
        canonicalPath={vehicle.canonicalPath}
        seoKeywords={vehicle.seoKeywords}
      />

      {/* Hero Section — theme-aware */}
      <section className="relative min-h-[45vh] flex items-center overflow-hidden pt-10 sm:pt-12 md:pt-14">
       {/* Main soft glow */}
<div
  className="absolute inset-0 
    bg-[radial-gradient(circle_at_30%_40%,hsl(214_77%_55%_/_0.12),transparent_55%)]
    dark:bg-[radial-gradient(circle_at_30%_40%,hsl(214_77%_55%_/_0.18),transparent_55%)]"
  aria-hidden
/>

{/* Secondary depth glow */}
<div
  className="absolute inset-0 
    bg-[radial-gradient(ellipse_90%_60%_at_75%_80%,hsl(220_65%_60%_/_0.06),transparent_60%)]
    dark:bg-[radial-gradient(ellipse_90%_60%_at_75%_80%,hsl(220_65%_60%_/_0.09),transparent_60%)]"
  aria-hidden
/>

{/* Subtle vignette to "lock" the edges */}
<div
  className="absolute inset-0 
    bg-[radial-gradient(circle_at_center,transparent_40%,rgba(0,0,0,0.04))]
    dark:bg-[radial-gradient(circle_at_center,transparent_40%,rgba(0,0,0,0.25))]"
  aria-hidden
/>
        <div
          ref={heroRef}
          className={cn(
            'container relative mx-auto px-4  scroll-reveal',
            heroRevealed && 'revealed'
          )}
        >
          <div className="grid lg:grid-cols-2 gap-12 md:gap-16 lg:gap-24 xl:gap-28 items-center">
            <div className="space-y-6">
              <div className="flex flex-wrap items-center gap-2">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border dark:border-white/10 bg-card/80 dark:bg-white/[0.08] text-accent text-sm font-medium">
                  <Star className="w-4 h-4" />
                  {vehicle.name} Vehicles
                </div>
                {vehicle.badge && (
                  <span
                    className={cn(
                      'inline-flex px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider',
                      vehicle.badge === 'Eco Friendly' && 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border border-emerald-500/30',
                      vehicle.badge === 'Popular' && 'bg-accent/15 text-accent border border-accent/30',
                      vehicle.badge === 'Best Seller' && 'bg-amber-500/15 text-amber-700 dark:text-amber-400 border border-amber-500/30',
                      vehicle.badge === 'New' && 'bg-blue-500/15 text-blue-700 dark:text-blue-400 border border-blue-500/30'
                    )}
                  >
                    {vehicle.badge}
                  </span>
                )}
              </div>
             
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight line-clamp-2">
                <span className="text-foreground">Find Your Perfect </span>
                <span className="text-gradient-vehicle-hero">{vehicle.name} Leasing</span>
              </h1>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl text-muted-foreground leading-relaxed max-w-xl">
                {vehicle.description}
              </p>
              <div className="flex flex-wrap items-center gap-3">
                {vehicle.startingPrice != null && (
                  <span className="text-lg sm:text-xl font-semibold text-foreground dark:text-white">
                    From ${vehicle.startingPrice.toLocaleString()}/mo
                  </span>
                )}
                {vehicle.ctaText && (
                  <a
                    href="#contact"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-accent text-accent-foreground text-sm font-semibold hover:opacity-90 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    {vehicle.ctaText}
                  </a>
                )}
              </div>
              {/* Specs strip */}
              <div className="flex flex-wrap gap-4 sm:gap-6 pt-2 text-sm text-muted-foreground dark:text-white/70">
                {vehicle.fuelTypes?.length > 0 && (
                  <span className="inline-flex items-center gap-1.5">
                    <Fuel className="w-4 h-4 text-accent/80" />
                    {vehicle.fuelTypes.map(formatFuel).join(', ')}
                  </span>
                )}
                {vehicle.drivetrain?.length > 0 && (
                  <span className="inline-flex items-center gap-1.5">
                    <Gauge className="w-4 h-4 text-accent/80" />
                    {vehicle.drivetrain.join(', ')}
                  </span>
                )}
                <span className="inline-flex items-center gap-1.5">
                  <Users className="w-4 h-4 text-accent/80" />
                  {vehicle.passengerCapacity} seats
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Package className="w-4 h-4 text-accent/80" />
                  {formatCargo(vehicle.cargoSpace)} cargo
                </span>
              </div>
              <div className="flex flex-wrap gap-2 pt-2">
                {vehicle.popularBrands.slice(0, 5).map((brand) => (
                  <span
                    key={brand}
                    className="px-3 py-1.5 rounded-full border border-border dark:border-white/10 bg-card/80 dark:bg-white/[0.08] text-sm font-medium text-foreground dark:text-white/90"
                  >
                    {brand}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="relative flex items-center justify-center w-full max-w-xl min-w-0 h-[280px] sm:h-[320px] md:h-[400px] lg:h-[420px] px-4 md:px-0">
              <img
                src={vehicle.image}
                alt={`${vehicle.name} vehicle`}
                className="relative w-full h-full object-contain drop-shadow-2xl "
              />
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose + Key Features — one section, two columns (Benefits | Features) */}
      <section className="py-8 md:py-16 lg:py-20 section-bg">
        <div
          ref={highlightsRef}
          className={cn(
            'container mx-auto px-4 lg:px-8 scroll-reveal',
            highlightsRevealed && 'revealed'
          )}
        >
          <SectionHeading
            title={`Why Choose a ${vehicle.name} Vehicle?`}
            subtitle={`Benefits and features that make ${vehicle.name.toLowerCase()} vehicles a great choice`}
          />
          {/* One card: Benefits | Features on top, Who Is This For? below */}
          <div
            ref={idealRef}
            className={cn(
              'max-w-6xl mx-auto mt-8 md:mt-12 rounded-2xl border border-border dark:border-white/10 bg-card dark:bg-white/[0.04] shadow-sm dark:shadow-[0_8px_32px_rgba(0,0,0,0.2)] overflow-hidden',
              highlightsRevealed && 'stagger-in stagger-in-1'
            )}
          >
            {/* Row 1: Key benefits | Key features */}
            <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-border dark:divide-white/10">
              <div className="p-6 md:p-8 lg:p-10">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground dark:text-white/70 mb-6">
                  Key benefits
                </h3>
                <ul className="space-y-4">
                  {vehicle.highlights.map((highlight, index) => {
                    const Icon = BENEFIT_ICONS[index % BENEFIT_ICONS.length];
                    return (
                      <li
                        key={index}
                        className={cn(
                          'flex gap-4',
                          highlightsRevealed && 'stagger-in',
                          highlightsRevealed && `stagger-in-${Math.min(index + 1, 4)}`
                        )}
                      >
                        <span className="shrink-0 w-10 h-10 rounded-xl border border-border dark:border-white/10 bg-muted/50 dark:bg-white/5 flex items-center justify-center">
                          <Icon className="w-5 h-5 text-accent" />
                        </span>
                        <span className="text-foreground dark:text-white/90 font-medium pt-2">{highlight}</span>
                      </li>
                    );
                  })}
                </ul>
              </div>
              <div className="p-6 md:p-8 lg:p-10 bg-muted/20 dark:bg-white/[0.02]">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground dark:text-white/70 mb-6">
                  Key features
                </h3>
                <ul className="space-y-3">
                  {vehicle.features.map((feature, index) => (
                    <li
                      key={index}
                      className={cn(
                        'flex items-center gap-3',
                        highlightsRevealed && 'stagger-in',
                        highlightsRevealed && `stagger-in-${Math.min(index + 1, 8)}`
                      )}
                    >
                      <span className="shrink-0 w-6 h-6 rounded-full bg-accent/15 dark:bg-accent/25 flex items-center justify-center">
                        <Check className="w-3.5 h-3.5 text-accent" strokeWidth={2.5} />
                      </span>
                      <span className="text-foreground dark:text-white/90 text-sm sm:text-base">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Row 2: Who Is This For? — clean pills */}
            <div
              className={cn(
                'border-t border-border dark:border-white/10 p-6 md:p-8 lg:p-10 scroll-reveal',
                'bg-muted/20 dark:bg-white/[0.02]',
                idealRevealed && 'revealed'
              )}
            >
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-foreground mb-1">
                Who Is This For?
              </h2>
              <p className="text-muted-foreground dark:text-white/70 text-sm sm:text-base mb-6">
                A {vehicle.name.toLowerCase()} vehicle is ideal if you…
              </p>
              <div className="flex flex-wrap gap-2 sm:gap-3">
                {vehicle.idealFor.map((item, index) => (
                  <span
                    key={index}
                    className={cn(
                      'inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium',
                      'bg-background/80 dark:bg-white/[0.06] border border-border dark:border-white/10',
                      'text-foreground dark:text-white/90',
                      'hover:border-accent/30 hover:bg-accent/5 dark:hover:bg-accent/10 transition-colors',
                      idealRevealed && 'stagger-in',
                      idealRevealed && `stagger-in-${Math.min(index + 1, 6)}`
                    )}
                  >
                    <Check className="w-4 h-4 shrink-0 text-accent" strokeWidth={2.5} />
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section — theme-aware */}
      <section id="contact" className="py-8 md:py-16 lg:py-20 section-bg">
        <div
          ref={formRef}
          className={cn(
            'container mx-auto px-4 lg:px-8 scroll-reveal',
            formRevealed && 'revealed'
          )}
        >
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-6 md:mb-10">
              <h2 className="text-xl sm:text-2xl md:text-4xl font-bold text-foreground mb-4">
                Interested in a {vehicle.name} Vehicle?
              </h2>
              <p className="text-lg text-muted-foreground">
                Let us help you find the perfect {vehicle.name.toLowerCase()} vehicle. Fill out the form below and our team will get back to you shortly.
              </p>
            </div>
            
            <div className={cn(
              'glass-card-theme form-card-theme rounded-2xl p-4 sm:p-6 md:p-8',
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

      {/* Explore other vehicle types — at bottom */}
      <section className="py-10 md:py-16 section-bg border-t border-section">
        <div
          ref={browseRef}
          className={cn(
            'container mx-auto px-4 lg:px-8 scroll-reveal',
            browseRevealed && 'revealed'
          )}
        >
          <SectionHeading
            title="Explore other vehicle types"
            subtitle="Switch to any category below—no need to go back to the homepage."
          />
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4 mt-8">
            {vehicleTypes.map((type) => {
              const isCurrent = type.slug === vehicle.slug;
              const cardContent = (
                <>
                  <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden bg-card dark:bg-white/[0.04] border border-border dark:border-white/10 flex items-center justify-center p-2">
                    <img
                      src={type.image}
                      alt=""
                      className="w-full h-full object-contain"
                      loading="lazy"
                    />
                    {isCurrent && (
                      <span className="absolute top-2 right-2 px-2 py-0.5 rounded-md bg-accent text-accent-foreground text-[10px] font-semibold uppercase tracking-wider">
                        You're here
                      </span>
                    )}
                  </div>
                  <span className="block mt-2 text-sm font-semibold text-foreground text-center">
                    {type.name}
                  </span>
                </>
              );
              if (isCurrent) {
                return (
                  <div
                    key={type.slug}
                    className={cn(
                      'flex flex-col rounded-2xl p-3 border border-accent/40 bg-accent/10 dark:bg-accent/15',
                      'opacity-90 cursor-default'
                    )}
                  >
                    {cardContent}
                  </div>
                );
              }
              return (
                <Link
                  key={type.slug}
                  to={`/vehicles/${type.slug}`}
                  className={cn(
                    'flex flex-col rounded-2xl p-3 border border-border dark:border-white/10 bg-card dark:bg-white/[0.04]',
                    'hover:border-accent/40 hover:bg-muted/50 dark:hover:bg-white/[0.06] transition-all duration-200',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background'
                  )}
                >
                  {cardContent}
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </Layout>
  );
}
