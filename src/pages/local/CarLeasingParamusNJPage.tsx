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
  Store,
  Waves,
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
    question: 'What does car leasing Paramus NJ help with?',
    answer: 'It helps you skip the showroom lines and high-pressure negotiations on Route 17 and Route 4, letting you compare vehicles, review fleet lease pricing, and get the car delivered directly to your Paramus home or office.',
  },
  {
    question: 'Can I compare luxury SUVs, family crossovers, and electric cars in Paramus?',
    answer: 'Yes. Capital Motor Cars gives you access to the entire inventory of major brands, letting you compare sedans, SUVs, and EVs in one place rather than visiting separate dealership lots.',
  },
  {
    question: 'How does home delivery work in Paramus?',
    answer: 'Once your lease is approved and terms are signed, we coordinate the delivery of the vehicle directly to your driveway, complete with all paperwork, keys, and setup.',
  },
  {
    question: 'What matters besides the monthly payment?',
    answer: 'Be sure to evaluate the Money Factor (interest rate), residual value, annual mileage options, and total out-of-pocket costs at signing to verify the true cost of ownership.',
  },
  {
    question: 'How do I get started with a Paramus lease quote?',
    answer: 'You can start by filling out our simple contact form or taking the 3-minute quiz. Knowing your target budget and brand preferences helps us secure the best fleet rates faster.',
  },
];

const schemas = [
  createWebPageSchema({
    name: 'Car Leasing Paramus NJ',
    description: 'Car leasing Paramus NJ with a clearer way to compare vehicles, review lease terms, and move toward the right quote.',
    url: 'https://www.capitalmotorcars.com/car-leasing-paramus-nj',
  }),
  createServiceSchema({
    name: 'Car Leasing Paramus NJ',
    description: 'Car leasing Paramus NJ with a clearer way to compare vehicles, review lease terms, and move toward the right quote.',
    url: 'https://www.capitalmotorcars.com/car-leasing-paramus-nj',
  }),
  createFaqSchema(faqs),
  createBreadcrumbSchema([
    { name: 'Home', url: 'https://www.capitalmotorcars.com/' },
    { name: 'Car Leasing Paramus NJ', url: 'https://www.capitalmotorcars.com/car-leasing-paramus-nj' },
  ]),
];

export default function CarLeasingParamusNJPage() {
  return (
    <Layout>
      <SEO
        title="Car Leasing Paramus NJ | Capital Motor Cars"
        description="Searching for car leasing in Paramus, NJ? Skip the Route 17 showrooms. Capital Motor Cars offers a seamless auto leasing experience with delivery to your door."
        canonicalPath="/car-leasing-paramus-nj"
        seoKeywords={['car leasing Paramus NJ', 'Paramus NJ car leasing', 'car lease Paramus NJ', 'lease a car near Paramus', 'auto broker Paramus', 'Capital Motor Cars Paramus']}
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
                <span>Car Leasing Paramus NJ</span>
              </div>

              <h1 className="mt-5 text-3xl sm:text-4xl md:text-5xl lg:text-[3.7rem] font-extrabold leading-tight tracking-tight">
                <span className="text-gradient-heading-dark">Car Leasing Paramus NJ</span>
              </h1>

              <p className="mt-4 max-w-2xl text-base sm:text-lg md:text-xl leading-relaxed text-white/80">
                Skip the dealership stress on Route 17. Access fleet pricing across all brands, review terms with absolute clarity, and get your car delivered to your driveway.
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
                  'Choose the right vehicle sooner',
                  'Keep the full offer easy to review',
                  'Move toward a real quote faster',
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
                    alt="Car leasing in Paramus New Jersey"
                    className="h-[200px] w-full object-cover sm:h-[250px] lg:h-[270px]"
                  />
                </div>

                <div className="mt-3 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-4">
                    <div className="flex items-center gap-2 text-accent">
                      <MapPin className="h-4 w-4" />
                      <span className="text-xs font-bold uppercase tracking-[0.18em]">Paramus Focus</span>
                    </div>
                    <p className="mt-3 text-lg font-bold text-white">Save Time, Skip Showrooms</p>
                    <p className="mt-2 text-sm leading-relaxed text-white/70">Paramus is Bergen County's auto retail core, but dealer pricing has hidden markups. We bypass them, matching fleet pricing directly.</p>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-4">
                    <div className="flex items-center gap-2 text-accent">
                      <ShieldCheck className="h-4 w-4" />
                      <span className="text-xs font-bold uppercase tracking-[0.18em]">Transparent Rates</span>
                    </div>
                    <p className="mt-3 text-lg font-bold text-white">Driveway Delivery</p>
                    <p className="mt-2 text-sm leading-relaxed text-white/70">From final signature to driving off, the details stay clear. We deliver the vehicle right to your home or office in Paramus.</p>
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
            title="Start With The Lease Details That Change The Choice"
            subtitle="A strong lease usually comes down to the vehicle, the payment, the mileage, and whether the full offer works for the way you actually drive."
          />

          <div className="grid gap-4 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="how-it-works-card p-6 md:p-8 lg:p-10">
              <h3 className="text-xl md:text-2xl font-bold text-section">Compare the parts of the deal that still matter after the first month</h3>
              <p className="mt-4 text-section-muted text-base md:text-lg">
                A low monthly number by itself does not tell the full story. The lease should still feel right once you factor in mileage, term length, signing cost, and whether the vehicle fits the way you live and drive around Paramus.
              </p>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {[
                  'Monthly payment range',
                  'Lease term length',
                  'Mileage allowance',
                  'Due at signing amount',
                  'Sedan, SUV, or luxury model',
                  'Daily driving fit',
                ].map((tag) => (
                  <div key={tag} className="rounded-2xl border border-border dark:border-white/10 bg-background dark:bg-white/[0.04] px-4 py-3 text-sm font-medium text-section-muted">
                    {tag}
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {[
                { icon: Star, title: 'Start with budget', text: 'A realistic monthly target helps you focus on offers that are actually worth comparing.' },
                { icon: Waves, title: 'Match the routine', text: 'The right vehicle should fit parking, commuting, passengers, and the pace of your weekly driving.' },
                { icon: ShieldCheck, title: 'Keep the terms visible', text: 'Mileage, lease length, and signing cost should stay clear while you compare similar vehicles.' },
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
            title="What Paramus Drivers Usually Compare First"
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
                text: 'A sedan, SUV, or premium crossover can change both the daily driving experience and the lease structure more than people expect.',
              },
              {
                icon: CheckCircle2,
                title: 'Mileage needs',
                text: 'The mileage allowance matters more once you think about commuting, errands, weekend driving, and how the car will actually be used.',
              },
              {
                icon: ShieldCheck,
                title: 'Signing cost',
                text: 'Upfront cost can change how the deal feels just as much as the monthly number, so it should stay part of the comparison.',
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
            title="Why This Search Feels Different In Paramus"
            subtitle="Local shoppers are usually balancing budget, convenience, vehicle quality, and a faster path to the right next car."
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
                text: 'If you are looking near Paramus, it helps to keep the comparison focused instead of treating every offer like it belongs in the same bucket.',
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

      <section className="py-16 lg:py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-6">
              Car Leasing in Paramus, NJ: Skip the Dealership Route 17 Games
            </h2>
            <div className="space-y-4 text-base sm:text-lg text-muted-foreground leading-relaxed">
              <p>
                Paramus is Bergen County's primary retail hub, marked by major dealership centers lining Route 17 and Route 4. While the options are plentiful, visiting dealerships on Route 17 during weekends is notoriously time-consuming, involving high-pressure sales strategies, multiple finance managers, and hidden markups.
              </p>
              <p>
                As a leading auto broker, Capital Motor Cars provides an elite alternative. We skip the showroom pressure, search our entire regional fleet network to find the exact model, color, and options you requested, and match all volume fleet discounts. 
              </p>
              <p>
                Whether you're looking to lease a luxury BMW or Mercedes SUV to handle family driving, or a practical, daily commuter car, we process everything online or over the phone and deliver the vehicle directly to your Paramus home or office. It's white-glove, stress-free leasing at wholesale pricing.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-20 section-bg">
        <div className="container mx-auto px-4 lg:px-8">
          <SectionHeading
            title="Frequently Asked Questions"
            subtitle="Answers to common questions about comparing vehicles, reviewing lease terms, and getting to the right quote in Paramus."
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
              Car leasing Paramus NJ
            </div>
            <h2 className="mt-5 text-xl sm:text-2xl md:text-4xl font-bold text-heading-cta leading-tight">
              Ready to find the right lease in Paramus?
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-sm sm:text-base md:text-lg text-section-muted">
              If you are comparing car leasing Paramus NJ options now, we can help you narrow the vehicles, review the terms clearly, and move toward a quote that makes sense.
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
