import { ComparisonTemplate, ComparisonData } from '@/components/comparisons/ComparisonTemplate';

const data: ComparisonData = {
  title: 'BMW X5 vs Mercedes-Benz GLE Lease: Which Luxury SUV Wins in NJ?',
  slug: 'bmw-x5-vs-mercedes-gle-lease',
  description: 'BMW X5 vs Mercedes GLE lease comparison for NJ and NY drivers. We break down monthly payments, residual values, horsepower, and which luxury SUV gives you more for your money in 2026.',
  keywords: ['bmw x5 vs mercedes gle lease', 'bmw x5 lease nj', 'mercedes gle lease nj', 'luxury suv lease comparison nj', 'bmw x5 vs gle monthly payment'],
  vehicle1: {
    make: 'BMW',
    model: 'X5 xDrive40i',
    image: 'https://images.unsplash.com/photo-1556800572-1b8aeef2c54f?q=80&w=2070&auto=format&fit=crop',
    price: 899,
    horsepower: 375,
    mpg: '22 / 29 MPG',
    cargo: '72.3 cu ft',
    pros: [
      'Stronger residual value keeps lease payments lower',
      'Inline-6 engine delivers noticeably more power',
      'iDrive 8 is the benchmark for luxury infotainment',
      'Sportier driving dynamics for NJ highway commutes',
    ],
  },
  vehicle2: {
    make: 'Mercedes-Benz',
    model: 'GLE 350 4MATIC',
    image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?q=80&w=2070&auto=format&fit=crop',
    price: 949,
    horsepower: 255,
    mpg: '20 / 26 MPG',
    cargo: '74.9 cu ft',
    pros: [
      'MBUX voice assistant is more intuitive for daily use',
      'Third-row seating option for larger NJ families',
      'Slightly more rear cargo space with seats folded',
      'Air suspension option for smoother NJ highway ride',
    ],
  },
  verdict: 'For most New Jersey drivers, the BMW X5 is the stronger lease. Its higher residual value often results in a lower monthly payment despite a more powerful engine, and iDrive 8 is genuinely ahead of the competition. The X5 also handles NJ highways with more confidence. The GLE makes sense if you regularly carry more than five passengers, need the optional third row, or prefer Mercedes-Benz loyalty credits from a previous lease. Ask us to run both deals side by side before you decide.',
};

export default function BmwX5VsMercedesGLEPage() {
  return <ComparisonTemplate data={data} />;
}
