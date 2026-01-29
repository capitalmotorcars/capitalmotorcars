
# תוכנית: עמודי סוגי רכבים עם טופס יצירת קשר

## סקירה

כל רכב בקרוסלה יהפוך ללינק שמפנה לעמוד ייעודי המציג:
- מידע על סוג הרכב (יתרונות, למי מתאים, דוגמאות למותגים)
- גלריית תמונות
- טופס להשארת פרטים עם סוג הרכב מוגדר מראש

## מבנה הקבצים החדשים

```text
src/
├── pages/
│   └── vehicles/
│       ├── LuxuryPage.tsx
│       ├── ElectricPage.tsx
│       ├── HatchbackPage.tsx
│       ├── SedanPage.tsx
│       ├── TruckPage.tsx
│       ├── SportsPage.tsx
│       ├── SUVPage.tsx
│       ├── CoupePage.tsx
│       ├── MinivanPage.tsx
│       └── CrossoverPage.tsx
├── components/
│   └── vehicles/
│       └── VehicleTypeTemplate.tsx
└── data/
    └── vehicleTypes.ts
```

## שלב 1: יצירת קובץ נתונים מרכזי

קובץ `src/data/vehicleTypes.ts` יכיל את כל המידע על סוגי הרכבים:

```typescript
export interface VehicleType {
  slug: string;           // luxury, electric, sedan...
  name: string;           // Luxury, Electric, Sedan...
  image: string;          // תמונה ראשית
  description: string;    // תיאור קצר
  highlights: string[];   // יתרונות עיקריים
  idealFor: string[];     // למי מתאים
  popularBrands: string[];// מותגים פופולריים
  features: string[];     // תכונות
}
```

## שלב 2: יצירת תבנית VehicleTypeTemplate

תבנית דומה ל-ServiceTemplate עם הסקשנים:

| סקשן | תוכן |
|------|------|
| Hero | תמונת רכב גדולה + שם הקטגוריה + תיאור |
| Highlights | יתרונות עיקריים של סוג הרכב |
| Ideal For | למי סוג הרכב מתאים |
| Popular Brands | לוגואים של מותגים רלוונטיים |
| Key Features | תכונות בולטות |
| Contact Form | טופס עם סוג הרכב מוגדר מראש |

## שלב 3: עדכון הקרוסלה

שינוי ב-`VehicleTypesCarousel.tsx`:

**לפני:**
```tsx
<div className="flex-shrink-0 flex flex-col items-center group cursor-pointer">
```

**אחרי:**
```tsx
<Link 
  to={`/vehicles/${type.slug}`}
  className="flex-shrink-0 flex flex-col items-center group"
>
```

## שלב 4: הוספת Routes

עדכון `App.tsx` להוספת הנתיבים החדשים:

```tsx
import LuxuryPage from "./pages/vehicles/LuxuryPage";
// ... imports נוספים

<Route path="/vehicles/luxury" element={<LuxuryPage />} />
<Route path="/vehicles/electric" element={<ElectricPage />} />
<Route path="/vehicles/hatchback" element={<HatchbackPage />} />
<Route path="/vehicles/sedan" element={<SedanPage />} />
<Route path="/vehicles/truck" element={<TruckPage />} />
<Route path="/vehicles/sports" element={<SportsPage />} />
<Route path="/vehicles/suv" element={<SUVPage />} />
<Route path="/vehicles/coupe" element={<CoupePage />} />
<Route path="/vehicles/minivan" element={<MinivanPage />} />
<Route path="/vehicles/crossover" element={<CrossoverPage />} />
```

## שלב 5: עדכון טופס יצירת קשר

הוספת אפשרות לסוגי רכבים ב-`ContactForm.tsx`:

```typescript
const vehicleTypes = [
  { value: 'luxury', label: 'Luxury Vehicle' },
  { value: 'electric', label: 'Electric Vehicle' },
  { value: 'sedan', label: 'Sedan' },
  // ...
];

// הוספת prop חדש
interface ContactFormProps {
  vehicleType?: string;  // חדש
  hideVehicleField?: boolean;  // חדש
}
```

## דוגמה לעמוד רכב (LuxuryPage.tsx)

```tsx
import { VehicleTypeTemplate } from '@/components/vehicles/VehicleTypeTemplate';

export default function LuxuryPage() {
  return (
    <VehicleTypeTemplate
      name="Luxury"
      slug="luxury"
      metaTitle="Luxury Car Leasing | Capital Motor Cars"
      metaDescription="Discover premium luxury vehicles from Mercedes, BMW, Audi and more. Expert guidance for your next luxury car lease."
      heroImage="..."
      description="Experience the pinnacle of automotive excellence with our curated selection of luxury vehicles."
      highlights={[
        "Premium materials and craftsmanship",
        "Advanced technology and safety features",
        "Superior comfort and ride quality",
        "Prestigious brand heritage",
      ]}
      idealFor={[
        "Executive professionals",
        "Those who appreciate fine craftsmanship",
        "Drivers seeking ultimate comfort",
        "Anyone wanting a premium driving experience",
      ]}
      popularBrands={['Mercedes-Benz', 'BMW', 'Audi', 'Lexus', 'Porsche']}
      features={[
        "Leather interiors",
        "Premium sound systems",
        "Advanced driver assistance",
        "Adaptive suspension",
      ]}
    />
  );
}
```

## תוצאה צפויה

- 10 עמודים חדשים לסוגי רכבים
- לחיצה על רכב בקרוסלה מפנה לעמוד הייעודי
- כל עמוד מכיל מידע מפורט + טופס יצירת קשר
- סוג הרכב מוגדר אוטומטית בטופס
- SEO מותאם לכל עמוד

## קבצים שישתנו/יווצרו

| קובץ | פעולה |
|------|-------|
| `src/data/vehicleTypes.ts` | חדש - נתוני סוגי רכבים |
| `src/components/vehicles/VehicleTypeTemplate.tsx` | חדש - תבנית העמוד |
| `src/pages/vehicles/*.tsx` | חדש - 10 עמודי רכב |
| `src/components/home/VehicleTypesCarousel.tsx` | עדכון - הוספת לינקים |
| `src/App.tsx` | עדכון - הוספת routes |
| `src/components/forms/ContactForm.tsx` | עדכון - תמיכה בסוג רכב |
