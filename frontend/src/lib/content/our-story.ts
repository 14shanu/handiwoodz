export const ourStoryContent = {
  hero: {
    title: "Our Story",
    subtitle: "Crafting tradition, one block at a time",
  },

  narrative: [
    {
      badge: "The Heritage",
      heading: "The Heart of Woodcraft",
      body: "Handiwoodz was born in a small coastal workshop with nothing but a single chisel and a profound respect for the living tree. Our journey began with the realization that in an age of mass production, the soul of a piece is found in the time it takes to create it. We preserve the ancient techniques of hand-carving that have been passed down through generations of master woodworkers.",
    },
    {
      badge: "Our People",
      heading: "Master Artisans",
      body: "Our workshop is home to artisans who have spent decades perfecting the art of the cut. These are not just employees; they are the custodians of a dying art form. Each piece reflects their individual touch, a unique signature that no machine can ever replicate.",
      quote: "Every stroke of the chisel is a breath of life into the wood.",
    },
    {
      badge: "Commitment",
      heading: "Our Values",
      body: "We believe in sustainability as a way of life, not a marketing term. Every piece of Sheesham and Teak is ethically sourced from managed forests. Our process is intentionally slow, allowing the wood to season naturally and our artisans to work without the pressure of a clock. This is slow living in physical form.",
    },
  ],

  process: {
    heading: "The Journey of a Handiwoodz Piece",
    steps: [
      { icon: "📐", title: "Design Selection", description: "Digital blueprints meets ancient patterns to create timeless designs." },
      { icon: "🌳", title: "Wood Preparation", description: "Selecting only the finest Sheesham and Teak from sustainable sources." },
      { icon: "🔨", title: "Hand Carving", description: "Patience and precision in every detail carved by our artisans." },
      { icon: "✓", title: "Quality & Care", description: "Finished with natural oils for a lifetime of beauty and use." },
    ],
  },

  stats: [
    { value: "15,000+", label: "Blocks Crafted" },
    { value: "40+", label: "Master Artisans" },
    { value: "3", label: "Decades of Heritage" },
  ],

  cta: {
    heading: "Ready to create something beautiful?",
    primaryButton: "Browse Collection",
    secondaryButton: "Upload Your Design",
  },
} as const;

export type OurStoryContent = typeof ourStoryContent;
