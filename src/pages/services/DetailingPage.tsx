import { ServiceTemplate } from '@/components/services/ServiceTemplate';
import { Sparkles } from 'lucide-react';

export default function DetailingPage() {
  return (
    <ServiceTemplate
      title="Professional Car Detailing"
      description="Comprehensive interior and exterior detailing to restore your vehicle. From basic maintenance washes to full paint correction and ceramic coating."
      heroImage="https://images.unsplash.com/photo-1601362840469-51e4d8d58785?auto=format&fit=crop&w=1920&q=80"
      icon={Sparkles}
      whoIsThisFor={[
        "Vehicle owners who take pride in appearance",
        "Sellers preparing a car for maximum value",
        "Lease holders returning their vehicle",
        "New car owners wanting protection",
        "Anyone whose car needs a deep clean",
      ]}
      commonIssues={[
        "Built-up dirt, grime, and road film",
        "Stained or odorous interiors",
        "Swirl marks and minor scratches",
        "Faded paint and oxidation",
        "Lack of protection against future damage",
      ]}
      howItWorks={[
        { title: "Assessment", description: "We evaluate your vehicle's current condition and discuss your goals." },
        { title: "Package Selection", description: "Choose from our service tiers or customize based on needs." },
        { title: "Detailing", description: "Our team performs thorough interior and exterior work." },
        { title: "Final Walkthrough", description: "Review the results and receive care recommendations." },
      ]}
      whatToExpect={[
        "Trained technicians using professional-grade products",
        "Attention to details others miss",
        "Safe, paint-friendly techniques",
        "Options from basic to show-quality",
        "Care tips to maintain results",
      ]}
      faqs={[
        { question: "What's the difference between a wash and detailing?", answer: "A wash cleans the surface. Detailing is a comprehensive process that includes deep cleaning, restoration, and protection of all surfaces—inside and out." },
        { question: "How long does a full detail take?", answer: "A thorough detail typically takes 4-8 hours depending on vehicle size and condition. Paint correction adds additional time. We'll give you a specific estimate." },
        { question: "What is paint correction?", answer: "Paint correction removes surface imperfections like swirl marks, scratches, and oxidation through careful machine polishing. It restores the paint's original clarity and depth." },
        { question: "Is ceramic coating worth it?", answer: "For many owners, yes. Ceramic coating provides long-lasting protection, makes cleaning easier, and enhances appearance. It's an investment that pays off over time." },
        { question: "Can you remove pet hair and odors?", answer: "Yes, we have specialized tools and products for pet hair extraction and odor elimination. Let us know about specific concerns when booking." },
      ]}
    />
  );
}
