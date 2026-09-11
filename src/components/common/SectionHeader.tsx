import React from "react";

interface SectionHeaderProps {
  number: string;
  title: string;
  subtitle?: string;
  tagline?: string;
  align?: "left" | "center" | "right";
  className?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  number,
  title,
  subtitle,
  tagline,
  align = "left",
  className = ""
}) => {
  const alignmentClasses = {
    left: "text-left items-start",
    center: "text-center items-center",
    right: "text-right items-end"
  };

  return (
    <header className={`flex flex-col ${alignmentClasses[align]} ${className} mb-12 md:mb-16`}>
      {/* Chapter / Reel index */}
      <div className="flex items-center gap-3 mb-3">
        <span className="inline-block w-6 h-[1px] bg-zinc-600" />
        <span className="font-tech text-xs tracking-[0.25em] text-zinc-400 uppercase font-semibold">
          {number}
        </span>
        {tagline && (
          <>
            <span className="text-zinc-700 text-xs">//</span>
            <span className="font-tech text-xs tracking-wider text-zinc-500 uppercase">
              {tagline}
            </span>
          </>
        )}
      </div>

      {/* Main Title */}
      <h2 className="font-cinematic text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white font-bold tracking-cinematic uppercase leading-tight relative">
        {title}
      </h2>

      {/* Subtle metallic divider line with light glint */}
      <div className="relative w-24 md:w-32 h-[1px] bg-gradient-to-r from-zinc-500 via-zinc-200 to-transparent my-4">
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-1.5 h-1.5 rotate-45 bg-[#d4af37]" />
      </div>

      {/* Subtitle */}
      {subtitle && (
        <p className="font-body text-zinc-400 text-sm sm:text-base md:text-lg max-w-2xl font-light leading-relaxed">
          {subtitle}
        </p>
      )}
    </header>
  );
};
