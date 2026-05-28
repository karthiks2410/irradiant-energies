---
name: query-graph
description: Query the codebase knowledge graph. Returns targeted files, classes, blast radius, callers, test coverage, and CDS chains for a given topic. Use this before reading or globbing files to get surgical context.
argument-hint: "<topic|mode> [identifier]  e.g. 'validate', 'blast AlertsService.createAlert()', 'risk'"
allowed-tools: Bash, Read
---

## Query the Code Graph

Use the knowledge graph to find exactly which files and classes are relevant to the current task.

### Step 1 — Check the graph exists

```bash
ls .code-graph/graph.db 2>/dev/null && echo "exists" || echo "missing"
```

If missing: tell the user "No graph found. Run `/build-graph` first."

### Step 2 — Parse the query mode from `$ARGUMENTS`

| Mode | Example call | What it returns |
|---|---|---|
| `blast <id>` | `blast AlertsService.createAlert()` | All callers up 3 levels + affected files + tests to run |
| `callers <id>` | `callers validate` | Direct callers of this method/class |
| `callees <id>` | `callees createAlert` | Methods this node calls |
| `tests <id>` | `tests AlertsService` | Tests covering this class/method |
| `risk` | `risk` | Top 10 highest-risk nodes |
| `<keyword>` | `validation` | Keyword search across all node names |

If `$ARGUMENTS` starts with one of the mode keywords (`blast`, `callers`, `callees`, `tests`, `risk`, `search`), extract mode and identifier separately.
Otherwise treat the entire `$ARGUMENTS` as a keyword search.

### Step 3 — Run the query

```bash
node .code-graph/query.js <mode> "<identifier>"
```

Example for keyword search:
```bash
node .code-graph/query.js search "validation"
```

Example for blast radius:
```bash
node .code-graph/query.js blast "AlertsService.createAlert()"
```

### Step 4 — Present results and use them

Parse the JSON result and present clearly:

**blast radius:** List `affectedFiles` first — these are the files to focus on. Show the call chain depth. List `testFiles` — these are the tests to run after the change.

**keyword search:** List matching nodes with file paths and line numbers. Group by file.

**risk:** Show top nodes with risk scores. Explain: high caller count = many dependents, no test coverage = riskier to change.

After presenting results, use the returned file list as your working context for this task. Read only those files. Do not glob or scan broadly.
