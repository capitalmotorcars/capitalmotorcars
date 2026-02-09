import { useState } from 'react';
import {
  Headphones,
  Search,
  ShieldCheck,
  SlidersHorizontal,
  MapPin,
  Car,
  type LucideIcon,
} from 'lucide-react';
import { useProcessAnimation } from '@/hooks/useProcessAnimation';
import { cn } from '@/lib/utils';

interface ProcessStep {
  title: string;
  icon: LucideIcon;
  description: string;
}

const STEPS: ProcessStep[] = [
  {
    title: 'Personal Auto Consultant',
    icon: Headphones,
    description:
      'A dedicated consultant manages the entire process and stays with you from start to finish.',
  },
  {
    title: 'Lease Search',
    icon: Search,
    description:
      'We search hundreds of dealerships to find the exact vehicle you want, at the right terms.',
  },
  {
    title: 'Get Approved',
    icon: ShieldCheck,
    description:
      'We handle the credit process and compare options to secure the most suitable approval.',
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
  mobileSize?: number;
  hideMobileTitle?: boolean;
}

function getStepPosition(index: number, total: number, radius: number) {
  const startAngle = -90;
  const angle = ((index / total) * 360 + startAngle) * (Math.PI / 180);
  return {
    x: 50 + radius * Math.cos(angle),
    y: 50 + radius * Math.sin(angle),
  };
}

export function CircularProcessVisualization({
  className,
  mobileSize = 380,
  hideMobileTitle = false,
}: CircularProcessVisualizationProps) {
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);
  const { activeStep, setActiveStep, pauseAutoAdvance, prefersReducedMotion } =
    useProcessAnimation({
      totalSteps: STEPS.length,
      intervalMs: 3500,
      resumeDelayMs: 5000,
    });

  // Visuals follow hover; when not hovering, show selected step
  const displayStep = hoveredStep !== null ? hoveredStep : activeStep;

  const handleStepEnter = (index: number) => {
    if (prefersReducedMotion) return;
    pauseAutoAdvance();
    setHoveredStep(index);
  };

  const handleStepLeave = (index: number) => {
    setHoveredStep(null);
    setActiveStep(index);
  };

  const handleStepClick = (index: number) => {
    setActiveStep(index);
  };

  const renderDiagram = (size: number, isMobile: boolean) => {
    const mainR = isMobile ? 36 : 38;
    const outerR = isMobile ? 44 : 47;
    const innerR = isMobile ? 26 : 28;
    const centerR = isMobile ? 12 : 14;
    const nodeSize = isMobile ? 'w-11 h-11' : 'w-11 h-11 xl:w-14 xl:h-14';
    const iconSize = isMobile ? 'w-5 h-5' : 'w-5 h-5 xl:w-6 xl:h-6';
    const badgeSize = isMobile ? 'w-4 h-4 text-[8px]' : 'w-4 h-4 xl:w-5 xl:h-5 text-[9px] xl:text-[10px]';
    const labelSize = isMobile ? 'text-sm' : 'text-sm xl:text-base';
    const centerSize = isMobile ? 'w-14 h-14' : 'w-20 h-20 xl:w-24 xl:h-24';
    const centerIconSize = isMobile ? 'w-6 h-6' : 'w-8 h-8 xl:w-10 xl:h-10';

    return (
      <div className="relative" style={{ width: size, height: size }}>
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" aria-hidden>
          <defs>
            <filter id="hiw-blue-glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="0.9" result="blur" />
              <feFlood floodColor="hsl(214, 77%, 50%)" floodOpacity="1" result="color" />
              <feComposite in="color" in2="blur" operator="in" result="glow" />
              <feMerge>
                <feMergeNode in="glow" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          {/* Decorative rings – grey circles, more visible */}
          <circle
            cx="50"
            cy="50"
            r={outerR}
            fill="none"
            stroke="currentColor"
            strokeWidth="0.15"
            strokeDasharray="1 1.5"
            className={cn(
              'text-muted-foreground/20 dark:text-white/10',
              !prefersReducedMotion && !isMobile && 'animate-spin-slower'
            )}
            style={{ transformOrigin: '50% 50%' }}
          />
          <circle
            cx="50"
            cy="50"
            r={mainR}
            fill="none"
            stroke="currentColor"
            strokeWidth="0.2"
            strokeDasharray="2 1.5"
            className={cn(
              'text-muted-foreground/25 dark:text-white/20',
              !prefersReducedMotion && !isMobile && 'animate-spin-slow'
            )}
            style={{ transformOrigin: '50% 50%' }}
          />
          <circle
            cx="50"
            cy="50"
            r={innerR}
            fill="none"
            stroke="currentColor"
            strokeWidth="0.15"
            strokeDasharray="2 2"
            className={cn(
              'text-muted-foreground/10 dark:text-white/10',
              !prefersReducedMotion && !isMobile && 'animate-spin-reverse'
            )}
            style={{ transformOrigin: '50% 50%' }}
          />
          <circle
            cx="50"
            cy="50"
            r={centerR}
            fill="none"
            stroke="currentColor"
            strokeWidth="0.1"
            strokeDasharray="1 1"
            className="text-muted-foreground/10 dark:text-white/15"
          />

          {/* Connecting line – show line to current step on load; to hovered step when hovering */}
          {STEPS.map((_, i) => {
            const pos = getStepPosition(i, STEPS.length, mainR);
            const showLine = hoveredStep !== null ? hoveredStep === i : displayStep === i;
            return (
              <line
                key={`line-${i}`}
                x1="50"
                y1="50"
                x2={pos.x}
                y2={pos.y}
                stroke="currentColor"
                strokeOpacity={showLine ? 1 : 0}
                filter={showLine ? 'url(#hiw-blue-glow)' : undefined}
                className={cn(
                  'hiw-line transition-[stroke-opacity] duration-200',
                  showLine && 'text-accent dark:text-white'
                )}
                data-active={showLine ? 'true' : 'false'}
              />
            );
          })}

          {/* Blue trajectory – from step 1 to current step only (arc ends at current step, not the next) */}
          {(() => {
            const circumference = 2 * Math.PI * mainR;
            const segmentLength = circumference / STEPS.length;
            const dashLength =
              displayStep === 0
                ? segmentLength * 0.25
                : displayStep * segmentLength;
            const gapLength = circumference - dashLength;
            return (
              <circle
                cx="50"
                cy="50"
                r={mainR}
                fill="none"
                stroke="currentColor"
                strokeWidth="0.3"
                strokeOpacity={1}
                strokeDasharray={`${dashLength} ${gapLength}`}
                strokeDashoffset={0}
                strokeLinecap="butt"
                filter="url(#hiw-blue-glow)"
                className={cn('text-accent', !prefersReducedMotion && 'hiw-arc')}
                style={{
                  transform: 'rotate(-90deg)',
                  transformOrigin: '50% 50%',
                }}
              />
            );
          })()}
        </svg>

        {/* Center icon – blue border + blue icon (same as step nodes) */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div
            className={cn(
              'hiw-center-icon rounded-full border flex items-center justify-center',
              'bg-muted border-accent text-accent dark:bg-white/10 dark:border-accent dark:text-white',
              centerSize
            )}
          >
            <Car className={centerIconSize} strokeWidth={1.2} />
          </div>
        </div>

        {/* Step nodes – hover sets displayStep so lines/arc/panel transition */}
        {STEPS.map((step, i) => {
          const pos = getStepPosition(i, STEPS.length, mainR);
          const active = displayStep === i;
          const onPath = i <= displayStep; // steps 1..current get blue icon
          const Icon = step.icon;
          return (
            <button
              key={step.title}
              type="button"
              className="absolute -translate-x-1/2 -translate-y-1/2 group focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-full"
              style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
              onClick={() => handleStepClick(i)}
              onMouseEnter={() => !isMobile && handleStepEnter(i)}
              onMouseLeave={() => !isMobile && handleStepLeave(i)}
              aria-pressed={activeStep === i}
              aria-label={`Step ${i + 1}: ${step.title}`}
            >
              <div className="flex flex-col items-center gap-1">
                <div
                  className={cn(
                    'hiw-node relative rounded-full flex items-center justify-center border',
                    nodeSize,
                    active
                      ? 'bg-muted border-accent text-accent shadow-lg shadow-accent/20 dark:bg-white/10 dark:border-accent dark:text-white dark:shadow-accent/25'
                      : onPath
                        ? 'bg-muted border-accent text-accent dark:bg-white/10 dark:border-accent dark:text-white'
                        : 'bg-muted border-border dark:bg-white/10 dark:border-white/20 text-muted-foreground dark:text-white/80'
                  )}
                  data-active={active ? 'true' : 'false'}
                  data-on-path={onPath ? 'true' : 'false'}
                >
                  <Icon
                    className={cn(iconSize, 'hiw-node-icon', onPath && 'text-accent dark:text-white')}
                    strokeWidth={1.5}
                  />
                  <span
                    className={cn(
                      'absolute -top-0.5 -right-0.5 rounded-full font-bold flex items-center justify-center',
                      badgeSize,
                      onPath
                        ? 'bg-white text-accent dark:bg-white/30 dark:text-white'
                        : 'bg-white text-foreground dark:bg-white/25 dark:text-white'
                    )}
                  >
                    {i + 1}
                  </span>
                </div>
                <span
                  className={cn(
                    'font-medium text-center drop-shadow-sm',
                    labelSize,
                    isMobile ? 'max-w-[180px] leading-snug line-clamp-2' : 'whitespace-nowrap',
                    active ? 'text-foreground dark:text-white' : 'text-foreground/90 dark:text-white/85'
                  )}
                >
                  {step.title}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    );
  };

  const renderPanel = (isMobile: boolean) => (
    <div
      className={cn(
        'relative rounded-xl text-center border border-border dark:border-white/20 bg-muted/60 dark:bg-white/10 backdrop-blur-sm',
        isMobile ? 'min-h-[6.5rem] px-4 py-3' : 'min-h-[7.5rem] p-4'
      )}
    >
      {STEPS.map((step, i) => (
        <div
          key={step.title}
          className={cn(
            'hiw-panel-item absolute inset-0 flex flex-col items-center justify-center',
            isMobile ? 'px-4 py-3 rounded-lg' : 'p-4 rounded-xl'
          )}
          data-active={displayStep === i ? 'true' : 'false'}
          aria-hidden={displayStep !== i}
        >
          <div className={cn('flex items-center gap-2 mb-2', isMobile && 'gap-2 mb-1.5')}>
            <span
              className={cn(
                'rounded-full bg-accent text-accent-foreground font-bold flex items-center justify-center shrink-0',
                isMobile ? 'w-5 h-5 text-xs' : 'w-5 h-5 text-xs'
              )}
            >
              {i + 1}
            </span>
            <span
              className={cn(
                'font-semibold text-foreground dark:text-white',
                isMobile ? 'text-sm' : 'text-sm'
              )}
            >
              {step.title}
            </span>
          </div>
          <p
            className={cn(
              'leading-relaxed text-muted-foreground dark:text-white/80',
              isMobile ? 'text-sm' : 'text-sm'
            )}
          >
            {step.description}
          </p>
        </div>
      ))}
    </div>
  );

  return (
    <div className={cn('w-full ', className)}>
      {/* Desktop */}
      <div className="hidden md:flex flex-col items-center">
        {renderDiagram(600, false)}
        <div className="w-full max-w-sm md:max-w-lg mt-6">{renderPanel(false)}</div>
        <div
          className="flex items-center gap-2 mt-4"
          role="tablist"
          aria-label="Process steps"
        >
          {STEPS.map((_, i) => (
            <button
              key={i}
              type="button"
              role="tab"
              aria-selected={activeStep === i}
              aria-label={`Step ${i + 1}: ${STEPS[i].title}`}
              onClick={() => handleStepClick(i)}
              className={cn(
                'rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background',
                'transition-all duration-300 ease-out',
                activeStep === i
                  ? 'w-6 h-1.5 bg-accent'
                  : 'w-1.5 h-1.5 bg-muted-foreground/40 dark:bg-white/30 hover:bg-muted-foreground/60 dark:hover:bg-white/50'
              )}
            />
          ))}
        </div>
      </div>

      {/* Mobile */}
      <div className="md:hidden flex flex-col items-center p-6 border-border dark:border-white/10">
        {!hideMobileTitle && (
          <div className="text-xs font-semibold tracking-wide  text-center text-muted-foreground dark:text-white/70 w-full px-1">
            How It Works
          </div>
        )}
        {renderDiagram(mobileSize, true)}
        <div className="w-full max-w-xs mt-2 sm:mt-4">{renderPanel(true)}</div>
        <div
          className="flex items-center gap-1.5 mt-3"
          role="tablist"
          aria-label="Process steps"
        >
          {STEPS.map((_, i) => (
            <button
              key={i}
              type="button"
              role="tab"
              aria-selected={activeStep === i}
              aria-label={`Step ${i + 1}`}
              onClick={() => handleStepClick(i)}
              className={cn(
                'rounded-full transition-all duration-300 ease-out focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2',
                activeStep === i ? 'w-4 h-1 bg-accent' : 'w-1 h-1 bg-muted-foreground/40 dark:bg-white/30'
              )}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
