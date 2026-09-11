import React, { useState } from "react";
import { MemoryItem } from "../../data/birthdayData";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface Chapter03MemoriesProps {
  memories: MemoryItem[];
}

export const Chapter03Memories: React.FC<Chapter03MemoriesProps> = ({ memories }) => {
  const [activeViewerIdx, setActiveViewerIdx] = useState<number | null>(null);

  const activeItem = activeViewerIdx !== null ? memories[activeViewerIdx] : null;

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeViewerIdx !== null) {
      setActiveViewerIdx(activeViewerIdx > 0 ? activeViewerIdx - 1 : memories.length - 1);
    }
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeViewerIdx !== null) {
      setActiveViewerIdx(activeViewerIdx < memories.length - 1 ? activeViewerIdx + 1 : 0);
    }
  };

  return (
    <section
      id="memories"
      aria-label="Chapter 03 - Memories"
      className="relative min-h-screen w-full py-28 px-4 sm:px-10 max-w-7xl mx-auto overflow-hidden bg-[#050505] select-none"
    >
      {/* Editorial Section Header */}
      <div className="mb-16 sm:mb-24">
        <div className="flex items-center gap-3 mb-3">
          <span className="w-8 h-[1px] bg-zinc-600" />
          <span className="font-tech text-xs tracking-[0.35em] text-zinc-400 uppercase font-semibold">
            03 // MEMORIES
          </span>
        </div>
        <h2 className="font-cinematic text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-white font-extrabold tracking-cinematic uppercase leading-tight max-w-4xl">
          SOME MOMENTS
          <br />
          <span className="text-zinc-400">NEVER LEAVE US.</span>
        </h2>
      </div>

      {/* Asymmetric Editorial Gallery Canvas */}
      <div className="relative grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
        {/* Memory 1: Massive Feature Frame (Left col-span-7) */}
        {memories[0] && (
          <div
            onClick={() => setActiveViewerIdx(0)}
            data-cursor="view"
            className="md:col-span-7 group relative h-[420px] sm:h-[540px] rounded-2xl overflow-hidden cursor-pointer border border-white/10 bg-zinc-950 transition-all duration-700 hover:border-white/40 shadow-2xl"
          >
            <img
              src={memories[0].image}
              alt={memories[0].title}
              className="w-full h-full object-cover filter grayscale contrast-120 brightness-90 group-hover:filter-none group-hover:scale-105 transition-all duration-1000 ease-out"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <span className="font-tech text-[10px] tracking-[0.3em] text-zinc-400 uppercase font-semibold block mb-1">
                MEMORY 01 // {memories[0].year} — {memories[0].location}
              </span>
              <h3 className="font-cinematic text-2xl sm:text-3xl text-white font-bold tracking-wide uppercase">
                {memories[0].title}
              </h3>
              <p className="font-body text-xs sm:text-sm text-zinc-300 font-light mt-2 max-w-md line-clamp-2">
                {memories[0].caption}
              </p>
            </div>
          </div>
        )}

        {/* Column 2: Stacked Asymmetric Secondary Frames (Right col-span-5) */}
        <div className="md:col-span-5 space-y-8">
          {memories[1] && (
            <div
              onClick={() => setActiveViewerIdx(1)}
              data-cursor="view"
              className="group relative h-[280px] sm:h-[320px] rounded-2xl overflow-hidden cursor-pointer border border-white/10 bg-zinc-950 transition-all duration-700 hover:border-white/40 shadow-xl"
            >
              <img
                src={memories[1].image}
                alt={memories[1].title}
                className="w-full h-full object-cover filter grayscale contrast-120 brightness-90 group-hover:filter-none group-hover:scale-105 transition-all duration-1000"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-5 left-5 right-5">
                <span className="font-tech text-[9px] tracking-[0.25em] text-zinc-400 uppercase font-semibold block mb-1">
                  MEMORY 02 // {memories[1].year} — {memories[1].location}
                </span>
                <h4 className="font-cinematic text-xl text-white font-bold tracking-wide uppercase">
                  {memories[1].title}
                </h4>
              </div>
            </div>
          )}

          {memories[2] && (
            <div
              onClick={() => setActiveViewerIdx(2)}
              data-cursor="view"
              className="group relative h-[220px] sm:h-[240px] rounded-2xl overflow-hidden cursor-pointer border border-white/10 bg-zinc-950 transition-all duration-700 hover:border-white/40 shadow-xl ml-auto md:w-5/6"
            >
              <img
                src={memories[2].image}
                alt={memories[2].title}
                className="w-full h-full object-cover filter grayscale contrast-120 brightness-90 group-hover:filter-none group-hover:scale-105 transition-all duration-1000"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <span className="font-tech text-[9px] tracking-[0.25em] text-zinc-400 uppercase font-semibold block mb-1">
                  MEMORY 03 // {memories[2].year} — {memories[2].location}
                </span>
                <h4 className="font-cinematic text-lg text-white font-bold tracking-wide uppercase">
                  {memories[2].title}
                </h4>
              </div>
            </div>
          )}
        </div>

        {/* Row 2: Secondary Overlapping Pair */}
        {memories[3] && (
          <div
            onClick={() => setActiveViewerIdx(3)}
            data-cursor="view"
            className="md:col-span-6 group relative h-[320px] sm:h-[380px] rounded-2xl overflow-hidden cursor-pointer border border-white/10 bg-zinc-950 transition-all duration-700 hover:border-white/40 shadow-xl"
          >
            <img
              src={memories[3].image}
              alt={memories[3].title}
              className="w-full h-full object-cover filter grayscale contrast-120 brightness-90 group-hover:filter-none group-hover:scale-105 transition-all duration-1000"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <span className="font-tech text-[9px] tracking-[0.25em] text-zinc-400 uppercase font-semibold block mb-1">
                MEMORY 04 // {memories[3].year} — {memories[3].location}
              </span>
              <h3 className="font-cinematic text-2xl text-white font-bold tracking-wide uppercase">
                {memories[3].title}
              </h3>
              <p className="font-body text-xs text-zinc-300 font-light mt-1">
                {memories[3].caption}
              </p>
            </div>
          </div>
        )}

        {memories[4] && (
          <div
            onClick={() => setActiveViewerIdx(4)}
            data-cursor="view"
            className="md:col-span-6 group relative h-[320px] sm:h-[380px] rounded-2xl overflow-hidden cursor-pointer border border-white/10 bg-zinc-950 transition-all duration-700 hover:border-white/40 shadow-xl"
          >
            <img
              src={memories[4].image}
              alt={memories[4].title}
              className="w-full h-full object-cover filter grayscale contrast-120 brightness-90 group-hover:filter-none group-hover:scale-105 transition-all duration-1000"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <span className="font-tech text-[9px] tracking-[0.25em] text-zinc-400 uppercase font-semibold block mb-1">
                MEMORY 05 // {memories[4].year} — {memories[4].location}
              </span>
              <h3 className="font-cinematic text-2xl text-white font-bold tracking-wide uppercase">
                {memories[4].title}
              </h3>
              <p className="font-body text-xs text-zinc-300 font-light mt-1">
                {memories[4].caption}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Cinematic Fullscreen Memory Viewer */}
      {activeViewerIdx !== null && activeItem && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[1500] flex items-center justify-center bg-black/95 backdrop-blur-2xl p-4 sm:p-8 select-none"
          onClick={() => setActiveViewerIdx(null)}
        >
          {/* Top Bar */}
          <div
            className="absolute top-0 inset-x-0 h-16 px-6 flex items-center justify-between border-b border-white/10"
            onClick={(e) => e.stopPropagation()}
          >
            <span className="font-tech text-xs tracking-widest text-zinc-400 uppercase">
              MEMORY 0{activeViewerIdx + 1} // {activeItem.year} — {activeItem.location}
            </span>
            <button
              type="button"
              onClick={() => setActiveViewerIdx(null)}
              className="p-2 text-zinc-400 hover:text-white transition-colors"
              aria-label="Close Viewer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Media & Caption */}
          <div
            className="relative max-w-5xl max-h-[80vh] w-full flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={activeItem.image}
              alt={activeItem.title}
              className="max-h-[65vh] max-w-full object-contain rounded-xl border border-white/15 shadow-2xl"
            />
            <div className="mt-4 text-center max-w-xl">
              <h3 className="font-cinematic text-2xl text-white font-bold tracking-cinematic uppercase">
                {activeItem.title}
              </h3>
              <p className="font-body text-sm text-zinc-300 font-light mt-1 leading-relaxed">
                {activeItem.caption}
              </p>
            </div>

            {/* Nav Arrows */}
            <button
              type="button"
              onClick={handlePrev}
              className="absolute left-2 sm:-left-12 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/60 border border-white/20 text-white"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              className="absolute right-2 sm:-right-12 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/60 border border-white/20 text-white"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </section>
  );
};
