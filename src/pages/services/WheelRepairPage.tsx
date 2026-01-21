import { ServiceTemplate } from '@/components/services/ServiceTemplate';
import { CircleDot } from 'lucide-react';

export default function WheelRepairPage() {
  return (
    <ServiceTemplate
      title="Rim, Wheel & Tire Repair"
      description="From curb rash to bent rims, we restore your wheels to excellent condition. Quality repairs and replacements to keep you rolling safely."
      heroImage="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1920&q=80"
      icon={CircleDot}
      whoIsThisFor={[
        "Anyone with curb-damaged wheels",
        "Drivers needing tire replacement or repair",
        "Vehicle owners wanting wheel refinishing",
        "Those with bent or damaged rims",
        "People seeking wheel alignment services",
      ]}
      commonIssues={[
        "Curb rash and scrapes from parking",
        "Bent rims from potholes",
        "Tire punctures and slow leaks",
        "Uneven tire wear from alignment issues",
        "Oxidized or corroded wheel finish",
      ]}
      howItWorks={[
        { title: "Inspection", description: "We examine your wheels and tires to identify all issues." },
        { title: "Recommendation", description: "Get a clear explanation of repair vs. replacement options." },
        { title: "Service", description: "Our technicians perform the agreed-upon work." },
        { title: "Quality Check", description: "Final inspection ensures everything meets our standards." },
      ]}
      whatToExpect={[
        "Honest assessment of repair feasibility",
        "OEM-quality materials and finishes",
        "Proper balancing after any wheel work",
        "Competitive pricing on tires",
        "Fast turnaround for most services",
      ]}
      faqs={[
        { question: "Can curb rash actually be fixed?", answer: "Yes, most curb damage can be repaired. We refinish the damaged area to match the original wheel finish. Severe structural damage may require replacement." },
        { question: "How do I know if my rim is bent?", answer: "Signs include vibration at certain speeds, visible wobble when spinning, or slow air leaks. We can inspect and measure to confirm." },
        { question: "Do you work on all wheel types?", answer: "We handle most alloy and steel wheels. Some specialty finishes (chrome, certain multi-piece wheels) may require specialized shops—we'll tell you upfront." },
        { question: "Can you match my original wheel finish?", answer: "In most cases, yes. We stock common finishes and can custom-match others. We'll show you samples before proceeding." },
        { question: "How long does wheel refinishing take?", answer: "Typically 1-2 days for standard refinishing. Complex finishes or multiple wheels may take longer." },
      ]}
    />
  );
}
