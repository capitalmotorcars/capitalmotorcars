import { VehicleModelLandingTemplate } from '@/components/local/VehicleModelLandingTemplate';
import type { VehicleModelData } from '@/components/local/VehicleModelLandingTemplate';

const data: VehicleModelData = {
  make: 'Audi',
  model: 'Q5',
  fullName: 'Audi Q5',
  slug: 'audi-q5-lease-nj',
  heroImage: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=1600&q=80',
  category: 'Luxury SUV',
  isEV: false,
  msrpStart: 46900,
  leaseStart: 489,
  leaseEnd: 699,
  highlights: [
    'Q5 45 TFSI quattro: 261hp turbocharged 4-cylinder, standard quattro AWD on all trims',
    'Q5 e PHEV: 362hp combined, 23-mile EV range, qualifies for NJ 0% tax savings',
    'Air suspension available - improves ride quality for NJ highway and road conditions',
    'Virtual cockpit and MMI touch response standard from Premium Plus',
    'Audi Financial Services regularly supports Q5 with competitive 36-month residuals',
    'Largest cargo space in the compact luxury SUV segment at 25.1 cu ft behind rear seats',
  ],
  whyLease: 'The Audi Q5 is Capital Motor Cars most frequently leased compact luxury SUV. It competes primarily with the BMW X3 and Mercedes GLC. The Q5 wins on cargo space (largest in the segment) and standard quattro AWD. Audi Financial Services frequently supports the Q5 with strong residual values at 36 months. The Q5 e PHEV is particularly compelling for NJ drivers who can charge at home - the 23-mile EV range covers most daily commutes tax-free, and NJ\'s 0% PHEV lease tax saves $40-$60/mo vs the gas Q5.',
  faqs: [
    {
      question: 'What is the monthly payment for an Audi Q5 lease in NJ?',
      answer: 'An Audi Q5 45 TFSI quattro lease in NJ on a 36-month/10k mile term runs $489-$599/mo depending on trim and current Audi Financial programs. The Q5 e PHEV sometimes runs lower due to stronger residual support and available incentives, despite having a higher MSRP.',
    },
    {
      question: 'Audi Q5 vs BMW X3 - which is the better NJ lease?',
      answer: 'The BMW X3 typically has slightly higher residual support from BMW Financial. The Q5 has more cargo space and standard air suspension option. The Q5 e qualifies for NJ\'s 0% EV tax, which the X3 does not. We quote both every month - see our full comparison page for a detailed breakdown.',
    },
    {
      question: 'Does the Audi Q5 e PHEV qualify for the NJ 0% sales tax on leases?',
      answer: 'Yes. The Audi Q5 e plug-in hybrid qualifies for NJ\'s zero percent sales tax on leased EVs and PHEVs. This saves roughly $40-$65/mo vs the standard Q5 gas variant. The Q5 e also receives stronger residual support from Audi Financial Services.',
    },
    {
      question: 'How does an Audi Q5 lease from a broker compare to an Audi dealer in Paramus NJ?',
      answer: 'Paramus NJ has two Audi dealerships (DCH Paramus Audi and Park Avenue BMW/Audi). Both can mark up the money factor and push packages. Capital Motor Cars submits to all NJ Audi dealers simultaneously, takes the lowest selling price offer, and does not mark up the money factor. The typical savings is $70-$130/mo vs a retail dealer transaction.',
    },
    {
      question: 'Can I get an Audi Q5 in a specific color combination through Capital Motor Cars?',
      answer: 'Yes. We can locate in-stock vehicles or submit a factory order. Factory orders for the Q5 typically take 8-12 weeks. We will walk you through available exterior/interior combinations and production windows during your quote call.',
    },
  ],
  relatedComparisons: [
    { label: 'BMW X3 vs Audi Q5 Comparison', path: '/comparisons/audi-q5-vs-bmw-x3-lease' },
  ],
  relatedBrandPage: { label: 'Audi Lease Deals Paramus NJ', path: '/audi-lease-deals-paramus' },
};

export default function AudiQ5LeasePage() {
  return <VehicleModelLandingTemplate data={data} />;
}
