import { ImageResponse } from "next/og";

export const alt = "Boobesh AG, content marketer in Chennai, founder of Gari Tech";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/* The card shown when the site is shared on LinkedIn, X, WhatsApp or Slack. */
export default function Image() {
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
          background:
            "linear-gradient(135deg, #14110d 0%, #1d2a4a 55%, #c0563a 130%)",
          color: "#f5f1e8",
        }}
      >
        <div style={{ display: "flex", fontSize: 30, letterSpacing: 6, color: "#ffd9a8" }}>
          BOOBESH.COM
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 104, fontWeight: 700, lineHeight: 1.02 }}>
            Boobesh AG
          </div>
          <div style={{ marginTop: 20, fontSize: 40, color: "#e9dfcb", lineHeight: 1.25 }}>
            Content marketer in Chennai. Founder of Gari Tech.
          </div>
        </div>
        <div style={{ display: "flex", fontSize: 28, color: "#ffd9a8" }}>
          linkedin.com/in/boobesh2912
        </div>
      </div>
    ),
    size
  );
}
