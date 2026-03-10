import { useEffect, useRef } from "react";

const MouseSpotlight = () => {
  const spotRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: -1000, y: -1000 });
  const rendered = useRef({ x: -1000, y: -1000 });
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
    };

    const animate = () => {
      const el = spotRef.current;
      if (el) {
        // Smooth lerp
        rendered.current.x += (pos.current.x - rendered.current.x) * 0.15;
        rendered.current.y += (pos.current.y - rendered.current.y) * 0.15;
        el.style.setProperty("--mx", `${rendered.current.x}px`);
        el.style.setProperty("--my", `${rendered.current.y}px`);
      }
      rafRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div
      ref={spotRef}
      className="pointer-events-none fixed inset-0 z-[9999] hidden md:block"
      style={{
        background: "radial-gradient(600px circle at var(--mx, -1000px) var(--my, -1000px), hsl(var(--primary) / 0.07), transparent 40%)",
        transition: "none",
      }}
    />
  );
};

export default MouseSpotlight;
