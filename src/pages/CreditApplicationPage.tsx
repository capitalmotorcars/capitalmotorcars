import { Layout } from '@/components/layout/Layout';
import { SEO } from '@/components/SEO';
import { JsonLd } from '@/components/JsonLd';
import { CreditApplicationForm } from '@/components/forms/CreditApplicationForm';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { cn } from '@/lib/utils';
import { Shield, FileText, Clock, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
import bg1 from '@/assets/contact.jpg';

export default function CreditApplicationPage() {
  const { ref, isRevealed } = useScrollReveal();

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
        title="Online Credit Application | Secure Auto Financing | Capital Motor Cars"
        description="Apply for auto financing and leasing credit online. Our secure 5 Step Application Process helps you get quick answers about your car financing options."
        seoKeywords={['car credit application', 'auto financing NJ', 'lease credit application', 'Capital Motor Cars finance']}
        ogImage="/src/assets/contact.jpg"
        canonicalPath="/credit-application"
      />
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": "Online Credit Application",
        "description": "Secure online application for automotive leasing and financing credit.",
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
            <div className="relative z-50 mx-auto h-[30vh] md:h-[45vh] px-4 lg:px-8 flex flex-col items-center justify-center text-center">
              <motion.h2
                {...fadeInUp}
                transition={{ ...fadeInUp.transition, delay: 0.1 }}
                className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white pb-2 md:pb-4 xl:pb-6"
              >
                Secure 5 Step Auto Financing &amp; Leasing Application
              </motion.h2>
              <motion.p
                {...fadeInUp}
                transition={{ ...fadeInUp.transition, delay: 0.2 }}
                className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-white/80 max-w-3xl xl:max-w-5xl mx-auto pb-4 md:pb-6 xl:pb-8"
              >
                Start your financing journey with a quick preliminary application. Get clear answers about your options.
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
                  <div id="credit-application-card" className="glass-card-theme form-card-theme p-6 sm:p-8 md:p-10 xl:p-12 rounded-xl scroll-mt-24">
                    <CreditApplicationForm />
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
