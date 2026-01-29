import { Link } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { SEO } from '@/components/SEO';
import { JsonLd, organizationSchema } from '@/components/JsonLd';
import { Button } from '@/components/ui/button';
import { StatCard } from '@/components/ui/StatCard';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { SectionDivider } from '@/components/ui/SectionDivider';
import { MagneticButton } from '@/components/ui/MagneticButton';
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
      <SectionDivider variant="curved" nextSectionDark />

      <VehicleTypesCarousel />
      <SectionDivider variant="curved" nextSectionDark />

      <BrandsCarousel />
      <SectionDivider variant="curved" nextSectionDark />

      <PeopleSection />
      <SectionDivider variant="curved" nextSectionDark />

      {/* What We Do Section - Bento Grid */}
      <WhatWeDoSection />
      <SectionDivider variant="curved" nextSectionDark />

      {/* Why Work With Us Section - Poker Cards */}
      <WhyUsPokerCards />
      <SectionDivider variant="curved" nextSectionDark />

      {/* Experience You Can Trust Section */}
      <section className="py-10 md:py-20 lg:py-28 bg-[hsl(216_27%_8%)]">
        <div className="container mx-auto px-4 lg:px-8">
          <SectionHeading title="Experience You Can Trust" dark />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 max-w-5xl mx-auto">
            <StatCard value="30+" label="Years of Industry Experience" dark />
            <StatCard value="Hundreds" label="of Vehicles Managed End-to-End" dark />
            <StatCard value="Direct Access" label="to Major Automotive Brands" dark />
          </div>
        </div>
      </section>

      <SectionDivider variant="curved" nextSectionDark />

      {/* Final CTA Section */}
      <section className="py-10 md:py-20 lg:py-28" style={{ backgroundColor: 'hsl(216 27% 6%)' }}>
        <div 
          ref={ctaRef}
          className={`container mx-auto px-4 lg:px-8 text-center scroll-reveal ${ctaRevealed ? 'revealed' : ''}`}
        >
          <h2 className="text-2xl md:text-4xl font-bold text-gradient-heading-dark mb-4 md:mb-6 max-w-2xl mx-auto">
            Looking for a simpler way to handle your next vehicle?
          </h2>
          <p className="text-base md:text-lg mb-6 md:mb-8 max-w-xl mx-auto" style={{ color: 'hsl(213 27% 84%)' }}>
            Schedule a call and we’ll walk you through the process.
          </p>
          <MagneticButton strength={0.35}>
            <Button 
              asChild 
              size="lg" 
              className="bg-accent hover:bg-accent/90 text-white glow-blue"
            >
              <Link to="/contact">Schedule a Call</Link>
            </Button>
          </MagneticButton>
        </div>
      </section>
    </Layout>
  );
}
