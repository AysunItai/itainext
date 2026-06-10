/**
 * Single source of truth for the SEO service pages.
 *
 * Every service page (`/services/[slug]`), the services hub (`/services`),
 * the homepage service cards, the sitemap, and the JSON-LD builders read
 * from this one array — so a slug, title, or description only ever has to
 * be written (and kept consistent) in one place.
 *
 * Content guidelines baked in here on purpose:
 *   - Plain, business-friendly language. No "world-class" / "revolutionary".
 *   - Each `metaDescription` stays under ~155 chars for clean SERP snippets.
 *   - `icon` is a string key (mapped to a lucide icon in the rendering
 *     component) so this module stays free of React/icon imports and can be
 *     safely imported by the sitemap without dragging in a UI bundle.
 */

export type ServiceFaq = { question: string; answer: string };

export type ServiceProcessStep = { title: string; detail: string };

export type IconKey =
  | "globe"
  | "bot"
  | "calendar"
  | "whatsapp"
  | "refresh"
  | "search";

export type Service = {
  slug: string;
  /** Short label for cards, breadcrumbs, and nav. */
  name: string;
  /** The single on-page H1. */
  h1: string;
  /** <title> text — the root layout appends " · ITAI". */
  metaTitle: string;
  /** Unique meta description, < ~155 chars. */
  metaDescription: string;
  /** One-line summary used on the hub and homepage cards. */
  cardSummary: string;
  icon: IconKey;
  /** Short intro: who this service is for. */
  intro: string;
  /** The business problem this service solves. */
  problem: string;
  /** The solution provided. */
  solution: string;
  /** What is included. */
  includes: string[];
  /** Who it is best for. */
  bestFor: string[];
  /** Approximate process / timeline. */
  process: ServiceProcessStep[];
  /** Short FAQ. */
  faqs: ServiceFaq[];
  /** Slugs of related services to cross-link to (natural internal linking). */
  related: string[];
};

export const SERVICES: Service[] = [
  {
    slug: "small-business-website-design",
    name: "Small Business Website Design",
    h1: "Small Business Website Design",
    metaTitle: "Small Business Website Design",
    metaDescription:
      "Modern small business website design with booking, WhatsApp contact, and SEO-ready structure — built to load fast and turn visitors into leads.",
    cardSummary:
      "A fast, professional website that explains what you do and turns visitors into enquiries.",
    icon: "globe",
    intro:
      "For small businesses, consultants, and service providers who need a website that brings in real enquiries — not just a digital business card.",
    problem:
      "Many small business websites are slow, hard to update, and unclear about what the business actually offers. Visitors leave within a few seconds, and the site quietly costs you leads instead of earning them.",
    solution:
      "I design and build a clean, modern website that loads fast on every device, explains your services in plain language, and makes it easy for people to contact you or book a call. It's built on a solid technical foundation, so it stays fast and easy to maintain as your business grows.",
    includes: [
      "Custom design that matches your brand",
      "Mobile-first layout that loads fast",
      "Clear service and contact pages",
      "Booking and WhatsApp contact options",
      "SEO-ready structure and metadata",
      "Simple way to update content later",
    ],
    bestFor: [
      "New businesses launching their first proper website",
      "Consultants and service providers who rely on enquiries",
      "Owners replacing a slow or outdated DIY site",
    ],
    process: [
      {
        title: "Discovery call",
        detail:
          "A short, free call to understand your business, your customers, and what a good result looks like.",
      },
      {
        title: "Design & build",
        detail:
          "I design the pages, write or refine the copy with you, and build the site — usually within one to three weeks.",
      },
      {
        title: "Launch & handover",
        detail:
          "We review it together, connect your domain and analytics, and go live. You get a simple way to make edits afterwards.",
      },
    ],
    faqs: [
      {
        question: "How much does a small business website cost?",
        answer:
          "It depends on the number of pages and features, but most small business sites land in a clear, fixed range we agree before starting — no surprise invoices. The free consultation gives you an honest estimate.",
      },
      {
        question: "How long does it take?",
        answer:
          "A focused small business site usually takes one to three weeks, depending on how much content is ready and how many pages you need.",
      },
      {
        question: "Can I update the site myself later?",
        answer:
          "Yes. I set things up so day-to-day edits are simple, and I'm available for larger changes whenever you need them.",
      },
    ],
    related: [
      "website-with-booking-system",
      "website-with-whatsapp-integration",
      "seo-setup-for-small-business",
    ],
  },
  {
    slug: "ai-automation-for-small-business",
    name: "AI Automation for Small Business",
    h1: "AI Automation for Small Business",
    metaTitle: "AI Automation for Small Business",
    metaDescription:
      "Practical AI automation for small business tasks — handle enquiries, follow-ups, and repetitive admin so you spend less time on manual work.",
    cardSummary:
      "Practical automation that quietly handles repetitive tasks and follow-ups for you.",
    icon: "bot",
    intro:
      "For small business owners and founders who spend too many hours on repetitive admin and want practical automation that actually saves time.",
    problem:
      "As a business grows, the same manual tasks pile up: answering the same enquiries, chasing follow-ups, copying data between tools, and sorting requests by hand. It's slow, easy to drop, and pulls you away from the work that matters.",
    solution:
      "I build practical AI automation for small business tasks — focused workflows that handle enquiries, draft replies, route requests, and move information between your tools automatically. Everything stays simple and reliable, with a human in the loop wherever a decision really needs you.",
    includes: [
      "A review of the tasks worth automating",
      "Automated enquiry handling and replies",
      "Follow-up and reminder workflows",
      "Connections between the tools you already use",
      "Human-in-the-loop checks where they matter",
      "Clear documentation so nothing is a black box",
    ],
    bestFor: [
      "Owners drowning in repetitive enquiries or admin",
      "Service businesses with a lot of back-and-forth",
      "Founders who want to scale without hiring yet",
    ],
    process: [
      {
        title: "Map the work",
        detail:
          "We look at where your time actually goes and pick the tasks that are safe and valuable to automate first.",
      },
      {
        title: "Build & test",
        detail:
          "I build the automation, test it against real examples, and keep you in control of anything sensitive.",
      },
      {
        title: "Roll out & refine",
        detail:
          "We switch it on gradually, watch how it performs, and refine it so it stays dependable.",
      },
    ],
    faqs: [
      {
        question: "Do you offer AI automation for small businesses?",
        answer:
          "Yes — and the focus is on practical, reliable workflows that save real time, not gimmicks. We start with the tasks that cost you the most hours.",
      },
      {
        question: "Will automation replace the personal touch with customers?",
        answer:
          "No. The goal is to remove the repetitive parts while keeping you in the loop for anything that needs a human decision.",
      },
      {
        question: "Can this connect to the tools I already use?",
        answer:
          "Usually yes. Most automations connect to common tools through their APIs, so you keep working the way you already do.",
      },
    ],
    related: [
      "website-with-booking-system",
      "small-business-website-design",
    ],
  },
  {
    slug: "website-with-booking-system",
    name: "Website with Booking System",
    h1: "Website with an Online Booking System",
    metaTitle: "Website with Booking System",
    metaDescription:
      "A website with online booking that fills your calendar automatically — booking flows that reduce back-and-forth messages and no-shows.",
    cardSummary:
      "Let clients book you directly, with calendar sync, reminders, and fewer no-shows.",
    icon: "calendar",
    intro:
      "For service providers and small businesses who want clients to book appointments directly, without the endless back-and-forth.",
    problem:
      "Booking by message or email means trading times back and forth, double-bookings, and no-shows. It's a lot of manual coordination for every single appointment, and it quietly limits how many clients you can take on.",
    solution:
      "I add booking flows that reduce back-and-forth messages: clients see your real availability, pick a slot, and get confirmations and reminders automatically. It syncs with your calendar, can take deposits or payments, and handles cancellations by your rules.",
    includes: [
      "Online booking tied to your real availability",
      "Calendar sync so you never double-book",
      "Automatic confirmations and reminders",
      "Optional deposits or upfront payment",
      "Cancellation and rescheduling rules",
      "WhatsApp or email follow-up options",
    ],
    bestFor: [
      "Consultants, coaches, and therapists",
      "Salons, clinics, and studios",
      "Anyone who books appointments one by one today",
    ],
    process: [
      {
        title: "Define the rules",
        detail:
          "We map your availability, appointment types, buffers, and cancellation policy so the system matches how you actually work.",
      },
      {
        title: "Build & connect",
        detail:
          "I add the booking flow to your site, connect your calendar, and set up reminders and any payments.",
      },
      {
        title: "Test & go live",
        detail:
          "We run real test bookings together, then launch so clients can book themselves from day one.",
      },
    ],
    faqs: [
      {
        question: "Can you build a website with online booking?",
        answer:
          "Yes. I can add booking to a new site or to your existing one, synced with your calendar and set up to match your availability and rules.",
      },
      {
        question: "Can it take payments or deposits?",
        answer:
          "Yes — booking can require a deposit or full payment upfront, which is a simple, effective way to cut down on no-shows.",
      },
      {
        question: "Will it reduce no-shows?",
        answer:
          "Automatic reminders and optional deposits make a real difference. Clients get a nudge before the appointment and you spend less time chasing.",
      },
    ],
    related: [
      "website-with-whatsapp-integration",
      "small-business-website-design",
    ],
  },
  {
    slug: "website-with-whatsapp-integration",
    name: "Website with WhatsApp Integration",
    h1: "Website with WhatsApp Integration",
    metaTitle: "Website with WhatsApp Integration",
    metaDescription:
      "Add WhatsApp contact to your website so customers can reach you in one tap — a simple, friendly way to turn visitors into conversations.",
    cardSummary:
      "One-tap WhatsApp contact that makes it easy for customers to start a conversation.",
    icon: "whatsapp",
    intro:
      "For local and service businesses whose customers prefer to message — and who don't want enquiries lost in a contact form.",
    problem:
      "Contact forms feel formal and slow, and many customers simply won't fill them in. They'd rather send a quick message — but if there's no easy way to do that, they leave and the enquiry is gone.",
    solution:
      "I add WhatsApp contact that makes it easy for customers to reach you: a clear button that opens a chat with a friendly pre-filled message. It works on mobile and desktop, sits naturally in the design, and meets customers on the channel they already use every day.",
    includes: [
      "A clean WhatsApp contact button",
      "Pre-filled message so chats start easily",
      "Placement on key pages without clutter",
      "Mobile and desktop support",
      "Optional click tracking in analytics",
      "Pairs well with booking and contact flows",
    ],
    bestFor: [
      "Local and service businesses",
      "Shops and consultants who reply on the go",
      "Anyone whose customers already use WhatsApp",
    ],
    process: [
      {
        title: "Plan the flow",
        detail:
          "We decide where the button appears and what the opening message says, so enquiries arrive with useful context.",
      },
      {
        title: "Add & style",
        detail:
          "I integrate WhatsApp into your site so it feels native to the design — not a bolted-on widget.",
      },
      {
        title: "Track & tune",
        detail:
          "We can track clicks in analytics so you can see how many conversations the button starts.",
      },
    ],
    faqs: [
      {
        question: "Can you add WhatsApp to my website?",
        answer:
          "Yes. I can add a clean WhatsApp contact button to a new or existing site, with a friendly pre-filled message so customers can reach you in one tap.",
      },
      {
        question: "Does it work on desktop too?",
        answer:
          "Yes — it opens WhatsApp Web on desktop and the app on mobile, so customers can message you from anywhere.",
      },
      {
        question: "Can I see how many people use it?",
        answer:
          "Yes. We can track button clicks in your analytics so you know how many conversations it's starting.",
      },
    ],
    related: [
      "website-with-booking-system",
      "small-business-website-design",
    ],
  },
  {
    slug: "website-redesign",
    name: "Website Redesign",
    h1: "Website Redesign for Small Businesses",
    metaTitle: "Website Redesign",
    metaDescription:
      "Redesign your existing website to be faster, clearer, and easier to find on Google — with booking, WhatsApp, and an SEO-ready structure.",
    cardSummary:
      "Modernise a dated or slow website so it loads fast, reads clearly, and converts.",
    icon: "refresh",
    intro:
      "For business owners with an existing website that feels dated, loads slowly, or no longer reflects how good the business actually is.",
    problem:
      "An old website can quietly hurt you: it loads slowly, looks dated next to competitors, is hard to use on a phone, and doesn't give Google a clear picture of what you do. Visitors judge the business by the site — and leave.",
    solution:
      "I redesign your site to be faster, clearer, and easier to act on — keeping what works and fixing what doesn't. That means a modern look, a mobile-first layout, an SEO-ready structure so Google can better understand your business, and easy ways to book or message you.",
    includes: [
      "A modern, on-brand redesign",
      "Faster load times and a mobile-first layout",
      "Clearer structure and messaging",
      "SEO-ready pages and metadata",
      "Booking and WhatsApp contact options",
      "Migration of the content worth keeping",
    ],
    bestFor: [
      "Businesses with a slow or dated website",
      "Owners whose site looks worse than the business",
      "Anyone losing mobile visitors to a clunky layout",
    ],
    process: [
      {
        title: "Review what you have",
        detail:
          "We look at your current site, what's working, what's costing you, and what to carry over.",
      },
      {
        title: "Redesign & rebuild",
        detail:
          "I rebuild it on a fast, modern foundation with a cleaner structure and updated design.",
      },
      {
        title: "Launch carefully",
        detail:
          "We migrate content, preserve your existing search value where possible, and launch without losing what you've built.",
      },
    ],
    faqs: [
      {
        question: "Can you improve my existing website?",
        answer:
          "Yes. A redesign keeps what's working and fixes what isn't — making the site faster, clearer, and easier to find, without starting your brand from scratch.",
      },
      {
        question: "Will I lose my current Google ranking?",
        answer:
          "The redesign is done carefully to preserve your existing search value where possible, with a clean URL structure and proper redirects when needed.",
      },
      {
        question: "Do I need to rewrite all my content?",
        answer:
          "No. We keep the content that still works, tighten what needs it, and only rewrite where it genuinely helps.",
      },
    ],
    related: [
      "seo-setup-for-small-business",
      "small-business-website-design",
    ],
  },
  {
    slug: "seo-setup-for-small-business",
    name: "SEO Setup for Small Business",
    h1: "SEO Setup for Small Business",
    metaTitle: "SEO Setup for Small Business",
    metaDescription:
      "SEO-ready structure so Google can better understand your business — clean pages, metadata, and technical setup to help you show up in search.",
    cardSummary:
      "Give Google a clear, structured picture of your business so the right people can find you.",
    icon: "search",
    intro:
      "For small businesses that want to show up when local customers search — without paying for ongoing ads to stay visible.",
    problem:
      "If Google can't clearly understand what you do and who you serve, you won't show up when people search for it. Many small business sites have missing page titles, thin structure, and no technical SEO setup — so they stay invisible.",
    solution:
      "I set up an SEO-ready structure so Google can better understand your business: clear pages for each service, proper titles and descriptions, clean technical foundations, structured data, and a sitemap. It gives search engines an honest, organised picture of what you offer.",
    includes: [
      "Page titles and meta descriptions that read well",
      "A clear page structure for your services",
      "Technical SEO setup and a sitemap",
      "Structured data where it helps",
      "Faster load times that search engines reward",
      "Sensible internal links between pages",
    ],
    bestFor: [
      "Local businesses wanting to be found in search",
      "Service providers competing for the same customers",
      "Owners tired of relying only on paid ads",
    ],
    process: [
      {
        title: "Audit",
        detail:
          "I review how your site is structured today and where Google is missing the picture.",
      },
      {
        title: "Set the foundations",
        detail:
          "I fix titles, structure, metadata, speed, and technical setup so each page is clear and indexable.",
      },
      {
        title: "Measure",
        detail:
          "We connect analytics and search tools so you can see how visibility improves over time.",
      },
    ],
    faqs: [
      {
        question: "Can you help my business show up better on Google?",
        answer:
          "Yes. I set up a clean, SEO-ready structure so Google can understand your business clearly — the foundation that helps the right people find you in search.",
      },
      {
        question: "Is SEO a one-time setup or ongoing?",
        answer:
          "The technical foundation is mostly a one-time setup. Staying visible over time benefits from fresh content and small ongoing improvements, which I can help with.",
      },
      {
        question: "How long until I see results?",
        answer:
          "SEO is a long game. The technical groundwork takes effect over weeks to months as search engines re-crawl and rank your pages — there are no honest overnight shortcuts.",
      },
    ],
    related: [
      "website-redesign",
      "small-business-website-design",
    ],
  },
];

const SERVICE_BY_SLUG: Map<string, Service> = new Map(
  SERVICES.map((s) => [s.slug, s]),
);

export function getService(slug: string): Service | undefined {
  return SERVICE_BY_SLUG.get(slug);
}

export function getRelatedServices(service: Service): Service[] {
  return service.related
    .map((slug) => SERVICE_BY_SLUG.get(slug))
    .filter((s): s is Service => Boolean(s));
}

/**
 * Cross-page FAQ used on the services hub. Honest, short answers that cover
 * the questions small businesses actually ask before getting in touch.
 */
export const SERVICES_FAQ: ServiceFaq[] = [
  {
    question: "How much does a small business website cost?",
    answer:
      "It depends on the pages and features you need, but we agree a clear, fixed price before any work starts — no surprise invoices. Book a free consultation for an honest estimate.",
  },
  {
    question: "Can you add WhatsApp to my website?",
    answer:
      "Yes. I can add a clean WhatsApp contact button to a new or existing site so customers can reach you in one tap.",
  },
  {
    question: "Can you build a website with online booking?",
    answer:
      "Yes. I build websites with online booking that sync to your calendar, send reminders, and can take deposits to reduce no-shows.",
  },
  {
    question: "Can you improve my existing website?",
    answer:
      "Yes. A redesign keeps what's working and fixes what isn't — making your site faster, clearer, and easier to find.",
  },
  {
    question: "Do you offer AI automation for small businesses?",
    answer:
      "Yes — practical automation for small business tasks like enquiries, follow-ups, and repetitive admin, with a human in the loop where it matters.",
  },
  {
    question: "Can you help my business show up better on Google?",
    answer:
      "Yes. I set up an SEO-ready structure so Google can better understand your business, which helps the right people find you in search.",
  },
  {
    question: "Do you work with clients outside Israel?",
    answer:
      "Absolutely. I work remotely with small businesses, consultants, and founders in the US, UK, Europe, Israel, and beyond.",
  },
];
