import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { SEO } from '@/components/SEO';
import { JsonLd, createServiceSchema, createFaqSchema } from '@/components/JsonLd';
import { ServiceHero } from '@/components/services/ServiceHero';
import { RelatedServices } from '@/components/services/RelatedServices';
import { Button } from '@/components/ui/button';
import { ContactForm } from '@/components/forms/ContactForm';
import { motion } from 'framer-motion';
import creditPageHero from '@/assets/credit-services-hero.jpg';
import {
  Check,
  ArrowRight,
  Search,
  ShieldCheck,
  Clock,
  CreditCard,
  FileCheck,
  Banknote,
  Percent,
  Wallet,
  Phone,
  FileText
} from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const leasingSteps = [
  {
    icon: FileText,
    title: "Apply",
    description: "Complete our secure online credit application in minutes. No impact to your score to start."
  },
  {
    icon: Search,
    title: "Match",
    description: "We shop your profile across our network of 30+ lenders to find the best rates."
  },
  {
    icon: FileCheck,
    title: "Review",
    description: "Choose the terms that fit your budget. We explain everything clearly."
  },
  {
    icon: Wallet,
    title: "Drive",
    description: "Finalize the paperwork and drive away. It's that simple."
  }
];



const idealFor = [
  "New York & New Jersey first-time buyers with limited credit history",
  "New York and New Jersey business owners seeking tax advantages",
  "New York & New Jersey drivers looking for the lowest possible monthly car payment",
  "Those in New York or New Jersey rebuilding their credit score"
];

const faqs = [
  { question: "Will checking my options hurt my credit score?", answer: "No. We start with a soft pull so you get clear answers on your options without any impact to your score. A hard inquiry is only needed when you're ready to finalize the loan in New York or New Jersey." },
  { question: "Do you work with bad credit in New York or New Jersey?", answer: "Yes. We have relationships with lenders who specialize in all credit tiers across New York and New Jersey, from Tier 1 excellent credit to actively rebuilding credit profiles. We'll give you clear answers upfront." },
  { question: "Can I finance a lease buyout in New York or New Jersey?", answer: "Absolutely. We specialize in lease buyouts and can often get you better rates than the dealership. Our Springfield, NJ location serves customers throughout New York and New Jersey." },
];

export default function FinancingPage() {

  return (
    <Layout>
      <SEO
        title="Auto Leasing & Credit in New Jersey and New York | Low Monthly Payments | Capital Motor Cars"
        description="Auto leasing and credit options in New Jersey and New York from Capital Motor Cars. Compare low monthly payments, lease buyouts, and credit-friendly approvals."
        seoKeywords={['auto leasing New Jersey', 'auto leasing New York', 'low monthly car payments', 'lease buyout New Jersey', 'Capital Motor Cars leasing']}
        ogImage="https://www.capitalmotorcars.com/og/credit-services-hero.jpg"
        canonicalPath="/services/credit"
      />
      <JsonLd data={[
        createServiceSchema({
          name: "Auto Leasing & Credit Services",
          description: "Fast and transparent leasing and credit solutions with access to 30+ lenders for competitive rates.",
          url: "https://www.capitalmotorcars.com/services/credit"
        }),
        createFaqSchema(faqs),
      ]} />

      {/* Custom Hero Section (Services Style) */}
      <ServiceHero
        badge="New York & New Jersey Auto Leasing & Credit"
        title="Auto Leasing & Credit in New York & New Jersey"
        highlightedTitle=""
        subtitle="Get clear answers and learn about low monthly car payments with our transparent, expert-led leasing process."
        heroImage={creditPageHero}
        primaryAction={{ label: "Start New York & New Jersey Car Lease Application", href: "/contact" }}
        secondaryAction={{ label: "Call Us", href: "tel:+12015095555", icon: Phone }}
      />

      {/* Why lease with us (Benefits Split) */}
      <section className="py-12 md:py-20 w-full  overflow-hidden">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col mb-8 md:mb-16 justify-center items-start md:items-center">
            <span className="text-accent font-black tracking-[0.4em] uppercase text-[10px] mb-2">Benefits</span>
            <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-black dark:text-white uppercase">
              Why Choose <span className="text-accent italic">Capital</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
            {/* Left: The "Why" */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-7 p-10 rounded-[3rem] border-2 border-border/40 dark:border-white/5 bg-muted/10 dark:bg-white/[0.02] relative overflow-hidden"
            >
              <div className="absolute top-[-3%] right-[-10%] md:top-[-4%] md:right-[-5%] p-6 opacity-[0.08] dark:opacity-[0.07] pointer-events-none">
                <Percent className="w-40 h-40 -rotate-12 text-accent" />
              </div>

              <h3 className="text-xs font-black uppercase tracking-[0.4em] text-accent mb-12 flex items-center gap-3">
                <Check className="w-5 h-5" /> The Advantage
              </h3>

              <div className="flex flex-col gap-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                  <div className="flex flex-col gap-4 group">
                    <div className="w-12 h-12 rounded-xl bg-accent/10 text-accent flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Banknote className="w-6 h-6" />
                    </div>
                    <span className="text-lg font-black text-black dark:text-white tracking-tight leading-tight">Competitive New York & New Jersey Rates</span>
                    <p className="text-sm text-muted-foreground">We access wholesale rates from 30+ lenders across New York and New Jersey with clear answers and no surprises.</p>
                  </div>
                  <div className="flex flex-col gap-4 group">
                    <div className="w-12 h-12 rounded-xl bg-accent/10 text-accent flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Clock className="w-6 h-6" />
                    </div>
                    <span className="text-lg font-black text-black dark:text-white tracking-tight leading-tight">Fast, Transparent Approval</span>
                    <p className="text-sm text-muted-foreground">New York & New Jersey drivers get a decision in minutes. We explain every term clearly with no dealer jargon.</p>
                  </div>
                </div>

                {/* Whom is this for */}
                <div className="pt-12 border-t border-border/40 dark:border-white/10">
                  <h3 className="text-xs font-black uppercase tracking-[0.4em] text-accent mb-8 flex items-center gap-3">
                    <CreditCard className="w-5 h-5" /> Who is this for?
                  </h3>
                  <div className="space-y-4">
                    {idealFor.map((ideal, idx) => (
                      <div key={idx} className="flex items-center gap-4 group">
                        <div className="w-1.5 h-1.5 rounded-full bg-accent/40 group-hover:bg-accent transition-colors shrink-0" />
                        <p className="text-lg font-medium text-muted-foreground group-hover:text-foreground transition-colors leading-relaxed">
                          {ideal}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right: What To Expect */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-5 p-10 rounded-[3rem] border-2 border-border/40 dark:border-white/10 bg-muted/10 dark:bg-white/[0.02] backdrop-blur-sm relative overflow-hidden flex flex-col justify-center"
            >
              <div className="absolute top-[-5%] right-[-15%] md:right-[-10%] p-6 opacity-[0.05] dark:opacity-[0.04] pointer-events-none">
                <FileCheck className="w-40 h-40 -rotate-12 text-accent" />
              </div>

              <h3 className="text-xs font-black uppercase tracking-[0.4em] text-accent mb-8 flex items-center gap-3">
                <FileCheck className="w-5 h-5" /> What To Expect
              </h3>

              <ul className="space-y-6">
                {[
                  "No hard credit pull to start, clear answers first",
                  "Plain-English explanation of every term",
                  "30+ lender options across New York & New Jersey",
                  "100% secure, transparent data handling"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-4 group">
                    <div className="shrink-0 w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center mt-1">
                      <Check className="w-4 h-4 text-accent" strokeWidth={3} />
                    </div>
                    <span className="font-bold text-lg text-black dark:text-white group-hover:text-accent transition-colors">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-12 md:py-20 w-full border-t border-border/40 ">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col items-start md:items-center text-left md:text-center mb-8 md:mb-16">
            <span className="text-accent font-black tracking-[0.4em] uppercase text-[10px] mb-2">Process</span>
            <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-black dark:text-white uppercase">Simple <span className="text-accent italic">Leasing</span></h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {leasingSteps.map((step, index) => (
              <div key={index} className="group relative p-10 rounded-[2.5rem] border-2 border-border/60 bg-muted/10 dark:bg-white/[0.03] hover:border-accent transition-all duration-500 overflow-hidden">
                <span className="absolute -right-4 -bottom-4 text-9xl font-black text-black/[0.03] dark:text-white/[0.03] group-hover:text-accent/10 transition-colors leading-none select-none pointer-events-none">
                  {index + 1}
                </span>

                <div className="relative z-10 flex flex-col gap-8">
                  <div className="w-14 h-14 rounded-2xl bg-accent/10 text-accent flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-500">
                    <step.icon className="w-7 h-7" />
                  </div>
                  <div>
                    <h3 className="font-black text-xl uppercase tracking-tighter mb-3 text-black dark:text-white group-hover:text-accent transition-colors">
                      {step.title}
                    </h3>
                    <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground/60 leading-relaxed group-hover:text-muted-foreground transition-colors">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Common Issues (Problem/Solution) */}
      <section className="py-12 md:py-20 ">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col mb-8 md:mb-16 justify-center items-start md:items-center">
            <span className="text-accent font-black tracking-[0.4em] uppercase text-[10px] mb-2">Comparison</span>
            <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-black dark:text-white uppercase">
              Bank vs <span className="text-accent italic">Capital</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* The Old Way */}
            <div className="p-8 md:p-12 rounded-[2.5rem] bg-red-500/5 border-2 border-red-500/10 dark:border-red-500/20">
              <h3 className="text-xl font-black uppercase text-red-500 mb-8 flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-red-500/10 flex items-center justify-center text-sm">✕</span>
                Traditional Bank
              </h3>
              <ul className="space-y-4">
                {[
                  "Limited rate options (one lender)",
                  "Rigid credit requirements",
                  "Slow approval process",
                  "Impersonal service"
                ].map((issue, i) => (
                  <li key={i} className="flex items-start gap-4 text-muted-foreground">
                    <ArrowRight className="w-5 h-5 text-red-500/50 mt-1 shrink-0" />
                    <span>{issue}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* The New Way */}
            <div className="p-8 md:p-12 rounded-[2.5rem] bg-accent/5 border-2 border-accent/20">
              <h3 className="text-xl font-black uppercase text-accent mb-8 flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center text-sm">✓</span>
                Capital Motor Cars
              </h3>
              <ul className="space-y-4">
                {[
                  "Access to 30+ lender rates",
                  "Flexible credit options",
                  "Instant decisions",
                  "Dedicated finance specialist"
                ].map((benefit, i) => (
                  <li key={i} className="flex items-start gap-4 text-foreground font-medium">
                    <Check className="w-5 h-5 text-accent mt-1 shrink-0" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 md:py-20  border-t border-border/40">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col mb-8 md:mb-16 justify-center items-start md:items-center">
            <span className="text-accent font-black tracking-[0.4em] uppercase text-[10px] mb-2">Support</span>
            <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-black dark:text-white uppercase">
              Leasing <span className="text-accent italic">FAQ</span>
            </h2>
          </div>
          <div className="max-w-7xl mx-auto glass-card-theme p-4 md:p-8 mt-12 rounded-[2rem]">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="border-b-border/40 last:border-0">
                  <AccordionTrigger className="text-left text-lg font-bold hover:text-accent transition-colors py-6">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-base pb-6 leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* CTA / Contact Form */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col mb-8 justify-start items-start md:items-center">
            <span className="text-accent font-black tracking-[0.4em] uppercase text-[10px] mb-2">Get Started | New York & New Jersey</span>
            <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-black dark:text-white uppercase">
              Start Your <span className="text-accent italic">Application</span>
            </h2>
            <div className="mt-10 w-full">
              <p className="text-muted-foreground mb-4 text-lg max-w-lg mx-auto">
                New York and New Jersey drivers can get clear answers on auto leasing today. Safe, fast, and no obligation.
              </p>
            </div>
            <div className="w-full max-w-2xl mx-auto">
              <div className="glass-card-theme form-card-theme p-4 sm:p-6 md:p-8 rounded-[2.5rem]">
                <ContactForm
                  source="service"
                  serviceTitle="Auto Leasing & Credit"
                  compact
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <RelatedServices excludeId="credit" />
    </Layout>
  );
}
