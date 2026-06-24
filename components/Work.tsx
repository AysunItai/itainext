"use client";

import {
  AnimatePresence,
  m,
  useMotionValue,
  useReducedMotion,
  useSpring,
  type Variants,
} from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState, type ReactNode } from "react";
import { getHomeCopy } from "@/lib/home-copy";
import type { Locale } from "@/lib/i18n";

const easeOut = [0.22, 1, 0.36, 1] as const;

type Status = "Completed" | "Ongoing";
type Category = "completed" | "ongoing" | "ai";

type Project = {
  slug: string;
  number: string;
  title: string;
  summary: string;
  tags: string[];
  status: Status;
  category: Category;
  year: number;
  cover?: string;
  featured?: boolean;
  externalUrl?: string;
  comingSoon?: boolean;
  role?: string;
};

const PROJECTS: Project[] = [
  {
    slug: "ai-automation-infrastructure",
    number: "01",
    title: "Isoon — AI inbox automation",
    summary:
      "An AI assistant that reads your inbox, classifies every message, and prepares professional replies in your Drafts folder — built for small businesses that live in their inbox.",
    tags: ["AI", "Email automation", "Inbox AI", "SaaS"],
    status: "Completed",
    category: "ai",
    year: 2025,
    cover: "/work/ai-automation.jpg",
    featured: true,
    externalUrl: "https://www.isoon.io/",
  },
  {
    slug: "clinic-booking-site",
    number: "02",
    title: "Clinic site with online booking",
    summary:
      "A website pattern for clinics and small service businesses — clear service pages, multi-location support, and online appointment booking wired into every touchpoint that matters.",
    tags: ["Healthcare", "Website", "Online booking", "Local business"],
    status: "Completed",
    category: "completed",
    year: 2026,
    cover: "/work/drsoldea.jpg",
    externalUrl: "https://www.echographielyon.fr/",
  },
  {
    slug: "gotoorbit",
    number: "03",
    title: "gotoOrbit — AI workflow automation",
    summary:
      "An AI workflow automation platform that turns conversations into approved, executable actions inside business systems — connecting chat-driven AI to controlled macros and human approval flows.",
    tags: ["AI", "Workflow", "Approval flows", "Platform"],
    status: "Ongoing",
    category: "ongoing",
    year: 2026,
    comingSoon: true,
  },
  {
    slug: "grade-creator-payouts",
    number: "04",
    title: "Grade — global creator payouts",
    summary:
      "A YC-backed platform that pays creators across 190+ countries while handling KYC, tax forms, and DAC7 reporting — turning hundreds of creator invoices into one compliant batch finance teams approve in minutes.",
    tags: ["Fintech", "Compliance", "Payouts", "SaaS"],
    status: "Completed",
    category: "completed",
    year: 2026,
    cover: "/work/grade.jpg",
    externalUrl: "https://usegrade.com/",
    role: "Contract full-stack engineer",
  },
  {
    slug: "cirwep-hpl-consortium",
    number: "05",
    title: "CIRWEP — integrated platform for HPL Consortium",
    summary:
      "A long-running platform unifying contact, invitation, resource, web, event, and payment management into one system used by consultants, nonprofits, and member organizations to run programs, classes, and groups end-to-end.",
    tags: ["Platform", "Events", "Membership", "Full-stack"],
    status: "Ongoing",
    category: "ongoing",
    year: 2026,
    cover: "/work/cirweb.jpg",
    externalUrl: "https://www.hplconsortium.com/cg",
    role: "Full-stack engineer · 2+ years",
  },
  {
    slug: "uri-itai-personal-site",
    number: "06",
    title: "Uri Itai — mathematician at work",
    summary:
      "A personal site for a senior data scientist and mathematician — a live four-point interpolatory subdivision curve drawn each frame, a hover-reactive career trajectory, and a typed correspondence composer, built as a full-stack Next.js app.",
    tags: ["Personal site", "Next.js", "Interactive", "Animation"],
    status: "Completed",
    category: "completed",
    year: 2026,
    cover: "/work/uriitai.jpg",
    externalUrl: "https://www.uriitai.com/",
    role: "Designer & full-stack engineer",
  },
];

type WorkCopy = ReturnType<typeof getHomeCopy>["work"];

export default function Work({ locale = "en" }: { locale?: Locale }) {
  const workCopy = getHomeCopy(locale).work;
  const filters = workCopy.filters as { id: "all" | Category; label: string }[];
  const reduce = useReducedMotion();
  const [active, setActive] = useState<"all" | Category>("all");

  const visible =
    active === "all"
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === active);

  const layout = computeLayout(visible);

  return (
    <section
      id="work"
      aria-labelledby="work-title"
      className="relative scroll-mt-24 bg-paper px-5 py-16 sm:px-8 sm:py-28"
    >
      <div className="mx-auto max-w-7xl">
        <m.header
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={
            reduce
              ? undefined
              : ({
                  hidden: {},
                  visible: { transition: { staggerChildren: 0.08 } },
                } satisfies Variants)
          }
          className="grid gap-8 md:grid-cols-[0.8fr_1.2fr]"
        >
          <m.p
            variants={revealItem(reduce)}
            transition={{ duration: 0.6, ease: easeOut }}
            className="text-xs font-medium uppercase tracking-[0.32em] text-muted"
          >
            {workCopy.eyebrow}
          </m.p>
          <div>
            <m.h2
              id="work-title"
              variants={revealItem(reduce)}
              transition={{ duration: 0.6, ease: easeOut }}
              className="max-w-3xl text-balance text-4xl font-semibold tracking-[-0.035em] text-ink sm:text-5xl"
            >
              {workCopy.title}
            </m.h2>
            <m.p
              variants={revealItem(reduce)}
              transition={{ duration: 0.6, ease: easeOut }}
              className="mt-5 max-w-xl text-pretty text-base leading-7 text-muted sm:text-lg"
            >
              {workCopy.subtitle}
            </m.p>
          </div>
        </m.header>

        <div className="mt-12 flex flex-wrap items-center gap-3 sm:mt-14">
          <div
            role="tablist"
            aria-label="Project filter"
            className="flex flex-wrap items-center gap-1 rounded-full border border-line bg-paper-soft p-1"
          >
            {filters.map((f) => {
              const isActive = active === f.id;
              return (
                <button
                  key={f.id}
                  role="tab"
                  type="button"
                  aria-selected={isActive}
                  onClick={() => setActive(f.id)}
                  className="relative rounded-full px-4 py-2 text-sm font-medium text-muted transition-colors hover:text-ink"
                >
                  {isActive && (
                    <m.span
                      layoutId="work-filter-pill"
                      className="absolute inset-0 -z-0 rounded-full bg-ink"
                      transition={{
                        duration: 0.4,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                    />
                  )}
                  <span
                    className={
                      isActive
                        ? "relative z-10 text-paper"
                        : "relative z-10"
                    }
                  >
                    {f.label}
                  </span>
                </button>
              );
            })}
          </div>
          <span className="ml-auto text-xs font-medium tabular-nums text-muted">
            {visible.length} {workCopy.of} {PROJECTS.length}
          </span>
        </div>

        <m.div
          layout={!reduce}
          className="mt-10 grid grid-cols-1 gap-5 sm:gap-6 lg:grid-cols-12"
        >
          <AnimatePresence mode="popLayout">
            {visible.map((p, i) => (
              <m.div
                key={p.slug}
                layout={!reduce}
                initial={reduce ? { opacity: 0 } : { opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? { opacity: 0 } : { opacity: 0, y: -16 }}
                transition={{
                  duration: 0.5,
                  delay: reduce ? 0 : i * 0.06,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className={layout[i]}
              >
                <ProjectCard
                  project={p}
                  isWide={layout[i] === "lg:col-span-12"}
                  workCopy={workCopy}
                  locale={locale}
                />
              </m.div>
            ))}
          </AnimatePresence>
        </m.div>

        {visible.length === 0 && (
          <div className="mt-10 rounded-3xl border border-line bg-paper-soft p-12 text-center text-sm text-muted">
            {workCopy.noMatch}
          </div>
        )}
      </div>
    </section>
  );
}

function revealItem(reduce: boolean | null): Variants {
  return {
    hidden: reduce ? { opacity: 0 } : { opacity: 0, y: 12 },
    visible: { opacity: 1, y: 0 },
  };
}

function computeLayout(visible: Project[]): string[] {
  const spans: string[] = new Array(visible.length).fill("lg:col-span-6");
  let i = 0;
  while (i < visible.length) {
    const p = visible[i];
    if (p.featured) {
      spans[i] = "lg:col-span-12";
      i += 1;
      continue;
    }
    const next = visible[i + 1];
    if (next && !next.featured) {
      spans[i] = "lg:col-span-6";
      spans[i + 1] = "lg:col-span-6";
      i += 2;
    } else {
      spans[i] = "lg:col-span-12";
      i += 1;
    }
  }
  return spans;
}

function ProjectCard({
  project,
  isWide,
  workCopy,
  locale,
}: {
  project: Project;
  isWide: boolean;
  workCopy: WorkCopy;
  locale: Locale;
}) {
  const isHe = locale === "he";
  const reduce = useReducedMotion();
  const [imageOk, setImageOk] = useState(true);

  const xRaw = useMotionValue(0);
  const yRaw = useMotionValue(0);
  const liftRaw = useMotionValue(0);
  const springConfig = { stiffness: 220, damping: 22, mass: 0.4 };
  const rotateY = useSpring(xRaw, springConfig);
  const rotateX = useSpring(yRaw, springConfig);
  const translateY = useSpring(liftRaw, springConfig);

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reduce) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    xRaw.set(px * 6);
    yRaw.set(-py * 6);
  };
  const handleEnter = () => {
    if (!reduce) liftRaw.set(-4);
  };
  const handleLeave = () => {
    xRaw.set(0);
    yRaw.set(0);
    liftRaw.set(0);
  };

  return (
    <m.div
      onMouseMove={handleMove}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      style={{
        rotateX,
        rotateY,
        y: translateY,
        transformPerspective: 1000,
        transformStyle: "preserve-3d",
      }}
      className="rounded-3xl"
    >
    <CardShell
      project={project}
      className="group block overflow-hidden rounded-3xl border border-line bg-paper transition-all duration-500 hover:border-ink/30 hover:shadow-lifted"
    >
      <div
        className={`relative w-full overflow-hidden bg-mist ${
          isWide ? "aspect-[16/7]" : "aspect-[16/10]"
        }`}
      >
        {project.cover && imageOk ? (
          // Explicit `width`/`height` (instead of `fill`) so the rendered
          // <img> carries real size attributes — Screaming Frog flagged the
          // fill variant as "Missing Size Attributes". The intrinsic ratio
          // is what the source PNGs share (~16:7 / 16:10) and the absolute
          // positioning below stretches the image to fill the aspect-ratio
          // parent. CLS is prevented both ways, but real attributes are
          // friendlier to scanners and to browsers that haven't applied CSS
          // yet (the very first paint).
          <Image
            src={project.cover}
            alt={`${project.title} — case study cover`}
            width={1600}
            height={isWide ? 700 : 1000}
            sizes={
              isWide
                ? "(min-width: 1280px) 1216px, (min-width: 1024px) 90vw, 100vw"
                : "(min-width: 1280px) 596px, (min-width: 1024px) 45vw, 100vw"
            }
            quality={80}
            onError={() => setImageOk(false)}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-[700ms] ease-out group-hover:scale-[1.04]"
          />
        ) : (
          <PlaceholderCover project={project} />
        )}

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-ink/10 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

        <div className="absolute left-4 top-4">
          <span className="flex items-center gap-1.5 rounded-full bg-paper/90 px-2.5 py-1 text-[11px] font-medium text-ink backdrop-blur">
            <span
              aria-hidden
              className="relative flex h-1.5 w-1.5 items-center justify-center"
            >
              {!reduce && (
                <m.span
                  aria-hidden
                  initial={{ scale: 1, opacity: 0.5 }}
                  animate={{ scale: [1, 2.4, 2.4], opacity: [0.45, 0, 0] }}
                  transition={{
                    duration: 2.2,
                    repeat: Infinity,
                    ease: "easeOut",
                  }}
                  className={`absolute inset-0 rounded-full ${
                    project.status === "Ongoing"
                      ? "bg-amber-500"
                      : "bg-emerald-500"
                  }`}
                />
              )}
              <span
                className={`relative h-1.5 w-1.5 rounded-full ${
                  project.status === "Ongoing"
                    ? "bg-amber-500"
                    : "bg-emerald-500"
                }`}
              />
            </span>
            {project.comingSoon ? workCopy.launchingSoon : project.status === "Ongoing" ? workCopy.statusOngoing : workCopy.statusCompleted}
          </span>
        </div>

        <div className="absolute right-4 top-4 rounded-full bg-paper/90 px-2.5 py-1 font-mono text-[11px] tabular-nums text-ink backdrop-blur">
          {project.year}
        </div>

        {project.cover && imageOk && (
          <>
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-ink/55 via-ink/15 to-transparent"
            />
            <div className="pointer-events-none absolute bottom-5 left-5 flex items-baseline gap-3 font-mono text-paper [text-shadow:0_1px_2px_rgba(0,0,0,0.35)] sm:bottom-6 sm:left-6">
              <span className="text-5xl font-semibold tabular-nums sm:text-6xl">
                {project.number}
              </span>
              <span className="text-[11px] uppercase tracking-[0.25em] text-paper/85">
                {project.tags[0]}
              </span>
            </div>
          </>
        )}
      </div>

      <div
        className={`flex flex-col gap-6 p-7 sm:p-8 ${
          isWide
            ? "lg:flex-row lg:items-end lg:justify-between lg:gap-12"
            : ""
        }`}
      >
        <div className={isWide ? "lg:max-w-2xl" : ""}>
          <div className="flex items-center gap-3 text-xs font-medium uppercase tracking-[0.2em] text-muted">
            <span className="font-mono tabular-nums text-ink/60">
              {project.number}
            </span>
            <span aria-hidden className="h-px w-10 bg-line" />
            <span>{project.tags[0]}</span>
          </div>

          <h3
            className={`mt-4 text-balance font-semibold tracking-[-0.03em] text-ink ${
              isWide ? "text-3xl sm:text-4xl" : "text-2xl"
            }`}
          >
            {project.title}
          </h3>

          <p
            className={`mt-4 text-pretty leading-7 text-muted ${
              isWide ? "text-lg" : "text-[15px]"
            }`}
          >
            {project.summary}
          </p>

          <ul className="mt-5 flex flex-wrap gap-1.5">
            {project.tags.map((t) => (
              <li
                key={t}
                className="rounded-full border border-line bg-paper-soft px-2.5 py-1 text-xs font-medium text-muted"
              >
                {t}
              </li>
            ))}
          </ul>

          {project.role && (
            <p className="mt-5 flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.2em] text-muted">
              <span aria-hidden className="h-px w-6 bg-line" />
              <span className="text-ink/80">{workCopy.role}</span>
              <span className="text-muted normal-case tracking-normal">
                · {project.role}
              </span>
            </p>
          )}
        </div>

        {project.comingSoon ? (
          <div className="flex shrink-0 items-center gap-2.5 text-sm font-medium text-muted">
            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-dashed border-line">
              <span
                aria-hidden
                className="h-1.5 w-1.5 rounded-full bg-amber-500"
              />
            </span>
            {workCopy.launchingSoon}
          </div>
        ) : (
          <div className="flex shrink-0 items-center gap-2 text-sm font-medium text-ink">
            {project.externalUrl ? workCopy.visitLive : workCopy.viewCase}
            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-line transition-all duration-300 group-hover:border-ink/40 group-hover:bg-ink group-hover:text-paper">
              <ArrowUpRight
                aria-hidden
                className={[
                  "h-4 w-4 transition-transform duration-300",
                  isHe
                    ? "rotate-180 group-hover:-translate-x-px group-hover:-translate-y-px"
                    : "group-hover:-translate-y-px group-hover:translate-x-px",
                ].join(" ")}
                strokeWidth={2}
              />
            </span>
          </div>
        )}
      </div>
    </CardShell>
    </m.div>
  );
}

function CardShell({
  project,
  className,
  children,
}: {
  project: Project;
  className?: string;
  children: ReactNode;
}) {
  if (project.comingSoon) {
    return (
      <div
        aria-label={`${project.title} — launching soon`}
        className={className}
      >
        {children}
      </div>
    );
  }
  const href = project.externalUrl ?? `/work/${project.slug}`;
  return (
    <Link
      href={href}
      target={project.externalUrl ? "_blank" : undefined}
      rel={project.externalUrl ? "noreferrer" : undefined}
      aria-label={
        project.externalUrl
          ? `Visit live site: ${project.title} (opens in new tab)`
          : `Open case study: ${project.title}`
      }
      className={className}
    >
      {children}
    </Link>
  );
}

function PlaceholderCover({ project }: { project: Project }) {
  const palettes: Record<Category, string> = {
    ai: "from-indigo-200 via-blue-100 to-paper",
    completed: "from-emerald-100 via-teal-50 to-paper",
    ongoing: "from-amber-100 via-orange-50 to-paper",
  };
  return (
    <div
      aria-hidden
      className={`absolute inset-0 bg-gradient-to-br ${palettes[project.category]} transition-transform duration-[700ms] ease-out group-hover:scale-[1.04]`}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(30,58,138,0.18),transparent_55%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(15,23,42,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.04)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(circle,black,transparent_75%)]" />
      <div className="absolute bottom-6 left-6 flex items-baseline gap-3 font-mono text-ink/40">
        <span className="text-5xl font-semibold tabular-nums sm:text-6xl">
          {project.number}
        </span>
        <span className="text-xs uppercase tracking-[0.25em]">
          {project.tags[0]}
        </span>
      </div>
    </div>
  );
}
