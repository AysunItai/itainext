import {
  Bot,
  CalendarCheck,
  Globe,
  RefreshCw,
  Search,
  type LucideProps,
} from "lucide-react";
import { WhatsAppGlyph } from "@/components/library/brand-icons";
import type { IconKey } from "@/lib/services";

/**
 * Maps a service's `icon` string key to an icon component. Kept as a
 * server component (no client JS) so the service pages stay static. The
 * string-key indirection lets `lib/services.ts` stay free of icon imports.
 */
export default function ServiceIcon({
  icon,
  className,
  strokeWidth = 1.75,
}: {
  icon: IconKey;
  className?: string;
  strokeWidth?: number;
}) {
  const props: LucideProps = {
    className,
    strokeWidth,
    "aria-hidden": true,
  };

  switch (icon) {
    case "globe":
      return <Globe {...props} />;
    case "bot":
      return <Bot {...props} />;
    case "calendar":
      return <CalendarCheck {...props} />;
    case "refresh":
      return <RefreshCw {...props} />;
    case "search":
      return <Search {...props} />;
    case "whatsapp":
      return <WhatsAppGlyph className={className} aria-hidden />;
    default:
      return <Globe {...props} />;
  }
}
