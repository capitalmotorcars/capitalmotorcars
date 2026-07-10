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
  CheckCircle2,
  MapPinned,
  Phone,
  ShieldCheck,
  Car,
  DollarSign,
  TrendingDown,
  Clock,
  Repeat,
} from 'lucide-react';

const cities = [
  { name: 'Hoboken', path: '/car-leasing-hoboken-nj', county: 'Hudson County' },
  { name: 'Jersey City', path: '/car-leasing-jersey-city-nj', county: 'Hudson County' },
  { name: 'Edgewater', path: '/car-leasing-edgewater-nj', county: 'Bergen County' },
  { name: 'Paramus', path: '/car-leasing-paramus-nj', county: 'Bergen County' },
  { name: 'Marlton', path: '/car-leasing-marlton-nj', county: 'Burlington County' },
  { name: 'Springfield', path: '/car-leasing-springfield-nj', county: 'Union County' },
  { name: 'Trenton', path: '/car-leasing-trenton-nj', county: 'Mercer County' },
];

const counties = [
  { name: 'Bergen County', path: '/car-leasing-bergen-county-nj', desc: 'Serving Paramus, Edgewater, Hackensack, Fort Lee, and all Bergen County cities.' },
  { name: 'Hudson County', path: '/car-leasing-hudson-county-nj', desc: 'Serving Hoboken, Jersey City, Bayonne, Secaucus, and the full Hudson County area.' },
  { name: 'Essex County', path: '/car-leasing-essex-county-nj', desc: 'Serving Montclair, Livingston, Millburn, Maplewood, West Orange, and all Essex County towns.' },
  { name: 'Union County', path: '/car-leasing-union-county-nj', desc: 'Serving Westfield, Summit, Cranford, Clark, and all Union County towns. Our Springfield HQ is here.' },
  { name: 'Middlesex County', path: '/car-leasing-middlesex-county-nj', desc: 'Serving Edison, Woodbridge, New Brunswick, Piscataway, Old Bridge, and all Middlesex County towns.' },
  { name: 'Morris County', path: '/car-leasing-morris-county-nj', desc: 'Serving Morristown, Parsippany, Troy Hills, Randolph, and all Morris County towns.' },
  { name: 'Monmouth County', path: '/car-leasing-monmouth-county-nj', desc: 'Serving Freehold, Asbury Park, Red Bank, Middletown, and all Monmouth County towns.' },
];

const brands = [
  { name: 'BMW', path: '/bmw-car-lease' },
  { name: 'Mercedes-Benz', path: '/mercedes-benz-lease-deals-edgewater' },
  { name: 'Audi', path: '/audi-lease-deals-paramus' },
  { name: 'Lexus', path: '/lexus-lease-deals-marlton' },
  { name: 'BMW (Jersey City)', path: '/bmw-lease-deals-jersey-city' },
];

const models = [
  { name: 'BMW 3 Series', path: '/bmw-3-series-lease-nj', badge: 'BMW' },
  { name: 'BMW 5 Series', path: '/bmw-5-series-lease-nj', badge: 'BMW' },
  { name: 'BMW X3', path: '/bmw-x3-lease-nj', badge: 'BMW' },
  { name: 'BMW X5', path: '/bmw-x5-lease-nj', badge: 'BMW' },
  { name: 'Mercedes C-Class', path: '/mercedes-c-class-lease-nj', badge: 'Mercedes' },
  { name: 'Mercedes E-Class', path: '/mercedes-e-class-lease-nj', badge: 'Mercedes' },
  { name: 'Mercedes GLE', path: '/mercedes-gle-lease-nj', badge: 'Mercedes' },
  { name: 'Audi A4', path: '/audi-a4-lease-nj', badge: 'Audi' },
  { name: 'Audi Q5', path: '/audi-q5-lease-nj', badge: 'Audi' },
  { name: 'Lexus RX', path: '/lexus-rx-lease-nj', badge: 'Lexus' },
  { name: 'Toyota RAV4', path: '/toyota-rav4-lease-nj', badge: 'Toyota' },
  { name: 'Honda CR-V', path: '/honda-crv-lease-nj', badge: 'Honda' },
  { name: 'Hyundai IONIQ 6', path: '/hyundai-ioniq6-lease-nj', badge: 'Hyundai' },
];

const whyCapital = [
  {
    icon: DollarSign,
    title: 'Broker Pricing, Not Dealer Pricing',
    desc: 'As an independent broker, we shop every deal across multiple dealers. You never pay one dealer\'s inflated price when we can show you a better offer down the street.',
  },
  {
    icon: MapPinned,
    title: 'NJ Local Knowledge',
    desc: 'We know every major dealer network in NJ and NY. Bergen County import dealers, Hudson County luxury stores, and South NJ volume dealers all negotiate differently. We know who has the best support month to month.',
  },
  {
    icon: Repeat,
    title: 'Full Lifecycle Service',
    desc: 'We handle your lease return, transfer, and new lease as a complete cycle. You never start from scratch. We know your history, your preferences, and your bank relationship.',
  },
  {
    icon: Clock,
    title: 'No Dealership Wait',
    desc: 'No four-hour dealership visits. We present your options remotely, handle the paperwork, and deliver your vehicle or prepare it for pickup in NJ.',
  },
];

const faqs = [
  {
    question: 'What is the advantage of leasing a car in New Jersey vs buying?',
    answer: 'Leasing in NJ gives you a lower monthly payment for more car, no long-term depreciation risk, and warranty coverage for the entire lease. NJ also has one of the most competitive dealership landscapes in the US, which means leasing incentives from luxury brands are often strongest here. If you drive 10,000 to 15,000 miles per year and prefer a new vehicle every 2 to 3 years, leasing is typically the better financial choice.',
  },
  {
    question: 'Does New Jersey charge sales tax on a car lease?',
    answer: 'Yes, NJ charges 6.625% sales tax on monthly lease payments. However, NJ has a zero sales tax exemption for fully electric vehicles, which makes EV leases significantly cheaper here than in most other states. A BMW iX lease saves you roughly $800 to $1,500 in tax over a 36-month lease.',
  },
  {
    question: 'What credit score do I need to lease a car in NJ?',
    answer: 'Most luxury brands like BMW, Mercedes-Benz, and Audi require a minimum score of 700 to 720 for their best money factors. Mainstream brands like Toyota and Honda approve at 680 and above. Some volume programs have moved lower, but a higher score almost always gets you a lower money factor, which directly reduces your monthly payment.',
  },
  {
    question: 'How much do I need to put down to lease a car in NJ?',
    answer: 'Zero down leases are available in NJ but they push your monthly payment up because the bank\'s net cap cost is higher. You also lose any upfront cash if the car is totaled in the first few months. Most advisors, ourselves included, recommend keeping drive-off costs to first payment plus taxes and fees. We run both zero-down and low-money-down scenarios so you see the real monthly cost difference.',
  },
  {
    question: 'Can Capital Motor Cars get me a lease on any brand?',
    answer: 'We specialize in all major luxury and mainstream brands: BMW, Mercedes-Benz, Audi, Lexus, Toyota, Honda, Hyundai, Kia, Cadillac, Volvo, Acura, Infiniti, and Genesis. If a brand has an authorized dealer network in NJ, we can source the deal.',
  },
  {
    question: 'What cities in NJ do you serve?',
    answer: 'We serve all of New Jersey with a concentration in Bergen County, Hudson County, Essex County, and Middlesex County. Our most active cities include Hoboken, Jersey City, Edgewater, Paramus, Hackensack, Fort Lee, Englewood, Teaneck, Montclair, Livingston, Maplewood, Westfield, Marlton, Cherry Hill, and Princeton.',
  },
];

export default function CarLeasingNewJerseyPage() {
  return (
    <Layout>
      <SEO
        title="Car Leasing New Jersey | NJ Auto Lease Broker | Capital Motor Cars"
        description="Car leasing in New Jersey made simple. Capital Motor Cars is an independent NJ auto lease broker serving Bergen County, Hudson County, Essex County, and all of NJ. Zero-down options available."
        canonicalPath="/car-leasing-new-jersey"
        seoKeywords={[
          'car leasing New Jersey',
          'auto lease broker NJ',
          'car lease deals NJ',
          'lease a car New Jersey',
          'NJ car lease broker',
          'best car lease NJ 2026',
        ]}
        ogImage="https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1200&q=60"
      />
      <JsonLd
        data={[
          createWebPageSchema({
            name: 'Car Leasing New Jersey',
            description: 'Independent auto lease broker serving all of New Jersey. Luxury and mainstream leases with broker pricing.',
            url: 'https://www.capitalmotorcars.com/car-leasing-new-jersey',
          }),
          createServiceSchema({
            name: 'Car Leasing New Jersey',
            description: 'Auto lease brokerage serving Bergen County, Hudson County, Essex County, and all of New Jersey.',
            url: 'https://www.capitalmotorcars.com/car-leasing-new-jersey',
          }),
          createLocalCarBrokerSchema({
            name: 'Capital Motor Cars - New Jersey',
            description: 'Independent car lease broker serving all of New Jersey with luxury and mainstream lease deals.',
            url: 'https://www.capitalmotorcars.com/car-leasing-new-jersey',
            city: 'New Jersey',
          }),
          createBreadcrumbSchema([
            { name: 'Home', url: 'https://www.capitalmotorcars.com' },
            { name: 'Car Leasing New Jersey', url: 'https://www.capitalmotorcars.com/car-leasing-new-jersey' },
          ]),
          createFaqSchema(faqs),
        ]}
      />

      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-center py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-black/90 to-black/70 z-10" />
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1600&q=60)' }}
        />
        <div className="container mx-auto px-4 lg:px-8 relative z-20">
          <div className="max-w-3xl">
            <span className="inline-block text-accent font-black tracking-[0.4em] uppercase text-[10px] mb-4 bg-accent/10 px-4 py-2 rounded-full border border-accent/20">
              NJ Auto Lease Broker
            </span>
            <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-white uppercase mb-6">
              Car Leasing<br />
              <span className="text-accent italic">New Jersey</span>
            </h1>
            <p className="text-white/70 text-lg md:text-xl mb-8 max-w-2xl">
              Independent lease broker serving all of NJ. Broker pricing on BMW, Mercedes, Audi, Toyota, and more. Zero-down options. No dealership wait.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 bg-accent text-white font-black uppercase tracking-wider px-8 py-4 rounded-full hover:bg-accent/80 transition-colors"
              >
                Get My NJ Lease Quote <ArrowRight className="w-5 h-5" />
              </Link>
              <a
                href="tel:+12015095555"
                className="inline-flex items-center gap-2 border-2 border-white/20 text-white font-black uppercase tracking-wider px-8 py-4 rounded-full hover:border-accent hover:text-accent transition-colors"
              >
                <Phone className="w-5 h-5" /> Call Us
              </a>
            </div>
            <div className="flex flex-wrap gap-6 mt-10">
              {[
                'All major brands',
                'Bergen & Hudson County',
                'Zero-down available',
                'NJ EV tax exemption',
              ].map((point, i) => (
                <div key={i} className="flex items-center gap-2 text-white/70">
                  <CheckCircle2 className="w-5 h-5 text-accent shrink-0" />
                  <span className="text-sm font-semibold">{point}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Capital */}
      <section className="py-12 md:py-20 border-t border-border/40">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col mb-8 md:mb-16 justify-center items-start md:items-center">
            <span className="text-accent font-black tracking-[0.4em] uppercase text-[10px] mb-2">Why Capital</span>
            <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-black dark:text-white uppercase">
              The NJ Broker <span className="text-accent italic">Advantage</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {whyCapital.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group p-8 rounded-[2rem] border-2 border-border/60 bg-muted/10 dark:bg-white/[0.02] hover:border-accent/40 transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-accent/10 text-accent flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                  <item.icon className="w-6 h-6" />
                </div>
                <h3 className="font-black text-xl text-black dark:text-white mb-3">{item.title}</h3>
                <p className="text-muted-foreground">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* City Grid */}
      <section className="py-12 md:py-20 border-t border-border/40">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col mb-8 md:mb-16 justify-center items-start md:items-center">
            <span className="text-accent font-black tracking-[0.4em] uppercase text-[10px] mb-2">Service Areas</span>
            <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-black dark:text-white uppercase">
              Cities We <span className="text-accent italic">Serve</span>
            </h2>
            <p className="mt-4 text-muted-foreground text-center max-w-2xl">Click any city for local lease deals and area-specific information.</p>
          </div>

          {/* County Hubs */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {counties.map((county, i) => (
              <Link
                key={i}
                to={county.path}
                className="group p-8 rounded-[2rem] border-2 border-accent/30 bg-accent/5 hover:border-accent hover:bg-accent/10 transition-all"
              >
                <div className="flex items-center gap-3 mb-3">
                  <MapPinned className="w-5 h-5 text-accent" />
                  <span className="text-xs font-black uppercase tracking-[0.3em] text-accent">County Hub</span>
                </div>
                <h3 className="font-black text-2xl text-black dark:text-white mb-2 group-hover:text-accent transition-colors">{county.name}</h3>
                <p className="text-muted-foreground text-sm">{county.desc}</p>
                <div className="mt-4 flex items-center gap-2 text-accent font-bold text-sm">
                  View {county.name} deals <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>

          {/* City Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {cities.map((city, i) => (
              <Link
                key={i}
                to={city.path}
                className="group p-6 rounded-[1.5rem] border-2 border-border/60 bg-muted/5 hover:border-accent hover:bg-accent/5 transition-all text-center"
              >
                <Car className="w-6 h-6 text-accent mx-auto mb-3" />
                <div className="font-black text-lg text-black dark:text-white group-hover:text-accent transition-colors">{city.name}</div>
                <div className="text-xs text-muted-foreground mt-1">{city.county}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Brand Grid */}
      <section className="py-12 md:py-20 border-t border-border/40">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col mb-8 md:mb-16 justify-center items-start md:items-center">
            <span className="text-accent font-black tracking-[0.4em] uppercase text-[10px] mb-2">Brands</span>
            <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-black dark:text-white uppercase">
              NJ Lease Deals <span className="text-accent italic">by Brand</span>
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {brands.map((brand, i) => (
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

      {/* Popular Models */}
      <section className="py-12 md:py-20 border-t border-border/40">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col mb-8 md:mb-16 justify-center items-start md:items-center">
            <span className="text-accent font-black tracking-[0.4em] uppercase text-[10px] mb-2">Models</span>
            <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-black dark:text-white uppercase">
              Browse NJ Leases <span className="text-accent italic">by Model</span>
            </h2>
            <p className="mt-4 text-muted-foreground text-center max-w-2xl">Dedicated lease guides, current pricing, and FAQ for every major model we carry in New Jersey.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {models.map((model, i) => (
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

      {/* NJ Lease Benefits */}
      <section className="py-12 md:py-20 border-t border-border/40">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5">
              <span className="text-accent font-black tracking-[0.4em] uppercase text-[10px] mb-4 block">NJ Advantage</span>
              <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-black dark:text-white uppercase mb-6">
                Why NJ is One of the <span className="text-accent italic">Best States to Lease</span>
              </h2>
              <p className="text-muted-foreground text-lg mb-8">New Jersey has a uniquely competitive dealership landscape, strong manufacturer support, and the EV zero-tax exemption. This combination regularly produces the strongest lease deals in the country for NJ residents.</p>
            </div>
            <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { icon: TrendingDown, title: 'Zero Tax on EVs', desc: 'NJ exempts fully electric vehicles from sales tax. Saves $800 to $1,500+ on a 36-month lease.' },
                { icon: MapPinned, title: 'Dense Dealer Network', desc: 'NJ has one of the highest concentrations of luxury dealers per capita. More competition means better deals for you.' },
                { icon: DollarSign, title: 'Strong Manufacturer Support', desc: 'BMW, Audi, and Mercedes frequently run their strongest national programs through NJ/NY dealers.' },
                { icon: ShieldCheck, title: 'No Sales Tax on Lease if Leased Out of State', desc: 'Residents leasing through certain out-of-state registrations have options that reduce tax exposure further. We advise on this legally.' },
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

      {/* FAQ */}
      <section className="py-12 md:py-20 border-t border-border/40">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col mb-8 md:mb-16 justify-center items-start md:items-center">
            <span className="text-accent font-black tracking-[0.4em] uppercase text-[10px] mb-2">FAQ</span>
            <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-black dark:text-white uppercase">
              NJ Leasing <span className="text-accent italic">Questions</span>
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
              Get Your NJ <span className="text-accent italic">Lease Quote</span>
            </h2>
            <p className="text-muted-foreground mb-4 text-lg max-w-lg mx-auto mt-4 text-center">
              Tell us the car you want, your city in NJ, and your monthly budget. We handle the rest.
            </p>
            <div className="w-full max-w-2xl mx-auto mt-4">
              <div className="glass-card-theme form-card-theme p-4 sm:p-6 md:p-8 rounded-[2.5rem]">
                <ContactForm source="contact" serviceTitle="Car Leasing New Jersey" compact />
              </div>
            </div>
          </div>
        </div>
      </section>
    <RelatedServices />
    </Layout>
  );
}
