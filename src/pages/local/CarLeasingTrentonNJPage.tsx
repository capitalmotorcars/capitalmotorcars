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
import { SEO } from '@/components/SEO';
import { JsonLd, createBreadcrumbSchema, createFaqSchema, createServiceSchema, createWebPageSchema } from '@/components/JsonLd';
import { Button } from '@/components/ui/button';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { BackgroundEffects } from '@/components/ui/BackgroundEffects';
import { SectionDividerCreative } from '@/components/ui/SectionDividerCreative';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import carLeaseImage from '@/assets/car-leasing.jpg';
import { primarySeoKeywords, njSeoKeywords } from '@/data/seoKeywords';

const faqs = [
  {
    question: 'What does car leasing Trenton NJ usually help with?',
    answer: 'It helps you narrow the vehicles that fit your budget, review the lease terms side by side, and get to a quote without wasting time on offers that do not really fit.',
  },
  {
    question: 'Can I compare sedans and SUVs if I am leasing in Trenton?',
    answer: 'Yes. Many drivers start by narrowing the body style first, then compare payment, mileage, and due at signing once the right vehicles are in front of them.',
  },
  {
    question: 'What should I check besides the monthly payment?',
    answer: 'Look at the lease term, mileage allowance, signing cost, and how well the vehicle fits your commute, parking, passengers, and weekly driving routine.',
  },
  {
    question: 'Is this a good fit if I want a local lease option near Trenton?',
    answer: 'Yes. If you want a local leasing option near Trenton, you can compare the right vehicles, keep the terms clear, and move toward a quote more easily.',
  },
  {
    question: 'How do I get to a quote faster?',
    answer: 'It helps to know your target payment, the type of vehicle you want, your estimated mileage, and whether you prefer a lower upfront cost or a lower monthly number.',
  },
];

const schemas = [
  createWebPageSchema({
    name: 'Car Leasing Trenton NJ',
    description: 'Car leasing Trenton NJ with a simpler way to compare vehicles, review lease terms, and move toward the right quote.',
    url: 'https://capitalmotorcars.com/car-leasing-trenton-nj',
  }),
  createServiceSchema({
    name: 'Car Leasing Trenton NJ',
    description: 'Car leasing Trenton NJ with a simpler way to compare vehicles, review lease terms, and move toward the right quote.',
    url: 'https://capitalmotorcars.com/car-leasing-trenton-nj',
  }),
  createFaqSchema(faqs),
  createBreadcrumbSchema([
    { name: 'Home', url: 'https://capitalmotorcars.com/' },
    { name: 'Car Leasing Trenton NJ', url: 'https://capitalmotorcars.com/car-leasing-trenton-nj' },
  ]),
];

export default function CarLeasingTrentonNJPage() {
  return (
    <Layout>
      <SEO
        title="Car Leasing Trenton NJ | Top Auto Broker | Capital Motor Cars"
        description="Searching for the best car leasing deals in Trenton, NJ? Capital Motor Cars helps you easily compare vehicles, negotiate terms, and secure the perfect lease."
        canonicalPath="/car-leasing-trenton-nj"
        seoKeywords={['car leasing Trenton NJ', 'Trenton NJ car leasing', 'car lease Trenton NJ', 'lease a car near Trenton', 'auto broker Trenton', 'Capital Motor Cars Trenton']}
        ogType="website"
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
                <span>Car Leasing Trenton NJ</span>
              </div>

              <h1 className="mt-5 text-3xl sm:text-4xl md:text-5xl lg:text-[3.7rem] font-extrabold leading-tight tracking-tight">
                <span className="text-gradient-heading-dark">Car Leasing Trenton NJ</span>
              </h1>

              <p className="mt-4 max-w-2xl text-base sm:text-lg md:text-xl leading-relaxed text-white/80">
                Compare the vehicles that make sense for your routine, keep the lease terms easy to review, and move toward a quote without dragging the process out.
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
                    <Link to="/services/car-leasing" className="inline-flex items-center gap-2">
                      View Leasing Service
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </MagneticButton>
              </div>

              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                {[
                  'Start with the right vehicle',
                  'Keep the lease terms clear',
                  'Get to a real quote faster',
                ].map((item, index) => {
                  const icons = [CarFront, CalendarClock, Clock3];
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
                    alt="Car leasing in Trenton New Jersey"
                    className="h-[200px] w-full object-cover sm:h-[250px] lg:h-[270px]"
                  />
                </div>

                <div className="mt-3 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-4">
                    <div className="flex items-center gap-2 text-accent">
                      <MapPin className="h-4 w-4" />
                      <span className="text-xs font-bold uppercase tracking-[0.18em]">Local focus</span>
                    </div>
                    <p className="mt-3 text-lg font-bold text-white">Trenton-area priorities</p>
                    <p className="mt-2 text-sm leading-relaxed text-white/70">Whether you need an easier commuter car, more room for family use, or a smarter replacement, the focus stays on what works day to day.</p>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-4">
                    <div className="flex items-center gap-2 text-accent">
                      <ShieldCheck className="h-4 w-4" />
                      <span className="text-xs font-bold uppercase tracking-[0.18em]">Clear review</span>
                    </div>
                    <p className="mt-3 text-lg font-bold text-white">See the full offer</p>
                    <p className="mt-2 text-sm leading-relaxed text-white/70">Monthly payment, mileage, term length, and due at signing stay in view so the offer still makes sense after the first click.</p>
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
            title="Start With The Lease Details That Change The Decision"
            subtitle="A strong lease usually comes down to the vehicle, the payment, the mileage, and whether the full offer works for the way you actually drive."
          />

          <div className="grid gap-4 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="how-it-works-card p-6 md:p-8 lg:p-10">
              <h3 className="text-xl md:text-2xl font-bold text-section">Compare the parts of the offer that still matter after the first month</h3>
              <p className="mt-4 text-section-muted text-base md:text-lg">
                A low payment by itself is not enough. The lease should still feel right once you factor in mileage, term length, signing cost, and whether the vehicle actually fits your commute and daily use.
              </p>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {[
                  'Monthly payment range',
                  'Lease term length',
                  'Mileage allowance',
                  'Due at signing amount',
                  'Sedan, SUV, or crossover',
                  'Daily commute fit',
                ].map((tag) => (
                  <div key={tag} className="rounded-2xl border border-border dark:border-white/10 bg-background dark:bg-white/[0.04] px-4 py-3 text-sm font-medium text-section-muted">
                    {tag}
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {[
                { icon: Star, title: 'Start with budget', text: 'A realistic monthly range helps you focus on offers that are actually worth comparing.' },
                { icon: TrafficCone, title: 'Match the routine', text: 'The right vehicle should feel practical for regular driving, parking, passengers, and cargo.' },
                { icon: ShieldCheck, title: 'Keep the terms visible', text: 'Mileage, lease length, and signing cost should stay clear while you review similar vehicles.' },
                { icon: Sparkles, title: 'Move toward the quote', text: 'Once the numbers and the vehicle line up, the next step becomes much easier to make.' },
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
            title="What Trenton Drivers Usually Compare First"
            subtitle="Most shoppers start with payment, vehicle type, mileage, and signing cost before deciding which lease is worth following up on."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                icon: CalendarClock,
                title: 'Monthly payment',
                text: 'Most people want to know what feels manageable each month before they spend time comparing too many vehicles.',
              },
              {
                icon: CarFront,
                title: 'Vehicle type',
                text: 'A sedan, SUV, or crossover can change both the driving experience and the lease structure more than people expect.',
              },
              {
                icon: CheckCircle2,
                title: 'Mileage needs',
                text: 'The mileage allowance matters more once you think about commuting, errands, and how much driving really happens across the year.',
              },
              {
                icon: ShieldCheck,
                title: 'Signing cost',
                text: 'Upfront cost can change the feel of the deal just as much as the monthly number, so it should stay part of the comparison.',
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
            title="How Car Leasing Usually Moves From Search To Quote"
            subtitle="The process gets easier when you narrow the vehicle first, review the terms clearly, and then move into the final numbers with less guesswork."
            className="mb-8 md:mb-10"
          />

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
              {[
                {
                  title: 'Choose the vehicle',
                  description: 'Start with the body style and size that make sense for your routine before comparing too many offers at once.',
                },
                {
                  title: 'Set the lease range',
                  description: 'Review payment, mileage, and due at signing early so the shortlist stays realistic from the start.',
                },
                {
                  title: 'Compare the shortlist',
                  description: 'Once a few strong options are in front of you, it becomes much easier to see which one is really worth moving forward on.',
                },
                {
                  title: 'Request the quote',
                  description: 'With the right vehicle and terms in place, the final quote feels like a real next step instead of another restart.',
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
            title="Why This Search Feels Different In Trenton"
            subtitle="Local shoppers are usually trying to make a practical decision quickly, not browse endless offers without a clear next step."
          />

          <div className="grid gap-6 lg:grid-cols-3">
            {[
              {
                icon: Building2,
                title: 'Start with real use',
                text: 'The right lease should fit how the car will be used every week, not just how the payment looks in isolation.',
              },
              {
                icon: MapPin,
                title: 'Keep the search local',
                text: 'If you are looking near Trenton, it helps to keep the comparison focused instead of treating every offer like it belongs in the same bucket.',
              },
              {
                icon: Sparkles,
                title: 'Get to the point faster',
                text: 'Once the vehicle and lease terms make sense together, the quote becomes more useful and the next decision gets easier.',
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
            subtitle="Answers to common questions about comparing vehicles, reviewing lease terms, and getting to the right quote in Trenton."
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
              Car leasing Trenton NJ
            </div>
            <h2 className="mt-5 text-xl sm:text-2xl md:text-4xl font-bold text-heading-cta leading-tight">
              Ready to narrow the right lease in Trenton?
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-sm sm:text-base md:text-lg text-section-muted">
              If you are comparing car leasing Trenton NJ options now, we can help you narrow the vehicles, review the terms clearly, and move toward a quote that makes sense.
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
