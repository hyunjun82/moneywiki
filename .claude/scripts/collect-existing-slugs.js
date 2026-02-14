#!/usr/bin/env node
/**
 * 기존 글 slug 전체 수집 → .claude/data/existing-slugs.json 생성
 * /keywords 명령어에서 중복 체크에 사용
 *
 * 사용법: node .claude/scripts/collect-existing-slugs.js
 * 출력: .claude/data/existing-slugs.json
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '../..');
const OUTPUT = path.join(ROOT, '.claude/data/existing-slugs.json');

// 출력 디렉토리 확인
const outputDir = path.dirname(OUTPUT);
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const slugs = {
  wiki: [],    // content/wiki/*.md
  spoke: [],   // src/data/spoke/*.tsx
  hub: [],     // src/data/hub/*.tsx
};

// 1. Wiki MD 글 수집
const wikiDir = path.join(ROOT, 'content/wiki');
if (fs.existsSync(wikiDir)) {
  for (const f of fs.readdirSync(wikiDir)) {
    if (f.endsWith('.md')) {
      const slug = f.replace('.md', '');
      
      // title 추출 (frontmatter에서)
      let title = slug;
      try {
        const content = fs.readFileSync(path.join(wikiDir, f), 'utf8');
        const titleMatch = content.match(/^title:\s*["']?(.+?)["']?\s*$/m);
        if (titleMatch) title = titleMatch[1];
      } catch {}
      
      slugs.wiki.push({ slug, title, file: `content/wiki/${f}` });
    }
  }
}

// 2. Spoke TSX 수집
const spokeDir = path.join(ROOT, 'src/data/spoke');
if (fs.existsSync(spokeDir)) {
  const exclude = ['registry.ts', 'types.ts', 'index.ts', 'index.tsx'];
  for (const f of fs.readdirSync(spokeDir)) {
    if (f.endsWith('.tsx') && !exclude.includes(f)) {
      const slug = f.replace('.tsx', '');
      
      let title = slug;
      try {
        const content = fs.readFileSync(path.join(spokeDir, f), 'utf8');
        const titleMatch = content.match(/title:\s*['"](.+?)['"]/);
        if (titleMatch) title = titleMatch[1];
      } catch {}
      
      slugs.spoke.push({ slug, title, file: `src/data/spoke/${f}` });
    }
  }
}

// 3. Hub TSX 수집
const hubDir = path.join(ROOT, 'src/data/hub');
if (fs.existsSync(hubDir)) {
  const exclude = ['registry.ts', 'types.ts', 'index.ts', 'index.tsx'];
  for (const f of fs.readdirSync(hubDir)) {
    if (f.endsWith('.tsx') && !exclude.includes(f)) {
      const slug = f.replace('.tsx', '');
      
      let title = slug;
      try {
        const content = fs.readFileSync(path.join(hubDir, f), 'utf8');
        const titleMatch = content.match(/title:\s*['"](.+?)['"]/);
        if (titleMatch) title = titleMatch[1];
      } catch {}
      
      slugs.hub.push({ slug, title, file: `src/data/hub/${f}` });
    }
  }
}

// 4. 키워드 기반 중복 감지용 토큰 맵 생성
// slug를 토큰화해서 유사 slug 그룹핑
function tokenize(slug) {
  return slug
    .replace(/[-_]/g, ' ')
    .split(/\s+/)
    .filter(t => t.length > 1)
    .sort();
}

const allSlugs = [
  ...slugs.wiki.map(s => ({ ...s, type: 'wiki' })),
  ...slugs.spoke.map(s => ({ ...s, type: 'spoke' })),
  ...slugs.hub.map(s => ({ ...s, type: 'hub' })),
];

// 토큰 유사도 기반 중복 그룹 찾기
const duplicateGroups = [];
const processed = new Set();

for (let i = 0; i < allSlugs.length; i++) {
  if (processed.has(i)) continue;
  const tokensA = tokenize(allSlugs[i].slug);
  const group = [allSlugs[i]];
  
  for (let j = i + 1; j < allSlugs.length; j++) {
    if (processed.has(j)) continue;
    const tokensB = tokenize(allSlugs[j].slug);
    
    // 교집합 비율 계산 (Jaccard similarity)
    const intersection = tokensA.filter(t => tokensB.includes(t));
    const union = new Set([...tokensA, ...tokensB]);
    const similarity = intersection.length / union.size;
    
    if (similarity >= 0.6) { // 60% 이상 겹치면 중복 후보
      group.push(allSlugs[j]);
      processed.add(j);
    }
  }
  
  if (group.length > 1) {
    duplicateGroups.push(group.map(g => ({
      slug: g.slug,
      type: g.type,
      title: g.title,
    })));
  }
  processed.add(i);
}

const result = {
  generated: new Date().toISOString().split('T')[0],
  counts: {
    wiki: slugs.wiki.length,
    spoke: slugs.spoke.length,
    hub: slugs.hub.length,
    total: allSlugs.length,
    duplicateGroups: duplicateGroups.length,
  },
  // slug만 flat 리스트 (빠른 중복 체크용)
  allSlugs: allSlugs.map(s => s.slug),
  // 의심 중복 그룹
  duplicateGroups,
};

fs.writeFileSync(OUTPUT, JSON.stringify(result, null, 2), 'utf8');

console.log(`\n기존 글 slug 수집 완료:`);
console.log(`  wiki: ${slugs.wiki.length}개`);
console.log(`  spoke: ${slugs.spoke.length}개`);
console.log(`  hub: ${slugs.hub.length}개`);
console.log(`  합계: ${allSlugs.length}개`);
console.log(`  의심 중복 그룹: ${duplicateGroups.length}개`);
console.log(`\n저장: ${OUTPUT}`);
