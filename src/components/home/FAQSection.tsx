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
    answer: 'Car leasing allows you to drive a new vehicle for a set period (typically 24-48 months) with lower monthly payments than buying. At the end of the lease term, you can return the vehicle, purchase it, or lease a new one. We handle all the negotiations and paperwork to make the process simple and stress-free.',
  },
  {
    question: 'What credit score do I need to lease a car?',
    answer: 'While credit requirements vary by lender, most leasing companies prefer a credit score of 620 or higher. However, we work with multiple lenders and can help find options that work for various credit situations. Contact us to discuss your specific circumstances.',
  },
  {
    question: 'Can I lease a car with bad credit?',
    answer: 'Yes, it\'s possible to lease a car with less-than-perfect credit. We work with a network of lenders who specialize in various credit situations. You may need a larger down payment or have slightly higher monthly payments, but we\'ll help you find the best options available.',
  },
  {
    question: 'What happens at the end of my lease?',
    answer: 'At the end of your lease, you have three options: return the vehicle and lease a new one, purchase the vehicle at its residual value, or simply return the vehicle and walk away (subject to any end-of-lease fees). We can help you navigate all these options.',
  },
  {
    question: 'What is included in my lease payment?',
    answer: 'Your lease payment typically covers the vehicle\'s depreciation during the lease term, plus interest and fees. It does not include insurance, maintenance, or repairs. However, many leases include a warranty that covers major repairs during the lease period.',
  },
  {
    question: 'Can I customize or modify a leased vehicle?',
    answer: 'Generally, modifications to leased vehicles are not recommended as you\'ll need to return the vehicle in its original condition. However, reversible modifications like window tinting or certain accessories may be acceptable. Always check with your leasing company before making any changes.',
  },
  {
    question: 'What is the difference between leasing and financing?',
    answer: 'Leasing involves paying for the vehicle\'s depreciation over the lease term, while financing means you\'re paying toward ownership. Leases typically have lower monthly payments but you don\'t own the vehicle at the end. Financing has higher payments but you own the car once paid off.',
  },
  {
    question: 'How many miles can I drive on a leased vehicle?',
    answer: 'Most leases include 10,000-15,000 miles per year. You can negotiate for more miles upfront, or you\'ll pay an overage fee (typically $0.15-$0.25 per mile) for exceeding your limit. We can help you choose the right mileage allowance based on your driving habits.',
  },
];

export function FAQSection() {
  const { ref, isRevealed } = useScrollReveal();

  return (
    <section className="section-bg py-16 md:py-20 lg:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={ref}
          className={`scroll-reveal ${isRevealed ? 'revealed' : ''}`}
        >
          <SectionHeading
            title="Frequently Asked Questions"
            subtitle="Get answers to common questions about car leasing and our services"
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
