"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface Faq {
  q: string;
  a: string;
}

export function ServiceFaq({ faqs }: { faqs: Faq[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  if (!faqs || faqs.length === 0) return null;

  return (
    <div className="max-w-3xl mx-auto divide-y divide-gray-200">
      {faqs.map((faq, index) => {
        const isOpen = openIndex === index;
        return (
          <div key={index} className="py-1">
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : index)}
              aria-expanded={isOpen}
              className="w-full flex items-center justify-between gap-4 text-left py-5 group"
            >
              <span className="font-serif text-lg sm:text-xl font-medium text-[#1C1917] group-hover:text-[#D46546] transition-colors duration-200">
                {faq.q}
              </span>
              <span
                className={`flex-shrink-0 w-9 h-9 rounded-full border border-[#D46546]/30 flex items-center justify-center text-[#D46546] transition-all duration-300 ${
                  isOpen ? "bg-[#D46546] text-white rotate-180" : "bg-transparent"
                }`}
              >
                <ChevronDown className="w-5 h-5" />
              </span>
            </button>
            <div
              className={`grid transition-all duration-300 ease-in-out ${
                isOpen
                  ? "grid-rows-[1fr] opacity-100"
                  : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden">
                <p className="text-gray-600 font-sans leading-relaxed pb-6 pr-12">
                  {faq.a}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
