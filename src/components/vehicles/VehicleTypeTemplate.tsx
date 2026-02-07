import * as React from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { Link } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { SEO } from '@/components/SEO';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ContactForm } from '@/components/forms/ContactForm';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { motion } from 'motion/react';
import { Award, Check, Fuel, Gauge, Package, Shield, Star, TrendingUp, Users, Zap, ArrowRight, DollarSign, Calendar, MapPin, X, FileText, Phone, Car, CreditCard } from 'lucide-react';
import { VehicleTypeData, vehicleTypes } from '@/data/vehicleTypes';
import type { FuelType } from '@/data/vehicleTypes';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Marquee } from '@/components/ui/Marquee';

function formatFuel(fuel: FuelType): string {
  return fuel.charAt(0).toUpperCase() + fuel.slice(1);
}
function formatCargo(space: 'small' | 'medium' | 'large'): string {
  return space.charAt(0).toUpperCase() + space.slice(1);
}

const BENEFIT_ICONS = [Zap, Shield, TrendingUp, Award] as const;

const dialogFadeTransition = { type: 'tween' as const, duration: 0.4, ease: 'easeOut' as const };
const cardClass = cn(
  'rounded-2xl border bg-card overflow-hidden',
  'border-border dark:border-white/20 dark:bg-white/[0.03] dark:border-white/5 dark:shadow-black/30',
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
);
const dialogPanelClass = cn(
  cardClass,
  'dark:bg-[#121212] dark:border-white/5 dark:shadow-black/30',
);

const testimonials = [
  {
    quote: "I recently leased my 2024 BMW from Capital Motor Cars & I have to say my experience was 10000/10. I couldn't be more happy with the entirety of the service. From start to finish it was so good. Henry really took care of everything, he made the entire process seamless. Not only did he find the exact vehicle I wanted but he also got me a way better number than my local dealership AND delivered the vehicle to my home.",
    author: 'K L',
    stars: 5,
  },
  {
    quote: "This review serves to express my sincere appreciation for the outstanding sales service Chris at Capital Motors has given me throughout my x5 lease. Chris went above and beyond to make sure I purchased the SUV I was most comfortable with. He gave me suggestions and his advice, but was in no way pushy what-so-ever.",
    author: 'Dina Ishak Manasra',
    stars: 5,
  },
  {
    quote: "It was delightful working with Chris from Capital Motor Cars! In a time where getting a car is impossible, Chris made it possible! I was able to build my X5 and have it delivered in 4 weeks! The process from the beginning was super easy, fast and pick up/delivery was efficient.",
    author: 'Michelle Catalano',
    stars: 5,
  },
  {
    quote: "Dave B. was incredible! Answered my many many questions and made me feel very comfortable with my new car! Mike M. made the transaction so easy and smooth! I will certainly be working with both Dave and Mike in the future!",
    author: 'Mia Carratura',
    stars: 5,
  },
  {
    quote: "Working with Chris at Capital Motors Cars was an amazing experience! It was difficult for me to find new car for a good price, but Chris made the possible for me. Capital Motor Cars made everything convenient for me and as simple as it could get.",
    author: 'Robert Smolyansky',
    stars: 5,
  },
];

function getVehicleFaqs(vehicle: VehicleTypeData) {
  return [
    {
      question: `How much does it cost to lease a ${vehicle.name}?`,
      answer: `Lease prices for ${vehicle.name.toLowerCase()} vehicles typically start around $${vehicle.startingPrice?.toLocaleString() || '500'}/month, depending on the specific model, trim level, and lease terms. Final pricing depends on factors like credit score, down payment, mileage allowance, and lease duration. Contact us for a personalized quote.`,
    },
    {
      question: `What credit score do I need to lease a ${vehicle.name}?`,
      answer: `Most leasing companies prefer a credit score of 620 or higher for ${vehicle.name.toLowerCase()} leases. However, we work with multiple lenders and can help find options for various credit situations. We'll work with you to find the best lease terms available.`,
    },
    {
      question: `Can I customize a leased ${vehicle.name}?`,
      answer: `Generally, modifications to leased vehicles are not recommended as you'll need to return the vehicle in its original condition. However, reversible modifications like window tinting or certain accessories may be acceptable. Always check with your leasing company before making any changes.`,
    },
    {
      question: `What happens at the end of my ${vehicle.name} lease?`,
      answer: `At the end of your lease, you have three options: return the vehicle and lease a new one, purchase the vehicle at its residual value, or simply return the vehicle and walk away (subject to any end-of-lease fees). We can help you navigate all these options.`,
    },
    {
      question: `How many miles can I drive on a leased ${vehicle.name}?`,
      answer: `Most leases include 10,000-15,000 miles per year. You can negotiate for more miles upfront, or you'll pay an overage fee (typically $0.15-$0.25 per mile) for exceeding your limit. We can help you choose the right mileage allowance based on your driving habits.`,
    },
  ];
}

const howItWorksSteps = [
  {
    icon: FileText,
    title: 'Tell Us What You Want',
    description: 'Fill out our simple form or give us a call. Share your preferences, budget, and any specific features you\'re looking for.',
  },
  {
    icon: Car,
    title: 'We Find Your Perfect Match',
    description: 'Our team searches through our network of dealers to find the exact vehicle that meets your needs and budget.',
  },
  {
    icon: CreditCard,
    title: 'We Handle the Negotiations',
    description: 'We negotiate the best price and lease terms on your behalf, saving you time and ensuring you get a great deal.',
  },
  {
    icon: MapPin,
    title: 'Delivery to Your Door',
    description: 'Once everything is finalized, we deliver your new vehicle directly to your home or office. No dealership visits required!',
  },
];

function TestimonialCard({
  quote,
  author,
  stars,
  open,
  onOpenChange,
}: {
  quote: string;
  author: string;
  stars: number;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Trigger asChild>
        <button
          type="button"
          className={cn(
            'relative flex w-[340px] shrink-0 cursor-pointer flex-col rounded-xl border p-5 md:p-6 text-left',
            'bg-white/90 border-border/80 shadow-black/5',
            'dark:bg-white/[0.03] dark:border-white/5 dark:shadow-black/30',
            'backdrop-blur-sm transition-all duration-300 hover:shadow-md hover:border-accent/30',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2'
          )}
          aria-label={`Read full review by ${author}`}
        >
          <div className="flex gap-0.5 mb-3 text-amber-500" aria-label={`${stars} out of 5 stars`}>
            {Array.from({ length: stars }).map((_, i) => (
              <Star key={i} className="h-4 w-4 fill-current" aria-hidden />
            ))}
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed line-clamp-4 flex-1">{quote}</p>
          <p className="mt-4 text-xs font-semibold text-foreground">{author}</p>
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay asChild>
          <motion.div
            className="fixed inset-0 z-50 bg-black/5 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={dialogFadeTransition}
          />
        </Dialog.Overlay>
        <Dialog.Content asChild>
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={dialogFadeTransition}
            onClick={(e) => e.target === e.currentTarget && onOpenChange(false)}
          >
            <div className={cn(dialogPanelClass, 'w-full max-w-lg p-6 md:p-8 max-h-[85vh] overflow-y-auto')}>
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0 flex-1">
                  <div className="flex gap-0.5 mb-3 text-amber-500" aria-label={`${stars} out of 5 stars`}>
                    {Array.from({ length: stars }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-current" aria-hidden />
                    ))}
                  </div>
                  <p className="text-xl font-semibold text-foreground">{author}</p>
                </div>
                <Dialog.Close asChild>
                  <button type="button" className="shrink-0 rounded-lg p-2 text-muted-foreground hover:bg-muted hover:text-foreground" aria-label="Close">
                    <X className="h-5 w-5" />
                  </button>
                </Dialog.Close>
              </div>
              <p className="mt-4 text-muted-foreground leading-relaxed whitespace-pre-line">{quote}</p>
            </div>
          </motion.div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

interface VehicleTypeTemplateProps {
  vehicle: VehicleTypeData;
}

export function VehicleTypeTemplate({ vehicle }: VehicleTypeTemplateProps) {
  const { ref: heroRef, isRevealed: heroRevealed } = useScrollReveal();
  const { ref: browseRef, isRevealed: browseRevealed } = useScrollReveal();
  const { ref: highlightsRef, isRevealed: highlightsRevealed } = useScrollReveal();
  const { ref: idealRef, isRevealed: idealRevealed } = useScrollReveal();
  const { ref: formRef, isRevealed: formRevealed } = useScrollReveal();
  const { ref: specsRef, isRevealed: specsRevealed } = useScrollReveal();
  const { ref: howItWorksRef, isRevealed: howItWorksRevealed } = useScrollReveal();
  const { ref: testimonialsRef, isRevealed: testimonialsRevealed } = useScrollReveal();
  const { ref: faqRef, isRevealed: faqRevealed } = useScrollReveal();
  const [openTestimonialIndex, setOpenTestimonialIndex] = React.useState<number | null>(null);

  return (
    <Layout>
      <SEO
        title={vehicle.metaTitle}
        description={vehicle.metaDescription}
        canonicalPath={vehicle.canonicalPath}
        seoKeywords={vehicle.seoKeywords}
      />

      {/* Hero Section - Premium Design */}
      <section className="relative min-h-[60vh] md:min-h-[70vh] flex items-center overflow-hidden pt-20 sm:pt-24 md:pt-28">
        <div
          className="absolute inset-0 
            bg-[radial-gradient(circle_at_30%_40%,hsl(214_77%_55%_/_0.12),transparent_55%)]
            dark:bg-[radial-gradient(circle_at_30%_40%,hsl(214_77%_55%_/_0.18),transparent_55%)]"
          aria-hidden
        />
        <div
          className="absolute inset-0 
            bg-[radial-gradient(ellipse_90%_60%_at_75%_80%,hsl(220_65%_60%_/_0.06),transparent_60%)]
            dark:bg-[radial-gradient(ellipse_90%_60%_at_75%_80%,hsl(220_65%_60%_/_0.09),transparent_60%)]"
          aria-hidden
        />
        <div
          className="absolute inset-0 
            bg-[radial-gradient(circle_at_center,transparent_40%,rgba(0,0,0,0.04))]
            dark:bg-[radial-gradient(circle_at_center,transparent_40%,rgba(0,0,0,0.25))]"
          aria-hidden
        />
        
        <div
          ref={heroRef}
          className={cn(
            'container relative mx-auto px-4 lg:px-8 scroll-reveal overflow-visible',
            heroRevealed && 'revealed'
          )}
        >
          <div 
          >
            {/* Left Column - Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={heroRevealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5 }}
              className="space-y-6 md:space-y-8"
            >
              <div className="flex flex-wrap items-center gap-3">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border dark:border-white/10 bg-card/80 dark:bg-white/[0.08] backdrop-blur-sm text-accent text-sm font-semibold shadow-sm">
                  <Star className="w-4 h-4" />
                  {vehicle.name} Vehicles
                </div>
                {vehicle.badge && (
                  <span
                    className={cn(
                      'inline-flex px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm',
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
             
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight">
                <span className="text-foreground">Find Your Perfect </span>
                <span className="text-gradient-vehicle-hero bg-clip-text text-transparent bg-gradient-to-r from-accent to-accent/70">
                  {vehicle.name} Leasing
                </span>
              </h1>
              
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground leading-relaxed max-w-2xl">
                {vehicle.description}
              </p>

              {/* Pricing & CTA */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                {vehicle.startingPrice != null && (
                  <div className="flex flex-col">
                    <span className="text-xs sm:text-sm font-medium text-muted-foreground uppercase tracking-wider">
                      Starting at
                    </span>
                    <span className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground">
                      ${vehicle.startingPrice.toLocaleString()}<span className="text-lg sm:text-xl text-muted-foreground font-normal">/mo</span>
                    </span>
                  </div>
                )}
                {vehicle.ctaText && (
                  <Button
                    asChild
                    size="lg"
                    className="h-12 sm:h-14 md:h-16 rounded-xl border border-accent/40 bg-accent hover:bg-accent/90 hover:border-accent text-accent-foreground font-semibold px-6 sm:px-8 md:px-10 text-sm sm:text-base md:text-lg shadow-lg shadow-accent/30 hover:shadow-xl hover:shadow-accent/40 transition-all"
                  >
                    <Link to="#contact" className="flex items-center gap-2">
                      {vehicle.ctaText}
                      <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                    </Link>
                  </Button>
                )}
              </div>

              {/* Quick Specs Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4">
                {vehicle.fuelTypes?.length > 0 && (
                  <div className="flex flex-col gap-1 p-3 rounded-xl border border-border dark:border-white/10 bg-card/50 dark:bg-white/[0.04] backdrop-blur-sm">
                    <Fuel className="w-5 h-5 text-accent mb-1" />
                    <span className="text-xs text-muted-foreground">Fuel</span>
                    <span className="text-sm font-semibold text-foreground">{vehicle.fuelTypes.map(formatFuel).join(', ')}</span>
                  </div>
                )}
                {vehicle.drivetrain?.length > 0 && (
                  <div className="flex flex-col gap-1 p-3 rounded-xl border border-border dark:border-white/10 bg-card/50 dark:bg-white/[0.04] backdrop-blur-sm">
                    <Gauge className="w-5 h-5 text-accent mb-1" />
                    <span className="text-xs text-muted-foreground">Drivetrain</span>
                    <span className="text-sm font-semibold text-foreground">{vehicle.drivetrain.join(', ')}</span>
                  </div>
                )}
                <div className="flex flex-col gap-1 p-3 rounded-xl border border-border dark:border-white/10 bg-card/50 dark:bg-white/[0.04] backdrop-blur-sm">
                  <Users className="w-5 h-5 text-accent mb-1" />
                  <span className="text-xs text-muted-foreground">Seats</span>
                  <span className="text-sm font-semibold text-foreground">{vehicle.passengerCapacity}</span>
                </div>
                <div className="flex flex-col gap-1 p-3 rounded-xl border border-border dark:border-white/10 bg-card/50 dark:bg-white/[0.04] backdrop-blur-sm">
                  <Package className="w-5 h-5 text-accent mb-1" />
                  <span className="text-xs text-muted-foreground">Cargo</span>
                  <span className="text-sm font-semibold text-foreground">{formatCargo(vehicle.cargoSpace)}</span>
                </div>
              </div>

              {/* Popular Brands */}
              <div className="pt-2">
                <p className="text-xs sm:text-sm font-medium text-muted-foreground mb-3 uppercase tracking-wider">
                  Popular Brands
                </p>
                <div className="flex flex-wrap gap-2">
                  {vehicle.popularBrands.slice(0, 6).map((brand) => (
                    <span
                      key={brand}
                      className="px-3 py-1.5 rounded-lg border border-border dark:border-white/10 bg-card/80 dark:bg-white/[0.08] backdrop-blur-sm text-sm font-medium text-foreground dark:text-white/90 hover:border-accent/30 hover:bg-accent/5 transition-colors"
                    >
                      {brand}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
            
            {/* Right Column - Vehicle Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={heroRevealed ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative flex items-center justify-center w-full h-full min-h-[500px] md:min-h-[600px] lg:min-h-[700px] xl:min-h-[800px] 2xl:min-h-[900px] overflow-visible"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-transparent rounded-3xl blur-3xl" />
              <img
                src={vehicle.image}
                alt={`${vehicle.name} vehicle`}
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Pricing & Specs Showcase */}
      {(vehicle.startingPrice || vehicle.mpg || vehicle.mpge || vehicle.range) && (
        <section className="py-12 md:py-16 lg:py-20 bg-muted/30 dark:bg-black/40">
          <div
            ref={specsRef}
            className={cn(
              'container mx-auto px-4 lg:px-8 scroll-reveal',
              specsRevealed && 'revealed'
            )}
          >
            <div className="max-w-5xl mx-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                {vehicle.startingPrice && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={specsRevealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ delay: 0.1 }}
                    className="p-6 rounded-2xl border border-border dark:border-white/10 bg-card dark:bg-white/[0.04] backdrop-blur-sm shadow-lg hover:shadow-xl transition-shadow"
                  >
                    <DollarSign className="w-8 h-8 text-accent mb-3" />
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">Starting Price</p>
                    <p className="text-2xl md:text-3xl font-bold text-foreground">
                      ${vehicle.startingPrice.toLocaleString()}<span className="text-lg text-muted-foreground font-normal">/mo</span>
                    </p>
                  </motion.div>
                )}
                {vehicle.mpg && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={specsRevealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ delay: 0.2 }}
                    className="p-6 rounded-2xl border border-border dark:border-white/10 bg-card dark:bg-white/[0.04] backdrop-blur-sm shadow-lg hover:shadow-xl transition-shadow"
                  >
                    <Fuel className="w-8 h-8 text-accent mb-3" />
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">Fuel Economy</p>
                    <p className="text-2xl md:text-3xl font-bold text-foreground">{vehicle.mpg}</p>
                  </motion.div>
                )}
                {vehicle.mpge && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={specsRevealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ delay: 0.3 }}
                    className="p-6 rounded-2xl border border-border dark:border-white/10 bg-card dark:bg-white/[0.04] backdrop-blur-sm shadow-lg hover:shadow-xl transition-shadow"
                  >
                    <Zap className="w-8 h-8 text-accent mb-3" />
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">MPGe</p>
                    <p className="text-2xl md:text-3xl font-bold text-foreground">{vehicle.mpge}</p>
                  </motion.div>
                )}
                {vehicle.range && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={specsRevealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ delay: 0.4 }}
                    className="p-6 rounded-2xl border border-border dark:border-white/10 bg-card dark:bg-white/[0.04] backdrop-blur-sm shadow-lg hover:shadow-xl transition-shadow"
                  >
                    <Gauge className="w-8 h-8 text-accent mb-3" />
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">Range</p>
                    <p className="text-2xl md:text-3xl font-bold text-foreground">{vehicle.range} <span className="text-lg text-muted-foreground font-normal">miles</span></p>
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Why Choose + Key Features - Enhanced Design */}
      <section className="py-12 md:py-16 lg:py-20 section-bg">
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
          
          <div className="max-w-7xl mx-auto mt-12 md:mt-16">
            {/* Benefits & Features Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 mb-8 md:mb-12">
              {/* Key Benefits */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={highlightsRevealed ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ duration: 0.5 }}
                className="p-6 md:p-8 lg:p-10 rounded-2xl border border-border dark:border-white/10 bg-card dark:bg-white/[0.04] shadow-lg hover:shadow-xl transition-shadow"
              >
                <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground dark:text-white/70 mb-6 flex items-center gap-2">
                  <Award className="w-4 h-4 text-accent" />
                  Key Benefits
                </h3>
                <ul className="space-y-4">
                  {vehicle.highlights.map((highlight, index) => {
                    const Icon = BENEFIT_ICONS[index % BENEFIT_ICONS.length];
                    return (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        animate={highlightsRevealed ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex gap-4 group"
                      >
                        <span className="shrink-0 w-12 h-12 rounded-xl border border-border dark:border-white/10 bg-gradient-to-br from-accent/10 to-accent/5 dark:from-accent/20 dark:to-accent/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                          <Icon className="w-6 h-6 text-accent" />
                        </span>
                        <span className="text-foreground dark:text-white/90 font-semibold pt-2 text-base md:text-lg">{highlight}</span>
                      </motion.li>
                    );
                  })}
                </ul>
              </motion.div>

              {/* Key Features */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={highlightsRevealed ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                transition={{ duration: 0.5 }}
                className="p-6 md:p-8 lg:p-10 rounded-2xl border border-border dark:border-white/10 bg-gradient-to-br from-muted/30 to-muted/10 dark:from-white/[0.02] dark:to-white/[0.01] shadow-lg hover:shadow-xl transition-shadow"
              >
                <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground dark:text-white/70 mb-6 flex items-center gap-2">
                  <Check className="w-4 h-4 text-accent" />
                  Key Features
                </h3>
                <ul className="space-y-3">
                  {vehicle.features.map((feature, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: 10 }}
                      animate={highlightsRevealed ? { opacity: 1, x: 0 } : { opacity: 0, x: 10 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center gap-3 group"
                    >
                      <span className="shrink-0 w-7 h-7 rounded-full bg-gradient-to-br from-accent/20 to-accent/10 dark:from-accent/30 dark:to-accent/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Check className="w-4 h-4 text-accent" strokeWidth={3} />
                      </span>
                      <span className="text-foreground dark:text-white/90 text-sm sm:text-base md:text-lg">{feature}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </div>

            {/* Who Is This For? */}
            <motion.div
              ref={idealRef}
              initial={{ opacity: 0, y: 20 }}
              animate={idealRevealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5 }}
              className="p-6 md:p-8 lg:p-10 rounded-2xl border border-border dark:border-white/10 bg-card dark:bg-white/[0.04] shadow-lg"
            >
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-2 flex items-center gap-3">
                <Users className="w-6 h-6 md:w-7 md:h-7 text-accent" />
                Who Is This For?
              </h2>
              <p className="text-muted-foreground dark:text-white/70 text-sm sm:text-base md:text-lg mb-6">
                A {vehicle.name.toLowerCase()} vehicle is ideal if you…
              </p>
              <div className="flex flex-wrap gap-3">
                {vehicle.idealFor.map((item, index) => (
                  <motion.span
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={idealRevealed ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                    transition={{ delay: index * 0.1 }}
                    className="inline-flex items-center gap-2 px-4 py-2.5 md:px-5 md:py-3 rounded-xl text-sm md:text-base font-medium
                      bg-background/80 dark:bg-white/[0.06] border border-border dark:border-white/10
                      text-foreground dark:text-white/90
                      hover:border-accent/40 hover:bg-accent/10 dark:hover:bg-accent/20 transition-all hover:scale-105 shadow-sm"
                  >
                    <Check className="w-4 h-4 shrink-0 text-accent" strokeWidth={3} />
                    {item}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-12 md:py-16 lg:py-20 section-bg border-t border-border dark:border-white/10">
        <div
          ref={howItWorksRef}
          className={cn(
            'container mx-auto px-4 lg:px-8 scroll-reveal',
            howItWorksRevealed && 'revealed'
          )}
        >
          <SectionHeading
            title="How It Works"
            subtitle="Getting your perfect vehicle is simple and stress-free"
          />
          
          <div className="max-w-6xl mx-auto mt-12 md:mt-16">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {howItWorksSteps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={howItWorksRevealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ delay: index * 0.1 }}
                    className="relative p-6 md:p-8 rounded-2xl border border-border dark:border-white/10 bg-card dark:bg-white/[0.04] shadow-lg hover:shadow-xl transition-all group"
                  >
                    <div className="flex flex-col items-center text-center">
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-accent/20 to-accent/10 dark:from-accent/30 dark:to-accent/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        <Icon className="w-8 h-8 text-accent" />
                      </div>
                      <div className="absolute top-6 right-6 w-8 h-8 rounded-full bg-accent/10 dark:bg-accent/20 flex items-center justify-center text-accent font-bold text-sm">
                        {index + 1}
                      </div>
                      <h3 className="text-lg md:text-xl font-bold text-foreground mb-2">{step.title}</h3>
                      <p className="text-sm md:text-base text-muted-foreground leading-relaxed">{step.description}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-12 md:py-16 lg:py-20 section-bg border-t border-border dark:border-white/10">
        <div
          ref={testimonialsRef}
          className={cn(
            'container mx-auto px-4 lg:px-8 scroll-reveal',
            testimonialsRevealed && 'revealed'
          )}
        >
          <SectionHeading
            title="What Our Clients Say"
            subtitle="Real experiences from people who leased with us"
          />

          <div className="relative flex w-full max-w-[100rem] items-center justify-center overflow-hidden mx-auto mt-12 md:mt-16">
            <Marquee pauseOnHover className="[--duration:60s] [--gap:1.5rem]">
              {testimonials.map((t, i) => (
                <TestimonialCard
                  key={i}
                  quote={t.quote}
                  author={t.author}
                  stars={t.stars}
                  open={openTestimonialIndex === i}
                  onOpenChange={(open) => setOpenTestimonialIndex(open ? i : null)}
                />
              ))}
            </Marquee>
            <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-muted to-transparent dark:from-[hsl(0_0%_4%)]" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-muted to-transparent dark:from-[hsl(0_0%_4%)]" />
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 md:py-16 lg:py-20 section-bg border-t border-border dark:border-white/10">
        <div
          ref={faqRef}
          className={cn(
            'container mx-auto px-4 lg:px-8 scroll-reveal',
            faqRevealed && 'revealed'
          )}
        >
          <SectionHeading
            title="Frequently Asked Questions"
            subtitle={`Common questions about leasing ${vehicle.name.toLowerCase()} vehicles`}
          />

          <div className="max-w-3xl mx-auto mt-12 md:mt-16">
            <Accordion type="single" collapsible className="w-full">
              {getVehicleFaqs(vehicle).map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={faqRevealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <AccordionItem
                    value={`item-${index}`}
                    className="border-border dark:border-white/10 px-4 md:px-6 rounded-lg bg-card dark:bg-white/[0.04] mb-4 shadow-sm dark:shadow-[0_2px_8px_rgba(0,0,0,0.1)]"
                  >
                    <AccordionTrigger className="text-left text-base md:text-lg font-semibold text-foreground dark:text-white hover:no-underline py-4 md:py-5">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-sm md:text-base text-muted-foreground dark:text-white/80 leading-relaxed pb-4 md:pb-5">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                </motion.div>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* Contact Form Section - Enhanced */}
      <section id="contact" className="py-12 md:py-16 lg:py-20 section-bg border-t border-border dark:border-white/10">
        <div
          ref={formRef}
          className={cn(
            'container mx-auto px-4 lg:px-8 scroll-reveal',
            formRevealed && 'revealed'
          )}
        >
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={formRevealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5 }}
              className="text-center mb-8 md:mb-12"
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
                Interested in a {vehicle.name} Vehicle?
              </h2>
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
                Let us help you find the perfect {vehicle.name.toLowerCase()} vehicle. Fill out the form below and our team will get back to you shortly.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={formRevealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className={cn(
                'glass-card-theme form-card-theme rounded-2xl p-6 sm:p-8 md:p-10 shadow-xl',
                'border border-border dark:border-white/10'
              )}
            >
              <ContactForm
                source="vehicle"
                vehicleName={vehicle.name}
                initialValues={{ vehicleType: vehicle.slug }}
                hideServiceField
                showVehicleField={false}
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Explore other vehicle types - Enhanced Grid */}
      <section className="py-12 md:py-16 lg:py-20 section-bg border-t border-border dark:border-white/10">
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
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6 mt-10 md:mt-12">
            {vehicleTypes.map((type, index) => {
              const isCurrent = type.slug === vehicle.slug;
              const cardContent = (
                <>
                  <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden bg-card dark:bg-white/[0.04] border border-border dark:border-white/10 flex items-center justify-center p-3 group-hover:border-accent/40 transition-colors">
                    <img
                      src={type.image}
                      alt={type.name}
                      className="w-full h-full object-contain transition-transform group-hover:scale-110 duration-300"
                      loading="lazy"
                    />
                    {isCurrent && (
                      <span className="absolute top-2 right-2 px-2 py-1 rounded-md bg-accent text-accent-foreground text-[10px] font-bold uppercase tracking-wider shadow-lg">
                        Current
                      </span>
                    )}
                  </div>
                  <span className="block mt-3 text-sm md:text-base font-semibold text-foreground text-center group-hover:text-accent transition-colors">
                    {type.name}
                  </span>
                </>
              );
              if (isCurrent) {
                return (
                  <motion.div
                    key={type.slug}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={browseRevealed ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                    transition={{ delay: index * 0.05 }}
                    className="flex flex-col rounded-2xl p-4 border-2 border-accent/50 bg-accent/10 dark:bg-accent/15 shadow-lg"
                  >
                    {cardContent}
                  </motion.div>
                );
              }
              return (
                <motion.div
                  key={type.slug}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={browseRevealed ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link
                    to={`/vehicles/${type.slug}`}
                    className="group flex flex-col rounded-2xl p-4 border border-border dark:border-white/10 bg-card dark:bg-white/[0.04] hover:border-accent/40 hover:bg-muted/50 dark:hover:bg-white/[0.06] transition-all duration-300 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  >
                    {cardContent}
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </Layout>
  );
}
