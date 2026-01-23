import { ServiceTemplate } from '@/components/services/ServiceTemplate';
import { serviceLinks } from '@/components/ui/RelatedLinks';
import { Wrench } from 'lucide-react';

export default function WearAndTearPage() {
  return (
    <ServiceTemplate
      title="Wear & Tear Repair"
      metaTitle="End-of-Lease Wear & Tear Repair | Capital Motor Cars"
      metaDescription="Reduce lease return penalties with pre-inspection repairs. We coordinate fixes to avoid unexpected charges at turn-in."
      description="End-of-lease repairs focused on reducing penalties and unexpected charges. Ideal for lease returns that require minor repairs before inspection."
      heroImage="https://images.unsplash.com/photo-1487754180451-c456f719a1fc?auto=format&fit=crop&w=1200&q=60"
      icon={Wrench}
      whoIsThisFor={[
        "Customers returning a leased vehicle",
        "Those with minor damage that could result in fees",
        "Anyone wanting repairs done before the inspection",
      ]}
      commonIssues={[
        "Unclear options and pricing",
        "Time-consuming back-and-forth calls",
        "Unexpected costs at lease return",
        "Complications at the end of a lease",
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
      relatedLinks={serviceLinks.wearAndTear}
    />
  );
}
