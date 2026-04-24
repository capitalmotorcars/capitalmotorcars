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
  CircleDot,
  Search,
  Wrench,
  ShieldCheck,
  TrendingUp,
  Droplets,
  Zap,
  Phone,
  Settings,
  Sparkles
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
    title: "Analyze",
    description: "We inspect the wheel for structural integrity and surface damage depth."
  },
  {
    icon: Settings,
    title: "Prep",
    description: "Deep cleaning and precision sanding to remove all oxidation and debris."
  },
  {
    icon: Droplets,
    title: "Refinish",
    description: "Multi stage painting and clear coating to match your exact factory finish."
  },
  {
    icon: Sparkles,
    title: "Polish",
    description: "High speed buffing and final quality check for a showroom shine."
  }
];

const idealFor = [
  "Drivers with curb scraped alloy or painted wheels",
  "Vehicles with bent or slightly out of round rims",
  "Older wheels suffering from paint oxidation or peeling",
  "Anyone looking to maximize trade in or resale value"
];

const faqs = [
  { question: "Can you fix bent or cracked wheels?", answer: "We can fix most minor bends and structural issues. However, if a wheel is severely cracked or safety is compromised, we will recommend a replacement for your protection." },
  { question: "Will the color match my other wheels?", answer: "Yes. We use advanced color-matching technology to ensure the refinished wheel perfectly blends with your existing set, including specialized finishes like hyper-silver or matte." },
  { question: "How long does a typical repair take?", answer: "Most cosmetic wheel repairs can be completed in 24-48 hours. If we are coordinating pickup and delivery, we strive to minimize your vehicle's downtime." },
];

export default function WheelRepairPage() {

  return (
    <Layout>
      <SEO
        title="Wheel & Rim Repair Services in New Jersey & New York | Capital Motor Cars"
        description="Wheel and rim repair in New Jersey and New York from Capital Motor Cars. Fix curb rash, bends, and lease return wheel damage."
        seoKeywords={['wheel repair New Jersey', 'wheel repair New York', 'rim repair NJ', 'curb rash repair NY', 'Capital Motor Cars wheel repair']}
        ogImage="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1200&q=60"
        canonicalPath="/services/wheel-repair"
      />
      <JsonLd data={createServiceSchema({
        name: "Professional Wheel & Rim Repair",
        description: "Expert restoration of damaged wheels and rims, including curb rash repair and factory refinishing.",
        url: "https://capitalmotorcars.com/services/wheel-repair"
      })} />

      {/* Custom Hero Section (Services Style) */}
      <ServiceHero
        badge="Expert Restoration"
        title="Wheel & Rim Repair Services in New Jersey & New York | Capital Motor Cars"
        highlightedTitle=""
        subtitle="Avoid expensive lease return penalties with professional wheel and rim repair in New Jersey & New York. We fix curb rash quickly and affordably. Get a Free Estimate!"
        heroImage="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1200&q=60"
        primaryAction={{ label: "Book Repair", href: "/contact" }}
        secondaryAction={{ label: "Call Us", href: "tel:+12015095555", icon: Phone }}
      />

      {/* Why Restore Wheels (Benefits Split) */}
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
                <Droplets className="w-40 h-40 -rotate-12 text-accent" />
              </div>

              <h3 className="text-xs font-black uppercase tracking-[0.4em] text-accent mb-12 flex items-center gap-3">
                <Check className="w-5 h-5" /> The Advantage
              </h3>

              <div className="flex flex-col gap-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                  <div className="flex flex-col gap-4 group">
                    <div className="w-12 h-12 rounded-xl bg-accent/10 text-accent flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Zap className="w-6 h-6" />
                    </div>
                    <span className="text-lg font-black text-black dark:text-white tracking-tight leading-tight">Curb Rash Erased</span>
                    <p className="text-sm text-muted-foreground">Expertly remove scrapes and gashes that ruin your vehicle's profile.</p>
                  </div>
                  <div className="flex flex-col gap-4 group">
                    <div className="w-12 h-12 rounded-xl bg-accent/10 text-accent flex items-center justify-center group-hover:scale-110 transition-transform">
                      <TrendingUp className="w-6 h-6" />
                    </div>
                    <span className="text-lg font-black text-black dark:text-white tracking-tight leading-tight">Preserve Value</span>
                    <p className="text-sm text-muted-foreground">Flawless wheels significantly increase your car's retail and trade in value.</p>
                  </div>
                </div>

                {/* Whom is this for */}
                <div className="pt-12 border-t border-border/40 dark:border-white/10">
                  <h3 className="text-xs font-black uppercase tracking-[0.4em] text-accent mb-8 flex items-center gap-3">
                    <CircleDot className="w-5 h-5" /> Who is this for?
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
                <ShieldCheck className="w-40 h-40 -rotate-12 text-accent" />
              </div>

              <h3 className="text-xs font-black uppercase tracking-[0.4em] text-accent mb-8 flex items-center gap-3">
                <ShieldCheck className="w-5 h-5" /> What To Expect
              </h3>

              <ul className="space-y-6">
                {[
                  "Factory color matching",
                  "Structural safety check",
                  "Clear coat protection",
                  "Fast turnaround times"
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
            <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-black dark:text-white uppercase">Simple <span className="text-accent italic">Restoration</span></h2>
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
              Scuffed vs <span className="text-accent italic">Showroom</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* The Old Way */}
            <div className="p-8 md:p-12 rounded-[2.5rem] bg-red-500/5 border-2 border-red-500/10 dark:border-red-500/20">
              <h3 className="text-xl font-black uppercase text-red-500 mb-8 flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-red-500/10 flex items-center justify-center text-sm">✕</span>
                Damaged Wheels
              </h3>
              <ul className="space-y-4">
                {[
                  "Unsightly 'curb rash' scrapes",
                  "Corrosion from road salt/debris",
                  "Vibrations and alignment issues",
                  "Reduced vehicle resale appeal"
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
                  "Pristine factory restoration",
                  "Durable protective clear coat",
                  "Precision balance & alignment",
                  "Maximum resale/trade-in value"
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
              Repair <span className="text-accent italic">FAQ</span>
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
            <span className="text-accent font-black tracking-[0.4em] uppercase text-[10px] mb-2">Get Started</span>
            <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-black dark:text-white uppercase">
              Book Your <span className="text-accent italic">Repair</span>
            </h2>
            <div className="mt-10 w-full">
              <p className="text-muted-foreground mb-4 text-lg max-w-lg mx-auto">
                Restore your wheels to perfection. Quality you can see.
              </p>
            </div>
            <div className="w-full max-w-2xl mx-auto">
              <div className="glass-card-theme form-card-theme p-4 sm:p-6 md:p-8 rounded-[2.5rem]">
                <ContactForm
                  source="service"
                  serviceTitle="Wheel Repair"
                  compact
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <RelatedServices excludeId="wheel-repair" />
    </Layout>
  );
}
