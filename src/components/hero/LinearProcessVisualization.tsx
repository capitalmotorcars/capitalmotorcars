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
    description: 'A dedicated consultant from start to finish.',
  },
  {
    title: 'Lease Search',
    icon: Search,
    description: 'We search dealers for the right vehicle and terms.',
  },
  {
    title: 'Get Approved',
    icon: ShieldCheck,
    description: 'We handle credit and compare options for approval.',
  },
  {
    title: 'Add-Ons & Preparation',
    icon: SlidersHorizontal,
    description: 'Upgrades and adjustments before delivery.',
  },
  {
    title: 'Delivered to You',
    icon: MapPin,
    description: 'Delivered to your home or office.',
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
      {/* Vertical timeline when section is "mobile-only" (below md); matches HomePage md:hidden */}
      <div className="md:hidden relative">
        <div
          className="absolute left-5 top-5 bottom-5 w-0.5 rounded-full z-0"
          style={{
            background: 'linear-gradient(180deg, transparent 0%, hsl(214 77% 50% / 0.4) 15%, hsl(214 77% 50% / 0.5) 50%, hsl(214 77% 50% / 0.4) 85%, transparent 100%)',
            boxShadow: '0 0 10px hsl(214 77% 50% / 0.15)',
          }}
          aria-hidden
        />
        <div className="relative flex flex-col gap-4">
          {processSteps.map((step, index) => {
            const Icon = step.icon;
            const isActive = index === activeStep;
            return (
              <button
                key={index}
                type="button"
                onClick={() => setActiveStep(index)}
                className="flex gap-3 items-start text-left w-full cursor-pointer bg-transparent border-0 p-0 rounded-lg transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-[hsl(0_0%_4%)] -mx-1 px-1 py-0.5"
              >
                <div
                  className={cn(
                    'relative flex items-center justify-center w-10 h-10 rounded-full border-2 flex-shrink-0 z-10 text-white transition-all duration-300',
                    isActive
                      ? 'ring-2 ring-accent ring-offset-2 ring-offset-[hsl(0_0%_4%)] bg-accent/20 border-accent shadow-[0_0_16px_hsl(214_77%_50%_/_0.25)]'
                      : 'bg-[hsl(0_0%_6%)] border-white/20'
                  )}
                >
                  <Icon className="w-5 h-5" strokeWidth={1.5} />
                  <span
                    className="absolute -top-0.5 -right-0.5 w-5 h-5 rounded-full bg-accent text-white text-[10px] font-bold flex items-center justify-center"
                    aria-hidden
                  >
                    {index + 1}
                  </span>
                </div>
                <div className="flex-1 min-w-0 pt-0.5">
                  <h3 className="text-white font-semibold text-sm">
                    {step.title}
                  </h3>
                  <p
                    className="mt-0.5 text-xs leading-snug"
                    style={{ color: 'hsl(213 27% 70%)' }}
                  >
                    {step.description}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Horizontal line + car + step cards at md and up (HeroSection shows this block at md+) */}
      <div className="hidden md:flex flex-col items-center">
        <div className="relative w-full max-w-5xl mx-auto px-0 sm:px-2">
          <div
            className="absolute top-6 left-0 right-0 h-0.5 rounded-full"
            style={{
              background: 'linear-gradient(90deg, transparent 0%, hsl(214 77% 50% / 0.35) 20%, hsl(214 77% 50% / 0.5) 50%, hsl(214 77% 50% / 0.35) 80%, transparent 100%)',
              boxShadow: '0 0 12px hsl(214 77% 50% / 0.2)',
            }}
            aria-hidden
          />
          <div className="relative flex flex-nowrap justify-between gap-y-8 gap-x-4">
            {processSteps.map((step, index) => {
              const Icon = step.icon;
              const isActive = index === activeStep;
              return (
                <button
                  key={index}
                  type="button"
                  onClick={() => setActiveStep(index)}
                  className="flex flex-col items-center flex-1 min-w-[140px] max-w-none mx-0 text-left cursor-pointer bg-transparent border-0 p-0 transition-opacity duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-[hsl(0_0%_3%)]"
                  style={!isActive ? { opacity: 0.7 } : undefined}
                >
                  <div className="relative w-full flex justify-center h-12 items-center flex-shrink-0">
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
                  <div
                    className={cn(
                      'relative flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-full border-2 flex-shrink-0 z-10 text-white transition-all duration-300',
                      isActive
                        ? 'ring-2 ring-accent ring-offset-2 ring-offset-[hsl(0_0%_4%)] bg-accent/20 border-accent scale-105 shadow-[0_0_20px_hsl(214_77%_50%_/_0.25)]'
                        : 'bg-[hsl(0_0%_6%)] border-white/20'
                    )}
                  >
                    <Icon className="w-5 h-5 md:w-6 md:h-6" strokeWidth={1.5} />
                    <span
                      className="absolute -top-1 -right-1 w-5 h-5 md:w-6 md:h-6 rounded-full bg-accent text-white text-xs font-bold flex items-center justify-center"
                      aria-hidden
                    >
                      {index + 1}
                    </span>
                  </div>
                  <h3 className="mt-3 md:mt-4 text-white font-semibold text-sm md:text-base text-center">
                    {step.title}
                  </h3>
                  <p
                    className="mt-1 text-xs text-center leading-snug max-w-[180px] md:max-w-none"
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
