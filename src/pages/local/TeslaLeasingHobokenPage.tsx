import { BrandCityLandingTemplate } from '@/components/local/BrandCityLandingTemplate';

export default function TeslaLeasingHobokenPage() {
  return (
    <BrandCityLandingTemplate
      brand="Tesla"
      city="Hoboken"
      slug="tesla-leasing-hoboken"
      heroImage="https://images.unsplash.com/photo-1560958089-b8a1929cea89?q=80&w=2071&auto=format&fit=crop"
      seoKeywords={['Tesla leasing Hoboken', 'Tesla auto broker Hoboken', 'lease a Tesla near me', 'Hoboken EV lease deals']}
      description="Lease your next Tesla in Hoboken with Capital Motor Cars. We navigate EV tax credits and deliver directly to your Hoboken residence or office."
      popularModels={[
        { name: 'Tesla Model 3', path: '/tesla-model-3-lease-nj', badge: 'Top Sedan' },
        { name: 'Tesla Model Y', path: '/tesla-model-y-lease-nj', badge: 'Top SUV' }
      ]}
    />
  );
}
