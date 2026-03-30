import { useState } from "react";

export default function LinkCard({ link, index }) {
  const [hovered, setHovered] = useState(false);

  return (
    <a
      href={link.href}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        display: "block",
        width: "100%",
        height: 160,
        borderRadius: 20,
        overflow: "hidden",
        textDecoration: "none",
        color: "white",
        border: "1px solid rgba(255,255,255,0.07)",
        transform: hovered ? "scale(1.015) translateY(-1px)" : "scale(1) translateY(0)",
        boxShadow: hovered ? "0 14px 44px rgba(0,0,0,0.65)" : "0 2px 12px rgba(0,0,0,0.3)",
        transition: "transform 0.3s cubic-bezier(0.16,1,0.3,1), box-shadow 0.3s",
        animation: `fadeUp 0.7s cubic-bezier(0.16,1,0.3,1) ${0.3 + index * 0.12}s both`,
      }}
    >
      {link.img ? (
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `url(${link.img})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: hovered ? "brightness(0.65)" : "brightness(0.5) grayscale(0.2)",
            transform: hovered ? "scale(1.05)" : "scale(1)",
            transition: "filter 0.35s, transform 0.4s",
          }}
        />
      ) : (
        <div style={{ position: "absolute", inset: 0, background: "rgba(255,255,255,0.025)" }} />
      )}

      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.45) 55%, rgba(0,0,0,0.05) 100%)" }} />

      <div style={{ position: "relative", zIndex: 1, padding: "18px 22px", height: "100%", display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
        <div style={{ fontFamily: "'Zen Kaku Gothic New',sans-serif", fontWeight: 700, fontSize: "1rem", letterSpacing: "0.05em", lineHeight: 1.2, marginBottom: 4 }}>
          {link.title}
        </div>
        <div style={{ fontSize: "0.68rem", color: "rgba(255,255,255,0.42)", letterSpacing: "0.04em" }}>
          {link.sub}
        </div>
      </div>
    </a>
  );
}