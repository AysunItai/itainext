/**
 * Pure-CSS animated hero background — shared by English and Hebrew homepages.
 * See `components/Hero.tsx` for rationale (LCP + mobile performance).
 */
export default function HeroAnimatedBackground() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_55%_at_50%_50%,rgba(30,58,138,0.1),transparent_68%)]" />

      <div className="absolute left-1/2 top-1/2 h-[720px] w-[720px] -translate-x-1/2 -translate-y-1/2 bg-[linear-gradient(to_right,rgba(15,23,42,0.035)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.035)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:radial-gradient(circle,black,transparent_68%)]" />

      <div
        className="absolute left-1/2 top-1/2 h-[680px] w-[680px] rounded-full border border-ink/[0.045] motion-safe:[animation:hero-spin-slow_80s_linear_infinite]"
        style={{ transform: "translate(-50%, -50%)" }}
      />

      <div
        className="absolute left-1/2 top-1/2 h-[460px] w-[460px] rounded-full border border-accent/10 motion-safe:[animation:hero-spin-reverse_110s_linear_infinite]"
        style={{ transform: "translate(-50%, -50%)" }}
      />

      <div
        className="absolute left-1/2 top-1/2 hidden h-[560px] w-[560px] rounded-[42%] border border-accent/15 sm:block motion-safe:[animation:hero-spin-reverse_44s_linear_infinite]"
        style={{
          transform: "translate(-50%, -50%) rotateX(64deg)",
          transformStyle: "preserve-3d",
        }}
      />

      <div
        className="absolute left-1/2 top-1/2 h-[280px] w-[460px] rounded-full bg-accent blur-3xl motion-safe:[animation:hero-pulse_8s_ease-in-out_infinite]"
        style={{ transform: "translate(-50%, -50%)", opacity: 0.18 }}
      />

      <div className="absolute left-0 top-1/2 hidden h-px w-96 -translate-y-1/2 bg-gradient-to-r from-transparent via-accent/55 to-transparent sm:block motion-safe:[animation:hero-streak-right_9s_ease-in-out_infinite]" />

      <div className="absolute left-0 top-[54%] hidden h-px w-80 bg-gradient-to-r from-transparent via-ink/25 to-transparent sm:block motion-safe:[animation:hero-streak-left_12s_ease-in-out_infinite]" />

      <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-b from-transparent to-paper" />
    </div>
  );
}
