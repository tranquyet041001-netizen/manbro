import React, { useEffect, useState, useRef } from "react";
import { Volume2, VolumeX, Play, Pause, Disc3 } from "lucide-react";
import { audioEngine } from "../../utils/audioEngine";

interface MusicPlayerProps {
  musicSrc?: string;
  trackTitle?: string;
  isExperienceStarted: boolean;
}

export const MusicPlayer: React.FC<MusicPlayerProps> = ({
  musicSrc,
  trackTitle = "The Next Chapter Suite",
  isExperienceStarted
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isUsingSynth, setIsUsingSynth] = useState(false);
  const [frequencies, setFrequencies] = useState<number[]>([15, 30, 20, 45, 25, 18]);
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    const unsubscribe = audioEngine.subscribe((playing, muted, usingSynth) => {
      setIsPlaying(playing);
      setIsMuted(muted);
      setIsUsingSynth(usingSynth);
    });

    return () => unsubscribe();
  }, []);

  // Equalizer visualizer loop
  useEffect(() => {
    if (!isPlaying || isMuted) {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
      setFrequencies([8, 8, 8, 8, 8, 8]);
      return;
    }

    const updateFreqs = () => {
      const data = audioEngine.getFrequencyData();
      if (data && data.length >= 6) {
        // Sample 6 representative bins
        const sampled = [
          Math.max(10, Math.min(100, Math.round((data[1] / 255) * 100))),
          Math.max(10, Math.min(100, Math.round((data[3] / 255) * 100))),
          Math.max(10, Math.min(100, Math.round((data[5] / 255) * 100))),
          Math.max(10, Math.min(100, Math.round((data[7] / 255) * 100))),
          Math.max(10, Math.min(100, Math.round((data[9] / 255) * 100))),
          Math.max(10, Math.min(100, Math.round((data[11] / 255) * 100)))
        ];
        setFrequencies(sampled);
      } else {
        // Fallback rhythmic animation
        const t = Date.now() * 0.003;
        setFrequencies([
          20 + Math.sin(t) * 15,
          35 + Math.cos(t * 1.3) * 20,
          50 + Math.sin(t * 0.8) * 30,
          30 + Math.cos(t * 1.5) * 18,
          25 + Math.sin(t * 1.1) * 15,
          15 + Math.cos(t * 0.9) * 10
        ]);
      }
      animationFrameRef.current = requestAnimationFrame(updateFreqs);
    };

    animationFrameRef.current = requestAnimationFrame(updateFreqs);

    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, [isPlaying, isMuted]);

  const handleTogglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    audioEngine.toggle(musicSrc);
  };

  const handleToggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    audioEngine.toggleMute();
  };

  if (!isExperienceStarted) return null;

  return (
    <aside
      aria-label="Cinematic Soundtrack Controller"
      className="fixed z-[900] top-4 right-4 md:top-6 md:right-6 flex items-center gap-2 p-1.5 md:p-2 rounded-full glass-panel border border-white/10 shadow-2xl transition-all duration-300 hover:border-white/20"
    >
      {/* Vinyl / Disc icon with spin animation */}
      <div className="relative pl-1">
        <Disc3
          className={`w-4 h-4 md:w-5 md:h-5 text-[#d4af37] ${
            isPlaying && !isMuted ? "animate-spin" : "opacity-60"
          }`}
          style={{ animationDuration: "6s" }}
        />
      </div>

      {/* Track info & mini equalizer (hidden on smallest screens) */}
      <div className="hidden sm:flex flex-col pr-1 text-left select-none">
        <span className="font-tech text-[9px] tracking-widest text-zinc-400 uppercase leading-none">
          {isUsingSynth ? "ATMOSPHERIC DRONE" : "ORIGINAL SCORE"}
        </span>
        <span className="font-body text-[11px] text-zinc-200 font-medium truncate max-w-[130px] leading-tight">
          {trackTitle}
        </span>
      </div>

      {/* Live Equalizer Waveform Bars */}
      <div
        className="flex items-end gap-[2px] h-4 px-1.5 cursor-pointer select-none"
        onClick={handleTogglePlay}
        title={isPlaying ? "Click to pause audio" : "Click to play audio"}
      >
        {frequencies.map((val, idx) => (
          <span
            key={idx}
            className="w-[2px] bg-zinc-300 rounded-full transition-all duration-75"
            style={{
              height: `${Math.max(3, (val / 100) * 16)}px`,
              backgroundColor: isPlaying && !isMuted ? "#d4af37" : "#52525b"
            }}
          />
        ))}
      </div>

      {/* Play / Pause Toggle Button */}
      <button
        type="button"
        onClick={handleTogglePlay}
        className="p-1.5 md:p-2 rounded-full bg-white/5 hover:bg-white/15 text-zinc-200 transition-colors focus:outline-none"
        aria-label={isPlaying ? "Pause cinematic audio" : "Play cinematic audio"}
        title={isPlaying ? "Pause" : "Play"}
      >
        {isPlaying ? <Pause className="w-3.5 h-3.5 md:w-4 md:h-4" /> : <Play className="w-3.5 h-3.5 md:w-4 md:h-4" />}
      </button>

      {/* Mute / Unmute Toggle Button */}
      <button
        type="button"
        onClick={handleToggleMute}
        className="p-1.5 md:p-2 rounded-full bg-white/5 hover:bg-white/15 text-zinc-300 transition-colors focus:outline-none"
        aria-label={isMuted ? "Unmute audio" : "Mute audio"}
        title={isMuted ? "Unmute" : "Mute"}
      >
        {isMuted ? (
          <VolumeX className="w-3.5 h-3.5 md:w-4 md:h-4 text-red-400" />
        ) : (
          <Volume2 className="w-3.5 h-3.5 md:w-4 md:h-4 text-zinc-200" />
        )}
      </button>
    </aside>
  );
};
