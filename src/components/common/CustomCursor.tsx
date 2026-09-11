import React, { useEffect, useState } from "react";

export const CustomCursor: React.FC = () => {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only enable on desktop pointer devices
    const hasPointer = window.matchMedia("(pointer: fine)").matches;
    if (!hasPointer) return;

    const handleMouseMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (target) {
        const isInteractive = target.closest("button, a, input, textarea, select, [role='button'], .clickable");
        setIsHovered(!!isInteractive);
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div
      className="fixed pointer-events-none z-[9999] transition-transform duration-75 ease-out"
      style={{
        left: `${pos.x}px`,
        top: `${pos.y}px`,
        transform: "translate(-50%, -50%)"
      }}
      aria-hidden="true"
    >
      {/* Outer aura */}
      <div
        className={`rounded-full border border-white/40 transition-all duration-200 ease-out flex items-center justify-center ${
          isHovered
            ? "w-10 h-10 bg-white/10 border-[#d4af37]/80 scale-110"
            : "w-5 h-5 bg-transparent border-white/30"
        }`}
      >
        {/* Inner dot */}
        <div
          className={`rounded-full bg-white transition-all duration-150 ${
            isHovered ? "w-1 h-1 bg-[#d4af37]" : "w-1.5 h-1.5 bg-zinc-200"
          }`}
        />
      </div>
    </div>
  );
};
