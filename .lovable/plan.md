
# תוכנית: החלפת תמונות קרוסלת הרכבים לתמונות PNG נקיות

## סקירה
החלפת תמונות ה-Unsplash הנוכחיות (שמכילות רקעים) בתמונות PNG שקופות של רכבים מתאימים לכל קטגוריה.

## שינויים נדרשים

### קובץ יחיד לעריכה
**`src/components/home/VehicleTypesCarousel.tsx`**

### פרטים טכניים

1. **החלפת מערך התמונות** (שורות 6-47)
   - החלפת כל ה-URLs מ-Unsplash ל-URLs של PNG שקופים
   - שימוש במקורות כמו pngimg.com או אתרים דומים שמספקים PNG שקופים של רכבים
   - וידוא שכל סוג רכב מקבל תמונה מתאימה:

| קטגוריה | תמונה נדרשת |
|---------|-------------|
| Sports | מכונית ספורט (כמו Porsche Taycan) |
| SUV | רכב שטח (כמו Jeep Cherokee) |
| Coupe | קופה (כמו Mercedes Coupe) |
| Minivan | מיניוואן (כמו Mercedes Metris) |
| Crossover | קרוסאובר (כמו Cadillac XT4) |
| Luxury | רכב יוקרה (כמו Mercedes S-Class) |
| Electric | רכב חשמלי (כמו Audi e-tron) |
| Hatchback | האצ'בק (כמו Mini Cooper) |
| Sedan | סדאן (כמו Audi A3) |
| Truck | טנדר (כמו Dodge RAM) |

2. **התאמת סגנון התמונה** (שורה 187)
   - הוספת `bg-transparent` לוודא שהרקע השקוף נשמר
   - שמירה על `object-contain` לתצוגה נכונה

## מבנה קוד לאחר השינוי

```typescript
const vehicleTypes = [
  {
    name: 'Sports',
    image: 'https://[PNG-source]/sports-car.png',
  },
  {
    name: 'SUV',
    image: 'https://[PNG-source]/suv.png',
  },
  // ... שאר הרכבים
];
```

## מקורות PNG אפשריים
- pngimg.com - תמונות PNG חינמיות ללא רקע
- cleanpng.com - PNG שקופים באיכות גבוהה
- freepnglogos.com - תמונות רכבים ללא רקע

## תוצאה צפויה
הקרוסלה תציג רכבים נקיים ללא רקע, בדיוק כמו בתמונות הדוגמה שסיפקת - עם הרכב בלבד על רקע אפור בהיר של האתר.
