import { ServiceTemplate } from '@/components/services/ServiceTemplate';
import { Car } from 'lucide-react';

export default function CarLeasingPage() {
  return (
    <ServiceTemplate
      title="Car Leasing"
      description="Get behind the wheel with flexible lease terms on a wide selection of vehicles. We simplify the process so you can focus on driving."
      heroImage="https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=1920&q=80"
      icon={Car}
      whoIsThisFor={[
        "First-time car lessees looking for guidance",
        "Professionals who want predictable monthly costs",
        "Drivers who prefer newer vehicles every few years",
        "Business owners seeking fleet solutions",
        "Anyone tired of the traditional dealership experience",
      ]}
      commonIssues={[
        "Confusion about lease terms, residual values, and money factors",
        "Difficulty comparing offers from different dealers",
        "Uncertainty about what's included vs. extra",
        "Pressure to buy add-ons you don't need",
        "End-of-lease anxiety about wear and fees",
      ]}
      howItWorks={[
        { title: "Consultation", description: "We discuss your needs, budget, and vehicle preferences in a no-pressure conversation." },
        { title: "Vehicle Selection", description: "We present options from our network of brand partners that match your criteria." },
        { title: "Terms Review", description: "We walk through every detail of the lease so there are no surprises." },
        { title: "Delivery", description: "Sign the paperwork and drive away in your new vehicle." },
      ]}
      whatToExpect={[
        "Transparent pricing with no hidden fees",
        "Access to multiple brands and models",
        "Clear explanation of all terms and conditions",
        "Ongoing support throughout your lease",
        "Help with end-of-lease options when the time comes",
      ]}
      faqs={[
        { question: "What credit score do I need to lease?", answer: "While requirements vary by lender, we work with multiple financing partners and can often find solutions for a range of credit situations. We'll give you an honest assessment upfront." },
        { question: "Can I negotiate lease terms?", answer: "Absolutely. Many lease terms are negotiable, and we help you understand which ones to focus on for the best overall value." },
        { question: "What happens at the end of my lease?", answer: "You typically have three options: return the vehicle, purchase it at the residual value, or lease a new one. We'll help you evaluate each option." },
        { question: "Are there mileage limits?", answer: "Yes, most leases have annual mileage limits (usually 10,000-15,000 miles). We help you choose the right limit and explain excess mileage costs." },
        { question: "Do you handle business leases?", answer: "Yes, we work with businesses of all sizes for individual vehicles or fleet arrangements. Business leasing can offer tax advantages worth exploring." },
      ]}
    />
  );
}
