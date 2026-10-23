"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";

type NodeId = "sensor" | "mcu" | "relay" | "lock" | "lcd" | "buzzer";

const nodes: Record<NodeId, { x: number; y: number; w: number; h: number; label: string; color: string; text: string }> = {
  sensor: { x: 14, y: 110, w: 104, h: 56, label: "Fingerprint\nSensor", color: "#C8B6FF", text: "Reads and verifies the user's fingerprint." },
  mcu: { x: 190, y: 90, w: 118, h: 96, label: "Arduino\nUno", color: "#2B59FF", text: "The embedded controller: ties fingerprint verification to lock actuation and user feedback." },
  relay: { x: 382, y: 24, w: 96, h: 50, label: "Relay", color: "#FFA94D", text: "Switches the solenoid lock, driven from the Arduino." },
  lock: { x: 382, y: 106, w: 96, h: 50, label: "Solenoid\nLock", color: "#22C3B0", text: "The physical door-lock actuator." },
  lcd: { x: 382, y: 188, w: 96, h: 40, label: "16×2 LCD", color: "#FFFFFF", text: "Shows status so the user gets clear feedback." },
  buzzer: { x: 190, y: 224, w: 118, h: 40, label: "Buzzer", color: "#FF6A57", text: "Gives audible feedback." },
};

const wires: { d: string; from: NodeId; to: NodeId }[] = [
  { d: "M118 138 H190", from: "sensor", to: "mcu" },
  { d: "M308 118 H345 V49 H382", from: "mcu", to: "relay" },
  { d: "M430 74 V106", from: "relay", to: "lock" },
  { d: "M308 150 H345 V208 H382", from: "mcu", to: "lcd" },
  { d: "M249 186 V224", from: "mcu", to: "buzzer" },
];

export function CircuitVisual() {
  const [active, setActive] = useState<NodeId>("mcu");
  const a = nodes[active];

  return (
    <figure className="glass relative overflow-hidden rounded-[2rem] p-4 shadow-soft sm:p-6">
      <div aria-hidden className="blueprint absolute inset-0 opacity-70" />
      <figcaption className="relative mb-3 flex items-center justify-between font-mono text-[11px] uppercase tracking-widest text-ink-soft">
        <span>Signal chain · Biometric lock</span>
        <span className="rounded-full bg-ink/5 px-2 py-0.5">tap a block</span>
      </figcaption>

      <svg viewBox="0 0 500 280" className="relative w-full" role="group" aria-label="Interactive block diagram of the biometric door locking system">
        {wires.map((w, i) => {
          const on = active === w.from || active === w.to;
          return (
            <g key={i}>
              <path d={w.d} fill="none" stroke="#14142B" strokeOpacity={0.18} strokeWidth={2.5} strokeLinejoin="round" />
              <path
                d={w.d}
                fill="none"
                stroke={on ? "#2B59FF" : "#8F8FB0"}
                strokeWidth={on ? 3 : 2}
                strokeLinejoin="round"
                className="flow-line"
              />
            </g>
          );
        })}

        {(Object.keys(nodes) as NodeId[]).map((id) => {
          const n = nodes[id];
          const isActive = id === active;
          const dark = id === "mcu";
          return (
            <g
              key={id}
              role="button"
              tabIndex={0}
              aria-pressed={isActive}
              aria-label={n.label.replace("\n", " ")}
              onMouseEnter={() => setActive(id)}
              onFocus={() => setActive(id)}
              onClick={() => setActive(id)}
              onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && (e.preventDefault(), setActive(id))}
              style={{ cursor: "pointer", outline: "none" }}
              data-cursor
            >
              <rect
                x={n.x}
                y={n.y + (isActive ? 4 : 6)}
                width={n.w}
                height={n.h}
                rx={14}
                fill="#14142B"
                opacity={0.12}
              />
              <motion.rect
                x={n.x}
                y={n.y}
                width={n.w}
                height={n.h}
                rx={14}
                fill={n.color}
                stroke={isActive ? "#14142B" : "rgba(20,20,43,0.25)"}
                strokeWidth={isActive ? 2.5 : 1.5}
                animate={{ y: isActive ? -3 : 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              />
              {n.label.split("\n").map((line, li, arr) => (
                <text
                  key={li}
                  x={n.x + n.w / 2}
                  y={n.y + n.h / 2 + (li - (arr.length - 1) / 2) * 15 + 5 - (isActive ? 3 : 0)}
                  textAnchor="middle"
                  fontSize={13}
                  fontWeight={700}
                  fill={dark ? "#fff" : "#14142B"}
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {line}
                </text>
              ))}
            </g>
          );
        })}
      </svg>

      <div className="relative mt-2 min-h-[3.75rem] rounded-2xl bg-white/80 px-4 py-3 text-sm leading-relaxed ring-1 ring-ink/5" aria-live="polite">
        <AnimatePresence mode="wait">
          <motion.p
            key={active}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2 }}
          >
            <strong className="font-display">{nodes[active].label.replace("\n", " ")}.</strong> {a.text}
          </motion.p>
        </AnimatePresence>
      </div>
    </figure>
  );
}
