import React, { useState } from "react";
import { FutureStage } from "../../data/birthdayData";
import { Compass, Flag, Sparkles } from "lucide-react";

interface Chapter07FutureProps {
  future: FutureStage[];
}

export const Chapter07Future: React.FC<Chapter07FutureProps> = ({ future }) => {
  const [activePhase, setActivePhase] = useState<string>(future[0]?.phase || "NOW");

  const currentStage = future.find((f) => f.phase === activePhase) || future[0];

  return (
    <section
      id="future"
      aria-label="Chapter 07 - The Future"
      className="relative min-h-screen w-full flex flex-col justify-center py-28 px-6 sm:px-12 max-w-7xl mx-auto overflow-hidden bg-[#050505] select-none"
    >
      {/* Chapter Marker */}
      <div className="mb-14 sm:mb-16">
        <div className="flex items-center gap-3 mb-3">
          <span className="w-8 h-[1px] bg-zinc-600" />
          <span className="font-tech text-xs tracking-[0.35em] text-zinc-400 uppercase font-semibold">
            07 // THE HORIZON
          </span>
        </div>
        <h2 className="font-cinematic text-3xl sm:text-5xl lg:text-6xl text-white font-extrabold tracking-cinematic uppercase">
          THE ROAD AHEAD
        </h2>
      </div>

      {/* Futuristic Thin Glowing Energy Line with 3 Points */}
      <div className="relative my-10 sm:my-14">
        {/* Background Line */}
        <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-zinc-800 -translate-y-1/2" />

        {/* 3 Points: NOW -> NEXT -> SOMEDAY */}
        <div className="relative flex justify-between items-center max-w-3xl mx-auto">
          {future.map((stage) => {
            const isActive = activePhase === stage.phase;
            return (
              <button
                key={stage.phase}
                type="button"
                onClick={() => setActivePhase(stage.phase)}
                className="group flex flex-col items-center focus:outline-none cursor-pointer"
              >
                {/* Point Dot */}
                <div
                  className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all duration-300 ${
                    isActive
                      ? "border-white bg-zinc-950 scale-125 shadow-[0_0_15px_rgba(255,255,255,0.8)]"
                      : "border-zinc-700 bg-zinc-900 group-hover:border-zinc-400"
                  }`}
                >
                  <div
                    className={`w-1.5 h-1.5 rounded-full transition-colors ${
                      isActive ? "bg-white" : "bg-transparent"
                    }`}
                  />
                </div>

                {/* Phase Label */}
                <span
                  className={`mt-4 font-tech text-xs sm:text-sm tracking-[0.3em] uppercase transition-colors ${
                    isActive ? "text-white font-bold" : "text-zinc-500 group-hover:text-zinc-300"
                  }`}
                >
                  {stage.phase}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Stage Detailed Breakdown (Editorial Canvas) */}
      {currentStage && (
        <div className="max-w-4xl mx-auto w-full mt-6 grid grid-cols-1 md:grid-cols-12 gap-8 border-t border-white/10 pt-10">
          <div className="md:col-span-7 space-y-6">
            <span className="font-tech text-xs tracking-widest text-zinc-400 uppercase font-semibold">
              FOCUS AREA // {currentStage.title}
            </span>

            {/* Strategic Objective */}
            <div className="flex items-start gap-4">
              <Flag className="w-4 h-4 text-zinc-400 mt-1 shrink-0" />
              <div>
                <span className="font-tech text-xs text-zinc-400 tracking-wider uppercase font-semibold block mb-1">
                  OBJECTIVE
                </span>
                <p className="font-body text-sm sm:text-base text-zinc-200 font-light leading-relaxed">
                  {currentStage.goal}
                </p>
              </div>
            </div>

            {/* The Dream */}
            <div className="flex items-start gap-4">
              <Sparkles className="w-4 h-4 text-zinc-400 mt-1 shrink-0" />
              <div>
                <span className="font-tech text-xs text-zinc-400 tracking-wider uppercase font-semibold block mb-1">
                  VISION
                </span>
                <p className="font-body text-sm sm:text-base text-zinc-200 font-light leading-relaxed">
                  {currentStage.dream}
                </p>
              </div>
            </div>

            {/* Destination */}
            <div className="flex items-start gap-4">
              <Compass className="w-4 h-4 text-zinc-400 mt-1 shrink-0" />
              <div>
                <span className="font-tech text-xs text-zinc-400 tracking-wider uppercase font-semibold block mb-1">
                  NEXT DESTINATION
                </span>
                <p className="font-body text-sm sm:text-base text-zinc-200 font-light leading-relaxed">
                  {currentStage.destination}
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Personal Manifesto */}
          <div className="md:col-span-5 flex flex-col justify-center border-l border-white/10 pl-0 md:pl-8">
            <span className="font-tech text-[10px] tracking-[0.3em] text-zinc-500 uppercase font-semibold mb-3">
              GUIDING PRINCIPLE
            </span>
            <p className="font-editorial italic text-lg sm:text-xl text-zinc-200 leading-relaxed">
              "{currentStage.personalMessage}"
            </p>
          </div>
        </div>
      )}
    </section>
  );
};
