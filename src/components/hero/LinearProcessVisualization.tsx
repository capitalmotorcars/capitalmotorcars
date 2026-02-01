import { Headphones, Search, ShieldCheck, SlidersHorizontal, MapPin, Car } from 'lucide-react';
import { useProcessAnimation } from '@/hooks/useProcessAnimation';
import { cn } from '@/lib/utils';
import type { LucideIcon } from 'lucide-react';

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

interface LinearProcessVisualizationProps {
  className?: string;
}

export function LinearProcessVisualization({ className }: LinearProcessVisualizationProps) {
  const { activeStep, setActiveStep, prefersReducedMotion } = useProcessAnimation({
    totalSteps: processSteps.length,
    intervalMs: 3500,
  });

  const carLeftPercent = processSteps.length > 1 ? (activeStep / (processSteps.length - 1)) * 100 : 0;

  return (
    <div className={cn('w-full', className)}>
      <div className="flex flex-col items-center">
        {/* Horizontal row: connecting line + car + step circles */}
        <div className="relative w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Connecting line — behind circles */}
          <div
            className="absolute top-6 left-0 right-0 h-px hidden sm:block"
            style={{ backgroundColor: 'hsl(0 0% 100% / 0.2)' }}
            aria-hidden
          />
          {/* Car icon — drives along the line */}
          {!prefersReducedMotion && (
            <div
              className="absolute hidden sm:block top-6 z-20 -translate-x-1/2 -translate-y-1/2 transition-[left] duration-700 ease-in-out"
              style={{ left: `${carLeftPercent}%` }}
              aria-hidden
            >
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-accent text-accent-foreground shadow-lg">
                <Car className="w-5 h-5" strokeWidth={1.5} />
              </div>
            </div>
          )}
          <div className="relative flex flex-wrap justify-between gap-y-10 sm:gap-y-8 gap-x-4">
            {processSteps.map((step, index) => {
              const Icon = step.icon;
              const isActive = index === activeStep;
              return (
                <button
                  key={index}
                  type="button"
                  onClick={() => setActiveStep(index)}
                  className="flex flex-col items-center flex-1 min-w-[140px] max-w-[200px] sm:max-w-none mx-auto sm:mx-0 text-left cursor-pointer bg-transparent border-0 p-0 transition-opacity duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-[hsl(0_0%_3%)]"
                  style={!isActive ? { opacity: 0.7 } : undefined}
                >
                  {/* Circle + number */}
                  <div
                    className={cn(
                      'relative flex items-center justify-center w-12 h-12 rounded-full border-2 flex-shrink-0 z-10 text-white transition-all duration-300',
                      isActive
                        ? 'ring-2 ring-accent ring-offset-2 ring-offset-[hsl(0_0%_3%)] bg-accent/20 border-accent scale-105'
                        : 'bg-[hsl(0_0%_6%)] border-white/20'
                    )}
                  >
                    <Icon className="w-5 h-5" strokeWidth={1.5} />
                    <span
                      className="absolute -top-0.5 -right-0.5 w-5 h-5 rounded-full bg-accent text-white text-xs font-bold flex items-center justify-center"
                      aria-hidden
                    >
                      {index + 1}
                    </span>
                  </div>
                  {/* Title */}
                  <h3 className="mt-3 text-white font-semibold text-sm text-center sm:text-base">
                    {step.title}
                  </h3>
                  {/* Description */}
                  <p
                    className="mt-1 text-xs text-center leading-relaxed max-w-[180px] sm:max-w-none"
                    style={{ color: 'hsl(213 27% 70%)' }}
                  >
                    {step.description}
                  </p>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
