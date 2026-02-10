import { Layout } from '@/components/layout/Layout';
import { SEO } from '@/components/SEO';
import { JsonLd, organizationSchema } from '@/components/JsonLd';
import { aboutPageLinks } from '@/components/ui/RelatedLinks';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';
import { UserCheck, MessageSquare, Settings, MapPin, ArrowRight, FileText, Building2, Phone } from 'lucide-react';
import { PeopleSection } from '@/components/home/PeopleSection';
import { motion } from 'framer-motion';
import bg1 from '@/assets/brand-backgrounds/bg-1.jpeg';
import aboutImage from '@/assets/logo.png';
const approachItems = [
  {
    icon: UserCheck,
    title: 'Defined responsibility',
    description: 'Each engagement is managed with clear ownership and accountability from start to finish.',
  },
  {
    icon: MessageSquare,
    title: 'Clear communication',
    description: 'Options, timelines, and next steps are explained upfront, without pressure or unnecessary complexity.',
  },
  {
    icon: Settings,
    title: 'Practical execution',
    description: 'We coordinate directly with dealerships, lenders, and service partners to ensure the process moves smoothly and efficiently.',
  },
];

const locations = [
  {
    name: 'Corporate Office',
    city: 'Springfield, NJ',
    address: '251 Morris Avenue, Springfield Township, NJ 07081',
    phone: '201-509-5555',
  },
  {
    name: 'The View',
    city: 'Marlton, NJ',
    address: '105 Merchant Way Marlton, NJ 08053',
    phone: '856-553-5555',
  },
  {
    name: 'Pier 115',
    city: 'Edgewater, NJ',
    address: '115 River Road, Suite 158, Edgewater, NJ 07020',
    phone: '917-495-5727',
  },
];

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
} as const;

export default function AboutPage() {
  const { ref: headerRef, isRevealed: headerRevealed } = useScrollReveal();
  const { ref: introRef, isRevealed: introRevealed } = useScrollReveal();
  const { ref: approachRef, isRevealed: approachRevealed } = useScrollReveal();
  const { ref: supportRef, isRevealed: supportRevealed } = useScrollReveal();
  const { ref: locationsRef, isRevealed: locationsRevealed } = useScrollReveal();

  return (
    <Layout>
      <SEO
        title="About Us | Capital Motor Cars | Our Story & Mission"
        description="Learn more about Capital Motor Cars. We bring clarity and structure to the car leasing and financing process with transparency and accountability."
        seoKeywords={['Capital Motor Cars about', 'car leasing company NJ', 'automotive experts', 'transparent car leasing']}
        ogImage="/src/assets/hero-bg.jpg"
        canonicalPath="/about"
      />
      <JsonLd data={organizationSchema} />

      <section className="pt-16 lg:pt-20 ">
        <div id="about" className="relative h-full flex flex-col">
          {/* Top half: Blurred background */}
          <div className="absolute top-0 left-0 right-0 h-[30vh] md:h-[45vh] overflow-hidden">
            <motion.img
              initial={{ scale: 1.1, opacity: 0 }}
              animate={{ scale: 1.05, opacity: 1 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              src={bg1}
              alt=""
              className="w-full h-full object-cover object-center blur-sm"
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
          <div ref={headerRef} className={cn('relative  z-10 flex-1 flex flex-col dark:bg-white/[0.02]', 'scroll-reveal', headerRevealed && 'revealed')}>
            {/* Title Section */}
            <div className="relative z-50 mx-auto h-[30vh] md:h-[45vh] px-4 lg:px-8 flex flex-col items-center justify-center">
              <motion.img
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                src={aboutImage}
                alt="About Capital Motor Cars"
                className="w-16 h-16 md:w-28 md:h-28 object-cover object-center "
              />
              <motion.h2
                {...fadeInUp}
                transition={{ ...fadeInUp.transition, delay: 0.2 }}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white text-center pb-2 md:pb-4 xl:pb-6"
              >
                About Capital Motor Cars
              </motion.h2>
              <motion.p
                {...fadeInUp}
                transition={{ ...fadeInUp.transition, delay: 0.3 }}
                className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-white/80 text-center max-w-3xl xl:max-w-5xl mx-auto pb-4 md:pb-6 xl:pb-8"
              >
                Clarity and structure for an automotive process that is often complex and time-consuming.
              </motion.p>
            </div>

            {/* Introduction */}
            <div className="relative  h-full pt-12 md:pt-16 xl:pt-20 z-10">
              <div className="mx-auto px-4 lg:px-8 xl:px-12">
                <div className="max-w-7xl xl:max-w-[90rem] mx-auto">
                  <div
                    ref={introRef}
                    className={cn('scroll-reveal', introRevealed && 'revealed', 'mb-12 md:mb-16 xl:mb-20 pb-8 md:pb-10 xl:pb-12 border-b border-border dark:border-gray-600')}
                  >
                    <div className="max-w-4xl xl:max-w-5xl">
                      <p className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl text-black dark:text-white leading-relaxed mb-6 md:mb-8">
                        Capital Motor Cars was created to bring clarity and structure to an automotive process that is often complex and time-consuming. Our focus is on guiding clients through decisions with transparency, accountability, and a clearly defined process.
                      </p>
                      <p className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl text-black dark:text-white leading-relaxed">
                        We work with individuals and businesses who value straightforward communication and long-term thinking. Every engagement is handled with attention to detail, realistic expectations, and consistent follow-through.
                      </p>
                    </div>
                  </div>

                  {/* Our Approach */}
                  <div
                    ref={approachRef}
                    className={cn('scroll-reveal', approachRevealed && 'revealed', 'mb-12 md:mb-16 xl:mb-20 pb-8 md:pb-10 xl:pb-12 border-b border-border dark:border-gray-600')}
                  >
                    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl  font-semibold text-foreground mb-8 md:mb-10 xl:mb-12">Our Approach</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 md:gap-10 xl:gap-12">
                      {approachItems.map((item) => {
                        const Icon = item.icon;
                        return (
                          <div key={item.title} className="group flex flex-col items-center gap-4 sm:gap-5 md:gap-6 p-6 sm:p-8 md:p-10 rounded-xl border-2 border-border dark:border-white/10 bg-card dark:bg-white/[0.04] hover:border-accent hover:shadow-[0_0_30px_hsl(214_77%_50%_/_0.4)] hover:shadow-accent/30 transition-all duration-300">
                            <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-18 md:h-18 xl:w-20 xl:h-20 rounded-lg bg-accent/10 dark:bg-accent/20 group-hover:bg-accent/20 transition-colors flex items-center justify-center">
                              <Icon className="w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 xl:w-10 xl:h-10 text-accent" />
                            </div>
                            <h3 className="text-xl sm:text-2xl md:text-3xl  font-semibold text-foreground group-hover:text-accent transition-colors">{item.title}</h3>
                            <p className="text-sm sm:text-base md:text-lg xl:text-xl text-black dark:text-white leading-relaxed">{item.description}</p>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* How We Support */}
                  <div
                    ref={supportRef}
                    className={cn('scroll-reveal', supportRevealed && 'revealed', 'mb-12 md:mb-16 xl:mb-20 pb-8 md:pb-10 xl:pb-12 border-b border-border dark:border-gray-600')}
                  >
                    <div className="max-w-4xl xl:max-w-5xl">
                      <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl  font-semibold text-foreground mb-6 md:mb-8 xl:mb-10">How We Support Our Clients</h2>
                      <p className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl text-black dark:text-white leading-relaxed mb-6 md:mb-8">
                        Our role is to simplify decision-making and execution. We help clients evaluate options, manage details, and move forward with confidence, whether they are leasing, financing, or managing end-of-lease requirements.
                      </p>
                      <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-semibold text-foreground">
                        The goal is not speed at any cost, but clarity at every step.
                      </p>
                    </div>
                  </div>
                  <div
                    ref={locationsRef}
                    className={cn('scroll-reveal', locationsRevealed && 'revealed')}
                  >
                    {/* Locations */}
                    <div className="mb-12 md:mb-16 xl:mb-20 pb-8 md:pb-10 xl:pb-12 border-b border-border dark:border-gray-600">
                      <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground mb-4 md:mb-6 xl:mb-8">Locations</h2>
                      <p className="text-base sm:text-lg md:text-xl xl:text-2xl text-black dark:text-white mb-8 md:mb-10 xl:mb-12 max-w-3xl">
                        Capital Motor Cars operates across multiple locations to support clients efficiently and locally.
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 xl:gap-10">
                        {locations.map((location) => (
                          <div
                            key={location.name}
                            className="group p-6 sm:p-8 md:p-10 rounded-xl border-2 border-border dark:border-white/10 bg-card dark:bg-white/[0.04] hover:border-accent hover:shadow-[0_0_30px_hsl(214_77%_50%_/_0.4)] hover:shadow-accent/30 transition-all duration-300"
                          >
                            <div className="flex items-start gap-4 mb-4 sm:mb-5">
                              <div className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-lg flex items-center justify-center bg-accent/10 dark:bg-accent/20 group-hover:bg-accent/20 transition-colors">
                                <MapPin className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-accent" />
                              </div>
                              <div>
                                <h3 className="text-lg sm:text-xl md:text-2xl xl:text-3xl font-medium text-foreground mb-1 group-hover:text-accent transition-colors">{location.name}</h3>
                                <p className="text-sm sm:text-base md:text-lg text-black dark:text-white">{location.city}</p>
                              </div>
                            </div>
                            <a
                              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location.address)}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-sm sm:text-base md:text-lg font-medium text-black dark:text-white hover:text-accent hover:underline underline-offset-4 inline-flex items-center gap-2 group-hover:gap-3 transition-all mb-3 sm:mb-4 block"
                            >
                              <MapPin className="w-5 h-5 sm:w-6 sm:h-6 shrink-0" />
                              <span>{location.address}</span>
                            </a>
                            <a
                              href={`tel:${location.phone.replace(/\D/g, '')}`}
                              className="text-sm sm:text-base md:text-lg font-medium text-black dark:text-white hover:text-accent hover:underline underline-offset-4 inline-flex items-center gap-2 group-hover:gap-3 transition-all block"
                            >
                              <Phone className="w-5 h-5 sm:w-6 sm:h-6 shrink-0" />
                              <span>{location.phone}</span>
                            </a>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Explore More */}
                    <div>
                      <div className="text-start mb-8 md:mb-12 xl:mb-16 ">
                        <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl  font-semibold text-foreground mb-3 md:mb-4">
                          Explore More
                        </h3>
                        <p className="text-base sm:text-lg md:text-xl xl:text-2xl text-black dark:text-white">
                          Discover more about our services and how we can help you.
                        </p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 xl:gap-10 border-b border-border dark:border-gray-600 pb-8 md:pb-10 xl:pb-12">
                        {aboutPageLinks.map((link, idx) => {
                          const icons = [Building2, Phone, FileText];
                          const Icon = icons[idx] || ArrowRight;
                          return (
                            <Link
                              key={link.href}
                              to={link.href}
                              className="group flex flex-col gap-4 xl:gap-6 p-6 sm:p-8 xl:p-10 rounded-xl border-2 border-border dark:border-white/10 bg-card dark:bg-white/[0.04] hover:border-accent hover:shadow-[0_0_30px_hsl(214_77%_50%_/_0.4)] hover:shadow-accent/30 transition-all duration-300"
                            >
                              <div className="flex items-start gap-4 xl:gap-6">
                                <div className="flex-shrink-0 w-14 h-14 sm:w-16 sm:h-16 md:w-18 md:h-18 xl:w-20 xl:h-20 rounded-lg flex items-center justify-center bg-accent/10 dark:bg-accent/20 group-hover:bg-accent/20 transition-colors">
                                  <Icon className="w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 xl:w-10 xl:h-10 text-accent" />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <h4 className="mb-2 xl:mb-3 font-medium text-lg sm:text-xl md:text-2xl xl:text-3xl text-foreground group-hover:text-accent transition-colors">
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

                </div>
                <div className="py-16 lg:py-20">
                  <PeopleSection />
                </div>
              </div>
            </div>
          </div>
        </div>



      </section>



      {/* Team Section */}
    </Layout>
  );
}
