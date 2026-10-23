"use client";

import { Award, GraduationCap } from "lucide-react";
import { certifications, education } from "@/lib/data";
import { MaskText, Reveal } from "./motion";
import { HoverWords } from "./HoverWords";

export function Education() {
  return (
    <section id="education" className="section-pad bg-edu layered relative">
      <div className="container-x">
        <Reveal>
          <p className="eyebrow mb-4">Education</p>
        </Reveal>
        <MaskText
          text="Where the foundations come from."
          accent={["foundations"]}
          className="mb-14 max-w-3xl font-display text-[clamp(2.4rem,5.2vw,4.4rem)] font-bold leading-[1.02] tracking-[-0.03em]"
        />

        <Reveal>
          <article className="relative overflow-hidden rounded-[2rem] bg-ink p-8 text-white shadow-lift sm:p-12">
            <div aria-hidden className="absolute -right-20 -top-24 h-72 w-72 rounded-full bg-electric/60 blur-3xl" />
            <div aria-hidden className="absolute -bottom-24 left-1/3 h-64 w-64 rounded-full bg-coral/40 blur-3xl" />
            <div className="relative grid gap-10 lg:grid-cols-12">
              <div className="lg:col-span-7">
                <span className="mb-6 grid h-14 w-14 place-items-center rounded-2xl bg-white/10 ring-1 ring-white/20">
                  <GraduationCap className="h-7 w-7" aria-hidden />
                </span>
                <HoverWords as="h3" text={education.degree} className="font-display text-3xl font-bold leading-tight tracking-tight sm:text-4xl" />
                <HoverWords as="p" text={education.college} className="mt-3 text-lg text-white/80" />
                <p className="mt-5 inline-block rounded-full bg-white px-4 py-1.5 font-mono text-xs font-semibold text-ink">
                  {education.period}
                </p>
              </div>

              <div className="space-y-6 lg:col-span-5">
                <div>
                  <p className="mb-3 font-mono text-[11px] uppercase tracking-widest text-white/60">Core E&amp;TC</p>
                  <ul className="flex flex-wrap gap-2">
                    {education.etc.map((t) => (
                      <li key={t} className="zoom-hover rounded-full bg-white/10 px-3 py-1.5 text-sm ring-1 ring-white/15">
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="mb-3 font-mono text-[11px] uppercase tracking-widest text-white/60">CS knowledge</p>
                  <ul className="flex flex-wrap gap-2">
                    {education.knowledge.map((t) => (
                      <li key={t} className="zoom-hover rounded-full bg-white/10 px-3 py-1.5 text-sm ring-1 ring-white/15">
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </article>
        </Reveal>

        {certifications.length > 0 && (
          <div className="mt-10">
            <h3 className="mb-5 font-display text-2xl font-bold tracking-tight">Certifications</h3>
            <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {certifications.map((c) => (
                <li key={c.title} className="flex items-start gap-4 rounded-2xl bg-white p-5 shadow-soft ring-1 ring-ink/5">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-sun/25 text-[#b35f00]">
                    <Award className="h-5 w-5" aria-hidden />
                  </span>
                  <div>
                    <p className="font-semibold">{c.title}</p>
                    <p className="text-sm text-ink-soft">
                      {c.issuer}
                      {c.year ? ` · ${c.year}` : ""}
                    </p>
                    {c.href && (
                      <a href={c.href} target="_blank" rel="noopener noreferrer" className="mt-1 inline-block text-sm font-semibold text-electric underline-offset-4 hover:underline">
                        Verify credential
                      </a>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}
