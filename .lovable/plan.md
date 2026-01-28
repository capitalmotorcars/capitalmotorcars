

# תוכנית: גרסה ממורכזת של Hero Section

## סקירה
יצירת גרסה חדשה של ה-Hero עם תוכן ממורכז ופריסה לרוחב מלא, תוך שמירה על כל האלמנטים הקיימים.

---

## עיצוב מוצע

```text
┌─────────────────────────────────────────────────────────────────┐
│                         [Background Image]                       │
│                                                                   │
│              Find Your Perfect Vehicle with                       │
│              Zero Dealership Hassle                               │
│                                                                   │
│           [👤👤👤👤 15k+ Customers] [⭐⭐⭐⭐⭐ 5/5 on Google]       │
│                                                                   │
│     Capital Motor Cars is your trusted automotive partner...      │
│                                                                   │
│              [Schedule a Call]    View Services                   │
│                One conversation. No pressure.                      │
│                                                                   │
│  ┌──────┐  ┌──────┐  ┌──────┐  ┌──────┐  ┌──────┐               │
│  │  1   │  │  2   │  │  3   │  │  4   │  │  5   │               │
│  │ 🎧  │→│ 🔍  │→│ ✓   │→│ ⚙️  │→│ 📍  │               │
│  │Consul│  │Search│  │Approv│  │AddOns│  │Deliv │               │
│  └──────┘  └──────┘  └──────┘  └──────┘  └──────┘               │
│                                                                   │
│              [Active Step Description Panel]                      │
└─────────────────────────────────────────────────────────────────┘
```

---

## שינויים עיקריים

### 1. HeroSection.tsx - פריסה ממורכזת

| אלמנט | לפני | אחרי |
|-------|------|------|
| Container | `flex-col lg:flex-row` | `flex-col items-center text-center` |
| כותרת | `max-w-xl text-left` | `max-w-3xl text-center` |
| Social Proof | `flex-wrap items-center` | `flex justify-center` |
| תיאור | `max-w-lg text-left` | `max-w-2xl text-center mx-auto` |
| CTAs | `items-start sm:items-center` | `justify-center` |
| Process Viz | בצד ימין | מתחת לתוכן, רוחב מלא |

### 2. CircularProcessVisualization - גרסה אופקית

יצירת מצב תצוגה חדש **HorizontalProcessVisualization** עבור Desktop:
- 5 שלבים בשורה אופקית
- חיצים או קווים מחברים בין השלבים
- Active step מודגש עם accent
- Description panel מתחת

---

## פרטים טכניים

### שינויים ב-HeroSection.tsx

```typescript
// מבנה חדש
<div className="relative container mx-auto px-4 lg:px-8">
  <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
    {/* Centered Content */}
    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-[1.1]">
      ...
    </h1>
    
    {/* Social Proof - centered */}
    <div className="flex flex-wrap justify-center gap-2 lg:gap-3 mb-5">
      ...
    </div>
    
    {/* Description - centered */}
    <p className="text-lg md:text-xl mb-8 max-w-2xl">
      ...
    </p>
    
    {/* CTAs - centered */}
    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
      ...
    </div>
  </div>
  
  {/* Process Steps - horizontal below content */}
  <div className="mt-12 lg:mt-16 w-full max-w-5xl mx-auto">
    <HorizontalProcessVisualization />
  </div>
</div>
```

### קומפוננטה חדשה: HorizontalProcessVisualization.tsx

- שורה של 5 כרטיסים אופקיים
- קווים מחברים בין השלבים
- Active state עם border accent
- מתחת: תיאור השלב הפעיל

---

## קבצים שישתנו

| קובץ | פעולה |
|------|-------|
| `src/components/hero/HeroSection.tsx` | עדכון מבנה לפריסה ממורכזת |
| `src/components/hero/HorizontalProcessVisualization.tsx` | יצירה - תצוגת שלבים אופקית |

---

## יתרונות הגרסה הממורכזת

- **מראה מודרני ואימפקטי יותר** - המסר המרכזי בולט
- **זרימה טבעית** - תוכן → CTA → How It Works
- **רספונסיביות טובה יותר** - המבנה מתאים לכל גודל מסך
- **פחות עומס ויזואלי** - ללא פיצול לשני עמודים

