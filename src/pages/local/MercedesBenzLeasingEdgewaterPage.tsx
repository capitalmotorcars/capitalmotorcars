import { BrandCityLandingTemplate } from '@/components/local/BrandCityLandingTemplate';

export default function MercedesBenzLeasingEdgewaterPage() {
  return (
    <BrandCityLandingTemplate
      brand="Mercedes-Benz"
      city="Edgewater"
      slug="mercedes-benz-leasing-edgewater"
      heroImage="https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=80&w=2070&auto=format&fit=crop"
      seoKeywords={['Mercedes-Benz leasing Edgewater', 'Mercedes broker Edgewater NJ', 'lease a Mercedes near me', 'Edgewater Mercedes specials']}
      description="Lease your new Mercedes-Benz with Edgewater's top-rated auto broker. Skip the dealership and let us deliver your luxury vehicle right to the Gold Coast."
      popularModels={[
        { name: 'Mercedes C-Class', path: '/mercedes-c-class-lease-nj', badge: 'Popular Sedan' },
        { name: 'Mercedes E-Class', path: '/mercedes-e-class-lease-nj', badge: 'Luxury Sedan' },
        { name: 'Mercedes GLE', path: '/mercedes-gle-lease-nj', badge: 'Top SUV' }
      ]}
    />
  );
}
