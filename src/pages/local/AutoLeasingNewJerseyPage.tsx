import { Link } from 'react-router-dom';
import {
  ArrowRight,
  BriefcaseBusiness,
  CarFront,
  CheckCircle2,
  Clock3,
  Handshake,
  MapPinned,
  Phone,
  RefreshCcw,
  SearchCheck,
  ShieldCheck,
  Sparkles,
  Workflow,
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
import autoLeasingImage from '@/assets/hero-bg.jpg';


const faqs = [
  {
    question: 'What does a licensed car lease broker do in New Jersey?',
    answer: 'A licensed car lease broker acts as your independent automotive concierge. We bypass retail dealership sales floors by tapping into regional wholesale fleet allocations and captive finance buy-rates. We negotiate your vehicle price, eliminate dealer add-on fees, handle credit approvals, and arrange doorstep delivery directly to your home or office.',
  },
  {
    question: 'Is it cheaper to use a car lease broker or go directly to a dealership in NJ?',
    answer: 'Using a broker is typically significantly cheaper. Dealerships rely on high retail markups and inflated interest rates (Money Factor markups) to generate profit. Because Capital Motor Cars moves large monthly vehicle volumes across 30+ manufacturers, we access wholesale fleet discounts and pass captive lender buy-rates directly to you, saving clients an average of $2,000 to $5,000 over their lease term.',
  },
  {
    question: 'How do car lease brokers get paid in New Jersey?',
    answer: 'Capital Motor Cars is compensated through automotive wholesale fleet volume allowances from participating dealer partners rather than marking up your retail lease terms. You receive fully itemized lease agreements directly from the manufacturer captive bank (such as BMW Financial Services, Mercedes-Benz Financial, or Porsche Financial Services) with zero hidden fees.',
  },
  {
    question: 'Can a car lease broker help me get a true $0 down lease in NJ?',
    answer: 'Yes. We specialize in true zero down (sign and drive) leases where your initial out-of-pocket payment covers only standard government fees (first month payment, state registration, and acquisition fees) or rolls everything entirely into the monthly payments with zero dollars paid at signing.',
  },
  {
    question: 'Where does Capital Motor Cars deliver leased vehicles in New Jersey?',
    answer: 'We provide free white-glove doorstep delivery across all 21 New Jersey counties, including Bergen, Essex, Morris, Union, Hudson, Monmouth, Middlesex, Somerset, and Ocean counties, as well as New York and Pennsylvania.',
  },
];

const schemas = [
  createWebPageSchema({
    name: 'Licensed Car Lease Broker NJ | Capital Motor Cars',
    description: 'Work with New Jersey trusted licensed car lease broker. Skip dealership markups with wholesale fleet rates, $0 down lease options, and free doorstep delivery across NJ.',
    url: 'https://www.capitalmotorcars.com/auto-leasing-new-jersey',
  }),
  createServiceSchema({
    name: 'Car Lease Broker & Auto Leasing New Jersey',
    description: 'Full-service auto leasing and licensed car broker solutions across New Jersey, offering pre-negotiated wholesale fleet rates, $0 down lease structures, and doorstep vehicle delivery.',
    url: 'https://www.capitalmotorcars.com/auto-leasing-new-jersey',
  }),
  createFaqSchema(faqs),
  createBreadcrumbSchema([
    { name: 'Home', url: 'https://www.capitalmotorcars.com/' },
    { name: 'Auto Leasing New Jersey', url: 'https://www.capitalmotorcars.com/auto-leasing-new-jersey' },
  ]),
];

export default function AutoLeasingNewJerseyPage() {
  return (
    <Layout>
      <SEO
        title="Licensed Car Lease Broker NJ | Capital Motor Cars | New Jersey Auto Leasing"
        description="Work with New Jersey's trusted licensed car lease broker. Skip dealership markups with wholesale fleet rates, $0 down lease options, and free doorstep delivery across NJ."
        canonicalPath="/auto-leasing-new-jersey"
        seoKeywords={[
          'car lease broker NJ',
          'licensed car lease broker New Jersey',
          'auto leasing New Jersey',
          'auto broker NJ',
          'car leasing broker near me',
          'best car lease deals NJ',
          'zero down lease NJ',
          'Capital Motor Cars',
        ]}
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
              'radial-gradient(circle at 18% 16%, hsl(var(--accent) / 0.18), transparent 30%), radial-gradient(circle at 78% 22%, hsl(var(--accent) / 0.1), transparent 28%)',
          }}
        />

        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 pt-24 md:pt-28 lg:pt-32 pb-12 md:pb-14 lg:pb-16">
          <div className="grid gap-8 lg:grid-cols-[1fr_1fr] items-center">
            <div className="max-w-3xl">
              <div className="mb-4 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-white/70">
                <Link to="/" className="hover:text-white transition-colors">Home</Link>
                <span className="text-white/30">/</span>
                <span>Car Lease Broker NJ</span>
              </div>

              <h1 className="mt-5 text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] font-extrabold leading-tight tracking-tight">
                <span className="text-gradient-heading-dark">Licensed Car Lease Broker NJ</span>
              </h1>

              <p className="mt-4 max-w-2xl text-base sm:text-lg md:text-xl leading-relaxed text-white/80">
                Skip dealership markups, inflated interest rates, and four-hour showroom visits. Capital Motor Cars negotiates directly with captive automotive lenders to secure wholesale fleet lease pricing, true $0 down structures, and free doorstep delivery across New Jersey.
              </p>

              <div className="mt-7 flex flex-col sm:flex-row gap-3">
                <MagneticButton strength={0.35} className="w-full sm:w-auto">
                  <Button asChild size="lg" className="w-full sm:w-auto bg-accent hover:bg-accent/90 text-accent-foreground font-semibold glow-blue">
                    <Link to="/contact" className="inline-flex items-center gap-2">
                      Get a Custom Lease Quote
                      <Phone className="h-4 w-4" />
                    </Link>
                  </Button>
                </MagneticButton>
                <MagneticButton strength={0.25} className="w-full sm:w-auto">
                  <Button asChild size="lg" variant="ghost" className="w-full sm:w-auto border border-white/20 bg-white/[0.05] text-white hover:bg-white/[0.1] hover:text-white">
                    <Link to="/car-lease-deals-new-jersey" className="inline-flex items-center gap-2">
                      View NJ Lease Specials
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </MagneticButton>
              </div>

              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                {[
                  'Wholesale Fleet Volume Pricing',
                  'True $0 Down Sign & Drive Options',
                  'Free Doorstep Delivery Across NJ',
                ].map((item, index) => {
                  const icons = [SearchCheck, RefreshCcw, Clock3];
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
                    src={autoLeasingImage}
                    alt="Auto leasing in New Jersey"
                    className="h-[200px] w-full object-cover sm:h-[250px] lg:h-[270px]"
                   loading="lazy" decoding="async" />
                </div>

                <div className="mt-3 grid gap-3 sm:grid-cols-2">
                  {[
                    {
                      icon: Workflow,
                      title: 'Clear path',
                      text: 'Start with where you are now, narrow the next vehicle, and keep the steps easy to follow.',
                    },
                    {
                      icon: Handshake,
                      title: 'Real support',
                      text: 'Get help with upgrades, trade-ins, and lease renewals without chasing answers in three different places.',
                    },
                  ].map((card) => (
                    <div key={card.title} className={`rounded-2xl border border-white/10 bg-white/[0.05] p-4`}>
                      <div className="flex items-center gap-2 text-accent">
                        <card.icon className="h-4 w-4" />
                        <span className="text-xs font-bold uppercase tracking-[0.18em]">{card.title}</span>
                      </div>
                      <p className="mt-3 text-sm leading-relaxed text-white/72">{card.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Broker vs Dealership Comparison Section */}
      <section className="py-16 lg:py-20 section-bg-alt">
        <div className="container mx-auto px-4 lg:px-8">
          <SectionHeading
            title="Car Lease Broker vs Traditional Dealership in NJ"
            subtitle="Understand why thousands of New Jersey drivers choose a licensed auto lease broker over the traditional dealership showroom experience."
          />

          <div className="mt-10 overflow-hidden rounded-2xl border border-border dark:border-white/10 bg-card dark:bg-white/[0.03] shadow-lg">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-border dark:border-white/10 bg-muted/50 dark:bg-white/[0.05]">
                    <th className="p-4 md:p-5 font-bold text-foreground">Leasing Factor</th>
                    <th className="p-4 md:p-5 font-bold text-destructive">Traditional Dealership</th>
                    <th className="p-4 md:p-5 font-bold text-accent">Capital Motor Cars (Broker)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border dark:divide-white/10">
                  <tr>
                    <td className="p-4 md:p-5 font-semibold text-foreground">Negotiation & Time</td>
                    <td className="p-4 md:p-5 text-muted-foreground">4 to 6 hours trapped in the showroom negotiating back and forth with sales managers.</td>
                    <td className="p-4 md:p-5 text-foreground font-medium bg-accent/5">100% remote digital quote in 15 minutes. No showroom visits required.</td>
                  </tr>
                  <tr>
                    <td className="p-4 md:p-5 font-semibold text-foreground">Pricing & Money Factor</td>
                    <td className="p-4 md:p-5 text-muted-foreground">Dealerships often mark up the captive bank Money Factor interest rate for back-end profit.</td>
                    <td className="p-4 md:p-5 text-foreground font-medium bg-accent/5">Direct captive bank buy-rates with pre-negotiated wholesale volume fleet discounts.</td>
                  </tr>
                  <tr>
                    <td className="p-4 md:p-5 font-semibold text-foreground">Dealer Fees & Add-Ons</td>
                    <td className="p-4 md:p-5 text-muted-foreground">$1,200 to $1,800 in surprise mandatory fees (VIN etching, nitrogen tires, doc fees, protection packages).</td>
                    <td className="p-4 md:p-5 text-foreground font-medium bg-accent/5">Zero mandatory dealer add-on fees. Clean, transparent lease contract itemization.</td>
                  </tr>
                  <tr>
                    <td className="p-4 md:p-5 font-semibold text-foreground">Inventory Selection</td>
                    <td className="p-4 md:p-5 text-muted-foreground">Limited to one brand and motivated to push whatever stale inventory sits on their lot.</td>
                    <td className="p-4 md:p-5 text-foreground font-medium bg-accent/5">Unbiased access to 30+ manufacturers. Cross-shop BMW, Audi, Mercedes, and Porsche objectively.</td>
                  </tr>
                  <tr>
                    <td className="p-4 md:p-5 font-semibold text-foreground">Vehicle Delivery</td>
                    <td className="p-4 md:p-5 text-muted-foreground">Requires driving to the dealership lot to wait for final finance detailing and paperwork.</td>
                    <td className="p-4 md:p-5 text-foreground font-medium bg-accent/5">Free white-glove doorstep delivery to your home or office anywhere in New Jersey.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-20 section-bg">
        <div className="container mx-auto px-4 lg:px-8">
          <SectionHeading
            title="Built Around Real Leasing Situations"
            subtitle="Many drivers are replacing a vehicle, ending a lease, or planning an upgrade, so the search starts from their situation first."
          />

          <div className="grid gap-4 lg:grid-cols-[0.96fr_1.04fr]">
            <div className="grid gap-4">
              {[
                { icon: CarFront, title: 'Replacing your current vehicle', text: 'Ideal when your current lease is ending and you want a smoother next move.' },
                { icon: MapPinned, title: 'Upgrading to something new', text: 'It also fits drivers moving into a larger SUV, a newer model, or a vehicle that makes more sense for the next few years.' },
                { icon: ShieldCheck, title: 'Keeping the search simple', text: 'The focus stays on narrowing the best options without bouncing between disconnected listings and offers.' },
              ].map((item) => (
                <div key={item.title} className="glass-card-theme p-5 md:p-6">
                  <item.icon className="mb-3 h-5 w-5 text-accent" />
                  <h3 className="text-lg font-bold text-section">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-section-muted">{item.text}</p>
                </div>
              ))}
            </div>

            <div className="how-it-works-card p-6 md:p-8 lg:p-10">
              <h3 className="text-xl md:text-2xl font-bold text-section">Start with the decision in front of you</h3>
              <p className="mt-4 text-section-muted text-base md:text-lg">
                Some drivers are replacing a current lease, some are trading in, and some are starting fresh. Once that part is clear, the next vehicle becomes much easier to narrow.
              </p>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {[
                  'New lease',
                  'Current lease ending',
                  'Upgrade to a larger vehicle',
                  'Trade-in support',
                ].map((tag) => (
                  <div key={tag} className="rounded-2xl border border-border dark:border-white/10 bg-background dark:bg-white/[0.04] px-4 py-3 text-sm font-medium text-section-muted">
                    {tag}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <SectionDividerCreative variant="dot" />

      <section className="py-16 lg:py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <SectionHeading
            title="What Drivers Usually Compare"
            subtitle="These are the questions most shoppers answer before they decide whether to renew, upgrade, or start a new lease."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                icon: Clock3,
                title: 'Timing',
                text: 'A lot of people begin by asking whether to move now, renew soon, or wait until the current lease ends.',
              },
              {
                icon: SearchCheck,
                title: 'Vehicle fit',
                text: 'The next vehicle has to fit the way it will really be used, from commuting to family space to cargo needs.',
              },
              {
                icon: RefreshCcw,
                title: 'Upgrade planning',
                text: 'Many drivers are moving from one vehicle to another and want the change to feel smooth instead of rushed.',
              },
              {
                icon: Handshake,
                title: 'Guided support',
                text: 'Good support helps when you are comparing vehicles, reviewing the quote, and deciding whether to renew, upgrade, or start fresh.',
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
              title="How The Leasing Process Usually Works"
              subtitle="Most people start with their situation first, then narrow the vehicle, then review the final numbers."
              className="mb-8 md:mb-10"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
              {[
                {
                  title: 'Start with your situation',
                  description: 'Figure out whether you are replacing a lease, upgrading, trading in, or starting fresh.',
                },
                {
                  title: 'Pick the right vehicle',
                  description: 'Choose the size, style, and features that fit your routine, budget, and next few years.',
                },
                {
                  title: 'Review the options',
                  description: 'Look at the vehicles and lease offers that actually fit your situation instead of scrolling everything.',
                },
                {
                  title: 'Move to the quote',
                  description: 'Once the choice feels right, move into the quote, approval, and delivery details.',
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

      {/* Popular Leased Models in New Jersey */}
      <section className="py-16 lg:py-20 section-bg">
        <div className="container mx-auto px-4 lg:px-8">
          <SectionHeading
            title="Popular Luxury Lease Specials in New Jersey"
            subtitle="Explore our most requested programmatic lease packages with $0 down options and free doorstep delivery across NJ."
          />

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { name: 'Porsche Macan', path: '/porsche-macan-lease-nj', desc: 'Compact luxury performance SUV' },
              { name: 'Porsche Cayenne', path: '/porsche-cayenne-lease-nj', desc: 'Mid-size flagship luxury SUV' },
              { name: 'BMW X7', path: '/bmw-x7-lease-nj', desc: 'Full-size 3-row executive luxury SUV' },
              { name: 'Audi Q7', path: '/audi-q7-lease-nj', desc: 'Premium 3-row family SUV with Quattro AWD' },
              { name: 'Land Rover Defender', path: '/land-rover-defender-lease-nj', desc: 'Iconic luxury off-road capability' },
              { name: 'Genesis GV70', path: '/genesis-gv70-lease-nj', desc: 'High-value sport luxury crossover' },
              { name: 'Genesis GV80', path: '/genesis-gv80-lease-nj', desc: 'Executive luxury mid-size SUV' },
              { name: 'Cadillac Escalade', path: '/cadillac-escalade-lease-nj', desc: 'American luxury flagship 3-row SUV' },
            ].map((model) => (
              <Link
                key={model.name}
                to={model.path}
                className="group glass-card-theme p-5 rounded-2xl border border-border dark:border-white/10 hover:border-accent transition-all duration-300"
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-lg text-foreground group-hover:text-accent transition-colors">{model.name}</h3>
                  <ArrowRight className="h-4 w-4 text-accent transition-transform group-hover:translate-x-1" />
                </div>
                <p className="mt-2 text-xs text-muted-foreground">{model.desc}</p>
                <span className="mt-3 inline-block text-xs font-semibold text-accent">$0 Down NJ Specials Available</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-20 section-bg-alt">
        <div className="container mx-auto px-4 lg:px-8">
          <SectionHeading
            title="Frequently Asked Questions: Car Lease Broker NJ"
            subtitle="Answers to common questions about working with a licensed auto lease broker, pricing, and doorstep delivery in New Jersey."
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
              Auto leasing New Jersey
            </div>
            <h2 className="mt-5 text-xl sm:text-2xl md:text-4xl font-bold text-heading-cta leading-tight">
              Ready to compare auto leasing options in New Jersey?
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-sm sm:text-base md:text-lg text-section-muted">
              If you are sorting through auto leasing New Jersey options, we can help you narrow the next vehicle and line up the quote with less guesswork.
            </p>
            <div className="mt-7 flex flex-col sm:flex-row justify-center gap-3">
              <MagneticButton strength={0.3}>
                <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground glow-blue w-full sm:w-auto">
                  <Link to="/contact">Schedule a Call</Link>
                </Button>
              </MagneticButton>
              <Button asChild size="lg" variant="outline" className="font-semibold w-full sm:w-auto">
                <Link to="/services">Browse All Services</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    <RelatedServices />
    </Layout>
  );
}
