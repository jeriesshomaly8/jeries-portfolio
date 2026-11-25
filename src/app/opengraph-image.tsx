import { ImageResponse } from "next/og";
import { identity } from "@/content/profile";

export const alt = `${identity.name} — ${identity.title}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 80,
          backgroundColor: "#faf8f3",
          backgroundImage:
            "linear-gradient(rgba(207,200,184,0.45) 1px, transparent 1px), linear-gradient(90deg, rgba(207,200,184,0.45) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          fontFamily: "monospace",
        }}
      >
        <div style={{ display: "flex", fontSize: 28, color: "#0e7a52", marginBottom: 32 }}>
          ~/jeries $ whoami
        </div>
        <div style={{ display: "flex", fontSize: 76, fontWeight: 700, color: "#1d1f21" }}>
          {identity.name}
        </div>
        <div style={{ display: "flex", fontSize: 40, color: "#0e7a52", marginTop: 12 }}>
          {identity.title}
        </div>
        <div style={{ display: "flex", fontSize: 26, color: "#555a60", marginTop: 28 }}>
          {identity.subtitle}
        </div>
      </div>
    ),
    size
  );
}
