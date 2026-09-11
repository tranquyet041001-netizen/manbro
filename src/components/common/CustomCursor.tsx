import React, { useEffect, useState } from "react";

export const CustomCursor: React.FC = () => {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [cursorType, setCursorType] = useState<"default" | "pointer" | "view">("default");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only enable on desktop fine pointer devices
    const hasPointer = window.matchMedia("(pointer: fine)").matches;
    if (!hasPointer) return;

    const handleMouseMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (target) {
        if (target.closest("[data-cursor='view'], .cursor-view")) {
          setCursorType("view");
        } else if (target.closest("button, a, input, textarea, select, [role='button'], .clickable")) {
          setCursorType("pointer");
        } else {
          setCursorType("default");
        }
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
      className="fixed pointer-events-none z-[9999] transition-transform duration-75 ease-out select-none"
      style={{
        left: `${pos.x}px`,
        top: `${pos.y}px`,
        transform: "translate(-50%, -50%)"
      }}
      aria-hidden="true"
    >
      {cursorType === "view" ? (
        <div className="px-3.5 py-1.5 rounded-full bg-white text-black font-tech text-[10px] font-bold tracking-[0.25em] uppercase shadow-[0_0_20px_rgba(255,255,255,0.4)] scale-100 transition-all duration-200">
          VIEW
        </div>
      ) : cursorType === "pointer" ? (
        <div className="w-8 h-8 rounded-full border border-white/60 bg-white/10 scale-100 transition-all duration-150 flex items-center justify-center">
          <div className="w-1 h-1 rounded-full bg-white" />
        </div>
      ) : (
        <div className="w-2 h-2 rounded-full bg-white/80 shadow-[0_0_10px_rgba(255,255,255,0.6)] transition-all duration-150" />
      )}
    </div>
  );
};
