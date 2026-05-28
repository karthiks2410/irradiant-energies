const path = require('path');

class QueryEngine {
  constructor(store) {
    this.store = store;
  }

  blastRadius(nodeId, { depth = 3 } = {}) {
    const visited = new Set();
    const affected = [];
    const depthMap = { [nodeId]: 0 };
    const queue = [nodeId];

    while (queue.length > 0) {
      const current = queue.shift();
      const currentDepth = depthMap[current] || 0;
      if (currentDepth >= depth) continue;

      const callerEdges = this.store.edgesTo(current).filter(e => e.kind === 'calls');
      for (const edge of callerEdges) {
        const callerId = edge.from_id;
        if (!visited.has(callerId)) {
          visited.add(callerId);
          const node = this.store.findNode(callerId);
          if (node) {
            affected.push(node);
            depthMap[callerId] = currentDepth + 1;
            queue.push(callerId);
          }
        }
      }
    }

    const affectedFiles = [...new Set(affected.map(n => n.file))];

    const rootNode = this.store.findNode(nodeId);
    const parentIds = rootNode?.parent_id ? [rootNode.parent_id] : [];
    const allIds = [nodeId, ...parentIds, ...affected.map(n => n.id), ...affected.map(n => n.parent_id).filter(Boolean)];
    const tests = [];
    const seenTests = new Set();
    for (const id of [...new Set(allIds)]) {
      const testEdges = this.store.edgesTo(id).filter(e => e.kind === 'tested_by');
      for (const e of testEdges) {
        if (!seenTests.has(e.from_id)) {
          seenTests.add(e.from_id);
          const testNode = this.store.findNode(e.from_id);
          if (testNode) tests.push(testNode);
        }
      }
    }

    const testFiles = [...new Set(tests.map(t => t.file))];
    return { nodeId, affected, affectedFiles, tests, testFiles };
  }

  callersOf(nodeId) {
    return this.store.edgesTo(nodeId)
      .filter(e => e.kind === 'calls')
      .map(e => this.store.findNode(e.from_id))
      .filter(Boolean);
  }

  calleesOf(nodeId) {
    return this.store.edgesFrom(nodeId)
      .filter(e => e.kind === 'calls')
      .map(e => this.store.findNode(e.to_id))
      .filter(Boolean);
  }

  testsFor(nodeId) {
    return this.store.edgesTo(nodeId)
      .filter(e => e.kind === 'tested_by')
      .map(e => this.store.findNode(e.from_id))
      .filter(Boolean);
  }

  keywordSearch(keyword) {
    return this.store.findNodesByName(keyword);
  }

  highRisk({ limit = 10 } = {}) {
    return this.store.getAllNodes()
      .filter(n => n.risk_score > 0)
      .sort((a, b) => b.risk_score - a.risk_score)
      .slice(0, limit);
  }
}

if (require.main === module) {
  const { GraphStore } = require('./graph');

  const graphDbPath = path.join(process.cwd(), '.code-graph', 'graph.db');
  const args = process.argv.slice(2);
  const mode = args[0];
  const topic = args.slice(1).join(' ');

  let store;
  try {
    store = new GraphStore(graphDbPath);
  } catch (err) {
    console.error(JSON.stringify({ error: 'Graph not found. Run /build-graph first.', detail: err.message }));
    process.exit(1);
  }

  const engine = new QueryEngine(store);
  let result;

  switch (mode) {
    case 'blast':   result = engine.blastRadius(topic); break;
    case 'search':  result = engine.keywordSearch(topic); break;
    case 'callers': result = engine.callersOf(topic); break;
    case 'callees': result = engine.calleesOf(topic); break;
    case 'tests':   result = engine.testsFor(topic); break;
    case 'risk':    result = engine.highRisk(); break;
    default:        result = engine.keywordSearch(mode + (topic ? ' ' + topic : ''));
  }

  console.log(JSON.stringify(result, null, 2));
  store.close();
}

module.exports = { QueryEngine };
