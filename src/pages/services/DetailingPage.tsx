import { ServiceTemplate } from '@/components/services/ServiceTemplate';
import { serviceLinks } from '@/components/ui/RelatedLinks';
import { Sparkles } from 'lucide-react';

export default function DetailingPage() {
  return (
    <ServiceTemplate
      title="Professional Automotive Detailing"
      metaTitle="Car Detailing Services | Capital Motor Cars"
      metaDescription="Interior and exterior car detailing for lease returns, resale, or a proper clean. Professional results, coordinated for you."
      description="Interior and exterior detailing for vehicles that are being returned, sold or simply cleaned properly."
      heroImage="https://images.unsplash.com/photo-1601362840469-51e4d8d58785?auto=format&fit=crop&w=1200&q=60"
      icon={Sparkles}
      whoIsThisFor={[
        "Customers returning a leased vehicle",
        "Those selling a vehicle",
        "Anyone wanting their vehicle properly cleaned",
      ]}
      commonIssues={[
        "Unclear options and pricing",
        "Time-consuming back-and-forth calls",
        "Unexpected costs",
        "Finding reliable detailing services",
      ]}
      howItWorks={[
        { title: "Conversation", description: "A brief conversation to understand your situation." },
        { title: "Options", description: "Review of relevant detailing options." },
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
        { question: "How long does it typically take?", answer: "It depends on the service level, but we strive to keep things efficient and predictable." },
        { question: "Do I need to deal with detailing shops myself?", answer: "In most cases, no. We handle the coordination." },
        { question: "Is there a commitment to move forward?", answer: "No. It starts with a conversation." },
      ]}
      relatedLinks={serviceLinks.detailing}
    />
  );
}
