"use client";

import { AnimatePresence, motion } from "motion/react";
import { Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { navLinks, profile } from "@/lib/data";

export function Nav() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);
  const shown = useRef(false);

  // The bar tucks away while reading downwards (so it can never sit on top of a
  // section heading) and returns as soon as the visitor scrolls up or nears the top.
  useEffect(() => {
    lastY.current = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      const dy = y - lastY.current;
      if (y < 120) setHidden(false);
      else if (dy > 6) setHidden(true);
      else if (dy < -6) setHidden(false);
      if (Math.abs(dy) > 6) lastY.current = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const els = navLinks
      .map((l) => document.getElementById(l.id))
      .filter((e): e is HTMLElement => !!e);
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: hidden && !open ? -110 : 0, opacity: 1 }}
        onAnimationComplete={() => (shown.current = true)}
        transition={{ duration: shown.current ? 0.45 : 0.8, ease: [0.22, 1, 0.36, 1], delay: shown.current ? 0 : 0.2 }}
        onFocusCapture={() => setHidden(false)}
        className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4"
      >
        <nav
          aria-label="Primary"
          className={`flex w-full max-w-5xl items-center justify-between rounded-full px-3 py-2 pl-5 transition-all duration-500 ${
            scrolled ? "glass shadow-soft bg-white/80" : "bg-transparent"
          }`}
        >
          <a href="#home" className="flex items-center gap-2 font-display text-lg font-bold tracking-tight" data-cursor>
            <span className="grid h-8 w-8 place-items-center rounded-full bg-ink text-[11px] font-bold text-white">AKS</span>
            <span className="hidden sm:inline">{profile.firstName}</span>
          </a>

          <ul className="hidden items-center gap-1 md:flex">
            {navLinks.map((l) => (
              <li key={l.id}>
                <a
                  href={`#${l.id}`}
                  className="zoom-hover group relative block px-3.5 py-2 text-sm font-medium text-ink-soft transition-colors hover:text-ink"
                >
                  <span className={active === l.id ? "text-ink" : ""}>{l.label}</span>
                  <span
                    aria-hidden
                    className="absolute inset-x-3.5 bottom-1 h-[2px] origin-left scale-x-0 rounded bg-electric/50 transition-transform duration-300 group-hover:scale-x-100"
                  />
                  {active === l.id && (
                    <motion.span
                      layoutId="nav-active"
                      aria-hidden
                      className="absolute inset-x-3.5 bottom-1 h-[2px] rounded bg-electric"
                      transition={{ type: "spring", stiffness: 420, damping: 34 }}
                    />
                  )}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <a
              href={profile.resume}
              download
              className="hidden rounded-full bg-ink px-4 py-2 text-sm font-semibold text-white transition-transform hover:scale-[1.04] sm:inline-block"
            >
              Resume
            </a>
            <button
              type="button"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen((o) => !o)}
              className="grid h-11 w-11 place-items-center rounded-full bg-white/80 ring-1 ring-ink/10 md:hidden"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-label="Menu"
            initial={{ clipPath: "circle(0% at 92% 4%)" }}
            animate={{ clipPath: "circle(150% at 92% 4%)" }}
            exit={{ clipPath: "circle(0% at 92% 4%)" }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-40 flex flex-col justify-center bg-ivory px-8 md:hidden"
          >
            <div aria-hidden className="absolute -right-24 top-24 h-72 w-72 rounded-full bg-lav/50 blur-3xl" />
            <div aria-hidden className="absolute -left-20 bottom-20 h-64 w-64 rounded-full bg-teal/25 blur-3xl" />
            <ul className="relative space-y-2">
              {navLinks.map((l, i) => (
                <li key={l.id} className="overflow-hidden">
                  <motion.a
                    href={`#${l.id}`}
                    onClick={() => setOpen(false)}
                    initial={{ y: "110%" }}
                    animate={{ y: 0 }}
                    transition={{ delay: 0.25 + i * 0.06, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="block font-display text-5xl font-bold tracking-tight"
                  >
                    {l.label}
                  </motion.a>
                </li>
              ))}
            </ul>
            <a
              href={profile.resume}
              download
              className="relative mt-10 inline-block w-fit rounded-full bg-ink px-6 py-3 font-semibold text-white"
            >
              Download Resume
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
