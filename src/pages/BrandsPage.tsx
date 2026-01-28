import { Layout } from '@/components/layout/Layout';
import { SEO } from '@/components/SEO';
import { SectionHeading } from '@/components/ui/SectionHeading';
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
      <section className="bg-primary py-16 md:py-20 overflow-hidden">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
            {/* Text Content */}
            <div className="max-w-xl lg:max-w-2xl flex-shrink-0">
              <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-6">Brands We Work With</h1>
              <p className="text-lg text-primary-foreground/80">
                We work with a wide range of automotive brands and dealerships.
              </p>
            </div>
            {/* Mercedes S-Class Image */}
            <div className="hidden lg:block flex-shrink-0">
              <img 
                src={mercedesSClass} 
                alt="Mercedes S-Class" 
                className="w-[400px] xl:w-[480px] h-auto object-contain drop-shadow-2xl animate-car-drive-in"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28 bg-background">
        <div ref={ref} className={`container mx-auto px-4 lg:px-8 scroll-reveal ${isRevealed ? 'revealed' : ''}`}>
          <div className="max-w-3xl mx-auto text-center mb-12">
            <p className="text-lg text-muted-foreground">
              Availability varies, so the best way to find out what is currently available is to talk to us directly.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mb-12">
            {brands.map((brand) => (
              <div key={brand.name} className="flex flex-col items-center justify-center p-8 bg-muted rounded-lg card-hover">
                <img src={brand.logo} alt={brand.name} loading="lazy" decoding="async" className="h-16 w-auto object-contain mb-4 grayscale hover:grayscale-0 transition-all" />
                <span className="text-sm font-medium text-muted-foreground">{brand.name}</span>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Button asChild size="lg" className="bg-accent hover:bg-accent/90">
              <Link to="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
