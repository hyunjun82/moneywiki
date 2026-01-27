/**
 * 키워드 기반 CTA 자동 추가 스크립트
 *
 * - 외부링크 없는 파일도 키워드로 적절한 공공기관 링크 자동 매칭
 * - 계산기 파일 제외
 * - frontmatter 없는 파일 스킵
 */

const fs = require('fs');
const path = require('path');

const WIKI_DIR = path.join(__dirname, '..', 'content', 'wiki');

// 키워드 → CTA 매핑 (딥링크 - 실제 서비스 페이지로 바로 연결)
const KEYWORD_CTA_MAP = [
  // 실업급여/고용보험 - 실업급여 인터넷 신청 페이지
  {
    keywords: ['실업급여', '고용보험', '구직급여', '취업지원'],
    cta: {
      url: 'https://www.ei.go.kr/ei/eih/eg/pb/pbPersonBnef/retrievePb0201Info.do',
      badge: '고용보험 공식',
      text: '실업급여 인터넷 신청',
      action: '신청하기',
      color: 'green'
    }
  },
  // 퇴직금/퇴직연금 - 퇴직연금 적립금 조회
  {
    keywords: ['퇴직금', '퇴직연금', 'IRP', 'DB형', 'DC형'],
    cta: {
      url: 'https://100lifeplan.fss.or.kr/retire/retireInfo.do',
      badge: '금감원 통합연금포털',
      text: '내 퇴직연금 조회',
      action: '조회하기',
      color: 'green'
    }
  },
  // 연말정산/세금 - 연말정산 간소화 서비스
  {
    keywords: ['연말정산', '세액공제', '소득공제', '원천징수'],
    cta: {
      url: 'https://www.hometax.go.kr/websquare/websquare.html?w2xPath=/ui/pp/index_pp.xml&menuCd=index3',
      badge: '홈택스 공식',
      text: '연말정산 간소화 서비스',
      action: '바로가기',
      color: 'green'
    }
  },
  // 양도소득세 - 양도소득세 신고
  {
    keywords: ['양도소득세', '양도세', '비과세'],
    cta: {
      url: 'https://www.hometax.go.kr/websquare/websquare.html?w2xPath=/ui/pp/index_pp.xml&menuCd=UTXPPBAA01',
      badge: '홈택스 공식',
      text: '양도소득세 신고하기',
      action: '신고하기',
      color: 'dark'
    }
  },
  // 부동산/임대차 - 임대차계약 신고
  {
    keywords: ['임대차', '전세', '월세', '보증금', '계약갱신', '대항력'],
    cta: {
      url: 'https://www.gov.kr/portal/service/serviceInfo/PTR000050545',
      badge: '정부24 공식',
      text: '임대차계약 신고하기',
      action: '신고하기',
      color: 'dark'
    }
  },
  // 청약/주택 - 청약홈 청약신청
  {
    keywords: ['청약', '분양', '아파트', '주택'],
    cta: {
      url: 'https://www.applyhome.co.kr/ai/aia/selectAPTLttotPblancListView.do',
      badge: '청약홈 공식',
      text: '아파트 청약 신청',
      action: '신청하기',
      color: 'dark'
    }
  },
  // 경매 - 법원경매 물건검색
  {
    keywords: ['경매', '낙찰', '입찰'],
    cta: {
      url: 'https://www.courtauction.go.kr/RetrieveRealEstMulDetailList.laf',
      badge: '대법원 공식',
      text: '경매 물건 검색',
      action: '검색하기',
      color: 'dark'
    }
  },
  // 국민연금 - 내 연금 알아보기
  {
    keywords: ['국민연금', '노령연금', '유족연금'],
    cta: {
      url: 'https://www.nps.or.kr/jsppage/cyber/confirm/npspension.jsp',
      badge: '국민연금 공식',
      text: '내 연금 조회하기',
      action: '조회하기',
      color: 'green'
    }
  },
  // 건강보험 - 보험료 조회
  {
    keywords: ['건강보험', '의료보험', '건보료'],
    cta: {
      url: 'https://www.nhis.or.kr/nhis/minwon/retrievePaymentInfoExam.do',
      badge: '건강보험 공식',
      text: '건강보험료 조회',
      action: '조회하기',
      color: 'green'
    }
  },
  // 4대보험 - 가입내역 조회
  {
    keywords: ['4대보험', '사대보험', '사회보험'],
    cta: {
      url: 'https://www.4insure.or.kr/ins4/ptl/data/calc/forwardInsuFeeMock.do',
      badge: '4대보험 공식',
      text: '4대보험료 모의계산',
      action: '계산하기',
      color: 'green'
    }
  },
  // 근로기준법/노동 - 고용노동부 민원신청
  {
    keywords: ['근로기준법', '야근', '휴일', '연장근로', '휴가', '연차', '근로계약', '해고', '임금'],
    cta: {
      url: 'https://minwon.moel.go.kr/minwon2008/minwon/minwonChoice1.do',
      badge: '고용노동부 공식',
      text: '노동 민원 신청',
      action: '신청하기',
      color: 'green'
    }
  },
  // 가압류/법률 - 나의 사건검색
  {
    keywords: ['가압류', '압류', '가처분', '강제집행', '소송'],
    cta: {
      url: 'https://www.scourt.go.kr/portal/information/events/search/search.jsp',
      badge: '대법원 공식',
      text: '나의 사건 검색',
      action: '검색하기',
      color: 'dark'
    }
  },
  // 복지/지원금 - 복지서비스 모아보기
  {
    keywords: ['지원금', '수당', '급여', '복지', '바우처', '부모급여', '아동수당'],
    cta: {
      url: 'https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do',
      badge: '복지로 공식',
      text: '나에게 맞는 복지 찾기',
      action: '찾기',
      color: 'green'
    }
  },
  // 출산/육아 - 육아휴직급여 신청
  {
    keywords: ['출산', '육아', '육아휴직', '출산휴가', '배우자출산'],
    cta: {
      url: 'https://www.ei.go.kr/ei/eih/eg/pb/pbPersonBnef/retrievePb0301Info.do',
      badge: '고용보험 공식',
      text: '육아휴직급여 신청',
      action: '신청하기',
      color: 'green'
    }
  },
  // 창업/법인 - 법인설립 원스톱
  {
    keywords: ['창업', '법인', '사업자', '개인사업'],
    cta: {
      url: 'https://www.startbiz.go.kr/lnka/selectOSSStep1.do',
      badge: '정부 공식',
      text: '온라인 법인설립 신청',
      action: '신청하기',
      color: 'dark'
    }
  },
  // 등기/부동산 - 등기부등본 발급
  {
    keywords: ['등기', '소유권', '등기부등본'],
    cta: {
      url: 'https://www.iros.go.kr/pos1/pfrontservlet?cmd=PIMIP001M01&a=PSJ',
      badge: '인터넷등기소',
      text: '등기부등본 열람/발급',
      action: '발급하기',
      color: 'dark'
    }
  },
  // 대출/금융 - 대출금리 비교
  {
    keywords: ['대출', 'DSR', 'DTI', 'LTV', '금리'],
    cta: {
      url: 'https://finlife.fss.or.kr/finlife/ldng/ldngPrdtList.do?menuNo=700020',
      badge: '금융감독원 공식',
      text: '대출상품 금리비교',
      action: '비교하기',
      color: 'dark'
    }
  },
  // 환급금 - 미환급금 조회 (정부24 딥링크)
  {
    keywords: ['환급', '미환급', '숨은돈'],
    cta: {
      url: 'https://www.gov.kr/portal/service/serviceInfo/174100000054',
      badge: '정부24 공식',
      text: '미환급금 조회/신청',
      action: '조회하기',
      color: 'green'
    }
  }
];

// frontmatter 파싱
function parseFrontmatter(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return { frontmatterRaw: null, body: content };
  return {
    frontmatterRaw: match[1],
    body: content.slice(match[0].length)
  };
}

// CTA 있는지 확인
function hasCta(frontmatterRaw) {
  return frontmatterRaw.includes('cta:');
}

// 파일명/제목에서 키워드 매칭
function findMatchingCta(filename, frontmatterRaw) {
  const titleMatch = frontmatterRaw.match(/title:\s*["']?([^"'\n]+)["']?/);
  const title = titleMatch ? titleMatch[1] : '';
  const searchText = (filename + ' ' + title).toLowerCase();

  for (const mapping of KEYWORD_CTA_MAP) {
    for (const keyword of mapping.keywords) {
      if (searchText.includes(keyword.toLowerCase())) {
        return mapping.cta;
      }
    }
  }
  return null;
}

// category 추출
function getCategory(frontmatterRaw) {
  const match = frontmatterRaw.match(/category:\s*["']?([^"'\n]+)["']?/);
  return match ? match[1].trim() : '';
}

// CTA 추가
function addCtaToFrontmatter(content, cta) {
  const { frontmatterRaw, body } = parseFrontmatter(content);
  if (!frontmatterRaw) return null;

  const ctaYaml = `cta:
  - url: "${cta.url}"
    badge: "${cta.badge}"
    text: "${cta.text}"
    action: "${cta.action}"
    color: "${cta.color}"`;

  const newFrontmatter = frontmatterRaw.trim() + '\n' + ctaYaml;
  return `---\n${newFrontmatter}\n---${body}`;
}

// 메인 실행
function main() {
  const files = fs.readdirSync(WIKI_DIR).filter(f => f.endsWith('.md'));

  let processed = 0;
  let skipped = 0;
  let noMatch = 0;
  let calculatorSkipped = 0;
  const results = [];

  console.log(`\n📂 총 ${files.length}개 파일 스캔 (키워드 기반)...\n`);

  for (const file of files) {
    // 계산기 파일 제외
    if (file.includes('계산기') || file.includes('calculator')) {
      calculatorSkipped++;
      continue;
    }

    const filePath = path.join(WIKI_DIR, file);
    const content = fs.readFileSync(filePath, 'utf-8');
    const { frontmatterRaw, body } = parseFrontmatter(content);

    if (!frontmatterRaw) {
      skipped++;
      continue;
    }

    // 이미 CTA 있으면 스킵
    if (hasCta(frontmatterRaw)) {
      skipped++;
      continue;
    }

    // 키워드 매칭
    const cta = findMatchingCta(file, frontmatterRaw);

    if (!cta) {
      noMatch++;
      continue;
    }

    const newContent = addCtaToFrontmatter(content, cta);

    if (newContent) {
      fs.writeFileSync(filePath, newContent, 'utf-8');
      processed++;
      results.push({
        file,
        url: cta.url,
        text: cta.text
      });
      console.log(`✅ ${file}: ${cta.text}`);
    }
  }

  console.log(`\n========== 결과 ==========`);
  console.log(`✅ CTA 추가: ${processed}개`);
  console.log(`⏭️ 이미 있음/frontmatter 없음: ${skipped}개`);
  console.log(`🔢 계산기 제외: ${calculatorSkipped}개`);
  console.log(`❓ 매칭 안됨: ${noMatch}개`);
  console.log(`📊 총: ${files.length}개\n`);

  // 결과 저장
  if (results.length > 0) {
    fs.writeFileSync(
      path.join(__dirname, 'cta-keyword-report.json'),
      JSON.stringify(results, null, 2),
      'utf-8'
    );
    console.log(`📄 상세 리포트: scripts/cta-keyword-report.json\n`);
  }
}

main();
