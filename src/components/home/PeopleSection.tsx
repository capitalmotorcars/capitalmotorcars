import * as React from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { motion } from 'motion/react';
import { X, ArrowRight, UserCircle } from 'lucide-react';
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
  image: founderImage,
  bio: "As CEO of Capital Motor Cars, I take great pride in providing the ultimate automotive concierge experience to our clients, through building long and trusting relationships. Excellence is not an option but an obligation I strive to instill in each and every team member throughout the Capital Motor Cars organization. Coming from the corporate environment of Mercedes-Benz and consulting for BMW North America, I've mastered the art of the automotive industry. I look forward to implementing ongoing improvements to better the car leasing experience.",
};

const team: Person[] = [
  { name: 'Henry Liu', role: 'Vice President', image: henryImage, bio: "Henry is a seasoned professional in the automotive leasing industry, known for his strategic leadership and commitment to operational excellence. As Vice President, he plays a key role in driving the company's growth and ensuring that the team delivers top-tier service to all clients.", email: 'henry@capitalmotorcars.com' },
  { name: 'Mark Onbashian', role: 'Vice President', image: markImage, bio: "With years of experience in management and sales, Mark oversees large-scale operations and partnership development. His focus is on maintaining high standards of customer satisfaction and expanding the company's reach within the luxury vehicle market.", email: 'mark@capitalmotorcars.com' },
  { name: 'Yehuda Cohen', role: 'Chief Operating Officer', image: '', bio: "As the Chief Operating Officer at Capital Motor Cars, I bring a wealth of experience in marketing, web design, and small business management. My entrepreneurial journey includes founding and successfully scaling two businesses: Cell Point, a chain of six retail cell phone stores in New York City, and Amerikey, a nationwide lead generation and dispatching service for locksmiths. These ventures honed my skills in building efficient systems, streamlining operations, and driving growth.\n\nAt Capital Motor Cars, I apply these capabilities to enhance logistics, improve processes, and optimize car sales, ensuring we deliver exceptional value and service to our customers.", email: 'yehuda@capitalmotorcars.com' },
  { name: 'Michael Zeitoune', role: 'Director of Finance', image: mikeZImage, bio: "Michael manages the financial health and lending relationships of the company. He works closely with various banking institutions to secure the most favorable leasing rates and financial structures for clients, ensuring a smooth and transparent transaction process.", email: 'mzeitoune@capitalmotorcars.com' },
  { name: 'Vicky Azrak', role: 'Sales Manager', image: vickyImage, bio: "Vicky is dedicated to providing a personalized and seamless car-buying experience. As a Sales Manager, she leads her team with a customer-first approach, helping clients navigate their options to find the perfect vehicle that fits their lifestyle and budget.", email: 'vicky@capitalmotorcars.com' },
  { name: 'Michael Minerva', role: 'Sales Manager', image: michaelMImage, bio: "Michael specializes in high-end automotive sales and leasing. He is known for his deep product knowledge and his ability to build long-term relationships with clients through trust, expertise, and a commitment to finding the best deals available.", email: 'minerva@capitalmotorcars.com' },
  { name: 'Bobby Kaufman', role: 'Automotive Consultant', image: '', bio: "Bobby brings more than 30 years of experience from his time at BMW, where he built a reputation for deep product knowledge, exceptional customer care, and a straightforward, honest approach. His decades working with a premier luxury brand shaped his commitment to delivering a premium, stress-free experience for every client he meets.\n\nNow partnered with Capital Motor Cars, Bobby extends that same level of service across all makes and models, offering unbiased guidance, personalized recommendations, and full concierge support. Whether you're exploring luxury, sport, or everyday vehicles, Bobby ensures a smooth, transparent process from start to finish.", email: 'bobby@capitalmotorcars.com' },
  { name: 'Derek Anton', role: 'Business Development Director', image: derekImage, bio: "Derek focuses on identifying new growth opportunities and enhancing the company's brand presence. He works on building strategic alliances and improving the overall customer journey, from the first point of contact to the final vehicle delivery.", email: 'derek@capitalmotorcars.com' },
  { name: 'James', role: 'Logistics Manager', image: '', bio: "I love the smell of that new car scent. From pickup to delivery, I come straight to you smelling good.", email: 'james@capitalmotorcars.com' },
];

const cardClass = cn(
  'rounded-2xl border bg-card overflow-hidden',
  'border-border dark:border-white/20 dark:bg-white/[0.03] dark:border-white/5 dark:shadow-black/30',
  'hover:border-accent/30',
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
);
const dialogPanelClass = cn(
  cardClass,
  'dark:bg-[#121212]  dark:border-white/5 dark:shadow-black/30',
);
const cardTransition = { type: 'spring' as const, stiffness: 500, damping: 32 };
const hoverTransition = { type: 'tween' as const, duration: 0.12 };
const dialogFadeTransition = { type: 'tween' as const, duration: 0.4, ease: 'easeOut' as const };

export function PeopleSection() {
  const { ref, isRevealed } = useScrollReveal();
  const [founderOpen, setFounderOpen] = React.useState(false);
  const [teamPerson, setTeamPerson] = React.useState<Person | null>(null);

  return (
    <section aria-label="Team" className="relative py-16 md:py-24 section-bg">
      <div ref={ref} className="relative container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
        <div className="max-w-2xl mx-auto text-center mb-12">
          <SectionHeading
            title="Your Car Leasing Journey, Backed by a Dedicated Team"
            subtitle="A small team with one goal: make the process clear, fast, and stress-free."
          />
        </div>

        {/* Founder — centered on top */}
        <div className="flex justify-center mb-6">
          <Dialog.Root open={founderOpen} onOpenChange={setFounderOpen}>
            <Dialog.Trigger asChild>
              <motion.button
                type="button"
                className={cn(cardClass, 'flex flex-col items-center p-4 text-center w-full max-w-[300px]')}
                aria-label="A note from our founder"
                initial={{ opacity: 0, y: 20 }}
                animate={isRevealed ? { opacity: 1, y: 0, transition: { ...cardTransition, delay: 0.30 } } : { opacity: 0, y: 20 }}
                transition={hoverTransition}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <img src={founder.image} alt="" className="h-14 w-14 md:h-16 md:w-16 rounded-full object-cover ring-2 ring-border shadow-md" />
                <p className="mt-2.5 text-[10px] font-medium text-muted-foreground uppercase tracking-wider">Founder</p>
                <h3 className="mt-0.5 text-sm font-semibold text-foreground">{founder.name}</h3>
                <p className="mt-0.5 text-xs text-muted-foreground">{founder.role}</p>
                <span className="mt-1.5 inline-flex items-center gap-1.5 text-xs font-medium text-accent">
                  <ArrowRight className="h-4 w-4 shrink-0" aria-hidden />
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
                    <img src={founder.image} alt="" className="h-14 w-14 shrink-0 rounded-full object-cover ring-2 ring-border" />
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">A Note from Our Founder</p>
                      <h3 className="text-xl font-semibold text-foreground">{founder.name}</h3>
                      <p className="text-sm text-muted-foreground">{founder.role}</p>
                    </div>
                    <Dialog.Close asChild>
                      <button type="button" className="shrink-0 rounded-lg p-2 text-muted-foreground hover:bg-muted hover:text-foreground" aria-label="Close">
                        <X className="h-5 w-5" />
                      </button>
                    </Dialog.Close>
                  </div>
                  <p className="mt-4 text-muted-foreground leading-relaxed whitespace-pre-line">{founder.bio}</p>
                  </div>
                </motion.div>
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>
        </div>

        {/* Team grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {team.map((person, i) => (
            <Dialog.Root key={person.name} open={teamPerson?.name === person.name} onOpenChange={(open) => setTeamPerson(open ? person : null)}>
              <Dialog.Trigger asChild>
                <motion.button
                  type="button"
                  className={cn(cardClass, 'flex flex-col items-center p-4 md:p-5 text-center')}
                  aria-label={`View ${person.name}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isRevealed ? { opacity: 1, y: 0, transition: { ...cardTransition, delay: 0.30 + i * 0.06 } } : { opacity: 0, y: 20 }}
                  transition={hoverTransition}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {person.image ? (
                    <img src={person.image} alt="" className="h-14 w-14 md:h-16 md:w-16 rounded-full object-cover ring-2 ring-border shadow-md" />
                  ) : (
                    <div className="flex h-14 w-14 md:h-16 md:w-16 shrink-0 items-center justify-center rounded-full bg-muted ring-2 ring-border shadow-md text-muted-foreground">
                      <UserCircle className="h-7 w-7 md:h-8 md:w-8" aria-hidden />
                    </div>
                  )}
                  <h3 className="mt-3 text-sm font-semibold text-foreground truncate w-full">{person.name}</h3>
                  <p className="mt-0.5 text-xs text-muted-foreground line-clamp-2">{person.role}</p>
                  <span className="mt-1.5 inline-flex items-center gap-1.5 text-xs font-medium text-accent">
                    <ArrowRight className="h-4 w-4 shrink-0" aria-hidden />
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
                        <img src={person.image} alt="" className="h-14 w-14 shrink-0 rounded-full object-cover ring-2 ring-border" />
                      ) : (
                        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-muted ring-2 ring-border text-muted-foreground">
                          <UserCircle className="h-8 w-8" aria-hidden />
                        </div>
                      )}
                      <div className="min-w-0 flex-1">
                        <h3 className="text-xl font-semibold text-foreground">{person.name}</h3>
                        <p className="text-sm text-muted-foreground">{person.role}</p>
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
    </section>
  );
}
