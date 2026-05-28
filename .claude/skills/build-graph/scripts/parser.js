const path = require('path');

// ─── CDS Parser ──────────────────────────────────────────────────────────────

function parseCds(source, filePath) {
  const nodes = [];
  const edges = [];

  const namespaceMatch = source.match(/^namespace\s+([\w.]+)\s*;/m);
  const namespace = namespaceMatch ? namespaceMatch[1] : '';

  const serviceMatch = source.match(/@path\s*:\s*'([^']+)'\s*\nservice\s+(\w+)/);
  if (serviceMatch) {
    const serviceName = serviceMatch[2];
    const servicePath = serviceMatch[1];
    const serviceId = namespace ? `${namespace}.${serviceName}` : serviceName;

    nodes.push({
      id: serviceId,
      kind: 'service',
      name: serviceName,
      file: filePath,
      lineStart: 1,
      lineEnd: 1,
      language: 'cds',
      parentId: null,
      isTest: false
    });

    const projectionRegex = /entity\s+(\w+)\s+as\s+(?:select from|projection on)\s+([\w.]+)/g;
    let projMatch;
    while ((projMatch = projectionRegex.exec(source)) !== null) {
      const projectionName = projMatch[1];
      const targetName = projMatch[2];
      const projId = `${serviceId}.${projectionName}`;

      nodes.push({
        id: projId,
        kind: 'projection',
        name: projectionName,
        file: filePath,
        lineStart: 1,
        lineEnd: 1,
        language: 'cds',
        parentId: serviceId,
        isTest: false
      });

      edges.push({ fromId: projId, toId: targetName, kind: 'projects', file: filePath });
    }
    return { nodes, edges };
  }

  const entityRegex = /^entity\s+(\w+)\s*\{([^}]+)\}/gm;
  let entityMatch;
  while ((entityMatch = entityRegex.exec(source)) !== null) {
    const entityName = entityMatch[1];
    const entityBody = entityMatch[2];
    const entityId = namespace ? `${namespace}.${entityName}` : entityName;

    nodes.push({
      id: entityId,
      kind: 'entity',
      name: entityName,
      file: filePath,
      lineStart: 1,
      lineEnd: 1,
      language: 'cds',
      parentId: null,
      isTest: false
    });

    const compositionRegex = /(\w+)\s*:\s*Composition\s+of\s+(?:many\s+)?(\w+)/g;
    let compMatch;
    while ((compMatch = compositionRegex.exec(entityBody)) !== null) {
      const targetName = compMatch[2];
      const targetId = namespace ? `${namespace}.${targetName}` : targetName;
      edges.push({ fromId: entityId, toId: targetId, kind: 'composition', file: filePath });
    }

    const associationRegex = /(\w+)\s*:\s*Association\s+to\s+(?:one\s+|many\s+)?(\w+)/g;
    let assocMatch;
    while ((assocMatch = associationRegex.exec(entityBody)) !== null) {
      const targetName = assocMatch[2];
      const targetId = namespace ? `${namespace}.${targetName}` : targetName;
      edges.push({ fromId: entityId, toId: targetId, kind: 'association', file: filePath });
    }
  }

  return { nodes, edges };
}

// ─── Java Parser ─────────────────────────────────────────────────────────────

const Parser = require('tree-sitter');
const JavaGrammar = require('tree-sitter-java');
const { typescript: TSGrammar } = require('tree-sitter-typescript');

const javaParser = new Parser();
javaParser.setLanguage(JavaGrammar);

const tsParser = new Parser();
tsParser.setLanguage(TSGrammar);

function extractPackage(rootNode) {
  for (const child of rootNode.children) {
    if (child.type === 'package_declaration') {
      return child.children
        .filter(c => c.type === 'scoped_identifier' || c.type === 'identifier')
        .map(c => c.text)
        .join('');
    }
  }
  return '';
}

function extractAnnotationValue(classNode, annotationName) {
  const modifiers = classNode.children.find(c => c.type === 'modifiers');
  if (!modifiers) return null;
  for (const mod of modifiers.children) {
    if (mod.type === 'annotation') {
      const nameNode = mod.children.find(c => c.type === 'identifier');
      if (nameNode && nameNode.text === annotationName) {
        const argList = mod.children.find(c => c.type === 'annotation_argument_list');
        if (argList) {
          const strLit = argList.descendantsOfType('string_literal')[0];
          if (strLit) return strLit.text.replace(/"/g, '');
        }
      }
    }
  }
  return null;
}

function extractCapAnnotation(methodNode) {
  const CAP_ANNOTATIONS = ['Before', 'On', 'After'];
  const modifiers = methodNode.children.find(c => c.type === 'modifiers');
  if (!modifiers) return null;
  for (const mod of modifiers.children) {
    if (mod.type === 'annotation' || mod.type === 'marker_annotation') {
      const nameNode = mod.children.find(c => c.type === 'identifier');
      if (nameNode && CAP_ANNOTATIONS.includes(nameNode.text)) {
        return nameNode.text;
      }
    }
  }
  return null;
}

function isTestMethod(methodNode) {
  const modifiers = methodNode.children.find(c => c.type === 'modifiers');
  if (!modifiers) return false;
  for (const mod of modifiers.children) {
    if (mod.type === 'annotation' || mod.type === 'marker_annotation') {
      const nameNode = mod.children.find(c => c.type === 'identifier');
      if (nameNode && nameNode.text === 'Test') return true;
    }
  }
  return false;
}

function collectMethodCalls(bodyNode, filePath) {
  const calls = [];
  if (!bodyNode) return calls;
  const invocations = bodyNode.descendantsOfType('method_invocation');
  for (const inv of invocations) {
    const nameNode = inv.children.find(c => c.type === 'identifier');
    if (nameNode) {
      calls.push({ targetName: nameNode.text, file: filePath });
    }
  }
  return calls;
}

function parseJava(source, filePath) {
  const nodes = [];
  const edges = [];

  const tree = javaParser.parse(source);
  const root = tree.rootNode;
  const pkg = extractPackage(root);

  const classDecls = root.descendantsOfType('class_declaration');
  for (const classNode of classDecls) {
    const nameNode = classNode.children.find(c => c.type === 'identifier');
    if (!nameNode) continue;

    const className = nameNode.text;
    const classId = pkg ? `${pkg}.${className}` : className;
    const serviceName = extractAnnotationValue(classNode, 'ServiceName');
    const isTestClass = className.endsWith('Test') || className.endsWith('IT');

    nodes.push({
      id: classId,
      kind: 'class',
      name: className,
      file: filePath,
      lineStart: classNode.startPosition.row + 1,
      lineEnd: classNode.endPosition.row + 1,
      language: 'java',
      parentId: null,
      isTest: isTestClass
    });

    const methodDecls = classNode.descendantsOfType('method_declaration');
    for (const methodNode of methodDecls) {
      const mNameNode = methodNode.children.find(c => c.type === 'identifier');
      if (!mNameNode) continue;

      const methodName = mNameNode.text;
      const methodId = `${classId}.${methodName}()`;
      const capAnnotation = extractCapAnnotation(methodNode);
      const isTest = isTestMethod(methodNode);

      nodes.push({
        id: methodId,
        kind: 'method',
        name: methodName,
        file: filePath,
        lineStart: methodNode.startPosition.row + 1,
        lineEnd: methodNode.endPosition.row + 1,
        language: 'java',
        parentId: classId,
        isTest
      });

      const body = methodNode.children.find(c => c.type === 'block');
      const calls = collectMethodCalls(body, filePath);
      for (const call of calls) {
        edges.push({ fromId: methodId, toId: call.targetName, kind: 'calls', file: filePath });
      }

      if (isTest) {
        edges.push({ fromId: methodId, toId: classId, kind: 'tested_by', file: filePath });
      }
    }

    const superclass = classNode.children.find(c => c.type === 'superclass');
    if (superclass) {
      const superName = superclass.descendantsOfType('identifier')[0];
      if (superName) {
        edges.push({ fromId: classId, toId: superName.text, kind: 'inherits', file: filePath });
      }
    }

    const interfaces = classNode.children.find(c => c.type === 'super_interfaces');
    if (interfaces) {
      const ifaceNames = interfaces.descendantsOfType('identifier');
      for (const iface of ifaceNames) {
        edges.push({ fromId: classId, toId: iface.text, kind: 'implements', file: filePath });
      }
    }
  }

  return { nodes, edges };
}

// ─── TypeScript Parser ───────────────────────────────────────────────────────

function parseTypeScript(source, filePath) {
  const nodes = [];
  const edges = [];

  const tree = tsParser.parse(source);
  const root = tree.rootNode;

  const classDecls = root.descendantsOfType('class_declaration');
  for (const classNode of classDecls) {
    const nameNode = classNode.children.find(c => c.type === 'type_identifier');
    if (!nameNode) continue;

    const className = nameNode.text;
    const classId = `${filePath}#${className}`;

    nodes.push({
      id: classId,
      kind: 'class',
      name: className,
      file: filePath,
      lineStart: classNode.startPosition.row + 1,
      lineEnd: classNode.endPosition.row + 1,
      language: 'typescript',
      parentId: null,
      isTest: false
    });

    const methodDecls = classNode.descendantsOfType('method_definition');
    for (const methodNode of methodDecls) {
      const mNameNode = methodNode.children.find(c => c.type === 'property_identifier');
      if (!mNameNode) continue;

      const methodName = mNameNode.text;
      nodes.push({
        id: `${classId}.${methodName}()`,
        kind: 'method',
        name: methodName,
        file: filePath,
        lineStart: methodNode.startPosition.row + 1,
        lineEnd: methodNode.endPosition.row + 1,
        language: 'typescript',
        parentId: classId,
        isTest: false
      });
    }
  }

  // Function declarations: function foo() { ... }
  const fnDecls = root.descendantsOfType('function_declaration');
  for (const fnNode of fnDecls) {
    const nameNode = fnNode.children.find(c => c.type === 'identifier');
    if (!nameNode) continue;
    const fnName = nameNode.text;
    const isComponent = /^[A-Z]/.test(fnName);
    nodes.push({
      id: `${filePath}#${fnName}`,
      kind: isComponent ? 'component' : 'function',
      name: fnName,
      file: filePath,
      lineStart: fnNode.startPosition.row + 1,
      lineEnd: fnNode.endPosition.row + 1,
      language: 'typescript',
      parentId: null,
      isTest: /\.(test|spec)\.[tj]sx?$/.test(filePath)
    });
  }

  // Top-level const/let arrow functions: export const Foo = () => { ... }
  const lexicals = root.descendantsOfType('lexical_declaration')
    .filter(n => n.parent && n.parent.type === 'program' || (n.parent && n.parent.type === 'export_statement' && n.parent.parent && n.parent.parent.type === 'program'));
  for (const decl of lexicals) {
    const declarators = decl.descendantsOfType('variable_declarator');
    for (const declarator of declarators) {
      const nameNode = declarator.children.find(c => c.type === 'identifier');
      if (!nameNode) continue;
      const value = declarator.children.find(c => c.type === 'arrow_function' || c.type === 'function_expression');
      if (!value) continue;
      const fnName = nameNode.text;
      const isComponent = /^[A-Z]/.test(fnName);
      nodes.push({
        id: `${filePath}#${fnName}`,
        kind: isComponent ? 'component' : 'function',
        name: fnName,
        file: filePath,
        lineStart: declarator.startPosition.row + 1,
        lineEnd: declarator.endPosition.row + 1,
        language: 'typescript',
        parentId: null,
        isTest: /\.(test|spec)\.[tj]sx?$/.test(filePath)
      });
    }
  }

  // Type aliases and interfaces (high-value for grep-like discovery)
  for (const kindType of ['type_alias_declaration', 'interface_declaration']) {
    const decls = root.descendantsOfType(kindType);
    for (const node of decls) {
      const nameNode = node.children.find(c => c.type === 'type_identifier');
      if (!nameNode) continue;
      nodes.push({
        id: `${filePath}#${nameNode.text}`,
        kind: kindType === 'interface_declaration' ? 'interface' : 'type',
        name: nameNode.text,
        file: filePath,
        lineStart: node.startPosition.row + 1,
        lineEnd: node.endPosition.row + 1,
        language: 'typescript',
        parentId: null,
        isTest: false
      });
    }
  }

  // Imports → edges (file-to-file)
  const imports = root.descendantsOfType('import_statement');
  const fileNodeId = `file:${filePath}`;
  if (imports.length > 0) {
    nodes.push({
      id: fileNodeId,
      kind: 'file',
      name: path.basename(filePath),
      file: filePath,
      lineStart: 1,
      lineEnd: 1,
      language: 'typescript',
      parentId: null,
      isTest: /\.(test|spec)\.[tj]sx?$/.test(filePath)
    });
    for (const imp of imports) {
      const sourceNode = imp.descendantsOfType('string')[0];
      if (!sourceNode) continue;
      const target = sourceNode.text.replace(/['"]/g, '');
      edges.push({ fromId: fileNodeId, toId: target, kind: 'imports', file: filePath });
    }
  }

  return { nodes, edges };
}

module.exports = { parseCds, parseJava, parseTypeScript };
