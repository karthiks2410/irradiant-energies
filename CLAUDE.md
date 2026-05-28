@AGENTS.md

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
