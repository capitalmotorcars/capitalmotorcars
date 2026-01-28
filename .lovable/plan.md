

# תוכנית: עדכון תמונות Coupe ו-Minivan בקרוסלת הרכבים

## סקירה
החלפת תמונות הקטגוריות Coupe ו-Minivan בקרוסלת סוגי הרכבים בתמונות החדשות שהעלית עם רקע שקוף.

---

## שלב 1: העתקת התמונות לפרויקט

| תמונה שהועלתה | יעד |
|---------------|-----|
| `user-uploads://258F_300.png` (BMW M8 Coupe לבן) | `src/assets/coupe-bmw-m8.png` |
| `user-uploads://1-ca762e28-removebg-preview.png` (Honda Odyssey שחור) | `src/assets/minivan-odyssey.png` |

---

## שלב 2: עדכון VehicleTypesCarousel.tsx

### שינויים ב-imports:
```typescript
// הוספת imports חדשים
import coupeImage from '@/assets/coupe-bmw-m8.png';
import minivanImage from '@/assets/minivan-odyssey.png';

// הסרת import הישן של minivan-staria.png
```

### שינויים במערך vehicleTypes:
```typescript
// שורות 36-43
{
  name: 'Coupe',
  image: coupeImage,  // במקום URL חיצוני
},
{
  name: 'Minivan',
  image: minivanImage,  // עדכון לתמונה החדשה
},
```

---

## קבצים שישתנו

| קובץ | פעולה |
|------|-------|
| `src/assets/coupe-bmw-m8.png` | יצירה - העתקה מהתמונה שהועלתה |
| `src/assets/minivan-odyssey.png` | יצירה - העתקה מהתמונה שהועלתה |
| `src/components/home/VehicleTypesCarousel.tsx` | עדכון - imports ומערך התמונות |

---

## תוצאה צפויה

- **Coupe**: תמונת BMW M8 לבנה עם רקע שקוף
- **Minivan**: תמונת Honda Odyssey שחורה עם רקע שקוף
- שתי התמונות ישתלבו בצורה נקייה ואחידה עם שאר התמונות בקרוסלה

