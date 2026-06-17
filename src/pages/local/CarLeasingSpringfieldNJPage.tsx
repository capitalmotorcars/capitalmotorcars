import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Building2,
  CalendarClock,
  CarFront,
  CheckCircle2,
  Clock3,
  MapPin,
  Phone,
  ShieldCheck,
  Sparkles,
  Star,
  TrafficCone,
} from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { RelatedServices } from '@/components/services/RelatedServices';
import { SEO } from '@/components/SEO';
import { JsonLd, createBreadcrumbSchema, createFaqSchema, createServiceSchema, createWebPageSchema } from '@/components/JsonLd';
import { Button } from '@/components/ui/button';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { BackgroundEffects } from '@/components/ui/BackgroundEffects';
import { SectionDividerCreative } from '@/components/ui/SectionDividerCreative';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import carLeaseImage from '@/assets/car-leasing.jpg';

const faqs = [
  {
    question: 'Where is the Capital Motor Cars office in Springfield NJ?',
    answer: 'Our corporate office is located at 251 Morris Avenue, Springfield Township, NJ 07081. While we specialize in seamless digital leases with direct driveway delivery, you are always welcome to schedule an in-person consultation with our leasing team at our Springfield headquarters.',
  },
  {
    question: 'How does leasing with a broker differ from Route 22 dealerships in Springfield?',
    answer: 'Traditional dealerships along Route 22 are limited to their specific brand and have high-pressure commission structures. Capital Motor Cars functions as an independent auto broker; we source vehicles from all brands across a massive Northeast fleet network, bypassing showroom markup to secure direct fleet pricing and lower monthly payments for you.',
  },
  {
    question: 'Do you offer home delivery to surrounding Union and Essex County towns?',
    answer: 'Yes. We provide complimentary home or office delivery of your new leased vehicle throughout Springfield and all neighboring municipalities, including Summit, Millburn, Union, Short Hills, Westfield, and Mountainside.',
  },
  {
    question: 'Can I trade in my current vehicle when leasing in Springfield?',
    answer: 'Absolutely. We handle the entire trade-in process, including grounded lease returns or paying off financed vehicles. If your trade-in has positive equity, we can apply it to lower your new lease payments or write you a check directly.',
  },
  {
    question: 'What do I need to prepare to get a lease quote in Springfield NJ?',
    answer: 'To secure a quick quote, it is helpful to know your approximate monthly budget, the vehicle class or model you are interested in, your expected annual mileage (e.g., 10,000, 12,000, or 15,000), and whether you prefer a zero down (Sign & Drive) structure.',
  },
];

const schemas = [
  createWebPageSchema({
    name: 'Car Leasing Springfield NJ',
    description: 'Bypass the Route 22 dealerships. Get wholesale broker lease deals in Springfield, NJ from Capital Motor Cars with direct home delivery.',
    url: 'https://www.capitalmotorcars.com/car-leasing-springfield-nj',
  }),
  createServiceSchema({
    name: 'Car Leasing Springfield NJ',
    description: 'Bypass the Route 22 dealerships. Get wholesale broker lease deals in Springfield, NJ from Capital Motor Cars with direct home delivery.',
    url: 'https://www.capitalmotorcars.com/car-leasing-springfield-nj',
  }),
  createFaqSchema(faqs),
  createBreadcrumbSchema([
    { name: 'Home', url: 'https://www.capitalmotorcars.com/' },
    { name: 'Car Leasing Springfield NJ', url: 'https://www.capitalmotorcars.com/car-leasing-springfield-nj' },
  ]),
];

export default function CarLeasingSpringfieldNJPage() {
  return (
    <Layout>
      <SEO
        title="Car Leasing Springfield NJ | Corporate Office | Capital Motor Cars"
        description="Bypass the high-pressure dealerships on Route 22. Capital Motor Cars in Springfield, NJ offers direct fleet lease pricing and free driveway delivery."
        canonicalPath="/car-leasing-springfield-nj"
        seoKeywords={['car leasing Springfield NJ', 'Springfield NJ car leasing', 'car lease Springfield NJ', 'lease a car near Springfield', 'auto broker Springfield NJ', 'Capital Motor Cars Springfield']}
        ogType="website"
        ogImage="https://www.capitalmotorcars.com/shared-img.png"
      />
      <JsonLd data={schemas} />

      <section className="relative overflow-hidden bg-[hsl(var(--hero-bg))] text-white">
        <BackgroundEffects />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(circle at 16% 18%, hsl(var(--accent) / 0.17), transparent 30%), radial-gradient(circle at 84% 22%, hsl(var(--accent) / 0.1), transparent 28%)',
          }}
        />

        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 pt-24 md:pt-28 lg:pt-32 pb-12 md:pb-14 lg:pb-16">
          <div className="grid gap-8 lg:grid-cols-[1fr_1fr] items-center">
            <div className="max-w-3xl">
              <div className="mb-4 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-white/70">
                <Link to="/" className="hover:text-white transition-colors">Home</Link>
                <span className="text-white/30">/</span>
                <span>Car Leasing Springfield NJ</span>
              </div>

              <h1 className="mt-5 text-3xl sm:text-4xl md:text-5xl lg:text-[3.7rem] font-extrabold leading-tight tracking-tight">
                <span className="text-gradient-heading-dark">Car Leasing Springfield NJ</span>
              </h1>

              <p className="mt-4 max-w-2xl text-base sm:text-lg md:text-xl leading-relaxed text-white/80">
                Skip the commission-driven sales pitches on Route 22. Secure wholesale broker pricing from our Springfield headquarters and have your new car delivered straight to your driveway.
              </p>

              <div className="mt-7 flex flex-col sm:flex-row gap-3">
                <MagneticButton strength={0.35} className="w-full sm:w-auto">
                  <Button asChild size="lg" className="w-full sm:w-auto bg-accent hover:bg-accent/90 text-accent-foreground font-semibold glow-blue">
                    <Link to="/contact" className="inline-flex items-center gap-2">
                      Get a Local Quote
                      <Phone className="h-4 w-4" />
                    </Link>
                  </Button>
                </MagneticButton>
                <MagneticButton strength={0.25} className="w-full sm:w-auto">
                  <Button asChild size="lg" variant="ghost" className="w-full sm:w-auto border border-white/20 bg-white/[0.05] text-white hover:bg-white/[0.1] hover:text-white">
                    <Link to="/services/car-leasing" className="inline-flex items-center gap-2">
                      Leasing Services
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </MagneticButton>
              </div>

              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                {[
                  'Bypass Route 22 Dealerships',
                  'Access All Vehicle Brands',
                  'Free Driveway Delivery',
                ].map((item, index) => {
                  const icons = [Building2, CarFront, Clock3];
                  const Icon = icons[index];
                  return (
                    <div key={item} className="rounded-2xl border border-white/10 bg-white/[0.05] p-4 backdrop-blur-sm">
                      <Icon className="mb-3 h-5 w-5 text-accent" />
                      <p className="text-sm leading-relaxed text-white/78">{item}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-4 rounded-[2.5rem] bg-accent/15 blur-3xl opacity-60" aria-hidden />
              <div className="relative flex flex-col overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] p-4 shadow-[0_24px_80px_rgba(0,0,0,0.35)] backdrop-blur-sm">
                <div className="overflow-hidden rounded-[1.5rem] border border-white/10 bg-black/20">
                  <img
                    src={carLeaseImage}
                    alt="Car leasing in Springfield New Jersey"
                    className="h-[200px] w-full object-cover sm:h-[250px] lg:h-[270px]"
                  />
                </div>

                <div className="mt-3 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-4">
                    <div className="flex items-center gap-2 text-accent">
                      <MapPin className="h-4 w-4" />
                      <span className="text-xs font-bold uppercase tracking-[0.18em]">HQ Advantage</span>
                    </div>
                    <p className="mt-3 text-lg font-bold text-white">Springfield Offices</p>
                    <p className="mt-2 text-sm leading-relaxed text-white/70">Located directly on Morris Avenue, our central offices serve as the hub for our nationwide fleet dealer network, bringing direct wholesale savings to local Union County families.</p>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-4">
                    <div className="flex items-center gap-2 text-accent">
                      <ShieldCheck className="h-4 w-4" />
                      <span className="text-xs font-bold uppercase tracking-[0.18em]">Pure Clarity</span>
                    </div>
                    <p className="mt-3 text-lg font-bold text-white">Zero Hidden Fees</p>
                    <p className="mt-2 text-sm leading-relaxed text-white/70">We replace back-room negotiations with complete transparency. Money factors, residuals, acquisition fees, and drive-off costs are presented clearly up front.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-20 section-bg">
        <div className="container mx-auto px-4 lg:px-8">
          <SectionHeading
            title="A Smarter Way to Lease in Springfield"
            subtitle="Local Union County shoppers choose Capital Motor Cars for an effortless auto leasing experience that avoids showroom markup and high-pressure dealerships."
          />

          <div className="grid gap-4 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="how-it-works-card p-6 md:p-8 lg:p-10">
              <h3 className="text-xl md:text-2xl font-bold text-section">Why Shop With a Broker Instead of a Showroom?</h3>
              <p className="mt-4 text-section-muted text-base md:text-lg">
                Traditional dealerships along Route 22 must cover heavy showroom overhead, commission structures, and inventory costs. As independent brokers, we source cars directly from manufacturer fleet inventories, passing the wholesale pricing advantages straight to you.
              </p>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {[
                  'Wholesale fleet pricing',
                  'All makes and models',
                  'True Sign & Drive ($0 down)',
                  'Direct-to-driveway delivery',
                  'Hassle-free trade-in returns',
                  'Secured online approvals',
                ].map((tag) => (
                  <div key={tag} className="rounded-2xl border border-border dark:border-white/10 bg-background dark:bg-white/[0.04] px-4 py-3 text-sm font-medium text-section-muted">
                    {tag}
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {[
                { icon: Star, title: 'Morris Avenue HQ', text: 'Work with a local team headquartered right here in Springfield Township.' },
                { icon: TrafficCone, title: 'Avoid Route 22 Games', text: 'Skip the standard negotiating rooms and hidden dealer add-on fees.' },
                { icon: ShieldCheck, title: 'Fully Protected', text: 'Lease details, warranties, and manufacturer promotions apply directly.' },
                { icon: Sparkles, title: 'Delivered to You', text: 'Sign final paperwork and receive your keys right on your own kitchen table.' },
              ].map((item) => (
                <div key={item.title} className="glass-card-theme p-5 md:p-6">
                  <item.icon className="mb-3 h-5 w-5 text-accent" />
                  <h3 className="text-lg font-bold text-section">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-section-muted">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <SectionDividerCreative variant="dot" />

      <section className="py-16 lg:py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <SectionHeading
            title="Vehicle Options Handled From Our Springfield Hub"
            subtitle="Whether you need a family SUV for weekend trips, a premium luxury cruiser, or a tax-exempt EV, we source it all."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                icon: CarFront,
                title: 'SUVs & Crossovers',
                text: 'From fuel-efficient compacts to luxury three-row models (BMW X7, Lexus RX, Mercedes GLE) with robust residuals.',
              },
              {
                icon: CalendarClock,
                title: 'Electric Vehicles (EVs)',
                text: 'Take advantage of the federal $7,500 tax credit rolled in upfront, plus the full New Jersey sales tax exemption on zero-emission vehicles.',
              },
              {
                icon: CheckCircle2,
                title: 'Sedans & Daily Commuters',
                text: 'Practical, high-mileage options for Route 24, I-78, and Garden State Parkway commuters looking for maximum monthly value.',
              },
              {
                icon: ShieldCheck,
                title: 'Commercial Fleet Leasing',
                text: 'Acquire vehicles under your S-Corp, C-Corp, or LLC to qualify for tax deductions and Section 179 write-offs.',
              },
            ].map((item) => (
              <article key={item.title} className="group rounded-[2rem] border border-border dark:border-white/10 bg-card dark:bg-white/[0.04] p-6 md:p-7 shadow-sm transition-all duration-300 hover:border-accent/40 hover:shadow-[0_18px_60px_-24px_rgba(59,130,246,0.35)]">
                <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-accent/10 text-accent">
                  <item.icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-section">{item.title}</h3>
                <p className="mt-3 text-sm md:text-base leading-relaxed text-section-muted">{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-20 section-bg-alt">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="how-it-works-card p-6 md:p-8 lg:p-10 xl:p-12">
            <SectionHeading
              title="How Our Streamlined Leasing Process Works"
              subtitle="Get your new vehicle in 4 simple steps without ever spending a Saturday inside a car dealership."
              className="mb-8 md:mb-10"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
              {[
                {
                  title: 'Select Your Car',
                  description: 'Choose your desired brand, model, color, and options online or consult with our leasing agents.',
                },
                {
                  title: 'Approve the Math',
                  description: 'Receive a transparent breakdown of your monthly payments, mileage, and drive-off costs.',
                },
                {
                  title: 'Secure Financing',
                  description: 'Complete our encrypted, secure online application for swift credit tier approval.',
                },
                {
                  title: 'Driveway Delivery',
                  description: 'We bring your clean, fully detailed vehicle directly to your home or office for a quick handoff.',
                },
              ].map((step, index) => (
                <article key={step.title} className="rounded-[1.75rem] border border-border dark:border-white/10 bg-background dark:bg-white/[0.04] p-5 md:p-6">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-accent text-accent-foreground text-lg font-bold">
                    {index + 1}
                  </div>
                  <h3 className="text-lg md:text-xl font-bold text-section">{step.title}</h3>
                  <p className="mt-3 text-sm md:text-base leading-relaxed text-section-muted">{step.description}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-20 section-bg">
        <div className="container mx-auto px-4 lg:px-8">
          <SectionHeading
            title="Serving Springfield and Surrounding Communities"
            subtitle="Get local expertise backed by the strength of Capital Motor Cars' central New Jersey headquarters."
          />

          <div className="grid gap-6 lg:grid-cols-3">
            {[
              {
                icon: Building2,
                title: 'Morris Avenue HQ',
                text: 'Based locally at 251 Morris Avenue, we understand the commuting and family vehicle priorities of our local Union County residents.',
              },
              {
                icon: MapPin,
                title: 'Surrounding Delivery Areas',
                text: 'Providing free delivery to Summit, Millburn, Union, Westfield, Short Hills, Mountainside, Maplewood, and South Orange.',
              },
              {
                icon: Sparkles,
                title: 'Wholesale Savings Hub',
                text: 'Our commercial fleet relationships mean we secure buy-rate financing directly from manufacturers to bypass retail dealership commission markups.',
              },
            ].map((item) => (
              <div key={item.title} className="glass-card-theme p-6 md:p-7">
                <item.icon className="mb-4 h-6 w-6 text-accent" />
                <h3 className="text-xl font-bold text-section">{item.title}</h3>
                <p className="mt-3 text-sm md:text-base leading-relaxed text-section-muted">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-20 section-bg">
        <div className="container mx-auto px-4 lg:px-8">
          <SectionHeading
            title="Frequently Asked Questions"
            subtitle="Answers to common questions about auto leasing and broker pricing in Springfield, NJ."
          />

          <div className="max-w-4xl mx-auto glass-card-theme p-3 sm:p-4 md:p-6">
            <Accordion type="single" collapsible className="w-full [&_[data-state=open]]:text-section [&_button]:text-section [&_button:hover]:text-section [&_.text-muted-foreground]:text-section-muted">
              {faqs.map((faq, index) => (
                <AccordionItem key={faq.question} value={`faq-${index}`} className="border-border dark:border-white/10 px-3 sm:px-4 md:px-5">
                  <AccordionTrigger className="text-left text-sm sm:text-base md:text-lg font-semibold">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm sm:text-base leading-relaxed text-section-muted">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-20 px-4 md:px-0">
        <div className="container mx-auto px-0 lg:px-8">
          <div className="how-it-works-card p-8 md:p-10 lg:p-12 mx-auto max-w-4xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-accent/10 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-accent">
              <Sparkles className="h-4 w-4" />
              Car leasing Springfield NJ
            </div>
            <h2 className="mt-5 text-xl sm:text-2xl md:text-4xl font-bold text-heading-cta leading-tight">
              Ready to Secure the Best Lease Deal in Springfield?
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-sm sm:text-base md:text-lg text-section-muted">
              Don't spend hours negotiating at the dealerships. Let our Springfield-based team quote, source, and deliver your next car seamlessly.
            </p>
            <div className="mt-7 flex flex-col sm:flex-row justify-center gap-3">
              <MagneticButton strength={0.3}>
                <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground glow-blue w-full sm:w-auto">
                  <Link to="/contact">Request a Quote</Link>
                </Button>
              </MagneticButton>
              <Button asChild size="lg" variant="outline" className="font-semibold w-full sm:w-auto">
                <Link to="/services">View Services</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    <RelatedServices />
    </Layout>
  );
}
