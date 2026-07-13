import { Layout } from '@/components/layout/Layout';
import { SEO } from '@/components/SEO';
import { JsonLd, createServiceSchema, createFaqSchema } from '@/components/JsonLd';
import { ServiceHero } from '@/components/services/ServiceHero';
import { RelatedServices } from '@/components/services/RelatedServices';
import { TrustStatsBar } from '@/components/shared/TrustStatsBar';
import { CountyHubs } from '@/components/shared/CountyHubs';
import { ServiceSEOBlock } from '@/components/services/ServiceSEOBlock';
import { ContactForm } from '@/components/forms/ContactForm';
import { motion } from 'framer-motion';
import {
  Check,
  DollarSign,
  Repeat,
  TrendingUp,
  FileText,
  ShieldCheck,
  Phone,
  AlertTriangle,
  Calculator,
  Car,
} from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const exitOptions = [
  {
    icon: Repeat,
    title: 'Lease Transfer',
    tag: 'Best Option',
    cost: '$75 - $595',
    tagColor: 'text-accent',
    description: 'Move your remaining lease to a qualified new driver. You pay only the bank transfer fee, which ranges from $75 to $595. No termination penalty, no remaining payments.',
    bestFor: 'Anyone whose bank allows transfers (most do)',
  },
  {
    icon: TrendingUp,
    title: 'Dealer Buyout',
    tag: 'Market Dependent',
    cost: 'May net $0 to $3K+',
    tagColor: 'text-yellow-500',
    description: 'If your vehicle is worth more than the residual value listed in your contract, a dealer will pay off your lease and you pocket the equity. Depends on current used car market values.',
    bestFor: 'Trucks, SUVs, and EVs in a strong used market',
  },
  {
    icon: Car,
    title: 'Pull-Ahead Program',
    tag: 'Manufacturer Offer',
    cost: 'Often $0',
    tagColor: 'text-green-500',
    description: 'Manufacturers run pull-ahead programs at model year changeover that waive up to 3 remaining payments when you lease a new model. We track every active NJ program.',
    bestFor: 'Drivers within 3 months of lease end',
  },
  {
    icon: AlertTriangle,
    title: 'Early Termination',
    tag: 'Last Resort',
    cost: '$3,000 - $12,000',
    tagColor: 'text-red-500',
    description: 'The bank charges you every remaining payment plus a termination fee. This is almost always the most expensive option, but sometimes unavoidable if no other path works.',
    bestFor: 'When transfer is blocked and no pull-ahead exists',
  },
];

const faqs = [
  {
    question: 'How much does it cost to exit a car lease early in NJ?',
    answer: 'The cost depends heavily on which method you use. A lease transfer costs $75 to $595 in bank transfer fees. A pull-ahead program can cost $0 if the manufacturer waives remaining payments. Early termination is the most expensive at $3,000 to $12,000 because you owe every remaining monthly payment plus a penalty. We always explore cheaper options first.',
  },
  {
    question: 'What is a pull-ahead lease program?',
    answer: 'A pull-ahead program is a manufacturer-sponsored incentive that waives 1 to 3 remaining monthly payments when you return your lease early and lease a new vehicle from the same brand. They typically run at model year changeover (August through November) and around major sales events. BMW, Mercedes, Audi, and Toyota all run these in NJ.',
  },
  {
    question: 'Can I sell my leased car if it has equity?',
    answer: 'If the current market value of your leased vehicle is higher than the residual value in your contract, you have equity. You can capture this by having a dealer or third-party buyer pay off the lease. In some cases, you can pocket the difference. This became very common during the used car shortage. Right now, it depends on the specific make and model.',
  },
  {
    question: 'What happens to my credit if I exit a lease early?',
    answer: 'A proper lease transfer or pull-ahead program has no negative credit impact. Early termination, if you miss payments during the process, can affect your score. We guide you through the cleanest exit path to protect your credit.',
  },
  {
    question: 'How long does early lease exit take?',
    answer: 'A lease transfer takes 2 to 4 weeks from start to bank approval. A dealer buyout or pull-ahead can often close within 1 week. Early termination is immediate but expensive. We typically present you with all available options within 48 hours of your inquiry.',
  },
  {
    question: 'My car was totaled or stolen. Do I still owe on the lease?',
    answer: 'If your vehicle is declared a total loss, your insurance pays the current market value to the bank. If that amount is less than the remaining lease balance, the gap is covered by gap insurance, which is typically included in most lease contracts. You should confirm gap coverage is in your original agreement.',
  },
];

export default function EarlyLeaseExitPage() {
  return (
    <Layout>
      <SEO
        title="Early Lease Exit NJ | 4 Ways to Get Out of a Car Lease | Capital Motor Cars"
        description="Need to exit your car lease early in NJ? Capital Motor Cars explains 4 real options: lease transfer, dealer buyout, pull-ahead programs, and early termination. We find the cheapest path for you."
        canonicalPath="/services/early-lease-exit"
        seoKeywords={[
          'early lease exit NJ',
          'get out of car lease New Jersey',
          'exit lease early NJ',
          'lease buyout NJ',
          'pull ahead lease NJ',
          'early termination lease NJ',
        ]}
        ogImage="https://images.unsplash.com/photo-1489824904134-891ab64532f1?auto=format&fit=crop&w=1200&q=60"
      />
      <JsonLd
        data={[
          createServiceSchema({
            name: 'Early Car Lease Exit Service NJ',
            description: 'Four options for exiting a car lease early in NJ without paying more than necessary. Lease transfer, dealer buyout, pull-ahead programs, and early termination guidance.',
            url: 'https://www.capitalmotorcars.com/services/early-lease-exit',
          }),
          createFaqSchema(faqs),
        ]}
      />

      <ServiceHero
        badge="NJ Early Lease Exit"
        title="Need Out of Your"
        highlightedTitle="Lease Early?"
        subtitle="There are four ways to exit a car lease in NJ before your term ends. Most drivers don't know about the three options that don't involve a huge termination penalty. We find the right one for your situation."
        heroImage="https://images.unsplash.com/photo-1489824904134-891ab64532f1?auto=format&fit=crop&w=1200&q=60"
        primaryAction={{ label: 'Find My Exit Option', href: '/contact' }}
        secondaryAction={{ label: 'Call Us Now', href: 'tel:+12015095555', icon: Phone }}
      />

      <TrustStatsBar />

      {/* 4 Exit Options */}
      <section className="py-12 md:py-20 w-full overflow-hidden border-t border-border/40">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col mb-8 md:mb-16 justify-center items-start md:items-center">
            <span className="text-accent font-black tracking-[0.4em] uppercase text-[10px] mb-2">Your Options</span>
            <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-black dark:text-white uppercase">
              Four Ways to <span className="text-accent italic">Exit</span>
            </h2>
            <p className="mt-4 text-muted-foreground text-center max-w-2xl">Only one of these is expensive. We help you find the cheapest path based on your brand, remaining months, and current market conditions.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {exitOptions.map((option, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group p-10 rounded-[2.5rem] border-2 border-border/60 bg-muted/10 dark:bg-white/[0.03] hover:border-accent/40 transition-all duration-500 relative overflow-hidden"
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-accent/10 text-accent flex items-center justify-center group-hover:scale-110 transition-transform">
                    <option.icon className="w-7 h-7" />
                  </div>
                  <span className={`text-xs font-black uppercase tracking-widest ${option.tagColor}`}>{option.tag}</span>
                </div>
                <h3 className="font-black text-2xl uppercase tracking-tighter mb-2 text-black dark:text-white">{option.title}</h3>
                <div className="text-accent font-black text-lg mb-4">{option.cost}</div>
                <p className="text-muted-foreground mb-6">{option.description}</p>
                <div className="pt-4 border-t border-border/30">
                  <span className="text-xs font-black uppercase tracking-[0.2em] text-muted-foreground">Best for: </span>
                  <span className="text-sm font-semibold text-foreground">{option.bestFor}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Calculator CTA */}
      <section className="py-12 md:py-20 border-t border-border/40">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-5"
            >
              <span className="text-accent font-black tracking-[0.4em] uppercase text-[10px] mb-4 block">Make the Right Call</span>
              <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-black dark:text-white uppercase mb-6">
                We Run the <span className="text-accent italic">Numbers</span>
              </h2>
              <p className="text-muted-foreground text-lg mb-8">
                Give us your lease details and we will calculate exactly what each exit option costs. Most drivers are surprised at how much cheaper a transfer or pull-ahead is compared to what they assumed.
              </p>
              <ul className="space-y-4">
                {[
                  'Transfer fee vs termination penalty side by side',
                  'Current market equity check for your vehicle',
                  'Active pull-ahead programs in NJ this month',
                  'Recommendation on the lowest-cost path',
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-4">
                    <Calculator className="w-5 h-5 text-accent shrink-0" />
                    <span className="font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-7 p-10 rounded-[3rem] border-2 border-border/40 bg-muted/10 dark:bg-white/[0.02]"
            >
              <h3 className="text-xs font-black uppercase tracking-[0.4em] text-accent mb-8">What We Need to Help You</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { icon: Car, label: 'Your Vehicle', value: 'Make, model, and year' },
                  { icon: FileText, label: 'Remaining Term', value: 'Months left on lease' },
                  { icon: DollarSign, label: 'Monthly Payment', value: 'Current payment amount' },
                  { icon: ShieldCheck, label: 'Bank Name', value: 'Leasing company/bank' },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-accent/10 text-accent flex items-center justify-center shrink-0">
                      <item.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-black text-sm uppercase tracking-wider text-foreground">{item.label}</div>
                      <div className="text-muted-foreground text-sm">{item.value}</div>
                    </div>
                  </div>
                ))}
              </div>
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
              Early Exit <span className="text-accent italic">Questions</span>
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
              Find Your <span className="text-accent italic">Exit Path</span>
            </h2>
            <p className="text-muted-foreground mb-4 text-lg max-w-lg mx-auto mt-4 text-center">
              Share your lease details and we will come back with all your options ranked by cost within one business day.
            </p>
            <div className="w-full max-w-2xl mx-auto mt-4">
              <div className="glass-card-theme form-card-theme p-4 sm:p-6 md:p-8 rounded-[2.5rem]">
                <ContactForm source="service" serviceTitle="Early Lease Exit" compact />
              </div>
            </div>
          </div>
        </div>
      </section>

      <ServiceSEOBlock 
        title="The Smart Way to Exit Your Lease Early"
        paragraphs={[
          "Life changes, and sometimes you need to get out of your car lease before the term is up. Dealerships often make this process incredibly expensive with massive early termination penalties.",
          "We analyze your specific situation - whether it's utilizing a lease transfer network, buying out the lease to capture equity, or trading the vehicle in. We find the most mathematically advantageous exit strategy for your specific vehicle and payoff amount."
        ]}
        bullets={[
          "Zero dealership termination penalties",
          "Comprehensive payoff analysis",
          "Multiple exit strategies explored",
          "Seamless transition to your next vehicle"
        ]}
        imageSrc="https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=2000&auto=format&fit=crop"
        imageAlt="Looking over lease documents"
        testimonialQuote="I needed a larger car for my growing family but had 14 months left on my sedan lease. Capital got me out completely clean."
      />

      <CountyHubs />

      <RelatedServices excludeId="early-lease-exit" />
    </Layout>
  );
}
