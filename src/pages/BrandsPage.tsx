import { Layout } from '@/components/layout/Layout';
import { SEO } from '@/components/SEO';
import { PageHero } from '@/components/ui/PageHero';
import { SectionDivider } from '@/components/ui/SectionDivider';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import mercedesSClass from '@/assets/mercedes-sclass.png';

const brands = [
  { name: 'BMW', logo: 'https://www.carlogos.org/car-logos/bmw-logo.png' },
  { name: 'Mercedes-Benz', logo: 'https://www.carlogos.org/car-logos/mercedes-benz-logo.png' },
  { name: 'Audi', logo: 'https://www.carlogos.org/car-logos/audi-logo.png' },
  { name: 'Lexus', logo: 'https://www.carlogos.org/car-logos/lexus-logo.png' },
  { name: 'Toyota', logo: 'https://www.carlogos.org/car-logos/toyota-logo.png' },
  { name: 'Honda', logo: 'https://www.carlogos.org/car-logos/honda-logo.png' },
  { name: 'Ford', logo: 'https://www.carlogos.org/car-logos/ford-logo.png' },
  { name: 'Chevrolet', logo: 'https://www.carlogos.org/car-logos/chevrolet-logo.png' },
  { name: 'Volkswagen', logo: 'https://www.carlogos.org/car-logos/volkswagen-logo.png' },
  { name: 'Hyundai', logo: 'https://www.carlogos.org/car-logos/hyundai-logo.png' },
  { name: 'Kia', logo: 'https://www.carlogos.org/car-logos/kia-logo.png' },
  { name: 'Nissan', logo: 'https://www.carlogos.org/car-logos/nissan-logo.png' },
];

export default function BrandsPage() {
  const { ref, isRevealed } = useScrollReveal();

  return (
    <Layout>
      <SEO 
        title="Brands We Work With | Capital Motor Cars"
        description="We work with BMW, Mercedes, Audi, Lexus, Toyota, and more. Contact us to find out what vehicles are currently available."
      />
      <PageHero
        title="Brands We Work With"
        subtitle="We work with a wide range of automotive brands and dealerships across New Jersey and beyond. From luxury brands like BMW and Mercedes-Benz to reliable options like Toyota and Honda, we have access to vehicles that match your preferences and budget."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Brands' },
        ]}
        heroImage={mercedesSClass}
        heroImageAlt="Mercedes S-Class"
        badge="Brand Access"
        keyPoints={[
          '12+ major brands available',
          'Direct dealership relationships',
          'Current inventory access',
        ]}
        stats={[
          { label: 'Brands', value: '12+' },
          { label: 'Years Experience', value: '30+' },
        ]}
      />

      <SectionDivider variant="curved" nextSectionDark />

      <section className="py-6 md:py-14 lg:py-20 bg-[hsl(0_0%_4%)]">
        <div ref={ref} className={`container mx-auto px-4 lg:px-8 scroll-reveal ${isRevealed ? 'revealed' : ''}`}>
          <div className="max-w-3xl mx-auto text-center mb-8 md:mb-12">
            <p className="text-base md:text-lg text-white">
              Availability varies, so the best way to find out what is currently available is to talk to us directly.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8 mb-8 md:mb-12">
            {brands.map((brand) => (
              <div key={brand.name} className="flex flex-col items-center justify-center p-6 md:p-8 rounded-xl border border-white/10 bg-white/[0.06] backdrop-blur-sm hover:border-accent/30 hover:bg-white/[0.08] transition-all card-hover">
                <div className="flex items-center justify-center p-4 mb-4 rounded-lg bg-white w-full max-w-[140px] min-h-[80px]">
                  <img src={brand.logo} alt={brand.name} loading="lazy" decoding="async" className="h-16 w-auto object-contain transition-all" />
                </div>
                <span className="text-sm font-medium text-white">{brand.name}</span>
              </div>
            ))}
          </div>

          <div className="text-center">
            <MagneticButton strength={0.35}>
              <Button asChild size="lg" className="bg-accent hover:bg-accent/90 glow-blue">
                <Link to="/contact">Contact Us</Link>
              </Button>
            </MagneticButton>
          </div>
        </div>
      </section>
    </Layout>
  );
}
