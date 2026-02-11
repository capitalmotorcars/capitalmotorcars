import * as React from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { Link } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { SEO } from '@/components/SEO';
import { JsonLd } from '@/components/JsonLd';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ContactForm } from '@/components/forms/ContactForm';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { motion, AnimatePresence } from 'motion/react';
import { Award, Check, Fuel, Gauge, Package, Shield, Star, TrendingUp, Users, Zap, ArrowRight, DollarSign, Calendar, MapPin, X, FileText, Phone, Car, CreditCard, Ruler, Scale, Disc, Armchair, ShieldCheck, Cog, Cpu, Wrench, Activity } from 'lucide-react';
import { VehicleType } from '@/types/vehicle';
import type { FuelType } from '@/types/vehicle';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { TestimonialsSection } from '../home/TestimonialsSection';
import { VehicleTypesCarousel } from '../home/VehicleTypesCarousel';
import { BrandDeals } from './BrandDeals';

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

function getVehicleFaqs(vehicle: VehicleType) {
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
  vehicle: VehicleType;
}

export function VehicleTypeTemplate({ vehicle }: VehicleTypeTemplateProps) {
  const { ref: heroRef, isRevealed: heroRevealed } = useScrollReveal();
  const { ref: browseRef, isRevealed: browseRevealed } = useScrollReveal();
  const { ref: highlightsRef, isRevealed: highlightsRevealed } = useScrollReveal();
  const { ref: idealRef, isRevealed: idealRevealed } = useScrollReveal();
  const { ref: specsRef, isRevealed: specsRevealed } = useScrollReveal();
  const { ref: howItWorksRef, isRevealed: howItWorksRevealed } = useScrollReveal();
  const { ref: faqRef, isRevealed: faqRevealed } = useScrollReveal();
  const [isContactDialogOpen, setIsContactDialogOpen] = React.useState(false);
  const [selectedBrand, setSelectedBrand] = React.useState<string | null>(null);
  const dealsRef = React.useRef<HTMLDivElement>(null);
  const [isDesktop, setIsDesktop] = React.useState(
    typeof window !== 'undefined' ? window.innerWidth >= 768 : false
  );

  React.useEffect(() => {
    const checkDesktop = () => setIsDesktop(window.innerWidth >= 768);
    checkDesktop();
    window.addEventListener('resize', checkDesktop);
    return () => window.removeEventListener('resize', checkDesktop);
  }, []);

  return (
    <Layout>
      <SEO
        title={vehicle.metaTitle}
        description={vehicle.metaDescription}
        canonicalPath={vehicle.canonicalPath}
        seoKeywords={vehicle.seoKeywords}
        ogImage={vehicle.image}
      />
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "Product",
        "name": vehicle.name,
        "description": vehicle.description,
        "image": vehicle.image,
        "offers": {
          "@type": "Offer",
          "price": vehicle.startingPrice,
          "priceCurrency": "USD",
          "availability": "https://schema.org/InStock"
        },
        "brand": {
          "@type": "Brand",
          "name": vehicle.popularBrands[0] || "Capital Motor Cars"
        }
      }} />

      {/* Hero Section - Premium Design */}
      <section className="relative pt-24 lg:pt-36 h-full flex items-center overflow-hidden">
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
              className="flex flex-col "
            >
              {/* 1. Integrated Hero Content */}
              <div className="grid grid-cols-1 lg:grid-cols-6 gap-0 items-start">
                <div className="lg:col-span-4 space-y-6">
                  {/* Badges */}
                  <div className="flex flex-wrap gap-2">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-accent/30 bg-accent/10 text-accent text-[10px] font-bold uppercase tracking-widest backdrop-blur-md">
                      <Star className="w-3 h-3 fill-accent" />
                      {vehicle.name} Specialist
                    </div>
                    {vehicle.badge && (
                      <span className="px-3 py-1 rounded-full bg-foreground dark:bg-white text-background dark:text-black text-[10px] font-bold uppercase tracking-widest shadow-xl">
                        {vehicle.badge}
                      </span>
                    )}
                  </div>

                  {/* Title */}
                  <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter leading-[0.9] text-foreground">
                    The New <span className="text-accent italic">{vehicle.name}</span> <br /> Experience
                  </h1>

                  {/* Description */}
                  <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-xl border-l-4 border-accent/20 pl-6 py-2">
                    {vehicle.description}
                  </p>
                </div>

                {/* Vehicle Image - Anchored to the side of the text */}
                <div className="lg:col-span-2 relative mt-4 lg:mt-0">
                  <div className="absolute inset-0 bg-accent/20 blur-[100px] rounded-full opacity-50" />
                  <motion.img
                    initial={{ opacity: 0, scale: 1.5, x: 20 }} // Start slightly smaller/hidden
                    animate={heroRevealed ? {
                      opacity: 1,
                      // Scale 1.1 on mobile, 1.5 on desktop (lg: breakpoint)
                      scale: window.innerWidth < 1024 ? 1.2 : 1.5,
                      x: 0
                    } : {}}
                    transition={{
                      type: "spring",
                      stiffness: 260,
                      damping: 20,
                      delay: 0.2
                    }}
                    src={vehicle.image}
                    alt={vehicle.name}
                    className="relative  w-full h-full object-cover drop-shadow-[0_15px_15px_rgba(0,0,0,0.4)]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-2 bg-muted/20 dark:bg-white/[0.04] p-2 rounded-[2.5rem] border-2 border-border backdrop-blur-sm">
                {/* 1. Price Card */}
                <div className="col-span-2 md:col-span-1 p-3 md:p-6 bg-background dark:bg-card shadow-sm rounded-[2rem] flex flex-col justify-center items-center border border-border/40">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-accent font-black mb-1">Starting at</span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-medium tracking-tight text-foreground">
                      ${vehicle.startingPrice?.toLocaleString()}
                    </span>
                    <span className="text-muted-foreground font-medium">/mo</span>
                  </div>
                </div>

                {/* 2. Performance - Pulling from new Performance Data or Highlights */}
                <div className="flex items-center gap-4 px-8 py-4 justify-center lg:justify-start">
                  <div className="h-12 w-12 rounded-2xl bg-accent/10 flex items-center justify-center text-accent shrink-0">
                    <Gauge className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-black text-muted-foreground tracking-widest">Performance</p>
                    <p className="text-sm font-bold text-foreground">
                      {vehicle.performance?.hp ? `${vehicle.performance.hp} HP` : (vehicle.highlights?.[0] || 'Premium Power')}
                    </p>
                  </div>
                </div>

                {/* 3. Fuel Type - Dynamic gasoline/electric handling */}
                <div className="flex items-center gap-4 px-8 py-4 justify-center lg:justify-start">
                  <div className="h-12 w-12 rounded-2xl bg-accent/10 flex items-center justify-center text-accent shrink-0">
                    <Fuel className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-black text-muted-foreground tracking-widest">Fuel Type</p>
                    <p className="text-sm font-bold text-foreground capitalize">
                      {vehicle.fuelTypes?.join(' & ') || 'Gasoline'}
                    </p>
                  </div>
                </div>

                {/* 4. CTA Button */}
                <Button
                  onClick={() => setIsContactDialogOpen(true)}
                  className="col-span-2 p-6 md:p-6 md:col-span-1 h-full rounded-[2rem] bg-accent hover:bg-accent/90 text-accent-foreground text-xl font-black transition-all shadow-xl shadow-accent/20 hover:scale-[1.02] active:scale-[0.98]"
                >
                  <span className="flex items-center justify-center gap-3 w-full cursor-pointer">
                    {vehicle.ctaText || 'Get Started'}
                    <ArrowRight className="w-6 h-6" />
                  </span>
                </Button>
              </div>

              {/* 3. Footer Brands - Showroom Minimalist */}
              <div className=" py-4  flex items-center gap-8 px-4">
                <div className="flex flex-col shrink-0">
                  <span className="text-[10px] font-black uppercase tracking-[0.4em] text-accent leading-none">
                    Top
                  </span>
                  <span className="text-[10px] font-black uppercase tracking-[0.4em] text-muted-foreground/40 leading-none mt-1">
                    Tier
                  </span>
                </div>

                <div className="h-10 w-px bg-border/80 shrink-0" />

                <div className="flex flex-wrap items-center gap-x-6 md:gap-x-8 gap-y-2">
                  {vehicle.popularBrands.slice(0, 7).map((brand) => (
                    <button
                      key={brand}
                      onClick={() => {
                        setSelectedBrand(brand);
                        setTimeout(() => {
                          dealsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                        }, 100);
                      }}
                      className={cn(
                        "text-[12px] font-black transition-all tracking-[0.2em] uppercase hover:text-accent",
                        selectedBrand === brand ? "text-accent" : "text-muted-foreground/40"
                      )}
                    >
                      {brand}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Inline Brand Deals Section */}
      <AnimatePresence>
        {selectedBrand && (
          <section ref={dealsRef} className="py-12 bg-muted/10 border-y border-border/40">
            <div className="container mx-auto px-4 lg:px-8">
              <BrandDeals
                brand={selectedBrand}
                bodyStyle={vehicle.bodyStyle}
                className="mt-0"
              />
              <div className="mt-8 flex justify-center">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedBrand(null)}
                  className="text-xs font-bold uppercase tracking-widest text-muted-foreground hover:text-foreground"
                >
                  <X className="w-4 h-4 mr-2" /> Clear Brand Filter
                </Button>
              </div>
            </div>
          </section>
        )}
      </AnimatePresence>

      {/* Pricing & Specs Showcase */}
      {/* Pricing & Specs Showcase */}
      <section className="py-20 w-full  overflow-hidden">
        <div className="mx-auto px-4 lg:px-8 xl:px-12 max-w-7xl xl:max-w-[90rem] flex flex-col gap-10">

          {/* 1. The Performance Dashboard (Specs) */}
          <div className="w-full">
            <div className="flex flex-col mb-10">
              <span className="text-accent font-black tracking-[0.4em] uppercase text-[10px] mb-2">Metrics</span>
              <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-black dark:text-white uppercase">
                Technical <span className="text-accent italic">Specs</span>
              </h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
              {[
                // Performance Specs (New)
                { id: 'hp', icon: Gauge, label: 'Horsepower', val: vehicle.performance?.hp, unit: ' HP', show: !!vehicle.performance?.hp },
                { id: '0-60', icon: Zap, label: '0-60 MPH', val: vehicle.performance?.zeroToSixty, unit: '', show: !!vehicle.performance?.zeroToSixty },
                { id: 'torque', icon: Activity, label: 'Torque', val: vehicle.performance?.torque, unit: ' LB-FT', show: !!vehicle.performance?.torque },

                // Drivetrain / Engine Specs (New)
                { id: 'engine', icon: Cpu, label: 'Engine', val: vehicle.performance?.engine, unit: '', show: !!vehicle.performance?.engine },
                { id: 'trans', icon: Cog, label: 'Transmission', val: vehicle.performance?.transmission?.replace('Automatic', 'Auto'), unit: '', show: !!vehicle.performance?.transmission },
                { id: 'drivetrain', icon: Disc, label: 'Drivetrain', val: vehicle.performance?.drivetrain, unit: '', show: !!vehicle.performance?.drivetrain },

                // Efficiency Specs
                {
                  id: 'efficiency',
                  icon: vehicle.fuelTypes.includes('electric') ? Zap : Fuel,
                  label: vehicle.fuelTypes.includes('electric') ? 'Efficiency' : 'Fuel Economy',
                  val: vehicle.fuelEconomy ? `${vehicle.fuelEconomy.avg}` : undefined,
                  unit: vehicle.fuelTypes.includes('electric') ? ' MPGe' : ' MPG',
                  show: !!vehicle.fuelEconomy && (vehicle.fuelEconomy.avg > 0)
                },
                {
                  id: 'range',
                  icon: Gauge,
                  label: 'Driving Range',
                  val: vehicle.fuelEconomy?.range,
                  unit: ' MILES',
                  show: !!vehicle.fuelEconomy?.range && (vehicle.fuelEconomy.range > 0)
                },
              ].filter(s => s.show).map((spec, idx) => (
                <motion.div
                  key={spec.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="group relative p-6 rounded-[2.5rem] border-2 border-border/60 dark:border-white/10 bg-muted/5 dark:bg-white/[0.02] hover:border-accent hover:shadow-[0_0_50px_-12px_rgba(59,130,246,0.3)] transition-all duration-500"
                >
                  <div className="flex flex-col items-center gap-6">
                    <div className="w-20 h-20 rounded-[1.8rem] bg-accent/10 text-accent flex items-center justify-center group-hover:bg-accent group-hover:text-accent-foreground transition-all duration-500 shadow-inner">
                      <spec.icon className="w-10 h-10" />
                    </div>
                    <div>
                      <p className="text-xs font-black uppercase tracking-[0.2em] text-muted-foreground/60 mb-1 group-hover:text-accent transition-colors">{spec.label}</p>
                      <p className="text-md md:text-xl font-medium text-black dark:text-white tracking-tighter leading-none">
                        {spec.val}
                        {spec.unit && <span className="text-xs font-bold text-accent ml-1 uppercase">{spec.unit}</span>}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* 1.5. Detailed Specifications (New) */}
          {vehicle.specs && (
            <div className="w-full">
              <div className="flex flex-col mb-8">
                <span className="text-accent font-black tracking-[0.4em] uppercase text-[10px] mb-2">Details</span>
                <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-black dark:text-white uppercase">
                  Vehicle <span className="text-accent italic">Dimensions</span>
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Exterior Accordion */}
                <Accordion type="single" collapsible className="w-full" defaultValue={isDesktop ? "exterior" : undefined}>
                  <AccordionItem
                    value="exterior"
                    className="bg-muted/5 dark:bg-white/[0.02] rounded-3xl border-2 border-border/60 dark:border-white/10 overflow-hidden"
                  >
                    <AccordionTrigger className="px-8 py-6 hover:no-underline hover:bg-accent/5 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="p-3 rounded-xl bg-accent/10 text-accent">
                          <Ruler className="w-6 h-6" />
                        </div>
                        <h3 className="text-lg font-bold uppercase tracking-wide">Exterior</h3>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-8 pb-6">
                      <div className="space-y-4 pt-2">
                        <div className="flex justify-between items-center border-b border-border/30 pb-2">
                          <span className="text-sm text-muted-foreground uppercase tracking-wider font-medium">Length</span>
                          <span className="text-base font-medium">{vehicle.specs.exterior.length}</span>
                        </div>
                        <div className="flex justify-between items-center border-b border-border/30 pb-2">
                          <span className="text-sm text-muted-foreground uppercase tracking-wider font-medium">Height</span>
                          <span className="text-base font-medium">{vehicle.specs.exterior.height}</span>
                        </div>
                        <div className="flex justify-between items-center border-b border-border/30 pb-2">
                          <span className="text-sm text-muted-foreground uppercase tracking-wider font-medium">Weight</span>
                          <span className="text-base font-medium">{vehicle.specs.exterior.weight}</span>
                        </div>
                        <div className="flex justify-between items-center pt-1">
                          <span className="text-sm text-muted-foreground uppercase tracking-wider font-medium">Wheels</span>
                          <span className="text-base font-medium text-right max-w-[50%]">{vehicle.specs.exterior.wheels}</span>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>

                {/* Interior Accordion */}
                <Accordion type="single" collapsible className="w-full" defaultValue={isDesktop ? "interior" : undefined}>
                  <AccordionItem
                    value="interior"
                    className="bg-muted/5 dark:bg-white/[0.02] rounded-3xl border-2 border-border/60 dark:border-white/10 overflow-hidden"
                  >
                    <AccordionTrigger className="px-8 py-6 hover:no-underline hover:bg-accent/5 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="p-3 rounded-xl bg-accent/10 text-accent">
                          <Armchair className="w-6 h-6" />
                        </div>
                        <h3 className="text-lg font-bold uppercase tracking-wide">Interior</h3>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-8 pb-6">
                      <div className="space-y-4 pt-2">
                        <div className="flex justify-between items-center border-b border-border/30 pb-2">
                          <span className="text-sm text-muted-foreground uppercase tracking-wider font-medium">Headroom</span>
                          <span className="text-base font-medium">{vehicle.specs.interior.headroom}</span>
                        </div>
                        <div className="flex justify-between items-center border-b border-border/30 pb-2">
                          <span className="text-sm text-muted-foreground uppercase tracking-wider font-medium">Legroom</span>
                          <span className="text-base font-medium">{vehicle.specs.interior.legroom}</span>
                        </div>
                        <div className="flex justify-between items-center border-b border-border/30 pb-2">
                          <span className="text-sm text-muted-foreground uppercase tracking-wider font-medium">Cargo</span>
                          <span className="text-base font-medium">{vehicle.specs.interior.cargo}</span>
                        </div>
                        <div className="flex justify-between items-center pt-1">
                          <span className="text-sm text-muted-foreground uppercase tracking-wider font-medium">Capacity</span>
                          <span className="text-base font-medium">{vehicle.specs.interior.passengers} Passengers</span>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>

                {/* Warranty Accordion */}
                <Accordion type="single" collapsible className="w-full" defaultValue={isDesktop ? "warranty" : undefined}>
                  <AccordionItem
                    value="warranty"
                    className="bg-muted/5 dark:bg-white/[0.02] rounded-3xl border-2 border-border/60 dark:border-white/10 overflow-hidden"
                  >
                    <AccordionTrigger className="px-8 py-6 hover:no-underline hover:bg-accent/5 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="p-3 rounded-xl bg-accent/10 text-accent">
                          <ShieldCheck className="w-6 h-6" />
                        </div>
                        <h3 className="text-lg font-bold uppercase tracking-wide">Warranty</h3>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-8 pb-6">
                      <div className="space-y-4 pt-2">
                        <div className="flex flex-col gap-1 border-b border-border/30 pb-2">
                          <span className="text-xs text-muted-foreground uppercase tracking-wider font-medium">Comprehensive</span>
                          <span className="text-sm font-medium">{vehicle.specs.warranty.comprehensive}</span>
                        </div>
                        <div className="flex flex-col gap-1 border-b border-border/30 pb-2">
                          <span className="text-xs text-muted-foreground uppercase tracking-wider font-medium">Powertrain</span>
                          <span className="text-sm font-medium">{vehicle.specs.warranty.powertrain}</span>
                        </div>
                        <div className="flex flex-col gap-1 pt-1">
                          <span className="text-xs text-muted-foreground uppercase tracking-wider font-medium">Roadside Assistance</span>
                          <span className="text-sm font-medium">{vehicle.specs.warranty.roadside}</span>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </div>
          )}

          {/* 2. Benefits & Features (Side-by-Side Comparison) */}
          <div className="flex flex-col">
            <span className="text-accent font-black tracking-[0.4em] uppercase text-[10px] mb-2">Benefits</span>
            <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-black dark:text-white uppercase">
              Vehicle <span className="text-accent italic">Benefits</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
            {/* Left: Key Benefits (The "Why") */}

            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-7 p-10  rounded-[3rem] border-2 border-border/60 dark:border-white/10 bg-muted/5 dark:bg-white/[0.02] relative overflow-hidden"
            >
              <div className="absolute top-[-3%] right-[-10%] right-0 md:top-[-4%] md:right-[-5%] p-6 opacity-[0.08] dark:opacity-[0.07]   pointer-events-none">
                <Award className="w-40 h-40 -rotate-12  text-accent" />
              </div>

              <h3 className="text-xs font-black uppercase tracking-[0.4em] text-accent mb-12 flex items-center gap-3">
                <Award className="w-5 h-5" /> Experience Highlights
              </h3>

              <div className="flex flex-col gap-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                  {vehicle.highlights.map((highlight, index) => {
                    const Icon = (index % 2 === 0) ? Shield : Star; // Alternating icons or use your BENEFIT_ICONS
                    return (
                      <div key={index} className="flex flex-row items-center gap-4 group">
                        <div className="w-12 h-12 rounded-xl bg-accent/10 text-accent flex items-center justify-center group-hover:scale-110 transition-transform">
                          <Icon className="w-6 h-6" />
                        </div>
                        <span className="text-lg font-medium text-black dark:text-white tracking-tight leading-tight">{highlight}</span>
                      </div>
                    );
                  })}
                </div>

                {vehicle.idealFor && (
                  <div className="pt-12 border-t border-border/40 dark:border-white/10">
                    <h3 className="text-xs font-black uppercase tracking-[0.4em] text-accent mb-8 flex items-center gap-3">
                      <Users className="w-5 h-5" /> Who is this for?
                    </h3>
                    <div className="space-y-4">
                      {vehicle.idealFor.map((ideal, idx) => (
                        <div key={idx} className="flex items-center gap-4 group">
                          <div className="w-1.5 h-1.5 rounded-full bg-accent/40 group-hover:bg-accent transition-colors shrink-0" />
                          <p className="text-lg font-medium text-muted-foreground group-hover:text-foreground transition-colors leading-relaxed">
                            {ideal}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Right: Key Features (The Checklist) */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-5 p-10 rounded-[3rem] border-2 border-border/60 dark:border-white/10 bg-muted/5 dark:bg-white/[0.02] backdrop-blur-sm relative overflow-hidden"
            >
              <div className="absolute top-[-5%] right-[-15%] md:right-[-10%] p-6 opacity-[0.05] dark:opacity-[0.04] pointer-events-none">
                <Check className="w-40 h-40 -rotate-12 text-accent" />
              </div>

              <h3 className="text-xs font-black uppercase tracking-[0.4em] text-accent mb-8 flex items-center gap-3">
                <Check className="w-5 h-5" /> Standard Features
              </h3>

              {vehicle.featureGroups ? (
                <div className="space-y-8">
                  {vehicle.featureGroups.map((group, idx) => (
                    <div key={idx}>
                      <h4 className="text-sm font-black text-foreground uppercase tracking-widest mb-4 opacity-80">{group.category}</h4>
                      <div className="space-y-3">
                        {group.items.map((item, i) => (
                          <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-muted/5 dark:bg-white/[0.02] border border-border dark:border-accent/15">
                            <div className="shrink-0 w-5 h-5 rounded-full bg-accent/20 flex items-center justify-center">
                              <Check className="w-3 h-3 text-accent" strokeWidth={4} />
                            </div>
                            <span className="font-medium text-xs md:text-sm text-black dark:text-white">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}

                </div>
              ) : (
                <div className="space-y-3">
                  {vehicle.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-4 p-4 rounded-2xl bg-white dark:bg-black/40 border border-border/60 group hover:border-accent/50 transition-colors">
                      <div className="shrink-0 w-6 h-6 rounded-full bg-accent flex items-center justify-center">
                        <Check className="w-4 h-4 text-accent-foreground" strokeWidth={4} />
                      </div>
                      <span className="font-bold text-sm text-black dark:text-white group-hover:text-accent transition-colors">{feature}</span>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          </div>

          {/* Bottom CTA Section */}
          <section className="py-20 relative overflow-hidden">
            <div className="absolute inset-0" aria-hidden />
            <div className="container relative mx-auto px-4 text-center">
              <div className="max-w-3xl mx-auto space-y-8">
                <h2 className="text-3xl md:text-5xl lg:text-6xl font-black tracking-tighter text-foreground">
                  Ready to Drive Your New <br className="hidden md:block" /> {vehicle.name}?
                </h2>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                  Our specialists are ready to help you find the best lease terms for your next {vehicle.name.toLowerCase()}.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                  <Button
                    onClick={() => setIsContactDialogOpen(true)}
                    size="lg"
                    className="h-16 px-10 rounded-2xl bg-accent hover:bg-accent/90 text-accent-foreground text-xl font-black shadow-xl shadow-accent/20 transition-all hover:scale-105 active:scale-95 w-full sm:w-auto"
                  >
                    Get Started
                    <ArrowRight className="ml-2 w-6 h-6" />
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="h-16 px-10 rounded-2xl border-2 border-border bg-transparent hover:bg-muted text-foreground text-lg font-bold w-full sm:w-auto"
                  >
                    <Link to="/contact">Contact Support</Link>
                  </Button>
                </div>
                <div className="pt-8 flex items-center justify-center gap-6 text-muted-foreground/60">
                  <div className="flex items-center gap-2"><Check className="w-5 h-5 text-accent" /> No Hidden Fees</div>
                  <div className="flex items-center gap-2"><Check className="w-5 h-5 text-accent" /> Expert Advice</div>
                </div>
              </div>
            </div>
          </section>

          {/* 3. The Journey (How it Works) */}
          <div className="flex flex-col">
            <span className="text-accent font-black tracking-[0.4em] uppercase text-[10px] mb-2">Process</span>
            <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-black dark:text-white uppercase">
              Simple <span className="text-accent italic">Leasing</span></h2>
          </div>


          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {howItWorksSteps.map((step, index) => (
              <div key={index} className="group relative p-10 rounded-[2.5rem] border-2 border-border dark:border-white/10  bg-muted/5 dark:bg-white/[0.02] hover:border-accent hover:dark:border-accent transition-all duration-500 overflow-hidden">
                <span className="absolute -right-4 -bottom-4 text-9xl font-black text-black/[0.03] dark:text-white/[0.03] group-hover:text-accent/10 group-hover:dark:text-accent/10 transition-colors leading-none select-none pointer-events-none">
                  {index + 1}
                </span>

                <div className="relative z-10 flex flex-col gap-8">
                  <div className="w-14 h-14 rounded-2xl bg-accent/10 text-accent flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-500">
                    <step.icon className="w-7 h-7" />
                  </div>
                  <div>
                    <h3 className="font-medium text-xl uppercase tracking-tighter mb-3 text-black dark:text-white group-hover:text-accent transition-colors">
                      {step.title}
                    </h3>
                    <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground/60 leading-relaxed group-hover:text-muted-foreground transition-colors">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>




      {/* Contact Dialog */}
      <Dialog.Root open={isContactDialogOpen} onOpenChange={setIsContactDialogOpen}>
        <Dialog.Portal>
          <Dialog.Overlay asChild>
            <motion.div
              className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={dialogFadeTransition}
            />
          </Dialog.Overlay>
          <Dialog.Content asChild>
            <motion.div
              className="fixed inset-0 z-[101] flex items-center justify-center p-4"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={dialogFadeTransition}
              onClick={(e) => e.target === e.currentTarget && setIsContactDialogOpen(false)}
            >
              <div className={cn(dialogPanelClass, "w-full max-w-2xl p-6 md:p-10 max-h-[90vh] overflow-y-auto relative bg-background")}>
                <div className="absolute top-4 right-4 z-10">
                  <Dialog.Close asChild>
                    <button
                      type="button"
                      className="rounded-full p-2 bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                      aria-label="Close"
                    >
                      <X className="h-6 w-6" />
                    </button>
                  </Dialog.Close>
                </div>

                <div className="text-center mb-8">
                  <h2 className="text-3xl md:text-4xl font-black tracking-tighter text-foreground mb-3">
                    Interested in a {vehicle.name}?
                  </h2>
                  <p className="text-muted-foreground text-lg max-w-md mx-auto">
                    Fill out the form below and our team will find the perfect matching {vehicle.name.toLowerCase()} for you.
                  </p>
                </div>

                <div className="mt-6">
                  <ContactForm
                    source="vehicle_dialog"
                    vehicleName={vehicle.name}
                    initialValues={{ vehicleType: vehicle.slug }}
                    hideServiceField
                    showVehicleField={false}
                  />
                </div>
              </div>
            </motion.div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
      <VehicleTypesCarousel
        title="Explore Other Vehicle Types"
        sectionId="explore-more"
      />


      {/* FAQ Section */}
      <section className="py-12 md:py-16 lg:py-20  border-t border-border dark:border-white/10">
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

          <div className="max-w-5xl mx-auto mt-12 md:mt-16">
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




      <TestimonialsSection />
    </Layout>
  );
}
