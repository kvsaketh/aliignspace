"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Mail, Phone, MapPin, Send, Loader2, CheckCircle } from "lucide-react";

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "hello@aliignspace.com",
    href: "mailto:hello@aliignspace.com",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+91 9030444512",
    href: "tel:+919030444512",
  },
  {
    icon: MapPin,
    label: "Address",
    value: "NBR Towers, Road No. 36, Jawahar Colony, Jubilee Hills, Hyderabad",
    href: "https://maps.google.com/?q=NBR+Towers+Jubilee+Hills+Hyderabad",
  },
];

export function ContactCTASection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  return (
    <section
      ref={ref}
      className="relative py-24 md:py-32 overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #E07A5F 0%, #D4765F 50%, #c44d32 100%)",
      }}
    >
      {/* Subtle pattern */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='1' fill-rule='evenodd'%3E%3Cpath d='M0 40L40 0H20L0 20M40 40V20L20 40'/%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left: Content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-medium text-white leading-[1.1] tracking-tight mb-4">
              Choose Us with Trust!
            </h2>
            <p className="text-xl text-white/80 font-serif italic mb-10">
              Let&apos;s build Your Dream Home!!
            </p>

            {/* Contact Cards */}
            <div className="space-y-4">
              {contactInfo.map((item, index) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{
                    duration: 0.5,
                    delay: 0.3 + index * 0.1,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="flex items-start gap-4 p-5 glass rounded-xl hover:bg-white/15 transition-colors duration-300 group"
                >
                  <div className="flex-shrink-0 w-11 h-11 rounded-lg bg-white/10 flex items-center justify-center group-hover:bg-coral-500/30 transition-colors">
                    <item.icon className="w-5 h-5 text-cream-100" />
                  </div>
                  <div>
                    <div className="text-cream-100/60 text-xs font-label tracking-wider uppercase mb-1">
                      {item.label}
                    </div>
                    <div className="text-cream-50 text-sm font-medium">
                      {item.value}
                    </div>
                  </div>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="bg-warm-white rounded-2xl p-6 sm:p-8 shadow-elevated">
              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-serif font-medium text-charcoal mb-2">
                    Message Sent!
                  </h3>
                  <p className="text-slate-500">
                    We&apos;ll get back to you within 24 hours.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <h3 className="text-lg font-serif font-medium text-charcoal mb-2">
                    Send us a message
                  </h3>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-label tracking-wider uppercase text-slate-500 mb-1.5">
                        Name
                      </label>
                      <input
                        type="text"
                        required
                        className="w-full px-4 py-3 rounded-xl border border-stone-200 bg-white text-charcoal text-sm focus:outline-none focus:ring-2 focus:ring-coral-500/30 focus:border-coral-500 transition-all"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-label tracking-wider uppercase text-slate-500 mb-1.5">
                        Email
                      </label>
                      <input
                        type="email"
                        required
                        className="w-full px-4 py-3 rounded-xl border border-stone-200 bg-white text-charcoal text-sm focus:outline-none focus:ring-2 focus:ring-coral-500/30 focus:border-coral-500 transition-all"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-label tracking-wider uppercase text-slate-500 mb-1.5">
                        Phone
                      </label>
                      <input
                        type="tel"
                        className="w-full px-4 py-3 rounded-xl border border-stone-200 bg-white text-charcoal text-sm focus:outline-none focus:ring-2 focus:ring-coral-500/30 focus:border-coral-500 transition-all"
                        placeholder="+91 ..."
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-label tracking-wider uppercase text-slate-500 mb-1.5">
                        Service Interest
                      </label>
                      <select className="w-full px-4 py-3 rounded-xl border border-stone-200 bg-white text-charcoal text-sm focus:outline-none focus:ring-2 focus:ring-coral-500/30 focus:border-coral-500 transition-all appearance-none">
                        <option value="">Select a service</option>
                        <option value="home-interiors">Home Interiors</option>
                        <option value="modular-kitchen">Modular Kitchen</option>
                        <option value="living-room">Living Room</option>
                        <option value="bedroom">Bedroom</option>
                        <option value="office">Office Interiors</option>
                        <option value="commercial">Commercial Spaces</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-label tracking-wider uppercase text-slate-500 mb-1.5">
                      Message
                    </label>
                    <textarea
                      rows={4}
                      className="w-full px-4 py-3 rounded-xl border border-stone-200 bg-white text-charcoal text-sm focus:outline-none focus:ring-2 focus:ring-coral-500/30 focus:border-coral-500 transition-all resize-none"
                      placeholder="Tell us about your dream space..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full inline-flex items-center justify-center gap-2 px-8 py-4 bg-coral-500 text-white text-sm font-semibold rounded-xl hover:bg-coral-600 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-elevated disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
