import { Headphones, Search, ShieldCheck, SlidersHorizontal, MapPin, Car } from 'lucide-react';
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
    icon: Headphones,
    description: 'A dedicated consultant manages the entire process and stays with you from start to finish.',
  },
  {
    title: 'Lease Search',
    icon: Search,
    description: 'We search hundreds of dealerships to find the exact vehicle you want, at the right terms.',
  },
  {
    title: 'Get Approved',
    icon: ShieldCheck,
    description: 'We handle the credit process and compare options to secure the most suitable approval.',
  },
  {
    title: 'Add-Ons & Preparation',
    icon: SlidersHorizontal,
    description: 'Any requested upgrades or adjustments are handled before delivery.',
  },
  {
    title: 'Delivered to You',
    icon: MapPin,
    description: 'Your vehicle is delivered to your home or office. We handle the rest.',
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
    const startAngle = -90; // Start from top
    const angle = ((index / total) * 360 + startAngle) * (Math.PI / 180);
    const radius = 38;
    const x = 50 + radius * Math.cos(angle);
    const y = 50 + radius * Math.sin(angle);
    
    return { x, y };
  };

  return (
    <div className={cn('w-full', className)}>
      {/* Desktop Circular Visualization */}
      <div className="hidden md:flex flex-col items-center">
        <div className="relative w-[420px] h-[420px] xl:w-[500px] xl:h-[500px]">
          {/* SVG Container for circles */}
          <svg
            className="absolute inset-0 w-full h-full"
            viewBox="0 0 100 100"
          >
            {/* Outermost orbit ring - neutral */}
            <circle
              cx="50"
              cy="50"
              r="47"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.15"
              strokeDasharray="1 1.5"
              className={cn(
                'text-white/20',
                !prefersReducedMotion && 'animate-spin-slower'
              )}
              style={{ transformOrigin: 'center' }}
            />

            {/* Main orbit ring - neutral */}
            <circle
              cx="50"
              cy="50"
              r="38"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.2"
              strokeDasharray="2 1.5"
              className={cn(
                'text-white/30',
                !prefersReducedMotion && 'animate-spin-slow'
              )}
              style={{ transformOrigin: 'center' }}
            />

            {/* Inner ring - neutral */}
            <circle
              cx="50"
              cy="50"
              r="28"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.15"
              strokeDasharray="2 2"
              className={cn(
                'text-white/15',
                !prefersReducedMotion && 'animate-spin-reverse'
              )}
              style={{ transformOrigin: 'center' }}
            />

            {/* Center ring - neutral */}
            <circle
              cx="50"
              cy="50"
              r="14"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.1"
              strokeDasharray="1 1"
              className="text-white/10"
            />

            {/* Connecting lines - neutral, active gets slight opacity boost */}
            {processSteps.map((_, index) => {
              const pos = getStepPosition(index, processSteps.length);
              const isActive = activeStep === index;
              return (
                <line
                  key={`line-${index}`}
                  x1={pos.x}
                  y1={pos.y}
                  x2="50"
                  y2="50"
                  stroke="currentColor"
                  strokeWidth={isActive ? "0.15" : "0.08"}
                  strokeDasharray="1 1"
                  className={cn(
                    'transition-all duration-500',
                    isActive ? 'text-white/40' : 'text-white/10'
                  )}
                />
              );
            })}

            {/* Active arc - blue accent ONLY element */}
            <circle
              cx="50"
              cy="50"
              r="38"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.4"
              strokeDasharray="14 86"
              strokeLinecap="round"
              className={cn(
                'text-accent',
                !prefersReducedMotion && 'transition-transform duration-700 ease-out'
              )}
              style={{
                transform: `rotate(${(activeStep / processSteps.length) * 360 - 90}deg)`,
                transformOrigin: 'center',
              }}
            />
          </svg>

          {/* Center icon - neutral with subtle accent border */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="relative w-20 h-20 xl:w-24 xl:h-24 rounded-full bg-primary border border-white/30 flex items-center justify-center">
              <Car className="w-8 h-8 xl:w-10 xl:h-10 text-white/80" strokeWidth={1.2} />
            </div>
          </div>

          {/* Step nodes */}
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
                className="absolute -translate-x-1/2 -translate-y-1/2 group focus:outline-none"
                style={{
                  left: `${pos.x}%`,
                  top: `${pos.y}%`,
                }}
              >
                <div className="flex flex-col items-center gap-1">
                  <div
                    className={cn(
                      'relative w-11 h-11 xl:w-14 xl:h-14 rounded-full flex items-center justify-center border',
                      !prefersReducedMotion && 'transition-all duration-300',
                      isActive
                        ? 'bg-accent border-accent text-white scale-110'
                        : 'bg-primary/80 border-white/20 text-white/60 group-hover:border-white/40 group-hover:text-white/80 group-hover:scale-105'
                    )}
                  >
                    <Icon className="w-5 h-5 xl:w-6 xl:h-6" strokeWidth={1.5} />
                    <span className={cn(
                      'absolute -top-1 -right-1 w-4 h-4 xl:w-5 xl:h-5 rounded-full text-[9px] xl:text-[10px] font-bold flex items-center justify-center',
                      isActive ? 'bg-white text-accent' : 'bg-white/20 text-white'
                    )}>
                      {index + 1}
                    </span>
                  </div>
                  <span
                    className={cn(
                      'text-[10px] xl:text-xs font-medium whitespace-nowrap',
                      !prefersReducedMotion && 'transition-colors duration-300',
                      isActive ? 'text-white' : 'text-white/50 group-hover:text-white/70'
                    )}
                  >
                    {step.title}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Description panel - CDK neutral style */}
        <div className="w-full max-w-sm mt-6">
          <div
            key={activeStep}
            className={cn(
              'p-4 rounded-xl text-center',
              !prefersReducedMotion && 'animate-step-description'
            )}
            style={{ backgroundColor: 'hsl(216 27% 10%)', border: '1px solid hsl(216 27% 18%)' }}
          >
            <div className="flex items-center justify-center gap-2 mb-2">
              <span className="w-5 h-5 rounded-full bg-accent text-white text-xs font-bold flex items-center justify-center">
                {activeStep + 1}
              </span>
              <span className="text-white font-semibold text-sm">
                {currentStep.title}
              </span>
            </div>
            <p className="text-xs leading-relaxed" style={{ color: 'hsl(213 27% 70%)' }}>
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
              className={cn(
                'rounded-full transition-all duration-300',
                activeStep === index
                  ? 'w-6 h-1.5 bg-accent'
                  : 'w-1.5 h-1.5 bg-white/30 hover:bg-white/50'
              )}
            />
          ))}
        </div>
      </div>

      {/* Mobile: Vertical steps - CDK style */}
      <div className="md:hidden flex flex-col gap-3">
        <div className="text-sm font-semibold uppercase tracking-wider mb-2" style={{ color: 'hsl(213 27% 70%)' }}>
          How It Works
        </div>
        {processSteps.map((step, index) => (
          <button
            key={step.title}
            onClick={() => setActiveStep(index)}
            className="flex items-start gap-4 p-4 rounded-xl text-left transition-all duration-200"
            style={{ 
              backgroundColor: activeStep === index ? 'hsl(216 27% 12%)' : 'hsl(216 27% 9%)',
              border: activeStep === index ? '1px solid hsl(214 77% 50%)' : '1px solid hsl(216 27% 18%)'
            }}
          >
            <div
              className={cn(
                'w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0',
                activeStep === index
                  ? 'bg-accent text-white'
                  : 'text-white/50'
              )}
              style={activeStep !== index ? { backgroundColor: 'hsl(216 27% 15%)' } : undefined}
            >
              <step.icon className="w-5 h-5" strokeWidth={1.5} />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span 
                  className="text-xs font-semibold"
                  style={{ color: activeStep === index ? 'hsl(214 77% 50%)' : 'hsl(213 27% 50%)' }}
                >
                  Step {index + 1}
                </span>
              </div>
              <h4 
                className="font-medium mb-1"
                style={{ color: activeStep === index ? '#FFFFFF' : 'hsl(213 27% 70%)' }}
              >
                {step.title}
              </h4>
              {activeStep === index && (
                <p className="text-sm leading-relaxed" style={{ color: 'hsl(213 27% 70%)' }}>
                  {step.description}
                </p>
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
