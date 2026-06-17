import { VehicleModelLandingTemplate } from '@/components/local/VehicleModelLandingTemplate';
import type { VehicleModelData } from '@/components/local/VehicleModelLandingTemplate';

const data: VehicleModelData = {
  make: 'Lexus',
  model: 'RX',
  fullName: 'Lexus RX',
  slug: 'lexus-rx-lease-nj',
  heroImage: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?auto=format&fit=crop&w=1600&q=80',
  category: 'Luxury SUV',
  isEV: false,
  msrpStart: 50200,
  leaseStart: 529,
  leaseEnd: 749,
  highlights: [
    'RX350: 275hp V6, AWD standard from Premium trim, best-in-class long-term reliability',
    'RX500h F SPORT Performance: 366hp hybrid AWD, 0-60 in 6.0 seconds',
    'RX350h hybrid: 246hp with hybrid efficiency, significantly reduced fuel costs',
    'RX450h+ PHEV: qualifies for NJ 0% EV lease tax savings',
    'Lexus Financial Services typically supports RX with steady residuals year-round',
    'J.D. Power and Consumer Reports top-ranked reliability - critical for end-of-lease condition',
  ],
  whyLease: 'The Lexus RX is the most popular luxury SUV in NJ among buyers who prioritize reliability and long-term ownership quality. Capital Motor Cars serves the Marlton, NJ area which has strong Lexus demand. The RX competes with the BMW X5 and Mercedes GLE at a slightly lower price point but consistently outranks both on reliability. Lexus Financial Services supports the RX with consistent lease programs. The RX450h+ PHEV qualifies for NJ\'s 0% EV tax, making it financially competitive despite its higher base MSRP.',
  faqs: [
    {
      question: 'What is the monthly payment for a Lexus RX350 lease in NJ?',
      answer: 'A Lexus RX350 Premium AWD lease in NJ on a 36-month/10k mile term runs $529-$649/mo. Lexus Financial Services runs strong support programs at model year end (August-October) when new inventory arrives. Securing a year-end deal can save $30-$60/mo.',
    },
    {
      question: 'Does the Lexus RX450h+ plug-in hybrid qualify for NJ\'s 0% tax?',
      answer: 'Yes. The Lexus RX450h+ is a plug-in hybrid electric vehicle and qualifies for NJ\'s 0% sales tax on leased EVs/PHEVs. This saves approximately $40-$65/mo vs the standard RX350 at a similar payment base.',
    },
    {
      question: 'How does Lexus dealer availability in NJ affect lease deals?',
      answer: 'NJ has Lexus dealers in Flemington, Ramsey, Cherry Hill, Bridgewater, and other markets. Capital Motor Cars accesses all NJ Lexus dealers simultaneously and takes the best offer. The Marlton area has strong demand for the RX which sometimes creates allocation pressure on popular configurations.',
    },
    {
      question: 'Lexus RX vs BMW X5 - which is the better lease in NJ for reliability-focused buyers?',
      answer: 'The Lexus RX consistently wins on reliability metrics (J.D. Power, Consumer Reports). The BMW X5 has better driving dynamics. At lease end, the Lexus typically has fewer surprise wear and tear charges because it ages better. Lexus Financial uses Toyota Financial\'s wear-and-tear standards which many drivers find more lenient than BMW Financial.',
    },
    {
      question: 'Is the Lexus RX500h F SPORT Performance worth the premium to lease?',
      answer: 'The RX500h adds roughly $130-$160/mo over the base RX350 on a 36-month lease. The turbocharged hybrid powertrain and dedicated F SPORT tuning are meaningful improvements, but most reviewers note the ride-handling balance shifts toward sporty in ways that can feel at odds with the RX\'s luxury mission. The RX350 F SPORT Package (appearance-only) is typically the better value for most buyers.',
    },
  ],
  relatedBrandPage: { label: 'Lexus Lease Deals Marlton NJ', path: '/lexus-lease-deals-marlton' },
};

export default function LexusRxLeasePage() {
  return <VehicleModelLandingTemplate data={data} />;
}
