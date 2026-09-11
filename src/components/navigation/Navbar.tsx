import React, { useState, useEffect } from "react";
import { Compass, Menu, X, SlidersHorizontal } from "lucide-react";

interface NavbarProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  onOpenCustomizer?: () => void;
  isExperienceStarted: boolean;
}

const navLinks = [
  { id: "hero", label: "HOME", num: "01" },
  { id: "journey", label: "JOURNEY", num: "02" },
  { id: "memories", label: "MEMORIES", num: "03" },
  { id: "values", label: "VALUES", num: "04" },
  { id: "letter", label: "LETTER", num: "05" },
  { id: "future", label: "FUTURE", num: "06" }
];

export const Navbar: React.FC<NavbarProps> = ({
  activeSection,
  onNavigate,
  onOpenCustomizer,
  isExperienceStarted
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!isExperienceStarted) return null;

  return (
    <>
      {/* Desktop Floating HUD Navbar */}
      <nav
        aria-label="Main Navigation"
        className={`fixed top-4 md:top-6 left-1/2 -translate-x-1/2 z-[800] transition-all duration-500 hidden md:block ${
          scrolled ? "opacity-100 scale-100" : "opacity-90 scale-100"
        }`}
      >
        <div className="flex items-center gap-1.5 px-4 py-2 rounded-full glass-panel border border-white/10 shadow-2xl backdrop-blur-md">
          {/* Subtle insignia */}
          <div className="flex items-center gap-2 pr-3 border-r border-white/10">
            <span className="w-2 h-2 rounded-full bg-[#d4af37] animate-pulse" />
            <span className="font-cinematic text-xs tracking-widest text-zinc-300 font-bold uppercase">
              CHAPTER 25
            </span>
          </div>

          {/* Links */}
          <div className="flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  type="button"
                  onClick={() => onNavigate(link.id)}
                  className={`relative px-3.5 py-1.5 rounded-full text-xs font-tech tracking-wider uppercase transition-all duration-300 ${
                    isActive
                      ? "text-white font-semibold bg-white/10 shadow-inner"
                      : "text-zinc-400 hover:text-zinc-200 hover:bg-white/5"
                  }`}
                  aria-current={isActive ? "page" : undefined}
                >
                  <span className="text-[9px] text-zinc-500 mr-1.5 opacity-80">{link.num}</span>
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-3 h-[2px] bg-[#d4af37] rounded-full" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Customizer drawer trigger */}
          {onOpenCustomizer && (
            <div className="pl-2 ml-1 border-l border-white/10">
              <button
                type="button"
                onClick={onOpenCustomizer}
                className="p-1.5 rounded-full text-zinc-400 hover:text-[#d4af37] hover:bg-white/10 transition-colors"
                title="Personalize & Edit Chapter Data"
                aria-label="Personalize & Edit Chapter Data"
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
      </nav>

      {/* Mobile Floating Bottom Bar */}
      <nav
        aria-label="Mobile Navigation"
        className="fixed bottom-4 left-4 right-4 z-[800] md:hidden flex items-center justify-between px-4 py-2.5 rounded-2xl glass-panel border border-white/15 shadow-2xl backdrop-blur-xl"
      >
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#d4af37]" />
          <span className="font-cinematic text-xs tracking-widest text-zinc-200 font-bold uppercase">
            CHAPTER 25
          </span>
        </div>

        <div className="flex items-center gap-2">
          {onOpenCustomizer && (
            <button
              type="button"
              onClick={onOpenCustomizer}
              className="p-2 rounded-lg text-zinc-300 hover:text-white bg-white/5 border border-white/10"
              aria-label="Edit Chapter"
            >
              <SlidersHorizontal className="w-4 h-4" />
            </button>
          )}

          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 text-xs font-tech text-white border border-white/10"
            aria-label="Toggle Navigation Menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            <span>MENU</span>
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Menu Modal */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-[799] bg-black/95 backdrop-blur-2xl md:hidden flex flex-col justify-center px-8 py-12 transition-all duration-300"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div className="text-center mb-8">
            <span className="font-tech text-xs tracking-[0.3em] text-[#d4af37] uppercase">
              NAVIGATION
            </span>
            <h3 className="font-cinematic text-2xl text-white tracking-widest mt-1">
              THE NEXT CHAPTER
            </h3>
            <div className="w-12 h-[1px] bg-zinc-600 mx-auto mt-3" />
          </div>

          <div className="flex flex-col items-center gap-4">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  type="button"
                  onClick={() => {
                    onNavigate(link.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full max-w-xs py-3 px-6 rounded-xl flex items-center justify-between border transition-all ${
                    isActive
                      ? "bg-white/10 border-white/30 text-white font-semibold"
                      : "bg-zinc-900/50 border-white/5 text-zinc-400 hover:text-white hover:bg-zinc-800/50"
                  }`}
                >
                  <span className="font-tech text-xs text-zinc-500">{link.num}</span>
                  <span className="font-cinematic text-base tracking-widest uppercase">
                    {link.label}
                  </span>
                  <span className={`w-1.5 h-1.5 rounded-full ${isActive ? "bg-[#d4af37]" : "bg-transparent"}`} />
                </button>
              );
            })}
          </div>

          <div className="mt-8 text-center text-xs font-tech text-zinc-600 tracking-widest">
            TAP OUTSIDE TO CLOSE
          </div>
        </div>
      )}
    </>
  );
};
