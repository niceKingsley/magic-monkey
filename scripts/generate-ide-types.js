import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const COMPONENTS_DIR = path.resolve(__dirname, '../shared/components');

function camelToKebab(str) {
  return str.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2').toLowerCase();
}

function resolvePropertyType(propDef) {
  if (propDef.includes('Boolean')) return 'boolean';
  if (propDef.includes('Number')) return 'number';
  if (propDef.includes('Array')) return 'array';
  if (propDef.includes('Object')) return 'object';
  return 'string';
}

function extractClassBlock(content, className) {
  const classIdx = content.indexOf(`export class ${className}`);
  if (classIdx === -1) return '';

  const nextClassIdx = content.indexOf('export class ', classIdx + 12);
  return nextClassIdx !== -1 ? content.slice(classIdx, nextClassIdx) : content.slice(classIdx);
}

function parseProperties(classBlock) {
  const staticPropsMatch = classBlock.match(/static\s+properties\s*=\s*\{([\s\S]*?)\};/);
  if (!staticPropsMatch) return [];

  const propBlock = staticPropsMatch[1];
  const propRegex =
    /(?:\/\*\s*([\s\S]*?)\s*\*\/)?\s*([a-zA-Z0-9_$]+)\s*:\s*(\{[^}]+\}|[a-zA-Z0-9_$]+)/g;
  const properties = [];

  let pMatch;
  while ((pMatch = propRegex.exec(propBlock)) !== null) {
    const description = (pMatch[1] || '').trim();
    const propName = pMatch[2].trim();
    const propDef = pMatch[3].trim();
    if (propName.startsWith('_') || propDef.includes('state: true')) {
      continue;
    }
    const attrMatch = propDef.match(/attribute:\s*['"]([^'"]+)['"]/);

    properties.push({
      name: attrMatch ? attrMatch[1] : camelToKebab(propName),
      propName,
      type: resolvePropertyType(propDef),
      description: description || propName,
    });
  }

  return properties;
}

function parseEvents(classBlock) {
  const eventMatches = [...classBlock.matchAll(/new\s+CustomEvent\(\s*['"]([^'"]+)['"]/g)];
  const events = new Set(eventMatches.map(([, evt]) => evt));
  return Array.from(events);
}

function parseComponentFile(filePath, folderName) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const tagMatches = [
    ...content.matchAll(/customElements\.define\(\s*['"]([^'"]+)['"]\s*,\s*([A-Za-z0-9_]+)\s*\)/g),
  ];

  return tagMatches
    .map(([, tag, className]) => {
      const classBlock = extractClassBlock(content, className);
      if (!classBlock) return null;

      return {
        tag,
        className,
        file: `./${folderName}/index.js`,
        properties: parseProperties(classBlock),
        events: parseEvents(classBlock),
      };
    })
    .filter(Boolean);
}

function collectAllComponents() {
  const entries = fs.readdirSync(COMPONENTS_DIR, { withFileTypes: true });
  const allComponents = [];

  for (const entry of entries) {
    if (entry.isDirectory() && entry.name !== 'node_modules') {
      const entryFile = path.join(COMPONENTS_DIR, entry.name, 'index.js');
      if (fs.existsSync(entryFile)) {
        allComponents.push(...parseComponentFile(entryFile, entry.name));
      }
    }
  }

  return allComponents;
}

function getPackageInfo() {
  try {
    const pkgPath = path.join(COMPONENTS_DIR, 'package.json');
    const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'));
    return {
      name: pkg.name || '@shared/components',
      version: pkg.version || '1.0.0',
    };
  } catch {
    return {
      name: '@shared/components',
      version: '1.0.0',
    };
  }
}

function generateWebTypes() {
  const allComponents = collectAllComponents();
  const pkgInfo = getPackageInfo();

  const webTypes = {
    $schema: 'https://raw.githubusercontent.com/JetBrains/web-types/master/schema/web-types.json',
    name: pkgInfo.name,
    version: pkgInfo.version,
    'js-types-syntax': 'typescript',
    contributions: {
      html: {
        attributes: [
          { name: 'class', description: 'CSS 类名' },
          { name: 'style', description: '内联样式' },
          { name: 'id', description: '元素唯一标识' },
          { name: 'slot', description: '插槽名称' },
          { name: 'title', description: '悬停提示文本' },
        ],
        elements: allComponents.map((comp) => ({
          name: comp.tag,
          description: `Magic Monkey 共享组件 <${comp.tag}>`,
          source: {
            module: comp.file,
            symbol: comp.className,
          },
          attributes: comp.properties.map((prop) => ({
            name: prop.name,
            description: prop.description,
            value: {
              type: prop.type,
            },
          })),
          events: comp.events.map((evt) => ({
            name: evt,
            description: `<${comp.tag}> 触发的 @${evt} 事件`,
          })),
        })),
      },
    },
  };

  const webTypesPath = path.join(COMPONENTS_DIR, 'web-types.json');
  fs.writeFileSync(webTypesPath, JSON.stringify(webTypes, null, 2) + '\n', 'utf-8');

  console.log(`✔ 元数据 web-types.json 生成完成！共处理 ${allComponents.length} 个组件：`);
  for (const comp of allComponents) {
    console.log(
      `  - <${comp.tag}> (${comp.properties.length} 个属性, ${comp.events.length} 个事件) -> ${comp.file}`,
    );
  }
}

generateWebTypes();
