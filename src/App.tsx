import React, { useState, useEffect } from "react";
import { initialBirthdayData, BirthdayData } from "./data/birthdayData";
import { ParticleField } from "./components/background/ParticleField";
import { FilmGrain } from "./components/background/FilmGrain";
import { CustomCursor } from "./components/common/CustomCursor";
import { Navbar } from "./components/navigation/Navbar";
import { MusicPlayer } from "./components/navigation/MusicPlayer";
import { OpeningScreen } from "./components/sections/OpeningScreen";
import { HeroSection } from "./components/sections/HeroSection";
import { ChapterIntro } from "./components/sections/ChapterIntro";
import { JourneyTimeline } from "./components/sections/JourneyTimeline";
import { MemoryGallery } from "./components/sections/MemoryGallery";
import { ValuesSection } from "./components/sections/ValuesSection";
import { Achievements } from "./components/sections/Achievements";
import { BirthdayLetter } from "./components/sections/BirthdayLetter";
import { FutureSection } from "./components/sections/FutureSection";
import { FinalSection } from "./components/sections/FinalSection";
import { DataCustomizer } from "./components/customizer/DataCustomizer";
import { audioEngine } from "./utils/audioEngine";

export const App: React.FC = () => {
  const [data, setData] = useState<BirthdayData>(() => {
    const saved = localStorage.getItem("birthday_custom_data");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // ignore
      }
    }
    return initialBirthdayData;
  });

  const [isExperienceStarted, setIsExperienceStarted] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<string>("hero");
  const [customizerOpen, setCustomizerOpen] = useState<boolean>(false);
  const [cinemaScopeMode, setCinemaScopeMode] = useState<boolean>(false);

  // Initialize audio & start experience
  const handleEnterExperience = () => {
    setIsExperienceStarted(true);
    audioEngine.start(data.music.src);
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  };

  const handleReplay = () => {
    setIsExperienceStarted(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Smooth navigation handler
  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Scroll to Next from Hero
  const handleScrollToNext = () => {
    const nextElem = document.getElementById("intro");
    if (nextElem) {
      nextElem.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Save customized data
  const handleUpdateData = (updated: BirthdayData) => {
    setData(updated);
    localStorage.setItem("birthday_custom_data", JSON.stringify(updated));
  };

  const handleResetData = () => {
    setData(initialBirthdayData);
    localStorage.removeItem("birthday_custom_data");
  };

  // Observe active section on scroll
  useEffect(() => {
    if (!isExperienceStarted) return;

    const sectionIds = ["hero", "intro", "journey", "memories", "values", "achievements", "letter", "future", "final"];
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(id);
            }
          });
        },
        { threshold: 0.3 }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => {
      observers.forEach((obs) => obs.disconnect());
    };
  }, [isExperienceStarted]);

  return (
    <div className="relative min-h-screen bg-[#030305] text-white selection:bg-zinc-700 selection:text-white">
      {/* Interactive 3D Ambient Dust Particles */}
      <ParticleField />

      {/* Atmospheric Film Grain & Vignette */}
      <FilmGrain cinemaScopeMode={cinemaScopeMode} />

      {/* Desktop Custom Cursor */}
      <CustomCursor />

      {/* Opening Screen (Section 01) */}
      <OpeningScreen
        onEnter={handleEnterExperience}
        isStarted={isExperienceStarted}
      />

      {/* Floating HUD Navigation & Controls */}
      <Navbar
        activeSection={activeSection}
        onNavigate={handleNavigate}
        onOpenCustomizer={() => setCustomizerOpen(true)}
        isExperienceStarted={isExperienceStarted}
      />

      {/* Cinematic Soundtrack Controller */}
      <MusicPlayer
        musicSrc={data.music.src}
        trackTitle={data.music.title}
        isExperienceStarted={isExperienceStarted}
      />

      {/* Main Experience Wrapper */}
      <main className={`transition-opacity duration-1000 ${isExperienceStarted ? "opacity-100" : "opacity-0"}`}>
        {/* Section 02: Hero */}
        <HeroSection
          data={data}
          onScrollToNext={handleScrollToNext}
        />

        {/* Section 03: A New Year / Intro */}
        <ChapterIntro data={data} />

        {/* Section 04: The Journey Timeline */}
        <JourneyTimeline timeline={data.timeline} />

        {/* Section 05: Memories Gallery */}
        <MemoryGallery memories={data.memories} />

        {/* Section 06: The Man Behind The Years (Values) */}
        <ValuesSection values={data.values} />

        {/* Section 07: Achievements */}
        <Achievements achievements={data.achievements} />

        {/* Section 08: The Birthday Letter */}
        <BirthdayLetter
          letterData={data.letter}
          recipientName={data.name}
        />

        {/* Section 09: The Future */}
        <FutureSection futureStages={data.future} />

        {/* Section 10: Final Message & Closure */}
        <FinalSection
          data={data}
          onReplay={handleReplay}
        />
      </main>

      {/* Live Personalization Drawer */}
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
