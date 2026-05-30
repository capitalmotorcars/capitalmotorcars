import { Link } from 'react-router-dom';
import {
  ArrowRight,
  BadgeDollarSign,
  CalendarClock,
  CarFront,
  CheckCircle2,
  Clock3,
  Gauge,
  MapPinned,
  Phone,
  ShieldCheck,
  Sparkles,
  Star,
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


const faqs = [
  {
    question: 'How do I compare car lease deals New Jersey shoppers actually want?',
    answer: 'Start with your monthly budget, the type of vehicle you want, the lease term, the mileage allowance, and how much is due at signing. Once those details are clear, it becomes much easier to compare offers that actually fit.',
  },
  {
    question: 'Can I compare monthly car lease deals and SUV lease deals here?',
    answer: 'Yes. If you are comparing monthly payments or looking at SUVs, you can review the offers side by side and narrow the ones worth quoting.',
  },
  {
    question: 'What should I look at besides the monthly payment?',
    answer: 'Look at the mileage limit, the lease term, the amount due at signing, any fees, and whether the vehicle really fits the way you drive. A good lease should make sense after the first month, not just on the headline payment.',
  },
  {
    question: 'Can I get help narrowing the best car lease deals quickly?',
    answer: 'Yes. If you already know your budget or the kind of vehicle you want, we can help narrow the best options faster and save you from chasing offers that do not really fit.',
  },
  {
    question: 'Do these offers work for drivers searching lease a car near me?',
    answer: 'Yes. If you are searching for a local lease option in New Jersey, you can compare vehicles here and request a quote.',
  },
];

const schemas = [
  createWebPageSchema({
    name: 'Car Lease Deals New Jersey',
    description: 'Car lease deals New Jersey with a stronger landing-page design, better section flow, and a cleaner conversion path.',
    url: 'https://www.capitalmotorcars.com/car-lease-deals-new-jersey',
  }),
  createServiceSchema({
    name: 'Car Lease Deals New Jersey',
    description: 'Car lease deals New Jersey with a stronger landing-page design, better section flow, and a cleaner conversion path.',
    url: 'https://www.capitalmotorcars.com/car-lease-deals-new-jersey',
  }),
  createFaqSchema(faqs),
  createBreadcrumbSchema([
    { name: 'Home', url: 'https://www.capitalmotorcars.com/' },
    { name: 'Car Lease Deals New Jersey', url: 'https://www.capitalmotorcars.com/car-lease-deals-new-jersey' },
  ]),
];

export default function CarLeaseDealsNewJerseyPage() {
  return (
    <Layout>
      <SEO
        title="Best Car Lease Deals in New Jersey | Capital Motor Cars"
        description="Looking for the best car lease deals in New Jersey? Capital Motor Cars helps you compare vehicles, negotiate terms, and secure the perfect auto lease."
        canonicalPath="/car-lease-deals-new-jersey"
        seoKeywords={['car lease deals New Jersey', 'New Jersey car lease deals', 'lease specials NJ', 'zero down lease NJ', 'best lease deals NJ', 'Capital Motor Cars']}
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
              'radial-gradient(circle at 14% 18%, hsl(var(--accent) / 0.18), transparent 30%), radial-gradient(circle at 86% 22%, hsl(var(--accent) / 0.1), transparent 28%)',
          }}
        />

        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 pt-24 md:pt-28 lg:pt-32 pb-12 md:pb-14 lg:pb-16">
          <div className="grid gap-8 lg:grid-cols-[1fr_1fr] items-center">
            <div className="max-w-3xl">
              <div className="mb-4 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-white/70">
                <Link to="/" className="hover:text-white transition-colors">Home</Link>
                <span className="text-white/30">/</span>
                <span>Car Lease Deals New Jersey</span>
              </div>

              <h1 className="mt-5 text-3xl sm:text-4xl md:text-5xl lg:text-[3.7rem] font-extrabold leading-tight tracking-tight">
                <span className="text-gradient-heading-dark">Car Lease Deals New Jersey</span>
              </h1>

              <p className="mt-4 max-w-2xl text-base sm:text-lg md:text-xl leading-relaxed text-white/80">
                Find lease offers that fit your budget, compare the vehicles that suit your day-to-day needs, and move toward a quote without extra noise.
              </p>

              <div className="mt-7 flex flex-col sm:flex-row gap-3">
                <MagneticButton strength={0.35} className="w-full sm:w-auto">
                  <Button asChild size="lg" className="w-full sm:w-auto bg-accent hover:bg-accent/90 text-accent-foreground font-semibold glow-blue">
                    <Link to="/contact" className="inline-flex items-center gap-2">
                      Request a Quote
                      <Phone className="h-4 w-4" />
                    </Link>
                  </Button>
                </MagneticButton>
                <MagneticButton strength={0.25} className="w-full sm:w-auto">
                  <Button asChild size="lg" variant="ghost" className="w-full sm:w-auto border border-white/20 bg-white/[0.05] text-white hover:bg-white/[0.1] hover:text-white">
                    <Link to="/quiz" className="inline-flex items-center gap-2">
                      Start Vehicle Quiz
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </MagneticButton>
              </div>

              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                {[
                  'See the numbers clearly',
                  'Compare the right vehicles',
                  'Get to a real quote faster',
                ].map((item, index) => {
                  const icons = [MapPinned, Sparkles, Clock3];
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
                    alt="Car lease deals in New Jersey"
                    className="h-[200px] w-full object-cover sm:h-[250px] lg:h-[270px]"
                  />
                </div>

                <div className="mt-3 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-4">
                    <div className="flex items-center gap-2 text-accent">
                      <CalendarClock className="h-4 w-4" />
                      <span className="text-xs font-bold uppercase tracking-[0.18em]">Payment view</span>
                    </div>
                    <p className="mt-3 text-lg font-bold text-white">Compare the full offer</p>
                    <p className="mt-2 text-sm leading-relaxed text-white/70">Monthly payment, lease term, and due at signing stay easy to review before you ask for a quote.</p>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-4">
                    <div className="flex items-center gap-2 text-accent">
                      <CarFront className="h-4 w-4" />
                      <span className="text-xs font-bold uppercase tracking-[0.18em]">Vehicle fit</span>
                    </div>
                    <p className="mt-3 text-lg font-bold text-white">Sedans, SUVs, and more</p>
                    <p className="mt-2 text-sm leading-relaxed text-white/70">Narrow the models that fit your commute, passengers, and budget instead of chasing every listing.</p>
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
            title="Start With The Details That Matter"
            subtitle="A good lease deal usually comes down to the payment, the vehicle, and the terms behind the offer."
          />

          <div className="grid gap-4 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="how-it-works-card p-6 md:p-8 lg:p-10">
              <h3 className="text-xl md:text-2xl font-bold text-section">Compare the parts of the deal that actually change the payment</h3>
              <p className="mt-4 text-section-muted text-base md:text-lg">
                Two offers can look close at first glance, but the real difference usually comes from mileage, term length, signing cost, and the vehicle you choose.
              </p>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {[
                  'Monthly payment range',
                  'Mileage allowance',
                  'Due at signing amount',
                  'Sedan or SUV fit',
                  'Lease term length',
                  'New or used preference',
                ].map((tag) => (
                  <div key={tag} className="rounded-2xl border border-border dark:border-white/10 bg-background dark:bg-white/[0.04] px-4 py-3 text-sm font-medium text-section-muted">
                    {tag}
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {[
                { icon: Gauge, title: 'Start with budget', text: 'Pick a monthly range first, then focus on the vehicles that land inside it.' },
                { icon: ShieldCheck, title: 'Keep the terms visible', text: 'Mileage, lease length, and upfront cost should stay clear while you compare.' },
                { icon: Star, title: 'Choose the right fit', text: 'The best deal still needs to suit your daily driving, passengers, and routine.' },
                { icon: Sparkles, title: 'Narrow the shortlist', text: 'A cleaner comparison helps you move from browsing to a quote with less guesswork.' },
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
            title="What Drivers Compare In A Lease Deal"
            subtitle="Most shoppers compare payment, mileage, lease term, due at signing, and vehicle type before asking for the final quote."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                icon: BadgeDollarSign,
                title: 'Monthly payment',
                text: 'The first question is whether the payment fits the budget without stretching the month.',
              },
              {
                icon: Clock3,
                title: 'Term length',
                text: 'A shorter or longer term changes both the payment and how soon you will shop again.',
              },
              {
                icon: Sparkles,
                title: 'Vehicle choice',
                text: 'Sedans, crossovers, and SUVs can lease very differently, so the choice has to match how you drive.',
              },
              {
                icon: ShieldCheck,
                title: 'Upfront cost',
                text: 'Due at signing, fees, and mileage often decide whether the deal still feels good after the first month.',
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
              title="How The Process Usually Goes"
              subtitle="Most people get better results when they start with the budget, narrow the vehicle, and then review the quote details."
              className="mb-8 md:mb-10"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
              {[
                {
                  title: 'Start with budget',
                  description: 'Set a payment range that feels realistic before you spend time on too many options.',
                },
                {
                  title: 'Choose the vehicle',
                  description: 'Focus on the sedan, SUV, or crossover that fits your routine and the way you actually drive.',
                },
                {
                  title: 'Review the offer',
                  description: 'Check mileage, lease term, and due at signing so the numbers still make sense up close.',
                },
                {
                  title: 'Request the quote',
                  description: 'Once the vehicle and numbers feel right, move into the quote and final details.',
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
            title="Frequently Asked Questions"
            subtitle="Answers to common questions about comparing lease offers, choosing the right vehicle, and getting started in New Jersey."
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
              Car lease deals New Jersey
            </div>
            <h2 className="mt-5 text-xl sm:text-2xl md:text-4xl font-bold text-heading-cta leading-tight">
              Ready to compare the right lease deals in New Jersey?
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-sm sm:text-base md:text-lg text-section-muted">
              If you are comparing car lease deals New Jersey shoppers are looking at now, we can help you narrow the vehicle and review the offer more clearly.
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
    </Layout>
  );
}
