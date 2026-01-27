/**
 * 기존 CTA URL을 딥링크로 업데이트하는 스크립트
 * - 단순 홈페이지 URL을 실제 서비스 페이지 딥링크로 변환
 */

const fs = require('fs');
const path = require('path');

const WIKI_DIR = path.join(__dirname, '..', 'content', 'wiki');

// 홈페이지 URL → 딥링크 매핑
const URL_UPGRADE_MAP = {
  // 고용보험 - 실업급여
  'https://www.ei.go.kr': {
    keywords: ['실업급여', '구직급여', '고용보험'],
    deeplink: 'https://www.ei.go.kr/ei/eih/eg/pb/pbPersonBnef/retrievePb0201Info.do',
    text: '실업급여 인터넷 신청'
  },
  // 고용노동부 - 퇴직금
  'https://www.moel.go.kr': {
    keywords: ['퇴직금', '퇴직연금', '근로', '임금', '해고'],
    deeplink: 'https://minwon.moel.go.kr/minwon2008/minwon/minwonChoice1.do',
    text: '노동 민원 신청'
  },
  // 홈택스 - 연말정산
  'https://www.hometax.go.kr': {
    keywords: ['연말정산', '소득공제', '세액공제'],
    deeplink: 'https://www.hometax.go.kr/websquare/websquare.html?w2xPath=/ui/pp/index_pp.xml&menuCd=index3',
    text: '연말정산 간소화 서비스'
  },
  // 국세청
  'https://www.nts.go.kr': {
    keywords: ['양도소득세', '양도세', '세금'],
    deeplink: 'https://www.hometax.go.kr/websquare/websquare.html?w2xPath=/ui/pp/index_pp.xml&menuCd=UTXPPBAA01',
    text: '양도소득세 신고하기'
  },
  // 국민연금
  'https://www.nps.or.kr': {
    keywords: ['국민연금', '연금', '노령연금'],
    deeplink: 'https://www.nps.or.kr/jsppage/cyber/confirm/npspension.jsp',
    text: '내 연금 조회하기'
  },
  // 건강보험
  'https://www.nhis.or.kr': {
    keywords: ['건강보험', '건보료', '의료보험'],
    deeplink: 'https://www.nhis.or.kr/nhis/minwon/retrievePaymentInfoExam.do',
    text: '건강보험료 조회'
  },
  // 4대보험
  'https://www.4insure.or.kr': {
    keywords: ['4대보험', '사대보험'],
    deeplink: 'https://www.4insure.or.kr/ins4/ptl/data/calc/forwardInsuFeeMock.do',
    text: '4대보험료 모의계산'
  },
  // 복지로
  'https://www.bokjiro.go.kr': {
    keywords: ['복지', '지원금', '수당', '바우처'],
    deeplink: 'https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do',
    text: '나에게 맞는 복지 찾기'
  },
  // 청약홈
  'https://www.applyhome.co.kr': {
    keywords: ['청약', '분양', '아파트'],
    deeplink: 'https://www.applyhome.co.kr/ai/aia/selectAPTLttotPblancListView.do',
    text: '아파트 청약 신청'
  },
  // 법원경매
  'https://www.courtauction.go.kr': {
    keywords: ['경매', '낙찰', '입찰'],
    deeplink: 'https://www.courtauction.go.kr/RetrieveRealEstMulDetailList.laf',
    text: '경매 물건 검색'
  },
  // 대법원
  'https://www.scourt.go.kr': {
    keywords: ['소송', '사건', '가압류', '압류'],
    deeplink: 'https://www.scourt.go.kr/portal/information/events/search/search.jsp',
    text: '나의 사건 검색'
  },
  // 정부24
  'https://www.gov.kr': {
    keywords: ['환급', '미환급', '숨은돈'],
    deeplink: 'https://www.gov.kr/portal/service/serviceInfo/174100000054',
    text: '미환급금 조회/신청'
  },
  // 인터넷등기소
  'https://www.iros.go.kr': {
    keywords: ['등기', '등기부등본', '소유권'],
    deeplink: 'https://www.iros.go.kr/pos1/pfrontservlet?cmd=PIMIP001M01&a=PSJ',
    text: '등기부등본 열람/발급'
  },
  // 금감원
  'https://finlife.fss.or.kr': {
    keywords: ['대출', '금리', 'DSR', 'DTI', 'LTV'],
    deeplink: 'https://finlife.fss.or.kr/finlife/ldng/ldngPrdtList.do?menuNo=700020',
    text: '대출상품 금리비교'
  },
  // 법인설립
  'https://www.startbiz.go.kr': {
    keywords: ['창업', '법인', '사업자'],
    deeplink: 'https://www.startbiz.go.kr/lnka/selectOSSStep1.do',
    text: '온라인 법인설립 신청'
  }
};

// frontmatter 파싱
function parseFrontmatter(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return { frontmatterRaw: null, body: content };
  return {
    frontmatterRaw: match[1],
    body: content.slice(match[0].length)
  };
}

// CTA URL 추출
function getCtaUrl(frontmatterRaw) {
  const match = frontmatterRaw.match(/cta:[\s\S]*?url:\s*["']?([^"'\n]+)["']?/);
  return match ? match[1] : null;
}

// 키워드 매칭 확인
function matchesKeywords(filename, frontmatterRaw, keywords) {
  const titleMatch = frontmatterRaw.match(/title:\s*["']?([^"'\n]+)["']?/);
  const title = titleMatch ? titleMatch[1] : '';
  const searchText = (filename + ' ' + title).toLowerCase();

  return keywords.some(kw => searchText.includes(kw.toLowerCase()));
}

// URL 업그레이드
function upgradeCtaUrl(content, oldUrl, newUrl, newText) {
  // URL 교체
  let updated = content.replace(
    new RegExp(`(cta:[\\s\\S]*?url:\\s*["']?)${oldUrl.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}(["']?)`, 'g'),
    `$1${newUrl}$2`
  );

  // 텍스트도 업데이트 (선택적)
  if (newText) {
    const textMatch = updated.match(/cta:[\s\S]*?text:\s*["']?([^"'\n]+)["']?/);
    if (textMatch) {
      const oldText = textMatch[1];
      // 기존 텍스트가 너무 일반적이면 교체
      if (oldText.includes('바로가기') || oldText.includes('안내') || oldText.length < 10) {
        updated = updated.replace(
          /(cta:[\s\S]*?text:\s*["']?)[^"'\n]+(["']?)/,
          `$1${newText}$2`
        );
      }
    }
  }

  return updated;
}

// 메인 실행
function main() {
  const files = fs.readdirSync(WIKI_DIR).filter(f => f.endsWith('.md'));

  let updated = 0;
  let skipped = 0;
  let noCta = 0;
  const results = [];

  console.log(`\n🔗 딥링크 업그레이드 시작...\n`);

  for (const file of files) {
    const filePath = path.join(WIKI_DIR, file);
    const content = fs.readFileSync(filePath, 'utf-8');
    const { frontmatterRaw, body } = parseFrontmatter(content);

    if (!frontmatterRaw) {
      skipped++;
      continue;
    }

    // CTA가 없으면 스킵
    if (!frontmatterRaw.includes('cta:')) {
      noCta++;
      continue;
    }

    const currentUrl = getCtaUrl(frontmatterRaw);
    if (!currentUrl) {
      skipped++;
      continue;
    }

    // 이미 딥링크면 스킵 (path가 있는 URL)
    const urlObj = new URL(currentUrl);
    if (urlObj.pathname.length > 1 && urlObj.pathname !== '/') {
      skipped++;
      continue;
    }

    // 업그레이드 가능한 URL인지 확인
    const baseUrl = `${urlObj.protocol}//${urlObj.host}`;
    const upgradeInfo = URL_UPGRADE_MAP[baseUrl];

    if (!upgradeInfo) {
      skipped++;
      continue;
    }

    // 키워드 매칭 확인
    if (!matchesKeywords(file, frontmatterRaw, upgradeInfo.keywords)) {
      skipped++;
      continue;
    }

    // URL 업그레이드
    const newContent = upgradeCtaUrl(content, currentUrl, upgradeInfo.deeplink, upgradeInfo.text);

    if (newContent !== content) {
      fs.writeFileSync(filePath, newContent, 'utf-8');
      updated++;
      results.push({
        file,
        oldUrl: currentUrl,
        newUrl: upgradeInfo.deeplink
      });
      console.log(`✅ ${file}`);
      console.log(`   ${currentUrl} → ${upgradeInfo.deeplink}`);
    }
  }

  console.log(`\n========== 결과 ==========`);
  console.log(`✅ 딥링크 업그레이드: ${updated}개`);
  console.log(`⏭️ 스킵 (이미 딥링크/매칭 안됨): ${skipped}개`);
  console.log(`📭 CTA 없음: ${noCta}개`);
  console.log(`📊 총: ${files.length}개\n`);

  if (results.length > 0) {
    fs.writeFileSync(
      path.join(__dirname, 'deeplink-upgrade-report.json'),
      JSON.stringify(results, null, 2),
      'utf-8'
    );
    console.log(`📄 상세 리포트: scripts/deeplink-upgrade-report.json\n`);
  }
}

main();
