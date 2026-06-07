"use client";

import { useState } from "react";

/**
 * Tiny client component that turns a click into a Stripe Checkout
 * redirect. POSTs only `{ slug }` to /api/checkout — the server is the
 * one and only place that knows the price.
 *
 * Renders the button you give it (children + className), plus an error
 * line below if the request fails. Wraps both in a flex-column div so
 * the button keeps its parent's sizing while the error sits beneath.
 */
export default function BuyButton({
  slug,
  className,
  children,
  loadingLabel = "Starting checkout…",
}: {
  slug: string;
  className: string;
  children: React.ReactNode;
  loadingLabel?: string;
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onClick() {
    setLoading(true);
    setError(null);

    let data: unknown = null;
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug }),
      });
      data = await res.json().catch(() => null);

      if (
        res.ok &&
        data &&
        typeof data === "object" &&
        "url" in data &&
        typeof (data as { url: unknown }).url === "string"
      ) {
        // Hand off to Stripe-hosted Checkout. We don't reset loading on
        // purpose — the page is about to unload.
        window.location.assign((data as { url: string }).url);
        return;
      }

      const message =
        data &&
        typeof data === "object" &&
        "error" in data &&
        typeof (data as { error: unknown }).error === "string"
          ? (data as { error: string }).error
          : "Couldn't start checkout. Please try again.";
      setError(message);
    } catch {
      setError("Couldn't reach the server. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col items-stretch sm:items-start">
      <button
        type="button"
        onClick={onClick}
        disabled={loading}
        aria-busy={loading}
        className={`${className} disabled:cursor-wait disabled:opacity-70`}
      >
        {loading ? loadingLabel : children}
      </button>
      {error && (
        <p
          role="alert"
          className="mt-3 max-w-md text-[13px] leading-6 text-red-700"
        >
          {error}
        </p>
      )}
    </div>
  );
}
