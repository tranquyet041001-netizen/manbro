import React from "react";
import { ChevronDown, Shield, Compass } from "lucide-react";
import { BirthdayData } from "../../data/birthdayData";

interface HeroSectionProps {
  data: BirthdayData;
  onScrollToNext: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ data, onScrollToNext }) => {
  return (
    <section
      id="hero"
      aria-label="Hero Section"
      className="relative min-h-screen w-full flex flex-col justify-between items-center text-center px-4 sm:px-6 pt-28 pb-12 overflow-hidden select-none"
    >
      {/* Fullscreen cinematic background with slow Ken Burns drift */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1507034589631-9433cc6bc453?auto=format&fit=crop&w=2000&q=85"
          alt="Atmospheric Cityscape"
          className="w-full h-full object-cover object-center filter grayscale contrast-125 brightness-[0.28] animate-slow-zoom"
          loading="eager"
        />

        {/* Deep Dark Gradients & Vignette Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#050507] via-transparent to-[#050507]/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#050507]/90 via-transparent to-[#050507]/90" />
        <div className="absolute inset-0 bg-radial-at-center from-transparent via-[#050507]/40 to-[#050507]" />
      </div>

      {/* Top Section Reel Marker */}
      <div className="flex items-center gap-3 text-xs font-tech text-zinc-500 tracking-[0.3em] uppercase">
        <span className="w-8 h-[1px] bg-zinc-700" />
        <span>REEL 01 // HERO ARCHIVE</span>
        <span className="w-8 h-[1px] bg-zinc-700" />
      </div>

      {/* Monumental Center Typography */}
      <div className="relative z-10 flex flex-col items-center justify-center max-w-5xl my-auto py-8">
        {/* Subtle Greeting */}
        <div className="inline-flex items-center gap-3 px-4 py-1 rounded-full bg-zinc-900/60 border border-white/10 mb-4 backdrop-blur-md">
          <span className="w-1.5 h-1.5 rounded-full bg-[#d4af37]" />
          <span className="font-tech text-xs sm:text-sm tracking-[0.3em] text-zinc-300 uppercase font-semibold">
            HAPPY BIRTHDAY
          </span>
        </div>

        {/* Person's Name: Bold, Condensed, Uppercase */}
        <h1
          className="font-cinematic text-5xl sm:text-7xl md:text-8xl lg:text-9xl text-white font-extrabold tracking-cinematic uppercase leading-none"
          style={{ textShadow: "0 0 50px rgba(255,255,255,0.2)" }}
        >
          {data.name}
        </h1>

        {/* Visually Dominant Monumental Numeral for Age */}
        <div className="relative my-2 sm:my-4 flex items-center justify-center">
          <span
            className="font-cinematic text-8xl sm:text-[11rem] md:text-[14rem] lg:text-[16rem] font-black text-transparent bg-clip-text bg-gradient-to-b from-white via-zinc-400 to-zinc-800 leading-none select-none"
            style={{
              WebkitTextStroke: "1px rgba(255, 255, 255, 0.4)",
              filter: "drop-shadow(0 20px 40px rgba(0,0,0,0.9))"
            }}
          >
            {data.age}
          </span>

          {/* Overlaid Chapter Badge */}
          <div className="absolute -bottom-2 sm:-bottom-4 px-6 py-1.5 rounded-md bg-zinc-950/90 border border-[#d4af37]/60 shadow-2xl backdrop-blur-md">
            <span className="font-tech text-xs sm:text-sm md:text-base font-bold tracking-[0.35em] text-[#d4af37] uppercase">
              {data.chapterTitle}
            </span>
          </div>
        </div>

        {/* Hero Tagline / Subtitle */}
        <p className="mt-8 sm:mt-10 font-tech text-xs sm:text-sm text-zinc-400 tracking-[0.25em] max-w-xl uppercase font-light leading-relaxed">
          {data.heroSubtitle}
        </p>
      </div>

      {/* Scroll to Begin Indicator */}
      <div className="relative z-10 flex flex-col items-center">
        <button
          type="button"
          onClick={onScrollToNext}
          className="group flex flex-col items-center gap-2 text-zinc-500 hover:text-zinc-200 transition-colors focus:outline-none cursor-pointer"
          aria-label="Scroll down to begin chapter"
        >
          <span className="font-tech text-[10px] tracking-[0.3em] uppercase">
            SCROLL TO BEGIN
          </span>
          <div className="w-5 h-9 rounded-full border border-zinc-600 flex items-start justify-center p-1 group-hover:border-zinc-400 transition-colors">
            <span className="w-1 h-2 bg-[#d4af37] rounded-full animate-bounce" />
          </div>
          <ChevronDown className="w-4 h-4 text-zinc-600 group-hover:text-zinc-300 transition-colors" />
        </button>
      </div>
    </section>
  );
};
