import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { SEO } from '@/components/SEO';
import { JsonLd, createFaqSchema, createServiceSchema, createHowToSchema } from '@/components/JsonLd';
import { ServiceHero } from '@/components/services/ServiceHero';
import { RelatedServices } from '@/components/services/RelatedServices';
import { Button } from '@/components/ui/button';
import { ContactForm } from '@/components/forms/ContactForm';
import { motion } from 'framer-motion';
import heroBg from '@/assets/car-leasing.jpg';
import {
  Check,
  ArrowRight,
  Car,
  ShieldCheck,
  Clock,
  CreditCard,
  Search,
  FileCheck,
  PenTool,
  Key,
  ChevronDown,
  Phone
} from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';


const leasingSteps = [
  {
    icon: Search,
    title: "Tell Us",
    description: "Share your preferences and budget. We'll handle the search across our network."
  },
  {
    icon: Search, // Reusing search or maybe FileSearch
    title: "Search",
    description: "We locate the best available leasing options and negotiate the terms for you."
  },
  {
    icon: FileCheck,
    title: "Review",
    description: "We present transparent options. No hidden fees, just clear numbers."
  },
  {
    icon: Key,
    title: "Drive",
    description: "We coordinate delivery to your door. Sign the papers and enjoy your new car."
  }
];

const benefits = [
  "No dealership visits required",
  "Transparent pricing upfront",
  "30+ years of industry experience",
  "Access to all makes and models"
];

const idealFor = [
  "Customers who prefer a guided, hassle free process",
  "Those who want to avoid dealing with multiple dealerships",
  "Drivers who value predictable monthly costs",
  "Anyone looking for a simpler leasing experience"
];

const faqs = [
  { question: "How long does it typically take?", answer: "It depends on the vehicle availability and your requirements, but we strive to keep things efficient and predictable. Often we can have a car to you within 24-48 hours of locating it." },
  { question: "Do I need to deal with dealerships myself?", answer: "In most cases, no. We handle the coordination, negotiation, and paperwork. You just sign and drive." },
  { question: "Is there a commitment to move forward?", answer: "No. It starts with a conversation. We only proceed when you're happy with the terms we've found." },
];

export default function CarLeasingPage() {

  return (
    <Layout>
      <SEO
        title="Car Leasing, Auto Leasing & Car Lease Deals in New Jersey & New York | Capital Motor Cars"
        description="Car leasing, auto leasing, car lease deals, monthly car lease deals, and luxury car leasing in New Jersey and New York from Capital Motor Cars."
        seoKeywords={['car leasing New Jersey', 'auto leasing NY', 'car lease deals NJ', 'zero down lease NY', 'Capital Motor Cars leasing']}
        ogImage="https://www.capitalmotorcars.com/og/car-leasing.jpg"
        canonicalPath="/services/car-leasing"
      />
      <JsonLd data={[
        createServiceSchema({
          name: "Car Leasing Services",
          description: "Professional car leasing negotiation and coordination services. We handle the dealerships so you don't have to.",
          url: "https://www.capitalmotorcars.com/services/car-leasing"
        }),
        createFaqSchema(faqs),
        createHowToSchema({
          name: "How to Lease a Car with Capital Motor Cars",
          description: "Get your next car lease in 4 simple steps. No dealership visits required.",
          steps: [
            { name: "Tell Us Your Preferences", text: "Share your vehicle preferences, mileage needs, and monthly budget. We handle the search across our network so you don't have to visit dealerships." },
            { name: "We Search & Negotiate", text: "Our team locates the best available leasing options and negotiates directly with dealers on your behalf to secure competitive terms." },
            { name: "Review Transparent Options", text: "We present clear, itemized lease options with no hidden fees, just straightforward numbers so you can compare confidently." },
            { name: "Sign & Drive", text: "We coordinate vehicle delivery directly to your door. Sign the paperwork and enjoy your new car." },
          ],
        }),
      ]} />

      {/* Custom Hero Section (Services Style) */}
      <ServiceHero
        badge="Leasing Made Simple"
        title="Car Leasing, Auto Leasing & Car Lease Deals in New Jersey & New York | Capital Motor Cars"
        highlightedTitle=""
        subtitle="Securing a car lease in NJ or NY has never been easier. We find the model, negotiate terms, and deliver directly with best car lease deals, monthly car lease deals, and zero down options available in NJ. Call Now!"
        heroImage={heroBg}
        primaryAction={{ label: "Start Credit Application", href: "/credit-application" }}
        secondaryAction={{ label: "Call Us", href: "tel:+12015095555", icon: Phone }}
      />

      {/* Why Lease With Us (Benefits Split) */}
      <section className="py-12 md:py-20 w-full  overflow-hidden">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col mb-8 md:mb-16 justify-center items-start md:items-center">
            <span className="text-accent font-black tracking-[0.4em] uppercase text-[10px] mb-2">Benefits</span>
            <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-black dark:text-white uppercase">
              Why Choose <span className="text-accent italic">Capital Motor Cars</span>
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
                <Check className="w-40 h-40 -rotate-12 text-accent" />
              </div>

              <h3 className="text-xs font-black uppercase tracking-[0.4em] text-accent mb-12 flex items-center gap-3">
                <Check className="w-5 h-5" /> The Advantage
              </h3>

              <div className="flex flex-col gap-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                  <div className="flex flex-col gap-4 group">
                    <div className="w-12 h-12 rounded-xl bg-accent/10 text-accent flex items-center justify-center group-hover:scale-110 transition-transform">
                      <ShieldCheck className="w-6 h-6" />
                    </div>
                    <span className="text-lg font-black text-black dark:text-white tracking-tight leading-tight">No Hidden Fees</span>
                    <p className="text-sm text-muted-foreground">We believe in transparent pricing. The price you see is the price you pay.</p>
                  </div>
                  <div className="flex flex-col gap-4 group">
                    <div className="w-12 h-12 rounded-xl bg-accent/10 text-accent flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Clock className="w-6 h-6" />
                    </div>
                    <span className="text-lg font-black text-black dark:text-white tracking-tight leading-tight">Save Time</span>
                    <p className="text-sm text-muted-foreground">Skip the dealership visits. We handle the negotiations and paperwork for you.</p>
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
                  "Direct answers to your questions",
                  "Clear recommendations based on your needs",
                  "Ongoing communication throughout the process",
                  "A process that actually moves forward"
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

      {/* Process Section (Reuse Simple Leasing Style) */}
      <section className="py-12 md:py-20 w-full  border-t border-border/40  ">
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
      <section className="py-12 md:py-20  ">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col mb-8 md:mb-16 justify-center items-start md:items-center">
            <span className="text-accent font-black tracking-[0.4em] uppercase text-[10px] mb-2">Comparison</span>
            <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-black dark:text-white uppercase">
              Used To Be <span className="text-accent italic">Hard</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* The Old Way */}
            <div className="p-8 md:p-12 rounded-[2.5rem] bg-red-500/5 border-2 border-red-500/10 dark:border-red-500/20">
              <h3 className="text-xl font-black uppercase text-red-500 mb-8 flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-red-500/10 flex items-center justify-center text-sm">✕</span>
                The Old Way
              </h3>
              <ul className="space-y-4">
                {[
                  "Unclear options and pricing",
                  "Time consuming negotiation",
                  "Unexpected costs at signing",
                  "Complications at lease end"
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
                The Capital Way
              </h3>
              <ul className="space-y-4">
                {[
                  "Transparent, upfront pricing",
                  "We handle the negotiation",
                  "No hidden dealership fees",
                  "Guided lease end process"
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
      <section className=" py-12 md:py-20  border-t border-border/40">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col mb-8 md:mb-16 justify-center items-start md:items-center">
            <span className="text-accent font-black tracking-[0.4em] uppercase text-[10px] mb-2">Support</span>
            <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-black dark:text-white uppercase">
              Frequently Asked <span className="text-accent italic">Questions</span>
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
      <section className="py-12 md:py-20 ">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col mb-8  justify-center items-start md:items-center">
            <span className="text-accent font-black tracking-[0.4em] uppercase text-[10px] mb-2">Get Started</span>
            <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-black dark:text-white uppercase">
              Ready To <span className="text-accent italic">Lease?</span>
            </h2>
            <div className="mt-10 w-full">
              <p className="text-muted-foreground mb-4 text-lg max-w-lg mx-auto">
                Let us find the perfect car for you. No stress, no hassle.
              </p>
            </div>
            <div className="w-full max-w-2xl mx-auto  ">
              <div className="glass-card-theme form-card-theme p-4 sm:p-6 md:p-8 rounded-[2.5rem]">
                <ContactForm
                  source="service"
                  serviceTitle="Car Leasing"
                  compact
                />
              </div>
            </div></div>
        </div>
      </section>

      <RelatedServices excludeId="car-leasing" />
    </Layout>
  );
}
