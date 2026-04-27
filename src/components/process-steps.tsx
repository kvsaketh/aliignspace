"use client";

import { CheckCircle2, Clock, FileText, Hammer, Heart, MessageSquare, Palette } from "lucide-react";
import {
  IllustrationMeetDesigner,
  IllustrationVisualise,
  IllustrationFreezeDesign,
  IllustrationExecution,
  IllustrationHandover,
} from "@/components/ui/process-illustrations";

const steps = [
  {
    number: "01",
    icon: <MessageSquare className="w-6 h-6" />,
    title: "Meet Designer",
    subtitle: "The conversation that starts everything",
    description:
      "A relaxed, no-pressure meeting with our designer — at your home, our Jubilee Hills studio, or over a call. We listen to your vision, understand your lifestyle, and ask the right questions. We don't begin designing until we truly know what you want your home to feel like.",
    duration: "Day 1–3",
    deliverables: [
      "Initial consultation (60–90 min)",
      "Site measurement & assessment",
      "Style & mood preference discussion",
      "Preliminary budget alignment",
    ],
    illustration: <IllustrationMeetDesigner />,
  },
  {
    number: "02",
    icon: <Palette className="w-6 h-6" />,
    title: "Visualise Your Home",
    subtitle: "See it before it's built",
    description:
      "Our architects create detailed 3D renders of every room. You see exactly what your finished space looks like — from furniture placement to lighting to material finishes. Revisions are included until you love every corner.",
    duration: "Day 4–12",
    deliverables: [
      "3D renders for all rooms",
      "Material & finish mood boards",
      "Lighting design plan",
      "Unlimited revisions until approved",
    ],
    illustration: <IllustrationVisualise />,
  },
  {
    number: "03",
    icon: <Heart className="w-6 h-6" />,
    title: "Freeze Design",
    subtitle: "Sign off before a single nail is hammered",
    description:
      "Once you're happy with the 3D designs, we prepare a complete, itemised Bill of Quantities (BOQ) — every material, fitting, and labour cost listed out. You approve the final design and BOQ. Nothing proceeds to execution without your explicit sign-off.",
    duration: "Day 13–18",
    deliverables: [
      "Complete itemised BOQ",
      "Final material selections locked",
      "Project timeline issued",
      "Contract signed & work order issued",
    ],
    illustration: <IllustrationFreezeDesign />,
  },
  {
    number: "04",
    icon: <Hammer className="w-6 h-6" />,
    title: "Execution Begins",
    subtitle: "Our team gets to work",
    description:
      "A dedicated site supervisor is on-site every day. Our skilled craftsmen execute the approved design with precision — all materials sourced, all work tracked. You receive weekly photo progress reports throughout.",
    duration: "Day 19–80",
    deliverables: [
      "Dedicated site supervisor assigned",
      "Weekly photo & progress reports",
      "All materials sourced & quality-checked",
      "On-schedule milestone tracking",
    ],
    illustration: <IllustrationExecution />,
  },
  {
    number: "05",
    icon: <Palette className="w-6 h-6" />,
    title: "Happy Handover",
    subtitle: "Your moment of wow",
    description:
      "We walk through every room together, resolve every last punch-list item, and hand over your dream home — exactly as approved in the 3D renders. Your reaction at handover is the only metric we care about. Post-handover support included.",
    duration: "Day 81–90",
    deliverables: [
      "Full walkthrough & final inspection",
      "All punch-list items resolved",
      "Cleaning & styling complete",
      "Post-handover support commitment",
    ],
    illustration: <IllustrationHandover />,
  },
];

export function ProcessSteps() {
  return (
    <section className="py-20 lg:py-32 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-28">
          {steps.map((step, index) => (
            <div
              key={step.number}
              className={`grid lg:grid-cols-2 gap-12 lg:gap-20 items-center ${
                index % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""
              }`}
            >
              {/* Illustration */}
              <div className="relative">
                <div className="relative aspect-[4/3] overflow-hidden rounded-sm">
                  {step.illustration}
                </div>
                {/* Step number */}
                <div className="absolute -top-5 -left-5 w-16 h-16 bg-[#D46546] flex items-center justify-center">
                  <span className="font-serif text-white text-xl font-medium">{step.number}</span>
                </div>
                {/* Duration badge */}
                <div className="absolute bottom-4 right-4 bg-[#1C1917]/90 backdrop-blur-sm px-4 py-2">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-[#D46546]" />
                    <span className="font-sans text-white text-xs font-medium">{step.duration}</span>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-[#D46546]/10 flex items-center justify-center text-[#D46546]">
                    {step.icon}
                  </div>
                  <span className="font-sans text-xs font-semibold text-[#D46546] tracking-wider uppercase">
                    {step.subtitle}
                  </span>
                </div>
                <h2 className="font-serif text-3xl sm:text-4xl font-medium text-[#1C1917] mb-5">
                  {step.title}
                </h2>
                <p className="font-sans text-stone-600 leading-relaxed mb-8">
                  {step.description}
                </p>
                <div>
                  <p className="font-sans text-xs font-semibold text-stone-400 tracking-wider uppercase mb-4 flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    Deliverables
                  </p>
                  <ul className="space-y-3">
                    {step.deliverables.map((d) => (
                      <li key={d} className="flex items-center gap-3 font-sans text-sm text-stone-600">
                        <CheckCircle2 className="w-4 h-4 text-[#D46546] flex-shrink-0" />
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
