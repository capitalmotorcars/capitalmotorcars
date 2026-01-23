
# החלפת Prompt Chips ב-Dropdown

## סיכום
נחליף את כפתורי ההצעות (chips) ב-dropdown קומפקטי שמציע נושאים להתחלת השיחה. הבחירה תכניס את הטקסט לשדה ההודעה, והמשתמש יוכל לערוך אותו.

## שינויים

### 1. עדכון מבנה שדה ההודעה

**לפני:**
- טקסט עזרה
- 5 כפתורי chips שתופסים הרבה מקום
- שדה Textarea

**אחרי:**
- Label + dropdown קטן באותה שורה
- שדה Textarea מתחת

### 2. עיצוב ה-Dropdown

- **Placeholder**: "Need help getting started?"
- **אפשרויות** (מקוצרות לתצוגה ידידותית):
  1. "Lease a new car"
  2. "Get a price quote"
  3. "Budget-based recommendations"
  4. "Trade-in value"
  5. "General guidance"

- בבחירה, הטקסט המלא יוכנס ל-textarea
- ה-dropdown יתאפס אחרי הבחירה (כדי שאפשר לבחור שוב)

### 3. קוד טכני

```typescript
// מיפוי בין תוויות קצרות לטקסט מלא
const messageSuggestions = [
  { 
    value: 'lease', 
    label: 'Lease a new car',
    fullText: "I'm looking to lease a new car and want to understand my options."
  },
  { 
    value: 'quote', 
    label: 'Get a price quote',
    fullText: "I'd like a price quote for a specific vehicle."
  },
  // ...
];

// Handler לבחירה מה-dropdown
const handleSuggestionSelect = (value: string) => {
  const suggestion = messageSuggestions.find(s => s.value === value);
  if (suggestion) {
    setValue('message', suggestion.fullText, { shouldValidate: false });
    setTimeout(() => {
      textareaRef.current?.focus();
      // Move cursor to end
    }, 0);
  }
};
```

### 4. פריסה חדשה

```
┌─────────────────────────────────────────────────┐
│ Message *          [Need help getting started?▾]│
├─────────────────────────────────────────────────┤
│                                                 │
│  You can edit the message or write your own…   │
│                                                 │
│                                                 │
└─────────────────────────────────────────────────┘
```

- ה-Label וה-dropdown יהיו באותה שורה עם `flex justify-between`
- ה-dropdown יהיה קטן וסגנון secondary

## קבצים לעדכון

| קובץ | שינוי |
|------|-------|
| `src/components/forms/ContactForm.tsx` | החלפת chips ב-dropdown, הוספת מיפוי suggestions, עדכון handler |

## יתרונות

- **פחות עומס ויזואלי**: dropdown קומפקטי במקום 5 כפתורים
- **חוויה נקייה יותר**: הטופס נראה סטנדרטי ומקצועי
- **אותה פונקציונליות**: המשתמש עדיין יכול לבחור הצעה ולערוך אותה
