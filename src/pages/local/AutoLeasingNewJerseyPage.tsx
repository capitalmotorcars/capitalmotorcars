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
import { SEO } from '@/components/SEO';
import { JsonLd, createBreadcrumbSchema, createFaqSchema, createServiceSchema, createWebPageSchema } from '@/components/JsonLd';
import { Button } from '@/components/ui/button';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { BackgroundEffects } from '@/components/ui/BackgroundEffects';
import { SectionDividerCreative } from '@/components/ui/SectionDividerCreative';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import autoLeasingImage from '@/assets/hero-bg.jpg';
import { primarySeoKeywords, njSeoKeywords } from '@/data/seoKeywords';

const faqs = [
  {
    question: 'What does auto leasing New Jersey usually include?',
    answer: 'It can include starting a new lease, replacing your current vehicle, handling a trade-in, or planning a move out of an existing lease. The main goal is to find the right vehicle and the right terms for your situation.',
  },
  {
    question: 'Can you help with trade-ins, lease renewals, and upgrades?',
    answer: 'Yes. We can help if you are trading in a vehicle, coming to the end of a lease, or moving into something larger or newer.',
  },
  {
    question: 'How is car leasing different from buying in New Jersey?',
    answer: 'Leasing usually works best for drivers who want a newer vehicle, lower monthly payments, and the option to change cars every few years. Buying may make more sense if long-term ownership matters more than flexibility.',
  },
  {
    question: 'Can this help if I am searching for a lease near me?',
    answer: 'Yes. If you are searching lease a car near me, you can compare vehicles in New Jersey and move toward a quote here.',
  },
  {
    question: 'What information helps speed up the leasing process?',
    answer: 'It helps to know your target payment, the type of vehicle you want, your estimated mileage, and whether you have a trade-in or a current lease. That makes the search much faster and keeps the options more accurate.',
  },
];

const schemas = [
  createWebPageSchema({
    name: 'Auto Leasing New Jersey',
    description: 'Auto leasing New Jersey with clear service-led messaging for new leases, upgrades, and a faster quote path.',
    url: 'https://capitalmotorcars.com/auto-leasing-new-jersey',
  }),
  createServiceSchema({
    name: 'Auto Leasing New Jersey',
    description: 'Auto leasing New Jersey with clear service-led messaging for new leases, upgrades, and a faster quote path.',
    url: 'https://capitalmotorcars.com/auto-leasing-new-jersey',
  }),
  createFaqSchema(faqs),
  createBreadcrumbSchema([
    { name: 'Home', url: 'https://capitalmotorcars.com/' },
    { name: 'Auto Leasing New Jersey', url: 'https://capitalmotorcars.com/auto-leasing-new-jersey' },
  ]),
];

export default function AutoLeasingNewJerseyPage() {
  return (
    <Layout>
      <SEO
        title="Premier Auto Leasing in New Jersey | Capital Motor Cars"
        description="Experience stress-free auto leasing in New Jersey. We handle new leases, upgrades, and trade-ins, providing a faster and easier car quote flow."
        canonicalPath="/auto-leasing-new-jersey"
        seoKeywords={['auto leasing New Jersey', 'New Jersey auto leasing', 'auto lease NJ', 'lease broker NJ', 'auto lease broker New Jersey', 'Capital Motor Cars']}
        ogType="website"
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
                <span>Auto Leasing New Jersey</span>
              </div>

              <h1 className="mt-5 text-3xl sm:text-4xl md:text-5xl lg:text-[3.7rem] font-extrabold leading-tight tracking-tight">
                <span className="text-gradient-heading-dark">Auto Leasing New Jersey</span>
              </h1>

              <p className="mt-4 max-w-2xl text-base sm:text-lg md:text-xl leading-relaxed text-white/80">
                Start with your current vehicle, your timing, and the kind of upgrade you want, then narrow the right next lease with less back and forth.
              </p>

              <div className="mt-7 flex flex-col sm:flex-row gap-3">
                <MagneticButton strength={0.35} className="w-full sm:w-auto">
                  <Button asChild size="lg" className="w-full sm:w-auto bg-accent hover:bg-accent/90 text-accent-foreground font-semibold glow-blue">
                    <Link to="/contact" className="inline-flex items-center gap-2">
                      Get Started
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
                  'Start from your current situation',
                  'Compare replacement options',
                  'Move ahead with less back and forth',
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
                  />
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

      <section className="py-16 lg:py-20 section-bg">
        <div className="container mx-auto px-4 lg:px-8">
          <SectionHeading
            title="Frequently Asked Questions"
            subtitle="Answers to common questions about lease timing, upgrades, trade-ins, and getting started in New Jersey."
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
    </Layout>
  );
}
