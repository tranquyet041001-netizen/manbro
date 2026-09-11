import React from "react";

interface FilmGrainProps {
  cinemaScopeMode?: boolean;
}

export const FilmGrain: React.FC<FilmGrainProps> = ({ cinemaScopeMode = false }) => {
  return (
    <>
      {/* Film grain noise overlay */}
      <div className="film-grain-overlay" aria-hidden="true" />

      {/* Cinematic peripheral vignette */}
      <div className="cinematic-vignette" aria-hidden="true" />

      {/* Optional 2.39:1 CinemaScope letterbox bars */}
      {cinemaScopeMode && (
        <div className="fixed inset-0 pointer-events-none z-[997] flex flex-col justify-between" aria-hidden="true">
          <div className="h-[4vh] md:h-[6vh] w-full bg-black border-b border-white/10 flex items-center justify-between px-6 text-[10px] text-zinc-600 font-tech uppercase tracking-widest">
            <span>2.39:1 CINEMASCOPE // 4K RAW</span>
            <span>SHUTTER: 180° // ISO 800</span>
          </div>
          <div className="h-[4vh] md:h-[6vh] w-full bg-black border-t border-white/10 flex items-center justify-between px-6 text-[10px] text-zinc-600 font-tech uppercase tracking-widest">
            <span>SCENE: CHAPTER 25 // TAKE 01</span>
            <span>TIMECODE: 00:25:00:00</span>
          </div>
        </div>
      )}
    </>
  );
};
