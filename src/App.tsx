import React, { useState, useEffect } from "react";
import { initialBirthdayData, BirthdayData } from "./data/birthdayData";
import { ParticleField } from "./components/background/ParticleField";
import { FilmGrain } from "./components/background/FilmGrain";
import { CustomCursor } from "./components/common/CustomCursor";
import { FloatingHUD } from "./components/navigation/FloatingHUD";
import { IntroScreen } from "./components/sections/IntroScreen";
import { HeroReveal } from "./components/sections/HeroReveal";
import { Chapter01Year } from "./components/sections/Chapter01Year";
import { Chapter02Time } from "./components/sections/Chapter02Time";
import { Chapter03Memories } from "./components/sections/Chapter03Memories";
import { Chapter04TheMan } from "./components/sections/Chapter04TheMan";
import { Chapter05Achievements } from "./components/sections/Chapter05Achievements";
import { Chapter06Letter } from "./components/sections/Chapter06Letter";
import { Chapter07Future } from "./components/sections/Chapter07Future";
import { Chapter08NextChapter } from "./components/sections/Chapter08NextChapter";
import { FinaleScene } from "./components/sections/FinaleScene";
import { DataCustomizer } from "./components/customizer/DataCustomizer";
import { audioEngine } from "./utils/audioEngine";

export const App: React.FC = () => {
  const [data, setData] = useState<BirthdayData>(() => {
    const saved = localStorage.getItem("chapter_master_data");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // ignore
      }
    }
    return initialBirthdayData;
  });

  const [isStarted, setIsStarted] = useState<boolean>(false);
  const [activeChapter, setActiveChapter] = useState<number>(1);
  const [chapterLabel, setChapterLabel] = useState<string>("01 // HERO");
  const [customizerOpen, setCustomizerOpen] = useState<boolean>(false);

  const handleEnter = () => {
    setIsStarted(true);
    audioEngine.start(data.music.src);
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  };

  const handleReplay = () => {
    setIsStarted(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleScrollNext = () => {
    const el = document.getElementById("year");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const handleLetterClosed = () => {
    const el = document.getElementById("future");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const handleNavigateChapter = (chNum: number) => {
    const mapping: { [num: number]: string } = {
      1: "hero",
      2: "year",
      3: "time",
      4: "memories",
      5: "theman",
      6: "achievements",
      7: "letter",
      8: "future"
    };
    const id = mapping[chNum];
    if (id) {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleUpdateData = (updated: BirthdayData) => {
    setData(updated);
    localStorage.setItem("chapter_master_data", JSON.stringify(updated));
  };

  const handleResetData = () => {
    setData(initialBirthdayData);
    localStorage.removeItem("chapter_master_data");
  };

  // Chapter In-View Observer
  useEffect(() => {
    if (!isStarted) return;

    const sections = [
      { id: "hero", num: 1, label: "01 // HERO" },
      { id: "year", num: 2, label: "02 // THE YEAR" },
      { id: "time", num: 3, label: "03 // TIME" },
      { id: "memories", num: 4, label: "04 // MEMORIES" },
      { id: "theman", num: 5, label: "05 // THE MAN" },
      { id: "achievements", num: 6, label: "06 // RECORD" },
      { id: "letter", num: 7, label: "07 // THE LETTER" },
      { id: "future", num: 8, label: "08 // HORIZON" },
      { id: "finale", num: 8, label: "FINALE // CELEBRATION" }
    ];

    const observers: IntersectionObserver[] = [];

    sections.forEach((sec) => {
      const el = document.getElementById(sec.id);
      if (!el) return;

      const obs = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveChapter(sec.num);
              setChapterLabel(sec.label);
            }
          });
        },
        { threshold: 0.3 }
      );

      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, [isStarted]);

  return (
    <div className="relative min-h-screen bg-[#050505] text-white selection:bg-zinc-700 selection:text-white overflow-x-hidden">
      {/* 3D Atmospheric Slow-Drift Particles */}
      <ParticleField />

      {/* Subtle 35mm Film Grain */}
      <FilmGrain />

      {/* Custom Desktop Cursor with VIEW pill expander */}
      <CustomCursor />

      {/* Intro Sequence (Black Screen -> A Story in Time -> The Next Chapter -> Enter) */}
      <IntroScreen onEnter={handleEnter} isStarted={isStarted} />

      {/* Floating Art-Direction HUD & Micro Chapter Progress */}
      <FloatingHUD
        activeChapter={activeChapter}
        chapterLabel={chapterLabel}
        isStarted={isStarted}
        dateStamp={data.dateStamp}
        onNavigateChapter={handleNavigateChapter}
        onOpenCustomizer={() => setCustomizerOpen(true)}
      />

      {/* Main Experience Canvas */}
      <main className={`transition-opacity duration-1000 ${isStarted ? "opacity-100" : "opacity-0"}`}>
        {/* Scene 01: Hero Reveal */}
        <HeroReveal data={data} onScrollNext={handleScrollNext} />

        {/* Chapter 01: The Year */}
        <Chapter01Year data={data} />

        {/* Chapter 02: Time (Horizontal Timeline) */}
        <Chapter02Time timeline={data.timeline} />

        {/* Chapter 03: Memories (Asymmetric Editorial Gallery) */}
        <Chapter03Memories memories={data.memories} />

        {/* Chapter 04: The Man (Giant Word Focus) */}
        <Chapter04TheMan values={data.values} />

        {/* Chapter 05: Achievements (Monumental Record) */}
        <Chapter05Achievements achievements={data.achievements} />

        {/* Chapter 06: The Letter & Emotional Pause */}
        <Chapter06Letter
          letter={data.letter}
          emotionalPauseText={data.emotionalPause}
          onLetterClosed={handleLetterClosed}
        />

        {/* Chapter 07: The Future (Futuristic Energy Line) */}
        <Chapter07Future future={data.future} />

        {/* Chapter 08: The Next Chapter (Metamorphosis) */}
        <Chapter08NextChapter data={data} />

        {/* Final Scene: Movie Ending & Replay */}
        <FinaleScene data={data} onReplay={handleReplay} />
      </main>

      {/* Discreet Personalization Drawer */}
      <DataCustomizer
        data={data}
        isOpen={customizerOpen}
        onClose={() => setCustomizerOpen(false)}
        onUpdateData={handleUpdateData}
        onResetData={handleResetData}
      />
    </div>
  );
};
export default App;
