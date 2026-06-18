import { Link } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { SEO } from '@/components/SEO';
import { JsonLd, createServiceSchema, createFaqSchema } from '@/components/JsonLd';
import { ServiceHero } from '@/components/services/ServiceHero';
import { RelatedServices } from '@/components/services/RelatedServices';
import { TrustStatsBar } from '@/components/shared/TrustStatsBar';
import { CountyHubs } from '@/components/shared/CountyHubs';
import { ServiceSEOBlock } from '@/components/services/ServiceSEOBlock';
import { Button } from '@/components/ui/button';
import { ContactForm } from '@/components/forms/ContactForm';
import { motion } from 'framer-motion';
import {
  Check,
  ArrowRight,
  DollarSign,
  Users,
  FileText,
  ShieldCheck,
  Phone,
  Repeat,
  Clock,
} from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const transferSteps = [
  {
    icon: FileText,
    step: '01',
    title: 'Match',
    description: 'We identify a qualified buyer for your lease. They must meet the bank\'s credit requirements, which we screen upfront.',
  },
  {
    icon: ShieldCheck,
    step: '02',
    title: 'Qualify',
    description: 'The bank approves the incoming driver. Most approvals take 3 to 5 business days. You stay current on payments during this window.',
  },
  {
    icon: Repeat,
    step: '03',
    title: 'Transfer',
    description: 'Paperwork is executed. Title transfers to the new lessee. You are removed from the contract and the financial obligation ends.',
  },
  {
    icon: Check,
    step: '04',
    title: 'Done',
    description: 'You are free. No disposition fee. No early termination fee. The incoming driver takes the remaining payments and mileage.',
  },
];

const faqs = [
  {
    question: 'What is a lease transfer and how does it work?',
    answer: 'A lease transfer, sometimes called a lease swap, moves your remaining lease obligation to a new driver. The incoming driver takes over your monthly payments, mileage allowance, and the remaining lease term. Most major banks allow this. You are released from the contract once the transfer is approved.',
  },
  {
    question: 'Which banks allow lease transfers in NJ?',
    answer: 'BMW Financial, Mercedes-Benz Financial, Audi Financial, Ford Motor Credit, Toyota Financial, Honda Financial, and Hyundai Motor Finance all allow lease transfers with credit approval. Some smaller captive lenders do not allow transfers. We confirm transferability before you start the process.',
  },
  {
    question: 'How much does a lease transfer cost?',
    answer: 'The bank charges a transfer fee ranging from $75 to $595 depending on the brand. BMW Financial charges $595, Mercedes charges $595, Toyota charges $350, and Honda charges $250. These can sometimes be split with the incoming driver. There is no early termination fee with a transfer.',
  },
  {
    question: 'Do I still owe a disposition fee after a transfer?',
    answer: 'No. The disposition fee is charged at end-of-lease return. With a transfer, the incoming driver takes over the lease and handles the end-of-lease return. You owe nothing beyond any agreed-upon transfer incentive.',
  },
  {
    question: 'What credit score does the incoming driver need?',
    answer: 'Each bank sets its own minimum. Most luxury brands require a score of 700 or above. Toyota and Honda typically approve at 680 and above. We pre-screen all incoming drivers before submitting to the bank to avoid wasted time.',
  },
  {
    question: 'Can I offer cash to the incoming driver to sweeten the deal?',
    answer: 'Yes, this is called a transfer incentive. If your monthly payment is higher than current market rates, offering the incoming driver $500 to $1,500 upfront makes the deal more attractive. This still costs far less than paying an early termination penalty.',
  },
];

const savingsData = [
  { label: 'Early Termination Fee', withoutUs: '$5,000 - $12,000', withUs: '$75 - $595 transfer fee' },
  { label: 'Remaining Payments', withoutUs: 'Pay all remaining months', withUs: 'Transferred, you pay nothing' },
  { label: 'Disposition Fee', withoutUs: '$300 - $400', withUs: '$0 (not your responsibility)' },
  { label: 'Timeline', withoutUs: 'Immediate but very costly', withUs: '2 to 4 weeks' },
];

export default function LeaseTransferPage() {
  return (
    <Layout>
      <SEO
        title="Car Lease Transfer NJ | Get Out of Your Lease Early | Capital Motor Cars"
        description="Need out of your lease early? Capital Motor Cars handles lease transfers in NJ so you can exit without paying early termination fees. We match you with a qualified incoming driver fast."
        canonicalPath="/services/lease-transfer"
        seoKeywords={[
          'lease transfer NJ',
          'get out of lease early NJ',
          'car lease swap New Jersey',
          'lease takeover NJ',
          'exit car lease NJ',
          'lease transfer service New Jersey',
        ]}
        ogImage="https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=1200&q=60"
      />
      <JsonLd
        data={[
          createServiceSchema({
            name: 'Car Lease Transfer Service NJ',
            description: 'Lease transfer service for NJ drivers looking to exit their lease early without paying early termination fees. Capital Motor Cars matches you with a qualified incoming driver.',
            url: 'https://www.capitalmotorcars.com/services/lease-transfer',
          }),
          createFaqSchema(faqs),
        ]}
      />

      <ServiceHero
        badge="NJ Lease Exit Specialists"
        title="Lease Transfer Service"
        highlightedTitle="Exit Without the Fee"
        subtitle="Stuck in a lease you no longer need? A lease transfer moves your remaining payments to a qualified new driver so you walk away free without the early termination penalty."
        heroImage="https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=1200&q=60"
        primaryAction={{ label: 'Start a Lease Transfer', href: '/contact' }}
        secondaryAction={{ label: 'Call Us Now', href: 'tel:+12015095555', icon: Phone }}
      />

      <TrustStatsBar />

      {/* Why Transfer vs Early Termination */}
      <section className="py-12 md:py-20 w-full overflow-hidden border-t border-border/40">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col mb-8 md:mb-16 justify-center items-start md:items-center">
            <span className="text-accent font-black tracking-[0.4em] uppercase text-[10px] mb-2">Why Transfer</span>
            <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-black dark:text-white uppercase">
              Transfer vs <span className="text-accent italic">Early Termination</span>
            </h2>
            <p className="mt-4 text-muted-foreground text-center max-w-2xl">Early termination typically costs $5,000 to $12,000. A transfer costs $75 to $595. The math is clear.</p>
          </div>
          <div className="max-w-4xl mx-auto glass-card-theme rounded-[2rem] overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border/40">
                  <th className="text-left p-4 text-xs font-black uppercase tracking-[0.2em] text-muted-foreground">Factor</th>
                  <th className="text-left p-4 text-xs font-black uppercase tracking-[0.2em] text-red-500">Early Termination</th>
                  <th className="text-left p-4 text-xs font-black uppercase tracking-[0.2em] text-accent">Lease Transfer</th>
                </tr>
              </thead>
              <tbody>
                {savingsData.map((row, i) => (
                  <tr key={i} className="border-b border-border/20 last:border-0">
                    <td className="p-4 font-bold text-foreground">{row.label}</td>
                    <td className="p-4 text-red-500/80">{row.withoutUs}</td>
                    <td className="p-4 text-accent font-semibold">{row.withUs}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-12 md:py-20 border-t border-border/40">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col items-start md:items-center text-left md:text-center mb-8 md:mb-16">
            <span className="text-accent font-black tracking-[0.4em] uppercase text-[10px] mb-2">How It Works</span>
            <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-black dark:text-white uppercase">
              Four Steps to <span className="text-accent italic">Freedom</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {transferSteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative p-10 rounded-[2.5rem] border-2 border-border/60 bg-muted/10 dark:bg-white/[0.03] hover:border-accent transition-all duration-500 overflow-hidden"
              >
                <span className="absolute -right-4 -bottom-4 text-9xl font-black text-black/[0.03] dark:text-white/[0.03] group-hover:text-accent/10 transition-colors leading-none select-none pointer-events-none">
                  {step.step}
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
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Who This Is For */}
      <section className="py-12 md:py-20 border-t border-border/40">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-accent font-black tracking-[0.4em] uppercase text-[10px] mb-4 block">Use Cases</span>
              <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-black dark:text-white uppercase mb-8">
                When a Transfer <span className="text-accent italic">Makes Sense</span>
              </h2>
              <div className="space-y-6">
                {[
                  { icon: Users, title: 'Job Relocation', desc: 'Moving out of NJ or switching to remote work with a shorter commute? Your current car may no longer fit your mileage needs.' },
                  { icon: DollarSign, title: 'Financial Change', desc: 'A job change or major expense can make current lease payments too high. A transfer lets you exit cleanly without penalty.' },
                  { icon: Clock, title: 'Lifestyle Change', desc: 'Marriage, a new baby, or a new vehicle need can make your current lease a poor fit. A transfer handles it quickly.' },
                  { icon: Repeat, title: 'Want a Different Car', desc: 'Found a better deal or need an EV now? We transfer your current lease and set you up in something new.' },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-5 group">
                    <div className="w-12 h-12 rounded-xl bg-accent/10 text-accent flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                      <item.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-black text-lg text-black dark:text-white mb-1">{item.title}</h3>
                      <p className="text-muted-foreground text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="p-10 rounded-[3rem] border-2 border-accent/20 bg-accent/5"
            >
              <h3 className="text-xs font-black uppercase tracking-[0.4em] text-accent mb-8">Why Capital Motor Cars</h3>
              <ul className="space-y-6">
                {[
                  'We screen all incoming drivers for credit approval before bank submission',
                  'We know which NJ banks allow transfers and their exact fee schedules',
                  'We handle all paperwork so you do not have to contact the bank directly',
                  'NJ-based so we can meet in person if needed',
                  'No upfront fee from you until the transfer is complete',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <Check className="w-5 h-5 text-accent mt-1 shrink-0" />
                    <span className="text-foreground font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-12 md:py-20 border-t border-border/40">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col mb-8 md:mb-16 justify-center items-start md:items-center">
            <span className="text-accent font-black tracking-[0.4em] uppercase text-[10px] mb-2">FAQ</span>
            <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-black dark:text-white uppercase">
              Lease Transfer <span className="text-accent italic">Questions</span>
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
              Start Your <span className="text-accent italic">Lease Transfer</span>
            </h2>
            <p className="text-muted-foreground mb-4 text-lg max-w-lg mx-auto mt-4 text-center">
              Tell us your brand, remaining months, and monthly payment. We will confirm transferability and next steps within one business day.
            </p>
            <div className="w-full max-w-2xl mx-auto mt-4">
              <div className="glass-card-theme form-card-theme p-4 sm:p-6 md:p-8 rounded-[2.5rem]">
                <ContactForm source="service" serviceTitle="Lease Transfer" compact />
              </div>
            </div>
          </div>
        </div>
      </section>

      <ServiceSEOBlock 
        title="NJ's Premier Lease Transfer Service"
        paragraphs={[
          "A lease transfer (or lease assumption) allows you to legally transfer your lease contract to another qualified driver. This is often the most cost-effective way to exit a lease without paying early termination fees.",
          "Capital Motor Cars manages the entire process. We leverage our network to find qualified buyers, facilitate the credit approval through the leasing company, and handle all the complex DMV and transfer paperwork. You just hand over the keys."
        ]}
        bullets={[
          "Avoid thousands in early termination fees",
          "We find qualified buyers for you",
          "Full management of bank transfer paperwork",
          "Legal and secure process"
        ]}
        imageSrc="https://images.unsplash.com/photo-1517260739337-6799d239ce83?q=80&w=2000&auto=format&fit=crop"
        imageAlt="Signing lease transfer documents"
        testimonialQuote="They found someone to take over my BMW lease in less than a week. Saved me over $4,000 in early turn-in penalties."
      />

      <CountyHubs />

      <RelatedServices excludeId="lease-transfer" />
    </Layout>
  );
}
