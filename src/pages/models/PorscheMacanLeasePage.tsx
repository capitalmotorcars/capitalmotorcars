import { VehicleModelLandingTemplate } from '@/components/local/VehicleModelLandingTemplate';
import type { VehicleModelData } from '@/components/local/VehicleModelLandingTemplate';

const data: VehicleModelData = {
  make: "Porsche",
  model: "Macan",
  fullName: "Porsche Macan",
  slug: "porsche-macan-lease-nj",
  heroImage: "/model-images/porsche-macan.jpg",
  category: "Compact Luxury SUV",
  isEV: false,
  msrpStart: 62900,
  leaseStart: 799,
  leaseEnd: 1150,
  highlights: [
  "Macan Base: 261hp turbocharged inline-4 with standard Porsche Traction Management AWD",
  "Macan T: Touring trim featuring Porsche Active Suspension Management and Sport Chrono Package",
  "Macan S: 375hp twin-turbo V6 accelerating from 0 to 60 mph in just 4.6 seconds",
  "Macan GTS: 434hp twin-turbo V6 with sport exhaust and lowered adaptive air suspension",
  "Porsche Financial Services supports Macan leases with high 63% residual values at 36 months",
  "Class-leading sports car steering precision blended with compact luxury SUV versatility"
],
  whyLease: "The Porsche Macan delivers authentic sports car pedigree in a practical crossover body. For drivers in Bergen County, Essex County, and northern New Jersey, leasing a Macan through Capital Motor Cars unlocks wholesale fleet pricing that bypasses retail dealership showroom markups. High residual value retention from Porsche Financial Services ensures predictable monthly outlays, while full factory warranty coverage protects you throughout the 36-month lease term.",
  trims: [
  {
    "name": "Macan Base",
    "leasePrice": 799,
    "keyFeatures": [
      "19-inch Macan wheels",
      "Porsche Communication Management with 10.9-inch display",
      "Wireless Apple CarPlay",
      "Lane Departure Warning",
      "Tri-zone automatic climate control"
    ]
  },
  {
    "name": "Macan T",
    "leasePrice": 899,
    "popular": true,
    "keyFeatures": [
      "Sport Chrono Package",
      "Porsche Active Suspension Management",
      "20-inch Macan S wheels in Dark Titanium",
      "Sport heated steering wheel",
      "Agate Grey exterior accents"
    ]
  },
  {
    "name": "Macan S",
    "leasePrice": 1049,
    "keyFeatures": [
      "2.9-liter twin-turbo V6 (375 hp)",
      "Upgraded brakes with red calipers",
      "20-inch wheels",
      "Porsche Dynamic Light System",
      "Dual twin-tube sport tailpipes"
    ]
  },
  {
    "name": "Macan GTS",
    "leasePrice": 1299,
    "keyFeatures": [
      "434 hp twin-turbo V6",
      "Adaptive air suspension (10mm lower)",
      "Sport exhaust system in black",
      "GTS sport seats with 8-way power",
      "21-inch RS Spyder Design wheels"
    ]
  }
],
  faqs: [
  {
    "question": "What is the typical monthly payment for a Porsche Macan lease in NJ?",
    "answer": "A Porsche Macan lease in New Jersey typically starts between $799 and $899 per month for a standard 36-month, 10,000-mile term on base and Macan T models. Macan S and GTS performance variants range from $1,049 to $1,299 per month depending on optional equipment and current Porsche Financial money factors."
  },
  {
    "question": "How does Capital Motor Cars get lower Porsche Macan lease prices than franchise dealers?",
    "answer": "Franchise Porsche centers frequently add substantial dealer documentation charges and mark up money factor finance rates. Capital Motor Cars sources allocations directly through regional dealer fleet departments, locking in true bank buy-rates and transparent zero-down structures."
  },
  {
    "question": "What credit score is required to lease a Porsche Macan in New Jersey?",
    "answer": "Porsche Financial Services reserves Tier 1 promotional lease programs for applicants with a FICO auto score of 720 or higher. Tier 2 programs remain available for scores between 680 and 719 with minor rate adjustments."
  },
  {
    "question": "Can I lease a Porsche Macan with zero down payment in NJ?",
    "answer": "Yes. Capital Motor Cars specializes in true $0 down leases where only first month payment, bank acquisition fee, and motor vehicle registration are due at signing. This prevents losing cash in the event of an early total-loss accident."
  }
],
  relatedComparisons: [
  {
    "label": "BMW X3 vs Audi Q5 Comparison",
    "path": "/comparisons/audi-q5-vs-bmw-x3-lease"
  },
  {
    "label": "BMW X5 vs Mercedes GLE Comparison",
    "path": "/comparisons/bmw-x5-vs-mercedes-gle-lease"
  }
],
  relatedBrandPage: {
  "label": "All Porsche Lease Deals in NJ",
  "path": "/brand/porsche"
},
};

export default function PorscheMacanLeasePage() {
  return <VehicleModelLandingTemplate data={data} />;
}
