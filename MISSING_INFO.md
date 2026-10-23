# Information not in your resume (nothing was invented)

| Item | Status on the site | How to fix |
|---|---|---|
| LinkedIn / GitHub | Resume lists neither; omitted | Fill `profile.linkedin` / `profile.github` in `lib/data.ts` |
| Certifications | None on resume; section hidden | Add to `certifications` in `lib/data.ts` |
| GitHub / live-demo links for projects | None provided; case pages say so | Add `links` per project |
| Project results / metrics | Resume gives none; outcomes are described qualitatively | Add real numbers/results if you have them |
| Clap Switch PCB | Mentioned in your brief but **not in the resume**, so it is not included | Send details and add to `projects` |
| "Problem statement" per project | Resume has no explicit problem statements; short framings were written strictly from each project's described purpose | Edit `problem` in `lib/data.ts` to your own words |
| Motion Learning App links / sample reels | None provided | Add links if you want to showcase specific videos |
| Relevant coursework | Resume lists "CS knowledge" and "Core E&TC" skills only; shown under those labels, not as formal coursework | — |
| Video work samples | No links/thumbnails supplied; only the YouTube and Instagram channel links are shown | Add `samples: [{ title, href, thumb? }]` to the Motion Learning App or channel entry in `lib/data.ts`; a gallery appears automatically |
| Project working-flow steps | Written only from the resume facts and your screenshots (e.g. fingerprint sensor → relay → solenoid lock) | Edit `flow` per project in `lib/data.ts` if any step is wrong |
