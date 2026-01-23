import { Link } from 'react-router-dom';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

type VehicleTag = 'Lease Available' | 'Recent Delivery' | 'Customer Favorite';

interface Vehicle {
  brand: string;
  model: string;
  image: string;
  tag: VehicleTag;
}

const vehicles: Vehicle[] = [
  {
    brand: 'BMW',
    model: 'X5 xDrive40i',
    image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=600&q=75',
    tag: 'Lease Available',
  },
  {
    brand: 'Mercedes-Benz',
    model: 'GLE 350',
    image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=600&q=75',
    tag: 'Customer Favorite',
  },
  {
    brand: 'Audi',
    model: 'Q7 Premium',
    image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=600&q=75',
    tag: 'Lease Available',
  },
  {
    brand: 'Lexus',
    model: 'RX 350',
    image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=600&q=75',
    tag: 'Recent Delivery',
  },
  {
    brand: 'Porsche',
    model: 'Cayenne',
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=600&q=75',
    tag: 'Customer Favorite',
  },
  {
    brand: 'Tesla',
    model: 'Model Y',
    image: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&w=600&q=75',
    tag: 'Lease Available',
  },
];

const tagStyles: Record<VehicleTag, string> = {
  'Lease Available': 'bg-accent/10 text-accent',
  'Recent Delivery': 'bg-primary/10 text-primary',
  'Customer Favorite': 'bg-secondary/20 text-secondary',
};

export function VehiclesSection() {
  const { ref, isRevealed } = useScrollReveal();

  return (
    <section className="py-20 md:py-28 bg-muted">
      <div
        ref={ref}
        className={`container mx-auto px-4 lg:px-8 scroll-reveal ${isRevealed ? 'revealed' : ''}`}
      >
        <SectionHeading
          title="Vehicles We Work With"
          subtitle="Access to a wide range of vehicles across multiple brands and dealerships."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {vehicles.map((vehicle) => (
            <div
              key={`${vehicle.brand}-${vehicle.model}`}
              className="group bg-card rounded-lg overflow-hidden card-hover"
            >
              <div className="aspect-[3/2] overflow-hidden">
                <img
                  src={vehicle.image}
                  alt={`${vehicle.brand} ${vehicle.model}`}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">
                      {vehicle.brand}
                    </p>
                    <h3 className="font-semibold text-primary">
                      {vehicle.model}
                    </h3>
                  </div>
                  <span
                    className={`text-xs font-medium px-2.5 py-1 rounded-full whitespace-nowrap ${tagStyles[vehicle.tag]}`}
                  >
                    {vehicle.tag}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Button asChild variant="outline" size="lg">
            <Link to="/brands">
              View Full Inventory
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
