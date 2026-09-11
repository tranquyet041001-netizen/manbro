import React, { useState, useEffect } from "react";
import { Volume2, VolumeX, SlidersHorizontal } from "lucide-react";
import { audioEngine } from "../../utils/audioEngine";

interface FloatingHUDProps {
  activeChapter: number;
  chapterLabel: string;
  isStarted: boolean;
  dateStamp: string;
  onNavigateChapter: (chapterNum: number) => void;
  onOpenCustomizer: () => void;
  onToggleCinemaScope?: () => void;
}

const chapters = [
  { num: 1, id: "hero", label: "01 // HERO" },
  { num: 2, id: "year", label: "02 // THE YEAR" },
  { num: 3, id: "time", label: "03 // TIME" },
  { num: 4, id: "memories", label: "04 // MEMORIES" },
  { num: 5, id: "theman", label: "05 // THE MAN" },
  { num: 6, id: "achievements", label: "06 // RECORD" },
  { num: 7, id: "letter", label: "07 // THE LETTER" },
  { num: 8, id: "future", label: "08 // HORIZON" }
];

export const FloatingHUD: React.FC<FloatingHUDProps> = ({
  activeChapter,
  chapterLabel,
  isStarted,
  dateStamp,
  onNavigateChapter,
  onOpenCustomizer
}) => {
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    const unsub = audioEngine.subscribe((playing, muted) => {
      setIsAudioPlaying(playing);
      setIsMuted(muted);
    });
    return () => unsub();
  }, []);

  const handleToggleAudio = (e: React.MouseEvent) => {
    e.stopPropagation();
    audioEngine.toggle();
  };

  if (!isStarted) return null;

  return (
    <>
      {/* Top-Left: Cinematic Project Title */}
      <div className="fixed top-6 left-6 z-[800] select-none pointer-events-none">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-white/70" />
          <span className="font-tech text-[10px] md:text-xs text-zinc-400 tracking-[0.3em] uppercase font-semibold">
            THE NEXT CHAPTER
          </span>
        </div>
      </div>

      {/* Top-Right: Coordinates & Minimal Music Indicator */}
      <div className="fixed top-6 right-6 z-[800] flex items-center gap-4 select-none">
        <span className="hidden sm:inline-block font-tech text-[10px] text-zinc-500 tracking-[0.25em] uppercase">
          {dateStamp}
        </span>

        {/* Minimal Audio Micro-Indicator */}
        <button
          type="button"
          onClick={handleToggleAudio}
          className="group flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-900/60 border border-white/10 hover:border-white/30 text-zinc-300 backdrop-blur-md transition-all duration-300 focus:outline-none"
          title={isAudioPlaying ? "Mute / Pause Ambient Score" : "Play Ambient Score"}
          aria-label="Toggle Soundtrack"
        >
          <span
            className={`w-1.5 h-1.5 rounded-full ${
              isAudioPlaying && !isMuted
                ? "bg-sky-400 shadow-[0_0_8px_rgba(56,189,248,0.8)] animate-pulse"
                : "bg-zinc-600"
            }`}
          />
          <span className="font-tech text-[9px] md:text-[10px] tracking-[0.2em] uppercase text-zinc-400 group-hover:text-white">
            MUSIC
          </span>
          {isMuted ? (
            <VolumeX className="w-3 h-3 text-zinc-500" />
          ) : (
            <Volume2 className="w-3 h-3 text-zinc-400 group-hover:text-white" />
          )}
        </button>

        {/* Customizer Drawer Trigger */}
        <button
          type="button"
          onClick={onOpenCustomizer}
          className="p-1.5 rounded-full bg-zinc-900/60 border border-white/10 hover:border-white/30 text-zinc-400 hover:text-white transition-colors"
          title="Personalize Chapter Data"
          aria-label="Personalize Chapter Data"
        >
          <SlidersHorizontal className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Bottom-Left: Active Chapter Indicator */}
      <div className="fixed bottom-6 left-6 z-[800] select-none pointer-events-none">
        <div className="flex items-center gap-3">
          <span className="font-cinematic text-xs md:text-sm text-zinc-300 font-bold tracking-[0.25em] uppercase">
            {chapterLabel}
          </span>
        </div>
      </div>

      {/* Bottom-Right: Minimal Scroll Indicator */}
      <div className="fixed bottom-6 right-6 z-[800] select-none pointer-events-none hidden sm:block">
        <span className="font-tech text-[9px] md:text-[10px] text-zinc-500 tracking-[0.3em] uppercase">
          SCROLL ↓
        </span>
      </div>

      {/* Desktop Vertical Chapter Progression Indicator */}
      <aside
        aria-label="Chapter Progression"
        className="fixed right-6 top-1/2 -translate-y-1/2 z-[790] hidden lg:flex flex-col items-end gap-3 select-none"
      >
        <div className="flex flex-col items-center gap-2">
          {chapters.map((ch) => {
            const isActive = activeChapter === ch.num;
            return (
              <button
                key={ch.num}
                type="button"
                onClick={() => onNavigateChapter(ch.num)}
                className="group flex items-center gap-3 focus:outline-none cursor-pointer py-1"
                aria-label={`Jump to Chapter 0${ch.num}`}
              >
                <span
                  className={`font-tech text-[9px] tracking-widest transition-opacity duration-300 opacity-0 group-hover:opacity-100 ${
                    isActive ? "text-white" : "text-zinc-500"
                  }`}
                >
                  {ch.label}
                </span>

                <div
                  className={`transition-all duration-300 rounded-full ${
                    isActive
                      ? "w-1.5 h-4 bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]"
                      : "w-1 h-1.5 bg-zinc-700 group-hover:bg-zinc-400"
                  }`}
                />
              </button>
            );
          })}
        </div>
      </aside>
    </>
  );
};
