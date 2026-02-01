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
    description: 'A dedicated consultant manages the full process from start to finish.',
  },
  {
    title: 'Lease Search',
    icon: Search,
    description: 'We search hundreds of dealers for the right vehicle and terms.',
  },
  {
    title: 'Get Approved',
    icon: ShieldCheck,
    description: 'We handle credit and compare options for the best approval.',
  },
  {
    title: 'Add-Ons & Preparation',
    icon: SlidersHorizontal,
    description: 'Upgrades and adjustments are handled before delivery.',
  },
  {
    title: 'Delivered to You',
    icon: MapPin,
    description: 'Your vehicle is delivered to your home or office.',
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

  return (
    <div className={cn('w-full', className)}>
      <div className="flex flex-col items-center">
        {/* 5 equal columns: line + car (in active column) + step content */}
        <div className="relative w-full max-w-5xl mx-auto px-0 sm:px-2">
          {/* Connecting line — gradient for premium look */}
          <div
            className="absolute top-6 left-0 right-0 h-0.5 hidden sm:block rounded-full"
            style={{
              background: 'linear-gradient(90deg, transparent 0%, hsl(214 77% 50% / 0.35) 20%, hsl(214 77% 50% / 0.5) 50%, hsl(214 77% 50% / 0.35) 80%, transparent 100%)',
              boxShadow: '0 0 12px hsl(214 77% 50% / 0.2)',
            }}
            aria-hidden
          />
          <div className="relative flex flex-wrap sm:flex-nowrap justify-between gap-y-8 sm:gap-y-8 gap-x-3 sm:gap-x-4">
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
                  {/* Track row: car centered in this column when active */}
                  <div className="relative w-full flex justify-center h-12 hidden sm:flex items-center flex-shrink-0">
                    {!prefersReducedMotion && isActive && (
                      <div
                        className="flex items-center justify-center w-10 h-10 rounded-full bg-accent text-accent-foreground shadow-lg ring-2 ring-accent/40 ring-offset-2 ring-offset-[hsl(0_0%_4%)] z-20"
                        style={{ boxShadow: '0 4px 20px hsl(214 77% 50% / 0.4)' }}
                        aria-hidden
                      >
                        <Car className="w-5 h-5" strokeWidth={1.5} />
                      </div>
                    )}
                  </div>
                  {/* Circle + number */}
                  <div
                    className={cn(
                      'relative flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full border-2 flex-shrink-0 z-10 text-white transition-all duration-300',
                      isActive
                        ? 'ring-2 ring-accent ring-offset-2 ring-offset-[hsl(0_0%_4%)] bg-accent/20 border-accent scale-105 shadow-[0_0_20px_hsl(214_77%_50%_/_0.25)]'
                        : 'bg-[hsl(0_0%_6%)] border-white/20'
                    )}
                  >
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={1.5} />
                    <span
                      className="absolute -top-0.5 -right-0.5 w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-accent text-white text-xs font-bold flex items-center justify-center"
                      aria-hidden
                    >
                      {index + 1}
                    </span>
                  </div>
                  {/* Title */}
                  <h3 className="mt-3 sm:mt-4 text-white font-semibold text-sm text-center sm:text-base">
                    {step.title}
                  </h3>
                  {/* Description — max 2 lines */}
                  <p
                    className="mt-1 text-xs text-center leading-relaxed max-w-[180px] sm:max-w-none line-clamp-2"
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
