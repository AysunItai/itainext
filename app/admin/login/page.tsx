import type { Metadata } from "next";
import { Suspense } from "react";
import LoginForm from "@/components/admin/LoginForm";

export const metadata: Metadata = {
  title: "Sign in",
  robots: { index: false, follow: false },
};

export default function AdminLoginPage() {
  return (
    <main
      id="main"
      className="relative isolate flex min-h-[calc(100vh-4rem)] items-center justify-center overflow-hidden px-6 py-24"
    >
      <BackgroundField />
      <div className="relative w-full max-w-md">
        <div className="rounded-3xl border border-ink/10 bg-paper/85 p-8 shadow-soft backdrop-blur sm:p-10">
          <div className="mb-8 flex flex-col gap-3">
            <span className="inline-flex w-fit items-center gap-2 rounded-full border border-ink/10 bg-ink/[0.03] px-3 py-1 text-[10px] font-mono uppercase tracking-[0.18em] text-ink/60">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              Admin · Restricted
            </span>
            <h1 className="text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
              Sign in to write.
            </h1>
            <p className="text-sm text-ink/60">
              Enter the admin password to access the editor.
            </p>
          </div>
          <Suspense fallback={null}>
            <LoginForm />
          </Suspense>
        </div>
        <p className="mt-6 text-center text-xs font-mono uppercase tracking-[0.16em] text-ink/40">
          ITAI · Studio
        </p>
      </div>
    </main>
  );
}

function BackgroundField() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
      <div className="absolute -top-24 left-1/2 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-accent/[0.06] blur-3xl" />
      <div className="absolute bottom-0 right-0 h-[280px] w-[280px] translate-x-1/3 translate-y-1/3 rounded-full bg-ink/[0.04] blur-3xl" />
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)",
          backgroundSize: "32px 32px",
          color: "var(--color-ink, #0a0a0a)",
        }}
      />
    </div>
  );
}
