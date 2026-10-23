"use client";

import { MotionConfig, motion, useScroll } from "motion/react";
import type { ReactNode } from "react";
import { Cursor } from "./Cursor";

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  return (
    <motion.div
      aria-hidden
      className="fixed left-0 right-0 top-0 z-[70] h-[3px] origin-left bg-gradient-to-r from-electric via-lav to-coral"
      style={{ scaleX: scrollYProgress }}
    />
  );
}

export function Providers({ children }: { children: ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <ScrollProgress />
      <Cursor />
      {children}
    </MotionConfig>
  );
}
