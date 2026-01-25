
# מילוי אוטומטי של סוג השירות בדפי שירות ספציפיים

## סקירה
הוספת לוגיקה שממלאה אוטומטית את שדה "סוג השירות" בטופס יצירת קשר כאשר המשתמש נמצא בדף שירות ספציפי, והסתרת השדה כדי לפשט את חוויית המשתמש.

## שינויים נדרשים

### 1. עדכון ServiceTemplate.tsx
**מיקום:** `src/components/services/ServiceTemplate.tsx`

**שינויים:**
- הוספת prop חדש `serviceValue` ל-interface
- העברת ה-`serviceValue` ל-`ContactForm`

```typescript
// הוספה ל-interface
interface ServiceTemplateProps {
  // ... props קיימים
  serviceValue?: string;  // ערך השירות למילוי אוטומטי
}

// שינוי בקריאה ל-ContactForm (שורה 235)
<ContactForm 
  compact 
  initialValues={{ service: serviceValue }}
  hideServiceField={!!serviceValue}
/>
```

### 2. עדכון ContactForm.tsx
**מיקום:** `src/components/forms/ContactForm.tsx`

**שינויים:**
- הוספת prop חדש `hideServiceField` ל-interface
- הסתרת שדה השירות כאשר `hideServiceField={true}`

```typescript
// עדכון interface
interface ContactFormProps {
  compact?: boolean;
  initialValues?: Partial<ContactFormData>;
  hideServiceField?: boolean;  // חדש
}

// עדכון הקומפוננטה
export function ContactForm({ 
  compact = false, 
  initialValues, 
  hideServiceField = false 
}: ContactFormProps) {
  // ...
}

// הסתרת השדה (שורות 162-176)
{!hideServiceField && (
  <div className="space-y-2">
    <Label htmlFor="service">Service of Interest</Label>
    {/* ... Select component ... */}
  </div>
)}
```

### 3. עדכון כל דפי השירות
עדכון 6 קבצים להוספת `serviceValue`:

| קובץ | serviceValue |
|------|-------------|
| `CarLeasingPage.tsx` | `"leasing"` |
| `FinancingPage.tsx` | `"financing"` |
| `TradeInPage.tsx` | `"trade-in"` |
| `WearAndTearPage.tsx` | `"wear-tear"` |
| `WheelRepairPage.tsx` | `"wheel-repair"` |
| `DetailingPage.tsx` | `"detailing"` |

**דוגמה לשינוי ב-WearAndTearPage.tsx:**
```typescript
<ServiceTemplate
  title="Wear & Tear Repair"
  serviceValue="wear-tear"  // הוספה
  // ... שאר ה-props
/>
```

## תוצאה צפויה
- בדפי שירות ספציפיים: השדה מוסתר והערך נשלח אוטומטית
- בדף Contact הראשי: השדה נשאר גלוי ואופציונלי
- בדף הבית (QuickLeadCapture): ללא שינוי - השדה נשאר

## סיכום קבצים לעריכה
1. `src/components/forms/ContactForm.tsx` - הוספת `hideServiceField` prop
2. `src/components/services/ServiceTemplate.tsx` - הוספת `serviceValue` prop והעברתו לטופס
3. `src/pages/services/CarLeasingPage.tsx` - הוספת `serviceValue="leasing"`
4. `src/pages/services/FinancingPage.tsx` - הוספת `serviceValue="financing"`
5. `src/pages/services/TradeInPage.tsx` - הוספת `serviceValue="trade-in"`
6. `src/pages/services/WearAndTearPage.tsx` - הוספת `serviceValue="wear-tear"`
7. `src/pages/services/WheelRepairPage.tsx` - הוספת `serviceValue="wheel-repair"`
8. `src/pages/services/DetailingPage.tsx` - הוספת `serviceValue="detailing"`
