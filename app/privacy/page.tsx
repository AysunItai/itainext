import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export const metadata: Metadata = {
  title: {
    absolute: "Privacy Policy | ITAI Web Solutions",
  },
  description:
    "Privacy policy for ITAI Web Solutions website, forms, and lead requests.",
  alternates: { canonical: "/privacy" },
  openGraph: {
    title: "Privacy Policy · ITAI",
    description:
      "How ITAI Web Solutions collects, uses, and protects information submitted through this website.",
    url: "/privacy",
    type: "website",
  },
};

const COLLECT_ITEMS = [
  "Name",
  "Email address",
  "Website URL",
  "Optional phone number",
  "Message or project details you choose to share",
  "Basic website analytics data, such as pages visited and traffic source",
] as const;

const USE_ITEMS = [
  "To respond to your website review request",
  "To send practical suggestions about your website",
  "To contact you about services you asked about",
  "To improve our website, forms, and marketing",
] as const;

const THIRD_PARTY_ITEMS = [
  "Meta/Facebook lead forms",
  "Google Analytics",
  "Google Ads",
  "Resend/email services",
  "Website hosting providers",
] as const;

export default function PrivacyPage() {
  return (
    <main id="main" className="relative">
      <section
        aria-labelledby="privacy-title"
        className="relative isolate overflow-hidden px-5 pt-32 pb-16 sm:px-8 sm:pt-44 sm:pb-20"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_60%_50%_at_50%_45%,rgba(30,58,138,0.06),transparent_70%)]"
        />

        <div className="mx-auto max-w-3xl">
          <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-muted">
            Legal
          </p>
          <h1
            id="privacy-title"
            className="mt-5 text-balance text-4xl font-semibold tracking-tight text-ink sm:text-5xl"
          >
            Privacy Policy
          </h1>
          <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
            Last updated: June 2026
          </p>
          <p className="mt-8 text-pretty text-lg leading-8 text-muted">
            ITAI Web Solutions respects your privacy. This page explains what
            information we collect and how we use it.
          </p>
        </div>
      </section>

      <section className="border-t border-line px-5 pb-24 sm:px-8 sm:pb-32">
        <div className="mx-auto max-w-3xl space-y-14">
          <PolicyBlock title="Information we collect">
            <ul role="list" className="space-y-3">
              {COLLECT_ITEMS.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-[15px] leading-7 text-muted"
                >
                  <span
                    aria-hidden
                    className="mt-2.5 h-1.5 w-1.5 flex-none rounded-full bg-ink/30"
                  />
                  {item}
                </li>
              ))}
            </ul>
          </PolicyBlock>

          <PolicyBlock title="How we use your information">
            <ul role="list" className="space-y-3">
              {USE_ITEMS.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-[15px] leading-7 text-muted"
                >
                  <span
                    aria-hidden
                    className="mt-2.5 h-1.5 w-1.5 flex-none rounded-full bg-ink/30"
                  />
                  {item}
                </li>
              ))}
            </ul>
          </PolicyBlock>

          <PolicyBlock title="We do not sell your personal information">
            <p className="text-[15px] leading-7 text-muted">
              We do not sell, rent, or trade your personal information to third
              parties for their marketing purposes.
            </p>
          </PolicyBlock>

          <PolicyBlock title="Third-party services">
            <p className="text-[15px] leading-7 text-muted">
              We may use trusted tools such as{" "}
              {THIRD_PARTY_ITEMS.join(", ")} to receive, process, or understand
              requests.
            </p>
          </PolicyBlock>

          <PolicyBlock title="How long we keep information">
            <p className="text-[15px] leading-7 text-muted">
              We keep submitted information only as long as needed to respond to
              your request, provide services, or meet basic business and legal
              requirements.
            </p>
          </PolicyBlock>

          <PolicyBlock title="Your rights">
            <p className="text-[15px] leading-7 text-muted">
              You can ask us to access, correct, or delete your information by
              contacting us.
            </p>
          </PolicyBlock>

          <PolicyBlock title="Contact">
            <p className="text-[15px] leading-7 text-muted">
              <a
                href="mailto:info@itaiwebsolutions.com"
                className="font-medium text-ink underline decoration-line underline-offset-4 transition-colors hover:decoration-ink"
              >
                info@itaiwebsolutions.com
              </a>
            </p>
          </PolicyBlock>

          <div className="rounded-3xl border border-line bg-paper-soft p-8 sm:p-10">
            <p className="text-balance text-lg font-semibold tracking-tight text-ink">
              Questions about privacy? Contact us
            </p>
            <p className="mt-3 text-[15px] leading-7 text-muted">
              If anything here is unclear, or you want to exercise your rights,
              send a note and I&apos;ll get back to you.
            </p>
            <Link
              href="/contact"
              className="group mt-6 inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3.5 text-sm font-medium text-paper transition-all hover:-translate-y-0.5 hover:bg-ink-soft hover:shadow-lifted"
            >
              Contact us
              <ArrowUpRight
                aria-hidden
                className="h-4 w-4 transition-transform group-hover:-translate-y-px group-hover:translate-x-px"
                strokeWidth={2}
              />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

function PolicyBlock({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h2 className="text-xl font-semibold tracking-tight text-ink sm:text-2xl">
        {title}
      </h2>
      <div className="mt-5">{children}</div>
    </div>
  );
}
