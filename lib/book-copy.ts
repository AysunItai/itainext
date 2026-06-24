import type { Locale } from "@/lib/i18n";

export type BookCopy = {
  badgeFree: string;
  badgeMeet: string;
  title: string;
  subtitle: string;
  bookingFor: string;
  primaryCta: string;
  whatsappShort: string;
  whatsappLong: string;
  whatsappAria: string;
  heroNote: string;
  pickTimeLabel: string;
  pickTimeTitle: string;
  pickTimeWhatsApp: string;
  coverLabel: string;
  coverTitle: string;
  inTheCall: readonly string[];
  noPressureLabel: string;
  trustParagraph: string;
  goodFitLabel: string;
  goodFitTitle: string;
  whoThisIsFor: readonly string[];
  closingLabel: string;
  closingTitle: string;
  closingSubtitle: string;
  preferEmail: string;
  calendlyFallbackTitle: string;
  calendlyFallbackBody: string;
  calendlyFallbackCta: string;
  contactHref: string;
};

const EN: BookCopy = {
  badgeFree: "Free · 15 min",
  badgeMeet: "Zoom or Google Meet",
  title: "Free 15-Minute Website Consultation",
  subtitle:
    "I help small businesses build clean, modern websites with WhatsApp, booking, SEO setup, and contact forms — working remotely with clients in the US, UK, Europe, Israel, and beyond.",
  bookingFor: "Booking for",
  primaryCta: "Book a Free 15-Minute Consultation",
  whatsappShort: "WhatsApp me",
  whatsappLong: "Prefer WhatsApp? Message me here.",
  whatsappAria: "Open WhatsApp chat with ITAI Web Solutions",
  heroNote: "No signup required. No sales pressure. Just a friendly conversation.",
  pickTimeLabel: "Pick a time",
  pickTimeTitle: "Choose a slot that works for you.",
  pickTimeWhatsApp: "Or message me on WhatsApp",
  coverLabel: "What we'll cover",
  coverTitle: "In the call we can discuss:",
  inTheCall: [
    "What kind of website your business needs",
    "How to improve your current website",
    "How to get more leads from Google, Facebook, and WhatsApp",
  ],
  noPressureLabel: "No pressure",
  trustParagraph:
    "No pressure, no complicated tech talk. We'll look at your business, your current online presence, and what small improvements could help you get more leads.",
  goodFitLabel: "A good fit",
  goodFitTitle: "This is for you if:",
  whoThisIsFor: [
    "You own a small business and need a professional website",
    "Your current website looks old or doesn't bring leads",
    "You want WhatsApp, booking, contact forms, or SEO setup",
    "You want a developer who explains things clearly",
  ],
  closingLabel: "Ready when you are",
  closingTitle: "Let's figure out what your business needs.",
  closingSubtitle:
    "Pick a time that works for you, or send a quick WhatsApp message and I'll get back today.",
  preferEmail: "Prefer email?",
  calendlyFallbackTitle: "Calendar setup is in progress.",
  calendlyFallbackBody:
    "While the booking widget is being configured, send a quick note and I'll find a time that works.",
  calendlyFallbackCta: "Send a note",
  contactHref: "/contact",
};

const HE: BookCopy = {
  badgeFree: "חינם · 15 דק",
  badgeMeet: "Zoom או Google Meet",
  title: "שיחת ייעוץ חינמית של 15 דקות לאתר",
  subtitle:
    "אני עוזרת לעסקים קטנים לבנות אתרים מודרניים עם וואטסאפ, הזמנות, SEO וטפסי יצירת קשר — עבודה מרחוק עם לקוחות בישראל ומחוצה לה.",
  bookingFor: "הזמנה עבור",
  primaryCta: "קביעת שיחת ייעוץ חינמית",
  whatsappShort: "שלחי וואטסאפ",
  whatsappLong: "עדיף וואטסאפ? שלחי לי הודעה",
  whatsappAria: "פתיחת שיחת וואטסאפ עם ITAI Web Solutions",
  heroNote: "בלי הרשמה ובלי לחץ מכירתי. רק שיחה נעימה.",
  pickTimeLabel: "בחרי שעה",
  pickTimeTitle: "בחרי מועד שנוח לך.",
  pickTimeWhatsApp: "או שלחי לי הודעה בוואטסאפ",
  coverLabel: "מה נדבר",
  coverTitle: "בשיחה נוכל לדבר על:",
  inTheCall: [
    "איזה סוג אתר העסק שלך צריך",
    "איך לשפר את האתר הקיים",
    "איך לקבל יותר פניות מגוגל, פייסבוק ווואטסאפ",
  ],
  noPressureLabel: "בלי לחץ",
  trustParagraph:
    "בלי לחץ ובלי שפה טכנית מסובכת. נסתכל על העסק, הנוכחות המקוונת שלך, ואילו שיפורים קטנים יכולים לעזור לקבל יותר פניות.",
  goodFitLabel: "מתאים לך אם",
  goodFitTitle: "השירות מתאים לך אם:",
  whoThisIsFor: [
    "את בעלת עסק קטן וצריכה אתר מקצועי",
    "האתר הנוכחי נראה ישן או לא מביא פניות",
    "את רוצה וואטסאפ, הזמנות, טפסים או SEO",
    "את רוצה מפתחת שמסבירה בצורה ברורה",
  ],
  closingLabel: "מוכנה כשאת",
  closingTitle: "בואי נבין מה העסק שלך צריך.",
  closingSubtitle:
    "בחרי מועד שנוח לך, או שלחי הודעת וואטסאפ ואחזור אלייך היום.",
  preferEmail: "מעדיפה אימייל?",
  calendlyFallbackTitle: "לוח הזמנים בהגדרה.",
  calendlyFallbackBody:
    "בזמן שהווידג'ט מוגדר, שלחי הודעה ואמצא מועד שנוח לשנינו.",
  calendlyFallbackCta: "שליחת הודעה",
  contactHref: "/he/contact",
};

export const BOOK_COPY: Record<Locale, BookCopy> = { en: EN, he: HE };
