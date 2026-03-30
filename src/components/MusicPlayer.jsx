import { useState, useEffect, useRef } from "react";
import { CONFIG } from "../config/bioConfig";
import Bars from "./Bars";
import { Icons } from "./Icons";

export default function MusicPlayer() {
  const { music } = CONFIG;
  const [playing, setPlaying] = useState(false);
  const [vol, setVol] = useState(0.8);
  const [muted, setMuted] = useState(false);
  const audioRef = useRef(null);
  const startedRef = useRef(false);

  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;

    const startAudio = () => {
      a.play()
        .then(() => setPlaying(true))
        .catch(() => setPlaying(false));

      document.removeEventListener("click", startAudio);
      document.removeEventListener("keydown", startAudio);
      document.removeEventListener("touchstart", startAudio);
    };

    // Force player
    a.play()
      .then(() => setPlaying(true))
      .catch(() => {
        document.addEventListener("click", startAudio);
        document.addEventListener("keydown", startAudio);
        document.addEventListener("touchstart", startAudio);
      });

    return () => {
      document.removeEventListener("click", startAudio);
      document.removeEventListener("keydown", startAudio);
      document.removeEventListener("touchstart", startAudio);
    };
  }, []);

  const togglePlay = () => {
    const a = audioRef.current;
    if (!a) return;
    if (playing) {
      a.pause();
      setPlaying(false);
    } else {
      a.play().catch(() => {});
      setPlaying(true);
    }
  };

  const toggleMute = () => {
    const a = audioRef.current;
    if (!a) return;
    a.muted = !muted;
    setMuted(!muted);
  };

  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    const onEnd = () => setPlaying(false);
    a.addEventListener("ended", onEnd);
    a.volume = vol;
    return () => {
      a.removeEventListener("ended", onEnd);
    };
  }, [vol]);

  const glass = {
    background: "rgba(10,10,14,0.88)",
    backdropFilter: "blur(24px)",
    border: "1px solid rgba(255,255,255,0.09)",
  };

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        marginTop: 20,
      }}
    >
      <audio ref={audioRef} preload="auto" src={music.src} loop />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          padding: "8px 16px",
          borderRadius: 99,
          userSelect: "none",
          boxShadow: "0 10px 40px rgba(0,0,0,0.7)",
          ...glass,
        }}
      >
        {/* Cover */}
        <div
          style={{
            width: 28,
            height: 28,
            borderRadius: 7,
            background: "#1a1a22",
            fontSize: 14,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
          }}
        >
          {music.cover ? (
            <img
              src={music.cover}
              alt=""
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                borderRadius: 7,
              }}
            />
          ) : (
            music.emoji
          )}
        </div>

        {/* Info */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            maxWidth: 140,
          }}
        >
          <div
            style={{
              fontSize: "0.73rem",
              fontWeight: 700,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {music.title}
          </div>
          <div
            style={{
              fontSize: "0.62rem",
              color: "rgba(255,255,255,0.4)",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {music.artist}
          </div>
        </div>

        <Bars playing={playing} />

        {/* Play and Pause */}
        <button
          onClick={togglePlay}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "white",
            display: "flex",
            alignItems: "center",
          }}
        >
          {playing ? <Icons.Pause /> : <Icons.Play />}
        </button>

        {/* Mute */}
        <button
          onClick={toggleMute}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "white",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Icons.Volume />
        </button>
      </div>
    </div>
  );
}
