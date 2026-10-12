# Google Sheet & Excel Integration Guide for Credit Applications

This system automatically stores the **First Name** and **Email** of all people who submit Credit Applications or PDF forms on the Capital Motor Cars website.

---

## 🚀 Quick Setup (Google Sheet Integration in 2 Minutes)

Follow these steps to connect your Google Sheet:

### Step 1: Create Your Google Sheet
1. Go to [Google Sheets](https://sheets.new) and create a new spreadsheet.
2. Name it (e.g., **Capital Motor Cars - Credit Applications**).
3. In Row 1, add these column headers:
   - **A1**: `First Name`
   - **B1**: `Email`
   - **C1**: `Submission Type`
   - **D1**: `Date Submitted`

---

### Step 2: Add the Google Apps Script Webhook
1. In your Google Sheet, click **Extensions** → **Apps Script**.
2. Replace all existing code in the editor with this script:

```javascript
function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.tryLock(10000);

  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = {};
    if (e.postData && e.postData.contents) {
      data = JSON.parse(e.postData.contents);
    }

    var firstName = data.firstName || data["First Name"] || "";
    var email = data.email || data["Email"] || "";
    var submissionType = data.submissionType || data["Submission Type"] || "Credit Application";
    var date = data.submittedAt || data["Submitted At"] || new Date().toISOString();

    // Append to sheet
    sheet.appendRow([firstName, email, submissionType, date]);

    return ContentService
      .createTextOutput(JSON.stringify({ status: "success", firstName: firstName, email: email }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: "error", message: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

function doGet(e) {
  return ContentService.createTextOutput("Capital Motor Cars Lead Webhook is active.");
}
```

3. Click the 💾 **Save** icon.

---

### Step 3: Deploy as Web App
1. Click **Deploy** (top right) → **New deployment**.
2. Click the gear icon ⚙️ next to "Select type" and choose **Web app**.
3. Set the configuration:
   - **Description**: `Credit Leads Webhook`
   - **Execute as**: `Me (your email)`
   - **Who has access**: `Anyone` *(Crucial: allows the website server to post leads)*
4. Click **Deploy**.
5. Grant permissions if prompted (Click *Advanced* → *Go to Untitled project (unsafe)* → *Allow*).
6. Copy the **Web app URL** (it looks like `https://script.google.com/macros/s/.../exec`).

---

### Step 4: Add the URL to Environment Variables
Add the copied URL to your `.env` file and to **Vercel** (`Settings > Environment Variables`):

```bash
GOOGLE_SHEET_WEBHOOK_URL="https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec"
```

From now on, whenever anyone submits:
- **Personal Credit Application** (captures applicant and co-applicant)
- **Business Credit Application** (captures guarantor first name & email)
- **Trade-In Valuation Form** (generates printable lead PDF)

Their **First Name** and **Email** will automatically be appended as a new row in your Google Sheet in real time.

---

## 📊 Excel Sheet Options

If you prefer Microsoft Excel:

### Option A: Download from Google Sheet
In your connected Google Sheet, you can download an Excel sheet anytime:
- Click **File** → **Download** → **Microsoft Excel (.xlsx)**.

### Option B: Export directly from Database via CLI
To export all credit applications currently in the Supabase database to an Excel-compatible `.csv` file:

```bash
npm run export:leads
```

This generates `credit_applications.csv` in the project root, which opens immediately in Microsoft Excel.

To also push all historical leads to your Google Sheet:
```bash
node scripts/export-leads.mjs --sync
```

### Option C: Download Live Excel Sheet via Browser / API
You can download the live spreadsheet directly from the server at:

```
https://www.capitalmotorcars.com/api/export-leads?key=8d22beab-7e04-45b0-8eb7-9150bb6d934a&format=csv
```

---

## 🛡️ Security & Reliability
- **Non-blocking**: If the Google Sheet webhook is temporarily slow or unreachable, it will never interrupt the customer's application submission or email notification.
- **Persistent Database Backup**: Every lead is always saved to the Supabase `form_submissions` database table first, guaranteeing zero data loss.
