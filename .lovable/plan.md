

# תוכנית: החלפת תמונת Hatchback בקרוסלה

## המצב הנוכחי

הקרוסלה משתמשת בתמונת Volkswagen מ-URL חיצוני עבור קטגוריית Hatchback:
```typescript
{
  name: 'Hatchback',
  slug: 'hatchback',
  image: 'https://pngimg.com/uploads/volkswagen/volkswagen_PNG1818.png',
}
```

## השינוי

החלפה בתמונת Audi RS5 השחורה שהעלית.

## שלבים

| שלב | פעולה |
|-----|-------|
| 1 | העתקת התמונה מ-`user-uploads://` ל-`src/assets/hatchback-audi-rs5.png` |
| 2 | הוספת import לתמונה בקובץ הקרוסלה |
| 3 | עדכון ה-image של Hatchback לשימוש בתמונה המיובאת |
| 4 | עדכון קובץ הנתונים `vehicleTypes.ts` בהתאמה |

## קבצים שישתנו

| קובץ | שינוי |
|------|-------|
| `src/assets/hatchback-audi-rs5.png` | חדש - התמונה שהעלית |
| `src/components/home/VehicleTypesCarousel.tsx` | עדכון import ו-image |
| `src/data/vehicleTypes.ts` | עדכון נתיב התמונה |

## קוד לאחר השינוי

```typescript
// VehicleTypesCarousel.tsx
import hatchbackImage from '@/assets/hatchback-audi-rs5.png';

const vehicleTypes = [
  // ...
  {
    name: 'Hatchback',
    slug: 'hatchback',
    image: hatchbackImage,  // במקום URL חיצוני
  },
  // ...
];
```

