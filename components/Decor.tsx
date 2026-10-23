/** Pure-CSS decorative pieces: a true 3D rotating cube, twinkling stars, and an outlined marquee band. */

export function Cube3D({ size = 84, className = "" }: { size?: number; className?: string }) {
  const h = size / 2;
  const faces = [
    { t: `rotateY(0deg) translateZ(${h}px)`, bg: "linear-gradient(135deg,#2B59FF,#8F6BFF)" },
    { t: `rotateY(90deg) translateZ(${h}px)`, bg: "linear-gradient(135deg,#22C3B0,#2B59FF)" },
    { t: `rotateY(180deg) translateZ(${h}px)`, bg: "linear-gradient(135deg,#FF6A57,#FFA94D)" },
    { t: `rotateY(-90deg) translateZ(${h}px)`, bg: "linear-gradient(135deg,#C8B6FF,#8F6BFF)" },
    { t: `rotateX(90deg) translateZ(${h}px)`, bg: "linear-gradient(135deg,#FFA94D,#FFD9A8)" },
    { t: `rotateX(-90deg) translateZ(${h}px)`, bg: "linear-gradient(135deg,#22C3B0,#C8F2EC)" },
  ];
  return (
    <div aria-hidden className={`pointer-events-none [perspective:700px] ${className}`} style={{ width: size, height: size }}>
      <div className="cube relative h-full w-full">
        {faces.map((f, i) => (
          <div key={i} className="cube-face opacity-90" style={{ transform: f.t, background: f.bg }} />
        ))}
      </div>
    </div>
  );
}

export function Star({ className = "", color = "#FF6A57", delay = 0, size = 22 }: { className?: string; color?: string; delay?: number; size?: number }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={`twinkle pointer-events-none absolute ${className}`}
      style={{ animationDelay: `${delay}s` }}
    >
      <path d="M12 0c.6 6.2 5.8 11.4 12 12-6.2.6-11.4 5.8-12 12-.6-6.2-5.8-11.4-12-12C6.2 11.4 11.4 6.2 12 0Z" fill={color} />
    </svg>
  );
}

export function OutlineMarquee() {
  const words = ["Build", "Wire", "Code", "Edit", "Ship", "Repeat"];
  const row = [...words, ...words, ...words, ...words];
  return (
    <div className="marquee relative overflow-hidden py-6" aria-hidden>
      <div className="marquee-track reverse flex items-center gap-8 whitespace-nowrap">
        {row.map((w, i) => (
          <span key={i} className="flex items-center gap-8">
            <span
              className={`font-display text-6xl font-extrabold uppercase tracking-tight sm:text-8xl ${i % 2 ? "text-gradient" : "outline-text"}`}
            >
              {w}
            </span>
            <span className="h-3 w-3 rotate-45 bg-coral" />
          </span>
        ))}
      </div>
    </div>
  );
}
