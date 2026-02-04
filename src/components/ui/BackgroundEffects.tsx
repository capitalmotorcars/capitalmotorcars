/**
 * Reusable decorative background: gradient overlay, shimmer, noise,
 * floating orbs, and star-like dots. Use inside a relative container.
 */
export function BackgroundEffects() {
  return (
    <>
      {/* Premium gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/[0.02] to-transparent pointer-events-none" />

      {/* Subtle shimmer effect */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          background: 'linear-gradient(90deg, transparent 0%, hsl(214 77% 50% / 0.1) 50%, transparent 100%)',
          backgroundSize: '200% 100%',
          animation: 'shimmer 8s ease-in-out infinite',
        }}
      />

      {/* Noise texture */}
      <div
        className="absolute inset-0 opacity-[0.012] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Floating orbs */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 rounded-full bg-accent/5 blur-[100px] animate-float-orb pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-56 h-56 rounded-full bg-accent/5 blur-[80px] animate-float-orb-delayed pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-accent/[0.02] blur-[120px] animate-pulse-slow pointer-events-none" />

      {/* Star-like dots */}
      <div className="absolute top-[15%] left-[10%] w-1 h-1 rounded-full bg-white/20 animate-twinkle pointer-events-none" />
      <div className="absolute top-[25%] right-[15%] w-1.5 h-1.5 rounded-full bg-white/15 animate-twinkle pointer-events-none" style={{ animationDelay: '1s' }} />
      <div className="absolute bottom-[30%] left-[20%] w-1 h-1 rounded-full bg-white/20 animate-twinkle pointer-events-none" style={{ animationDelay: '2s' }} />
      <div className="absolute bottom-[20%] right-[25%] w-1 h-1 rounded-full bg-white/25 animate-twinkle pointer-events-none" style={{ animationDelay: '0.5s' }} />
      <div className="absolute top-[40%] left-[5%] w-0.5 h-0.5 rounded-full bg-white/30 animate-twinkle pointer-events-none" style={{ animationDelay: '1.5s' }} />
      <div className="absolute top-[60%] right-[8%] w-1 h-1 rounded-full bg-white/20 animate-twinkle pointer-events-none" style={{ animationDelay: '2.5s' }} />
    </>
  );
}
