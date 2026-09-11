import React from "react";
import { Shield, Target, Anchor, Flame, Users, Sparkles, Compass } from "lucide-react";
import { ValueItem } from "../../data/birthdayData";
import { SectionHeader } from "../common/SectionHeader";

interface ValuesSectionProps {
  values: ValueItem[];
}

export const ValuesSection: React.FC<ValuesSectionProps> = ({ values }) => {
  const getIcon = (name: string) => {
    switch (name) {
      case "courage":
        return <Shield className="w-6 h-6 text-[#d4af37]" />;
      case "discipline":
        return <Flame className="w-6 h-6 text-zinc-300" />;
      case "loyalty":
        return <Anchor className="w-6 h-6 text-zinc-300" />;
      case "ambition":
        return <Target className="w-6 h-6 text-[#d4af37]" />;
      case "family":
        return <Users className="w-6 h-6 text-zinc-300" />;
      case "dreams":
        return <Compass className="w-6 h-6 text-[#d4af37]" />;
      default:
        return <Shield className="w-6 h-6 text-zinc-300" />;
    }
  };

  return (
    <section
      id="values"
      aria-label="The Man Behind The Years"
      className="relative w-full py-24 px-4 sm:px-8 max-w-7xl mx-auto"
    >
      <SectionHeader
        number="05 / THE FOUNDATION"
        title="MORE THAN A NUMBER"
        subtitle="The quiet codes, unwavering principles, and inner disciplines that define the man you've become."
        tagline="INTERNAL COMPASS"
        align="left"
      />

      {/* Grid of Masculine Virtues */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {values.map((v) => (
          <div
            key={v.id}
            className="group glass-card rounded-2xl p-6 sm:p-8 border border-white/10 relative overflow-hidden transition-all duration-500 hover:border-[#d4af37]/40 hover:-translate-y-1.5"
          >
            {/* Top Index & Minimal Icon */}
            <div className="flex items-center justify-between mb-6">
              <span className="font-tech text-xs tracking-widest text-zinc-500 uppercase font-semibold">
                PILLAR // {v.number}
              </span>
              <div className="p-2.5 rounded-xl bg-zinc-900/80 border border-white/10 group-hover:border-[#d4af37]/40 transition-colors">
                {getIcon(v.iconName)}
              </div>
            </div>

            {/* Pillar Title */}
            <h3 className="font-cinematic text-xl sm:text-2xl text-white font-bold tracking-cinematic uppercase mb-2">
              {v.title}
            </h3>

            {/* Subtitle */}
            <p className="font-tech text-xs tracking-wider text-[#d4af37] uppercase mb-4 opacity-90">
              {v.subtitle}
            </p>

            {/* Subtle Divider */}
            <div className="w-12 h-[1px] bg-zinc-700 mb-4 group-hover:w-20 group-hover:bg-[#d4af37]/60 transition-all duration-500" />

            {/* Description */}
            <p className="font-body text-sm sm:text-base text-zinc-300 font-light leading-relaxed">
              {v.description}
            </p>

            {/* Subtle background number watermark */}
            <div className="absolute -bottom-4 -right-2 font-cinematic text-7xl font-black text-white/[0.03] select-none pointer-events-none group-hover:text-white/[0.06] transition-colors">
              {v.number}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
