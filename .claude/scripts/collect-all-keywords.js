#!/usr/bin/env node
/**
 * 풀자동 키워드 수집기
 * 
 * 네이버/구글/다음/빙 연관검색어 + 구글 PAA 수집
 * → 중복 제거 → Hub/Spoke 분류 → JSON 저장
 * 
 * 사용법:
 *   node collect-all-keywords.js "근로장려금"
 */

const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, '..', 'data', 'paa-results');

// 동의어 그룹
const SYNONYM_GROUPS = [
  ['신청', '가입', '접수', '등록'],
  ['조건', '자격', '요건', '대상', '기준'],
  ['방법', '절차', '안내', '신청법', '하는법'],
  ['기한', '기간', '시기', '일정', '날짜'],
  ['금액', '비용', '가격', '수수료', '이자', '한도'],
  ['서류', '준비물', '문서', '첨부', '구비서류'],
  ['혜택', '지원금', '지원', '보조', '매칭금'],
  ['확인', '조회', '검색', '찾기'],
  ['해지', '탈퇴', '취소', '해약'],
  ['변경', '수정', '정정']
];

/**
 * 동의어 정규화
 */
function normalizeSynonym(text) {
  let normalized = text.toLowerCase().trim();
  
  for (const group of SYNONYM_GROUPS) {
    for (const synonym of group) {
      if (normalized.includes(synonym)) {
        // 첫 번째 단어로 통일
        normalized = normalized.replace(new RegExp(synonym, 'g'), group[0]);
      }
    }
  }
  
  return normalized;
}

/**
 * 중복 제거
 */
function deduplicateKeywords(allKeywords, baseKeyword) {
  const uniqueMap = new Map();
  
  for (const item of allKeywords) {
    const keyword = item.keyword || item;
    const source = item.source || 'unknown';
    
    // 동의어 정규화
    const normalized = normalizeSynonym(keyword);
    
    if (!uniqueMap.has(normalized)) {
      uniqueMap.set(normalized, {
        keyword: keyword,
        normalized: normalized,
        sources: [source]
      });
    } else {
      // 소스 추가
      const existing = uniqueMap.get(normalized);
      if (!existing.sources.includes(source)) {
        existing.sources.push(source);
      }
    }
  }
  
  return Array.from(uniqueMap.values());
}

/**
 * Hub/Spoke 분류
 */
function classifyKeywords(keywords, baseKeyword) {
  const hub = [];
  const spoke = [];
  
  const baseNormalized = baseKeyword.toLowerCase();
  
  for (const item of keywords) {
    const keyword = item.keyword;
    const keywordLower = keyword.toLowerCase();
    
    // 베이스 키워드가 직접 포함되면 Hub
    if (keywordLower.includes(baseNormalized)) {
      hub.push(item);
    } else {
      // 베이스 키워드의 단어 중 하나라도 포함되면 Spoke
      const baseParts = baseNormalized.split(' ');
      const isRelated = baseParts.some(part => keywordLower.includes(part));
      
      if (isRelated) {
        spoke.push(item);
      }
    }
  }
  
  return { hub, spoke };
}

/**
 * 결과 통합
 */
async function mergeResults(keyword) {
  const relatedFile = path.join(DATA_DIR, `${keyword.replace(/\s+/g, '-')}-related.json`);
  const paaFile = path.join(DATA_DIR, `${keyword.replace(/\s+/g, '-')}-paa.json`);
  
  let allKeywords = [];
  let sources = {
    naver: 0,
    google: 0,
    daum: 0,
    bing: 0,
    paa: 0
  };
  
  // 1. 연관검색어 로드
  if (fs.existsSync(relatedFile)) {
    const relatedData = JSON.parse(fs.readFileSync(relatedFile, 'utf8'));
    
    sources.naver = relatedData.sources?.naver || 0;
    sources.google = relatedData.sources?.google || 0;
    sources.daum = relatedData.sources?.daum || 0;
    sources.bing = relatedData.sources?.bing || 0;
    
    allKeywords.push(...(relatedData.keywords || []));
  }
  
  // 2. PAA 로드
  if (fs.existsSync(paaFile)) {
    const paaData = JSON.parse(fs.readFileSync(paaFile, 'utf8'));
    
    sources.paa = paaData.count || paaData.questions?.length || 0;
    
    const paaQuestions = paaData.questions || paaData.hubQuestions || [];
    allKeywords.push(...paaQuestions.map(q => ({
      keyword: q,
      source: 'paa'
    })));
  }
  
  // 3. 중복 제거
  const unique = deduplicateKeywords(allKeywords, keyword);
  
  // 4. Hub/Spoke 분류
  const { hub, spoke } = classifyKeywords(unique, keyword);
  
  // 5. 결과 저장
  const result = {
    keyword,
    collectedAt: new Date().toISOString().split('T')[0],
    sources,
    totalRaw: allKeywords.length,
    totalUnique: unique.length,
    hubCount: hub.length,
    spokeCount: spoke.length,
    hub: hub.map(item => item.keyword),
    spoke: spoke.map(item => item.keyword),
    hubDetails: hub,
    spokeDetails: spoke
  };
  
  const outputFile = path.join(DATA_DIR, `${keyword.replace(/\s+/g, '-')}-all.json`);
  fs.writeFileSync(outputFile, JSON.stringify(result, null, 2), 'utf8');
  
  return { outputFile, result };
}

/**
 * 진행 상황 표시
 */
function printProgress(step, total, message, count = null) {
  const countStr = count !== null ? ` ✓ ${count}개` : '';
  console.log(`[${step}/${total}] ${message}${countStr}`);
}

/**
 * 메인 함수
 */
async function main(keyword) {
  console.log(`\n🚀 풀자동 키워드 수집 시작: "${keyword}"\n`);
  
  // 진행 상황 표시 (실제 수집은 Playwright MCP나 Python으로)
  printProgress(1, 6, '네이버 연관검색어 수집 준비...');
  printProgress(2, 6, '구글 연관검색어 수집 준비...');
  printProgress(3, 6, '다음 연관검색어 수집 준비...');
  printProgress(4, 6, '빙 연관검색어 수집 준비...');
  printProgress(5, 6, '구글 PAA 수집 준비...');
  
  // 결과 통합
  printProgress(6, 6, '결과 통합 및 중복 제거 중...');
  
  const { outputFile, result } = await mergeResults(keyword);
  
  console.log(`\n✅ 수집 완료!\n`);
  console.log(`소스별 수집 결과:`);
  console.log(`  - 네이버: ${result.sources.naver}개`);
  console.log(`  - 구글: ${result.sources.google}개`);
  console.log(`  - 다음: ${result.sources.daum}개`);
  console.log(`  - 빙: ${result.sources.bing}개`);
  console.log(`  - PAA: ${result.sources.paa}개`);
  console.log(`\n중복 제거: ${result.totalRaw}개 → ${result.totalUnique}개`);
  console.log(`분류: Hub ${result.hubCount}개, Spoke ${result.spokeCount}개`);
  console.log(`\n저장 위치: ${path.basename(outputFile)}`);
  console.log(`\n다음 단계: /keyword ${keyword}`);
  
  return result;
}

// CLI 실행
if (require.main === module) {
  const args = process.argv.slice(2);
  
  if (args.length === 0) {
    console.log('풀자동 키워드 수집기');
    console.log('===================');
    console.log('');
    console.log('사용법:');
    console.log('  node collect-all-keywords.js "근로장려금"');
    console.log('');
    console.log('필수 파일:');
    console.log('  - [키워드]-related.json (연관검색어)');
    console.log('  - [키워드]-paa.json (PAA)');
    console.log('');
    console.log('출력:');
    console.log('  - [키워드]-all.json (통합 결과)');
    process.exit(0);
  }
  
  const keyword = args[0];
  main(keyword).catch(err => {
    console.error('오류 발생:', err.message);
    process.exit(1);
  });
}

module.exports = {
  normalizeSynonym,
  deduplicateKeywords,
  classifyKeywords,
  mergeResults
};
