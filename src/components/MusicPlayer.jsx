import { useState, useEffect, useRef } from "react";
import { CONFIG } from "../config/bioConfig";
import Bars from "./Bars";
import { Icons } from "./Icons";

export default function MusicPlayer() {
  const { music } = CONFIG;
  const [open, setOpen] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [current, setCurrent] = useState(0);
  const [dur, setDur] = useState(0);
  const [vol, setVol] = useState(0.8);

  const audioRef = useRef(null);
  const playerRef = useRef(null);

  const fmt = (s) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`;

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

  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;

    const onTime = () => {
      if (a.duration) {
        setProgress((a.currentTime / a.duration) * 100);
        setCurrent(a.currentTime);
      }
    };
    const onMeta = () => setDur(a.duration);
    const onEnd = () => setPlaying(false);

    a.addEventListener("timeupdate", onTime);
    a.addEventListener("loadedmetadata", onMeta);
    a.addEventListener("ended", onEnd);
    a.volume = vol;

    return () => {
      a.removeEventListener("timeupdate", onTime);
      a.removeEventListener("loadedmetadata", onMeta);
      a.removeEventListener("ended", onEnd);
    };
  }, [vol]);

  const seek = (e) => {
    const a = audioRef.current;
    if (!a?.duration) return;
    const r = e.currentTarget.getBoundingClientRect();
    a.currentTime = ((e.clientX - r.left) / r.width) * a.duration;
  };

  const changeVol = (e) => {
    const v = parseFloat(e.target.value);
    setVol(v);
    if (audioRef.current) audioRef.current.volume = v;
  };

  // Fechar ao clicar fora
  useEffect(() => {
    const handler = (e) => {
      if (open && playerRef.current && !playerRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  const glass = {
    background: "rgba(10,10,14,0.88)",
    backdropFilter: "blur(24px)",
    border: "1px solid rgba(255,255,255,0.09)",
  };

  return (
    <div
      ref={playerRef}
      style={{
        position: "fixed",
        bottom: 20,
        right: 18,
        zIndex: 100,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
        gap: 10,
      }}
    >
      <audio ref={audioRef} preload="metadata" src={music.src} />

      {/* Expanded Player */}
      <div
        style={{
          width: 240,
          borderRadius: 18,
          padding: 16,
          display: "flex",
          flexDirection: "column",
          gap: 12,
          boxShadow: "0 20px 50px rgba(0,0,0,0.75)",
          transformOrigin: "bottom right",
          transition: "all 0.35s cubic-bezier(0.16,1,0.3,1)",
          opacity: open ? 1 : 0,
          pointerEvents: open ? "auto" : "none",
          transform: open ? "scale(1) translateY(0)" : "scale(0.88) translateY(8px)",
          ...glass,
        }}
      >
        {/* Track Info */}
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div
            style={{
              width: 50,
              height: 50,
              borderRadius: 10,
              background: "#1a1a22",
              border: "1px solid rgba(255,255,255,0.08)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 22,
              overflow: "hidden",
            }}
          >
            {music.cover ? (
              <img src={music.cover} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: 10 }} />
            ) : (
              music.emoji
            )}
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontFamily: "'Zen Kaku Gothic New',sans-serif", fontWeight: 700, fontSize: "0.88rem", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", color: "#ececec" }}>
              {music.title}
            </div>
            <div style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.4)", marginTop: 3, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
              {music.artist}
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div>
          <div onClick={seek} style={{ width: "100%", height: 3, borderRadius: 99, background: "rgba(255,255,255,0.1)", cursor: "pointer", position: "relative" }}>
            <div style={{ height: "100%", borderRadius: 99, background: "rgba(255,255,255,0.65)", width: `${progress}%`, transition: "width 0.3s linear" }} />
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.62rem", color: "rgba(255,255,255,0.35)", marginTop: 4 }}>
            <span>{fmt(current)}</span>
            <span>{fmt(dur)}</span>
          </div>
        </div>

        {/* Controls */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 14 }}>
          <button style={{ background: "none", border: "none", color: "rgba(255,255,255,0.4)", cursor: "pointer" }} onClick={() => {}}>
            <Icons.Prev />
          </button>

          <button
            onClick={togglePlay}
            style={{
              width: 38,
              height: 38,
              borderRadius: "50%",
              background: "rgba(255,255,255,0.1)",
              border: "1px solid rgba(255,255,255,0.2)",
              color: "white",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {playing ? <Icons.Pause /> : <Icons.Play />}
          </button>

          <button style={{ background: "none", border: "none", color: "rgba(255,255,255,0.4)", cursor: "pointer" }} onClick={() => {}}>
            <Icons.Next />
          </button>
        </div>

        {/* Volume */}
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <Icons.Volume />
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={vol}
            onChange={changeVol}
            style={{
              flex: 1,
              WebkitAppearance: "none",
              height: 3,
              borderRadius: 99,
              background: `linear-gradient(to right, rgba(255,255,255,0.6) ${vol * 100}%, rgba(255,255,255,0.1) ${vol * 100}%)`,
              outline: "none",
              cursor: "pointer",
            }}
          />
        </div>
      </div>

      {/* Mini Player (Pill) */}
      <div
        onClick={() => setOpen((o) => !o)}
        style={{
          display: "flex",
          alignItems: "start",
          gap: 8,
          padding: "8px 50px 8px 60px",
          borderRadius: 99,
          cursor: "pointer",
          userSelect: "none",
          ...glass,
        }}
      >
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
            <img src={music.cover} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: 7 }} />
          ) : (
            music.emoji
          )}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 1, maxWidth: 120 }}>
          <div style={{ fontSize: "0.73rem", fontWeight: 700, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
            {music.title}
          </div>
          <div style={{ fontSize: "0.62rem", color: "rgba(255,255,255,0.4)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
            {music.artist}
          </div>
        </div>

        <Bars playing={playing} />
      </div>
    </div>
  );
}