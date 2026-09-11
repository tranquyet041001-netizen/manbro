import React, { useEffect, useRef, useState } from "react";
import { BirthdayData } from "../../data/birthdayData";

interface ChapterIntroProps {
  data: BirthdayData;
}

export const ChapterIntro: React.FC<ChapterIntroProps> = ({ data }) => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.25 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="intro"
      aria-label="Chapter Introduction"
      className="relative min-h-[85vh] w-full flex items-center justify-center py-20 px-6 overflow-hidden select-none"
    >
      {/* Subtle background ambient glow */}
      <div className="absolute w-[600px] h-[600px] bg-zinc-900/30 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Watermark Numeral in Background */}
      <div
        className={`absolute inset-0 flex items-center justify-center pointer-events-none -z-10 transition-all duration-1000 ${
          isVisible ? "opacity-15 scale-100" : "opacity-0 scale-90"
        }`}
        aria-hidden="true"
      >
        <span className="font-cinematic text-[22vw] font-black text-white/10 select-none">
          {data.age}
        </span>
      </div>

      <div className="max-w-4xl w-full mx-auto flex flex-col items-center text-center">
        {/* Section Marker */}
        <div
          className={`flex items-center gap-3 mb-6 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <span className="w-6 h-[1px] bg-zinc-600" />
          <span className="font-tech text-xs tracking-[0.3em] text-[#d4af37] uppercase font-semibold">
            02 // THE PHILOSOPHY
          </span>
          <span className="w-6 h-[1px] bg-zinc-600" />
        </div>

        {/* Large Typography Statement */}
        <h2
          className={`font-cinematic text-3xl sm:text-4xl md:text-6xl text-white font-bold tracking-cinematic uppercase leading-tight transition-all duration-1000 delay-150 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          A NEW YEAR.
          <br />
          <span className="text-zinc-400">A NEW CHAPTER.</span>
        </h2>

        {/* Subtle Horizontal Divider */}
        <div
          className={`w-20 h-[1px] bg-zinc-600 my-8 transition-all duration-700 delay-300 ${
            isVisible ? "w-20 opacity-100" : "w-0 opacity-0"
          }`}
        />

        {/* Emotional Paragraph with Staggered Lines */}
        <div
          className={`font-body text-base sm:text-xl md:text-2xl text-zinc-300 max-w-2xl font-light leading-relaxed transition-all duration-1000 delay-500 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <p className="mb-4">
            Another year has passed. Not everything went according to plan.
          </p>
          <p className="text-zinc-400">
            But every step, every mistake, every victory has shaped the person standing here today.
          </p>
        </div>

        {/* Cinematic Chapter Signature Stamp */}
        <div
          className={`mt-10 inline-flex items-center gap-3 px-5 py-2 rounded-full border border-zinc-800 bg-zinc-900/40 text-xs font-tech text-zinc-500 tracking-widest uppercase transition-all duration-700 delay-700 ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          <span>CHAPTER {data.age}</span>
          <span>•</span>
          <span>WRITTEN IN UNCOMPROMISED CHARACTER</span>
        </div>
      </div>
    </section>
  );
};
