"use client";

import type { ElementType } from "react";

/**
 * Splits text into words; each word gently zooms (and tints) when the pointer is over it.
 * Pure CSS on hover-capable devices only, so touch screens are unaffected.
 */
export function HoverWords({
  text,
  as: Tag = "span",
  className = "",
}: {
  text: string;
  as?: ElementType;
  className?: string;
}) {
  return (
    <Tag className={className}>
      {text.split(" ").map((w, i, arr) => (
        <span key={i}>
          <span className="word-zoom">{w}</span>
          {i < arr.length - 1 ? " " : ""}
        </span>
      ))}
    </Tag>
  );
}
