/**
 * 외부링크 자동 CTA 추가 스크립트
 *
 * 1. content/wiki/ 폴더의 모든 .md 파일 스캔
 * 2. 본문에서 외부링크 찾기 (gov.kr, nps.or.kr 등 공공기관)
 * 3. frontmatter에 cta 필드 자동 추가
 * 4. 이미 cta가 있으면 스킵
 */

const fs = require('fs');
const path = require('path');

const WIKI_DIR = path.join(__dirname, '..', 'content', 'wiki');

// 신뢰할 수 있는 공공기관 도메인
const TRUSTED_DOMAINS = [
  'gov.kr',
  'go.kr',
  'or.kr',
  'hometax',
  'nts.go.kr',
  'moel.go.kr',
  'ei.go.kr',
  'nps.or.kr',
  'nhis.or.kr',
  'bokjiro',
  'law.go.kr',
  'courtauction',
  'molit.go.kr',
  'lh.or.kr',
  'hug.go.kr',
  'kcomwel.or.kr',
  'work.go.kr',
  'minwon',
  'wetax',
  'apply.lh.or.kr'
];

// 내부링크/제외 도메인
const EXCLUDED_DOMAINS = [
  'jjyu.co.kr',
  'localhost',
  '127.0.0.1'
];

// 카테고리별 색상 결정
function getColorByCategory(category, url) {
  // 부동산/경매/대출이자 → dark
  if (['부동산', '경매', '대출'].some(k => category?.includes(k))) {
    return 'dark';
  }
  if (url.includes('courtauction') || url.includes('auction')) {
    return 'dark';
  }
  // 나머지 → green (지원금, 환급금 등)
  return 'green';
}

// URL에서 액션 텍스트 추출
function getActionFromUrl(url, linkText) {
  if (linkText?.includes('신청')) return '신청하기';
  if (linkText?.includes('조회')) return '조회하기';
  if (linkText?.includes('계산')) return '계산하기';
  if (linkText?.includes('검색')) return '검색하기';
  if (linkText?.includes('확인')) return '확인하기';
  if (linkText?.includes('다운')) return '다운로드';
  return '바로가기';
}

// URL에서 배지 텍스트 생성
function getBadgeFromUrl(url) {
  if (url.includes('gov.kr') || url.includes('go.kr')) return '정부 공식';
  if (url.includes('hometax') || url.includes('nts')) return '국세청 공식';
  if (url.includes('nps.or.kr')) return '국민연금 공식';
  if (url.includes('nhis.or.kr')) return '건강보험 공식';
  if (url.includes('ei.go.kr') || url.includes('work.go.kr')) return '고용보험 공식';
  if (url.includes('bokjiro')) return '복지로 공식';
  if (url.includes('law.go.kr')) return '법제처 공식';
  if (url.includes('courtauction')) return '대법원 공식';
  if (url.includes('lh.or.kr')) return 'LH 공식';
  return '공식 사이트';
}

// 마크다운에서 외부링크 추출
function extractExternalLinks(content) {
  // [텍스트](URL) 패턴
  const linkPattern = /\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g;
  const links = [];
  let match;

  while ((match = linkPattern.exec(content)) !== null) {
    const text = match[1];
    const url = match[2];

    // 내부링크 제외
    if (EXCLUDED_DOMAINS.some(d => url.includes(d))) continue;

    // 신뢰 도메인만
    if (TRUSTED_DOMAINS.some(d => url.includes(d))) {
      links.push({ text, url });
    }
  }

  return links;
}

// frontmatter 파싱
function parseFrontmatter(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return { frontmatter: null, body: content };

  return {
    frontmatterRaw: match[1],
    body: content.slice(match[0].length)
  };
}

// frontmatter에 cta가 있는지 확인
function hasCta(frontmatterRaw) {
  return frontmatterRaw.includes('cta:');
}

// category 추출
function getCategory(frontmatterRaw) {
  const match = frontmatterRaw.match(/category:\s*["']?([^"'\n]+)["']?/);
  return match ? match[1].trim() : '';
}

// CTA 추가
function addCtaToFrontmatter(content, link, category) {
  const { frontmatterRaw, body } = parseFrontmatter(content);
  if (!frontmatterRaw) return null;

  const color = getColorByCategory(category, link.url);
  const action = getActionFromUrl(link.url, link.text);
  const badge = getBadgeFromUrl(link.url);

  // CTA YAML 생성
  const ctaYaml = `cta:
  - url: "${link.url}"
    badge: "${badge}"
    text: "${link.text}"
    action: "${action}"
    color: "${color}"`;

  // frontmatter 끝에 추가
  const newFrontmatter = frontmatterRaw.trim() + '\n' + ctaYaml;

  return `---\n${newFrontmatter}\n---${body}`;
}

// 메인 실행
function main() {
  const files = fs.readdirSync(WIKI_DIR).filter(f => f.endsWith('.md'));

  let processed = 0;
  let skipped = 0;
  let noLinks = 0;
  const results = [];

  console.log(`\n📂 총 ${files.length}개 파일 스캔 시작...\n`);

  for (const file of files) {
    const filePath = path.join(WIKI_DIR, file);
    const content = fs.readFileSync(filePath, 'utf-8');

    const { frontmatterRaw, body } = parseFrontmatter(content);

    if (!frontmatterRaw) {
      console.log(`⚠️ ${file}: frontmatter 없음`);
      skipped++;
      continue;
    }

    // 이미 CTA 있으면 스킵
    if (hasCta(frontmatterRaw)) {
      skipped++;
      continue;
    }

    // 본문에서 외부링크 찾기
    const links = extractExternalLinks(body);

    if (links.length === 0) {
      noLinks++;
      continue;
    }

    // 첫 번째 링크로 CTA 추가
    const category = getCategory(frontmatterRaw);
    const newContent = addCtaToFrontmatter(content, links[0], category);

    if (newContent) {
      fs.writeFileSync(filePath, newContent, 'utf-8');
      processed++;
      results.push({
        file,
        url: links[0].url,
        text: links[0].text
      });
      console.log(`✅ ${file}: ${links[0].text}`);
    }
  }

  console.log(`\n========== 결과 ==========`);
  console.log(`✅ CTA 추가: ${processed}개`);
  console.log(`⏭️ 이미 있음/스킵: ${skipped}개`);
  console.log(`📭 외부링크 없음: ${noLinks}개`);
  console.log(`📊 총: ${files.length}개\n`);

  // 결과 저장
  if (results.length > 0) {
    fs.writeFileSync(
      path.join(__dirname, 'cta-added-report.json'),
      JSON.stringify(results, null, 2),
      'utf-8'
    );
    console.log(`📄 상세 리포트: scripts/cta-added-report.json\n`);
  }
}

main();
