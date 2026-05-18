import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { useScrollReveal } from '@/hooks/useScrollReveal';

const faqData = [
  {
    question: 'How does car leasing work?',
    answer: 'Car leasing allows you to drive a new vehicle for a set period (typically 24-48 months) with lower monthly payments than buying. At the end of the lease term, you can return the vehicle, purchase it, or lease a new one. We handle all the negotiations and paperwork to make the process simple and stress free.',
  },
  {
    question: 'Can you help me lease a car near me?',
    answer: 'Yes. If you are searching to lease a car near me in New Jersey, we can help you compare car lease deals, auto leasing options, and the right vehicle for your budget.',
  },
  {
    question: 'Do you offer monthly car lease deals?',
    answer: 'Yes. We regularly help shoppers review monthly car lease deals, including options that balance payment, mileage, and upfront cost.',
  },
  {
    question: 'What are the best car lease deals right now?',
    answer: 'The best car lease deals depend on the model, timing, and incentive structure. We help compare offers so you can see which new car lease deals or SUV lease deals make the most sense.',
  },
  {
    question: 'Do you have cheap car lease deals and new car lease deals?',
    answer: 'Yes. When the numbers work, we can point you toward cheap car lease deals and new car lease deals that fit the budget without making the process confusing.',
  },
  {
    question: 'Can I lease a car with bad credit?',
    answer: 'Yes, it\'s possible to lease a car with less than perfect credit. We work with a network of lenders who specialize in various credit situations. You may need a larger down payment or have slightly higher monthly payments, but we\'ll help you find the best options available.',
  },
  {
    question: 'What is included in my lease payment?',
    answer: 'Your lease payment typically covers the vehicle\'s depreciation during the lease term, plus interest and fees. It does not include insurance, maintenance, or repairs. However, many leases include a warranty that covers major repairs during the lease period.',
  },
  {
    question: 'What is the difference between leasing and buying a car?',
    answer: 'Leasing involves paying for the vehicle\'s depreciation over the lease term, while a purchase loan builds equity toward ownership. Leases typically have lower monthly payments but you don\'t own the vehicle at the end. Buying usually has higher payments but you own the car once it is paid off.',
  },
];

export function FAQSection() {
  const { ref, isRevealed } = useScrollReveal();

  return (
    <section className=" py-16 md:py-20 lg:py-24 ">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={ref}
          className={`scroll-reveal ${isRevealed ? 'revealed' : ''}`}
        >
          <SectionHeading
            title="Frequently Asked Questions"
            subtitle="Get answers to common questions about car leasing, auto leasing, monthly car lease deals, and more"
            align="center"
          />

          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="w-full">
              {faqData.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="border-border dark:border-white/10 px-4 md:px-6 rounded-lg bg-card dark:bg-white/[0.04] mb-4 shadow-sm dark:shadow-[0_2px_8px_rgba(0,0,0,0.1)]"
                >
                  <AccordionTrigger className="text-left text-base md:text-lg font-semibold text-foreground dark:text-white hover:no-underline py-4 md:py-5">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm md:text-base text-muted-foreground dark:text-white/80 leading-relaxed pb-4 md:pb-5">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
}
