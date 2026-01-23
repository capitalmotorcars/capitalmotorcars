import { ServiceTemplate } from '@/components/services/ServiceTemplate';
import { CircleDot } from 'lucide-react';

export default function WheelRepairPage() {
  return (
    <ServiceTemplate
      title="Rim, Wheel & Tire Repair"
      metaTitle="Wheel & Tire Repair Services | Capital Motor Cars"
      metaDescription="Wheel and tire repair, from curb rash to full restoration. Cosmetic and functional fixes coordinated by our team."
      description="Repair and restoration of wheels and tires, both cosmetic and functional."
      heroImage="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1200&q=60"
      icon={CircleDot}
      whoIsThisFor={[
        "Customers with curb rash or wheel damage",
        "Those needing tire replacement or repair",
        "Anyone wanting their wheels restored",
      ]}
      commonIssues={[
        "Unclear options and pricing",
        "Time-consuming back-and-forth calls",
        "Unexpected costs",
        "Finding reliable repair services",
      ]}
      howItWorks={[
        { title: "Conversation", description: "A brief conversation to understand your situation." },
        { title: "Options", description: "Review of relevant repair options." },
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
        { question: "How long does it typically take?", answer: "It depends on the repairs needed, but we strive to keep things efficient and predictable." },
        { question: "Do I need to deal with repair shops myself?", answer: "In most cases, no. We handle the coordination." },
        { question: "Is there a commitment to move forward?", answer: "No. It starts with a conversation." },
      ]}
    />
  );
}
