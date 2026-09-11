import React, { useState } from "react";
import { ArrowRight, Compass, Flag, Sparkles, Navigation } from "lucide-react";
import { FutureStage } from "../../data/birthdayData";
import { SectionHeader } from "../common/SectionHeader";

interface FutureSectionProps {
  futureStages: FutureStage[];
}

export const FutureSection: React.FC<FutureSectionProps> = ({ futureStages }) => {
  const [activeStageId, setActiveStageId] = useState<string>(futureStages[0]?.id || "f1");

  return (
    <section
      id="future"
      aria-label="The Future Roadmap"
      className="relative w-full py-28 px-4 sm:px-8 max-w-7xl mx-auto overflow-hidden"
    >
      <SectionHeader
        number="08 / THE HORIZON"
        title="WHAT COMES NEXT?"
        subtitle="Uncharted territory. A strategic continuum from who you are today to the legacy you will build tomorrow."
        tagline="UNWRITTEN CHAPTERS"
        align="left"
      />

      {/* Horizon Stage Indicator Tabs / Beam */}
      <div className="relative mb-12 sm:mb-16">
        {/* Glowing Beam */}
        <div className="hidden md:block absolute top-1/2 left-0 right-0 h-[1px] bg-gradient-to-r from-zinc-800 via-[#d4af37]/50 to-zinc-800 -translate-y-1/2 -z-10" />

        <div className="grid grid-cols-3 gap-3 sm:gap-6">
          {futureStages.map((stage, idx) => {
            const isActive = activeStageId === stage.id;
            return (
              <button
                key={stage.id}
                type="button"
                onClick={() => setActiveStageId(stage.id)}
                className={`relative p-4 sm:p-6 rounded-2xl border text-left transition-all duration-500 cursor-pointer ${
                  isActive
                    ? "bg-gradient-to-b from-zinc-800/90 to-zinc-950 border-[#d4af37] shadow-[0_0_30px_rgba(212,175,55,0.2)] scale-[1.02]"
                    : "glass-card border-white/10 opacity-70 hover:opacity-100 hover:border-white/25"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-tech text-[10px] sm:text-xs text-zinc-500 tracking-widest uppercase">
                    PHASE 0{idx + 1}
                  </span>
                  {isActive && (
                    <span className="w-2 h-2 rounded-full bg-[#d4af37] animate-ping" />
                  )}
                </div>

                <h3 className="font-cinematic text-lg sm:text-2xl text-white font-bold tracking-cinematic uppercase">
                  {stage.phase}
                </h3>

                <p className="font-tech text-[10px] sm:text-xs text-[#d4af37] tracking-wider uppercase mt-1 truncate">
                  {stage.title}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Stage Detailed Breakdown */}
      {futureStages.map((stage) => {
        if (stage.id !== activeStageId) return null;

        return (
          <div
            key={stage.id}
            className="glass-card rounded-3xl p-6 sm:p-10 md:p-14 border border-white/15 relative overflow-hidden transition-all duration-700 bg-gradient-to-br from-zinc-900/60 via-zinc-950/80 to-[#050507]"
          >
            {/* Ambient Corner Flare */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#d4af37]/5 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-center">
              {/* Left Column: Scope & Focus */}
              <div className="lg:col-span-7 space-y-8">
                <div>
                  <div className="inline-flex items-center gap-2 font-tech text-xs text-[#d4af37] tracking-widest uppercase mb-2">
                    <Navigation className="w-3.5 h-3.5" />
                    <span>{stage.period}</span>
                  </div>
                  <h4 className="font-cinematic text-3xl sm:text-4xl text-white font-bold tracking-cinematic uppercase">
                    {stage.title}
                  </h4>
                </div>

                {/* Strategic Targets */}
                <div className="space-y-6">
                  {/* Primary Goal */}
                  <div className="flex items-start gap-4">
                    <div className="p-2.5 rounded-xl bg-zinc-900 border border-white/10 text-[#d4af37] mt-1 shrink-0">
                      <Flag className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="font-tech text-xs tracking-widest text-zinc-400 uppercase font-semibold block mb-1">
                        STRATEGIC OBJECTIVE
                      </span>
                      <p className="font-body text-base text-zinc-200 font-light leading-relaxed">
                        {stage.goal}
                      </p>
                    </div>
                  </div>

                  {/* The Dream */}
                  <div className="flex items-start gap-4">
                    <div className="p-2.5 rounded-xl bg-zinc-900 border border-white/10 text-[#d4af37] mt-1 shrink-0">
                      <Sparkles className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="font-tech text-xs tracking-widest text-zinc-400 uppercase font-semibold block mb-1">
                        THE LONG-RANGE DREAM
                      </span>
                      <p className="font-body text-base text-zinc-200 font-light leading-relaxed">
                        {stage.dream}
                      </p>
                    </div>
                  </div>

                  {/* Destination */}
                  <div className="flex items-start gap-4">
                    <div className="p-2.5 rounded-xl bg-zinc-900 border border-white/10 text-[#d4af37] mt-1 shrink-0">
                      <Compass className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="font-tech text-xs tracking-widest text-zinc-400 uppercase font-semibold block mb-1">
                        NEXT DESTINATION
                      </span>
                      <p className="font-body text-base text-zinc-200 font-light leading-relaxed">
                        {stage.destination}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Personal Manifesto Quote */}
              <div className="lg:col-span-5 flex flex-col justify-center">
                <div className="p-8 rounded-2xl bg-zinc-950/80 border border-white/10 relative">
                  <span className="font-cinematic text-6xl text-white/10 font-black absolute top-2 left-4 select-none">
                    “
                  </span>
                  <div className="relative z-10 pt-4">
                    <span className="font-tech text-[10px] tracking-[0.3em] text-[#d4af37] uppercase font-semibold block mb-3">
                      CORE MANIFESTO
                    </span>
                    <p className="font-editorial italic text-lg sm:text-xl text-zinc-200 leading-relaxed">
                      "{stage.personalMessage}"
                    </p>
                    <div className="w-12 h-[1px] bg-zinc-700 mt-6 mb-3" />
                    <span className="font-tech text-xs text-zinc-500 tracking-widest uppercase">
                      GUIDING PRINCIPLE
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </section>
  );
};
