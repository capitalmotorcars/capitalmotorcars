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
  const getStepPosition = (index: number, total: number, radius: number) => {
    const startAngle = -90; // Start from top
    const angle = ((index / total) * 360 + startAngle) * (Math.PI / 180);
    const x = 50 + radius * Math.cos(angle);
    const y = 50 + radius * Math.sin(angle);
    
    return { x, y };
  };

  // Shared circular visualization component
  const CircularDiagram = ({ size, isMobile = false }: { size: number; isMobile?: boolean }) => {
    const mainRadius = isMobile ? 36 : 38;
    const outerRadius = isMobile ? 44 : 47;
    const innerRadius = isMobile ? 26 : 28;
    const centerRadius = isMobile ? 12 : 14;
    const nodeSize = isMobile ? 'w-9 h-9' : 'w-11 h-11 xl:w-14 xl:h-14';
    const iconSize = isMobile ? 'w-4 h-4' : 'w-5 h-5 xl:w-6 xl:h-6';
    const badgeSize = isMobile ? 'w-3.5 h-3.5 text-[7px]' : 'w-4 h-4 xl:w-5 xl:h-5 text-[9px] xl:text-[10px]';
    const labelSize = isMobile ? 'text-[8px]' : 'text-[10px] xl:text-xs';
    const centerIconSize = isMobile ? 'w-6 h-6' : 'w-8 h-8 xl:w-10 xl:h-10';
    const centerNodeSize = isMobile ? 'w-14 h-14' : 'w-20 h-20 xl:w-24 xl:h-24';

    return (
      <div className="relative" style={{ width: size, height: size }}>
        {/* SVG Container for circles */}
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 100 100"
        >
          {/* Outermost orbit ring - neutral */}
          <circle
            cx="50"
            cy="50"
            r={outerRadius}
            fill="none"
            stroke="currentColor"
            strokeWidth="0.15"
            strokeDasharray="1 1.5"
            className={cn(
              'text-white/20',
              !prefersReducedMotion && !isMobile && 'animate-spin-slower'
            )}
            style={{ transformOrigin: 'center' }}
          />

          {/* Main orbit ring - neutral */}
          <circle
            cx="50"
            cy="50"
            r={mainRadius}
            fill="none"
            stroke="currentColor"
            strokeWidth="0.2"
            strokeDasharray="2 1.5"
            className={cn(
              'text-white/30',
              !prefersReducedMotion && !isMobile && 'animate-spin-slow'
            )}
            style={{ transformOrigin: 'center' }}
          />

          {/* Inner ring - neutral */}
          <circle
            cx="50"
            cy="50"
            r={innerRadius}
            fill="none"
            stroke="currentColor"
            strokeWidth="0.15"
            strokeDasharray="2 2"
            className={cn(
              'text-white/15',
              !prefersReducedMotion && !isMobile && 'animate-spin-reverse'
            )}
            style={{ transformOrigin: 'center' }}
          />

          {/* Center ring - neutral */}
          <circle
            cx="50"
            cy="50"
            r={centerRadius}
            fill="none"
            stroke="currentColor"
            strokeWidth="0.1"
            strokeDasharray="1 1"
            className="text-white/10"
          />

          {/* Connecting lines - neutral, active gets slight opacity boost */}
          {processSteps.map((_, index) => {
            const pos = getStepPosition(index, processSteps.length, mainRadius);
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
            r={mainRadius}
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
          <div className={cn(
            "relative rounded-full bg-primary border border-white/30 flex items-center justify-center",
            centerNodeSize
          )}>
            <Car className={cn(centerIconSize, "text-white/80")} strokeWidth={1.2} />
          </div>
        </div>

        {/* Step nodes */}
        {processSteps.map((step, index) => {
          const pos = getStepPosition(index, processSteps.length, mainRadius);
          const isActive = activeStep === index;
          const Icon = step.icon;

          return (
            <button
              key={step.title}
              onClick={() => setActiveStep(index)}
              onMouseEnter={!isMobile ? () => {
                pauseAutoAdvance();
                setActiveStep(index);
              } : undefined}
              className="absolute -translate-x-1/2 -translate-y-1/2 group focus:outline-none"
              style={{
                left: `${pos.x}%`,
                top: `${pos.y}%`,
              }}
            >
              <div className="flex flex-col items-center gap-0.5">
                <div
                  className={cn(
                    'relative rounded-full flex items-center justify-center border',
                    nodeSize,
                    !prefersReducedMotion && 'transition-all duration-300',
                    isActive
                      ? 'bg-accent border-accent text-white scale-110'
                      : 'bg-primary/80 border-white/20 text-white/60 group-hover:border-white/40 group-hover:text-white/80 group-hover:scale-105'
                  )}
                >
                  <Icon className={iconSize} strokeWidth={1.5} />
                  <span className={cn(
                    'absolute -top-0.5 -right-0.5 rounded-full font-bold flex items-center justify-center',
                    badgeSize,
                    isActive ? 'bg-white text-accent' : 'bg-white/20 text-white'
                  )}>
                    {index + 1}
                  </span>
                </div>
                {!isMobile && (
                  <span
                    className={cn(
                      'font-medium whitespace-nowrap',
                      labelSize,
                      !prefersReducedMotion && 'transition-colors duration-300',
                      isActive ? 'text-white' : 'text-white/50 group-hover:text-white/70'
                    )}
                  >
                    {step.title}
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </div>
    );
  };

  return (
    <div className={cn('w-full', className)}>
      {/* Desktop Circular Visualization */}
      <div className="hidden md:flex flex-col items-center">
        <CircularDiagram size={420} />

        {/* Description panel - CDK neutral style */}
        <div className="w-full max-w-sm mt-6">
          <div
            key={activeStep}
            className={cn(
              'p-4 rounded-xl text-center',
              !prefersReducedMotion && 'animate-step-description'
            )}
            style={{ backgroundColor: 'hsl(0 0% 6%)', border: '1px solid hsl(0 0% 12%)' }}
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

      {/* Mobile: Compact Circular Visualization */}
      <div className="md:hidden flex flex-col items-center">
        <div className="text-xs font-semibold tracking-wide mb-4 text-center" style={{ color: 'hsl(213 27% 70%)' }}>
          How It Works
        </div>
        
        <CircularDiagram size={280} isMobile />

        {/* Description panel for mobile */}
        <div className="w-full max-w-xs mt-4">
          <div
            key={activeStep}
            className={cn(
              'px-3 py-2.5 rounded-lg text-center',
              !prefersReducedMotion && 'animate-step-description'
            )}
            style={{ backgroundColor: 'hsl(0 0% 6%)', border: '1px solid hsl(0 0% 12%)' }}
          >
            <div className="flex items-center justify-center gap-1.5 mb-1">
              <span className="w-4 h-4 rounded-full bg-accent text-white text-[10px] font-bold flex items-center justify-center">
                {activeStep + 1}
              </span>
              <span className="text-white font-semibold text-xs">
                {currentStep.title}
              </span>
            </div>
            <p className="text-[11px] leading-relaxed" style={{ color: 'hsl(213 27% 70%)' }}>
              {currentStep.description}
            </p>
          </div>
        </div>

        {/* Progress dots for mobile */}
        <div className="flex items-center gap-1.5 mt-3">
          {processSteps.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveStep(index)}
              className={cn(
                'rounded-full transition-all duration-300',
                activeStep === index
                  ? 'w-4 h-1 bg-accent'
                  : 'w-1 h-1 bg-white/30'
              )}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
