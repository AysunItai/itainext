"use client";

import { LazyMotion, domAnimation } from "framer-motion";

/**
 * Wraps the entire app in a LazyMotion boundary. Combined with the
 * codebase-wide migration from `motion.*` to `m.*`, this cuts the
 * framer-motion runtime that ships with every page from the full
 * ~30 KB gzipped bundle down to the ~16 KB `domAnimation` feature
 * bundle. Strict mode throws at runtime if any leftover `motion.*`
 * component sneaks in, so missed migrations surface immediately
 * during development.
 *
 * `domAnimation` covers everything used in this codebase:
 *   - animate / initial / exit (entry/exit animations)
 *   - whileHover / whileTap / whileInView / whileFocus
 *   - variants
 *   - keyframes and spring transitions
 *   - <AnimatePresence>
 *
 * Things NOT in `domAnimation` (would need `domMax`):
 *   - layout animations
 *   - drag
 *   - LayoutGroup
 *
 * None of those are used in this codebase, so `domAnimation` is the
 * right size/feature trade.
 */
export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      {children}
    </LazyMotion>
  );
}
