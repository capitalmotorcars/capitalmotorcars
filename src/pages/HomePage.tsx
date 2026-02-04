import { Layout } from '@/components/layout/Layout';
import { SEO } from '@/components/SEO';
import { JsonLd, organizationSchema } from '@/components/JsonLd';
import { HeroSection } from '@/components/hero/HeroSection';
import { HowItWorksSection } from '@/components/home/HowItWorksSection';
import { PeopleSection } from '@/components/home/PeopleSection';
import { VehicleTypesCarousel } from '@/components/home/VehicleTypesCarousel';
import { BrandsCarousel } from '@/components/home/BrandsCarousel';
import { TestimonialsSection } from '@/components/home/TestimonialsSection';
import { WhyUsPokerCards } from '@/components/home/WhyUsPokerCards';
import { WhatWeDoSection } from '@/components/home/WhatWeDoSection';
import { ExperienceTrustSection } from '@/components/home/ExperienceTrustSection';
import { FinalCTASection } from '@/components/home/FinalCTASection';
import { HeroBackgroundWrapper } from '@/components/hero/HeroBackgroundWrapper';

export default function HomePage() {
  return (
    <Layout>
      <SEO
        title="Capital Motor Cars | Car Leasing & Automotive Services"
        description="Simple, stress-free car leasing and automotive services in New Jersey. We handle negotiations, financing, and end-of-lease repairs so you don't have to."
      />
      <JsonLd data={organizationSchema} />
      <HeroBackgroundWrapper>
        <HeroSection />
        <HowItWorksSection transparentBackground />
      </HeroBackgroundWrapper>
      <VehicleTypesCarousel />
      <BrandsCarousel />
      <PeopleSection />
      <WhatWeDoSection />
      <WhyUsPokerCards />
      <ExperienceTrustSection />
      <FinalCTASection />
      <TestimonialsSection />
    </Layout>
  );
}
