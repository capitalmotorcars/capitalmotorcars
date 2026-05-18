import { Layout } from '@/components/layout/Layout';
import { SEO } from '@/components/SEO';
import { JsonLd } from '@/components/JsonLd';
import { CreditApplicationForm } from '@/components/forms/CreditApplicationForm';
import { BusinessCreditApplicationForm } from '@/components/forms/BusinessCreditApplicationForm';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { cn } from '@/lib/utils';
import { renderSEOHeading } from '@/utils/seoUtils';
import { Shield, FileText, Clock, CheckCircle2, User, Building } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import bg1 from '@/assets/contact.jpg';

export default function CreditApplicationPage() {
  const { ref, isRevealed } = useScrollReveal();
  const [applicationType, setApplicationType] = useState<'personal' | 'business' | null>(null);

  const benefits = [
    { icon: Shield, text: 'Secure & Encrypted' },
    { icon: Clock, text: 'Quick 5 Step Process' },
    { icon: FileText, text: 'Simple Application' },
    { icon: CheckCircle2, text: 'Fast Response Time' },
  ];

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
  } as const;

  return (
    <Layout>
      <SEO
        title="Auto & Car Leasing in New Jersey & New York | Capital Motor Cars"
        description="Get approved for auto leasing in minutes. We help NJ and NY drivers secure flexible lease options quickly, even with challenged credit. Apply now."
        seoKeywords={['auto lease financing New Jersey', 'auto lease financing New York', 'car credit application NJ', 'lease credit application NY', 'Capital Motor Cars finance']}
        ogImage="/src/assets/contact.jpg"
        canonicalPath="/credit-application"
      />
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": "Auto & Car Leasing in New Jersey & New York",
        "description": "Get approved for auto leasing in minutes. We help NJ and NY drivers secure flexible lease options quickly, even with challenged credit. Apply now.",
        "url": "https://capitalmotorcars.com/credit-application"
      }} />

      <section className="pt-16 lg:pt-20">
        <div id="credit-application" className="relative h-full flex flex-col">
          {/* Top half: Blurred background */}
          <div className="absolute top-0 left-0 right-0 h-[30vh] md:h-[45vh] overflow-hidden">
            <motion.img
              initial={{ scale: 1.1, opacity: 0 }}
              animate={{ scale: 1.05, opacity: 1 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              src={bg1}
              alt=""
              className="w-full h-full object-cover object-center blur-[1.5px]"
              aria-hidden
            />
          </div>
          {/* Dark overlay on top half for text readability */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="absolute top-0 left-0 right-0 h-[30vh] md:h-[45vh] bg-gradient-to-b from-black/40 via-black/20 to-transparent"
            aria-hidden
          />

          {/* Gradient fade to bottom content */}
          <div
            className="absolute top-[17vh] md:top-[22.5vh] left-0 right-0 h-[17vh] md:h-[22.5vh] bg-gradient-to-b from-transparent via-white/20 to-white dark:to-[hsl(0,0%,4%)]"
            aria-hidden
          />

          {/* Bottom half: White background */}
          <div
            className="absolute top-[30vh] md:top-[45vh] left-0 right-0 bottom-0 bg-white dark:bg-[hsl(0,0%,4%)]"
            aria-hidden
          />

          {/* Content */}
          <div ref={ref} className={cn('relative z-10 flex-1 flex flex-col', 'scroll-reveal', isRevealed && 'revealed')}>
            {/* Title Section */}
            <div className="relative z-50 mx-auto min-h-[30vh] md:min-h-[45vh] pt-24 md:pt-32 pb-8 px-4 lg:px-8 flex flex-col items-center justify-center text-center">
              <motion.h2
                {...fadeInUp}
                transition={{ ...fadeInUp.transition, delay: 0.1 }}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white pb-2 md:pb-4 xl:pb-6 tracking-tight text-center"
              >
                {renderSEOHeading("Auto & Car Leasing in New Jersey & New York | Capital Motor Cars")}
              </motion.h2>
              <motion.p
                {...fadeInUp}
                transition={{ ...fadeInUp.transition, delay: 0.2 }}
                className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-white/80 max-w-3xl xl:max-w-5xl mx-auto pb-4 md:pb-6 xl:pb-8"
              >
                Get approved for auto leasing in minutes. We help NJ and NY drivers secure flexible lease options quickly, even with challenged credit. Apply now.
              </motion.p>

              {/* Benefits */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 md:gap-8"
              >
                {benefits.map((benefit, index) => {
                  const Icon = benefit.icon;
                  return (
                    <div key={index} className="flex items-center gap-2 text-white font-bold">
                      <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                      <span className="text-xs sm:text-sm md:text-base">{benefit.text}</span>
                    </div>
                  );
                })}
              </motion.div>
            </div>

            {/* Form Section */}
            <div className="relative bg-white dark:bg-black h-full py-12 md:py-16 z-10">
              <div className="mx-auto px-4 lg:px-8 xl:px-12">
                <div className="max-w-5xl mx-auto">
                  {!applicationType ? (
                    <div className="hidden md:flex flex-row gap-6 justify-center max-w-4xl mx-auto">
                      <button
                        onClick={() => setApplicationType('personal')}
                        className="flex-1 glass-card-theme form-card-theme p-10 sm:p-12 rounded-3xl flex flex-col items-center justify-center gap-6 border-2 border-transparent hover:border-blue-500/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl group cursor-pointer"
                      >
                        <div className="w-24 h-24 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white group-hover:scale-110 shadow-sm transition-all duration-300">
                          <User className="w-12 h-12" />
                        </div>
                        <div className="text-center space-y-3">
                          <h3 className="text-2xl sm:text-3xl font-bold text-foreground dark:text-white">Personal Use</h3>
                          <p className="text-sm sm:text-base text-muted-foreground dark:text-white/70 max-w-xs mx-auto">Apply for a personal auto lease or financing.</p>
                        </div>
                      </button>
                      
                      <button
                        onClick={() => setApplicationType('business')}
                        className="flex-1 glass-card-theme form-card-theme p-10 sm:p-12 rounded-3xl flex flex-col items-center justify-center gap-6 border-2 border-transparent hover:border-blue-500/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl group cursor-pointer"
                      >
                        <div className="w-24 h-24 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white group-hover:scale-110 shadow-sm transition-all duration-300">
                          <Building className="w-12 h-12" />
                        </div>
                        <div className="text-center space-y-3">
                          <h3 className="text-2xl sm:text-3xl font-bold text-foreground dark:text-white">Business Use</h3>
                          <p className="text-sm sm:text-base text-muted-foreground dark:text-white/70 max-w-xs mx-auto">Apply for commercial auto leasing or financing.</p>
                        </div>
                      </button>
                    </div>
                  ) : null}

                  <div className={cn("space-y-6", !applicationType ? "block md:hidden" : "block")}>
                    {applicationType && (
                      <div className="hidden md:flex justify-start">
                        <button 
                          onClick={() => setApplicationType(null)} 
                          className="text-sm font-medium text-muted-foreground hover:text-foreground flex items-center gap-2 transition-colors px-4 py-2.5 rounded-lg hover:bg-muted/50 dark:hover:bg-white/5 border border-transparent hover:border-border dark:hover:border-white/10"
                        >
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                          </svg>
                          Back to application mode
                        </button>
                      </div>
                    )}
                    
                    <div id="credit-application-card" className="glass-card-theme form-card-theme p-6 sm:p-8 md:p-10 xl:p-12 rounded-xl scroll-mt-24">
                      {(applicationType === 'personal' || applicationType === null) ? (
                        <CreditApplicationForm applicationType={applicationType} setApplicationType={setApplicationType} />
                      ) : (
                        <BusinessCreditApplicationForm applicationType={applicationType} setApplicationType={setApplicationType} />
                      )}
                    </div>
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
