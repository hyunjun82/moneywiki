"use client";

// Q1. 회사를 1년 채우지 못하고 퇴직했거나 퇴직 예정인데, 퇴직금을 아예 못 받는 건지 불안해서 검색하는 사람이에요.
// Q2. DC형 퇴직연금 여부를 확인하고, 수령 가능한 금액과 절차를 파악해서 바로 행동에 옮기는 것이에요.
// Q3. (1) 법정 퇴직금 1년 기준의 정확한 의미 / (2) DC형이면 왜 1년 미만도 수령 가능한지 / (3) 1년 기간 계산 방법 / (4) DC형 수령 절차와 준비 서류 / (5) 퇴직금 없을 때 대안(실업급여)
// Q4. GreenBox(결론 요약) + EligibilityChecker(내 상황 체크) + Calculator(DC형 적립금) + BorderBox(기간 계산 예시) + Steps(수령 절차) + DocTable(서류) + Checklist(체크리스트) + FAQ
//
// MAP:
// Q1 → 서론: 1년 못 채우고 나왔는데 퇴직금이 진짜 0원인지 불안한 상황 공감
// Q2 → H2 순서: 결론(받을 수 있나 없나) → DC형 적립금 계산 → 1년 기간 계산법 → 퇴직 후 조치 절차 → 체크리스트
// Q3 → H2 5개 + FAQ 6개
// Q4 → GreenBox, EligibilityChecker, Calculator, BorderBox, Steps, DocTable, Checklist

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Calculator, EligibilityChecker, Steps, DocTable, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 퇴직금_SIDEBAR, 퇴직금_HIGHLIGHT } from "@/data/퇴직금-guide";

// ─── 데이터 ──────────────────────────────────────────

const CHECK_ITEMS = [
  { id: "c1", label: "근속 기간이 1년 미만이에요" },
  { id: "c2", label: "4주 평균 주 15시간 이상 근무했어요" },
  { id: "c3", label: "계속 근무 형태예요 (일용직·호출제 아님)" },
  { id: "c4", label: "회사에 DC형 퇴직연금이 설정돼 있죠" },
];

const CALC_SLIDERS = [
  { id: "salary", label: "월 평균임금", min: 200, max: 700, step: 10, defaultValue: 300, format: (v: number) => `${v}만원` },
  { id: "months", label: "실제 근속 개월 수", min: 1, max: 11, step: 1, defaultValue: 6, format: (v: number) => `${v}개월` },
];

const CALC_RESULTS = [
  {
    label: "1년 미만 일할 퇴직금 (DC형 적립금 기준)",
    getValue: (v: Record<string, number>) => Math.round(v.salary * 10000 * v.months / 12),
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원`,
    highlight: true,
  },
  {
    label: "1년 만근 시 퇴직금 (비교)",
    getValue: (v: Record<string, number>) => Math.round(v.salary * 10000),
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원`,
  },
];

const DOCS = [
  { name: "근로계약서 (입사일·근로시간 기재)", required: true, where: "회사 인사팀 또는 입사 시 수령본" },
  { name: "급여명세서 (재직 기간 전체)", required: true, where: "회사 인사팀 요청 또는 급여 이체 통장" },
  { name: "DC형 퇴직연금 가입 확인서", required: false, where: "회사 또는 금융감독원 통합연금포털" },
  { name: "4대보험 가입 확인서", required: false, where: "4대사회보험포털(www.4insure.or.kr)" },
  { name: "출퇴근 기록 또는 근무 확인서", required: false, where: "회사 출근부·출입카드 기록" },
];

const STEPS = [
  {
    title: "근속 기간 정확히 계산하기",
    desc: "퇴직금 1년 기준은 입사일부터 퇴직일 전날까지 달력 일수로 계산해요. 예: 2025년 3월 1일 입사, 2026년 2월 28일 퇴직이면 365일로 1년 충족이에요. 2026년 2월 27일 퇴직이면 364일로 미충족이고요.",
    tip: "하루 차이로 1년 기준이 달라질 수 있으니 날짜를 정확히 따져봐요.",
  },
  {
    title: "퇴직연금 유형 파악 (DC형이면 1년 미만도 수령 가능)",
    desc: "회사에 DC형(확정기여형) 퇴직연금이 설정돼 있다면, 1년을 채우지 못해도 사용자가 납입한 금액을 받을 수 있죠. DB형(확정급여형)이나 퇴직금 제도라면 1년 미만은 지급 의무가 없고요.",
    tip: "회사 인사팀 또는 금융감독원 통합연금포털(100lifeplan.fss.or.kr)에서 조회 가능해요.",
    link: { label: "통합연금포털 바로가기", href: "https://100lifeplan.fss.or.kr" },
  },
  {
    title: "DC형 적립금 수령 신청",
    desc: "DC형 퇴직연금에 가입된 경우, 운용 중인 금융사(은행·증권사)에 퇴직급여 지급 신청을 해요. IRP 계좌로 받는 게 기본이고, 55세 미만이면 IRP에서 바로 인출할 때 세금이 붙어요.",
    tip: "IRP로 받아두면 퇴직소득세 과세 이연이 돼요. 55세 이후 연금으로 수령하면 세율이 낮아지죠.",
    link: { label: "IRP 계좌 개설 방법", href: "/w/퇴직금-IRP-계좌" },
  },
  {
    title: "법정 퇴직금이 없다면 실업급여 신청 검토",
    desc: "DC형이 없고 1년 미만이라면 법정 퇴직금은 받을 수 없어요. 대신 고용보험 피보험기간 180일 이상이면 실업급여 신청이 가능하죠. 비자발적 퇴직(계약 만료·권고사직)이라면 즉시 고용센터에 방문해봐요.",
    tip: "실업급여 신청 기한은 퇴직 후 12개월 이내예요. 늦으면 못 받으니 빨리 움직여야 해요.",
    link: { label: "실업급여 신청 조건", href: "/w/실업급여-피보험기간" },
  },
];

const CHECKLIST = [
  "입사일~퇴직일 달력 일수 계산: 365일 이상이어야 1년 충족",
  "DC형 퇴직연금 가입 여부: 1년 미만이어도 납입금 수령 가능",
  "DB형·퇴직금 제도라면 1년 미만은 법정 지급 의무 없음",
  "IRP 계좌 개설: DC형 퇴직급여 수령 시 필수",
  "1년 미만 퇴직 후 실업급여 조건(피보험 180일) 별도 체크",
  "소멸시효: 퇴직일로부터 3년 내 청구 필수",
];

const FAQS = [
  {
    q: "1년 미만 근무하면 퇴직금이 아예 없나요?",
    a: "법정 퇴직금(근로자퇴직급여보장법 제4조)은 1년 이상 계속 근로가 조건이라서, 1년 미만이면 원칙적으로 지급 의무가 없어요. 단, DC형 퇴직연금에 가입된 회사라면 사용자가 납입한 금액이 1년 미만이어도 쌓여 있어서 받을 수 있죠.",
  },
  {
    q: "DC형 퇴직연금이면 1년 안 채워도 받을 수 있나요?",
    a: "맞아요. DC형은 사용자가 매년 연봉의 1/12 이상을 근로자 계좌에 납입하는 방식이에요. 1년 미만이라도 납입된 금액이 쌓여 있어서 퇴직 시 IRP로 받을 수 있죠.",
  },
  {
    q: "1년을 하루 부족하게 채우면 어떻게 되나요?",
    a: "법정 퇴직금 지급 의무가 없어요. 입사일로부터 달력 기준 364일이면 1년 미충족이에요. 회사가 자발적으로 줄 수는 있지만 의무는 아니고요. DC형이라면 납입금은 받을 수 있죠.",
  },
  {
    q: "주 15시간 이상 일했으면 1년 미만도 퇴직금 생기지 않나요?",
    a: "주 15시간 기준은 퇴직금 적용 대상 근로자 여부를 가르는 조건이에요. 이 조건을 충족해도 근속 1년을 채우지 못하면 법정 퇴직금은 없어요. 주 15시간과 1년 근속은 별개의 조건이죠.",
  },
  {
    q: "1년 미만 퇴직 후 실업급여는 받을 수 있나요?",
    a: "고용보험 피보험기간이 180일 이상이고 비자발적 퇴직(계약 만료·권고사직 등)이면 실업급여를 받을 수 있죠. 퇴직금과 실업급여는 별개 제도라서 퇴직금이 없어도 실업급여 신청은 가능하고요.",
  },
  {
    q: "회사가 1년 미만이어도 퇴직금을 주겠다고 하면 받을 수 있나요?",
    a: "받을 수 있죠. 법적 의무는 없지만 회사가 자발적으로 주는 건 문제가 없고요. 이 경우에도 퇴직소득으로 분류돼서 퇴직소득세가 부과돼요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "근로자퇴직급여보장법 제4조: 퇴직급여제도 설정", url: "https://www.law.go.kr/법령/근로자퇴직급여보장법" },
      { label: "근로자퇴직급여보장법 제20조: DC형 퇴직연금 부담금", url: "https://www.law.go.kr/법령/근로자퇴직급여보장법" },
      { label: "근로기준법 제18조: 단시간 근로자 적용 기준", url: "https://www.law.go.kr/법령/근로기준법" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "고용노동부: 퇴직급여제도 안내", url: "https://www.moel.go.kr" },
      { label: "금융감독원: 퇴직연금 통합포털", url: "https://100lifeplan.fss.or.kr" },
    ],
  },
];

const RELATED = [
  { slug: "퇴직금-조건", title: "퇴직금 지급 조건", description: "1년·주 15시간 기준을 정확히 정리해요." },
  { slug: "퇴직금-1년미만", title: "퇴직금 1년 미만 계산", description: "일할 계산 공식과 예시를 설명해요." },
  { slug: "퇴직금-DC형-계산법", title: "DC형 퇴직금 계산법", description: "연간 부담금과 운용수익 계산 방법이에요." },
];

// ─── 페이지 ──────────────────────────────────────────

export default function Page() {
  return (
    <ArticleLayout
      sidebar={<Sidebar heading="퇴직금 가이드" items={퇴직금_SIDEBAR} highlightSlugs={퇴직금_HIGHLIGHT} currentSlug="1년-미만-퇴직금-지급-규정-조건-기준" />}
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>퇴직금 · 1년 미만 · 지급 조건</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        1년 미만 근무하면 퇴직금 못 받나요?<br />
        지급 조건·DC형 수령·기간 계산 기준
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        회사를 1년 못 채우고 나왔는데 퇴직금이 진짜 0원인 건지, 찜찜하죠?
        <a href="/w/퇴직금-조건" style={{ color: "#1D9E75", textDecoration: "underline" }}> 근로자퇴직급여보장법 제4조</a>는 '계속 근로 1년 이상'을 퇴직금 지급 조건으로 정하고 있죠.
        그래서 1년 미만이면 법정 퇴직금은 원칙적으로 받을 수 없어요.
        그런데 회사에 <a href="/w/퇴직금-DC형-계산법" style={{ color: "#1D9E75", textDecoration: "underline" }}>DC형(확정기여형) 퇴직연금</a>이 설정돼 있다면 이야기가 완전히 달라지죠.
        DC형은 사용자가 매달 납입한 금액이 근로자 계좌에 쌓이는 구조라서, 1년 미만이어도 그 금액은 받을 수 있죠.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      {/* ─── H2-1: 결론 먼저 (가능형) ─── */}
      <H2>1년 미만이면 퇴직금 받을 수 있나요?</H2>
      <p style={body}>
        결론부터 말하면, 퇴직연금 유형에 따라 갈려요.
        <a href="/w/퇴직금-기준" style={{ color: "#1D9E75", textDecoration: "underline" }}> 근로자퇴직급여보장법 제4조</a>는 퇴직금 지급 기준을 '계속 근로 1년 이상, 4주 평균 주 15시간 이상'으로 정하고 있죠.
        1년 미만이면 이 조건을 충족하지 못해서 사업주에게 법정 퇴직금 지급 의무가 없죠.
        DB형 퇴직연금이나 퇴직금 제도를 운영하는 회사라면 1년을 채우지 못한 직원에게 퇴직금을 줄 필요가 없는 거예요.
      </p>
      <p style={body}>
        그런데 DC형 퇴직연금은 구조 자체가 달라요.
        사용자가 매년 연봉의 1/12 이상을 근로자 명의 DC 계좌에 직접 납입하는 방식이라서, 1년을 채우지 못해도 납입된 금액만큼은 근로자의 몫이에요.
        퇴직할 때 그 금액을 <a href="/w/퇴직금-IRP-계좌" style={{ color: "#1D9E75", textDecoration: "underline" }}>IRP 계좌</a>로 받을 수 있죠.
        회사가 법적 의무 없이 자발적으로 퇴직금을 주는 경우도 드물지만 가능하고요.
      </p>

      <GreenBox>
        법정 퇴직금(DB형·퇴직금 제도): 1년 미만이면 지급 의무 없음<br />
        DC형 퇴직연금: 1년 미만이어도 납입된 금액은 수령 가능<br />
        회사 자발적 지급: 가능하지만 의무는 아님
      </GreenBox>

      <p style={body}>
        내 회사가 어떤 유형인지 모르겠다면, 아래 체크리스트로 상황을 먼저 정리해봐요.
      </p>

      <SectionBadge>내 상황 체크해봐요</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="DC형 퇴직연금이 설정된 회사라면 1년 미만이어도 납입금을 받을 수 있죠. 아래 계산기로 예상 금액을 조회해봐요."
        partialMatchText="조건에 따라 수령 가능 여부가 달라져요. 회사 인사팀 또는 고용노동부(1350)에 문의해봐요."
      />

      <Divider />

      {/* ─── H2-2: DC형 적립금 계산 ─── */}
      <H2>1년 미만 DC형 적립금, 얼마 받을 수 있나요?</H2>
      <p style={body}>
        DC형 적립금이 얼마나 쌓여 있는지 궁금하죠?
        DC형은 월 평균임금의 1/12씩 매달 쌓이는 구조예요.
        근속 개월 수에 비례해서 계산하면 예상 수령액을 바로 알 수 있죠.
      </p>
      <p style={body}>
        예를 들어 월급 300만원에 6개월 근무했다면, 300만원 x 6개월 / 12 = 약 150만원이에요.
        1년 만근했을 때와 비교하면 차이가 크니까, 아래 계산기에서 직접 금액을 넣어봐요.
      </p>

      <SectionBadge>1년 미만 DC형 적립금 계산기</SectionBadge>
      <Calculator
        sliders={CALC_SLIDERS}
        results={CALC_RESULTS}
        note="※ DC형 기준: 월 평균임금 x 근속 개월수 / 12. 운용 수익에 따라 실제 금액은 달라질 수 있고요. 55세 미만 즉시 인출 시 퇴직소득세 부과."
      />

      <p style={body}>
        계산 결과가 기대보다 적더라도, DC형이라면 이 금액은 법적으로 보장되는 근로자의 몫이에요.
        운용 수익이 붙으면 실제 수령액은 이보다 더 늘어날 수도 있죠.
      </p>

      <CategoryButton label="퇴직금 정보" count={퇴직금_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />

      <Divider />

      {/* ─── H2-3: 기간 계산 ─── */}
      <H2>1년 기간은 어떻게 계산하나요?</H2>
      <p style={body}>
        하루 차이로 퇴직금 수백만원이 왔다 갔다 해요.
        퇴직금 1년 기준은 달력 일수로 계산하는데, 입사일 당일을 1일로 보고 퇴직일 전날까지 세서 365일 이상이면 1년을 충족하죠.
        2월이 끼어 있든, 윤년이든 365일 기준은 동일하게 적용돼요.
      </p>
      <p style={body}>
        실제로 많이 헷갈리는 부분이 퇴직일 당일 포함 여부예요.
        2025년 3월 1일에 입사해서 2026년 2월 28일에 퇴직하면 365일로 1년 충족이에요.
        그런데 2026년 2월 27일에 퇴직하면 364일, 딱 하루 모자라서 1년 미충족이고요.
        퇴직일 조정이 가능하다면 날짜를 꼼꼼히 따져보는 게 좋아요.
      </p>

      <BorderBox>
        <strong>1년 계산 예시</strong><br />
        입사: 2025년 1월 15일 / 퇴직: 2026년 1월 14일 = 364일 (1년 미충족)<br />
        입사: 2025년 1월 15일 / 퇴직: 2026년 1월 15일 = 365일 (1년 충족)<br />
        <span style={{ color: "#666", fontSize: 13 }}>* 퇴직일 당일은 계산에 미포함</span>
      </BorderBox>

      <p style={body}>
        근속 기간을 증명하려면 근로계약서나 4대보험 가입 이력이 필요해요.
        아래 서류 목록에서 미리 챙길 것들을 정리해뒀어요.
      </p>

      <SectionBadge>근무기간 증빙 서류</SectionBadge>
      <DocTable docs={DOCS} />

      <Divider />

      {/* ─── H2-4: 퇴직 후 조치 절차 ─── */}
      <H2>1년 미만 퇴직 후 할 수 있는 조치</H2>
      <p style={body}>
        DC형이 없어서 법정 퇴직금을 못 받는다고 해도, 할 수 있는 게 아무것도 없는 건 아니에요.
        DC형 납입금 수령부터 실업급여 신청까지, 퇴직 직후에 빠르게 움직이는 게 핵심이에요.
        특히 <a href="/w/실업급여-피보험기간" style={{ color: "#1D9E75", textDecoration: "underline" }}>실업급여</a>는 신청 기한이 퇴직 후 12개월 이내라서 늦으면 아예 못 받죠.
      </p>
      <p style={body}>
        아래 단계별로 정리했으니, 본인 상황에 맞는 단계부터 진행해봐요.
        DC형 가입 여부가 가장 먼저 갈리는 분기점이에요.
      </p>

      <Steps steps={STEPS} />

      <p style={body}>
        DC형이 설정된 회사라면 2단계에서 바로 수령 절차로 넘어가면 돼요.
        DC형이 없다면 4단계의 실업급여 신청 자격부터 체크해보는 게 현실적이에요.
      </p>

      <Divider />

      {/* ─── H2-5: 체크리스트 ─── */}
      <H2>퇴직 전에 챙겨야 할 것들</H2>
      <p style={body}>
        1년 미만 퇴직이라면 DC형 여부를 가장 먼저 파악하는 게 중요해요.
        하루 차이로 퇴직금 수령 여부가 바뀔 수 있어서 날짜 계산도 빼놓으면 안 되고요.
        아래 항목을 하나씩 체크하면서 빠진 게 없는지 점검해봐요.
      </p>

      <SectionBadge>체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <GreenBox>
        회사에 DC형 퇴직연금이 설정돼 있다면 납입된 금액만큼은 받을 수 있죠.<br />
        금융감독원 통합연금포털(100lifeplan.fss.or.kr)에서 내 퇴직연금 유형을 조회해봐요.
      </GreenBox>

      <p style={body}>
        소멸시효가 퇴직일로부터 3년이에요.
        이 기한이 지나면 청구 자체가 불가능해지니까, 지금 바로 통합연금포털에 접속해서 내 퇴직연금 유형부터 조회해봐요.
      </p>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        1년 미만 퇴직금과 관련해서 실제로 자주 나오는 질문만 골랐어요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 근로자퇴직급여보장법을 바탕으로 작성됐어요. 제도 변경이 있을 수 있으니 최신 기준은 고용노동부(1350) 또는 금융감독원(1332)에서 조회해봐요." />
    </ArticleLayout>
  );
}
