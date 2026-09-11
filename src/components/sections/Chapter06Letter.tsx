import React, { useState } from "react";
import { BirthdayData } from "../../data/birthdayData";
import { audioEngine } from "../../utils/audioEngine";
import { X } from "lucide-react";

interface Chapter06LetterProps {
  letter: BirthdayData["letter"];
  emotionalPauseText: string;
  onLetterClosed: () => void;
}

export const Chapter06Letter: React.FC<Chapter06LetterProps> = ({
  letter,
  emotionalPauseText,
  onLetterClosed
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [showPause, setShowPause] = useState<boolean>(false);

  const handleOpen = () => {
    setIsOpen(true);
    audioEngine.setDucking(true); // Audio dips down for intimacy
  };

  const handleClose = () => {
    setIsOpen(false);
    audioEngine.setDucking(false); // Restore audio volume

    // Trigger the emotional pause breathing room
    setShowPause(true);
    setTimeout(() => {
      setShowPause(false);
      onLetterClosed();
    }, 3200); // 3 seconds of breathing room
  };

  return (
    <section
      id="letter"
      aria-label="Chapter 06 - The Letter"
      className="relative min-h-screen w-full flex flex-col justify-center items-center py-28 px-6 sm:px-12 bg-[#050505] select-none text-center"
    >
      {/* Teaser View: THERE IS SOMETHING I WANT TO SAY */}
      {!isOpen && !showPause && (
        <div className="max-w-4xl mx-auto flex flex-col items-center">
          <div className="flex items-center gap-3 mb-8">
            <span className="w-8 h-[1px] bg-zinc-600" />
            <span className="font-tech text-xs tracking-[0.35em] text-zinc-400 uppercase font-semibold">
              06 // THE LETTER
            </span>
            <span className="w-8 h-[1px] bg-zinc-600" />
          </div>

          <h2 className="font-cinematic text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-white font-black tracking-cinematic uppercase leading-tight">
            THERE IS
            <br />
            SOMETHING
            <br />
            <span className="text-zinc-400">I WANT TO SAY.</span>
          </h2>

          {/* Luxury Minimalist OPEN Button */}
          <div className="mt-14 sm:mt-16">
            <button
              type="button"
              onClick={handleOpen}
              className="group px-10 py-3.5 rounded-full border border-white/30 hover:border-white text-white font-tech text-xs tracking-[0.3em] uppercase transition-all duration-300 hover:bg-white/10"
            >
              OPEN
            </button>
          </div>
        </div>
      )}

      {/* Fullscreen Unfolded Letter Experience */}
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[1600] flex items-center justify-center bg-black/95 backdrop-blur-2xl p-6 sm:p-12 overflow-y-auto"
        >
          {/* Close Button */}
          <button
            type="button"
            onClick={handleClose}
            className="fixed top-8 right-8 p-3 rounded-full text-zinc-400 hover:text-white bg-zinc-900 border border-white/10 transition-colors z-20"
            aria-label="Close Letter"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Paper-Like Editorial Letter Canvas */}
          <div className="max-w-2xl w-full mx-auto my-auto p-8 sm:p-14 bg-[#0d0d12] border border-white/15 rounded-3xl shadow-2xl text-left relative animate-fade-in">
            {/* Header Stamp */}
            <div className="flex justify-between items-center pb-6 mb-8 border-b border-white/10">
              <span className="font-tech text-[10px] tracking-[0.3em] text-zinc-500 uppercase">
                PRIVATE DISPATCH
              </span>
              <span className="font-tech text-[10px] tracking-[0.25em] text-zinc-600 uppercase">
                CONFIDENTIAL
              </span>
            </div>

            {/* Letter Body Line by Line */}
            <div className="space-y-6 font-body text-base sm:text-lg md:text-xl text-zinc-200 font-light leading-relaxed">
              {letter.paragraphs.map((para, i) => (
                <p
                  key={i}
                  className="transition-all duration-700"
                  style={{ animationDelay: `${i * 200}ms` }}
                >
                  {para}
                </p>
              ))}
            </div>

            {/* Sign-Off */}
            <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
              <div>
                <p className="font-editorial italic text-base text-zinc-400">
                  {letter.closing}
                </p>
                <h4 className="font-cinematic text-xl text-white font-bold tracking-widest uppercase mt-1">
                  {letter.signature}
                </h4>
              </div>

              <button
                type="button"
                onClick={handleClose}
                className="font-tech text-xs text-zinc-500 hover:text-zinc-200 tracking-widest uppercase"
              >
                [ CONTINUE JOURNEY → ]
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 2–3s Emotional Breathing Pause (Black Screen) */}
      {showPause && (
        <div className="fixed inset-0 z-[1700] flex items-center justify-center bg-[#050505] text-center px-6 transition-all duration-1000">
          <p className="font-editorial italic text-2xl sm:text-4xl text-zinc-200 tracking-wide font-light max-w-xl leading-relaxed animate-pulse">
            “{emotionalPauseText}”
          </p>
        </div>
      )}
    </section>
  );
};
