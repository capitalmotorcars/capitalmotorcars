import { Link } from 'react-router-dom';
import {
  ArrowRight,
  BadgeDollarSign,
  Building2,
  CarFront,
  CheckCircle2,
  Crown,
  Gem,
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
import luxuryLeasingImage from '@/assets/background-mercedes.jpeg';


const faqs = [
  {
    question: 'What makes luxury car leasing NJ different from a standard lease search?',
    answer: 'Luxury leasing usually puts more focus on the brand, trim, equipment, and lease terms. Most shoppers want the numbers to be clear while the overall process still feels polished.',
  },
  {
    question: 'Which brands are a good fit for luxury leasing?',
    answer: 'BMW, Mercedes-Benz, Audi, Porsche, Range Rover, Lexus, and similar premium brands are all strong fits when model choice and lease terms both matter.',
  },
  {
    question: 'Can I still compare value on a luxury lease?',
    answer: 'Yes. Value still matters on a luxury lease, but it usually comes from the right mix of vehicle, mileage, lease term, due at signing, and monthly payment, not just the lowest number.',
  },
  {
    question: 'Is luxury car leasing NJ a good fit if I want a newer vehicle every few years?',
    answer: 'Yes. Many luxury drivers lease because they want access to newer models, updated technology, and a simpler path into the next vehicle every few years.',
  },
  {
    question: 'Can I request a quote for a specific premium model?',
    answer: 'Yes. If you already know the brand or model you want, we can help narrow the right lease terms and move you toward a more precise quote.',
  },
];

const schemas = [
  createWebPageSchema({
    name: 'Luxury Car Leasing NJ',
    description: 'Luxury car leasing NJ with premium-focused messaging, stronger brand alignment, and a cleaner quote path.',
    url: 'https://www.capitalmotorcars.com/luxury-car-leasing-nj',
  }),
  createServiceSchema({
    name: 'Luxury Car Leasing NJ',
    description: 'Luxury car leasing NJ with premium-focused messaging, stronger brand alignment, and a cleaner quote path.',
    url: 'https://www.capitalmotorcars.com/luxury-car-leasing-nj',
  }),
  createFaqSchema(faqs),
  createBreadcrumbSchema([
    { name: 'Home', url: 'https://www.capitalmotorcars.com/' },
    { name: 'Luxury Car Leasing NJ', url: 'https://www.capitalmotorcars.com/luxury-car-leasing-nj' },
  ]),
];

export default function LuxuryCarLeasingNJPage() {
  return (
    <Layout>
      <SEO
        title="Luxury Car Leasing NJ | Premium Auto Broker | Capital Motor Cars"
        description="Experience premier luxury car leasing in NJ. We negotiate top lease deals on high-end luxury vehicles with white-glove delivery directly to you."
        canonicalPath="/luxury-car-leasing-nj"
        seoKeywords={['luxury car leasing NJ', 'luxury car lease NJ', 'luxury leasing New Jersey', 'premium lease deals NJ', 'high end car lease NJ', 'Capital Motor Cars']}
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
              'radial-gradient(circle at 14% 18%, hsl(var(--accent) / 0.16), transparent 30%), radial-gradient(circle at 82% 20%, hsl(var(--accent) / 0.09), transparent 28%)',
          }}
        />

        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 pt-24 md:pt-28 lg:pt-32 pb-12 md:pb-14 lg:pb-16">
          <div className="grid gap-8 lg:grid-cols-[1fr_1fr] items-center">
            <div className="max-w-3xl">
              <div className="mb-4 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-white/70">
                <Link to="/" className="hover:text-white transition-colors">Home</Link>
                <span className="text-white/30">/</span>
                <span>Luxury Car Leasing NJ</span>
              </div>

              <h1 className="mt-5 text-3xl sm:text-4xl md:text-5xl lg:text-[3.7rem] font-extrabold leading-tight tracking-tight">
                <span className="text-gradient-heading-dark">Luxury Car Leasing NJ</span>
              </h1>

              <p className="mt-4 max-w-2xl text-base sm:text-lg md:text-xl leading-relaxed text-white/80">
                Compare premium brands, review the details that shape the quote, and narrow the exact vehicle and lease terms with more confidence.
              </p>

              <div className="mt-7 flex flex-col sm:flex-row gap-3">
                <MagneticButton strength={0.35} className="w-full sm:w-auto">
                  <Button asChild size="lg" className="w-full sm:w-auto bg-accent hover:bg-accent/90 text-accent-foreground font-semibold glow-blue">
                    <Link to="/contact" className="inline-flex items-center gap-2">
                      Request Luxury Quote
                      <Phone className="h-4 w-4" />
                    </Link>
                  </Button>
                </MagneticButton>
                <MagneticButton strength={0.25} className="w-full sm:w-auto">
                  <Button asChild size="lg" variant="ghost" className="w-full sm:w-auto border border-white/20 bg-white/[0.05] text-white hover:bg-white/[0.1] hover:text-white">
                    <Link to="/brands" className="inline-flex items-center gap-2">
                      Browse Brands
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </MagneticButton>
              </div>

              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                {[
                  'Focus on the right model and trim',
                  'Review the offer clearly',
                  'Keep the numbers easy to review',
                ].map((item, index) => {
                  const icons = [Gem, Sparkles, Star];
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
                    src={luxuryLeasingImage}
                    alt="Luxury car leasing in New Jersey"
                    className="h-[200px] w-full object-cover sm:h-[250px] lg:h-[270px]"
                  />
                </div>

                <div className="mt-3 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-4">
                    <div className="flex items-center gap-2 text-accent">
                      <Building2 className="h-4 w-4" />
                      <span className="text-xs font-bold uppercase tracking-[0.18em]">Brand focus</span>
                    </div>
                    <p className="mt-3 text-lg font-bold text-white">Premium brands</p>
                    <p className="mt-2 text-sm leading-relaxed text-white/70">Compare luxury sedans and SUVs with the brand, trim, and features that match what you really want to drive.</p>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-4">
                    <div className="flex items-center gap-2 text-accent">
                      <BadgeDollarSign className="h-4 w-4" />
                      <span className="text-xs font-bold uppercase tracking-[0.18em]">Offer details</span>
                    </div>
                    <p className="mt-3 text-lg font-bold text-white">Clear numbers</p>
                    <p className="mt-2 text-sm leading-relaxed text-white/70">Review mileage, term, and signing details in a way that stays clear from the first quote onward.</p>
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
            title="Luxury Leasing Calls For More Precision"
            subtitle="Luxury lease decisions usually start with a specific model in mind, then come down to the trim, the equipment, and how the quote is structured."
          />

          <div className="grid gap-4 lg:grid-cols-[1.02fr_0.98fr]">
            <div className="how-it-works-card p-6 md:p-8 lg:p-10">
              <h3 className="text-xl md:text-2xl font-bold text-section">Start with the exact car you want to drive</h3>
              <p className="mt-4 text-section-muted text-base md:text-lg">
                Most luxury shoppers are not starting from scratch. They are usually deciding between a specific sedan or SUV, a preferred trim, and the lease terms that make that vehicle worth moving forward on.
              </p>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {[
                  'Brand preference',
                  'Trim selection',
                  'Mileage structure',
                  'Delivery timing',
                ].map((tag) => (
                  <div key={tag} className="rounded-2xl border border-border dark:border-white/10 bg-background dark:bg-white/[0.04] px-4 py-3 text-sm font-medium text-section-muted">
                    {tag}
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {[
                { icon: Crown, title: 'Model before payment', text: 'Most people looking at luxury car leasing NJ start with a BMW, Mercedes, Audi, Porsche, or Range Rover they already want.' },
                { icon: CarFront, title: 'Trim changes the lease', text: 'Packages, wheels, drivetrain, and interior choices can change both the vehicle and the monthly number more than people expect.' },
                { icon: CheckCircle2, title: 'Quote details still matter', text: 'Mileage, lease term, and due at signing should make sense for the exact vehicle, not just look good in the headline number.', span: 'sm:col-span-2' },
              ].map((item) => (
                <div key={item.title} className={`glass-card-theme p-5 md:p-6 ${item.span ?? ''}`}>
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
            title="What Luxury Lease Shoppers Usually Compare"
            subtitle="Most premium shoppers compare the exact model, the trim, the equipment, and the lease terms before they request a quote."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                icon: Gem,
                title: 'The vehicle itself',
                text: 'The decision usually starts with the model, the trim, and how the car feels for everyday driving.',
              },
              {
                icon: Sparkles,
                title: 'Trim and equipment',
                text: 'Features, interior package, and trim level often matter just as much as the monthly number.',
              },
              {
                icon: BadgeDollarSign,
                title: 'Payment and lease terms',
                text: 'Monthly payment, mileage, and lease length still matter, but they need to match the exact vehicle you want.',
              },
              {
                icon: ShieldCheck,
                title: 'A cleaner quote review',
                text: 'The process should stay calm, responsive, and easy to follow from the first conversation through the quote.',
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
              title="How The Luxury Leasing Process Usually Goes"
              subtitle="Most premium shoppers start with the vehicle, review the details carefully, and then move into the final quote."
              className="mb-8 md:mb-10"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
              {[
                {
                  title: 'Choose the model',
                  description: 'Start with the brand and exact model that fit the way you want to drive and what you want from the vehicle.',
                },
                {
                  title: 'Review the details',
                  description: 'Check trim, lease term, mileage, and signing details so the offer matches the vehicle properly.',
                },
                {
                  title: 'Compare the quote',
                  description: 'Confirm the payment, timing, and overall offer before deciding to move ahead.',
                },
                {
                  title: 'Move ahead with confidence',
                  description: 'Once the quote feels right, move into approval and delivery without extra friction.',
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
            subtitle="Answers to common questions about luxury brands, lease terms, timing, and requesting a quote."
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
              <Crown className="h-4 w-4" />
              Luxury car leasing NJ
            </div>
            <h2 className="mt-5 text-xl sm:text-2xl md:text-4xl font-bold text-heading-cta leading-tight">
              Ready to compare luxury lease options with less noise?
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-sm sm:text-base md:text-lg text-section-muted">
              If you are comparing luxury car leasing NJ options, we can help you narrow the brand, model, and quote details with more confidence.
            </p>
            <div className="mt-7 flex flex-col sm:flex-row justify-center gap-3">
              <MagneticButton strength={0.3}>
                <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground glow-blue w-full sm:w-auto">
                  <Link to="/contact">Request Luxury Quote</Link>
                </Button>
              </MagneticButton>
              <Button asChild size="lg" variant="outline" className="font-semibold w-full sm:w-auto">
                <Link to="/brands">Browse Luxury Brands</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
