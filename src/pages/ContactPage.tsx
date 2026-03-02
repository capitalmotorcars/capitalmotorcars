import { Layout } from '@/components/layout/Layout';
import { SEO } from '@/components/SEO';
import { JsonLd, organizationSchema } from '@/components/JsonLd';
import { ContactForm } from '@/components/forms/ContactForm';
import { useSearchParams, Link } from 'react-router-dom';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { contactPageLinks } from '@/components/ui/RelatedLinks';
import { Search, ArrowRight, Phone, Mail, MapPin, FileText, Building2 } from 'lucide-react';
import { motion } from 'framer-motion';
import bg1 from '@/assets/contact.jpg';

export default function ContactPage() {
  const [searchParams] = useSearchParams();
  const { ref, isRevealed } = useScrollReveal();

  const fullName = searchParams.get('fullName') ?? undefined;
  const phone = searchParams.get('phone') ?? undefined;
  const service = searchParams.get('service') ?? undefined;
  const message = searchParams.get('message') ?? undefined;

  const currentBackground = bg1;

  const contactMethods = [
    {
      icon: Phone,
      title: 'Phone',
      description: 'Call us directly',
      value: '201-509-5555',
      href: 'tel:+12015095555',
    },
    {
      icon: Mail,
      title: 'Email',
      description: 'Send us an email',
      value: 'sales@capitalmotorcars.com',
      href: 'mailto:sales@capitalmotorcars.com',
    },
    {
      icon: MapPin,
      title: 'Location',
      description: 'Visit our office',
      value: '251 Morris Avenue, Springfield, NJ',
      href: 'https://www.google.com/maps/search/?api=1&query=251+Morris+Avenue+Springfield+NJ+07081',
    },
  ];

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
  } as const;

  return (
    <Layout>
      <SEO
        title="Contact Capital Motor Cars | Springfield NJ Office"
        description="Get in touch with Capital Motor Cars in Springfield, NJ. Ask about car leasing, financing, or vehicle repairs. Call us at 201-509-5555 or visit our office."
        seoKeywords={['contact Capital Motor Cars', 'car leasing Springfield NJ', 'auto leasing contact', 'Capital Motor Cars phone number']}
        ogImage="/src/assets/contact.jpg"
        canonicalPath="/contact"
      />
      <JsonLd data={organizationSchema} />

      <section className="pt-16 lg:pt-20">
        <div id="contact" className="relative h-full flex flex-col">
          {/* Top half: Blurred background */}
          <div className="absolute top-0 left-0 right-0 h-[30vh] md:h-[45vh] overflow-hidden">
            <motion.img
              initial={{ scale: 1.1, opacity: 0 }}
              animate={{ scale: 1.05, opacity: 1 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              src={currentBackground}
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
            className="absolute top-[15vh] md:top-[22.5vh] left-0 right-0 h-[15vh] md:h-[22.5vh] bg-gradient-to-b from-transparent via-white/20 to-white dark:to-[hsl(0,0%,4%)]"
            aria-hidden
          />

          {/* Bottom half: White background */}
          <div
            className="absolute top-[30vh] md:top-[45vh] left-0 right-0 bottom-0 bg-white dark:bg-[hsl(0,0%,4%)]"
            aria-hidden
          />

          {/* Content */}
          <div ref={ref} className={cn('relative z-10 flex-1 flex flex-col dark:bg-white/[0.02]', 'scroll-reveal', isRevealed && 'revealed')}>
            {/* Title Section */}
            <div className="relative z-50 mx-auto h-[30vh] md:h-[45vh] px-4 lg:px-8 flex flex-col items-center justify-center">
              <motion.h2
                {...fadeInUp}
                transition={{ ...fadeInUp.transition, delay: 0.1 }}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white text-center pb-2 md:pb-4 xl:pb-6"
              >
                Submit Credit Application
              </motion.h2>
              <motion.p
                {...fadeInUp}
                transition={{ ...fadeInUp.transition, delay: 0.2 }}
                className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-white dark:text-white text-center max-w-3xl xl:max-w-5xl mx-auto pb-4 md:pb-6 xl:pb-8"
              >
                If you have any questions or would like to get started, fill out the form and we will respond shortly.
              </motion.p>

              {/* Quiz Section */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="flex flex-col items-center gap-3 sm:gap-4"
              >
                <p className="text-sm sm:text-base md:text-lg xl:text-xl text-white dark:text-white text-center max-w-2xl">
                  Find your perfect vehicle match in just 5 quick questions.
                </p>
                <Button
                  asChild
                  size="lg"
                  className="w-full sm:w-auto h-11 sm:h-12 xl:h-14 rounded-lg xl:rounded-xl border border-accent/40 bg-accent/70 hover:bg-accent/90 hover:border-accent text-accent-foreground font-semibold xl:font-bold px-6 sm:px-8 xl:px-10 text-sm sm:text-base xl:text-lg glow-blue shadow-[0_2px_12px_hsl(214_77%_50%_/_0.25)] hover:shadow-[0_4px_18px_hsl(214_77%_55%_/_0.45)] backdrop-blur-sm"
                >
                  <Link to="/credit-application" className="flex items-center justify-center gap-2 xl:gap-3">
                    Start Credit Application
                    <Search className="w-4 h-4 xl:w-5 xl:h-5" />
                  </Link>
                </Button>
              </motion.div>
            </div>

            {/* Contact Form Section */}
            <div className="relative py-12 md:pt-16 xl:pt-20 z-10 overflow-hidden">
              {/* Subtle Background Glow - Matching Services & Brands */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[1000px] aspect-square pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/2 h-1/2 bg-accent/5 blur-[80px] rounded-full" />
              </div>
              <div className="mx-auto px-4 lg:px-8 xl:px-12">
                <div className="max-w-7xl xl:max-w-[90rem] mx-auto">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-10 xl:gap-12 mb-12 md:mb-16 xl:mb-20 lg:items-start">
                    {/* Contact Methods */}
                    <div className="lg:col-span-1 flex flex-col h-full">
                      <h3 className="text-xl sm:text-2xl md:text-3xl xl:text-5xl  font-semibold text-black dark:text-white mb-6 md:mb-8 xl:mb-10">
                        Get in Touch
                      </h3>
                      <div className="flex flex-col gap-4 sm:gap-6 flex-1">
                        {contactMethods.map((method) => {
                          const Icon = method.icon;
                          return (
                            <a
                              key={method.title}
                              href={method.href}
                              className="group flex items-start gap-4 p-4 sm:p-5 md:p-6 flex-1 rounded-xl border-2 border-border dark:border-white/10 bg-card dark:bg-white/[0.04] hover:border-accent hover:shadow-[0_0_40px_-10px_rgba(59,130,246,0.4)] transition-all duration-300"
                            >
                              <div className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-lg flex items-center justify-center bg-accent/10 dark:bg-accent/20 group-hover:bg-accent/20 transition-colors">
                                <Icon className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-accent" />
                              </div>
                              <div className="flex-1 min-w-0 flex flex-col justify-center">
                                <h4 className="mb-1 font-semibold text-sm sm:text-base md:text-lg xl:text-xl text-black dark:text-white group-hover:text-accent transition-colors">
                                  {method.title}
                                </h4>
                                <p className="text-xs sm:text-sm md:text-base text-black dark:text-white mb-1">
                                  {method.description}
                                </p>
                                <p className="text-sm sm:text-base md:text-lg font-medium text-black dark:text-white">
                                  {method.value}
                                </p>
                              </div>
                            </a>
                          );
                        })}
                      </div>
                    </div>

                    {/* Contact Form */}
                    <div className="lg:col-span-2 flex flex-col h-full">
                      <h3 className="text-xl sm:text-2xl md:text-3xl xl:text-5xl  font-semibold text-black dark:text-white mb-6 md:mb-8 xl:mb-10">
                        Send us a Message
                      </h3>
                      <div className="glass-card-theme form-card-theme p-6 sm:p-8 md:p-10 xl:p-12 rounded-xl flex-1">
                        <ContactForm source="contact" initialValues={{ fullName, phone, service, message }} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* More Ways to Connect */}
      <section className="py-12">
        <div className="container mx-auto px-4 lg:px-8 xl:px-12  border-t mx-auto px-4 lg:px-8 xl:px-12 max-w-7xl xl:max-w-[90rem] mx-auto">
          <div className="mt-16 md:mt-20 pb-6 sm:pb-8 md:pb-10">
            <div className="text-center mb-8 md:mb-12 xl:mb-16">
              <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl  font-semibold text-black dark:text-white ">
                More Ways to Connect
              </h3>
              <p className="text-base sm:text-lg md:text-xl xl:text-2xl text-black dark:text-white max-w-3xl mx-auto">
                Explore other ways to get started with Capital Motor Cars.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 xl:gap-10">
              {contactPageLinks.map((link, idx) => {
                const icons = [Search, FileText, Building2];
                const Icon = icons[idx] || ArrowRight;
                return (
                  <Link
                    key={link.href}
                    to={link.href}
                    className="group flex flex-col gap-4 xl:gap-6 p-6 sm:p-8 xl:p-10 rounded-xl border-2 border-border dark:border-white/10 bg-card dark:bg-white/[0.04] hover:border-accent hover:shadow-[0_0_40px_-10px_rgba(59,130,246,0.4)] transition-all duration-300"
                  >
                    <div className="flex items-start gap-4 xl:gap-6">
                      <div className="flex-shrink-0 w-14 h-14 sm:w-16 sm:h-16 md:w-18 md:h-18 xl:w-20 xl:h-20 rounded-lg flex items-center justify-center bg-accent/10 dark:bg-accent/20 group-hover:bg-accent/20 transition-colors">
                        <Icon className="w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 xl:w-10 xl:h-10 text-accent" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="mb-2 xl:mb-3 font-medium text-lg sm:text-xl md:text-2xl  text-foreground group-hover:text-accent transition-colors">
                          {link.title}
                        </h4>
                        <p className="text-sm sm:text-base xl:text-lg text-black dark:text-white">
                          {link.description}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-black dark:text-white font-semibold text-sm sm:text-base xl:text-lg group-hover:gap-3 transition-[gap]">
                      <span>Learn more</span>
                      <ArrowRight className="w-4 h-4 xl:w-5 xl:h-5 transition-transform group-hover:translate-x-1" />
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
