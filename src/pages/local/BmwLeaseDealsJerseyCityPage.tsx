import { BrandCityLandingTemplate } from '@/components/local/BrandCityLandingTemplate';

export default function BmwLeaseDealsJerseyCityPage() {
  return (
    <BrandCityLandingTemplate
      brand="BMW"
      city="Jersey City"
      slug="bmw-lease-deals-jersey-city"
      heroImage="https://images.unsplash.com/photo-1556800572-1b8aeef2c54f?q=80&w=2070&auto=format&fit=crop"
      seoKeywords={['BMW lease deals Jersey City', 'BMW auto broker Jersey City', 'lease a BMW near me', 'Jersey City BMW specials']}
      description="Looking for the best BMW lease deals in Jersey City? Capital Motor Cars is your local auto broker offering wholesale pricing and free delivery on all new BMWs."
      popularModels={[
        { name: 'BMW 3 Series', path: '/bmw-3-series-lease-nj', badge: 'Popular Sedan' },
        { name: 'BMW 5 Series', path: '/bmw-5-series-lease-nj', badge: 'Luxury Sedan' },
        { name: 'BMW X3', path: '/bmw-x3-lease-nj', badge: 'Top SUV' },
        { name: 'BMW X5', path: '/bmw-x5-lease-nj', badge: 'Luxury SUV' }
      ]}
    />
  );
}
