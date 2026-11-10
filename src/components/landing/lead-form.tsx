"use client";

import { useId, useRef, useState, type FormEvent } from "react";
import { ArrowRight, Check, ChevronDown, Loader2, MessageCircle, Phone } from "lucide-react";
import { budgetOptions, floorPlanOptions, timelineOptions, PHONE_HREF, WHATSAPP_HREF, PHONE_DISPLAY } from "./content";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

const SOURCE = "lp-home-interiors-hyderabad";

// Accepts "98765 43210", "+91 98765-43210", "098765..." → 10-digit Indian mobile, or null.
export function normalizeIndianMobile(raw: string): string | null {
  let d = raw.replace(/\D/g, "");
  if (d.length === 12 && d.startsWith("91")) d = d.slice(2);
  else if (d.length === 11 && d.startsWith("0")) d = d.slice(1);
  return /^[6-9]\d{9}$/.test(d) ? d : null;
}

type Status = "idle" | "sending" | "done" | "error";

const field =
  "w-full rounded-xl border border-[#1a1720]/15 bg-white px-4 py-3 text-[15px] text-[#1a1720] placeholder:text-[#1a1720]/40 outline-none transition focus:border-[#4E2585] focus:ring-2 focus:ring-[#4E2585]/15 aria-[invalid=true]:border-red-500";
const labelCls = "mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.18em] text-[#1a1720]/60";

export function LeadForm({ title = "Book your free consultation", className = "" }: { title?: string; className?: string }) {
  const id = useId();
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [firstName, setFirstName] = useState("");
  const inFlight = useRef(false); // state is stale for two clicks in the same tick; a ref isn't

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (inFlight.current) return; // double-submit guard
    const f = new FormData(e.currentTarget);
    const v = (k: string) => String(f.get(k) ?? "").trim();

    const errs: Record<string, string> = {};
    const name = v("name");
    const phone = normalizeIndianMobile(v("phone"));
    const email = v("email");
    if (name.length < 2) errs.name = "Please enter your name.";
    if (!phone) errs.phone = "Enter a valid 10-digit mobile number.";
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errs.email = "That email doesn’t look right.";
    for (const k of ["budget", "floorPlan", "timeline"]) if (!v(k)) errs[k] = "Please choose one.";
    setErrors(errs);
    if (Object.keys(errs).length) return;

    inFlight.current = true;
    setStatus("sending");
    // Keep ad attribution (utm_*, gclid, fbclid) with the lead so sales can see which ad it came from.
    const qs = window.location.search.slice(1);
    const message = [`Timeline: ${v("timeline")}`, `Floor plan: ${v("floorPlan")}`, `Budget: ${v("budget")}`, qs && `Ad params: ${qs}`]
      .filter(Boolean)
      .join("\n");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          phone: `+91${phone}`,
          email: email || undefined,
          city: "Hyderabad",
          projectType: v("floorPlan"),
          budget: v("budget"),
          message,
          source: SOURCE,
        }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setFirstName(name.split(/\s+/)[0]);
      setStatus("done");
      window.gtag?.("event", "generate_lead", { form_source: SOURCE, budget: v("budget"), floor_plan: v("floorPlan") });
    } catch {
      inFlight.current = false;
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <div className={`rounded-3xl bg-white p-7 text-center shadow-[0_30px_80px_-20px_rgba(30,14,54,0.45)] sm:p-9 ${className}`} role="status">
        <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-[#D4A853]/15 text-[#B8893A]">
          <Check className="h-7 w-7" />
        </div>
        <h3 className="font-serif text-3xl text-[#1a1720]">Thank you, {firstName}.</h3>
        <p className="mx-auto mt-3 max-w-sm text-[15px] leading-relaxed text-[#1a1720]/70">
          Your request is in. One of our designers will call you within 24 hours to plan your free consultation.
        </p>
        <p className="mt-6 text-sm text-[#1a1720]/60">Can’t wait? Reach us right away:</p>
        <div className="mt-3 flex flex-col justify-center gap-2 sm:flex-row">
          <a href={PHONE_HREF} className="inline-flex items-center justify-center gap-2 rounded-full border border-[#4E2585]/30 px-5 py-2.5 text-sm font-semibold text-[#4E2585] hover:bg-[#4E2585]/5">
            <Phone className="h-4 w-4" /> {PHONE_DISPLAY}
          </a>
          <a href={WHATSAPP_HREF} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full bg-[#4E2585] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#3B1868]">
            <MessageCircle className="h-4 w-4" /> WhatsApp
          </a>
        </div>
      </div>
    );
  }

  const err = (k: string) =>
    errors[k] ? (
      <p id={`${id}-${k}-err`} className="mt-1 text-xs text-red-600">
        {errors[k]}
      </p>
    ) : null;
  const a11y = (k: string) => ({ "aria-invalid": !!errors[k], "aria-describedby": errors[k] ? `${id}-${k}-err` : undefined });

  const select = (k: string, label: string, opts: string[]) => (
    <div>
      <label htmlFor={`${id}-${k}`} className={labelCls}>{label}</label>
      <div className="relative">
        <select id={`${id}-${k}`} name={k} defaultValue="" className={`${field} appearance-none pr-10`} {...a11y(k)}>
          <option value="" disabled>Select</option>
          {opts.map((o) => <option key={o}>{o}</option>)}
        </select>
        <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#4E2585]" />
      </div>
      {err(k)}
    </div>
  );

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className={`rounded-3xl bg-white p-6 shadow-[0_30px_80px_-20px_rgba(30,14,54,0.45)] sm:p-8 ${className}`}
    >
      <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#B8893A]">Free · No obligation</p>
      <h3 className="mt-2 font-serif text-[28px] leading-tight text-[#1a1720] sm:text-[32px]">{title}</h3>
      <p className="mt-1.5 text-sm text-[#1a1720]/60">Share a few details and a designer will call you back.</p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label htmlFor={`${id}-name`} className={labelCls}>Name</label>
          <input id={`${id}-name`} name="name" autoComplete="name" placeholder="Your full name" className={field} {...a11y("name")} />
          {err("name")}
        </div>
        <div>
          <label htmlFor={`${id}-phone`} className={labelCls}>Mobile number</label>
          <div className="relative">
            <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[15px] text-[#1a1720]/50">+91</span>
            <input id={`${id}-phone`} name="phone" type="tel" inputMode="numeric" autoComplete="tel-national" placeholder="98765 43210" maxLength={14} className={`${field} pl-12`} {...a11y("phone")} />
          </div>
          {err("phone")}
        </div>
        <div>
          <label htmlFor={`${id}-email`} className={labelCls}>Email <span className="normal-case tracking-normal text-[#1a1720]/40">(optional)</span></label>
          <input id={`${id}-email`} name="email" type="email" autoComplete="email" placeholder="you@example.com" className={field} {...a11y("email")} />
          {err("email")}
        </div>
        {select("budget", "Budget in mind", budgetOptions)}
        {select("floorPlan", "Floor plan", floorPlanOptions)}
        <div className="sm:col-span-2">{select("timeline", "When do you need it?", timelineOptions)}</div>
      </div>

      <button
        type="submit"
        disabled={status === "sending"}
        className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#4E2585] px-6 py-4 text-sm font-semibold uppercase tracking-[0.14em] text-white transition hover:bg-[#3B1868] disabled:cursor-wait disabled:opacity-80"
      >
        {status === "sending" ? <><Loader2 className="h-4 w-4 animate-spin" /> Sending…</> : <>Get my free consultation <ArrowRight className="h-4 w-4" /></>}
      </button>
      {status === "error" && (
        <p className="mt-3 text-center text-sm text-red-600" role="alert">
          Something went wrong. Please try again, or call us on <a href={PHONE_HREF} className="font-semibold underline">{PHONE_DISPLAY}</a>.
        </p>
      )}
      <p className="mt-4 text-center text-xs text-[#1a1720]/45">We respect your privacy. No spam, ever.</p>
    </form>
  );
}
