import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { SEO } from '@/components/SEO';
import { JsonLd } from '@/components/JsonLd';
import { RelatedLinks, servicesPageLinks } from '@/components/ui/RelatedLinks';
import { ServiceCard } from '@/components/ui/ServiceCard';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import bmwM5 from '@/assets/bmw-m5-transparent.png';
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
    description: 'Find the right lease for your budget and needs without spending hours negotiating at dealerships.',
    href: '/services/car-leasing',
    icon: Car,
    category: 'leasing',
  },
  {
    title: 'Financing & Credit',
    description: 'A simple credit application to review financing options without unnecessary paperwork.',
    href: '/services/financing',
    icon: CreditCard,
    category: 'financing',
  },
  {
    title: 'Trade-In',
    description: 'We evaluate your current vehicle and manage the trade-in process to prevent undervaluation.',
    href: '/services/trade-in',
    icon: RefreshCw,
    category: 'trade-in',
  },
  {
    title: 'Wear & Tear Repair',
    description: 'End-of-lease repairs focused on reducing penalties and unexpected charges.',
    href: '/services/wear-and-tear',
    icon: Wrench,
    category: 'vehicle-services',
  },
  {
    title: 'Rim, Wheel & Tire Repair',
    description: 'Repair and restoration of wheels and tires, both cosmetic and functional.',
    href: '/services/wheel-repair',
    icon: CircleDot,
    category: 'vehicle-services',
  },
  {
    title: 'Professional Detailing',
    description: 'Interior and exterior detailing for vehicles being returned, sold or simply cleaned properly.',
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

  const servicesListSchema = useMemo(() => ({
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Capital Motor Cars Services',
    description: 'Automotive services including leasing, financing, trade-in, and vehicle maintenance.',
    itemListElement: services.map((service, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Service',
        name: service.title,
        description: service.description,
        url: `https://capitalmotorcars.com${service.href}`,
      },
    })),
  }), []);

  return (
    <Layout>
      <SEO 
        title="Our Services | Capital Motor Cars"
        description="Leasing, financing, trade-in, detailing, and end-of-lease repairs. Practical automotive services handled by professionals in New Jersey."
      />
      <JsonLd data={servicesListSchema} />
      {/* Hero */}
      <section className="bg-primary py-16 md:py-20 overflow-hidden">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
            {/* Text Content */}
            <div className="max-w-xl lg:max-w-2xl flex-shrink-0">
              <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-6">
                Our Services
              </h1>
              <p className="text-lg text-primary-foreground/80">
                We offer practical automotive solutions for customers who want things done right and without unnecessary hassle.
              </p>
            </div>
            {/* BMW M5 Image - drives in from right */}
            <div className="hidden lg:block flex-shrink-0">
              <img 
                src={bmwM5} 
                alt="BMW M5" 
                className="w-[400px] xl:w-[480px] h-auto object-contain drop-shadow-2xl animate-car-drive-in"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 md:py-28 bg-background">
        <div 
          ref={ref}
          className={`container mx-auto px-4 lg:px-8 scroll-reveal ${isRevealed ? 'revealed' : ''}`}
        >
          <h2 className="sr-only">Browse Our Services</h2>
          
          {/* Category Tabs */}
          <nav aria-label="Service categories" className="flex flex-wrap gap-2 mb-12 justify-center">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                aria-pressed={activeCategory === cat.id}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeCategory === cat.id
                    ? 'bg-accent text-accent-foreground'
                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </nav>

          {/* Services Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 tab-content-enter">
            {filteredServices.map((service) => (
              <ServiceCard key={service.href} {...service} />
            ))}
          </div>

          {/* Additional CTA */}
          <div className="mt-16 text-center">
            <p className="text-muted-foreground mb-4">
              Select a service to see how it works.
            </p>
            <Link 
              to="/contact" 
              className="text-accent font-medium hover:underline"
            >
              Or contact us directly →
            </Link>
          </div>
        </div>
      </section>

      <RelatedLinks 
        title="Next Steps" 
        links={servicesPageLinks} 
        className="bg-muted border-t border-border"
      />
    </Layout>
  );
}
