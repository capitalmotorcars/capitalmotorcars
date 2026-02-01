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
import { LinearProcessVisualization } from '@/components/hero/LinearProcessVisualization';
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

      {/* How It Works — mobile only; desktop shows in hero */}
      <section
        id="how-it-works"
        className="md:hidden py-8 px-4 scroll-mt-20"
        style={{ backgroundColor: 'hsl(0 0% 4%)' }}
        aria-labelledby="how-it-works-title"
      >
        <div className="container mx-auto px-4">
          <h2
            id="how-it-works-title"
            className="text-center text-lg font-semibold tracking-wide mb-6"
            style={{ color: 'hsl(213 27% 78%)' }}
          >
            How It Works
          </h2>
          <div className="w-full max-w-5xl mx-auto rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-6 shadow-[0_8px_32px_rgba(0,0,0,0.24)]">
            <LinearProcessVisualization />
          </div>
        </div>
      </section>

      <div className="md:hidden">
        <SectionDivider variant="curved" nextSectionDark />
      </div>

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
      <section className="py-8 md:py-16 lg:py-20 bg-[hsl(0_0%_4%)]">
        <div className="container mx-auto px-4 lg:px-8">
          <SectionHeading title="Experience You Can Trust" dark />
          <div className="max-w-5xl mx-auto rounded-2xl border border-white/10 bg-white/[0.04] p-6 md:p-8 shadow-[0_8px_32px_rgba(0,0,0,0.24)]">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
              <StatCard value="30+" label="Years of Industry Experience" dark />
              <StatCard value="Hundreds" label="of Vehicles Managed End-to-End" dark />
              <StatCard value="Direct Access" label="to Major Automotive Brands" dark />
            </div>
          </div>
        </div>
      </section>

      <SectionDivider variant="curved" nextSectionDark />

      {/* Final CTA Section */}
      <section className="py-8 md:py-16 lg:py-20" style={{ backgroundColor: 'hsl(0 0% 3%)' }}>
        <div 
          ref={ctaRef}
          className={`container mx-auto px-4 lg:px-8 text-center max-w-3xl rounded-2xl border border-white/10 bg-white/[0.04] py-10 md:py-14 shadow-[0_8px_32px_rgba(0,0,0,0.24)] scroll-reveal ${ctaRevealed ? 'revealed' : ''}`}
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
