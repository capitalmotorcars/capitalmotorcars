# Mobile-First Responsive Strategy

This document summarizes the mobile-first approach used across the Capital Motor Cars site: where breakpoints apply, mobile-specific changes, UX risks and mitigations, a QA checklist, and structured visual descriptions of key mobile layouts.

---

## Summary of Mobile-First Approach

- **Base styles** target viewports from **320px to 430px** (iPhone SE through large phones and common Android widths).
- **Enhancements** are added at **md: 768px** (tablet) and **lg: 1024px** (desktop). We do not rely on `sm` (640px) for critical layout; base is mobile, then tablet/desktop.
- **Typography**: Body is `1rem` (16px) with `line-height: 1.5` so text stays readable and avoids iOS zoom on input focus. Paragraphs use `leading-relaxed` (1.625). Headings scale from `text-2xl` on mobile up to `text-4xl`/`text-5xl`/`text-6xl` at larger breakpoints.
- **Spacing**: Consistent horizontal padding on mobile is **16px** (`px-4`). Sections use `container mx-auto px-4 lg:px-8`. Vertical spacing uses a scale (e.g. 4/8/12/16/24/32) with section padding like `py-8 md:py-16 lg:py-20`.
- **Touch**: Interactive elements use a minimum **44×44px** tap target (`min-h-[44px]`, `min-w-[44px]`, or `h-11`). This applies to the header hamburger, mobile nav links, hero CTAs, form buttons, and footer links.

### Where Breakpoints Are Used

| Area | Base (320–430px) | md (≥768px) | lg (≥1024px) |
|------|-------------------|-------------|--------------|
| **Hero** | Single column, stacked CTAs, centered text, “How It Works” infographic below | Same column; optional spacing tweaks | Same; larger type and infographic container |
| **Header** | Hamburger menu; logo left, CTA in drawer | — | Horizontal nav + “Schedule a Call” button |
| **Sections** | Single column, full-width content, 16px padding | Multi-column grids where needed (e.g. stats, cards) | Wider containers, more columns |
| **Forms** | Full-width inputs, full-width submit (min 44px height) | Same; max-width container | Same; optional max-width for readability |
| **Carousels** | Horizontal scroll with `overflow-x-hidden`, internal padding (e.g. `px-4`) | More gap between items | Larger gaps, optional padding |
| **Service cards** | Stacked list, adequate spacing | Grid (e.g. 2 columns) | More columns, hover effects enabled |
| **Animations** | Light or no motion; `prefers-reduced-motion` respected | Optional hover/scroll effects | Full hover/scroll effects (e.g. service card lift) |

---

## Mobile UX Risks and Mitigations

| Risk | Mitigation |
|------|------------|
| **Horizontal scroll** | `overflow-x: hidden` on `html`, `body`, and main `Layout`. Carousels use `overflow-x-hidden` with padding so content doesn’t touch viewport edges. No full-width content wider than 100vw. |
| **Tiny tap targets** | Buttons and nav links use `min-h-[44px]` or `h-11`. Hamburger is `min-w-[44px] min-h-[44px]`. Form submit and primary CTAs are at least 44px tall. |
| **Unreadable text** | Body `font-size: 1rem`, `line-height: 1.5`. Headings scale up with breakpoints. No body text below 16px. Inputs use `text-base` (16px) to avoid iOS zoom on focus. |
| **Layout shift (CLS)** | Hero background image has explicit `width` and `height` (1920×1080) and the wrapper has `min-h-[50vh]` / `md:min-h-[100dvh]` so space is reserved before load. Sections that need stable height use min-heights where appropriate. |
| **Heavy animations on mobile** | `prefers-reduced-motion` disables or simplifies animations globally. Hover-based effects (e.g. service card lift) are applied only at `md` and above via CSS. |

---

## QA Checklist

Run through these viewports and checks before release:

**Viewports to test**

- **320px** (iPhone SE)
- **360px** (common Android)
- **390px** (iPhone 13/14/15)
- **412px** (common Android)
- **430px** (large phones)
- Optionally: **768px**, **1024px** for tablet and desktop

**Per viewport, verify**

1. **No horizontal overflow** – No scrollbar on the page; no content clipped or extending past the right edge.
2. **No overlapping text** – Headlines, body, and labels don’t overlap each other or UI elements.
3. **No clipped buttons** – CTAs and nav items are fully visible and tappable (min 44×44px).
4. **Grids and carousels** – Service grid, vehicle types, and brand carousels layout correctly; no broken or overflowing tiles.
5. **Primary CTA** – “Get Started” / “Schedule a Call” (or equivalent) is visible above the fold or early in the flow and is clearly tappable.
6. **Forms** – Contact and Credit Application: inputs are full-width where intended, labels above fields, submit button full-width and at least 44px tall; no tiny or clipped fields.

**Pages and flows**

- **Home** – Hero, “How It Works,” and at least one CTA; scroll to one carousel and one content block.
- **Services** – Category pills, service cards, and at least one “Learn more” flow.
- **Contact** – Page hero, form in a single column, submit and (if applicable) success state.

---

## Structured Visual Descriptions (Mobile)

These describe the intended mobile layout for key screens. Use them for design review or to compare against screenshots taken at 320px–430px.

### Home (mobile)

- **Hero**: Full-width dark section. Headline and subtext centered; headline can wrap to multiple lines. Social proof (avatars + “X+ happy customers”) below the headline. Two CTAs stacked: primary “Get Started” (or similar), secondary “How it works” (or link). No second column; single vertical stack.
- **How It Works**: Directly below hero content, inside a card-style container. Linear steps (e.g. 1–5) with short labels; optional car icon or visual on the active step. No side-by-side layout; steps read top-to-bottom or in a compact horizontal strip that doesn’t overflow.
- **Below the fold**: Subsequent sections (e.g. vehicle types, brands, what we do) in single column or horizontal carousel with safe horizontal padding (16px). No horizontal page scroll.

### Services / Offer (mobile)

- **Page hero**: Title (e.g. “Services”) and breadcrumbs (Home > Services). Same dark style as other page heroes.
- **Category pills**: Horizontal row of filters (e.g. All Services, Leasing, Financing). Either wrapping or horizontally scrollable with no overflow; adequate spacing between pills.
- **Service cards**: Single column. Each card: icon, title, short description, “Learn more” (or similar) link. Adequate vertical spacing between cards; no cramped blocks. Tap targets for “Learn more” at least 44px where possible.

### Contact / Lead form (mobile)

- **Page hero**: “Contact” (or equivalent) title and short subtitle; breadcrumbs.
- **Form**: Single column inside a glass-style card. Fields full-width: name, email, phone, service (if shown), vehicle type (if shown), message. Labels above inputs. “Continue” (or “Send”) submit button full-width, minimum 44px height. No horizontal scroll; form stays within viewport width with 16px padding.

### Nav open state (mobile)

- **Header**: Logo on the left; hamburger (or close icon when open) on the right. Bar is full width.
- **Open menu**: Below the header, full-width list: Home, Services, Brands, About, Contact. Each row has minimum 44px height for tap target. At the bottom of the menu, a full-width “Schedule a Call” (or equivalent) button. Menu has a clear border-top and background consistent with the header (e.g. same dark/light theme). No horizontal scroll; menu content fits within viewport width.
