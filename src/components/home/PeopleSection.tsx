import * as React from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { motion } from 'motion/react';
import { X, ArrowRight, UserCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { cn } from '@/lib/utils';

import founderImage from '@/assets/team-chris.jpg';
import henryImage from '@/assets/team-henry.jpg';
import markImage from '@/assets/team-mark.jpg';
import mikeZImage from '@/assets/team-mike-z.jpg';
import vickyImage from '@/assets/team-vicky.jpg';
import michaelMImage from '@/assets/team-michael-m.jpg';
import derekImage from '@/assets/team-derek.jpg';
import rickyImage from '@/assets/team-ricky.jpg';
import bobbyImage from '@/assets/team-bobby-kaufman.jpg';
import sarahImage from '@/assets/team-sarah-flynn.jpg';
import michaelVImage from '@/assets/team-michael-van-houten.jpg';
import jeffreyHImage from '@/assets/team-jeffrey-horn.jpg';
import danielLImage from '@/assets/team-daniel-lehrer.jpg';
import markinDImage from '@/assets/team-markin-cruz.jpg';
import elyseBImage from '@/assets/team-elyse-barrett.jpg';
import logoImage from '@/assets/logo.png';

type Person = {
  name: string;
  role: string;
  image: string;
  bio: string;
  email?: string;
};

const founder: Person = {
  name: 'Christopher Amico',
  role: 'President & CEO',
  email: 'camico@capitalmotorcars.com',
  image: founderImage,
  bio: "As CEO of Capital Motor Cars, I take great pride in providing the ultimate automotive concierge experience to our clients, through building long and trusting relationships. Excellence is not an option but an obligation I strive to instill in each and every team member throughout the Capital Motor Cars organization. Coming from the corporate environment of Mercedes-Benz and consulting for BMW North America, I've mastered the art of the automotive industry. I look forward to implementing ongoing improvements to better the car leasing experience.",
};

const team: Person[] = [
  // Leadership & operations
  { name: 'Henry Liu', role: 'Vice President', image: henryImage, bio: "Henry is a seasoned professional in the automotive leasing industry, known for his strategic leadership and commitment to operational excellence. As Vice President, he plays a key role in driving the company's growth and ensuring that the team delivers top-tier service to all clients.", email: 'henry@capitalmotorcars.com' },
  { name: 'Mark Onbashian', role: 'Vice President', image: markImage, bio: "With years of experience in management and sales, Mark oversees large-scale operations and partnership development. His focus is on maintaining high standards of customer satisfaction and expanding the company's reach within the luxury vehicle market.", email: 'mark@capitalmotorcars.com' },
  { name: 'Michael Dai', role: 'Social Media Manager', image: logoImage, bio: "Michael Dai leads our content and social media efforts, shaping how our brand shows up across digital platforms. In his role as Content Creator and Social Media Manager, he blends creative storytelling with thoughtful strategy to develop campaigns that genuinely resonate with our audience. With a strong eye for visuals and messaging, Michael elevates our online presence, driving engagement and fostering a connected, growing community." },
  { name: 'Michael Zeitoune', role: 'Director of Finance', image: mikeZImage, bio: "Michael manages the financial health and lending relationships of the company. He works closely with various banking institutions to secure the most favorable leasing rates and financial structures for clients, ensuring a smooth and transparent transaction process.", email: 'mzeitoune@capitalmotorcars.com' },
  { name: 'Michael Minerva', role: 'General Manager', image: michaelMImage, bio: "Michael specializes in high-end automotive sales and leasing. He is known for his deep product knowledge and his ability to build long-term relationships with clients through trust, expertise, and a commitment to finding the best deals available.", email: 'mike.minerva@capitalmotorcars.com' },
  { name: 'Vicky Azrak', role: 'Sales Manager', image: vickyImage, bio: "Vicky is dedicated to providing a personalized and seamless car-buying experience. As a Sales Manager, she leads her team with a customer-first approach, helping clients navigate their options to find the perfect vehicle that fits their lifestyle and budget.", email: 'vicky@capitalmotorcars.com' },
  { name: 'Bobby Kaufman', role: 'Automotive Consultant', image: bobbyImage, bio: "Bobby brings more than 30 years of experience from his time at BMW, where he built a reputation for deep product knowledge, exceptional customer care, and a straightforward, honest approach. His decades working with a premier luxury brand shaped his commitment to delivering a premium, stress free experience for every client he meets.\n\nNow partnered with Capital Motor Cars, Bobby extends that same level of service across all makes and models, offering unbiased guidance, personalized recommendations, and full concierge support. Whether you're exploring luxury, sport, or everyday vehicles, Bobby ensures a smooth, transparent process from start to finish.", email: 'bobby@capitalmotorcars.com' },
  // Sales & consultants
  { name: 'Ricky Wong', role: 'Automotive Consultant', image: rickyImage, bio: "With a decade of experience in sales, my goal is to guide clients through the car shopping journey with a high level of service and care.", email: 'ricky@capitalmotorcars.com' },
  { name: 'Derek Anton', role: 'Business Development Director', image: derekImage, bio: "With more than a decade at BMW NA and a lifelong love for cars, I'm driven to inspire my team to consistently provide an exceptional customer experience.", email: 'derek@capitalmotorcars.com' },
  { name: 'Rafael Frias', role: 'Automotive Consultant', image: logoImage, bio: "Rafael Frias is a seasoned automotive consultant with extensive experience working with top brands such as Chrysler, Dodge, Jeep, and Ram. Known for his strong industry knowledge and client-first approach, Rafael helps customers navigate the car-buying process with confidence. His deep product expertise and personalized guidance make him a reliable and trusted partner in finding the right vehicle.", email: 'rafael@capitalmotorcars.com' },
  { name: 'Sarah Flynn', role: 'Automotive Consultant', image: sarahImage, bio: "As an automotive consultant, I've built my reputation on delivering more than just vehicles. I offer clarity, confidence, and a white-glove experience for clients who value their time and want to avoid the typical dealership runaround. I entered the industry early, driven and ambitious, and grew my business through results and referrals. I've worked with clients ranging from first-time lessees to C-suite executives, always operating with transparency and a strong work ethic. Now pursuing my MBA at Rutgers, I'm focused on scaling more strategically, strengthening my financial expertise, and helping elevate the standard of the industry.", email: 'sarah@capitalmotorcars.com' },
  { name: 'Michael Van Houten', role: 'Automotive Consultant', image: michaelVImage, bio: "Driven by dedication and determination, I'm committed to delivering an elevated level of service to every client. With over 12 years of experience in the automotive industry, I handle the process from start to finish, ensuring nothing is overlooked. Outside of work, I'm a proud father of three daughters, a little league coach, and an avid weekend fisherman. Those same values of commitment and reliability guide my role as a trusted member of the Capitol Motor Cars team.", email: 'mvanhouten@capitalmotorcars.com' },
  { name: 'Jeffrey Horn', role: 'Automotive Consultant', image: jeffreyHImage, bio: "With over 10 years of experience in the industry, I focus on building lasting relationships that keep my clients smiling, especially knowing I'll be seeing them again every few years.", email: 'jeffrey@capitalmotorcars.com' },
  { name: 'Daniel Jay Lehrer', role: 'Automotive Consultant', image: danielLImage, bio: "My philosophy is simple: lead with passion and honesty, and deliver a first-class level of service that builds lasting relationships with my clients.", email: 'dlehrer@capitalmotorcars.com' },
  { name: 'Markin De La Cruz', role: 'Automotive Consultant', image: markinDImage, bio: "I pride myself on making sure that each team member is an extension of myself. I truly believe that awesome relationships with customers lead to excellent service.", email: 'mark@capitalmotorcars.com' },
  // Delivery & admin
  { name: 'Jeffrey', role: 'Delivery Specialist', image: logoImage, bio: "Jeffrey is an experienced Delivery Specialist dedicated to delivering a seamless and professional vehicle handoff. Known for his attention to detail and commitment to customer satisfaction, he ensures every delivery is handled with care and precision. Jeffrey's focus on excellence helps leave customers with a positive, lasting impression as they take the wheel of their new vehicle.", email: 'info@capitalmotorcars.com' },
  { name: 'David Silver', role: 'Delivery Specialist', image: logoImage, bio: "David Silver is our Delivery Specialist, committed to providing a smooth and enjoyable vehicle delivery experience. With a strong focus on efficiency and attention to detail, he oversees every step of the process, from preparation through final handoff. David's dedication to high-quality service ensures that customers drive away feeling confident and fully satisfied.", email: 'info@capitalmotorcars.com' },
  { name: 'Noah Sagiv', role: 'Delivery Specialist', image: logoImage, bio: "Cars have always been my passion, with a particular love for driving vintage models.", email: 'info@capitalmotorcars.com' },
  { name: 'Elyse Barrett', role: 'Administrative Assistant', image: elyseBImage, bio: "I'm dedicated to delivering the highest level of customer service to every client we serve in the South Jersey community.", email: 'elyse@capitalmotorcars.com' },
  { name: 'James', role: 'Logistics Manager', image: logoImage, bio: "I love the smell of that new car scent. From pickup to delivery, I come straight to you smelling good.", email: 'james@capitalmotorcars.com' },
];

const baseCardClass = cn(
  'rounded-2xl border bg-card overflow-hidden',
  'border-border dark:border-white/20 dark:bg-white/[0.03] dark:border-white/5 dark:shadow-black/30',
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
);
const cardClass = cn(
  baseCardClass,
  'hover:border-accent hover:shadow-[0_0_30px_hsl(214_77%_50%_/_0.4)] hover:shadow-accent/30',
  'hover:bg-accent/5 dark:hover:bg-accent/10',
);
const dialogPanelClass = cn(
  baseCardClass,
  'dark:bg-[#121212] dark:border-white/5 dark:shadow-black/30',
);
const cardTransition = { type: 'spring' as const, stiffness: 500, damping: 32 };
const hoverTransition = { type: 'tween' as const, duration: 0.12 };
const dialogFadeTransition = { type: 'tween' as const, duration: 0.4, ease: 'easeOut' as const };

const TEAM_PAGE_SIZE = 6;

// Team members to show on home page (based on image)
const HOME_PAGE_TEAM_NAMES = [
  'Henry Liu',
  'Mark Onbashian',
  'Michael Zeitoune',
  'Vicky Azrak',
  'Michael Minerva',
  'Bobby Kaufman',
];

interface PeopleSectionProps {
  /** If true, only shows specific team members for home page */
  homePageOnly?: boolean;
  /** Custom padding classes for the section */
  padding?: string;
}

export function PeopleSection({ homePageOnly = false, padding }: PeopleSectionProps = {}) {
  const { ref, isRevealed } = useScrollReveal();
  const [founderOpen, setFounderOpen] = React.useState(false);
  const [teamPerson, setTeamPerson] = React.useState<Person | null>(null);
  const [teamPage, setTeamPage] = React.useState(0);

  // Filter team members if homePageOnly is true
  const sortedTeam = [...team].sort((a, b) => {
    const aHasLogo = a.image === logoImage;
    const bHasLogo = b.image === logoImage;

    // If a has a logo and b doesn't, move a down (return 1)
    // If a doesn't and b does, move a up (return -1)
    return aHasLogo === bHasLogo ? 0 : aHasLogo ? 1 : -1;
  });

  // Now use sortedTeam for your filtering and pagination
  const filteredTeam = homePageOnly
    ? sortedTeam.filter(person => HOME_PAGE_TEAM_NAMES.includes(person.name))
    : sortedTeam;

  const maxTeamPage = Math.max(0, Math.ceil(filteredTeam.length / TEAM_PAGE_SIZE) - 1);
  const visibleTeam = filteredTeam.slice(teamPage * TEAM_PAGE_SIZE, teamPage * TEAM_PAGE_SIZE + TEAM_PAGE_SIZE);
  return (
    <section aria-label="Team" className={cn("relative", padding)}>
      <div ref={ref} className=" relative  mx-auto max-w-6xl">
        <div className="max-w-2xl mx-auto text-center mb-12">
          <SectionHeading
            title="Your Car Leasing Journey, Backed by a Dedicated Team"
            subtitle="A small team with one goal: make the process clear, fast, and stress free."
          />
        </div>


        {/* <div className="how-it-works-card p-6"> */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(100%,500px)] h-[320px] rounded-full bg-accent/[0.04] dark:bg-accent/[0.06] blur-[80px] pointer-events-none"
          aria-hidden
        />
        {/* Founder — centered on top */}
        <div className="flex justify-center mb-6">
          <Dialog.Root open={founderOpen} onOpenChange={setFounderOpen}>
            <Dialog.Trigger asChild>
              <motion.button
                type="button"
                className={cn(cardClass, 'group flex flex-col items-center p-4 text-center w-full max-w-[315px]')}
                aria-label="A note from our founder"
                initial={{ opacity: 0, y: 20 }}
                animate={isRevealed ? { opacity: 1, y: 0, transition: { ...cardTransition, delay: 0.30 } } : { opacity: 0, y: 20 }}
                transition={hoverTransition}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <img src={founder.image} alt="" className="h-20 w-20 md:h-24 md:w-24 rounded-full object-cover ring-2 ring-border shadow-md transition-all duration-300 group-hover:ring-accent/50" />
                <p className="mt-3 text-xs md:text-sm font-medium text-muted-foreground uppercase tracking-wider transition-all duration-300 group-hover:text-foreground/80">Founder</p>
                <h3 className="mt-1 text-base md:text-lg font-semibold text-foreground transition-all duration-300 group-hover:font-bold group-hover:text-accent">{founder.name}</h3>
                <p className="mt-0.5 text-sm md:text-base text-muted-foreground transition-all duration-300 group-hover:text-foreground/90">{founder.role}</p>
                <span className="mt-1.5 inline-flex items-center gap-1.5 text-sm md:text-base font-medium text-accent transition-all duration-300 group-hover:font-bold group-hover:drop-shadow-[0_0_8px_hsl(214_77%_50%_/_0.5)]">
                  <ArrowRight className="h-4 w-4 md:h-5 md:w-5 shrink-0 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
                  View profile
                </span>
              </motion.button>
            </Dialog.Trigger>
            <Dialog.Portal>
              <Dialog.Overlay asChild>
                <motion.div
                  className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={dialogFadeTransition}
                />
              </Dialog.Overlay>
              <Dialog.Content asChild>
                <motion.div
                  className="fixed inset-0 z-50 flex items-center justify-center p-4"
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={dialogFadeTransition}
                  onClick={(e) => e.target === e.currentTarget && setFounderOpen(false)}
                >
                  <div className={cn(dialogPanelClass, 'w-full max-w-lg p-6 md:p-8')}>
                    <div className="flex items-start gap-4">
                      <img src={founder.image} alt="" className="h-20 w-20 md:h-24 md:w-24 shrink-0 rounded-full object-cover ring-2 ring-border" />
                      <div className="min-w-0 flex-1">
                        <p className="text-xs md:text-sm font-medium text-muted-foreground uppercase tracking-wider">A Note from Our Founder</p>
                        <h3 className="text-xl md:text-2xl font-semibold text-foreground">{founder.name}</h3>
                        <p className="text-sm md:text-base text-muted-foreground">{founder.role}</p>
                      </div>
                      <Dialog.Close asChild>
                        <button type="button" className="shrink-0 rounded-lg p-2 text-muted-foreground hover:bg-muted hover:text-foreground" aria-label="Close">
                          <X className="h-5 w-5" />
                        </button>
                      </Dialog.Close>
                    </div>
                    <p className="mt-4 text-muted-foreground leading-relaxed whitespace-pre-line">{founder.bio}</p>
                    {founder.email && (
                      <a href={`mailto:${founder.email}`} className="mt-4 inline-block text-sm font-medium text-accent hover:underline">{founder.email}</a>
                    )}
                  </div>
                </motion.div>
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>
        </div>

        {/* Team carousel — arrows cycle team only; founder stays fixed above */}
        {maxTeamPage > 0 && (
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setTeamPage((p) => Math.max(0, p - 1))}
              disabled={teamPage === 0}
              aria-label="Previous team members"
              className={cn(
                'shrink-0 rounded-full p-2 border border-border dark:border-white/20 bg-card dark:bg-black text-foreground hover:bg-muted dark:hover:bg-white/10 disabled:opacity-40 disabled:pointer-events-none transition-colors',
              )}
            >
              <ChevronLeft className="h-5 w-5 md:h-6 md:w-6" />
            </button>
            <div className="flex-1 min-w-0">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-6">
                {visibleTeam.map((person, i) => (
                  <Dialog.Root key={person.name} open={teamPerson?.name === person.name} onOpenChange={(open) => setTeamPerson(open ? person : null)}>
                    <Dialog.Trigger asChild>
                      <motion.button
                        type="button"
                        className={cn(cardClass, 'group flex flex-col items-center p-4 md:p-5 text-center')}
                        aria-label={`View ${person.name}`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={isRevealed ? { opacity: 1, y: 0, transition: { ...cardTransition, delay: 0.30 + i * 0.06 } } : { opacity: 0, y: 20 }}
                        transition={hoverTransition}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        {person.image ? (
                          <img src={person.image} alt="" className="h-20 w-20 md:h-24 md:w-24 rounded-full object-cover ring-2 ring-border shadow-md transition-all duration-300 group-hover:ring-accent/50" />
                        ) : (
                          <div className="flex h-20 w-20 md:h-24 md:w-24 shrink-0 items-center justify-center rounded-full bg-muted ring-2 ring-border shadow-md text-muted-foreground transition-all duration-300 group-hover:ring-accent/50">
                            <UserCircle className="h-10 w-10 md:h-12 md:w-12" aria-hidden />
                          </div>
                        )}
                        <h3 className="mt-3 text-base md:text-lg font-semibold text-foreground truncate w-full transition-all duration-300 group-hover:font-bold group-hover:text-accent">{person.name}</h3>
                        <p className="mt-0.5 text-sm md:text-base text-muted-foreground line-clamp-2 transition-all duration-300 group-hover:text-foreground/90">{person.role}</p>
                        <span className="mt-1.5 inline-flex items-center gap-1.5 text-sm md:text-base font-medium text-accent transition-all duration-300 group-hover:font-bold group-hover:drop-shadow-[0_0_8px_hsl(214_77%_50%_/_0.5)]">
                          <ArrowRight className="h-4 w-4 md:h-5 md:w-5 shrink-0 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
                          View profile
                        </span>
                      </motion.button>
                    </Dialog.Trigger>
                    <Dialog.Portal>
                      <Dialog.Overlay asChild>
                        <motion.div
                          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={dialogFadeTransition}
                        />
                      </Dialog.Overlay>
                      <Dialog.Content asChild>
                        <motion.div
                          className="fixed inset-0 z-50 flex items-center justify-center p-4"
                          initial={{ opacity: 0, y: 24 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={dialogFadeTransition}
                          onClick={(e) => e.target === e.currentTarget && setTeamPerson(null)}
                        >
                          <div className={cn(dialogPanelClass, 'w-full max-w-lg p-6 md:p-8')}>
                            <div className="flex items-start gap-4">
                              {person.image ? (
                                <img src={person.image} alt="" className="h-20 w-20 md:h-24 md:w-24 shrink-0 rounded-full object-cover ring-2 ring-border" />
                              ) : (
                                <div className="flex h-20 w-20 md:h-24 md:w-24 shrink-0 items-center justify-center rounded-full bg-muted ring-2 ring-border text-muted-foreground">
                                  <UserCircle className="h-10 w-10 md:h-12 md:w-12" aria-hidden />
                                </div>
                              )}
                              <div className="min-w-0 flex-1">
                                <h3 className="text-xl md:text-2xl font-semibold text-foreground">{person.name}</h3>
                                <p className="text-sm md:text-base text-muted-foreground">{person.role}</p>
                              </div>
                              <Dialog.Close asChild>
                                <button type="button" className="shrink-0 rounded-lg p-2 text-muted-foreground hover:bg-muted hover:text-foreground" aria-label="Close">
                                  <X className="h-5 w-5" />
                                </button>
                              </Dialog.Close>
                            </div>
                            <p className="mt-4 text-muted-foreground leading-relaxed whitespace-pre-line">{person.bio}</p>
                            {person.email && (
                              <a href={`mailto:${person.email}`} className="mt-4 inline-block text-sm font-medium text-accent hover:underline">{person.email}</a>
                            )}
                          </div>
                        </motion.div>
                      </Dialog.Content>
                    </Dialog.Portal>
                  </Dialog.Root>
                ))}
              </div>
            </div>
            <button
              type="button"
              onClick={() => setTeamPage((p) => Math.min(maxTeamPage, p + 1))}
              disabled={teamPage >= maxTeamPage}
              aria-label="Next team members"
              className={cn(
                'shrink-0 rounded-full p-2 border border-border dark:border-white/20 bg-card dark:bg-white/5 text-foreground hover:bg-muted dark:hover:bg-white/10 disabled:opacity-40 disabled:pointer-events-none transition-colors',
              )}
            >
              <ChevronRight className="h-5 w-5 md:h-6 md:w-6" />
            </button>
          </div>
        )}
        {maxTeamPage === 0 && (
          <div className="flex-1 min-w-0">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-6">
              {visibleTeam.map((person, i) => (
                <Dialog.Root key={person.name} open={teamPerson?.name === person.name} onOpenChange={(open) => setTeamPerson(open ? person : null)}>
                  <Dialog.Trigger asChild>
                    <motion.button
                      type="button"
                      className={cn(cardClass, 'group flex flex-col items-center p-4 md:p-5 text-center')}
                      aria-label={`View ${person.name}`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={isRevealed ? { opacity: 1, y: 0, transition: { ...cardTransition, delay: 0.30 + i * 0.06 } } : { opacity: 0, y: 20 }}
                      transition={hoverTransition}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {person.image ? (
                        <img src={person.image} alt="" className="h-20 w-20 md:h-24 md:w-24 rounded-full object-cover ring-2 ring-border shadow-md transition-all duration-300 group-hover:ring-accent/50" />
                      ) : (
                        <div className="flex h-20 w-20 md:h-24 md:w-24 shrink-0 items-center justify-center rounded-full bg-muted ring-2 ring-border shadow-md text-muted-foreground transition-all duration-300 group-hover:ring-accent/50">
                          <UserCircle className="h-10 w-10 md:h-12 md:w-12" aria-hidden />
                        </div>
                      )}
                      <h3 className="mt-3 text-base md:text-lg font-semibold text-foreground truncate w-full transition-all duration-300 group-hover:font-bold group-hover:text-accent">{person.name}</h3>
                      <p className="mt-0.5 text-sm md:text-base text-muted-foreground line-clamp-2 transition-all duration-300 group-hover:text-foreground/90">{person.role}</p>
                      <span className="mt-1.5 inline-flex items-center gap-1.5 text-sm md:text-base font-medium text-accent transition-all duration-300 group-hover:font-bold group-hover:drop-shadow-[0_0_8px_hsl(214_77%_50%_/_0.5)]">
                        <ArrowRight className="h-4 w-4 md:h-5 md:w-5 shrink-0 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
                        View profile
                      </span>
                    </motion.button>
                  </Dialog.Trigger>
                  <Dialog.Portal>
                    <Dialog.Overlay asChild>
                      <motion.div
                        className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={dialogFadeTransition}
                      />
                    </Dialog.Overlay>
                    <Dialog.Content asChild>
                      <motion.div
                        className="fixed inset-0 z-50 flex items-center justify-center p-4"
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={dialogFadeTransition}
                        onClick={(e) => e.target === e.currentTarget && setTeamPerson(null)}
                      >
                        <div className={cn(dialogPanelClass, 'w-full max-w-lg p-6 md:p-8')}>
                          <div className="flex items-start gap-4">
                            {person.image ? (
                              <img src={person.image} alt="" className="h-20 w-20 md:h-24 md:w-24 shrink-0 rounded-full object-cover ring-2 ring-border" />
                            ) : (
                              <div className="flex h-20 w-20 md:h-24 md:w-24 shrink-0 items-center justify-center rounded-full bg-muted ring-2 ring-border text-muted-foreground">
                                <UserCircle className="h-10 w-10 md:h-12 md:w-12" aria-hidden />
                              </div>
                            )}
                            <div className="min-w-0 flex-1">
                              <h3 className="text-xl md:text-2xl font-semibold text-foreground">{person.name}</h3>
                              <p className="text-sm md:text-base text-muted-foreground">{person.role}</p>
                            </div>
                            <Dialog.Close asChild>
                              <button type="button" className="shrink-0 rounded-lg p-2 text-muted-foreground hover:bg-muted hover:text-foreground" aria-label="Close">
                                <X className="h-5 w-5" />
                              </button>
                            </Dialog.Close>
                          </div>
                          <p className="mt-4 text-muted-foreground leading-relaxed whitespace-pre-line">{person.bio}</p>
                          {person.email && (
                            <a href={`mailto:${person.email}`} className="mt-4 inline-block text-sm font-medium text-accent hover:underline">{person.email}</a>
                          )}
                        </div>
                      </motion.div>
                    </Dialog.Content>
                  </Dialog.Portal>
                </Dialog.Root>
              ))}
            </div>
          </div>
        )}
        {maxTeamPage > 0 && (
          <p className="mt-3 text-center text-xs text-muted-foreground">
            {teamPage + 1} of {maxTeamPage + 1}
          </p>
        )}
        {/* </div> */}
      </div>
    </section>
  );
}
