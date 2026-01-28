import { User, Search, CheckCircle, Wrench, Truck } from 'lucide-react';
import { useProcessAnimation } from '@/hooks/useProcessAnimation';
import { cn } from '@/lib/utils';

const processSteps = [
  {
    title: 'Auto Consultant',
    icon: User,
    description: "You'll work with one dedicated advisor who understands your needs from day one.",
  },
  {
    title: 'Lease Search',
    icon: Search,
    description: 'We search our network of partners to find the right vehicle at the right price.',
  },
  {
    title: 'Get Approved',
    icon: CheckCircle,
    description: 'Fast credit approval process with multiple lending options available.',
  },
  {
    title: 'Add-Ons',
    icon: Wrench,
    description: 'Trade-in, detailing, repairs. We handle everything in one place.',
  },
  {
    title: 'Delivered',
    icon: Truck,
    description: 'Your vehicle arrives ready to drive, with all paperwork complete.',
  },
];

export function HorizontalProcessVisualization() {
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
    <div className="w-full">
      {/* Desktop: Horizontal Steps */}
      <div className="hidden md:block">
        <div className="flex items-center justify-center gap-2 lg:gap-4">
          {processSteps.map((step, index) => (
            <div key={step.title} className="flex items-center">
              {/* Step Card */}
              <button
                onClick={() => setActiveStep(index)}
                onMouseEnter={() => {
                  pauseAutoAdvance();
                  setActiveStep(index);
                }}
                className={cn(
                  'flex flex-col items-center gap-2 px-4 py-3 rounded-lg',
                  'focus:outline-none focus-visible:ring-2 focus-visible:ring-accent',
                  'transition-all duration-200',
                  activeStep === index
                    ? 'bg-accent/15 border border-accent/40'
                    : 'bg-white/[0.05] border border-white/[0.08] hover:bg-white/[0.08]'
                )}
              >
                <div
                  className={cn(
                    'w-10 h-10 rounded-full flex items-center justify-center',
                    'transition-colors duration-200',
                    activeStep === index
                      ? 'bg-accent text-accent-foreground'
                      : 'bg-white/10 text-white/60'
                  )}
                >
                  <step.icon className="w-5 h-5" strokeWidth={1.5} />
                </div>
                <div className="flex items-center gap-1.5">
                  <span
                    className={cn(
                      'text-xs font-medium',
                      activeStep === index ? 'text-accent' : 'text-white/50'
                    )}
                  >
                    {index + 1}.
                  </span>
                  <span
                    className={cn(
                      'text-sm whitespace-nowrap',
                      activeStep === index
                        ? 'text-white font-medium'
                        : 'text-white/70'
                    )}
                  >
                    {step.title}
                  </span>
                </div>
              </button>

              {/* Connector Arrow */}
              {index < processSteps.length - 1 && (
                <div className="mx-1 lg:mx-2">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="text-white/30"
                  >
                    <path
                      d="M9 6l6 6-6 6"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Description Panel */}
        <div className="mt-6 max-w-2xl mx-auto">
          <div
            key={activeStep}
            className={cn(
              'p-4 rounded-lg text-center',
              'bg-white/[0.05] border border-white/[0.08]',
              !prefersReducedMotion && 'animate-fade-in'
            )}
          >
            <p className="text-white/80 text-sm leading-relaxed">
              {currentStep.description}
            </p>
          </div>
        </div>
      </div>

      {/* Mobile: Compact Vertical Steps */}
      <div className="md:hidden">
        <div className="flex flex-col gap-2">
          {processSteps.map((step, index) => (
            <button
              key={step.title}
              onClick={() => setActiveStep(index)}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-lg text-left',
                'focus:outline-none focus-visible:ring-2 focus-visible:ring-accent',
                'transition-all duration-200',
                activeStep === index
                  ? 'bg-accent/15 border border-accent/40'
                  : 'bg-white/[0.05] border border-white/[0.08]'
              )}
            >
              <div
                className={cn(
                  'w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0',
                  'transition-colors duration-200',
                  activeStep === index
                    ? 'bg-accent text-accent-foreground'
                    : 'bg-white/10 text-white/60'
                )}
              >
                <step.icon className="w-4 h-4" strokeWidth={1.5} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <span
                    className={cn(
                      'text-xs font-medium',
                      activeStep === index ? 'text-accent' : 'text-white/50'
                    )}
                  >
                    {index + 1}.
                  </span>
                  <span
                    className={cn(
                      'text-sm',
                      activeStep === index
                        ? 'text-white font-medium'
                        : 'text-white/70'
                    )}
                  >
                    {step.title}
                  </span>
                </div>
                {activeStep === index && (
                  <p className="text-white/70 text-xs mt-1 leading-relaxed">
                    {step.description}
                  </p>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Progress Dots - Desktop only */}
      <div className="hidden md:flex items-center justify-center gap-2 mt-4">
        {processSteps.map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveStep(index)}
            aria-label={`Go to step ${index + 1}`}
            className={cn(
              'h-1.5 rounded-full',
              !prefersReducedMotion && 'transition-all duration-300',
              activeStep === index
                ? 'w-6 bg-accent'
                : 'w-1.5 bg-white/20 hover:bg-white/40'
            )}
          />
        ))}
      </div>
    </div>
  );
}
