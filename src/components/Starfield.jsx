import { useRef, useEffect } from "react";

export default function Starfield() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let raf, stars = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const init = () => {
      stars = Array.from({ length: 320 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.2 + 0.15,
        a: Math.random() * 0.8 + 0.2,
        speed: Math.random() * 0.003 + 0.001,
        phase: Math.random() * Math.PI * 2,
      }));
    };

    const draw = (t) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const s of stars) {
        const alpha = s.a * (0.4 + 0.6 * Math.sin(t * s.speed + s.phase));
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${alpha.toFixed(3)})`;
        ctx.fill();
      }
      raf = requestAnimationFrame(draw);
    };

    resize();
    init();
    raf = requestAnimationFrame(draw);

    window.addEventListener("resize", () => {
      resize();
      init();
    });

    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
      }}
    />
  );
}