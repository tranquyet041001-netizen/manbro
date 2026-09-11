import React, { useEffect, useRef, useState } from "react";
import { BirthdayData } from "../../data/birthdayData";
import { RotateCcw } from "lucide-react";

interface FinaleSceneProps {
  data: BirthdayData;
  onReplay: () => void;
}

export const FinaleScene: React.FC<FinaleSceneProps> = ({ data, onReplay }) => {
  const [inView, setInView] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      { threshold: 0.25 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="finale"
      aria-label="Final Cinematic Scene"
      className="relative min-h-screen w-full flex flex-col justify-between items-center text-center px-6 py-28 bg-[#050505] overflow-hidden select-none"
    >
      {/* Subtle Horizontal Flare */}
      <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-y-1/2 pointer-events-none animate-flare-scan" />

      {/* Empty Top Space for Movie Pacing */}
      <div className="h-10" />

      {/* Climax Staggered Sequential Reveals */}
      <div className="my-auto max-w-4xl flex flex-col items-center">
        {/* Step 1: DON'T JUST COUNT THE YEARS. */}
        <h3
          className={`font-cinematic text-3xl sm:text-5xl md:text-6xl text-zinc-500 font-bold tracking-cinematic uppercase transition-all duration-1000 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          DON'T JUST
          <br />
          COUNT THE YEARS.
        </h3>

        {/* Step 2: MAKE THEM COUNT. (Pause) */}
        <h2
          className={`font-cinematic text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-white font-extrabold tracking-cinematic uppercase mt-6 sm:mt-10 transition-all duration-1000 delay-500 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
          style={{ textShadow: "0 0 50px rgba(255,255,255,0.2)" }}
        >
          MAKE
          <br />
          THEM COUNT.
        </h2>

        {/* Step 3: HAPPY BIRTHDAY, [NAME]. */}
        <p
          className={`font-tech text-base sm:text-xl md:text-2xl text-zinc-300 tracking-[0.3em] uppercase font-semibold mt-10 sm:mt-14 transition-all duration-1000 delay-1000 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          HAPPY BIRTHDAY, {data.name}.
        </p>

        {/* Step 4: CHAPTER [AGE] BEGINS NOW. */}
        <p
          className={`font-tech text-xs sm:text-sm text-zinc-500 tracking-[0.25em] uppercase mt-3 transition-all duration-1000 delay-1200 ${
            inView ? "opacity-100" : "opacity-0"
          }`}
        >
          CHAPTER {data.age} BEGINS NOW.
        </p>

        {/* Ending Interaction: REPLAY EXPERIENCE */}
        <div
          className={`mt-16 sm:mt-20 transition-all duration-1000 delay-1500 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <button
            type="button"
            onClick={onReplay}
            className="group px-8 py-3 rounded-full border border-white/20 hover:border-white text-zinc-300 hover:text-white font-tech text-xs tracking-[0.3em] uppercase transition-all duration-300 flex items-center gap-2.5 hover:bg-white/5"
          >
            <RotateCcw className="w-3.5 h-3.5 group-hover:-rotate-90 transition-transform duration-500" />
            <span>REPLAY EXPERIENCE</span>
          </button>
        </div>
      </div>

      {/* Production Signature */}
      <footer className="text-[10px] font-tech text-zinc-700 tracking-[0.35em] uppercase">
        ARCHIVED FOR {data.fullName} // {data.dateStamp}
      </footer>
    </section>
  );
};
