
# Fix Scroll Behavior Across the Site

## Overview
Implement consistent scroll-to-top behavior for all page navigations and proper anchor scrolling for same-page sections.

## Current State
- No `ScrollToTop` component exists
- Global `scroll-behavior: smooth` is set in `index.css`
- All pages use React Router's `Link` component for navigation
- Layout component wraps all pages but has no scroll management

## Solution

### 1. Create ScrollToTop Component
**New file:** `src/components/ScrollToTop.tsx`

This component will:
- Listen to route changes using `useLocation` from react-router-dom
- Scroll to top (position 0) on every pathname change using `behavior: "instant"` for immediate positioning
- Handle anchor links by scrolling to the target element when the hash changes

```text
+---------------------------+
|     ScrollToTop.tsx       |
+---------------------------+
|  useLocation()            |
|    ├─ pathname changed?   |
|    │    → scrollTo(0,0)   |
|    └─ hash present?       |
|         → scrollIntoView  |
+---------------------------+
```

### 2. Integrate in App.tsx
**File:** `src/App.tsx`

Add the `ScrollToTop` component inside `BrowserRouter` so it has access to the router context:

```text
BrowserRouter
  ├─ ScrollToTop  ← NEW
  └─ Routes
       ├─ HomePage
       ├─ ServicesPage
       └─ ...
```

## Technical Details

### ScrollToTop Component Logic:

```typescript
// Pseudocode structure
const { pathname, hash } = useLocation();

useEffect(() => {
  if (hash) {
    // Anchor navigation - scroll to element
    const element = document.getElementById(hash.slice(1));
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  } else {
    // Page navigation - instant scroll to top
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }
}, [pathname, hash]);
```

### Why `behavior: 'instant'`?
- Prevents the page from visibly scrolling from a previous position
- User immediately sees the top of the new page
- More professional UX for page transitions

### Anchor Handling:
- Detects `#section-id` in URL
- Uses `scrollIntoView` with `behavior: 'smooth'` for a polished experience
- Uses `block: 'start'` to snap section to viewport top

## Files to Modify

| File | Action |
|------|--------|
| `src/components/ScrollToTop.tsx` | Create new component |
| `src/App.tsx` | Import and add ScrollToTop inside BrowserRouter |

## Expected Behavior After Implementation

| User Action | Result |
|-------------|--------|
| Click header nav link | New page loads at top |
| Click footer link | New page loads at top |
| Click CTA button | Destination page at top |
| Click anchor link (e.g., `#contact`) | Smooth scroll to section, snapped to top |
| Back/Forward browser buttons | Page loads at top (no position restoration) |

## Edge Cases Handled
- Mobile menu links (already using standard `Link` components)
- External links (unchanged - open in new tab)
- Same-page anchor links with hash
- Browser history navigation
