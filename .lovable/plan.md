

# תוכנית: מרכוז כותרת ה-Hero במובייל בלבד

## המצב הנוכחי

הכותרת והתוכן ב-Hero Section מיושרים לשמאל בכל גדלי המסך:

```tsx
<h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-3 lg:mb-5 leading-[1.1] hero-animate">
  Find Your Perfect Vehicle with <span className="text-accent">Zero Dealership Hassle</span>
</h1>
```

## השינוי המבוקש

מרכוז הכותרת במובייל בלבד (מתחת ל-768px), תוך שמירה על יישור לשמאל בטאבלט ודסקטופ.

## פתרון טכני

| אלמנט | מובייל | דסקטופ |
|-------|--------|--------|
| כותרת (h1) | `text-center` | `md:text-left` |
| Social Proof | `justify-center` | `sm:justify-start` |
| תיאור (p) | `text-center` | `md:text-left` |
| Container | `items-center` | `lg:items-start` |

## קוד לפני ואחרי

**לפני:**
```tsx
<div className="max-w-xl flex-shrink-0 z-10 lg:py-12">
  <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-3 lg:mb-5 leading-[1.1] hero-animate">
```

**אחרי:**
```tsx
<div className="max-w-xl flex-shrink-0 z-10 lg:py-12 text-center md:text-left">
  <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-3 lg:mb-5 leading-[1.1] hero-animate">
```

## שינויים נוספים

כדי שהמרכוז יראה טבעי, צריך גם:

1. **Social Proof badges** - מרכוז במובייל:
   ```tsx
   // מ:
   className="flex flex-col sm:flex-row flex-wrap items-start sm:items-center"
   // ל:
   className="flex flex-col sm:flex-row flex-wrap items-center justify-center md:justify-start"
   ```

2. **תיאור** - מרכוז במובייל:
   ```tsx
   // מ:
   className="text-base md:text-lg lg:text-xl mb-6"
   // ל:
   className="text-base md:text-lg lg:text-xl mb-6 mx-auto md:mx-0"
   ```

3. **כפתורים** - מרכוז במובייל:
   ```tsx
   // מ:
   className="flex flex-col sm:flex-row items-stretch sm:items-center"
   // ל:
   className="flex flex-col sm:flex-row items-center justify-center md:justify-start"
   ```

## קובץ שיעודכן

| קובץ | פעולה |
|------|-------|
| `src/components/hero/HeroSection.tsx` | עדכון classes למרכוז רספונסיבי |

## תוצאה צפויה

```text
מובייל (< 768px):              דסקטופ (≥ 768px):
┌─────────────────┐             ┌──────────────────────────────┐
│                 │             │ Find Your Perfect    │       │
│ Find Your       │             │ Vehicle with Zero    │ [IMG] │
│ Perfect Vehicle │             │ Dealership Hassle    │       │
│ with Zero       │             │                      │       │
│ Dealership      │             │ ★★★★★ 5/5 on Google  │       │
│ Hassle          │             │                      │       │
│                 │             │ Capital Motor Cars...│       │
│ ★★★★★ 5/5       │             │                      │       │
│                 │             │ [Start the process]  │       │
│ Capital Motor...│             └──────────────────────────────┘
│                 │
│ [Start process] │
└─────────────────┘
      ↑ הכל ממורכז               ↑ הכל לשמאל
```

