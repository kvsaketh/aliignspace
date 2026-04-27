"use client";

interface Step {
  number: string;
  title: string;
  description: string;
}

interface Props {
  title?: string;
  subtitle?: string;
  steps?: Step[];
}

export function AertsenProcessWheel({
  title = "Our Process",
  subtitle,
  steps = [],
}: Props) {
  if (!steps.length) return null;

  return (
    <section className="py-20 lg:py-28 bg-[#1A1612]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-12 lg:mb-16">
          {subtitle && (
            <span className="block font-sans text-[11px] uppercase tracking-[0.25em] text-[#D46546] mb-3">
              {subtitle}
            </span>
          )}
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-white">{title}</h2>
        </div>

        {/* Steps */}
        <div className="flex flex-col lg:flex-row items-start">
          {steps.map((step, i) => {
            const isLast = i === steps.length - 1;
            return (
              <div key={step.number} className="flex lg:flex-col flex-1 relative">

                {/* Mobile vertical connector */}
                {!isLast && (
                  <div className="lg:hidden absolute left-[19px] top-10 bottom-0 w-px bg-[#D46546]/20" />
                )}
                {/* Desktop horizontal connector */}
                {!isLast && (
                  <div
                    className="hidden lg:block absolute h-px bg-[#D46546]/20"
                    style={{ top: "19px", left: "calc(50% + 22px)", right: 0 }}
                  />
                )}

                <div className="flex lg:flex-col items-start lg:items-center gap-4 lg:gap-0 pb-10 lg:pb-0 relative">
                  {/* Number circle */}
                  <div className="flex-shrink-0 w-10 h-10 rounded-full border border-[#D46546]/50 bg-[#D46546]/10 flex items-center justify-center z-10">
                    <span className="font-sans text-xs font-bold text-[#D46546]">{step.number}</span>
                  </div>

                  {/* Text */}
                  <div className="lg:text-center lg:mt-5 lg:px-3">
                    <h3 className="font-serif text-base sm:text-lg text-white mb-1.5">
                      {step.title}
                    </h3>
                    <p className="font-sans text-sm text-white/50 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default AertsenProcessWheel;
