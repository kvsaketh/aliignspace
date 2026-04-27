"use client";

interface Props {
  title?: string;
}

export function AertsenPortfolioSlider({ title = "Portfolio" }: Props) {
  return (
    <section className="py-24 lg:py-32 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-serif text-3xl text-[#1A1612] text-center">{title}</h2>
      </div>
    </section>
  );
}

export default AertsenPortfolioSlider;
