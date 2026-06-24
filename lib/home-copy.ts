import type { Locale } from "@/lib/i18n";

export type HomeCopy = {
  hero: {
    eyebrow: string;
    title: string;
    subtitle: string;
    primaryCta: string;
    secondaryCta: string;
    secondaryHref: string;
    note: string;
  };
  freeReview: {
    eyebrow: string;
    title: string;
    intro: string;
    detail: string;
    cta: string;
    checkpoints: readonly { title: string; detail: string }[];
  };
  whoIHelp: {
    eyebrow: string;
    title: string;
    subtitle: string;
    audiences: readonly string[];
    footnote: string;
  };
  founder: {
    eyebrow: string;
    title: string;
    p1: string;
    p2: string;
    cta: string;
    imageAlt: string;
  };
  reviewCta: {
    soft: { eyebrow: string; heading: string; description: string; button: string };
    bold: { eyebrow: string; heading: string; description: string; button: string };
  };
  work: {
    eyebrow: string;
    title: string;
    subtitle: string;
    filters: readonly { id: string; label: string }[];
    noMatch: string;
    of: string;
    statusCompleted: string;
    statusOngoing: string;
    launchingSoon: string;
    visitLive: string;
    viewCase: string;
    role: string;
  };
  services: {
    eyebrow: string;
    title: string;
    subtitle: string;
    items: readonly { name: string; summary: string; href: string }[];
    exploreAll: string;
    exploreHref: string;
  };
  showcase: {
    eyebrow: string;
    title: string;
    subtitle: string;
    stats: readonly { value: string; suffix: string; label: string }[];
    pillars: readonly { title: string; body: string }[];
  };
  whyWork: {
    eyebrow: string;
    title: string;
    reasons: readonly { title: string; description: string }[];
  };
  process: {
    eyebrow: string;
    title: string;
    subtitle: string;
    steps: readonly { n: string; title: string; body: string }[];
  };
  pricing: {
    eyebrow: string;
    title: string;
    titleMuted: string;
    intro: string;
    footnote: string;
    plans: readonly {
      id: string;
      name: string;
      description: string;
      price: string;
      priceNote: string;
      features: readonly string[];
      cta: string;
      badge?: string;
      featured?: boolean;
    }[];
  };
  library: {
    eyebrow: string;
    badge: string;
    title: string;
    titleAccent: string;
    titleMuted: string;
    description: string;
    cta: string;
    browse: string;
  };
  cta: {
    eyebrow: string;
    title: string;
    description: string;
    button: string;
  };
  reviewButton: string;
  reviewHref: string;
};

const EN: HomeCopy = {
  hero: {
    eyebrow: "ITAI WEB SOLUTIONS",
    title: "Websites, SEO & AI automation for small businesses.",
    subtitle:
      "I help small businesses turn outdated websites into fast, modern lead-generation systems with Google visibility, booking/contact forms, WhatsApp, and practical AI tools.",
    primaryCta: "Get Free Website Review",
    secondaryCta: "See Services",
    secondaryHref: "/services",
    note: "Not sure where to start? Request a free review and I'll point you to the highest-impact fixes first.",
  },
  freeReview: {
    eyebrow: "Free review",
    title: "Free Website & Google Visibility Review",
    intro:
      "Send me your website and I'll record a short, practical review — what's working, what may be blocking leads, and what to fix first. No sales script. Just clear next steps for a small business owner.",
    detail:
      "I look at the full picture: how you show up on Google, how easy it is to contact or book you, and whether your site feels modern and trustworthy on mobile.",
    cta: "Get Free Website Review",
    checkpoints: [
      { title: "Mobile experience", detail: "How your site feels on phones — layout, tap targets, and whether visitors can act quickly." },
      { title: "SEO titles & indexing", detail: "Page titles, meta descriptions, and whether Google can find and understand your pages." },
      { title: "Google visibility", detail: "Search presence basics — what shows up when someone looks for your business online." },
      { title: "Contact & WhatsApp flow", detail: "Whether visitors can reach you in one tap — forms, click-to-call, and WhatsApp buttons." },
      { title: "Booking flow", detail: "Appointment or inquiry paths — clear steps, fewer drop-offs, less back-and-forth." },
      { title: "Page speed", detail: "Load time on mobile and desktop — slow pages quietly cost you leads every day." },
      { title: "Trust signals", detail: "Reviews, credentials, clear offers, and the small details that make people feel safe." },
      { title: "Google Business Profile", detail: "Profile completeness, categories, photos, and readiness to show up in local search." },
    ],
  },
  whoIHelp: {
    eyebrow: "Who I help",
    title: "Small businesses that need more leads online.",
    subtitle:
      "If your website feels outdated, hard to find on Google, or awkward for customers to contact — I help you turn it into a clear, modern lead-generation system.",
    audiences: ["Clinics", "Coaches", "Consultants", "Beauty & Wellness", "Home Services", "IT Services", "Local Professionals", "Online Businesses"],
    footnote: "Working with international clients remotely — across the US, UK, Europe, and beyond.",
  },
  founder: {
    eyebrow: "Founder",
    title: "Meet the person behind Itai Web Solutions",
    p1: "Hi, I'm Aysun. I'm a software engineer and full-stack developer helping small businesses build modern websites, improve Google visibility, and add practical AI tools.",
    p2: "I work with international clients remotely. My goal is simple: build websites that look professional, load fast, and help people contact you more easily.",
    cta: "Book a Free Website Review",
    imageAlt: "Aysun Itai, software engineer and founder of Itai Web Solutions",
  },
  reviewCta: {
    soft: {
      eyebrow: "No obligation",
      heading: "Send me your website and I'll show you what may be stopping visitors from becoming leads.",
      description: "I'll reply with practical notes — what to fix first, what can wait, and whether a quick fix or full refresh makes sense.",
      button: "Get Free Website Review",
    },
    bold: {
      eyebrow: "Next step",
      heading: "Ready to get more leads from your website?",
      description: "Start with a free review. If it makes sense to work together, I'll suggest a clear package and timeline.",
      button: "Get Free Website Review",
    },
  },
  work: {
    eyebrow: "Selected work",
    title: "Real systems, doing real work.",
    subtitle: "Each engagement starts with a real operational need and ends with a system the team uses every day.",
    filters: [
      { id: "all", label: "Show all" },
      { id: "completed", label: "Completed" },
      { id: "ongoing", label: "Ongoing" },
      { id: "ai", label: "AI" },
    ],
    noMatch: "No projects match this filter yet.",
    of: "of",
    statusCompleted: "Completed",
    statusOngoing: "Ongoing",
    launchingSoon: "Launching soon",
    visitLive: "Visit live site",
    viewCase: "View case study",
    role: "Role",
  },
  services: {
    eyebrow: "What I build",
    title: "More leads. Less manual work.",
    subtitle: "Websites, SEO, Google visibility, booking flows, WhatsApp, and practical AI — built for small businesses that need results, not jargon.",
    items: [
      { name: "Small Business Website Design", summary: "A modern site that explains what you do, builds trust, and makes it easy to contact you.", href: "/services/small-business-website-design" },
      { name: "Website Redesign", summary: "Refresh an outdated site so it looks current, loads fast, and converts more visitors into leads.", href: "/services/website-redesign" },
      { name: "SEO & Google Visibility Setup", summary: "Titles, structure, and technical basics so Google understands your business and sends the right traffic.", href: "/services/seo-setup-for-small-business" },
      { name: "Google Business Profile Setup", summary: "Profile setup and optimization so local customers find you on Maps and search.", href: "/services/seo-setup-for-small-business" },
      { name: "Booking & Contact Forms", summary: "Clear inquiry and appointment flows — fewer missed leads and less manual follow-up.", href: "/services/website-with-booking-system" },
      { name: "WhatsApp Integration", summary: "One-tap WhatsApp buttons so mobile visitors can message you without hunting for a number.", href: "/services/website-with-whatsapp-integration" },
      { name: "AI Chatbots & Automation", summary: "Practical AI tools that answer common questions, capture leads, and cut repetitive admin work.", href: "/services/ai-automation-for-small-business" },
      { name: "Website Speed Optimization", summary: "Faster load times on mobile — better Google scores and fewer visitors leaving before they act.", href: "/services/website-redesign" },
    ],
    exploreAll: "Explore all services",
    exploreHref: "/services",
  },
  showcase: {
    eyebrow: "Engineering principles",
    title: "Premium feel, infrastructure underneath.",
    subtitle: "Every project I ship is judged against the same bar — the kind of polish you'd expect from a flagship product team.",
    stats: [
      { value: "99", suffix: "+", label: "Lighthouse score, average" },
      { value: "<1.2", suffix: "s", label: "Median LCP across builds" },
      { value: "30", suffix: "%", label: "Faster ops, post-automation" },
      { value: "100", suffix: "%", label: "Type-safe codebases" },
    ],
    pillars: [
      { title: "Built for speed", body: "Edge rendering, image and font optimization, and zero hydration waste by default." },
      { title: "Quietly secure", body: "Modern auth, tight CSP, and validated inputs end-to-end — security as a posture, not a panic." },
      { title: "Observable", body: "Logs, metrics, and Web Vitals wired in from day one so you always know how the system feels." },
      { title: "Maintainable", body: "Code that reads like a memo to your future self — well-typed, well-tested, well-documented." },
    ],
  },
  whyWork: {
    eyebrow: "Why work with me",
    title: "A small studio, focused on your results.",
    reasons: [
      { title: "Developer-led, not template-based", description: "Custom code and thoughtful design — not a generic theme with your logo pasted on top." },
      { title: "Clear process and honest communication", description: "You always know what's happening, what it costs, and what comes next." },
      { title: "Websites built for leads, speed, and trust", description: "Every page is shaped around contact flows, Google visibility, and fast mobile performance." },
    ],
  },
  process: {
    eyebrow: "How I work",
    title: "A simple, transparent process.",
    subtitle: "Three phases. Weekly check-ins. No black boxes — you'll always know what I'm building and why.",
    steps: [
      { n: "01", title: "Discovery", body: "I map your goals, users, and constraints, then translate them into a focused build plan with clear milestones." },
      { n: "02", title: "Design & build", body: "Iterative cycles in Figma and code. You see real product every week — never a slideshow, never a surprise." },
      { n: "03", title: "Launch & evolve", body: "I ship to production behind a CDN, watch the metrics, and keep iterating once the site is live." },
    ],
  },
  pricing: {
    eyebrow: "Packages · Starting points",
    title: "Simple packages.",
    titleMuted: "Clear ranges.",
    intro: "Every business is different — these are typical starting ranges. After a free review, I'll recommend the smallest fix that actually moves the needle.",
    footnote: "Final price depends on pages, integrations, and content. You always get a clear quote before any work begins.",
    plans: [
      {
        id: "quick-fix",
        name: "Quick Website Fix",
        description: "Targeted fixes when something specific is broken or hurting leads.",
        price: "$300–$500",
        priceNote: "USD · Scoped to the issue",
        features: ["Mobile layout or contact-form fixes", "WhatsApp or click-to-call setup", "Speed tweaks on key pages", "SEO title & description cleanup", "Small copy or trust-signal updates"],
        cta: "Get Free Website Review",
      },
      {
        id: "refresh",
        name: "Landing Page / Website Refresh",
        description: "A sharper first impression — modern design, clearer offer, better conversion.",
        price: "$750–$1,200",
        priceNote: "USD · One-time project",
        features: ["Homepage or landing page redesign", "Mobile-first responsive layout", "Contact & WhatsApp integration", "Basic SEO setup", "Fast delivery — typically 2–3 weeks"],
        cta: "Get Free Website Review",
        badge: "Most popular",
        featured: true,
      },
      {
        id: "full",
        name: "Full Website + SEO Setup",
        description: "A complete lead-generation site with Google visibility built in from day one.",
        price: "$1,500–$3,000",
        priceNote: "USD · Depends on scope",
        features: ["Multi-page custom website", "Booking or inquiry flows", "SEO & Google visibility setup", "Google Business Profile guidance", "AI chatbot or automation (if needed)", "Post-launch support window"],
        cta: "Get Free Website Review",
      },
    ],
  },
  library: {
    eyebrow: "From the library",
    badge: "Out now",
    title: "An ebook on",
    titleAccent: "SQL performance",
    titleMuted: "And more on the way.",
    description: "Seventeen pages pulled from years of staring at slow queries in production — EXPLAIN, indexes, joins, pagination, aggregation. Read on any device — yours forever.",
    cta: "Get the ebook",
    browse: "Browse the library",
  },
  cta: {
    eyebrow: "Start here",
    title: "Send me your website and I'll show you what may be stopping visitors from becoming leads.",
    description: "A short, honest review — mobile experience, Google visibility, contact flows, and trust signals. Then we can talk about the right fix if you want help implementing it.",
    button: "Get Free Website Review",
  },
  reviewButton: "Get Free Website Review",
  reviewHref: "/free-website-review",
};

const HE: HomeCopy = {
  hero: {
    eyebrow: "ITAI WEB SOLUTIONS",
    title: "אתרים חכמים לעסקים קטנים",
    subtitle:
      "בניית אתרים מודרניים, שיפור נראות בגוגל, טפסי יצירת קשר, מערכות הזמנה ואוטומציות AI פשוטות לעסק שלך.",
    primaryCta: "קבלי בדיקת אתר בחינם",
    secondaryCta: "קביעת שיחת היכרות",
    secondaryHref: "/he/book",
    note: "לא בטוחה מאיפה להתחיל? בקשי בדיקת אתר בחינם ואכוון אותך לשיפורים החשובים ביותר קודם.",
  },
  freeReview: {
    eyebrow: "בדיקה בחינם",
    title: "בדיקת אתר ונראות בגוגל — בחינם",
    intro:
      "שלחי לי את כתובת האתר ואחזיר לך סקירה קצרה ומעשית — מה עובד, מה עלול לחסום פניות, ומה כדאי לתקן קודם. בלי שיחת מכירות. רק צעדים ברורים לבעלת עסק קטן.",
    detail:
      "אני בודקת את התמונה המלאה: איך את מופיעה בגוגל, כמה קל ליצור קשר או לקבוע פגישה, והאם האתר נראה מודרני ואמין במובייל.",
    cta: "בדיקת אתר בחינם",
    checkpoints: [
      { title: "חוויית מובייל", detail: "איך האתר מרגיש בטלפון — פריסה, כפתורים, והאם מבקרים יכולים לפעול במהירות." },
      { title: "כותרות SEO ואינדוקס", detail: "כותרות עמודים, תיאורים, והאם גוגל מוצא ומבין את העמודים שלך." },
      { title: "נראות בגוגל", detail: "יסודות הנוכחות בחיפוש — מה מופיע כשמחפשים את העסק שלך." },
      { title: "טפסים ווואטסאפ", detail: "האם מבקרים יכולים לפנות בלחיצה אחת — טפסים, חיוג, וכפתורי וואטסאפ." },
      { title: "זרימת הזמנות", detail: "מסלולי פנייה או קביעת פגישה — צעדים ברורים, פחות נטישה, פחות הלוך-חזור." },
      { title: "מהירות טעינה", detail: "זמן טעינה במובייל ובמחשב — עמודים איטיים עולים בפניות כל יום." },
      { title: "אותות אמון", detail: "ביקורות, אישורים, הצעה ברורה, והפרטים הקטנים שגורמים לאנשים להרגיש בטוחים." },
      { title: "Google Business Profile", detail: "שלמות הפרופיל, קטגוריות, תמונות, והיכולת להופיע בחיפוש מקומי." },
    ],
  },
  whoIHelp: {
    eyebrow: "למי זה מתאים",
    title: "עסקים קטנים שרוצים יותר פניות מהאינטרנט.",
    subtitle:
      "אם האתר נראה ישן, קשה למצוא בגוגל, או מסורבל ליצירת קשר — אני עוזרת להפוך אותו למערכת מודרנית שמביאה פניות.",
    audiences: ["קליניקות", "מאמנים", "יועצים", "יופי ובריאות", "שירותי בית", "שירותי IT", "בעלי מקצוע מקומיים", "עסקים מקוונים"],
    footnote: "עבודה מרחוק עם לקוחות בישראל, אירופה, ארה״ב ומעבר לכך.",
  },
  founder: {
    eyebrow: "מי אני",
    title: "האדם מאחורי ITAI Web Solutions",
    p1: "היי, אני אייסון. מהנדסת תוכנה ומפתחת full-stack שעוזרת לעסקים קטנים לבנות אתרים מודרניים, לשפר נראות בגוגל, ולהוסיף כלי AI מעשיים.",
    p2: "אני עובדת עם לקוחות מרחוק. המטרה שלי פשוטה: אתרים שנראים מקצועיים, נטענים מהר, ועוזרים לאנשים ליצור איתך קשר בקלות.",
    cta: "בדיקת אתר בחינם",
    imageAlt: "אייסון איטאי, מהנדסת תוכנה ומייסדת ITAI Web Solutions",
  },
  reviewCta: {
    soft: {
      eyebrow: "בלי התחייבות",
      heading: "שלחי לי את האתר ואראה לך מה עלול למנוע ממבקרים להפוך לפניות.",
      description: "אחזור עם הערות מעשיות — מה לתקן קודם, מה יכול לחכות, והאם מספיק תיקון קטן או שדרוג מלא.",
      button: "בדיקת אתר בחינם",
    },
    bold: {
      eyebrow: "הצעד הבא",
      heading: "מוכנה לקבל יותר פניות מהאתר?",
      description: "נתחיל בבדיקה בחינם. אם זה מתאים לעבוד ביחד, אציע חבילה ולוח זמנים ברורים.",
      button: "בדיקת אתר בחינם",
    },
  },
  work: {
    eyebrow: "עבודות נבחרות",
    title: "מערכות אמיתיות שעושות עבודה אמיתית.",
    subtitle: "כל פרויקט מתחיל בצורך תפעולי אמיתי ומסתיים במערכת שהצוות משתמש בה כל יום.",
    filters: [
      { id: "all", label: "הכל" },
      { id: "completed", label: "הושלמו" },
      { id: "ongoing", label: "בתהליך" },
      { id: "ai", label: "AI" },
    ],
    noMatch: "אין פרויקטים שמתאימים לסינון הזה.",
    of: "מתוך",
    statusCompleted: "הושלם",
    statusOngoing: "בתהליך",
    launchingSoon: "בקרוב",
    visitLive: "לאתר החי",
    viewCase: "לפרויקט",
    role: "תפקיד",
  },
  services: {
    eyebrow: "מה אני בונה",
    title: "יותר פניות. פחות עבודה ידנית.",
    subtitle: "אתרים, SEO, נראות בגוגל, הזמנות, וואטסאפ ו-AI מעשי — לעסקים קטנים שרוצים תוצאות, לא ז׳רגון.",
    items: [
      { name: "בניית אתר לעסק קטן", summary: "אתר מודרני שמסביר מה את עושה, בונה אמון, ומקל על יצירת קשר.", href: "/he/services" },
      { name: "שדרוג אתר קיים", summary: "רענון אתר ישן כך שיראה עדכני, ייטען מהר, ויהפוך יותר מבקרים לפניות.", href: "/he/services" },
      { name: "SEO ונראות בגוגל", summary: "כותרות, מבנה ויסודות טכניים כדי שגוגל יבין את העסק וישלח תנועה נכונה.", href: "/he/services" },
      { name: "Google Business Profile", summary: "הגדרה ואופטימיזציה של הפרופיל כדי שלקוחות מקומיים ימצאו אותך.", href: "/he/services" },
      { name: "טפסים והזמנות", summary: "זרימת פניות ופגישות ברורה — פחות פניות שאבדות ופחות מעקב ידני.", href: "/he/services" },
      { name: "אינטגרציית וואטסאפ", summary: "כפתור וואטסאפ בלחיצה אחת כדי שמבקרים יוכלו לשלוח הודעה בלי לחפש מספר.", href: "/he/services" },
      { name: "צ'אטבוטים ואוטומציית AI", summary: "כלים מעשיים שעונים על שאלות נפוצות, אוספים פניות, וחוסכים עבודה חוזרת.", href: "/he/services" },
      { name: "אופטימיזציית מהירות", summary: "טעינה מהירה יותר במובייל — ציוני גוגל טובים יותר ופחות מבקרים שעוזבים.", href: "/he/services" },
    ],
    exploreAll: "כל השירותים",
    exploreHref: "/he/services",
  },
  showcase: {
    eyebrow: "עקרונות הנדסה",
    title: "תחושה פרימיום, תשתית מתחת.",
    subtitle: "כל פרויקט נשפט לפי אותו סטנדרט — רמת גימור של צוות מוצר מוביל.",
    stats: [
      { value: "99", suffix: "+", label: "ציון Lighthouse ממוצע" },
      { value: "<1.2", suffix: "ש׳", label: "LCP חציוני בבניות" },
      { value: "30", suffix: "%", label: "תפעול מהיר יותר אחרי אוטומציה" },
      { value: "100", suffix: "%", label: "קוד עם TypeScript" },
    ],
    pillars: [
      { title: "בנוי למהירות", body: "רינדור בקצה, אופטימיזציה של תמונות ופונטים, ומינימום JavaScript מיותר." },
      { title: "אבטחה שקטה", body: "אימות מודרני, CSP הדוק, וולידציה מקצה לקצה — אבטחה כגישה, לא כפאניקה." },
      { title: "ניתן לניטור", body: "לוגים, מדדים ו-Web Vitals מהיום הראשון — תמיד יודעים איך המערכת מרגישה." },
      { title: "קל לתחזוקה", body: "קוד שקוראים כמו מזכר לעצמך בעתיד — מוקלד, נבדק, מתועד." },
    ],
  },
  whyWork: {
    eyebrow: "למה לעבוד איתי",
    title: "סטודיו קטן, ממוקד בתוצאות שלך.",
    reasons: [
      { title: "מפתחת, לא תבנית מוכנה", description: "קוד מותאם ועיצוב מחושב — לא תבנית גנרית עם הלוגו שלך." },
      { title: "תהליך ברור ותקשורת ישירה", description: "תמיד יודעת מה קורה, כמה זה עולה, ומה השלב הבא." },
      { title: "אתרים לפניות, מהירות ואמון", description: "כל עמוד בנוי סביב יצירת קשר, נראות בגוגל, וביצועים מהירים במובייל." },
    ],
  },
  process: {
    eyebrow: "איך אני עובדת",
    title: "תהליך פשוט ושקוף.",
    subtitle: "שלושה שלבים. עדכונים שבועיים. בלי קופסאות שחורות — תמיד תדעי מה אני בונה ולמה.",
    steps: [
      { n: "01", title: "היכרות", body: "אני ממפה מטרות, משתמשים ומגבלות, ומתרגמת לתוכנית בנייה עם אבני דרך ברורות." },
      { n: "02", title: "עיצוב ובנייה", body: "סבבי עבודה ב-Figma ובקוד. רואים מוצר אמיתי כל שבוע — לא מצגת, לא הפתעות." },
      { n: "03", title: "השקה והמשך", body: "אני מעלה לפרודקשן, עוקבת אחרי מדדים, וממשיכה לשפר אחרי שהאתר באוויר." },
    ],
  },
  pricing: {
    eyebrow: "חבילות · נקודות התחלה",
    title: "חבילות פשוטות.",
    titleMuted: "טווחים ברורים.",
    intro: "כל עסק שונה — אלה טווחי התחלה טיפוסיים. אחרי בדיקה בחינם, אמליץ על התיקון הקטן ביותר שבאמת יזיז את המחט.",
    footnote: "המחיר הסופי תלוי בעמודים, אינטגרציות ותוכן. תמיד תקבלי הצעת מחיר ברורה לפני שמתחילים.",
    plans: [
      {
        id: "quick-fix",
        name: "תיקון מהיר לאתר",
        description: "תיקונים ממוקדים כשמשהו ספציפי שבור או פוגע בפניות.",
        price: "$300–$500",
        priceNote: "USD · לפי היקף התיקון",
        features: ["תיקוני מובייל או טופס יצירת קשר", "הגדרת וואטסאפ או חיוג", "שיפורי מהירות בעמודים מרכזיים", "ניקוי כותרות ותיאורי SEO", "עדכוני טקסט או אמון קטנים"],
        cta: "בדיקת אתר בחינם",
      },
      {
        id: "refresh",
        name: "רענון דף נחיתה / אתר",
        description: "רושם ראשוני חד יותר — עיצוב מודרני, הצעה ברורה, המרה טובה יותר.",
        price: "$750–$1,200",
        priceNote: "USD · פרויקט חד-פעמי",
        features: ["עיצוב מחדש לדף הבית או נחיתה", "פריסה רספונסיבית למובייל", "טפסים ווואטסאפ", "SEO בסיסי", "מסירה מהירה — בדרך כלל 2–3 שבועות"],
        cta: "בדיקת אתר בחינם",
        badge: "הכי פופולרי",
        featured: true,
      },
      {
        id: "full",
        name: "אתר מלא + SEO",
        description: "אתר שלם להפקת פניות עם נראות בגוגל מהיום הראשון.",
        price: "$1,500–$3,000",
        priceNote: "USD · לפי היקף",
        features: ["אתר מותאם אישית מרובה עמודים", "זרימת הזמנות או פניות", "SEO ונראות בגוגל", "הדרכה ל-Google Business Profile", "צ'אטבוט או אוטומציה (במידת הצורך)", "חלון תמיכה אחרי השקה"],
        cta: "בדיקת אתר בחינם",
      },
    ],
  },
  library: {
    eyebrow: "מהספרייה",
    badge: "זמין עכשיו",
    title: "ספר אלקטרוני על",
    titleAccent: "ביצועי SQL",
    titleMuted: "ועוד בדרך.",
    description: "17 עמודים משנות של עבודה עם שאילתות איטיות בפרודקשן — EXPLAIN, אינדקסים, joins, pagination ו-aggregation. לקריאה בכל מכשיר — שלך לתמיד.",
    cta: "לספר",
    browse: "לספרייה",
  },
  cta: {
    eyebrow: "מתחילים כאן",
    title: "שלחי לי את האתר ואראה לך מה עלול למנוע ממבקרים להפוך לפניות.",
    description: "בדיקה קצרה וכנה — מובייל, נראות בגוגל, זרימת יצירת קשר ואותות אמון. אחר כך נדבר על התיקון הנכון אם תרצי עזרה ביישום.",
    button: "בדיקת אתר בחינם",
  },
  reviewButton: "בדיקת אתר בחינם",
  reviewHref: "/he/free-website-review",
};

export const HOME_COPY: Record<Locale, HomeCopy> = { en: EN, he: HE };

export function getHomeCopy(locale: Locale = "en"): HomeCopy {
  return HOME_COPY[locale];
}
