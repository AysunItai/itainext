import { getLemonCheckoutUrl } from "@/lib/lemon-checkout";

/**
 * Renders a styled link pointing at the hosted checkout URL for a given
 * product slug. Same component signature the page used to call when it
 * was a client component that POSTed to /api/checkout — keeping the
 * shape stable lets the existing call sites in ProductContent stay put.
 *
 * If the URL is missing (env var not set), renders a disabled button so
 * the page still lays out correctly instead of crashing.
 */
export default function BuyButton({
  slug,
  className,
  children,
}: {
  slug: string;
  className: string;
  children: React.ReactNode;
}) {
  const url = getLemonCheckoutUrl(slug);

  if (!url) {
    return (
      <button
        type="button"
        disabled
        aria-disabled
        className={`${className} disabled:cursor-not-allowed disabled:opacity-60`}
      >
        {children}
      </button>
    );
  }

  return (
    <a href={url} className={className}>
      {children}
    </a>
  );
}
