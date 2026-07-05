import { VehicleModelLandingTemplate } from '@/components/local/VehicleModelLandingTemplate';
import type { VehicleModelData } from '@/components/local/VehicleModelLandingTemplate';

const data: VehicleModelData = {
  make: 'Hyundai',
  model: 'IONIQ 6',
  fullName: 'Hyundai IONIQ 6',
  slug: 'hyundai-ioniq6-lease-nj',
  heroImage: 'https://images.unsplash.com/photo-1503377235941-5c4400135188?auto=format&fit=crop&w=1600&q=80',
  category: 'Electric Sedan',
  isEV: true,
  msrpStart: 38615,
  leaseStart: 349,
  leaseEnd: 499,
  highlights: [
    'Standard Range RWD: 240-mile EPA range, 149hp, 0-60 in 7.4 seconds',
    'Long Range AWD: 266-mile EPA range, 320hp, 0-60 in 5.1 seconds',
    '800V ultra-fast charging: 10-80% in 18 minutes at 350kW DCFC stations',
    'NJ 0% sales tax on all leased EVs - saves $30-$45/mo vs gas equivalent',
    'Hyundai Financial has been running strong IONIQ 6 lease support to move inventory',
    'Vehicle-to-Load (V2L) feature: power your home or devices from the car\'s battery',
  ],
  whyLease: 'The Hyundai IONIQ 6 is a sleeper hit in the NJ EV lease market. Hyundai Motor Group has been supporting the IONIQ 6 with strong residuals and competitive money factors to build brand awareness in the EV segment. The 800V charging architecture is a genuine differentiator - charging from 10-80% in 18 minutes at a 350kW station is faster than any non-Porsche EV. For NJ commuters near the growing network of 350kW stations (Electrify America, EVGO), the IONIQ 6 is a compelling value. NJ\'s 0% EV lease tax makes the effective monthly cost even lower.',
  faqs: [
    {
      question: 'What is the monthly payment for a Hyundai IONIQ 6 lease in NJ?',
      answer: 'A Hyundai IONIQ 6 Standard Range RWD lease in NJ on a 36-month/10k mile term runs $349-$429/mo. Hyundai Financial has been running strong support programs on the IONIQ 6 to build market share. NJ\'s 0% EV lease tax saves approximately $25-$35/mo vs a comparable gas vehicle.',
    },
    {
      question: 'Does the Hyundai IONIQ 6 qualify for NJ\'s 0% EV lease tax?',
      answer: 'Yes. The IONIQ 6 is a battery electric vehicle and qualifies for NJ\'s 0% sales tax on leased EVs. This statutory exemption applies to all IONIQ 6 trims and lease structures.',
    },
    {
      question: 'How does Hyundai IONIQ 6 800V charging work in New Jersey?',
      answer: 'The IONIQ 6\'s 800V architecture allows it to use 350kW DC fast chargers. Electrify America has multiple 350kW-capable stations in NJ (Paramus, Edison, Woodbridge, etc.) and along the I-95 corridor. At a 150kW station (more common), the IONIQ 6 charges from 10-80% in about 30 minutes. Most days, home Level 2 charging is sufficient for NJ commuting.',
    },
    {
      question: 'Is the Hyundai IONIQ 6 AWD worth the premium for NJ winters?',
      answer: 'The AWD version adds roughly $4,000-$5,000 to MSRP and $45-$60/mo to the lease payment. For NJ drivers who need reliable winter traction, the AWD is worth it. However, the IONIQ 6 RWD with winter tires handles NJ winters adequately for most drivers, and winter tire sets cost $600-$900 installed - a one-time cost vs years of AWD premium.',
    },
    {
      question: 'What is the Hyundai IONIQ 6 charge port type in NJ?',
      answer: 'The 2024+ IONIQ 6 uses NACS (North American Charging Standard) with an included J1772/CCS adapter. This gives it access to the growing NACS public network and existing CCS stations. The 2023 model uses CCS only. This is a meaningful long-term advantage in the NJ charging ecosystem.',
    },
  ],
  relatedComparisons: [
  ],
};

export default function HyundaiIoniq6LeasePage() {
  return <VehicleModelLandingTemplate data={data} />;
}
