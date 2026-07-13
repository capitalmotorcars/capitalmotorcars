import { CategoryLandingTemplate } from '@/components/local/CategoryLandingTemplate';
import { BadgeDollarSign, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { VehicleType } from '@/types/vehicle';

export default function MinivanCategoryPage() {
  const benefits = [
    {
      title: "Ultimate Family Vehicle",
      description: "Nothing beats a minivan for family road trips, school runs, and grocery hauls. Enjoy sliding doors, rear entertainment, and maximum cargo space.",
      icon: ShieldCheck
    },
    {
      title: "Zero Down Family Budgeting",
      description: "Keep your family's savings intact with our zero down sign and drive lease programs, allowing for a predictable, low monthly payment.",
      icon: BadgeDollarSign
    },
    {
      title: "Door-to-Door Delivery",
      description: "Don't spend your weekend dragging kids to a dealership. We negotiate the price and deliver the new minivan right to your driveway.",
      icon: CheckCircle2
    }
  ];

  const faqs = [
    {
      question: "Are minivans still popular to lease?",
      answer: "Absolutely. While SUVs are popular, the minivan remains the undisputed king of passenger comfort and interior volume. Models like the Honda Odyssey and Chrysler Pacifica are highly requested."
    },
    {
      question: "Can I lease a hybrid minivan?",
      answer: "Yes! The Chrysler Pacifica Plug-in Hybrid and the Toyota Sienna (which is exclusively hybrid) are incredibly popular leases that offer massive savings on gas."
    },
    {
      question: "What is the best minivan for a large family?",
      answer: "The Honda Odyssey, Toyota Sienna, Chrysler Pacifica, and Kia Carnival all offer fantastic 7 or 8 passenger seating. Our brokers can help you decide which model has the exact features your family needs."
    },
    {
      question: "Do minivans come with rear-seat entertainment systems?",
      answer: "Yes, many higher trims offer built-in rear entertainment (DVD/Blu-ray or streaming screens). Let us know this is a priority, and we will source the exact trim level for you."
    }
  ];

  // Logic to filter vehicles for the "Popular Models" section
  const filterMinivans = (vehicle: VehicleType) => {
    return vehicle.bodyStyle?.toLowerCase() === 'minivan' || vehicle.displayCategory?.toLowerCase() === 'minivan';
  };

  return (
    <CategoryLandingTemplate
      categoryName="Minivan"
      seoTitle="Minivan Lease Deals NJ & NY | Zero Down Family Specials"
      seoDescription="Find the best zero down minivan lease deals in New Jersey and New York. Lease a Honda Odyssey, Toyota Sienna, or Chrysler Pacifica with flexible terms."
      seoKeywords={["minivan lease deals NJ", "Honda Odyssey lease NJ", "zero down minivan lease", "family car lease specials"]}
      canonicalPath="/minivan-lease-deals"
      heroImage="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/2021_Toyota_Sienna_XLE_Hybrid_AWD%2C_front_12.18.20.jpg/1280px-2021_Toyota_Sienna_XLE_Hybrid_AWD%2C_front_12.18.20.jpg"
      heroSubtitle="Maximize space, comfort, and safety for your family. Let our expert brokers find the absolute best zero down minivan lease for you."
      benefits={benefits}
      faqs={faqs}
      vehicleFilterMatch={filterMinivans}
    />
  );
}
