import { VehicleModelLandingTemplate } from '@/components/local/VehicleModelLandingTemplate';
import type { VehicleModelData } from '@/components/local/VehicleModelLandingTemplate';

const data: VehicleModelData = {
  make: 'Mercedes-Benz',
  model: 'GLE',
  fullName: 'Mercedes-Benz GLE',
  slug: 'mercedes-gle-lease-nj',
  heroImage: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1600&q=80',
  category: 'Luxury SUV',
  isEV: false,
  msrpStart: 59700,
  leaseStart: 649,
  leaseEnd: 949,
  highlights: [
    'GLE350 4MATIC: 255hp turbocharged inline-4 with standard 4MATIC AWD',
    'GLE450 4MATIC: 362hp inline-6 mild hybrid, significantly stronger performance',
    'Available as plug-in hybrid (GLE550e): 21-mile EV range, qualifies for NJ 0% tax',
    'E-Active Body Control air suspension available - outstanding ride quality for NJ highway driving',
    'Optional 7-seat configuration - most popular luxury mid-size SUV in NJ for families',
    'Mercedes-Benz Financial supports GLE with competitive programs year-round',
  ],
  whyLease: 'The Mercedes-Benz GLE is the top-selling vehicle in the $60,000-$80,000 luxury SUV segment in NJ and one of Capital Motor Cars most frequently leased vehicles. It competes directly with the BMW X5 and Audi Q7. The GLE\'s strongest leasing argument is availability - Mercedes has large dealer inventory in the NJ market, making allocation faster than competitors. The GLE 450 mild hybrid is the sweet spot trim, offering meaningful performance without the plug-in premium while maintaining strong resale values.',
  faqs: [
    {
      question: 'What is the monthly payment for a Mercedes GLE lease in NJ?',
      answer: 'A Mercedes GLE 350 4MATIC lease in NJ on a 36-month/10k mile term runs $649-$799/mo. The GLE 450 typically adds $70-$100/mo. Mercedes-Benz Financial programs vary month to month - programs are often strongest in Q4 (October-December).',
    },
    {
      question: 'BMW X5 vs Mercedes GLE - which leases better in NJ?',
      answer: 'This changes monthly based on BMW Financial vs Mercedes-Benz Financial support. The BMW X5 typically has a slightly higher residual percentage. The GLE has slightly stronger NJ dealer discounts due to higher inventory. We quote both every time and present the actual numbers. See our BMW X5 vs GLE comparison page for the detailed breakdown.',
    },
    {
      question: 'Does the Mercedes GLE qualify for NJ\'s 0% EV tax?',
      answer: 'The plug-in hybrid GLE550e qualifies for NJ\'s 0% sales tax on leased EVs and PHEVs, saving $40-$65/mo. The standard GLE350 and GLE450 do not qualify and pay 6.625% NJ lease tax. If you have home charging capability, the GLE550e is often the better financial choice.',
    },
    {
      question: 'How does a Mercedes GLE lease through a broker vs dealership compare in NJ?',
      answer: 'Dealers mark up the money factor (Mercedes-Benz Financial allows dealers to earn up to 2 points of markup, or $30-$50/mo extra) and add packages to the cap cost. Capital Motor Cars does not mark up the money factor and negotiates the selling price below MSRP across multiple dealers. Total savings typically run $80-$150/mo vs a retail dealer visit.',
    },
    {
      question: 'Can I get a 7-seat Mercedes GLE in NJ?',
      answer: 'Yes. The GLE 7-seat package is a factory option. Allocation is limited - we typically need 4-6 weeks to source a 7-seat GLE in NJ unless a dealer already has exactly your specification in stock. We search across all 6 NJ Mercedes-Benz dealers simultaneously.',
    },
  ],
  relatedComparisons: [
    { label: 'BMW X5 vs Mercedes GLE Comparison', path: '/comparisons/bmw-x5-vs-mercedes-gle-lease' },
  ],
  relatedBrandPage: { label: 'Mercedes-Benz Leasing Edgewater NJ', path: '/mercedes-benz-leasing-edgewater' },
};

export default function MercedesGleLeasePage() {
  return <VehicleModelLandingTemplate data={data} />;
}
