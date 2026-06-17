import { Link } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { SEO } from '@/components/SEO';
import { JsonLd, createWebPageSchema, createBreadcrumbSchema, createFaqSchema, createServiceSchema } from '@/components/JsonLd';
import { RelatedServices } from '@/components/services/RelatedServices';
import { ContactForm } from '@/components/forms/ContactForm';
import { motion } from 'framer-motion';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  ArrowRight, Check, Phone, Zap, DollarSign, ShieldCheck, Car,
  BadgeCheck, Users, TrendingDown, Star, Leaf, X, Building2, MapPin,
} from 'lucide-react';

export interface VehicleModelData {
  make: string;
  model: string;
  fullName: string;
  slug: string;
  heroImage: string;
  category: string;
  isEV: boolean;
  msrpStart: number;
  leaseStart: number;
  leaseEnd: number;
  highlights: string[];
  whyLease: string;
  faqs: { question: string; answer: string }[];
  trims?: { name: string; leasePrice: number; keyFeatures: string[]; popular?: boolean }[];
  relatedComparisons?: { label: string; path: string }[];
  relatedBrandPage?: { label: string; path: string };
}

function fmtK(n: number) {
  return n >= 1000 ? `$${Math.round(n / 1000)}k` : `$${n}`;
}

export function VehicleModelLandingTemplate({ data }: { data: VehicleModelData }) {
  const {
    make, model, fullName, slug, heroImage, category, isEV,
    msrpStart, leaseStart, leaseEnd, highlights, whyLease, faqs,
    trims, relatedComparisons, relatedBrandPage,
  } = data;

  const midPrice = Math.round((leaseStart + leaseEnd) / 2);

  const trimData = trims ?? [
    {
      name: `${model} Base`,
      leasePrice: leaseStart,
      keyFeatures: ['17" alloy wheels', 'Dual-zone climate control', 'LED headlights', 'Apple CarPlay / Android Auto', 'Forward collision warning'],
    },
    {
      name: `${model} Mid / Sport`,
      leasePrice: midPrice,
      popular: true,
      keyFeatures: ['19" alloy wheels', 'Heated front seats', 'Premium audio', 'Blind spot monitoring', 'Panoramic sunroof'],
    },
    {
      name: `${model} Premium / M-Sport`,
      leasePrice: leaseEnd,
      keyFeatures: ['20" performance wheels', 'Adaptive air suspension', 'Head-up display', 'Massaging seats', 'Driver assist package'],
    },
  ];

  const personas = isEV
    ? [
        { icon: TrendingDown, title: 'The Smart Commuter', desc: `You drive 25–50 miles a day and are tired of gas station detours. The ${fullName} charges overnight and costs a fraction per mile. NJ 0% sales tax makes the numbers work.` },
        { icon: Star, title: 'The Eco-Luxury Seeker', desc: `You want premium materials, silent acceleration, and the latest technology, without a combustion engine. The ${fullName} delivers all of it with zero tailpipe emissions.` },
        { icon: Users, title: 'The Forward-Looking Family', desc: `You want to future-proof your commute and set the right example. The ${fullName} fits car seats, handles school runs, and earns NJ\'s EV tax exemption every month.` },
      ]
    : [
        { icon: TrendingDown, title: 'The Value-Driven Commuter', desc: `You want a reliable, well-appointed vehicle without paying $600+ a month. Leasing the ${fullName} keeps payments low and puts you in a new model every 3 years.` },
        { icon: Star, title: 'The Luxury Upgrader', desc: `You\'ve driven mainstream cars long enough. The ${fullName} gives you ${make}\'s build quality, driving dynamics, and brand prestige at a monthly payment that fits your budget.` },
        { icon: Users, title: 'The Practical Family Driver', desc: `You need reliability, space, modern safety tech, and dealer-network peace of mind. The ${fullName} checks every box, and leasing means you never deal with depreciation.` },
      ];

  const leasingVsBuyingRows = [
    { aspect: 'Monthly payment', lease: `Lower: from $${leaseStart}/mo`, buy: 'Higher: full MSRP financed' },
    { aspect: 'Upfront cost', lease: 'First month + security deposit', buy: 'Down payment (10–20% of price)' },
    { aspect: 'Flexibility', lease: 'Return or upgrade every 2–3 yrs', buy: 'Sell or trade a depreciating asset' },
    { aspect: 'Mileage', lease: '10k–15k miles/yr (customizable)', buy: 'Unlimited but affects resale value' },
    { aspect: 'Maintenance', lease: 'Factory warranty covers full term', buy: 'Warranty expires; repairs your cost' },
    { aspect: 'Equity', lease: 'None. Capital stays in your pocket', buy: 'Build equity (car still depreciates)' },
    { aspect: isEV ? 'NJ EV tax' : 'NJ sales tax', lease: isEV ? '0% on every monthly payment' : '6.625% on each monthly payment', buy: isEV ? '0% applied once on full price' : '6.625% on full purchase price upfront' },
    { aspect: 'Latest tech', lease: 'New model with latest tech every 3 yrs', buy: 'Same model until you sell it' },
  ];

  return (
    <Layout>
      <SEO
        title={`${fullName} Lease NJ 2026 | From $${leaseStart}/mo | Capital Motor Cars`}
        description={`Lease a ${fullName} in New Jersey from $${leaseStart}/mo. Capital Motor Cars secures buy-rate financing${isEV ? ' with NJ 0% EV tax savings' : ''}. Current NJ deals, all trims available.`}
        canonicalPath={`/${slug}`}
        seoKeywords={[
          `${fullName} lease NJ`,
          `${fullName} lease deals New Jersey`,
          `${make} ${model} lease NJ 2026`,
          `${make.toLowerCase()} ${model.toLowerCase()} monthly payment NJ`,
          `lease ${fullName} New Jersey`,
          `${make} lease broker NJ`,
        ]}
        ogImage={heroImage}
      />
      <JsonLd
        data={[
          createWebPageSchema({
            name: `${fullName} Lease NJ`,
            description: `Lease a ${fullName} in New Jersey. Capital Motor Cars offers buy-rate financing and broker pricing on all ${make} models.`,
            url: `https://www.capitalmotorcars.com/${slug}`,
          }),
          createServiceSchema({
            name: `${fullName} Lease New Jersey`,
            description: `${fullName} lease deals in NJ. Broker pricing, buy-rate money factor from ${make} Financial, all trims available.`,
            url: `https://www.capitalmotorcars.com/${slug}`,
          }),
          createBreadcrumbSchema([
            { name: 'Home', url: 'https://www.capitalmotorcars.com' },
            { name: 'Car Leasing New Jersey', url: 'https://www.capitalmotorcars.com/car-leasing-new-jersey' },
            { name: `${fullName} Lease NJ`, url: `https://www.capitalmotorcars.com/${slug}` },
          ]),
          createFaqSchema(faqs),
        ]}
      />

      {/* ── Hero ── */}
      <section className="relative min-h-[65vh] flex items-center py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-black/90 via-black/70 to-black/50 z-10" />
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${heroImage})` }} />
        <div className="container mx-auto px-4 lg:px-8 relative z-20">
          <div className="max-w-3xl">
            <nav className="flex items-center gap-2 text-white/50 text-sm mb-5">
              <Link to="/" className="hover:text-white transition-colors">Home</Link>
              <span>/</span>
              <Link to="/car-leasing-new-jersey" className="hover:text-white transition-colors">New Jersey</Link>
              <span>/</span>
              <span className="text-white">{fullName}</span>
            </nav>
            <div className="flex items-center gap-3 mb-4">
              <span className="inline-block text-accent font-black tracking-[0.4em] uppercase text-[10px] bg-accent/10 px-4 py-2 rounded-full border border-accent/20">
                {category} Lease NJ
              </span>
              {isEV && (
                <span className="inline-flex items-center gap-1.5 text-green-400 font-black tracking-[0.3em] uppercase text-[10px] bg-green-500/10 px-4 py-2 rounded-full border border-green-500/20">
                  <Zap className="w-3 h-3" /> NJ 0% Tax
                </span>
              )}
            </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-white uppercase mb-4">
              {make}<br />
              <span className="text-accent italic">{model} Lease NJ</span>
            </h1>
            <p className="text-white/70 text-xl mb-2">
              From <span className="text-white font-black">${leaseStart}/mo</span> to <span className="text-white font-black">${leaseEnd}/mo</span> depending on trim and term.
            </p>
            <p className="text-white/50 text-sm mb-8">MSRP from {fmtK(msrpStart)} &bull; All trims available &bull; NJ delivery</p>
            <div className="flex flex-wrap gap-4">
              <Link to="/contact" className="inline-flex items-center gap-2 bg-accent text-white font-black uppercase tracking-wider px-8 py-4 rounded-full hover:bg-accent/80 transition-colors">
                Get {fullName} Quote <ArrowRight className="w-5 h-5" />
              </Link>
              <a href="tel:+12015095555" className="inline-flex items-center gap-2 border-2 border-white/20 text-white font-black uppercase tracking-wider px-8 py-4 rounded-full hover:border-accent hover:text-accent transition-colors">
                <Phone className="w-5 h-5" /> Call Us
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Trust Stats Bar ── */}
      <section className="py-8 border-b border-border/40 bg-accent/5">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { stat: '760+', label: 'NJ Leases Closed' },
              { stat: 'Buy-Rate', label: 'Money Factor Pricing' },
              { stat: '1 Day', label: 'Quote Turnaround' },
              { stat: 'Free', label: 'NJ Door Delivery' },
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center">
                <span className="text-3xl md:text-4xl font-black text-accent">{item.stat}</span>
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground mt-1">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why Lease + Snapshot ── */}
      <section className="py-12 md:py-16 border-t border-border/40">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-7">
              <span className="text-accent font-black tracking-[0.4em] uppercase text-[10px] mb-4 block">Why Lease</span>
              <h2 className="text-3xl md:text-4xl font-black tracking-tighter text-black dark:text-white uppercase mb-6">
                Why the {fullName} <span className="text-accent italic">Leases Well in NJ</span>
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-8">{whyLease}</p>
              <ul className="space-y-3">
                {highlights.map((h, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-accent mt-0.5 shrink-0" strokeWidth={3} />
                    <span className="text-foreground font-medium">{h}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="lg:col-span-5 space-y-4">
              <div className="p-6 rounded-[2rem] border-2 border-accent/20 bg-accent/5">
                <p className="text-xs font-black uppercase tracking-[0.3em] text-accent mb-4">Lease Snapshot</p>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Monthly payment</span>
                    <span className="font-black text-foreground">${leaseStart} – ${leaseEnd}/mo</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">MSRP from</span>
                    <span className="font-black text-foreground">{fmtK(msrpStart)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Typical term</span>
                    <span className="font-black text-foreground">36 months / 10k mi</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Due at signing</span>
                    <span className="font-black text-foreground">First mo. + fees</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">NJ sales tax</span>
                    <span className={`font-black ${isEV ? 'text-green-500' : 'text-foreground'}`}>{isEV ? '0% (EV exemption)' : '6.625%'}</span>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-4 pt-4 border-t border-border/40">Estimates only. Exact payment depends on trim, credit tier, and current manufacturer support.</p>
              </div>
              {(relatedComparisons || relatedBrandPage) && (
                <div className="p-6 rounded-[2rem] border-2 border-border/60 bg-muted/5">
                  <p className="text-xs font-black uppercase tracking-[0.3em] text-muted-foreground mb-4">Related Pages</p>
                  <div className="space-y-2">
                    {relatedBrandPage && (
                      <Link to={relatedBrandPage.path} className="flex items-center gap-2 text-sm font-semibold text-foreground hover:text-accent transition-colors">
                        <ArrowRight className="w-4 h-4 text-accent" /> {relatedBrandPage.label}
                      </Link>
                    )}
                    {relatedComparisons?.map((c, i) => (
                      <Link key={i} to={c.path} className="flex items-center gap-2 text-sm font-semibold text-foreground hover:text-accent transition-colors">
                        <ArrowRight className="w-4 h-4 text-accent" /> {c.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── Trim Levels ── */}
      <section className="py-12 md:py-20 border-t border-border/40">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col mb-10 justify-center items-start md:items-center">
            <span className="text-accent font-black tracking-[0.4em] uppercase text-[10px] mb-2">Trim Levels</span>
            <h2 className="text-3xl md:text-4xl font-black tracking-tighter text-black dark:text-white uppercase text-center">
              Which {model} <span className="text-accent italic">Trim Should You Lease?</span>
            </h2>
            <p className="mt-4 text-muted-foreground text-center max-w-2xl">Every {make} {model} trim is available through us. Here's how the three main tiers compare for NJ leases.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {trimData.map((trim, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`relative p-7 rounded-[2rem] border-2 transition-all ${
                  trim.popular
                    ? 'border-accent bg-accent/5 shadow-lg'
                    : 'border-border/60 bg-muted/5'
                }`}
              >
                {trim.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-accent text-white text-[10px] font-black uppercase tracking-[0.3em] px-4 py-1 rounded-full">
                    Most Popular
                  </span>
                )}
                <p className="text-xs font-black uppercase tracking-[0.3em] text-muted-foreground mb-2">{make} {model}</p>
                <h3 className="font-black text-xl text-black dark:text-white mb-1">{trim.name}</h3>
                <p className="text-3xl font-black text-accent mb-6">
                  ${trim.leasePrice}<span className="text-sm font-bold text-muted-foreground">/mo</span>
                </p>
                <ul className="space-y-2">
                  {trim.keyFeatures.map((feat, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm text-foreground">
                      <Check className="w-4 h-4 text-accent mt-0.5 shrink-0" strokeWidth={3} />
                      {feat}
                    </li>
                  ))}
                </ul>
                <Link to="/contact" className={`mt-6 inline-flex w-full justify-center items-center gap-2 px-5 py-3 rounded-full font-black uppercase tracking-wider text-sm transition-colors ${
                  trim.popular
                    ? 'bg-accent text-white hover:bg-accent/80'
                    : 'border-2 border-border/60 text-foreground hover:border-accent hover:text-accent'
                }`}>
                  Get Quote <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
            ))}
          </div>
          <p className="text-center text-xs text-muted-foreground mt-6">Prices are estimated NJ lease payments. Actual figures depend on credit tier, manufacturer incentives, and market conditions.</p>
        </div>
      </section>

      {/* ── Who This Car Is For ── */}
      <section className="py-12 md:py-20 border-t border-border/40 section-bg">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col mb-10 justify-center items-start md:items-center">
            <span className="text-accent font-black tracking-[0.4em] uppercase text-[10px] mb-2">Perfect For</span>
            <h2 className="text-3xl md:text-4xl font-black tracking-tighter text-black dark:text-white uppercase">
              Who Is the {fullName} <span className="text-accent italic">Right For?</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {personas.map((persona, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-7 rounded-[2rem] border-2 border-border/60 bg-muted/5 hover:border-accent/40 transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-accent/10 text-accent flex items-center justify-center mb-5">
                  <persona.icon className="w-6 h-6" />
                </div>
                <h3 className="font-black text-xl text-black dark:text-white mb-3">{persona.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{persona.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How We Get Your Lease ── */}
      <section className="py-12 md:py-20 border-t border-border/40">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col mb-10 justify-center items-start md:items-center">
            <span className="text-accent font-black tracking-[0.4em] uppercase text-[10px] mb-2">Our Process</span>
            <h2 className="text-3xl md:text-4xl font-black tracking-tighter text-black dark:text-white uppercase">
              How We Secure Your <span className="text-accent italic">{make} Lease</span>
            </h2>
            <p className="mt-4 text-muted-foreground text-center max-w-2xl">Most customers get a live, buyable quote within one business day, without visiting a single dealership.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-5 max-w-5xl mx-auto">
            {[
              { icon: Phone, title: 'You Tell Us', desc: `Share your preferred ${model} trim, color, and mileage allowance. Five minutes is all it takes.` },
              { icon: DollarSign, title: 'We Pull Live Numbers', desc: `We access the current ${make} Financial Services money factor and residual, the real figures, not dealer guesses.` },
              { icon: ShieldCheck, title: 'We Compete Dealers', desc: `We submit your deal to 10+ ${make} dealers in NJ simultaneously. Only the lowest selling price comes to you.` },
              { icon: Car, title: 'Vehicle Delivered', desc: `We handle all paperwork and coordinate delivery to your home or office anywhere in NJ. No dealership visit required.` },
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

      {/* ── Why Broker > Dealer ── */}
      <section className="py-12 md:py-20 border-t border-border/40 section-bg">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5">
              <span className="text-accent font-black tracking-[0.4em] uppercase text-[10px] mb-4 block">Broker Advantage</span>
              <h2 className="text-3xl md:text-4xl font-black tracking-tighter text-black dark:text-white uppercase mb-6">
                Why a Broker Beats <span className="text-accent italic">Going to {make}</span> Directly
              </h2>
              <p className="text-muted-foreground text-lg mb-8">
                {make} dealers can legally mark up the money factor on any lease. That markup is invisible to most customers. As an independent broker, we access the buy-rate and pass it to you, no markups, no dealer margin on financing.
              </p>
              <Link to="/contact" className="inline-flex items-center gap-2 bg-accent text-white font-black uppercase tracking-wider px-8 py-4 rounded-full hover:bg-accent/80 transition-colors">
                Start My {model} Lease <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
            <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { icon: BadgeCheck, title: 'Buy-Rate Money Factor', desc: `We access the exact money factor published by ${make} Financial. A dealer can mark it up by 0.001 or more, that's $30–$50 extra per month you'd never know about.` },
                { icon: Building2, title: 'Multi-Dealer Competition', desc: `We send your deal to 10+ ${make} dealers in NJ and NY simultaneously. They compete on the selling price. The lowest number wins, you never have to negotiate.` },
                { icon: ShieldCheck, title: 'Transparent Fee Structure', desc: 'Our fee is flat and disclosed upfront. No doc fee inflation, no paint protection add-ons, no finance reserve. What you see is what you sign.' },
                { icon: MapPin, title: 'Lease-End Support', desc: `When your ${model} lease ends, we handle the turn-in process and secure your next vehicle before you need to return this one. No gaps, no pressure.` },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="p-6 rounded-[2rem] border-2 border-border/60 bg-muted/5 hover:border-accent/40 transition-all"
                >
                  <div className="w-10 h-10 rounded-xl bg-accent/10 text-accent flex items-center justify-center mb-4">
                    <item.icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-black text-lg text-black dark:text-white mb-2">{item.title}</h3>
                  <p className="text-muted-foreground text-sm">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Leasing vs Buying ── */}
      <section className="py-12 md:py-20 border-t border-border/40">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col mb-10 justify-center items-start md:items-center">
            <span className="text-accent font-black tracking-[0.4em] uppercase text-[10px] mb-2">Comparison</span>
            <h2 className="text-3xl md:text-4xl font-black tracking-tighter text-black dark:text-white uppercase">
              Leasing vs Buying the <span className="text-accent italic">{fullName}</span>
            </h2>
            <p className="mt-4 text-muted-foreground text-center max-w-2xl">For most NJ drivers who upgrade every 3 years, leasing consistently beats buying on total cost-of-ownership.</p>
          </div>
          <div className="max-w-4xl mx-auto glass-card-theme rounded-[2rem] overflow-hidden">
            <div className="grid grid-cols-3 bg-accent/10 px-6 py-4 border-b border-border/40">
              <span className="text-xs font-black uppercase tracking-[0.3em] text-muted-foreground">Factor</span>
              <span className="text-xs font-black uppercase tracking-[0.3em] text-accent text-center">Lease</span>
              <span className="text-xs font-black uppercase tracking-[0.3em] text-muted-foreground text-center">Buy / Finance</span>
            </div>
            {leasingVsBuyingRows.map((row, i) => (
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

      {/* ── NJ-Specific Benefits ── */}
      <section className="py-12 md:py-20 border-t border-border/40 section-bg">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col mb-10 justify-center items-start md:items-center">
            <span className="text-accent font-black tracking-[0.4em] uppercase text-[10px] mb-2">NJ Advantage</span>
            <h2 className="text-3xl md:text-4xl font-black tracking-tighter text-black dark:text-white uppercase text-center">
              {isEV ? 'NJ EV Savings on the ' : 'Why NJ Is the Best Place to Lease a '}<span className="text-accent italic">{fullName}</span>
            </h2>
            <p className="mt-4 text-muted-foreground text-center max-w-2xl">
              {isEV
                ? `New Jersey is one of the most EV-friendly states in the nation. Leasing the ${fullName} here means serious monthly savings.`
                : `New Jersey's competitive dealer market and Capital Motor Cars' multi-state network give NJ lessees a major pricing advantage.`}
            </p>
          </div>
          {isEV ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {[
                { icon: Zap, title: '0% NJ Sales Tax', desc: `NJ exempts EVs from the 6.625% sales tax. On a ${fullName} lease, that saves you $${Math.round(leaseStart * 0.06625 * 36).toLocaleString()} over 36 months compared to an equivalent ICE vehicle.` },
                { icon: TrendingDown, title: 'Lower Running Costs', desc: `Electricity costs roughly $0.03–0.05 per mile in NJ vs $0.12–0.15 for gasoline. A typical 12k-mile year saves $1,000–$1,500 in fuel alone.` },
                { icon: Leaf, title: 'Charging Infrastructure', desc: `NJ has an expanding public fast-charging network along the Turnpike, Garden State Pkwy, and major retail corridors. Most ${fullName} owners charge at home overnight.` },
              ].map((item, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                  className="p-7 rounded-[2rem] border-2 border-border/60 bg-muted/5 hover:border-accent/40 transition-all">
                  <div className="w-12 h-12 rounded-xl bg-green-500/10 text-green-500 flex items-center justify-center mb-5">
                    <item.icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-black text-xl text-black dark:text-white mb-3">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
              {[
                { icon: Building2, title: 'Dense Dealer Network', desc: `NJ and the NY metro have one of the highest concentrations of ${make} dealers in the US. More competition = better selling prices for you.` },
                { icon: ShieldCheck, title: 'Multi-State Sourcing', desc: `Capital Motor Cars works with dealers in NJ, NY, CT, and PA. We source wherever the best deal is, and arrange delivery to your NJ door.` },
                { icon: DollarSign, title: 'Manufacturer Incentives', desc: `${make} Financial frequently offers NJ-specific lease support programs. We monitor these monthly and automatically apply any incentives available to your deal.` },
                { icon: MapPin, title: 'Free NJ Delivery', desc: `Wherever you are in New Jersey, Bergen, Essex, Middlesex, Monmouth, or the Shore, we coordinate delivery. No dealer trip required.` },
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
          )}
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-12 md:py-20 border-t border-border/40">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col mb-10 justify-center items-start md:items-center">
            <span className="text-accent font-black tracking-[0.4em] uppercase text-[10px] mb-2">FAQ</span>
            <h2 className="text-3xl md:text-4xl font-black tracking-tighter text-black dark:text-white uppercase">
              {fullName} Lease <span className="text-accent italic">Questions</span>
            </h2>
          </div>
          <div className="max-w-4xl mx-auto glass-card-theme p-4 md:p-8 rounded-[2rem]">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="border-b-border/40 last:border-0">
                  <AccordionTrigger className="text-left text-base font-bold hover:text-accent transition-colors py-5">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-sm pb-5 leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-12 md:py-20 border-t border-border/40">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col justify-start items-start md:items-center">
            <span className="text-accent font-black tracking-[0.4em] uppercase text-[10px] mb-2">Get a Quote</span>
            <h2 className="text-3xl md:text-4xl font-black tracking-tighter text-black dark:text-white uppercase mb-2">
              Get Your {fullName} <span className="text-accent italic">Lease Quote</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-lg text-center mb-6 mt-2">Tell us the trim and color you want. We come back with a live number from {make} Financial within one business day.</p>
            <div className="w-full max-w-2xl mx-auto">
              <div className="glass-card-theme form-card-theme p-4 sm:p-6 md:p-8 rounded-[2.5rem]">
                <ContactForm source="vehicle" serviceTitle={`${fullName} Lease`} compact />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* NJ County Hubs */}
      <section className="py-10 border-t border-border/40 bg-muted/5">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8">
            <div className="shrink-0">
              <div className="flex items-center gap-2 mb-1">
                <MapPin className="w-4 h-4 text-accent" />
                <span className="font-black text-sm uppercase tracking-[0.2em] text-black dark:text-white">We Serve All NJ Counties</span>
              </div>
              <p className="text-xs text-muted-foreground max-w-xs">Free delivery to every county. No dealership visit required.</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {[
                { label: 'Bergen County', path: '/car-leasing-bergen-county-nj' },
                { label: 'Hudson County', path: '/car-leasing-hudson-county-nj' },
                { label: 'Essex County', path: '/car-leasing-essex-county-nj' },
                { label: 'Union County', path: '/car-leasing-union-county-nj' },
                { label: 'Middlesex County', path: '/car-leasing-middlesex-county-nj' },
                { label: 'Morris County', path: '/car-leasing-morris-county-nj' },
                { label: 'Monmouth County', path: '/car-leasing-monmouth-county-nj' },
              ].map((county) => (
                <Link
                  key={county.path}
                  to={county.path}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full border border-border/60 bg-background text-xs font-semibold text-foreground hover:border-accent hover:text-accent transition-colors"
                >
                  {county.label} <ArrowRight className="w-3 h-3" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <RelatedServices />
    </Layout>
  );
}
