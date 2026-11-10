import { createHmac } from "node:crypto";

/*
 * Lead delivery. Every lead is saved to the database first (the contact API does that); this module then
 * fans it out to whichever channels are configured in the environment. Each channel is optional and
 * independent — a failure is logged and never affects the visitor or the other channels.
 *
 *   Email (Resend)   RESEND_API_KEY, LEAD_EMAIL_FROM, LEAD_ALERT_EMAILS, [LEAD_REPLY_TO], [LEAD_CUSTOMER_EMAIL=off]
 *   WhatsApp (Meta)  WHATSAPP_TOKEN, WHATSAPP_PHONE_NUMBER_ID, LEAD_ALERT_WHATSAPP, [WHATSAPP_TEMPLATE], [WHATSAPP_TEMPLATE_LANG]
 *   CRM / webhooks   LEAD_WEBHOOK_URLS (comma-separated), [LEAD_WEBHOOK_SECRET]
 *
 * See docs/LEADS.md for setup.
 */

export interface Lead {
  id: string;
  name: string;
  phone: string;
  email?: string | null;
  city?: string | null;
  projectType?: string | null;
  budget?: string | null;
  message?: string | null;
  source: string;
  createdAt: Date;
}

const SITE = process.env.APP_URL || "https://aliignspace.com";
const list = (v?: string) => (v ?? "").split(",").map((s) => s.trim()).filter(Boolean);

export function sourceLabel(source: string) {
  const labels: Record<string, string> = {
    contact_form: "Contact page",
    process_page: "Process page",
    consultation_block: "Consultation form",
    "lp-home-interiors-hyderabad": "Ads landing page",
  };
  if (labels[source]) return labels[source];
  if (source.startsWith("service:")) return `Service page: ${source.slice(8)}`;
  return source;
}

/** Plain JSON shape sent to CRMs and webhooks — stable field names, easy to map in any CRM. */
export function leadPayload(lead: Lead) {
  return {
    event: "lead.created",
    id: lead.id,
    createdAt: lead.createdAt.toISOString(),
    name: lead.name,
    phone: lead.phone,
    email: lead.email ?? "",
    city: lead.city ?? "",
    projectType: lead.projectType ?? "",
    budget: lead.budget ?? "",
    message: lead.message ?? "",
    source: lead.source,
    sourceLabel: sourceLabel(lead.source),
    adminUrl: `${SITE}/admin/contacts`,
  };
}

const esc = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);
const digits = (phone: string) => phone.replace(/\D/g, "");

/* ───────────────────────────── Email (Resend REST API) ───────────────────────────── */

async function resend(body: Record<string, unknown>) {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`Resend ${res.status}: ${await res.text()}`);
}

function emailShell(inner: string) {
  return `<!doctype html><html><body style="margin:0;background:#F7F5F1;font-family:Helvetica,Arial,sans-serif;color:#1a1720">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="padding:32px 12px"><tr><td align="center">
<table role="presentation" width="560" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff;border-radius:16px;overflow:hidden">
<tr><td style="background:#16141f;padding:22px 32px;color:#ffffff;font-size:13px;letter-spacing:6px">A L I I G N S P A C E</td></tr>
<tr><td style="padding:32px">${inner}</td></tr>
<tr><td style="padding:18px 32px;background:#F7F5F1;font-size:12px;color:#6b6676">ALIIGNSPACE Home Interiors · Hyderabad · Nellore · Vizag · <a href="${SITE}" style="color:#4E2585">aliignspace.com</a></td></tr>
</table></td></tr></table></body></html>`;
}

export function teamAlertHtml(lead: Lead) {
  const p = leadPayload(lead);
  const rows: [string, string][] = [
    ["Phone", p.phone],
    ["Email", p.email],
    ["City", p.city],
    ["Floor plan / project", p.projectType],
    ["Budget", p.budget],
    ["Details", p.message],
    ["Source", p.sourceLabel],
  ];
  const table = rows
    .filter(([, v]) => v)
    .map(
      ([k, v]) =>
        `<tr><td style="padding:8px 0;color:#6b6676;font-size:13px;width:150px;vertical-align:top">${k}</td><td style="padding:8px 0;font-size:14px;white-space:pre-line">${esc(v)}</td></tr>`,
    )
    .join("");
  const btn = (href: string, label: string, bg: string, fg: string) =>
    `<a href="${href}" style="display:inline-block;margin:0 8px 8px 0;padding:12px 20px;border-radius:999px;background:${bg};color:${fg};text-decoration:none;font-size:13px;font-weight:bold">${label}</a>`;
  return emailShell(`
<p style="margin:0 0 6px;font-size:11px;letter-spacing:3px;color:#4E2585;text-transform:uppercase">New lead</p>
<h1 style="margin:0 0 20px;font-family:Georgia,serif;font-weight:normal;font-size:28px">${esc(p.name)}</h1>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-top:1px solid #eee;margin-bottom:24px">${table}</table>
${btn(`tel:${p.phone}`, "Call now", "#4E2585", "#ffffff")}${btn(`https://wa.me/${digits(p.phone)}`, "WhatsApp", "#D4A853", "#16141f")}${btn(p.adminUrl, "Open in admin", "#F7F5F1", "#1a1720")}
<p style="margin:16px 0 0;font-size:12px;color:#6b6676">Received ${lead.createdAt.toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })} IST</p>`);
}

export function customerThankYouHtml(lead: Lead) {
  const first = esc(lead.name.trim().split(/\s+/)[0] || "there");
  return emailShell(`
<h1 style="margin:0 0 16px;font-family:Georgia,serif;font-weight:normal;font-size:28px">Thank you, ${first}.</h1>
<p style="font-size:15px;line-height:1.7;margin:0 0 14px">We've received your request for a free consultation. One of our designers will call you shortly to understand your home, your style and your budget.</p>
<p style="font-size:15px;line-height:1.7;margin:0 0 14px">In the meantime, you can watch real homes we've handed over — filmed after handover, exactly as our clients live in them.</p>
<p style="margin:24px 0"><a href="${SITE}/portfolio" style="display:inline-block;padding:13px 24px;border-radius:999px;background:#4E2585;color:#ffffff;text-decoration:none;font-size:14px;font-weight:bold">See our completed homes</a></p>
<p style="font-size:14px;line-height:1.7;margin:0;color:#6b6676">Need us sooner? Call or WhatsApp <a href="tel:+919030444503" style="color:#4E2585">+91 90304 44503</a>.</p>
<p style="font-size:14px;margin:24px 0 0">Warm regards,<br>Team ALIIGNSPACE</p>`);
}

async function sendEmails(lead: Lead) {
  const to = list(process.env.LEAD_ALERT_EMAILS);
  const from = process.env.LEAD_EMAIL_FROM;
  if (!process.env.RESEND_API_KEY || !from || !to.length) return "skipped (not configured)";
  const p = leadPayload(lead);
  const jobs = [
    resend({
      from,
      to,
      subject: `New lead: ${p.name}${p.budget ? ` · ${p.budget}` : ""} · ${p.sourceLabel}`,
      html: teamAlertHtml(lead),
      ...(p.email ? { reply_to: p.email } : {}),
    }),
  ];
  if (p.email && process.env.LEAD_CUSTOMER_EMAIL !== "off") {
    jobs.push(
      resend({
        from,
        to: [p.email],
        subject: "Thank you — your ALIIGNSPACE consultation request",
        html: customerThankYouHtml(lead),
        reply_to: process.env.LEAD_REPLY_TO || "hello@aliignspace.com",
      }),
    );
  }
  await Promise.all(jobs);
  return `sent (${jobs.length})`;
}

/* ─────────────────────── WhatsApp (Meta WhatsApp Cloud API) ─────────────────────── */

async function sendWhatsApp(lead: Lead) {
  const token = process.env.WHATSAPP_TOKEN;
  const phoneId = process.env.WHATSAPP_PHONE_NUMBER_ID;
  const to = list(process.env.LEAD_ALERT_WHATSAPP).map(digits);
  if (!token || !phoneId || !to.length) return "skipped (not configured)";
  const p = leadPayload(lead);
  const details = [p.projectType, p.budget, p.city].filter(Boolean).join(" · ") || "—";
  // Business-initiated WhatsApp messages must use an approved template (see docs/LEADS.md):
  // body variables {{1}} name, {{2}} phone, {{3}} details, {{4}} source.
  const params = [p.name, p.phone, details, p.sourceLabel].map((text) => ({ type: "text", text: text.slice(0, 200) }));
  await Promise.all(
    to.map(async (number) => {
      const res = await fetch(`https://graph.facebook.com/v21.0/${phoneId}/messages`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          messaging_product: "whatsapp",
          to: number,
          type: "template",
          template: {
            name: process.env.WHATSAPP_TEMPLATE || "new_lead_alert",
            language: { code: process.env.WHATSAPP_TEMPLATE_LANG || "en" },
            components: [{ type: "body", parameters: params }],
          },
        }),
      });
      if (!res.ok) throw new Error(`WhatsApp ${res.status}: ${await res.text()}`);
    }),
  );
  return `sent (${to.length})`;
}

/* ─────────────────────── CRM / Zapier / Make / Google Sheets ─────────────────────── */

async function sendWebhooks(lead: Lead) {
  const urls = list(process.env.LEAD_WEBHOOK_URLS);
  if (!urls.length) return "skipped (not configured)";
  const body = JSON.stringify(leadPayload(lead));
  const secret = process.env.LEAD_WEBHOOK_SECRET;
  const headers: Record<string, string> = { "Content-Type": "application/json" };
  // Lets the receiving CRM verify the request really came from aliignspace.com.
  if (secret) headers["X-Aliignspace-Signature"] = `sha256=${createHmac("sha256", secret).update(body).digest("hex")}`;
  await Promise.all(
    urls.map(async (url) => {
      const res = await fetch(url, { method: "POST", headers, body, redirect: "follow" });
      if (!res.ok) throw new Error(`Webhook ${new URL(url).host} ${res.status}`);
    }),
  );
  return `sent (${urls.length})`;
}

/** Fan a saved lead out to every configured channel. Never throws. */
export async function deliverLead(lead: Lead) {
  const channels = { email: sendEmails, whatsapp: sendWhatsApp, webhooks: sendWebhooks };
  const results = await Promise.allSettled(Object.values(channels).map((send) => send(lead)));
  const summary = Object.fromEntries(
    Object.keys(channels).map((name, i) => {
      const r = results[i];
      return [name, r.status === "fulfilled" ? r.value : `failed: ${(r.reason as Error)?.message ?? r.reason}`];
    }),
  );
  const failed = Object.values(summary).some((v) => v.startsWith("failed"));
  (failed ? console.error : console.log)(`[lead ${lead.id}] delivery`, summary);
  return summary;
}
