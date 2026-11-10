# Leads: where they go and how to switch channels on

Every enquiry form posts to `/api/contact`: the contact page, the service-page callback forms and the ads
landing page (`/lp/home-interiors-hyderabad`). Each lead is **saved to the database first**. It is then sent,
in the background, to every channel below that is configured. Channels are independent: if one fails, the
lead is still saved and the others still fire. Failures show in Vercel's function logs as
`[lead <id>] delivery {...}`.

Channels switch on by adding **environment variables** in Vercel (Project `aliignspace-main` → Settings →
Environment Variables → Production), then redeploying.

## 1. Admin list and CSV export (always on)

- `aliignspace.com/admin/contacts` lists every lead with its source.
- **Download CSV** (top right) exports all leads for Excel or bulk import into any CRM.

## 2. Email alerts and the customer thank-you email

Emails are sent through [Resend](https://resend.com).
1. Sign up and add the domain `aliignspace.com`.
2. Add the DNS records Resend shows.
3. Create an API key.

| Variable | Example | Purpose |
|---|---|---|
| `RESEND_API_KEY` | `re_…` | Resend API key |
| `LEAD_EMAIL_FROM` | `ALIIGNSPACE Leads <leads@aliignspace.com>` | Sender (must be on the verified domain) |
| `LEAD_ALERT_EMAILS` | `hello@aliignspace.com,sales@aliignspace.com` | Team inboxes that get every lead |
| `LEAD_REPLY_TO` | `hello@aliignspace.com` | Where customer replies go (optional) |
| `LEAD_CUSTOMER_EMAIL` | `off` | Set to `off` to stop the customer thank-you email (optional) |

The team alert has one-tap **Call**, **WhatsApp** and **Open in admin** buttons. A customer who leaves an
email address gets a short branded thank-you.

## 3. WhatsApp alerts to the sales team

Alerts use Meta's **WhatsApp Cloud API**.
1. In Meta Business Manager, set up WhatsApp, add a sender number and create a permanent access token.
2. Messages that start a conversation must use an **approved template**. Create a template (category
   *Utility*) named `new_lead_alert`, language English, with this body:

   ```
   New ALIIGNSPACE lead: {{1}}
   Phone: {{2}}
   Details: {{3}}
   Source: {{4}}
   ```

| Variable | Example | Purpose |
|---|---|---|
| `WHATSAPP_TOKEN` | `EAAG…` | Permanent access token |
| `WHATSAPP_PHONE_NUMBER_ID` | `1234567890` | ID of the sender number (from the WhatsApp API settings page) |
| `LEAD_ALERT_WHATSAPP` | `919030444503,919xxxxxxxxx` | Team numbers to alert, with country code |
| `WHATSAPP_TEMPLATE` | `new_lead_alert` | Template name (optional, this is the default) |
| `WHATSAPP_TEMPLATE_LANG` | `en` | Template language code (optional) |

## 4. CRM, Zapier, Make, Google Sheets (webhooks)

Every lead is POSTed as JSON to each URL in `LEAD_WEBHOOK_URLS`, separated by commas:

```json
{
  "event": "lead.created", "id": "…", "createdAt": "2026-11-10T10:58:24.000Z",
  "name": "…", "phone": "+91…", "email": "…", "city": "…", "projectType": "3 BHK",
  "budget": "15–20 Lakhs", "message": "Timeline: …\nAd params: utm_source=…",
  "source": "lp-home-interiors-hyderabad", "sourceLabel": "Ads landing page",
  "adminUrl": "https://aliignspace.com/admin/contacts"
}
```

| Variable | Purpose |
|---|---|
| `LEAD_WEBHOOK_URLS` | One or more receiving URLs |
| `LEAD_WEBHOOK_SECRET` | Optional. Adds an `X-Aliignspace-Signature: sha256=<HMAC of the body>` header so the receiver can verify the request |

Where to get a receiving URL:
- **Any CRM** with a lead-capture webhook or API endpoint (Zoho, HubSpot, LeadSquared, Salesforce, AmalyteCRM / OrbitNovo): paste its webhook URL.
- **Zapier / Make:** create a "Catch hook" trigger, paste its URL, then map the fields to any CRM or app.
- **Google Sheets:** in the sheet, open Extensions → Apps Script and paste the script below. Then choose Deploy → New deployment → Web app, set "Anyone" to have access, and paste the web-app URL.

  ```js
  function doPost(e) {
    const d = JSON.parse(e.postData.contents);
    SpreadsheetApp.getActive().getSheets()[0].appendRow([
      new Date(d.createdAt), d.name, d.phone, d.email, d.city, d.projectType, d.budget, d.message, d.sourceLabel, d.id,
    ]);
    return ContentService.createTextOutput("ok");
  }
  ```

## Spam protection

- A hidden "website" field catches bots that auto-fill forms. Those submissions are dropped silently.
- Each visitor can send at most 5 submissions per 10 minutes.
- Phone numbers must have 10–15 digits.
