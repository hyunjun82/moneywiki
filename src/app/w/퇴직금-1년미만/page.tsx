"use client";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Calculator, EligibilityChecker, Steps, DocTable, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 퇴직금_SIDEBAR, 퇴직금_HIGHLIGHT } from "@/data/퇴직금-guide";

// ─── 데이터 ──────────────────────────────────────────

const CHECK_ITEMS = [
  { id: "c1", label: "입사일부터 퇴직일까지 만 1년이 되지 않았어요" },
  { id: "c2", label: "계약 기간이 11개월 이하로 정해져 있었어요" },
  { id: "c3", label: "주 15시간 미만으로 근무했어요" },
  { id: "c4", label: "1년 직전에 회사 측에서 계약 종료를 통보했어요" },
];

const CALC_SLIDERS = [
  { id: "salary", label: "월 평균급여", min: 150, max: 500, step: 10, defaultValue: 250, format: (v: number) => `${v}만원` },
  { id: "months", label: "근무 기간", min: 1, max: 11, step: 1, defaultValue: 11, format: (v: number) => `${v}개월` },
];

const CALC_RESULTS = [
  {
    label: "1년 미만 법정 퇴직금",
    getValue: () => 0,
    format: () => "0원 — 만 1년 미만이면 법정 퇴직금 없어요",
    highlight: true,
  },
  {
    label: "1년을 채웠다면 예상 퇴직금",
    getValue: (v: Record<string, number>) => v.salary * 10000 * 1,
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원 (1년 기준 한 달치 급여)`,
  },
];

const DOCS = [
  { name: "근로계약서 (근무 기간·시간 확인)", required: true, where: "회사 인사팀" },
  { name: "급여명세서 최근 3개월분", required: true, where: "회사 인사팀 또는 급여앱" },
  { name: "퇴직확인서 또는 사직서 수리 확인", required: false, where: "회사 인사팀" },
  { name: "고용보험 피보험자격 상실 신고서 (실업급여 신청용)", required: false, where: "근로복지공단 또는 고용24" },
];

const STEPS = [
  {
    title: "만 1년 여부 정확히 계산",
    desc: "퇴직금 기준은 입사일부터 퇴직일까지 달력상 만 1년이에요. 2025년 1월 1일 입사 시 2026년 1월 1일이 퇴직일이어야 1년이에요. 2025년 12월 31일 퇴직은 364일로 1년 미만이에요.",
    tip: "입사일 포함 퇴직일 포함 — 만 365일 이상이어야 퇴직금이 생겨요",
  },
  {
    title: "연차 미사용 수당 청구",
    desc: "1년 미만이어도 월 개근 시 1일씩 연차가 발생해요. 11개월 근무 시 최대 11일치 연차수당이에요. 퇴직금과 별개로 반드시 청구해야 해요. 청구하지 않으면 그냥 사라지는 돈이에요.",
    tip: "연차수당은 퇴직 다음 날부터 3년 이내에 청구 가능해요",
  },
  {
    title: "실업급여 신청 가능 여부 확인",
    desc: "고용보험 피보험기간이 180일 이상이고, 계약 종료 등 비자발적 이직이라면 실업급여를 받을 수 있어요. 퇴직금 0원이어도 실업급여는 별도 요건으로 신청 가능해요.",
    tip: "고용24(work24.go.kr)에서 수급 요건과 예상 금액을 미리 확인할 수 있어요",
    link: { label: "실업급여 신청하기", href: "https://www.work24.go.kr" },
  },
  {
    title: "1년 직전 해고라면 부당해고 구제신청",
    desc: "퇴직금을 피하려는 목적으로 1년 직전에 해고하거나 계약을 종료했다면 부당해고에 해당할 수 있어요. 노동위원회에 구제신청을 하면 원직 복직이나 금전 보상을 요구할 수 있어요.",
    tip: "부당해고 구제신청 기한은 해고일로부터 3개월이에요",
    link: { label: "노동위원회 구제신청", href: "https://www.moel.go.kr" },
  },
];

const CHECKLIST = [
  "만 1년 여부: 입사일~퇴직일 달력 기준 정확히 계산",
  "퇴직금 0원 확인: 1년 미만이면 법정 퇴직금 없음",
  "연차 미사용 수당: 월 개근 1일씩 발생, 반드시 청구",
  "실업급여: 고용보험 180일 이상 + 비자발적 이직 시 신청",
  "1년 직전 계약 종료: 부당해고 여부 노동위원회 확인",
  "서류: 근로계약서·급여명세서 재직 중에 챙겨두기",
];

const FAQS = [
  {
    q: "1년 딱 되는 날 퇴직하면 퇴직금이 생기나요?",
    a: "생겨요. 입사일로부터 만 1년이 되는 날 퇴직하면 퇴직금이 발생해요. 2025년 1월 1일 입사 후 2026년 1월 1일 퇴직이면 정확히 1년으로 퇴직금 대상이에요.",
  },
  {
    q: "계약직 11개월 근무 후 계약 종료되면 아무것도 못 받나요?",
    a: "법정 퇴직금은 없어요. 하지만 연차 미사용 수당은 청구할 수 있고, 비자발적 계약 종료라면 실업급여도 신청 가능해요. 1년 미만이라도 챙길 것들이 있어요.",
  },
  {
    q: "알바로 8개월 일했는데 퇴직금을 받을 수 없나요?",
    a: "주 15시간 이상 근무했더라도 1년 미만이면 법정 퇴직금 대상이 아니에요. 단, 고용보험에 가입했고 비자발적으로 그만뒀다면 실업급여를 신청할 수 있어요.",
  },
  {
    q: "수습 3개월도 근속 기간에 포함되나요?",
    a: "포함돼요. 수습 기간에도 실제로 일하고 임금을 받았다면 계속근로 기간에 들어가요. 회사가 '수습은 제외'라고 해도 법적으로 효력이 없어요.",
  },
  {
    q: "1년 직전에 해고당했어요. 퇴직금을 피하려는 의도인 것 같아요.",
    a: "부당해고에 해당할 수 있어요. 퇴직금을 회피할 목적으로 1년 전 계약을 종료하는 건 법적으로 다툴 수 있어요. 해고일로부터 3개월 이내에 노동위원회에 구제신청을 할 수 있어요.",
  },
  {
    q: "주 15시간 미만으로 일했는데 퇴직금이 없다고 해요.",
    a: "맞아요. 초단시간 근로자(주 15시간 미만)는 근속 기간에 관계없이 퇴직금 지급 의무가 없어요. 이 경우엔 법정 퇴직금을 청구하기 어려워요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "근로자퇴직급여보장법 제8조: 퇴직금 지급 요건 (계속근로 1년)", url: "https://www.law.go.kr/법령/근로자퇴직급여보장법" },
      { label: "근로기준법 제60조: 연차 유급휴가 (1년 미만 월 1일)", url: "https://www.law.go.kr/법령/근로기준법" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "고용노동부: 퇴직금 제도 안내", url: "https://www.moel.go.kr" },
      { label: "고용24: 실업급여 신청 안내", url: "https://www.work24.go.kr" },
    ],
  },
];

const RELATED = [
  { slug: "퇴직금-조건", title: "퇴직금 받는 조건", description: "1년·주 15시간 요건과 예외 상황 정리." },
  { slug: "퇴직금-계산-방법", title: "퇴직금 계산 방법", description: "평균임금 기준 단계별 계산 공식이에요." },
  { slug: "퇴직금-지급-기준", title: "퇴직금 지급 기준 전체 정리", description: "정규직·계약직·알바별 기준을 비교해요." },
];

// ─── 페이지 ──────────────────────────────────────────

export default function Page() {
  return (
    <ArticleLayout
      sidebar={<Sidebar heading="퇴직금 가이드" items={퇴직금_SIDEBAR} highlightSlugs={퇴직금_HIGHLIGHT} currentSlug="퇴직금-1년미만" />}
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>퇴직금 · 1년미만 · 수령여부</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        1년 미만 근무하면 퇴직금이 없나요?<br />
        연차수당·실업급여로 보완하는 방법까지
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        11개월 29일을 일해도 퇴직금은 0원이에요.{" "}
        <a href="https://www.law.go.kr/법령/근로자퇴직급여보장법" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로자퇴직급여보장법 제8조</a>는
        계속근로 만 1년 이상을 퇴직금 지급의 전제로 두고 있어요.
        정규직·계약직·알바 모두 동일하게 적용돼요.
        그렇다고 1년 미만 퇴직이 무조건 빈손인 건 아니에요.
        연차 미사용 수당과 실업급여는 퇴직금과 별개 요건으로 챙길 수 있어요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>퇴직금이 발생하지 않는 상황인지 확인해보세요</H2>
      <p style={body}>
        1년 미만 근무자라면 법정 퇴직금이 없어요.
        단, 주 15시간 미만 근무나 만 1년이 안 되는 경우가 이에 해당해요.
        의도적으로 1년 직전에 계약을 끊는 경우엔 부당해고 여부를 따져봐야 해요.
      </p>
      <p style={body}>
        아래 항목에서 내 상황이 몇 개 해당하는지 체크해보세요.
        퇴직금은 없어도 연차수당·실업급여를 받을 수 있는 조건은 따로 있어요.
      </p>

      <GreenBox>
        만 1년(365일) 이상 + 주 15시간 이상 근무 → 퇴직금 발생<br />
        만 1년 미만(364일 이하) 근무 → 법정 퇴직금 0원<br />
        주 15시간 미만 근무 → 기간 무관하게 퇴직금 없음
      </GreenBox>

      <SectionBadge>내 상황 체크해보세요</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="법정 퇴직금 대상이 아닌 상황이에요. 연차수당과 실업급여 요건을 아래에서 확인해보세요."
        partialMatchText="상황이 복합적이에요. 고용노동부(1350) 또는 고용24에서 정확한 안내를 받아보세요."
      />

      <Divider />

      <H2>1년 미만 퇴직 시 받을 수 있는 금액 확인</H2>
      <p style={body}>
        1년 미만이면 퇴직금은 0원이에요. 아래 계산기로 직접 확인해보면 이해가 쉬워요.
        근무 기간을 11개월로 설정하면 퇴직금이 0원으로 표시돼요.
        1년을 채웠다면 얼마를 받을 수 있었는지도 바로 볼 수 있어요.
      </p>
      <p style={body}>
        월 250만원을 받고 11개월 근무했다면 퇴직금은 0원이에요. 딱 1개월만 더 일했다면 약 250만원이 생겼을 거예요.
        1개월 차이가 수백만원을 가르는 구조예요.
      </p>

      <SectionBadge>1년 미만 퇴직금 시뮬레이션</SectionBadge>
      <Calculator
        sliders={CALC_SLIDERS}
        results={CALC_RESULTS}
        note="※ 만 1년 미만이면 법정 퇴직금은 0원이에요. 1년을 채웠을 때 예상 퇴직금(한 달치 급여 기준)을 함께 보여줘요."
      />

      <CategoryButton label="퇴직금 정보" count={퇴직금_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />

      <Divider />

      <H2>퇴직 시 챙겨야 할 서류</H2>
      <p style={body}>
        퇴직금이 없어도 연차수당 청구와 실업급여 신청을 위해 서류를 미리 챙겨야 해요.
        근로계약서는 근무 기간과 시간을 증명하는 핵심 서류예요.
      </p>
      <p style={body}>
        실업급여 신청을 위한 고용보험 피보험자격 상실 신고서는 회사가 처리해야 해요.
        퇴직 후 지연되는 경우가 있으니 고용24에서 처리 여부를 직접 확인하세요.
      </p>

      <SectionBadge>준비 서류 목록</SectionBadge>
      <DocTable docs={DOCS} />

      <Divider />

      <H2>1년 미만 퇴직 대응 절차 4단계</H2>
      <p style={body}>
        퇴직금이 없다고 아무것도 못 챙기는 게 아니에요.
        연차수당 청구, 실업급여 신청, 부당해고 구제까지 순서대로 챙겨보세요.
      </p>

      <Steps steps={STEPS} />

      <Divider />

      <H2>퇴직 전 최종 체크리스트</H2>
      <p style={body}>
        연차수당은 청구하지 않으면 소멸해요. 퇴직 전에 아래 항목들을 순서대로 확인하세요.
        소멸시효를 놓치면 받을 수 있는 돈도 사라져요.
      </p>

      <SectionBadge>체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <GreenBox>
        1년 미만 근무자도 월 개근 시 1일씩 연차가 쌓여요.<br />
        11개월 근무 시 최대 11일치 연차수당을 청구할 수 있어요.<br />
        연차수당 청구권의 소멸시효는 퇴직일 다음 날부터 3년이에요.
      </GreenBox>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        1년 미만 퇴직금에 관해 많이 헷갈려하는 부분들이에요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 근로자퇴직급여보장법과 근로기준법을 바탕으로 작성됐어요. 제도 변경이 있을 수 있으니 최신 기준은 고용노동부(1350)에서 확인하세요." />
    </ArticleLayout>
  );
}
