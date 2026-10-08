import { VehicleModelLandingTemplate } from '@/components/local/VehicleModelLandingTemplate';
import type { VehicleModelData } from '@/components/local/VehicleModelLandingTemplate';

const data: VehicleModelData = {
  make: "Land Rover",
  model: "Defender 110",
  fullName: "Land Rover Defender 110",
  slug: "land-rover-defender-lease-nj",
  heroImage: "/blog-images/2026-land-rover-defender.jpg",
  category: "Luxury Off-Road SUV",
  isEV: false,
  msrpStart: 62000,
  leaseStart: 799,
  leaseEnd: 1250,
  highlights: [
  "Defender 110: The iconic four-door British luxury off-roader with seating for up to seven",
  "P300: 296hp turbocharged four-cylinder combining daily efficiency with capable trail performance",
  "P400: 395hp mild-hybrid inline-6 offering smooth highway passing power and 8,201 lbs towing capacity",
  "Standard Electronic Air Suspension with Terrain Response ensures plush highway cruising",
  "Pivi Pro infotainment with 11.4-inch touchscreen and wireless smartphone mirroring",
  "Strong secondary market demand keeps Land Rover Financial lease residuals high at 62%"
],
  whyLease: "The Land Rover Defender 110 has become one of the most sought-after luxury family SUVs in suburban New Jersey. Offering legendary heritage styling and military-grade durability alongside British luxury, leasing a Defender protects you from steep post-warranty depreciation. Capital Motor Cars tracks regional allocation across dealer networks, ensuring you secure wholesale lease rates without paying showroom market adjustments.",
  trims: [
  {
    "name": "Defender S P300",
    "leasePrice": 799,
    "keyFeatures": [
      "19-inch Style 6010 gloss sparkle silver wheels",
      "Grained leather seat facings",
      "Interactive Driver Display",
      "LED headlights with auto high beam",
      "Keyless entry"
    ]
  },
  {
    "name": "Defender X-Dynamic SE P400",
    "leasePrice": 929,
    "popular": true,
    "keyFeatures": [
      "395 hp inline-6 turbo mild hybrid",
      "20-inch Satin Dark Grey wheels",
      "Silicon Silver exterior accents",
      "Meridian sound system (400W)",
      "Ebony Morzine headlining"
    ]
  },
  {
    "name": "Defender X P400",
    "leasePrice": 1189,
    "keyFeatures": [
      "Gloss Black hood and lower claddings",
      "Electronic Active Differential with torque vectoring",
      "Terrain Response 2 with configurable terrain modes",
      "Sliding panoramic roof",
      "Orange brake calipers"
    ]
  },
  {
    "name": "Defender V8",
    "leasePrice": 1499,
    "keyFeatures": [
      "518 hp supercharged 5.0L V8",
      "22-inch gloss black wheels",
      "Quad outboard exhaust tailpipes",
      "Windsor leather with Dinamica suedecloth",
      "Illuminated metal treadplates"
    ]
  }
],
  faqs: [
  {
    "question": "What is the average lease cost for a Land Rover Defender 110 in NJ?",
    "answer": "A 36-month lease on a Land Rover Defender 110 P300 in NJ averages $799 to $879 per month with zero down payment. Popular P400 X-Dynamic models range between $929 and $1,050 per month based on equipment."
  },
  {
    "question": "Is the Land Rover Defender reliable to lease?",
    "answer": "Leasing is the ideal way to drive a Land Rover. Because leases typically run 36 months, the entire duration of your contract is fully covered by Land Rover's 4-year, 50,000-mile factory warranty and complimentary roadside assistance."
  },
  {
    "question": "Does the Defender 110 offer three rows of seating?",
    "answer": "Yes. Land Rover offers an optional 5+2 seating configuration on the Defender 110, providing two fold-flat third-row seats suitable for children or quick trips."
  }
],
  relatedComparisons: [
  {
    "label": "BMW X5 vs Mercedes GLE Comparison",
    "path": "/comparisons/bmw-x5-vs-mercedes-gle-lease"
  },
  {
    "label": "BMW X5 vs Audi Q7 Comparison",
    "path": "/comparisons/bmw-x5-vs-audi-q7-lease"
  }
],
  relatedBrandPage: {
  "label": "All Land Rover Lease Deals in NJ",
  "path": "/brand/land-rover"
},
};

export default function LandRoverDefenderLeasePage() {
  return <VehicleModelLandingTemplate data={data} />;
}
