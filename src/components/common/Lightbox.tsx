import React, { useEffect } from "react";
import { X, ChevronLeft, ChevronRight, Play, Film } from "lucide-react";
import { MemoryItem } from "../../data/birthdayData";

interface LightboxProps {
  items: MemoryItem[];
  currentIndex: number | null;
  onClose: () => void;
  onSelectIndex: (index: number) => void;
}

export const Lightbox: React.FC<LightboxProps> = ({
  items,
  currentIndex,
  onClose,
  onSelectIndex
}) => {
  const isOpen = currentIndex !== null;
  const currentItem = currentIndex !== null ? items[currentIndex] : null;

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowLeft") {
        if (currentIndex !== null && currentIndex > 0) {
          onSelectIndex(currentIndex - 1);
        } else {
          onSelectIndex(items.length - 1);
        }
      } else if (e.key === "ArrowRight") {
        if (currentIndex !== null && currentIndex < items.length - 1) {
          onSelectIndex(currentIndex + 1);
        } else {
          onSelectIndex(0);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
    };
  }, [isOpen, currentIndex, items.length, onClose, onSelectIndex]);

  if (!isOpen || !currentItem) return null;

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (currentIndex > 0) {
      onSelectIndex(currentIndex - 1);
    } else {
      onSelectIndex(items.length - 1);
    }
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (currentIndex < items.length - 1) {
      onSelectIndex(currentIndex + 1);
    } else {
      onSelectIndex(0);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Fullscreen Memory Viewer"
      className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/92 backdrop-blur-xl p-4 md:p-8 transition-opacity duration-300"
      onClick={onClose}
    >
      {/* Top Bar HUD */}
      <div
        className="absolute top-0 inset-x-0 h-16 px-6 flex items-center justify-between border-b border-white/10 z-10 bg-black/40"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3">
          <Film className="w-4 h-4 text-zinc-400" />
          <span className="font-tech text-xs tracking-widest text-zinc-400 uppercase">
            ARCHIVE REEL // {String(currentIndex + 1).padStart(2, "0")} OF {String(items.length).padStart(2, "0")}
          </span>
          <span className="hidden sm:inline-block px-2 py-0.5 rounded bg-zinc-800/80 border border-white/10 font-tech text-[10px] text-zinc-300 tracking-wider">
            {currentItem.category}
          </span>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="p-2 rounded-full text-zinc-400 hover:text-white hover:bg-white/10 transition-colors focus:outline-none focus:ring-1 focus:ring-zinc-400"
          aria-label="Close Lightbox (Esc)"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Main Media Container */}
      <div
        className="relative max-w-5xl max-h-[80vh] w-full flex flex-col items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        {currentItem.isVideo && currentItem.videoSrc ? (
          <div className="relative w-full max-h-[70vh] rounded-lg overflow-hidden border border-zinc-700 bg-black flex items-center justify-center shadow-2xl">
            <video
              src={currentItem.videoSrc}
              controls
              autoPlay={false}
              playsInline
              className="max-w-full max-h-[70vh] object-contain"
              poster={currentItem.image}
            />
          </div>
        ) : (
          <div className="relative max-w-full max-h-[70vh] rounded-lg overflow-hidden border border-zinc-700/80 bg-zinc-950 shadow-2xl flex items-center justify-center">
            <img
              src={currentItem.image}
              alt={currentItem.title}
              className="max-w-full max-h-[70vh] object-contain transition-transform duration-500 select-none"
              loading="lazy"
            />
          </div>
        )}

        {/* Caption & Metadata Footer */}
        <div className="mt-4 text-center max-w-2xl px-4">
          <h3 className="font-cinematic text-lg sm:text-xl md:text-2xl text-white tracking-widest font-semibold uppercase">
            {currentItem.title}
          </h3>
          <p className="font-body text-xs sm:text-sm text-zinc-400 mt-1 font-light leading-relaxed">
            {currentItem.caption}
          </p>
          <div className="mt-2 text-[11px] font-tech text-zinc-500 tracking-widest uppercase">
            YEAR // {currentItem.year}
          </div>
        </div>

        {/* Prev & Next Buttons */}
        <button
          type="button"
          onClick={handlePrev}
          className="absolute left-2 md:-left-12 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/60 border border-white/20 text-zinc-300 hover:text-white hover:bg-zinc-800 transition-all focus:outline-none"
          aria-label="Previous image"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          type="button"
          onClick={handleNext}
          className="absolute right-2 md:-right-12 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/60 border border-white/20 text-zinc-300 hover:text-white hover:bg-zinc-800 transition-all focus:outline-none"
          aria-label="Next image"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};
