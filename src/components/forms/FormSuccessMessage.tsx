import { Clock } from 'lucide-react';

interface FormSuccessMessageProps {
  title?: string;
  subtitle?: string;
  timing?: string;
}

export function FormSuccessMessage({
  title = "You're all set!",
  subtitle = "A team member will reach out to you shortly.",
  timing = "Usually within a few hours"
}: FormSuccessMessageProps) {
  return (
    <div className="flex flex-col items-center justify-center py-8 sm:py-12 text-center px-2 min-h-[50dvh] max-md:min-h-[40dvh] max-md:py-10">
      {/* Animated Success Icon */}
      <div className="relative mb-4 sm:mb-6">
        {/* Outer glow ring */}
        <div className="absolute inset-0 w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-accent/20 animate-success-ring" />
        
        {/* Main circle with check */}
        <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-accent to-accent/80 flex items-center justify-center shadow-lg">
          <svg className="w-8 h-8 sm:w-10 sm:h-10 text-accent-foreground" viewBox="0 0 24 24">
            <path 
              className="animate-check-draw"
              stroke="currentColor" 
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
      </div>
      
      {/* Title */}
      <h3 className="text-xl sm:text-2xl max-md:text-2xl font-semibold text-primary mb-2 opacity-0 animate-fade-in-up animation-delay-200">
        {title}
      </h3>
      
      {/* Subtitle */}
      <p className="text-muted-foreground text-base sm:text-lg mb-4 max-w-sm opacity-0 animate-fade-in-up animation-delay-300">
        {subtitle}
      </p>
      
      {/* Timing badge */}
      <div className="inline-flex items-center gap-2 px-4 py-2.5 min-h-[44px] rounded-full bg-muted text-xs sm:text-sm text-muted-foreground opacity-0 animate-fade-in-up animation-delay-400">
        <Clock className="w-4 h-4 shrink-0" />
        {timing}
      </div>
    </div>
  );
}
