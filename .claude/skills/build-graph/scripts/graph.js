const Database = require('better-sqlite3');

const SCHEMA = `
  CREATE TABLE IF NOT EXISTS nodes (
    id         TEXT PRIMARY KEY,
    kind       TEXT NOT NULL,
    name       TEXT NOT NULL,
    file       TEXT NOT NULL,
    line_start INTEGER,
    line_end   INTEGER,
    language   TEXT NOT NULL,
    parent_id  TEXT,
    is_test    INTEGER DEFAULT 0,
    risk_score REAL DEFAULT 0
  );

  CREATE TABLE IF NOT EXISTS edges (
    from_id TEXT NOT NULL,
    to_id   TEXT NOT NULL,
    kind    TEXT NOT NULL,
    file    TEXT NOT NULL,
    PRIMARY KEY (from_id, to_id, kind)
  );

  CREATE INDEX IF NOT EXISTS idx_edges_to   ON edges(to_id);
  CREATE INDEX IF NOT EXISTS idx_edges_from ON edges(from_id);
  CREATE INDEX IF NOT EXISTS idx_nodes_file ON nodes(file);
  CREATE INDEX IF NOT EXISTS idx_nodes_kind ON nodes(kind);
  CREATE INDEX IF NOT EXISTS idx_nodes_name ON nodes(name);
`;

class GraphStore {
  constructor(dbPath) {
    this.db = new Database(dbPath);
    this.db.pragma('journal_mode = WAL');
    this.db.exec(SCHEMA);

    this.insertNodeStmt = this.db.prepare(`
      INSERT INTO nodes (id, kind, name, file, line_start, line_end, language, parent_id, is_test)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      ON CONFLICT(id) DO UPDATE SET
        kind = excluded.kind,
        name = excluded.name,
        file = excluded.file,
        line_start = excluded.line_start,
        line_end = excluded.line_end,
        language = excluded.language,
        parent_id = excluded.parent_id,
        is_test = excluded.is_test
    `);

    this.insertEdgeStmt = this.db.prepare(`
      INSERT INTO edges (from_id, to_id, kind, file)
      VALUES (?, ?, ?, ?)
      ON CONFLICT(from_id, to_id, kind) DO NOTHING
    `);
  }

  upsertNode({ id, kind, name, file, lineStart, lineEnd, language, parentId, isTest }) {
    this.insertNodeStmt.run(id, kind, name, file, lineStart, lineEnd, language, parentId || null, isTest ? 1 : 0);
  }

  upsertEdge({ fromId, toId, kind, file }) {
    this.insertEdgeStmt.run(fromId, toId, kind, file);
  }

  findNode(id) {
    return this.db.prepare('SELECT * FROM nodes WHERE id = ?').get(id) || null;
  }

  findNodesByFile(file) {
    return this.db.prepare('SELECT * FROM nodes WHERE file = ?').all(file);
  }

  findNodesByName(name) {
    // Escape SQL LIKE special characters
    const escaped = name.replace(/[%_\\]/g, '\\$&');
    return this.db.prepare("SELECT * FROM nodes WHERE name LIKE ? ESCAPE '\\'").all(`%${escaped}%`);
  }

  edgesFrom(nodeId) {
    return this.db.prepare('SELECT * FROM edges WHERE from_id = ?').all(nodeId);
  }

  edgesTo(nodeId) {
    return this.db.prepare('SELECT * FROM edges WHERE to_id = ?').all(nodeId);
  }

  deleteByFile(file) {
    this.db.prepare('DELETE FROM nodes WHERE file = ?').run(file);
    this.db.prepare('DELETE FROM edges WHERE file = ?').run(file);
  }

  computeRiskScores() {
    const updateAll = this.db.transaction(() => {
      this.db.exec(`
        UPDATE nodes SET risk_score = (
          SELECT
            COALESCE(caller_counts.cnt, 0) * 1.0 / COALESCE(max_callers.m, 1) * 0.7
            + CASE WHEN test_coverage.cnt > 0 THEN 0 ELSE 0.3 END
          FROM
            (SELECT MAX(cnt) as m FROM (SELECT COUNT(*) as cnt FROM edges WHERE kind = 'calls' GROUP BY to_id)) as max_callers,
            (SELECT COALESCE(COUNT(*), 0) as cnt FROM edges WHERE to_id = nodes.id AND kind = 'calls') as caller_counts,
            (SELECT COUNT(*) as cnt FROM edges WHERE to_id = nodes.id AND kind = 'tested_by') as test_coverage
        )
      `);
    });
    updateAll();
  }

  getStats() {
    const nodeCount = this.db.prepare('SELECT COUNT(*) as cnt FROM nodes').get().cnt;
    const edgeCount = this.db.prepare('SELECT COUNT(*) as cnt FROM edges').get().cnt;
    const byKind = this.db.prepare('SELECT kind, COUNT(*) as cnt FROM nodes GROUP BY kind').all();
    const byLanguage = this.db.prepare('SELECT language, COUNT(*) as cnt FROM nodes GROUP BY language').all();
    return { nodeCount, edgeCount, byKind, byLanguage };
  }

  getAllNodes() {
    return this.db.prepare('SELECT * FROM nodes').all();
  }

  getAllEdges() {
    return this.db.prepare('SELECT * FROM edges').all();
  }

  close() {
    this.db.close();
  }
}

module.exports = { GraphStore };
