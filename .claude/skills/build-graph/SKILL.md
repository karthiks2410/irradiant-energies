---
name: build-graph
description: Build or rebuild the codebase knowledge graph for this repo. Parses Java, TypeScript, and CDS files, stores relationships in SQLite, generates index.md, and injects graph instructions into CLAUDE.md so Claude automatically uses targeted context for every future query.
argument-hint: "[--incremental]  rebuild only files changed since last build"
allowed-tools: Bash, Read, Write
---

## Build the Code Graph

### Step 1 — Check Node.js is available

```bash
node --version
```

If Node.js is not installed, stop and tell the user to install Node.js 18 or later.

### Step 2 — Locate the skill scripts directory

> Note: `$SKILL_DIR` is set by Claude Code to the directory containing this SKILL.md (i.e., `.claude/skills/build-graph/`).

The scripts live alongside this SKILL.md in a `scripts/` subdirectory.

```bash
SKILL_SCRIPTS="$SKILL_DIR/scripts"
ls "$SKILL_SCRIPTS/build.js" 2>/dev/null && echo "found" || echo "missing"
```

If missing, the skill was not installed correctly.

### Step 3 — Install dependencies (first run only)

```bash
ls "$SKILL_SCRIPTS/node_modules" 2>/dev/null && echo "installed" || (cd "$SKILL_SCRIPTS" && npm install --silent && echo "installed")
```

### Step 4 — Run the build

If `$ARGUMENTS` contains `--incremental`:
```bash
cd "$PWD" && node "$SKILL_SCRIPTS/build.js" --incremental
```

Otherwise:
```bash
cd "$PWD" && node "$SKILL_SCRIPTS/build.js"
```

### Step 4.5 — Install runtime dependencies

After the build completes, install the runtime dependencies in .code-graph/:

```bash
(cd .code-graph && npm install --silent)
```

This installs better-sqlite3 which is needed for query.js to run.

### Step 5 — Show results

Read `.code-graph/index.md` and display its full contents to the user.

Then tell the user:
- Graph is built, runtime dependencies installed, and `CLAUDE.md` has been updated automatically
- Claude will now use the graph for every query in this repo — no further action needed
- Run `/build-graph --incremental` after future changes for a fast rebuild
- Run `/query-graph <topic>` to explicitly query the graph for a specific task
