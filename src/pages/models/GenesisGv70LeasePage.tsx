import { VehicleModelLandingTemplate } from '@/components/local/VehicleModelLandingTemplate';
import type { VehicleModelData } from '@/components/local/VehicleModelLandingTemplate';

const data: VehicleModelData = {
  make: "Genesis",
  model: "GV70",
  fullName: "Genesis GV70",
  slug: "genesis-gv70-lease-nj",
  heroImage: "/model-images/genesis-gv70.jpg",
  category: "Compact Luxury SUV",
  isEV: false,
  msrpStart: 45700,
  leaseStart: 549,
  leaseEnd: 799,
  highlights: [
  "2.5T: 300hp turbocharged four-cylinder with standard all-wheel drive and launch control",
  "3.5T Sport: 375hp twin-turbo V6 with sport-tuned suspension and electronic limited-slip differential",
  "Aviation-inspired luxury interior featuring fingerprint authentication and dual-tier dashboard",
  "Standard 14.5-inch HD navigation display with cloud-based voice commands",
  "Highway Driving Assist 2 with automated lane change assistance",
  "Genesis Finance delivers aggressive money factors that undercut German competitors by $150/month"
],
  whyLease: "The Genesis GV70 has emerged as the definitive luxury disruptor in the compact executive SUV category. Delivering concept-car exterior design, exquisite Nappa leather options, and whisper-quiet cabin insulation, the GV70 easily challenges the BMW X3 and Audi Q5. Leasing through Capital Motor Cars locks in competitive Genesis Finance buy-rates with free doorstep delivery across New Jersey and New York.",
  trims: [
  {
    "name": "GV70 2.5T Standard",
    "leasePrice": 549,
    "keyFeatures": [
      "19-inch alloy wheels",
      "Standard all-wheel drive",
      "14.5-inch HD navigation screen",
      "Highway Driving Assist",
      "Smart power liftgate"
    ]
  },
  {
    "name": "GV70 2.5T Advanced",
    "leasePrice": 629,
    "popular": true,
    "keyFeatures": [
      "Leather seating surfaces",
      "Surround View Monitor and Blind-Spot View Monitor",
      "Lexicon 16-speaker premium audio",
      "Remote Smart Parking Assist",
      "Panoramic sunroof"
    ]
  },
  {
    "name": "GV70 3.5T Sport",
    "leasePrice": 729,
    "keyFeatures": [
      "375 hp twin-turbo V6",
      "21-inch Sport dark alloy wheels",
      "Electronically Controlled Suspension with Road Preview",
      "Sport appearance package with dual round exhausts",
      "Panoramic glass roof"
    ]
  },
  {
    "name": "Electrified GV70",
    "leasePrice": 599,
    "keyFeatures": [
      "429 hp dual-motor electric powertrain (483 hp Boost mode)",
      "18-minute fast charging capability",
      "NJ 0% EV sales tax savings",
      "White-glove home charging support",
      "Ultra-quiet luxury ride"
    ]
  }
],
  faqs: [
  {
    "question": "How much does it cost to lease a Genesis GV70 in NJ?",
    "answer": "A Genesis GV70 2.5T in New Jersey leases for approximately $549 to $629 per month on a 36-month, 10,000-mile term with zero down payment. The 375hp twin-turbo 3.5T Sport ranges from $729 to $799 per month."
  },
  {
    "question": "Is Genesis maintenance included in a lease?",
    "answer": "Yes. Every new Genesis lease includes Genesis Complimentary Maintenance for 3 years or 36,000 miles, along with complimentary Genesis Service Valet that picks up your vehicle and leaves a loaner car."
  },
  {
    "question": "Does the Electrified GV70 qualify for New Jersey tax breaks?",
    "answer": "Yes. The all-electric Genesis GV70 qualifies for New Jersey's 0% sales tax on clean energy vehicles, saving drivers $35 to $55 per month compared to leasing the gasoline model."
  }
],
  relatedComparisons: [
  {
    "label": "Audi Q5 vs BMW X3 Comparison",
    "path": "/comparisons/audi-q5-vs-bmw-x3-lease"
  },
  {
    "label": "BMW X5 vs Mercedes GLE Comparison",
    "path": "/comparisons/bmw-x5-vs-mercedes-gle-lease"
  }
],
  relatedBrandPage: {
  "label": "All Genesis Lease Deals in NJ",
  "path": "/brand/genesis"
},
};

export default function GenesisGv70LeasePage() {
  return <VehicleModelLandingTemplate data={data} />;
}
