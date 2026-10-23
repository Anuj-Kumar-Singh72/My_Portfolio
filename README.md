# Anuj Kumar Singh — Portfolio

Next.js 15 (App Router) · React 19 · TypeScript · Tailwind CSS · Motion for React · Lucide.
Light ivory theme · custom comet-trail cursor · hover-zoom on words and links · 3D cube, spotlight, marquees.
Fonts are bundled locally (no internet needed to run).

## Easiest way — just double-click (no commands)

Install **Node.js LTS** once from https://nodejs.org (any version 18.18 or newer), then:

| You want to… | Windows | Mac / Linux |
|---|---|---|
| **View the site now** (no install, instant) | double-click `1-VIEW-SITE-WINDOWS.bat` | double-click `1-VIEW-SITE-MAC-LINUX.command` |
| **Edit the content / code** and see changes live | double-click `2-EDIT-MODE-WINDOWS.bat` | double-click `2-EDIT-MODE-MAC-LINUX.command` |

Your browser opens automatically at **http://localhost:3000**. Keep the black window open while viewing.

*Mac/Linux: if the `.command` file won't open, run `chmod +x *.command` once in the folder, then double-click again (or run `node serve.mjs`).*

Prefer commands?

```bash
node serve.mjs                 # view instantly (uses the prebuilt /out folder)
npm install && npm run dev     # edit mode
npm run build:static           # rebuild /out after you edit content (so View mode shows your changes)
```

## 1. Your photos and project images (already included)

- `public/photo.jpg` — hero portrait; `public/photo-2.jpg` — About portrait (swap files to change).
- `public/projects/` — Career Compass (3 screenshots), Biometric lock photo, Metal Detector PCB (3D + layout).
- Smart Allocation Engine uses your two InternMatch screenshots (`smart-allocation-engine.jpg`, `-2.jpg`).

## 3. Edit content

Everything lives in **`lib/data.ts`**. After editing, use Edit mode to see it live, and run
`npm run build:static` if you want View mode to show your changes too.

- Add `linkedin` / `github` in `profile` → they appear in Contact automatically.
- Add `links: { github, demo }` to a project → buttons appear on its case-study page.
- Add entries to `certifications` → a Certifications section appears.
- Replace `public/Anuj_Kumar_Singh_Resume.pdf` to update the resume (keep the filename).

## Troubleshooting

| Problem | Fix |
|---|---|
| `node is not recognized` | Install Node.js LTS from nodejs.org, then **close and reopen** the window/terminal. |
| Port 3000 already in use | Close other dev servers, or run `set PORT=3100 && node serve.mjs` (Windows) / `PORT=3100 node serve.mjs` (Mac/Linux). |
| `npm install` fails / is slow | Check internet. Delete the `node_modules` folder and retry. Or just use **View mode** — it needs no install. |
| Windows says "protected your PC" on the .bat | Click **More info → Run anyway** (it's a plain text script you can open in Notepad). |
| Edit mode errors after copying the folder between computers | Delete `node_modules` and `.next`, then run Edit mode again. |
| Cursor looks normal (no trail) | The custom cursor is for mouse/trackpad on desktop; it's disabled on touch devices and when the OS has "reduce motion" on. |

## Deploy (Vercel — free)

1. Push this folder to GitHub (the `node_modules`, `.next` and `out` folders are git-ignored).
2. Import it at https://vercel.com/new — framework is auto-detected.
3. Set env var `NEXT_PUBLIC_SITE_URL` to your final URL (for SEO/Open Graph).

## Structure

```
app/            layout, home page, /projects/[slug] case studies, OG image
components/     Hero, About (+ interactive CircuitVisual), Projects, Experience, Skills,
                Education, Contact, Nav, Cursor, HoverWords, Decor (3D cube, stars, marquee)
lib/data.ts     all content (single source of truth, taken only from your resume)
out/            prebuilt static site (used by View mode)
serve.mjs       zero-dependency server for View mode
public/         resume PDF, photo.jpg (yours), projects/*.jpg (yours)
```
