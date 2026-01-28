

# תוכנית: כל הכרטיסים באותו גודל

## הבעיה

כרגע גובה הכרטיסים נקבע לפי התוכן שלהם. כרטיסים עם תיאורים ארוכים יותר גבוהים יותר מכרטיסים עם תיאורים קצרים.

## הפתרון

הוספת `h-full` לכרטיסים כדי שימלאו את כל הגובה הזמין בגריד, ו-`items-stretch` לגריד עצמו כדי להבטיח שכל הכרטיסים באותה שורה יהיו באותו גובה.

## שינויים

### קובץ: `src/components/home/WhatWeDoSection.tsx`

| מיקום | שינוי |
|-------|-------|
| שורה 64 | הוספת `h-full` ל-Link הראשי |
| שורה 71 | הוספת `h-full flex flex-col` ל-Glass card |
| שורה 108-116 | הוספת `flex-grow` לאזור התוכן כדי שידחוף את החץ למטה |

**לפני:**
```tsx
<Link className="group relative block">
  <div className="relative p-6 md:p-8 rounded-2xl overflow-hidden ...">
```

**אחרי:**
```tsx
<Link className="group relative block h-full">
  <div className="relative h-full flex flex-col p-6 md:p-8 rounded-2xl overflow-hidden ...">
```

וכן הוספת `flex-grow` לאזור התוכן:
```tsx
<div className="relative z-10 flex-grow">
```

## תוצאה

- כל 6 הכרטיסים יהיו באותו גובה
- התוכן יתפרס בצורה אחידה
- החץ "Learn more" תמיד יהיה בתחתית הכרטיס

