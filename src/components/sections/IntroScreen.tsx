import React, { useState, useEffect } from "react";

interface IntroScreenProps {
  onEnter: () => void;
  isStarted: boolean;
}

export const IntroScreen: React.FC<IntroScreenProps> = ({ onEnter, isStarted }) => {
  const [phase, setPhase] = useState<number>(0);
  const [isDippingToBlack, setIsDippingToBlack] = useState<boolean>(false);

  useEffect(() => {
    // Cinematic timing sequence
    // Phase 1: Reveal "A STORY IN TIME" (at 400ms)
    const t1 = setTimeout(() => setPhase(1), 400);
    // Phase 2: Fade out "A STORY IN TIME" (at 1800ms)
    const t2 = setTimeout(() => setPhase(2), 1800);
    // Phase 3: Reveal "THE NEXT CHAPTER" (at 2600ms)
    const t3 = setTimeout(() => setPhase(3), 2600);
    // Phase 4: Reveal subtitle & luxury ENTER button (at 4000ms)
    const t4 = setTimeout(() => setPhase(4), 4000);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, []);

  const handleEnterClick = () => {
    // Screen briefly dips to complete black, then transitions to hero
    setIsDippingToBlack(true);
    setTimeout(() => {
      onEnter();
    }, 1200);
  };

  if (isStarted) return null;

  return (
    <div
      role="region"
      aria-label="Cinematic Opening Sequence"
      className={`fixed inset-0 z-[2000] flex flex-col items-center justify-center bg-[#050505] text-center px-6 transition-opacity duration-1000 select-none ${
        isDippingToBlack ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      {/* Faint Horizontal Light Pass */}
      <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/15 to-transparent pointer-events-none -translate-y-1/2 animate-flare-scan" />

      {/* Prologue: A STORY IN TIME (Phase 1 to 2) */}
      <div
        className={`absolute inset-0 flex items-center justify-center transition-all duration-1000 pointer-events-none ${
          phase === 1
            ? "opacity-100 scale-100"
            : phase > 1
            ? "opacity-0 scale-105"
            : "opacity-0 scale-95"
        }`}
      >
        <p className="font-tech text-xs sm:text-sm text-zinc-400 tracking-[0.4em] uppercase font-light">
          A STORY IN TIME
        </p>
      </div>

      {/* Main Monumental Title Sequence (Phase 3+) */}
      <div
        className={`relative z-10 max-w-4xl flex flex-col items-center transition-all duration-1000 ${
          phase >= 3 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <h1 className="font-cinematic text-5xl sm:text-7xl md:text-8xl lg:text-9xl text-white font-extrabold tracking-cinematic uppercase leading-none text-center">
          <span>THE NEXT</span>
          <br />
          <span className="text-zinc-300">CHAPTER</span>
        </h1>

        {/* Subtitle */}
        <p
          className={`font-tech text-xs sm:text-sm text-zinc-500 tracking-[0.3em] uppercase mt-6 transition-all duration-1000 delay-300 ${
            phase >= 4 ? "opacity-100" : "opacity-0"
          }`}
        >
          AN INTERACTIVE BIRTHDAY EXPERIENCE
        </p>

        {/* Luxury Product Minimal Circular ENTER Button */}
        <div
          className={`mt-14 sm:mt-20 transition-all duration-1000 delay-500 ${
            phase >= 4 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6 pointer-events-none"
          }`}
        >
          <button
            type="button"
            onClick={handleEnterClick}
            className="group relative w-20 h-20 sm:w-24 sm:h-24 rounded-full border border-white/20 hover:border-white/80 bg-zinc-950/80 flex items-center justify-center transition-all duration-500 focus:outline-none cursor-pointer shadow-[0_0_40px_rgba(0,0,0,0.8)]"
            aria-label="Enter Experience"
          >
            {/* Outer Pulsing Ring */}
            <span className="absolute -inset-2 rounded-full border border-white/10 group-hover:border-white/30 animate-ping opacity-30" />

            {/* Subtle Crosshair Ticks */}
            <span className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-1.5 bg-white/40" />
            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1px] h-1.5 bg-white/40" />
            <span className="absolute left-0 top-1/2 -translate-y-1/2 h-[1px] w-1.5 bg-white/40" />
            <span className="absolute right-0 top-1/2 -translate-y-1/2 h-[1px] w-1.5 bg-white/40" />

            {/* Inner Center Label */}
            <span className="font-tech text-xs tracking-[0.3em] uppercase text-white group-hover:tracking-[0.4em] transition-all duration-300">
              ENTER
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
