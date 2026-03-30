import { useState, useEffect } from "react";
import { CONFIG } from "../config/bioConfig";

import Starfield from "../components/Starfield";
import MusicPlayer from "../components/MusicPlayer";
import LinkCard from "../components/LinkCard";
import SocialBtn from "../components/SocialBtn";
import backgroundVideo from "../assets/background/background.mp4";

// Typing effect
function TypingName({ name }) {
  const [displayed, setDisplayed] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const speed = isDeleting ? 200 : 200;
    const pause = 3000;

    if (!isDeleting && index === name.length) {
      const timeout = setTimeout(() => setIsDeleting(true), pause);
      return () => clearTimeout(timeout);
    }

    if (isDeleting && index === 0) {
      const timeout = setTimeout(() => setIsDeleting(false), 200);
      return () => clearTimeout(timeout);
    }

    const timeout = setTimeout(() => {
      if (isDeleting) {
        setDisplayed(name.slice(0, index - 1));
        setIndex(index - 1);
      } else {
        setDisplayed(name.slice(0, index + 1));
        setIndex(index + 1);
      }
    }, speed);

    return () => clearTimeout(timeout);
  }, [index, isDeleting, name]);

  return (
    <span style={{ position: "relative", display: "inline-grid" }}>
      {/* occupies the grid but remains invisible, preventing the text from moving */}
      <span
        style={{
          opacity: 0,
          pointerEvents: "none",
          whiteSpace: "nowrap",
          gridArea: "1 / 1",
        }}
      >
        {name}
      </span>

      {/* glow effect */}
      <span
        style={{
          gridArea: "1 / 1",
          display: "inline-flex",
          alignItems: "center",
          filter:
            "drop-shadow(0 0 8px rgb(235, 84, 84)) drop-shadow(0 0 20px #d83232) drop-shadow(0 0 40px #eb1313)",
          color: "#ffffff",
          letterSpacing: "0.02em",
          whiteSpace: "nowrap",
        }}
      >
        {displayed}
        {/* cursor */}
        <span
          style={{
            display: "inline-block",
            width: "3px",
            height: "0.85em",
            backgroundColor: "rgb(201, 90, 90)",
            marginLeft: "3px",
            verticalAlign: "middle",
            flexShrink: 0,
            boxShadow: "0 0 8px rgb(235, 84, 84), 0 0 16px #eb1313",
            animation: "blink 0.7s step-end infinite",
          }}
        />
      </span>
    </span>
  );
}

export default function Home() {
  return (
    <div
      style={{
        Height:"100vh",
        background: "#0e0e12",
        color: "#e8e8e8",
        fontFamily: "'Noto Sans JP', sans-serif",
        overflowX: "hidden",
        position: "relative",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Reggae+One&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }

        @keyframes fadeUp { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
        @keyframes fadeDown { from{opacity:0;transform:translateY(-14px)} to{opacity:1;transform:translateY(0)} }
        @keyframes rotateSlow { to{transform:rotate(360deg)} }
        @keyframes arrowBob { 0%,100%{transform:translateY(0);opacity:.4} 50%{transform:translateY(6px);opacity:.65} }
        @keyframes ringPulse { 0%,100%{opacity:.18} 50%{opacity:.32} }
        @keyframes blink { 50% { opacity: 0; } }
      `}</style>

      {/* Background. use img for images*/}
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 0,
          pointerEvents: "none",
          objectPosition: "center"
        }}
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            opacity: 0.45,
          }}
        >
          <source src={backgroundVideo} type="video/mp4" />
        </video>

        {/* Overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(180deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.85) 100%)",
          }}
        />
      </div>

      <Starfield />

      {/* content */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "80px 20px 120px",
        }}
      >
        {/* Avatar */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            animation: "fadeDown 0.9s ease both",
          }}
        >
          <div
            style={{
              position: "relative",
              width: 134,
              height: 134,
              marginBottom: 5,
            }}
          >
            <div
              style={{
                width: 134,
                height: 134,
                borderRadius: "50%",
                border: "2px solid rgba(255,255,255,0.2)",
                background: "#1a1a22",
                overflow: "hidden",
              }}
            >
              <img
                src={CONFIG.avatar}
                alt="avatar"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
          </div>
        </div>

        {/* Name */}
        <div
          style={{
            marginTop: 10,
            marginBottom: 5,
            fontFamily: "'Reggae One', sans-serif",
            fontSize: "3rem",
            fontWeight: 700,
            textAlign: "center",
            animation: "fadeUp 1s cubic-bezier(0.16,1,0.3,1) 0.3s both",
            whiteSpace: "nowrap",
          }}
        >
          <TypingName name={CONFIG.name} />
        </div>

        {/* Bio */}
        <div
          style={{
            textAlign: "center",
            margin: "0 0 15px",
            animation: "fadeUp 0.9s ease 0.2s both",
          }}
        >
          <div
            style={{
              fontFamily: "'Reggae One', sans-serif",
              fontSize: "1rem",
              fontWeight: 400,
              letterSpacing: "0.15em",
              color: "#ddd",
            }}
          >
            {CONFIG.bio}
          </div>
        </div>

        {/* Social Buttons */}
        <div
          style={{
            display: "flex",
            gap: 12,
            marginBottom: 20,
            flexWrap: "wrap",
            justifyContent: "center",
            animation: "fadeUp 0.9s ease 0.4s both",
          }}
        >
          {CONFIG.socials.map((s) => (
            <SocialBtn key={s.id} social={s} />
          ))}
        </div>

        {/* Links */}
        <div
          style={{
            width: "100%",
            maxWidth: 420,
            display: "flex",
            flexDirection: "column",
            gap: 16,
          }}
        >
          {CONFIG.links.map((link, i) => (
            <LinkCard key={i} link={link} index={i} />
          ))}
        </div>
      </div>

      <MusicPlayer />
    </div>
  );
}
