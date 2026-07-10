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
  Building2,
} from 'lucide-react';

const morrisCities = [
  { name: 'Morristown', path: null, highlight: 'County seat, corporate HQ hub, luxury lease demand' },
  { name: 'Parsippany', path: null, highlight: 'Major tech and pharma corridor, high-volume market' },
  { name: 'Madison', path: null, highlight: 'Affluent suburb, BMW and Audi focus' },
  { name: 'Chatham', path: null, highlight: "One of NJ's wealthiest towns, luxury SUV market" },
  { name: 'Morris Plains', path: null, highlight: 'Executive suburb, NYC commuters' },
  { name: 'Boonton', path: null, highlight: 'Growing suburb, family and mainstream leases' },
  { name: 'Denville', path: null, highlight: 'Suburban crossover market, Toyota and Honda' },
  { name: 'Randolph', path: null, highlight: 'Established suburb, strong BMW and Mercedes demand' },
];

const morrisBrands = [
  { name: 'BMW', path: '/bmw-car-lease' },
  { name: 'Audi', path: '/audi-lease-deals-paramus' },
  { name: 'Mercedes-Benz', path: '/mercedes-benz-lease-deals-edgewater' },
  { name: 'Toyota', path: '/toyota-rav4-lease-nj' },
  { name: 'Honda', path: '/honda-crv-lease-nj' },
];

const morrisModels = [
  { name: 'BMW 3 Series', path: '/bmw-3-series-lease-nj', badge: 'BMW' },
  { name: 'BMW X3', path: '/bmw-x3-lease-nj', badge: 'BMW' },
  { name: 'BMW X5', path: '/bmw-x5-lease-nj', badge: 'BMW' },
  { name: 'Audi Q5', path: '/audi-q5-lease-nj', badge: 'Audi' },
  { name: 'Audi A4', path: '/audi-a4-lease-nj', badge: 'Audi' },
  { name: 'Mercedes C-Class', path: '/mercedes-c-class-lease-nj', badge: 'Mercedes' },
  { name: 'Mercedes GLE', path: '/mercedes-gle-lease-nj', badge: 'Mercedes' },
  { name: 'Toyota RAV4', path: '/toyota-rav4-lease-nj', badge: 'Toyota' },
  { name: 'Honda CR-V', path: '/honda-crv-lease-nj', badge: 'Honda' },
];

const faqs = [
  {
    question: 'Which Morris County towns does Capital Motor Cars serve?',
    answer: 'We serve all Morris County towns including Morristown, Parsippany, Madison, Chatham, Florham Park, Rockaway, Dover, Morris Plains, Boonton, Denville, Randolph, Mount Olive, Roxbury, Mine Hill, and all surrounding communities.',
  },
  {
    question: 'What makes Parsippany and Morristown strong car leasing markets?',
    answer: 'Parsippany is one of NJ\'s largest commercial corridors, home to dozens of Fortune 500 offices along I-287. Corporate leases and executive vehicles are a significant portion of the market. Morristown attracts attorneys, financial professionals, and executives who frequently lease BMW, Mercedes, and Audi. Madison and Chatham are among the wealthiest towns in Morris County and consistently request luxury SUVs.',
  },
  {
    question: 'Does Capital Motor Cars deliver to Morris County?',
    answer: 'Yes. We deliver to Morristown, Parsippany, Madison, Chatham, Randolph, Denville, and all Morris County towns. Most deliveries happen after paperwork is complete. We coordinate the delivery window and confirm logistics with you in advance. No trip to a dealership is required.',
  },
  {
    question: 'What credit score do I need to lease a BMW or Audi in Morris County NJ?',
    answer: 'BMW Financial Services and Audi Financial Services both use tiered credit approval. A score of 720+ typically qualifies for Tier 1 pricing (best money factor). Scores of 680–720 are usually approved at a slightly higher rate. We review your profile and recommend the brand and program most likely to approve you at the best available terms.',
  },
  {
    question: 'Can corporate employees in Parsippany get fleet lease pricing?',
    answer: 'Certain manufacturers offer corporate or affinity programs for employees of partner companies. We check eligibility for BMW CCA, Audi Conquest, and Mercedes Corporate programs as part of every quote. Eligible Parsippany corporate clients can sometimes save $50–$150 per month versus standard lease programs.',
  },
  {
    question: 'What is the money factor and how does it affect my Morris County lease?',
    answer: 'The money factor is the interest rate analog for a lease. Multiply by 2,400 to get the approximate APR equivalent. Manufacturers publish a buy-rate each month; dealers can legally mark it up by 0.001 or more, which adds $30–$60 to your monthly payment invisibly. Capital Motor Cars always uses the published buy-rate for Morris County clients.',
  },
  {
    question: 'What are the most popular leases in Chatham and Madison NJ?',
    answer: 'Chatham and Madison are two of Morris County\'s most affluent towns. BMW X5, Audi Q7, Mercedes GLE, and BMW 5 Series lead the request list. Short Hills (across the county line in Essex) is a common comparison for these clients. We serve both markets with the same buy-rate pricing and dealer competition across the full NJ and NY dealer network.',
  },
  {
    question: 'How does leasing save money versus buying in Morris County NJ?',
    answer: 'For Morris County professionals who upgrade vehicles every 3 years, leasing consistently wins on monthly cost, warranty coverage, and flexibility. You pay only for the depreciation during your ownership window. The factory warranty covers the entire term. At lease end, you hand back the keys and move to the next model rather than negotiating a trade-in on a used car.',
  },
  {
    question: 'Can I get a zero-down lease in Morris County NJ?',
    answer: 'Yes. Most of our Morris County clients structure leases as zero-down or minimal drive-off. The first month payment and any required fees are due at signing. A large down payment on a lease in NJ can be lost if the vehicle is totaled before lease-end, so zero-down leasing is often the smarter approach. We explain this tradeoff on every quote.',
  },
  {
    question: 'What is the fastest way to get a lease quote for a Morris County resident?',
    answer: 'Fill out our contact form or call 201-509-5555. Tell us the vehicle you want, your preferred term, and your annual mileage. We pull live pricing from our dealer network and return a full breakdown within one business day. No dealership visit, no pressure, just a real number you can act on.',
  },
];

export default function CarLeasingMorrisCountyPage() {
  return (
    <Layout>
      <SEO
        title="Car Leasing Morris County NJ | Morristown, Parsippany, Madison | Capital Motor Cars"
        description="Car leasing in Morris County NJ. Capital Motor Cars serves Morristown, Parsippany, Madison, Chatham, Randolph, and all Morris County towns. BMW, Audi, Mercedes, Toyota, Honda, and more."
        canonicalPath="/car-leasing-morris-county-nj"
        seoKeywords={[
          'car leasing Morris County NJ',
          'auto lease Morris County New Jersey',
          'car lease Morristown NJ',
          'car lease Parsippany NJ',
          'BMW lease Madison NJ',
          'luxury car lease Morris County',
        ]}
        ogImage="https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=1200&q=60"
      />
      <JsonLd
        data={[
          createWebPageSchema({
            name: 'Car Leasing Morris County NJ',
            description: 'Auto lease broker serving all Morris County NJ towns including Morristown, Parsippany, Madison, and Chatham.',
            url: 'https://www.capitalmotorcars.com/car-leasing-morris-county-nj',
          }),
          createServiceSchema({
            name: 'Car Leasing Morris County NJ',
            description: 'Independent auto lease broker serving all of Morris County NJ with luxury and mainstream deals.',
            url: 'https://www.capitalmotorcars.com/car-leasing-morris-county-nj',
          }),
          createLocalCarBrokerSchema({
            name: 'Capital Motor Cars - Morris County NJ',
            description: 'Independent car lease broker serving all Morris County NJ towns.',
            url: 'https://www.capitalmotorcars.com/car-leasing-morris-county-nj',
            city: 'Morris County',
          }),
          createBreadcrumbSchema([
            { name: 'Home', url: 'https://www.capitalmotorcars.com' },
            { name: 'Car Leasing New Jersey', url: 'https://www.capitalmotorcars.com/car-leasing-new-jersey' },
            { name: 'Morris County', url: 'https://www.capitalmotorcars.com/car-leasing-morris-county-nj' },
          ]),
          createFaqSchema(faqs),
        ]}
      />

      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-center py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-black/90 to-black/70 z-10" />
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=1600&q=60)' }}
        />
        <div className="container mx-auto px-4 lg:px-8 relative z-20">
          <div className="max-w-3xl">
            <nav className="flex items-center gap-2 text-white/50 text-sm mb-6">
              <Link to="/" className="hover:text-white transition-colors">Home</Link>
              <span>/</span>
              <Link to="/car-leasing-new-jersey" className="hover:text-white transition-colors">New Jersey</Link>
              <span>/</span>
              <span className="text-white">Morris County</span>
            </nav>
            <span className="inline-block text-accent font-black tracking-[0.4em] uppercase text-[10px] mb-4 bg-accent/10 px-4 py-2 rounded-full border border-accent/20">
              Morris County NJ
            </span>
            <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-white uppercase mb-6">
              Car Leasing<br />
              <span className="text-accent italic">Morris County NJ</span>
            </h1>
            <p className="text-white/70 text-lg md:text-xl mb-8 max-w-2xl">
              Independent auto lease broker serving Morristown, Parsippany, Madison, Chatham, Randolph, and all Morris County towns. BMW, Audi, Mercedes, Toyota, Honda, and every major brand.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/contact" className="inline-flex items-center gap-2 bg-accent text-white font-black uppercase tracking-wider px-8 py-4 rounded-full hover:bg-accent/80 transition-colors">
                Get Morris County Quote <ArrowRight className="w-5 h-5" />
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
              { stat: 'Free', label: 'Morris County Delivery' },
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
              Morris County <span className="text-accent italic">Areas We Serve</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {morrisCities.map((city, i) => (
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
              Popular Leases in <span className="text-accent italic">Morris County</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {morrisBrands.map((brand, i) => (
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
              How We Lease a Car in <span className="text-accent italic">Morris County</span>
            </h2>
            <p className="mt-4 text-muted-foreground text-center max-w-2xl">Parsippany and Morristown professionals get a live buyable quote within one business day. No dealer visits, no back-and-forth negotiation.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-5 max-w-5xl mx-auto">
            {[
              { icon: Phone, title: 'Contact Us', desc: 'Tell us the vehicle, your monthly budget, and your Morris County town. A quick form or call is all it takes to get started.' },
              { icon: DollarSign, title: 'We Pull Live Pricing', desc: 'We access the current manufacturer money factor and residual value, then submit to 10+ dealers across NJ and NY simultaneously.' },
              { icon: BadgeCheck, title: 'You Review Options', desc: 'We present 2 to 3 fully transparent offers showing the selling price, money factor, residual, and exact monthly payment.' },
              { icon: Car, title: 'Delivered to Morris County', desc: 'We handle all paperwork and deliver your vehicle free to Morristown, Parsippany, Madison, Chatham, or anywhere in Morris County.' },
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
            <p className="mt-4 text-muted-foreground text-center max-w-2xl">Morris County professionals know their numbers. Here are the four levers that determine your lease payment, and where we consistently save clients money.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {[
              { icon: DollarSign, title: 'Money Factor', desc: 'The lease interest rate, expressed as a small decimal. Multiply by 2,400 for APR equivalent. Dealers in the I-287 corridor can mark it up without telling you. We use the manufacturer buy-rate every time, saving Morris County clients $20 to $60 per month.' },
              { icon: TrendingDown, title: 'Residual Value', desc: "The car's projected worth at lease-end, set by the manufacturer as a percentage of MSRP. Higher residual = lower payment. BMW X3, Audi Q5, and Honda CR-V carry strong residuals in current programs, which is why they are top picks in Parsippany and Madison." },
              { icon: BadgeCheck, title: 'Capitalized Cost', desc: 'The negotiated selling price of the vehicle. Every $1,000 below MSRP reduces your monthly payment by about $28 on a 36-month lease. We submit to 10+ dealers simultaneously and only the lowest selling price comes to you.' },
              { icon: Car, title: 'Mileage Allowance', desc: 'Standard programs are 10k or 12k miles per year. Parsippany commuters who drive I-287 daily may average 15k or more. Buying extra miles upfront is typically 40-60% cheaper per mile than paying overages at lease-end.' },
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
              Popular Models in <span className="text-accent italic">Morris County</span>
            </h2>
            <p className="mt-4 text-muted-foreground text-center max-w-2xl">Dedicated lease guides for every model we carry, with pricing, FAQ, and current NJ programs.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {morrisModels.map((model, i) => (
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

      {/* Why Morris County */}
      <section className="py-12 md:py-20 border-t border-border/40 section-bg">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5">
              <span className="text-accent font-black tracking-[0.4em] uppercase text-[10px] mb-4 block">Morris Advantage</span>
              <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-black dark:text-white uppercase mb-6">
                Why Morris County is a <span className="text-accent italic">Premier Lease Market</span>
              </h2>
              <p className="text-muted-foreground text-lg mb-8">Morris County is home to some of NJ's most affluent towns and largest corporate campuses. From Parsippany's pharma and tech executives to Chatham's luxury SUV shoppers, we know exactly what each part of the county needs.</p>
              <Link to="/car-leasing-new-jersey" className="inline-flex items-center gap-2 text-accent font-black uppercase tracking-wider text-sm hover:gap-3 transition-all">
                View All NJ Locations <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { icon: Building2, title: 'Corporate Corridor on I-287', desc: 'Parsippany and Florham Park host hundreds of corporate offices. Corporate lease programs and executive vehicles are a large portion of the Morris County market.' },
                { icon: DollarSign, title: 'Chatham and Madison Luxury Demand', desc: "Chatham and Madison consistently rank among NJ's top ZIP codes for luxury vehicle registrations. BMW X5, Audi Q7, and Mercedes GLE are the most requested vehicles." },
                { icon: Car, title: 'Multi-State Dealer Network', desc: 'Our broker access covers NJ, NY, CT, and PA dealers. Morris County clients benefit from a wider sourcing pool than any single-county dealer.' },
                { icon: ShieldCheck, title: 'Zero Dealership Pressure', desc: 'We present options with full transparency: selling price, money factor, and residual. You see every number before signing. No pressure, no back-and-forth.' },
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
              Leasing vs Buying in <span className="text-accent italic">Morris County</span>
            </h2>
            <p className="mt-4 text-muted-foreground text-center max-w-2xl">For Parsippany and Morristown professionals who upgrade every 3 years, leasing consistently wins on cost, flexibility, and keeping pace with technology.</p>
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
              Morris County <span className="text-accent italic">Leasing FAQ</span>
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
              Morris County <span className="text-accent italic">Lease Quote</span>
            </h2>
            <p className="text-muted-foreground mb-4 text-lg max-w-lg mx-auto mt-4 text-center">
              Tell us your town in Morris County and the car you want. We handle the dealer negotiation and bring the best deal to you.
            </p>
            <div className="w-full max-w-2xl mx-auto mt-4">
              <div className="glass-card-theme form-card-theme p-4 sm:p-6 md:p-8 rounded-[2.5rem]">
                <ContactForm source="contact" serviceTitle="Car Leasing Morris County NJ" compact />
              </div>
            </div>
          </div>
        </div>
      </section>
      <RelatedServices />
    </Layout>
  );
}
