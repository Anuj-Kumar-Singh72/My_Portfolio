"use client";

import Link from "next/link";
import { AnimatePresence, motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { useState } from "react";
import { categories, categoryLabel, projects, type CategoryId, type Project } from "@/lib/data";
import { MaskText, Reveal } from "./motion";
import { ProjectVisual } from "./ProjectVisual";

const spans = ["md:col-span-7", "md:col-span-5", "md:col-span-5", "md:col-span-7"];

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const rx = useSpring(useMotionValue(0), { stiffness: 200, damping: 18 });
  const ry = useSpring(useMotionValue(0), { stiffness: 200, damping: 18 });
  const calm = useReducedMotion();

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 40, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.94 }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className={`${spans[index % 4]} [perspective:1000px]`}
    >
      <motion.div
        style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}
        onPointerMove={(e) => {
          if (e.pointerType !== "mouse" || calm) return;
          const r = e.currentTarget.getBoundingClientRect();
          ry.set(((e.clientX - r.left) / r.width - 0.5) * 5);
          rx.set(-((e.clientY - r.top) / r.height - 0.5) * 4);
        }}
        onPointerLeave={() => {
          rx.set(0);
          ry.set(0);
        }}
        className="group relative flex h-full flex-col overflow-hidden rounded-[1.75rem] bg-white shadow-soft ring-1 ring-ink/5 transition-all duration-500 hover:shadow-lift hover:ring-2 hover:ring-electric/40"
      >
        <span aria-hidden className="absolute inset-x-0 top-0 z-10 h-1 origin-left scale-x-0 bg-gradient-to-r from-electric via-lav to-coral transition-transform duration-700 group-hover:scale-x-100" />
        <div className="overflow-hidden">
          <div className="relative transition-transform duration-700 group-hover:scale-[1.04]">
            <ProjectVisual project={project} className="aspect-[16/10]" />
          </div>
        </div>
        <span aria-hidden className="absolute left-4 top-4 z-10 rounded-full bg-white/90 px-2.5 py-1 font-mono text-[11px] font-semibold tracking-wider text-ink shadow-soft">
          {String(index + 1).padStart(2, "0")}
        </span>
        <span aria-hidden className="shine pointer-events-none absolute inset-x-0 top-0 z-[5] h-[55%]" />

        <div className="flex flex-1 flex-col p-6 sm:p-7">
          <div className="mb-3 flex flex-wrap items-center gap-2 font-mono text-[11px] uppercase tracking-wider">
            <span className="rounded-full bg-electric/10 px-2.5 py-1 text-electric">{categoryLabel(project.category)}</span>
            <span className="rounded-full bg-ink/5 px-2.5 py-1 text-ink-soft">{project.status}</span>
          </div>
          <h3 className="font-display text-2xl font-bold leading-tight tracking-tight sm:text-[1.7rem]">
            <Link
              href={`/projects/${project.slug}`}
              className="after:absolute after:inset-0 after:content-['']"
              aria-label={`View project: ${project.title}`}
            >
              {project.title}
            </Link>
          </h3>
          <p className="mt-2 text-base leading-snug text-ink-soft">{project.tagline}</p>
          <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-ink-soft/80">{project.summary}</p>

          <div className="mt-auto flex items-end justify-between gap-4 pt-6">
            <ul className="flex flex-wrap gap-1.5" aria-label="Technologies">
              {project.stack.slice(0, 3).map((t) => (
                <li key={t} className="rounded-full bg-ivory-deep px-2.5 py-1 text-xs font-medium text-ink-soft">
                  {t}
                </li>
              ))}
            </ul>
            <span className="inline-flex shrink-0 items-center gap-2 text-sm font-semibold">
              <span className="hidden sm:inline">View Project</span>
              <span className="grid h-9 w-9 place-items-center rounded-full bg-ink text-white transition-all duration-300 group-hover:rotate-45 group-hover:bg-electric">
                <ArrowUpRight className="h-4 w-4" />
              </span>
            </span>
          </div>
        </div>
      </motion.div>
    </motion.article>
  );
}

export function Projects() {
  const [filter, setFilter] = useState<CategoryId | "all">("all");
  const present = categories.filter((c) => projects.some((p) => p.category === c.id));
  const tabs = [{ id: "all" as const, label: "All" }, ...present];
  const shown = projects.filter((p) => filter === "all" || p.category === filter);

  return (
    <section id="projects" className="section-pad bg-projects layered relative">
      <div className="container-x">
        <div className="mb-12 flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            <Reveal>
              <p className="eyebrow mb-4">Selected work</p>
            </Reveal>
            <MaskText
              text="Built, wired & shipped."
              accent={["wired"]}
              className="max-w-3xl font-display text-[clamp(2.3rem,5vw,4.2rem)] font-bold leading-[1.03] tracking-[-0.03em]"
            />
          </div>
          <Reveal delay={0.15}>
            <div role="tablist" aria-label="Filter projects by category" className="flex flex-wrap gap-2">
              {tabs.map((t) => {
                const on = filter === t.id;
                return (
                  <button
                    key={t.id}
                    role="tab"
                    aria-selected={on}
                    onClick={() => setFilter(t.id)}
                    className={`zoom-hover relative rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                      on ? "text-white" : "bg-white/90 text-ink-soft ring-1 ring-ink/10 hover:text-ink"
                    }`}
                  >
                    {on && (
                      <motion.span
                        layoutId="filter-pill"
                        className="absolute inset-0 rounded-full bg-ink"
                        transition={{ type: "spring", stiffness: 420, damping: 34 }}
                      />
                    )}
                    <span className="relative">{t.label}</span>
                  </button>
                );
              })}
            </div>
          </Reveal>
        </div>

        <motion.div layout className="grid grid-cols-1 gap-6 md:grid-cols-12">
          <AnimatePresence mode="popLayout">
            {shown.map((p, i) => (
              <ProjectCard key={p.slug} project={p} index={i} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
