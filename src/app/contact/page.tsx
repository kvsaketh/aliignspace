"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Phone, Mail, Clock, Instagram, Facebook, MessageCircle, ArrowRight, CheckCircle2 } from "lucide-react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

const projectTypes = [
  "Full Home Interiors",
  "Modular Kitchen",
  "Living Room Design",
  "Bedroom Design",
  "Office Interiors",
  "Commercial Space",
  "Renovation",
  "Other",
];

const budgetRanges = [
  "Under ₹5 Lakhs",
  "₹5 – 10 Lakhs",
  "₹10 – 20 Lakhs",
  "₹20 – 50 Lakhs",
  "Above ₹50 Lakhs",
  "Not Sure Yet",
];

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    city: "",
    projectType: "",
    budget: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const set = (key: string, value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className="relative pt-32 pb-16 bg-[#1C1917] overflow-hidden">
          <div className="absolute inset-0 z-0 opacity-10">
            <Image
              src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1920&q=80"
              alt="Contact ALIIGNSPACE"
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
          </div>
          <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full opacity-5 pointer-events-none"
            style={{ background: "radial-gradient(circle, #D46546 0%, transparent 70%)" }} />
          <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
            <span className="font-sans text-xs font-semibold tracking-[0.25em] uppercase text-[#D46546] block mb-4">
              Let&apos;s Talk
            </span>
            <h1 className="font-serif text-5xl sm:text-6xl font-medium text-white leading-tight mb-4">
              Start Your{" "}
              <em className="not-italic italic text-[#D46546]">Dream</em>{" "}
              Project
            </h1>
            <p className="font-sans text-lg text-white/60 max-w-xl">
              Reach out for a free consultation. We&apos;ll respond within 24 hours.
            </p>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-16 lg:py-24 bg-[#F9F5ED]">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">

              {/* Left — Contact Info */}
              <div className="lg:col-span-2 space-y-8">
                {/* Contact card */}
                <div className="bg-white p-8 shadow-sm">
                  <h2 className="font-serif text-2xl font-medium text-[#1C1917] mb-6">
                    Get in Touch
                  </h2>
                  <ul className="space-y-6">
                    <li className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-[#D46546]/10 flex items-center justify-center flex-shrink-0">
                        <Phone className="w-5 h-5 text-[#D46546]" />
                      </div>
                      <div>
                        <p className="font-sans text-xs text-stone-400 tracking-wider uppercase mb-1">Call / WhatsApp</p>
                        <a href="tel:+919030444503" className="font-sans text-[#1C1917] font-medium hover:text-[#D46546] transition-colors">
                          +91 90304 44503
                        </a>
                      </div>
                    </li>
                    <li className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-[#D46546]/10 flex items-center justify-center flex-shrink-0">
                        <Mail className="w-5 h-5 text-[#D46546]" />
                      </div>
                      <div>
                        <p className="font-sans text-xs text-stone-400 tracking-wider uppercase mb-1">Email</p>
                        <a href="mailto:hello@aliignspace.com" className="font-sans text-[#1C1917] font-medium hover:text-[#D46546] transition-colors">
                          hello@aliignspace.com
                        </a>
                      </div>
                    </li>
                    <li className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-[#D46546]/10 flex items-center justify-center flex-shrink-0">
                        <MapPin className="w-5 h-5 text-[#D46546]" />
                      </div>
                      <div>
                        <p className="font-sans text-xs text-stone-400 tracking-wider uppercase mb-1">Studio Locations</p>
                        <p className="font-sans text-[#1C1917] font-medium">Hyderabad Studio</p>
                        <p className="font-sans text-stone-500 text-sm">NBR Towers, Road No. 36</p>
                        <p className="font-sans text-stone-500 text-sm">Jawahar Colony, Jubilee Hills, 500033</p>
                        <p className="font-sans text-[#1C1917] font-medium mt-3">Also serving</p>
                        <p className="font-sans text-stone-500 text-sm">Nellore & across AP & Telangana</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-[#D46546]/10 flex items-center justify-center flex-shrink-0">
                        <Clock className="w-5 h-5 text-[#D46546]" />
                      </div>
                      <div>
                        <p className="font-sans text-xs text-stone-400 tracking-wider uppercase mb-1">Working Hours</p>
                        <p className="font-sans text-[#1C1917] font-medium">Monday – Saturday</p>
                        <p className="font-sans text-stone-500 text-sm">9:00 AM – 7:00 PM</p>
                      </div>
                    </li>
                  </ul>

                  {/* Social */}
                  <div className="mt-8 pt-6 border-t border-stone-100">
                    <p className="font-sans text-xs text-stone-400 tracking-wider uppercase mb-4">Follow Us</p>
                    <div className="flex gap-3">
                      {[
                        { icon: <Instagram className="w-4 h-4" />, href: "https://instagram.com/aliignspace", label: "Instagram" },
                        { icon: <Facebook className="w-4 h-4" />, href: "https://facebook.com/aliignspace", label: "Facebook" },
                        { icon: <MessageCircle className="w-4 h-4" />, href: "https://wa.me/919030444503", label: "WhatsApp" },
                      ].map((s) => (
                        <a
                          key={s.label}
                          href={s.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={s.label}
                          className="w-10 h-10 bg-[#1C1917] text-white flex items-center justify-center hover:bg-[#D46546] transition-colors duration-200"
                        >
                          {s.icon}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>

                {/* WhatsApp CTA */}
                <a
                  href="https://wa.me/919030444503?text=Hi, I'd like to discuss my interior design project."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 bg-[#25D366] text-white p-5 hover:bg-[#1fb559] transition-colors group"
                >
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <MessageCircle className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <p className="font-sans font-semibold text-sm">Chat on WhatsApp</p>
                    <p className="font-sans text-white/80 text-xs mt-0.5">Quick response guaranteed</p>
                  </div>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>

              {/* Right — Form */}
              <div className="lg:col-span-3">
                <div className="bg-white p-8 lg:p-10 shadow-sm">
                  {submitted ? (
                    <div className="py-16 text-center">
                      <div className="w-16 h-16 bg-[#D46546]/10 flex items-center justify-center mx-auto mb-5">
                        <CheckCircle2 className="w-8 h-8 text-[#D46546]" />
                      </div>
                      <h3 className="font-serif text-2xl font-medium text-[#1C1917] mb-3">
                        Message Received!
                      </h3>
                      <p className="font-sans text-stone-500 mb-8 max-w-sm mx-auto">
                        Thank you for reaching out. One of our designers will contact you within 24 hours to discuss your project.
                      </p>
                      <button
                        onClick={() => setSubmitted(false)}
                        className="font-sans text-sm text-[#D46546] hover:underline"
                      >
                        Send another message
                      </button>
                    </div>
                  ) : (
                    <>
                      <div className="mb-8">
                        <h2 className="font-serif text-2xl font-medium text-[#1C1917] mb-1">
                          Tell us about your project
                        </h2>
                        <p className="font-sans text-stone-400 text-sm">
                          Fill in the details below and we&apos;ll prepare a free, tailored estimate.
                        </p>
                      </div>

                      <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="grid sm:grid-cols-2 gap-5">
                          <div>
                            <label className="block font-sans text-xs font-semibold text-stone-500 tracking-wider uppercase mb-2">
                              Full Name *
                            </label>
                            <input
                              type="text"
                              required
                              value={form.name}
                              onChange={(e) => set("name", e.target.value)}
                              placeholder="Your name"
                              className="w-full border border-stone-200 px-4 py-3 font-sans text-sm text-[#1C1917] placeholder-stone-300 focus:outline-none focus:border-[#D46546] transition-colors"
                            />
                          </div>
                          <div>
                            <label className="block font-sans text-xs font-semibold text-stone-500 tracking-wider uppercase mb-2">
                              Phone *
                            </label>
                            <div className="flex">
                              <span className="inline-flex items-center px-3 border border-r-0 border-stone-200 font-sans text-sm text-stone-400 bg-stone-50">
                                +91
                              </span>
                              <input
                                type="tel"
                                required
                                value={form.phone}
                                onChange={(e) => set("phone", e.target.value)}
                                placeholder="90304 44503"
                                className="flex-1 border border-stone-200 px-4 py-3 font-sans text-sm text-[#1C1917] placeholder-stone-300 focus:outline-none focus:border-[#D46546] transition-colors"
                              />
                            </div>
                          </div>
                        </div>

                        <div className="grid sm:grid-cols-2 gap-5">
                          <div>
                            <label className="block font-sans text-xs font-semibold text-stone-500 tracking-wider uppercase mb-2">
                              Email
                            </label>
                            <input
                              type="email"
                              value={form.email}
                              onChange={(e) => set("email", e.target.value)}
                              placeholder="your@email.com"
                              className="w-full border border-stone-200 px-4 py-3 font-sans text-sm text-[#1C1917] placeholder-stone-300 focus:outline-none focus:border-[#D46546] transition-colors"
                            />
                          </div>
                          <div>
                            <label className="block font-sans text-xs font-semibold text-stone-500 tracking-wider uppercase mb-2">
                              City
                            </label>
                            <input
                              type="text"
                              value={form.city}
                              onChange={(e) => set("city", e.target.value)}
                              placeholder="Hyderabad / Nellore"
                              className="w-full border border-stone-200 px-4 py-3 font-sans text-sm text-[#1C1917] placeholder-stone-300 focus:outline-none focus:border-[#D46546] transition-colors"
                            />
                          </div>
                        </div>

                        <div className="grid sm:grid-cols-2 gap-5">
                          <div>
                            <label className="block font-sans text-xs font-semibold text-stone-500 tracking-wider uppercase mb-2">
                              Project Type
                            </label>
                            <select
                              value={form.projectType}
                              onChange={(e) => set("projectType", e.target.value)}
                              className="w-full border border-stone-200 px-4 py-3 font-sans text-sm focus:outline-none focus:border-[#D46546] transition-colors bg-white appearance-none"
                              style={{ color: form.projectType ? "#1C1917" : "#94a3b8" }}
                            >
                              <option value="">Select type</option>
                              {projectTypes.map((t) => (
                                <option key={t} value={t}>{t}</option>
                              ))}
                            </select>
                          </div>
                          <div>
                            <label className="block font-sans text-xs font-semibold text-stone-500 tracking-wider uppercase mb-2">
                              Budget Range
                            </label>
                            <select
                              value={form.budget}
                              onChange={(e) => set("budget", e.target.value)}
                              className="w-full border border-stone-200 px-4 py-3 font-sans text-sm focus:outline-none focus:border-[#D46546] transition-colors bg-white appearance-none"
                              style={{ color: form.budget ? "#1C1917" : "#94a3b8" }}
                            >
                              <option value="">Select range</option>
                              {budgetRanges.map((b) => (
                                <option key={b} value={b}>{b}</option>
                              ))}
                            </select>
                          </div>
                        </div>

                        <div>
                          <label className="block font-sans text-xs font-semibold text-stone-500 tracking-wider uppercase mb-2">
                            Message (Optional)
                          </label>
                          <textarea
                            value={form.message}
                            onChange={(e) => set("message", e.target.value)}
                            placeholder="Tell us more about your project — size, style preferences, timeline..."
                            rows={4}
                            className="w-full border border-stone-200 px-4 py-3 font-sans text-sm text-[#1C1917] placeholder-stone-300 focus:outline-none focus:border-[#D46546] transition-colors resize-none"
                          />
                        </div>

                        <button
                          type="submit"
                          disabled={loading}
                          className="w-full flex items-center justify-center gap-2 bg-[#D46546] hover:bg-[#c44d32] disabled:opacity-60 text-white font-sans font-semibold text-sm py-4 transition-all duration-300 hover:shadow-lg hover:shadow-[#D46546]/25"
                        >
                          {loading ? (
                            <span className="flex items-center gap-2">
                              <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                              </svg>
                              Sending...
                            </span>
                          ) : (
                            <>
                              Send Message
                              <ArrowRight className="w-4 h-4" />
                            </>
                          )}
                        </button>

                        <p className="font-sans text-center text-stone-400 text-xs">
                          We respect your privacy. Your information will never be shared.
                        </p>
                      </form>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Map placeholder */}
        <section className="h-80 bg-stone-200 relative overflow-hidden">
          <div className="absolute inset-0 bg-stone-100 flex items-center justify-center">
            <div className="text-center">
              <MapPin className="w-8 h-8 text-[#D46546] mx-auto mb-2" />
              <p className="font-sans text-stone-500 text-sm">
                Hitech City, Hyderabad · MG Road, Nellore
              </p>
              <a
                href="https://maps.google.com/?q=Hitech+City+Hyderabad"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-[#D46546] text-sm mt-2 hover:underline"
              >
                Open in Maps <ArrowRight className="w-3 h-3" />
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
