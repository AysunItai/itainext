import Image from "next/image";
import ReviewCTAButton from "./ReviewCTAButton";

/**
 * Compact homepage founder block — small portrait + short intro.
 */
export default function FounderTrust() {
  return (
    <section
      id="founder"
      aria-labelledby="founder-title"
      className="relative scroll-mt-24 px-5 py-12 sm:px-8 sm:py-16"
    >
      <div className="mx-auto max-w-4xl">
        <div className="rounded-3xl border border-line bg-paper-soft p-6 sm:p-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:gap-8">
            <figure className="mx-auto shrink-0 sm:mx-0">
              <div
                className="relative h-28 w-28 overflow-hidden rounded-2xl border border-line bg-mist shadow-soft sm:h-32 sm:w-32"
              >
                <Image
                  src="/me2.jpg"
                  alt="Aysun Itai, software engineer and founder of Itai Web Solutions"
                  width={640}
                  height={640}
                  sizes="128px"
                  quality={85}
                  className="h-full w-full object-cover object-[center_15%]"
                />
              </div>
            </figure>

            <div className="min-w-0 text-center sm:text-left">
              <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-muted">
                Founder
              </p>
              <h2
                id="founder-title"
                className="mt-2 text-balance text-2xl font-semibold tracking-[-0.02em] text-ink sm:text-[1.65rem]"
              >
                Meet the person behind Itai Web Solutions
              </h2>

              <div className="mt-4 space-y-3 text-pretty text-[15px] leading-6 text-muted sm:text-base sm:leading-7">
                <p>
                  Hi, I&apos;m Aysun. I&apos;m a software engineer and
                  full-stack developer helping small businesses build modern
                  websites, improve Google visibility, and add practical AI
                  tools.
                </p>
                <p>
                  I work with international clients remotely. My goal is simple:
                  build websites that look professional, load fast, and help people
                  contact you more easily.
                </p>
              </div>

              <div className="mt-6 flex justify-center sm:justify-start">
                <ReviewCTAButton
                  location="homepage_founder"
                  label="Book a Free Website Review"
                  className="group inline-flex min-h-[44px] w-full items-center justify-center gap-2 whitespace-nowrap rounded-full bg-ink px-6 py-3 text-sm font-medium text-paper shadow-soft transition-all hover:-translate-y-0.5 hover:bg-ink-soft hover:shadow-lifted sm:w-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
