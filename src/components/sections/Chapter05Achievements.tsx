import React, { useEffect, useRef, useState } from "react";
import { AchievementItem } from "../../data/birthdayData";

interface Chapter05AchievementsProps {
  achievements: AchievementItem[];
}

export const Chapter05Achievements: React.FC<Chapter05AchievementsProps> = ({ achievements }) => {
  const [inView, setInView] = useState(false);
  const [animatedCounts, setAnimatedCounts] = useState<{ [id: string]: number }>({});
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !inView) {
          setInView(true);
        }
      },
      { threshold: 0.25 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [inView]);

  useEffect(() => {
    if (!inView) return;

    const duration = 1800; // ms
    const start = performance.now();

    const frame = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);

      const nextCounts: { [id: string]: number } = {};
      achievements.forEach((a) => {
        if (a.numericTarget !== undefined) {
          nextCounts[a.id] = Math.round(a.numericTarget * eased);
        }
      });
      setAnimatedCounts(nextCounts);

      if (progress < 1) requestAnimationFrame(frame);
    };

    requestAnimationFrame(frame);
  }, [inView, achievements]);

  return (
    <section
      ref={sectionRef}
      id="achievements"
      aria-label="Chapter 05 - Record of Achievements"
      className="relative min-h-screen w-full flex flex-col justify-center py-28 px-6 sm:px-12 max-w-7xl mx-auto overflow-hidden bg-[#050505] select-none"
    >
      {/* Chapter Marker */}
      <div className="mb-16 sm:mb-20">
        <div className="flex items-center gap-3 mb-3">
          <span className="w-8 h-[1px] bg-zinc-600" />
          <span className="font-tech text-xs tracking-[0.35em] text-zinc-400 uppercase font-semibold">
            05 // THE RECORD
          </span>
        </div>
        <h2 className="font-cinematic text-3xl sm:text-5xl text-white font-extrabold tracking-cinematic uppercase">
          WHAT TIME HAS PROVED
        </h2>
      </div>

      {/* Editorial Monumental Stats Stack (Canvas Style, NOT Cards) */}
      <div className="space-y-16 sm:space-y-24">
        {achievements.map((item, idx) => {
          const displayVal =
            item.numericTarget !== undefined
              ? (animatedCounts[item.id] !== undefined
                  ? animatedCounts[item.id].toLocaleString()
                  : 0) + (item.suffix || "")
              : item.value;

          return (
            <div
              key={item.id}
              className={`flex flex-col md:flex-row md:items-baseline justify-between border-b border-white/10 pb-8 transition-all duration-1000 ${
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: `${idx * 250}ms` }}
            >
              {/* Massive Numeral */}
              <div className="font-cinematic text-7xl sm:text-9xl md:text-[10rem] font-black text-white leading-none tracking-tighter">
                {displayVal}
              </div>

              {/* Label & Meaning */}
              <div className="mt-4 md:mt-0 text-left md:text-right max-w-sm">
                <span className="font-tech text-sm sm:text-base text-zinc-300 tracking-[0.25em] uppercase font-semibold block mb-1">
                  {item.label}
                </span>
                <p className="font-body text-xs sm:text-sm text-zinc-500 font-light">
                  {item.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
