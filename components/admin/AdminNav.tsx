"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

type Props = {
  current?: "dashboard" | "new" | "edit" | "subscribers";
  rightSlot?: React.ReactNode;
};

export default function AdminNav({ current = "dashboard", rightSlot }: Props) {
  const router = useRouter();
  const [signingOut, setSigningOut] = useState(false);

  async function handleSignOut() {
    if (signingOut) return;
    setSigningOut(true);
    try {
      await fetch("/api/admin/logout", { method: "POST" });
    } finally {
      router.replace("/admin/login");
      router.refresh();
    }
  }

  return (
    <header className="sticky top-0 z-40 border-b border-ink/10 bg-paper/85 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 px-6">
        <div className="flex items-center gap-6">
          <Link
            href="/admin"
            className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink/70 transition hover:text-ink"
          >
            ITAI · Admin
          </Link>
          <nav className="hidden items-center gap-1 sm:flex">
            <NavItem href="/admin" active={current === "dashboard"}>
              Posts
            </NavItem>
            <NavItem href="/admin/posts/new" active={current === "new"}>
              New post
            </NavItem>
            <NavItem
              href="/admin/subscribers"
              active={current === "subscribers"}
            >
              Subscribers
            </NavItem>
            <NavItem href="/blog" external>
              View blog ↗
            </NavItem>
          </nav>
        </div>
        <div className="flex items-center gap-2">
          {rightSlot}
          <button
            type="button"
            onClick={handleSignOut}
            disabled={signingOut}
            className="rounded-full border border-ink/15 px-3 py-1.5 text-[11px] font-mono uppercase tracking-[0.16em] text-ink/65 transition hover:border-ink/30 hover:text-ink disabled:opacity-50"
          >
            {signingOut ? "…" : "Sign out"}
          </button>
        </div>
      </div>
    </header>
  );
}

function NavItem({
  href,
  active,
  external,
  children,
}: {
  href: string;
  active?: boolean;
  external?: boolean;
  children: React.ReactNode;
}) {
  const className = `rounded-full px-3 py-1.5 text-[12px] tracking-tight transition ${
    active
      ? "bg-ink text-paper"
      : "text-ink/65 hover:bg-ink/5 hover:text-ink"
  }`;
  if (external) {
    return (
      <a href={href} className={className} target="_blank" rel="noreferrer">
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}
