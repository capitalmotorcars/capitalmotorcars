import { VehicleModelLandingTemplate } from '@/components/local/VehicleModelLandingTemplate';
import type { VehicleModelData } from '@/components/local/VehicleModelLandingTemplate';

const data: VehicleModelData = {
  make: "Cadillac",
  model: "Escalade",
  fullName: "Cadillac Escalade",
  slug: "cadillac-escalade-lease-nj",
  heroImage: "/model-images/cadillac-escalade.jpg",
  category: "Full-Size Luxury SUV",
  isEV: false,
  msrpStart: 89500,
  leaseStart: 1199,
  leaseEnd: 1799,
  highlights: [
  "The undisputed crown jewel of full-size American luxury SUVs with three massive rows of passenger comfort",
  "Standard 6.2-liter V8 engine producing 420hp and 460 lb-ft of torque paired with a smooth 10-speed transmission",
  "Available 3.0-liter Duramax turbo-diesel offering smooth cruising torque and extended highway range",
  "Curved 38-inch total diagonal OLED display with twice the pixel density of a 4K television",
  "Available Super Cruise hands-free driving technology compatible with thousands of miles of divided highways",
  "Substantial gross vehicle weight rating (GVWR over 6,000 lbs) qualifies for business Section 179 tax deductions"
],
  whyLease: "The Cadillac Escalade represents the pinnacle of executive road authority and American luxury craftsmanship. Perfect for large families and corporate livery executives across New Jersey and the New York metropolitan area, leasing an Escalade through Capital Motor Cars delivers pre-negotiated wholesale pricing without retail dealer markup. We handle all logistics, paperwork, and white-glove doorstep delivery.",
  trims: [
  {
    "name": "Escalade Luxury",
    "leasePrice": 1199,
    "keyFeatures": [
      "22-inch 14-spoke alloy wheels",
      "38-inch curved OLED display",
      "AKG Studio 19-speaker audio system",
      "Heated and ventilated front seats",
      "HD Surround Vision camera"
    ]
  },
  {
    "name": "Escalade Premium Luxury",
    "leasePrice": 1349,
    "popular": true,
    "keyFeatures": [
      "Super Cruise hands-free driver assistance",
      "Panoramic power sunroof",
      "Rear Camera Mirror",
      "Full-color Head-Up Display",
      "Enhanced Automatic Parking Assist"
    ]
  },
  {
    "name": "Escalade Sport Platinum",
    "leasePrice": 1649,
    "keyFeatures": [
      "Gloss Black exterior trim and dark finish wheels",
      "AKG Studio Reference 36-speaker sound system",
      "Air Ride Adaptive Suspension",
      "Magnetic Ride Control 4.0",
      "Semi-Aniline leather seating with massage"
    ]
  },
  {
    "name": "Escalade-V Series",
    "leasePrice": 2499,
    "keyFeatures": [
      "682 hp supercharged 6.2L V8",
      "Brembo high-performance front brakes",
      "V-Series performance exhaust with active valves",
      "Exclusive V-Mode driving settings",
      "Bespoke interior sport detailing"
    ]
  }
],
  faqs: [
  {
    "question": "What is the typical lease price for a Cadillac Escalade in NJ?",
    "answer": "A 2026 Cadillac Escalade lease in New Jersey starts around $1,199 to $1,349 per month for Luxury and Premium Luxury models on 36-month terms with $0 down payment. Sport Platinum models range from $1,599 to $1,799 per month."
  },
  {
    "question": "Can a business lease a Cadillac Escalade as a tax write-off?",
    "answer": "Yes. Because the Cadillac Escalade has a Gross Vehicle Weight Rating (GVWR) exceeding 6,000 pounds, it qualifies for advantageous business vehicle tax write-offs under IRS Section 179 and bonus depreciation rules. Consult your tax professional for details."
  },
  {
    "question": "Does the Escalade lease include Super Cruise hands-free driving in NJ?",
    "answer": "Yes. Super Cruise is available on Premium Luxury and Sport trims and standard on Platinum trims. It supports hands-free driving on mapped highways including the Garden State Parkway, New Jersey Turnpike, and I-80."
  }
],
  relatedComparisons: [
  {
    "label": "BMW X5 vs Audi Q7 Comparison",
    "path": "/comparisons/bmw-x5-vs-audi-q7-lease"
  },
  {
    "label": "BMW X5 vs Mercedes GLE Comparison",
    "path": "/comparisons/bmw-x5-vs-mercedes-gle-lease"
  }
],
  relatedBrandPage: {
  "label": "All Cadillac Lease Deals in NJ",
  "path": "/brand/cadillac"
},
};

export default function CadillacEscaladeLeasePage() {
  return <VehicleModelLandingTemplate data={data} />;
}
