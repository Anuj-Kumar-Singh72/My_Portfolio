import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ExternalLink } from "lucide-react";
import { categoryLabel, profile, projects } from "@/lib/data";
import { Gallery } from "@/components/Gallery";
import { CircuitVisual } from "@/components/CircuitVisual";
import { MaskText, Reveal } from "@/components/motion";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = projects.find((x) => x.slug === slug);
  if (!p) return {};
  return {
    title: `${p.title} — ${profile.name}`,
    description: p.summary,
    openGraph: { title: `${p.title} — ${profile.name}`, description: p.summary, images: p.images[0] ? [p.images[0].src] : undefined },
  };
}

function Card({ n, title, children }: { n: string; title: string; children: React.ReactNode }) {
  return (
    <Reveal>
      <section className="rounded-[1.75rem] bg-white p-6 shadow-soft ring-1 ring-ink/5 sm:p-8">
        <p className="mb-1 font-mono text-xs text-electric">{n}</p>
        <h2 className="mb-4 font-display text-xl font-bold tracking-tight sm:text-2xl">{title}</h2>
        {children}
      </section>
    </Reveal>
  );
}

function Flow({ flow }: { flow: NonNullable<(typeof projects)[number]["flow"]> }) {
  return (
    <Reveal>
      <section className="rounded-[1.75rem] bg-white p-6 shadow-soft ring-1 ring-ink/5 sm:p-8">
        <h2 className="mb-6 font-display text-xl font-bold tracking-tight sm:text-2xl">{flow.title}</h2>
        <ol className="grid gap-4 sm:grid-cols-4">
          {flow.steps.map((st, n) => (
            <li key={st.label} className="relative rounded-2xl bg-gradient-to-br from-ivory-deep/70 to-white p-4 ring-1 ring-ink/10">
              <span aria-hidden className="mb-3 grid h-7 w-7 place-items-center rounded-full bg-ink font-mono text-xs font-semibold text-white">
                {n + 1}
              </span>
              <p className="font-display text-lg font-bold leading-tight tracking-tight">{st.label}</p>
              <p className="mt-1 text-sm leading-snug text-ink-soft">{st.note}</p>
              {n < flow.steps.length - 1 && (
                <span aria-hidden className="absolute -bottom-3 left-1/2 z-10 -translate-x-1/2 text-electric sm:-right-3.5 sm:bottom-auto sm:left-auto sm:top-1/2 sm:-translate-y-1/2 sm:translate-x-0">
                  <ArrowRight className="h-4 w-4 rotate-90 sm:rotate-0" />
                </span>
              )}
            </li>
          ))}
        </ol>
      </section>
    </Reveal>
  );
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const i = projects.findIndex((x) => x.slug === slug);
  if (i === -1) notFound();
  const p = projects[i];
  const next = projects[(i + 1) % projects.length];

  return (
    <main className="bg-case px-5 pb-24 pt-8 sm:px-8">
      <div className="container-x">
        <Link
          href="/#projects"
          className="zoom-hover mb-10 inline-flex items-center gap-2 rounded-full bg-white/90 px-4 py-2 text-sm font-semibold ring-1 ring-ink/10 hover:shadow-soft"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden /> All projects
        </Link>

        <header className="grid items-end gap-8 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <div className="mb-5 flex flex-wrap gap-2 font-mono text-[11px] uppercase tracking-wider">
              <span className="rounded-full bg-electric/10 px-3 py-1 text-electric">{categoryLabel(p.category)}</span>
              <span className="rounded-full bg-ink/5 px-3 py-1 text-ink-soft">{p.status}</span>
            </div>
            <MaskText
              as="h1"
              onLoad
              text={p.title}
              className="font-display text-[clamp(2.4rem,6vw,5rem)] font-bold leading-[1.02] tracking-[-0.035em]"
            />
            <p className="mt-5 max-w-2xl text-xl leading-snug text-ink-soft">{p.tagline}</p>
          </div>
          <dl className="grid grid-cols-3 gap-3 lg:col-span-4">
            {p.facts.map((f) => (
              <div key={f.label} className="zoom-hover rounded-2xl bg-white/90 p-4 ring-1 ring-ink/5 shadow-soft">
                <dt className="font-mono text-[10px] uppercase tracking-widest text-ink-soft">{f.label}</dt>
                <dd className="mt-1 text-sm font-semibold leading-tight">{f.value}</dd>
              </div>
            ))}
          </dl>
        </header>

        <Reveal className="mt-10">
          <Gallery project={p} />
        </Reveal>

        <div className="mt-10 grid gap-6 lg:grid-cols-12">
          <div className="space-y-6 lg:col-span-8">
            <Card n="01" title="The problem">
              <p className="text-lg leading-relaxed text-ink-soft">{p.problem}</p>
            </Card>

            {p.flow && <Flow flow={p.flow} />}

            {p.slug === "biometric-door-locking-system" && (
              <Reveal>
                <CircuitVisual />
              </Reveal>
            )}

            <Card n="02" title="What I built">
              <ul className="space-y-3">
                {p.contribution.map((c) => (
                  <li key={c} className="flex gap-3 text-base leading-relaxed text-ink-soft sm:text-lg">
                    <span aria-hidden className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-coral" />
                    {c}
                  </li>
                ))}
              </ul>
            </Card>

            {p.specs && (
              <Card n="03" title={p.specs.title}>
                <dl className="divide-y divide-ink/10 overflow-hidden rounded-2xl ring-1 ring-ink/10">
                  {p.specs.rows.map(([k, v]) => (
                    <div key={k} className="grid grid-cols-3 gap-4 bg-white px-4 py-3 odd:bg-ivory-deep/50 sm:grid-cols-4">
                      <dt className="font-mono text-sm font-semibold text-electric">{k}</dt>
                      <dd className="col-span-2 text-sm text-ink-soft sm:col-span-3 sm:text-base">{v}</dd>
                    </div>
                  ))}
                </dl>
              </Card>
            )}

            <Card n={p.specs ? "04" : "03"} title="Outcome">
              <p className="text-lg leading-relaxed text-ink-soft">{p.outcome}</p>
            </Card>
          </div>

          <aside className="lg:col-span-4">
            <div className="rounded-[1.75rem] bg-ink p-7 text-white lg:sticky lg:top-8">
              <h2 className="mb-4 font-mono text-xs uppercase tracking-widest text-white/60">Built with</h2>
              <ul className="flex flex-wrap gap-2">
                {p.stack.map((t) => (
                  <li key={t} className="zoom-hover rounded-full bg-white/10 px-3 py-1.5 text-sm ring-1 ring-white/15">
                    {t}
                  </li>
                ))}
              </ul>

              <h2 className="mb-3 mt-8 font-mono text-xs uppercase tracking-widest text-white/60">Key features</h2>
              <ul className="space-y-2 text-sm text-white/85">
                {p.features.map((f) => (
                  <li key={f} className="flex gap-2">
                    <span aria-hidden className="text-teal">✓</span> {f}
                  </li>
                ))}
              </ul>

              <h2 className="mb-3 mt-8 font-mono text-xs uppercase tracking-widest text-white/60">Links</h2>
              <div className="flex flex-col gap-2">
                {p.links.github && (
                  <a href={p.links.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 font-semibold text-ink">
                    <ExternalLink className="h-4 w-4" aria-hidden /> Source on GitHub
                  </a>
                )}
                {p.links.demo && (
                  <a href={p.links.demo} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 font-semibold text-ink">
                    <ExternalLink className="h-4 w-4" aria-hidden /> Live demo
                  </a>
                )}
                {!p.links.github && !p.links.demo && (
                  <p className="rounded-xl border border-dashed border-white/30 px-4 py-3 text-sm text-white/70">No public repository or demo link yet.</p>
                )}
              </div>
            </div>
          </aside>
        </div>

        <Link
          href={`/projects/${next.slug}`}
          className="group mt-16 flex items-center justify-between rounded-[2rem] bg-gradient-to-r from-lav/50 via-white to-teal/30 p-8 ring-1 ring-ink/5 transition-shadow hover:shadow-lift sm:p-12"
        >
          <span>
            <span className="block font-mono text-xs uppercase tracking-widest text-ink-soft">Next project</span>
            <span className="mt-2 block font-display text-2xl font-bold tracking-tight sm:text-4xl">{next.title}</span>
          </span>
          <ArrowRight className="h-8 w-8 transition-transform group-hover:translate-x-2" aria-hidden />
        </Link>
      </div>
    </main>
  );
}
