import { BrandCityLandingTemplate } from '@/components/local/BrandCityLandingTemplate';

export default function AudiLeaseSpecialsParamusPage() {
  return (
    <BrandCityLandingTemplate
      brand="Audi"
      city="Paramus"
      slug="audi-lease-specials-paramus"
      heroImage="https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?q=80&w=2070&auto=format&fit=crop"
      seoKeywords={['Audi lease specials Paramus', 'Audi auto broker Paramus', 'lease an Audi Route 4', 'Paramus Audi broker']}
      description="Beat Route 4 dealership prices. Capital Motor Cars offers true wholesale Audi lease specials delivered directly to you in Paramus, NJ."
      popularModels={[
        { name: 'Audi A4', path: '/audi-a4-lease-nj', badge: 'Premium Sedan' },
        { name: 'Audi Q5', path: '/audi-q5-lease-nj', badge: 'Top SUV' },
      ]}
    />
  );
}
