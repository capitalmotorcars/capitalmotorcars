import { VehicleModelLandingTemplate } from '@/components/local/VehicleModelLandingTemplate';
import type { VehicleModelData } from '@/components/local/VehicleModelLandingTemplate';

const data: VehicleModelData = {
  make: "Audi",
  model: "Q7",
  fullName: "Audi Q7",
  slug: "audi-q7-lease-nj",
  heroImage: "/model-images/audi-q7.jpg",
  category: "3-Row Luxury SUV",
  isEV: false,
  msrpStart: 60500,
  leaseStart: 679,
  leaseEnd: 989,
  highlights: [
  "Standard three-row 7-passenger luxury seating with power-folding third-row seatbacks",
  "45 TFSI: 261hp turbocharged four-cylinder delivering solid fuel economy and daily commuting punch",
  "55 TFSI: 335hp turbocharged 3.0L V6 with 48V mild hybrid system and 7,700 lbs towing capacity",
  "Standard Quattro all-wheel drive with self-locking center differential for supreme winter traction",
  "Audi Virtual Cockpit Plus with high-resolution 12.3-inch instrument display and Google Earth maps",
  "Aggressive Audi Financial dealer volume allowances make the Q7 one of the best 3-row lease values"
],
  whyLease: "The Audi Q7 represents the premier German value in the three-row midsize luxury crossover class. Known for its quiet passenger compartment, impeccable interior fit and finish, and surefooted all-weather confidence, the Q7 offers lower monthly lease payments than the BMW X5 and Mercedes GLE. Capital Motor Cars sources wholesale allocations from top Audi regional centers, delivering your new Q7 directly to your doorstep.",
  trims: [
  {
    "name": "Q7 Premium 45 TFSI",
    "leasePrice": 679,
    "keyFeatures": [
      "19-inch 5-arm star design wheels",
      "Audi Virtual Cockpit Plus",
      "Leather seating surfaces with heated front seats",
      "Audi pre sense front and lane departure warning",
      "Power tailgate"
    ]
  },
  {
    "name": "Q7 Premium Plus 55 TFSI",
    "leasePrice": 799,
    "popular": true,
    "keyFeatures": [
      "335 hp turbocharged V6",
      "Bang and Olufsen 3D Premium Sound System",
      "Top view camera system with Virtual 360 view",
      "Matrix-design LED headlights",
      "Wireless phone charging pad"
    ]
  },
  {
    "name": "Q7 Prestige 55 TFSI",
    "leasePrice": 949,
    "keyFeatures": [
      "Adaptive air suspension",
      "Head-up display with traffic sign recognition",
      "Power soft-closing doors",
      "Remote park assist plus",
      "Comfort front seats with ventilation"
    ]
  },
  {
    "name": "SQ7 Performance",
    "leasePrice": 1299,
    "keyFeatures": [
      "500 hp twin-turbo 4.0L V8",
      "Sport adaptive air suspension with all-wheel steering",
      "21-inch 5-double-spoke modular wheels",
      "Diamond-stitched Valcona leather sport seats",
      "Quad exhaust tailpipes"
    ]
  }
],
  faqs: [
  {
    "question": "What is the monthly lease payment for an Audi Q7 in New Jersey?",
    "answer": "An Audi Q7 45 TFSI in NJ leases from $679 to $749 per month for a standard 36-month, 10,000-mile contract. The more powerful 55 TFSI V6 Premium Plus averages $799 to $889 per month with zero down payment."
  },
  {
    "question": "Does the Audi Q7 come standard with three rows?",
    "answer": "Yes. Every Audi Q7 comes factory-equipped with 7-passenger seating across three rows, featuring a standard power-folding 50/50 split third row that tucks into the cargo floor at the push of a button."
  },
  {
    "question": "Audi Q7 vs BMW X5: Which is cheaper to lease?",
    "answer": "Because the Audi Q7 has a lower starting MSRP and Audi Financial Services regularly provides higher captive trunk money incentives, an Audi Q7 lease typically costs $50 to $100 less per month than a comparably equipped BMW X5."
  }
],
  relatedComparisons: [
  {
    "label": "BMW X5 vs Audi Q7 Comparison",
    "path": "/comparisons/bmw-x5-vs-audi-q7-lease"
  },
  {
    "label": "Audi Q5 vs BMW X3 Comparison",
    "path": "/comparisons/audi-q5-vs-bmw-x3-lease"
  }
],
  relatedBrandPage: {
  "label": "All Audi Lease Deals in NJ",
  "path": "/brand/audi"
},
};

export default function AudiQ7LeasePage() {
  return <VehicleModelLandingTemplate data={data} />;
}
