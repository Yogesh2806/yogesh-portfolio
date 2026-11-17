// Content for the V2 home page.
export const WORK = [
  { href: "/work/doctiq/", c: "var(--ind)", n: "01", kicker: "HealthTech · Clinic SaaS", cover: "/img/home/cover-doctiq.webp", title: "Designing an AI-powered clinic SaaS app, shipped in two weeks",
    desc: "Founding designer. Dense EMR workflows turned into a hands-free clinical workspace: ambient voice scribe, WhatsApp triage, bed matrix.", chips: ["Founding designer", "Responsive web", "2025"], big: "~5 min → ~45 s", small: "consult documentation time (client-reported)" },
  { href: "/work/speak-plus/", c: "var(--pink)", n: "02", kicker: "EdTech · Wall Street English", cover: "/img/home/cover-speak.webp", title: "Reviving a dead app: from 5 to 2,000+ paid subscriptions",
    desc: "A strong feature trapped in the wrong container, repositioned inside the core course with new onboarding and in-app promotion.", chips: ["Product strategy", "Web + mobile", "2024–26"], big: "5 → 2,000+", small: "paid subscriptions in six months" },
  { href: "/work/swimingo/", c: "var(--teal)", n: "03", kicker: "Marketplace · Sports", cover: "/img/home/cover-swimingo.webp", title: "Building trust into a two-sided swimming marketplace",
    desc: "Rebrand and product: verified instructor onboarding, dual dashboards and flexible scheduling.", chips: ["Rebrand", "Design system", "2024"], big: "~90%", small: "retention lift (founder-reported)" },
  { href: "/design-system/", c: "var(--ac)", n: "04", kicker: "Design systems · Open source", cover: "/img/ds/ds-figma-thumbnail.webp", title: "An open-source design system, with Claude as my build partner",
    desc: "Monochrome and accessibility-first. Bring your own brand in 11 tokens; the Figma library is generated from code.", chips: ["Self-initiated", "Open source", "2026"], big: "249 tokens", small: "45 React components, 3 themes" },
];

export const EXP = [
  { when: "Mar 2022 – Jul 2023", co: "CES", role: "Associate Software Technologist" },
  { when: "Nov 2023 – Jul 2024", co: "Ducima", role: "Design Consultant · Freelance" },
  { when: "Apr – Jul 2024", co: "Swimingo", role: "Product Designer · Freelance" },
  { when: "Jul 2024 – Feb 2026", co: "Wall Street English", role: "Product Designer · via Strawberry Infotech" },
  { when: "Jan 2025 – Aug 2026", co: "Modent Me", role: "Founder &amp; Creative Head" },
  { when: "Nov 2025 – Now", co: "Doctiq", role: "Founding Product Designer (Part-time)", now: true },
];

export const HOW = [
  ["Understand", "UX research, JTBD, journey mapping and competitive analysis. Find the real problem before drawing anything."],
  ["Shape", "Information architecture, flows and fast prototypes. AI speeds up exploration; taste and critique decide."],
  ["Ship", "High-fidelity UI, design systems and clean handoff. Then measure, and improve what the numbers say."],
];

// [name, what for, background, text, outlined]
export const TOOLS: [string, string, string, string, boolean?][] = [
  ["Figma", "UI + systems", "#A259FF", "#1A1426"], ["Claude", "thinking partner", "#D97757", "#1A1426"], ["ChatGPT", "ideation", "#10A37F", "#1A1426"],
  ["Notion", "docs + PRDs", "#FBF5EA", "#1A1426", true], ["Dovetail", "research synthesis", "#6B4EFF", "#FBF5EA"], ["Framer", "sites + motion", "#1A1426", "#FBF5EA"],
  ["Jitter", "motion", "#F4A300", "#1A1426"], ["Miro", "workshops", "#FFD02F", "#1A1426"], ["Maze", "usability tests", "#E8457A", "#1A1426"],
  ["Hotjar", "behaviour", "#FBF5EA", "#1A1426", true], ["Jira", "shipping", "#2B3A8C", "#FBF5EA"], ["Claude Code", "prototypes in code", "#D97757", "#1A1426"],
  ["Gemini", "research", "#3A63C4", "#FBF5EA"], ["Adobe CC", "craft", "#1A1426", "#FBF5EA"],
];
export const ROT = [-2.4, 1.8, -1.2, 3, -3.6, 1.2, -1.8, 3.6, -3, 1.8, -1.2, 2.4, -2.4, 3];

export const PHOTOS = [
  { src: "/img/v2/story-sky.webp", alt: "A paraglider floating in a clear desert sky", r: -2.5 },
  { src: "/img/v2/story-desk.webp", alt: "Yogesh at his desk in Chennai, arms wide", r: 1.5 },
  { src: "/img/v2/story-cafe.webp", alt: "A coffee and a laptop open on a café table", r: -1 },
];
