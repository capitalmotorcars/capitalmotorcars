import { ServiceTemplate } from '@/components/services/ServiceTemplate';
import { RefreshCw } from 'lucide-react';

export default function TradeInPage() {
  return (
    <ServiceTemplate
      title="Trade-In"
      metaTitle="Vehicle Trade-In Services | Capital Motor Cars"
      metaDescription="Get a fair evaluation for your trade-in. We manage the entire process to prevent undervaluation and save you time."
      description="We help evaluate your current vehicle and manage the trade-in process when you trade in a vehicle. This helps prevent undervaluation and wasted time."
      heroImage="https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=1920&q=80"
      icon={RefreshCw}
      whoIsThisFor={[
        "Customers who prefer a guided process",
        "Those trading in a vehicle as part of a new lease or purchase",
        "Anyone wanting a fair evaluation without the runaround",
      ]}
      commonIssues={[
        "Unclear options and pricing",
        "Time-consuming back-and-forth calls",
        "Unexpected costs",
        "Undervaluation of your vehicle",
      ]}
      howItWorks={[
        { title: "Conversation", description: "A brief conversation to understand your situation." },
        { title: "Options", description: "Review of relevant options." },
        { title: "Coordination", description: "Coordination and execution." },
        { title: "Follow-Up", description: "Final approval and follow-up." },
      ]}
      whatToExpect={[
        "Direct answers",
        "Clear recommendations",
        "Ongoing communication",
        "A process that actually moves forward",
      ]}
      faqs={[
        { question: "How long does it typically take?", answer: "It depends on the service, but we strive to keep things efficient and predictable." },
        { question: "Do I need to deal with buyers myself?", answer: "In most cases, no. We handle the coordination." },
        { question: "Is there a commitment to move forward?", answer: "No. It starts with a conversation." },
      ]}
    />
  );
}
