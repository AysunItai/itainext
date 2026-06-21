import Image from "next/image";
import ReviewCTAButton from "./ReviewCTAButton";

/**
 * Homepage founder trust block — warm portrait + personal intro.
 * Server component; only the CTA button hydrates for analytics.
 */
export default function FounderTrust() {
  return (
    <section
      id="founder"
      aria-labelledby="founder-title"
      className="relative scroll-mt-24 border-y border-line bg-paper-soft px-5 py-16 sm:px-8 sm:py-24"
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="order-2 lg:order-1 lg:col-span-7">
            <p className="text-xs font-medium uppercase tracking-[0.25em] text-muted">
              Founder
            </p>
            <h2
              id="founder-title"
              className="mt-4 text-balance text-3xl font-semibold tracking-[-0.03em] text-ink sm:text-4xl lg:text-[2.5rem] lg:leading-[1.1]"
            >
              Meet the person behind Itai Web Solutions
            </h2>

            <div className="mt-8 max-w-xl space-y-5 text-pretty text-base leading-7 text-muted sm:text-lg">
              <p>
                Hi, I&apos;m Aysun. I&apos;m a software engineer and full-stack
                developer helping small businesses build modern websites,
                improve Google visibility, and add practical AI tools.
              </p>
              <p>
                I work with local businesses in Israel and international clients
                remotely. My goal is simple: build websites that look
                professional, load fast, and help people contact you more easily.
              </p>
            </div>

            <div className="mt-10">
              <ReviewCTAButton
                location="homepage_founder"
                label="Book a Free Website Review"
              />
            </div>
          </div>

          <div className="order-1 lg:order-2 lg:col-span-5">
            <div className="relative mx-auto max-w-sm lg:max-w-none">
              <div
                aria-hidden
                className="pointer-events-none absolute -inset-6 -z-10 rounded-[32px] bg-[radial-gradient(circle_at_50%_40%,rgba(30,58,138,0.12),transparent_68%)] blur-2xl"
              />
              <figure
                className="relative overflow-hidden rounded-3xl border border-line bg-mist shadow-soft"
              >
                <div className="relative aspect-square sm:aspect-[4/5]">
                  <Image
                    src="/me2.jpg"
                    alt="Aysun Itai, software engineer and founder of Itai Web Solutions"
                    width={640}
                    height={640}
                    sizes="(min-width: 1024px) 420px, (min-width: 640px) 384px, 88vw"
                    quality={85}
                    className="h-full w-full object-cover object-[center_15%]"
                  />
                </div>
              </figure>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
