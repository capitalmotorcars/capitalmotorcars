import { VehicleModelLandingTemplate } from '@/components/local/VehicleModelLandingTemplate';
import type { VehicleModelData } from '@/components/local/VehicleModelLandingTemplate';

const data: VehicleModelData = {
  make: 'Mercedes-Benz',
  model: 'C-Class',
  fullName: 'Mercedes-Benz C-Class',
  slug: 'mercedes-c-class-lease-nj',
  heroImage: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=1600&q=80',
  category: 'Luxury Sedan',
  isEV: false,
  msrpStart: 47700,
  leaseStart: 489,
  leaseEnd: 699,
  highlights: [
    'C300: 255hp turbocharged 4-cylinder, available in RWD or 4MATIC AWD',
    'Available as AMG C43: 402hp biturbo V6 for performance buyers',
    '2022+ redesign brings a fully vertical tablet display and optional Burmester 3D audio',
    'Mercedes-Benz Financial Services typically supports C-Class with competitive programs',
    'Strong resale values in NJ luxury sedan segment',
    'Available in sedan or C-Class Cabriolet and Coupe body styles',
  ],
  whyLease: 'The 2022+ Mercedes-Benz C-Class redesign dramatically raised the interior quality of the car, making it look and feel like a miniature S-Class. This redesign is a major reason residual values are strong for the current generation. In Edgewater NJ, where Capital Motor Cars is based, the C-Class is one of the most requested lease vehicles. Mercedes-Benz Financial Services runs strong C-Class programs, especially at model year end. Leasing limits your exposure during this generation before the next refresh.',
  faqs: [
    {
      question: 'What is a good monthly payment for a Mercedes-Benz C300 lease in NJ?',
      answer: 'A well-negotiated C300 4MATIC lease in NJ on a 36-month/10k mile term runs $489-$599/mo depending on trim and current Mercedes-Benz Financial programs. The C300 RWD sometimes has marginally better residual support than the 4MATIC, though most NJ drivers prefer AWD.',
    },
    {
      question: 'Should I lease the Mercedes C300 or the BMW 3-Series in NJ?',
      answer: 'Both are excellent luxury sport sedans. The C-Class has a more dramatic interior with the MBUX tablet display. The BMW 3-Series typically has a slightly higher residual and sportier driving dynamics. The best answer depends on the current month\'s programs - we quote both simultaneously and show you which is lower before you commit.',
    },
    {
      question: 'What is the Mercedes-Benz acquisition fee on a C-Class lease in NJ?',
      answer: 'Mercedes-Benz Financial charges a $1,095 acquisition fee on C-Class leases - higher than BMW\'s $925. This can be rolled into the cap cost. We factor this into our quotes so you see the full picture, not just the monthly payment.',
    },
    {
      question: 'Does Mercedes-Benz offer pull-ahead programs for C-Class leases in NJ?',
      answer: 'Yes. Mercedes-Benz Financial typically runs loyalty/pull-ahead programs through the end of the year, allowing up to 3 months early return. This is usually available if you are within 6 months of lease maturity. Contact Capital Motor Cars to check current program availability.',
    },
    {
      question: 'Can I get below MSRP on a Mercedes C-Class lease in NJ?',
      answer: 'Yes. While Mercedes dealers are generally less aggressive on discounts than BMW, Capital Motor Cars can secure 2-5% below MSRP by submitting to multiple NJ Mercedes dealers simultaneously. On a $50,000 vehicle, a 4% discount saves about $2,000 in cap cost - roughly $50-$55/mo over 36 months.',
    },
  ],
  relatedComparisons: [
    { label: 'BMW X5 vs Mercedes GLE Comparison', path: '/comparisons/bmw-x5-vs-mercedes-gle-lease' },
  ],
  relatedBrandPage: { label: 'Mercedes-Benz Lease Deals Edgewater NJ', path: '/mercedes-benz-lease-deals-edgewater' },
};

export default function MercedesCClassLeasePage() {
  return <VehicleModelLandingTemplate data={data} />;
}
