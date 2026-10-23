import { ImageResponse } from "next/og";

export const dynamic = "force-static";
export const alt = "Anuj Kumar Singh — portfolio";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "linear-gradient(135deg, #FBF8F1 0%, #E6DEFF 55%, #CFF3EE 100%)",
          color: "#14142B",
        }}
      >
        <div style={{ display: "flex", fontSize: 28, letterSpacing: 6, color: "#2B59FF" }}>E&amp;TC ENGINEER · DEVELOPER · EDITOR</div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 112, fontWeight: 800, lineHeight: 1.02, letterSpacing: -3 }}>Anuj Kumar Singh</div>
          <div style={{ fontSize: 44, marginTop: 20, color: "#4B4B66" }}>Circuits, code &amp; compelling stories.</div>
        </div>
        <div style={{ display: "flex", gap: 14 }}>
          {["Arduino", "KiCad", "Next.js", "Python", "DaVinci Resolve"].map((t) => (
            <div key={t} style={{ display: "flex", padding: "10px 22px", borderRadius: 999, background: "#fff", fontSize: 26 }}>
              {t}
            </div>
          ))}
        </div>
      </div>
    ),
    size
  );
}
