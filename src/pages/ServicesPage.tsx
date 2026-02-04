import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { SEO } from '@/components/SEO';
import { JsonLd } from '@/components/JsonLd';
import { PageHero } from '@/components/ui/PageHero';
import { SectionDivider } from '@/components/ui/SectionDivider';
import { RelatedLinks, servicesPageLinks } from '@/components/ui/RelatedLinks';
import { ServiceCard } from '@/components/ui/ServiceCard';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import bmwM5 from '@/assets/bmw-hero.png';
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
      
      <PageHero
        title="Our Services"
        subtitle="We offer practical automotive solutions for customers who want things done right and without unnecessary hassle. From leasing and financing to end-of-lease repairs, our team handles every step with transparency and professionalism."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Services' },
        ]}
        heroImage={bmwM5}
        heroImageAlt="BMW M5"
        keyPoints={[
          '6 core services',
          'End-to-end support',
          'New Jersey based',
        ]}
      />


      {/* Services */}
      <section className="py-8 md:py-16 lg:py-20 section-bg">
        <div 
          ref={ref}
          className={`container mx-auto px-4 lg:px-8 scroll-reveal ${isRevealed ? 'revealed' : ''}`}
        >
          <h2 className="sr-only">Browse Our Services</h2>
          
          {/* Category Tabs */}
          <nav aria-label="Service categories" className="flex flex-wrap gap-2 mb-6 md:mb-12 justify-center">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                aria-pressed={activeCategory === cat.id}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  activeCategory === cat.id
                    ? 'bg-accent text-accent-foreground border-2 border-accent shadow-[0_0_16px_hsl(214_77%_50%_/_0.3)]'
                    : 'text-section-muted hover:text-section border-section bg-card dark:bg-white/[0.04] hover:bg-muted dark:hover:bg-white/[0.08]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </nav>

          {/* Services Grid — premium container */}
          <div className="glass-card-theme p-6 md:p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 tab-content-enter">
            {filteredServices.map((service) => (
              <ServiceCard key={service.href} {...service} />
            ))}
          </div>
          </div>

          {/* Additional CTA */}
          <div className="mt-10 md:mt-16 text-center">
            <p className="text-section-muted mb-4">
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

      <RelatedLinks title="Next Steps" links={servicesPageLinks} />
    </Layout>
  );
}
