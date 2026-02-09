/**
 * 404 리다이렉트 설정
 * - 정적 리다이렉트 (로마자, 중첩경로, 카테고리)
 * - 패턴 매칭 (공백→검색, .md제거, 중첩경로)
 * - 카테고리 fallback (미존재 slug → 카테고리)
 */

// 1. 정적 리다이렉트 맵 (로마자 → 한국어, 중첩경로 → /w/slug)
export const staticRedirects: Record<string, string> = {
  // === 로마자 URL → 한국어 URL ===
  '/w/buyanggajok-gongje': '/w/연말정산-부양가족-공제',
  '/w/geunrogyejunbeob': '/category/근로-노동',
  '/w/gibumgeum-gongje': '/category/세금',
  '/w/gwasedaesang': '/category/세금',
  '/w/gyeongjeongjjonggu': '/category/세금',
  '/w/gyoyukbi': '/w/연말정산-교육비-세액공제',
  '/w/gyoyukbi-gongje': '/w/연말정산-교육비-세액공제',
  '/w/jigeummyeongseseo': '/category/세금',
  '/w/seaekgongje': '/category/세금',
  '/w/yeonmaljeongsan-baeujaui-gongje': '/category/세금',
  '/w/yeonmaljeongsan-jeongjijageum-gibugeum': '/w/연말정산-정치자금-기부금-공제',
  '/w/yeonmaljeongsan-jongyodanche-gibugeum': '/w/연말정산-종교단체-기부금-공제',
  '/w/yeonmaljeongsan-sinnyongkadeu-jeonryak': '/w/연말정산-신용카드-공제-한도',
  '/w/yeonmaljeongsan-yugahyujiggja': '/w/연말정산-육아휴직-급여',
  '/w/연말정산-K-tech-Pass-감면': '/category/세금',
  '/w/연말정산-beoncheogieob-seutogogsyeon': '/category/세금',
  '/w/연말정산-jangaein-deungnok': '/w/연말정산-장애인-공제',
  '/w/연말정산-jutaekcheongyak': '/w/연말정산-주택청약-소득공제',
  '/w/연말정산-jutaekjageum': '/w/연말정산-주택자금-공제',
  '/w/연말정산-shilsonboheomgeum-suryeong': '/category/세금',
  '/w/연말정산-yagangeullososudang-bigwase': '/w/연말정산-야간근로소득-비과세',
  '/w/연말정산-yeongeumjeochuk-seaekgongje': '/w/연말정산-연금저축-세액공제',

  // === 중첩 경로 → /w/slug ===
  '/w/세금/연말정산-육아휴직-급여': '/w/연말정산-육아휴직-급여',
  '/w/세금/연말정산-종교단체-기부금': '/w/연말정산-종교단체-기부금-공제',
  '/w/세금/연말정산-주택마련저축-공제': '/w/연말정산-주택마련저축-공제',
  '/w/연말정산/연말정산-결정세액': '/w/연말정산-결정세액-계산',
  '/w/연말정산/연말정산-도서-공연': '/w/연말정산-도서공연비-공제',
  '/w/연말정산/연말정산-소득공제-세액공제-차이': '/w/연말정산-세액공제-소득공제-차이',
  '/w/연말정산/연말정산-전통시장': '/w/연말정산-전통시장-공제',
  '/w/연말정산/연말정산-주택마련저축': '/w/연말정산-주택마련저축-공제',
  '/w/연말정산/연말정산-퇴직연금-공제': '/w/연말정산-퇴직연금-세액공제',
  '/w/연말정산/연말정산-특별재난지역': '/category/세금',
  '/w/퇴직/퇴직금-세율': '/w/퇴직금-세율-퇴직소득세-자동계산',

  // === 카테고리 리다이렉트 ===
  '/category/근로': '/category/근로-노동',
}

// 2. 패턴 매칭 함수
export function getPatternRedirect(pathname: string): string | null {
  // 2-1. 공백 포함 URL → /search?q=검색어
  if (pathname.startsWith('/w/') && pathname.includes(' ')) {
    const slug = decodeURIComponent(pathname.replace('/w/', ''))
    const query = slug.replace(/\s+/g, ' ').trim()
    return `/search?q=${encodeURIComponent(query)}`
  }

  // 2-2. .md 확장자 제거
  if (pathname.endsWith('.md')) {
    return pathname.slice(0, -3)
  }

  // 2-3. 중첩 경로 /w/카테고리/slug → /w/slug
  const nestedMatch = pathname.match(/^\/w\/[^/]+\/(.+)$/)
  if (nestedMatch) {
    // staticRedirects에 없는 중첩 경로는 slug만 추출
    return `/w/${nestedMatch[1]}`
  }

  // 2-4. opengraph-image 경로 처리
  if (pathname.includes('/opengraph-image')) {
    const base = pathname.replace(/\/opengraph-image.*$/, '')
    return base || '/'
  }

  return null
}

// 3. 카테고리 fallback 맵 (미존재 slug → 카테고리)
const topicCategoryMap: Record<string, string> = {
  // 세금/연말정산
  '2025년연말정산': '/category/세금',
  '공제항목': '/category/세금',
  '교육비세액공제': '/category/세금',
  '다자녀공제': '/category/세금',
  '다자녀추가공제': '/category/세금',
  '도서공연비': '/category/세금',
  '본인부담의료비': '/category/세금',
  '부녀자공제': '/category/세금',
  '부양가족의료비': '/category/세금',
  '산출세액': '/category/세금',
  '소득공제란': '/category/세금',
  '수입인지': '/category/세금',
  '연말정산-1주택자': '/category/세금',
  '연말정산-국외-교육비-공제': '/category/세금',
  '연말정산-난임시술비': '/category/세금',
  '연말정산-대학교-등록금': '/category/세금',
  '연말정산-도서-공연': '/category/세금',
  '연말정산-산후조리원': '/category/세금',
  '연말정산-소득공제-세액공제-차이': '/category/세금',
  '연말정산-육아휴직-급여': '/category/세금',
  '연말정산-주택마련저축': '/category/세금',
  '연말정산-주택마련저축-공제': '/category/세금',
  '연말정산-퇴사자': '/category/세금',
  '연말정산-퇴직연금-공제': '/category/퇴직금',
  '연말정산-특별재난지역': '/category/세금',
  '연말정산방법': '/category/세금',
  '월세공제': '/category/세금',
  '월세세액공제': '/category/세금',
  '의료비세액공제': '/category/세금',
  '의료비한도': '/category/세금',
  '조세전문가': '/category/세금',
  '종업원분': '/category/세금',
  '퇴직소득세율': '/category/세금',
  '체크카드': '/category/세금',

  // 실업급여
  '고용유지지원금': '/category/실업급여',
  '실업신고': '/category/실업급여',
  '자영업자-고용보험': '/category/실업급여',
  '직업능력개발수당': '/category/실업급여',

  // 근로/노동
  '국외근로소득': '/category/근로-노동',
  '근로계약서-작성-필수사항': '/category/근로-노동',
  '근로계약서-필수-항목-작성': '/category/근로-노동',
  '기간제근로자-정기상여금': '/category/근로-노동',
  '야간근로수당': '/category/근로-노동',
  '연장근로수당': '/category/근로-노동',
  '임금채권보장기금': '/category/근로-노동',
  '임금체불-진정-신고-방법': '/category/근로-노동',
  '임신기-근로시간-단축': '/category/근로-노동',
  '통상임금': '/category/근로-노동',
  '평균임금-계산': '/category/근로-노동',
  '육아휴직-급여-신청-방법': '/category/근로-노동',
  '취업규칙': '/category/근로-노동',

  // 연차휴가
  '대체휴일': '/category/연차휴가',
  '무급휴무일-유급휴가-중복': '/category/연차휴가',
  '산재-연차휴가': '/category/연차휴가',
  '연차휴가-일수': '/category/연차휴가',
  '연차휴가-정산': '/category/연차휴가',
  '유급휴일': '/category/연차휴가',
  '출산전후휴가': '/category/연차휴가',
  '휴일근로수당': '/category/연차휴가',
  '휴직-종류': '/category/연차휴가',

  // 부동산
  '민간임대주택': '/category/부동산',
  '부동산연금': '/category/부동산',
  '임대등록': '/category/부동산',
  '임대차-해지-통지': '/category/부동산',
  '임대차신고': '/category/부동산',
  '임대차조정': '/category/부동산',
  '전세권': '/category/부동산',
  '전세대출': '/category/부동산',
  '주택임대차보호법-제6조의2': '/category/부동산',
  '분양-전매제한-기간-수도권': '/category/부동산',
  '재건축-재개발-차이': '/category/부동산',
  '재건축-절차': '/category/부동산',
  '용적률': '/category/부동산',

  // 금융
  '4대보험료': '/category/금융',
  'ISA비과세': '/category/금융',
  '보장성보험료': '/category/금융',

  // 퇴직금
  '퇴직금-1년-미만': '/category/퇴직금',
  '퇴직금-IRP-수령-방법': '/category/퇴직금',
  '퇴직금-계산': '/category/퇴직금',
  '퇴직금-세율': '/category/퇴직금',
  '퇴직연금-IRP': '/category/퇴직금',
  '퇴직연금-수령-방법-선택': '/category/퇴직금',

  // 기타 → 홈
  'CTC': '/',
  '개인사업자': '/',
  '계산기준': '/',
  '법인사업자': '/',
  '물권': '/',
  '법정기부금': '/',
  '분쟁조정위원회': '/',
  '사업자등록증': '/',
  '사업자번호': '/',
  '역모기지': '/',
  '연기연금': '/',
  '우리사주': '/',
  '유학생': '/',
  '유연근무제-신청-방법-신청-절차-조건': '/',
  '자가운전보조금': '/',
  '주거급여': '/',
  '일급제': '/',
  '휴업수당': '/',
  '훈련수당': '/',
  '훈련장려금': '/',
}

export function getTopicFallback(slug: string): string | null {
  return topicCategoryMap[slug] || null
}
