import React, { useState, useEffect } from "react";
import { RotateCcw, Share2, MessageSquare, Send, Check, Heart, Sparkles } from "lucide-react";
import { BirthdayData } from "../../data/birthdayData";

interface FinalSectionProps {
  data: BirthdayData;
  onReplay: () => void;
}

interface GuestNote {
  id: string;
  sender: string;
  message: string;
  timestamp: string;
}

export const FinalSection: React.FC<FinalSectionProps> = ({ data, onReplay }) => {
  const [copied, setCopied] = useState(false);
  const [showNoteModal, setShowNoteModal] = useState(false);
  const [sender, setSender] = useState("");
  const [message, setMessage] = useState("");
  const [notes, setNotes] = useState<GuestNote[]>([]);

  useEffect(() => {
    const savedNotes = localStorage.getItem(`chapter_notes_${data.name}`);
    if (savedNotes) {
      try {
        setNotes(JSON.parse(savedNotes));
      } catch {
        // ignore
      }
    } else {
      // Pre-seed with an authentic brotherhood note
      const defaultNote: GuestNote = {
        id: "seed-1",
        sender: "Alex & The Crew",
        message: "Proud of everything you've built, brother. Chapter 25 is just the beginning. Stay lethal.",
        timestamp: "TODAY"
      };
      setNotes([defaultNote]);
    }
  }, [data.name]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!sender.trim() || !message.trim()) return;

    const newNote: GuestNote = {
      id: Date.now().toString(),
      sender: sender.trim(),
      message: message.trim(),
      timestamp: "JUST NOW"
    };

    const updated = [newNote, ...notes];
    setNotes(updated);
    localStorage.setItem(`chapter_notes_${data.name}`, JSON.stringify(updated));
    setSender("");
    setMessage("");
    setShowNoteModal(false);
  };

  return (
    <section
      id="final"
      aria-label="Final Cinematic Message"
      className="relative min-h-screen w-full flex flex-col justify-between items-center text-center px-6 py-28 bg-[#020204] overflow-hidden select-none"
    >
      {/* Cinematic Horizontal Light Flare Sweep */}
      <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#d4af37]/40 to-transparent -translate-y-1/2 pointer-events-none animate-flare-scan" />

      {/* Top Reel Marker */}
      <div className="text-[10px] font-tech text-zinc-600 tracking-[0.35em] uppercase">
        FINALE // THE BEGINNING OF THE REST
      </div>

      {/* Main Climactic Text Reveal */}
      <div className="my-auto max-w-4xl py-12 flex flex-col items-center">
        {/* Line 1: DON'T JUST COUNT THE YEARS. */}
        <h3 className="font-cinematic text-2xl sm:text-4xl md:text-5xl text-zinc-400 font-normal tracking-cinematic uppercase mb-4">
          DON'T JUST COUNT THE YEARS.
        </h3>

        {/* Line 2: MAKE THEM COUNT. */}
        <h2
          className="font-cinematic text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-white font-extrabold tracking-cinematic uppercase mb-8"
          style={{ textShadow: "0 0 45px rgba(255,255,255,0.2)" }}
        >
          MAKE THEM COUNT.
        </h2>

        {/* Divider with Amber Diamond */}
        <div className="relative w-32 h-[1px] bg-zinc-700 my-6">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rotate-45 bg-[#d4af37]" />
        </div>

        {/* Line 3: HAPPY BIRTHDAY, [NAME]. */}
        <p className="font-tech text-sm sm:text-base md:text-xl text-[#d4af37] tracking-[0.3em] uppercase font-semibold mt-4">
          HAPPY BIRTHDAY, {data.name}.
        </p>

        {/* Line 4: CHAPTER [AGE] BEGINS NOW. */}
        <p className="font-tech text-xs sm:text-sm text-zinc-400 tracking-[0.25em] uppercase mt-3">
          {data.chapterTitle} BEGINS NOW.
        </p>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center justify-center gap-4 mt-12">
          {/* Replay */}
          <button
            type="button"
            onClick={onReplay}
            className="px-6 py-3 rounded-full bg-zinc-900 border border-white/10 hover:border-white/30 text-white font-tech text-xs tracking-widest uppercase transition-all duration-300 flex items-center gap-2 hover:bg-zinc-800"
          >
            <RotateCcw className="w-3.5 h-3.5 text-[#d4af37]" />
            <span>REPLAY FILM</span>
          </button>

          {/* Share */}
          <button
            type="button"
            onClick={handleCopyLink}
            className="px-6 py-3 rounded-full bg-zinc-900 border border-white/10 hover:border-white/30 text-white font-tech text-xs tracking-widest uppercase transition-all duration-300 flex items-center gap-2 hover:bg-zinc-800"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-green-400" />
                <span>LINK COPIED</span>
              </>
            ) : (
              <>
                <Share2 className="w-3.5 h-3.5 text-[#d4af37]" />
                <span>SHARE CHAPTER</span>
              </>
            )}
          </button>

          {/* Leave a Note */}
          <button
            type="button"
            onClick={() => setShowNoteModal(true)}
            className="px-6 py-3 rounded-full bg-white/10 border border-[#d4af37]/40 hover:border-[#d4af37] text-white font-tech text-xs tracking-widest uppercase transition-all duration-300 flex items-center gap-2 hover:bg-white/15"
          >
            <MessageSquare className="w-3.5 h-3.5 text-[#d4af37]" />
            <span>WRITE A WISH ({notes.length})</span>
          </button>
        </div>

        {/* Display Guestbook Feed if notes exist */}
        {notes.length > 0 && (
          <div className="mt-16 w-full max-w-2xl text-left">
            <span className="font-tech text-xs text-zinc-500 tracking-[0.25em] uppercase font-semibold block mb-4 text-center">
              WISHES & BROTHERHOOD DISPATCHES
            </span>
            <div className="space-y-3">
              {notes.map((n) => (
                <div
                  key={n.id}
                  className="glass-card rounded-xl p-4 border border-white/10 flex flex-col justify-between"
                >
                  <p className="font-body text-xs sm:text-sm text-zinc-300 font-light italic leading-relaxed">
                    "{n.message}"
                  </p>
                  <div className="flex justify-between items-center mt-3 pt-2 border-t border-white/5 font-tech text-[10px] text-zinc-500 uppercase tracking-widest">
                    <span className="text-[#d4af37] font-semibold">— {n.sender}</span>
                    <span>{n.timestamp}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Bottom Production Film Credits */}
      <footer className="text-[10px] font-tech text-zinc-700 tracking-[0.3em] uppercase max-w-md select-none">
        PRODUCED EXCLUSIVELY FOR {data.fullName}
        <br />
        <span className="text-zinc-800">ALL RIGHTS RESERVED // FOREVER ARCHIVED</span>
      </footer>

      {/* Leave Note Modal */}
      {showNoteModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[1100] flex items-center justify-center bg-black/90 backdrop-blur-md p-4"
          onClick={() => setShowNoteModal(false)}
        >
          <div
            className="w-full max-w-md glass-card rounded-2xl p-6 sm:p-8 border border-[#d4af37]/40 relative text-left"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <div>
                <span className="font-tech text-[10px] text-[#d4af37] tracking-[0.25em] uppercase font-semibold">
                  INNER CIRCLE DISPATCH
                </span>
                <h4 className="font-cinematic text-xl text-white font-bold tracking-wide uppercase">
                  LEAVE A BIRTHDAY NOTE
                </h4>
              </div>
              <button
                type="button"
                onClick={() => setShowNoteModal(false)}
                className="text-zinc-500 hover:text-white"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddNote} className="space-y-4">
              <div>
                <label className="block font-tech text-xs text-zinc-400 uppercase tracking-wider mb-1.5">
                  YOUR NAME / CALLSIGN
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. David / Brother in Arms"
                  value={sender}
                  onChange={(e) => setSender(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg bg-zinc-900 border border-white/10 text-white font-body text-sm focus:border-[#d4af37] focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-tech text-xs text-zinc-400 uppercase tracking-wider mb-1.5">
                  YOUR MESSAGE TO {data.name}
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Write an uncompromised wish, memory, or encouragement..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg bg-zinc-900 border border-white/10 text-white font-body text-sm focus:border-[#d4af37] focus:outline-none resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-lg bg-white/10 hover:bg-white/20 border border-[#d4af37]/60 text-white font-tech text-xs tracking-widest uppercase font-semibold transition-all flex items-center justify-center gap-2"
              >
                <Send className="w-3.5 h-3.5 text-[#d4af37]" />
                <span>SEAL AND SEND MESSAGE</span>
              </button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
