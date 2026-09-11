import React, { useState } from "react";
import { Mail, MailOpen, X, Sparkles, Feather } from "lucide-react";
import { BirthdayData } from "../../data/birthdayData";
import { SectionHeader } from "../common/SectionHeader";
import { audioEngine } from "../../utils/audioEngine";

interface BirthdayLetterProps {
  letterData: BirthdayData["letter"];
  recipientName: string;
}

export const BirthdayLetter: React.FC<BirthdayLetterProps> = ({
  letterData,
  recipientName
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleOpenLetter = () => {
    setIsAnimating(true);
    audioEngine.playWaxSealSound();
    setTimeout(() => {
      setIsOpen(true);
      setIsAnimating(false);
    }, 600);
  };

  const handleCloseLetter = () => {
    setIsOpen(false);
  };

  return (
    <section
      id="letter"
      aria-label="Personal Birthday Letter"
      className="relative w-full py-28 px-4 sm:px-8 max-w-5xl mx-auto flex flex-col items-center select-none"
    >
      <SectionHeader
        number="07 / THE DISPATCH"
        title="A LETTER FOR YOU"
        subtitle="Words left unsaid in everyday hustle. A dispatch from those who respect the road you walk."
        tagline="PRIVATE TRANSMISSION"
        align="center"
      />

      {/* Sealed Envelope Interactive View */}
      {!isOpen && (
        <div
          className={`w-full max-w-xl flex flex-col items-center transition-all duration-700 ${
            isAnimating ? "scale-95 opacity-50" : "scale-100 opacity-100"
          }`}
        >
          {/* 3D-effect Luxury Dark Envelope */}
          <div
            onClick={handleOpenLetter}
            className="group relative w-full h-72 sm:h-80 rounded-2xl bg-gradient-to-b from-[#16161d] to-[#0c0c10] border border-white/15 p-6 flex flex-col items-center justify-between cursor-pointer shadow-2xl transition-all duration-500 hover:border-[#d4af37]/60 hover:shadow-[0_20px_50px_rgba(0,0,0,0.9)]"
          >
            {/* Envelope Top Flap Triangle Lines */}
            <div className="absolute top-0 inset-x-0 h-32 overflow-hidden pointer-events-none">
              <div className="w-full h-full border-b border-white/10 bg-gradient-to-b from-white/[0.04] to-transparent [clip-path:polygon(0_0,100%_0,50%_100%)]" />
            </div>

            {/* Top metadata */}
            <div className="relative z-10 w-full flex justify-between items-center text-[10px] font-tech text-zinc-500 tracking-[0.25em] uppercase">
              <span>CONFIDENTIAL DISPATCH</span>
              <span>{letterData.date}</span>
            </div>

            {/* Central Wax Seal Emblem */}
            <div className="relative z-20 flex flex-col items-center">
              <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-[#8a2424] via-[#5c1616] to-[#3a0d0d] border-2 border-[#b93b3b]/60 flex items-center justify-center shadow-[0_10px_25px_rgba(0,0,0,0.8)] group-hover:scale-110 group-hover:shadow-[0_0_30px_rgba(185,59,59,0.5)] transition-all duration-300">
                {/* Initial inside wax seal */}
                <span className="font-cinematic text-3xl font-black text-[#f1d0d0] select-none">
                  {recipientName.charAt(0) || "M"}
                </span>

                {/* Subtle wax edge ridges */}
                <div className="absolute inset-0 rounded-full border border-white/20 pointer-events-none" />
              </div>

              <span className="mt-3 font-tech text-[11px] tracking-[0.3em] text-zinc-400 uppercase font-semibold group-hover:text-white transition-colors">
                SEALED FOR {recipientName}
              </span>
            </div>

            {/* Bottom Button Prompt */}
            <div className="relative z-10">
              <button
                type="button"
                className="px-6 py-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white font-tech text-xs tracking-widest uppercase transition-all duration-300 flex items-center gap-2"
              >
                <Mail className="w-3.5 h-3.5 text-[#d4af37]" />
                <span>CLICK TO OPEN LETTER</span>
              </button>
            </div>
          </div>

          <p className="mt-4 text-xs font-tech text-zinc-500 tracking-widest uppercase text-center">
            [ TOUCH SEAL TO BREAK AND READ ]
          </p>
        </div>
      )}

      {/* Unfolded Letter Presentation */}
      {isOpen && (
        <div className="w-full max-w-3xl glass-card rounded-3xl p-8 sm:p-12 md:p-16 border border-[#d4af37]/40 shadow-2xl relative animate-fade-in transition-all duration-700 bg-gradient-to-b from-[#111116] via-[#0b0b0e] to-[#070709]">
          {/* Close / Fold Back Button */}
          <button
            type="button"
            onClick={handleCloseLetter}
            className="absolute top-6 right-6 p-2 rounded-full bg-zinc-900 border border-white/10 text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
            aria-label="Fold letter back into envelope"
            title="Close Letter"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Letter Header */}
          <div className="border-b border-white/10 pb-6 mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
            <div>
              <span className="font-tech text-xs tracking-[0.3em] text-[#d4af37] uppercase font-semibold block mb-1">
                PRIVATE CORRESPONDENCE
              </span>
              <h3 className="font-cinematic text-2xl sm:text-3xl text-white font-bold tracking-cinematic uppercase">
                {letterData.salutation}
              </h3>
            </div>
            <div className="font-tech text-xs text-zinc-500 tracking-widest uppercase">
              {letterData.date}
            </div>
          </div>

          {/* Letter Body Paragraphs with Editorial Typography */}
          <div className="space-y-6 font-body text-base sm:text-lg md:text-xl text-zinc-200 font-light leading-relaxed">
            {letterData.paragraphs.map((p, idx) => (
              <p
                key={idx}
                className="transition-all duration-700"
                style={{
                  animationDelay: `${idx * 150}ms`
                }}
              >
                {p}
              </p>
            ))}
          </div>

          {/* Letter Sign-off */}
          <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6">
            <div>
              <p className="font-editorial italic text-base sm:text-lg text-zinc-400">
                {letterData.closing}
              </p>
              <h4 className="font-cinematic text-xl sm:text-2xl text-white font-bold tracking-widest uppercase mt-1">
                {letterData.signature}
              </h4>
            </div>

            {letterData.postscript && (
              <div className="font-editorial italic text-sm sm:text-base text-[#d4af37] max-w-xs">
                {letterData.postscript}
              </div>
            )}
          </div>

          {/* Bottom Fold Action */}
          <div className="mt-10 text-center">
            <button
              type="button"
              onClick={handleCloseLetter}
              className="font-tech text-xs text-zinc-500 hover:text-zinc-300 tracking-[0.2em] uppercase transition-colors"
            >
              [ FOLD LETTER & RETURN TO ARCHIVE ]
            </button>
          </div>
        </div>
      )}
    </section>
  );
};
