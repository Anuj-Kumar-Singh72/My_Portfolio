"use client";

import { AnimatePresence, motion, useMotionValue, useSpring } from "motion/react";
import { useEffect, useRef, useState } from "react";

type Mode = "default" | "link" | "text";

const TEXT_SELECTOR = "p, h1, h2, h3, h4, li, dt, dd, figcaption, blockquote";
const LINK_SELECTOR = "a, button, [role='button'], [role='tab'], [data-cursor], summary, label";

/** Comet-trail blob: follows the pointer with its own spring so the tail lags behind. */
function Trail({
  x,
  y,
  size,
  stiffness,
  color,
}: {
  x: ReturnType<typeof useMotionValue<number>>;
  y: ReturnType<typeof useMotionValue<number>>;
  size: number;
  stiffness: number;
  color: string;
}) {
  const sx = useSpring(x, { stiffness, damping: 24, mass: 0.6 });
  const sy = useSpring(y, { stiffness, damping: 24, mass: 0.6 });
  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[98] rounded-full"
      style={{ x: sx, y: sy, width: size, height: size, translateX: "-50%", translateY: "-50%", background: color, filter: "blur(1px)" }}
    />
  );
}

export function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [mode, setMode] = useState<Mode>("default");
  const [down, setDown] = useState(false);
  const [visible, setVisible] = useState(false);
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([]);
  const rid = useRef(0);

  const x = useMotionValue(-200);
  const y = useMotionValue(-200);
  const rx = useSpring(x, { stiffness: 420, damping: 30, mass: 0.35 });
  const ry = useSpring(y, { stiffness: 420, damping: 30, mass: 0.35 });

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;
    setEnabled(true);
    document.documentElement.classList.add("has-cursor");

    const move = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
      const t = e.target as HTMLElement | null;
      if (!t || !t.closest) return;
      if (t.closest(LINK_SELECTOR)) setMode("link");
      else if (t.closest(TEXT_SELECTOR)) setMode("text");
      else setMode("default");
    };
    const downH = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      setDown(true);
      const id = ++rid.current;
      setRipples((r) => [...r.slice(-4), { id, x: e.clientX, y: e.clientY }]);
      window.setTimeout(() => setRipples((r) => r.filter((q) => q.id !== id)), 700);
    };
    const up = () => setDown(false);
    const leave = () => setVisible(false);

    window.addEventListener("pointermove", move);
    window.addEventListener("pointerdown", downH);
    window.addEventListener("pointerup", up);
    document.documentElement.addEventListener("mouseleave", leave);
    return () => {
      document.documentElement.classList.remove("has-cursor");
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerdown", downH);
      window.removeEventListener("pointerup", up);
      document.documentElement.removeEventListener("mouseleave", leave);
    };
  }, [x, y]);

  if (!enabled) return null;

  const ring =
    mode === "link"
      ? { width: 68, height: 68, backgroundColor: "rgba(43,89,255,0.14)", borderColor: "rgba(43,89,255,0.9)" }
      : mode === "text"
        ? { width: 96, height: 96, backgroundColor: "rgba(200,182,255,0.16)", borderColor: "rgba(143,107,255,0.75)" }
        : { width: 34, height: 34, backgroundColor: "rgba(200,182,255,0)", borderColor: "rgba(20,20,43,0.55)" };

  return (
    <div style={{ opacity: visible ? 1 : 0, transition: "opacity .25s" }} aria-hidden>
      {/* comet trail */}
      <Trail x={x} y={y} size={14} stiffness={190} color="rgba(43,89,255,0.35)" />
      <Trail x={x} y={y} size={10} stiffness={120} color="rgba(143,107,255,0.35)" />
      <Trail x={x} y={y} size={7} stiffness={80} color="rgba(255,106,87,0.4)" />
      <Trail x={x} y={y} size={5} stiffness={52} color="rgba(255,169,77,0.45)" />

      {/* ring / lens */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[99] rounded-full border-2"
        style={{
          x: rx,
          y: ry,
          translateX: "-50%",
          translateY: "-50%",
          backdropFilter: mode === "text" ? "saturate(1.5) brightness(1.04)" : "none",
        }}
        animate={{ ...ring, scale: down ? 0.82 : 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 22 }}
      />

      {/* dot */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[100] rounded-full bg-electric"
        style={{ x, y, translateX: "-50%", translateY: "-50%" }}
        animate={{ width: mode === "link" ? 6 : 8, height: mode === "link" ? 6 : 8, scale: down ? 2.2 : 1 }}
        transition={{ type: "spring", stiffness: 500, damping: 25 }}
      />

      {/* click ripples */}
      <AnimatePresence>
        {ripples.map((r) => (
          <motion.span
            key={r.id}
            className="pointer-events-none fixed z-[97] rounded-full border-2 border-coral"
            style={{ left: r.x, top: r.y, width: 20, height: 20, translateX: "-50%", translateY: "-50%" }}
            initial={{ scale: 0.4, opacity: 0.9 }}
            animate={{ scale: 4.5, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.65, ease: "easeOut" }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}
