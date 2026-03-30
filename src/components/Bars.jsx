export default function Bars({ playing }) {
  return (
    <div style={{ display: "flex", alignItems: "flex-end", gap: 2, height: 16 }}>
      {[6, 11, 5, 9, 10].map((h, i) => (
        <div
          key={i}
          style={{
            width: 2.5,
            height: h,
            borderRadius: 2,
            background: "rgba(255,255,255,0.55)",
            transformOrigin: "bottom",
            animation: playing ? `barAnim 0.8s ease ${i * 0.1}s infinite alternate` : "none",
            transform: playing ? undefined : "scaleY(0.25)",
            opacity: playing ? undefined : 0.25,
          }}
        />
      ))}
      <style>{`
        @keyframes barAnim {
          from { transform: scaleY(0.25); opacity: 0.3; }
          to { transform: scaleY(1); opacity: 0.85; }
        }
      `}</style>
    </div>
  );
}