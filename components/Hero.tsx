"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { ChevronDown } from "lucide-react";
import { useRef } from "react";
import { profile, projects } from "@/lib/data";
import { Counter, MaskText } from "./motion";
import { Button } from "./Button";
import { SocialIcon } from "./Icons";
import { Star } from "./Decor";

const ease = [0.22, 1, 0.36, 1] as const;

function Chip({ children, className, delay, tone }: { children: React.ReactNode; className: string; delay: number; tone: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.7 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.7, ease }}
      className={`absolute z-20 ${className}`}
    >
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 6 + delay, repeat: Infinity, ease: "easeInOut" }}
        className="glass zoom-hover flex items-center gap-2 rounded-2xl px-3.5 py-2 text-xs font-semibold shadow-soft sm:text-sm"
      >
        <span className={`h-2.5 w-2.5 rounded-full ${tone}`} />
        {children}
      </motion.div>
    </motion.div>
  );
}

const quick = [
  { value: projects.length, suffix: "", decimals: 0, label: "Projects" },
  { value: 1.2, suffix: "M+", decimals: 1, label: "Reel views" },
  { value: 10.2, suffix: "K+", decimals: 1, label: "Followers" },
];

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const spot = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yFar = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const yMid = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const photoY = useTransform(scrollYProgress, [0, 1], [0, 50]);

  return (
    <section
      id="home"
      ref={ref}
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        spot.current?.style.setProperty("--mx", `${e.clientX - r.left}px`);
        spot.current?.style.setProperty("--my", `${e.clientY - r.top}px`);
      }}
      className="bg-hero relative isolate overflow-hidden px-5 pb-24 pt-28 sm:px-8 md:pt-32 lg:pb-28"
    >
      <div aria-hidden className="absolute inset-0 -z-10">
        <motion.div style={{ y: yFar }} className="absolute -left-40 top-0 h-[34rem] w-[34rem] rounded-full bg-lav/50 blur-[110px]" />
        <motion.div style={{ y: yMid }} className="absolute -right-32 top-10 h-[30rem] w-[30rem] rounded-full bg-teal/30 blur-[110px]" />
        <div className="blueprint absolute inset-0 opacity-50 [mask-image:radial-gradient(ellipse_at_center,black_15%,transparent_70%)]" />
      </div>
      <div
        ref={spot}
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 hidden md:block"
        style={{ background: "radial-gradient(520px circle at var(--mx, 70%) var(--my, 30%), rgba(143,107,255,0.20), rgba(34,195,176,0.07) 45%, transparent 70%)" }}
      />
      {/* stars sit at the far edges, never over text */}
      <Star className="right-[3%] top-[16%] hidden md:block" color="#2B59FF" delay={1.2} size={20} />
      <Star className="right-[44%] bottom-[8%] hidden xl:block" color="#22C3B0" delay={2} size={22} />

      <div className="container-x grid items-center gap-14 lg:grid-cols-12">
        {/* Left */}
        <div className="lg:col-span-7">
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7, ease }}
            className="glass mb-7 inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-medium sm:text-sm"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-teal opacity-70 motion-reduce:hidden" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-teal" />
            </span>
            {profile.name} · E&amp;TC Engineering · Pune
          </motion.p>

          <h1 className="font-display text-[clamp(2.8rem,8vw,6.2rem)] font-bold leading-[0.98] tracking-[-0.035em]">
            <span className="sr-only">{profile.name} — </span>
            <MaskText as="span" onLoad delay={0.45} text="Circuits, code & compelling stories." accent={["code", "stories"]} className="block" />
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.8, ease }}
            className="mt-7 max-w-xl text-lg leading-relaxed text-ink-soft sm:text-xl"
          >
            Electronics &amp; Telecommunication Engineering student building software, AI-powered applications, and embedded systems—with a creative edge in digital storytelling.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3, duration: 0.8, ease }}
            className="mt-8 flex flex-wrap items-center gap-4"
          >
            <Button href="#projects">Explore My Work</Button>
            <Button href={profile.resume} variant="ghost" download icon="download">
              Download Resume
            </Button>
            <div className="ml-1 flex items-center gap-2">
              {profile.socials.map((s) => (
                <a
                  key={s.id}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${s.label} — ${s.handle}`}
                  className="zoom-hover grid h-11 w-11 place-items-center rounded-full bg-white/80 ring-1 ring-ink/10 transition-colors hover:text-electric hover:shadow-soft"
                >
                  <SocialIcon id={s.id} />
                </a>
              ))}
            </div>
          </motion.div>

          <motion.dl
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.6, duration: 0.8 }}
            className="mt-12 flex max-w-md gap-8 border-t border-ink/10 pt-6"
          >
            {quick.map((q) => (
              <div key={q.label}>
                <dd className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
                  <Counter value={q.value} decimals={q.decimals} suffix={q.suffix} />
                </dd>
                <dt className="mt-0.5 text-xs text-ink-soft sm:text-sm">{q.label}</dt>
              </div>
            ))}
          </motion.dl>
        </div>

        {/* Right — photo composition */}
        <motion.div style={{ y: photoY }} className="relative mx-auto w-full max-w-[22rem] sm:max-w-md lg:col-span-5 lg:max-w-none">
          <div className="relative mx-auto aspect-[4/5] w-[78%] sm:w-[74%]">
            {/* soft colour glow */}
            <div aria-hidden className="absolute -inset-12 rounded-full bg-gradient-to-br from-electric/30 via-lav/50 to-coral/25 blur-3xl" />

            {/* slow orbit with three dots */}
            <div aria-hidden className="spin-slow absolute left-1/2 top-1/2 h-[122%] w-[122%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-electric/25">
              <span className="absolute left-1/2 top-0 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-coral shadow-[0_0_0_5px_rgba(255,106,87,0.18)]" />
              <span className="absolute bottom-[12%] left-[3%] h-2.5 w-2.5 rounded-full bg-teal shadow-[0_0_0_5px_rgba(34,195,176,0.2)]" />
              <span className="absolute right-[2%] top-[58%] h-2 w-2 rounded-full bg-sun shadow-[0_0_0_4px_rgba(255,169,77,0.22)]" />
            </div>

            {/* concentric arch outlines, evenly spaced */}
            <motion.div
              aria-hidden
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8, duration: 1, ease }}
              className="absolute -inset-3.5 border border-ink/15 [border-radius:999px_999px_2.75rem_2.75rem]"
            />
            <motion.div
              aria-hidden
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1, duration: 1, ease }}
              className="absolute -inset-7 border border-dashed border-electric/35 [border-radius:999px_999px_3.5rem_3.5rem]"
            />

            {/* dotted grid accent */}
            <div
              aria-hidden
              className="absolute -bottom-9 -right-9 -z-0 h-28 w-28 opacity-60"
              style={{ background: "radial-gradient(#2B59FF 1.6px, transparent 1.7px) 0 0 / 14px 14px" }}
            />

            {/* shadow plate (kept separate so the reveal clip doesn't cut it) */}
            <div aria-hidden className="absolute inset-0 shadow-lift [border-radius:999px_999px_2.5rem_2.5rem]" />

            {/* the photograph */}
            <motion.div
              initial={{ clipPath: "inset(100% 0% 0% 0% round 999px 999px 40px 40px)" }}
              animate={{ clipPath: "inset(0% 0% 0% 0% round 999px 999px 40px 40px)" }}
              transition={{ delay: 0.5, duration: 1.3, ease: [0.76, 0, 0.24, 1] }}
              className="relative z-10 h-full w-full overflow-hidden border-[6px] border-white bg-lav/30 [border-radius:999px_999px_2.5rem_2.5rem]"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={profile.photo} alt={`Portrait of ${profile.name}`} className="h-full w-full object-cover [object-position:50%_30%]" fetchPriority="high" />
              <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-electric/35 via-transparent to-lav/20 mix-blend-soft-light" />
              <div aria-hidden className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-ink/35 to-transparent" />
            </motion.div>

            {/* rotating badge: text length is fitted to the circle so it can't overlap itself */}
            <svg aria-hidden viewBox="0 0 200 200" className="spin-slow absolute -right-12 -top-5 z-20 h-24 w-24 sm:-right-16 sm:h-28 sm:w-28">
              <defs>
                <path id="ring" d="M100,100 m-70,0 a70,70 0 1,1 140,0 a70,70 0 1,1 -140,0" />
              </defs>
              <circle cx="100" cy="100" r="96" fill="#FBF8F1" stroke="rgba(20,20,43,0.12)" />
              <circle cx="100" cy="100" r="50" fill="none" stroke="rgba(20,20,43,0.12)" strokeDasharray="3 5" />
              <text className="fill-ink font-mono" style={{ fontSize: 14, fontWeight: 600 }}>
                <textPath href="#ring" textLength="436" lengthAdjust="spacing">ELECTRONICS • CODE • VIDEO • </textPath>
              </text>
              <circle cx="100" cy="100" r="9" className="fill-coral" />
            </svg>

            <Chip className="-left-9 top-[24%] sm:-left-14" delay={1.5} tone="bg-electric">Arduino · KiCad</Chip>
            <Chip className="-right-9 top-[60%] sm:-right-14" delay={1.8} tone="bg-coral">Next.js · React</Chip>
            <Chip className="-left-5 bottom-[7%] sm:-left-10" delay={2.1} tone="bg-teal">DaVinci Resolve</Chip>
          </div>
        </motion.div>
      </div>

      <motion.a
        href="#about"
        aria-label="Scroll to About"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.4 }}
        className="absolute bottom-5 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-1 font-mono text-[10px] uppercase tracking-[0.25em] text-ink-soft md:flex"
      >
        Scroll
        <motion.span animate={{ y: [0, 6, 0] }} transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}>
          <ChevronDown className="h-4 w-4" />
        </motion.span>
      </motion.a>
    </section>
  );
}
