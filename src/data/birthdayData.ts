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
  year: string;
  location: string;
  image: string;
  caption: string;
  scale?: "large" | "medium" | "small";
  offset?: "top" | "bottom" | "center";
}

export interface ValueItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  number: string;
}

export interface AchievementItem {
  id: string;
  value: string;
  numericTarget?: number;
  suffix?: string;
  label: string;
  description: string;
}

export interface FutureStage {
  id: string;
  phase: "NOW" | "NEXT" | "SOMEDAY";
  title: string;
  goal: string;
  dream: string;
  destination: string;
  personalMessage: string;
}

export interface BirthdayData {
  name: string;
  fullName: string;
  age: number;
  dateStamp: string;
  hero: {
    title: string;
    subtitle: string;
    portraitImage: string;
  };
  theYear: {
    numeral: number;
    quote1: string;
    quote2: string;
    quote3: string;
  };
  timeline: TimelineItem[];
  memories: MemoryItem[];
  values: ValueItem[];
  achievements: AchievementItem[];
  letter: {
    teaser: string;
    paragraphs: string[];
    closing: string;
    signature: string;
  };
  emotionalPause: string;
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
  dateStamp: "25° / 09' / 2026",
  hero: {
    title: "HAPPY BIRTHDAY",
    subtitle: "CHAPTER 25",
    portraitImage:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1800&q=85"
  },
  theYear: {
    numeral: 25,
    quote1: "ANOTHER YEAR.",
    quote2: "ANOTHER CHAPTER.",
    quote3: "ANOTHER VERSION OF YOU."
  },
  timeline: [
    {
      id: "t1",
      year: "2021",
      age: 20,
      title: "THE BEGINNING",
      tagline: "First solitary steps",
      description:
        "Stepping into the unknown with nothing but determination and an unbending willingness to learn.",
      image:
        "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80",
      location: "SAIGON"
    },
    {
      id: "t2",
      year: "2022",
      age: 21,
      title: "THE TURNING POINT",
      tagline: "Defining the standard",
      description:
        "Discovering the craft in late-night sessions. Realizing that greatness is forged when nobody is watching.",
      image:
        "https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=1200&q=80",
      location: "THE STUDIO"
    },
    {
      id: "t3",
      year: "2023",
      age: 22,
      title: "THE CHALLENGE",
      tagline: "Tested by friction",
      description:
        "Faced with adversity, you proved that pressure does not break character—it crystallizes it.",
      image:
        "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80",
      location: "HIGHLANDS"
    },
    {
      id: "t4",
      year: "2024",
      age: 23,
      title: "THE GROWTH",
      tagline: "Unshakeable brotherhood",
      description:
        "Cultivating alliances that matter. Moving forward with quiet posture and elevated vision.",
      image:
        "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=1200&q=80",
      location: "COASTLINE"
    },
    {
      id: "t5",
      year: "2025",
      age: 24,
      title: "THE MASTERY",
      tagline: "Solid foundation",
      description:
        "Walking into rooms with calm presence. The standard is established; the trajectory is unmistakable.",
      image:
        "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=80",
      location: "TOKYO"
    },
    {
      id: "t6",
      year: "2026",
      age: 25,
      title: "THE HORIZON",
      tagline: "Unwritten greatness",
      description:
        "Standing at the threshold of a new chapter with the strength to lead and the wisdom to stay humble.",
      image:
        "https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&w=1200&q=80",
      location: "GLOBAL SKYLINE"
    }
  ],
  memories: [
    {
      id: "m1",
      title: "MIDNIGHT CLARITY",
      year: "2025",
      location: "CENTRAL HIGHWAY",
      image:
        "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=1400&q=85",
      caption: "Late hours, empty roads, and unfiltered conversations about what truly matters.",
      scale: "large",
      offset: "center"
    },
    {
      id: "m2",
      title: "ATOP THE RIDGELINE",
      year: "2024",
      location: "ALPINE RIDGE",
      image:
        "https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?auto=format&fit=crop&w=1000&q=80",
      caption: "Perspective gained only after enduring the incline.",
      scale: "medium",
      offset: "top"
    },
    {
      id: "m3",
      title: "PRECISION & CRAFT",
      year: "2024",
      location: "THE ATELIER",
      image:
        "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=900&q=80",
      caption: "Excellence in the invisible repetitions.",
      scale: "small",
      offset: "bottom"
    },
    {
      id: "m4",
      title: "THE INNER CIRCLE",
      year: "2025",
      location: "SHIBUYA DISTRICT",
      image:
        "https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=1200&q=85",
      caption: "The ones who stood in the trenches with you.",
      scale: "large",
      offset: "center"
    },
    {
      id: "m5",
      title: "DISCIPLINE IN SILENCE",
      year: "2025",
      location: "IRON VAULT",
      image:
        "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1000&q=80",
      caption: "Where willpower overrides exhaustion.",
      scale: "medium",
      offset: "bottom"
    }
  ],
  values: [
    {
      id: "v1",
      number: "01",
      title: "COURAGE",
      subtitle: "The First Stride",
      description:
        "For choosing to move forward even when the path is uncertain and the destination lies shrouded in fog."
    },
    {
      id: "v2",
      number: "02",
      title: "DISCIPLINE",
      subtitle: "The Unseen Anchor",
      description:
        "For continuing when motivation disappears and doing the necessary work without demanding applause."
    },
    {
      id: "v3",
      number: "03",
      title: "LOYALTY",
      subtitle: "The Sacred Pact",
      description:
        "For the people who stayed, the brothers in the trenches, and the commitments honored without compromise."
    },
    {
      id: "v4",
      number: "04",
      title: "AMBITION",
      subtitle: "Without A Ceiling",
      description:
        "For the dreams that refuse to be contained, relentlessly expanding what is possible for your circle."
    },
    {
      id: "v5",
      number: "05",
      title: "FAMILY",
      subtitle: "The True North",
      description:
        "For the people who make the journey meaningful and give substance to every victory earned."
    },
    {
      id: "v6",
      number: "06",
      title: "DREAMS",
      subtitle: "The Unwritten Canvas",
      description:
        "For everything that has not happened yet. The blueprint for a legacy that outlasts the noise."
    }
  ],
  achievements: [
    {
      id: "a1",
      value: "25",
      numericTarget: 25,
      label: "YEARS LIVED",
      description: "Forged in character, lessons, and victories."
    },
    {
      id: "a2",
      value: "1,000+",
      numericTarget: 1000,
      suffix: "+",
      label: "MEMORIES",
      description: "Shared with the few who truly know you."
    },
    {
      id: "a3",
      value: "∞",
      label: "DREAMS REMAINING",
      description: "The horizon is limitless. The best chapter is ahead."
    }
  ],
  letter: {
    teaser: "THERE IS SOMETHING I WANT TO SAY.",
    paragraphs: [
      "There are things we don't say often enough.",
      "Thank you for making it this far.",
      "For every difficult day you survived without making a sound.",
      "For every decision that quietly redirected your destiny.",
      "For every dream you refused to abandon when others doubt.",
      "This isn't the end of a chapter.",
      "It's the beginning of another one."
    ],
    closing: "With highest respect & unwavering pride,",
    signature: "YOUR INNER CIRCLE"
  },
  emotionalPause: "AND THERE IS STILL SO MUCH AHEAD.",
  future: [
    {
      id: "f1",
      phase: "NOW",
      title: "THE FOUNDATION",
      goal: "Deepen mastery, eliminate noise, and operate from unwavering inner stillness.",
      dream: "Build something of lasting significance with true craftsmen.",
      destination: "High Mountain Passes & Quiet Horizons",
      personalMessage: "Anchor yourself in discipline. Today dictates tomorrow."
    },
    {
      id: "f2",
      phase: "NEXT",
      title: "THE EXPANSION",
      goal: "Lead bigger endeavors, multiply impact, and create freedom for those you love.",
      dream: "Establish a venture that outlives the temporary trends.",
      destination: "The Dolomites & Scandinavian Fjords",
      personalMessage: "Carry the weight with dignity. You were built for this altitude."
    },
    {
      id: "f3",
      phase: "SOMEDAY",
      title: "THE LEGACY",
      goal: "Live with zero regrets, uncompromised loyalty, and complete freedom.",
      dream: "Stand on the summit with the brotherhood and know we lived with honor.",
      destination: "The Open Horizon",
      personalMessage: "The years will pass regardless. Ensure each one leaves an indelible mark."
    }
  ],
  music: {
    src: "/assets/music/birthday.mp3",
    title: "Cinematic Atmosphere (Nocturne in C-Minor)",
    artist: "The Next Chapter Suite"
  }
};
