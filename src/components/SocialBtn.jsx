import { useState } from "react";
import { SOCIAL_ICON } from "./Icons";

export default function SocialBtn({ social }) {
  const [hovered, setHovered] = useState(false);
  const Icon = SOCIAL_ICON[social.id];

  return (
    <a
      href={social.href}
      title={social.label}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: 40,
        height: 40,
        borderRadius: "40%",
        background: hovered ? "rgba(255,255,255,0.13)" : "rgba(255,255,255,0.06)",
        border: `1px solid ${hovered ? "rgba(255,255,255,0.18)" : "rgba(255,255,255,0.08)"}`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textDecoration: "none",
        color: "white",
        transform: hovered ? "translateY(-2px)" : "translateY(0)",
        boxShadow: hovered ? "0 6px 20px rgba(0,0,0,0.4)" : "none",
        transition: "all 0.2s ease",
        backdropFilter: "blur(8px)",
        flexShrink: 0,
      }}
    >
      {Icon && <Icon />}
    </a>
  );
}