import { CategoryLandingTemplate } from '@/components/local/CategoryLandingTemplate';
import { BadgeDollarSign, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { VehicleType } from '@/types/vehicle';

export default function SUVCategoryPage() {
  const benefits = [
    {
      title: "Zero Down Options",
      description: "Keep your cash in your pocket with our sign and drive lease programs available on top-tier SUVs.",
      icon: BadgeDollarSign
    },
    {
      title: "Maximum Versatility",
      description: "Whether you need 3rd-row seating for the family or massive cargo space for gear, an SUV handles it all.",
      icon: ShieldCheck
    },
    {
      title: "Door-to-Door Delivery",
      description: "We negotiate the price, handle the paperwork, and deliver your new SUV right to your driveway.",
      icon: CheckCircle2
    }
  ];

  const faqs = [
    {
      question: "Can I lease an SUV with zero down payment?",
      answer: "Yes! Capital Motor Cars specializes in zero-down sign-and-drive SUV leases. The only upfront costs are usually the first month's payment, bank fee, and local taxes/registration fees."
    },
    {
      question: "What are the most popular 3-row SUVs to lease?",
      answer: "Highly requested 3-row SUVs include the Chevrolet Traverse, Honda Pilot, Kia Telluride, and luxury options like the BMW X7 and Mercedes-Benz GLS. Our brokers can find specific trims and colors for you."
    },
    {
      question: "Is leasing an SUV cheaper than financing one?",
      answer: "Generally, yes. Leasing an SUV typically results in a lower monthly payment compared to financing because you are only paying for the vehicle's depreciation during the lease term, not the full purchase price."
    },
    {
      question: "How many miles am I allowed on an SUV lease?",
      answer: "Standard SUV leases come with 10,000 to 12,000 miles per year, but we can customize your lease contract to include 15,000 or even up to 20,000 miles if you frequently drive."
    }
  ];

  // Logic to filter vehicles for the "Popular Models" section
  const filterSUVs = (vehicle: VehicleType) => {
    return vehicle.bodyStyle?.toLowerCase() === 'suv' || vehicle.displayCategory?.toLowerCase() === 'suv';
  };

  return (
    <CategoryLandingTemplate
      categoryName="SUV"
      seoTitle="SUV Lease Deals NJ & NY | Zero Down SUV Specials"
      seoDescription="Find aggressive zero down SUV lease deals in New Jersey and New York. Lease a luxury SUV or a family crossover with flexible terms."
      seoKeywords={["SUV lease deals NJ", "SUV lease specials NY", "zero down SUV lease", "luxury SUV lease deals"]}
      canonicalPath="/suv-lease-deals"
      heroImage="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/2019_BMW_X5_M50d_Automatic_3.0.jpg/1280px-2019_BMW_X5_M50d_Automatic_3.0.jpg"
      heroSubtitle="From spacious 3-row family haulers to ultra-luxury performance crossovers. Let us negotiate the best zero down SUV lease for you."
      benefits={benefits}
      faqs={faqs}
      vehicleFilterMatch={filterSUVs}
    />
  );
}
