import { VehicleModelLandingTemplate } from '@/components/local/VehicleModelLandingTemplate';
import type { VehicleModelData } from '@/components/local/VehicleModelLandingTemplate';

const data: VehicleModelData = {
  make: 'Audi',
  model: 'A4',
  fullName: 'Audi A4',
  slug: 'audi-a4-lease-nj',
  heroImage: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=1600&q=80',
  category: 'Luxury Sedan',
  isEV: false,
  msrpStart: 43900,
  leaseStart: 429,
  leaseEnd: 599,
  highlights: [
    'Premium Plus: 201hp turbocharged 4-cylinder with quattro AWD standard across the lineup',
    'Prestige: adds Bang and Olufsen 3D audio, Matrix LED headlights, 360-degree camera',
    'quattro AWD is standard on every A4 trim - ideal for NJ winters with no upcharge',
    'Virtual cockpit standard - fully digital 12.3" instrument cluster ahead of BMW and Mercedes',
    'Known for among the best quality interiors in the compact luxury segment',
    'Audi Financial Services typically offers competitive money factors on A4',
  ],
  whyLease: 'The Audi A4 competes with the BMW 3-Series and Mercedes C-Class but with one major advantage: quattro AWD is standard on every single trim at no additional cost. In NJ where winter driving conditions demand AWD, this removes the $2,000-$3,000 AWD premium you pay on competing models. Audi Financial Services supports the A4 with consistent lease programs. The A4 also tends to have the best interior craftsmanship in the compact luxury segment by many reviewer assessments, which is why it holds residual value well.',
  faqs: [
    {
      question: 'What is the monthly payment for an Audi A4 lease in NJ?',
      answer: 'An Audi A4 45 TFSI quattro lease in NJ on a 36-month/10k mile term runs $429-$549/mo. Audi Financial programs vary by month - the A4 Premium Plus is often the sweet spot between features and monthly payment.',
    },
    {
      question: 'Audi A4 vs BMW 3-Series - which is the better lease in NJ?',
      answer: 'The A4 includes quattro AWD on every trim at no upcharge (the BMW 3-Series charges $2,500 for xDrive). This makes the A4 a strong value proposition for NJ drivers. The BMW 3-Series typically has a slightly higher residual percentage and more engaging driving dynamics. We quote both and let you choose based on actual monthly numbers.',
    },
    {
      question: 'What is the Audi Financial Services acquisition fee in NJ?',
      answer: 'Audi Financial Services charges a $895 acquisition fee on A4 leases. This is slightly less than Mercedes-Benz Financial ($1,095) and comparable to BMW Financial ($925). It can be rolled into the cap cost.',
    },
    {
      question: 'Can I get a manual transmission Audi A4 lease?',
      answer: 'No. The A4 has been automatic/S tronic transmission only since 2017. Audi discontinued the manual in North America.',
    },
    {
      question: 'Does Audi offer loyalty incentives in NJ for returning lessees?',
      answer: 'Audi Financial Services periodically runs loyalty programs that provide a waived security deposit or reduced acquisition fee for returning Audi lessees. Contact us 3-4 months before your current Audi lease ends to check current loyalty program availability.',
    },
  ],
  relatedComparisons: [
    { label: 'BMW X3 vs Audi Q5 Comparison', path: '/comparisons/audi-q5-vs-bmw-x3-lease' },
  ],
  relatedBrandPage: { label: 'Audi Lease Deals Paramus NJ', path: '/audi-lease-deals-paramus' },
};

export default function AudiA4LeasePage() {
  return <VehicleModelLandingTemplate data={data} />;
}
