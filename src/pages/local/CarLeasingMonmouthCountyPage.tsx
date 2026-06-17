import { Link } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { RelatedServices } from '@/components/services/RelatedServices';
import { SEO } from '@/components/SEO';
import { JsonLd, createBreadcrumbSchema, createFaqSchema, createServiceSchema, createWebPageSchema, createLocalCarBrokerSchema } from '@/components/JsonLd';
import { motion } from 'framer-motion';
import { ContactForm } from '@/components/forms/ContactForm';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  ArrowRight,
  MapPinned,
  Phone,
  Car,
  DollarSign,
  ShieldCheck,
  Check,
  X,
  TrendingDown,
  BadgeCheck,
  Zap,
} from 'lucide-react';

const monmouthCities = [
  { name: 'Freehold', path: null, highlight: 'County seat, high-volume mainstream and luxury market' },
  { name: 'Red Bank', path: null, highlight: 'Affluent river town, BMW and Tesla demand' },
  { name: 'Rumson', path: null, highlight: "One of NJ's wealthiest towns, ultra-luxury leases" },
  { name: 'Holmdel', path: null, highlight: 'Tech executives, Tesla and BMW SUV focus' },
  { name: 'Marlboro', path: null, highlight: 'Large suburban market, Toyota and Honda volume' },
  { name: 'Shrewsbury', path: null, highlight: 'Luxury suburban market, Audi and Mercedes' },
  { name: 'Ocean Township', path: null, highlight: 'Growing market, SUV and EV interest' },
  { name: 'Manalapan', path: null, highlight: 'High-volume suburban, diverse brand demand' },
];

const monmouthBrands = [
  { name: 'BMW', path: '/bmw-car-lease' },
  { name: 'Tesla', path: '/tesla-leasing-hoboken' },
  { name: 'Audi', path: '/audi-lease-specials-paramus' },
  { name: 'Mercedes-Benz', path: '/mercedes-benz-leasing-edgewater' },
  { name: 'Toyota', path: '/toyota-rav4-lease-nj' },
];

const monmouthModels = [
  { name: 'BMW X3', path: '/bmw-x3-lease-nj', badge: 'BMW' },
  { name: 'BMW X5', path: '/bmw-x5-lease-nj', badge: 'BMW' },
  { name: 'Tesla Model Y', path: '/tesla-model-y-lease-nj', badge: 'Tesla' },
  { name: 'Tesla Model 3', path: '/tesla-model-3-lease-nj', badge: 'Tesla' },
  { name: 'Audi Q5', path: '/audi-q5-lease-nj', badge: 'Audi' },
  { name: 'Mercedes GLE', path: '/mercedes-gle-lease-nj', badge: 'Mercedes' },
  { name: 'Mercedes C-Class', path: '/mercedes-c-class-lease-nj', badge: 'Mercedes' },
  { name: 'Toyota RAV4', path: '/toyota-rav4-lease-nj', badge: 'Toyota' },
  { name: 'Honda CR-V', path: '/honda-crv-lease-nj', badge: 'Honda' },
];

const faqs = [
  {
    question: 'Which Monmouth County towns does Capital Motor Cars serve?',
    answer: 'We serve all Monmouth County towns including Freehold, Red Bank, Rumson, Holmdel, Marlboro, Shrewsbury, Ocean Township, Manalapan, Eatontown, Long Branch, Asbury Park, Keyport, Keansburg, Aberdeen, Hazlet, Middletown, Colts Neck, Tinton Falls, Lincroft, Wall Township, Spring Lake, and all surrounding communities.',
  },
  {
    question: 'Is Monmouth County a strong EV leasing market?',
    answer: "Yes. Monmouth County has a growing EV charging network and strong demand driven by tech professionals in Holmdel and the affluent Shore communities. Tesla Model Y and Model 3 are among the most requested vehicles in the Holmdel, Red Bank, and Rumson areas. NJ's zero sales tax on EVs saves Monmouth County clients $800 to $1,500 over a 36-month lease compared to an equivalent ICE vehicle.",
  },
  {
    question: 'What are the most popular lease requests in Red Bank and Rumson NJ?',
    answer: "Red Bank and Rumson are among Monmouth County's most affluent communities. BMW X5, BMW 5 Series, Tesla Model Y, and Audi Q5 are the most requested vehicles. Rumson clients also frequently request Mercedes GLE and BMW iX. We maintain strong dealer relationships across all these brands and bring Red Bank and Rumson clients competitive buy-rate pricing.",
  },
  {
    question: 'How does Capital Motor Cars deliver to Monmouth County?',
    answer: 'We offer free delivery to all Monmouth County towns including Freehold, Red Bank, Holmdel, Marlboro, Manalapan, Shrewsbury, and the Shore communities. After paperwork is finalized, we coordinate delivery to your home or office and confirm the logistics window with you in advance.',
  },
  {
    question: 'Are there corporate lease programs for Holmdel tech executives?',
    answer: 'Yes. Several manufacturers offer affinity programs for employees of specific companies. We check BMW CCA, Tesla referral, and Audi Conquest eligibility on every quote. Holmdel and Lincroft tech employees at Bell Works and surrounding campuses may qualify for manufacturer programs that reduce the effective payment by $50 to $150 per month.',
  },
  {
    question: 'What credit score do I need to lease a Tesla in Monmouth County NJ?',
    answer: "Tesla's leasing is handled through Tesla Financial, which has its own approval criteria. Generally, a score of 700+ results in standard approval. Unlike traditional manufacturers, Tesla does not use a money factor system, so the markup risk is different. We advise Monmouth County clients on the Tesla lease vs. buy calculation and help evaluate whether third-party financing or the Tesla lease program is the better deal.",
  },
  {
    question: 'What is the money factor and how does it affect my Monmouth County lease payment?',
    answer: 'The money factor is the interest rate equivalent of your lease, expressed as a small decimal. Multiply by 2,400 to get the approximate APR. For example, 0.00125 equals roughly 3.0% APR. BMW, Audi, and Mercedes dealers in the Freehold and Eatontown area can mark up the money factor without disclosing it. Capital Motor Cars always uses the published buy-rate for Monmouth County clients.',
  },
  {
    question: 'Should I lease or buy in Monmouth County NJ?',
    answer: "For most Monmouth County clients who upgrade every 2 to 3 years, leasing wins on total cost, flexibility, and simplicity. You pay only for the depreciation during your term. The factory warranty covers the entire lease. At lease-end, you hand back the keys rather than negotiating a trade-in on a used vehicle. Buying makes more sense if you drive 20k+ miles per year, keep vehicles 7+ years, or plan significant modifications.",
  },
  {
    question: 'Can I lease a luxury car with minimal or no down payment in Monmouth County?',
    answer: 'Yes. We structure most Monmouth County leases as zero-down or low drive-off. Your first month payment and any required fees are due at signing. A large upfront payment on a lease is not recommended in NJ, as it can be lost if the vehicle is totaled before lease-end. We explain this tradeoff on every deal and recommend the most financially sound structure.',
  },
  {
    question: 'How long does the lease process take for a Monmouth County client?',
    answer: 'From first contact to delivery, most in-stock leases are completed in 3 to 7 business days. Day 1: you reach out. Day 1 to 2: we pull live pricing from our dealer network. Day 2 to 3: you review and approve your chosen deal. Day 3 to 7: paperwork is processed and delivery is coordinated to your Monmouth County address. Custom orders or allocation-restricted models may take 4 to 8 weeks.',
  },
];

export default function CarLeasingMonmouthCountyPage() {
  return (
    <Layout>
      <SEO
        title="Car Leasing Monmouth County NJ | Red Bank, Freehold, Holmdel | Capital Motor Cars"
        description="Car leasing in Monmouth County NJ. Capital Motor Cars serves Freehold, Red Bank, Rumson, Holmdel, Marlboro, Shrewsbury, and all Monmouth County towns. BMW, Tesla, Audi, Mercedes, Toyota, and more."
        canonicalPath="/car-leasing-monmouth-county-nj"
        seoKeywords={[
          'car leasing Monmouth County NJ',
          'auto lease Monmouth County New Jersey',
          'car lease Freehold NJ',
          'car lease Red Bank NJ',
          'Tesla lease Holmdel NJ',
          'BMW lease Rumson NJ',
        ]}
        ogImage="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1200&q=60"
      />
      <JsonLd
        data={[
          createWebPageSchema({
            name: 'Car Leasing Monmouth County NJ',
            description: 'Auto lease broker serving all Monmouth County NJ towns including Freehold, Red Bank, Holmdel, Rumson, and Marlboro.',
            url: 'https://www.capitalmotorcars.com/car-leasing-monmouth-county-nj',
          }),
          createServiceSchema({
            name: 'Car Leasing Monmouth County NJ',
            description: 'Independent auto lease broker serving all of Monmouth County NJ with luxury, EV, and mainstream deals.',
            url: 'https://www.capitalmotorcars.com/car-leasing-monmouth-county-nj',
          }),
          createLocalCarBrokerSchema({
            name: 'Capital Motor Cars - Monmouth County NJ',
            description: 'Independent car lease broker serving all Monmouth County NJ towns.',
            url: 'https://www.capitalmotorcars.com/car-leasing-monmouth-county-nj',
            city: 'Monmouth County',
          }),
          createBreadcrumbSchema([
            { name: 'Home', url: 'https://www.capitalmotorcars.com' },
            { name: 'Car Leasing New Jersey', url: 'https://www.capitalmotorcars.com/car-leasing-new-jersey' },
            { name: 'Monmouth County', url: 'https://www.capitalmotorcars.com/car-leasing-monmouth-county-nj' },
          ]),
          createFaqSchema(faqs),
        ]}
      />

      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-center py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-black/90 to-black/70 z-10" />
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1600&q=60)' }}
        />
        <div className="container mx-auto px-4 lg:px-8 relative z-20">
          <div className="max-w-3xl">
            <nav className="flex items-center gap-2 text-white/50 text-sm mb-6">
              <Link to="/" className="hover:text-white transition-colors">Home</Link>
              <span>/</span>
              <Link to="/car-leasing-new-jersey" className="hover:text-white transition-colors">New Jersey</Link>
              <span>/</span>
              <span className="text-white">Monmouth County</span>
            </nav>
            <div className="flex items-center gap-3 mb-4">
              <span className="inline-block text-accent font-black tracking-[0.4em] uppercase text-[10px] bg-accent/10 px-4 py-2 rounded-full border border-accent/20">
                Monmouth County NJ
              </span>
              <span className="inline-flex items-center gap-1.5 text-green-400 font-black tracking-[0.3em] uppercase text-[10px] bg-green-500/10 px-4 py-2 rounded-full border border-green-500/20">
                <Zap className="w-3 h-3" /> EV Hotspot
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-white uppercase mb-6">
              Car Leasing<br />
              <span className="text-accent italic">Monmouth County NJ</span>
            </h1>
            <p className="text-white/70 text-lg md:text-xl mb-8 max-w-2xl">
              Independent auto lease broker serving Freehold, Red Bank, Rumson, Holmdel, Marlboro, and all Monmouth County towns. BMW, Tesla, Audi, Mercedes, Toyota, and every major brand.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/contact" className="inline-flex items-center gap-2 bg-accent text-white font-black uppercase tracking-wider px-8 py-4 rounded-full hover:bg-accent/80 transition-colors">
                Get Monmouth County Quote <ArrowRight className="w-5 h-5" />
              </Link>
              <a href="tel:+12015095555" className="inline-flex items-center gap-2 border-2 border-white/20 text-white font-black uppercase tracking-wider px-8 py-4 rounded-full hover:border-accent hover:text-accent transition-colors">
                <Phone className="w-5 h-5" /> Call Us
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Stats Bar */}
      <section className="py-8 border-b border-border/40 bg-accent/5">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { stat: '760+', label: 'NJ Leases Closed' },
              { stat: 'Buy-Rate', label: 'Money Factor Pricing' },
              { stat: '1 Day', label: 'Quote Turnaround' },
              { stat: 'Free', label: 'Monmouth County Delivery' },
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center">
                <span className="text-3xl md:text-4xl font-black text-accent">{item.stat}</span>
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground mt-1">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* City Grid */}
      <section className="py-12 md:py-20 border-t border-border/40">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col mb-8 md:mb-16 justify-center items-start md:items-center">
            <span className="text-accent font-black tracking-[0.4em] uppercase text-[10px] mb-2">Cities</span>
            <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-black dark:text-white uppercase">
              Monmouth County <span className="text-accent italic">Areas We Serve</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {monmouthCities.map((city, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
                <div className="group p-6 rounded-[1.5rem] border-2 border-border/60 bg-muted/5">
                  <div className="flex items-center gap-2 mb-2">
                    <MapPinned className="w-4 h-4 text-accent" />
                    <span className="font-black text-lg text-black dark:text-white">{city.name}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">{city.highlight}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Brand Links */}
      <section className="py-12 md:py-20 border-t border-border/40">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col mb-8 md:mb-16 justify-center items-start md:items-center">
            <span className="text-accent font-black tracking-[0.4em] uppercase text-[10px] mb-2">Brands</span>
            <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-black dark:text-white uppercase">
              Popular Leases in <span className="text-accent italic">Monmouth County</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {monmouthBrands.map((brand, i) => (
              <Link key={i} to={brand.path} className="group p-6 rounded-[1.5rem] border-2 border-border/60 bg-muted/5 hover:border-accent hover:bg-accent/5 transition-all flex items-center gap-3">
                <ShieldCheck className="w-5 h-5 text-accent shrink-0" />
                <span className="font-bold text-foreground group-hover:text-accent transition-colors">{brand.name}</span>
                <ArrowRight className="w-4 h-4 text-accent ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-12 md:py-20 border-t border-border/40 section-bg">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col mb-10 justify-center items-start md:items-center">
            <span className="text-accent font-black tracking-[0.4em] uppercase text-[10px] mb-2">Our Process</span>
            <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-black dark:text-white uppercase">
              How We Lease a Car in <span className="text-accent italic">Monmouth County</span>
            </h2>
            <p className="mt-4 text-muted-foreground text-center max-w-2xl">From Red Bank to Freehold, most Monmouth County leases are completed in 3 to 7 business days with free delivery to your door.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-5 max-w-5xl mx-auto">
            {[
              { icon: Phone, title: 'Contact Us', desc: 'Tell us the vehicle, your monthly budget, and your Monmouth County town. A quick call or form fill gets the process started.' },
              { icon: DollarSign, title: 'We Pull Live Numbers', desc: 'We access current manufacturer money factors and residual values, then submit to 10+ NJ dealers simultaneously. Not estimates, live numbers.' },
              { icon: BadgeCheck, title: 'You Review Options', desc: 'We present 2 to 3 fully transparent offers: selling price, money factor, residual, and exact monthly payment. No surprises.' },
              { icon: Car, title: 'Delivered to Your Door', desc: 'We handle all paperwork and deliver your vehicle free to Freehold, Red Bank, Holmdel, Marlboro, or anywhere in Monmouth County.' },
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
            <p className="mt-4 text-muted-foreground text-center max-w-2xl">Four factors determine every lease payment. Knowing them helps you evaluate any deal, and understand exactly where Capital Motor Cars saves you money.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {[
              { icon: DollarSign, title: 'Money Factor', desc: 'The interest rate equivalent on a lease. Multiply by 2,400 to get approximate APR. Monmouth County dealers near Freehold and Eatontown can legally mark up the manufacturer buy-rate. We always pass the buy-rate to our clients with no markup.' },
              { icon: TrendingDown, title: 'Residual Value', desc: "The car's projected value at lease-end, set by the manufacturer. A higher residual means less depreciation to finance, which lowers your monthly payment. Tesla Model Y has posted strong residuals recently, making it particularly attractive for Holmdel and Red Bank EV shoppers." },
              { icon: BadgeCheck, title: 'Capitalized Cost', desc: 'The negotiated selling price of the vehicle. We submit deals to 10+ dealers across NJ simultaneously. Only the lowest selling price comes to you. Every $1,000 below MSRP saves roughly $28 per month on a 36-month lease.' },
              { icon: Car, title: 'Mileage Allowance', desc: 'Monmouth County is a car-dependent county with longer commutes than Bergen or Hudson. If you drive 15k+ miles annually, buying up to that mileage level upfront saves significantly versus paying overages at lease-end at $0.20 to $0.30 per mile.' },
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

      {/* Popular Models */}
      <section className="py-12 md:py-20 border-t border-border/40">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col mb-8 md:mb-16 justify-center items-start md:items-center">
            <span className="text-accent font-black tracking-[0.4em] uppercase text-[10px] mb-2">Models</span>
            <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-black dark:text-white uppercase">
              Popular Models in <span className="text-accent italic">Monmouth County</span>
            </h2>
            <p className="mt-4 text-muted-foreground text-center max-w-2xl">Dedicated lease guides for every model we carry, with current NJ pricing, FAQ, and program details.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {monmouthModels.map((model, i) => (
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

      {/* Why Monmouth County */}
      <section className="py-12 md:py-20 border-t border-border/40 section-bg">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5">
              <span className="text-accent font-black tracking-[0.4em] uppercase text-[10px] mb-4 block">Monmouth Advantage</span>
              <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-black dark:text-white uppercase mb-6">
                Why Monmouth County is a <span className="text-accent italic">Growing Lease Market</span>
              </h2>
              <p className="text-muted-foreground text-lg mb-8">Monmouth County combines affluent Shore communities, major tech corridors, and a large suburban base. The mix of Tesla and BMW demand in Holmdel and Red Bank alongside high-volume Toyota and Honda leasing in Marlboro and Manalapan makes it one of NJ's most diverse county lease markets.</p>
              <Link to="/car-leasing-new-jersey" className="inline-flex items-center gap-2 text-accent font-black uppercase tracking-wider text-sm hover:gap-3 transition-all">
                View All NJ Locations <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { icon: Zap, title: 'Strong EV Demand', desc: 'Holmdel tech professionals and Red Bank affluent clients drive high Tesla Model Y and BMW iX demand. NJ 0% EV tax saves $800 to $1,500 on every 36-month lease.' },
                { icon: DollarSign, title: 'Affluent Shore Communities', desc: 'Rumson, Spring Lake, and Sea Girt are among NJ\'s highest net-worth communities. Ultra-luxury leases and BMW X7, Audi Q8, Mercedes S-Class requests come from this area regularly.' },
                { icon: Car, title: 'Multi-Dealer Network Coverage', desc: 'We work with dealers across NJ, including Eatontown and Route 9 corridor dealers, to get Monmouth County clients the most competitive selling prices.' },
                { icon: ShieldCheck, title: 'Full Transparency, Always', desc: 'Every Monmouth County quote shows the selling price, money factor, residual value, and exact monthly payment before you commit to anything.' },
              ].map((item, i) => (
                <div key={i} className="p-6 rounded-[2rem] border-2 border-border/60 bg-muted/5">
                  <div className="w-10 h-10 rounded-xl bg-accent/10 text-accent flex items-center justify-center mb-4">
                    <item.icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-black text-lg text-black dark:text-white mb-2">{item.title}</h3>
                  <p className="text-muted-foreground text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Leasing vs Buying */}
      <section className="py-12 md:py-20 border-t border-border/40">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col mb-10 justify-center items-start md:items-center">
            <span className="text-accent font-black tracking-[0.4em] uppercase text-[10px] mb-2">Comparison</span>
            <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-black dark:text-white uppercase">
              Leasing vs Buying in <span className="text-accent italic">Monmouth County</span>
            </h2>
            <p className="mt-4 text-muted-foreground text-center max-w-2xl">For Holmdel and Red Bank clients who upgrade vehicles every 2 to 3 years, leasing consistently outperforms buying on monthly cost and flexibility.</p>
          </div>
          <div className="max-w-4xl mx-auto glass-card-theme rounded-[2rem] overflow-hidden">
            <div className="grid grid-cols-3 bg-accent/10 px-6 py-4 border-b border-border/40">
              <span className="text-xs font-black uppercase tracking-[0.3em] text-muted-foreground">Factor</span>
              <span className="text-xs font-black uppercase tracking-[0.3em] text-accent text-center">Lease</span>
              <span className="text-xs font-black uppercase tracking-[0.3em] text-muted-foreground text-center">Buy / Finance</span>
            </div>
            {[
              { aspect: 'Monthly payment', lease: 'Lower: pay only depreciation', buy: 'Higher: full MSRP financed' },
              { aspect: 'Upfront cost', lease: 'First month + security deposit', buy: '10–20% down payment' },
              { aspect: 'End-of-term options', lease: 'Return, buy, or upgrade easily', buy: 'Must sell or trade a used car' },
              { aspect: 'Mileage', lease: '10k–15k/yr (customizable)', buy: 'Unlimited but affects resale value' },
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

      {/* FAQ */}
      <section className="py-12 md:py-20 border-t border-border/40">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col mb-8 md:mb-16 justify-center items-start md:items-center">
            <span className="text-accent font-black tracking-[0.4em] uppercase text-[10px] mb-2">FAQ</span>
            <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-black dark:text-white uppercase">
              Monmouth County <span className="text-accent italic">Leasing FAQ</span>
            </h2>
          </div>
          <div className="max-w-7xl mx-auto glass-card-theme p-4 md:p-8 mt-12 rounded-[2rem]">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="border-b-border/40 last:border-0">
                  <AccordionTrigger className="text-left text-lg font-bold hover:text-accent transition-colors py-6">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-base pb-6 leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col mb-8 justify-start items-start md:items-center">
            <span className="text-accent font-black tracking-[0.4em] uppercase text-[10px] mb-2">Get a Quote</span>
            <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-black dark:text-white uppercase">
              Monmouth County <span className="text-accent italic">Lease Quote</span>
            </h2>
            <p className="text-muted-foreground mb-4 text-lg max-w-lg mx-auto mt-4 text-center">
              Tell us your town in Monmouth County and the car you want. We handle the dealer negotiation and bring the best deal to your door.
            </p>
            <div className="w-full max-w-2xl mx-auto mt-4">
              <div className="glass-card-theme form-card-theme p-4 sm:p-6 md:p-8 rounded-[2.5rem]">
                <ContactForm source="contact" serviceTitle="Car Leasing Monmouth County NJ" compact />
              </div>
            </div>
          </div>
        </div>
      </section>
      <RelatedServices />
    </Layout>
  );
}
