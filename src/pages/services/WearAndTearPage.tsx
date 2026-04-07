import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { SEO } from '@/components/SEO';
import { JsonLd, createServiceSchema } from '@/components/JsonLd';
import { ServiceHero } from '@/components/services/ServiceHero';
import { RelatedServices } from '@/components/services/RelatedServices';
import { Button } from '@/components/ui/button';
import { ContactForm } from '@/components/forms/ContactForm';
import { motion } from 'framer-motion';
import {
  Check,
  ArrowRight,
  Wrench,
  Search,
  ShieldCheck,
  Car,
  AlertTriangle,
  FileCheck,
  Key,
  Phone
} from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const repairSteps = [
  {
    icon: Search,
    title: "Assess",
    description: "We give you clear answers: a full review of your vehicle for New York & New Jersey lease-end charges before the bank ever inspects it."
  },
  {
    icon: Wrench,
    title: "Repair",
    description: "Our trusted New York & New Jersey network fixes dents, scratches, and wheel damage at fair, published prices — no surprises."
  },
  {
    icon: FileCheck,
    title: "Verify",
    description: "We confirm all repairs meet each bank\'s return standards so you get clear answers before handing over the keys."
  },
  {
    icon: Key,
    title: "Return",
    description: "Return your vehicle in New York or New Jersey with complete confidence and zero unexpected bills."
  }
];

const idealFor = [
  "New York & New Jersey drivers with visible bumper scuffs or dents",
  "New York and New Jersey lease returns with 'curb rashed' wheels",
  "Anyone in New York & New Jersey worried about strict dealer inspections",
  "High mileage New York & New Jersey drivers looking to minimize fees"
];

const faqs = [
  { question: "What counts as 'excess' wear and tear in New York & New Jersey?", answer: "Banks in New York and New Jersey typically charge for scratches over a credit-card size, tires with low tread, windshield cracks, and stains. We give you clear answers by knowing each lender's specific scorecard before you return." },
  { question: "Is it cheaper to fix it myself before turning in New York or New Jersey?", answer: "Almost always. Dealerships in New York & New Jersey charge premium rates at return. Our local network offers competitive, transparent pricing so you know every cost upfront — no surprises." },
  { question: "Do you handle wheel repair across New York and New Jersey?", answer: "Yes. Wheel curb rash is one of the most common lease penalties in New York & New Jersey. We can restore wheels to like-new condition for a fraction of the replacement cost and give you a clear price before we start." },
];

export default function WearAndTearPage() {

  return (
    <Layout>
      <SEO
        title="Lease Protection New York & New Jersey | Wear & Tear Repair | Capital Motor Cars"
        description="Returning a lease in New York or New Jersey? Get clear answers on wear and tear charges. Capital Motor Cars handles pre-inspection and affordable repairs across New York & New Jersey before you turn in."
        seoKeywords={['lease return repair NJ', 'New York wear and tear lease', 'end of lease inspection NJ', 'transparent lease protection', 'Springfield NJ car leasing']}
        ogImage="https://images.unsplash.com/photo-1487754180451-c456f719a1fc?auto=format&fit=crop&w=1200&q=60"
        canonicalPath="/services/wear-and-tear"
      />
      <JsonLd data={createServiceSchema({
        name: "Lease Return Wear & Tear Repair",
        description: "Pre-inspection and coordination of repairs to minimize lease-end penalties and fees.",
        url: "https://capitalmotorcars.com/services/wear-and-tear"
      })} />

      {/* Custom Hero Section (Services Style) */}
      <ServiceHero
        badge="New York & New Jersey Lease Protection"
        title="Lease Protection in New York & New Jersey"
        highlightedTitle=""
        subtitle="Get clear answers on wear and tear charges before the bank does. Affordable, transparent repairs across New York & New Jersey so you return with confidence."
        heroImage="https://images.unsplash.com/photo-1487754180451-c456f719a1fc?auto=format&fit=crop&w=1200&q=60"
        primaryAction={{ label: "Start New York & New Jersey Car Lease Protection", href: "/contact" }}
        secondaryAction={{ label: "Call Us", href: "tel:201-555-0123", icon: Phone }}
      />

      {/* Why Choose Repairs (Benefits Split) */}
      <section className="py-12 md:py-20 w-full overflow-hidden">
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
                <ShieldCheck className="w-40 h-40 -rotate-12 text-accent" />
              </div>

              <h3 className="text-xs font-black uppercase tracking-[0.4em] text-accent mb-12 flex items-center gap-3">
                <Check className="w-5 h-5" /> The Advantage
              </h3>

              <div className="flex flex-col gap-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                  <div className="flex flex-col gap-4 group">
                    <div className="w-12 h-12 rounded-xl bg-accent/10 text-accent flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Wrench className="w-6 h-6" />
                    </div>
                    <span className="text-lg font-black text-black dark:text-white tracking-tight leading-tight">Expert New York & New Jersey Repair</span>
                    <p className="text-sm text-muted-foreground">Certified technicians who know exactly what New York and New Jersey lease inspectors look for — clear answers before and after every repair.</p>
                  </div>
                  <div className="flex flex-col gap-4 group">
                    <div className="w-12 h-12 rounded-xl bg-accent/10 text-accent flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Search className="w-6 h-6" />
                    </div>
                    <span className="text-lg font-black text-black dark:text-white tracking-tight leading-tight">Transparent Pre-Inspection</span>
                    <p className="text-sm text-muted-foreground">We identify issues early across New York & New Jersey so you're never hit with an unexpected bill at turn-in.</p>
                  </div>
                </div>

                {/* Whom is this for */}
                <div className="pt-12 border-t border-border/40 dark:border-white/10">
                  <h3 className="text-xs font-black uppercase tracking-[0.4em] text-accent mb-8 flex items-center gap-3">
                    <Car className="w-5 h-5" /> Who is this for?
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
                  "Clear, upfront damage assessment for New York & New Jersey",
                  "Transparent, cost-effective repair options",
                  "Direct coordination with local New York & New Jersey body shops",
                  "Stress-free return prep — clear answers guaranteed"
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
      <section className="py-12 md:py-20 w-full border-t border-border/40">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col items-start md:items-center text-left md:text-center mb-8 md:mb-16">
            <span className="text-accent font-black tracking-[0.4em] uppercase text-[10px] mb-2">Process</span>
            <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-black dark:text-white uppercase">Simple <span className="text-accent italic">Protection</span></h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {repairSteps.map((step, index) => (
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
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col mb-8 md:mb-16 justify-center items-start md:items-center">
            <span className="text-accent font-black tracking-[0.4em] uppercase text-[10px] mb-2">Comparison</span>
            <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-black dark:text-white uppercase">
              Returned <span className="text-accent italic">As-Is</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* The Old Way */}
            <div className="p-8 md:p-12 rounded-[2.5rem] bg-red-500/5 border-2 border-red-500/10 dark:border-red-500/20">
              <h3 className="text-xl font-black uppercase text-red-500 mb-8 flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-red-500/10 flex items-center justify-center text-sm">✕</span>
                Without Protection
              </h3>
              <ul className="space-y-4">
                {[
                  "Excessive per charge fees",
                  "No chance to shop for repairs",
                  "Strict, unforgiving inspection",
                  "Unexpected bill weeks later"
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
                  "Repairs at wholesale cost",
                  "Knowledge of bank standards",
                  "Fix only what's necessary",
                  "Peace of mind at turn-in"
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
      <section className="py-12 md:py-20 border-t border-border/40">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col mb-8 md:mb-16 justify-center items-start md:items-center">
            <span className="text-accent font-black tracking-[0.4em] uppercase text-[10px] mb-2">Support</span>
            <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-black dark:text-white uppercase">
              Protection <span className="text-accent italic">FAQ</span>
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
            <span className="text-accent font-black tracking-[0.4em] uppercase text-[10px] mb-2">Get Protected — New York & New Jersey</span>
            <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-black dark:text-white uppercase">
              Start Your <span className="text-accent italic">Protection</span>
            </h2>
            <div className="mt-10 w-full">
              <p className="text-muted-foreground mb-4 text-lg max-w-lg mx-auto">
                New York and New Jersey drivers — get clear answers on your lease return. Don't overpay at the dealership.
              </p>
            </div>
            <div className="w-full max-w-2xl mx-auto">
              <div className="glass-card-theme form-card-theme p-4 sm:p-6 md:p-8 rounded-[2.5rem]">
                <ContactForm
                  source="service"
                  serviceTitle="Wear & Tear Repair"
                  compact
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <RelatedServices excludeId="wear-and-tear" />
    </Layout>
  );
}
