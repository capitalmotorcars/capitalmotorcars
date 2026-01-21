import { Link } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { ServiceCard } from '@/components/ui/ServiceCard';
import { StatCard } from '@/components/ui/StatCard';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { HeroSection } from '@/components/hero/HeroSection';
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
    title: 'Car Leasing',
    description: 'Flexible lease terms on a wide selection of vehicles. Get behind the wheel without the long-term commitment.',
    href: '/services/car-leasing',
    icon: Car,
  },
  {
    title: 'Financing & Credit',
    description: 'Competitive financing options tailored to your situation. We work with multiple lenders to find the right fit.',
    href: '/services/financing',
    icon: CreditCard,
  },
  {
    title: 'Trade-In',
    description: 'Get a fair value for your current vehicle. Simple appraisal process with no obligation.',
    href: '/services/trade-in',
    icon: RefreshCw,
  },
  {
    title: 'Wear & Tear Repair',
    description: 'Address lease-end concerns before they become costly. Professional repairs at reasonable prices.',
    href: '/services/wear-and-tear',
    icon: Wrench,
  },
  {
    title: 'Wheel & Tire Repair',
    description: 'Rim refinishing, tire replacement, and wheel alignment. Keep your vehicle looking and running great.',
    href: '/services/wheel-repair',
    icon: CircleDot,
  },
  {
    title: 'Car Detailing',
    description: 'Professional interior and exterior detailing. Restore your vehicle to showroom condition.',
    href: '/services/detailing',
    icon: Sparkles,
  },
];

const whyChooseUs = [
  {
    icon: User,
    title: 'One Point of Contact',
    description: 'No runaround. You work directly with someone who knows your situation and can actually help.',
  },
  {
    icon: Award,
    title: 'Real Industry Experience',
    description: 'Decades of combined experience in automotive sales, leasing, and service. We know the business inside and out.',
  },
  {
    icon: CheckCircle,
    title: 'Clear, Practical Process',
    description: 'No hidden fees, no pressure tactics. We explain everything upfront and let you make informed decisions.',
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

      {/* Services Section */}
      <section className="py-20 md:py-28 bg-background">
        <div 
          ref={servicesRef}
          className={`container mx-auto px-4 lg:px-8 scroll-reveal ${servicesRevealed ? 'revealed' : ''}`}
        >
          <SectionHeading
            title="Our Services"
            subtitle="From leasing to repairs, we provide comprehensive automotive solutions with transparency at every step."
          />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <ServiceCard key={service.href} {...service} />
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 md:py-28 bg-muted">
        <div 
          ref={whyRef}
          className={`container mx-auto px-4 lg:px-8 scroll-reveal ${whyRevealed ? 'revealed' : ''}`}
        >
          <SectionHeading
            title="Why Capital Motor Cars"
            subtitle="We're not a typical dealership. Here's what makes working with us different."
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

      {/* Stats Section */}
      <section className="py-20 md:py-28 bg-background">
        <div 
          ref={statsRef}
          className={`container mx-auto px-4 lg:px-8 scroll-reveal ${statsRevealed ? 'revealed' : ''}`}
        >
          <SectionHeading
            title="Trusted Experience"
            subtitle="Numbers that reflect our commitment to customer satisfaction."
          />
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <StatCard value={30} suffix="+" label="Years Combined Experience" />
            <StatCard value={500} suffix="+" label="Customers Served" />
            <StatCard value={15} suffix="+" label="Brand Partners" />
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
            Want a simpler way to handle your next vehicle?
          </h2>
          <p className="text-lg text-primary-foreground/80 mb-8 max-w-xl mx-auto">
            Schedule a call and we'll walk you through it. No pressure, no obligation.
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
