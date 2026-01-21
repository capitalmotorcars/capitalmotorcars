import { User, Search, CheckCircle, Wrench, Truck } from 'lucide-react';
import { useProcessAnimation } from '@/hooks/useProcessAnimation';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface ProcessStep {
  title: string;
  icon: LucideIcon;
  description: string;
}

const processSteps: ProcessStep[] = [
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

interface CircularProcessVisualizationProps {
  className?: string;
}

export function CircularProcessVisualization({ className }: CircularProcessVisualizationProps) {
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

  // Calculate position for each step on the circle
  const getStepPosition = (index: number, total: number) => {
    // Start from top (-90 degrees) and go clockwise
    const angle = ((index / total) * 360 - 90) * (Math.PI / 180);
    const radius = 42; // percentage from center
    const x = 50 + radius * Math.cos(angle);
    const y = 50 + radius * Math.sin(angle);
    return { x, y, angle: (index / total) * 360 - 90 };
  };

  return (
    <div className={cn('flex flex-col items-center', className)}>
      {/* Circular Visualization - Desktop */}
      <div className="hidden lg:block relative w-[320px] h-[320px]">
        {/* Rotating dashed circle */}
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 100 100"
        >
          {/* Outer rotating dashed circle */}
          <circle
            cx="50"
            cy="50"
            r="42"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.3"
            strokeDasharray="2 2"
            className={cn(
              'text-accent/30',
              !prefersReducedMotion && 'animate-spin-slow'
            )}
            style={{ transformOrigin: 'center' }}
          />
          
          {/* Inner static circle */}
          <circle
            cx="50"
            cy="50"
            r="25"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.2"
            strokeDasharray="1.5 1.5"
            className="text-white/10"
          />

          {/* Connecting lines from center to each step */}
          {processSteps.map((_, index) => {
            const pos = getStepPosition(index, processSteps.length);
            return (
              <line
                key={`line-${index}`}
                x1="50"
                y1="50"
                x2={pos.x}
                y2={pos.y}
                stroke="currentColor"
                strokeWidth="0.2"
                strokeDasharray="1 1"
                className={cn(
                  'transition-all duration-300',
                  activeStep === index ? 'text-accent/50' : 'text-white/10'
                )}
              />
            );
          })}
        </svg>

        {/* Center content - active step info */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className={cn(
              'w-20 h-20 rounded-full bg-accent/10 border border-accent/30 flex items-center justify-center',
              !prefersReducedMotion && 'transition-all duration-300'
            )}
          >
            <currentStep.icon className="w-8 h-8 text-accent" strokeWidth={1.5} />
          </div>
        </div>

        {/* Step nodes positioned around the circle */}
        {processSteps.map((step, index) => {
          const pos = getStepPosition(index, processSteps.length);
          const isActive = activeStep === index;
          const Icon = step.icon;

          return (
            <button
              key={step.title}
              onClick={() => setActiveStep(index)}
              onMouseEnter={() => {
                pauseAutoAdvance();
                setActiveStep(index);
              }}
              className={cn(
                'absolute w-12 h-12 -translate-x-1/2 -translate-y-1/2',
                'rounded-full flex items-center justify-center',
                'focus:outline-none focus-visible:ring-2 focus-visible:ring-accent',
                !prefersReducedMotion && 'transition-all duration-300',
                isActive
                  ? 'bg-accent text-accent-foreground scale-110 shadow-lg shadow-accent/30'
                  : 'bg-white/10 text-primary-foreground/60 hover:bg-white/20 hover:scale-105'
              )}
              style={{
                left: `${pos.x}%`,
                top: `${pos.y}%`,
              }}
              aria-label={step.title}
              aria-current={isActive ? 'step' : undefined}
            >
              <Icon className="w-5 h-5" strokeWidth={1.5} />
            </button>
          );
        })}

        {/* Rotating highlight arc */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          viewBox="0 0 100 100"
        >
          <circle
            cx="50"
            cy="50"
            r="42"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.5"
            strokeDasharray="20 80"
            strokeLinecap="round"
            className={cn(
              'text-accent',
              !prefersReducedMotion && 'transition-transform duration-500'
            )}
            style={{
              transform: `rotate(${(activeStep / processSteps.length) * 360 - 90}deg)`,
              transformOrigin: 'center',
            }}
          />
        </svg>
      </div>

      {/* Mobile: Simplified vertical steps */}
      <div className="lg:hidden flex flex-col gap-2 w-full">
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
                'w-8 h-8 rounded-full flex items-center justify-center',
                activeStep === index
                  ? 'bg-accent text-accent-foreground'
                  : 'bg-white/10 text-primary-foreground/60'
              )}
            >
              <step.icon className="w-4 h-4" strokeWidth={1.5} />
            </div>
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
      <div className="mt-6 w-full max-w-sm">
        <div
          key={activeStep}
          className={cn(
            'p-4 rounded-lg bg-white/5 border border-white/10 text-center',
            !prefersReducedMotion && 'animate-step-description'
          )}
        >
          <h4 className="text-primary-foreground font-medium mb-2 text-sm">
            {currentStep.title}
          </h4>
          <p className="text-primary-foreground/70 text-sm leading-relaxed">
            {currentStep.description}
          </p>
        </div>
      </div>

      {/* Progress dots */}
      <div className="flex items-center gap-2 mt-4">
        {processSteps.map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveStep(index)}
            aria-label={`Go to step ${index + 1}`}
            className={cn(
              'rounded-full',
              !prefersReducedMotion && 'transition-all duration-300',
              activeStep === index
                ? 'w-6 h-1.5 bg-accent'
                : 'w-1.5 h-1.5 bg-white/20 hover:bg-white/40'
            )}
          />
        ))}
      </div>
    </div>
  );
}
