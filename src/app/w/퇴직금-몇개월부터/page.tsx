"use client";
import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Calculator, EligibilityChecker, Steps, DocTable, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 퇴직금_SIDEBAR } from "@/data/퇴직금-guide";

// ─── 데이터 ──────────────────────────────────────────

const CHECK_ITEMS = [
  { id: "c1", label: "같은 사업주 아래서 만 12개월(1년) 이상 근무했어요" },
  { id: "c2", label: "주 평균 15시간 이상 근무하는 계약으로 일했어요" },
  { id: "c3", label: "정규직·계약직·아르바이트 중 하나로 고용됐어요" },
  { id: "c4", label: "고용 관계가 중간에 끊기지 않고 이어졌어요" },
];

const CALC_SLIDERS = [
  { id: "salary", label: "월 평균임금", min: 150, max: 700, step: 10, defaultValue: 270, format: (v: number) => `${v}만원` },
  { id: "months", label: "근무 기간", min: 1, max: 60, step: 1, defaultValue: 24, format: (v: number) => `${v}개월` },
];

const CALC_RESULTS = [
  {
    label: "예상 퇴직금",
    getValue: (v: Record<string, number>) =>
      v.months >= 12 ? Math.round(v.salary * 10000 * (v.months / 12)) : 0,
    format: (v: number) =>
      v === 0
        ? "0원 — 12개월 미만은 퇴직금이 없어요"
        : `약 ${Math.round(v / 10000).toLocaleString()}만원`,
    highlight: true,
  },
  {
    label: "월급 대비 개월치",
    getValue: (v: Record<string, number>) => v.months,
    format: (v: number) =>
      v >= 12 ? `월급 약 ${(v / 12).toFixed(1)}개월치` : `퇴직금 없음 (${v}개월 근무)`,
  },
  {
    label: "퇴직금 발생 여부",
    getValue: (v: Record<string, number>) => v.months,
    format: (v: number) =>
      v >= 12 ? "발생 (1년 이상 근무)" : `미발생 (12개월 미만, ${12 - v}개월 부족)`,
  },
];

const DOCS = [
  { name: "근로계약서 (입사일·근무시간 확인)", required: true, where: "회사 인사팀 또는 보관 서류" },
  { name: "급여명세서 최근 3개월", required: true, where: "인사팀·급여 앱·메일" },
  { name: "IRP 계좌번호 (퇴직금 300만원 초과 시)", required: true, where: "은행·증권사 앱 개설" },
  { name: "퇴직 확인서 또는 사직서 수리 확인", required: false, where: "인사팀" },
  { name: "출퇴근 기록 (근무시간 분쟁 시)", required: false, where: "근태 시스템·교통카드 내역" },
];

const STEPS = [
  {
    title: "만 1년(12개월) 충족 여부 계산",
    desc: "입사일부터 퇴직일까지 정확히 만 1년이 지나야 퇴직금이 생겨요. 2024년 3월 1일에 입사했다면 2025년 3월 1일이 딱 1년이에요. 11개월 29일은 1년 미만이라서 퇴직금이 0원이에요.",
    tip: "근로계약서의 '입사일'과 고용보험 취득일을 비교해 정확히 계산해요",
  },
  {
    title: "주 평균 15시간 이상 확인",
    desc: "1년을 채웠더라도 주 평균 15시간 미만으로 일했으면 퇴직금이 없어요. 주 15시간은 월 약 65시간 기준이에요. 파트타임이어도 주 15시간 이상이면 퇴직금 대상이에요.",
    tip: "근로계약서에 '소정근로시간'이 적혀 있어요. 이 숫자로 판단해요",
  },
  {
    title: "평균임금 계산 (퇴직 전 3개월)",
    desc: "퇴직 직전 3개월 동안 받은 임금 총액을 그 기간의 총 달력 일수로 나눈 게 1일 평균임금이에요. 기본급뿐 아니라 식대·교통비 같은 고정수당도 포함돼요.",
    tip: "상여금은 연간 총액의 3/12만 평균임금에 포함돼요",
  },
  {
    title: "IRP 계좌 미리 개설",
    desc: "퇴직금이 300만원을 넘으면 IRP(개인형퇴직연금) 계좌로만 받을 수 있어요. 퇴사 전 은행·증권사 앱에서 10분이면 개설 가능해요. IRP 계좌번호를 인사팀에 전달해두세요.",
    tip: "IRP 개설 후 즉시 인출하면 퇴직소득세가 원천징수돼요. 절세하려면 5년 이상 유지해요",
  },
  {
    title: "퇴사 후 14일 이내 수령",
    desc: "회사는 퇴사일로부터 14일 이내에 퇴직금을 지급해야 해요. 기한을 넘기면 연 20%의 지연이자가 붙어요. 14일이 지나도 입금되지 않으면 고용노동부(1350)에 신고할 수 있어요.",
    tip: "14일 기한은 당사자 합의로 연장할 수 있어요. 단, 서면 합의여야 해요",
    link: { label: "고용노동부 민원 신청", href: "https://minwon.moel.go.kr" },
  },
];

const CHECKLIST = [
  "만 12개월 이상 근무 여부: 하루라도 부족하면 퇴직금 없음",
  "주 평균 15시간 이상: 근로계약서 소정근로시간으로 확인",
  "계속근로 인정 여부: 계약 갱신이어도 사실상 동일 근무면 합산",
  "1년 미만이라도 연차수당은 청구 가능 (월 개근 시)",
  "IRP 계좌: 퇴직금 300만원 초과 시 퇴사 전 개설 필수",
  "퇴직금 미지급 시: 14일 초과 → 연 20% 지연이자 청구 가능",
  "소멸시효 3년: 퇴사 후 3년 안에 청구해야 해요",
];

const FAQS = [
  {
    q: "딱 몇 개월부터 퇴직금이 생기나요?",
    a: "만 12개월(1년)이에요. 11개월 29일은 1년 미만이라 퇴직금이 0원이에요. 근로자퇴직급여보장법 제8조에서 '계속근로 1년 이상'을 명시하고 있어요.",
  },
  {
    q: "주 15시간 미만으로 일하면 1년이 넘어도 퇴직금이 없나요?",
    a: "맞아요. 주 평균 15시간 미만 단시간 근로자는 근속 기간과 관계없이 퇴직금 대상에서 제외돼요. 근로계약서에 적힌 소정근로시간을 기준으로 판단해요.",
  },
  {
    q: "계약직이 계약을 연장했을 때 근속기간은 어떻게 되나요?",
    a: "계약이 여러 번 갱신됐어도 사실상 같은 사업주 아래서 고용이 이어졌다면 전체 기간이 합산돼요. 1년 계약을 두 번 했다면 2년 근속으로 퇴직금이 계산돼요.",
  },
  {
    q: "1년을 채우지 못하고 그만두면 아무것도 못 받나요?",
    a: "퇴직금은 없어요. 하지만 월 개근하면 매달 연차 1개가 발생해요. 11개월 근무했다면 최대 11일치 연차수당을 청구할 수 있어요. 비자발적 퇴사라면 실업급여도 고려해보세요.",
  },
  {
    q: "1년 직전에 해고당하면 퇴직금을 못 받는 건가요?",
    a: "고의로 1년을 못 채우게 해고하면 부당해고에 해당할 수 있어요. 노동위원회에 구제신청을 하면 복직 또는 해고수당을 받을 수 있어요. 고용노동부(1350)에 먼저 상담하는 게 좋아요.",
  },
  {
    q: "아르바이트도 퇴직금을 받을 수 있나요?",
    a: "받을 수 있어요. 아르바이트도 1년 이상 근무하고 주 평균 15시간 이상이면 퇴직금 대상이에요. 정규직·계약직·아르바이트 구분 없이 같은 기준이 적용돼요.",
  },
  {
    q: "퇴직금이 얼마나 되는지 대략 어떻게 계산하나요?",
    a: "간단히 계산하면 월 평균임금 × 근속연수예요. 월급 300만원으로 2년 근무했다면 약 600만원이에요. 정확하게는 1일 평균임금 × 30일 × (근속일수 ÷ 365)로 계산해요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "근로자퇴직급여보장법 제8조: 계속근로 1년 이상 요건", url: "https://www.law.go.kr/법령/근로자퇴직급여보장법" },
      { label: "근로기준법 제60조: 연차 유급휴가 (1년 미만 특례)", url: "https://www.law.go.kr/법령/근로기준법" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "고용노동부: 퇴직금 제도 안내", url: "https://www.moel.go.kr" },
      { label: "고용노동부 민원마당: 퇴직금 미지급 신고", url: "https://minwon.moel.go.kr" },
    ],
  },
];

const RELATED = [
  { slug: "퇴직금-1년미만", title: "1년 미만 퇴직금 없을 때 대안", description: "연차수당과 실업급여로 보완하는 방법." },
  { slug: "퇴직금-조건", title: "퇴직금 받는 조건 전체 기준", description: "1년·주15시간 요건과 예외 상황 정리." },
  { slug: "퇴직금-계산법", title: "퇴직금 계산 방법", description: "평균임금 공식과 실제 계산 사례." },
];

// ─── 페이지 ──────────────────────────────────────────

export default function Page() {
  return (
    <ArticleLayout
      sidebar={<Sidebar heading="퇴직금 가이드" items={퇴직금_SIDEBAR} currentSlug="퇴직금-몇개월부터" />}
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>퇴직금 · 발생 시점 · 1년 기준</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        퇴직금, 몇 개월 일해야 받을 수 있나요?<br />
        만 1년 기준·주 15시간 조건·1년 미만 대안
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        퇴직금은 만 12개월(1년) 이상 근무해야 발생해요. 11개월 29일은 1원도 없어요.
        <a href="https://www.law.go.kr/법령/근로자퇴직급여보장법" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로자퇴직급여보장법 제8조</a>에서
        '계속근로 1년 이상, 주 평균 15시간 이상'이라는 두 가지 조건을 명시하고 있어요.
        두 조건을 모두 충족하면 근무 기간 1년당 월급 1개월치가 기본이에요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>퇴직금 발생 조건, 내가 해당되나요?</H2>
      <p style={body}>
        퇴직금을 받으려면 두 조건을 동시에 충족해야 해요. 하나라도 빠지면 퇴직금이 없어요.
        첫째, 같은 사업주 아래서 계속근로 기간이 만 1년 이상이어야 해요.
        둘째, 주 평균 소정근로시간이 15시간 이상이어야 해요.
      </p>
      <p style={body}>
        '계속근로'는 고용 관계가 끊기지 않고 이어진 기간을 말해요.
        1년 계약직이 계약 갱신으로 2년을 일했다면 2년 전체가 계속근로 기간이에요.
        정규직·계약직·아르바이트 구분 없이 동일한 기준이 적용돼요.
      </p>

      <GreenBox title="퇴직금 발생 조건 2가지 (둘 다 충족해야 해요)">
        조건 1. 계속근로 만 1년(12개월) 이상 — 하루라도 모자라면 0원<br />
        조건 2. 주 평균 소정근로시간 15시간 이상 — 파트타임도 해당 가능<br />
        정규직·계약직·아르바이트 모두 동일 적용 (근로자퇴직급여보장법 제8조)
      </GreenBox>

      <SectionBadge>내 상황 체크해보세요</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="퇴직금 수급 조건을 갖추고 있어요. 아래 계산기로 예상 금액을 바로 확인해보세요."
        partialMatchText="조건 일부를 충족하지 못할 수 있어요. 고용노동부(1350)에 먼저 상담해보세요."
      />

      <Divider />

      <H2>근무 기간별 예상 퇴직금 계산</H2>
      <p style={body}>
        퇴직금 계산식은 1일 평균임금 × 30일 × (총 근속일수 ÷ 365)예요.
        쉽게 이해하면 1년 근무 시 월급 1개월치, 3년이면 3개월치가 기본이에요.
        슬라이더로 월 평균임금과 근무 기간을 조정하면 예상 금액을 바로 볼 수 있어요.
      </p>
      <p style={body}>
        평균임금은 퇴직 직전 3개월간 받은 임금 총액을 그 기간의 총 달력 일수로 나눈 금액이에요.
        기본급 외에 식대·교통비 같은 고정 수당도 포함돼요.
        상여금은 연간 총액의 12분의 3만 반영해요.
      </p>

      <SectionBadge>퇴직금 간이 계산기</SectionBadge>
      <Calculator
        sliders={CALC_SLIDERS}
        results={CALC_RESULTS}
        note="※ 월 평균임금 × 근속연수 기준 간이 계산이에요. 상여금·고정수당을 포함하면 실제 퇴직금은 달라질 수 있어요."
      />

      <CategoryButton label="퇴직금 정보" count={퇴직금_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      <H2>퇴직금 청구에 필요한 서류</H2>
      <p style={body}>
        퇴직금은 별도 신청서 없이 회사가 자동으로 지급해야 해요.
        하지만 정확한 금액 계산과 분쟁 예방을 위해 서류를 미리 챙겨두는 게 좋아요.
        특히 근로계약서는 입사일과 근무시간을 증명하는 핵심 서류예요.
      </p>
      <p style={body}>
        퇴직금이 300만원을 넘으면 IRP(개인형퇴직연금) 계좌로만 수령해야 해요.
        퇴사 전 은행이나 증권사 앱에서 미리 개설하고 인사팀에 계좌번호를 알려두면 수령이 빨라져요.
      </p>

      <SectionBadge>준비 서류 목록</SectionBadge>
      <DocTable docs={DOCS} />

      <Divider />

      <H2>퇴직금 받는 절차 5단계</H2>
      <p style={body}>
        퇴직금은 퇴사 결정 전에 미리 준비해야 할 게 있어요.
        IRP 계좌를 퇴사 후에 개설하면 수령이 늦어지는 경우가 많아요.
        아래 순서대로 따라가면 퇴사 후 14일 안에 받을 수 있어요.
      </p>

      <Steps steps={STEPS} />

      <Divider />

      <H2>1년 미만 퇴사 시 챙길 수 있는 것들</H2>
      <p style={body}>
        퇴직금이 없다고 해서 완전히 빈손은 아니에요.
        1년 미만 근무자도 월 개근 시 연차가 매달 발생하고, 사용하지 않은 연차는 수당으로 받을 수 있어요.
        비자발적 퇴사라면 <a href="/w/실업급여-피보험기간" style={{ color: "#1D9E75", textDecoration: "underline" }}>피보험기간 180일</a> 이상이면 실업급여도 받을 수 있어요.
      </p>

      <SectionBadge>체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <GreenBox title="1년 미만 퇴사 시 챙길 수 있는 권리">
        연차수당: 월 개근 시 발생, 최대 11일치 청구 가능 (근로기준법 제60조 제2항)<br />
        실업급여: 비자발적 퇴사 + 피보험기간 180일 이상이면 수령 가능<br />
        부당해고 구제: 1년 직전 의도적 해고는 노동위원회에 구제신청 가능
      </GreenBox>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        퇴직금 발생 기준에 관해 실제로 많이 나오는 질문만 골랐어요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 근로자퇴직급여보장법과 근로기준법을 바탕으로 작성됐어요. 제도 변경이 있을 수 있으니 최신 기준은 고용노동부(1350)에서 확인하세요." />
    </ArticleLayout>
  );
}
