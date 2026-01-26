
# Add Social Proof to Hero Section

## Overview
Integrate a subtle social proof row above the main hero headline, maintaining the clean, enterprise-grade aesthetic while adding credibility signals.

## Current Structure
The left column content currently flows:
1. `<h1>` - Main headline
2. `<p>` - Subtext
3. CTAs - Buttons
4. `<p>` - Tagline

## Proposed Addition
Insert a social proof row **before** the `<h1>`:

```
Social Proof Badges (NEW)
    ↓
<h1> Main headline
    ↓
<p> Subtext
    ↓
CTAs
```

## Design Specifications

### Badge Structure
Two pill-style badges displayed inline:

| Badge | Content |
|-------|---------|
| Badge 1 | "15k+ Customers" |
| Badge 2 | Google icon + "★★★★★ 5/5 on Google" |

### Styling
- **Container**: `flex gap-3` for horizontal layout with tight spacing
- **Pills**: Semi-transparent dark background (`hsl(0 0% 100% / 0.08)`)
- **Border**: Subtle white border at 10% opacity
- **Text**: White, small (`text-xs`)
- **Stars**: Accent blue color for the rating stars
- **Google Icon**: Small inline SVG, white colored
- **Spacing**: Small margin-bottom (`mb-4`) before headline
- **Animation**: Uses existing `hero-animate` class for consistency (appears with headline)

### Visual Mock
```text
┌─────────────────┐  ┌──────────────────────────────┐
│  15k+ Customers │  │  [G] ★★★★★ 5/5 on Google    │
└─────────────────┘  └──────────────────────────────┘

A clear, guided approach to car leasing.
```

## Technical Implementation

### File Changes
**`src/components/hero/HeroSection.tsx`**

1. Add a new `div` with flex layout before the `<h1>` element
2. Include two badge spans with pill styling
3. Add inline Google "G" icon (simple SVG)
4. Apply existing animation classes

### Code Structure
```tsx
{/* Social Proof - NEW */}
<div className="flex flex-wrap items-center gap-3 mb-4 hero-animate ...">
  <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs ...">
    15k+ Customers
  </span>
  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs ...">
    {/* Google icon SVG */}
    <span className="text-accent">★★★★★</span>
    5/5 on Google
  </span>
</div>
```

## What Will NOT Change
- Headline text and styling
- Subtext content
- CTA buttons
- Circular process visualization position or size
- Animation timing/behavior
- Overall layout structure

## Responsive Behavior
- Badges wrap naturally on smaller screens via `flex-wrap`
- Maintains left-alignment across all breakpoints
- Consistent spacing on mobile and desktop

## Success Criteria
- Social proof visible immediately above headline
- Premium, understated appearance
- Does not compete with the process animation
- Matches CDK-style enterprise aesthetic
