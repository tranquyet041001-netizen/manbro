import React, { useEffect, useRef, useState } from "react";
import { BirthdayData } from "../../data/birthdayData";

interface Chapter01YearProps {
  data: BirthdayData;
}

export const Chapter01Year: React.FC<Chapter01YearProps> = ({ data }) => {
  const [inView, setInView] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="year"
      aria-label="Chapter 01 - The Year"
      className="relative min-h-screen w-full flex items-center justify-center px-6 py-28 overflow-hidden select-none bg-[#050505]"
    >
      {/* Huge Background Watermark Numeral */}
      <div
        className={`absolute inset-0 flex items-center justify-center pointer-events-none transition-all duration-1000 ${
          inView ? "opacity-10 scale-100" : "opacity-0 scale-95"
        }`}
        aria-hidden="true"
      >
        <span className="font-cinematic text-[30vw] font-black text-white/5 select-none leading-none">
          {data.theYear.numeral}
        </span>
      </div>

      <div className="max-w-4xl w-full mx-auto flex flex-col items-center text-center relative z-10">
        {/* Chapter Subtitle */}
        <div
          className={`flex items-center gap-3 mb-10 transition-all duration-700 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <span className="w-8 h-[1px] bg-zinc-700" />
          <span className="font-tech text-xs tracking-[0.35em] text-zinc-400 uppercase font-semibold">
            01 // THE YEAR
          </span>
          <span className="w-8 h-[1px] bg-zinc-700" />
        </div>

        {/* Independent Cinematic Sentence Reveals */}
        <div className="space-y-6 sm:space-y-8">
          {/* Sentence 1: ANOTHER YEAR. */}
          <h2
            className={`font-cinematic text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-white font-extrabold tracking-cinematic uppercase transition-all duration-1000 delay-150 ${
              inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            {data.theYear.quote1}
          </h2>

          {/* Sentence 2: ANOTHER CHAPTER. */}
          <h2
            className={`font-cinematic text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-zinc-400 font-bold tracking-cinematic uppercase transition-all duration-1000 delay-500 ${
              inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            {data.theYear.quote2}
          </h2>

          {/* Sentence 3: ANOTHER VERSION OF YOU. */}
          <h2
            className={`font-cinematic text-3xl sm:text-5xl md:text-6xl lg:text-7xl text-zinc-300 font-semibold tracking-cinematic uppercase transition-all duration-1000 delay-900 ${
              inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            {data.theYear.quote3}
          </h2>
        </div>

        {/* Subtle Bottom Accent Line */}
        <div
          className={`w-24 h-[1px] bg-gradient-to-r from-transparent via-zinc-500 to-transparent mt-16 transition-all duration-1000 delay-1000 ${
            inView ? "w-24 opacity-100" : "w-0 opacity-0"
          }`}
        />
      </div>
    </section>
  );
};
