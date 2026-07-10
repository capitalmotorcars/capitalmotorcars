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
  Zap,
} from 'lucide-react';

const hudsonCities = [
  { name: 'Hoboken', path: '/car-leasing-hoboken-nj', highlight: 'Highest EV concentration in NJ' },
  { name: 'Jersey City', path: '/car-leasing-jersey-city-nj', highlight: 'BMW and luxury SUV market' },
  { name: 'Edgewater', path: '/car-leasing-edgewater-nj', highlight: 'Bergen County border, NYC commuters' },
  { name: 'Bayonne', path: null, highlight: 'Value leases, family vehicles' },
  { name: 'Secaucus', path: null, highlight: 'Outlet center, high traffic' },
  { name: 'Kearny', path: null, highlight: 'Growing commuter market' },
  { name: 'Union City', path: null, highlight: 'Dense urban, compact vehicles' },
  { name: 'Weehawken', path: null, highlight: 'Port Imperial ferry, EV interest' },
];

const brands = [
  { name: 'BMW (Jersey City)', path: '/bmw-lease-deals-jersey-city' },
  { name: 'Mercedes-Benz (Edgewater)', path: '/mercedes-benz-lease-deals-edgewater' },
  { name: 'All BMW Leases', path: '/bmw-car-lease' },
  { name: 'Audi Leases', path: '/audi-lease-deals-paramus' },
];

const hudsonModels = [
  { name: 'BMW 3 Series', path: '/bmw-3-series-lease-nj', badge: 'BMW' },
  { name: 'BMW X3', path: '/bmw-x3-lease-nj', badge: 'BMW' },
  { name: 'Hyundai IONIQ 6', path: '/hyundai-ioniq6-lease-nj', badge: 'Hyundai' },
  { name: 'Mercedes GLE', path: '/mercedes-gle-lease-nj', badge: 'Mercedes' },
  { name: 'Honda CR-V', path: '/honda-crv-lease-nj', badge: 'Honda' },
];

const faqs = [
  {
    question: 'What cities in Hudson County does Capital Motor Cars serve?',
    answer: 'We serve all Hudson County cities including Hoboken, Jersey City, Bayonne, Secaucus, Union City, Kearny, Weehawken, West New York, Guttenberg, Harrison, and all surrounding communities. Hudson County is one of our most active markets.',
  },
  {
    question: 'Why is there so much EV leasing interest in Hoboken and Jersey City?',
    answer: 'Hudson County has some of the highest EV adoption rates in NJ, driven by residents who commute to Manhattan or work from home. The NJ zero sales tax on EVs saves $800 to $1,500 per lease. Combined with reduced gas spending and parking benefits in some municipal programs, EV leasing makes strong financial sense for Hudson County residents.',
  },
  {
    question: 'Is it hard to lease a car in NJ if I live in Hudson County and commute to NYC?',
    answer: 'Not at all. Many Hudson County residents prefer leasing specifically because they drive fewer miles (with PATH or ferry access to Manhattan) and can choose a lower annual mileage allowance, which reduces monthly payments. We factor in your actual commute habits when building lease options.',
  },
  {
    question: 'Do you offer deliveries to Hudson County apartments?',
    answer: 'Yes, for most deals we can arrange delivery to your building address in Hoboken, Jersey City, or other Hudson County locations. Parking logistics vary by building, but we work with you to confirm the delivery plan. In some cases, a nearby staging lot is used for final handoff.',
  },
  {
    question: 'What is the most popular lease in Hoboken right now?',
  },
  {
    question: 'How long does the leasing process take for a Hudson County resident?',
    answer: 'From first contact to delivery, most leases are completed in 3 to 7 business days for in-stock vehicles. Custom orders or dealer trades can take 2 to 6 weeks. We pre-qualify you quickly and show you options that are immediately available so you are never waiting unnecessarily.',
  },
];

export default function CarLeasingHudsonCountyPage() {
  return (
    <Layout>
      <SEO
        title="Car Leasing Hudson County NJ | Hoboken, Jersey City, Bayonne | Capital Motor Cars"
        description="Car leasing in Hudson County NJ. Capital Motor Cars serves Hoboken, Jersey City, Bayonne, Secaucus, and all Hudson County towns. BMW, Mercedes, and all major brands. NJ EV tax savings."
        canonicalPath="/car-leasing-hudson-county-nj"
        seoKeywords={[
          'car leasing Hudson County NJ',
          'auto lease Hudson County New Jersey',
          'car lease Hoboken NJ',
          'car lease Jersey City NJ',
          'BMW lease Jersey City NJ',
        ]}
        ogImage="https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&w=1200&q=60"
      />
      <JsonLd
        data={[
          createWebPageSchema({
            name: 'Car Leasing Hudson County NJ',
            description: 'Auto lease broker serving all Hudson County NJ towns including Hoboken, Jersey City, Bayonne, and Secaucus.',
            url: 'https://www.capitalmotorcars.com/car-leasing-hudson-county-nj',
          }),
          createServiceSchema({
            name: 'Car Leasing Hudson County NJ',
            description: 'Independent auto lease broker serving all of Hudson County NJ including Hoboken, Jersey City, and Bayonne.',
            url: 'https://www.capitalmotorcars.com/car-leasing-hudson-county-nj',
          }),
          createLocalCarBrokerSchema({
            name: 'Capital Motor Cars - Hudson County NJ',
            description: 'Independent car lease broker serving all Hudson County NJ towns.',
            url: 'https://www.capitalmotorcars.com/car-leasing-hudson-county-nj',
            city: 'Hudson County',
          }),
          createBreadcrumbSchema([
            { name: 'Home', url: 'https://www.capitalmotorcars.com' },
            { name: 'Car Leasing New Jersey', url: 'https://www.capitalmotorcars.com/car-leasing-new-jersey' },
            { name: 'Hudson County', url: 'https://www.capitalmotorcars.com/car-leasing-hudson-county-nj' },
          ]),
          createFaqSchema(faqs),
        ]}
      />

      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-center py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-black/90 to-black/70 z-10" />
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&w=1600&q=60)' }}
        />
        <div className="container mx-auto px-4 lg:px-8 relative z-20">
          <div className="max-w-3xl">
            <nav className="flex items-center gap-2 text-white/50 text-sm mb-6">
              <Link to="/" className="hover:text-white transition-colors">Home</Link>
              <span>/</span>
              <Link to="/car-leasing-new-jersey" className="hover:text-white transition-colors">New Jersey</Link>
              <span>/</span>
              <span className="text-white">Hudson County</span>
            </nav>
            <span className="inline-block text-accent font-black tracking-[0.4em] uppercase text-[10px] mb-4 bg-accent/10 px-4 py-2 rounded-full border border-accent/20">
              Hudson County NJ
            </span>
            <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-white uppercase mb-6">
              Car Leasing<br />
              <span className="text-accent italic">Hudson County NJ</span>
            </h1>
            <p className="text-white/70 text-lg md:text-xl mb-8 max-w-2xl">
              Independent auto lease broker serving Hoboken, Jersey City, Bayonne, Secaucus, and all Hudson County towns. NJ EV tax savings, BMW, Mercedes, and more.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 bg-accent text-white font-black uppercase tracking-wider px-8 py-4 rounded-full hover:bg-accent/80 transition-colors"
              >
                Get Hudson County Quote <ArrowRight className="w-5 h-5" />
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

      {/* City Grid */}
      <section className="py-12 md:py-20 border-t border-border/40">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col mb-8 md:mb-16 justify-center items-start md:items-center">
            <span className="text-accent font-black tracking-[0.4em] uppercase text-[10px] mb-2">Cities</span>
            <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-black dark:text-white uppercase">
              Hudson County <span className="text-accent italic">Areas We Serve</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {hudsonCities.map((city, i) => (
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

      {/* EV Focus for Hudson County */}
      <section className="py-12 md:py-20 border-t border-border/40">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5">
              <span className="text-accent font-black tracking-[0.4em] uppercase text-[10px] mb-4 block">EV Advantage</span>
              <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-black dark:text-white uppercase mb-6">
                Hudson County is <span className="text-accent italic">EV Country</span>
              </h2>
              <p className="text-muted-foreground text-lg mb-8">Hoboken and Jersey City consistently rank among the highest EV adoption areas in NJ. NJ zero sales tax on EVs, dense Supercharger networks, and low annual mileage make electric leases especially compelling here.</p>
              <div className="flex flex-col gap-4">
                {[
                  'NJ zero sales tax saves $800 to $1,500 on a 36-month EV lease',
                  'Supercharger network dense from Hoboken to Bayonne',
                  'Low mileage commuters benefit most from EV lease terms',
                  'BMW iX, Hyundai Ioniq 6, and Mercedes EQ leases available',
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <Zap className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                    <span className="text-foreground font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { icon: ShieldCheck, title: 'BMW iX', desc: 'Premium EV with BMW loyalty credits available. Popular in the Weehawken and Port Imperial area.' },
                { icon: DollarSign, title: 'Hyundai Ioniq 6', desc: 'Value EV lease with strong range. Popular with Bayonne and Kearny commuters.' },
                { icon: Zap, title: 'Mercedes EQE', desc: 'Luxury EV segment growing fast in Hudson County. Ask about current MBFS support.' },
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

      {/* Brand Links */}
      <section className="py-12 md:py-20 border-t border-border/40">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col mb-8 md:mb-16 justify-center items-start md:items-center">
            <span className="text-accent font-black tracking-[0.4em] uppercase text-[10px] mb-2">Brands</span>
            <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-black dark:text-white uppercase">
              Popular Leases in <span className="text-accent italic">Hudson County</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
          <div className="mt-8 text-center">
            <Link to="/car-leasing-new-jersey" className="inline-flex items-center gap-2 text-accent font-black uppercase tracking-wider text-sm hover:gap-3 transition-all">
              View All NJ Locations <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Popular Models */}
      <section className="py-12 md:py-20 border-t border-border/40">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col mb-8 md:mb-16 justify-center items-start md:items-center">
            <span className="text-accent font-black tracking-[0.4em] uppercase text-[10px] mb-2">Models</span>
            <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-black dark:text-white uppercase">
              Popular Models in <span className="text-accent italic">Hudson County</span>
            </h2>
            <p className="mt-4 text-muted-foreground text-center max-w-2xl">Dedicated lease guides for BMW, and top models, Hudson County's most requested leases.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {hudsonModels.map((model, i) => (
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

      {/* FAQ */}
      <section className="py-12 md:py-20 border-t border-border/40">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col mb-8 md:mb-16 justify-center items-start md:items-center">
            <span className="text-accent font-black tracking-[0.4em] uppercase text-[10px] mb-2">FAQ</span>
            <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-black dark:text-white uppercase">
              Hudson County <span className="text-accent italic">Leasing FAQ</span>
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
              Hudson County <span className="text-accent italic">Lease Quote</span>
            </h2>
            <p className="text-muted-foreground mb-4 text-lg max-w-lg mx-auto mt-4 text-center">
              Tell us your city in Hudson County and the car you want. We handle the negotiation and bring the best deal to you.
            </p>
            <div className="w-full max-w-2xl mx-auto mt-4">
              <div className="glass-card-theme form-card-theme p-4 sm:p-6 md:p-8 rounded-[2.5rem]">
                <ContactForm source="contact" serviceTitle="Car Leasing Hudson County NJ" compact />
              </div>
            </div>
          </div>
        </div>
      </section>
    <RelatedServices />
    </Layout>
  );
}
