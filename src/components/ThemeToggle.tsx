import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { Moon, Sun } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ThemeToggleProps {
  className?: string;
}

export function ThemeToggle({ className }: ThemeToggleProps) {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button
        type="button"
        aria-label="Theme"
        className={cn(
          'inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border bg-muted/80 transition-colors dark:border-white/10 dark:bg-white/5',
          className
        )}
      >
        <span className="h-4 w-4 rounded-full bg-muted-foreground/30" />
      </button>
    );
  }

  const isDark = resolvedTheme === 'dark';

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className={cn(
        'inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-all duration-200',
        'border-border bg-muted/80 hover:bg-muted hover:border-border',
        'dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10 dark:hover:border-white/20',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background dark:focus-visible:ring-offset-black',
        className
      )}
    >
      {isDark ? (
        <Sun className="h-4 w-4 text-white/90 dark:text-white" aria-hidden />
      ) : (
        <Moon className="h-4 w-4 text-foreground" aria-hidden />
      )}
    </button>
  );
}
