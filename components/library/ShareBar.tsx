"use client";

import { Check, Link2, Share2 } from "lucide-react";
import { useCallback, useMemo, useState } from "react";
import {
  FacebookGlyph,
  LinkedInGlyph,
  WhatsAppGlyph,
  XGlyph,
} from "./brand-icons";

type Variant = "light" | "dark";

type ShareTarget = {
  id: string;
  label: string;
  href: string;
  icon: React.ReactNode;
};

function buildAbsoluteUrl(path: string): string {
  const normalised = path.startsWith("/") ? path : `/${path}`;
  const envOrigin = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
  if (envOrigin) return `${envOrigin}${normalised}`;
  if (typeof window !== "undefined") {
    return `${window.location.origin}${normalised}`;
  }
  return normalised;
}

export default function ShareBar({
  /** Path beginning with `/` — used to build the absolute share URL. */
  path,
  /** Plain-text title used in tweet / WhatsApp body. */
  title,
  /** Optional one-line context appended before the URL on networks that
   *  accept arbitrary text (X, WhatsApp). */
  text,
  /** "Share this volume" or similar — overrides default label. */
  eyebrow = "Share",
  variant = "light",
  className = "",
}: {
  path: string;
  title: string;
  text?: string;
  eyebrow?: string;
  variant?: Variant;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);

  const absoluteUrl = useMemo(() => buildAbsoluteUrl(path), [path]);
  const composed = useMemo(() => text ?? title, [text, title]);

  const targets: ShareTarget[] = useMemo(() => {
    const u = encodeURIComponent(absoluteUrl);
    const t = encodeURIComponent(composed);
    const tu = encodeURIComponent(`${composed}\n${absoluteUrl}`);
    return [
      {
        id: "x",
        label: "Share on X",
        href: `https://twitter.com/intent/tweet?text=${t}&url=${u}`,
        icon: <XGlyph className="h-[15px] w-[15px]" />,
      },
      {
        id: "linkedin",
        label: "Share on LinkedIn",
        href: `https://www.linkedin.com/sharing/share-offsite/?url=${u}`,
        icon: <LinkedInGlyph className="h-[15px] w-[15px]" />,
      },
      {
        id: "facebook",
        label: "Share on Facebook",
        href: `https://www.facebook.com/sharer/sharer.php?u=${u}`,
        icon: <FacebookGlyph className="h-[15px] w-[15px]" />,
      },
      {
        id: "whatsapp",
        label: "Share on WhatsApp",
        href: `https://wa.me/?text=${tu}`,
        icon: <WhatsAppGlyph className="h-[15px] w-[15px]" />,
      },
    ];
  }, [absoluteUrl, composed]);

  const openShare = useCallback((href: string) => {
    if (typeof window === "undefined") return;
    const w = 640;
    const h = 640;
    const left = Math.max(0, (window.screen.availWidth - w) / 2);
    const top = Math.max(0, (window.screen.availHeight - h) / 2);
    window.open(
      href,
      "share",
      `noopener,noreferrer,popup=yes,width=${w},height=${h},left=${left},top=${top}`,
    );
  }, []);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(absoluteUrl);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      // Older browsers — silently no-op. The link is still selectable.
    }
  }, [absoluteUrl]);

  const handleNativeShare = useCallback(async () => {
    // Capability-check at click time so we don't need state.
    if (typeof navigator === "undefined" || typeof navigator.share !== "function") {
      // Graceful fallback: copy to clipboard instead.
      void handleCopy();
      return;
    }
    try {
      await navigator.share({ title, text: composed, url: absoluteUrl });
    } catch {
      // User cancelled — no-op.
    }
  }, [absoluteUrl, composed, handleCopy, title]);

  const isDark = variant === "dark";

  const btn = isDark
    ? "border-paper/15 bg-paper/5 text-paper/85 hover:border-paper/30 hover:bg-paper/10 hover:text-paper"
    : "border-line bg-paper text-ink/70 hover:-translate-y-0.5 hover:border-ink/20 hover:bg-paper hover:text-ink hover:shadow-soft";

  const eyebrowColor = isDark ? "text-paper/55" : "text-muted";

  return (
    <div
      aria-label="Share"
      className={["flex flex-wrap items-center gap-x-4 gap-y-3", className].join(
        " ",
      )}
    >
      <span
        className={[
          "font-mono text-[10px] uppercase tracking-[0.28em]",
          eyebrowColor,
        ].join(" ")}
      >
        {eyebrow}
      </span>

      <ul role="list" className="flex flex-wrap items-center gap-2">
        {targets.map((t) => (
          <li key={t.id}>
            <button
              type="button"
              onClick={() => openShare(t.href)}
              aria-label={t.label}
              title={t.label}
              className={[
                "inline-flex h-9 w-9 items-center justify-center rounded-full border transition-all",
                btn,
              ].join(" ")}
            >
              {t.icon}
            </button>
          </li>
        ))}

        <li>
          <button
            type="button"
            onClick={handleCopy}
            aria-label={copied ? "Link copied" : "Copy link"}
            aria-live="polite"
            className={[
              "inline-flex h-9 items-center gap-2 rounded-full border px-3.5 text-[12px] font-medium transition-all",
              btn,
            ].join(" ")}
          >
            {copied ? (
              <Check className="h-3.5 w-3.5" strokeWidth={2.5} />
            ) : (
              <Link2 className="h-3.5 w-3.5" strokeWidth={2} />
            )}
            <span>{copied ? "Copied" : "Copy link"}</span>
          </button>
        </li>

        {/* Native share — visible on touch screens; gracefully falls back to
            copy if the browser doesn't support the Web Share API. */}
        <li className="sm:hidden">
          <button
            type="button"
            onClick={handleNativeShare}
            aria-label="Open native share menu"
            className={[
              "inline-flex h-9 items-center gap-2 rounded-full border px-3.5 text-[12px] font-medium transition-all",
              btn,
            ].join(" ")}
          >
            <Share2 className="h-3.5 w-3.5" strokeWidth={2} />
            <span>Share</span>
          </button>
        </li>
      </ul>
    </div>
  );
}
