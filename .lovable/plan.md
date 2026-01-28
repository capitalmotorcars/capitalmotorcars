

# תוכנית: סקשן "What We Do" עתידני ומרשים

## הבעיה הנוכחית

הסקשן הקיים משתמש בגריד בסיסי עם כרטיסים לבנים - נראה כמו תבנית Bootstrap/Tailwind סטנדרטית. חסרים אלמנטים ויזואליים ייחודיים.

---

## קונספט חדש: "Glowing Hexagon Hub"

עיצוב בהשראת dashboard עתידני עם:
- **רקע כהה** (כמו Hero) עם גרדיאנט עדין
- **קווים זוהרים** שמחברים בין השירותים
- **אייקונים עם אפקט glow** פעיל
- **כרטיסים זכוכית** (glassmorphism עדין)
- **אנימציית hover** עם ripple effect

```text
Desktop Layout:
┌────────────────────────────────────────────────────────────────────┐
│  ▓▓▓▓▓▓▓▓▓▓ רקע כהה עם gradient עדין ▓▓▓▓▓▓▓▓▓▓▓                 │
│                                                                    │
│                      ╔═══════════════╗                             │
│                      ║  What We Do   ║                             │
│                      ╚═══════════════╝                             │
│                                                                    │
│      ┌─────────┐          ┌─────────┐          ┌─────────┐        │
│      │ ◉ glow  │──────────│ ◉ glow  │──────────│ ◉ glow  │        │
│      │ Leasing │          │ Finance │          │Trade-In │        │
│      │  ▪▪▪    │          │  ▪▪▪    │          │  ▪▪▪    │        │
│      └─────────┘          └─────────┘          └─────────┘        │
│            │                   │                   │               │
│            └───────────────────┼───────────────────┘               │
│                               ╱│╲                                  │
│      ┌─────────┐          ┌─────────┐          ┌─────────┐        │
│      │ ◉ glow  │          │ ◉ glow  │          │ ◉ glow  │        │
│      │ Repair  │          │ Wheels  │          │Detailing│        │
│      └─────────┘          └─────────┘          └─────────┘        │
│                                                                    │
└────────────────────────────────────────────────────────────────────┘
```

---

## אלמנטים עתידניים

### 1. רקע כהה דינמי
- גרדיאנט עדין מכחול כהה לשחור
- "Noise texture" עדין ברקע
- נקודות זוהרות קטנות (כמו כוכבים) - CSS only

### 2. כרטיסים בסגנון Glass
```css
/* Glassmorphism עדין */
background: rgba(255, 255, 255, 0.03);
backdrop-filter: blur(10px);
border: 1px solid rgba(255, 255, 255, 0.08);
```

### 3. קווים מחברים זוהרים
- קווי SVG עדינים בין הכרטיסים
- אפקט gradient על הקווים
- אנימציית "pulse" עדינה שרצה על הקו

### 4. אייקונים עם Glow Effect
```css
/* Icon glow */
box-shadow: 0 0 30px rgba(31, 106, 225, 0.4);
```
- ב-hover: הזוהר מתחזק
- אפקט "breathing" עדין (scale 1 -> 1.05)

### 5. Hover State משודרג
- Border gradient מסביב לכרטיס
- טקסט נהיה בהיר יותר
- אייקון גדל מעט עם glow מוגבר

---

## פרטי המימוש

### קובץ: `src/components/home/WhatWeDoSection.tsx`

**מבנה חדש:**

```typescript
// Service card with glow effect
function ServiceCard({ service, index, isActive, onHover }) {
  return (
    <Link className="group relative">
      {/* Glow backdrop */}
      <div className="absolute inset-0 rounded-2xl bg-accent/20 blur-3xl 
                      opacity-0 group-hover:opacity-60 transition-opacity" />
      
      {/* Glass card */}
      <div className="relative p-6 rounded-2xl 
                      bg-white/[0.03] backdrop-blur-md
                      border border-white/[0.08]
                      group-hover:border-accent/30">
        
        {/* Glowing icon */}
        <div className="relative w-14 h-14 rounded-xl 
                        bg-accent/10 flex items-center justify-center
                        shadow-[0_0_30px_rgba(31,106,225,0.3)]
                        group-hover:shadow-[0_0_40px_rgba(31,106,225,0.5)]">
          <Icon className="w-7 h-7 text-accent" />
        </div>
        
        {/* Content */}
        <h3 className="text-white font-semibold mt-4">{title}</h3>
        <p className="text-white/60 group-hover:text-white/80">{desc}</p>
        
        {/* Arrow indicator */}
        <ArrowRight className="text-accent opacity-0 group-hover:opacity-100" />
      </div>
      
      {/* Animated border gradient on hover */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100
                      bg-gradient-to-r from-accent/50 via-accent to-accent/50
                      -z-10 blur-sm" />
    </Link>
  );
}

// Connecting lines component (SVG)
function ConnectingLines() {
  return (
    <svg className="absolute inset-0 pointer-events-none">
      {/* Animated gradient lines between cards */}
      <line className="stroke-accent/20" />
      <circle className="animate-pulse fill-accent/40" /> {/* Pulse effect on line */}
    </svg>
  );
}
```

### קובץ: `src/index.css`

אנימציות חדשות:
```css
/* Glow pulse animation */
@keyframes glow-pulse {
  0%, 100% { box-shadow: 0 0 30px rgba(31, 106, 225, 0.3); }
  50% { box-shadow: 0 0 40px rgba(31, 106, 225, 0.5); }
}

/* Line flow animation */
@keyframes line-flow {
  0% { stroke-dashoffset: 100; }
  100% { stroke-dashoffset: 0; }
}
```

---

## Grid Layout

```text
Desktop (6 cards in 2 rows):
┌──────┐  ┌──────┐  ┌──────┐
│  1   │──│  2   │──│  3   │
└──────┘  └──────┘  └──────┘
    │         │         │
    └─────────┼─────────┘
              │
┌──────┐  ┌──────┐  ┌──────┐
│  4   │──│  5   │──│  6   │
└──────┘  └──────┘  └──────┘

Mobile (stacked with connecting line on side):
│ ○ Service 1
├─┤
│ ○ Service 2
├─┤
│ ○ Service 3
...
```

---

## קבצים שישתנו

| קובץ | פעולה |
|------|-------|
| `src/components/home/WhatWeDoSection.tsx` | שכתוב מלא - עיצוב עתידני |
| `src/index.css` | הוספת אנימציות glow ו-line-flow |

---

## מה נשמר

- 6 השירותים והקישורים
- הטקסטים הקיימים
- תאימות למותג (כחול accent)
- רספונסיביות מלאה

---

## תוצאה צפויה

- **מראה עתידני** - לא נראה כמו תבנית רגילה
- **אלמנטים ויזואליים ייחודיים** - קווים זוהרים, glassmorphism
- **אינטראקטיביות** - hover effects מרשימים
- **רקע כהה** - בולט מהשאר ויוצר עניין
- **אנימציות עדינות** - תחושה premium, לא "רועשת"

