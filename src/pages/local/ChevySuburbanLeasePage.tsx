import { Link } from 'react-router-dom';
import {
  ArrowRight,
  BadgeDollarSign,
  Building2,
  CarFront,
  CheckCircle2,
  Clock3,
  MapPin,
  Phone,
  ShieldCheck,
  Sparkles,
  Star,
  TrafficCone,
  Zap,
} from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { SEO } from '@/components/SEO';
import { JsonLd, createBreadcrumbSchema, createFaqSchema, createServiceSchema, createWebPageSchema } from '@/components/JsonLd';
import { Button } from '@/components/ui/button';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { BackgroundEffects } from '@/components/ui/BackgroundEffects';
import { SectionDividerCreative } from '@/components/ui/SectionDividerCreative';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import carLeaseImage from '@/assets/car-leasing.jpg';

const featuredSuburbanTrims = [
  {
    name: "Chevrolet Suburban LT 4WD",
    image: "https://upload.wikimedia.org/wikipedia/commons/d/de/2021_Chevrolet_Suburban_LT%2C_front_6.14.21.jpg",
    description: "The ideal balance of luxury and utility. Includes leather-appointed seating, hands-free power liftgate, and a 12.3-inch diagonal multicolor driver information center.",
    price: "1,049",
    hp: 355,
    engine: "5.3L EcoTec3 V8",
    drivetrain: "4WD",
    cargo: "144.7 cu. ft. max",
  },
  {
    name: "Chevrolet Suburban High Country 4WD",
    image: "https://upload.wikimedia.org/wikipedia/commons/b/bc/2021_Chevrolet_Suburban_High_Country_Front_View_%28United_States%29.png",
    description: "The ultimate expression of full-size luxury. Featuring a powerful 6.2L V8 engine, magnetic ride control, adaptive air suspension, and premium Bose 10-speaker audio.",
    price: "1,299",
    hp: 420,
    engine: "6.2L EcoTec3 V8",
    drivetrain: "4WD",
    cargo: "144.7 cu. ft. max",
  }
];

const faqs = [
  {
    question: 'What is the average monthly payment for a Chevy Suburban lease?',
    answer: 'A Chevy Suburban lease typically ranges from $990 to $1,390 per month depending on the trim level (such as LT, RST, or High Country), the down payment, and active manufacturer incentives. Working with a fleet broker like Capital Motor Cars allows us to bypass standard retail markups and find the lowest monthly payment.',
  },
  {
    question: 'Is the Duramax Turbo-Diesel engine available for leasing?',
    answer: 'Yes. The highly efficient 3.0L Duramax Turbo-Diesel engine is a popular choice for Suburban leases. It offers outstanding torque (495 lb-ft) and significantly better fuel economy than the standard V8 engines, which can offset your total cost of ownership during the lease term.',
  },
  {
    question: 'Can I lease a Chevy Suburban with $0 down (Sign & Drive)?',
    answer: 'Absolutely. Capital Motor Cars specializes in true Sign & Drive leases with $0 down payment. All drive-off fees, taxes, and registration are rolled directly into the monthly payment, which protects your capital and eliminates out-of-pocket expenses at signing.',
  },
  {
    question: 'What are the main differences between the Chevy Suburban and Tahoe leases?',
    answer: 'While both share the same platform, engine options, and tech, the Suburban is 15 inches longer overall, providing significantly more cargo space behind the third row (41.5 cubic feet vs. 25.5 cubic feet). Because they hold their value differently, the residual values vary, sometimes making the lease payments closer than their MSRPs suggest.',
  },
  {
    question: 'Can I lease a Chevy Suburban under a business name for tax write-offs?',
    answer: 'Yes. With a Gross Vehicle Weight Rating (GVWR) exceeding 6,000 pounds, the Chevy Suburban qualifies for accelerated depreciation and substantial business tax write-offs under Section 179. We can structure the lease directly under your S-Corp, C-Corp, or LLC.',
  },
];

const schemas = [
  createWebPageSchema({
    name: 'Chevy Suburban Lease Deals | Lowest Monthly Payments',
    description: 'Get the lowest lease monthly payments on the Chevrolet Suburban. Secure wholesale fleet lease rates from Capital Motor Cars with $0 down options.',
    url: 'https://www.capitalmotorcars.com/chevy-suburban-lease-deals',
  }),
  createServiceSchema({
    name: 'Chevy Suburban Leasing Services',
    description: 'Specialized fleet leasing service for the Chevy Suburban. Bypassing dealership markups to provide the cheapest Suburban lease deals with driveway delivery.',
    url: 'https://www.capitalmotorcars.com/chevy-suburban-lease-deals',
  }),
  createFaqSchema(faqs),
  createBreadcrumbSchema([
    { name: 'Home', url: 'https://www.capitalmotorcars.com/' },
    { name: 'Chevy Suburban Lease Deals', url: 'https://www.capitalmotorcars.com/chevy-suburban-lease-deals' },
  ]),
];

export default function ChevySuburbanLeasePage() {
  return (
    <Layout>
      <SEO
        title="Chevy Suburban Lease Deals | Lowest Monthly Payments | Capital Motor Cars"
        description="Looking for the lowest lease monthly payments on a Chevy Suburban? We compare fleet inventory to find the best rates. Sign & Drive options available."
        canonicalPath="/chevy-suburban-lease-deals"
        seoKeywords={[
          'chevy suburban lease deals',
          'lowest lease monthly payments chevy suburban',
          'cheapest suburban lease',
          'chevrolet suburban lease nj',
          'suburban business lease section 179',
          'Capital Motor Cars'
        ]}
        ogType="website"
        ogImage="https://www.capitalmotorcars.com/shared-img.png"
      />
      <JsonLd data={schemas} />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-[hsl(var(--hero-bg))] text-white">
        <BackgroundEffects />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(circle at 14% 18%, hsl(var(--accent) / 0.16), transparent 30%), radial-gradient(circle at 82% 20%, hsl(var(--accent) / 0.09), transparent 28%)',
          }}
        />

        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 pt-24 md:pt-28 lg:pt-32 pb-16 md:pb-20 lg:pb-24">
          <div className="grid gap-12 lg:grid-cols-[1fr_1fr] items-center">
            <div className="max-w-3xl">
              <div className="mb-6 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] text-white/70">
                <Link to="/" className="hover:text-white transition-colors">Home</Link>
                <span className="text-white/30">/</span>
                <span className="text-accent glow-blue">SUV Specials</span>
              </div>

              <h1 className="mt-5 text-2xl sm:text-5xl md:text-6xl lg:text-[2.6rem] font-extrabold leading-[1.1] tracking-tight">
                <span className="text-gradient-heading-dark block mb-2">Chevy Suburban</span>
                <span className="text-white">Lowest Lease Payments.</span>
              </h1>

              <p className="mt-6 max-w-2xl text-lg sm:text-xl md:text-2xl leading-relaxed text-white/80 font-light">
                Secure the lowest lease monthly payments on the legendary Chevy Suburban. Skip the high-pressure retail showrooms. Our wholesale brokers source direct fleet pricing on any Suburban trim.
              </p>

              <div className="mt-10 flex flex-col sm:flex-row gap-4">
                <MagneticButton strength={0.35} className="w-full sm:w-auto">
                  <Button asChild size="lg" className="h-14 px-8 w-full sm:w-auto bg-accent hover:bg-accent/90 text-accent-foreground font-bold text-lg glow-blue rounded-full">
                    <Link to="/contact" className="inline-flex items-center gap-2">
                      Get Your Quote
                      <ArrowRight className="h-5 w-5" />
                    </Link>
                  </Button>
                </MagneticButton>
                <MagneticButton strength={0.25} className="w-full sm:w-auto">
                  <Button asChild size="lg" variant="ghost" className="h-14 px-8 w-full sm:w-auto border-2 border-white/20 bg-white/[0.05] text-white hover:bg-white/[0.1] hover:text-white font-bold text-lg rounded-full backdrop-blur-md">
                    <a href="#featured-trims" className="inline-flex items-center gap-2">
                      Compare Trims
                    </a>
                  </Button>
                </MagneticButton>
              </div>

              <div className="mt-12 pt-8 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-6">
                {[
                  { label: 'Max Cargo Space', value: '144.7 cu ft' },
                  { label: 'Towing Capacity', value: 'Up to 8,300 lbs' },
                  { label: 'Seating Capacity', value: 'Up to 9 Passengers' },
                  { label: 'Tax Deduction', value: 'Section 179 Eligible' },
                ].map((stat) => (
                  <div key={stat.label}>
                    <p className="text-xs font-semibold uppercase tracking-wider text-white/50">{stat.label}</p>
                    <p className="mt-1 text-lg font-bold text-white">{stat.value}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative hidden lg:block">
              <div className="absolute -inset-4 rounded-[3rem] bg-accent/20 blur-3xl opacity-70 animate-pulse-slow" aria-hidden />
              <div className="relative flex flex-col overflow-hidden rounded-[2.5rem] border border-white/20 bg-white/[0.03] p-5 shadow-[0_32px_100px_rgba(0,0,0,0.5)] backdrop-blur-xl">
                <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-black/40 group relative">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/b/bc/2021_Chevrolet_Suburban_High_Country_Front_View_%28United_States%29.png"
                    alt="Chevy Suburban Lease"
                    className="h-[400px] w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute bottom-6 left-6 z-20">
                    <div className="inline-flex items-center gap-2 rounded-full bg-accent/20 border border-accent/30 backdrop-blur-md px-3 py-1.5 text-xs font-black uppercase tracking-widest text-white mb-3">
                      <Sparkles className="h-3 w-3 text-accent" /> Fleet Special
                    </div>
                    <h3 className="text-3xl font-bold text-white">Chevrolet Suburban LT</h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Advantage Sections */}
      <section className="py-20 lg:py-32 section-bg">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <div className="inline-flex items-center justify-center gap-2 rounded-full bg-accent/10 px-4 py-2 text-sm font-bold uppercase tracking-widest text-accent mb-6">
              <CarFront className="h-4 w-4" /> Full-Size Utility
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold text-heading mb-6 tracking-tight">
              Bypassing the Dealership Markup.
            </h2>
            <p className="text-lg md:text-xl text-section-muted leading-relaxed">
              Leasing a Suburban through Capital Motor Cars means you bypass the high sales commissions and localized markups typical of traditional SUV showrooms.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: BadgeDollarSign,
                title: 'Wholesale Fleet Access',
                desc: 'We access regional fleet databases to find Chevrolet Suburbans at dealer invoice pricing. We pass these wholesale savings directly to your monthly payment.',
              },
              {
                icon: Building2,
                title: 'Section 179 Business Write-Off',
                desc: 'Because the Chevy Suburban carries a GVWR of over 6,000 lbs, S-Corps, LLCs, and business owners can write off up to 100% of the lease value in the first year.',
              },
              {
                icon: ShieldCheck,
                title: 'Duramax Diesel Fuel Savings',
                desc: 'Opt for the Duramax 3.0L Turbo-Diesel engine configuration to maximize fuel economy (up to 27 MPG highway) while retaining heavy-duty towing capacity.',
              },
            ].map((feature, i) => (
              <div key={i} className="group relative rounded-[2rem] border border-border dark:border-white/10 bg-card dark:bg-white/[0.02] p-8 md:p-10 shadow-sm transition-all duration-500 hover:border-accent/40 hover:bg-accent/[0.02]">
                <div className="absolute top-0 right-0 p-8 opacity-5 text-8xl font-black text-accent pointer-events-none transition-transform duration-500 group-hover:scale-110 group-hover:-translate-y-2 group-hover:translate-x-2">
                  0{i + 1}
                </div>
                <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-accent/10 text-accent transition-transform duration-500 group-hover:scale-110">
                  <feature.icon className="h-8 w-8" />
                </div>
                <h3 className="text-2xl font-bold text-section mb-4">{feature.title}</h3>
                <p className="text-section-muted leading-relaxed text-lg">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Trims Section */}
      <section id="featured-trims" className="py-20 lg:py-32 section-bg-alt relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-[20%] -mt-[10%] w-[50%] h-[50%] rounded-full bg-accent/5 blur-[120px] pointer-events-none" />

        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <SectionHeading
            title="Featured Chevy Suburban Configurations"
            subtitle="Compare estimated wholesale lease pricing on our most popular family and luxury Suburban trims."
            className="mb-16"
          />

          <div className="grid lg:grid-cols-2 gap-10">
            {featuredSuburbanTrims.map((trim, i) => (
              <div key={trim.name} className="flex flex-col rounded-[2.5rem] border border-border dark:border-white/10 bg-background dark:bg-white/[0.03] overflow-hidden shadow-lg transition-all duration-500 hover:border-accent/30 group">
                <div className="relative h-[300px] md:h-[400px] overflow-hidden bg-black/5 dark:bg-white/5">
                  <img
                    src={trim.image}
                    alt={trim.name}
                    className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-6 right-6">
                    <div className="bg-background/90 dark:bg-black/80 backdrop-blur-md text-section font-bold px-4 py-2 rounded-full border border-border dark:border-white/10 shadow-sm">
                      Est. Starting <span className="text-accent">${trim.price}</span>/mo
                    </div>
                  </div>
                </div>

                <div className="p-8 md:p-10 flex flex-col flex-grow">
                  <h3 className="text-3xl font-extrabold text-section mb-4">{trim.name}</h3>
                  <p className="text-section-muted text-lg mb-8 flex-grow leading-relaxed">{trim.description}</p>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 p-6 rounded-2xl bg-card dark:bg-white/[0.02] border border-border dark:border-white/5">
                    <div>
                      <p className="text-xs font-bold uppercase text-section-muted mb-1">Power</p>
                      <p className="text-lg font-bold text-section flex items-center gap-1"><Zap className="w-4 h-4 text-accent" /> {trim.hp} hp</p>
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase text-section-muted mb-1">Engine</p>
                      <p className="text-lg font-bold text-section truncate" title={trim.engine}>{trim.engine}</p>
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase text-section-muted mb-1">Cargo</p>
                      <p className="text-lg font-bold text-section">{trim.cargo}</p>
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase text-section-muted mb-1">Drive</p>
                      <p className="text-lg font-bold text-section">{trim.drivetrain}</p>
                    </div>
                  </div>

                  <Button asChild size="lg" className="w-full h-14 bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 font-bold text-lg rounded-xl">
                    <Link to="/contact">Quote a Suburban {trim.name.split(' ')[2]}</Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SectionDividerCreative variant="dot" />

      {/* FAQ Section */}
      <section className="py-20 lg:py-32 section-bg-alt">
        <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-extrabold text-heading mb-6 tracking-tight">
              Chevy Suburban Lease Intelligence
            </h2>
            <p className="text-lg text-section-muted">
              Get the technical details on leases, options, and business tax exemptions.
            </p>
          </div>

          <div className="glass-card-theme p-4 md:p-8 rounded-[2rem]">
            <Accordion type="single" collapsible className="w-full [&_[data-state=open]]:text-section [&_button]:text-section [&_button:hover]:text-section [&_.text-muted-foreground]:text-section-muted">
              {faqs.map((faq, index) => (
                <AccordionItem key={faq.question} value={`faq-${index}`} className="border-border dark:border-white/10 px-4 md:px-6 py-2">
                  <AccordionTrigger className="text-left text-lg md:text-xl font-bold py-4">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-base md:text-lg leading-relaxed text-section-muted pb-6">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto px-0 max-w-5xl">
          <div className="how-it-works-card p-10 md:p-16 lg:p-20 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[100px] pointer-events-none transform translate-x-1/2 -translate-y-1/2" />

            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 rounded-full bg-accent/10 px-4 py-2 text-sm font-bold uppercase tracking-[0.2em] text-accent mb-8">
                <Sparkles className="h-5 w-5" />
                Capital Motor Cars
              </div>
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-heading-cta mb-8 tracking-tight leading-[1.1]">
                Your Chevy Suburban is waiting. <br/>
                <span className="text-accent">Bypass the retail markups.</span>
              </h2>
              <p className="max-w-2xl mx-auto text-lg md:text-xl text-section-muted mb-12 font-medium leading-relaxed">
                Enjoy transparent pricing, expert structuring, and complimentary driveway delivery on any trim.
              </p>

              <div className="flex flex-col sm:flex-row justify-center gap-5">
                <MagneticButton strength={0.4}>
                  <Button asChild size="lg" className="h-16 px-10 bg-accent hover:bg-accent/90 text-accent-foreground font-bold text-lg glow-blue rounded-full w-full sm:w-auto">
                    <Link to="/contact">Get My Quote</Link>
                  </Button>
                </MagneticButton>
                <MagneticButton strength={0.2}>
                  <Button asChild size="lg" variant="outline" className="h-16 px-10 border-2 border-border bg-background text-section hover:bg-accent/5 font-bold text-lg rounded-full w-full sm:w-auto">
                    <Link to="/brands">View Other SUVs</Link>
                  </Button>
                </MagneticButton>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
