/**
 * Monochrome brand glyphs as inline SVGs.
 *
 * The lucide-react version pinned to this project does not ship Facebook /
 * LinkedIn / X / WhatsApp glyphs. We inline simple, single-colour shapes that
 * inherit `currentColor` so they blend with the existing editorial palette.
 *
 * These are intentionally simplified marks — recognisable, not pixel-perfect
 * brand assets. Adjust if a partner's brand guidelines demand the official
 * mark.
 */

type IconProps = React.SVGProps<SVGSVGElement> & { className?: string };

const base = {
  viewBox: "0 0 24 24",
  fill: "currentColor",
  width: "1em",
  height: "1em",
  "aria-hidden": true,
} as const;

export function FacebookGlyph(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M13.5 22v-8.5h2.86l.43-3.32H13.5V8.07c0-.96.27-1.62 1.65-1.62h1.76V3.48c-.3-.04-1.35-.13-2.57-.13-2.54 0-4.28 1.55-4.28 4.4v2.45H7.2v3.32h2.86V22h3.44Z" />
    </svg>
  );
}

export function LinkedInGlyph(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9.75h3.97V21H3V9.75Zm6.5 0h3.8v1.55h.05c.53-.95 1.83-1.95 3.77-1.95 4.03 0 4.78 2.55 4.78 5.87V21h-3.97v-5.05c0-1.2-.02-2.75-1.7-2.75-1.7 0-1.96 1.3-1.96 2.65V21H9.5V9.75Z" />
    </svg>
  );
}

export function XGlyph(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.66l-5.214-6.817L4.96 21.75H1.65l7.732-8.835L1.254 2.25h6.83l4.713 6.231 5.447-6.231Zm-1.161 17.52h1.833L7.084 4.126H5.117l11.966 15.644Z" />
    </svg>
  );
}

export function WhatsAppGlyph(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M20.52 3.48A11.94 11.94 0 0 0 12.04 0C5.46 0 .12 5.34.12 11.92c0 2.1.55 4.15 1.6 5.96L0 24l6.27-1.64a11.9 11.9 0 0 0 5.77 1.48h.01c6.58 0 11.92-5.35 11.92-11.93 0-3.18-1.24-6.18-3.45-8.43ZM12.05 21.8h-.01a9.9 9.9 0 0 1-5.04-1.38l-.36-.21-3.72.97.99-3.63-.23-.37a9.86 9.86 0 0 1-1.51-5.26c0-5.47 4.45-9.92 9.93-9.92 2.65 0 5.14 1.03 7.02 2.9a9.85 9.85 0 0 1 2.9 7.02c0 5.47-4.45 9.88-9.97 9.88Zm5.45-7.41c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.78.97-.95 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48a8.97 8.97 0 0 1-1.66-2.07c-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.21-.24-.58-.49-.5-.67-.51l-.57-.01c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.49 0 1.47 1.06 2.89 1.21 3.09.15.2 2.1 3.21 5.1 4.5.71.3 1.27.48 1.7.62.71.23 1.36.2 1.87.12.57-.08 1.77-.72 2.02-1.42.25-.7.25-1.3.18-1.42-.07-.13-.27-.2-.57-.35Z" />
    </svg>
  );
}
