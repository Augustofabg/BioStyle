import { useState } from "react";
import { CONFIG } from "../config/bioConfig";

import Starfield from "../components/Starfield";
import MusicPlayer from "../components/MusicPlayer";
import LinkCard from "../components/LinkCard";
import SocialBtn from "../components/SocialBtn";
import { Icons } from "../components/Icons";
import backgroundVideo from "../assets/background/background.mp4";

export default function Home() {
  const [views] = useState(1);

  return (    
    <div
      style={{
        minHeight: "100vh",
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

  /* Animação de cursor piscando */
  @keyframes blink {
    50% { opacity: 0; }
  }

  /* Animação de digitação */
  @keyframes typing {
    from { width: 0 }
    to { width: 100% }
  }
`}</style>

      {/* Background Video */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 0,
          pointerEvents: "none",
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

        {/* Overlay escuro */}
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

      {/* Conteúdo Principal - com z-index alto */}
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

       {/* Name com animação de digitação */}
<div style={{
  marginTop: 10,
  marginBottom: 5,
  fontFamily: "'Reggae One', sans-serif",
  fontSize: "3rem",
  fontWeight: 700,
  letterSpacing: "0.08em",
  color: "#ffffff",
  textAlign: "center",
  textShadow: "0 0 20px rgba(180, 220, 255, 0.6)",
  position: "relative",
  animation: "fadeUp 1s cubic-bezier(0.16,1,0.3,1) 0.3s both",
  overflow: "hidden",
  whiteSpace: "nowrap",
}}>
  <span id="typing-name" style={{
    display: "inline-block",
    position: "relative",
  }}>
    {CONFIG.name}
  </span>
  
  {/* Cursor piscando */}
  <span style={{
    display: "inline-block",
    width: "4px",
    height: "1.1em",
    backgroundColor: "#a0d8ff",
    verticalAlign: "middle",
    marginLeft: "4px",
    animation: "blink 0.7s step-end infinite",
  }}></span>
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

        {/* Views */}
        <div
          style={{
            marginTop: 20,
            display: "flex",
            alignItems: "center",
            gap: 8,
            color: "rgba(255,255,255,0.4)",
          }}
        >
          <Icons.Eye />
          <span>{views}</span>
        </div>
      </div>

      <MusicPlayer />
    </div>
  );
}
