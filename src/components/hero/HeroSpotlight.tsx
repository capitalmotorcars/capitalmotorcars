"use client";

import React from "react";
import { Spotlight } from "@/components/ui/spotlight-new";

/**
 * Spotlight overlay for the hero section. Renders a subtle animated
 * gradient spotlight so hero content stays readable and focused.
 * Use inside HeroBackgroundWrapper (or any relative full-bleed container).
 */
export function HeroSpotlight() {
  return (
    <div className="pointer-events-none absolute inset-0 z-[2] overflow-hidden">
      <Spotlight
        gradientFirst="radial-gradient(68.54% 68.72% at 55.02% 31.46%, hsla(210, 100%, 90%, .12) 0, hsla(210, 100%, 60%, .04) 50%, transparent 80%)"
        gradientSecond="radial-gradient(50% 50% at 50% 50%, hsla(210, 100%, 90%, .08) 0, hsla(210, 100%, 60%, .03) 80%, transparent 100%)"
        gradientThird="radial-gradient(50% 50% at 50% 50%, hsla(210, 100%, 90%, .05) 0, hsla(210, 100%, 50%, .02) 80%, transparent 100%)"
        translateY={-320}
        width={880}
        height={1400}
        smallWidth={260}
        duration={8}
        xOffset={80}
      />
    </div>
  );
}
