import { Link } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { SEO } from '@/components/SEO';
import { JsonLd, createServiceSchema, createFaqSchema, createHowToSchema } from '@/components/JsonLd';
import { ServiceHero } from '@/components/services/ServiceHero';
import { RelatedServices } from '@/components/services/RelatedServices';
import { ContactForm } from '@/components/forms/ContactForm';
import { motion } from 'framer-motion';
import {
  Check,
  ArrowRight,
  ClipboardList,
  Search,
  ShieldCheck,
  Car,
  FileCheck,
  Key,
  Phone,
  AlertTriangle,
} from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const returnSteps = [
  {
    icon: Search,
    title: 'Pre-Inspect',
    description: 'Schedule a free pre-return inspection before the bank sends their inspector. Know every chargeable item in advance so there are no surprises.',
  },
  {
    icon: ClipboardList,
    title: 'Review Fees',
    description: 'We walk through every line item: disposition fee, excess mileage rate, and any wear and tear findings. You see the full picture before you return.',
  },
  {
    icon: ShieldCheck,
    title: 'Repair if Needed',
    description: 'Fix only what matters. Our NJ network handles dents, scratches, and wheel rash at wholesale rates, saving you money versus dealer charges.',
  },
  {
    icon: Key,
    title: 'Return Clean',
    description: 'Hand back the keys with confidence. No unexpected bills, no disputes, no surprise charges arriving weeks later.',
  },
];

const feeTable = [
  { brand: 'BMW Financial', fee: '$350', mileage: '$0.25/mile over' },
  { brand: 'Mercedes-Benz Financial', fee: '$395', mileage: '$0.25/mile over' },
  { brand: 'Toyota Financial', fee: '$350', mileage: '$0.15/mile over' },
  { brand: 'Honda Financial', fee: '$300', mileage: '$0.15/mile over' },
  { brand: 'Audi Financial', fee: '$350', mileage: '$0.25/mile over' },
  { brand: 'Hyundai Motor Finance', fee: '$400', mileage: '$0.20/mile over' },
];

const faqs = [
  {
    question: 'What is the disposition fee and can I avoid it?',
    answer: 'The disposition fee is a flat charge from the leasing bank when you return the car. It ranges from $300 to $400 depending on the brand. You can avoid it entirely by leasing another vehicle from the same manufacturer at return time. If you switch brands, you pay it.',
  },
  {
    question: 'How early should I schedule the pre-return inspection?',
    answer: 'Request the manufacturer\'s free pre-return inspection 60 to 90 days before your lease end date. This gives you time to fix any chargeable items at your own cost rather than paying the bank\'s premium rates.',
  },
  {
    question: 'What qualifies as normal wear and tear vs excess?',
    answer: 'Minor surface scratches under 2 inches, light interior wear, and small stone chips are typically considered normal. Scratches larger than a credit card, wheel curb rash, windshield chips, cracked trim, and stained upholstery are typically charged. Each bank has its own threshold document.',
  },
  {
    question: 'What happens if I am over my contracted mileage?',
    answer: 'You pay a per-mile fee set in your original lease contract, ranging from $0.15 to $0.25 per mile over your limit. If you are significantly over, a lease buyout may cost less than the overage charges. We can run both scenarios and show you the math.',
  },
  {
    question: 'Can I return my lease to any dealership?',
    answer: 'You can return your lease to any authorized dealership for that brand, not just the one you leased from. There is no obligation to return to your original dealer.',
  },
  {
    question: 'How long does a lease return take?',
    answer: 'The physical return at a dealership takes 20 to 45 minutes. Final billing from the bank typically arrives within 2 to 6 weeks. You have 30 days to dispute any charge you believe is incorrect.',
  },
];

export default function LeaseReturnPage() {
  return (
    <Layout>
      <SEO
        title="Car Lease Return Service NJ | Avoid Fees at Turn-In | Capital Motor Cars"
        description="Returning a leased car in NJ? Capital Motor Cars guides you through pre-inspection, disposition fees, excess mileage, and wear and tear charges so you never pay more than necessary."
        canonicalPath="/services/lease-return"
        seoKeywords={[
          'car lease return NJ',
          'lease return service New Jersey',
          'lease turn in NJ',
          'disposition fee NJ',
          'lease return pre-inspection NJ',
          'avoid lease return fees New Jersey',
        ]}
        ogImage="https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?auto=format&fit=crop&w=1200&q=60"
      />
      <JsonLd
        data={[
          createServiceSchema({
            name: 'Car Lease Return Service NJ',
            description: 'Pre-return inspection, fee review, and repair coordination so NJ drivers return their leased vehicle without surprise charges.',
            url: 'https://www.capitalmotorcars.com/services/lease-return',
          }),
          createFaqSchema(faqs),
          createHowToSchema({
            name: 'How to Return a Leased Car in NJ Without Surprise Fees',
            description: 'A step-by-step guide to returning your leased vehicle in New Jersey while minimizing disposition fees, wear and tear charges, and excess mileage costs.',
            steps: returnSteps.map((s) => ({ name: s.title, text: s.description })),
          }),
        ]}
      />

      <ServiceHero
        badge="NJ Lease Return Specialists"
        title="Car Lease Return"
        highlightedTitle="Made Simple in NJ"
        subtitle="Know every fee before you return the keys. Pre-inspection, disposition fee guidance, mileage review, and repair coordination so you hand back your lease without a surprise bill."
        heroImage="https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?auto=format&fit=crop&w=1200&q=60"
        primaryAction={{ label: 'Start Lease Return Process', href: '/contact' }}
        secondaryAction={{ label: 'Call Us Now', href: 'tel:+12015095555', icon: Phone }}
      />

      {/* Why Use Capital for Return */}
      <section className="py-12 md:py-20 w-full overflow-hidden">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col mb-8 md:mb-16 justify-center items-start md:items-center">
            <span className="text-accent font-black tracking-[0.4em] uppercase text-[10px] mb-2">Why Capital</span>
            <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-black dark:text-white uppercase">
              Return With <span className="text-accent italic">Confidence</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-7 p-10 rounded-[3rem] border-2 border-border/40 dark:border-white/5 bg-muted/10 dark:bg-white/[0.02] relative overflow-hidden"
            >
              <div className="absolute top-[-3%] right-[-10%] p-6 opacity-[0.08] pointer-events-none">
                <ShieldCheck className="w-40 h-40 -rotate-12 text-accent" />
              </div>
              <h3 className="text-xs font-black uppercase tracking-[0.4em] text-accent mb-12 flex items-center gap-3">
                <Check className="w-5 h-5" /> The Advantage
              </h3>
              <div className="flex flex-col gap-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                  <div className="flex flex-col gap-4 group">
                    <div className="w-12 h-12 rounded-xl bg-accent/10 text-accent flex items-center justify-center group-hover:scale-110 transition-transform">
                      <FileCheck className="w-6 h-6" />
                    </div>
                    <span className="text-lg font-black text-black dark:text-white tracking-tight leading-tight">Bank-Standard Pre-Inspection</span>
                    <p className="text-sm text-muted-foreground">We know each bank's exact wear and tear threshold. You only fix what you will actually be charged for, nothing more.</p>
                  </div>
                  <div className="flex flex-col gap-4 group">
                    <div className="w-12 h-12 rounded-xl bg-accent/10 text-accent flex items-center justify-center group-hover:scale-110 transition-transform">
                      <AlertTriangle className="w-6 h-6" />
                    </div>
                    <span className="text-lg font-black text-black dark:text-white tracking-tight leading-tight">Fee Dispute Support</span>
                    <p className="text-sm text-muted-foreground">If the bank's final bill includes charges you believe are wrong, we help you draft a formal dispute within your 30-day window.</p>
                  </div>
                </div>
                <div className="pt-12 border-t border-border/40 dark:border-white/10">
                  <h3 className="text-xs font-black uppercase tracking-[0.4em] text-accent mb-8 flex items-center gap-3">
                    <Car className="w-5 h-5" /> Who this is for
                  </h3>
                  <div className="space-y-4">
                    {[
                      'NJ drivers within 90 days of lease end',
                      'Anyone who went over their contracted mileage',
                      'Drivers with visible scratches, dents, or wheel rash',
                      'People switching brands at return (disposition fee applies)',
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-center gap-4 group">
                        <div className="w-1.5 h-1.5 rounded-full bg-accent/40 group-hover:bg-accent transition-colors shrink-0" />
                        <p className="text-lg font-medium text-muted-foreground group-hover:text-foreground transition-colors leading-relaxed">{item}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-5 p-10 rounded-[3rem] border-2 border-border/40 dark:border-white/10 bg-muted/10 dark:bg-white/[0.02] backdrop-blur-sm relative overflow-hidden flex flex-col justify-center"
            >
              <div className="absolute top-[-5%] right-[-15%] p-6 opacity-[0.05] pointer-events-none">
                <FileCheck className="w-40 h-40 -rotate-12 text-accent" />
              </div>
              <h3 className="text-xs font-black uppercase tracking-[0.4em] text-accent mb-8 flex items-center gap-3">
                <FileCheck className="w-5 h-5" /> What to Expect
              </h3>
              <ul className="space-y-6">
                {[
                  'Free pre-return inspection review',
                  'Exact disposition fee by brand confirmed',
                  'Mileage overage calculation if applicable',
                  'Repair referrals at wholesale NJ pricing',
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

      {/* Process Steps */}
      <section className="py-12 md:py-20 w-full border-t border-border/40">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col items-start md:items-center text-left md:text-center mb-8 md:mb-16">
            <span className="text-accent font-black tracking-[0.4em] uppercase text-[10px] mb-2">Process</span>
            <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-black dark:text-white uppercase">
              Four Steps to a <span className="text-accent italic">Clean Return</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {returnSteps.map((step, index) => (
              <div key={index} className="group relative p-10 rounded-[2.5rem] border-2 border-border/60 bg-muted/10 dark:bg-white/[0.03] hover:border-accent transition-all duration-500 overflow-hidden">
                <span className="absolute -right-4 -bottom-4 text-9xl font-black text-black/[0.03] dark:text-white/[0.03] group-hover:text-accent/10 transition-colors leading-none select-none pointer-events-none">
                  {index + 1}
                </span>
                <div className="relative z-10 flex flex-col gap-8">
                  <div className="w-14 h-14 rounded-2xl bg-accent/10 text-accent flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-500">
                    <step.icon className="w-7 h-7" />
                  </div>
                  <div>
                    <h3 className="font-black text-xl uppercase tracking-tighter mb-3 text-black dark:text-white group-hover:text-accent transition-colors">{step.title}</h3>
                    <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground/60 leading-relaxed group-hover:text-muted-foreground transition-colors">{step.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Disposition Fee Table */}
      <section className="py-12 md:py-20 border-t border-border/40">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col mb-8 md:mb-16 justify-center items-start md:items-center">
            <span className="text-accent font-black tracking-[0.4em] uppercase text-[10px] mb-2">Fee Guide</span>
            <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-black dark:text-white uppercase">
              Disposition Fees <span className="text-accent italic">by Brand</span>
            </h2>
            <p className="mt-4 text-muted-foreground text-center max-w-2xl">These fees are waived when you lease again with the same manufacturer. If you switch brands, you pay them at return.</p>
          </div>
          <div className="max-w-3xl mx-auto glass-card-theme rounded-[2rem] overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border/40">
                  <th className="text-left p-4 text-xs font-black uppercase tracking-[0.2em] text-accent">Brand</th>
                  <th className="text-left p-4 text-xs font-black uppercase tracking-[0.2em] text-accent">Disposition Fee</th>
                  <th className="text-left p-4 text-xs font-black uppercase tracking-[0.2em] text-accent">Excess Mileage Rate</th>
                </tr>
              </thead>
              <tbody>
                {feeTable.map((row, i) => (
                  <tr key={i} className="border-b border-border/20 last:border-0 hover:bg-accent/5 transition-colors">
                    <td className="p-4 font-bold text-foreground">{row.brand}</td>
                    <td className="p-4 text-muted-foreground">{row.fee}</td>
                    <td className="p-4 text-muted-foreground">{row.mileage}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Before vs After */}
      <section className="py-12 md:py-20 border-t border-border/40">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col mb-8 md:mb-16 justify-center items-start md:items-center">
            <span className="text-accent font-black tracking-[0.4em] uppercase text-[10px] mb-2">Comparison</span>
            <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-black dark:text-white uppercase">
              Returning <span className="text-accent italic">Alone vs With Us</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 md:p-12 rounded-[2.5rem] bg-red-500/5 border-2 border-red-500/10 dark:border-red-500/20">
              <h3 className="text-xl font-black uppercase text-red-500 mb-8 flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-red-500/10 flex items-center justify-center text-sm">X</span>
                Without Guidance
              </h3>
              <ul className="space-y-4">
                {[
                  'Dealer charges full retail for every scratch',
                  'Surprise bill arrives 3 weeks after return',
                  'No pre-inspection so nothing is fixed in advance',
                  'Disposition fee paid without knowing it could be waived',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-4 text-muted-foreground">
                    <ArrowRight className="w-5 h-5 text-red-500/50 mt-1 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="p-8 md:p-12 rounded-[2.5rem] bg-accent/5 border-2 border-accent/20">
              <h3 className="text-xl font-black uppercase text-accent mb-8 flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center text-sm">✓</span>
                Capital Motor Cars
              </h3>
              <ul className="space-y-4">
                {[
                  'Pre-inspection shows exactly what needs fixing',
                  'Repairs at wholesale NJ network pricing',
                  'Disposition fee waived by leasing again with us',
                  'No surprise bills, no disputes, clean handoff',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-4 text-foreground font-medium">
                    <Check className="w-5 h-5 text-accent mt-1 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-12 md:py-20 border-t border-border/40">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col mb-8 md:mb-16 justify-center items-start md:items-center">
            <span className="text-accent font-black tracking-[0.4em] uppercase text-[10px] mb-2">FAQ</span>
            <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-black dark:text-white uppercase">
              Lease Return <span className="text-accent italic">Questions</span>
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

      {/* CTA */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col mb-8 justify-start items-start md:items-center">
            <span className="text-accent font-black tracking-[0.4em] uppercase text-[10px] mb-2">Get Started</span>
            <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-black dark:text-white uppercase">
              Plan Your <span className="text-accent italic">Lease Return</span>
            </h2>
            <p className="text-muted-foreground mb-4 text-lg max-w-lg mx-auto mt-4 text-center">
              Tell us your lease end date, brand, and any concerns. We will walk through the fees and options within one business day.
            </p>
            <div className="w-full max-w-2xl mx-auto mt-4">
              <div className="glass-card-theme form-card-theme p-4 sm:p-6 md:p-8 rounded-[2.5rem]">
                <ContactForm source="service" serviceTitle="Lease Return" compact />
              </div>
            </div>
          </div>
        </div>
      </section>

      <RelatedServices excludeId="lease-return" />
    </Layout>
  );
}
