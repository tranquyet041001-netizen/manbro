import React, { useState } from "react";
import { Play, Maximize2, Image as ImageIcon } from "lucide-react";
import { MemoryItem } from "../../data/birthdayData";
import { SectionHeader } from "../common/SectionHeader";
import { Lightbox } from "../common/Lightbox";

interface MemoryGalleryProps {
  memories: MemoryItem[];
}

export const MemoryGallery: React.FC<MemoryGalleryProps> = ({ memories }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const categories = ["ALL", "BROTHERHOOD", "ADVENTURE", "FOCUS", "MILESTONES"];

  const filteredMemories =
    selectedCategory === "ALL"
      ? memories
      : memories.filter((m) => m.category === selectedCategory);

  const handleOpenItem = (item: MemoryItem) => {
    const originalIndex = memories.findIndex((m) => m.id === item.id);
    setLightboxIndex(originalIndex !== -1 ? originalIndex : 0);
  };

  return (
    <section
      id="memories"
      aria-label="Memories Gallery"
      className="relative w-full py-24 px-4 sm:px-8 max-w-7xl mx-auto"
    >
      <SectionHeader
        number="04 / ARCHIVE"
        title="MEMORIES"
        subtitle="Unscripted moments of loyalty, grit, brotherhood, and triumph captured through the lens."
        tagline="VISUAL REEL"
        align="left"
      />

      {/* Category Filter Pills */}
      <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-12">
        {categories.map((cat) => {
          const isActive = selectedCategory === cat;
          return (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-1.5 rounded-full font-tech text-xs tracking-wider uppercase transition-all duration-300 ${
                isActive
                  ? "bg-white text-black font-semibold shadow-lg"
                  : "bg-zinc-900/80 text-zinc-400 border border-white/5 hover:border-white/20 hover:text-white"
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Cinematic Masonry / Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {filteredMemories.map((item) => (
          <div
            key={item.id}
            onClick={() => handleOpenItem(item)}
            className="group relative rounded-2xl overflow-hidden glass-card border border-white/10 cursor-pointer transition-all duration-500 hover:border-[#d4af37]/60 hover:shadow-[0_15px_35px_rgba(0,0,0,0.8)]"
          >
            {/* Aspect Ratio Container */}
            <div
              className={`w-full relative overflow-hidden bg-zinc-950 ${
                item.aspectRatio === "portrait"
                  ? "h-96 sm:h-[420px]"
                  : item.aspectRatio === "square"
                  ? "h-72 sm:h-80"
                  : "h-64 sm:h-72"
              }`}
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover filter grayscale contrast-115 brightness-90 group-hover:filter-none group-hover:scale-105 transition-all duration-700 ease-out"
                loading="lazy"
              />

              {/* Cinematic Vignette on Each Card */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent transition-opacity duration-300 group-hover:opacity-80" />

              {/* Video Badge if Applicable */}
              {item.isVideo && (
                <div className="absolute top-4 right-4 p-2 rounded-full bg-black/70 border border-white/20 backdrop-blur-md text-white group-hover:bg-[#d4af37] group-hover:text-black transition-colors">
                  <Play className="w-3.5 h-3.5 fill-current" />
                </div>
              )}

              {/* Year Stamp */}
              <div className="absolute top-4 left-4 px-2.5 py-0.5 rounded bg-black/60 border border-white/10 font-tech text-[10px] text-zinc-300 tracking-widest uppercase backdrop-blur-sm">
                {item.year}
              </div>

              {/* Expand Icon Indicator on Hover */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="p-3 rounded-full bg-black/70 border border-[#d4af37] text-white backdrop-blur-md transform scale-75 group-hover:scale-100 transition-transform duration-300">
                  <Maximize2 className="w-5 h-5 text-[#d4af37]" />
                </span>
              </div>

              {/* Caption Overlay */}
              <div className="absolute bottom-0 inset-x-0 p-5 transform transition-transform duration-300">
                <span className="font-tech text-[10px] tracking-widest text-[#d4af37] uppercase font-semibold block mb-1">
                  {item.category}
                </span>
                <h3 className="font-cinematic text-lg sm:text-xl text-white font-bold tracking-wide uppercase leading-snug">
                  {item.title}
                </h3>
                <p className="font-body text-xs text-zinc-400 mt-1 font-light line-clamp-2 opacity-80 group-hover:opacity-100 transition-opacity">
                  {item.caption}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      <Lightbox
        items={memories}
        currentIndex={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onSelectIndex={(newIdx) => setLightboxIndex(newIdx)}
      />
    </section>
  );
};
