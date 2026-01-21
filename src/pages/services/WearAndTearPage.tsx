import { ServiceTemplate } from '@/components/services/ServiceTemplate';
import { Wrench } from 'lucide-react';

export default function WearAndTearPage() {
  return (
    <ServiceTemplate
      title="Wear & Tear Repair"
      description="Address lease-end concerns before they become costly charges. We handle everything from minor scratches to interior repairs at fair prices."
      heroImage="https://images.unsplash.com/photo-1487754180451-c456f719a1fc?auto=format&fit=crop&w=1920&q=80"
      icon={Wrench}
      whoIsThisFor={[
        "Lease holders approaching their return date",
        "Anyone with minor damage they want fixed affordably",
        "Vehicle owners preparing for resale",
        "Fleet managers maintaining vehicle condition",
        "Drivers who want their car looking its best",
      ]}
      commonIssues={[
        "Anxiety about excessive wear charges at lease end",
        "Small dents and door dings from parking lots",
        "Interior stains and minor tears",
        "Scuffed bumpers and scratched trim",
        "Faded or damaged exterior paint",
      ]}
      howItWorks={[
        { title: "Assessment", description: "We inspect your vehicle and identify all areas of concern." },
        { title: "Quote", description: "Receive a detailed, itemized quote for each repair." },
        { title: "Repair", description: "Our technicians handle the work at our facility or on-site." },
        { title: "Inspection", description: "Review the completed work before final payment." },
      ]}
      whatToExpect={[
        "Honest assessment of what needs fixing vs. what's within normal wear",
        "Competitive pricing compared to dealer charges",
        "Quality repairs that meet or exceed manufacturer standards",
        "Fast turnaround to fit your schedule",
        "Documentation for lease return purposes",
      ]}
      faqs={[
        { question: "How do I know what the leasing company will charge me?", answer: "We can help you understand typical wear guidelines and assess which items are likely to trigger charges. Often, fixing them beforehand costs less than the lease-end fees." },
        { question: "Can you fix everything?", answer: "We handle most common wear issues: paint scratches, dents, interior damage, bumper scuffs, and more. For major body damage, we can refer you to appropriate specialists." },
        { question: "How long do repairs take?", answer: "Most repairs are completed in 1-3 days depending on scope. We'll give you a specific timeline with your quote." },
        { question: "Do you offer mobile service?", answer: "For minor repairs, yes. We can often come to your home or office. Larger repairs are done at our facility." },
        { question: "Will the repairs be visible?", answer: "Our goal is invisible repairs. We use proper techniques and materials to ensure repairs blend seamlessly with the original finish." },
      ]}
    />
  );
}
