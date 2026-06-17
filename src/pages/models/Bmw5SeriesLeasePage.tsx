import { VehicleModelLandingTemplate } from '@/components/local/VehicleModelLandingTemplate';
import type { VehicleModelData } from '@/components/local/VehicleModelLandingTemplate';

const data: VehicleModelData = {
  make: 'BMW',
  model: '5-Series',
  fullName: 'BMW 5-Series',
  slug: 'bmw-5-series-lease-nj',
  heroImage: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1600&q=80',
  category: 'Luxury Sedan',
  isEV: false,
  msrpStart: 56500,
  leaseStart: 589,
  leaseEnd: 849,
  highlights: [
    '540i xDrive: 375hp turbocharged inline-6 with standard AWD for NJ winters',
    'M550i xDrive: 523hp twin-turbo V8 available through special order',
    '2024 redesign brings a bold new interior with curved display and zero-lag iDrive',
    'BMW Financial typically supports 5-Series with competitive 36-month residuals',
    'Available as plug-in hybrid (550e xDrive) - ideal for commuters and highway driving',
    'Full executive sedan package: 16-way seats, Bowers and Wilkins audio, HUD standard on M Sport',
  ],
  whyLease: 'The 2024-2026 BMW 5-Series is a full redesign that commands strong resale values. With a starting MSRP around $56,500, leasing at a 36-month term limits your commitment as this generation matures. BMW Financial Services historically supports the 540i with better residual support than the Audi A6 or Mercedes E-Class at comparable price points, making it a value play in the full-size luxury segment. For NJ business owners, a 5-Series lease qualifies for Section 179 and bonus depreciation benefits.',
  faqs: [
    {
      question: 'What is the monthly payment for a BMW 5-Series lease in NJ?',
      answer: 'A BMW 540i xDrive lease in NJ runs approximately $589-$699/mo on a 36-month/10k mile term with minimal out of pocket at signing. The 550e plug-in hybrid sometimes has incentive money that brings the effective payment lower. Capital Motor Cars gets you below MSRP selling price which reduces the cap cost and lowers your monthly.',
    },
    {
      question: 'Is the BMW 5-Series or Mercedes E-Class a better lease in 2026?',
      answer: 'Both are strong. Historically the BMW 5-Series has had a slightly higher residual percentage at 36 months. The E-Class typically has a higher acquisition fee ($1,095 vs BMW\'s $925). The real number depends on the specific month\'s programs - we pull both quotes simultaneously and tell you which makes more financial sense that month.',
    },
    {
      question: 'Does BMW Financial offer pull-ahead for 5-Series leases?',
      answer: 'BMW Financial runs loyalty/pull-ahead programs typically from October through January, allowing up to 3 months early return when you start a new BMW lease. If you\'re within 6 months of lease end, contact us to check current program availability.',
    },
    {
      question: 'Can I negotiate below MSRP on a BMW 5-Series lease?',
      answer: 'Yes. The cap cost (selling price) is the most important negotiating point. Capital Motor Cars submits to multiple NJ BMW dealers simultaneously and takes only the lowest offer. We typically achieve 3-8% below MSRP, which translates to $40-$80/mo savings vs paying full sticker.',
    },
    {
      question: 'What is due at signing on a BMW 5-Series lease in NJ?',
      answer: 'Standard due at signing: first month payment (~$600-$700), BMW acquisition fee ($925 if not rolled in), NJ doc fee ($799 cap), registration (~$250-$350). Total is typically $2,400-$2,800 with zero down capitalized cost reduction. Adding a down payment reduces monthly but does not protect you if the car is totaled early in the lease.',
    },
  ],
  relatedComparisons: [
    { label: 'BMW X5 vs Mercedes GLE Comparison', path: '/comparisons/bmw-x5-vs-mercedes-gle-lease' },
  ],
  relatedBrandPage: { label: 'All BMW Lease Deals in NJ', path: '/bmw-car-lease' },
};

export default function Bmw5SeriesLeasePage() {
  return <VehicleModelLandingTemplate data={data} />;
}
