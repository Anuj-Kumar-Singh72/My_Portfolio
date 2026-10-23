"use client";

import { motion, useMotionValue, useSpring, useInView, useReducedMotion, animate } from "motion/react";
import { useEffect, useRef, useState, type ElementType, type ReactNode } from "react";

const ease = [0.22, 1, 0.36, 1] as const;

export function Reveal({
  children,
  delay = 0,
  y = 28,
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, delay, ease }}
    >
      {children}
    </motion.div>
  );
}

/** Word-by-word masked reveal. `accent` words get the serif-italic gradient treatment. */
export function MaskText({
  text,
  as = "h2",
  className = "",
  accent = [],
  onLoad = false,
  delay = 0,
}: {
  text: string;
  as?: ElementType;
  className?: string;
  accent?: string[];
  onLoad?: boolean;
  delay?: number;
}) {
  const Tag = as;
  const [done, setDone] = useState(false);
  const holder = useRef<HTMLElement>(null);
  const seen = useInView(holder, { once: true, margin: "-60px" });
  const go = onLoad || seen;
  const words = text.split(" ");
  const clean = (w: string) => w.replace(/[^\w&]/g, "").toLowerCase();
  const accentSet = new Set(accent.map(clean));
  const trigger = { animate: { y: go ? "0%" : "115%" } };

  return (
    <Tag ref={holder} className={className} aria-label={text}>
      {words.map((w, i) => (
        <span key={i} className={`inline-block pb-[0.12em] align-bottom ${done ? "" : "overflow-hidden"}`} aria-hidden="true">
          <motion.span
            className="inline-block"
            onAnimationComplete={() => i === words.length - 1 && setDone(true)}
            initial={{ y: "115%" }}
            {...trigger}
            transition={{ duration: 0.9, delay: delay + i * 0.07, ease }}
          >
            <span className={`word-zoom ${accentSet.has(clean(w)) ? "font-serif italic font-normal text-gradient pr-[0.06em]" : ""}`}>{w}</span>
          </motion.span>
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </Tag>
  );
}

export function Magnetic({ children, strength = 0.3 }: { children: ReactNode; strength?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const calm = useReducedMotion();
  const x = useSpring(useMotionValue(0), { stiffness: 220, damping: 16, mass: 0.4 });
  const y = useSpring(useMotionValue(0), { stiffness: 220, damping: 16, mass: 0.4 });

  return (
    <motion.div
      ref={ref}
      style={{ x, y }}
      className="inline-block"
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse" || calm || !ref.current) return;
        const r = ref.current.getBoundingClientRect();
        x.set((e.clientX - (r.left + r.width / 2)) * strength);
        y.set((e.clientY - (r.top + r.height / 2)) * strength);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.div>
  );
}

export function Counter({
  value,
  decimals = 0,
  suffix = "",
}: {
  value: number;
  decimals?: number;
  suffix?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [display, setDisplay] = useState(
    value.toLocaleString("en-IN", { minimumFractionDigits: decimals, maximumFractionDigits: decimals })
  );

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, value, {
      duration: 1.6,
      ease,
      onUpdate: (v) =>
        setDisplay(v.toLocaleString("en-IN", { minimumFractionDigits: decimals, maximumFractionDigits: decimals })),
    });
    return () => controls.stop();
  }, [inView, value, decimals]);

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  );
}
