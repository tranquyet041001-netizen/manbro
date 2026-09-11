import React, { useEffect, useRef, useState } from "react";
import { BirthdayData } from "../../data/birthdayData";

interface Chapter08NextChapterProps {
  data: BirthdayData;
}

export const Chapter08NextChapter: React.FC<Chapter08NextChapterProps> = ({ data }) => {
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

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="nextchapter"
      aria-label="Chapter 08 - The Next Chapter"
      className="relative min-h-screen w-full flex flex-col justify-center items-center py-28 px-6 sm:px-12 bg-[#050505] select-none text-center overflow-hidden"
    >
      {/* Light sweep pass */}
      <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-y-1/2 pointer-events-none animate-flare-scan" />

      <div className="max-w-4xl mx-auto flex flex-col items-center relative z-10">
        {/* Transforming Giant Numeral */}
        <div
          className={`font-cinematic text-8xl sm:text-[12rem] md:text-[16rem] font-black text-white leading-none tracking-tighter transition-all duration-1000 ${
            inView ? "opacity-100 scale-100" : "opacity-0 scale-90"
          }`}
          style={{
            textShadow: "0 0 60px rgba(255,255,255,0.2)"
          }}
        >
          {data.age}
        </div>

        {/* Transformation Line 1: CHAPTER 25 */}
        <h2
          className={`font-cinematic text-4xl sm:text-6xl md:text-7xl text-zinc-300 font-extrabold tracking-cinematic uppercase mt-6 transition-all duration-1000 delay-300 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {data.hero.subtitle}
        </h2>

        {/* Transformation Line 2: BEGINS NOW. */}
        <h3
          className={`font-cinematic text-3xl sm:text-5xl md:text-6xl text-white font-black tracking-cinematic uppercase mt-2 transition-all duration-1000 delay-700 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          BEGINS NOW.
        </h3>
      </div>
    </section>
  );
};
