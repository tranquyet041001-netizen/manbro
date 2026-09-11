import React, { useState, useEffect } from "react";
import { ChevronRight, Sparkles } from "lucide-react";

interface OpeningScreenProps {
  onEnter: () => void;
  isStarted: boolean;
}

export const OpeningScreen: React.FC<OpeningScreenProps> = ({ onEnter, isStarted }) => {
  const [phase, setPhase] = useState<number>(0);
  const [isExiting, setIsExiting] = useState<boolean>(false);

  useEffect(() => {
    // Staggered cinematic reveal timing
    const t1 = setTimeout(() => setPhase(1), 600); // Reveal "THE NEXT CHAPTER"
    const t2 = setTimeout(() => setPhase(2), 2000); // Reveal "IS ABOUT TO BEGIN."
    const t3 = setTimeout(() => setPhase(3), 3200); // Reveal "ENTER EXPERIENCE" button

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  const handleEnterClick = () => {
    setIsExiting(true);
    setTimeout(() => {
      onEnter();
    }, 1200); // Allow smooth filmic fade-out transition
  };

  if (isStarted) return null;

  return (
    <div
      role="region"
      aria-label="Cinematic Opening Sequence"
      className={`fixed inset-0 z-[2000] flex flex-col items-center justify-center bg-[#020204] text-center px-6 transition-all duration-1000 ease-in-out ${
        isExiting ? "opacity-0 scale-105 pointer-events-none" : "opacity-100 scale-100"
      }`}
    >
      {/* Subtle background radial glow */}
      <div className="absolute inset-0 bg-radial-vignette pointer-events-none opacity-40" />

      {/* Atmospheric center lens flare streak */}
      <div className="absolute w-[80vw] max-w-2xl h-[1px] bg-gradient-to-r from-transparent via-[#d4af37]/30 to-transparent animate-pulse-glow" />

      {/* Top micro coordinates */}
      <div
        className={`absolute top-8 md:top-12 flex items-center gap-4 text-[10px] font-tech text-zinc-600 tracking-[0.3em] uppercase transition-opacity duration-1000 ${
          phase >= 1 ? "opacity-100" : "opacity-0"
        }`}
      >
        <span>REEL: 01</span>
        <span>•</span>
        <span>LAT: 21°01'N // LON: 105°51'E</span>
        <span>•</span>
        <span>CINEMATIC ARCHIVE</span>
      </div>

      {/* Main Dramatic Sequence */}
      <div className="relative z-10 max-w-3xl flex flex-col items-center select-none">
        {/* Title: THE NEXT CHAPTER */}
        <h1
          className={`font-cinematic text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-white font-extrabold tracking-cinematic uppercase transition-all duration-1000 transform ${
            phase >= 1 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
          style={{ textShadow: "0 0 40px rgba(255,255,255,0.15)" }}
        >
          THE NEXT CHAPTER
        </h1>

        {/* Subtitle: IS ABOUT TO BEGIN. */}
        <p
          className={`font-tech text-xs sm:text-sm md:text-base text-zinc-400 tracking-[0.35em] uppercase mt-4 md:mt-6 transition-all duration-1000 transform ${
            phase >= 2 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          IS ABOUT TO BEGIN.
        </p>

        {/* Enter Button */}
        <div
          className={`mt-12 md:mt-16 transition-all duration-1000 transform ${
            phase >= 3 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8 pointer-events-none"
          }`}
        >
          <button
            type="button"
            onClick={handleEnterClick}
            className="group relative inline-flex items-center gap-3 px-8 sm:px-10 py-3.5 sm:py-4 rounded-full bg-zinc-900/80 hover:bg-zinc-800 text-zinc-100 border border-white/20 hover:border-[#d4af37]/80 transition-all duration-500 shadow-2xl hover:shadow-[0_0_35px_rgba(212,175,55,0.25)] focus:outline-none cursor-pointer"
          >
            {/* Pulsing subtle glow backer */}
            <span className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-zinc-700 via-[#d4af37]/40 to-zinc-700 opacity-0 group-hover:opacity-100 blur transition-opacity duration-500" />

            <span className="relative font-tech text-xs sm:text-sm tracking-[0.25em] uppercase font-semibold text-white">
              ENTER EXPERIENCE
            </span>

            <ChevronRight className="relative w-4 h-4 text-[#d4af37] transform transition-transform duration-300 group-hover:translate-x-1" />
          </button>

          <p className="mt-4 text-[10px] font-tech text-zinc-600 tracking-widest uppercase">
            [ SOUND & FULL EXPERIENCE RECOMMENDED ]
          </p>
        </div>
      </div>

      {/* Bottom discreet audio note */}
      <div
        className={`absolute bottom-8 text-[9px] font-tech text-zinc-700 tracking-widest uppercase transition-opacity duration-1000 ${
          phase >= 3 ? "opacity-100" : "opacity-0"
        }`}
      >
        AN INTERACTIVE FILM ESSAY // 2.39:1 RATIO
      </div>
    </div>
  );
};
