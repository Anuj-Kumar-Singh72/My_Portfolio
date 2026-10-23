"use client";

import { ArrowUpRight, Download } from "lucide-react";
import type { ReactNode } from "react";
import { Magnetic } from "./motion";

type Props = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "ghost";
  download?: boolean;
  external?: boolean;
  icon?: "arrow" | "download" | "none";
};

export function Button({ href, children, variant = "primary", download, external, icon = "arrow" }: Props) {
  const base =
    "zoom-hover group relative inline-flex items-center gap-2 overflow-hidden rounded-full px-6 py-3.5 text-sm font-semibold transition-shadow duration-300 sm:text-base";
  const styles =
    variant === "primary"
      ? "bg-ink text-white shadow-soft hover:shadow-lift"
      : "bg-white/70 text-ink ring-1 ring-ink/15 hover:ring-electric/60 hover:shadow-soft";
  return (
    <Magnetic>
      <a
        href={href}
        className={`${base} ${styles}`}
        {...(download ? { download: true } : {})}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        data-cursor
      >
        {variant === "primary" && (
          <span
            aria-hidden
            className="absolute inset-0 -z-0 translate-y-full bg-gradient-to-r from-electric via-[#8f6bff] to-coral transition-transform duration-500 ease-out group-hover:translate-y-0"
          />
        )}
        <span className="relative z-10">{children}</span>
        {icon === "arrow" && (
          <ArrowUpRight className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        )}
        {icon === "download" && (
          <Download className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5" />
        )}
      </a>
    </Magnetic>
  );
}
