import { Link } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { ServiceCard } from '@/components/ui/ServiceCard';
import { StatCard } from '@/components/ui/StatCard';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { HeroSection } from '@/components/hero/HeroSection';
import { PeopleSection } from '@/components/home/PeopleSection';
import { VehicleTypesCarousel } from '@/components/home/VehicleTypesCarousel';
import { BrandsCarousel } from '@/components/home/BrandsCarousel';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { 
  Car, 
  CreditCard, 
  RefreshCw, 
  Wrench, 
  CircleDot, 
  Sparkles,
  User,
  Award,
  CheckCircle
} from 'lucide-react';

const services = [
  {
    title: 'Vehicle Leasing',
    description: 'We help you secure the right lease without spending hours negotiating at dealerships.',
    href: '/services/car-leasing',
    icon: Car,
  },
  {
    title: 'Financing & Credit',
    description: 'A straightforward credit application, so we can review financing options with you.',
    href: '/services/financing',
    icon: CreditCard,
  },
  {
    title: 'Trade-In Services',
    description: 'We evaluate your current vehicle and manage the trade-in process from start to finish.',
    href: '/services/trade-in',
    icon: RefreshCw,
  },
  {
    title: 'Wear & Tear Repair',
    description: 'End-of-lease repairs to reduce wear charges and avoid surprises at return.',
    href: '/services/wear-and-tear',
    icon: Wrench,
  },
  {
    title: 'Rim, Wheel & Tire',
    description: 'Wheel and tire repairs, cosmetic or functional, depending on what is needed.',
    href: '/services/wheel-repair',
    icon: CircleDot,
  },
  {
    title: 'Professional Detailing',
    description: 'Interior and exterior detailing for return, resale, or a proper clean.',
    href: '/services/detailing',
    icon: Sparkles,
  },
];

const coreServices = services.slice(0, 3);
const supportingServices = services.slice(3);

const whyChooseUs = [
  {
    icon: User,
    title: 'Single Point of Contact',
    description: 'One dedicated consultant manages everything for you.',
  },
  {
    icon: Award,
    title: 'Real Industry Experience',
    description: 'We understand how dealerships and lenders actually work.',
  },
  {
    icon: CheckCircle,
    title: 'Clear, Practical Process',
    description: 'You always know what’s happening and what comes next.',
  },
];

export default function HomePage() {
  const { ref: servicesRef, isRevealed: servicesRevealed } = useScrollReveal();
  const { ref: whyRef, isRevealed: whyRevealed } = useScrollReveal();
  const { ref: ctaRef, isRevealed: ctaRevealed } = useScrollReveal();

  return (
    <Layout>
      <HeroSection />

      <VehicleTypesCarousel />

      <BrandsCarousel />

      <PeopleSection />

      {/* What We Do Section */}
      <section className="py-20 md:py-28 bg-background">
        <div 
          ref={servicesRef}
          className={`container mx-auto px-4 lg:px-8 scroll-reveal ${servicesRevealed ? 'revealed' : ''}`}
        >
          <SectionHeading
            title="What We Do"
            subtitle="We support customers at every stage of the automotive process."
          />

          <div className="max-w-6xl mx-auto">
            <div className="text-xs uppercase tracking-wider text-muted-foreground mb-4">
              Core services
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {coreServices.map((service) => (
                <ServiceCard key={service.href} {...service} variant="core" />
              ))}
            </div>

            <div className="mt-10">
              <div className="text-xs uppercase tracking-wider text-muted-foreground mb-4">
                Supporting services
              </div>
              <div className="grid md:grid-cols-3 gap-6">
                {supportingServices.map((service) => (
                  <ServiceCard key={service.href} {...service} variant="supporting" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Work With Us Section */}
      <section className="py-20 md:py-28 bg-muted">
        <div 
          ref={whyRef}
          className={`container mx-auto px-4 lg:px-8 scroll-reveal ${whyRevealed ? 'revealed' : ''}`}
        >
          <SectionHeading
            title="Why Work with Capital Motor Cars"
          />
          <div className="grid md:grid-cols-3 gap-10 lg:gap-12 max-w-6xl mx-auto">
            {whyChooseUs.map((item) => (
              <div key={item.title} className="text-center">
                <div className="inline-flex items-center justify-center w-10 h-10 border border-border rounded-full mb-6">
                  <item.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-2xl font-semibold text-primary mb-2">{item.title}</h3>
                <p className="text-base text-muted-foreground leading-snug">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience You Can Trust Section */}
      <section className="py-20 md:py-28 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <SectionHeading
            title="Experience You Can Trust"
          />
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <StatCard value="30+" label="Years of Industry Experience" />
            <StatCard value="Hundreds" label="of Vehicles Managed End-to-End" />
            <StatCard value="Direct Access" label="to Major Automotive Brands" />
          </div>
        </div>
      </section>

      {/* Final CTA Section - CDK dark style */}
      <section className="py-20 md:py-28" style={{ backgroundColor: 'hsl(216 27% 6%)' }}>
        <div 
          ref={ctaRef}
          className={`container mx-auto px-4 lg:px-8 text-center scroll-reveal ${ctaRevealed ? 'revealed' : ''}`}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 max-w-2xl mx-auto">
            Looking for a simpler way to handle your next vehicle?
          </h2>
          <p className="text-lg mb-8 max-w-xl mx-auto" style={{ color: 'hsl(213 27% 84%)' }}>
            Schedule a call and we’ll walk you through the process.
          </p>
          <Button 
            asChild 
            size="lg" 
            className="bg-accent hover:bg-accent/90 text-white"
          >
            <Link to="/contact">Schedule a Call</Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
}
