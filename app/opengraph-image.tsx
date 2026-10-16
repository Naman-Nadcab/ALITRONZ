import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#090C12",
          color: "#F4F6FA",
          padding: "64px",
        }}
      >
        <div style={{ fontSize: 22, letterSpacing: 4 }}>ALITROZ TECHNOLOGY</div>
        <div style={{ fontSize: 64, lineHeight: 1.05, maxWidth: 900, letterSpacing: -1.5 }}>
          We engineer intelligent products for ambitious businesses.
        </div>
        <div style={{ fontSize: 22, color: "#73E5F7" }}>AI · Software · Digital infrastructure</div>
      </div>
    ),
    size,
  );
}
