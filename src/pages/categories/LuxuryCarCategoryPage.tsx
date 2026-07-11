import { CategoryLandingTemplate } from '@/components/local/CategoryLandingTemplate';
import { BadgeDollarSign, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { VehicleType } from '@/types/vehicle';

export default function LuxuryCarCategoryPage() {
  const benefits = [
    {
      title: "White Glove Concierge",
      description: "Experience premium service. We handle all negotiations, paperwork, and deliver your luxury vehicle directly to your estate or office.",
      icon: CheckCircle2
    },
    {
      title: "Always the Latest Tech",
      description: "Leasing allows you to upgrade every 2-3 years, ensuring you always have the most advanced safety, performance, and luxury features.",
      icon: ShieldCheck
    },
    {
      title: "Better Cash Flow",
      description: "Avoid tying up your capital in a depreciating asset. Leasing a luxury car often provides a significantly lower monthly payment.",
      icon: BadgeDollarSign
    }
  ];

  const faqs = [
    {
      question: "What credit score do I need to lease a luxury car?",
      answer: "Generally, top-tier luxury leases (Tier 1 credit) require a FICO auto score of 720 or higher to qualify for the most aggressive money factors and lowest payments."
    },
    {
      question: "Can I lease high-end exotics like Porsche or Bentley?",
      answer: "Yes, we broker leases for almost all high-end luxury and exotic brands, including Porsche, Bentley, Aston Martin, and Maserati, often securing terms not available directly at dealerships."
    },
    {
      question: "Are maintenance costs included in a luxury lease?",
      answer: "This depends on the manufacturer. For example, BMW includes complimentary scheduled maintenance for 3 years/36,000 miles, making their leases extremely attractive. We can advise you on which brands offer the best maintenance programs."
    },
    {
      question: "Is there a penalty for going over the mileage limit?",
      answer: "Yes, luxury vehicles typically have a higher per-mile overage charge (often $0.25 to $0.30 per mile). We highly recommend estimating your mileage accurately upfront to negotiate a high-mileage lease if needed."
    }
  ];

  // Logic to filter vehicles for the "Popular Models" section
  const filterLuxury = (vehicle: VehicleType) => {
    return vehicle.isLuxury || vehicle.displayCategory?.toLowerCase() === 'luxury';
  };

  return (
    <CategoryLandingTemplate
      categoryName="Luxury Car"
      seoTitle="Luxury Car Lease Deals NJ | Exotics & Premium Vehicles"
      seoDescription="Find the best luxury car lease deals in NJ and NY. Lease premium vehicles like Porsche, BMW, Mercedes, and Audi with zero down and white-glove delivery."
      seoKeywords={["luxury car lease deals NJ", "exotic car lease", "zero down luxury lease", "BMW lease specials", "Porsche lease specials"]}
      canonicalPath="/luxury-car-lease-deals"
      heroImage="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Porsche_911_Carrera_4S_992_front_view.jpg/1280px-Porsche_911_Carrera_4S_992_front_view.jpg"
      heroSubtitle="Experience automotive excellence without the depreciation. Let our concierge team secure the best zero down lease on your next luxury vehicle."
      benefits={benefits}
      faqs={faqs}
      vehicleFilterMatch={filterLuxury}
    />
  );
}
