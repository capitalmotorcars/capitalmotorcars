

# תוכנית: עדכון תמונות הרכבים עם רקע שקוף

## סקירה
החלפת תמונות הרכבים הקיימות בתמונות החדשות שהעלית עם רקע שקוף (transparent).

---

## שלב 1: העתקת התמונות לפרויקט

| תמונה שהועלתה | יעד |
|---------------|-----|
| `user-uploads://porsche-cayenne-BX2hfWZC-removebg-preview.png` | `src/assets/porsche-cayenne.png` |
| `user-uploads://mercedes-sclass-BU_Z0CrH-removebg-preview.png` | `src/assets/mercedes-sclass.png` |

---

## שלב 2: עדכון אוטומטי

**לא נדרשים שינויים בקוד** - הדפים כבר מייבאים את התמונות מאותם נתיבים:

- **AboutPage.tsx**: `import porscheCayenne from '@/assets/porsche-cayenne.png'`
- **BrandsPage.tsx**: `import mercedesSClass from '@/assets/mercedes-sclass.png'`

החלפת קבצי התמונות תעדכן אוטומטית את שני הדפים.

---

## תוצאה צפויה

- **דף About**: תמונת Porsche Cayenne GTS עם רקע שקוף שמשתלב מושלם עם הרקע הכהה
- **דף Brands**: תמונת Mercedes S-Class עם רקע שקוף שמשתלב מושלם עם הרקע הכהה
- אנימציית ה-drive-in תמשיך לעבוד כרגיל

---

## קבצים שישתנו

| קובץ | פעולה |
|------|-------|
| `src/assets/porsche-cayenne.png` | החלפה בתמונה השקופה |
| `src/assets/mercedes-sclass.png` | החלפה בתמונה השקופה |

