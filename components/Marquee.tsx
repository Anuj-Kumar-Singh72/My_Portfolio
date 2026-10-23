import { marqueeItems } from "@/lib/data";

export function Marquee() {
  const row = [...marqueeItems, ...marqueeItems];
  return (
    <div
      className="marquee relative overflow-hidden border-y border-ink/10 bg-ink py-4 text-white"
      role="group"
      aria-label="Technologies and tools I work with"
    >
      <div className="marquee-track flex items-center gap-10 whitespace-nowrap">
        {row.map((item, i) => (
          <span
            key={i}
            aria-hidden={i >= marqueeItems.length}
            className="flex items-center gap-10 font-display text-2xl font-semibold tracking-tight sm:text-3xl"
          >
            {item}
            <span aria-hidden className={`h-2.5 w-2.5 rotate-45 ${["bg-electric", "bg-coral", "bg-teal", "bg-sun", "bg-lav"][i % 5]}`} />
          </span>
        ))}
      </div>
    </div>
  );
}
