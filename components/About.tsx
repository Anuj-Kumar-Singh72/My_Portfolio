"use client";

import { motion } from "motion/react";
import { Cpu, Film, GraduationCap, Globe } from "lucide-react";
import { profile } from "@/lib/data";
import { MaskText, Reveal } from "./motion";
import { HoverWords } from "./HoverWords";

const tiles = [
  { icon: GraduationCap, tone: "bg-electric/10 text-electric", title: "B.E. in E&TC", text: "D.Y. Patil College of Engineering, Akurdi · 2028" },
  { icon: Cpu, tone: "bg-coral/10 text-coral", title: "Embedded", text: "8051 · PIC · Arduino · I2C · SPI" },
  { icon: Globe, tone: "bg-teal/20 text-[#0d8577]", title: "Web & AI", text: "Next.js · React · Python" },
  { icon: Film, tone: "bg-sun/25 text-[#b35f00]", title: "Video", text: "Since 2021 · 1.2M+ views on one Reel" },
];

export function About() {
  return (
    <section id="about" className="section-pad bg-about relative">
      <div className="container-x grid items-center gap-14 lg:grid-cols-12 lg:gap-20">
        {/* portrait */}
        <Reveal className="lg:col-span-5">
          <div className="relative mx-auto max-w-sm lg:max-w-none">
            <div aria-hidden className="absolute -inset-3 rotate-[-4deg] rounded-[2.2rem] bg-gradient-to-br from-lav via-electric/60 to-teal/60" />
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] shadow-lift ring-4 ring-white">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={profile.photo2}
                alt={`${profile.name}, side portrait`}
                loading="lazy"
                className="h-full w-full object-cover [object-position:50%_28%]"
              />
              <div aria-hidden className="absolute inset-0 bg-gradient-to-tr from-electric/25 via-transparent to-coral/15 mix-blend-soft-light" />
            </div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.7 }}
              className="glass zoom-hover absolute -bottom-5 -right-3 rounded-2xl px-4 py-3 shadow-soft sm:-right-8"
            >
              <p className="font-display text-lg font-bold leading-tight">{profile.name}</p>
              <p className="font-mono text-[11px] uppercase tracking-wider text-ink-soft">Pune, India</p>
            </motion.div>
          </div>
        </Reveal>

        <div className="lg:col-span-7">
          <Reveal>
            <p className="eyebrow mb-4">About</p>
          </Reveal>
          <MaskText
            text="Engineer by training, creator by habit."
            accent={["creator"]}
            className="font-display text-[clamp(2.3rem,5vw,4.2rem)] font-bold leading-[1.03] tracking-[-0.03em]"
          />
          <Reveal delay={0.15}>
            <HoverWords
              as="p"
              className="mt-6 max-w-xl text-lg leading-relaxed text-ink-soft sm:text-xl"
              text="I build circuits, web apps and video, and I care that each one works cleanly end to end."
            />
          </Reveal>

          <ul className="mt-10 grid gap-4 sm:grid-cols-2">
            {tiles.map((t, i) => (
              <li key={t.title}>
                <Reveal delay={i * 0.08}>
                  <div className="zoom-hover h-full rounded-2xl bg-white/80 p-5 ring-1 ring-ink/5 shadow-soft backdrop-blur">
                    <span className={`mb-3 grid h-10 w-10 place-items-center rounded-xl ${t.tone}`}>
                      <t.icon className="h-5 w-5" aria-hidden />
                    </span>
                    <h3 className="font-display text-lg font-bold tracking-tight">{t.title}</h3>
                    <p className="mt-1 text-sm leading-snug text-ink-soft">{t.text}</p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
