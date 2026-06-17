import { VehicleModelLandingTemplate } from '@/components/local/VehicleModelLandingTemplate';
import type { VehicleModelData } from '@/components/local/VehicleModelLandingTemplate';

const data: VehicleModelData = {
  make: 'Honda',
  model: 'CR-V',
  fullName: 'Honda CR-V',
  slug: 'honda-crv-lease-nj',
  heroImage: 'https://images.unsplash.com/photo-1606220588913-b3aacb4d2f37?auto=format&fit=crop&w=1600&q=80',
  category: 'Compact SUV',
  isEV: false,
  msrpStart: 31600,
  leaseStart: 299,
  leaseEnd: 419,
  highlights: [
    'Sport AWD: 192hp turbocharged 4-cylinder, Real Time AWD with Intelligent Control available',
    'CR-V Hybrid: 204hp combined, 40 MPG combined - competitive with RAV4 Hybrid',
    'Honda Sensing standard on all trims: collision mitigation, lane keeping, adaptive cruise',
    'Largest cargo space in compact SUV class: 39.3 cu ft behind rear seats',
    'Honda Financial Services offers competitive CR-V money factors year-round',
    'Dual-zone climate, wireless CarPlay/Android Auto, and panoramic sunroof from EX-L trim',
  ],
  whyLease: 'The Honda CR-V is the second-best-selling compact SUV in the US and holds excellent residual values because of strong used car demand. Honda Financial Services supports the CR-V with competitive lease programs throughout the year. For NJ buyers looking for maximum interior space in the compact segment, the CR-V wins with 39.3 cubic feet of cargo space. The CR-V Hybrid delivers the best real-world fuel economy of any non-PHEV compact SUV, which reduces total cost of ownership meaningfully for high-mileage NJ commuters.',
  faqs: [
    {
      question: 'What is the monthly payment for a Honda CR-V lease in NJ?',
      answer: 'A Honda CR-V EX AWD lease in NJ on a 36-month/10k mile term runs $299-$379/mo. Honda Financial runs the strongest programs typically in August-September (model year changeover) and December-January. Year-end deals are often the best time to lease a CR-V in NJ.',
    },
    {
      question: 'Honda CR-V vs Toyota RAV4 - which is the better lease in NJ?',
      answer: 'The RAV4 typically has slightly stronger residual values (Toyota\'s dominant used car market position). The CR-V has more cargo space and sometimes has a lower money factor from Honda Financial. Both are competitive - we quote both and let the actual monthly numbers decide.',
    },
    {
      question: 'Can I lease a Honda CR-V Sport Touring AWD in NJ through a broker?',
      answer: 'Yes. Capital Motor Cars sources all CR-V trims. The Sport Touring (top trim) adds Honda Bose audio, leather, ventilated seats, and a digital mirror. We submit to multiple NJ Honda dealers to find your exact spec and secure the best selling price.',
    },
    {
      question: 'What is the Honda Financial Services acquisition fee in NJ?',
      answer: 'Honda Financial Services charges a $595-$695 acquisition fee depending on the model and year (CR-V is typically $595-$645). This is lower than BMW ($925) or Mercedes ($1,095) and can be rolled into the cap cost.',
    },
    {
      question: 'Does Honda offer early termination or pull-ahead programs in NJ?',
      answer: 'Honda Financial periodically offers loyalty pull-ahead programs (typically November-December) allowing up to 3 months early return when you start a new Honda lease. Contact us 4-5 months before your lease maturity to check current program availability.',
    },
  ],
  relatedComparisons: [
    { label: 'Honda CR-V vs Toyota RAV4 Comparison', path: '/comparisons/honda-cr-v-vs-toyota-rav4-lease' },
  ],
};

export default function HondaCrvLeasePage() {
  return <VehicleModelLandingTemplate data={data} />;
}
