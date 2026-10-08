import { VehicleModelLandingTemplate } from '@/components/local/VehicleModelLandingTemplate';
import type { VehicleModelData } from '@/components/local/VehicleModelLandingTemplate';

const data: VehicleModelData = {
  make: "Porsche",
  model: "Cayenne",
  fullName: "Porsche Cayenne",
  slug: "porsche-cayenne-lease-nj",
  heroImage: "/model-images/porsche-cayenne.jpg",
  category: "Midsize Luxury SUV",
  isEV: false,
  msrpStart: 80800,
  leaseStart: 1049,
  leaseEnd: 1599,
  highlights: [
  "Cayenne Base: 348hp turbocharged 3.0L V6 with standard all-wheel drive and 8-speed Tiptronic S",
  "Cayenne E-Hybrid: 468hp combined output with plug-in efficiency and NJ EV sales tax advantages",
  "Cayenne S: 468hp twin-turbo 4.0L V8 delivering thrilling exhaust notes and rapid acceleration",
  "Cayenne GTS: 493hp twin-turbo V8 with lowered air suspension and standard Sport Chrono",
  "Porsche Driver Experience interior with curved digital instrument cluster and optional passenger display",
  "Towing capacity up to 7,700 lbs makes it ideal for weekend recreation and family road trips"
],
  whyLease: "The Porsche Cayenne represents the benchmark for midsize luxury performance SUVs. Pairing sports car dynamics with genuine executive comfort, the Cayenne holds remarkably high residual values through Porsche Financial Services. By leasing with Capital Motor Cars, executives and families across New Jersey and New York benefit from wholesale vehicle acquisition, customized annual mileage terms, and free doorstep delivery.",
  trims: [
  {
    "name": "Cayenne Base",
    "leasePrice": 1049,
    "keyFeatures": [
      "20-inch Cayenne Design wheels",
      "Matrix LED headlights",
      "Porsche Active Suspension Management",
      "Wireless smartphone charging",
      "12.3-inch touchscreen display"
    ]
  },
  {
    "name": "Cayenne E-Hybrid",
    "leasePrice": 1099,
    "popular": true,
    "keyFeatures": [
      "468 hp plug-in hybrid powertrain",
      "Electric-only driving mode",
      "Sport Chrono Package standard",
      "Mobile charging cable",
      "NJ 0% EV sales tax savings"
    ]
  },
  {
    "name": "Cayenne S",
    "leasePrice": 1349,
    "keyFeatures": [
      "4.0-liter twin-turbo V8 (468 hp)",
      "20-inch Cayenne S wheels",
      "Upgraded 6-piston brake calipers",
      "Dual twin-tube brushed steel tailpipes",
      "Driver memory package"
    ]
  },
  {
    "name": "Cayenne GTS",
    "leasePrice": 1599,
    "keyFeatures": [
      "493 hp twin-turbo V8",
      "Sport Design package in black",
      "21-inch RS Spyder wheels in Anthracite Grey",
      "Sport exhaust with dark bronze tips",
      "Adaptive air suspension"
    ]
  }
],
  faqs: [
  {
    "question": "What is the monthly payment on a Porsche Cayenne lease in NJ?",
    "answer": "Monthly lease payments on a 2026 Porsche Cayenne start around $1,049 to $1,199 per month for Base and E-Hybrid configurations on 36-month terms. High-performance Cayenne S and GTS V8 models lease between $1,349 and $1,599 per month depending on options."
  },
  {
    "question": "Does the Porsche Cayenne E-Hybrid qualify for tax savings in New Jersey?",
    "answer": "Yes. New Jersey provides an exemption on state sales tax for qualified zero-emission plug-in vehicles, saving lessees $60 to $90 every month compared to gasoline models of equal MSRP."
  },
  {
    "question": "Can I order a custom-spec Porsche Cayenne through Capital Motor Cars?",
    "answer": "Yes. Our concierge consultants work directly with factory ordering systems to build your Cayenne to exact paint, leather, and option specifications while locking in wholesale pricing."
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
  "label": "All Porsche Lease Deals in NJ",
  "path": "/brand/porsche"
},
};

export default function PorscheCayenneLeasePage() {
  return <VehicleModelLandingTemplate data={data} />;
}
