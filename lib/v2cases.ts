// Content for the V2 case study pages. Strings may hold small bits of HTML (<i>, <span class="it">).
type Pair = [string, string];
type Img = { src: string; alt: string; cap?: string; note?: string; h?: number; pos?: string };
export type Block =
  | { k: "cards"; name: string; title: string; intro?: string; items: Pair[]; cols?: number; numbered?: "num" | "abc"; small?: boolean; img?: Img }
  | { k: "research"; title: string; intro?: string; methods: Pair[]; personas?: Pair[]; plabel?: string }
  | { k: "insight"; quote: string; sub: string }
  | { k: "features"; title: string; intro: string; feats: [string, string, string, Img][] }
  | { k: "image"; name: string; title: string; img: Img }
  | { k: "pair"; name: string; title: string; a: Img; b: Img; cols?: string }
  | { k: "tradeoffs"; title: string; rows: [string, string, string, string][] }
  | { k: "impact"; title: string; items: Pair[]; note: string; cols?: number }
  | { k: "reflection"; title: string; a: string; b: string; note: string }
  | { k: "foundations" } | { k: "tokens" } | { k: "workflow" } | { k: "gallery"; title: string; items: Img[]; wide: [Img, Img] } | { k: "links" };

export type Case = {
  slug: string; name: string; c: string; idx: string; kicker: string; title: string; sub: string; meta: Pair[];
  cover: Img & { bg: string; h: number }; coverNote: string;
  tldr: string; mets: Pair[]; metsSrc: string; live?: [string, string];
  blocks: Block[]; next: { href: string; dot: string; kicker: string; title: string; cover: string };
};

const C = "/img/cases/";
export const CASES: Case[] = [
  {
    slug: "doctiq", name: "Doctiq", c: "var(--ind)", idx: "01", kicker: "HealthTech · Clinic SaaS",
    title: 'Designing an AI clinic workspace, shipped in <span class="it ind">two weeks</span>.',
    sub: "I overhauled Doctiq into a hands-free workspace for clinics and hospitals: an ambient voice scribe, a 24/7 WhatsApp receptionist and a bed matrix, ready for a regional medical expo.",
    meta: [["Role", "Founding product designer"], ["Team", "Solo, with the founder and one engineer"], ["Platform", "Responsive web app"], ["Timeline", "2-week sprint, 2025"]],
    cover: { src: C + "doctiq-doctiq-cover.webp", alt: "Doctiq: the ultimate workspace for modern clinics", bg: "#EEF1FA", h: 800 }, coverNote: "PRD to shipped in 2 weeks ;)",
    tldr: "Less typing, more care. The less Doctiq asked of doctors, the more they trusted it.",
    mets: [["~5 min → ~45 s", "consult documentation time"], ["300+", "qualified leads at the medical expo"], ["2 + 1", "clinics and a hospital live"], ["~70%", "fewer unhandled inquiries"]],
    metsSrc: "Client-reported, from pilot clinic interviews and written feedback, not formal analytics.", live: ["Live product ↗", "https://doctiq.in/"],
    blocks: [
      { k: "cards", name: "The problem", title: 'Clinicians were typing, not <span class="it ind">treating</span>.', intro: "Indian EMR tools make doctors fill rigid forms mid-consult. Four problems compounded, and the brief added one more: fix it all, in two weeks.", cols: 2, numbered: "num",
        items: [["Documentation fatigue", "Doctors spent up to 40% of a consult typing symptoms, vitals and medicines."], ["Front-desk bottlenecks", "WhatsApp inquiries piled up, slots went empty and revenue leaked."], ["Rigid incumbents", "Practo, DocOn and Eka Care lock clinics into fixed schemas."], ["Steep learning curves", "Senior doctors and directors abandon software that needs training."]] },
      { k: "research", title: 'Two weeks, still grounded in <span class="it ind">real clinics</span>.',
        methods: [["Competitor teardown", "4 incumbents, mapped for clutter and missing hands-free input"], ["Doctor interviews", "4 practising doctors, observed in real consults"], ["Team synthesis", "Founder and lead engineer, turning concepts into flows"]],
        personas: [["Senior practitioner", "zero-typing notes"], ["Practice manager", "live queues and triage"], ["Facility admin", "beds, admissions, billing"]] },
      { k: "insight", quote: "The winning move wasn&#8217;t more features. It was getting the interface <i>out of the way</i>.", sub: "The less the software asked doctors to do, the more they trusted and adopted it." },
      { k: "cards", name: "Principles", title: 'Five rules every screen had to <span class="it ind">pass</span>.', cols: 5, numbered: "num", small: true,
        items: [["Hands-free first", "Voice and automation over forms."], ["Speak human", "“Voice-to-Prescription”, not “NLP”."], ["No training needed", "Productive on day one."], ["Surface what matters", "Essentials up front, raw detail in drawers."], ["Modular by design", "Customise without breaking data."]] },
      { k: "features", title: 'One calm workspace, four <span class="it ind">jobs done</span>.', intro: "Each feature replaced a manual chore. Real screens, straight from the product.",
        feats: [["A · 24/7 AI receptionist", "WhatsApp inquiries, answered while the clinic sleeps", "A two-pane inbox automates booking, with an instant AI / Human mode switch when staff need to step in.", { src: C + "doctiq-doctiq-dash.webp", alt: "Doctiq AI inbox with WhatsApp conversations" }],
          ["B · Broadcasts", "Campaigns with a live phone preview", "Pick a patient cohort, see the exact WhatsApp message, send in the background so the clinic never slows.", { src: C + "doctiq-doctiq-whatsapp-campaign.webp", alt: "WhatsApp campaign composer with live preview" }],
          ["C · Milestones", "Adoption, made a little bit fun", "Quest cards and streaks reward staff for daily use, so a new tool becomes a habit.", { src: C + "doctiq-doctiq-milestone.webp", alt: "Milestones quest board and reward feed" }],
          ["D · Patient profile", "Everything about a patient, one glance", "History, guardians and visits up top. The raw voice transcript lives in a drawer, not in the doctor&#8217;s face.", { src: C + "doctiq-doctiq-patient-profile.webp", alt: "Patient profile with history and guardian contacts" }]] },
      { k: "image", name: "Before &amp; after", title: 'Same data, half the <span class="it ind">noise</span>.', img: { src: C + "doctiq-compare-doctiq-2.webp", alt: "Before and after: the Doctiq dashboard", cap: "Left: the legacy dashboard. Right: the redesign." } },
      { k: "tradeoffs", title: 'The hard calls were about <span class="it ind">restraint</span>.',
        rows: [["Full transcript", "Structured fields", "Transcript tucked in a drawer; the screen shows auto-filled prescriptions.", "Doctors see decisions, not noise."], ["Deep customisation", "Standard components", "A template engine for letterheads and fields, with backend validation intact.", "Flexible for every specialty, no schema chaos."], ["Speed", "A full design system", "Tokens first, components refined in code with the engineer.", "Shipped on deadline; tokens still scale."]] },
      { k: "impact", title: 'What changed for the <span class="it ind">clinics</span>.', note: "Client-reported figures from pilot clinics, not formal analytics.",
        items: [["~5 min → ~45 s", "consult documentation time"], ["300+", "qualified leads at the expo, from live demos"], ["2 + 1", "clinics and a hospital live, 2 more rolling out"], ["~65%", "less admin documentation in pilots"], ["~40%", "more after-hours bookings via the AI receptionist"], ["24 hrs", "for non-technical staff to get proficient"]] },
      { k: "reflection", title: 'Healthcare design is <span class="it ind">subtraction</span>.', a: "The wins came from stripping away jargon and keystrokes, not adding features. Renaming an “NLP” feature to Voice-to-Prescription did as much for adoption as any screen.", b: "AI let me plan, test and ship an enterprise-grade product solo in two weeks, without handing over a single strategic decision. Next, I&#8217;d grow the tokens into a full design system.", note: "what I&#39;d do next: a proper DS ↗" },
    ],
    next: { href: "/work/speak-plus/", dot: "var(--pink)", kicker: "EdTech · Wall Street English", title: "Reviving a dead app: from 5 to 2,000+ paid subscriptions", cover: C + "speakp-speak-cover.webp" },
  },
  {
    slug: "speak-plus", name: "Speak+", c: "var(--pink)", idx: "02", kicker: "EdTech · Wall Street English",
    title: 'Reviving a dead app: from 5 to <span class="it pink">2,000+</span> paid subscriptions.',
    sub: "I repositioned Speak+ from a failing standalone app into a feature inside Wall Street English&#8217;s Core Course, with new positioning, onboarding and in-app promotion.",
    meta: [["Role", "Product designer (sole designer)"], ["Team", "1 PM, 3 developers and me"], ["Platform", "Web and mobile"], ["Timeline", "2 months build, 5 months rollout"]],
    cover: { src: C + "speakp-speak-cover.webp", alt: "Speak+ inside the Core product", bg: "#F4F6FB", h: 780 }, coverNote: "5 paid subs. then 2,000+ :)",
    tldr: "Don&#8217;t sell a new app. Move the feature to where learners already are.",
    mets: [["5 → 2,000+", "paid subscriptions in 6 months"], ["15+", "countries on the platform"], ["1", "designer: me"]],
    metsSrc: "Subscription figures from Wall Street English internal reporting.",
    blocks: [
      { k: "cards", name: "The problem", title: 'A strong feature, trapped in the <span class="it pink">wrong container</span>.', intro: "Speak+ was a standalone app for unlimited small-group speaking classes. Decent downloads, almost no conversion.", cols: 3, numbered: "num",
        items: [["Unclear value", "Outside any learning journey, new users couldn&#8217;t see why it mattered."], ["Weak onboarding, dated UI", "Little to build trust, so free trials rarely converted."], ["Flatlined at 5", "Paid subscriptions simply stopped moving."]] },
      { k: "research", title: 'The buyers were <span class="it pink">already inside</span>.', intro: "Existing Core Course students were a warm, trusting audience. They just weren&#8217;t upgrading.", plabel: "Designed for",
        methods: [["Satisfaction surveys", "What learners valued, and where Speak+ fit their week."], ["In-app behaviour", "Where students dropped off and ignored upgrade prompts."], ["Teacher signal", "Teachers recommended it, and adoption still stalled."]],
        personas: [["Core Course student", "won&#8217;t pay twice"], ["Advanced learner", "wants to keep speaking"], ["Alumni", "at risk of drifting away"]] },
      { k: "insight", quote: "It wasn&#8217;t an acquisition gap. It was <i>positioning, placement and pricing</i>.", sub: "Speak+ was priced as a separate product stacked on a course students had already paid for." },
      { k: "cards", name: "Principles", title: 'Four rules for promoting without <span class="it pink">pushing</span>.', cols: 4, numbered: "num", small: true,
        items: [["Seamless", "A continuation, not an upsell."], ["Valuable", "Practice framed as a fluency builder."], ["Trust-led", "Contextual education, no hard sell."], ["Scalable", "Reusable promo surfaces and entry points."]] },
      { k: "cards", name: "What I designed", title: 'From standalone app to a feature in <span class="it pink">Core</span>.', intro: "Three moves carried the work.", cols: 3, numbered: "abc",
        items: [["Positioning &amp; messaging", "Practice-first flows that framed Speak+ as the natural next step for advanced learners and alumni."], ["In-app promotion", "Milestone-based prompts on the dashboard, onboarding and level results, right when its value was clearest."], ["Ecosystem integration", "Folded into existing subscriptions and alumni flows, so upgrading felt like continuing."]],
        img: { src: C + "speakp-speak-integeration.webp", alt: "Speak+ integration into the Core app, step by step", cap: "The integration, step by step.", h: 720 } },
      { k: "pair", name: "Before &amp; after", title: 'Same practice, a new <span class="it pink">home</span>.',
        a: { src: C + "speakp-old-speak.webp", alt: "Before: Speak+ as a standalone app", cap: "Before: a standalone app", h: 640 },
        b: { src: C + "speakp-new-speak.webp", alt: "After: Speak+ inside the Core dashboard", cap: "After: inside the Core dashboard", note: "some details blurred, NDA", h: 640 } },
      { k: "tradeoffs", title: 'The calls were about <span class="it pink">restraint</span>, not features.',
        rows: [["Standalone brand", "Integration", "Folding into Core cost Speak+ its own visibility. I chose integration.", "Faster adoption and revenue."], ["New features", "Rapid growth", "Integration and promotion came first; feature work waited.", "Significant growth, sooner."], ["Hard sell", "Trust-based promotion", "Context-based education over an aggressive upsell.", "Adoption without damaging trust."]] },
      { k: "impact", title: 'From flatlined to a <span class="it pink">revenue stream</span>.', cols: 2, note: "Figures from Wall Street English&#8217;s internal reporting during my time on the product.",
        items: [["5 → 2,000+", "paid subscriptions in six months"], ["Recurring", "revenue, instead of a failing standalone app"], ["Both sides", "adoption grew among students and teachers"], ["Longer LTV", "advanced learners stayed engaged with unlimited practice"]] },
      { k: "reflection", title: 'Stalling products rarely need <span class="it pink">more</span>.', a: "Speak+ didn&#8217;t fail because the practice was weak. It failed because it was framed as a separate purchase, not a continuation of a journey students already trusted.", b: "The fix was distribution and positioning, not features. Next time I&#8217;d instrument the promotion surfaces from day one, to see which moment really drove upgrades.", note: "next time: measure every prompt ↗" },
    ],
    next: { href: "/work/swimingo/", dot: "var(--teal)", kicker: "Marketplace · Sports", title: "Building trust into a two-sided swimming marketplace", cover: C + "swimingo-swimingo-cover.webp" },
  },
  {
    slug: "swimingo", name: "Swimingo", c: "var(--teal)", idx: "03", kicker: "Marketplace · Sports",
    title: 'Building trust into a two-sided swimming <span class="it teal">marketplace</span>.',
    sub: "I turned Swimingo from a low-visibility listings site into a trust-first marketplace for swim instructors and learners, and led its rebrand.",
    meta: [["Role", "Product and brand designer"], ["Team", "CEO, COO, 2 developers and me"], ["Platform", "Web and mobile responsive"], ["Timeline", "2 months, 2024"]],
    cover: { src: C + "swimingo-swimingo-cover.webp", alt: "Swimingo: learning how to swim, made easy", bg: "#0E2A3A", h: 675 }, coverNote: "trust first. everything else second.",
    tldr: "Make both sides feel safe, and both sides come back.",
    mets: [["~90%", "retention lift by month 3"], ["+15%", "daily active users"], ["+40%", "instructor satisfaction"]],
    metsSrc: "Founder-reported and survey figures, shared after the revamp. Directional, not formal analytics.", live: ["Live site ↗", "https://www.swimingo.com/"],
    blocks: [
      { k: "cards", name: "The problem", title: 'Two sides, and neither had a reason to <span class="it teal">stay</span>.', intro: "The early product was little more than a listings page, so it never really connected instructors with learners.", cols: 3, numbered: "num",
        items: [["Invisible instructors", "Hard to get seen, hard to manage availability."], ["Hard to trust", "Customers couldn&#8217;t find verified instructors on schedules that fit."], ["No standard", "No shared bar for trust, no structure to bring either side back."]] },
      { k: "research", title: 'Two customers, two different <span class="it teal">goals</span>.', intro: "Competitor analysis and secondary research, run separately for each side.",
        methods: [["Instructors wanted", "Visibility, steady bookings and credibility, without clunky scheduling."], ["Customers wanted", "Safety, verified instructors, flexible times, small classes, clear pricing and progress."]],
        personas: [["Sarah, 35 · Parent", "safety first"], ["Adam, 25 · Fitness", "visible progress"], ["Emily, 40 · Educator", "structured programs"]] },
      { k: "insight", quote: "In this market, <i>trust is the currency</i>. Not price, not features.", sub: "Parents valued safety over cost, and instructors needed visible credibility before they&#8217;d commit." },
      { k: "cards", name: "Principles", title: 'Six rules, one <span class="it teal">trust-first</span> system.', cols: 3, numbered: "num", small: true,
        items: [["Trust-first", "Verification, reviews, clarity everywhere."], ["Clarity over complexity", "Two-sided, not complicated."], ["Less booking friction", "Fewer steps to a lesson."], ["Personal where it counts", "Tailored to each side, not over-built."], ["Structured but friendly", "Organised enough to trust, warm enough to enjoy."], ["Onboarding converts", "Where trust and retention are won."]] },
      { k: "features", title: 'A marketplace built around <span class="it teal">trust</span>.', intro: "Rebuilt as a structured two-sided platform, and rebranded from SwimNGo to Swimingo.",
        feats: [["A · Safe onboarding", "Trust from the very first screen", "Separate flows for customers and instructors, with verification built in.", { src: C + "swimingo-onboarding.webp", alt: "Onboarding for customers and instructors" }],
          ["B · Booking", "From finding an instructor to a confirmed lesson", "Discovery, flexible slots and small classes, in as few steps as possible.", { src: C + "swimingo-book-flow.webp", alt: "Booking flow" }],
          ["C · Customer dashboard", "Progress you can actually see", "Upcoming lessons, instructors and progress tracking that keeps learners coming back.", { src: C + "swimingo-cusotmer.webp", alt: "Customer dashboard" }],
          ["D · Instructor dashboard", "A business, not just a listing", "Schedules, bookings and students in one place, so instructors stay active.", { src: C + "swimingo-instructor.webp", alt: "Instructor dashboard" }]] },
      { k: "pair", name: "Brand", title: 'SwimNGo became <span class="it teal">Swimingo</span>.', cols: "minmax(0, 4fr) minmax(0, 6fr)",
        a: { src: C + "swimingo-swim-1.webp", alt: "Swimingo landing page", cap: "The new landing page", h: 620 },
        b: { src: C + "swimingo-style-guide.webp", alt: "Swimingo V2 style guide", cap: "Style guide: Noto Sans, Heroicons, a calm blue palette", h: 620, pos: "center" } },
      { k: "tradeoffs", title: 'Two sides, <span class="it teal">one system</span>.',
        rows: [["Design system first", "Prototype first", "Prototyped the product and aligned components with stakeholder feedback as I went.", "Faster iteration, still heading to consistency."], ["Two products", "One shared system", "Prioritised the moments that mattered most to each side, from one system.", "Value for both, without double the complexity."]] },
      { k: "impact", title: 'Once both sides felt <span class="it teal">safe</span>, they stayed.', cols: 2, note: "Shared by Swimingo&#8217;s founder after the revamp. Pre-revamp tracking was limited, so treat them as directional.",
        items: [["~90%", "retention lift by month 3 (founder-reported)"], ["+15%", "daily active users (founder-reported)"], ["+40%", "instructor satisfaction (survey)"], ["+90%", "social engagement, with the rebrand launch"]] },
      { k: "reflection", title: 'Marketplaces are about <span class="it teal">balance</span>.', a: "The hardest part wasn&#8217;t the interface. Every decision had to serve instructors and customers without tipping toward either.", b: "Treating trust as the core design problem made it work: once both sides felt safe, engagement followed. Next, I&#8217;d set up a proper design system earlier.", note: "next time: the DS on day one ↗" },
    ],
    next: { href: "/design-system/", dot: "var(--ac)", kicker: "Design systems · Open source", title: "An open-source design system, with Claude as my build partner", cover: "/img/ds/ds-figma-thumbnail.webp" },
  },
];

const D = "/img/ds/";
export const DS_CASE: Case = {
  slug: "design-system", name: "Aa NAD Design System", c: "var(--ac)", idx: "04", kicker: "Design systems · Open source",
  title: 'An open-source design system, with <span class="it">Claude</span> as my build partner.',
  sub: "Aa NAD is a monochrome, accessibility-first system for web and mobile. I designed and shipped it end to end: code, docs and a Figma library anyone can use.",
  meta: [["Type", "Self-initiated, open source"], ["Role", "Designer and system owner"], ["Build partner", "Claude (Cowork + Claude Code)"], ["Status", "v1.2.1 · updated weekly"]],
  cover: { src: D + "ds-figma-thumbnail.webp", alt: "Aa NAD Design System Figma library cover", bg: "#F4F0FA", h: 675 }, coverNote: "swap 11 tokens, get your brand ;)",
  tldr: "One source of truth, written for designers, developers and AI agents alike.",
  mets: [["249", "design tokens"], ["45", "React components"], ["3 themes", "incl. AAA high contrast"], ["11", "tokens to rebrand"]],
  metsSrc: "Counted from the repo and the Figma file at v1.2.1.", live: ["Live docs ↗", "https://yogesh2806.github.io/Aa-NAD-Design-System/"],
  blocks: [
    { k: "cards", name: "The problem", title: 'Two sources of truth, and <span class="it">nobody</span> wrote for agents.', intro: "Most systems are a Figma file or a code library, rarely both, and almost never written for the AI agents that now write a lot of UI.", cols: 2, numbered: "num",
      items: [["Two sources of truth", "Figma and code drift apart the week after handoff."], ["Accessibility as an afterthought", "Contrast checked by eye, states and keyboard paths left to guess."], ["Locked to someone&#8217;s brand", "Re-theming free kits means detaching and repainting by hand."], ["Not written for agents", "An AI coding agent needs rules it can follow without guessing."]] },
    { k: "research", title: 'Three readers, <span class="it">one</span> of them a machine.', plabel: "Method",
      methods: [["Designers", "Use the Figma library: variables in three modes, styles, component sets."], ["Developers", "Ship with React: tokens as CSS, 45 components, every state."], ["AI coding agents", "Follow plain rules: which token, which component, which state."]],
      personas: [["Benchmark", "designsystemchecklist.com"], ["Standard", "WCAG AA, AAA for high contrast"], ["Platforms", "web, iOS, Android"]] },
    { k: "insight", quote: "If an AI agent can follow the docs <i>without guessing</i>, a new developer can too.", sub: "So every rule is written to be skimmed by people and followed exactly by machines." },
    { k: "foundations" },
    { k: "tokens" },
    { k: "workflow" },
    { k: "cards", name: "Decisions", title: 'Six decisions, all <span class="it">written down</span>.', intro: "So nobody, human or agent, has to guess.", cols: 3, numbered: "abc",
      items: [["Colour", "Monochrome base, one replaceable primary ramp."], ["Type", "Atkinson Hyperlegible Next, chosen over Roboto for legibility."], ["Space", "8px grid, 4px half-step, 4px corners."], ["Themes", "Light, Dark, High contrast at WCAG AAA (7:1), 3px focus ring."], ["Motion", "Calm and precise, and it respects reduced motion."], ["Assets", "Ionicons, 15 line illustrations, 8 avatars."]] },
    { k: "gallery", title: 'Every component, <span class="it">every state</span>.',
      items: [{ src: D + "ds-carousel-01.webp", alt: "45 React components in every state", cap: "45 components, every state" }, { src: D + "ds-carousel-02.webp", alt: "Light, Dark and High contrast themes", cap: "Three themes, checked in code" }, { src: D + "ds-carousel-03.webp", alt: "Tokens and foundations", cap: "Tokens first, then everything" }, { src: D + "ds-carousel-04.webp", alt: "Icons, illustrations and avatars", cap: "Icons, illustrations and avatars" }],
      wide: [{ src: D + "ds-docs-hero.webp", alt: "The docs site", cap: "The docs, on GitHub Pages", h: 420 }, { src: D + "ds-docs-mobile.webp", alt: "Docs on mobile", cap: "And on mobile", h: 420 }] },
    { k: "tradeoffs", title: 'The safe choice was there. I mostly <span class="it">didn&#8217;t</span> take it.',
      rows: [["Roboto", "Atkinson Hyperlegible", "Atkinson was built for legibility, the point of an accessibility-first system.", "Legibility over familiarity."], ["A branded palette", "Monochrome + one ramp", "A colourful default screenshots better, but forces everyone to repaint.", "Your brand, not mine."], ["Hand-built Figma", "Generated from code", "Slower on day one: it took a plugin and real bug fixing.", "One source of truth by week two."], ["Focus logo", "Module logo", "Module builds the letters from 8px-grid blocks, the system&#8217;s own grid.", "The logo is made of the system."]] },
    { k: "impact", title: 'What&#8217;s in <span class="it">v1.2.1</span>.', note: "Counted from the repo and the Figma file at v1.2.1. Self-initiated, so no adoption numbers yet.",
      items: [["249", "design tokens"], ["45", "React components, every state"], ["3 themes", "Light, Dark, High contrast (AAA)"], ["29 / 29", "core checklist components, plus 16 more"], ["11", "tokens to rebrand everything"], ["207", "Figma variables, generated from code"]] },
    { k: "links" },
  ],
  next: { href: "/work/doctiq/", dot: "var(--ind)", kicker: "HealthTech · Clinic SaaS", title: "Designing an AI clinic workspace, shipped in two weeks", cover: C + "doctiq-doctiq-cover.webp" },
};

export const DS_LINKS = { docs: "https://yogesh2806.github.io/Aa-NAD-Design-System/", github: "https://github.com/Yogesh2806/Aa-NAD-Design-System", figma: "https://www.figma.com/community/file/1689340280619065278/aa-nad-design-system" };
