"use client";

import { AnimatePresence, motion } from "motion/react";
import { Maximize2, X } from "lucide-react";
import { useEffect, useState } from "react";
import type { Project } from "@/lib/data";
import { ProjectVisual } from "./ProjectVisual";

/** Case-study gallery: large framed view + thumbnails, click to open full-size. */
export function Gallery({ project }: { project: Project }) {
  const [i, setI] = useState(0);
  const [open, setOpen] = useState(false);
  const imgs = project.images;
  const multi = project.media === "browser" && imgs.length > 1;

  useEffect(() => {
    if (!open) return;
    const k = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", k);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", k);
      document.body.style.overflow = "";
    };
  }, [open]);

  const aspect = project.media === "pcb" ? "aspect-[23/10]" : project.media === "photo" ? "aspect-[16/9]" : "aspect-[16/10]";

  return (
    <div>
      <div className="relative overflow-hidden rounded-[2rem] shadow-lift ring-1 ring-ink/5">
        <AnimatePresence mode="wait">
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
          >
            <ProjectVisual project={project} index={i} className={aspect} />
          </motion.div>
        </AnimatePresence>
        {imgs.length > 0 && (
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label="View image full size"
            className="absolute right-4 top-4 z-10 grid h-10 w-10 place-items-center rounded-full bg-white/90 shadow-soft transition-transform hover:scale-110"
          >
            <Maximize2 className="h-4 w-4" />
          </button>
        )}
      </div>

      {multi && (
        <ul className="mt-4 grid gap-3" style={{ gridTemplateColumns: `repeat(${Math.min(imgs.length, 3)}, minmax(0, 1fr))` }}>
          {imgs.map((im, n) => (
            <li key={im.src}>
              <button
                type="button"
                onClick={() => setI(n)}
                aria-label={im.caption}
                aria-pressed={i === n}
                className={`zoom-hover group block w-full overflow-hidden rounded-xl bg-white text-left ring-2 transition-all ${
                  i === n ? "ring-electric shadow-soft" : "ring-transparent opacity-75 hover:opacity-100"
                }`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={im.src} alt="" loading="lazy" className="aspect-[16/10] w-full object-cover object-top" />
                <span className="block px-2.5 py-2 text-xs font-medium leading-tight text-ink-soft">{im.caption}</span>
              </button>
            </li>
          ))}
        </ul>
      )}

      {!multi && imgs.length > 0 && (
        <ul className="mt-3 flex flex-wrap gap-x-6 gap-y-1 font-mono text-xs text-ink-soft">
          {imgs.map((im) => (
            <li key={im.src}>{im.caption}</li>
          ))}
        </ul>
      )}

      <AnimatePresence>
        {open && imgs.length > 0 && (
          <motion.div
            role="dialog"
            aria-label="Image viewer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-[120] flex items-center justify-center gap-4 bg-ink/85 p-4 backdrop-blur-sm"
          >
            <button
              type="button"
              aria-label="Close"
              className="absolute right-5 top-5 grid h-11 w-11 place-items-center rounded-full bg-white text-ink"
              onClick={() => setOpen(false)}
            >
              <X className="h-5 w-5" />
            </button>
            <div className={`flex max-h-[88vh] w-full max-w-6xl ${project.media === "pcb" ? "flex-col gap-3 sm:flex-row" : ""} items-center justify-center`} onClick={(e) => e.stopPropagation()}>
              {(project.media === "pcb" ? imgs : [imgs[i]]).map((im) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img key={im.src} src={im.src} alt={im.alt} className="max-h-[80vh] min-w-0 flex-1 rounded-xl object-contain shadow-lift" />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
