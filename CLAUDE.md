@AGENTS.md

## UI / Component Development Stack

Whenever building **any new UI component, page, or visual element**, use the following stack together — don't pick one in isolation:

1. **framer-motion** — motion engine.
   - **Default to `whileInView` once-per-entry fades.** Fire on enter, then stop listening. No continuous scroll subscription.
   - **Avoid `useScroll` + `useTransform` parallax.** It caused the "stuck → jerk" trackpad bug we already fixed in `ProductShowcaseSection` / `CTASection` / `GovernmentSection`. Don't reintroduce it.
   - Time-based ambient motion (slow orb pulses, looping background atmosphere) is fine — that's not scroll-driven.
   - Always wire `useReducedMotion()` for accessibility.
   - Reuse `EASE_OUT_EXPO`, `SPRING_PRESS`, `PRESS_HOVER`, `PRESS_TAP` from `src/lib/motion.ts`. Don't invent new ease curves.

2. **`ui-ux-pro-max` skill** (installed at `.claude/skills/ui-ux-pro-max/`, source: https://github.com/nextlevelbuilder/ui-ux-pro-max-skill).
   - Use it for **system-level decisions**: which of 67 UI styles, which of 161 palettes, which of 57 font pairings, which UX/accessibility guideline applies.
   - Consult it **before** composing layout — pick the style family that fits the brand (Apple-clean / quiet luxury), then build inside it.

3. **`frontend-design` skill** (`plugin:frontend-design:frontend-design`).
   - Use it for **component-level polish**: distinctive aesthetics that avoid generic AI slop, typography refinement, motion timing, editorial details.
   - Pairs with #2 — `ui-ux-pro-max` decides the style family, `frontend-design` executes the specific component well.

4. **21st.dev community components** (https://21st.dev/community/components).
   - Use it as a **reference library** for section ideas, component patterns, and animation primitives — bento grids, hero variants, pricing tables, sliders, marquees, carousels, animated counters, etc.
   - Browse before hand-rolling anything non-trivial: hero sections, feature grids, testimonial layouts, footers, pricing UI, scroll-driven storytelling, animated icons.
   - Treat it as **inspiration + starting code**, not a copy-paste source — adapt to our palette and motion rules above. Always strip third-party scroll-parallax patterns before importing.
   - When you find a fitting component, mention the 21st.dev category/name you drew from so the user can preview it.

### 21st.dev integration checklist

When the user pastes a 21st.dev integration prompt (the auto-generated "You are given a task to integrate an existing React component…" block), follow this order. The prompt assumes a generic shadcn project — our project has specifics that need handling.

1. **Paths are already correct.** Our `components.json` aliases `@/components/ui`, `@/lib/utils`, `@/components`, `@/hooks`, `@/lib` to the standard locations. Don't relocate.

2. **Check `src/components/ui/` for existing primitives BEFORE pasting any "dependency" file.** As of this writing we already ship: `badge`, `button`, `input`, `label`, `separator`, `textarea`, `tooltip`. If 21st.dev's prompt asks you to paste `label.tsx` or `tooltip.tsx`, **skip those files** and import from our existing ones — pasting overwrites and risks regressing styles or types elsewhere. Run `ls src/components/ui/` first to confirm.

3. **Install only the npm deps that are actually missing.** Run `npm ls <pkg>` for each before `npm install`. Many 21st.dev sliders need `@radix-ui/react-slider` + `@radix-ui/react-tooltip` — we already have `@radix-ui/react-tooltip` from our own `tooltip.tsx`. Don't reinstall.

4. **Token swap pass before committing.** 21st.dev components use shadcn theme tokens (`bg-primary`, `text-primary`, `bg-secondary`, `text-foreground`, `bg-popover`, `border-border`, etc.). Our brand uses **literal hex values**, not tokens. Map them:

   | 21st.dev token | Irradiant value | When to use |
   |---|---|---|
   | `bg-primary` / `text-primary` / `border-primary` | `#52842D` | brand-green fills, accents |
   | hover variant of primary | `#446F26` | hover/active brand-green |
   | `text-foreground` | `#1d1d1f` | primary text |
   | `text-muted-foreground` | `#6F6F6F` | secondary/muted text |
   | `bg-secondary` / `bg-muted` | `#f5f5f7` | surface fills |
   | `bg-background` | `#ffffff` | card backgrounds |
   | `border-border` / `border-input` | `#e5e7eb` | hairlines |
   | `bg-popover` / `text-popover-foreground` | `#ffffff` / `#1d1d1f` | popovers, tooltips |
   | `ring-ring` / `focus-visible:ring-*` | `#52842D` (with `/20` opacity for the ring) | focus states |

   Do this pass even if the component "looks fine" with the default tokens — our globals.css doesn't define them all, so some will silently render wrong on prod.

5. **Motion strip-down.** Before merging, audit the pasted component for:
   - `useScroll` / `useTransform` parallax → **remove**, replace with `whileInView` once-per-entry fade per the project's motion rules.
   - Auto-playing carousels / marquees with `setInterval` → keep, but wire `useReducedMotion()` to pause them.
   - Spring stiffness > 200 or damping < 20 → calm them down (we use `stiffness: 40, damping: 24` for our ticker pattern; `SPRING_PRESS` from `src/lib/motion.ts` for press feedback).

6. **Stock images & icons.**
   - The integration prompt suggests Unsplash for placeholders — **don't ship Unsplash URLs to production**. Use our local `/public/*.jpg` assets where they exist (`/solar-panel.jpg`, `/smart-box.jpg`, etc.) or add `TODO: replace with branded asset` and surface it to the user.
   - Always swap heroicons/feather/etc. for `lucide-react` — that's our project standard.

7. **Final integration steps** (after paste + token swap + motion audit):
   - `npm run build` — must be clean.
   - `npx tsc --noEmit` — must be zero errors.
   - Open the page that uses the new component locally, scroll/click through it, confirm motion + colors look right.
   - Then PR it (one component per PR, like everything else in this repo).

### Brand aesthetic guardrails

- **Palette is fixed:** `#52842D` (primary), `#446F26` (primary-dark), `#1d1d1f` (text), `#6F6F6F` (muted), `#f5f5f7` (surface), white. Don't introduce new dark/aurora/glassmorphism canvases.
- **Tone:** Apple-clean / quiet luxury. Generous whitespace, restrained typography, brand-green accents on white. Not "AI agency demo with parallax everywhere."
- **Reach for shadcn primitives** before hand-rolling components (Button, Input, Label, Tabs, Card already exist in `src/components/ui/`).
- **One well-orchestrated entrance beats scattered micro-animations** across the page.

### Before writing JSX for any new component

State briefly which of the four (framer-motion / ui-ux-pro-max / frontend-design / 21st.dev) you're drawing from and why. Example: *"Browsed 21st.dev's bento section for layout, using `ui-ux-pro-max` style #N for the visual language and `frontend-design` for typography polish; motion is `whileInView` only — no scroll subscription."*

<!-- code-graph:start -->
## Code Graph

Graph built: 2026-05-28 | Commit: b2c5879 | Nodes: 134 | Edges: 228

### Modules
| Module | Files | Key Classes/Entities |
|---|---|---|
| (none) | 0 | |

### CDS Entities & Services
| Name | Language | File |
|---|---|---|
| (none) | | |

### High-Risk Nodes (change carefully)
| Node | Risk Score | File |
|---|---|---|
| eslint.config.mjs | 0.30 | eslint.config.mjs |
| next-env.d.ts | 0.30 | next-env.d.ts |
| next.config.ts | 0.30 | next.config.ts |
| POST | 0.30 | src/app/api/quote/route.ts |
| route.ts | 0.30 | src/app/api/quote/route.ts |

### Instructions for Claude

**MANDATORY workflow for every user prompt:**

1. **First action** on any task that touches code: run `/query-graph <topic>` (or `node .code-graph/query.js search "<term>"`) to get a targeted file list.
2. **Do NOT** use Glob, Grep, or `find` to scan the codebase broadly. The graph already indexes all source files.
3. **Only read the files the graph returns.** Do not open files speculatively.
4. **Fallback rule:** Only run a global Grep if the graph query returns zero results — and after, run `/build-graph --incremental` to backfill the gap.

Quick reference:
- Find code by topic: `/query-graph <keyword>`
- Find what calls a function: `/query-graph callers <name>`
- Find what a function calls: `/query-graph callees <name>`
- Blast radius of a change: `/query-graph blast <name>`
- Find tests for a class: `/query-graph tests <name>`
- Highest-risk hotspots: `/query-graph risk`

<!-- code-graph:end -->
