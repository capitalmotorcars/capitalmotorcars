import { VehicleModelLandingTemplate } from '@/components/local/VehicleModelLandingTemplate';
import type { VehicleModelData } from '@/components/local/VehicleModelLandingTemplate';

const data: VehicleModelData = {
  make: "Genesis",
  model: "GV80",
  fullName: "Genesis GV80",
  slug: "genesis-gv80-lease-nj",
  heroImage: "/model-images/genesis-gv80.jpg",
  category: "Midsize Luxury SUV",
  isEV: false,
  msrpStart: 58700,
  leaseStart: 699,
  leaseEnd: 999,
  highlights: [
  "Stately midsize luxury executive presence featuring crest grille and signature two-line LED architecture",
  "2.5T: 300hp turbocharged inline-4 with standard all-wheel drive and paddle shifters",
  "3.5T: 375hp twin-turbo V6 with Electronically Controlled Suspension that previews road imperfections using cameras",
  "Stunning 27-inch seamless OLED display combining gauge cluster and navigation in one sweeping panel",
  "Available third-row seating package for expanding families",
  "Genesis Finance residuals and low money factor subsidies deliver exceptional monthly lease value"
],
  whyLease: "The Genesis GV80 proves that full executive luxury does not need to cost $1,200 a month. Combining palatial cabin appointments, Bentley-like road authority, and intuitive cutting-edge technology, the GV80 delivers superior equipment per dollar than the Mercedes GLE or BMW X5. Capital Motor Cars negotiates pre-discounted fleet pricing, eliminating dealer markups and delivering your vehicle directly to your doorstep.",
  trims: [
  {
    "name": "GV80 2.5T Standard",
    "leasePrice": 699,
    "keyFeatures": [
      "19-inch alloy wheels",
      "27-inch OLED integrated display",
      "Wireless Apple CarPlay and Android Auto",
      "Highway Driving Assist 2",
      "Hands-free smart power tailgate"
    ]
  },
  {
    "name": "GV80 2.5T Advanced",
    "leasePrice": 769,
    "popular": true,
    "keyFeatures": [
      "Leather seating surfaces",
      "Surround View Monitor",
      "Bang and Olufsen premium audio",
      "Panoramic sunroof",
      "Heated steering wheel"
    ]
  },
  {
    "name": "GV80 3.5T Advanced",
    "leasePrice": 879,
    "keyFeatures": [
      "375 hp twin-turbo V6",
      "20-inch alloy wheels",
      "Electronically Controlled Suspension with Road Preview",
      "Ventilated front seats",
      "Monobloc front brakes"
    ]
  },
  {
    "name": "GV80 3.5T Prestige",
    "leasePrice": 999,
    "keyFeatures": [
      "22-inch alloy wheels",
      "Nappa leather seating with Ergo Motion massaging driver seat",
      "Head-up display",
      "Remote Smart Parking Assist 2",
      "Power rear sunshades"
    ]
  }
],
  faqs: [
  {
    "question": "What is the monthly lease payment on a Genesis GV80 in NJ?",
    "answer": "A 2026 Genesis GV80 2.5T leases from $699 to $769 per month on a 36-month, 10,000-mile lease with zero cash down payment. The 3.5T twin-turbo V6 runs between $879 and $999 per month for fully loaded Prestige models."
  },
  {
    "question": "Can I get a Genesis GV80 with a third row in New Jersey?",
    "answer": "Yes. Genesis offers an available third-row seat package on select 3.5T Advanced trims, expanding passenger capacity to seven. Capital Motor Cars can locate 3-row GV80 inventory across our regional network."
  },
  {
    "question": "How does the Genesis GV80 compare to the BMW X5?",
    "answer": "The GV80 starts roughly $9,000 lower in MSRP than a comparably equipped BMW X5 while including more standard luxury amenities such as the 27-inch OLED screen and all-wheel drive, resulting in monthly lease savings of $70 to $120."
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
  "label": "All Genesis Lease Deals in NJ",
  "path": "/brand/genesis"
},
};

export default function GenesisGv80LeasePage() {
  return <VehicleModelLandingTemplate data={data} />;
}
