import { getLocaleFromPathname, type Locale } from "@/lib/i18n";

const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;

export const WHATSAPP_MESSAGES = {
  en: {
    floating: "Hi! I saw your website and I'd like to talk about a project.",
    consultation: "Hi! I'd like to ask about a free website consultation.",
  },
  he: {
    floating: "היי! ראיתי את האתר שלכם ואשמח לדבר על הפרויקט.",
    consultation: "היי! אשמח לשאול על שיחת ייעוץ חינמית לאתר.",
  },
} as const;

export function buildWhatsAppUrl(
  message: string,
  number = WHATSAPP_NUMBER,
): string | null {
  if (!number) return null;
  const cleaned = number.replace(/\D/g, "");
  if (!cleaned) return null;
  return `https://wa.me/${cleaned}?text=${encodeURIComponent(message)}`;
}

export function getWhatsAppLocale(pathname: string): Locale {
  return getLocaleFromPathname(pathname);
}

export function getFloatingWhatsAppMessage(pathname: string): string {
  const locale = getWhatsAppLocale(pathname);
  return WHATSAPP_MESSAGES[locale].floating;
}

export function getConsultationWhatsAppMessage(locale: Locale): string {
  return WHATSAPP_MESSAGES[locale].consultation;
}
