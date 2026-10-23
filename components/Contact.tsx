"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { ArrowUp, Mail, Phone } from "lucide-react";
import { useRef } from "react";
import { profile } from "@/lib/data";
import { Button } from "./Button";
import { MaskText, Reveal } from "./motion";
import { SocialIcon } from "./Icons";
import { HoverWords } from "./HoverWords";
import { Star } from "./Decor";

export function Contact() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] });
  const rot = useTransform(scrollYProgress, [0, 1], [-25, 25]);
  const y = useTransform(scrollYProgress, [0, 1], [60, -40]);

  const extra = [
    profile.linkedin && { id: "linkedin", label: "LinkedIn", href: profile.linkedin },
    profile.github && { id: "github", label: "GitHub", href: profile.github },
  ].filter(Boolean) as { id: string; label: string; href: string }[];

  return (
    <section id="contact" ref={ref} className="relative overflow-hidden px-5 pb-10 pt-24 sm:px-8 md:pt-32">
      <div aria-hidden className="absolute inset-x-0 top-0 -z-10 h-full bg-gradient-to-b from-transparent via-lav/25 to-sun/25" />
      <motion.div aria-hidden style={{ rotate: rot, y }} className="absolute -right-16 top-24 -z-10 h-56 w-56 rounded-[3rem] bg-gradient-to-br from-electric/80 to-lav/80 opacity-70 blur-[2px] sm:h-80 sm:w-80" />
      <motion.div aria-hidden style={{ y }} className="absolute -left-10 bottom-40 -z-10 h-40 w-40 rounded-full border-[18px] border-teal/50" />
      <Star className="right-[8%] top-[12%] hidden md:block" color="#FFA94D" size={26} />
      <Star className="right-[4%] bottom-[30%] hidden md:block" color="#FF6A57" delay={1.4} size={20} />

      <div className="container-x">
        <Reveal>
          <p className="eyebrow mb-5">Contact</p>
        </Reveal>
        <MaskText
          text="Have an idea? Let's build something meaningful."
          accent={["idea?", "meaningful."]}
          className="max-w-5xl font-display text-[clamp(2.8rem,8vw,7rem)] font-bold leading-[0.98] tracking-[-0.04em]"
        />
        <Reveal delay={0.2}>
          <HoverWords as="p" className="mt-7 max-w-2xl text-lg leading-relaxed text-ink-soft sm:text-xl" text="Looking for an engineering intern, a collaborator on an embedded or web project, or an editor who understands the tech? I'd like to hear about it." />
        </Reveal>

        <Reveal delay={0.3} className="mt-10 flex flex-wrap items-center gap-4">
          <Button href={`mailto:${profile.email}`} icon="none">
            <span className="inline-flex items-center gap-2">
              <Mail className="h-4 w-4" aria-hidden /> {profile.email}
            </span>
          </Button>
          <Button href={profile.resume} variant="ghost" download icon="download">
            Download Resume
          </Button>
        </Reveal>

        <Reveal delay={0.4} className="mt-12">
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <li>
              <a
                href={profile.phoneHref}
                className="zoom-hover group flex items-center gap-3 rounded-2xl bg-white/80 p-4 ring-1 ring-ink/10 transition-shadow hover:shadow-soft"
              >
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-teal/20 text-[#0d8577]">
                  <Phone className="h-5 w-5" aria-hidden />
                </span>
                <span>
                  <span className="block text-xs text-ink-soft">Phone</span>
                  <span className="font-semibold">{profile.phone}</span>
                </span>
              </a>
            </li>
            {profile.socials.map((s) => (
              <li key={s.id}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="zoom-hover group flex items-center gap-3 rounded-2xl bg-white/80 p-4 ring-1 ring-ink/10 transition-shadow hover:shadow-soft"
                >
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-coral/10 text-coral">
                    <SocialIcon id={s.id} />
                  </span>
                  <span>
                    <span className="block text-xs text-ink-soft">{s.label}</span>
                    <span className="font-semibold">{s.handle}</span>
                  </span>
                </a>
              </li>
            ))}
            {extra.map((s) => (
              <li key={s.id}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 rounded-2xl bg-white/80 p-4 font-semibold ring-1 ring-ink/10 transition-all hover:-translate-y-1 hover:shadow-soft"
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </Reveal>

        <footer className="mt-24 flex flex-col items-start justify-between gap-4 border-t border-ink/10 pt-8 text-sm text-ink-soft sm:flex-row sm:items-center">
          <p>
            © {new Date().getFullYear()} {profile.name} · {profile.location}
          </p>
          <a href="#home" className="inline-flex items-center gap-2 font-semibold text-ink hover:text-electric">
            Back to top <ArrowUp className="h-4 w-4" aria-hidden />
          </a>
        </footer>
      </div>
    </section>
  );
}
