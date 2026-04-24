import { Layout } from '@/components/layout/Layout';
import { SEO } from '@/components/SEO';
import { JsonLd } from '@/components/JsonLd';
import { TradeInValueForm } from '@/components/forms/TradeInValueForm';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { cn } from '@/lib/utils';
import { renderSEOHeading } from '@/utils/seoUtils';
import { motion } from 'framer-motion';
import tradeInBg from '@/assets/trade-in.avif';

export default function TradeInValuePage() {
  const { ref, isRevealed } = useScrollReveal();

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
  } as const;

  return (
    <Layout>
      <SEO
        title="Trade-In Value & Lease Upgrades in New York & New Jersey | Capital Motor Cars"
        description="Trade-in value requests in New Jersey and New York from Capital Motor Cars. Appraise your current vehicle and upgrade into your next lease."
        seoKeywords={['trade in value New Jersey', 'trade in value New York', 'vehicle appraisal NJ', 'lease upgrade trade in', 'Capital Motor Cars trade in']}
        ogImage="/src/assets/trade-in.avif"
        canonicalPath="/trade-in-value"
      />
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": "Trade-In Value Request",
        "description": "Submit your vehicle for a trade-in valuation and receive a competitive offer.",
        "url": "https://capitalmotorcars.com/trade-in-value"
      }} />

      <section className="pt-16 lg:pt-20">
        <div id="trade-in-value" className="relative h-full flex flex-col">
          {/* Hero background */}
          <div className="absolute top-0 left-0 right-0 h-[30vh] md:h-[45vh] overflow-hidden">
            <motion.img
              initial={{ scale: 1.1, opacity: 0 }}
              animate={{ scale: 1.05, opacity: 1 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              src={tradeInBg}
              alt=""
              className="w-full h-full object-cover object-center blur-[1.5px]"
              aria-hidden
            />
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="absolute top-0 left-0 right-0 h-[30vh] md:h-[45vh] bg-gradient-to-b from-black/40 via-black/20 to-transparent"
            aria-hidden
          />
          <div
            className="absolute top-[17vh] md:top-[22.5vh] left-0 right-0 h-[17vh] md:h-[22.5vh] bg-gradient-to-b from-transparent via-white/20 to-white dark:to-[hsl(0,0%,4%)]"
            aria-hidden
          />
          <div
            className="absolute top-[30vh] md:top-[45vh] left-0 right-0 bottom-0 bg-white dark:bg-[hsl(0,0%,4%)]"
            aria-hidden
          />

          {/* Content */}
          <div ref={ref} className={cn('relative z-10 flex-1 flex flex-col', 'scroll-reveal', isRevealed && 'revealed')}>
            <div className="relative z-50 mx-auto min-h-[30vh] md:min-h-[45vh] pt-24 md:pt-32 pb-8 px-4 lg:px-8 flex flex-col items-center justify-center text-center">
              <motion.h2
                {...fadeInUp}
                transition={{ ...fadeInUp.transition, delay: 0.1 }}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white pb-2 md:pb-4 xl:pb-6 tracking-tight text-center"
              >
                {renderSEOHeading("Trade-In Value & Lease Upgrades in New York & New Jersey | Capital Motor Cars")}
              </motion.h2>
              <motion.p
                {...fadeInUp}
                transition={{ ...fadeInUp.transition, delay: 0.2 }}
                className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-white/80 max-w-3xl xl:max-w-5xl mx-auto"
              >
                Looking to trade-in your car? Get max value for your current vehicle and upgrade to a new lease with Zero Down in NJ. Get a Quote!
              </motion.p>
            </div>

            {/* Form Section */}
            <div className="relative bg-white dark:bg-black h-full py-12 md:py-16 z-10">
              <div className="mx-auto px-4 lg:px-8 xl:px-12">
                <div className="max-w-3xl mx-auto">
                  <div className="glass-card-theme form-card-theme p-6 sm:p-8 md:p-10 xl:p-12 rounded-xl scroll-mt-24">
                    <TradeInValueForm />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
