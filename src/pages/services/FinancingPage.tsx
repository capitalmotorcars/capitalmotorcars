import { ServiceTemplate } from '@/components/services/ServiceTemplate';
import { CreditCard } from 'lucide-react';

export default function FinancingPage() {
  return (
    <ServiceTemplate
      title="Financing & Credit Application"
      description="Competitive financing options tailored to your situation. We work with multiple lenders to find rates and terms that work for you."
      heroImage="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?auto=format&fit=crop&w=1920&q=80"
      icon={CreditCard}
      whoIsThisFor={[
        "Buyers looking for competitive interest rates",
        "Those with less-than-perfect credit seeking options",
        "First-time buyers needing guidance through the process",
        "People refinancing existing auto loans",
        "Anyone who wants to understand their financing options before committing",
      ]}
      commonIssues={[
        "Confusion about APR, loan terms, and total cost of ownership",
        "Being pushed toward dealer financing without seeing alternatives",
        "Uncertainty about what you can realistically afford",
        "Difficulty getting approved with credit challenges",
        "Hidden fees buried in financing documents",
      ]}
      howItWorks={[
        { title: "Application", description: "Complete our simple preliminary application—it takes just a few minutes." },
        { title: "Review", description: "We review your situation and present options from our lending partners." },
        { title: "Comparison", description: "We help you compare offers and understand the true cost of each." },
        { title: "Approval", description: "Choose your preferred option and complete the formal application." },
      ]}
      whatToExpect={[
        "Multiple lender options to compare",
        "Clear breakdown of rates, terms, and total costs",
        "Honest assessment of your approval likelihood",
        "No impact on credit for initial consultation",
        "Support throughout the entire process",
      ]}
      faqs={[
        { question: "Will applying hurt my credit score?", answer: "Our initial consultation and soft inquiry won't affect your score. A hard inquiry only happens when you formally apply for financing, and you'll know before that occurs." },
        { question: "What if I have bad credit?", answer: "We work with lenders who specialize in various credit situations. While rates may be higher, we can often find options and help you understand how to improve your position over time." },
        { question: "How long does approval take?", answer: "Many approvals come within 24-48 hours. Some may take longer depending on the lender and documentation required." },
        { question: "Can I refinance my current loan through you?", answer: "Yes, if rates have dropped or your credit has improved, refinancing could lower your monthly payment or total interest paid." },
        { question: "What documents do I need?", answer: "Typically: valid ID, proof of income, proof of residence, and information about the vehicle. We'll tell you exactly what's needed for your situation." },
      ]}
    />
  );
}
