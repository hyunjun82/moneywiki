const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const wikiDir = path.join(__dirname, '../content/wiki');

// 모든 문서의 slug → category 매핑 생성
function buildCategoryMap() {
  const files = fs.readdirSync(wikiDir).filter(f => f.endsWith('.md'));
  const map = {};

  files.forEach(file => {
    const slug = file.replace('.md', '');
    const content = fs.readFileSync(path.join(wikiDir, file), 'utf8');
    const { data } = matter(content);
    map[slug] = data.category || '일반';
  });

  return map;
}

// 링크 업데이트
function updateLinks(content, categoryMap) {
  // [text](/w/slug) → [text](/w/category/slug) 패턴
  let updated = content.replace(
    /\[([^\]]+)\]\(\/w\/([^)\/]+)\)/g,
    (match, text, slug) => {
      const decodedSlug = decodeURIComponent(slug);
      const category = categoryMap[decodedSlug];
      if (category) {
        return `[${text}](/w/${encodeURIComponent(category)}/${slug})`;
      }
      console.log(`Warning: No category found for slug: ${decodedSlug}`);
      return match;
    }
  );

  return updated;
}

// relatedDocs URL 업데이트
function updateRelatedDocs(data, categoryMap) {
  if (!data.relatedDocs || !Array.isArray(data.relatedDocs)) {
    return data;
  }

  data.relatedDocs = data.relatedDocs.map(doc => {
    if (doc.url && doc.url.startsWith('/w/')) {
      const match = doc.url.match(/^\/w\/([^\/]+)$/);
      if (match) {
        const slug = decodeURIComponent(match[1]);
        const category = categoryMap[slug];
        if (category) {
          doc.url = `/w/${encodeURIComponent(category)}/${match[1]}`;
        }
      }
    }
    return doc;
  });

  return data;
}

// 메인 실행
function main() {
  console.log('Building category map...');
  const categoryMap = buildCategoryMap();
  console.log(`Found ${Object.keys(categoryMap).length} documents`);

  const files = fs.readdirSync(wikiDir).filter(f => f.endsWith('.md'));
  let updatedCount = 0;

  files.forEach(file => {
    const filePath = path.join(wikiDir, file);
    const rawContent = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(rawContent);

    // 본문 링크 업데이트
    const updatedContent = updateLinks(content, categoryMap);

    // relatedDocs 업데이트
    const updatedData = updateRelatedDocs(data, categoryMap);

    // 변경사항 확인
    const newRaw = matter.stringify(updatedContent, updatedData);
    if (newRaw !== rawContent) {
      fs.writeFileSync(filePath, newRaw);
      updatedCount++;
      console.log(`Updated: ${file}`);
    }
  });

  console.log(`\nDone! Updated ${updatedCount} files.`);
}

main();
