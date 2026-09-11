import React, { useEffect, useState } from "react";
import { BirthdayData } from "../../data/birthdayData";

interface HeroRevealProps {
  data: BirthdayData;
  onScrollNext: () => void;
}

export const HeroReveal: React.FC<HeroRevealProps> = ({ data, onScrollNext }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    // Cinematic delayed light reveal
    const timer = setTimeout(() => setImageLoaded(true), 400);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      id="hero"
      aria-label="Cinematic Hero Reveal"
      className="relative min-h-screen w-full flex flex-col justify-between items-center text-center px-4 sm:px-8 pt-24 pb-16 overflow-hidden select-none"
    >
      {/* Cinematic Fullscreen Background Portrait / Visual */}
      <div className="absolute inset-0 -z-10 overflow-hidden bg-[#050505]">
        <img
          src={data.hero.portraitImage}
          alt={data.name}
          className={`w-full h-full object-cover object-center filter grayscale contrast-125 brightness-[0.22] transition-all duration-[3000ms] ease-out scale-100 ${
            imageLoaded ? "opacity-100 scale-105" : "opacity-0 scale-100"
          }`}
          loading="eager"
        />

        {/* Ambient Dark Gradients & Vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505]/90" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#050505]/95 via-transparent to-[#050505]/95" />
      </div>

      {/* Top Scene Marker */}
      <div className="text-[10px] font-tech text-zinc-600 tracking-[0.35em] uppercase">
        SCENE 01 // THE OPENING SHOT
      </div>

      {/* Main Monumental Centerpiece */}
      <div className="relative z-10 flex flex-col items-center justify-center max-w-6xl my-auto py-6">
        {/* Title Stack: HAPPY BIRTHDAY */}
        <div className="space-y-1 sm:space-y-2">
          <p className="font-cinematic text-3xl sm:text-5xl md:text-6xl text-zinc-400 tracking-cinematic uppercase font-bold">
            HAPPY
          </p>
          <p className="font-cinematic text-4xl sm:text-6xl md:text-7xl text-white tracking-cinematic uppercase font-extrabold">
            BIRTHDAY
          </p>
        </div>

        {/* Recipient's Name */}
        <h1
          className="font-cinematic text-5xl sm:text-7xl md:text-8xl lg:text-9xl text-white font-black tracking-cinematic uppercase mt-2 mb-2"
          style={{ textShadow: "0 0 50px rgba(255,255,255,0.15)" }}
        >
          {data.name}
        </h1>

        {/* Massive Sculptural Numeral Spanning Most of the Viewport */}
        <div className="relative my-0 sm:my-2 flex items-center justify-center">
          <span
            className="font-cinematic text-[32vw] sm:text-[28vw] lg:text-[24vw] font-black text-transparent bg-clip-text bg-gradient-to-b from-white via-zinc-400 to-zinc-800 leading-none select-none tracking-tighter"
            style={{
              WebkitTextStroke: "1px rgba(255, 255, 255, 0.25)",
              filter: "drop-shadow(0 20px 40px rgba(0,0,0,0.95))"
            }}
          >
            {data.age}
          </span>

          {/* Overlaid Chapter Badge */}
          <div className="absolute -bottom-2 sm:-bottom-4 px-6 py-1.5 rounded-full bg-zinc-950/90 border border-white/20 backdrop-blur-md shadow-2xl">
            <span className="font-tech text-xs sm:text-sm tracking-[0.35em] text-white uppercase font-semibold">
              {data.hero.subtitle}
            </span>
          </div>
        </div>
      </div>

      {/* Bottom Scroll Prompt */}
      <div className="relative z-10">
        <button
          type="button"
          onClick={onScrollNext}
          className="group flex flex-col items-center gap-2 text-zinc-600 hover:text-zinc-300 transition-colors focus:outline-none cursor-pointer"
          aria-label="Scroll to Chapter 01"
        >
          <span className="font-tech text-[9px] tracking-[0.35em] uppercase">
            SCROLL TO ENTER
          </span>
          <div className="w-[1px] h-8 bg-gradient-to-b from-zinc-600 to-transparent group-hover:from-white transition-colors" />
        </button>
      </div>
    </section>
  );
};
