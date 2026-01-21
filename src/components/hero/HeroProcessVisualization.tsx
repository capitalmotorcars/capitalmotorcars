import { User, Search, CheckCircle, Wrench, Truck } from 'lucide-react';
import { HeroProcessStep } from './HeroProcessStep';
import { useProcessAnimation } from '@/hooks/useProcessAnimation';
import { cn } from '@/lib/utils';

const processSteps = [
  {
    title: 'Personal Auto Consultant',
    icon: User,
    description: "You'll work with one dedicated advisor who understands your needs from day one.",
  },
  {
    title: 'Car Lease Search',
    icon: Search,
    description: 'We search our network of partners to find the right vehicle at the right price.',
  },
  {
    title: 'Get Approved',
    icon: CheckCircle,
    description: 'Fast credit approval process with multiple lending options available.',
  },
  {
    title: 'Additional Services',
    icon: Wrench,
    description: 'Trade-in, detailing, repairs — we handle everything in one place.',
  },
  {
    title: 'Delivered to Your Door',
    icon: Truck,
    description: 'Your vehicle arrives ready to drive, with all paperwork complete.',
  },
];

interface HeroProcessVisualizationProps {
  className?: string;
}

export function HeroProcessVisualization({ className }: HeroProcessVisualizationProps) {
  const {
    activeStep,
    setActiveStep,
    pauseAutoAdvance,
    prefersReducedMotion,
  } = useProcessAnimation({
    totalSteps: processSteps.length,
    intervalMs: 3500,
    resumeDelayMs: 5000,
  });

  const currentStep = processSteps[activeStep];

  return (
    <div className={cn('flex flex-col', className)}>
      {/* Process Steps - Desktop: horizontal flow, Mobile: vertical */}
      <div className="hidden lg:flex flex-col gap-2">
        {processSteps.map((step, index) => (
          <HeroProcessStep
            key={step.title}
            stepNumber={index + 1}
            title={step.title}
            icon={step.icon}
            isActive={activeStep === index}
            onClick={() => setActiveStep(index)}
            onMouseEnter={() => {
              pauseAutoAdvance();
              setActiveStep(index);
            }}
            prefersReducedMotion={prefersReducedMotion}
          />
        ))}
      </div>

      {/* Mobile: Simplified vertical steps */}
      <div className="lg:hidden flex flex-col gap-2">
        {processSteps.map((step, index) => (
          <button
            key={step.title}
            onClick={() => setActiveStep(index)}
            className={cn(
              'flex items-center gap-3 p-3 rounded-lg text-left',
              'focus:outline-none focus-visible:ring-2 focus-visible:ring-accent',
              activeStep === index
                ? 'bg-accent/15 border border-accent/40'
                : 'bg-white/5 border border-transparent'
            )}
          >
            <div
              className={cn(
                'w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold',
                activeStep === index
                  ? 'bg-accent text-accent-foreground'
                  : 'bg-white/10 text-primary-foreground/60'
              )}
            >
              {index + 1}
            </div>
            <step.icon
              className={cn(
                'w-4 h-4',
                activeStep === index ? 'text-accent' : 'text-primary-foreground/60'
              )}
              strokeWidth={1.5}
            />
            <span
              className={cn(
                'text-sm',
                activeStep === index
                  ? 'text-primary-foreground font-medium'
                  : 'text-primary-foreground/70'
              )}
            >
              {step.title}
            </span>
          </button>
        ))}
      </div>

      {/* Description Panel */}
      <div className="mt-6 min-h-[80px]">
        <div
          key={activeStep}
          className={cn(
            'p-4 rounded-lg bg-white/5 border border-white/10',
            !prefersReducedMotion && 'animate-step-description'
          )}
        >
          <p className="text-primary-foreground/80 text-sm leading-relaxed">
            {currentStep.description}
          </p>
        </div>
      </div>

      {/* Progress Indicator */}
      <div className="hidden lg:flex items-center gap-2 mt-4">
        {processSteps.map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveStep(index)}
            aria-label={`Go to step ${index + 1}`}
            className={cn(
              'h-1.5 rounded-full',
              !prefersReducedMotion && 'transition-all duration-300',
              activeStep === index
                ? 'w-8 bg-accent'
                : 'w-2 bg-white/20 hover:bg-white/40'
            )}
          />
        ))}
      </div>
    </div>
  );
}
