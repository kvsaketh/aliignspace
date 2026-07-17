import { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

export const metadata: Metadata = {
  title: "Terms of Service | ALIIGNSPACE",
  description: "Terms and conditions for using the ALIIGNSPACE website and services.",
};

export default function TermsPage() {
  return (
    <>
      <Header />
      <main className="bg-white">
        <section className="pt-32 pb-16 bg-[#1a1720]">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="font-serif text-4xl sm:text-5xl font-medium text-white">
              Terms of Service
            </h1>
            <p className="font-sans text-white/50 mt-3 text-sm">Last updated: 2026</p>
          </div>
        </section>

        <section className="py-16 lg:py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl font-sans text-stone-600 leading-relaxed space-y-6">
            <p>
              These terms govern your use of the ALIIGNSPACE website. By browsing this site
              or submitting an enquiry, you agree to the terms below.
            </p>

            <h2 className="font-serif text-2xl font-medium text-[#1a1720] pt-4">Website content</h2>
            <p>
              All text, images, and designs shown on this website are for informational
              purposes and represent illustrative examples of our work. Actual project
              outcomes may vary based on site conditions, material availability, and client
              preferences finalised during the design process.
            </p>

            <h2 className="font-serif text-2xl font-medium text-[#1a1720] pt-4">Enquiries and consultations</h2>
            <p>
              Submitting the contact or consultation form does not create a binding
              agreement for services. A formal engagement begins only once a project scope,
              Bill of Quantities (BOQ), and contract have been reviewed and signed by both
              parties.
            </p>

            <h2 className="font-serif text-2xl font-medium text-[#1a1720] pt-4">Pricing</h2>
            <p>
              Any pricing ranges, timelines, or estimates referenced on this site are
              indicative only. Final pricing is confirmed in writing after a site visit and
              design consultation.
            </p>

            <h2 className="font-serif text-2xl font-medium text-[#1a1720] pt-4">Intellectual property</h2>
            <p>
              Design concepts, renders, and materials shared with you during a project remain
              the intellectual property of ALIIGNSPACE until full payment is received, unless
              otherwise agreed in writing.
            </p>

            <h2 className="font-serif text-2xl font-medium text-[#1a1720] pt-4">Limitation of liability</h2>
            <p>
              ALIIGNSPACE is not liable for indirect or consequential losses arising from use
              of this website. For matters relating to an active project, the terms of your
              signed contract take precedence over this page.
            </p>

            <h2 className="font-serif text-2xl font-medium text-[#1a1720] pt-4">Contact</h2>
            <p>
              Questions about these terms can be sent to{" "}
              <a href="mailto:hello@aliignspace.com" className="text-[#6D28D9] hover:underline">hello@aliignspace.com</a> or
              +91 90304 44503.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
