

# תוכנית: הוספת תמונות רכב לדפי About ו-Brands

## סקירה
הוספת תמונות רכב יוקרתיות עם אנימציית כניסה (drive-in) לכותרות ההירו בשני דפים:
- **About Page** - Porsche Cayenne GTS
- **Brands Page** - Mercedes S-Class

---

## שלב 1: יצירת תמונות הרכבים

### 1.1 Porsche Cayenne GTS
- יצירת תמונה איכותית של Porsche Cayenne GTS עדכני (2024)
- רקע שקוף או כהה שמשתלב עם הרקע הכהה של ההירו
- זווית צד-קדמית דינמית שמתאימה לאנימציית הכניסה מימין
- שמירה כ: `src/assets/porsche-cayenne.png`

### 1.2 Mercedes S-Class
- יצירת תמונה איכותית של Mercedes S-Class עדכני (2024)
- אותו סגנון - רקע שקוף/כהה
- זווית צד-קדמית
- שמירה כ: `src/assets/mercedes-sclass.png`

---

## שלב 2: עדכון דף About

### שינויים ב-`src/pages/AboutPage.tsx`:

```text
לפני:
<section className="bg-primary py-20 md:py-28">
  <div className="container mx-auto px-4 lg:px-8">
    <h1>...</h1>
    <p>...</p>
  </div>
</section>

אחרי:
<section className="bg-primary py-16 md:py-20 overflow-hidden">
  <div className="container mx-auto px-4 lg:px-8">
    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
      {/* Text Content */}
      <div className="max-w-xl lg:max-w-2xl flex-shrink-0">
        <h1>...</h1>
        <p>...</p>
      </div>
      {/* Porsche Cayenne GTS Image */}
      <div className="hidden lg:block flex-shrink-0">
        <img 
          src={porscheCayenne} 
          alt="Porsche Cayenne GTS" 
          className="w-[400px] xl:w-[480px] h-auto object-contain drop-shadow-2xl animate-car-drive-in"
        />
      </div>
    </div>
  </div>
</section>
```

- הוספת import לתמונה
- שינוי layout ל-flexbox עם טקסט משמאל ותמונה מימין
- הוספת `overflow-hidden` למניעת גלילה אופקית באנימציה
- התמונה מוצגת רק בדסקטופ (`hidden lg:block`)
- אנימציית `animate-car-drive-in` שכבר קיימת ב-CSS

---

## שלב 3: עדכון דף Brands

### שינויים ב-`src/pages/BrandsPage.tsx`:

אותו פורמט בדיוק כמו דף About:

```text
לפני:
<section className="bg-primary py-20 md:py-28">
  <div className="container mx-auto px-4 lg:px-8">
    <h1>Brands We Work With</h1>
    <p>...</p>
  </div>
</section>

אחרי:
<section className="bg-primary py-16 md:py-20 overflow-hidden">
  <div className="container mx-auto px-4 lg:px-8">
    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
      {/* Text Content */}
      <div className="max-w-xl lg:max-w-2xl flex-shrink-0">
        <h1>Brands We Work With</h1>
        <p>...</p>
      </div>
      {/* Mercedes S-Class Image */}
      <div className="hidden lg:block flex-shrink-0">
        <img 
          src={mercedesSClass} 
          alt="Mercedes S-Class" 
          className="w-[400px] xl:w-[480px] h-auto object-contain drop-shadow-2xl animate-car-drive-in"
        />
      </div>
    </div>
  </div>
</section>
```

---

## פרטים טכניים

### אנימציה (כבר קיימת ב-index.css)
```css
@keyframes carDriveIn {
  from {
    opacity: 0;
    transform: translateX(100px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.animate-car-drive-in {
  animation: carDriveIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}
```

### תאימות נגישות
- תגיות alt מתאימות לכל תמונה
- `prefers-reduced-motion` כבר מטופל ב-CSS הקיים

### רספונסיביות
- במובייל: התמונות מוסתרות (`hidden lg:block`) לשמירה על חוויה נקייה
- בדסקטופ: התמונות מופיעות בצד ימין עם האנימציה

---

## קבצים שיווצרו/ישתנו

| קובץ | פעולה |
|------|-------|
| `src/assets/porsche-cayenne.png` | יצירה - תמונת Porsche Cayenne GTS |
| `src/assets/mercedes-sclass.png` | יצירה - תמונת Mercedes S-Class |
| `src/pages/AboutPage.tsx` | עדכון - הוספת תמונה להירו |
| `src/pages/BrandsPage.tsx` | עדכון - הוספת תמונה להירו |

