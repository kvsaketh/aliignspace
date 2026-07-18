import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="bg-white">
        <section className="pt-40 pb-24 bg-[#1a1720] text-center">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <span className="font-sans text-xs font-semibold tracking-[0.25em] uppercase text-[#6D28D9] block mb-4">
              404
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl font-medium text-white mb-4">
              Page not found
            </h1>
            <p className="font-sans text-white/60 max-w-md mx-auto mb-8">
              The page you&apos;re looking for doesn&apos;t exist or may have moved.
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-coral-500 text-white text-sm font-semibold hover:bg-coral-600 transition-colors"
            >
              Back to Home
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
