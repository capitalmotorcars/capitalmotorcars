import { useEffect, useMemo, useRef, useState } from 'react';
import { animate, motion, useMotionValue } from 'motion/react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface MotionCarouselItem {
  id?: number;
  name: string;
  slug: string;
  image: string;
  description?: string;
}

export interface MotionCarouselProps {
  items: MotionCarouselItem[];
  baseWidth?: number;
  cardHeight?: number;
  autoplay?: boolean;
  autoplayDelay?: number;
  pauseOnHover?: boolean;
  loop?: boolean;
  round?: boolean;
  className?: string;
}

const DRAG_BUFFER = 0;
const GAP = 20;
const CARD_HEIGHT = 320;
const SPRING = { type: 'spring' as const, stiffness: 320, damping: 32 };

interface SlideProps {
  item: MotionCarouselItem;
  itemWidth: number;
  itemHeight: number;
  round: boolean;
  transition: typeof SPRING;
}

function Slide({ item, itemWidth, itemHeight, round, transition }: SlideProps) {
  return (
    <motion.div
      className={cn(
        'relative shrink-0 flex flex-col overflow-hidden cursor-grab active:cursor-grabbing',
        round ? 'items-center justify-center rounded-full' : 'items-center rounded-xl'
      )}
      style={{
        width: itemWidth,
        height: round ? itemWidth : itemHeight,
        ...(round && { borderRadius: '50%' }),
      }}
      transition={transition}
    >
      <div
        className={cn(
          'flex flex-col w-full h-full group pointer-events-none rounded-2xl border shadow-lg backdrop-blur-sm',
          'bg-white/90 border-border/80 shadow-black/5',
          'dark:bg-white/[0.03] dark:border-white/5 dark:shadow-black/30',
          'hover:border-accent/40 hover:shadow-md transition-all duration-200',
          !round && 'overflow-hidden',
          round && 'rounded-full'
        )}
      >
        <div
          className={cn(
            'flex items-center justify-center overflow-hidden flex-shrink-0',
            'bg-white/70 dark:bg-white/[0.04]',
            round ? 'rounded-full w-full h-full' : 'w-full h-[130px] sm:h-[180px] md:h-[200px] rounded-t-xl'
          )}
        >
          <img
            src={item.image}
            alt={item.name}
            loading="lazy"
            decoding="async"
            draggable={false}
            className="w-full h-full object-contain pointer-events-none"
          />
        </div>
        {!round && (
          <div className="p-3 text-left border-t border-border/80 dark:border-white/5 flex-1 min-h-0 flex flex-col">
            <div className="flex items-center justify-between gap-2">
              <span className="text-lg font-semibold text-foreground">{item.name}</span>
              <Link
                to={`/vehicles/${item.slug}`}
                className="shrink-0 rounded-lg px-4 py-2 text-sm font-medium text-accent bg-accent/10 hover:bg-accent/20 hover:text-accent transition-colors pointer-events-auto"
                onClick={(e) => e.stopPropagation()}
              >
                Explore
              </Link>
            </div>
            {item.description && (
              <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
                {item.description}
              </p>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
}

export function MotionCarousel({
  items,
  baseWidth = 300,
  cardHeight = CARD_HEIGHT,
  autoplay = false,
  autoplayDelay = 3000,
  pauseOnHover = false,
  loop = false,
  round = false,
  className,
}: MotionCarouselProps) {
  const containerPadding = 16;
  const itemWidth = baseWidth - containerPadding * 2;
  const itemHeight = cardHeight;
  const trackItemOffset = itemWidth + GAP;

  const itemsForRender = useMemo(() => {
    if (!loop || items.length === 0) return items;
    return [items[items.length - 1], ...items, items[0]];
  }, [items, loop]);

  const [position, setPosition] = useState(loop ? 1 : 0);
  const x = useMotionValue(loop ? -trackItemOffset : 0);
  const [isHovered, setIsHovered] = useState(false);
  const [isJumping, setIsJumping] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [viewportWidth, setViewportWidth] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const isHoveredRef = useRef(false);
  const positionRef = useRef(position);
  isHoveredRef.current = isHovered;
  positionRef.current = position;

  const lastItemIndex = itemsForRender.length - 1;
  const isLastPage = position === (loop ? items.length : lastItemIndex);
  const lastItemRightEdge = (loop ? items.length : items.length - 1) * trackItemOffset + itemWidth;
  const lastPageTargetX = viewportWidth > 0
    ? viewportWidth - lastItemRightEdge
    : -(loop ? items.length : items.length - 1) * trackItemOffset;
  const defaultLastPageX = -(loop ? items.length : items.length - 1) * trackItemOffset;
  const dragLeft = viewportWidth > 0
    ? Math.min(defaultLastPageX, lastPageTargetX)
    : defaultLastPageX;

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setViewportWidth(el.clientWidth));
    ro.observe(el);
    setViewportWidth(el.clientWidth);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const target = isLastPage ? lastPageTargetX : -position * trackItemOffset;
    if (isJumping) {
      x.set(target);
    } else {
      const ctrl = animate(x, target, SPRING);
      return () => ctrl.stop();
    }
  }, [position, trackItemOffset, x, isJumping, isLastPage, lastPageTargetX]);

  useEffect(() => {
    if (!pauseOnHover || !containerRef.current) return;
    const el = containerRef.current;
    const enter = () => setIsHovered(true);
    const leave = () => setIsHovered(false);
    el.addEventListener('mouseenter', enter);
    el.addEventListener('mouseleave', leave);
    return () => {
      el.removeEventListener('mouseenter', enter);
      el.removeEventListener('mouseleave', leave);
    };
  }, [pauseOnHover]);

  useEffect(() => {
    if (!autoplay || itemsForRender.length <= 1) return;
    const id = setInterval(() => {
      if (pauseOnHover && isHoveredRef.current) return;
      setPosition((p) => Math.min(p + 1, itemsForRender.length - 1));
    }, autoplayDelay);
    return () => clearInterval(id);
  }, [autoplay, autoplayDelay, itemsForRender.length, pauseOnHover]);

  useEffect(() => {
    const start = loop ? 1 : 0;
    setPosition(start);
    x.set(loop ? -trackItemOffset : 0);
  }, [items.length, loop, trackItemOffset, x]);

  useEffect(() => {
    if (!loop && position > itemsForRender.length - 1) {
      setPosition(Math.max(0, itemsForRender.length - 1));
    }
  }, [itemsForRender.length, loop, position]);

  useEffect(() => {
    if (!loop || itemsForRender.length <= 1) return;
    const last = itemsForRender.length - 1;
    if (position === last) {
      setIsJumping(true);
      setPosition(1);
      x.set(-trackItemOffset);
      requestAnimationFrame(() => setIsJumping(false));
    } else if (position === 0) {
      setIsJumping(true);
      setPosition(items.length);
      x.set(-items.length * trackItemOffset);
      requestAnimationFrame(() => setIsJumping(false));
    }
  }, [position]);

  const transition = isJumping ? { duration: 0 } : SPRING;

  const onAnimationComplete = () => {
    if (!loop || itemsForRender.length <= 1) {
      setIsAnimating(false);
      return;
    }
    setPosition((p) => {
      const last = itemsForRender.length - 1;
      if (p === last) {
        setIsJumping(true);
        requestAnimationFrame(() => {
          setIsJumping(false);
          setIsAnimating(false);
        });
        return 1;
      }
      if (p === 0) {
        setIsJumping(true);
        requestAnimationFrame(() => {
          setIsJumping(false);
          setIsAnimating(false);
        });
        return items.length;
      }
      return p;
    });
    setIsAnimating(false);
  };

  const onDragEnd = () => {
    const currentX = x.get();
    const rawIndex = -currentX / trackItemOffset;
    const nearest = Math.round(rawIndex);
    const clamped = Math.max(0, Math.min(nearest, itemsForRender.length - 1));
    setPosition(clamped);
  };

  const dragConstraints = loop
    ? undefined
    : {
        left: dragLeft,
        right: 0,
      };

  const activeIndex =
    items.length === 0
      ? 0
      : loop
        ? (position - 1 + items.length) % items.length
        : Math.min(position, items.length - 1);

  const perspectiveOrigin = `${position * trackItemOffset + itemWidth / 2}px 50%`;

  return (
    <div
      ref={containerRef}
      className={cn(
        'relative overflow-hidden',
        round ? 'rounded-full' : 'rounded-2xl min-h-[360px] px-8 md:px-12',
        className
      )}
      style={round ? { width: baseWidth, height: baseWidth } : undefined}
    >
      <motion.div
        className={cn('flex items-stretch', !round && 'h-full')}
        style={{
          gap: GAP,
          perspective: 1200,
          perspectiveOrigin,
          x,
        }}
        drag="x"
        dragConstraints={dragConstraints}
        dragElastic={0.1}
        onDragEnd={onDragEnd}
      >
        {itemsForRender.map((item, index) => (
          <Slide
            key={`${item.slug}-${index}`}
            item={item}
            itemWidth={itemWidth}
            itemHeight={itemHeight}
            round={round}
            transition={SPRING}
          />
        ))}
      </motion.div>

      <div className="flex justify-center gap-2 mt-8">
        {items.map((_, i) => (
          <motion.button
            key={i}
            type="button"
            aria-label={`Go to slide ${i + 1}`}
            className={cn(
              'h-2 rounded-full transition-colors',
              activeIndex === i
                ? 'bg-accent w-6'
                : 'bg-muted-foreground/35 hover:bg-muted-foreground/55 w-2'
            )}
            animate={{ scale: activeIndex === i ? 1.1 : 1 }}
            transition={{ duration: 0.2 }}
            onClick={() => setPosition(loop ? i + 1 : i)}
          />
        ))}
      </div>

      {itemsForRender.length > 1 && (
        <>
          <button
            type="button"
            aria-label="Previous"
            className="absolute left-3 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center w-10 h-10 rounded-full border border-border dark:border-white/25 bg-background/80 dark:bg-white/10 backdrop-blur-sm shadow-md text-foreground dark:text-white hover:bg-background dark:hover:bg-white/15 hover:border-accent/40 dark:hover:border-white/40 transition-colors"
            onClick={() =>
              setPosition((p) =>
                p <= 0 ? itemsForRender.length - 1 : p - 1
              )
            }
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            type="button"
            aria-label="Next"
            className="absolute right-3 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center w-10 h-10 rounded-full border border-border dark:border-white/25 bg-background/80 dark:bg-white/10 backdrop-blur-sm shadow-md text-foreground dark:text-white hover:bg-background dark:hover:bg-white/15 hover:border-accent/40 dark:hover:border-white/40 transition-colors"
            onClick={() =>
              setPosition((p) =>
                p >= itemsForRender.length - 1 ? (loop ? 1 : p) : p + 1
              )
            }
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </>
      )}
    </div>
  );
}
