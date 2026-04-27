"use client";

import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { motion } from "framer-motion";

interface WhatsAppFloatProps {
  phone?: string;
  message?: string;
}

export function WhatsAppFloat({
  phone = "919030444503",
  message = "Hi Aertsen! I'm interested in a free interior design consultation.",
}: WhatsAppFloatProps) {
  const encodedMessage = encodeURIComponent(message);
  const href = `https://wa.me/${phone}?text=${encodedMessage}`;

  return (
    <motion.div
      className="fixed bottom-6 right-6 z-50"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1.5, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
    >
      <Link
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] text-white shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200"
      >
        <MessageCircle className="w-6 h-6 fill-white" />
      </Link>

      {/* Subtle pulse ring */}
      <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20" />
    </motion.div>
  );
}
