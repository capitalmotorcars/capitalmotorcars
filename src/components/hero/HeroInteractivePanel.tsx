import {
  VehicleViewer3D,
  VEHICLE_COLORS,
  ANNOTATION_DEFS,
  type VehicleColor,
} from '@/components/hero/VehicleViewer3D';
import { Palette, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

interface HeroInteractivePanelProps {
  heroAnimated: boolean;
  selectedColor: VehicleColor;
  onColorChange: (color: VehicleColor) => void;
  selectedAnnotationId: number | null;
  onAnnotationSelect: (id: number | null) => void;
}

export function HeroInteractivePanel({
  heroAnimated,
  selectedColor,
  onColorChange,
  selectedAnnotationId,
  onAnnotationSelect,
}: HeroInteractivePanelProps) {
  return (
    <div className="flex flex-col lg:flex-row flex-1 min-h-0 gap-4 lg:gap-6 items-stretch lg:min-h-[240px]">
      <div className="flex-shrink-0 w-full lg:flex-1 flex flex-col gap-3 order-first lg:min-w-0">
        <div className="hidden lg:block text-center lg:text-left">
          <h2
            className={cn(
              'text-xl sm:text-2xl font-semibold text-white dark:text-white tracking-tight',
              heroAnimated && 'animate-in fade-in-0 slide-in-from-bottom-4 duration-500'
            )}
          >
            Explore the Porsche 918 Spyder
          </h2>
          <p
            className={cn(
              'mt-1.5 text-base text-white/90 dark:text-white/85 max-w-md lg:max-w-none',
              heroAnimated && 'animate-in fade-in-0 slide-in-from-bottom-4 duration-500 delay-150'
            )}
          >
            Drag to orbit · Tap numbers on the model to zoom to features.
          </p>
        </div>
        <div className="w-full min-h-[160px] sm:min-h-[200px] lg:min-h-[220px] aspect-[4/3] sm:aspect-[16/9] lg:aspect-auto lg:flex-1 max-w-lg sm:max-w-xl md:max-w-2xl lg:max-w-none mx-auto overflow-hidden rounded-2xl flex items-stretch justify-center bg-white/5 dark:bg-black/20 border border-white/10 dark:border-white/10">
          <VehicleViewer3D
            className="w-full h-full min-h-[160px]"
            selectedColor={selectedColor}
            onColorChange={onColorChange}
            selectedAnnotationId={selectedAnnotationId}
            onAnnotationSelect={onAnnotationSelect}
            hideOverlays={true}
          />
        </div>
        <p className="lg:hidden text-center text-sm text-white/70 dark:text-white/60">
          Customize color and explore features below.
        </p>
      </div>

      <div className="flex-shrink-0 w-full lg:w-[320px] xl:w-[360px] flex flex-col gap-4 lg:gap-5 order-2">
        <div
          className={cn(
            'rounded-2xl border border-white/10 dark:border-white/10 bg-white/5 dark:bg-black/30 backdrop-blur-sm p-4 sm:p-5 flex flex-col gap-4',
            heroAnimated && 'animate-in fade-in-0 slide-in-from-bottom-4 duration-500 delay-100'
          )}
        >
          <div className="flex items-center gap-2 text-white dark:text-white">
            <Palette className="w-5 h-5 text-accent shrink-0" />
            <span className="font-semibold text-sm uppercase tracking-wider">Exterior color</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {VEHICLE_COLORS.map((c) => (
              <button
                key={c.hex}
                type="button"
                onClick={() => onColorChange(c)}
                title={c.name}
                className={cn(
                  'w-9 h-9 rounded-full border-2 shadow-sm transition-all hover:scale-110 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-transparent',
                  selectedColor.hex === c.hex
                    ? 'border-accent ring-2 ring-accent/40 scale-110'
                    : 'border-white/40 hover:border-white/60'
                )}
                style={{ backgroundColor: c.swatchHex ?? c.hex }}
                aria-label={c.name}
                aria-pressed={selectedColor.hex === c.hex}
              />
            ))}
          </div>
          <p className="text-xs text-white/70 dark:text-white/60">{selectedColor.name}</p>
        </div>

        <div
          className={cn(
            'rounded-2xl border border-white/10 dark:border-white/10 bg-white/5 dark:bg-black/30 backdrop-blur-sm p-4 sm:p-5 flex flex-col gap-3 flex-1 min-h-0',
            heroAnimated && 'animate-in fade-in-0 slide-in-from-bottom-4 duration-500 delay-200'
          )}
        >
          <div className="flex items-center gap-2 text-white dark:text-white">
            <Sparkles className="w-5 h-5 text-accent shrink-0" />
            <span className="font-semibold text-sm uppercase tracking-wider">Key features</span>
          </div>
          <p className="text-xs text-white/70 dark:text-white/60 mb-1">
            Tap a feature to zoom the 3D view.
          </p>
          <ul className="space-y-1.5 overflow-y-auto flex-1 min-h-0 pr-1">
            {ANNOTATION_DEFS.map((ann) => (
              <li key={ann.id}>
                <button
                  type="button"
                  onClick={() =>
                    onAnnotationSelect(selectedAnnotationId === ann.id ? null : ann.id)
                  }
                  className={cn(
                    'w-full text-left rounded-lg px-3 py-2 text-sm transition-all border border-transparent',
                    selectedAnnotationId === ann.id
                      ? 'bg-accent/20 border-accent/40 text-white'
                      : 'text-white/85 hover:bg-white/10 hover:text-white border-white/5'
                  )}
                >
                  <span className="font-medium text-accent mr-1.5">{ann.id}.</span>
                  {ann.description}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

