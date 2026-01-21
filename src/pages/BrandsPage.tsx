import { Layout } from '@/components/layout/Layout';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { useScrollReveal } from '@/hooks/useScrollReveal';

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
      <section className="bg-primary py-20 md:py-28">
        <div className="container mx-auto px-4 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-6">Brand Partners</h1>
          <p className="text-lg text-primary-foreground/80 max-w-2xl">
            We work with a diverse range of automotive brands to offer you the best selection and value.
          </p>
        </div>
      </section>

      <section className="py-20 md:py-28 bg-background">
        <div ref={ref} className={`container mx-auto px-4 lg:px-8 scroll-reveal ${isRevealed ? 'revealed' : ''}`}>
          <SectionHeading title="Our Brand Network" subtitle="Access to multiple manufacturers means more options and better deals for you." />
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {brands.map((brand) => (
              <div key={brand.name} className="flex flex-col items-center justify-center p-8 bg-muted rounded-lg card-hover">
                <img src={brand.logo} alt={brand.name} className="h-16 w-auto object-contain mb-4 grayscale hover:grayscale-0 transition-all" />
                <span className="text-sm font-medium text-muted-foreground">{brand.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
