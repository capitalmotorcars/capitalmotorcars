import { BrandCityLandingTemplate } from '@/components/local/BrandCityLandingTemplate';

export default function LexusLeaseDealsMarltonPage() {
  return (
    <BrandCityLandingTemplate
      brand="Lexus"
      city="Marlton"
      slug="lexus-lease-deals-marlton"
      heroImage="https://images.unsplash.com/photo-1550355291-bbee04a92028?q=80&w=2070&auto=format&fit=crop"
      seoKeywords={['Lexus lease deals Marlton', 'Lexus auto broker Marlton NJ', 'lease a Lexus South Jersey', 'Marlton Lexus broker']}
      description="Capital Motor Cars secures the lowest Lexus lease payments in Marlton, NJ. South Jersey's premier auto broker delivering wholesale pricing and VIP service."
      popularModels={[
        { name: 'Lexus RX', path: '/lexus-rx-lease-nj', badge: 'Top SUV' },
        { name: 'Lexus NX', path: '/vehicles/nx', badge: 'Luxury Crossover' }
      ]}
    />
  );
}
