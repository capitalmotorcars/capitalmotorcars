import * as React from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';

import { X } from 'lucide-react';

import { useScrollReveal } from '@/hooks/useScrollReveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { cn } from '@/lib/utils';

type Person = {
  name: string;
  role: string;
  image: string;
};

const founder: Person = {
  name: 'Christopher Amico',
  role: 'President & CEO',
  image:
    'https://images.unsplash.com/photo-1556157382-97eda2d62296?w=800&h=800&fit=crop&crop=face',
};

const founderNote =
  "As CEO of Capital Motor Cars, I take great pride in providing the ultimate automotive concierge experience to our clients, through building long and trusting relationships. Excellence is not an option but an obligation I strive to instill in each and every team member throughout the Capital Motor Cars organization. Coming from the corporate environment of Mercedes-Benz and consulting for BMW North America, I've mastered the art of the automotive industry. I look forward to implementing ongoing improvements to better the car leasing experience.";

const team: Person[] = [
  {
    name: 'Henry Liu',
    role: 'Vice President',
    image:
      'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800&h=800&fit=crop&crop=face',
  },
  {
    name: 'Mark Onbashian',
    role: 'Vice President',
    image:
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&h=800&fit=crop&crop=face',
  },
  {
    name: 'Michael Zeitoune',
    role: 'Director of Finance',
    image:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&h=800&fit=crop&crop=face',
  },
  {
    name: 'Vicky Azrak',
    role: 'Sales Manager',
    image:
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=800&h=800&fit=crop&crop=face',
  },
  {
    name: 'Michael Minerva',
    role: 'Sales Manager',
    image:
      'https://images.unsplash.com/photo-1556157382-97eda2d62296?w=800&h=800&fit=crop&crop=face',
  },
  {
    name: 'Derek Anton',
    role: 'Business Development Director',
    image:
      'https://images.unsplash.com/photo-1544723795-3fb6469f5b39?w=800&h=800&fit=crop&crop=face',
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

  const showEntrance = !reducedMotion;
  const revealed = reducedMotion ? true : isRevealed;

  return (
    <section aria-label="People / Team" className="py-20 md:py-28 bg-background">
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
                  <div className="relative mx-auto w-[132px] h-[132px] md:w-[156px] md:h-[156px]">
                    <img
                      src={founder.image}
                      alt={founder.name}
                      loading="lazy"
                      className={cn(
                        'h-full w-full rounded-full object-cover',
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
                        <span className="text-sm font-semibold text-foreground">
                          A Note from Our Founder
                        </span>
                        <div className="mx-auto mt-1 h-px w-10 bg-primary" />
                      </div>
                    </div>
                  </div>

                  <div className="mt-4">
                    <div className="text-base font-semibold text-foreground">{founder.name}</div>
                    <div className="text-sm text-muted-foreground">{founder.role}</div>
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
                        {founderNote}
                      </p>
                      <div className="mt-6">
                        <div className="text-xs font-semibold tracking-wide text-foreground">
                          {founder.name.toUpperCase()}
                        </div>
                        <div className="mt-1 text-xs text-muted-foreground">{founder.role.toUpperCase()}</div>
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
              'mt-12 md:mt-14',
              'grid grid-cols-2 md:grid-cols-3 gap-x-10 gap-y-12 md:gap-y-14',
              'justify-items-center',
            )}
          >
            {team.map((person, index) => {
              const delay = 120 + index * 70;
              return (
                <button
                  key={person.name}
                  type="button"
                  className={cn(
                    'group text-center focus:outline-none',
                    'focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
                    showEntrance && !revealed && 'opacity-0 translate-y-3',
                    showEntrance && revealed && 'opacity-100 translate-y-0',
                    showEntrance &&
                      'transition-[opacity,transform] duration-300 ease-out motion-reduce:transition-none motion-reduce:transform-none',
                    'hover:-translate-y-0.5 md:hover:-translate-y-1',
                  )}
                  style={showEntrance ? { transitionDelay: `${delay}ms` } : undefined}
                  aria-label={`${person.name}, ${person.role}`}
                >
                  <div className="relative mx-auto w-[104px] h-[104px] md:w-[112px] md:h-[112px]">
                    <img
                      src={person.image}
                      alt={person.name}
                      loading="lazy"
                      className={cn(
                        'h-full w-full rounded-full object-cover',
                        'shadow-sm ring-1 ring-border',
                        'transition-shadow duration-300 ease-out motion-reduce:transition-none',
                        'group-hover:shadow-md',
                      )}
                    />
                  </div>
                  <div className="mt-4">
                    <div className="text-sm md:text-base font-semibold text-foreground">{person.name}</div>
                    <div className="mt-0.5 text-xs md:text-sm text-muted-foreground">
                      <span className="group-hover:underline decoration-primary underline-offset-4">
                        {person.role}
                      </span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
