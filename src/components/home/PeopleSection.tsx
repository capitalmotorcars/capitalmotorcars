import { useScrollReveal } from '@/hooks/useScrollReveal';
import { SectionHeading } from '@/components/ui/SectionHeading';

const team = [
  {
    name: 'John Smith',
    role: 'Senior Auto Consultant',
    text: 'Your single point of contact from first call to delivery.',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
  },
  {
    name: 'Sarah Chen',
    role: 'Finance Coordinator',
    text: 'Handles credit applications and secures competitive terms.',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop&crop=face',
  },
  {
    name: 'Michael Torres',
    role: 'Service Manager',
    text: 'Coordinates all vehicle preparation and delivery.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
  },
];

export function PeopleSection() {
  const { ref, isRevealed } = useScrollReveal();

  return (
    <section className="py-20 md:py-28 bg-background">
      <div
        ref={ref}
        className={`container mx-auto px-4 lg:px-8 scroll-reveal ${isRevealed ? 'revealed' : ''}`}
      >
        <SectionHeading
          title="The People Behind the Process"
          subtitle="You work with real people who manage every step of the process — not automated systems or rotating sales reps."
        />
        
        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {team.map((person, index) => (
            <div
              key={person.name}
              className="text-center"
              style={{
                animationDelay: `${index * 100}ms`,
              }}
            >
              <div className="mb-6">
                <img
                  src={person.image}
                  alt={person.name}
                  className="w-28 h-28 rounded-full mx-auto object-cover grayscale hover:grayscale-0 transition-all duration-300"
                />
              </div>
              <h3 className="text-lg font-semibold text-primary mb-1">
                {person.name}
              </h3>
              <p className="text-sm text-accent font-medium mb-3">
                {person.role}
              </p>
              <p className="text-muted-foreground text-sm leading-relaxed max-w-xs mx-auto">
                {person.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
