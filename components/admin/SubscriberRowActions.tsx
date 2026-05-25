"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SubscriberRowActions({
  id,
  email,
}: {
  id: string;
  email: string;
}) {
  const router = useRouter();
  const [confirming, setConfirming] = useState(false);
  const [busy, setBusy] = useState(false);

  async function handleDelete() {
    if (busy) return;
    setBusy(true);
    try {
      const response = await fetch(`/api/admin/subscribers/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete.");
      router.refresh();
    } catch {
      setBusy(false);
      setConfirming(false);
      alert("Could not remove the subscriber. Try again.");
    }
  }

  if (!confirming) {
    return (
      <button
        type="button"
        onClick={() => setConfirming(true)}
        className="rounded-full border border-ink/15 px-3 py-1.5 text-[11px] font-mono uppercase tracking-[0.16em] text-ink/65 transition hover:border-red-500/40 hover:text-red-600"
        aria-label={`Remove ${email}`}
      >
        Remove
      </button>
    );
  }

  return (
    <span className="inline-flex items-center gap-1 rounded-full border border-red-500/30 bg-red-500/5 px-1 py-1">
      <button
        type="button"
        onClick={handleDelete}
        disabled={busy}
        className="rounded-full bg-red-600 px-3 py-1 text-[10px] font-mono uppercase tracking-[0.14em] text-white transition hover:bg-red-700 disabled:opacity-60"
      >
        {busy ? "…" : "Confirm"}
      </button>
      <button
        type="button"
        onClick={() => setConfirming(false)}
        disabled={busy}
        className="rounded-full px-2 py-1 text-[10px] font-mono uppercase tracking-[0.14em] text-ink/55 hover:text-ink"
      >
        Cancel
      </button>
    </span>
  );
}
