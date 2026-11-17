import { ImageResponse } from "next/og";
import { profile, stats } from "./data";

// Preview image shown when the link is shared on LinkedIn, WhatsApp, Slack, etc.
export const alt = "Joshua Ortiz · Full-Stack Developer, Automation & AI";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  const highlight = stats[0];
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "#0e1012",
          color: "#f2f3f4",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 28, color: "#ff4f00", letterSpacing: 2 }}>
          FULL-STACK DEVELOPER · AUTOMATION & AI
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 96, fontWeight: 700, letterSpacing: -3 }}>{profile.name}</div>
          <div style={{ display: "flex", fontSize: 34, color: "#a8afb7", marginTop: 16, maxWidth: 980 }}>
            Python bots for portals with no API, document pipelines, and Next.js + Oracle web apps.
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "baseline", gap: 20 }}>
          <div style={{ display: "flex", fontSize: 64, fontWeight: 700, color: "#ff4f00" }}>{highlight.value}</div>
          <div style={{ display: "flex", fontSize: 30, color: "#a8afb7" }}>{highlight.label}</div>
          <div style={{ display: "flex", marginLeft: "auto", fontSize: 28, color: "#a8afb7" }}>{profile.location}</div>
        </div>
      </div>
    ),
    size,
  );
}
