import React, { useState } from "react";
import { X, RotateCcw, Check, Sparkles, SlidersHorizontal, Eye } from "lucide-react";
import { BirthdayData, initialBirthdayData } from "../../data/birthdayData";

interface DataCustomizerProps {
  data: BirthdayData;
  isOpen: boolean;
  onClose: () => void;
  onUpdateData: (updated: BirthdayData) => void;
  onResetData: () => void;
}

export const DataCustomizer: React.FC<DataCustomizerProps> = ({
  data,
  isOpen,
  onClose,
  onUpdateData,
  onResetData
}) => {
  const [formData, setFormData] = useState<BirthdayData>(data);
  const [savedToast, setSavedToast] = useState(false);

  if (!isOpen) return null;

  const handleChangeField = (field: keyof BirthdayData, value: any) => {
    const updated = { ...formData, [field]: value };
    // Auto-update chapter title if age changes
    if (field === "age") {
      const ageNum = parseInt(value, 10) || 25;
      updated.chapterTitle = `CHAPTER ${ageNum}`;
    }
    setFormData(updated);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateData(formData);
    setSavedToast(true);
    setTimeout(() => {
      setSavedToast(false);
      onClose();
    }, 800);
  };

  const handleReset = () => {
    setFormData(initialBirthdayData);
    onResetData();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Customize Birthday Experience"
      className="fixed inset-0 z-[1200] flex justify-end bg-black/80 backdrop-blur-sm transition-opacity"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg h-full bg-[#0b0b0f] border-l border-white/10 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-6 border-b border-white/10">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-5 h-5 text-[#d4af37]" />
            <div>
              <h3 className="font-cinematic text-lg text-white font-bold tracking-wider uppercase">
                PERSONALIZE EXPERIENCE
              </h3>
              <p className="font-tech text-[10px] text-zinc-400 tracking-wider uppercase">
                EDIT RECIPIENT & CHAPTER DETAILS
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-full text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form id="customizer-form" onSubmit={handleSave} className="py-6 space-y-6">
          {/* Recipient First Name */}
          <div>
            <label className="block font-tech text-xs text-zinc-300 uppercase tracking-widest mb-1.5 font-semibold">
              RECIPIENT NAME (FIRST NAME)
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => handleChangeField("name", e.target.value.toUpperCase())}
              className="w-full px-4 py-2.5 rounded-lg bg-zinc-900 border border-white/15 text-white font-cinematic tracking-wider text-base focus:border-[#d4af37] focus:outline-none"
            />
          </div>

          {/* Full Name */}
          <div>
            <label className="block font-tech text-xs text-zinc-300 uppercase tracking-widest mb-1.5 font-semibold">
              FULL NAME (FOR CREDITS)
            </label>
            <input
              type="text"
              value={formData.fullName}
              onChange={(e) => handleChangeField("fullName", e.target.value.toUpperCase())}
              className="w-full px-4 py-2.5 rounded-lg bg-zinc-900 border border-white/15 text-white font-cinematic tracking-wider text-sm focus:border-[#d4af37] focus:outline-none"
            />
          </div>

          {/* Age */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-tech text-xs text-zinc-300 uppercase tracking-widest mb-1.5 font-semibold">
                TURNING AGE
              </label>
              <input
                type="number"
                min="1"
                max="120"
                required
                value={formData.age}
                onChange={(e) => handleChangeField("age", parseInt(e.target.value, 10) || 25)}
                className="w-full px-4 py-2.5 rounded-lg bg-zinc-900 border border-white/15 text-white font-cinematic tracking-wider text-base focus:border-[#d4af37] focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-tech text-xs text-zinc-300 uppercase tracking-widest mb-1.5 font-semibold">
                CHAPTER TITLE
              </label>
              <input
                type="text"
                value={formData.chapterTitle}
                onChange={(e) => handleChangeField("chapterTitle", e.target.value.toUpperCase())}
                className="w-full px-4 py-2.5 rounded-lg bg-zinc-900 border border-white/15 text-white font-tech tracking-wider text-xs focus:border-[#d4af37] focus:outline-none"
              />
            </div>
          </div>

          {/* Hero Subtitle */}
          <div>
            <label className="block font-tech text-xs text-zinc-300 uppercase tracking-widest mb-1.5 font-semibold">
              HERO SUBTITLE
            </label>
            <input
              type="text"
              value={formData.heroSubtitle}
              onChange={(e) => handleChangeField("heroSubtitle", e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg bg-zinc-900 border border-white/15 text-white font-body text-xs focus:border-[#d4af37] focus:outline-none"
            />
          </div>

          {/* Personal Letter Salutation */}
          <div>
            <label className="block font-tech text-xs text-zinc-300 uppercase tracking-widest mb-1.5 font-semibold">
              LETTER SALUTATION
            </label>
            <input
              type="text"
              value={formData.letter.salutation}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  letter: { ...formData.letter, salutation: e.target.value }
                })
              }
              className="w-full px-4 py-2.5 rounded-lg bg-zinc-900 border border-white/15 text-white font-body text-xs focus:border-[#d4af37] focus:outline-none"
            />
          </div>

          {/* Letter Closing & Signature */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-tech text-xs text-zinc-300 uppercase tracking-widest mb-1.5 font-semibold">
                LETTER SIGNATURE
              </label>
              <input
                type="text"
                value={formData.letter.signature}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    letter: { ...formData.letter, signature: e.target.value.toUpperCase() }
                  })
                }
                className="w-full px-4 py-2.5 rounded-lg bg-zinc-900 border border-white/15 text-white font-cinematic text-xs focus:border-[#d4af37] focus:outline-none"
              />
            </div>
            <div>
              <label className="block font-tech text-xs text-zinc-300 uppercase tracking-widest mb-1.5 font-semibold">
                LETTER DATE
              </label>
              <input
                type="text"
                value={formData.letter.date}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    letter: { ...formData.letter, date: e.target.value.toUpperCase() }
                  })
                }
                className="w-full px-4 py-2.5 rounded-lg bg-zinc-900 border border-white/15 text-white font-tech text-xs focus:border-[#d4af37] focus:outline-none"
              />
            </div>
          </div>
        </form>

        {/* Footer Actions */}
        <div className="pt-6 border-t border-white/10 flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={handleReset}
            className="px-4 py-2.5 rounded-lg border border-zinc-700 text-zinc-400 hover:text-white font-tech text-xs tracking-wider uppercase transition-colors flex items-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>RESET</span>
          </button>

          <button
            type="submit"
            form="customizer-form"
            className="px-6 py-2.5 rounded-lg bg-[#d4af37] hover:bg-[#c29e2f] text-black font-tech text-xs tracking-widest uppercase font-bold transition-all shadow-lg flex items-center gap-2"
          >
            {savedToast ? (
              <>
                <Check className="w-4 h-4" />
                <span>APPLIED!</span>
              </>
            ) : (
              <>
                <Eye className="w-4 h-4" />
                <span>APPLY & PREVIEW</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
