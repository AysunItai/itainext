import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { formatDate } from "@/lib/blog";
import AdminNav from "@/components/admin/AdminNav";
import SubscriberRowActions from "@/components/admin/SubscriberRowActions";

export const metadata: Metadata = { title: "Subscribers" };
export const dynamic = "force-dynamic";

export default async function SubscribersPage() {
  const subs = await prisma.subscriber.findMany({
    orderBy: { createdAt: "desc" },
  });

  const confirmed = subs.filter(
    (s) => s.confirmed && !s.unsubscribedAt,
  ).length;
  const pending = subs.filter(
    (s) => !s.confirmed && !s.unsubscribedAt,
  ).length;
  const unsubscribed = subs.filter((s) => s.unsubscribedAt).length;

  return (
    <>
      <AdminNav />
      <main className="mx-auto max-w-6xl px-6 py-12">
        <header className="mb-10 flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink/45">
              Studio · Audience
            </p>
            <h1 className="mt-2 text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
              Subscribers
            </h1>
            <p className="mt-3 text-sm text-ink/60">
              {confirmed} confirmed · {pending} awaiting confirmation
              {unsubscribed > 0 ? ` · ${unsubscribed} unsubscribed` : ""}
            </p>
          </div>
          {subs.length > 0 ? (
            <a
              href="/api/admin/subscribers?format=csv"
              download
              className="inline-flex h-11 items-center justify-center rounded-full border border-ink/15 px-5 text-sm font-medium text-ink/80 transition hover:border-ink/30 hover:text-ink"
            >
              Export CSV ↓
            </a>
          ) : null}
        </header>

        {subs.length === 0 ? (
          <EmptyState />
        ) : (
          <ul className="overflow-hidden rounded-3xl border border-ink/10 bg-paper">
            {subs.map((sub, idx) => {
              const status = sub.unsubscribedAt
                ? "unsubscribed"
                : sub.confirmed
                  ? "confirmed"
                  : "pending";
              return (
                <li
                  key={sub.id}
                  className={`flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:gap-6 ${
                    idx === 0 ? "" : "border-t border-ink/10"
                  }`}
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="truncate text-base font-medium text-ink">
                        {sub.email}
                      </span>
                      <StatusPill status={status} />
                    </div>
                    <p className="mt-1 text-xs text-ink/55">
                      Joined {formatDate(sub.createdAt)}
                      {sub.confirmedAt ? (
                        <>
                          <span className="mx-2 text-ink/25">·</span>
                          Confirmed {formatDate(sub.confirmedAt)}
                        </>
                      ) : null}
                      {sub.unsubscribedAt ? (
                        <>
                          <span className="mx-2 text-ink/25">·</span>
                          Unsubscribed {formatDate(sub.unsubscribedAt)}
                        </>
                      ) : null}
                    </p>
                  </div>
                  <SubscriberRowActions id={sub.id} email={sub.email} />
                </li>
              );
            })}
          </ul>
        )}
      </main>
    </>
  );
}

function StatusPill({
  status,
}: {
  status: "confirmed" | "pending" | "unsubscribed";
}) {
  const map = {
    confirmed: { label: "Confirmed", classes: "bg-accent/15 text-accent-soft", dot: "bg-accent" },
    pending: { label: "Pending", classes: "bg-amber-500/15 text-amber-700", dot: "bg-amber-500" },
    unsubscribed: { label: "Unsubscribed", classes: "bg-ink/[0.05] text-ink/55", dot: "bg-ink/40" },
  } as const;
  const m = map[status];
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[10px] font-mono uppercase tracking-[0.14em] ${m.classes}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${m.dot}`} />
      {m.label}
    </span>
  );
}

function EmptyState() {
  return (
    <div className="rounded-3xl border border-dashed border-ink/15 bg-paper p-12 text-center">
      <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink/40">
        Nobody yet
      </p>
      <h2 className="mt-3 text-2xl font-semibold tracking-tight text-ink">
        Your audience starts here.
      </h2>
      <p className="mx-auto mt-2 max-w-md text-sm text-ink/60">
        Once readers subscribe and confirm their email, they&apos;ll appear in
        this list. Share <span className="font-mono text-ink/70">/blog</span>{" "}
        to start gathering an audience.
      </p>
    </div>
  );
}
