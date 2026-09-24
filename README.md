# Yogesh Jeevan · Portfolio

Next.js 16 (App Router, static export) + GSAP + Lenis + Three.js. Design source: the "V1 · Playful" Claude Design canvas.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # static site in /out
```

## Deploy (Vercel)

1. Push this folder to a GitHub repo.
2. On vercel.com: **Add New → Project**, import the repo, keep the defaults, **Deploy**.
3. Live at https://yogeshjeevan.vercel.app. If you buy a domain later, add it under **Settings → Domains** and update `SITE.url` in `lib/site.ts` (used for share cards).

Because `next.config.ts` uses `output: "export"`, the `/out` folder also works on any static host (Netlify, GitHub Pages, S3).

## Where things live

| What | Where |
| --- | --- |
| Home copy (stats, case cards, story photos, experience rows, tools, kind words) | `lib/home.ts` |
| Case study content (all three) | `lib/cases.json` |
| Experience tickets | `lib/experience.json` |
| Visuals chapters | `components/visuals/VisualsPage.tsx` (the `CH` list at the top) |
| Links, email, resume path | `lib/site.ts` |
| Colours, fonts, shared styles | `styles/base.css` |
| Scroll film frames (240 WebP) | `public/film/` |
| Images | `public/img/home`, `public/img/cases`, `public/img/visuals` |
| Resume | `public/Yogesh_Jeevan_Resume.pdf` (replace the file to update it) |
| Share card / favicons | `public/og.jpg`, `public/favicon.*`, `public/apple-touch-icon.png` |

## Motion & sound

- **Smooth scroll**: Lenis, driven by the GSAP ticker (`components/Providers.tsx`).
- **Scroll film**: `components/home/Hero.tsx`. 240 frames on a canvas, cross-faded between frames; preloader waits for enough frames to scrub end to end.
- **Nav**: hidden during the film, slides in once the film ends and the strip is fully on screen (`yj:nav` event).
- **Reveals**: add `data-reveal="up|drop|scale|clip|fade"` to any element (optional `data-rot`, `data-delay`, `data-reveal-sound`). `data-split` splits a heading into masked words; `data-count` counts the first number up.
- **WebGL covers**: `components/home/CoverGL.tsx` (Three.js). Bulge follows the pointer, the plane curls with scroll speed; falls back to the image.
- **Cursor**: dot + ring; any element with `data-cursor="Label"` turns it into a label bubble.
- **Sound** (`lib/sound.ts`): synthesized with the Web Audio API, no audio files. Starts after the visitor's first click, remembers mute per browser, toggle lives in the nav. Per element: `data-sound="whoosh|pop|swish|paper|none"`.
- **Reduced motion**: all motion and smooth scroll switch off for visitors who ask for it in their OS settings.
