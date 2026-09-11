import React, { useState } from "react";
import { ValueItem } from "../../data/birthdayData";

interface Chapter04TheManProps {
  values: ValueItem[];
}

export const Chapter04TheMan: React.FC<Chapter04TheManProps> = ({ values }) => {
  const [activeIdx, setActiveIdx] = useState<number>(0);

  const activeValue = values[activeIdx] || values[0];

  return (
    <section
      id="theman"
      aria-label="Chapter 04 - The Man"
      className="relative min-h-screen w-full flex flex-col justify-between py-24 px-6 sm:px-12 max-w-7xl mx-auto overflow-hidden bg-[#050505] select-none"
    >
      {/* Top Header */}
      <div>
        <div className="flex items-center gap-3 mb-3">
          <span className="w-8 h-[1px] bg-zinc-600" />
          <span className="font-tech text-xs tracking-[0.35em] text-zinc-400 uppercase font-semibold">
            04 // THE MAN
          </span>
        </div>
        <div className="space-y-1">
          <h2 className="font-cinematic text-3xl sm:text-5xl md:text-6xl text-zinc-500 font-bold tracking-cinematic uppercase">
            MORE
          </h2>
          <h2 className="font-cinematic text-3xl sm:text-5xl md:text-6xl text-zinc-300 font-extrabold tracking-cinematic uppercase">
            THAN
          </h2>
          <h2 className="font-cinematic text-3xl sm:text-5xl md:text-6xl text-white font-black tracking-cinematic uppercase">
            A NUMBER.
          </h2>
        </div>
      </div>

      {/* Center Stage: Giant Word Dominance Transition (Like High-Fashion Editorial) */}
      <div className="my-auto py-12 flex flex-col items-center text-center relative">
        {/* Background Ghost Words */}
        <div className="flex flex-wrap justify-center gap-4 sm:gap-8 mb-6 opacity-30">
          {values.map((v, i) => (
            <button
              key={v.id}
              type="button"
              onClick={() => setActiveIdx(i)}
              className={`font-cinematic text-xs sm:text-sm tracking-[0.3em] uppercase transition-all duration-500 ${
                activeIdx === i
                  ? "text-white font-bold underline underline-offset-8"
                  : "text-zinc-600 hover:text-zinc-400"
              }`}
            >
              {v.title}
            </button>
          ))}
        </div>

        {/* The Dominant Giant Characteristic */}
        <div className="relative overflow-hidden py-4 sm:py-6">
          <h3
            key={activeValue.id}
            className="font-cinematic text-5xl sm:text-7xl md:text-8xl lg:text-9xl text-white font-black tracking-cinematic uppercase transition-all duration-700 transform animate-fade-in"
            style={{
              textShadow: "0 0 50px rgba(255, 255, 255, 0.2)"
            }}
          >
            {activeValue.title}
          </h3>
        </div>

        {/* Subtitle & Intimate Editorial Description Underneath */}
        <div className="max-w-xl mx-auto mt-6">
          <p className="font-tech text-xs tracking-[0.3em] text-zinc-400 uppercase font-semibold mb-3">
            {activeValue.subtitle}
          </p>
          <div className="w-16 h-[1px] bg-zinc-700 mx-auto mb-4" />
          <p className="font-body text-base sm:text-lg text-zinc-300 font-light leading-relaxed">
            {activeValue.description}
          </p>
        </div>
      </div>

      {/* Bottom Selector Track */}
      <div className="flex justify-between items-center border-t border-white/10 pt-6">
        <span className="font-tech text-xs text-zinc-500 tracking-widest uppercase">
          VIRTUE 0{activeIdx + 1} OF 0{values.length}
        </span>

        <div className="flex items-center gap-2">
          {values.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActiveIdx(i)}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                activeIdx === i ? "w-8 bg-white" : "w-2 bg-zinc-800 hover:bg-zinc-600"
              }`}
              aria-label={`Select ${values[i].title}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
