
# תוכנית: אנימציות ועיצוב מקצועי לכותרות העמודים

## סקירת המצב הנוכחי

כל עמודי המשנה (Services, Brands, About, Contact, Credit Application, Service Pages, Vehicle Pages) משתמשים ב-Hero sections פשוטים יחסית עם:
- כותרת וטקסט סטטיים ללא אנימציות
- רקע אחיד (`bg-primary`)
- חלק מהעמודים כוללים תמונות רכב עם אנימציית `drive-in`

## הגישה המוצעת

יצירת **PageHero קומפוננטה** אחידה שתספק חוויה מקצועית ומרשימה יותר:

| אלמנט | לפני | אחרי |
|-------|------|------|
| כותרת | סטטית | אנימציית fade-in עם stagger |
| תת-כותרת | סטטית | אנימציית slide-up מאוחרת |
| רקע | צבע אחיד | גרדיאנט עדין + אפקט particles/mesh |
| קו מפריד | ללא | קו אקסנט אנימטיבי |
| Breadcrumb | ללא | נתיב ניווט עדין |

## עיצוב ה-Hero החדש

```text
┌─────────────────────────────────────────────────────────────┐
│  ▓▓▓▓▓▓▓▓▓▓ רקע כהה עם mesh gradient עדין ▓▓▓▓▓▓▓▓▓▓        │
│                                                             │
│  Home > Services                    ← Breadcrumb עדין       │
│                                                             │
│  ━━━━━━                             ← קו אקסנט אנימטיבי     │
│  Our Services                       ← כותרת עם fade-in     │
│                                                             │
│  We offer practical automotive      ← תת-כותרת slide-up    │
│  solutions for customers...                                 │
│                                                             │
│                          ╭─────╮                            │
│                          │ 🚗  │   ← תמונת רכב (אם יש)     │
│                          ╰─────╯                            │
└─────────────────────────────────────────────────────────────┘
```

## אנימציות חדשות

### 1. קו אקסנט מתרחב
```css
@keyframes accent-line-expand {
  from { 
    width: 0; 
    opacity: 0;
  }
  to { 
    width: 64px; 
    opacity: 1;
  }
}
```

### 2. כותרת ראשית - Fade In עם Blur
```css
@keyframes hero-title-reveal {
  from { 
    opacity: 0; 
    transform: translateY(20px);
    filter: blur(8px);
  }
  to { 
    opacity: 1; 
    transform: translateY(0);
    filter: blur(0);
  }
}
```

### 3. תת-כותרת - Slide Up עם Delay
```css
@keyframes hero-subtitle-reveal {
  from { 
    opacity: 0; 
    transform: translateY(16px);
  }
  to { 
    opacity: 1; 
    transform: translateY(0);
  }
}
```

### 4. רקע Mesh Gradient
אפקט גרדיאנט עדין שמוסיף עומק לרקע ללא להסיח תשומת לב.

## קומפוננטה חדשה: PageHero

```tsx
interface PageHeroProps {
  title: string;
  subtitle?: string;
  breadcrumbs?: { label: string; href?: string }[];
  heroImage?: string;
  heroImageAlt?: string;
  children?: ReactNode;
}

export function PageHero({
  title,
  subtitle,
  breadcrumbs,
  heroImage,
  heroImageAlt,
  children
}: PageHeroProps) {
  return (
    <section className="relative bg-primary py-16 md:py-20 overflow-hidden">
      {/* Mesh gradient background */}
      <div className="absolute inset-0 bg-[radial-gradient(...)]" />
      
      <div className="container mx-auto px-4 lg:px-8 relative">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
          <div className="max-w-xl lg:max-w-2xl flex-shrink-0">
            {/* Breadcrumbs */}
            {breadcrumbs && (
              <nav className="animate-hero-breadcrumb mb-4">
                ...
              </nav>
            )}
            
            {/* Accent line */}
            <div className="w-16 h-1 bg-accent mb-6 animate-accent-line" />
            
            {/* Title */}
            <h1 className="animate-hero-title ...">
              {title}
            </h1>
            
            {/* Subtitle */}
            {subtitle && (
              <p className="animate-hero-subtitle ...">
                {subtitle}
              </p>
            )}
            
            {children}
          </div>
          
          {/* Hero Image */}
          {heroImage && (
            <div className="hidden lg:block">
              <img 
                src={heroImage} 
                alt={heroImageAlt}
                className="animate-car-drive-in ..."
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
```

## קבצים שיושפעו

| קובץ | פעולה |
|------|-------|
| `src/components/ui/PageHero.tsx` | **חדש** - קומפוננטת Hero אחידה |
| `src/index.css` | **עדכון** - הוספת keyframes חדשים |
| `src/pages/BrandsPage.tsx` | **עדכון** - שימוש ב-PageHero |
| `src/pages/ServicesPage.tsx` | **עדכון** - שימוש ב-PageHero |
| `src/pages/AboutPage.tsx` | **עדכון** - שימוש ב-PageHero |
| `src/pages/ContactPage.tsx` | **עדכון** - שימוש ב-PageHero |
| `src/pages/CreditApplicationPage.tsx` | **עדכון** - שימוש ב-PageHero |
| `src/components/services/ServiceTemplate.tsx` | **עדכון** - שימוש ב-PageHero |

## פרטים טכניים

### Mesh Gradient רקע
```css
bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,hsl(var(--accent)/0.15),transparent)]
```

### Stagger Delays
```css
.animate-hero-breadcrumb { animation-delay: 0s; }
.animate-accent-line { animation-delay: 0.1s; }
.animate-hero-title { animation-delay: 0.2s; }
.animate-hero-subtitle { animation-delay: 0.4s; }
```

### תמיכה ב-Reduced Motion
```css
@media (prefers-reduced-motion: reduce) {
  .animate-hero-title,
  .animate-hero-subtitle,
  .animate-accent-line,
  .animate-hero-breadcrumb {
    animation: none;
    opacity: 1;
    transform: none;
    filter: none;
  }
}
```

## תוצאה צפויה

- כותרות שנכנסות בצורה חלקה עם blur fade
- קו אקסנט כחול שמתרחב מימין לשמאל
- תחושת עומק עם mesh gradient
- Breadcrumbs עדינים לניווט ברור
- עקביות בכל עמודי המשנה
- חוויה מקצועית ומוכרת יותר

## דוגמה לשימוש

```tsx
// ServicesPage.tsx
<PageHero
  title="Our Services"
  subtitle="We offer practical automotive solutions for customers who want things done right and without unnecessary hassle."
  breadcrumbs={[
    { label: 'Home', href: '/' },
    { label: 'Services' }
  ]}
  heroImage={bmwM5}
  heroImageAlt="BMW M5"
/>
```
