export interface TimelineItem {
  id: string;
  year: string;
  age: number;
  title: string;
  tagline: string;
  description: string;
  image: string;
  location?: string;
}

export interface MemoryItem {
  id: string;
  title: string;
  category: "BROTHERHOOD" | "MILESTONES" | "ADVENTURE" | "FOCUS";
  year: string;
  image: string;
  caption: string;
  isVideo?: boolean;
  videoSrc?: string;
  aspectRatio?: "landscape" | "portrait" | "square";
}

export interface ValueItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  iconName: "courage" | "discipline" | "loyalty" | "ambition" | "family" | "dreams";
  number: string;
}

export interface AchievementItem {
  id: string;
  value: string;
  numericTarget?: number;
  label: string;
  description: string;
  suffix?: string;
}

export interface FutureStage {
  id: string;
  phase: "NOW" | "NEXT" | "FUTURE";
  title: string;
  period: string;
  goal: string;
  dream: string;
  destination: string;
  personalMessage: string;
}

export interface BirthdayData {
  name: string;
  fullName: string;
  age: number;
  birthDate: string;
  chapterTitle: string;
  tagline: string;
  heroSubtitle: string;
  introQuote: string;
  introParagraph: string;
  timelineSubtitle: string;
  timeline: TimelineItem[];
  memories: MemoryItem[];
  values: ValueItem[];
  achievements: AchievementItem[];
  letter: {
    title: string;
    date: string;
    salutation: string;
    paragraphs: string[];
    closing: string;
    signature: string;
    postscript?: string;
  };
  future: FutureStage[];
  music: {
    src: string;
    title: string;
    artist: string;
  };
}

export const initialBirthdayData: BirthdayData = {
  name: "MINH",
  fullName: "MINH TRAN",
  age: 25,
  birthDate: "OCTOBER 14",
  chapterTitle: "CHAPTER 25",
  tagline: "ANOTHER YEAR. ANOTHER CHAPTER. ANOTHER VERSION OF YOURSELF.",
  heroSubtitle: "WHERE STILLNESS MEETS AMBITION // CHAPTER 25 BEGINS NOW",
  introQuote: "A NEW YEAR. A NEW CHAPTER.",
  introParagraph:
    "Another year has passed. Not everything went according to plan. But every step, every mistake, every victory has shaped the person standing here today. Stand tall, embrace the road ahead, and write the next pages with conviction.",
  timelineSubtitle:
    "Some moments become memories. Some memories become who we are.",
  timeline: [
    {
      id: "t1",
      year: "2021",
      age: 20,
      title: "THE BEGINNING",
      tagline: "Setting out into the unknown",
      description:
        "Leaving the comfort zone behind. The quiet realization that potential means nothing without the courage to take the first solitary stride.",
      image:
        "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80",
      location: "SAIGON / HOME"
    },
    {
      id: "t2",
      year: "2022",
      age: 21,
      title: "THE TURNING POINT",
      tagline: "When standards became non-negotiable",
      description:
        "Discovering the craft and finding the discipline to stay up when the city sleeps. Learning that greatness is built in unseen repetitions.",
      image:
        "https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=1200&q=80",
      location: "THE STUDIO"
    },
    {
      id: "t3",
      year: "2023",
      age: 22,
      title: "THE CHALLENGE",
      tagline: "Tested by friction and fire",
      description:
        "A year of friction and resilience. When unexpected hurdles arrived, you didn't flinch. You proved that pressure only crystallizes character.",
      image:
        "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80",
      location: "NORTHERN HIGHLANDS"
    },
    {
      id: "t4",
      year: "2024",
      age: 23,
      title: "THE GROWTH",
      tagline: "Expanding horizons and building brotherhood",
      description:
        "Expanding horizons, leading projects, and cultivating bonds that cannot be broken. Walking into rooms with quiet confidence.",
      image:
        "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=1200&q=80",
      location: "COASTAL EXPEDITIONS"
    },
    {
      id: "t5",
      year: "2025",
      age: 24,
      title: "THE NEXT STEP",
      tagline: "Mastery and uncompromised vision",
      description:
        "The foundation is solid. The compass is steady. You stand at the threshold of mastery, ready to conquer higher altitudes with those who matter most.",
      image:
        "https://images.unsplash.com/photo-1507034589631-9433cc6bc453?auto=format&fit=crop&w=1200&q=80",
      location: "TOKYO SKYLINE"
    }
  ],
  memories: [
    {
      id: "m1",
      title: "NIGHT RUNS & CONVERSATIONS",
      category: "BROTHERHOOD",
      year: "2025",
      image:
        "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=1200&q=80",
      caption: "Late hours, fast engines, and honest conversations that keep our standards elevated.",
      aspectRatio: "landscape"
    },
    {
      id: "m2",
      title: "ATOP THE RIDGELINE",
      category: "ADVENTURE",
      year: "2024",
      image:
        "https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?auto=format&fit=crop&w=1200&q=80",
      caption: "Looking out across misty peaks at sunrise. Perspective gained only by climbing.",
      aspectRatio: "portrait"
    },
    {
      id: "m3",
      title: "THE OBSESSION WITH CRAFT",
      category: "FOCUS",
      year: "2024",
      image:
        "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=80",
      caption: "Dressed sharp, moving purposefully. Precision in every small detail.",
      aspectRatio: "landscape"
    },
    {
      id: "m4",
      title: "MIDNIGHT URBAN REEL",
      category: "MILESTONES",
      year: "2025",
      image:
        "https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&w=1200&q=80",
      caption: "Reflections of neon and concrete. A cinematic frame of a night we won't forget.",
      isVideo: true,
      videoSrc: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
      aspectRatio: "landscape"
    },
    {
      id: "m5",
      title: "THE INNER CIRCLE",
      category: "BROTHERHOOD",
      year: "2023",
      image:
        "https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=1200&q=80",
      caption: "Laughter, loyalty, and iron-clad trust. The brothers who showed up when it mattered.",
      aspectRatio: "square"
    },
    {
      id: "m6",
      title: "DISCIPLINE IN SILENCE",
      category: "FOCUS",
      year: "2025",
      image:
        "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=80",
      caption: "Where physical grit meets mental fortitude. Early mornings that forge character.",
      aspectRatio: "portrait"
    }
  ],
  values: [
    {
      id: "v1",
      number: "01",
      title: "COURAGE",
      subtitle: "Walking into uncertainty",
      description: "For choosing to move forward even when the path is uncertain and the destination lies shrouded in fog.",
      iconName: "courage"
    },
    {
      id: "v2",
      number: "02",
      title: "DISCIPLINE",
      subtitle: "The anchor of greatness",
      description: "For continuing when motivation disappears and doing the necessary work without seeking applause.",
      iconName: "discipline"
    },
    {
      id: "v3",
      number: "03",
      title: "LOYALTY",
      subtitle: "The unbreakable bond",
      description: "For the people who stayed, the brothers in the trenches, and the commitments kept without condition.",
      iconName: "loyalty"
    },
    {
      id: "v4",
      number: "04",
      title: "AMBITION",
      subtitle: "Without a ceiling",
      description: "For the dreams that still have no ceiling, relentlessly expanding what is possible for yourself and those you protect.",
      iconName: "ambition"
    },
    {
      id: "v5",
      number: "05",
      title: "FAMILY",
      subtitle: "The true compass",
      description: "For the people who make the journey meaningful and give substance to every victory earned.",
      iconName: "family"
    },
    {
      id: "v6",
      number: "06",
      title: "DREAMS",
      subtitle: "The unwritten future",
      description: "For everything that has not happened yet. The blueprints, the adventures, and the chapters waiting to be written.",
      iconName: "dreams"
    }
  ],
  achievements: [
    {
      id: "a1",
      value: "25",
      numericTarget: 25,
      suffix: "",
      label: "YEARS OF MEMORIES",
      description: "Forged in trials, celebrations, and enduring life lessons."
    },
    {
      id: "a2",
      value: "18",
      numericTarget: 18,
      suffix: "+",
      label: "PLACES VISITED",
      description: "Cities, mountain passes, and oceans crossed with conviction."
    },
    {
      id: "a3",
      value: "42",
      numericTarget: 42,
      suffix: "",
      label: "GOALS ACHIEVED",
      description: "Projects delivered, records broken, and personal standards met."
    },
    {
      id: "a4",
      value: "∞",
      suffix: "",
      label: "DREAMS REMAINING",
      description: "The horizon is infinite. The best work is still ahead."
    }
  ],
  letter: {
    title: "A LETTER FOR YOU",
    date: "OCTOBER 14 // CHAPTER 25",
    salutation: "To Minh,",
    paragraphs: [
      "There are probably many things I could say today.",
      "But perhaps the simplest thing is this: I'm glad you made it this far.",
      "Through the difficult days, the unexpected turns, the quiet victories, and the heavy moments nobody else saw.",
      "You've shown what it looks like to carry responsibility with dignity, to face adversity without bitterness, and to stand as a rock for those around you.",
      "I hope this next chapter gives you more reasons to be proud of the person you are becoming. Keep your standards high, keep your heart grounded, and never forget who you are.",
      "Happy Birthday."
    ],
    closing: "With utmost respect & pride,",
    signature: "YOUR INNER CIRCLE",
    postscript: "P.S. Chapter 25 is yours to conquer."
  },
  future: [
    {
      id: "f1",
      phase: "NOW",
      title: "THE FOUNDATION",
      period: "PRESENT DAY // AGE 25",
      goal: "Cement habits, deepen mastery, and operate from unshakeable inner peace.",
      dream: "Build something of lasting significance with true craftsmen.",
      destination: "Kyoto & High Alpine Passes",
      personalMessage: "Anchor yourself in discipline. The habits of today dictate the legacy of tomorrow."
    },
    {
      id: "f2",
      phase: "NEXT",
      title: "THE EXPANSION",
      period: "THE COMING YEARS // 2026—2028",
      goal: "Multiply influence, lead bigger ventures, and create freedom for loved ones.",
      dream: "Establish a venture that outlives the noise of the moment.",
      destination: "Scandinavian Coastlines & Dolomites",
      personalMessage: "Do not fear the weight of greater responsibility. You were built to carry it."
    },
    {
      id: "f3",
      phase: "FUTURE",
      title: "THE LEGACY",
      period: "THE HORIZON // CHAPTERS AHEAD",
      goal: "Live with zero regrets, uncompromising loyalty, and total freedom.",
      dream: "Stand on the summit with the brotherhood and say: 'We did it right.'",
      destination: "The Infinite Horizon",
      personalMessage: "The years will pass regardless. Ensure each one leaves a mark that cannot be erased."
    }
  ],
  music: {
    src: "/assets/music/birthday.mp3",
    title: "Cinematic Atmosphere (Nocturne in C-Minor)",
    artist: "The Next Chapter Suite"
  }
};
