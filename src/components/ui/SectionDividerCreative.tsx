import { cn } from '@/lib/utils';

interface SectionDividerCreativeProps {
  /** Optional extra class on the wrapper */
  className?: string;
  /** 'line' = gradient line only, 'dot' = line + center dot, 'diamond' = line + center diamond */
  variant?: 'line' | 'dot' | 'diamond';
}

/**
 * Creative divider between sections: gradient line that fades at edges,
 * with optional center accent (dot or diamond). Theme-aware.
 */
export function SectionDividerCreative({
  className,
  variant = 'dot',
}: SectionDividerCreativeProps) {
  return (
    <div
      className={cn('relative flex items-center justify-center w-full py-6 md:py-8', className)}
      aria-hidden
    >
      {/* Gradient line - fades at edges */}
      <div
        className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 w-full max-w-3xl mx-auto"
        style={{
          background:
            'linear-gradient(to right, transparent 0%, hsl(var(--border)) 15%, hsl(var(--border)) 85%, transparent 100%)',
        }}
      />
      <div
        className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 w-full max-w-2xl mx-auto opacity-60"
        style={{
          background:
            'linear-gradient(to right, transparent 0%, hsl(var(--accent) / 0.25) 45%, hsl(var(--accent) / 0.25) 55%, transparent 100%)',
        }}
      />

      {/* Center accent */}
      {variant === 'dot' && (
        <span className="relative z-10 w-2 h-2 rounded-full bg-accent/70 shadow-[0_0_12px_hsl(var(--accent)_/_0.5)]" />
      )}
      {variant === 'diamond' && (
        <span
          className="relative z-10 w-2.5 h-2.5 rotate-45 bg-accent/60 shadow-[0_0_10px_hsl(var(--accent)_/_0.4)]"
          style={{ borderRadius: 2 }}
        />
      )}
    </div>
  );
}
