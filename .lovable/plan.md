

# תוכנית: עיצוב מחדש של סקשן "What We Do" - מראה חדשני ופרימיום

## מצב קיים

הסקשן הנוכחי משתמש ב:
- גריד פשוט של 3x3 עם ServiceCards
- חלוקה ל-"Core services" ו-"Supporting services" עם תוויות טקסט
- כרטיסים לבנים עם אייקון בצד שמאל וטקסט בצד ימין
- אפקט hover בסיסי (העלאה של 3px)

**בעיה**: מראה גנרי מדי, "שטוח", נראה כמו תבנית סטנדרטית

---

## עיצוב חדש: "Bento Grid" Premium

קונספט בהשראת עיצוב Apple/Vercel - גריד אסימטרי עם כרטיסים בגדלים שונים, דגש ויזואלי על שירותים עיקריים.

```text
Desktop Layout:
┌────────────────────────────────────────────────────────────┐
│                      What We Do                            │
│    We support customers at every stage...                  │
├──────────────────────────────┬─────────────────────────────┤
│                              │                             │
│   ┌──────────────────────┐   │   ┌───────────────────────┐ │
│   │  🚗 Vehicle Leasing  │   │   │  💳 Financing         │ │
│   │  (FEATURED - large)  │   │   │  (medium card)        │ │
│   │                      │   │   ├───────────────────────┤ │
│   │  Gradient border     │   │   │  🔄 Trade-In          │ │
│   │  Animated icon       │   │   │  (medium card)        │ │
│   └──────────────────────┘   │   └───────────────────────┘ │
├──────────────────────────────┴─────────────────────────────┤
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐ │
│  │ 🔧 Wear     │  │ ⚙️ Wheel    │  │ ✨ Detailing       │ │
│  │ & Tear     │  │ Repair      │  │                     │ │
│  └─────────────┘  └─────────────┘  └─────────────────────┘ │
└────────────────────────────────────────────────────────────┘

Mobile Layout:
┌─────────────────────┐
│  🚗 Vehicle Leasing │ ← Featured, full-width
│  (larger card)      │
├─────────────────────┤
│  💳 Financing       │
├─────────────────────┤
│  🔄 Trade-In        │
├─────────────────────┤
│  🔧 │ ⚙️ │ ✨      │ ← 3 compact cards in row
└─────────────────────┘
```

---

## אלמנטים חדשניים (לא נראים כמו AI)

### 1. Featured Card - כרטיס ראשי מודגש
- גודל גדול יותר (span 2 שורות)
- Subtle gradient border (לא גרדיאנט בולט)
- אייקון עם אנימציה עדינה (pulse קל)
- רקע עם texture עדין

### 2. Micro-interactions
- אפקט hover עם "glow" עדין סביב האייקון
- קו תחתון מונפש ב-accent color
- Staggered reveal animation (כרטיסים נכנסים בזה אחר זה)

### 3. Visual Hierarchy
- Core services: גודל גדול יותר, מיקום עליון
- Supporting services: שורה תחתונה קומפקטית
- אין תוויות "Core/Supporting" - ההיררכיה ויזואלית בלבד

### 4. Typography עם אופי
- כותרות שירות ב-font-weight 600
- תיאורים ב-opacity נמוך יותר שעולה ב-hover
- מספר שורה ("01", "02"...) עדין בפינה

---

## פרטים טכניים

### קובץ חדש: `src/components/home/WhatWeDoSection.tsx`

קומפוננטה ייעודית במקום השימוש ב-ServiceCard הגנרי.

**מבנה:**
```typescript
// Featured service card component
const FeaturedServiceCard = ({ service, index }) => (
  <Link className="group relative col-span-2 row-span-2 md:col-span-1 ...">
    {/* Number badge */}
    <span className="absolute top-4 right-4 text-xs text-muted-foreground/40 font-mono">
      0{index + 1}
    </span>
    
    {/* Icon with glow effect */}
    <div className="relative">
      <div className="absolute inset-0 bg-accent/20 blur-xl group-hover:bg-accent/30 transition-opacity" />
      <Icon className="relative z-10 w-10 h-10 text-accent" />
    </div>
    
    {/* Content */}
    <h3>...</h3>
    <p>...</p>
    
    {/* Animated bottom border */}
    <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-accent group-hover:w-full transition-all duration-300" />
  </Link>
);

// Compact service card for supporting services
const CompactServiceCard = ({ service, index }) => (
  <Link className="group flex items-center gap-3 p-4 ...">
    <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center">
      <Icon className="w-4 h-4 text-muted-foreground group-hover:text-accent transition-colors" />
    </div>
    <span className="font-medium text-sm">{service.title}</span>
    <ArrowRight className="ml-auto w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
  </Link>
);
```

### Grid Layout (CSS)
```css
/* Bento-style asymmetric grid */
.services-grid {
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 1.5rem;
}

/* Featured card spans full height */
.featured-card {
  grid-row: 1 / 3;
}
```

### עדכון HomePage.tsx
החלפת הסקשן הקיים בקומפוננטה החדשה:
```typescript
// Before
<section className="pt-8 md:pt-14 pb-12 md:pb-28 bg-background">
  ...ServiceCards...
</section>

// After
<WhatWeDoSection />
```

---

## קבצים שישתנו

| קובץ | פעולה |
|------|-------|
| `src/components/home/WhatWeDoSection.tsx` | יצירה - סקשן חדש לגמרי |
| `src/pages/HomePage.tsx` | עדכון - החלפת הסקשן הקיים |

---

## מה נשמר

- כל 6 השירותים והקישורים
- הטקסטים הקיימים (ללא שינוי בקופי)
- הפונקציונליות (לינקים לדפי שירות)
- צבעים ותאימות למותג

---

## תוצאה צפויה

- **מראה חדשני** - לא עיצוב "תבנית" גנרי
- **היררכיה ברורה** - שירותים עיקריים בולטים ויזואלית
- **אינטראקציות עדינות** - תחושה מקצועית ולא "רועשת"
- **לא נראה כמו AI** - פריסה אסימטרית, פרטים ייחודיים

