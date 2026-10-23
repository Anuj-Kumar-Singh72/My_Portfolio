"use client";

import type { Project } from "@/lib/data";

/**
 * Presents each project's real images in a frame that fits its type:
 *  - browser: app screenshot inside a window frame
 *  - photo:   full-bleed hardware photo
 *  - pcb:     the two KiCad views side by side
 *  - none:    a labelled concept diagram (no screenshot supplied)
 */
const tint: Record<Project["category"], string> = {
  software: "from-[#dfe6ff] via-[#efe9ff] to-[#d6f5f0]",
  embedded: "from-[#e6dcff] via-[#f4efff] to-[#d6f5f0]",
  hardware: "from-[#ffe9d1] via-[#fff4e6] to-[#ffdcd5]",
  ai: "from-[#d6f5f0] via-[#eef4ff] to-[#e6dcff]",
};

export function ProjectVisual({ project, className = "", index = 0 }: { project: Project; className?: string; index?: number }) {
  const imgs = project.images;

  return (
    <div className={`relative isolate overflow-hidden bg-gradient-to-br ${tint[project.category]} ${className}`}>
      {project.media === "browser" && imgs[index] && (
        <div className="absolute inset-0 flex items-center justify-center p-4 sm:p-6">
          <div className="flex h-full max-h-full w-full flex-col overflow-hidden rounded-xl bg-white shadow-lift ring-1 ring-ink/10">
            <div className="flex shrink-0 items-center gap-1.5 border-b border-ink/10 bg-ivory-deep px-3 py-2">
              <span className="h-2 w-2 rounded-full bg-coral" />
              <span className="h-2 w-2 rounded-full bg-sun" />
              <span className="h-2 w-2 rounded-full bg-teal" />
              <span className="ml-3 hidden h-4 flex-1 rounded-full bg-ink/5 px-3 font-mono text-[9px] leading-4 text-ink-soft sm:block">{project.slug}</span>
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={imgs[index].src}
              alt={imgs[index].alt}
              loading="lazy"
              className={`min-h-0 w-full flex-1 object-top ${imgs[index].bg ? "object-contain" : "object-cover"}`}
              style={imgs[index].bg ? { backgroundColor: imgs[index].bg } : undefined}
            />
          </div>
        </div>
      )}

      {project.media === "photo" && imgs[0] && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={imgs[0].src} alt={imgs[0].alt} loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
      )}

      {project.media === "pcb" && (
        <div className="absolute inset-0 grid grid-cols-2 gap-3 p-4 sm:gap-4 sm:p-6">
          {imgs.map((im) => (
            <figure key={im.src} className="relative overflow-hidden rounded-xl shadow-lift ring-1 ring-ink/10">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={im.src} alt={im.alt} loading="lazy" className="h-full w-full object-cover" />
            </figure>
          ))}
        </div>
      )}

      {project.media === "none" && (
        <>
          <div aria-hidden className="blueprint absolute inset-0" />
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-6">
            <div className="flex items-center gap-2 font-mono text-[11px] text-ink sm:gap-3 sm:text-xs">
              {["Candidates", "Weighted scoring", "Allocation"].map((s, i) => (
                <div key={s} className="flex items-center gap-2 sm:gap-3">
                  {i > 0 && <span aria-hidden className="text-electric">→</span>}
                  <span className="rounded-xl bg-white px-3 py-2 shadow-soft ring-1 ring-ink/10">{s}</span>
                </div>
              ))}
            </div>
            <span className="rounded-full bg-white/80 px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-ink-soft ring-1 ring-ink/10">
              Concept diagram · no screenshot supplied
            </span>
          </div>
        </>
      )}
    </div>
  );
}
