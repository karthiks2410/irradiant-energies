#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const { collectFiles, getChangedFiles } = require('./incremental');
const { parseCds, parseJava, parseTypeScript } = require('./parser');
const { GraphStore } = require('./graph');
const { generateIndex, injectClaudeMd } = require('./summarise');

const GRAPH_DIR = '.code-graph';
const GRAPH_DB = path.join(GRAPH_DIR, 'graph.db');
const GRAPH_META = path.join(GRAPH_DIR, 'meta.json');
const QUERY_SCRIPT_SRC = path.join(__dirname, 'query.js');
const GRAPH_SCRIPT_SRC = path.join(__dirname, 'graph.js');
const GRAPH_QUERY_DEST = path.join(GRAPH_DIR, 'query.js');
const GRAPH_JS_DEST = path.join(GRAPH_DIR, 'graph.js');
const GRAPH_PACKAGE_DEST = path.join(GRAPH_DIR, 'package.json');

function getCommitSha(repoRoot) {
  try {
    return execFileSync('git', ['rev-parse', 'HEAD'], { cwd: repoRoot, encoding: 'utf8' }).trim();
  } catch {
    return null;
  }
}

function parseFile(absolutePath, relPath) {
  const ext = path.extname(absolutePath);
  const storedPath = relPath || absolutePath;
  const source = fs.readFileSync(absolutePath, 'utf8');
  try {
    if (ext === '.java') return parseJava(source, storedPath);
    if (ext === '.cds') return parseCds(source, storedPath);
    if (ext === '.ts' || ext === '.tsx' || ext === '.js' || ext === '.jsx' || ext === '.mjs' || ext === '.cjs') return parseTypeScript(source, storedPath);
    return { nodes: [], edges: [] };
  } catch {
    return { nodes: [], edges: [] };
  }
}

function updateGitignore(repoRoot) {
  const gitignorePath = path.join(repoRoot, '.gitignore');
  const entries = ['.code-graph/graph.db', '.code-graph/meta.json'];
  let content = fs.existsSync(gitignorePath) ? fs.readFileSync(gitignorePath, 'utf8') : '';
  let changed = false;
  for (const entry of entries) {
    if (!content.includes(entry)) {
      content += `\n${entry}`;
      changed = true;
    }
  }
  if (changed) fs.writeFileSync(gitignorePath, content.trimStart());
}

async function main() {
  const repoRoot = process.cwd();
  const isIncremental = process.argv.includes('--incremental');

  console.log(`\nCode Graph — building for ${path.basename(repoRoot)}`);
  console.log(`Mode: ${isIncremental ? 'incremental' : 'full'}\n`);

  fs.mkdirSync(path.join(repoRoot, GRAPH_DIR), { recursive: true });

  const metaPath = path.join(repoRoot, GRAPH_META);
  const meta = fs.existsSync(metaPath)
    ? JSON.parse(fs.readFileSync(metaPath, 'utf8'))
    : {};

  const store = new GraphStore(path.join(repoRoot, GRAPH_DB));

  const filesToParse = isIncremental
    ? getChangedFiles(repoRoot, meta.commitSha)
    : collectFiles(repoRoot);

  console.log(`Parsing ${filesToParse.length} files...`);

  let parsed = 0;
  for (const absolutePath of filesToParse) {
    const relPath = path.relative(repoRoot, absolutePath);
    if (isIncremental) store.deleteByFile(relPath);
    const { nodes, edges } = parseFile(absolutePath, relPath);
    for (const node of nodes) store.upsertNode(node);
    for (const edge of edges) store.upsertEdge(edge);
    parsed++;
    if (parsed % 50 === 0) process.stdout.write(`  ${parsed}/${filesToParse.length}\r`);
  }

  console.log(`\nComputing risk scores...`);
  store.computeRiskScores();

  const stats = store.getStats();
  const commitSha = getCommitSha(repoRoot);
  const builtAt = new Date().toISOString().split('T')[0];

  fs.writeFileSync(metaPath, JSON.stringify(
    { builtAt, commitSha, stats },
    null, 2
  ));

  console.log(`Generating index.md...`);
  const indexContent = generateIndex(store, stats, { builtAt, commitSha });
  fs.writeFileSync(path.join(repoRoot, GRAPH_DIR, 'index.md'), indexContent);

  console.log(`Copying query.js and graph.js...`);
  fs.copyFileSync(QUERY_SCRIPT_SRC, path.join(repoRoot, GRAPH_QUERY_DEST));
  fs.copyFileSync(GRAPH_SCRIPT_SRC, path.join(repoRoot, GRAPH_JS_DEST));
  fs.writeFileSync(
    path.join(repoRoot, GRAPH_PACKAGE_DEST),
    JSON.stringify({ dependencies: { 'better-sqlite3': '^12.8.0' } }, null, 2)
  );

  console.log(`Injecting CLAUDE.md...`);
  injectClaudeMd(path.join(repoRoot, 'CLAUDE.md'), indexContent);

  updateGitignore(repoRoot);
  store.close();

  console.log(`\nDone!`);
  console.log(`  Nodes:  ${stats.nodeCount}`);
  console.log(`  Edges:  ${stats.edgeCount}`);
  console.log(`  Files:  ${filesToParse.length} parsed`);
  console.log(`\nGraph written to .code-graph/`);
  console.log(`CLAUDE.md updated — Claude will now use the graph automatically.\n`);
}

main().catch(err => {
  console.error('Build failed:', err.message);
  process.exit(1);
});
