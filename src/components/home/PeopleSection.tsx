import * as React from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';

import { X } from 'lucide-react';

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
  bio?: string;
  email?: string;
};

const founder: Person = {
  name: 'Christopher Amico',
  role: 'President & CEO',
  image: founderImage,
  bio: "As CEO of Capital Motor Cars, I take great pride in providing the ultimate automotive concierge experience to our clients, through building long and trusting relationships. Excellence is not an option but an obligation I strive to instill in each and every team member throughout the Capital Motor Cars organization. Coming from the corporate environment of Mercedes-Benz and consulting for BMW North America, I've mastered the art of the automotive industry. I look forward to implementing ongoing improvements to better the car leasing experience.",
};

const team: Person[] = [
  {
    name: 'Henry Liu',
    role: 'Vice President',
    image: henryImage,
    bio: "Henry is a seasoned professional in the automotive leasing industry, known for his strategic leadership and commitment to operational excellence. As Vice President, he plays a key role in driving the company's growth and ensuring that the team delivers top-tier service to all clients.",
    email: 'henry@capitalmotorcars.com',
  },
  {
    name: 'Mark Onbashian',
    role: 'Vice President',
    image: markImage,
    bio: "With years of experience in management and sales, Mark oversees large-scale operations and partnership development. His focus is on maintaining high standards of customer satisfaction and expanding the company's reach within the luxury vehicle market.",
    email: 'mark@capitalmotorcars.com',
  },
  {
    name: 'Michael Zeitoune',
    role: 'Director of Finance',
    image: mikeZImage,
    bio: "Michael manages the financial health and lending relationships of the company. He works closely with various banking institutions to secure the most favorable leasing rates and financial structures for clients, ensuring a smooth and transparent transaction process.",
    email: 'mzeitoune@capitalmotorcars.com',
  },
  {
    name: 'Vicky Azrak',
    role: 'Sales Manager',
    image: vickyImage,
    bio: "Vicky is dedicated to providing a personalized and seamless car-buying experience. As a Sales Manager, she leads her team with a customer-first approach, helping clients navigate their options to find the perfect vehicle that fits their lifestyle and budget.",
    email: 'vicky@capitalmotorcars.com',
  },
  {
    name: 'Michael Minerva',
    role: 'Sales Manager',
    image: michaelMImage,
    bio: "Michael specializes in high-end automotive sales and leasing. He is known for his deep product knowledge and his ability to build long-term relationships with clients through trust, expertise, and a commitment to finding the best deals available.",
    email: 'minerva@capitalmotorcars.com',
  },
  {
    name: 'Derek Anton',
    role: 'Business Development Director',
    image: derekImage,
    bio: "Derek focuses on identifying new growth opportunities and enhancing the company's brand presence. He works on building strategic alliances and improving the overall customer journey, from the first point of contact to the final vehicle delivery.",
    email: 'derek@capitalmotorcars.com',
  },
];

function usePrefersReducedMotion() {
  const [reduced, setReduced] = React.useState(false);

  React.useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onChange = () => setReduced(mq.matches);
    onChange();

    if (typeof mq.addEventListener === 'function') {
      mq.addEventListener('change', onChange);
      return () => mq.removeEventListener('change', onChange);
    }

    // Safari
    mq.addListener(onChange);
    return () => mq.removeListener(onChange);
  }, []);

  return reduced;
}

export function PeopleSection() {
  const { ref, isRevealed } = useScrollReveal();
  const reducedMotion = usePrefersReducedMotion();
  const [founderOpen, setFounderOpen] = React.useState(false);
  const [selectedMember, setSelectedMember] = React.useState<Person | null>(null);
  const showEntrance = !reducedMotion;
  const revealed = reducedMotion ? true : isRevealed;

  return (
    <section aria-label="People / Team" className="pt-10 md:pt-20 lg:pt-28 pb-8 md:pb-14 bg-[hsl(0_0%_4%)]">
      <div
        ref={ref}
        className={cn(
          'container mx-auto px-4 lg:px-8',
          showEntrance && 'scroll-reveal',
          showEntrance && revealed && 'revealed',
        )}
      >
        <SectionHeading
          title="Your Car Leasing Journey, Backed by a Dedicated Team"
          subtitle="A small team with one goal: make the process clear, fast, and stress-free."
          dark
        />

        <div className="max-w-5xl mx-auto">
        {/* Founder */}
          <div className="flex justify-center">
            <DialogPrimitive.Root open={founderOpen} onOpenChange={setFounderOpen}>
              <DialogPrimitive.Trigger asChild>
                <button
                  type="button"
                  aria-label="A Note from Our Founder"
                  className={cn(
                    'group text-center focus:outline-none',
                    'focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
                    showEntrance && !revealed && 'opacity-0 translate-y-3',
                    showEntrance && revealed && 'opacity-100 translate-y-0',
                    showEntrance &&
                      'transition-[opacity,transform] duration-300 ease-out motion-reduce:transition-none motion-reduce:transform-none',
                  )}
                  style={showEntrance ? { transitionDelay: '60ms' } : undefined}
                >
                  <div className="relative mx-auto w-[100px] h-[100px] md:w-[156px] md:h-[156px]">
                    <img
                      src={founder.image}
                      alt={founder.name}
                      loading="lazy"
                      className={cn(
                        'h-full w-full rounded-full object-cover object-top',
                        'shadow-sm ring-1 ring-border',
                        'transition-transform duration-300 ease-out motion-reduce:transition-none',
                        'group-hover:scale-[1.01]',
                      )}
                    />

                    {/* hover overlay */}
                    <div
                      className={cn(
                        'pointer-events-none absolute inset-0 rounded-full',
                        'bg-background/70 backdrop-blur-[2px] opacity-0',
                        'transition-opacity duration-300 ease-out motion-reduce:transition-none',
                        'group-hover:opacity-100',
                      )}
                    />
                    <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                      <div
                        className={cn(
                          'opacity-0 group-hover:opacity-100',
                          'transition-opacity duration-300 ease-out motion-reduce:transition-none',
                          'text-center px-2',
                        )}
                      >
                        <span className="text-xs md:text-sm font-semibold text-white">
                          A Note from Our Founder
                        </span>
                        <div className="mx-auto mt-1 h-px w-10 bg-white/30" />
                      </div>
                    </div>
                  </div>

                  <div className="mt-4">
                    <div className="text-base font-semibold text-white">{founder.name}</div>
                    <div className="text-sm text-white/85">{founder.role}</div>
                  </div>
                </button>
              </DialogPrimitive.Trigger>

              <DialogPrimitive.Portal>
                <DialogPrimitive.Overlay
                  className={cn(
                    'fixed inset-0 z-50 bg-foreground/10 backdrop-blur-sm',
                    'data-[state=open]:opacity-100 data-[state=closed]:opacity-0',
                    'transition-opacity duration-300 ease-out',
                    'motion-reduce:transition-none',
                  )}
                />
                <DialogPrimitive.Content
                  className={cn(
                    'fixed left-1/2 top-1/2 z-50 w-[calc(100%-2rem)] max-w-2xl -translate-x-1/2 -translate-y-1/2',
                    'rounded-xl bg-background p-6 md:p-8 shadow-lg ring-1 ring-border',
                    'opacity-0 scale-[0.98]',
                    'data-[state=open]:opacity-100 data-[state=open]:scale-100',
                    'data-[state=closed]:opacity-0 data-[state=closed]:scale-[0.98]',
                    'transition-[opacity,transform] duration-300 ease-out',
                    'motion-reduce:transition-none motion-reduce:transform-none motion-reduce:opacity-100',
                    'focus:outline-none',
                  )}
                >
                  <div className="flex items-start justify-between gap-6">
                    <div>
                      <h3 className="text-xl md:text-2xl font-semibold text-foreground">
                        A Note from Our Founder
                      </h3>
                      <p className="mt-4 text-sm md:text-base text-muted-foreground leading-relaxed">
                        {founder.bio}
                      </p>
                      <div className="mt-6">
                        <div className="text-sm font-semibold text-foreground">
                          {founder.name}
                        </div>
                        <div className="mt-1 text-xs text-muted-foreground">{founder.role}</div>
                      </div>
                    </div>

                    <DialogPrimitive.Close asChild>
                      <button
                        type="button"
                        className={cn(
                          'inline-flex h-9 w-9 items-center justify-center rounded-md',
                          'text-muted-foreground hover:text-foreground',
                          'transition-colors duration-200',
                          'focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
                          'motion-reduce:transition-none',
                        )}
                        aria-label="Close"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </DialogPrimitive.Close>
                  </div>
                </DialogPrimitive.Content>
              </DialogPrimitive.Portal>
            </DialogPrimitive.Root>
          </div>

          {/* Team */}
          <div
            className={cn(
              'mt-8 md:mt-14',
              'grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-8 md:gap-x-10 md:gap-y-14',
              'justify-items-center',
            )}
          >
            {team.map((person, index) => {
              const delay = 120 + index * 70;
              return (
                <button
                  key={person.name}
                  type="button"
                  aria-label={`View ${person.name}'s profile`}
                  onClick={() => setSelectedMember(person)}
                  className={cn(
                    'group text-center focus:outline-none',
                    'focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
                    showEntrance && !revealed && 'opacity-0 translate-y-3',
                    showEntrance && revealed && 'opacity-100 translate-y-0',
                    showEntrance &&
                      'transition-[opacity,transform] duration-300 ease-out motion-reduce:transition-none motion-reduce:transform-none',
                  )}
                  style={showEntrance ? { transitionDelay: `${delay}ms` } : undefined}
                >
                  <div className="relative mx-auto w-20 h-20 md:w-[112px] md:h-[112px]">
                    <img
                      src={person.image}
                      alt={person.name}
                      loading="lazy"
                      className={cn(
                        'h-full w-full rounded-full object-cover object-top',
                        'shadow-sm ring-1 ring-border',
                        'transition-transform duration-300 ease-out motion-reduce:transition-none',
                        'group-hover:scale-[1.01]',
                      )}
                    />

                    {/* hover overlay */}
                    <div
                      className={cn(
                        'pointer-events-none absolute inset-0 rounded-full',
                        'bg-background/70 backdrop-blur-[2px] opacity-0',
                        'transition-opacity duration-300 ease-out motion-reduce:transition-none',
                        'group-hover:opacity-100',
                      )}
                    />
                    <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                      <div
                        className={cn(
                          'opacity-0 group-hover:opacity-100',
                          'transition-opacity duration-300 ease-out motion-reduce:transition-none',
                        )}
                      >
                        <span className="text-xs md:text-sm font-semibold text-white">
                          View Profile
                        </span>
                        <div className="mx-auto mt-1 h-px w-8 bg-white/30" />
                      </div>
                    </div>
                  </div>
                  <div className="mt-4">
                    <div className="text-sm md:text-base font-semibold text-white">{person.name}</div>
                    <div className="mt-0.5 text-xs md:text-sm text-white/85">
                      {person.role}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Team Member Dialog */}
          <DialogPrimitive.Root open={!!selectedMember} onOpenChange={(open) => !open && setSelectedMember(null)}>
            <DialogPrimitive.Portal>
              <DialogPrimitive.Overlay
                className={cn(
                  'fixed inset-0 z-50 bg-foreground/10 backdrop-blur-sm',
                  'data-[state=open]:opacity-100 data-[state=closed]:opacity-0',
                  'transition-opacity duration-300 ease-out',
                  'motion-reduce:transition-none',
                )}
              />
              <DialogPrimitive.Content
                className={cn(
                  'fixed left-1/2 top-1/2 z-50 w-[calc(100%-2rem)] max-w-2xl -translate-x-1/2 -translate-y-1/2',
                  'rounded-xl bg-background p-6 md:p-8 shadow-lg ring-1 ring-border',
                  'opacity-0 scale-[0.98]',
                  'data-[state=open]:opacity-100 data-[state=open]:scale-100',
                  'data-[state=closed]:opacity-0 data-[state=closed]:scale-[0.98]',
                  'transition-[opacity,transform] duration-300 ease-out',
                  'motion-reduce:transition-none motion-reduce:transform-none motion-reduce:opacity-100',
                  'focus:outline-none',
                )}
              >
                {selectedMember && (
                  <div className="flex items-start justify-between gap-6">
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-4">
                        <img
                          src={selectedMember.image}
                          alt={selectedMember.name}
                          className="w-16 h-16 md:w-20 md:h-20 rounded-full object-cover object-top ring-1 ring-border"
                        />
                        <div>
                          <h3 className="text-xl md:text-2xl font-semibold text-foreground">
                            {selectedMember.name}
                          </h3>
                          <p className="text-sm text-muted-foreground">{selectedMember.role}</p>
                        </div>
                      </div>
                      <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                        {selectedMember.bio}
                      </p>
                      {selectedMember.email && (
                        <a
                          href={`mailto:${selectedMember.email}`}
                          className="inline-block mt-4 text-sm text-primary hover:underline underline-offset-4"
                        >
                          {selectedMember.email}
                        </a>
                      )}
                    </div>

                    <DialogPrimitive.Close asChild>
                      <button
                        type="button"
                        className={cn(
                          'inline-flex h-9 w-9 items-center justify-center rounded-md shrink-0',
                          'text-muted-foreground hover:text-foreground',
                          'transition-colors duration-200',
                          'focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
                          'motion-reduce:transition-none',
                        )}
                        aria-label="Close"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </DialogPrimitive.Close>
                  </div>
                )}
              </DialogPrimitive.Content>
            </DialogPrimitive.Portal>
          </DialogPrimitive.Root>
        </div>
      </div>
    </section>
  );
}
