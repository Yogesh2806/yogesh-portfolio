// Content for the Visuals page. Each project: rows of images; a row is [layout, height, images].
export type VImg = { src: string; alt: string; pos?: string; bg?: string; fit?: "cover" | "contain" };
export type VProject = { id: string; name: string; line: string; tags: string[]; c: string; kind: ("mobile" | "web" | "brand")[]; rows: ["full" | "2" | "3" | "75", number, VImg[]][] };
const V = "/img/visuals/";
export const PROJECTS: VProject[] = [
  { id: "minimo", name: "MiniMo", line: "A little push, right on time.", tags: ["iOS", "App concept", "Widgets"], c: "#C9774F", kind: ["mobile"],
    rows: [["full", 720, [{ src: V + "minimo-hero.webp", alt: "MiniMo home screen and random boost" }]], ["3", 300, [{ src: V + "minimo-random.webp", alt: "Random mode and schedule" }, { src: V + "minimo-widgets.webp", alt: "Widgets in four tints" }, { src: V + "minimo-playback.webp", alt: "Lock screen and Dynamic Island" }]]] },
  { id: "go-calories", name: "Go Calories", line: "Track what you eat, calmly.", tags: ["iOS", "Built with Claude Code", "On-device AI"], c: "#B8B2A6", kind: ["mobile"],
    rows: [["full", 720, [{ src: V + "gocal-cover.webp", alt: "Go Calories profile, today and describe-a-meal" }]], ["3", 300, [{ src: V + "gocal-onboarding.webp", alt: "Onboarding" }, { src: V + "gocal-log.webp", alt: "Four ways to log a meal" }, { src: V + "gocal-history.webp", alt: "History and macros" }]]] },
  { id: "learn-prep", name: "Learn Prep", line: "Study anywhere, with the AI you choose.", tags: ["PWA", "Offline-first", "Built with Claude Code"], c: "#7FA05A", kind: ["web", "mobile"],
    rows: [["full", 720, [{ src: V + "learnprep-hero.webp", alt: "Learn Prep on desktop and phone" }]], ["2", 380, [{ src: V + "learnprep-modes.webp", alt: "Study modes, light and dark" }, { src: V + "learnprep-ai.webp", alt: "Choose your AI engine" }]]] },
  { id: "bizflyte", name: "Bizflyte", line: "One stop for your travel and stay.", tags: ["Travel", "Web app", "Mobile app"], c: "#5B86E5", kind: ["web", "mobile", "brand"],
    rows: [["full", 720, [{ src: V + "macbook-pro-16-2.webp", alt: "Bizflyte web and mobile in perspective" }]], ["2", 380, [{ src: V + "temlate.webp", alt: "Bizflyte brand board" }, { src: V + "slide-16-9-14.webp", alt: "Main mobile screens, light and dark" }]],
      ["75", 380, [{ src: V + "slide-16-9-8.webp", alt: "Bizflyte web app" }, { src: V + "frame-1000006527.webp", alt: "App icons, light and dark", bg: "#151515", fit: "contain" }]]] },
  { id: "doctiq", name: "Doctiq", line: "Less paperwork, more patient care.", tags: ["HealthTech", "Web app", "Patient app"], c: "var(--ind)", kind: ["web", "mobile"],
    rows: [["full", 720, [{ src: V + "doctiq.webp", alt: "Doctiq landing page", pos: "top" }]], ["3", 300, [{ src: V + "frame-1321316311.webp", alt: "Patient app: home and doctors", pos: "top", bg: "#000" }, { src: V + "login.webp", alt: "Login with OTP" }, { src: V + "verified.webp", alt: "OTP verified" }]]] },
  { id: "architectural-archive", name: "The Architectural Archive", line: "The tape, not the size letter.", tags: ["E-commerce", "Menswear", "Website"], c: "#D9603B", kind: ["web"],
    rows: [["2", 450, [{ src: V + "archive-2.webp", alt: "Home: nothing off the rack was drawn to your dimensions" }, { src: V + "archive-1.webp", alt: "Men, filtered to 6 foot 5" }]]] },
  { id: "modent-media", name: "Modent Media", line: "A red that means business.", tags: ["Brand identity", "Guidelines"], c: "#E53935", kind: ["brand"],
    rows: [["full", 720, [{ src: V + "accent-4.webp", alt: "Modent Media logo in action" }]], ["2", 380, [{ src: V + "color-styles.webp", alt: "Colour styles" }, { src: V + "in-practice-5.webp", alt: "Photography in practice" }]]] },
  { id: "pinboard", name: "The pinboard", line: "Smaller projects, same care.", tags: ["Mobile app", "AI product", "Poster"], c: "var(--pink)", kind: ["mobile", "web", "brand"],
    rows: [["3", 300, [{ src: V + "food1.webp", alt: "Good Food: health food delivery app" }, { src: V + "wireframe-1.webp", alt: "Platypuzz AI: idea to MVP" }, { src: V + "g-3.webp", alt: "Creativity: a poster experiment" }]]] },
];
