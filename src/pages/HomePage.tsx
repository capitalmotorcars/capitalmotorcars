import { Layout } from '@/components/layout/Layout';
import { SEO } from '@/components/SEO';
import { JsonLd, organizationSchema } from '@/components/JsonLd';
import { HeroSection } from '@/components/hero/HeroSection';
import { HowItWorksSection } from '@/components/home/HowItWorksSection';
import { PeopleSection } from '@/components/home/PeopleSection';
import { VehicleTypesCarousel } from '@/components/home/VehicleTypesCarousel';
import { BrandsCarousel } from '@/components/home/BrandsCarousel';
import { TestimonialsSection } from '@/components/home/TestimonialsSection';
import { WhatWeDoSection } from '@/components/home/WhatWeDoSection';
import { WhyUsAndExperienceSection } from '@/components/home/WhyUsAndExperienceSection';
import { FinalCTASection } from '@/components/home/FinalCTASection';
import { HeroBackgroundWrapper } from '@/components/hero/HeroBackgroundWrapper';
import { SectionDividerCreative } from '@/components/ui/SectionDividerCreative';
import { ScrollTriggeredQuizDialog } from '@/components/home/ScrollTriggeredQuizDialog';
import { FAQSection } from '@/components/home/FAQSection';
import { LeaseDealsSection } from '@/components/home/LeaseDealsSection';
import { BlogSection } from '@/components/home/BlogSection';

export default function HomePage() {
  return (
    <Layout>
      <SEO
        title="Capital Motor Cars | Simple Car Leasing & Automotive Services"
        description="Experience stress-free car leasing with Capital Motor Cars. We negotiate the best deals, handle financing, and provide expert automotive services in New Jersey."
        seoKeywords={['car leasing NJ', 'auto leasing services', 'car lease deals NJ', 'Capital Motor Cars', 'automotive services Springfield NJ']}
        ogImage="/src/assets/hero-bg.jpg"
        canonicalPath="/"
      />
      <JsonLd data={organizationSchema} />
      <ScrollTriggeredQuizDialog />
      <HeroBackgroundWrapper>
        <HeroSection />
      </HeroBackgroundWrapper>
      <HowItWorksSection transparentBackground />

      <SectionDividerCreative variant="dot" />
      <VehicleTypesCarousel title="Discover The Car Of Your Dreams"
      />

      <SectionDividerCreative variant="dot" />
      <LeaseDealsSection />

      <SectionDividerCreative variant="dot" />
      <PeopleSection homePageOnly={true} padding="px-4 sm:px-6 lg:px-8 py-10 md:py-16" />

      <SectionDividerCreative variant="dot" />
      <WhatWeDoSection />

      <SectionDividerCreative variant="dot" />
      <WhyUsAndExperienceSection />

      <SectionDividerCreative variant="dot" />
      <FinalCTASection />

      <SectionDividerCreative variant="dot" />
      <TestimonialsSection />
      <SectionDividerCreative variant="dot" />
      <FAQSection />
      <SectionDividerCreative variant="dot" />
      <BlogSection />

    </Layout>
  );
}
