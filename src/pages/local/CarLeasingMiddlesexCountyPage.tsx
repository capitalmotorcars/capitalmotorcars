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
  Users,
  Check,
  X,
  TrendingDown,
  BadgeCheck,
} from 'lucide-react';

const middlesexCities = [
  { name: 'Edison', path: null, highlight: "County's largest city, diverse market, high volume" },
  { name: 'Woodbridge', path: null, highlight: 'I-95 corridor, strong mainstream lease market' },
  { name: 'New Brunswick', path: null, highlight: 'Medical and university professionals' },
  { name: 'Piscataway', path: null, highlight: 'Tech and pharmaceutical workers, EV interest' },
  { name: 'Old Bridge', path: null, highlight: 'Suburban family market, SUV demand' },
  { name: 'East Brunswick', path: null, highlight: 'Growing suburb, BMW and Mercedes demand' },
  { name: 'Metuchen', path: null, highlight: 'Upscale commuter borough' },
  { name: 'Sayreville', path: null, highlight: 'Value leases, mainstream brands' },
];

const middlesexBrands = [
  { name: 'Toyota', path: '/toyota-rav4-lease-nj' },
  { name: 'Honda', path: '/honda-crv-lease-nj' },
  { name: 'BMW', path: '/bmw-car-lease' },
  { name: 'Hyundai', path: '/hyundai-ioniq6-lease-nj' },
  { name: 'Mercedes-Benz', path: '/mercedes-benz-lease-deals-edgewater' },
];

const middlesexModels = [
  { name: 'Toyota RAV4', path: '/toyota-rav4-lease-nj', badge: 'Toyota' },
  { name: 'Honda CR-V', path: '/honda-crv-lease-nj', badge: 'Honda' },
  { name: 'Hyundai IONIQ 6', path: '/hyundai-ioniq6-lease-nj', badge: 'Hyundai' },
  { name: 'BMW 3 Series', path: '/bmw-3-series-lease-nj', badge: 'BMW' },
  { name: 'BMW X3', path: '/bmw-x3-lease-nj', badge: 'BMW' },
  { name: 'Mercedes C-Class', path: '/mercedes-c-class-lease-nj', badge: 'Mercedes' },
];

const faqs = [
  {
    question: 'Which Middlesex County towns does Capital Motor Cars serve?',
    answer: 'We serve all Middlesex County towns including Edison, Woodbridge, New Brunswick, Piscataway, Old Bridge, East Brunswick, Metuchen, South Plainfield, Sayreville, Perth Amboy, Carteret, South Amboy, Milltown, Highland Park, Dunellen, Bound Brook, Manville, and all surrounding communities.',
  },
  {
    question: 'What makes Edison a strong car leasing market?',
    answer: "Edison is the largest city in Middlesex County and one of the most diverse markets in NJ. The South Asian and East Asian communities in Edison have a high rate of Toyota, Honda, and Hyundai leasing. At the same time, the Route 1 corridor brings in a mix of tech workers and professionals who also lease BMW and Mercedes. We serve the full spectrum of Edison's market.",
  },
  {
    question: 'Are there good EV lease options for Middlesex County residents?',
    answer: "Yes. Middlesex County has a growing EV charging infrastructure along Route 1 and the I-287 corridor. NJ's zero sales tax on electric vehicles saves $800 to $1,500 on a 36-month lease. Hyundai IONIQ 6 and BMW iX are the most requested EV leases in the Edison and Piscataway area.",
  },
  {
    question: 'How does Capital Motor Cars handle leases for New Brunswick professionals?',
    answer: "New Brunswick has a large medical and university community (Rutgers, RWJ Barnabas Health). We regularly work with residents who need reliable leases with low drive-off costs, often zero-down or minimal down. Medical professionals with strong income but limited credit history (new to the US or recently completed residency) can often be placed with specific lenders through our network.",
  },
  {
    question: 'Does Capital Motor Cars offer delivery to Middlesex County?',
    answer: "Yes. We can arrange delivery to Edison, Woodbridge, Metuchen, Piscataway, and all Middlesex County locations. Most deliveries are scheduled after paperwork is complete. We confirm the exact logistics and delivery window before your lease begins.",
  },
  {
    question: 'What is the typical lease process for a Middlesex County client?',
    answer: "You reach out and tell us the car you want, your monthly budget, and how many miles you drive annually. We shop the deal across our dealer network, present 2 to 3 options with full payment breakdowns, and handle all paperwork once you decide. Most Middlesex County leases on in-stock vehicles are completed in 3 to 7 business days.",
  },
  {
    question: 'What brands are most popular in Edison NJ for leasing?',
    answer: "Edison's diverse population drives demand across a wide range of brands. Toyota RAV4 and Honda CR-V are top sellers in the Route 1 and Oak Tree Road corridors. Tech workers in Piscataway and South Plainfield frequently request Hyundai IONIQ 6. The East Brunswick and Metuchen markets skew more toward BMW and Mercedes. We place leases across all of these segments daily.",
  },
  {
    question: 'Can I lease a car with no credit history in Middlesex County NJ?',
    answer: "Limited or no credit history is common among recent graduates, new-to-the-US professionals, and recent transplants in New Brunswick and Edison. Some manufacturers (Honda, Toyota, Hyundai) have programs specifically designed for new credit. We assess your income, employment stability, and any international credit history and identify which brands are most likely to approve you with minimal or no NJ credit history.",
  },
  {
    question: 'What is a money factor and how does it affect my lease payment in Middlesex County?',
    answer: "The money factor is the interest rate component of your lease, expressed as a small decimal. Multiply it by 2,400 to get the approximate annual percentage rate. For example, a money factor of 0.00175 equals roughly 4.2% APR. Manufacturers publish a buy-rate money factor monthly. Dealers can mark it up, adding $20–$60 to your monthly payment without telling you. Capital Motor Cars always uses the buy-rate for Middlesex County clients.",
  },
  {
    question: 'How long does the leasing process take in Middlesex County NJ?',
    answer: "Most in-stock leases are completed in 3 to 7 business days. The timeline is: Day 1, you contact us and tell us what you want. Day 1–2, we pull live pricing from our dealer network. Day 2–3, you review and approve your chosen deal. Day 3–7, paperwork is processed and the vehicle is scheduled for delivery to your Middlesex County address. Custom orders or hard-to-find configurations may take 4 to 8 weeks depending on manufacturer allocation.",
  },
];

export default function CarLeasingMiddlesexCountyPage() {
  return (
    <Layout>
      <SEO
        title="Car Leasing Middlesex County NJ | Edison, Woodbridge, New Brunswick | Capital Motor Cars"
        description="Car leasing in Middlesex County NJ. Capital Motor Cars serves Edison, Woodbridge, New Brunswick, Piscataway, Old Bridge, and all Middlesex County towns. Toyota, Honda, BMW, and more."
        canonicalPath="/car-leasing-middlesex-county-nj"
        seoKeywords={[
          'car leasing Middlesex County NJ',
          'auto lease Middlesex County New Jersey',
          'car lease Edison NJ',
          'car lease Woodbridge NJ',
          'Toyota lease Edison NJ',
          'Honda lease Middlesex County NJ',
        ]}
        ogImage="https://images.unsplash.com/photo-1493238792000-8113da705763?auto=format&fit=crop&w=1200&q=60"
      />
      <JsonLd
        data={[
          createWebPageSchema({
            name: 'Car Leasing Middlesex County NJ',
            description: 'Auto lease broker serving all Middlesex County NJ towns including Edison, Woodbridge, New Brunswick, and Piscataway.',
            url: 'https://www.capitalmotorcars.com/car-leasing-middlesex-county-nj',
          }),
          createServiceSchema({
            name: 'Car Leasing Middlesex County NJ',
            description: 'Independent auto lease broker serving all of Middlesex County NJ with luxury and mainstream deals.',
            url: 'https://www.capitalmotorcars.com/car-leasing-middlesex-county-nj',
          }),
          createLocalCarBrokerSchema({
            name: 'Capital Motor Cars - Middlesex County NJ',
            description: 'Independent car lease broker serving all Middlesex County NJ towns.',
            url: 'https://www.capitalmotorcars.com/car-leasing-middlesex-county-nj',
            city: 'Middlesex County',
          }),
          createBreadcrumbSchema([
            { name: 'Home', url: 'https://www.capitalmotorcars.com' },
            { name: 'Car Leasing New Jersey', url: 'https://www.capitalmotorcars.com/car-leasing-new-jersey' },
            { name: 'Middlesex County', url: 'https://www.capitalmotorcars.com/car-leasing-middlesex-county-nj' },
          ]),
          createFaqSchema(faqs),
        ]}
      />

      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-center py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-black/90 to-black/70 z-10" />
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1493238792000-8113da705763?auto=format&fit=crop&w=1600&q=60)' }}
        />
        <div className="container mx-auto px-4 lg:px-8 relative z-20">
          <div className="max-w-3xl">
            <nav className="flex items-center gap-2 text-white/50 text-sm mb-6">
              <Link to="/" className="hover:text-white transition-colors">Home</Link>
              <span>/</span>
              <Link to="/car-leasing-new-jersey" className="hover:text-white transition-colors">New Jersey</Link>
              <span>/</span>
              <span className="text-white">Middlesex County</span>
            </nav>
            <span className="inline-block text-accent font-black tracking-[0.4em] uppercase text-[10px] mb-4 bg-accent/10 px-4 py-2 rounded-full border border-accent/20">
              Middlesex County NJ
            </span>
            <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-white uppercase mb-6">
              Car Leasing<br />
              <span className="text-accent italic">Middlesex County NJ</span>
            </h1>
            <p className="text-white/70 text-lg md:text-xl mb-8 max-w-2xl">
              Independent auto lease broker serving Edison, Woodbridge, New Brunswick, Piscataway, Old Bridge, and all Middlesex County towns. Toyota, Honda, BMW, and every major brand.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 bg-accent text-white font-black uppercase tracking-wider px-8 py-4 rounded-full hover:bg-accent/80 transition-colors"
              >
                Get Middlesex County Quote <ArrowRight className="w-5 h-5" />
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
              { stat: 'Free', label: 'Middlesex County Delivery' },
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
              Middlesex County <span className="text-accent italic">Areas We Serve</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {middlesexCities.map((city, i) => (
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
              Popular Leases in <span className="text-accent italic">Middlesex County</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {middlesexBrands.map((brand, i) => (
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
              How We Lease a Car in <span className="text-accent italic">Middlesex County</span>
            </h2>
            <p className="mt-4 text-muted-foreground text-center max-w-2xl">Whether you're in Edison, Woodbridge, or Piscataway, our process is the same: you tell us what you want, we compete dealers, and we deliver to your door.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-5 max-w-5xl mx-auto">
            {[
              { icon: Phone, title: 'Contact Us', desc: 'Tell us the vehicle, your preferred monthly budget, and how many miles you drive per year. A quick form or five-minute call gets it started.' },
              { icon: DollarSign, title: 'We Pull Live Pricing', desc: 'We access the current manufacturer money factor and residual value, then submit to our dealer network across NJ. Not estimates, live numbers.' },
              { icon: BadgeCheck, title: 'You Review Options', desc: 'We bring you 2–3 offers with full transparency: selling price, money factor, residual, and exact monthly payment. No pressure, no guessing.' },
              { icon: Car, title: 'Free Delivery to Middlesex', desc: 'We handle all paperwork and schedule free delivery to Edison, Woodbridge, New Brunswick, or anywhere else in Middlesex County.' },
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
            <p className="mt-4 text-muted-foreground text-center max-w-2xl">Most Middlesex County residents walking into a dealer have no idea which of these four levers is making their payment higher. We show you all four, every time.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {[
              { icon: DollarSign, title: 'Money Factor', desc: "The interest rate equivalent of your lease, expressed as a small decimal. For a Toyota RAV4 or Honda CR-V, a money factor of 0.00100 translates to roughly 2.4% APR. Dealers in the Edison and Woodbridge area can mark it up without disclosure. We don't." },
              { icon: TrendingDown, title: 'Residual Value', desc: "The percentage of MSRP the manufacturer guarantees the car is worth at lease-end. A Toyota RAV4 with a 58% residual costs less per month than a competitor at 50%, even if the MSRP is higher. We check residuals across brands to find the best deal for your budget." },
              { icon: BadgeCheck, title: 'Capitalized Cost', desc: 'The negotiated selling price of the car. Every dollar below MSRP you negotiate lowers your monthly payment, approximately $28 per month per $1,000 on a 36-month lease. Our dealer competition in the Route 1 corridor routinely achieves $1,000–$3,000 under invoice.' },
              { icon: Car, title: 'Mileage Allowance', desc: "High-mileage Middlesex County commuters (Edison to NYC via NJ Transit is common, but many drive to Newark or Woodbridge) should consider buying up to 15k miles annually upfront. At $0.25/mile for overages at lease-end, paying upfront is typically 40–60% cheaper." },
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
              Popular Models in <span className="text-accent italic">Middlesex County</span>
            </h2>
            <p className="mt-4 text-muted-foreground text-center max-w-2xl">Dedicated lease guides for every model we carry, with pricing, FAQ, and current NJ programs.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {middlesexModels.map((model, i) => (
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

      {/* Why Middlesex County */}
      <section className="py-12 md:py-20 border-t border-border/40 section-bg">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5">
              <span className="text-accent font-black tracking-[0.4em] uppercase text-[10px] mb-4 block">Middlesex Advantage</span>
              <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-black dark:text-white uppercase mb-6">
                Why Middlesex County is a <span className="text-accent italic">Top Lease Market</span>
              </h2>
              <p className="text-muted-foreground text-lg mb-8">Middlesex County is NJ's most populous county, with a diverse mix of tech workers, medical professionals, and families who all have different leasing needs. We specialize in serving this full range, from zero-down Toyota leases to BMW and Mercedes executive packages.</p>
              <Link to="/car-leasing-new-jersey" className="inline-flex items-center gap-2 text-accent font-black uppercase tracking-wider text-sm hover:gap-3 transition-all">
                View All NJ Locations <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { icon: Users, title: "NJ's Most Populous County", desc: "Middlesex County has over 900,000 residents, the largest county in NJ by population. That means more lease demand and more dealer competition." },
                { icon: Car, title: 'Diverse Brand Demand', desc: 'Edison drives high Toyota and Honda volume. East Brunswick and Metuchen drive BMW and Mercedes demand. We match your town to the right program.' },
                { icon: DollarSign, title: 'Route 1 Dealer Network', desc: 'The Route 1 corridor through Woodbridge and South Brunswick has some of the highest-volume dealers in NJ, giving us strong negotiating leverage.' },
                { icon: ShieldCheck, title: 'Broker vs. Dealer Pricing', desc: "Most Middlesex County residents default to walking into a local dealer. An independent broker consistently finds better money factors and residuals." },
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
              Leasing vs Buying in <span className="text-accent italic">Middlesex County</span>
            </h2>
            <p className="mt-4 text-muted-foreground text-center max-w-2xl">For Edison, Woodbridge, and Piscataway residents who upgrade vehicles every 3 years, leasing almost always wins on total cost, flexibility, and access to the latest safety technology.</p>
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
              { aspect: 'End-of-term options', lease: 'Return, buy, or upgrade easily', buy: 'Must sell or trade a depreciating asset' },
              { aspect: 'Mileage', lease: '10k–15k/yr (customizable)', buy: 'Unlimited but lowers resale value' },
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
              Middlesex County <span className="text-accent italic">Leasing FAQ</span>
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
              Middlesex County <span className="text-accent italic">Lease Quote</span>
            </h2>
            <p className="text-muted-foreground mb-4 text-lg max-w-lg mx-auto mt-4 text-center">
              Tell us your town in Middlesex County and the car you want. We handle the dealer negotiation and bring the best deal to you.
            </p>
            <div className="w-full max-w-2xl mx-auto mt-4">
              <div className="glass-card-theme form-card-theme p-4 sm:p-6 md:p-8 rounded-[2.5rem]">
                <ContactForm source="contact" serviceTitle="Car Leasing Middlesex County NJ" compact />
              </div>
            </div>
          </div>
        </div>
      </section>
      <RelatedServices />
    </Layout>
  );
}
