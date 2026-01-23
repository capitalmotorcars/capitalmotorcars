import { ImgHTMLAttributes, useState } from 'react';
import { cn } from '@/lib/utils';

interface OptimizedImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  /** Show a blur placeholder while loading */
  showPlaceholder?: boolean;
}

/**
 * Optimized image component with lazy loading and async decoding.
 * - Uses native lazy loading
 * - Uses async decoding for better performance
 * - Optional blur placeholder during load
 */
export function OptimizedImage({
  src,
  alt,
  className,
  showPlaceholder = false,
  ...props
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className={cn('relative', showPlaceholder && !isLoaded && 'bg-muted animate-pulse')}>
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        onLoad={() => setIsLoaded(true)}
        className={cn(
          className,
          showPlaceholder && !isLoaded && 'opacity-0',
          showPlaceholder && isLoaded && 'opacity-100 transition-opacity duration-300'
        )}
        {...props}
      />
    </div>
  );
}

/**
 * Utility to optimize external image URLs (Unsplash, etc.)
 * Reduces quality and size for faster loading
 */
export function optimizeImageUrl(url: string, options?: {
  width?: number;
  quality?: number;
}): string {
  const { width = 800, quality = 75 } = options || {};
  
  // Unsplash optimization
  if (url.includes('unsplash.com')) {
    const baseUrl = url.split('?')[0];
    return `${baseUrl}?auto=format&fit=crop&w=${width}&q=${quality}`;
  }
  
  // Carlogos optimization (already small, just return)
  if (url.includes('carlogos.org')) {
    return url;
  }
  
  return url;
}
