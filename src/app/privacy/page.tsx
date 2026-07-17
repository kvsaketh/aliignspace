import { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

export const metadata: Metadata = {
  title: "Privacy Policy | ALIIGNSPACE",
  description: "How ALIIGNSPACE collects, uses, and protects your personal information.",
};

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main className="bg-white">
        <section className="pt-32 pb-16 bg-[#1a1720]">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="font-serif text-4xl sm:text-5xl font-medium text-white">
              Privacy Policy
            </h1>
            <p className="font-sans text-white/50 mt-3 text-sm">Last updated: 2026</p>
          </div>
        </section>

        <section className="py-16 lg:py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl font-sans text-stone-600 leading-relaxed space-y-6">
            <p>
              ALIIGNSPACE (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;) respects your privacy.
              This policy explains what information we collect through this website and how
              we use it.
            </p>

            <h2 className="font-serif text-2xl font-medium text-[#1a1720] pt-4">Information we collect</h2>
            <p>
              When you submit our contact form, request a consultation, or subscribe to our
              newsletter, we collect the details you provide — which may include your name,
              phone number, email address, city, project type, budget range, and any message
              you send us.
            </p>

            <h2 className="font-serif text-2xl font-medium text-[#1a1720] pt-4">How we use it</h2>
            <p>
              We use this information solely to respond to your enquiry, schedule
              consultations, and share relevant updates about our interior design services.
              We do not sell your personal information to third parties.
            </p>

            <h2 className="font-serif text-2xl font-medium text-[#1a1720] pt-4">Data storage</h2>
            <p>
              Submissions are stored securely in our database and are accessible only to
              authorised ALIIGNSPACE staff for the purpose of following up on your enquiry.
            </p>

            <h2 className="font-serif text-2xl font-medium text-[#1a1720] pt-4">Your rights</h2>
            <p>
              You may request access to, correction of, or deletion of your personal data at
              any time by contacting us at{" "}
              <a href="mailto:hello@aliignspace.com" className="text-[#6D28D9] hover:underline">hello@aliignspace.com</a>.
            </p>

            <h2 className="font-serif text-2xl font-medium text-[#1a1720] pt-4">Contact</h2>
            <p>
              Questions about this policy can be sent to{" "}
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
