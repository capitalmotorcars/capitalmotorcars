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
  Car,
  DollarSign,
  ShieldCheck,
} from 'lucide-react';

const bergenCities = [
  { name: 'Paramus', path: '/car-leasing-paramus-nj', highlight: 'Mall area, high traffic for luxury SUVs' },
  { name: 'Edgewater', path: '/car-leasing-edgewater-nj', highlight: 'Manhattan proximity, EV demand' },
  { name: 'Hackensack', path: null, highlight: 'Bergen County seat' },
  { name: 'Fort Lee', path: null, highlight: 'GWB commuters, NYC-adjacent' },
  { name: 'Teaneck', path: null, highlight: 'Diverse, family SUV market' },
  { name: 'Englewood', path: null, highlight: 'Luxury enclave, Audi and BMW focus' },
  { name: 'Ridgewood', path: null, highlight: 'Upscale suburb, luxury leasing' },
  { name: 'Rutherford', path: null, highlight: 'Sports fans near MetLife' },
];

const brands = [
  { name: 'BMW', path: '/bmw-car-lease' },
  { name: 'Audi (Paramus)', path: '/audi-lease-deals-paramus' },
  { name: 'Mercedes-Benz (Edgewater)', path: '/mercedes-benz-lease-deals-edgewater' },
  { name: 'Lexus', path: '/lexus-lease-deals-marlton' },
];

const bergenModels = [
  { name: 'BMW 3 Series', path: '/bmw-3-series-lease-nj', badge: 'BMW' },
  { name: 'BMW 5 Series', path: '/bmw-5-series-lease-nj', badge: 'BMW' },
  { name: 'BMW X3', path: '/bmw-x3-lease-nj', badge: 'BMW' },
  { name: 'BMW X5', path: '/bmw-x5-lease-nj', badge: 'BMW' },
  { name: 'Audi A4', path: '/audi-a4-lease-nj', badge: 'Audi' },
  { name: 'Audi Q5', path: '/audi-q5-lease-nj', badge: 'Audi' },
  { name: 'Mercedes C-Class', path: '/mercedes-c-class-lease-nj', badge: 'Mercedes' },
  { name: 'Mercedes E-Class', path: '/mercedes-e-class-lease-nj', badge: 'Mercedes' },
  { name: 'Mercedes GLE', path: '/mercedes-gle-lease-nj', badge: 'Mercedes' },
];

const faqs = [
  {
    question: 'Which Bergen County cities does Capital Motor Cars serve?',
    answer: 'We serve all Bergen County cities including Paramus, Edgewater, Hackensack, Fort Lee, Teaneck, Englewood, Ridgewood, Mahwah, Ramsey, Wyckoff, Garfield, Bergenfield, Dumont, Cliffside Park, Palisades Park, and all surrounding towns.',
  },
  {
    question: 'What luxury car brands are popular in Bergen County?',
    answer: 'Bergen County has one of the highest rates of luxury car leasing in NJ. BMW, Mercedes-Benz, Audi, and Lexus are the most popular brands. The Paramus area has multiple authorized dealers for these brands, which creates competition that we leverage for better pricing. Tesla is also growing rapidly, especially in Edgewater and the Fort Lee area.',
  },
  {
    question: 'Why is Paramus such a strong area for car leasing?',
    answer: 'Paramus is home to a dense concentration of new car dealerships along Route 17 and Route 4, including every major luxury brand. This density creates direct dealer competition that allows us to negotiate better terms. Paramus also has no Sunday car sales law, which changes shopping patterns and inventory availability.',
  },
  {
    question: 'Do Bergen County residents qualify for NJ EV leasing incentives?',
    answer: 'Yes. Bergen County residents are NJ residents and qualify for the NJ zero sales tax exemption on fully electric vehicles. This saves $800 to $1,500 or more on a 36-month lease on any EV. Combined with federal tax credit pass-through on some leases, Bergen County EV leases can be significantly cheaper than neighboring states.',
  },
  {
    question: 'How does Capital Motor Cars find better deals than walking into a Bergen County dealer?',
    answer: 'As an independent broker, we maintain dealer relationships across multiple NJ and NY markets simultaneously. When one Bergen County dealer is not competitive on money factor or residual, we can source the same vehicle from a competing dealer with better current support. You get the result of that entire negotiation process without doing it yourself.',
  },
  {
    question: 'Do you offer vehicle delivery in Bergen County?',
    answer: 'Yes. For most deals we can arrange delivery to your home or office in Bergen County once paperwork is complete. In some cases, pickup from the delivering dealer is required. We always confirm logistics before you sign.',
  },
];

export default function CarLeasingBergenCountyPage() {
  return (
    <Layout>
      <SEO
        title="Car Leasing Bergen County NJ | Paramus, Edgewater, Fort Lee | Capital Motor Cars"
        description="Car leasing in Bergen County NJ. Capital Motor Cars serves Paramus, Edgewater, Hackensack, Fort Lee, Teaneck, Englewood, and all Bergen County towns. BMW, Audi, Mercedes, and more."
        canonicalPath="/car-leasing-bergen-county-nj"
        seoKeywords={[
          'car leasing Bergen County NJ',
          'auto lease Bergen County',
          'car lease Paramus NJ',
          'car lease Edgewater NJ',
          'luxury car lease Bergen County',
          'Bergen County auto broker NJ',
        ]}
        ogImage="https://images.unsplash.com/photo-1556800572-1b8aeef2c54f?auto=format&fit=crop&w=1200&q=60"
      />
      <JsonLd
        data={[
          createWebPageSchema({
            name: 'Car Leasing Bergen County NJ',
            description: 'Auto lease broker serving all Bergen County NJ towns including Paramus, Edgewater, Hackensack, and Fort Lee.',
            url: 'https://www.capitalmotorcars.com/car-leasing-bergen-county-nj',
          }),
          createServiceSchema({
            name: 'Car Leasing Bergen County NJ',
            description: 'Independent auto lease broker serving all of Bergen County NJ with luxury and mainstream deals.',
            url: 'https://www.capitalmotorcars.com/car-leasing-bergen-county-nj',
          }),
          createLocalCarBrokerSchema({
            name: 'Capital Motor Cars - Bergen County NJ',
            description: 'Independent car lease broker serving all Bergen County NJ towns.',
            url: 'https://www.capitalmotorcars.com/car-leasing-bergen-county-nj',
            city: 'Bergen County',
          }),
          createBreadcrumbSchema([
            { name: 'Home', url: 'https://www.capitalmotorcars.com' },
            { name: 'Car Leasing New Jersey', url: 'https://www.capitalmotorcars.com/car-leasing-new-jersey' },
            { name: 'Bergen County', url: 'https://www.capitalmotorcars.com/car-leasing-bergen-county-nj' },
          ]),
          createFaqSchema(faqs),
        ]}
      />

      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-center py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-black/90 to-black/70 z-10" />
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1556800572-1b8aeef2c54f?auto=format&fit=crop&w=1600&q=60)' }}
        />
        <div className="container mx-auto px-4 lg:px-8 relative z-20">
          <div className="max-w-3xl">
            <nav className="flex items-center gap-2 text-white/50 text-sm mb-6">
              <Link to="/" className="hover:text-white transition-colors">Home</Link>
              <span>/</span>
              <Link to="/car-leasing-new-jersey" className="hover:text-white transition-colors">New Jersey</Link>
              <span>/</span>
              <span className="text-white">Bergen County</span>
            </nav>
            <span className="inline-block text-accent font-black tracking-[0.4em] uppercase text-[10px] mb-4 bg-accent/10 px-4 py-2 rounded-full border border-accent/20">
              Bergen County NJ
            </span>
            <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-white uppercase mb-6">
              Car Leasing<br />
              <span className="text-accent italic">Bergen County NJ</span>
            </h1>
            <p className="text-white/70 text-lg md:text-xl mb-8 max-w-2xl">
              Independent auto lease broker serving Paramus, Edgewater, Hackensack, Fort Lee, Teaneck, Englewood, and all Bergen County towns. BMW, Mercedes, Audi, and every major brand.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 bg-accent text-white font-black uppercase tracking-wider px-8 py-4 rounded-full hover:bg-accent/80 transition-colors"
              >
                Get Bergen County Quote <ArrowRight className="w-5 h-5" />
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
              Bergen County <span className="text-accent italic">Areas We Serve</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {bergenCities.map((city, i) => (
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
                  <div className="group p-6 rounded-[1.5rem] border-2 border-border/60 bg-muted/5 transition-all">
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
              Popular Leases in <span className="text-accent italic">Bergen County</span>
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
        </div>
      </section>

      {/* Popular Models */}
      <section className="py-12 md:py-20 border-t border-border/40">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col mb-8 md:mb-16 justify-center items-start md:items-center">
            <span className="text-accent font-black tracking-[0.4em] uppercase text-[10px] mb-2">Models</span>
            <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-black dark:text-white uppercase">
              Popular Models in <span className="text-accent italic">Bergen County</span>
            </h2>
            <p className="mt-4 text-muted-foreground text-center max-w-2xl">Dedicated lease guides for BMW, Audi, and Mercedes, Bergen County's top picks.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {bergenModels.map((model, i) => (
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

      {/* Why Bergen County */}
      <section className="py-12 md:py-20 border-t border-border/40">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5">
              <span className="text-accent font-black tracking-[0.4em] uppercase text-[10px] mb-4 block">Bergen Advantage</span>
              <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-black dark:text-white uppercase mb-6">
                Why Bergen County is <span className="text-accent italic">Great for Leasing</span>
              </h2>
              <p className="text-muted-foreground text-lg mb-8">Bergen County has more car dealerships per square mile than almost anywhere in NJ. The Route 17 corridor in Paramus alone hosts BMW, Audi, Mercedes, Toyota, Honda, and a dozen more brands. We negotiate across all of them for you.</p>
              <Link to="/car-leasing-new-jersey" className="inline-flex items-center gap-2 text-accent font-black uppercase tracking-wider text-sm hover:gap-3 transition-all">
                View All NJ Locations <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { icon: Car, title: 'Dense Dealer Network', desc: 'Paramus Route 17 corridor has every major luxury brand within 2 miles of each other.' },
                { icon: DollarSign, title: 'Competitive Pricing', desc: 'Multi-dealer competition means better money factors and residuals for Bergen County shoppers.' },
                { icon: MapPinned, title: 'NYC-Adjacent', desc: 'Easy access to Manhattan via GWB and Lincoln Tunnel. EV infrastructure is well-developed.' },
                { icon: ShieldCheck, title: 'Broker Advantage', desc: 'We work across Bergen and Hudson County simultaneously to find the absolute best deal.' },
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
              Bergen County <span className="text-accent italic">Leasing FAQ</span>
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
              Bergen County <span className="text-accent italic">Lease Quote</span>
            </h2>
            <p className="text-muted-foreground mb-4 text-lg max-w-lg mx-auto mt-4 text-center">
              Tell us your city in Bergen County and the car you want. We handle the dealer negotiation and bring the deal to you.
            </p>
            <div className="w-full max-w-2xl mx-auto mt-4">
              <div className="glass-card-theme form-card-theme p-4 sm:p-6 md:p-8 rounded-[2.5rem]">
                <ContactForm source="contact" serviceTitle="Car Leasing Bergen County NJ" compact />
              </div>
            </div>
          </div>
        </div>
      </section>
    <RelatedServices />
    </Layout>
  );
}
