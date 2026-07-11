import { CategoryLandingTemplate } from '@/components/local/CategoryLandingTemplate';
import { BadgeDollarSign, ShieldCheck, Landmark } from 'lucide-react';
import { VehicleType } from '@/types/vehicle';

export default function TruckCategoryPage() {
  const benefits = [
    {
      title: "Commercial & Personal",
      description: "Whether you need a heavy-duty work truck for your business or a comfortable daily driver, we have the perfect lease.",
      icon: ShieldCheck
    },
    {
      title: "Business Tax Write-Offs",
      description: "Leasing a truck for your business can provide significant tax advantages and deductions. Consult your accountant to maximize these benefits.",
      icon: Landmark
    },
    {
      title: "Zero Down Capabilities",
      description: "Keep your capital free for your business or personal life with our flexible, sign-and-drive truck lease options.",
      icon: BadgeDollarSign
    }
  ];

  const faqs = [
    {
      question: "Can I lease a truck for my business?",
      answer: "Absolutely. Commercial truck leasing is very popular. You can lease vehicles under your business name, which often provides excellent tax write-offs and keeps your fleet up to date."
    },
    {
      question: "What are the most popular trucks to lease?",
      answer: "The RAM 1500, Ford F-150, Chevy Silverado, and GMC Sierra are our most requested trucks. We can source any cab size, bed length, and trim level."
    },
    {
      question: "Are truck leases more expensive than car leases?",
      answer: "Not necessarily. Trucks actually hold their resale value (residual value) incredibly well. Because you only pay for the depreciation during the lease, high residual values often result in very attractive monthly lease payments."
    },
    {
      question: "Can I customize a leased truck?",
      answer: "Minor, reversible modifications (like a bed liner or tonneau cover) are usually fine, but heavy modifications (like lift kits) are generally restricted by the leasing company. Ask your broker for details."
    }
  ];

  // Logic to filter vehicles for the "Popular Models" section
  const filterTrucks = (vehicle: VehicleType) => {
    return vehicle.bodyStyle?.toLowerCase() === 'truck' || vehicle.displayCategory?.toLowerCase() === 'truck';
  };

  return (
    <CategoryLandingTemplate
      categoryName="Truck"
      seoTitle="Truck Lease Deals NJ & NY | Zero Down Pickup Specials"
      seoDescription="Find aggressive zero down truck lease deals in New Jersey and New York. Lease a Ford F-150, RAM 1500, or Chevy Silverado with flexible terms."
      seoKeywords={["truck lease deals NJ", "pickup truck lease", "zero down truck lease", "commercial truck lease"]}
      canonicalPath="/truck-lease-deals"
      heroImage="https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/2019_Ram_1500_Laramie_Crew_Cab_4x4_5.7L_front_4.27.18.jpg/1280px-2019_Ram_1500_Laramie_Crew_Cab_4x4_5.7L_front_4.27.18.jpg"
      heroSubtitle="From heavy-duty commercial workhorses to luxury daily drivers. Let us negotiate the best zero down truck lease for you."
      benefits={benefits}
      faqs={faqs}
      vehicleFilterMatch={filterTrucks}
    />
  );
}
