import { CategoryLandingTemplate } from '@/components/local/CategoryLandingTemplate';
import { BadgeDollarSign, ShieldCheck, Zap } from 'lucide-react';
import { VehicleType } from '@/types/vehicle';

export default function ElectricVehicleEVCategoryPage() {
  const benefits = [
    {
      title: "Massive Tax Credits",
      description: "Take advantage of federal and state EV tax credits instantly applied to your lease to dramatically lower your monthly payment.",
      icon: BadgeDollarSign
    },
    {
      title: "Zero Gas & Low Maintenance",
      description: "Never visit a gas station again. Electric vehicles require significantly less maintenance than gas-powered cars.",
      icon: Zap
    },
    {
      title: "Cutting Edge Tech",
      description: "Leasing an EV allows you to drive the most advanced vehicles on the road today, and upgrade in a few years as battery tech improves.",
      icon: ShieldCheck
    }
  ];

  const faqs = [
    {
      question: "Do I get the $7,500 Federal Tax Credit if I lease an EV?",
      answer: "Yes! When you lease an EV, the leasing company receives the federal tax credit and passes it directly to you as a capitalized cost reduction, which heavily discounts your lease."
    },
    {
      question: "What are the most popular EVs to lease?",
      answer: "The Tesla Model 3 and Model Y, Hyundai Ioniq 5, Ford Mustang Mach-E, and luxury EVs like the Porsche Taycan and Audi e-tron are highly requested."
    },
    {
      question: "Why is leasing an EV better than buying?",
      answer: "EV technology and battery ranges are improving rapidly. Leasing allows you to drive the latest tech for 2-3 years and easily upgrade to a newer, longer-range model without worrying about battery degradation or resale value."
    },
    {
      question: "Are there additional EV incentives in New Jersey?",
      answer: "Yes, New Jersey often offers additional state-level incentives, including zero sales tax on pure electric vehicles and the Charge Up New Jersey rebate program. Our brokers handle all of this for you."
    }
  ];

  // Logic to filter vehicles for the "Popular Models" section
  const filterEVs = (vehicle: VehicleType) => {
    return vehicle.fuelTypes?.some(f => f.toLowerCase() === 'electric') || vehicle.displayCategory?.toLowerCase() === 'ev';
  };

  return (
    <CategoryLandingTemplate
      categoryName="Electric Vehicle"
      seoTitle="Electric Vehicle (EV) Lease Deals NJ | Zero Down"
      seoDescription="Find the best EV lease deals in NJ and NY. Maximize your federal tax credits and drive the latest electric vehicles with zero down."
      seoKeywords={["EV lease deals NJ", "electric car lease", "zero down EV lease", "Tesla lease NJ"]}
      canonicalPath="/ev-lease-deals"
      heroImage="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Tesla_Model_3_cropped.jpg/1200px-Tesla_Model_3_cropped.jpg"
      heroSubtitle="Maximize your tax credits and minimize your carbon footprint. Let us find the absolute best electric vehicle lease for you."
      benefits={benefits}
      faqs={faqs}
      vehicleFilterMatch={filterEVs}
    />
  );
}
