const fs = require('fs');

const MARKER_START = '<!-- code-graph:start -->';
const MARKER_END = '<!-- code-graph:end -->';

function moduleFromFile(filePath) {
  return filePath.replace(/\\/g, '/').split('/')[0] || 'root';
}

function generateIndex(store, stats, { builtAt, commitSha }) {
  const nodes = store.getAllNodes();

  const moduleMap = {};
  for (const node of nodes) {
    if (node.kind !== 'class' && node.kind !== 'entity' && node.kind !== 'service') continue;
    const mod = moduleFromFile(node.file);
    if (!moduleMap[mod]) moduleMap[mod] = { files: new Set(), keyNodes: [] };
    moduleMap[mod].files.add(node.file);
    if (moduleMap[mod].keyNodes.length < 4) moduleMap[mod].keyNodes.push(node.name);
  }

  const moduleRows = Object.entries(moduleMap)
    .map(([mod, data]) => `| ${mod} | ${data.files.size} | ${data.keyNodes.join(', ')} |`)
    .join('\n');

  const entities = nodes.filter(n => n.kind === 'entity' || n.kind === 'service');
  const entityRows = entities.slice(0, 10)
    .map(e => `| ${e.name} | ${e.language} | ${e.file} |`)
    .join('\n');

  const highRisk = nodes
    .filter(n => n.risk_score > 0)
    .sort((a, b) => b.risk_score - a.risk_score)
    .slice(0, 5);
  const riskRows = highRisk
    .map(n => `| ${n.name} | ${n.risk_score.toFixed(2)} | ${n.file} |`)
    .join('\n');

  const commitShort = commitSha ? commitSha.slice(0, 7) : 'unknown';

  return `## Code Graph

Graph built: ${builtAt} | Commit: ${commitShort} | Nodes: ${stats.nodeCount} | Edges: ${stats.edgeCount}

### Modules
| Module | Files | Key Classes/Entities |
|---|---|---|
${moduleRows || '| (none) | 0 | |'}

### CDS Entities & Services
| Name | Language | File |
|---|---|---|
${entityRows || '| (none) | | |'}

### High-Risk Nodes (change carefully)
| Node | Risk Score | File |
|---|---|---|
${riskRows || '| (none) | | |'}

### Instructions for Claude

**MANDATORY workflow for every user prompt:**

1. **First action** on any task that touches code: run \`/query-graph <topic>\` (or \`node .code-graph/query.js search "<term>"\`) to get a targeted file list.
2. **Do NOT** use Glob, Grep, or \`find\` to scan the codebase broadly. The graph already indexes all source files.
3. **Only read the files the graph returns.** Do not open files speculatively.
4. **Fallback rule:** Only run a global Grep if the graph query returns zero results — and after, run \`/build-graph --incremental\` to backfill the gap.

Quick reference:
- Find code by topic: \`/query-graph <keyword>\`
- Find what calls a function: \`/query-graph callers <name>\`
- Find what a function calls: \`/query-graph callees <name>\`
- Blast radius of a change: \`/query-graph blast <name>\`
- Find tests for a class: \`/query-graph tests <name>\`
- Highest-risk hotspots: \`/query-graph risk\`
`;

}

function injectClaudeMd(claudeMdPath, indexContent) {
  const block = `${MARKER_START}\n${indexContent}\n${MARKER_END}`;

  if (!fs.existsSync(claudeMdPath)) {
    fs.writeFileSync(claudeMdPath, `${block}\n`);
    return;
  }

  let existing = fs.readFileSync(claudeMdPath, 'utf8');

  if (existing.includes(MARKER_START)) {
    const startIdx = existing.indexOf(MARKER_START);
    const endIdx = existing.indexOf(MARKER_END) + MARKER_END.length;
    existing = existing.slice(0, startIdx) + block + existing.slice(endIdx);
  } else {
    existing = existing.trimEnd() + '\n\n' + block + '\n';
  }

  fs.writeFileSync(claudeMdPath, existing);
}

module.exports = { generateIndex, injectClaudeMd };
