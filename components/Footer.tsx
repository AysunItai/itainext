import Image from "next/image";
import Link from "next/link";

const FOOTER_LINKS = {
  Solutions: [
    { label: "Custom websites", href: "/#services" },
    { label: "AI automation", href: "/#services" },
    { label: "Booking systems", href: "/#services" },
    { label: "Dashboards", href: "/#services" },
  ],
  Studio: [
    { label: "Work", href: "/#work" },
    { label: "Process", href: "/#process" },
    { label: "Pricing", href: "/#pricing" },
    { label: "Notes", href: "/blog" },
    { label: "About", href: "/about" },
    { label: "Book a call", href: "/book" },
    { label: "Contact", href: "/contact" },
  ],
  Connect: [
    { label: "Email", href: "mailto:info@itaiwebsolutions.com" },
    { label: "GitHub", href: "#" },
    { label: "LinkedIn", href: "#" },
    { label: "X (Twitter)", href: "#" },
  ],
} as const;

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="relative mt-auto border-t border-line bg-paper px-5 pb-10 pt-20 sm:px-8 sm:pt-24"
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-5">
            <Link href="/" aria-label="ITAI — home" className="inline-block">
              <Image
                src="/logo.png"
                alt=""
                width={605}
                height={185}
                sizes="240px"
                className="h-12 w-auto"
              />
              <span className="sr-only">ITAI</span>
            </Link>
            <p className="mt-5 max-w-sm text-pretty text-[15px] leading-7 text-muted">
              ITAI is a small studio engineering modern digital systems —
              websites, automations, and tools that help growing businesses
              scale.
            </p>

            <Link
              href="mailto:info@itaiwebsolutions.com"
              className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-ink underline decoration-line underline-offset-4 transition-colors hover:decoration-ink"
            >
              info@itaiwebsolutions.com
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 md:col-span-7">
            {Object.entries(FOOTER_LINKS).map(([title, links]) => (
              <div key={title}>
                <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-ink">
                  {title}
                </h3>
                <ul className="mt-5 space-y-3 text-sm">
                  {links.map((l) => (
                    <li key={l.label}>
                      <Link
                        href={l.href}
                        className="text-muted transition-colors hover:text-ink"
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-line pt-8 text-xs text-muted sm:flex-row sm:items-center">
          <p>© {year} ITAI. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="#" className="transition-colors hover:text-ink">
              Privacy
            </Link>
            <Link href="#" className="transition-colors hover:text-ink">
              Terms
            </Link>
            <Link href="#top" className="transition-colors hover:text-ink">
              Back to top ↑
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
