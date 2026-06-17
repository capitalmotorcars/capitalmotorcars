import { VehicleModelLandingTemplate } from '@/components/local/VehicleModelLandingTemplate';
import type { VehicleModelData } from '@/components/local/VehicleModelLandingTemplate';

const data: VehicleModelData = {
  make: 'Tesla',
  model: 'Model Y',
  fullName: 'Tesla Model Y',
  slug: 'tesla-model-y-lease-nj',
  heroImage: 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&w=1600&q=80',
  category: 'Electric SUV',
  isEV: true,
  msrpStart: 44990,
  leaseStart: 419,
  leaseEnd: 599,
  highlights: [
    'Standard AWD: 310-mile EPA range, dual motor AWD, 0-60 in 5.0 seconds',
    'Long Range AWD: 330-mile EPA range, 0-60 in 4.8 seconds',
    'Performance AWD: 303-mile range, 0-60 in 3.5 seconds',
    'NJ 0% sales tax on all leased EVs - saves $35-$55/mo vs gas SUVs',
    'Optional 7-seat configuration - a rare feature in a compact EV SUV',
    'Largest frunk + cargo area in compact EV SUV class at 76 cu ft combined',
  ],
  whyLease: 'The Tesla Model Y is the best-selling vehicle in the US and consistently the most popular EV at Capital Motor Cars. It competes with the BMW iX, Audi Q4 e-tron, and Mercedes EQC in the luxury EV SUV space. The combination of NJ\'s 0% EV lease tax, Tesla\'s Supercharger reliability, and the Model Y\'s space efficiency makes it a compelling choice for NJ families. For Hudson County residents (Hoboken, Jersey City) who have building charging, the Model Y is a natural fit.',
  faqs: [
    {
      question: 'What is the monthly payment for a Tesla Model Y lease in NJ?',
      answer: 'A Tesla Model Y AWD lease in NJ on a 36-month/10k mile term runs $419-$519/mo. The Long Range AWD runs $499-$599/mo. NJ\'s 0% EV lease tax saves $35-$55/mo vs an equivalent gas SUV at the same MSRP.',
    },
    {
      question: 'Does the Tesla Model Y qualify for NJ\'s 0% EV lease tax?',
      answer: 'Yes. The Tesla Model Y is a battery electric vehicle and qualifies for NJ\'s 0% sales tax on leased EVs. This applies to all trims. The tax savings compared to a gas SUV at the same monthly payment base amount to $35-$55/mo depending on the payment.',
    },
    {
      question: 'Tesla Model Y vs BMW iX - which is the better NJ lease?',
      answer: 'The Tesla Model Y has a lower MSRP starting point, wider Supercharger network, and better cargo space for the price. The BMW iX has a more traditional luxury interior, BMW Financial lease support, and a more established luxury brand presence. Both have 0% NJ lease tax. We quote both and let the numbers decide. See our comparison page for detail.',
    },
    {
      question: 'Is the Tesla Model Y 7-seat version available to lease in NJ?',
      answer: 'Yes. The Model Y 7-seat version is available through Tesla. Allocation is limited and lead times can be 4-8 weeks depending on inventory. The third row is best for children - adults find it tight. We will check real-time availability during your quote call.',
    },
    {
      question: 'How long does charging take for a Tesla Model Y in New Jersey?',
      answer: 'At a Tesla Supercharger V3 (250kW), the Model Y charges from 10-80% in about 30 minutes. At home on a standard NEMA 14-50 outlet (240V 32A), you get about 30 miles per hour - enough to fully recharge overnight for most NJ commuters. At a Level 1 outlet (standard 120V), charging is 3-5 miles per hour (not recommended as primary charging).',
    },
  ],
  relatedComparisons: [
    { label: 'Tesla Model Y vs BMW iX Comparison', path: '/comparisons/tesla-model-y-vs-bmw-ix-lease' },
  ],
  relatedBrandPage: { label: 'Tesla Leasing Hoboken NJ', path: '/tesla-leasing-hoboken' },
};

export default function TeslaModelYLeasePage() {
  return <VehicleModelLandingTemplate data={data} />;
}
