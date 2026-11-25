# Jeries Shomaly — Portfolio

My personal portfolio: full-stack developer working on AI platforms and data systems.

## What's interesting in here

- **Case studies instead of screenshots.** My work code is private, so the projects section explains the problems I solved and how I solved them. Each case study has a flow diagram that highlights the parts I built. All of the content lives in [`src/content/profile.ts`](src/content/profile.ts).
- **A real terminal in the hero** ([`InteractiveTerminal.tsx`](src/components/InteractiveTerminal.tsx)). A small command parser runs over the same profile data. Try `help`, then look for the undocumented commands.
- **Hand-rolled physics, no game libraries.** [`SkillDrop.tsx`](src/components/SkillDrop.tsx) has gravity, restitution, friction and drag-to-fling chips. [`BugHunt.tsx`](src/components/BugHunt.tsx) is a 30-second click game with its own movement loop.
- **One source of truth.** The site, the terminal and the printable `/cv` page all render from the same content file. `public/cv.pdf` is printed from `/cv`.
- **Accessibility basics done properly:** a skip link, `prefers-reduced-motion` support everywhere, and a no-JS fallback for the reveal animations.

## Stack

Next.js (App Router) · React · TypeScript · Tailwind CSS · Motion

## Run it

```bash
npm install
npm run dev
```
