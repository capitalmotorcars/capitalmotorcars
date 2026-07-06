import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import type { LucideIcon } from 'lucide-react';
import {
  ArrowRight,
  BadgeDollarSign,
  CheckCircle2,
  Clock3,
  MapPinned,
  Phone,
  ShieldCheck,
  Sparkles,
  Star,
} from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { SEO } from '@/components/SEO';
import {
  JsonLd,
  createBreadcrumbSchema,
  createFaqSchema,
  createServiceSchema,
  createWebPageSchema,
} from '@/components/JsonLd';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Button } from '@/components/ui/button';
import { BackgroundEffects } from '@/components/ui/BackgroundEffects';
import { SectionDividerCreative } from '@/components/ui/SectionDividerCreative';
import { StatCard } from '@/components/ui/StatCard';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { MagneticButton } from '@/components/ui/MagneticButton';

type BulletCard = {
  title: string;
  description: string;
  icon: LucideIcon;
};

type ProcessStep = {
  title: string;
  description: string;
};

type FaqItem = {
  question: string;
  answer: string;
};

export interface LocalLandingPageTemplateProps {
  title: string;
  subtitle: string;
  canonicalPath: string;
  seoKeywords: string[];
  heroImage: string;
  heroImageAlt: string;
  heroBadge: string;
  heroPoints: string[];
  heroStats: { label: string; value: string }[];
  introTitle: string;
  introDescription: string;
  bullets: BulletCard[];
  processTitle: string;
  processDescription: string;
  processSteps: ProcessStep[];
  faqTitle: string;
  faqs: FaqItem[];
}

const heroIcons = [BadgeDollarSign, MapPinned, ShieldCheck];
const promiseIcons = [Sparkles, Clock3, Star];

export function LocalLandingPageTemplate({
  title,
  subtitle,
  canonicalPath,
  seoKeywords,
  heroImage,
  heroImageAlt,
  heroBadge,
  heroPoints,
  heroStats,
  introTitle,
  introDescription,
  bullets,
  processTitle,
  processDescription,
  processSteps,
  faqTitle,
  faqs,
}: LocalLandingPageTemplateProps) {
  const schemas = useMemo(() => {
    const baseUrl = 'https://www.capitalmotorcars.com';
    const pageUrl = `${baseUrl}${canonicalPath}`;

    return [
      createWebPageSchema({
        name: title,
        description: subtitle,
        url: pageUrl,
      }),
      createServiceSchema({
        name: title,
        description: subtitle,
        url: pageUrl,
      }),
      createBreadcrumbSchema([
        { name: 'Home', url: `${baseUrl}/` },
        { name: title, url: pageUrl },
      ]),
      createFaqSchema(faqs),
    ];
  }, [canonicalPath, faqs, subtitle, title]);

  const keywordTags = seoKeywords.slice(0, 8);
  const marketCards = heroPoints.slice(0, 3);
  const promiseCards = [
    'Cleaner structure for local SEO intent',
    'Landing-page pacing inspired by the homepage',
    'Balanced light and dark theme presentation',
  ];

  return (
    <Layout>
      <SEO
        title={`${title} | Capital Motor Cars`}
        description={subtitle}
        canonicalPath={canonicalPath}
        seoKeywords={seoKeywords}
        ogType="website"
      />
      <JsonLd data={schemas} />

      <section className="relative overflow-hidden bg-[hsl(var(--hero-bg))] text-white">
        <BackgroundEffects />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(circle at 16% 20%, hsl(var(--accent) / 0.18), transparent 30%), radial-gradient(circle at 82% 24%, hsl(var(--accent) / 0.1), transparent 28%)',
          }}
        />

        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 pt-28 md:pt-32 lg:pt-36 pb-14 md:pb-20 lg:pb-24">
          <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="max-w-3xl">
              <div className="mb-5 flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-white/70">
                <Link to="/" className="hover:text-white transition-colors">
                  Home
                </Link>
                <span className="text-white/30">/</span>
                <span>{title}</span>
              </div>

              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-[11px] font-black uppercase tracking-[0.24em] text-white/80 shadow-[0_0_30px_rgba(59,130,246,0.12)] backdrop-blur-sm">
                <Sparkles className="h-4 w-4 text-accent" />
                {heroBadge}
              </div>

              <h1 className="mt-6 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight">
                <span className="text-gradient-heading-dark">{title}</span>
              </h1>

              <p className="mt-5 max-w-2xl text-base sm:text-lg md:text-xl leading-relaxed text-white/80">
                {subtitle}
              </p>

              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <MagneticButton strength={0.35} className="w-full sm:w-auto">
                  <Button
                    asChild
                    size="lg"
                    className="w-full sm:w-auto bg-accent hover:bg-accent/90 text-accent-foreground font-semibold glow-blue"
                  >
                    <Link to="/contact" className="inline-flex items-center gap-2">
                      Request a Quote
                      <Phone className="h-4 w-4" />
                    </Link>
                  </Button>
                </MagneticButton>

                <MagneticButton strength={0.25} className="w-full sm:w-auto">
                  <Button
                    asChild
                    size="lg"
                    variant="ghost"
                    className="w-full sm:w-auto border border-white/20 bg-white/[0.05] text-white hover:bg-white/[0.1] hover:text-white"
                  >
                    <Link to="/quiz" className="inline-flex items-center gap-2">
                      Start Vehicle Quiz
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </MagneticButton>
              </div>

              <div className="mt-10 grid gap-3 sm:grid-cols-3">
                {marketCards.map((point, index) => {
                  const Icon = heroIcons[index] || Sparkles;
                  return (
                    <div
                      key={point}
                      className="rounded-2xl border border-white/10 bg-white/[0.05] p-4 backdrop-blur-sm shadow-[0_10px_30px_rgba(0,0,0,0.18)]"
                    >
                      <Icon className="mb-3 h-5 w-5 text-accent" />
                      <p className="text-sm leading-relaxed text-white/78">{point}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-4 rounded-[2.5rem] bg-accent/15 blur-3xl opacity-60" aria-hidden />
              <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] p-4 shadow-[0_24px_80px_rgba(0,0,0,0.35)] backdrop-blur-sm">
                <div className="overflow-hidden rounded-[1.5rem] border border-white/10 bg-black/20">
                  <img
                    src={heroImage}
                    alt={heroImageAlt}
                    className="h-[260px] w-full object-cover sm:h-[340px] lg:h-[460px]"
                    fetchpriority="high"
                  />
                </div>

                <div className="mt-4 grid grid-cols-3 gap-3">
                  {heroStats.map((stat) => (
                    <div
                      key={stat.label + stat.value}
                      className="rounded-2xl border border-white/10 bg-white/[0.05] px-3 py-4 text-center"
                    >
                      <div className="text-lg sm:text-xl font-bold text-white">{stat.value}</div>
                      <div className="mt-1 text-[11px] uppercase tracking-[0.16em] text-white/55">{stat.label}</div>
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
            title={introTitle}
            subtitle={introDescription}
          />

          <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] items-start">
            <div className="how-it-works-card p-6 md:p-8 lg:p-10">
              <h3 className="text-xl md:text-2xl font-bold text-section">
                Landing-page structure that matches the core site
              </h3>
              <p className="mt-4 text-section-muted text-base md:text-lg">
                These local pages now follow the same visual rhythm as the main landing page: stronger hierarchy, better spacing, cleaner cards, and clearer calls to action.
              </p>

              <div className="mt-6 flex flex-wrap gap-2.5">
                {keywordTags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-border dark:border-white/10 bg-background dark:bg-white/[0.04] px-3 py-2 text-xs sm:text-sm font-medium text-section-muted"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <Button asChild className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold">
                  <Link to="/contact">Talk to Our Team</Link>
                </Button>
                <Button asChild variant="outline" className="font-semibold">
                  <Link to="/services">Explore Services</Link>
                </Button>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
              {promiseCards.map((item, index) => {
                const Icon = promiseIcons[index] || Sparkles;
                return (
                  <div
                    key={item}
                    className="glass-card-theme p-5 md:p-6"
                  >
                    <Icon className="mb-3 h-5 w-5 text-accent" />
                    <p className="text-sm md:text-base leading-relaxed text-section-muted">{item}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <SectionDividerCreative variant="dot" />

      <section className="relative py-16 lg:py-20 overflow-hidden">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(100%,760px)] h-[440px] pointer-events-none"
          aria-hidden
        >
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background:
                'radial-gradient(ellipse 70% 60% at 50% 50%, hsl(var(--accent) / 0.08) 0%, hsl(var(--accent) / 0.03) 52%, transparent 76%)',
              filter: 'blur(50px)',
            }}
          />
        </div>

        <div className="container relative mx-auto px-4 lg:px-8">
          <SectionHeading
            title="What Local Shoppers Care About"
            subtitle="The content is shaped around local leasing intent, clear offer language, and the exact questions people ask before they convert."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {bullets.map((bullet) => {
              const Icon = bullet.icon;

              return (
                <article
                  key={bullet.title}
                  className="group rounded-[2rem] border border-border dark:border-white/10 bg-card dark:bg-white/[0.04] p-6 md:p-7 shadow-sm transition-all duration-300 hover:border-accent/40 hover:shadow-[0_18px_60px_-24px_rgba(59,130,246,0.35)]"
                >
                  <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-accent/10 text-accent transition-transform duration-300 group-hover:scale-105">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-section">{bullet.title}</h3>
                  <p className="mt-3 text-section-muted leading-relaxed text-sm md:text-base">{bullet.description}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <SectionDividerCreative variant="dot" />

      <section className="py-16 lg:py-20 section-bg-alt">
        <div className="container mx-auto px-4 lg:px-8">
          <SectionHeading
            title="Search Themes This Page Supports"
            subtitle="The page content is intentionally aligned with the local search language people use when comparing leasing options."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
            {keywordTags.slice(0, 4).map((tag, index) => (
              <div key={tag} className="glass-card-theme p-5 md:p-6 h-full">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-accent text-accent-foreground font-bold">
                  {index + 1}
                </div>
                <h3 className="text-base md:text-lg font-bold text-section">{tag}</h3>
                <p className="mt-2 text-sm leading-relaxed text-section-muted">
                  Cleaner content structure, stronger CTA flow, and a more homepage-like presentation for this local keyword theme.
                </p>
              </div>
            ))}
          </div>

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
            {heroStats.map((stat) => (
              <StatCard
                key={stat.label + stat.value}
                value={stat.value}
                label={stat.label}
                className="h-full"
              />
            ))}
          </div>
        </div>
      </section>

      <SectionDividerCreative variant="dot" />

      <section className="py-16 lg:py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="how-it-works-card p-6 md:p-8 lg:p-10 xl:p-12">
            <SectionHeading
              title={processTitle}
              subtitle={processDescription}
              className="mb-8 md:mb-10"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
              {processSteps.map((step, index) => (
                <article
                  key={step.title}
                  className="rounded-[1.75rem] border border-border dark:border-white/10 bg-background dark:bg-white/[0.04] p-5 md:p-6"
                >
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

      <SectionDividerCreative variant="dot" />

      <section className="py-16 lg:py-20 section-bg">
        <div className="container mx-auto px-4 lg:px-8">
          <SectionHeading
            title={faqTitle}
            subtitle="Straight answers presented in the same polished style as the rest of the page."
          />

          <div className="max-w-4xl mx-auto glass-card-theme p-3 sm:p-4 md:p-6">
            <Accordion
              type="single"
              collapsible
              className="w-full [&_[data-state=open]]:text-section [&_button]:text-section [&_button:hover]:text-section [&_.text-muted-foreground]:text-section-muted"
            >
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={faq.question}
                  value={`faq-${index}`}
                  className="border-border dark:border-white/10 px-3 sm:px-4 md:px-5"
                >
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

      <SectionDividerCreative variant="dot" />

      <section className="py-16 lg:py-20 px-4 md:px-0">
        <div className="container mx-auto px-0 lg:px-8">
          <div className="how-it-works-card p-8 md:p-10 lg:p-12 mx-auto max-w-4xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-accent/10 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-accent">
              <Sparkles className="h-4 w-4" />
              Local page polished for conversion
            </div>

            <h2 className="mt-5 text-xl sm:text-2xl md:text-4xl font-bold text-heading-cta leading-tight">
              Ready to turn this local search into a real quote?
            </h2>

            <p className="mt-4 max-w-2xl mx-auto text-sm sm:text-base md:text-lg text-section-muted">
              We can help with pricing clarity, next steps, and a smoother leasing experience without the usual dealership friction.
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

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3 text-left">
              {[
                'Better structure for local intent',
                'Cleaner section pacing across devices',
                'Light and dark mode tuned to match the site',
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-border dark:border-white/10 bg-background dark:bg-white/[0.04] px-4 py-4 text-sm text-section-muted"
                >
                  <CheckCircle2 className="mb-2 h-5 w-5 text-accent" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
