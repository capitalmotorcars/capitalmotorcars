

# Implementation Plan: Hero CTA, Poker Cards Section, and Form Upgrade

## Overview
This plan covers three targeted updates: (1) Hero CTA text change, (2) "Why Work with Capital Motor Cars" section redesign with poker card concept, and (3) Form visual and performance improvements.

---

## 1. Hero CTA Text Update

**File:** `src/components/hero/HeroSection.tsx`

### Changes
| Element | Before | After |
|---------|--------|-------|
| CTA Button Text | "Schedule a Call" | "Start the process" |
| Link Destination | `/contact` | `/contact` (unchanged) |

**Technical Details:**
- Line 121: Change button text from "Schedule a Call" to "Start the process"
- Keep ArrowRight icon
- All other hero elements (layout, animation, colors, copy) remain unchanged

---

## 2. "Why Work with Capital Motor Cars" - Poker Card Redesign

**File:** `src/pages/HomePage.tsx` (section refactor) + New Component

### Current State
- 3 simple cards with icon circles, centered text
- No interaction beyond scroll reveal
- Light gray (`bg-muted`) background

### New Design: Interactive Poker Cards

**Content (using existing concepts, no new claims):**

| Card | Title | Description |
|------|-------|-------------|
| 1 | Single Point of Contact | One dedicated consultant manages your entire process, from initial conversation through delivery. |
| 2 | Real Industry Experience | Our team has worked inside dealerships and understands how pricing, financing, and negotiations actually work. |
| 3 | Clear, Practical Process | We explain each step before it happens. You always know where you are and what comes next. |

**Desktop Behavior:**
- Cards appear stacked with slight overlap (transform + z-index)
- Hover: hovered card lifts forward (translateY(-8px), increased z-index)
- Click: locks active state, reveals full description
- Only one card active at a time

**Mobile Behavior:**
- No overlap, vertical stack
- Tap expands/collapses description (accordion-style)
- Smooth height transition

**Visual Style:**
- Dark background (`hsl(216 27% 6%)`) to match Hero/CTA sections
- Premium card feel: subtle border (`hsl(0 0% 100% / 0.08)`), rounded corners (`rounded-xl`)
- Soft inner glow/shadow
- Accent blue for active state border and icon highlight
- White text on dark cards
- No casino aesthetics, clean and minimal

**New Component:** `src/components/home/WhyUsPokerCards.tsx`

```text
┌──────────────────────────────────────────────────────────────┐
│                                                              │
│            Why Work with Capital Motor Cars                  │
│                                                              │
│    ┌─────────────┐                                           │
│    │  Card 1     │┐                                          │
│    │  (active)   ││  ← Cards slightly overlapped             │
│    │  ━━━━━━━━━  ││┐                                         │
│    │  [icon]     │││                                         │
│    │  Title      ││┘                                         │
│    │  Desc...    │┘                                          │
│    └─────────────┘                                           │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

**Mobile View:**
```text
┌─────────────────────┐
│ Why Work with CMC   │
│                     │
│ ┌─────────────────┐ │
│ │ Card 1  [▼]     │ │
│ │ Description...  │ │
│ └─────────────────┘ │
│                     │
│ ┌─────────────────┐ │
│ │ Card 2  [▶]     │ │
│ └─────────────────┘ │
│                     │
│ ┌─────────────────┐ │
│ │ Card 3  [▶]     │ │
│ └─────────────────┘ │
└─────────────────────┘
```

---

## 3. Form Visual and Performance Upgrade

**Files:** `src/components/forms/ContactForm.tsx`, `src/components/forms/CreditApplicationForm.tsx`

### Visual Improvements

| Element | Before | After |
|---------|--------|-------|
| Input spacing | `space-y-2` between label/input | `space-y-1.5` tighter hierarchy |
| Input style | Default border, basic focus | Lighter border, prominent focus ring, subtle background on focus |
| Label style | Basic `text-sm` | Slightly bolder, clearer hierarchy |
| Error state | Red border only | Red border + subtle background tint |
| Button | Full width accent | Same but with subtle hover scale feedback |
| Overall padding | Standard `space-y-6` | Refined `space-y-5` for better density |

### Focus State Improvements
```css
/* New input focus behavior */
focus:border-accent focus:ring-2 focus:ring-accent/20 focus:bg-accent/5
```

### Performance/UX Improvements
- Remove any transition on Input that causes perceived lag
- Simpler transitions: `transition-colors duration-150` instead of complex transitions
- Mobile: ensure inputs don't cause viewport jumps on focus
- Disable form animations for reduced motion preference

### Updated Input Component Pattern
```typescript
// Clean, fast focus state
className={cn(
  "h-11 bg-background border-input/60 rounded-lg",
  "placeholder:text-muted-foreground/60",
  "focus:border-accent focus:ring-2 focus:ring-accent/20",
  "transition-colors duration-150",
  errors.fieldName ? "border-destructive bg-destructive/5" : ""
)}
```

### Button Submit State
- Keep "Continue" text for ContactForm
- Keep "Submit Application" for CreditApplicationForm
- Add subtle transform on hover: `hover:scale-[1.01]` (desktop only)

---

## Files to be Changed

| File | Action |
|------|--------|
| `src/components/hero/HeroSection.tsx` | Update CTA button text |
| `src/components/home/WhyUsPokerCards.tsx` | Create - new poker cards component |
| `src/pages/HomePage.tsx` | Replace "Why Work With Us" section with new component |
| `src/components/forms/ContactForm.tsx` | Visual and UX improvements |
| `src/components/forms/CreditApplicationForm.tsx` | Visual and UX improvements |
| `src/components/ui/input.tsx` | Update default input styling |
| `src/components/ui/textarea.tsx` | Update default textarea styling |

---

## Responsiveness Checklist

- Desktop: Poker cards with hover/click interaction, horizontal overlap
- Mobile: Accordion behavior, no overlap, full-width cards
- Forms: Proper touch targets (44px min), no scroll jumps on focus
- All elements render correctly without horizontal scroll

---

## What Remains Unchanged

- Hero layout, animation, colors, headline, subtext, social proof
- Services section, Stats section, Final CTA section
- Form field meanings and submission logic
- Overall site structure and navigation

