import { ServiceTemplate } from '@/components/services/ServiceTemplate';
import { Car } from 'lucide-react';

export default function CarLeasingPage() {
  return (
    <ServiceTemplate
      title="Car Leasing"
      metaTitle="Car Leasing Services | Capital Motor Cars"
      metaDescription="Find the right car lease without dealership hassle. We negotiate, coordinate, and guide you through every step. Serving New Jersey."
      description="We help you find a lease that fits your budget and needs, without spending hours negotiating at dealerships."
      heroImage="https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=1920&q=80"
      icon={Car}
      whoIsThisFor={[
        "Customers who prefer a guided process",
        "Those who want to avoid dealing with multiple dealerships",
        "Drivers who value predictable monthly costs",
        "Anyone looking for a simpler leasing experience",
      ]}
      commonIssues={[
        "Unclear options and pricing",
        "Time-consuming back-and-forth calls",
        "Unexpected costs",
        "Complications at the end of a lease",
      ]}
      howItWorks={[
        { title: "Tell Us", description: "You tell us what you are looking for." },
        { title: "Search", description: "We locate available leasing options." },
        { title: "Review", description: "We review the terms together." },
        { title: "Coordinate", description: "We coordinate the next steps." },
      ]}
      whatToExpect={[
        "Direct answers",
        "Clear recommendations",
        "Ongoing communication",
        "A process that actually moves forward",
      ]}
      faqs={[
        { question: "How long does it typically take?", answer: "It depends on the vehicle availability and your requirements, but we strive to keep things efficient and predictable." },
        { question: "Do I need to deal with dealerships myself?", answer: "In most cases, no. We handle the coordination." },
        { question: "Is there a commitment to move forward?", answer: "No. It starts with a conversation." },
      ]}
    />
  );
}
