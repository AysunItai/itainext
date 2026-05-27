"use client";

import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  type Variants,
} from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

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
  cover: string;
  featured?: boolean;
  externalUrl?: string;
};

const PROJECTS: Project[] = [
  {
    slug: "ai-automation-infrastructure",
    number: "01",
    title: "AI automation infrastructure",
    summary:
      "Email intake, lead qualification, response drafting, and operational handoff — designed as one connected workflow instead of disconnected tools.",
    tags: ["AI workflows", "Email", "APIs", "Automation"],
    status: "Completed",
    category: "ai",
    year: 2025,
    cover: "/work/ai-automation.png",
    featured: true,
    externalUrl: "https://www.isoon.io/",
  },
  {
    slug: "booking-client-acquisition-flow",
    number: "02",
    title: "Booking and client acquisition flow",
    summary:
      "A polished journey from first visit to scheduled consultation, combining website, forms, calendar logic, and follow-up automation.",
    tags: ["Website", "Booking", "Forms", "CRM"],
    status: "Completed",
    category: "completed",
    year: 2025,
    cover: "/work/booking-flow.jpg",
  },
  {
    slug: "custom-business-systems",
    number: "03",
    title: "Custom business systems",
    summary:
      "Internal dashboards, portals, admin tools, and full-stack systems for businesses that need more than a template website.",
    tags: ["React", "TypeScript", "Backend", "Databases"],
    status: "Ongoing",
    category: "ongoing",
    year: 2026,
    cover: "/work/custom-systems.jpg",
  },
  {
    slug: "operational-analytics-dashboard",
    number: "04",
    title: "Operational analytics dashboard",
    summary:
      "A unified view of pipeline, conversions, and team velocity — replacing five disconnected spreadsheets with a single interface leadership checks every morning.",
    tags: ["Dashboard", "Realtime", "Postgres", "Charts"],
    status: "Completed",
    category: "completed",
    year: 2025,
    cover: "/work/dashboard.jpg",
  },
  {
    slug: "marketing-launch-system",
    number: "05",
    title: "Marketing site and launch system",
    summary:
      "A high-conversion brand site with edge-rendered pages, structured CMS authoring, and a launch sequence wired to email, ads, and analytics.",
    tags: ["Website", "Edge", "CMS", "SEO"],
    status: "Completed",
    category: "completed",
    year: 2026,
    cover: "/work/marketing-site.jpg",
  },
  {
    slug: "multi-tenant-saas-platform",
    number: "06",
    title: "Multi-tenant SaaS platform",
    summary:
      "Auth, billing, role-based access, and a workflow engine — the foundation a young product team can build on for years without rewrites.",
    tags: ["SaaS", "Auth", "Stripe", "Edge runtime"],
    status: "Ongoing",
    category: "ongoing",
    year: 2026,
    cover: "/work/saas-platform.jpg",
    featured: true,
  },
];

const FILTERS: { id: "all" | Category; label: string }[] = [
  { id: "all", label: "Show all" },
  { id: "completed", label: "Completed" },
  { id: "ongoing", label: "Ongoing" },
  { id: "ai", label: "AI" },
];

export default function Work() {
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
      className="relative scroll-mt-24 bg-paper px-5 py-24 sm:px-8 sm:py-32"
    >
      <div className="mx-auto max-w-7xl">
        <motion.header
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
          <motion.p
            variants={revealItem(reduce)}
            transition={{ duration: 0.6, ease: easeOut }}
            className="text-xs font-medium uppercase tracking-[0.32em] text-muted"
          >
            Selected work
          </motion.p>
          <div>
            <motion.h2
              id="work-title"
              variants={revealItem(reduce)}
              transition={{ duration: 0.6, ease: easeOut }}
              className="max-w-3xl text-balance text-4xl font-semibold tracking-[-0.035em] text-ink sm:text-5xl"
            >
              Not portfolio pieces. Business systems with a clear job.
            </motion.h2>
            <motion.p
              variants={revealItem(reduce)}
              transition={{ duration: 0.6, ease: easeOut }}
              className="mt-5 max-w-xl text-pretty text-base leading-7 text-muted sm:text-lg"
            >
              Each engagement starts with a real operational need and ends with
              a system the team uses every day.
            </motion.p>
          </div>
        </motion.header>

        <div className="mt-12 flex flex-wrap items-center gap-3 sm:mt-14">
          <div
            role="tablist"
            aria-label="Project filter"
            className="flex flex-wrap items-center gap-1 rounded-full border border-line bg-paper-soft p-1"
          >
            {FILTERS.map((f) => {
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
                    <motion.span
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
            {visible.length} of {PROJECTS.length}
          </span>
        </div>

        <motion.div
          layout={!reduce}
          className="mt-10 grid grid-cols-1 gap-5 sm:gap-6 lg:grid-cols-12"
        >
          <AnimatePresence mode="popLayout">
            {visible.map((p, i) => (
              <motion.div
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
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {visible.length === 0 && (
          <div className="mt-10 rounded-3xl border border-line bg-paper-soft p-12 text-center text-sm text-muted">
            No projects match this filter yet.
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
}: {
  project: Project;
  isWide: boolean;
}) {
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
    <motion.div
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
    <Link
      href={project.externalUrl ?? `/work/${project.slug}`}
      target={project.externalUrl ? "_blank" : undefined}
      rel={project.externalUrl ? "noreferrer" : undefined}
      aria-label={
        project.externalUrl
          ? `Visit live site: ${project.title} (opens in new tab)`
          : `Open case study: ${project.title}`
      }
      className="group block overflow-hidden rounded-3xl border border-line bg-paper transition-all duration-500 hover:border-ink/30 hover:shadow-lifted"
    >
      <div
        className={`relative w-full overflow-hidden bg-mist ${
          isWide ? "aspect-[16/7]" : "aspect-[16/10]"
        }`}
      >
        {imageOk ? (
          <Image
            src={project.cover}
            alt=""
            fill
            sizes={
              isWide
                ? "(min-width: 1024px) 80vw, 100vw"
                : "(min-width: 1024px) 40vw, 100vw"
            }
            onError={() => setImageOk(false)}
            className="object-cover transition-transform duration-[700ms] ease-out group-hover:scale-[1.04]"
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
                <motion.span
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
            {project.status}
          </span>
        </div>

        <div className="absolute right-4 top-4 rounded-full bg-paper/90 px-2.5 py-1 font-mono text-[11px] tabular-nums text-ink backdrop-blur">
          {project.year}
        </div>
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
        </div>

        <div className="flex shrink-0 items-center gap-2 text-sm font-medium text-ink">
          {project.externalUrl ? "Visit live site" : "View case study"}
          <span className="flex h-9 w-9 items-center justify-center rounded-full border border-line transition-all duration-300 group-hover:border-ink/40 group-hover:bg-ink group-hover:text-paper">
            <ArrowUpRight
              className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-px group-hover:translate-x-px"
              strokeWidth={2}
            />
          </span>
        </div>
      </div>
    </Link>
    </motion.div>
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
