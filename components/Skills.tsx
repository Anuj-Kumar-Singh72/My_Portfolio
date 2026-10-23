"use client";

import { motion } from "motion/react";
import { Brain, Code2, Cpu, Film, Globe, Wrench } from "lucide-react";
import { skillGroups, type SkillGroup } from "@/lib/data";
import { MaskText, Reveal } from "./motion";

const icons = { code: Code2, globe: Globe, brain: Brain, cpu: Cpu, wrench: Wrench, film: Film };

const accent: Record<SkillGroup["accent"], { chip: string; icon: string; glow: string }> = {
  electric: { chip: "hover:bg-electric hover:text-white", icon: "bg-electric/10 text-electric", glow: "bg-electric/15" },
  teal: { chip: "hover:bg-teal hover:text-ink", icon: "bg-teal/15 text-[#0d8577]", glow: "bg-teal/20" },
  coral: { chip: "hover:bg-coral hover:text-white", icon: "bg-coral/10 text-coral", glow: "bg-coral/15" },
  sun: { chip: "hover:bg-sun hover:text-ink", icon: "bg-sun/20 text-[#b35f00]", glow: "bg-sun/25" },
  lav: { chip: "hover:bg-lav hover:text-ink", icon: "bg-lav/40 text-[#5b3fd0]", glow: "bg-lav/40" },
};

export function Skills() {
  return (
    <section id="skills" className="section-pad bg-skills layered relative">
      <div className="container-x">
        <Reveal>
          <p className="eyebrow mb-4">Toolkit</p>
        </Reveal>
        <MaskText
          text="From firmware to final cut."
          accent={["firmware", "cut."]}
          className="mb-14 max-w-3xl font-display text-[clamp(2.4rem,5.2vw,4.4rem)] font-bold leading-[1.02] tracking-[-0.03em]"
        />

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((g, i) => {
            const Icon = icons[g.icon];
            const a = accent[g.accent];
            return (
              <Reveal key={g.id} delay={(i % 3) * 0.08}>
                <motion.article
                  whileHover={{ y: -6 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="group relative h-full overflow-hidden rounded-[1.75rem] bg-white p-7 shadow-soft ring-1 ring-ink/5"
                >
                  <div aria-hidden className={`absolute -right-10 -top-10 h-36 w-36 rounded-full blur-2xl transition-transform duration-700 group-hover:scale-150 ${a.glow}`} />
                  <div className="relative mb-5 flex items-center gap-3">
                    <span className={`grid h-11 w-11 place-items-center rounded-2xl ${a.icon}`}>
                      <Icon className="h-5 w-5" aria-hidden />
                    </span>
                    <h3 className="font-display text-xl font-bold tracking-tight">{g.title}</h3>
                  </div>
                  <ul className="relative flex flex-wrap gap-2">
                    {g.items.map((s) => (
                      <li key={s}>
                        <motion.span
                          whileHover={{ scale: 1.06, rotate: -1.5 }}
                          whileTap={{ scale: 0.96 }}
                          tabIndex={0}
                          className={`inline-block cursor-default rounded-full bg-ivory-deep px-3.5 py-1.5 text-sm font-medium transition-colors duration-200 focus-visible:bg-ink focus-visible:text-white ${a.chip}`}
                        >
                          {s}
                        </motion.span>
                      </li>
                    ))}
                  </ul>
                </motion.article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
