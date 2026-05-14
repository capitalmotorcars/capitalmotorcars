import { Layout } from '@/components/layout/Layout';
import { SEO } from '@/components/SEO';
import { JsonLd, autoDealerSchema, createFaqSchema, createSiteNavigationSchema, localBusinessSchema, websiteSchema } from '@/components/JsonLd';
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
import { primarySeoKeywords, njSeoKeywords } from '@/data/seoKeywords';

const homepageFaqSchema = createFaqSchema([
  {
    question: 'What does a car leasing broker do in New Jersey?',
    answer: 'A car leasing broker compares dealer offers, negotiates lease terms, and helps you secure the right vehicle without spending hours visiting multiple dealerships in New Jersey.',
  },
  {
    question: 'Can a broker help me get a better lease deal in NJ?',
    answer: 'Yes. A broker can often uncover more competitive pricing, manufacturer programs, and dealer inventory options that are difficult to find on your own.',
  },
  {
    question: 'Do I need to visit a dealership if I use Capital Motor Cars?',
    answer: 'In many cases, no. Capital Motor Cars handles the search, negotiation, paperwork coordination, and delivery process so you can avoid the usual dealership experience.',
  },
  {
    question: 'Does Capital Motor Cars work with New Jersey and New York drivers?',
    answer: 'Yes. Capital Motor Cars helps drivers across New Jersey and New York with leasing, financing, trade-ins, and lease return support.',
  },
  {
    question: 'Can a broker help with zero-down lease options in NJ?',
    answer: 'Yes. Capital Motor Cars can explain available zero-down or low-drive-off options, review lender requirements, and help match you with lease structures that fit your budget.',
  },
]);

const primaryNavigationSchema = createSiteNavigationSchema([
  { name: 'Home', url: 'https://capitalmotorcars.com/' },
  { name: 'Services', url: 'https://capitalmotorcars.com/services' },
  { name: 'Brands', url: 'https://capitalmotorcars.com/brands' },
  { name: 'Blog', url: 'https://capitalmotorcars.com/blog' },
  { name: 'About', url: 'https://capitalmotorcars.com/about' },
  { name: 'Contact', url: 'https://capitalmotorcars.com/contact' },
]);

export default function HomePage() {
  return (
    <Layout>
      <SEO
        title="Capital Motor Cars | Premier Auto Broker & Car Leasing in NJ & NY"
        description="Experience stress-free car leasing with Capital Motor Cars. We negotiate the best auto lease deals with zero down, fast approvals, and free delivery across NJ and NY."
        seoKeywords={[...primarySeoKeywords, ...njSeoKeywords, 'car lease deals New York', 'zero down car lease', 'fast lease approval', 'Capital Motor Cars']}
        ogImage="/src/assets/hero-bg.jpg"
        canonicalPath="/"
      />
      <JsonLd data={[websiteSchema, localBusinessSchema, autoDealerSchema, homepageFaqSchema, ...primaryNavigationSchema]} />
      <ScrollTriggeredQuizDialog />
      <HeroBackgroundWrapper>
        <HeroSection />
      </HeroBackgroundWrapper>

      <LeaseDealsSection />
      <SectionDividerCreative variant="dot" />
      <HowItWorksSection transparentBackground />

      <SectionDividerCreative variant="dot" />
      <VehicleTypesCarousel title="Discover The Car Of Your Dreams"
      />



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
      {/* <SectionDividerCreative variant="dot" /> */}
      {/* <BlogSection /> */}

    </Layout>
  );
}
