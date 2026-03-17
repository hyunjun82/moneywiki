"use client";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Calculator, EligibilityChecker, Steps, DocTable, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 퇴직금_SIDEBAR } from "@/data/퇴직금-guide";

// ─── 데이터 ──────────────────────────────────────────

const CHECK_ITEMS = [
  { id: "c1", label: "같은 사업장에서 1년 이상 계속 근무했어요" },
  { id: "c2", label: "4주 평균 주 15시간 이상 근무했어요" },
  { id: "c3", label: "최근 3개월 급여명세서를 가지고 있어요" },
  { id: "c4", label: "퇴직일(마지막 근무일)이 확정됐어요" },
];

const CALC_SLIDERS = [
  {
    id: "monthly",
    label: "월 평균임금 (상여금 월 환산 포함)",
    min: 200,
    max: 1000,
    step: 10,
    defaultValue: 350,
    format: (v: number) => `${v}만원`,
  },
  {
    id: "years",
    label: "근속 기간",
    min: 1,
    max: 40,
    step: 1,
    defaultValue: 5,
    format: (v: number) => `${v}년`,
  },
];

const CALC_RESULTS = [
  {
    label: "예상 퇴직금",
    getValue: (v: Record<string, number>) => Math.round(v.monthly * 10000 * v.years),
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원`,
    highlight: true,
  },
  {
    label: "1년치 기준 (1개월 평균임금)",
    getValue: (v: Record<string, number>) => Math.round(v.monthly * 10000),
    format: (v: number) => `${Math.round(v / 10000).toLocaleString()}만원`,
  },
];

const DOCS = [
  { name: "급여명세서 (최근 3개월)", required: true, where: "회사 인사팀 요청" },
  { name: "근로계약서", required: true, where: "입사 시 수령본 또는 인사팀" },
  { name: "상여금·연차수당 지급 내역", required: false, where: "급여명세서 또는 인사팀" },
  { name: "4대보험 가입 이력 확인서", required: false, where: "고용24(ei.go.kr) 무료 조회" },
];

const STEPS = [
  {
    title: "퇴직 전 3개월 임금 총액 합산",
    desc: "기본급만이 아니라 3개월 동안 실제 받은 모든 임금을 더해요. 고정 야근수당, 직책수당, 식대(통상임금 해당분) 등 정기적으로 지급된 금액은 전부 포함돼요. 연 상여금은 12로 나눠서 월 환산한 뒤 더하면 돼요.",
    tip: "퇴직 당월 급여는 일할 계산해서 포함",
  },
  {
    title: "1일 평균임금 계산",
    desc: "3개월 임금 총액을 3개월 총 일수(보통 89~92일)로 나눠요. 예를 들어 3개월 총임금이 1,050만원이고 총 일수가 92일이면 1일 평균임금 = 1,050만원 ÷ 92일 ≈ 114,130원이에요.",
    tip: "달력 기준 실제 일수로 나눠야 정확해요 (30일 고정 아님)",
  },
  {
    title: "근속일수 계산",
    desc: "입사일부터 퇴직일 전날까지 실제 날수를 세요. 고용24에서 고용보험 가입 이력을 조회하면 정확한 입사일과 퇴직일을 확인할 수 있어요. 1년 6개월이면 549일이에요.",
    tip: "고용24(ei.go.kr) → 고용보험 이력 조회로 날짜 확인",
    link: { label: "고용24 이력 조회", href: "https://www.ei.go.kr" },
  },
  {
    title: "퇴직금 공식 적용",
    desc: "1일 평균임금 × 30일 × (근속일수 ÷ 365)로 계산해요. 위 예시라면 114,130원 × 30 × (549 ÷ 365) ≒ 5,151,600원이에요. 300만원 초과 시 IRP 계좌로만 수령이 가능해서 미리 개설해둬야 해요.",
    tip: "300만원 이하는 일반 계좌로도 수령 가능해요",
  },
];

const CHECKLIST = [
  "기본급만 계산하지 않기: 상여금·수당 포함 필수",
  "3개월 총 일수: 달력 기준 실제 일수로 나누기 (90일 고정 아님)",
  "상여금: 연간 총액 ÷ 12로 월 환산해서 포함",
  "근속일수: 입사일부터 퇴직일 전날까지 정확히 계산",
  "IRP 계좌: 퇴직금 300만원 초과 시 퇴직 전 미리 개설",
  "소멸시효: 퇴직 후 3년 안에 청구해야 해요",
];

const FAQS = [
  {
    q: "퇴직금 공식이 정확히 뭔가요?",
    a: "1일 평균임금 × 30일 × (근속일수 ÷ 365)예요. 평균임금은 퇴직 전 3개월 임금 총액을 그 기간 총 일수로 나눈 값이에요. 월급 × 근속연수는 편의상 추정치일 뿐, 정확한 계산은 일 단위로 해야 해요.",
  },
  {
    q: "기본급으로만 계산해도 되나요?",
    a: "안 돼요. 평균임금에는 정기적으로 지급된 수당과 상여금 월 환산액이 전부 포함돼요. 기본급만으로 계산하면 실제보다 10~30% 적게 나와요. 회사가 기본급만 기준으로 지급했다면 차액을 청구할 수 있어요.",
  },
  {
    q: "수습 기간도 근속기간에 포함되나요?",
    a: "포함돼요. 수습이든 시용이든 실제로 일하고 임금을 받았다면 근속기간에 들어가요. 회사가 수습은 빼겠다고 해도 법적 효력이 없어요.",
  },
  {
    q: "계약직이다가 정규직으로 전환됐는데 어떻게 계산해요?",
    a: "같은 사업장이면 계약직 기간도 합산해요. 계약직 1년 + 정규직 2년이면 총 3년치 퇴직금이에요. 고용 형태가 바뀌어도 사업장이 동일하면 근속기간은 이어져요.",
  },
  {
    q: "회사 계산과 내 계산이 다르면 어떻게 해요?",
    a: "급여명세서를 기준으로 직접 검토해요. 차이가 있으면 고용노동부(1350)에 상담하거나 노동청에 진정을 넣을 수 있어요. 근로감독관이 재산정해줘요. 지연 지급이면 연 20% 지연이자도 받을 수 있어요.",
  },
  {
    q: "육아휴직 기간도 근속기간에 포함되나요?",
    a: "포함돼요. 육아휴직은 근속기간에서 빠지지 않아요. 다만 평균임금 산정 기간에 육아휴직이 겹치면 해당 기간을 빼고 그 전 3개월로 산정해요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "근로기준법 제2조: 평균임금 정의", url: "https://www.law.go.kr/법령/근로기준법" },
      { label: "근로자퇴직급여보장법 제8조: 퇴직금 산정 기준", url: "https://www.law.go.kr/법령/근로자퇴직급여보장법" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "고용노동부: 퇴직급여 제도 안내", url: "https://www.moel.go.kr" },
      { label: "고용24: 고용보험 가입 이력 조회", url: "https://www.ei.go.kr" },
    ],
  },
];

const RELATED = [
  { slug: "퇴직금-평균임금", title: "퇴직금 평균임금 계산 방법", description: "상여금·수당 포함 기준을 정확히 설명해요." },
  { slug: "퇴직금-조건", title: "퇴직금 받을 수 있는 조건", description: "1년·주 15시간 조건을 확인해요." },
  { slug: "퇴직금-세금", title: "퇴직금 세금, 얼마나 떼나요?", description: "IRP 절세 방법까지 정리했어요." },
];

// ─── 페이지 ──────────────────────────────────────────

export default function Page() {
  return (
    <ArticleLayout
      sidebar={<Sidebar heading="퇴직금 가이드" items={퇴직금_SIDEBAR} currentSlug="퇴직금-계산-방법" />}
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>퇴직금 · 계산방법 · 평균임금</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        퇴직금 계산 공식, 어디서부터 시작해야 하죠?<br />
        평균임금부터 근속일수까지 계산법
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        퇴직금 공식은 <strong>1일 평균임금 × 30일 × 근속연수</strong>예요.
        쉽게 말하면 <a href="/w/퇴직금-평균임금" style={{ color: "#1D9E75", textDecoration: "underline" }}>월 평균임금</a> × 근속연수인데,
        기본급만으로 계산하면 실제보다 적게 나와요.
        <a href="https://www.law.go.kr/법령/근로자퇴직급여보장법" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로자퇴직급여보장법 제8조</a>에서 정한 기준이에요.
        상여금·수당 포함 방법부터 실제 예시까지 단계별로 정리했어요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>내가 퇴직금 계산 대상인지 확인해보세요</H2>
      <p style={body}>
        퇴직금을 받으려면 같은 사업장에서 <strong>1년 이상 계속 근무</strong>하고, <strong>4주 평균 주 15시간 이상</strong> 일해야 해요.
        정규직·계약직·아르바이트 구분 없이 동일하게 적용되고, 5인 미만 사업장도 2010년부터 전원 해당돼요.
      </p>
      <p style={body}>
        두 조건을 모두 충족했다면 급여명세서 3개월치와 입사일·퇴직일만 있으면 계산이 가능해요.
        4대보험 가입 이력이 없다고 해서 무조건 제외되는 건 아니에요.
        실질적으로 근로관계가 있었다면 <a href="/w/퇴직금-조건" style={{ color: "#1D9E75", textDecoration: "underline" }}>퇴직금 청구권</a>이 인정돼요.
      </p>

      <GreenBox title="퇴직금 계산 3가지 공식">
        평균임금 = 퇴직 전 3개월 임금 총액 ÷ 3개월 총 일수<br />
        1일 퇴직금 = 1일 평균임금 × 30일<br />
        최종 퇴직금 = 1일 퇴직금 × (근속일수 ÷ 365)
      </GreenBox>

      <SectionBadge>내 상황 체크해보세요</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="퇴직금 계산 조건을 갖추고 있어요. 아래 계산기로 예상 금액을 확인해보세요."
        partialMatchText="조건 일부가 다를 수 있어요. 고용노동부(1350)에 상담해보세요."
      />

      <Divider />

      <H2>퇴직금, 얼마나 받을 수 있을까?</H2>
      <p style={body}>
        월 평균임금과 근속기간을 입력하면 예상 퇴직금이 바로 나와요.
        여기서 월 평균임금은 기본급만이 아니라 상여금 월 환산도 더한 금액이에요.
        연 상여금이 600만원이라면 월 50만원을 기본급에 더해서 입력하면 더 정확해요.
      </p>
      <p style={body}>
        계산기 결과는 <em>월 평균임금 × 근속연수</em> 기준의 추정치예요.
        정확한 금액은 아래 4단계 공식으로 직접 계산하거나, 고용노동부 퇴직금 계산기를 이용하면 돼요.
      </p>

      <SectionBadge>퇴직금 예상 금액 계산기</SectionBadge>
      <Calculator
        sliders={CALC_SLIDERS}
        results={CALC_RESULTS}
        note="※ 월 평균임금 기준 추정치. 상여금·연차수당 포함 시 실제 금액이 더 높을 수 있어요."
      />

      <CategoryButton label="퇴직금 정보" count={퇴직금_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />

      <Divider />

      <H2>계산에 필요한 서류</H2>
      <p style={body}>
        정확한 퇴직금 계산의 핵심은 급여명세서 3개월치예요.
        기본급 외에 상여금·수당이 얼마였는지 확인할 수 있는 유일한 자료거든요.
        퇴직 후엔 회사가 서류 제공을 거부하거나 연락이 끊기는 경우도 있어요.
      </p>
      <p style={body}>
        재직 중에 급여명세서를 미리 챙겨두는 게 좋아요.
        근로계약서에 급여 구성이 적혀 있다면 함께 보관하면 더 좋고요.
        4대보험 가입 이력은 <a href="https://www.ei.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용24</a>에서 무료로 조회할 수 있어요.
      </p>

      <SectionBadge>준비 서류 목록</SectionBadge>
      <DocTable docs={DOCS} />

      <Divider />

      <H2>단계별 계산 방법</H2>
      <p style={body}>
        핵심은 평균임금을 정확히 산정하는 거예요.
        상여금·수당을 빠뜨리면 실제보다 낮게 계산될 수 있어요.
        아래 4단계를 순서대로 따라가면 돼요.
      </p>
      <p style={body}>
        계산 후 14일 안에 퇴직금이 들어오지 않으면 <a href="/w/퇴직금-미지급-신고" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용노동부 민원마당</a>에서 진정을 넣을 수 있어요.
        진정이 접수되면 회사는 원금 외에 <a href="/w/퇴직금-지연이자" style={{ color: "#1D9E75", textDecoration: "underline" }}>지연이자 연 20%</a>까지 물어야 해요.
      </p>

      <Steps steps={STEPS} />

      <Divider />

      <H2>계산 전 주의사항</H2>
      <p style={body}>
        하나라도 놓치면 퇴직금이 낮게 계산될 수 있어요.
        특히 상여금 처리와 IRP 계좌 개설은 미리 챙겨두지 않으면 수령 당일에 막혀요.
      </p>

      <SectionBadge>체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <GreenBox title="소멸시효 3년, 퇴직 후 꼭 챙기세요">
        퇴직금 청구권은 퇴직일로부터 3년이 지나면 소멸해요.<br />
        퇴직 후 바로 받지 못했다면 소멸시효 전에 청구해야 해요.<br />
        내용증명 발송만으로도 6개월 시효 중단 효과가 생겨요.
      </GreenBox>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        퇴직금 계산 방법에 대해 실제로 많이 나오는 질문만 골랐어요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 근로기준법과 근로자퇴직급여보장법을 바탕으로 작성됐어요. 제도 변경이 있을 수 있으니 최신 기준은 고용노동부(1350)에서 확인하세요." />
    </ArticleLayout>
  );
}
