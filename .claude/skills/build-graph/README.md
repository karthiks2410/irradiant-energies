# Code Graph Skill for Claude Code

A knowledge graph that reduces Claude's token usage by **2-10x** when working with your codebase.

## What It Does

Instead of Claude scanning your entire codebase to find relevant files, Code Graph pre-indexes your code into a SQLite database. When you ask Claude to work on something, it queries the graph first and reads only the files that matter.

**Before (without graph):**
```
User: "Fix the validation bug in notifications"
Claude: *reads 80 files, 128K tokens* → finds the 3 relevant files
```

**After (with graph):**
```
User: "Fix the validation bug in notifications"
Claude: *queries graph* → reads 8 files, 12K tokens
```

## What It Indexes

| Language | What's Extracted |
|---|---|
| **Java** | Classes, methods, method calls, inheritance, interfaces, test coverage |
| **TypeScript/JavaScript** | Classes, methods |
| **CDS** | Services, entities, projections, associations, compositions |

## How It Works

1. **Build phase** (`/build-graph`) — Parses your source files using tree-sitter, extracts nodes (classes, methods, entities) and edges (calls, inherits, implements), stores them in SQLite.

2. **Query phase** (`/query-graph`) — When Claude needs context, it queries the graph instead of globbing. Returns targeted file lists.

3. **Risk scoring** — Each node gets a risk score based on:
   - How many other nodes call it (high callers = high impact)
   - Whether it has test coverage (no tests = higher risk)

4. **CLAUDE.md injection** — The build automatically adds instructions to your CLAUDE.md so Claude uses the graph for every future query.

---

## Installation

### Option 1 — Plugin Install (Recommended)

If the skill is published to the APM Agent-skills marketplace:

**Step 1: Add the marketplace (once)**
```bash
/plugin marketplace add https://github.tools.sap/AssetPerformanceManagement/Agent-skills.git
```

**Step 2: Install the plugin**
```bash
/plugin install code-graph@sap-apm-skills
```

**Step 3: Reload plugins**
```bash
/reload-plugins
```

### Option 2 — Manual Install

Copy the skill folders into your repository:

```
your-repo/
├── .claude/
│   └── skills/
│       ├── build-graph/    ← copy this
│       └── query-graph/    ← copy this
```

### Prerequisites

- Node.js 18 or later
- Git repository

### Build the Graph

In Claude Code, run:

```
/build-graph
```

This will:
- Install dependencies (first run only)
- Parse all Java, TypeScript, and CDS files
- Create `.code-graph/` directory with the database
- Update your `CLAUDE.md` with graph instructions
- Update `.gitignore` to exclude generated files

### Verify

Run a test query:

```
/query-graph validation
```

You should see a list of matching nodes with file paths.

---

## Usage

### Automatic Usage

Once installed, Claude will automatically query the graph before reading files. The injected CLAUDE.md instructions tell Claude:

> **MANDATORY:** Before reading any source file or running any Glob/Grep, you MUST run `/query-graph <topic>` to get the relevant files from the graph.

### Manual Queries

You can also query the graph directly:

| Command | What It Does |
|---|---|
| `/query-graph validation` | Keyword search — finds nodes with "validation" in the name |
| `/query-graph blast AlertsService.createAlert()` | Blast radius — all callers up to 3 levels + affected files + tests |
| `/query-graph callers validate` | Direct callers of a method/class |
| `/query-graph callees createAlert` | Methods that a node calls |
| `/query-graph tests AlertsService` | Tests covering a class/method |
| `/query-graph risk` | Top 10 highest-risk nodes (high callers, no tests) |

### Rebuilding

After making code changes, rebuild the graph:

```
/build-graph --incremental
```

Incremental mode only re-parses files changed since the last build.

### Automatic Rebuilding with Git Hooks

To rebuild the graph automatically after every commit, add a post-commit hook:

```bash
# .git/hooks/post-commit
#!/bin/sh
node .claude/skills/build-graph/scripts/build.js --incremental
```

Or configure it in Claude Code's `settings.json` as a hook that runs after git commits.

---

## What Gets Created

```
your-repo/
├── .code-graph/           ← created by build
│   ├── graph.db           ← SQLite database (gitignored)
│   ├── meta.json          ← build metadata (gitignored)
│   ├── index.md           ← human-readable summary
│   ├── query.js           ← runtime query script
│   ├── graph.js           ← runtime graph store
│   └── package.json       ← runtime dependencies
├── .claude/
│   └── skills/
│       ├── build-graph/   ← skill source
│       └── query-graph/   ← skill source
└── CLAUDE.md              ← updated with graph instructions
```

---

## Configuration

### Excluded Directories

By default, these directories are not indexed:

- `node_modules/`
- `.git/`
- `target/` (Maven)
- `dist/`
- `build/`
- `.mvn/`
- `.claude/`
- `.code-graph/`

To modify, edit `.claude/skills/build-graph/scripts/incremental.js`:

```javascript
const EXCLUDED_DIRS = new Set(['node_modules', '.code-graph', '.git', ...]);
```

### Supported File Extensions

- `.java`
- `.ts`, `.tsx`
- `.js`
- `.cds`

To add more, edit `SUPPORTED_EXTENSIONS` in `incremental.js` and add a parser in `parser.js`.

---

## Troubleshooting

### "Graph not found. Run /build-graph first."

The graph database doesn't exist. Run `/build-graph`.

### "Cannot find module 'better-sqlite3'"

Runtime dependencies not installed. Run:
```bash
cd .code-graph && npm install
```

### Build is slow

- First build parses all files. Subsequent builds with `--incremental` are faster.
- Large repos (10K+ files) take 1-2 minutes.

### Node version mismatch

If you see `NODE_MODULE_VERSION` errors, rebuild the native module:
```bash
cd .code-graph && npm rebuild better-sqlite3
```

---

## How Token Reduction Works

The benchmark tool (in `scripts/dev/`) measures token savings:

```
╔══════════════════════════════════════════════════════════════════╗
║             Code Graph — Token Reduction Benchmark              ║
╚══════════════════════════════════════════════════════════════════╝

Scenario                  Naive files  Naive tokens   Graph files  Graph tokens   Reduction
────────────────────────────────────────────────────────────────────────────────────────────
AlertType                    33          67,093          17          30,876        2.2x
Notification                 22          26,167          11           2,365       11.1x
Validation                    8           9,764           8           9,764        1.0x
Deduplication                15          21,016           6           4,083        5.1x
────────────────────────────────────────────────────────────────────────────────────────────
TOTAL                        80         127,947          44          50,995        2.5x
```

**Naive** = Claude reads all files matching a keyword (what happens without the graph)
**Graph** = Claude reads only files returned by the knowledge graph

Average reduction: **2.5x fewer tokens** = faster responses, lower costs.

