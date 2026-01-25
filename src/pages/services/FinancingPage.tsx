import { ServiceTemplate } from '@/components/services/ServiceTemplate';
import { serviceLinks } from '@/components/ui/RelatedLinks';
import { CreditCard } from 'lucide-react';

export default function FinancingPage() {
  return (
    <ServiceTemplate
      title="Financing & Credit Application"
      metaTitle="Auto Financing & Credit | Capital Motor Cars"
      metaDescription="Simple auto financing with a quick credit application. Get clear answers about your options without unnecessary paperwork."
      description="A simple online credit application to review financing options without unnecessary paperwork. This is for customers who want a clear answer about financing, quickly."
      heroImage="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?auto=format&fit=crop&w=1200&q=60"
      serviceValue="financing"
      icon={CreditCard}
      whoIsThisFor={[
        "Customers who prefer a guided process",
        "Those who want a clear answer about financing quickly",
        "Anyone looking to compare financing options easily",
      ]}
      commonIssues={[
        "Unclear options and pricing",
        "Time-consuming back-and-forth calls",
        "Unexpected costs",
        "Complicated paperwork",
      ]}
      howItWorks={[
        { title: "Conversation", description: "A brief conversation to understand your situation." },
        { title: "Options", description: "Review of relevant financing options." },
        { title: "Coordination", description: "Coordination and execution." },
        { title: "Approval", description: "Final approval and follow-up." },
      ]}
      whatToExpect={[
        "Direct answers",
        "Clear recommendations",
        "Ongoing communication",
        "A process that actually moves forward",
      ]}
      faqs={[
        { question: "How long does it typically take?", answer: "It depends on the service, but we strive to keep things efficient and predictable." },
        { question: "Do I need to deal with lenders myself?", answer: "In most cases, no. We handle the coordination." },
        { question: "Is there a commitment to move forward?", answer: "No. It starts with a conversation." },
      ]}
      relatedLinks={serviceLinks.financing}
    />
  );
}
