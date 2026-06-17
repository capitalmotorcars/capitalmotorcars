import { VehicleModelLandingTemplate } from '@/components/local/VehicleModelLandingTemplate';
import type { VehicleModelData } from '@/components/local/VehicleModelLandingTemplate';

const data: VehicleModelData = {
  make: 'BMW',
  model: 'X5',
  fullName: 'BMW X5',
  slug: 'bmw-x5-lease-nj',
  heroImage: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1600&q=80',
  category: 'Luxury SUV',
  isEV: false,
  msrpStart: 67900,
  leaseStart: 699,
  leaseEnd: 999,
  highlights: [
    'xDrive40i: 375hp inline-6 turbocharged with 48V mild hybrid, standard xDrive AWD',
    'Available as plug-in hybrid (50e): 30-mile EV range, ideal for NJ commuters',
    '3-row seating available with the optional third row package',
    'Air suspension standard on xDrive40i - best-in-class ride quality for NJ road conditions',
    'BMW Financial supports X5 with strong residuals at 36 months across all trims',
    'X5 M60i: 530hp V8 for those who want maximum luxury performance',
  ],
  whyLease: 'The BMW X5 is the top-selling luxury full-size SUV at Capital Motor Cars for clients in Bergen County, Hudson County, and suburban NJ. BMW Financial Services supports the X5 with competitive residuals that are frequently better than the Mercedes GLE at the same price point. The X5 50e plug-in hybrid is especially popular for NJ commuters who can charge at home - the EV range covers most daily driving and NJ charges 0% tax on EVs, reducing the effective monthly payment by $40-$70 depending on your tax rate.',
  faqs: [
    {
      question: 'What is the monthly payment for a BMW X5 lease in NJ?',
      answer: 'A BMW X5 xDrive40i lease in NJ on a 36-month/10k mile term runs $699-$849/mo depending on trim, selling price, and current BMW Financial money factor. The X5 50e plug-in hybrid is sometimes $50-$100 less per month due to stronger residual support and available federal/manufacturer incentives.',
    },
    {
      question: 'BMW X5 vs Mercedes GLE - which is the better lease in 2026?',
      answer: 'The X5 typically has a higher residual percentage (BMW Financial supports it well) which lowers the depreciation component of monthly payments. The GLE has a slightly higher acquisition fee ($1,095 vs $925). However, Mercedes-Benz Financial sometimes runs stronger money factor incentives on the GLE. We pull both quotes and show you the actual numbers for the current month.',
    },
    {
      question: 'Is the BMW X5 50e plug-in hybrid a good lease choice in NJ?',
      answer: 'Yes. NJ charges 0% sales tax on leased EVs and PHEVs, and the X5 50e qualifies. This saves roughly $40-$65 per month vs the equivalent gas X5. Additionally, the 50e has strong residual support because BMW wants to push electrification. If you can charge at home or at work, the 50e is usually the better financial choice.',
    },
    {
      question: 'How much should I put down on a BMW X5 lease in NJ?',
      answer: 'We recommend $0 or minimal down (just first month + fees due at signing) for leases. If the vehicle is totaled in month 2, your insurance pays the insurance value - not what you owe BMW Financial. Any cap cost reduction you paid upfront is gone. Putting money down on a lease reduces monthly payment but does not protect your money.',
    },
    {
      question: 'Can I lease a BMW X5 in New Jersey with a third row?',
      answer: 'Yes. BMW offers the X5 with an optional third row (7-passenger). This adds to the MSRP and there is limited dealer allocation for the 7-seat version. Capital Motor Cars sources from multiple NJ dealers and can locate third-row inventory or order one from BMW NA with your specifications.',
    },
  ],
  relatedComparisons: [
    { label: 'BMW X5 vs Mercedes GLE Lease Comparison', path: '/comparisons/bmw-x5-vs-mercedes-gle-lease' },
    { label: 'BMW X3 vs Audi Q5 Comparison', path: '/comparisons/audi-q5-vs-bmw-x3-lease' },
  ],
  relatedBrandPage: { label: 'All BMW Lease Deals in NJ', path: '/bmw-car-lease' },
};

export default function BmwX5LeasePage() {
  return <VehicleModelLandingTemplate data={data} />;
}
