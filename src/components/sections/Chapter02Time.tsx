import React, { useState, useRef } from "react";
import { ChevronLeft, ChevronRight, MapPin, Compass } from "lucide-react";
import { TimelineItem } from "../../data/birthdayData";

interface Chapter02TimeProps {
  timeline: TimelineItem[];
}

export const Chapter02Time: React.FC<Chapter02TimeProps> = ({ timeline }) => {
  const [activeIdx, setActiveIdx] = useState<number>(timeline.length - 1);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const handleSelectYear = (index: number) => {
    setActiveIdx(index);
    if (scrollRef.current) {
      const cardWidth = 380;
      scrollRef.current.scrollTo({
        left: index * cardWidth - 80,
        behavior: "smooth"
      });
    }
  };

  const handlePrev = () => {
    if (activeIdx > 0) handleSelectYear(activeIdx - 1);
  };

  const handleNext = () => {
    if (activeIdx < timeline.length - 1) handleSelectYear(activeIdx + 1);
  };

  return (
    <section
      id="time"
      aria-label="Chapter 02 - Time"
      className="relative min-h-screen w-full flex flex-col justify-center py-24 px-4 sm:px-10 overflow-hidden bg-[#050505] select-none"
    >
      {/* Background Year Numeral for Deep Time-Travel Atmosphere */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none transition-all duration-700 opacity-5"
        aria-hidden="true"
      >
        <span className="font-cinematic text-[26vw] font-black text-white select-none">
          {timeline[activeIdx]?.year || "2026"}
        </span>
      </div>

      {/* Header */}
      <div className="max-w-7xl mx-auto w-full mb-10 sm:mb-14 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <span className="w-6 h-[1px] bg-zinc-600" />
            <span className="font-tech text-xs tracking-[0.3em] text-zinc-400 uppercase font-semibold">
              02 // TIME
            </span>
          </div>
          <h2 className="font-cinematic text-3xl sm:text-5xl lg:text-6xl text-white font-extrabold tracking-cinematic uppercase">
            THE CHRONOLOGY
          </h2>
          <p className="font-tech text-xs sm:text-sm text-zinc-500 tracking-wider uppercase mt-2">
            MOVING THROUGH TIME // 2021 — 2026
          </p>
        </div>

        {/* Scrub Arrows for Desktop */}
        <div className="hidden sm:flex items-center gap-3">
          <button
            type="button"
            onClick={handlePrev}
            disabled={activeIdx === 0}
            className="p-3 rounded-full border border-white/10 hover:border-white/40 bg-zinc-900/60 text-white disabled:opacity-30 transition-all focus:outline-none"
            aria-label="Previous Year"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={handleNext}
            disabled={activeIdx === timeline.length - 1}
            className="p-3 rounded-full border border-white/10 hover:border-white/40 bg-zinc-900/60 text-white disabled:opacity-30 transition-all focus:outline-none"
            aria-label="Next Year"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Horizontal Time Rail (Desktop / Tablet) */}
      <div
        ref={scrollRef}
        className="w-full flex gap-6 sm:gap-8 overflow-x-auto pb-8 pt-4 no-scrollbar scroll-smooth snap-x snap-mandatory"
        style={{ scrollbarWidth: "none" }}
      >
        {timeline.map((item, idx) => {
          const isActive = activeIdx === idx;
          const isPast = idx < activeIdx;

          return (
            <div
              key={item.id}
              onClick={() => handleSelectYear(idx)}
              className={`snap-center shrink-0 w-[85vw] sm:w-[360px] md:w-[420px] rounded-2xl p-6 sm:p-8 flex flex-col justify-between border cursor-pointer transition-all duration-700 relative overflow-hidden ${
                isActive
                  ? "bg-gradient-to-b from-[#111318] to-[#0b0d10] border-white/30 shadow-[0_20px_50px_rgba(0,0,0,0.9)] scale-100 opacity-100"
                  : isPast
                  ? "bg-[#090a0d]/60 border-white/5 opacity-40 hover:opacity-75 scale-95"
                  : "bg-[#090a0d]/40 border-white/5 opacity-50 hover:opacity-85 scale-95"
              }`}
            >
              {/* Year & Age Top Header */}
              <div className="flex items-center justify-between mb-6">
                <span
                  className={`font-cinematic text-3xl sm:text-4xl font-extrabold tracking-wider transition-colors duration-500 ${
                    isActive ? "text-white" : "text-zinc-600"
                  }`}
                >
                  {item.year}
                </span>
                <span className="font-tech text-xs tracking-widest text-zinc-400 uppercase font-semibold">
                  AGE {item.age}
                </span>
              </div>

              {/* Photo Frame */}
              <div className="w-full h-56 sm:h-64 rounded-xl overflow-hidden relative mb-6 border border-white/10 bg-zinc-950">
                <img
                  src={item.image}
                  alt={item.title}
                  className={`w-full h-full object-cover transition-all duration-700 ${
                    isActive ? "filter grayscale contrast-115 brightness-95 scale-105" : "filter grayscale brightness-50 scale-100"
                  }`}
                  loading="lazy"
                />
                {item.location && (
                  <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded bg-black/80 font-tech text-[9px] text-zinc-300 tracking-widest uppercase backdrop-blur-sm flex items-center gap-1.5">
                    <MapPin className="w-3 h-3 text-zinc-400" />
                    <span>{item.location}</span>
                  </div>
                )}
              </div>

              {/* Event Content */}
              <div>
                <h3 className="font-cinematic text-xl sm:text-2xl text-white font-bold tracking-cinematic uppercase mb-1">
                  {item.title}
                </h3>
                <p className="font-tech text-[11px] text-zinc-400 uppercase tracking-wider mb-3">
                  "{item.tagline}"
                </p>
                <div className="w-12 h-[1px] bg-zinc-700 mb-3" />
                <p className="font-body text-xs sm:text-sm text-zinc-300 font-light leading-relaxed">
                  {item.description}
                </p>
              </div>

              {/* Active Indicator Light Bar */}
              {isActive && (
                <div className="absolute bottom-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-white to-transparent" />
              )}
            </div>
          );
        })}
      </div>

      {/* Progress Ticker Bar */}
      <div className="max-w-md mx-auto w-full mt-6 flex items-center justify-between gap-2">
        {timeline.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => handleSelectYear(i)}
            className="flex-1 py-2 focus:outline-none group"
            aria-label={`Jump to ${timeline[i].year}`}
          >
            <div
              className={`h-[2px] rounded-full transition-all duration-300 ${
                activeIdx === i ? "bg-white" : "bg-zinc-800 group-hover:bg-zinc-600"
              }`}
            />
          </button>
        ))}
      </div>
    </section>
  );
};
