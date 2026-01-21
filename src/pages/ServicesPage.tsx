import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { ServiceCard } from '@/components/ui/ServiceCard';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { 
  Car, 
  CreditCard, 
  RefreshCw, 
  Wrench, 
  CircleDot, 
  Sparkles 
} from 'lucide-react';

const categories = [
  { id: 'all', label: 'All Services' },
  { id: 'leasing', label: 'Leasing' },
  { id: 'financing', label: 'Financing' },
  { id: 'trade-in', label: 'Trade-In' },
  { id: 'vehicle-services', label: 'Vehicle Services' },
];

const services = [
  {
    title: 'Car Leasing',
    description: 'Flexible lease terms on a wide selection of vehicles from multiple brands. Get behind the wheel with predictable monthly payments and comprehensive support.',
    href: '/services/car-leasing',
    icon: Car,
    category: 'leasing',
  },
  {
    title: 'Financing & Credit Application',
    description: 'Competitive financing options tailored to your unique situation. We work with multiple lenders to find the best rates and terms for you.',
    href: '/services/financing',
    icon: CreditCard,
    category: 'financing',
  },
  {
    title: 'Trade-In',
    description: 'Get a fair, honest value for your current vehicle. Our simple appraisal process gives you a clear picture with no obligation to proceed.',
    href: '/services/trade-in',
    icon: RefreshCw,
    category: 'trade-in',
  },
  {
    title: 'Wear & Tear Repair',
    description: 'Address lease-end concerns before return. We handle scratches, dents, interior damage, and more at prices that make sense.',
    href: '/services/wear-and-tear',
    icon: Wrench,
    category: 'vehicle-services',
  },
  {
    title: 'Rim, Wheel & Tire Repair',
    description: 'Professional rim refinishing, curb rash repair, tire replacement, and wheel alignment to keep your vehicle safe and looking great.',
    href: '/services/wheel-repair',
    icon: CircleDot,
    category: 'vehicle-services',
  },
  {
    title: 'Professional Car Detailing',
    description: 'Comprehensive interior and exterior detailing services. From basic washes to full paint correction, restore your vehicle to showroom condition.',
    href: '/services/detailing',
    icon: Sparkles,
    category: 'vehicle-services',
  },
];

export default function ServicesPage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const { ref, isRevealed } = useScrollReveal();

  const filteredServices = activeCategory === 'all' 
    ? services 
    : services.filter(s => s.category === activeCategory);

  return (
    <Layout>
      {/* Hero */}
      <section className="bg-primary py-20 md:py-28">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-6">
              Our Services
            </h1>
            <p className="text-lg text-primary-foreground/80">
              From finding your next vehicle to keeping it in top condition, we offer 
              comprehensive automotive services with the personal attention you deserve.
            </p>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 md:py-28 bg-background">
        <div 
          ref={ref}
          className={`container mx-auto px-4 lg:px-8 scroll-reveal ${isRevealed ? 'revealed' : ''}`}
        >
          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2 mb-12 justify-center">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeCategory === cat.id
                    ? 'bg-accent text-accent-foreground'
                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Services Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 tab-content-enter">
            {filteredServices.map((service) => (
              <ServiceCard key={service.href} {...service} />
            ))}
          </div>

          {/* Additional CTA */}
          <div className="mt-16 text-center">
            <p className="text-muted-foreground mb-4">
              Not sure which service you need?
            </p>
            <Link 
              to="/contact" 
              className="text-accent font-medium hover:underline"
            >
              Contact us and we'll help you figure it out →
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
