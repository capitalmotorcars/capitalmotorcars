import { Link } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { SEO } from '@/components/SEO';
import { JsonLd, organizationSchema } from '@/components/JsonLd';
import { Button } from '@/components/ui/button';
import { StatCard } from '@/components/ui/StatCard';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { HeroSection } from '@/components/hero/HeroSection';
import { PeopleSection } from '@/components/home/PeopleSection';
import { VehicleTypesCarousel } from '@/components/home/VehicleTypesCarousel';
import { BrandsCarousel } from '@/components/home/BrandsCarousel';
import { WhyUsPokerCards } from '@/components/home/WhyUsPokerCards';
import { WhatWeDoSection } from '@/components/home/WhatWeDoSection';
import { useScrollReveal } from '@/hooks/useScrollReveal';

export default function HomePage() {
  const { ref: ctaRef, isRevealed: ctaRevealed } = useScrollReveal();

  return (
    <Layout>
      <SEO 
        title="Capital Motor Cars | Car Leasing & Automotive Services"
        description="Simple, stress-free car leasing and automotive services in New Jersey. We handle negotiations, financing, and end-of-lease repairs so you don't have to."
      />
      <JsonLd data={organizationSchema} />
      <HeroSection />

      <VehicleTypesCarousel />

      <BrandsCarousel />

      <PeopleSection />

      {/* What We Do Section - Bento Grid */}
      <WhatWeDoSection />

      {/* Why Work With Us Section - Poker Cards */}
      <WhyUsPokerCards />

      {/* Experience You Can Trust Section */}
      <section className="py-12 md:py-28 bg-background">
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
      <section className="py-12 md:py-28" style={{ backgroundColor: 'hsl(216 27% 6%)' }}>
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
