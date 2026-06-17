import { Link } from 'react-router-dom';
import { ArrowRight, Calculator, DollarSign, Percent, Car, ShieldCheck, Zap } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { SEO } from '@/components/SEO';
import { JsonLd, createBreadcrumbSchema, createFaqSchema, createHowToSchema, createWebPageSchema } from '@/components/JsonLd';
import { LeaseCalculator } from '@/components/calculator/LeaseCalculator';
import { ContactForm } from '@/components/forms/ContactForm';
import { motion } from 'framer-motion';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const faqs = [
  {
    question: 'What is money factor on a car lease?',
    answer: 'Money factor is the interest rate on a lease expressed as a small decimal number. It is set by the bank, not the dealer. To convert money factor to an equivalent annual percentage rate (APR), multiply by 2,400. For example, a money factor of 0.00175 equals an APR of 4.2%. A lower money factor means you pay less interest over the lease term. Dealers cannot change the money factor set by the manufacturer\'s bank, but they can mark it up, which is why working with a broker matters.',
  },
  {
    question: 'What is residual value and why does it matter?',
    answer: 'Residual value is the amount the leasing bank predicts the car will be worth at the end of your lease term. It is expressed as a percentage of MSRP. A higher residual value means lower monthly payments because you are financing less depreciation. For example, if a car has a $60,000 MSRP and a 55% residual on a 36-month lease, the bank expects it to be worth $33,000 at lease end. You only pay for the $27,000 of depreciation plus interest, not the full $60,000.',
  },
  {
    question: 'How is a monthly lease payment calculated?',
    answer: 'A lease payment has three components. First, the depreciation fee: take your adjusted cap cost (selling price plus rolled-in fees minus any down payment or trade-in), subtract the residual value, and divide by the number of months. Second, the finance charge: add the adjusted cap cost and residual value, then multiply by the money factor. Third, tax: multiply the sum of depreciation and finance charge by your local tax rate. In New Jersey that rate is 6.625%. Add all three components to get your total monthly payment.',
  },
  {
    question: 'What is the difference between MSRP and selling price in a lease?',
    answer: 'MSRP is the manufacturer\'s sticker price. The selling price is the negotiated price you agree on with the dealer. In a lease, the residual value is always calculated as a percentage of MSRP, not selling price. This means negotiating the selling price down has a double benefit: it lowers your adjusted cap cost (reducing depreciation) without changing the residual (which stays based on MSRP). Every dollar you negotiate off the selling price reduces your total lease payment.',
  },
  {
    question: 'What is the acquisition fee on a lease?',
    answer: 'The acquisition fee is a bank fee charged to initiate the lease, separate from any dealer fees. It is set by the manufacturer\'s financial arm and typically ranges from $595 to $1,095 depending on the brand. BMW Financial Services charges $925, Mercedes-Benz Financial charges $1,095, Audi Financial Services charges $895, Toyota Financial charges $650, and Honda Financial charges $595. You can choose to roll it into your cap cost (which spreads the cost over your monthly payments) or pay it upfront at signing.',
  },
  {
    question: 'What is due at signing on a car lease in NJ?',
    answer: 'Due at signing is the total amount you pay on the day you pick up the car. It typically includes: your first month\'s payment, any down payment or cap cost reduction you chose, the doc fee (usually $400 to $799 in NJ), the registration and title transfer fee, and the acquisition fee if you elected not to roll it in. It does NOT include the acquisition fee if that was rolled into your monthly payment. A zero-down lease minimizes the cash due at signing but results in a higher monthly payment.',
  },
  {
    question: 'Does New Jersey charge sales tax on car leases?',
    answer: 'Yes, New Jersey charges 6.625% sales tax on monthly lease payments. Unlike some states that tax the full purchase price upfront, NJ taxes are collected monthly on each payment, which is advantageous. However, New Jersey fully exempts electric vehicles from sales tax. This means if you lease a Tesla, BMW iX, Hyundai Ioniq 6, or any other qualifying EV, you pay $0 in state sales tax on the entire lease, which can save $800 to $1,500 over a 36-month term.',
  },
  {
    question: 'What is a good money factor for a car lease in 2026?',
    answer: 'A good money factor depends on current market conditions and brand. As a general benchmark, a money factor that converts to an APR below 5% (i.e., MF below 0.00208) is considered competitive in 2026. Manufacturer-supported programs during sale events can push money factors well below 0.00100. You can verify if a dealer is marking up the money factor by asking for the buy rate from the bank. A broker like Capital Motor Cars has access to the base rate and cannot mark it up.',
  },
  {
    question: 'Should I put money down on a lease?',
    answer: 'Most lease advisors, ourselves included, recommend keeping upfront cash as low as possible on a lease. The reason: if your car is totaled in the first month, your insurance pays the current value to the bank. Any down payment you made is gone. Instead of a large down payment, consider choosing a vehicle with a higher residual value or negotiating the selling price lower. If you want to lower your monthly payment, multiple security deposits (MSDs) are a better strategy for brands that allow them.',
  },
];

const howToSteps = [
  { name: 'Enter MSRP and selling price', text: 'Start with the car\'s sticker price (MSRP) and the negotiated selling price. Even a small discount below MSRP significantly reduces your monthly payment.' },
  { name: 'Set your term and mileage', text: 'Select your lease length (24, 36, or 39 months are most common) and annual mileage allowance. Higher mileage lowers the residual value, which increases your payment.' },
  { name: 'Enter the money factor', text: 'Get the current money factor from the manufacturer\'s bank or ask your broker. Enter it as a decimal (e.g., 0.00175). The calculator will show the equivalent APR automatically.' },
  { name: 'Set the residual percentage', text: 'Enter the bank\'s residual value for your specific vehicle, trim, and term. This is set by the bank and should match your dealer\'s quote sheet.' },
  { name: 'Add fees and tax rate', text: 'Enter the acquisition fee, doc fee, registration cost, and your tax rate. New Jersey residents: toggle the EV switch if you are leasing an electric vehicle to apply the 0% tax exemption.' },
  { name: 'Review the results', text: 'The right panel shows your exact monthly payment, the full due-at-signing breakdown, and total lease cost. Adjust any input to see how it affects the numbers in real time.' },
];

const termExplainers = [
  {
    icon: DollarSign,
    term: 'Money Factor',
    short: 'MF x 2,400 = APR',
    explanation: 'Set by the bank. Lower is better. Dealers can mark it up but cannot go below the bank\'s rate. Always verify the buy rate.',
  },
  {
    icon: Percent,
    term: 'Residual Value',
    short: '% of MSRP at lease end',
    explanation: 'Negotiated off the MSRP, not the selling price. You pay for the depreciation gap. Higher residual = lower payment.',
  },
  {
    icon: Car,
    term: 'Adjusted Cap Cost',
    short: 'Selling price +/- adjustments',
    explanation: 'Selling price plus any rolled-in fees, minus your down payment, trade-in, and rebates. This is what you are actually financing.',
  },
  {
    icon: Calculator,
    term: 'Acquisition Fee',
    short: 'Bank\'s lease initiation fee',
    explanation: 'Paid to the leasing bank, not the dealer. Set by the manufacturer\'s financial arm. Can be rolled into cap cost or paid upfront.',
  },
  {
    icon: ShieldCheck,
    term: 'Due at Signing',
    short: 'All cash out on day one',
    explanation: 'First payment + down payment + doc fee + registration + any upfront acquisition fee. Not the same as a down payment alone.',
  },
  {
    icon: Zap,
    term: 'NJ EV Tax Exemption',
    short: '0% sales tax on EVs',
    explanation: 'New Jersey exempts fully electric vehicles from the 6.625% state sales tax on leases. Saves $800 to $1,500+ over a 36-month term.',
  },
];

export default function LeaseCalculatorPage() {
  return (
    <Layout>
      <SEO
        title="Car Lease Calculator NJ | Exact Monthly Payment Formula | Capital Motor Cars"
        description="Calculate your exact NJ car lease payment with our broker-grade calculator. Includes money factor, residual value, acquisition fee, due at signing, and NJ EV 0% tax toggle. Free and accurate."
        canonicalPath="/lease-calculator"
        seoKeywords={[
          'car lease calculator NJ',
          'auto lease payment calculator New Jersey',
          'money factor to APR calculator',
          'lease payment formula',
          'NJ car lease tax calculator',
          'how to calculate car lease payment',
          'leasehackr calculator',
          'due at signing car lease calculator',
        ]}
        ogType="website"
      />
      <JsonLd
        data={[
          createWebPageSchema({
            name: 'Car Lease Calculator NJ',
            description: 'Broker-grade car lease calculator for New Jersey drivers. Calculate monthly payment, due at signing, total cost, and NJ EV tax savings.',
            url: 'https://www.capitalmotorcars.com/lease-calculator',
          }),
          createBreadcrumbSchema([
            { name: 'Home', url: 'https://www.capitalmotorcars.com' },
            { name: 'Lease Calculator', url: 'https://www.capitalmotorcars.com/lease-calculator' },
          ]),
          createFaqSchema(faqs),
          createHowToSchema({
            name: 'How to Calculate a Car Lease Payment in NJ',
            description: 'Step-by-step guide to using the Capital Motor Cars lease calculator to find your exact monthly payment, due at signing, and total lease cost.',
            steps: howToSteps,
          }),
        ]}
      />

      {/* Hero */}
      <section className="relative py-20 md:py-28 overflow-hidden bg-[hsl(var(--hero-bg))]">
        <div className="absolute inset-0 pointer-events-none opacity-30"
          style={{ background: 'radial-gradient(circle at 15% 50%, hsl(var(--accent) / 0.2), transparent 40%), radial-gradient(circle at 85% 30%, hsl(var(--accent) / 0.1), transparent 35%)' }}
        />
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-2xl mx-auto text-center">
            <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-white/5 border border-white/10 text-accent mb-6 mx-auto">
              <Calculator className="h-7 w-7" />
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tighter text-white uppercase mb-5">
              Lease Calculator<br /><span className="text-accent italic">New Jersey</span>
            </h1>
            <p className="text-white/70 text-lg md:text-xl leading-relaxed">
              Broker-grade calculation with money factor, residual value, all fees itemized, and the NJ EV 0% tax toggle. See exactly what you owe before you sign anything.
            </p>
          </div>
        </div>
      </section>

      {/* Calculator */}
      <section className="py-12 md:py-16 -mt-8 relative z-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <LeaseCalculator />
          </div>
        </div>
      </section>

      {/* How to use */}
      <section className="py-12 md:py-20 border-t border-border/40">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col mb-8 md:mb-16 justify-center items-start md:items-center">
            <span className="text-accent font-black tracking-[0.4em] uppercase text-[10px] mb-2">Guide</span>
            <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-black dark:text-white uppercase">
              How to Use <span className="text-accent italic">This Calculator</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
            {howToSteps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className="relative p-7 rounded-[2rem] border-2 border-border/60 bg-muted/5 hover:border-accent/40 transition-all group"
              >
                <span className="absolute top-4 right-5 text-6xl font-black text-black/[0.04] dark:text-white/[0.04] leading-none select-none">{i + 1}</span>
                <h3 className="font-black text-base text-black dark:text-white mb-2 group-hover:text-accent transition-colors pr-6">{step.name}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{step.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Term Explainers */}
      <section className="py-12 md:py-20 border-t border-border/40">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col mb-8 md:mb-16 justify-center items-start md:items-center">
            <span className="text-accent font-black tracking-[0.4em] uppercase text-[10px] mb-2">Glossary</span>
            <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-black dark:text-white uppercase">
              Every Term <span className="text-accent italic">Explained</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {termExplainers.map((item, i) => (
              <div key={i} className="p-6 rounded-[2rem] border-2 border-border/60 bg-muted/5 hover:border-accent/30 transition-all">
                <div className="flex items-start gap-4 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-accent/10 text-accent flex items-center justify-center shrink-0">
                    <item.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-black text-lg text-black dark:text-white">{item.term}</h3>
                    <p className="text-xs font-bold text-accent uppercase tracking-wider">{item.short}</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.explanation}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NJ-specific section */}
      <section className="py-12 md:py-20 border-t border-border/40">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
            <div>
              <span className="text-accent font-black tracking-[0.4em] uppercase text-[10px] mb-4 block">NJ-Specific</span>
              <h2 className="text-3xl md:text-4xl font-black tracking-tighter text-black dark:text-white uppercase mb-5">
                NJ Lease Math is <span className="text-accent italic">Different</span>
              </h2>
              <div className="space-y-5 text-muted-foreground">
                <p>New Jersey taxes lease payments monthly at 6.625%, not as an upfront lump sum. This is better than states like Illinois or Minnesota that front-load the full tax amount at signing.</p>
                <p>New Jersey has a full sales tax exemption for electric vehicles on leases. On a $600/month lease over 36 months, the 6.625% exemption saves you over $1,400 compared to a gas vehicle. This is one of the most generous EV lease incentives of any US state.</p>
                <p>NJ doc fees are capped at $799 by state law. Dealers charging more than that are violating NJ regulations.</p>
              </div>
            </div>
            <div className="space-y-4">
              {[
                { label: 'NJ Sales Tax on Lease', value: '6.625% monthly', note: 'Taxed per payment, not upfront' },
                { label: 'NJ EV Sales Tax', value: '0%', note: 'Full exemption for electric vehicles' },
                { label: 'NJ Doc Fee Cap', value: '$799 max', note: 'Set by NJ state law' },
                { label: 'Typical Registration', value: '$350 to $600', note: 'Varies by vehicle value' },
              ].map((row, i) => (
                <div key={i} className="flex items-center justify-between p-4 rounded-2xl border border-border/60 bg-muted/5">
                  <div>
                    <p className="font-bold text-foreground text-sm">{row.label}</p>
                    <p className="text-xs text-muted-foreground">{row.note}</p>
                  </div>
                  <span className="font-black text-accent text-lg">{row.value}</span>
                </div>
              ))}
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
              Lease Calculator <span className="text-accent italic">Questions</span>
            </h2>
          </div>
          <div className="max-w-4xl mx-auto glass-card-theme p-4 md:p-8 rounded-[2rem]">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="border-b-border/40 last:border-0">
                  <AccordionTrigger className="text-left text-base font-bold hover:text-accent transition-colors py-5">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-sm pb-5 leading-relaxed">
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
            <span className="text-accent font-black tracking-[0.4em] uppercase text-[10px] mb-2">Skip the Math</span>
            <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-black dark:text-white uppercase">
              Want the Actual <span className="text-accent italic">Number?</span>
            </h2>
            <p className="text-muted-foreground mb-4 text-lg max-w-lg mx-auto mt-4 text-center">
              The calculator uses real formulas, but your actual quote depends on your credit tier and which dealer has the best current support. We pull live numbers on any car in NJ.
            </p>
            <div className="w-full max-w-2xl mx-auto mt-4">
              <div className="glass-card-theme form-card-theme p-4 sm:p-6 md:p-8 rounded-[2.5rem]">
                <ContactForm source="calculator" serviceTitle="Lease Quote" compact />
              </div>
            </div>
          </div>
        </div>
      </section>

    </Layout>
  );
}
