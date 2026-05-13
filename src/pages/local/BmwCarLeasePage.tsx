import { Link } from 'react-router-dom';
import {
  ArrowRight,
  BadgeDollarSign,
  Building2,
  CarFront,
  CheckCircle2,
  Crown,
  Gem,
  Phone,
  ShieldCheck,
  Sparkles,
  Star,
  Settings,
  TrendingUp,
  Zap,
} from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { SEO } from '@/components/SEO';
import { JsonLd, createBreadcrumbSchema, createFaqSchema, createServiceSchema, createWebPageSchema } from '@/components/JsonLd';
import { Button } from '@/components/ui/button';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { BackgroundEffects } from '@/components/ui/BackgroundEffects';
import { SectionDividerCreative } from '@/components/ui/SectionDividerCreative';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import luxuryLeasingImage from '@/assets/background-mercedes.jpeg'; // Fallback premium background
import { primarySeoKeywords, njSeoKeywords } from '@/data/seoKeywords';

const featuredBmwVehicles = [
  {
    name: "BMW X5 M60i",
    image: "https://onsxnzwhuugnmsxaqpzt.supabase.co/storage/v1/object/public/vehicle-images/vehicle-types/xuoj4gscxnl_1771271808916.webp",
    description: "The quintessential luxury performance SUV. Featuring a 523 horsepower twin-turbo V8, mild-hybrid efficiency, and a meticulously crafted tech-forward interior.",
    price: "1,622",
    hp: 523,
    engine: "4.4L Twin-Turbo V8",
    drivetrain: "xDrive AWD",
    0: "4.2s",
  },
  {
    name: "BMW i7 eDrive50",
    image: "https://onsxnzwhuugnmsxaqpzt.supabase.co/storage/v1/object/public/vehicle-images/vehicle-types/otvotnqelul_1770851744754.webp",
    description: "The pinnacle of electric executive travel. The i7 offers a whisper-quiet cabin, an optional 31.3-inch Theater Screen, and over 300 miles of all-electric range.",
    price: "1,466",
    hp: 449,
    engine: "Current Excited Sync Motor",
    drivetrain: "Rear Wheel Drive",
    0: "5.3s",
  }
];

const faqs = [
  {
    question: 'How do Multiple Security Deposits (MSDs) work on a BMW lease?',
    answer: 'Capital Motor Cars allows you to put down up to 7 Multiple Security Deposits (MSDs). Each MSD lowers the money factor (interest rate) on your lease, significantly reducing your monthly payment. At the end of the lease, the entire MSD amount is fully refundable, making it one of the smartest financial moves when leasing a BMW.',
  },
  {
    question: 'Are maintenance costs covered during a BMW lease?',
    answer: 'Yes. Every new BMW leased through Capital Motor Cars comes with comprehensive maintenance coverage for the first 3 years or 36,000 miles. This perfectly aligns with a standard 36-month lease, meaning you typically won\'t pay out-of-pocket for oil changes, filters, or fluid top-offs.',
  },
  {
    question: 'How does leasing a BMW EV (like the i4, iX, or i7) differ from gas models?',
    answer: 'Leasing an electric BMW often includes substantial lease cash or pass-through federal tax credits that you might not qualify for if you purchased the vehicle outright. This can drastically reduce the capitalized cost of the vehicle, making EV lease payments highly competitive.',
  },
  {
    question: 'Can I transfer my BMW lease to someone else?',
    answer: 'Yes, Capital Motor Cars generally allows lease transfers (assumptions) subject to credit approval. If your lifestyle changes mid-lease, you can often transfer the remaining term and mileage to another qualified driver.',
  },
  {
    question: 'What happens if I go over my allotted mileage?',
    answer: 'If you anticipate exceeding your mileage limit, Capital Motor Cars allows you to purchase additional miles at a discounted rate before your lease ends. If you wait until lease return, you will be charged the standard per-mile penalty stated in your contract.',
  },
];

const schemas = [
  createWebPageSchema({
    name: 'BMW Car Lease Deals & Expert Leasing Guide',
    description: 'Discover the ultimate guide to BMW leasing. Access exclusive BMW car lease deals, learn about MSDs, money factors, and explore models like the X5 and i7.',
    url: 'https://capitalmotorcars.com/bmw-car-lease',
  }),
  createServiceSchema({
    name: 'BMW Auto Leasing Services',
    description: 'Premium auto leasing services specializing in BMWs. We offer competitive capitalized costs, optimize money factors with MSDs, and provide the best direct BMW lease terms.',
    url: 'https://capitalmotorcars.com/bmw-car-lease',
  }),
  createFaqSchema(faqs),
  createBreadcrumbSchema([
    { name: 'Home', url: 'https://capitalmotorcars.com/' },
    { name: 'BMW Car Lease', url: 'https://capitalmotorcars.com/bmw-car-lease' },
  ]),
];

export default function BmwCarLeasePage() {
  return (
    <Layout>
      <SEO
        title="BMW Car Lease | BMW Car Lease NJ & US Deals | Capital Motor Cars"
        description="Looking for the ultimate BMW car lease? Discover premium BMW car lease NJ and BMW car lease US specials with Capital Motor Cars. We negotiate the best money factors and lease structures."
        canonicalPath="/bmw-car-lease"
        seoKeywords={[
          ...primarySeoKeywords, 
          ...njSeoKeywords,
          'bmw car lease', 
          'bmw car lease nj',
          'bmw car lease us', 
          'bmw lease deals', 
          'lease a bmw', 
          'bmw lease specials', 
          'bmw multiple security deposits', 
          'bmw x5 lease', 
          'bmw i7 lease', 
          'Capital Motor Cars'
        ]}
        ogType="website"
      />
      <JsonLd data={schemas} />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-[hsl(var(--hero-bg))] text-white">
        <BackgroundEffects />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(circle at 14% 18%, hsl(var(--accent) / 0.16), transparent 30%), radial-gradient(circle at 82% 20%, hsl(var(--accent) / 0.09), transparent 28%)',
          }}
        />

        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 pt-24 md:pt-28 lg:pt-32 pb-16 md:pb-20 lg:pb-24">
          <div className="grid gap-12 lg:grid-cols-[1fr_1fr] items-center">
            <div className="max-w-3xl">
              <div className="mb-6 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] text-white/70">
                <Link to="/" className="hover:text-white transition-colors">Home</Link>
                <span className="text-white/30">/</span>
                <span className="text-accent glow-blue">Premium Leasing</span>
              </div>

              <h1 className="mt-5 text-2xl sm:text-5xl md:text-6xl lg:text-[2.6rem] font-extrabold leading-[1.1] tracking-tight">
                <span className="text-gradient-heading-dark block mb-2">The Ultimate</span>
                <span className="text-white">BMW Car Lease.</span>
              </h1>

              <p className="mt-6 max-w-2xl text-lg sm:text-xl md:text-2xl leading-relaxed text-white/80 font-light">
                Secure the ultimate BMW car lease. We negotiate the lowest rates and find the exact build you demand. Whether you need a local BMW car lease NJ or a nationwide BMW car lease US delivery, our experts make upgrading seamless.
              </p>

              <div className="mt-10 flex flex-col sm:flex-row gap-4">
                <MagneticButton strength={0.35} className="w-full sm:w-auto">
                  <Button asChild size="lg" className="h-14 px-8 w-full sm:w-auto bg-accent hover:bg-accent/90 text-accent-foreground font-bold text-lg glow-blue rounded-full">
                    <Link to="/contact" className="inline-flex items-center gap-2">
                      Request a Custom Quote
                      <ArrowRight className="h-5 w-5" />
                    </Link>
                  </Button>
                </MagneticButton>
                <MagneticButton strength={0.25} className="w-full sm:w-auto">
                  <Button asChild size="lg" variant="ghost" className="h-14 px-8 w-full sm:w-auto border-2 border-white/20 bg-white/[0.05] text-white hover:bg-white/[0.1] hover:text-white font-bold text-lg rounded-full backdrop-blur-md">
                    <a href="#featured-models" className="inline-flex items-center gap-2">
                      Explore Models
                    </a>
                  </Button>
                </MagneticButton>
              </div>

              <div className="mt-12 pt-8 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-6">
                {[
                  { label: 'MSD Optimization', value: 'Available' },
                  { label: 'Maintenance', value: '3yr / 36k' },
                  { label: 'Delivery', value: 'To Your Door' },
                  { label: 'Lease Process', value: 'Transparent' },
                ].map((stat) => (
                  <div key={stat.label}>
                    <p className="text-xs font-semibold uppercase tracking-wider text-white/50">{stat.label}</p>
                    <p className="mt-1 text-lg font-bold text-white">{stat.value}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative hidden lg:block">
              <div className="absolute -inset-4 rounded-[3rem] bg-accent/20 blur-3xl opacity-70 animate-pulse-slow" aria-hidden />
              <div className="relative flex flex-col overflow-hidden rounded-[2.5rem] border border-white/20 bg-white/[0.03] p-5 shadow-[0_32px_100px_rgba(0,0,0,0.5)] backdrop-blur-xl">
                <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-black/40 group relative">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
                  <img
                    src={featuredBmwVehicles[0].image}
                    alt="BMW X5 M60i Leasing"
                    className="h-[400px] w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute bottom-6 left-6 z-20">
                    <div className="inline-flex items-center gap-2 rounded-full bg-accent/20 border border-accent/30 backdrop-blur-md px-3 py-1.5 text-xs font-black uppercase tracking-widest text-white mb-3">
                      <Sparkles className="h-3 w-3 text-accent" /> Featured Build
                    </div>
                    <h3 className="text-3xl font-bold text-white">{featuredBmwVehicles[0].name}</h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Expert Breakdown Section */}
      <section className="py-20 lg:py-32 section-bg">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <div className="inline-flex items-center justify-center gap-2 rounded-full bg-accent/10 px-4 py-2 text-sm font-bold uppercase tracking-widest text-accent mb-6">
              <Settings className="h-4 w-4" /> The Intelligent Lease
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold text-heading mb-6 tracking-tight">
              Mastering the BMW Lease Structure.
            </h2>
            <p className="text-lg md:text-xl text-section-muted leading-relaxed">
              Leasing a BMW isn't just about finding the car. It's about engineering the numbers. Our experts manipulate the variables to ensure you're driving more car for less money.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: TrendingUp,
                title: 'Money Factor & MSDs',
                desc: 'Capital Motor Cars allows Multiple Security Deposits (MSDs). By temporarily putting down refundable deposits, we significantly buy down your interest rate (money factor), saving you thousands over the term.',
              },
              {
                icon: ShieldCheck,
                title: 'Comprehensive Maintenance',
                desc: 'A standard 36-month lease perfectly encapsulates comprehensive scheduled maintenance coverage. You drive a brand new car and never pay for an oil change.',
              },
              {
                icon: BadgeDollarSign,
                title: 'EV Tax Credits & Rebates',
                desc: 'Leasing an electric BMW like the i4 or i7 unlocks substantial federal lease cash credits that are applied directly to your capitalized cost, driving your monthly payment down aggressively.',
              },
            ].map((feature, i) => (
              <div key={i} className="group relative rounded-[2rem] border border-border dark:border-white/10 bg-card dark:bg-white/[0.02] p-8 md:p-10 shadow-sm transition-all duration-500 hover:border-accent/40 hover:bg-accent/[0.02]">
                <div className="absolute top-0 right-0 p-8 opacity-5 text-8xl font-black text-accent pointer-events-none transition-transform duration-500 group-hover:scale-110 group-hover:-translate-y-2 group-hover:translate-x-2">
                  0{i + 1}
                </div>
                <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-accent/10 text-accent transition-transform duration-500 group-hover:scale-110">
                  <feature.icon className="h-8 w-8" />
                </div>
                <h3 className="text-2xl font-bold text-section mb-4">{feature.title}</h3>
                <p className="text-section-muted leading-relaxed text-lg">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Fleet Section */}
      <section id="featured-models" className="py-20 lg:py-32 section-bg-alt relative overflow-hidden">
        {/* Subtle background decoration */}
        <div className="absolute top-0 right-0 -mr-[20%] -mt-[10%] w-[50%] h-[50%] rounded-full bg-accent/5 blur-[120px] pointer-events-none" />
        
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <SectionHeading
            title="Featured Executive & Performance Models"
            subtitle="Explore our curated selection of high-demand BMW leases, built with the optimal configurations."
            className="mb-16"
          />

          <div className="grid lg:grid-cols-2 gap-10">
            {featuredBmwVehicles.map((vehicle, i) => (
              <div key={vehicle.name} className="flex flex-col rounded-[2.5rem] border border-border dark:border-white/10 bg-background dark:bg-white/[0.03] overflow-hidden shadow-lg transition-all duration-500 hover:border-accent/30 group">
                <div className="relative h-[300px] md:h-[400px] overflow-hidden bg-black/5 dark:bg-white/5">
                  <img 
                    src={vehicle.image} 
                    alt={vehicle.name} 
                    className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-6 right-6">
                    <div className="bg-background/90 dark:bg-black/80 backdrop-blur-md text-section font-bold px-4 py-2 rounded-full border border-border dark:border-white/10 shadow-sm">
                      Starting est. <span className="text-accent">${vehicle.price}</span>/mo
                    </div>
                  </div>
                </div>
                
                <div className="p-8 md:p-10 flex flex-col flex-grow">
                  <h3 className="text-3xl font-extrabold text-section mb-4">{vehicle.name}</h3>
                  <p className="text-section-muted text-lg mb-8 flex-grow leading-relaxed">{vehicle.description}</p>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 p-6 rounded-2xl bg-card dark:bg-white/[0.02] border border-border dark:border-white/5">
                    <div>
                      <p className="text-xs font-bold uppercase text-section-muted mb-1">Power</p>
                      <p className="text-lg font-bold text-section flex items-center gap-1"><Zap className="w-4 h-4 text-accent" /> {vehicle.hp} hp</p>
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase text-section-muted mb-1">0-60 MPH</p>
                      <p className="text-lg font-bold text-section">{vehicle["0"]}</p>
                    </div>
                    <div className="col-span-2">
                      <p className="text-xs font-bold uppercase text-section-muted mb-1">Drivetrain</p>
                      <p className="text-lg font-bold text-section truncate" title={vehicle.drivetrain}>{vehicle.drivetrain}</p>
                    </div>
                  </div>

                  <Button asChild size="lg" className="w-full h-14 bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 font-bold text-lg rounded-xl">
                    <Link to="/contact">Build & Quote Your {vehicle.name.split(' ')[1]}</Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SectionDividerCreative variant="diamond" />

      {/* The Capital Motor Cars Advantage */}
      <section className="py-20 lg:py-32 section-bg">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-accent/10 px-4 py-2 text-sm font-bold uppercase tracking-widest text-accent mb-6">
                <Crown className="h-4 w-4" /> The Capital Motor Cars Advantage
              </div>
              <h2 className="text-3xl md:text-5xl font-extrabold text-heading mb-6 tracking-tight">
                Your Premier BMW <br/>
                <span className="text-accent">Leasing Destination.</span>
              </h2>
              <p className="text-lg text-section-muted leading-relaxed mb-8">
                When you lease your BMW directly from Capital Motor Cars, you skip the traditional runaround. We offer transparent, highly competitive lease structures tailored exactly to your needs.
              </p>
              
              <ul className="space-y-6">
                {[
                  { title: "Exclusive Lease Pricing", desc: "We offer highly competitive lease rates and incentives not always found elsewhere." },
                  { title: "Streamlined Process", desc: "We handle all the paperwork and logistics efficiently over the phone or email." },
                  { title: "White-Glove Delivery", desc: "Your new BMW is delivered directly to your driveway or office, completely detailed." }
                ].map((item, idx) => (
                  <li key={idx} className="flex gap-4">
                    <div className="mt-1 flex-shrink-0 w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center text-accent">
                      <CheckCircle2 className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-section mb-1">{item.title}</h4>
                      <p className="text-section-muted">{item.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-accent/20 to-transparent rounded-[3rem] transform rotate-3" />
              <div className="relative rounded-[3rem] overflow-hidden border border-border dark:border-white/10 shadow-2xl">
                <img 
                  src={luxuryLeasingImage} 
                  alt="Capital Motor Cars Luxury Experience" 
                  className="w-full h-full object-cover min-h-[500px]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-10">
                  <div className="glass-card-theme border-none bg-black/40 backdrop-blur-xl p-6 rounded-2xl w-full">
                    <div className="flex items-center gap-4">
                      <div className="flex -space-x-4">
                        {[1,2,3].map(i => (
                          <div key={i} className="w-12 h-12 rounded-full border-2 border-black bg-zinc-800 flex items-center justify-center text-white font-bold text-xs">
                            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                          </div>
                        ))}
                      </div>
                      <div>
                        <p className="text-white font-bold text-lg">Rated 4.9/5</p>
                        <p className="text-white/70 text-sm">By hundreds of luxury clients</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Deep Dive FAQ Section */}
      <section className="py-20 lg:py-32 section-bg-alt">
        <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-extrabold text-heading mb-6 tracking-tight">
              BMW Leasing Intelligence
            </h2>
            <p className="text-lg text-section-muted">
              Advanced knowledge for the discerning driver. Everything you need to know about structuring a BMW lease.
            </p>
          </div>

          <div className="glass-card-theme p-4 md:p-8 rounded-[2rem]">
            <Accordion type="single" collapsible className="w-full [&_[data-state=open]]:text-section [&_button]:text-section [&_button:hover]:text-section [&_.text-muted-foreground]:text-section-muted">
              {faqs.map((faq, index) => (
                <AccordionItem key={faq.question} value={`faq-${index}`} className="border-border dark:border-white/10 px-4 md:px-6 py-2">
                  <AccordionTrigger className="text-left text-lg md:text-xl font-bold py-4">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-base md:text-lg leading-relaxed text-section-muted pb-6">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 lg:py-24 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto px-0 max-w-5xl">
          <div className="how-it-works-card p-10 md:p-16 lg:p-20 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[100px] pointer-events-none transform translate-x-1/2 -translate-y-1/2" />
            
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 rounded-full bg-accent/10 px-4 py-2 text-sm font-bold uppercase tracking-[0.2em] text-accent mb-8">
                <Crown className="h-5 w-5" />
                Capital Motor Cars
              </div>
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-heading-cta mb-8 tracking-tight leading-[1.1]">
                Your new BMW is waiting. <br/>
                <span className="text-accent">Let's craft the perfect lease.</span>
              </h2>
              <p className="max-w-2xl mx-auto text-lg md:text-xl text-section-muted mb-12 font-medium leading-relaxed">
                Skip the games. Get transparent pricing, expert structuring, and white-glove delivery on any BMW model.
              </p>
              
              <div className="flex flex-col sm:flex-row justify-center gap-5">
                <MagneticButton strength={0.4}>
                  <Button asChild size="lg" className="h-16 px-10 bg-accent hover:bg-accent/90 text-accent-foreground font-bold text-lg glow-blue rounded-full w-full sm:w-auto">
                    <Link to="/contact">Build Your Quote</Link>
                  </Button>
                </MagneticButton>
                <MagneticButton strength={0.2}>
                  <Button asChild size="lg" variant="outline" className="h-16 px-10 border-2 border-border bg-background text-section hover:bg-accent/5 font-bold text-lg rounded-full w-full sm:w-auto">
                    <Link to="/brands">View Other Brands</Link>
                  </Button>
                </MagneticButton>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
