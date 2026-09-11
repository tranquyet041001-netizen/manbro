import React, { useEffect, useRef, useState } from "react";
import { AchievementItem } from "../../data/birthdayData";
import { SectionHeader } from "../common/SectionHeader";

interface AchievementsProps {
  achievements: AchievementItem[];
}

export const Achievements: React.FC<AchievementsProps> = ({ achievements }) => {
  const [hasAnimated, setHasAnimated] = useState(false);
  const [counts, setCounts] = useState<{ [id: string]: number }>({});
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  useEffect(() => {
    if (!hasAnimated) return;

    // Number ticker animation loop
    const duration = 1600; // ms
    const startTime = performance.now();

    const updateCounters = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);

      const nextCounts: { [id: string]: number } = {};
      achievements.forEach((item) => {
        if (item.numericTarget !== undefined) {
          nextCounts[item.id] = Math.round(item.numericTarget * eased);
        }
      });
      setCounts(nextCounts);

      if (progress < 1) {
        requestAnimationFrame(updateCounters);
      }
    };

    requestAnimationFrame(updateCounters);
  }, [hasAnimated, achievements]);

  return (
    <section
      ref={sectionRef}
      id="achievements"
      aria-label="Achievements & Milestones"
      className="relative w-full py-24 px-4 sm:px-8 max-w-7xl mx-auto"
    >
      <SectionHeader
        number="06 / METRICS"
        title="WHAT YOU'VE BUILT"
        subtitle="Tangible milestones, horizons traversed, and the quiet persistence of everyday consistency."
        tagline="RECORD OF ACHIEVEMENT"
        align="left"
      />

      {/* Grid of Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
        {achievements.map((item) => {
          const displayValue =
            item.numericTarget !== undefined
              ? (counts[item.id] !== undefined ? counts[item.id] : 0) + (item.suffix || "")
              : item.value;

          return (
            <div
              key={item.id}
              className="glass-card rounded-2xl p-6 sm:p-8 border border-white/10 flex flex-col justify-between relative overflow-hidden transition-all duration-300 hover:border-white/20"
            >
              {/* Stat Value */}
              <div className="mb-4">
                <span
                  className="font-cinematic text-5xl sm:text-6xl md:text-7xl font-extrabold text-white tracking-tight"
                  style={{
                    textShadow: "0 0 30px rgba(255, 255, 255, 0.15)"
                  }}
                >
                  {displayValue}
                </span>
              </div>

              {/* Metric Label & Description */}
              <div>
                <h3 className="font-tech text-xs sm:text-sm text-[#d4af37] font-semibold tracking-[0.2em] uppercase mb-2">
                  {item.label}
                </h3>
                <p className="font-body text-xs sm:text-sm text-zinc-400 font-light leading-relaxed">
                  {item.description}
                </p>
              </div>

              {/* Corner Coordinate Tick */}
              <div className="absolute top-3 right-3 font-tech text-[9px] text-zinc-600 tracking-widest uppercase">
                LOG // {item.id.toUpperCase()}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
