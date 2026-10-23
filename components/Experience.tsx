"use client";

import { motion, useScroll, useSpring } from "motion/react";
import { useRef } from "react";
import { ArrowUpRight, Play } from "lucide-react";
import { experience, profile, stats } from "@/lib/data";
import { SocialIcon } from "./Icons";
import { Counter, MaskText, Reveal } from "./motion";
import { HoverWords } from "./HoverWords";

export function ExperienceSection() {
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 70%", "end 60%"] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  return (
    <section id="experience" className="section-pad bg-exp layered relative">
      <div className="container-x">
        <Reveal>
          <p className="eyebrow mb-4">Experience</p>
        </Reveal>
        <MaskText
          text="Hands-on, on camera & off."
          accent={["camera"]}
          className="mb-14 max-w-3xl font-display text-[clamp(2.4rem,5.2vw,4.4rem)] font-bold leading-[1.02] tracking-[-0.03em]"
        />

        <ol ref={ref} className="relative space-y-10 pl-8 sm:pl-14">
          <span aria-hidden className="absolute bottom-0 left-[11px] top-2 w-[3px] rounded bg-ink/10 sm:left-[19px]" />
          <motion.span
            aria-hidden
            style={{ scaleY }}
            className="absolute bottom-0 left-[11px] top-2 w-[3px] origin-top rounded bg-gradient-to-b from-electric via-lav to-coral sm:left-[19px]"
          />

          {experience.map((e, i) => (
            <li key={e.org} className="relative">
              <span
                aria-hidden
                className="absolute -left-8 top-8 grid h-6 w-6 place-items-center rounded-full bg-ivory ring-4 ring-ivory sm:-left-14 sm:h-10 sm:w-10"
              >
                <span className={`h-3 w-3 rounded-full sm:h-4 sm:w-4 ${i === 0 ? "bg-coral" : "bg-electric"}`} />
              </span>

              <Reveal>
                <article className="relative overflow-hidden rounded-[2rem] bg-white p-7 shadow-soft ring-1 ring-ink/5 sm:p-10">
                  <div
                    aria-hidden
                    className={`absolute -right-16 -top-16 h-48 w-48 rounded-full blur-3xl ${i === 0 ? "bg-coral/20" : "bg-electric/15"}`}
                  />
                  <div className="relative flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <p className="font-mono text-xs uppercase tracking-widest text-electric">{e.org}</p>
                      <h3 className="mt-1 font-display text-2xl font-bold tracking-tight sm:text-3xl">{e.role}</h3>
                    </div>
                    <p className="rounded-full bg-ink px-4 py-1.5 font-mono text-xs text-white">
                      {e.period}
                      {e.duration ? ` · ${e.duration}` : ""}
                    </p>
                  </div>

                  <ul className="relative mt-6 space-y-3">
                    {e.bullets.map((b) => (
                      <li key={b} className="flex gap-3 text-base leading-relaxed text-ink-soft sm:text-lg">
                        <span aria-hidden className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-coral" />
                        <HoverWords text={b} />
                      </li>
                    ))}
                  </ul>

                  <div className="relative mt-7">
                    <p className="mb-2 font-mono text-[11px] uppercase tracking-widest text-ink-soft">{e.tagsLabel}</p>
                    <ul className="flex flex-wrap gap-2">
                      {e.tags.map((t) => (
                        <li key={t} className="zoom-hover rounded-full bg-ivory-deep px-3 py-1.5 text-sm font-medium">
                          {t}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {e.samples && e.samples.length > 0 && (
                    <div className="relative mt-8">
                      <p className="mb-3 font-mono text-[11px] uppercase tracking-widest text-ink-soft">Selected work</p>
                      <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                        {e.samples.map((v) => (
                          <li key={v.href}>
                            <a
                              href={v.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="group block overflow-hidden rounded-2xl bg-ivory-deep ring-1 ring-ink/10 transition-shadow hover:shadow-soft"
                            >
                              <span className="relative block aspect-video bg-gradient-to-br from-lav/50 to-teal/30">
                                {v.thumb && (
                                  // eslint-disable-next-line @next/next/no-img-element
                                  <img src={v.thumb} alt="" loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                                )}
                                <span className="absolute inset-0 grid place-items-center">
                                  <span className="grid h-12 w-12 place-items-center rounded-full bg-white/90 shadow-soft transition-transform group-hover:scale-110">
                                    <Play className="h-5 w-5 translate-x-0.5" aria-hidden />
                                  </span>
                                </span>
                              </span>
                              <span className="block px-3.5 py-3">
                                <span className="block text-sm font-semibold leading-tight">{v.title}</span>
                                {v.note && <span className="mt-0.5 block text-xs text-ink-soft">{v.note}</span>}
                              </span>
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {i === experience.length - 1 && (
                    <div className="relative mt-8">
                      <p className="mb-3 font-mono text-[11px] uppercase tracking-widest text-ink-soft">See the channels</p>
                      <ul className="flex flex-wrap gap-3">
                        {profile.socials.map((sc) => (
                          <li key={sc.id}>
                            <a
                              href={sc.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="group inline-flex min-h-11 items-center gap-2.5 rounded-full bg-white px-4 py-2 text-sm font-semibold ring-1 ring-ink/15 transition-all hover:-translate-y-0.5 hover:ring-electric/60 hover:shadow-soft"
                            >
                              <SocialIcon id={sc.id} />
                              {sc.label} <span className="font-normal text-ink-soft">{sc.handle}</span>
                              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {i === experience.length - 1 && (
                    <dl className="relative mt-9 grid grid-cols-2 gap-4 border-t border-ink/10 pt-8 lg:grid-cols-4">
                      {stats.map((s) => (
                        <div key={s.label}>
                          <dt className="order-2 text-sm text-ink-soft">{s.label}</dt>
                          <dd className="font-display text-3xl font-bold tracking-tight text-gradient sm:text-4xl">
                            <Counter value={s.value} decimals={s.decimals} suffix={s.suffix} />
                          </dd>
                        </div>
                      ))}
                    </dl>
                  )}
                </article>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
