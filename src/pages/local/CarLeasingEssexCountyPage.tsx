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
} from 'lucide-react';

const essexCities = [
  { name: 'Montclair', path: null, highlight: 'Affluent suburb, BMW and Tesla demand' },
  { name: 'Livingston', path: null, highlight: 'Top NJ zip code for luxury leasing' },
  { name: 'Millburn', path: null, highlight: "One of NJ's wealthiest towns" },
  { name: 'Maplewood', path: null, highlight: 'NYC commuters, EV interest growing' },
  { name: 'South Orange', path: null, highlight: 'College town, compact luxury market' },
  { name: 'West Orange', path: null, highlight: 'Large suburban market, SUV demand' },
  { name: 'Bloomfield', path: null, highlight: 'Growing commuter suburb' },
  { name: 'Nutley', path: null, highlight: 'Dense suburban market, value leases' },
];

const essexBrands = [
  { name: 'BMW', path: '/bmw-car-lease' },
  { name: 'Audi', path: '/audi-lease-specials-paramus' },
  { name: 'Mercedes-Benz', path: '/mercedes-benz-leasing-edgewater' },
  { name: 'Lexus', path: '/lexus-lease-deals-marlton' },
  { name: 'Tesla', path: '/tesla-leasing-hoboken' },
];

const essexModels = [
  { name: 'BMW 3 Series', path: '/bmw-3-series-lease-nj', badge: 'BMW' },
  { name: 'BMW 5 Series', path: '/bmw-5-series-lease-nj', badge: 'BMW' },
  { name: 'BMW X3', path: '/bmw-x3-lease-nj', badge: 'BMW' },
  { name: 'BMW X5', path: '/bmw-x5-lease-nj', badge: 'BMW' },
  { name: 'Audi A4', path: '/audi-a4-lease-nj', badge: 'Audi' },
  { name: 'Audi Q5', path: '/audi-q5-lease-nj', badge: 'Audi' },
  { name: 'Mercedes C-Class', path: '/mercedes-c-class-lease-nj', badge: 'Mercedes' },
  { name: 'Mercedes GLE', path: '/mercedes-gle-lease-nj', badge: 'Mercedes' },
  { name: 'Tesla Model Y', path: '/tesla-model-y-lease-nj', badge: 'Tesla' },
];

const faqs = [
  {
    question: 'Which Essex County towns does Capital Motor Cars serve?',
    answer: 'We serve all Essex County towns including Montclair, Livingston, Millburn, Short Hills, Maplewood, South Orange, West Orange, Bloomfield, Nutley, Belleville, Irvington, Cedar Grove, Caldwell, Fairfield, North Caldwell, Essex Fells, and Newark.',
  },
  {
    question: 'What are the most popular leases in Livingston and Millburn?',
    answer: "Livingston and Millburn rank among NJ's highest-income zip codes. BMW, Audi, and Mercedes-Benz leases are consistently the most requested. The BMW 5 Series, Audi Q5, and Mercedes GLE are top sellers. Short Hills residents also frequently request BMW X5 and Audi Q7.",
  },
  {
    question: 'Is Montclair a good market for EV leasing?',
    answer: "Yes. Montclair has an environmentally conscious community with above-average household incomes. Tesla Model Y and BMW iX leases are popular here. NJ's zero sales tax on EVs saves Montclair residents $800 to $1,500 on a 36-month lease compared to ICE vehicles.",
  },
  {
    question: "How close is Capital Motor Cars' office to Essex County?",
    answer: 'Our Springfield office is located in Union County directly adjacent to Essex County, approximately 10 to 15 minutes from Millburn, Livingston, and Maplewood. Our Edgewater location is about 20 minutes from Montclair via I-280. We cover all of Essex County without hesitation.',
  },
  {
    question: 'Do you offer delivery to Essex County?',
    answer: 'Yes. We deliver to Montclair, Livingston, Millburn, Maplewood, South Orange, West Orange, and all Essex County towns. Most deliveries are arranged after paperwork completion. We coordinate logistics and confirm a delivery window that works for your schedule.',
  },
  {
    question: 'What credit score do I need to lease a luxury car in Essex County NJ?',
    answer: 'BMW, Audi, and Mercedes-Benz each have their own financing arm and credit tiers. Tier 1 approval (best money factor) typically requires a 720+ credit score. Scores in the 680 to 720 range are often approved at a slightly higher money factor. We assess your specific situation and recommend the brand most likely to approve you at the best rate.',
  },
  {
    question: 'What is the money factor on a car lease in Essex County NJ?',
    answer: 'The money factor is the interest rate equivalent on a lease, expressed as a small decimal (e.g., 0.00125). Multiply it by 2400 to get the approximate APR equivalent. Manufacturers publish a "buy-rate" money factor each month. Dealers are allowed to mark it up, Capital Motor Cars always uses the buy-rate and never adds a dealer markup, saving Essex County clients $20–$60 per month.',
  },
  {
    question: 'Can I lease a car in Essex County with bad credit?',
    answer: 'It depends on your specific score and history. Most luxury brands require 680+ for approval. Some mainstream brands (Toyota, Honda, Hyundai) are more flexible. We work with all credit profiles and will advise honestly on which brands are most likely to approve you, rather than wasting your time on hard inquiries with brands that won\'t work.',
  },
  {
    question: 'What happens when my lease ends in Essex County NJ?',
    answer: 'You have three options: return the vehicle to any dealership of that brand, buy the car at the pre-set residual value, or lease a new vehicle. We manage the lease-end process for all our clients, coordinate the return inspection, and can often line up your next lease before you need to return the current vehicle to ensure continuity.',
  },
  {
    question: 'How do I know I\'m getting a fair lease deal in Essex County NJ?',
    answer: 'A fair lease shows the selling price (should be at or below invoice), the money factor (should be at buy-rate), and the residual value (set by the manufacturer). At Capital Motor Cars, we provide a full payment breakdown on every quote, selling price, money factor, residual, and all fees, so you can verify every number independently before signing.',
  },
];

export default function CarLeasingEssexCountyPage() {
  return (
    <Layout>
      <SEO
        title="Car Leasing Essex County NJ | Montclair, Livingston, Millburn | Capital Motor Cars"
        description="Car leasing in Essex County NJ. Capital Motor Cars serves Montclair, Livingston, Millburn, Maplewood, West Orange, and all Essex County towns. BMW, Audi, Mercedes, Tesla, and more."
        canonicalPath="/car-leasing-essex-county-nj"
        seoKeywords={[
          'car leasing Essex County NJ',
          'auto lease Essex County New Jersey',
          'car lease Montclair NJ',
          'car lease Livingston NJ',
          'luxury car lease Essex County',
          'BMW lease Millburn NJ',
        ]}
        ogImage="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=60"
      />
      <JsonLd
        data={[
          createWebPageSchema({
            name: 'Car Leasing Essex County NJ',
            description: 'Auto lease broker serving all Essex County NJ towns including Montclair, Livingston, Millburn, and Maplewood.',
            url: 'https://www.capitalmotorcars.com/car-leasing-essex-county-nj',
          }),
          createServiceSchema({
            name: 'Car Leasing Essex County NJ',
            description: 'Independent auto lease broker serving all of Essex County NJ with luxury and mainstream deals.',
            url: 'https://www.capitalmotorcars.com/car-leasing-essex-county-nj',
          }),
          createLocalCarBrokerSchema({
            name: 'Capital Motor Cars - Essex County NJ',
            description: 'Independent car lease broker serving all Essex County NJ towns.',
            url: 'https://www.capitalmotorcars.com/car-leasing-essex-county-nj',
            city: 'Essex County',
          }),
          createBreadcrumbSchema([
            { name: 'Home', url: 'https://www.capitalmotorcars.com' },
            { name: 'Car Leasing New Jersey', url: 'https://www.capitalmotorcars.com/car-leasing-new-jersey' },
            { name: 'Essex County', url: 'https://www.capitalmotorcars.com/car-leasing-essex-county-nj' },
          ]),
          createFaqSchema(faqs),
        ]}
      />

      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-center py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-black/90 to-black/70 z-10" />
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1600&q=60)' }}
        />
        <div className="container mx-auto px-4 lg:px-8 relative z-20">
          <div className="max-w-3xl">
            <nav className="flex items-center gap-2 text-white/50 text-sm mb-6">
              <Link to="/" className="hover:text-white transition-colors">Home</Link>
              <span>/</span>
              <Link to="/car-leasing-new-jersey" className="hover:text-white transition-colors">New Jersey</Link>
              <span>/</span>
              <span className="text-white">Essex County</span>
            </nav>
            <span className="inline-block text-accent font-black tracking-[0.4em] uppercase text-[10px] mb-4 bg-accent/10 px-4 py-2 rounded-full border border-accent/20">
              Essex County NJ
            </span>
            <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-white uppercase mb-6">
              Car Leasing<br />
              <span className="text-accent italic">Essex County NJ</span>
            </h1>
            <p className="text-white/70 text-lg md:text-xl mb-8 max-w-2xl">
              Independent auto lease broker serving Montclair, Livingston, Millburn, Maplewood, West Orange, and all Essex County towns. BMW, Audi, Mercedes, Tesla, and every major brand.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 bg-accent text-white font-black uppercase tracking-wider px-8 py-4 rounded-full hover:bg-accent/80 transition-colors"
              >
                Get Essex County Quote <ArrowRight className="w-5 h-5" />
              </Link>
              <a
                href="tel:+12015095555"
                className="inline-flex items-center gap-2 border-2 border-white/20 text-white font-black uppercase tracking-wider px-8 py-4 rounded-full hover:border-accent hover:text-accent transition-colors"
              >
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
              { stat: 'Free', label: 'Essex County Delivery' },
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
              Essex County <span className="text-accent italic">Areas We Serve</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {essexCities.map((city, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
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
              Popular Leases in <span className="text-accent italic">Essex County</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {essexBrands.map((brand, i) => (
              <Link
                key={i}
                to={brand.path}
                className="group p-6 rounded-[1.5rem] border-2 border-border/60 bg-muted/5 hover:border-accent hover:bg-accent/5 transition-all flex items-center gap-3"
              >
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
              How We Lease a Car in <span className="text-accent italic">Essex County</span>
            </h2>
            <p className="mt-4 text-muted-foreground text-center max-w-2xl">From your first message to keys in hand, most Essex County leases are completed in 3 to 7 business days without a single dealership visit.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-5 max-w-5xl mx-auto">
            {[
              { icon: Phone, title: 'Contact Us', desc: 'Tell us the vehicle you want, your monthly budget, and your Essex County town. Five minutes on the phone or a quick form fill is all it takes.' },
              { icon: DollarSign, title: 'We Shop Dealers', desc: 'We submit your deal to our network of 10+ dealers across NJ and NY simultaneously. They compete on selling price, you never negotiate.' },
              { icon: BadgeCheck, title: 'Review Your Options', desc: 'We present 2 to 3 options with a full breakdown: selling price, money factor, residual, and exact monthly payment. No hidden numbers.' },
              { icon: Car, title: 'Vehicle Delivered', desc: 'Once you approve a deal, we handle all paperwork and arrange free delivery to your door anywhere in Essex County.' },
            ].map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group p-7 rounded-[2rem] border-2 border-border/60 bg-muted/5 hover:border-accent/40 transition-all relative overflow-hidden"
              >
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

      {/* What Affects Your Monthly Payment */}
      <section className="py-12 md:py-20 border-t border-border/40">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col mb-10 justify-center items-start md:items-center">
            <span className="text-accent font-black tracking-[0.4em] uppercase text-[10px] mb-2">Lease Education</span>
            <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-black dark:text-white uppercase">
              What Affects Your <span className="text-accent italic">Monthly Payment</span>
            </h2>
            <p className="mt-4 text-muted-foreground text-center max-w-2xl">Understanding these four factors lets you evaluate any lease deal, and spot where a dealer might be padding their margin.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {[
              { icon: DollarSign, title: 'Money Factor', desc: 'The lease equivalent of an interest rate. Multiply by 2,400 to get the approximate APR. Manufacturers publish a buy-rate, dealers can legally mark it up. We always use the buy-rate.' },
              { icon: TrendingDown, title: 'Residual Value', desc: "The car's projected value at the end of the lease term, set by the manufacturer. Higher residual = lower monthly payment. Luxury SUVs and EVs often have strong residuals." },
              { icon: BadgeCheck, title: 'Capitalized Cost', desc: 'The negotiated selling price of the vehicle. Lower cap cost = lower monthly payment. This is where dealer negotiation matters most, and where we save Essex County clients the most money.' },
              { icon: Car, title: 'Mileage Allowance', desc: 'Standard leases are 10,000 or 12,000 miles per year. NYC commuters often choose 10k to keep payments lower. Going over the allowance triggers a per-mile charge at lease end, typically $0.20–$0.30/mile.' },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-7 rounded-[2rem] border-2 border-border/60 bg-muted/5 hover:border-accent/40 transition-all"
              >
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
              Popular Models in <span className="text-accent italic">Essex County</span>
            </h2>
            <p className="mt-4 text-muted-foreground text-center max-w-2xl">Dedicated lease guides for every model we carry, with pricing, FAQ, and current NJ programs.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {essexModels.map((model, i) => (
              <Link
                key={i}
                to={model.path}
                className="group p-5 rounded-[1.5rem] border-2 border-border/60 bg-muted/5 hover:border-accent hover:bg-accent/5 transition-all"
              >
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

      {/* Why Essex County */}
      <section className="py-12 md:py-20 border-t border-border/40 section-bg">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5">
              <span className="text-accent font-black tracking-[0.4em] uppercase text-[10px] mb-4 block">Essex Advantage</span>
              <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-black dark:text-white uppercase mb-6">
                Why Essex County is <span className="text-accent italic">Great for Leasing</span>
              </h2>
              <p className="text-muted-foreground text-lg mb-8">Essex County spans some of NJ's wealthiest suburbs and most active lease markets. From Livingston and Millburn's luxury-focused shoppers to Maplewood's EV-curious commuters, we know exactly what each town needs.</p>
              <Link to="/car-leasing-new-jersey" className="inline-flex items-center gap-2 text-accent font-black uppercase tracking-wider text-sm hover:gap-3 transition-all">
                View All NJ Locations <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { icon: Car, title: 'Adjacent to Our Springfield HQ', desc: 'Our Springfield office is minutes from Millburn, Livingston, and Maplewood, making Essex County one of our fastest-served markets.' },
                { icon: DollarSign, title: 'High Household Incomes', desc: "Essex County suburbs like Short Hills and Livingston consistently rank among NJ's top zip codes for luxury car leasing volume." },
                { icon: MapPinned, title: 'NYC Commuter Market', desc: 'Many Essex County residents commute to NYC via NJ Transit. Low mileage and EV leases are especially popular here.' },
                { icon: ShieldCheck, title: 'Broker Advantage', desc: 'We source deals from Bergen County, Paramus, and NY dealers simultaneously, Essex County clients get the benefit of a wider negotiation pool.' },
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
              Leasing vs Buying in <span className="text-accent italic">Essex County</span>
            </h2>
            <p className="mt-4 text-muted-foreground text-center max-w-2xl">For most Essex County drivers who upgrade every 3 years, leasing wins on monthly cost, flexibility, and access to the latest models.</p>
          </div>
          <div className="max-w-4xl mx-auto glass-card-theme rounded-[2rem] overflow-hidden">
            <div className="grid grid-cols-3 bg-accent/10 px-6 py-4 border-b border-border/40">
              <span className="text-xs font-black uppercase tracking-[0.3em] text-muted-foreground">Factor</span>
              <span className="text-xs font-black uppercase tracking-[0.3em] text-accent text-center">Lease</span>
              <span className="text-xs font-black uppercase tracking-[0.3em] text-muted-foreground text-center">Buy / Finance</span>
            </div>
            {[
              { aspect: 'Monthly payment', lease: 'Lower: you pay only depreciation', buy: 'Higher: full MSRP financed' },
              { aspect: 'Upfront cost', lease: 'First month + security deposit', buy: '10–20% down payment' },
              { aspect: 'Flexibility', lease: 'Return or upgrade every 2–3 yrs', buy: 'Must sell or trade-in' },
              { aspect: 'Mileage', lease: '10k–15k/yr (customizable)', buy: 'Unlimited but affects resale value' },
              { aspect: 'Maintenance', lease: 'Full warranty covers entire term', buy: 'Warranty expires; costs yours' },
              { aspect: 'Technology', lease: 'New model with latest tech always', buy: 'Same model until you sell' },
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
              Essex County <span className="text-accent italic">Leasing FAQ</span>
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
              Essex County <span className="text-accent italic">Lease Quote</span>
            </h2>
            <p className="text-muted-foreground mb-4 text-lg max-w-lg mx-auto mt-4 text-center">
              Tell us your town in Essex County and the car you want. We handle the dealer negotiation and bring the best deal to you.
            </p>
            <div className="w-full max-w-2xl mx-auto mt-4">
              <div className="glass-card-theme form-card-theme p-4 sm:p-6 md:p-8 rounded-[2.5rem]">
                <ContactForm source="contact" serviceTitle="Car Leasing Essex County NJ" compact />
              </div>
            </div>
          </div>
        </div>
      </section>
      <RelatedServices />
    </Layout>
  );
}
