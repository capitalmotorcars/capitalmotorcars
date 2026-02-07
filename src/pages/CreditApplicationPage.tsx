import { Layout } from '@/components/layout/Layout';
import { SEO } from '@/components/SEO';
import { CreditApplicationForm } from '@/components/forms/CreditApplicationForm';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { cn } from '@/lib/utils';
import { Shield, FileText, Clock, CheckCircle2 } from 'lucide-react';
import bg1 from '@/assets/contact.jpg';

export default function CreditApplicationPage() {
  const { ref, isRevealed } = useScrollReveal();

  const benefits = [
    { icon: Shield, text: 'Secure & Encrypted' },
    { icon: Clock, text: 'Quick 5-Step Process' },
    { icon: FileText, text: 'No Credit Check Required' },
    { icon: CheckCircle2, text: 'Fast Response Time' },
  ];

  return (
    <Layout>
      <SEO 
        title="Credit Application | Capital Motor Cars"
        description="Start your financing journey with a quick credit application. Get clear answers about your options without unnecessary paperwork."
      />
      
      <section className="pt-16 lg:pt-20">
        <div id="credit-application" className="relative h-full flex flex-col">
          {/* Top half: Blurred background */}
          <div className="absolute top-0 left-0 right-0 h-[30vh] md:h-[45vh] overflow-hidden">
            <img
              src={bg1}
              alt=""
              className="w-full h-full object-cover object-center blur-[1.5px] transition-opacity duration-1000"
              aria-hidden
            />
          </div>
          {/* Dark overlay on top half for text readability */}
          <div
            className="absolute top-0 left-0 right-0 h-[30vh] md:h-[45vh] bg-gradient-to-b from-black/40 via-black/20 to-transparent transition-opacity duration-1000"
            aria-hidden
          />
          {/* Bottom half: White background */}
          <div
            className="absolute top-[30vh] md:top-[45vh] left-0 right-0 bottom-0 bg-white dark:bg-background"
            aria-hidden
          />

          {/* Content */}
          <div ref={ref} className={cn('relative z-10 flex-1 flex flex-col', 'scroll-reveal', isRevealed && 'revealed')}>
            {/* Title Section */}
            <div className="relative z-50 mx-auto h-[30vh] md:h-[45vh] px-4 lg:px-8 flex flex-col items-center justify-center">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white text-center pb-2 md:pb-4 xl:pb-6">
                Credit Application
              </h2>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-white dark:text-white text-center max-w-3xl xl:max-w-5xl mx-auto pb-4 md:pb-6 xl:pb-8">
                Start your financing journey with a quick preliminary application. Get clear answers about your options.
              </p>

              {/* Benefits */}
              <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 md:gap-8">
                {benefits.map((benefit, index) => {
                  const Icon = benefit.icon;
                  return (
                    <div key={index} className="flex items-center gap-2 text-white/90">
                      <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                      <span className="text-xs sm:text-sm md:text-base">{benefit.text}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Form Section */}
            <div className="relative bg-white dark:bg-black h-full py-12 md:py-16 z-10">
              <div className="mx-auto px-4 lg:px-8 xl:px-12">
                <div className="max-w-5xl mx-auto">
                  <div className="glass-card-theme form-card-theme p-6 sm:p-8 md:p-10 xl:p-12 rounded-xl">
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
