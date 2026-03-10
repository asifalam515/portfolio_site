import { useEffect, useRef } from "react";

const InteractiveGrid = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const parent = canvas.parentElement;
      if (!parent) return;
      canvas.width = parent.clientWidth * dpr;
      canvas.height = parent.clientHeight * dpr;
      canvas.style.width = `${parent.clientWidth}px`;
      canvas.style.height = `${parent.clientHeight}px`;
      ctx.scale(dpr, dpr);
    };
    resize();
    window.addEventListener("resize", resize);

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    const onLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 };
    };
    window.addEventListener("mousemove", onMove);
    canvas.addEventListener("mouseleave", onLeave);

    const GRID = 60;
    const RADIUS = 200;

    const draw = () => {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      const { x: mx, y: my } = mouseRef.current;

      ctx.clearRect(0, 0, w, h);

      // Draw grid lines
      for (let x = 0; x <= w; x += GRID) {
        const dx = Math.abs(x - mx);
        const proximity = Math.max(0, 1 - dx / RADIUS);
        const alpha = 0.04 + proximity * 0.12;
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.strokeStyle = `rgba(100, 220, 255, ${alpha})`;
        ctx.lineWidth = proximity > 0.1 ? 0.8 : 0.5;
        ctx.stroke();
      }

      for (let y = 0; y <= h; y += GRID) {
        const dy = Math.abs(y - my);
        const proximity = Math.max(0, 1 - dy / RADIUS);
        const alpha = 0.04 + proximity * 0.12;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.strokeStyle = `rgba(100, 220, 255, ${alpha})`;
        ctx.lineWidth = proximity > 0.1 ? 0.8 : 0.5;
        ctx.stroke();
      }

      // Draw intersection dots near cursor
      for (let x = 0; x <= w; x += GRID) {
        for (let y = 0; y <= h; y += GRID) {
          const dist = Math.sqrt((x - mx) ** 2 + (y - my) ** 2);
          if (dist < RADIUS) {
            const proximity = 1 - dist / RADIUS;
            ctx.beginPath();
            ctx.arc(x, y, 1.5 + proximity * 2, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(100, 220, 255, ${proximity * 0.5})`;
            ctx.fill();
          }
        }
      }

      // Cursor glow
      if (mx > -500) {
        const gradient = ctx.createRadialGradient(mx, my, 0, mx, my, RADIUS);
        gradient.addColorStop(0, "rgba(100, 220, 255, 0.06)");
        gradient.addColorStop(1, "rgba(100, 220, 255, 0)");
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, w, h);
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      canvas.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-auto z-0"
      style={{ opacity: 0.7 }}
    />
  );
};

export default InteractiveGrid;
