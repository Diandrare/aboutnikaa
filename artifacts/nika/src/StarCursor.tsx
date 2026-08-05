import { useEffect, useState } from "react";

interface TrailPoint {
  id: number;
  x: number;
  y: number;
  size: number;
}

export default function StarCursor() {
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null);
  const [trail, setTrail] = useState<TrailPoint[]>([]);
  const [isMobile, setIsMobile] = useState(false);

  // 1. Deteksi Perangkat Mobile / Layar Sentuh
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(
        "ontouchstart" in window ||
          navigator.maxTouchPoints > 0 ||
          window.matchMedia("(max-width: 768px)").matches
      );
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // 2. Event Mouse Move
  useEffect(() => {
    let count = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const x = e.clientX;
      const y = e.clientY;

      setPos({ x, y });

      count++;
      const newPoint: TrailPoint = {
        id: Date.now() + count,
        x,
        y,
        size: Math.random() * 12 + 8,
      };

      setTrail((prev) => [...prev.slice(-10), newPoint]);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // 3. Hapus Trail Bertahap
  useEffect(() => {
    if (trail.length === 0) return;
    const timer = setTimeout(() => {
      setTrail((prev) => prev.slice(1));
    }, 50);
    return () => clearTimeout(timer);
  }, [trail]);

  // Guard Clause: Jangan render jika mobile / mouse belum bergerak
  if (isMobile || !pos) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[999999] overflow-hidden">
      {/* ── 1. Cahaya / Glow Effect ── */}
      <div
        className="fixed rounded-full -translate-x-1/2 -translate-y-1/2 transition-transform duration-75 ease-out pointer-events-none"
        style={{
          left: `${pos.x}px`,
          top: `${pos.y}px`,
          width: "500px",
          height: "500px",
          background:
            "radial-gradient(circle, rgba(255,255,255,0.6) 0%, rgba(120,234,255,0.3) 10%, transparent 70%)",
          filter: "blur(10px)",
        }}
      />

      {/* ── 2. Trail Bintang ── */}
      {trail.map((pt) => (
        <div
          key={pt.id}
          className="fixed -translate-x-1/2 -translate-y-1/2 pointer-events-none animate-ping"
          style={{
            left: `${pt.x}px`,
            top: `${pt.y}px`,
            width: `${pt.size}px`,
            height: `${pt.size}px`,
            animationDuration: "800ms",
          }}
        >
          <svg
            viewBox="0 0 24 24"
            fill="#78eaff"
            className="w-full h-full drop-shadow-[0_0_8px_#78eaff]"
          >
            <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
          </svg>
        </div>
      ))}

      {/* ── 3. Bintang Cursor Utama ── */}
      <div
        className="fixed -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{
          left: `${pos.x}px`,
          top: `${pos.y}px`,
          width: "30px",
          height: "30px",
        }}
      >
        <svg
          viewBox="0 0 24 24"
          fill="#ffffff"
          className="w-full h-full drop-shadow-[0_0_12px_rgba(255,255,255,1)]"
        >
          <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
        </svg>
      </div>
    </div>
  );
}
