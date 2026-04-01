"use client";
import { Divider } from "@/components/article-ui/Divider";

import {
  H2, SectionBadge, GreenBox, Divider, body,
  Calculator, EligibilityChecker, Steps, Checklist, FAQ, SourceNote, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 퇴직금_SIDEBAR, 퇴직금_HIGHLIGHT } from "@/data/퇴직금-guide";

// ─── 데이터 (변경 없음) ──────────────────────────────

const CHECK_ITEMS = [
  { id: "c1", label: "같은 사업장에서 1년 이상 계속 근무했어요" },
  { id: "c2", label: "4주 평균 주 15시간 이상 일했어요" },
  { id: "c3", label: "퇴직금을 아직 받지 못했어요" },
  { id: "c4", label: "퇴직 후 3년이 지나지 않았어요" },
];

const CALC_SLIDERS = [
  {
    id: "salary",
    label: "월 평균임금",
    min: 150, max: 800, step: 10, defaultValue: 300,
    format: (v: number) => `${v}만원`,
  },
  {
    id: "years",
    label: "근속기간",
    min: 1, max: 35, step: 1, defaultValue: 5,
    format: (v: number) => `${v}년`,
  },
];

const CALC_RESULTS = [
  {
    label: "예상 퇴직금",
    getValue: (v: Record<string, number>) => Math.round(v.salary * 10000 * v.years),
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원`,
    highlight: true,
  },
  {
    label: "1년당 기준액",
    getValue: (v: Record<string, number>) => Math.round(v.salary * 10000),
    format: (v: number) => `${Math.round(v / 10000).toLocaleString()}만원`,
  },
];

const STEPS = [
  {
    title: "1년·주 15시간 조건 확인",
    desc: "입사일과 퇴직일 사이가 정확히 365일 이상인지 확인해요. 근무시간은 4주 평균으로 산정하는데, 특정 주만 15시간 넘어도 평균이 15시간 이상이면 충족돼요.",
    tip: "고용24에서 내 고용보험 이력으로 입사일 확인 가능해요",
    link: { label: "고용24 이력 조회", href: "https://www.ei.go.kr" },
  },
  {
    title: "퇴직금 계산",
    desc: "퇴직 전 3개월 평균임금 x 30일 x (근속일수 / 365)로 계산해요. 기본급만이 아니라 상여금·연차수당도 평균임금에 포함돼요.",
    tip: "위 계산기로 대략적인 금액 확인 후 급여명세서로 검증해보세요",
  },
  {
    title: "회사에 지급 요청",
    desc: "퇴직 후 14일 이내에 지급해야 해요. 자동으로 입금되지 않으면 회사에 지급 요청을 해야 하죠. 문자·메일로 요청하면 나중에 증거로 쓸 수 있어요.",
    tip: "300만원 초과 시 IRP 계좌가 필요해요. 미리 개설해두면 이체가 빨라요",
  },
  {
    title: "미지급 시 고용노동부 신고",
    desc: "14일이 지났는데도 안 주면 연 20% 지연이자가 붙어요. 내용증명 발송 후에도 해결이 안 되면 고용노동부 민원마당에서 온라인으로 진정을 접수해요.",
    tip: "소멸시효 3년: 퇴직 후 3년 내에 반드시 청구해야 해요",
    link: { label: "고용노동부 민원마당", href: "https://minwon.moel.go.kr" },
  },
];

const CHECKLIST = [
  "입사일·퇴직일 정확히 확인: 1일 차이로 조건이 달라질 수 있어요",
  "4주 평균 주 15시간 이상: 근무시간 변동이 있어도 평균으로 판단해요",
  "최근 3개월 급여명세서: 평균임금 산정에 필요해요",
  "IRP 계좌 개설: 퇴직금 300만원 초과 시 의무적으로 IRP에 이체돼요",
  "소멸시효 3년: 퇴직일 기준 3년 내에 청구해야 해요",
];

const FAQS = [
  {
    q: "계약직·알바도 퇴직금을 받을 수 있나요?",
    a: "받을 수 있어요. 계약직, 아르바이트, 파트타임 모두 1년 이상·주 15시간 이상 조건만 충족하면 정규직과 동일하게 적용돼요. 고용 형태는 관계없죠.",
  },
  {
    q: "11개월 29일 근무하면 퇴직금이 없나요?",
    a: "맞아요. 1년을 채워야 퇴직금이 발생해요. 11개월 29일이면 한 푼도 없죠. 1년을 채우면 그때부터 1개월치가 기준이 되는 거예요.",
  },
  {
    q: "5인 미만 사업장도 퇴직금 의무 대상인가요?",
    a: "맞아요. 2010년부터 5인 미만 사업장에도 퇴직금 지급 의무가 동일하게 적용돼요. 1인 사업장, 가사 사용인 등 극히 일부 예외를 제외하면 모두 해당되죠.",
  },
  {
    q: "주 14시간 일했는데 퇴직금이 안 되나요?",
    a: "그래요. 주 15시간 미만이면 초단시간 근로자로 분류돼서 퇴직금 적용이 안 돼요. 4주 평균으로 계산하기 때문에 어떤 주에 시간이 많거나 적어도 평균이 기준이에요.",
  },
  {
    q: "육아휴직 기간도 근속연수에 포함되나요?",
    a: "포함돼요. 육아휴직은 법적 권리라서 근속 기간이 계속 유지되죠. 퇴직금 계산 시 육아휴직 기간도 근속기간에 그대로 산입돼요.",
  },
  {
    q: "계약이 갱신된 경우 1년을 새로 세나요?",
    a: "아니에요. 계약이 갱신되더라도 실질적으로 같은 사업장에서 이어졌다면 최초 입사일부터 합산해요. 중간에 계약 공백이 짧다면 대부분 계속 근로로 인정되죠.",
  },
];

const SOURCES = [
  { name: "고용노동부", href: "https://www.moel.go.kr" },
  { name: "고용24", href: "https://www.ei.go.kr" },
  { name: "법제처", href: "https://www.law.go.kr/법령/근로자퇴직급여보장법" },
];

const RELATED = [
  { slug: "퇴직금-계산법", title: "퇴직금 계산법, 얼마나 받을 수 있을까?", description: "평균임금 공식부터 상여금 포함 계산까지." },
  { slug: "퇴직금-1년미만", title: "퇴직금 1년 미만, 예외 케이스는?", description: "1년 미만 근무 시 퇴직금이 발생하는 예외 상황." },
  { slug: "퇴직금-미지급-신고", title: "퇴직금 미지급 신고 방법", description: "회사가 안 줄 때 신고 절차와 지연이자 청구법." },
];

// ─── 페이지 (가능형: GreenBox 결론 먼저) ─────────────

export default function Page() {
  return (
    <ArticleLayout
      sidebar={<Sidebar heading="퇴직금 가이드" items={퇴직금_SIDEBAR} highlightSlugs={퇴직금_HIGHLIGHT} currentSlug="퇴직금-조건" />}
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>퇴직금 · 조건 · 자격</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        퇴직금, 나는 받을 수 있을까?<br />
        1년·주 15시간 조건부터 수령 기준까지
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        퇴직금 조건은 딱 두 가지예요. 1년 이상 계속 근무, 4주 평균 주 15시간 이상.
        <a href="/w/계약직-퇴직금" style={{ color: "#1D9E75", textDecoration: "underline" }}>계약직</a>도,
        <a href="/w/알바-퇴직금" style={{ color: "#1D9E75", textDecoration: "underline" }}>알바</a>도,
        <a href="/w/일용직-퇴직금" style={{ color: "#1D9E75", textDecoration: "underline" }}>일용직</a>도 조건만 맞으면 받을 수 있어요.
        <a href="https://www.law.go.kr/법령/근로자퇴직급여보장법" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로자퇴직급여보장법</a>은
        고용 형태나 사업장 규모를 따지지 않죠.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      {/* H2-1: GreenBox 결론 + EligibilityChecker (가능형 -> 결론 먼저) */}
      <H2>퇴직금 조건, 딱 두 가지예요</H2>
      <p style={body}>
        정규직이든 계약직이든, 5인 이상이든 1인 사업장이든 조건만 충족하면 똑같이 적용돼요.
        4대보험 미가입 상태여도 실질적 근무 사실이 증명되면 청구할 수 있어요.
      </p>
      <p style={body}>
        "계속 근로"라는 표현이 중요해요. 계약이 갱신되더라도 실질적으로 같은 사업장에서 이어졌다면
        최초 입사일부터 합산하죠. 단, 계약 사이에 공백이 크거나 완전히 다른 직무로 전환됐다면 끊길 수 있어요.
      </p>

      <GreenBox>
        조건 1: 같은 사업장에서 1년 이상 계속 근로<br />
        조건 2: 4주 평균 주 15시간 이상 근무<br />
        고용 형태·사업장 규모·4대보험 가입 여부 무관
      </GreenBox>

      <SectionBadge>내 상황 체크해보세요</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="퇴직금 조건을 갖췄어요. 아래 계산기로 예상 금액을 확인해보세요."
        partialMatchText="조건 일부가 다를 수 있어요. 고용노동부(1350)에서 상담받으세요."
      />

      <CategoryButton label="퇴직금 정보" count={퇴직금_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />

      <Divider />

      {/* H2-2: Calculator */}
      <H2>조건 충족 시 얼마나 받을 수 있을까?</H2>
      <p style={body}>
        퇴직금은 1년 근무할 때마다 월급 1개월치가 쌓이는 구조예요.
        월급 300만원으로 5년 근무하면 1,500만원이 기준이 되죠.
        정확하게는 퇴직 전 3개월 평균임금 x 30일 x (근속일수 / 365)로 계산해요.
      </p>
      <p style={body}>
        여기서 평균임금은 기본급만이 아니에요. 상여금·연차수당도 포함하기 때문에
        <a href="/w/퇴직금-계산법" style={{ color: "#1D9E75", textDecoration: "underline" }}>실제 계산</a>하면
        단순 월급보다 높게 나오는 경우가 많죠.
      </p>

      <SectionBadge>퇴직금 예상 금액 계산기</SectionBadge>
      <Calculator
        sliders={CALC_SLIDERS}
        results={CALC_RESULTS}
        note="※ 월 평균임금 기준 추정치. 상여금·연차수당 포함 시 실제 금액이 더 높을 수 있어요."
      />

      <Divider />

      {/* H2-3: Steps */}
      <H2>조건 확인부터 수령까지 절차</H2>
      <p style={body}>
        조건을 충족했다고 해서 퇴직금이 자동으로 들어오지는 않아요.
        퇴직 후 14일 이내에 지급하는 게 원칙이지만, 회사에 요청해야 처리가 시작되는 경우가 많죠.
      </p>
      <p style={body}>
        안 줄 때 신고하면 대부분 해결돼요. 소멸시효 3년을 넘기기 전에
        반드시 행동해야 한다는 점만 기억하세요.
      </p>

      <Steps steps={STEPS} />

      <Divider />

      {/* H2-4: Checklist */}
      <H2>받기 전 꼭 챙겨야 할 것들</H2>
      <p style={body}>
        날짜 하루 차이로 조건이 달라질 수 있어요. 특히 입사일과 퇴직일은
        회사 기록과 본인 기억이 다른 경우가 많으니 꼼꼼하게 비교해보세요.
      </p>

      <SectionBadge>수령 전 체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <GreenBox>
        인사팀에 서면으로 지급 요청해요 (문자·메일로 증거 남기기)<br />
        14일 초과 시 내용증명 발송 → 연 20% 지연이자 자동 발생<br />
        그래도 안 주면 <a href="https://minwon.moel.go.kr" style={{ color: "#fff", textDecoration: "underline" }}>고용노동부 민원마당</a>에서 온라인 진정 접수
      </GreenBox>

      <Divider />

      {/* H2-5: FAQ */}
      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        퇴직금 조건에 대해 실제로 많이 들어오는 질문만 골랐어요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <SourceNote sources={SOURCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 근로자퇴직급여보장법을 바탕으로 작성됐어요. 제도 변경이 있을 수 있으니 최신 기준은 고용노동부(1350)에서 상담받으세요." />
    </ArticleLayout>
  );
}
