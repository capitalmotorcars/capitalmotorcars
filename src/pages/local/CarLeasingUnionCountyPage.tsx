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
  Building2,
  Check,
  X,
  TrendingDown,
  BadgeCheck,
} from 'lucide-react';

const unionCities = [
  { name: 'Westfield', path: null, highlight: "One of NJ's wealthiest towns, BMW and Audi focus" },
  { name: 'Springfield', path: '/car-leasing-springfield-nj', highlight: 'Capital Motor Cars headquarters location' },
  { name: 'Summit', path: null, highlight: 'Corporate executives, luxury lease market' },
  { name: 'Cranford', path: null, highlight: 'NYC commuters, compact luxury demand' },
  { name: 'Scotch Plains', path: null, highlight: 'Family SUV and luxury lease demand' },
  { name: 'Clark', path: null, highlight: 'Suburban market, BMW and Mercedes' },
  { name: 'Elizabeth', path: null, highlight: "County's largest city, mainstream brand volume" },
  { name: 'Linden', path: null, highlight: 'Value leases, Toyota and Honda' },
];

const unionBrands = [
  { name: 'BMW', path: '/bmw-car-lease' },
  { name: 'Mercedes-Benz', path: '/mercedes-benz-lease-deals-edgewater' },
  { name: 'Audi', path: '/audi-lease-deals-paramus' },
  { name: 'Toyota', path: '/toyota-rav4-lease-nj' },
  { name: 'Honda', path: '/honda-crv-lease-nj' },
];

const unionModels = [
  { name: 'BMW 3 Series', path: '/bmw-3-series-lease-nj', badge: 'BMW' },
  { name: 'BMW X3', path: '/bmw-x3-lease-nj', badge: 'BMW' },
  { name: 'BMW X5', path: '/bmw-x5-lease-nj', badge: 'BMW' },
  { name: 'Mercedes C-Class', path: '/mercedes-c-class-lease-nj', badge: 'Mercedes' },
  { name: 'Mercedes GLE', path: '/mercedes-gle-lease-nj', badge: 'Mercedes' },
  { name: 'Audi Q5', path: '/audi-q5-lease-nj', badge: 'Audi' },
  { name: 'Toyota RAV4', path: '/toyota-rav4-lease-nj', badge: 'Toyota' },
  { name: 'Honda CR-V', path: '/honda-crv-lease-nj', badge: 'Honda' },
];

const faqs = [
  {
    question: 'Which Union County towns does Capital Motor Cars serve?',
    answer: 'We serve all Union County towns including Westfield, Springfield, Summit, Cranford, Clark, Scotch Plains, Fanwood, Rahway, Elizabeth, Linden, Union, Roselle, Roselle Park, Hillside, New Providence, Berkeley Heights, Kenilworth, and Mountainside.',
  },
  {
    question: 'Why is Capital Motor Cars especially convenient for Union County residents?',
    answer: 'Our corporate headquarters is located at 251 Morris Avenue in Springfield Township, Union County. This means Union County clients are served directly from our home base. No long drives, no waiting, we are already in your county.',
  },
  {
    question: 'What are the most popular leases in Westfield and Summit?',
    answer: "Westfield and Summit are among NJ's most affluent ZIP codes. BMW 3 Series, BMW X3, Audi Q5, and Mercedes C-Class are consistently the top requests. Westfield residents also frequently ask about BMW X5 and Audi Q7. We maintain strong dealer relationships across both brands to get Union County clients competitive terms.",
  },
  {
    question: 'Do Union County residents qualify for NJ EV leasing tax savings?',
    answer: 'Yes. All Union County residents are NJ residents and qualify for the NJ zero sales tax exemption on fully electric vehicles. On a 36-month Tesla Model Y or BMW iX lease, this saves $800 to $1,500 compared to a traditional ICE lease. We factor this in when building EV lease scenarios for clients in Westfield, Springfield, and surrounding Union County towns.',
  },
  {
    question: 'How does the leasing process work for a Union County client?',
    answer: "You contact us, tell us what vehicle you're interested in and your monthly budget, and we shop the deal across our dealer network. We present 2 to 3 options with a full payment breakdown. Once you select the right deal, we handle paperwork and arrange delivery or pickup. Most Union County leases are completed in 3 to 7 business days for in-stock vehicles.",
  },
  {
    question: 'Can Capital Motor Cars help with a lease return in Union County?',
    answer: 'Yes. We offer full lease lifecycle support including lease returns, transfers, and early exits. If your lease is ending, we can coordinate the return, assess wear and tear, and simultaneously structure your next lease, often at better terms because we already know your history and credit profile.',
  },
  {
    question: 'What credit score do I need to lease a BMW or Mercedes in Union County NJ?',
    answer: 'BMW Financial Services and Mercedes-Benz Financial Services both use tiered credit approval. Tier 1 (best money factor) typically requires 720+. Scores of 680–720 are usually approved at a slightly higher money factor. We review your credit profile and recommend the brand and tier most likely to approve you at the best rate, without triggering unnecessary hard inquiries.',
  },
  {
    question: 'Can I get a zero-down car lease in Union County NJ?',
    answer: 'Yes. Many of our Union County clients choose a zero-down or low-drive-off lease structure. This means your first month\'s payment and required fees at signing, no large down payment. Note that in NJ, if the vehicle is totaled, a large down payment can be lost unless you have GAP coverage. Zero-down leasing is often the smarter financial choice.',
  },
  {
    question: 'What is a residual value and why does it matter for my Union County lease?',
    answer: "The residual value is the manufacturer's projected worth of the vehicle at the end of your lease term. It's set as a percentage of MSRP. A higher residual = lower monthly payment because you're financing less depreciation. Models like BMW X3, Audi Q5, and Toyota RAV4 have historically strong residuals, making them excellent choices for Union County lessees looking for the lowest payment per dollar of vehicle.",
  },
  {
    question: 'Should I lease or buy a car in Union County NJ?',
    answer: "For most Union County residents who switch vehicles every 2–3 years, leasing wins on total cost. You pay only for the depreciation during your ownership period, your payment is covered by the factory warranty, and you avoid the hassle of selling or trading a depreciating asset. Buying makes more sense if you keep vehicles 7+ years, drive very high mileage (25k+/year), or plan significant modifications.",
  },
];

export default function CarLeasingUnionCountyPage() {
  return (
    <Layout>
      <SEO
        title="Car Leasing Union County NJ | Westfield, Springfield, Summit | Capital Motor Cars"
        description="Car leasing in Union County NJ. Capital Motor Cars is headquartered in Springfield, Union County. Serving Westfield, Summit, Cranford, Clark, Elizabeth, and all Union County towns."
        canonicalPath="/car-leasing-union-county-nj"
        seoKeywords={[
          'car leasing Union County NJ',
          'auto lease Union County New Jersey',
          'car lease Westfield NJ',
          'car lease Springfield NJ',
          'luxury car lease Union County',
          'BMW lease Summit NJ',
        ]}
        ogImage="https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&w=1200&q=60"
      />
      <JsonLd
        data={[
          createWebPageSchema({
            name: 'Car Leasing Union County NJ',
            description: 'Auto lease broker headquartered in Springfield, serving all Union County NJ towns including Westfield, Summit, and Cranford.',
            url: 'https://www.capitalmotorcars.com/car-leasing-union-county-nj',
          }),
          createServiceSchema({
            name: 'Car Leasing Union County NJ',
            description: 'Independent auto lease broker headquartered in Springfield NJ, serving all of Union County.',
            url: 'https://www.capitalmotorcars.com/car-leasing-union-county-nj',
          }),
          createLocalCarBrokerSchema({
            name: 'Capital Motor Cars - Union County NJ',
            description: 'Independent car lease broker headquartered in Springfield, serving all Union County NJ towns.',
            url: 'https://www.capitalmotorcars.com/car-leasing-union-county-nj',
            city: 'Union County',
          }),
          createBreadcrumbSchema([
            { name: 'Home', url: 'https://www.capitalmotorcars.com' },
            { name: 'Car Leasing New Jersey', url: 'https://www.capitalmotorcars.com/car-leasing-new-jersey' },
            { name: 'Union County', url: 'https://www.capitalmotorcars.com/car-leasing-union-county-nj' },
          ]),
          createFaqSchema(faqs),
        ]}
      />

      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-center py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-black/90 to-black/70 z-10" />
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&w=1600&q=60)' }}
        />
        <div className="container mx-auto px-4 lg:px-8 relative z-20">
          <div className="max-w-3xl">
            <nav className="flex items-center gap-2 text-white/50 text-sm mb-6">
              <Link to="/" className="hover:text-white transition-colors">Home</Link>
              <span>/</span>
              <Link to="/car-leasing-new-jersey" className="hover:text-white transition-colors">New Jersey</Link>
              <span>/</span>
              <span className="text-white">Union County</span>
            </nav>
            <span className="inline-block text-accent font-black tracking-[0.4em] uppercase text-[10px] mb-4 bg-accent/10 px-4 py-2 rounded-full border border-accent/20">
              Union County NJ
            </span>
            <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-white uppercase mb-6">
              Car Leasing<br />
              <span className="text-accent italic">Union County NJ</span>
            </h1>
            <p className="text-white/70 text-lg md:text-xl mb-8 max-w-2xl">
              Capital Motor Cars is headquartered in Springfield, Union County. We serve Westfield, Summit, Cranford, Clark, and all Union County towns, BMW, Audi, Mercedes, Toyota, and more.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 bg-accent text-white font-black uppercase tracking-wider px-8 py-4 rounded-full hover:bg-accent/80 transition-colors"
              >
                Get Union County Quote <ArrowRight className="w-5 h-5" />
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

      {/* HQ Callout */}
      <section className="py-8 border-t border-border/40 bg-accent/5">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col md:flex-row items-center gap-4 justify-center text-center md:text-left">
            <Building2 className="w-8 h-8 text-accent shrink-0" />
            <div>
              <p className="font-black text-lg text-black dark:text-white">Our headquarters is in Springfield, Union County</p>
              <p className="text-muted-foreground text-sm">251 Morris Avenue, Springfield Township, NJ 07081, we are a Union County business serving Union County clients first.</p>
            </div>
            <Link to="/car-leasing-springfield-nj" className="inline-flex items-center gap-2 text-accent font-bold text-sm shrink-0 hover:gap-3 transition-all">
              Springfield page <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Trust Stats Bar */}
      <section className="py-8 border-b border-border/40 bg-muted/5">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { stat: '760+', label: 'NJ Leases Closed' },
              { stat: 'Buy-Rate', label: 'Money Factor Pricing' },
              { stat: '1 Day', label: 'Quote Turnaround' },
              { stat: 'Free', label: 'Union County Delivery' },
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
              Union County <span className="text-accent italic">Areas We Serve</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {unionCities.map((city, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                {city.path ? (
                  <Link
                    to={city.path}
                    className="group p-6 rounded-[1.5rem] border-2 border-accent/30 bg-accent/5 hover:border-accent hover:bg-accent/10 transition-all block"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <MapPinned className="w-4 h-4 text-accent" />
                      <span className="font-black text-lg text-black dark:text-white group-hover:text-accent transition-colors">{city.name}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">{city.highlight}</p>
                    <div className="mt-3 text-accent text-xs font-bold flex items-center gap-1">
                      View deals <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Link>
                ) : (
                  <div className="group p-6 rounded-[1.5rem] border-2 border-border/60 bg-muted/5">
                    <div className="flex items-center gap-2 mb-2">
                      <MapPinned className="w-4 h-4 text-accent" />
                      <span className="font-black text-lg text-black dark:text-white">{city.name}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">{city.highlight}</p>
                  </div>
                )}
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
              Popular Leases in <span className="text-accent italic">Union County</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {unionBrands.map((brand, i) => (
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
              How We Lease a Car in <span className="text-accent italic">Union County</span>
            </h2>
            <p className="mt-4 text-muted-foreground text-center max-w-2xl">Based in Springfield, we serve Union County clients faster than anyone. Most leases are completed in 3 to 7 business days, no dealership visit required.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-5 max-w-5xl mx-auto">
            {[
              { icon: Phone, title: 'Contact Our Springfield Team', desc: "Tell us the vehicle you want, your budget, and which Union County town you're in. Our local team responds the same day." },
              { icon: DollarSign, title: 'We Shop Our Dealer Network', desc: 'We submit your deal to 10+ dealers across NJ and NY. Our Springfield location gives us strong relationships with every major brand in the region.' },
              { icon: BadgeCheck, title: 'Review Your Options', desc: 'We present your best 2 to 3 options with full transparency: selling price, money factor, residual value, and the exact monthly payment before you commit.' },
              { icon: Car, title: 'Delivered to Your Door', desc: 'We handle all paperwork and deliver your vehicle to your home or office anywhere in Union County, Westfield, Summit, Cranford, wherever you are.' },
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
            <p className="mt-4 text-muted-foreground text-center max-w-2xl">Understanding these four factors helps you evaluate any deal, and identify exactly where Capital Motor Cars saves you money versus a direct dealer visit.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {[
              { icon: DollarSign, title: 'Money Factor', desc: 'The lease equivalent of an interest rate, expressed as a small decimal (e.g., 0.00125). Multiply by 2,400 to get approximate APR. Dealers can legally mark it up; we always use the published buy-rate, saving Union County clients $20–$60/month.' },
              { icon: TrendingDown, title: 'Residual Value', desc: "The car's projected value at end of term, set by the manufacturer as a percentage of MSRP. A higher residual means a lower payment. BMW X3, Audi Q5, and Honda CR-V have historically strong residuals, a key reason they're Union County favorites." },
              { icon: BadgeCheck, title: 'Capitalized Cost', desc: 'The negotiated selling price of the vehicle, which directly lowers your monthly payment. Our Springfield team submits to 10+ dealers simultaneously, Westfield, Summit, and Cranford clients benefit from the widest negotiation pool in the region.' },
              { icon: Car, title: 'Mileage Allowance', desc: 'Standard leases offer 10k or 12k miles per year. Union Township commuters averaging 15k–20k per year often benefit from a custom mileage package upfront, the cost per mile at signing is far lower than paying overages at lease-end.' },
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
              Popular Models in <span className="text-accent italic">Union County</span>
            </h2>
            <p className="mt-4 text-muted-foreground text-center max-w-2xl">Dedicated lease guides for every model we carry, with pricing, FAQ, and current NJ programs.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {unionModels.map((model, i) => (
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

      {/* Why Union County */}
      <section className="py-12 md:py-20 border-t border-border/40 section-bg">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5">
              <span className="text-accent font-black tracking-[0.4em] uppercase text-[10px] mb-4 block">Union Advantage</span>
              <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-black dark:text-white uppercase mb-6">
                Why Union County is <span className="text-accent italic">Our Home Market</span>
              </h2>
              <p className="text-muted-foreground text-lg mb-8">Our Springfield headquarters puts us squarely in Union County. We know every dealership, every road, and every commute pattern here. Westfield, Summit, and Cranford clients get the fastest service and the deepest local knowledge of any broker in NJ.</p>
              <Link to="/car-leasing-new-jersey" className="inline-flex items-center gap-2 text-accent font-black uppercase tracking-wider text-sm hover:gap-3 transition-all">
                View All NJ Locations <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { icon: Building2, title: 'Based in Springfield', desc: 'Our corporate HQ is at 251 Morris Avenue, Springfield NJ, right in the heart of Union County.' },
                { icon: DollarSign, title: 'Westfield Luxury Market', desc: 'Westfield consistently ranks in the top 10 NJ ZIP codes for luxury car registrations. We know this market well.' },
                { icon: Car, title: 'I-78 / I-287 Access', desc: 'Union County sits at the intersection of major NJ highways, giving us rapid dealer access across the entire state.' },
                { icon: ShieldCheck, title: 'Full Lifecycle Service', desc: 'From first lease to return to next vehicle, Union County clients get continuity, we remember your history and preferences.' },
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
              Leasing vs Buying in <span className="text-accent italic">Union County</span>
            </h2>
            <p className="mt-4 text-muted-foreground text-center max-w-2xl">Westfield, Summit, and Cranford residents who upgrade vehicles regularly find leasing consistently outperforms buying on total cost and flexibility.</p>
          </div>
          <div className="max-w-4xl mx-auto glass-card-theme rounded-[2rem] overflow-hidden">
            <div className="grid grid-cols-3 bg-accent/10 px-6 py-4 border-b border-border/40">
              <span className="text-xs font-black uppercase tracking-[0.3em] text-muted-foreground">Factor</span>
              <span className="text-xs font-black uppercase tracking-[0.3em] text-accent text-center">Lease</span>
              <span className="text-xs font-black uppercase tracking-[0.3em] text-muted-foreground text-center">Buy / Finance</span>
            </div>
            {[
              { aspect: 'Monthly payment', lease: 'Lower: you pay only depreciation', buy: 'Higher: full MSRP financed' },
              { aspect: 'Upfront cost', lease: 'First month + security deposit', buy: '10–20% down payment required' },
              { aspect: 'End-of-term options', lease: 'Return, buy, or upgrade easily', buy: 'Must sell/trade a depreciating asset' },
              { aspect: 'Mileage', lease: '10k–15k/yr (customizable)', buy: 'Unlimited but reduces resale value' },
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
              Union County <span className="text-accent italic">Leasing FAQ</span>
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
              Union County <span className="text-accent italic">Lease Quote</span>
            </h2>
            <p className="text-muted-foreground mb-4 text-lg max-w-lg mx-auto mt-4 text-center">
              Tell us your town in Union County and the car you want. Our Springfield team handles the negotiation and brings the best deal to you.
            </p>
            <div className="w-full max-w-2xl mx-auto mt-4">
              <div className="glass-card-theme form-card-theme p-4 sm:p-6 md:p-8 rounded-[2.5rem]">
                <ContactForm source="contact" serviceTitle="Car Leasing Union County NJ" compact />
              </div>
            </div>
          </div>
        </div>
      </section>
      <RelatedServices />
    </Layout>
  );
}
