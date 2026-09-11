import React, { useState } from "react";
import { MapPin, Calendar, ArrowRight, Compass } from "lucide-react";
import { TimelineItem } from "../../data/birthdayData";
import { SectionHeader } from "../common/SectionHeader";

interface JourneyTimelineProps {
  timeline: TimelineItem[];
}

export const JourneyTimeline: React.FC<JourneyTimelineProps> = ({ timeline }) => {
  const [activeIndex, setActiveIndex] = useState(timeline.length - 1); // Default to current milestone

  return (
    <section
      id="journey"
      aria-label="The Journey Timeline"
      className="relative w-full py-24 px-4 sm:px-8 max-w-7xl mx-auto overflow-hidden"
    >
      <SectionHeader
        number="03 / THE JOURNEY"
        title="THE JOURNEY"
        subtitle="Some moments become memories. Some memories become who we are."
        tagline="ARCHIVE OF MILESTONES"
        align="left"
      />

      {/* Desktop Interactive Cinematic Timeline */}
      <div className="hidden lg:block">
        {/* Year Selector Scrub Bar */}
        <div className="relative mb-14 px-8">
          {/* Connecting Line */}
          <div className="absolute top-1/2 left-8 right-8 h-[2px] -translate-y-1/2 bg-zinc-800" />
          
          {/* Glowing Active Progress Beam */}
          <div
            className="absolute top-1/2 left-8 h-[2px] -translate-y-1/2 bg-gradient-to-r from-zinc-600 via-[#d4af37] to-[#d4af37] transition-all duration-500"
            style={{
              width: `${(activeIndex / (timeline.length - 1)) * 100}%`
            }}
          />

          <div className="relative flex justify-between items-center">
            {timeline.map((item, index) => {
              const isActive = activeIndex === index;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  className="group flex flex-col items-center focus:outline-none cursor-pointer"
                >
                  <div
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                      isActive
                        ? "bg-zinc-950 border-[#d4af37] scale-125 shadow-[0_0_15px_rgba(212,175,55,0.6)]"
                        : "bg-zinc-900 border-zinc-700 group-hover:border-zinc-400 group-hover:scale-110"
                    }`}
                  >
                    <div
                      className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                        isActive ? "bg-[#d4af37]" : "bg-transparent group-hover:bg-zinc-500"
                      }`}
                    />
                  </div>

                  <span
                    className={`mt-3 font-tech text-xs tracking-widest uppercase transition-colors duration-300 ${
                      isActive ? "text-[#d4af37] font-bold" : "text-zinc-500 group-hover:text-zinc-300"
                    }`}
                  >
                    {item.year}
                  </span>
                  <span className="text-[10px] font-tech text-zinc-600">
                    AGE {item.age}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Milestone Feature Presentation */}
        {timeline[activeIndex] && (
          <div className="glass-card rounded-2xl overflow-hidden border border-white/10 p-2 grid grid-cols-12 gap-8 items-center shadow-2xl transition-all duration-700">
            {/* Visual Frame */}
            <div className="col-span-6 h-[420px] rounded-xl overflow-hidden relative border border-white/10 group">
              <img
                src={timeline[activeIndex].image}
                alt={timeline[activeIndex].title}
                className="w-full h-full object-cover filter grayscale contrast-110 brightness-90 group-hover:filter-none group-hover:scale-105 transition-all duration-700"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              {/* Location Badge */}
              {timeline[activeIndex].location && (
                <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/70 border border-white/10 font-tech text-[10px] tracking-widest text-zinc-300 uppercase backdrop-blur-md">
                  <MapPin className="w-3 h-3 text-[#d4af37]" />
                  <span>{timeline[activeIndex].location}</span>
                </div>
              )}

              {/* Year Stamp */}
              <div className="absolute bottom-4 right-4 font-cinematic text-5xl font-black text-white/20 select-none">
                {timeline[activeIndex].year}
              </div>
            </div>

            {/* Narrative Content */}
            <div className="col-span-6 pr-8 flex flex-col justify-center">
              <div className="inline-flex items-center gap-2 font-tech text-xs text-[#d4af37] tracking-[0.25em] uppercase font-semibold mb-2">
                <Calendar className="w-3.5 h-3.5" />
                <span>CHAPTER MILESTONE // AGE {timeline[activeIndex].age}</span>
              </div>

              <h3 className="font-cinematic text-3xl sm:text-4xl text-white font-bold tracking-cinematic uppercase leading-tight mb-2">
                {timeline[activeIndex].title}
              </h3>

              <p className="font-tech text-xs tracking-wider text-zinc-400 uppercase mb-6">
                "{timeline[activeIndex].tagline}"
              </p>

              <div className="w-16 h-[1px] bg-zinc-700 mb-6" />

              <p className="font-body text-base text-zinc-300 font-light leading-relaxed mb-8">
                {timeline[activeIndex].description}
              </p>

              <div className="flex items-center gap-4">
                <button
                  type="button"
                  onClick={() => setActiveIndex(Math.max(0, activeIndex - 1))}
                  disabled={activeIndex === 0}
                  className="px-4 py-2 rounded-lg font-tech text-xs tracking-wider uppercase border border-zinc-700 text-zinc-300 disabled:opacity-30 hover:border-white transition-colors"
                >
                  PREVIOUS
                </button>
                <button
                  type="button"
                  onClick={() => setActiveIndex(Math.min(timeline.length - 1, activeIndex + 1))}
                  disabled={activeIndex === timeline.length - 1}
                  className="px-4 py-2 rounded-lg font-tech text-xs tracking-wider uppercase bg-white/10 border border-white/20 text-white disabled:opacity-30 hover:bg-white/20 transition-colors flex items-center gap-2"
                >
                  <span>NEXT MILESTONE</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Mobile & Tablet Vertical Timeline Layout */}
      <div className="lg:hidden relative pl-6 border-l border-zinc-800 space-y-12">
        {timeline.map((item, index) => (
          <div key={item.id} className="relative group">
            {/* Timeline Node */}
            <div className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-zinc-950 border-2 border-[#d4af37] flex items-center justify-center">
              <div className="w-1.5 h-1.5 rounded-full bg-[#d4af37]" />
            </div>

            <div className="glass-card rounded-xl p-4 sm:p-6 border border-white/10">
              <div className="flex items-center justify-between mb-2">
                <span className="font-cinematic text-2xl text-white font-bold tracking-wider">
                  {item.year}
                </span>
                <span className="font-tech text-xs text-[#d4af37] tracking-widest font-semibold">
                  AGE {item.age}
                </span>
              </div>

              <h4 className="font-cinematic text-lg sm:text-xl text-zinc-100 font-bold tracking-wide uppercase mb-1">
                {item.title}
              </h4>

              <p className="font-tech text-[11px] text-zinc-400 uppercase tracking-wider mb-4">
                "{item.tagline}"
              </p>

              {/* Photo preview */}
              <div className="w-full h-44 sm:h-52 rounded-lg overflow-hidden relative mb-4 border border-white/10">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover filter grayscale contrast-110 brightness-90 group-hover:filter-none transition-all duration-500"
                  loading="lazy"
                />
                {item.location && (
                  <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-black/70 font-tech text-[9px] text-zinc-300 uppercase tracking-widest">
                    {item.location}
                  </div>
                )}
              </div>

              <p className="font-body text-sm text-zinc-300 font-light leading-relaxed">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
