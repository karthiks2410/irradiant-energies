const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const SUPPORTED_EXTENSIONS = new Set(['.java', '.js', '.jsx', '.ts', '.tsx', '.mjs', '.cjs', '.cds']);
const EXCLUDED_DIRS = new Set(['node_modules', '.apm-graph', '.code-graph', '.git', 'target', 'dist', 'build', '.mvn', '.claude', '.next', '.turbo', '.vercel', 'out', 'coverage', '.cache']);

function collectFiles(repoRoot) {
  const results = [];

  function walk(dir) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      if (EXCLUDED_DIRS.has(entry.name)) continue;
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        walk(fullPath);
      } else if (entry.isFile()) {
        const ext = path.extname(entry.name);
        if (SUPPORTED_EXTENSIONS.has(ext)) {
          results.push(fullPath);
        }
      }
    }
  }

  walk(repoRoot);
  return results;
}

function getChangedFiles(repoRoot, lastCommitSha) {
  if (!lastCommitSha) {
    return collectFiles(repoRoot);
  }

  try {
    const output = execFileSync('git', ['diff', '--name-only', lastCommitSha, 'HEAD'], {
      cwd: repoRoot,
      encoding: 'utf8'
    }).trim();

    if (!output) return [];

    return output
      .split('\n')
      .map(f => path.join(repoRoot, f))
      .filter(f => {
        const ext = path.extname(f);
        return SUPPORTED_EXTENSIONS.has(ext) && fs.existsSync(f);
      });
  } catch {
    return collectFiles(repoRoot);
  }
}

module.exports = { collectFiles, getChangedFiles };
