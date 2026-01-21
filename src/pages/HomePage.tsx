import { Link } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { ServiceCard } from '@/components/ui/ServiceCard';
import { StatCard } from '@/components/ui/StatCard';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { HeroSection } from '@/components/hero/HeroSection';
import { PeopleSection } from '@/components/home/PeopleSection';
import { VehiclesSection } from '@/components/home/VehiclesSection';
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
    description: 'Find the right lease for your budget and needs without spending hours negotiating at dealerships.',
    href: '/services/car-leasing',
    icon: Car,
  },
  {
    title: 'Financing & Credit',
    description: 'A simple credit application to review financing options without unnecessary paperwork.',
    href: '/services/financing',
    icon: CreditCard,
  },
  {
    title: 'Trade-In Services',
    description: 'We evaluate your current vehicle and manage the trade-in process to prevent undervaluation.',
    href: '/services/trade-in',
    icon: RefreshCw,
  },
  {
    title: 'Wear & Tear Repair',
    description: 'End-of-lease repairs focused on reducing penalties and unexpected charges.',
    href: '/services/wear-and-tear',
    icon: Wrench,
  },
  {
    title: 'Rim, Wheel & Tire',
    description: 'Repair and restoration of wheels and tires, both cosmetic and functional.',
    href: '/services/wheel-repair',
    icon: CircleDot,
  },
  {
    title: 'Professional Detailing',
    description: 'Interior and exterior detailing for vehicles being returned, sold or simply cleaned properly.',
    href: '/services/detailing',
    icon: Sparkles,
  },
];

const whyChooseUs = [
  {
    icon: User,
    title: 'Single Point of Contact',
    description: 'No need to switch between dealerships, lenders or service garages.',
  },
  {
    icon: Award,
    title: 'Real Industry Experience',
    description: 'We know how the system works and how to navigate it effectively.',
  },
  {
    icon: CheckCircle,
    title: 'Clear, Practical Process',
    description: 'You know what is happening, how much it costs and what happens next.',
  },
];

export default function HomePage() {
  const { ref: servicesRef, isRevealed: servicesRevealed } = useScrollReveal();
  const { ref: whyRef, isRevealed: whyRevealed } = useScrollReveal();
  const { ref: statsRef, isRevealed: statsRevealed } = useScrollReveal();
  const { ref: ctaRef, isRevealed: ctaRevealed } = useScrollReveal();

  return (
    <Layout>
      <HeroSection />

      <VehiclesSection />

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
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <ServiceCard key={service.href} {...service} />
            ))}
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
          <div className="grid md:grid-cols-3 gap-8">
            {whyChooseUs.map((item) => (
              <div key={item.title} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-accent/10 rounded-full mb-6">
                  <item.icon className="w-8 h-8 text-accent" />
                </div>
                <h3 className="text-xl font-semibold text-primary mb-3">{item.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience You Can Trust Section */}
      <section className="py-20 md:py-28 bg-background">
        <div 
          ref={statsRef}
          className={`container mx-auto px-4 lg:px-8 scroll-reveal ${statsRevealed ? 'revealed' : ''}`}
        >
          <SectionHeading
            title="Experience You Can Trust"
          />
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <StatCard value={30} suffix="+" label="Years Combined Experience" />
            <StatCard value={100} suffix="s" label="Completed Transactions" />
            <StatCard value={15} suffix="+" label="Trusted Brand Partners" />
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 md:py-28 bg-primary">
        <div 
          ref={ctaRef}
          className={`container mx-auto px-4 lg:px-8 text-center scroll-reveal ${ctaRevealed ? 'revealed' : ''}`}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-6 max-w-2xl mx-auto">
            Looking for a simpler way to handle your next vehicle?
          </h2>
          <p className="text-lg text-primary-foreground/80 mb-8 max-w-xl mx-auto">
            Schedule a call and we will walk you through it.
          </p>
          <Button 
            asChild 
            size="lg" 
            className="bg-accent hover:bg-accent/90 text-accent-foreground"
          >
            <Link to="/contact">Schedule a Call</Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
}
