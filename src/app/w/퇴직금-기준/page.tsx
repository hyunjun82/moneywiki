"use client";

// Q1. 퇴직을 앞두거나 이미 퇴직했는데 퇴직금을 받을 자격이 되는지, 얼마나 받는지 모르는 근로자
// Q2. 내 퇴직금 수급 자격을 판단하고 예상 금액을 계산한 뒤 실제로 지급받는다
// Q3. 1년·주15시간 두 조건 / 계약직·파트타임·5인미만 적용 여부 / 평균임금 계산(상여금 포함) / IRP 계좌 / 14일 지급기한·지연이자
// Q4. 자격체크 → 계산기 → 서류표 → 절차 Steps → 체크리스트 → FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Calculator, EligibilityChecker, Steps, DocTable, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 퇴직금_SIDEBAR, 퇴직금_HIGHLIGHT } from "@/data/퇴직금-guide";

// ─── 데이터 ──────────────────────────────────────────

const CHECK_ITEMS = [
  { id: "c1", label: "같은 사업주 아래서 만 1년 이상 계속 근무했죠" },
  { id: "c2", label: "4주 평균 주 15시간 이상 일했죠" },
  { id: "c3", label: "정규직·계약직·파트타임 중 하나로 근무했죠" },
  { id: "c4", label: "아직 퇴직금을 받지 못한 상태죠" },
];

const CALC_SLIDERS = [
  { id: "salary", label: "최근 3개월 월평균 임금", min: 200, max: 800, step: 10, defaultValue: 300, format: (v: number) => `${v}만원` },
  { id: "years", label: "근속 기간", min: 1, max: 30, step: 1, defaultValue: 3, format: (v: number) => `${v}년` },
];

const CALC_RESULTS = [
  {
    label: "예상 퇴직금",
    getValue: (v: Record<string, number>) => v.salary * 10000 * v.years,
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원`,
    highlight: true,
  },
  {
    label: "1년 근속당 퇴직금",
    getValue: (v: Record<string, number>) => v.salary * 10000,
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원/년`,
  },
];

const DOCS = [
  { name: "근로계약서 (입사일·근무 조건 확인)", required: true, where: "회사 인사팀" },
  { name: "급여명세서 또는 임금 내역 (최근 3개월)", required: true, where: "회사 인사팀 또는 급여 앱" },
  { name: "IRP 계좌번호 (퇴직금 300만원 초과 시)", required: true, where: "은행·증권사 개설" },
  { name: "퇴직확인서 (분쟁 예방용)", required: false, where: "회사 인사팀 요청" },
  { name: "출퇴근 기록·업무 지시 내역 (4대보험 미가입자)", required: false, where: "본인 보관 자료" },
];

const STEPS = [
  {
    title: "수급 자격 확인",
    desc: "만 1년 이상 + 주 15시간 이상, 두 조건을 모두 충족하면 퇴직금이 발생하죠. 정규직·계약직·파트타임 구분 없이 동일 기준이고, 4대보험 미가입이어도 근무 사실이 증명되면 받을 수 있는 권리에요.",
    tip: "주 15시간은 4주 평균 기준이에요. 월별로 들쭉날쭉해도 평균이 15시간 이상이면 충족하죠",
  },
  {
    title: "평균임금 산정",
    desc: "퇴직 전 3개월 동안 받은 임금 총액을 그 기간 총 일수로 나눠요. 고정 상여금·고정수당도 포함 대상이고, 연간 상여금은 12로 나눠 월 단위로 환산한 뒤 더해야 해요.",
    tip: "3개월 임금 총액 ÷ 3개월 총 일수 = 1일 평균임금",
  },
  {
    title: "퇴직금 계산",
    desc: "1일 평균임금 × 30일 × (근속일수 ÷ 365)가 최종 퇴직금이에요. 근속 1년에 월급 1개월치가 쌓이는 구조죠. 상여금을 빠뜨리면 실제보다 수십~수백만원 적게 나오는 경우가 많아요.",
    tip: "소수점 근속(예: 3년 4개월)도 근속일수 비례로 정확히 계산하죠",
  },
  {
    title: "IRP 계좌 개설 및 통보",
    desc: "퇴직금이 300만원을 넘으면 IRP 계좌로만 받을 수 있고요. 퇴사 전에 미리 개설하고 회사 인사팀에 계좌번호를 알려줘야 지급이 원활하게 이뤄지죠. IRP가 없으면 지급이 밀릴 수 있죠.",
    tip: "증권사 IRP는 수수료가 낮고 ETF 투자도 가능하죠",
    link: { label: "IRP 계좌 개설 방법", href: "/w/퇴직금-IRP-계좌" },
  },
  {
    title: "퇴직 후 14일 내 수령 여부 점검",
    desc: "회사는 퇴직 후 14일 이내에 퇴직금을 지급해야 해요. 14일이 지나도 입금이 없으면 연 20% 지연이자가 자동으로 붙고, 고용노동부 민원마당에서 온라인 진정을 낼 수 있는 권리도 생겨요.",
    tip: "진정 접수 후 근로감독관이 직접 조사에 나서요",
    link: { label: "퇴직금 미지급 신고 방법", href: "/w/퇴직금-미지급-신고" },
  },
];

const CHECKLIST = [
  "만 1년 이상 + 주 15시간 이상 두 조건 모두 충족했는지 체크해봐요",
  "상여금: 연간 총액 ÷ 12로 월 환산 후 평균임금에 포함",
  "퇴직금 300만원 초과 시 IRP 계좌 사전 개설",
  "퇴직 전 근로계약서·급여명세서 3개월치 사본 확보",
  "퇴직 후 14일 내 미지급 시 고용노동부(1350) 진정 가능",
  "5인 미만 사업장이어도 퇴직금 지급 의무 동일하게 적용",
];

const FAQS = [
  {
    q: "계약직·아르바이트도 퇴직금을 받을 수 있나요?",
    a: "만 1년 이상 근무하고 주 평균 15시간 이상 일했다면 계약직·아르바이트도 퇴직금 대상이에요. 고용 형태가 아니라 실제 근무 기간과 시간이 기준이죠.",
  },
  {
    q: "5인 미만 소규모 사업장도 퇴직금을 줘야 하나요?",
    a: "줘야 하죠. 근로자퇴직급여보장법은 사업장 규모와 관계없이 모든 사업장에 적용돼요. 1인 사업장이어도 요건을 충족한 근로자에게는 퇴직금을 지급해야 해요.",
  },
  {
    q: "주 15시간 기준은 어떻게 계산하나요?",
    a: "4주를 평균으로 계산해요. 어떤 주에 10시간, 다른 주에 20시간 일했더라도 4주 평균이 15시간 이상이면 조건을 충족하죠. 소정근로시간(계약서 기준)을 기준으로 해요.",
  },
  {
    q: "식대·교통비도 퇴직금 계산에 포함되나요?",
    a: "매월 정기적·일률적으로 지급되는 식대·교통비는 통상임금에 포함돼요. 실비 변상 성격이거나 비정기적이면 제외하고요. 급여명세서에서 구분이 안 되면 고용노동부(1350)에 문의해봐요.",
  },
  {
    q: "4대보험에 가입이 안 됐는데 퇴직금을 받을 수 있나요?",
    a: "받을 수 있는 권리가 있죠. 4대보험 가입 여부는 퇴직금과 관계없고, 실제 근무 사실을 증명하면 되죠. 급여 이체 내역, 출퇴근 기록, 업무 지시 문자 등이 모두 증거가 돼요.",
  },
  {
    q: "퇴직금을 14일 이후에도 안 주면 어떻게 되나요?",
    a: "연 20% 지연이자가 붙고, 3년 이하 징역 또는 3,000만원 이하 벌금 대상이 돼요. 고용노동부 민원마당(minwon.moel.go.kr)에서 온라인 진정을 내면 근로감독관이 조사하죠.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "근로자퇴직급여보장법 제8조: 퇴직금 지급 기준", url: "https://www.law.go.kr/법령/근로자퇴직급여보장법" },
      { label: "근로기준법 제2조: 평균임금 정의", url: "https://www.law.go.kr/법령/근로기준법" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "고용노동부: 퇴직급여 제도 안내", url: "https://www.moel.go.kr" },
      { label: "고용노동부 민원마당: 진정 신청", url: "https://minwon.moel.go.kr" },
    ],
  },
];

const RELATED = [
  { slug: "퇴직금-조건", title: "퇴직금 받는 조건 완전 해설", description: "1년·주15시간 요건과 경계 사례 정리예요." },
  { slug: "퇴직금-계산법", title: "퇴직금 계산법 공식 정리", description: "평균임금 산정 공식과 상여금 처리 방법이에요." },
  { slug: "퇴직금-미지급-신고", title: "퇴직금 미지급 신고 절차", description: "안 줄 때 고용노동부 진정 방법과 지연이자예요." },
];

// ─── 페이지 ──────────────────────────────────────────

export default function Page() {
  return (
    <ArticleLayout
      sidebar={<Sidebar heading="퇴직금 가이드" items={퇴직금_SIDEBAR} highlightSlugs={퇴직금_HIGHLIGHT} currentSlug="퇴직금-기준" />}
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>퇴직금 · 지급기준 · 자격요건</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        퇴직금, 내가 받을 수 있는 건가요?<br />
        1년·주15시간 기준부터 계산 방법까지
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        퇴직금은 고용 형태와 사업장 규모에 상관없이 두 조건만 충족하면 받을 수 있는 권리에요.
        만 1년 이상 계속 근무, 주 평균 15시간 이상 근무 — 이 두 가지죠.
        <a href="https://www.law.go.kr/법령/근로자퇴직급여보장법" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로자퇴직급여보장법 제8조</a>에서
        정한 기준이고요. 계약직이든 파트타임이든 5인 미만 사업장이든 예외가 없어요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      {/* H2-1: 자격 기준 */}
      <H2>퇴직금 지급 기준, 딱 두 가지예요</H2>
      <p style={body}>
        퇴직금 발생 조건은 딱 두 가지죠. 첫째, 같은 사업주 아래서 만 1년 이상 계속 근무해야 하고요.
        둘째, 4주를 평균으로 봤을 때 주 15시간 이상 근무해야 해요.
        둘 다 충족하면 정규직·계약직·파트타임 구분 없이 퇴직금이 발생하죠.
      </p>
      <p style={body}>
        5인 미만 사업장도 마찬가지예요. 근로자퇴직급여보장법은 사업장 규모와 무관하게 적용되고요.
        4대보험에 가입되지 않은 채로 일했어도 실제 근무 사실이 증명되면 받을 수 있는 권리가 있죠.
        급여 이체 내역이나 출퇴근 기록이 있다면 충분한 증거가 되죠.
      </p>

      <GreenBox>
        만 1년 이상 계속 근무 (같은 사업주, 입사일 기준)<br />
        4주 평균 주 소정근로시간 15시간 이상<br />
        두 조건 모두 충족 시 정규직·계약직·파트타임 전부 동일 적용
      </GreenBox>

      <SectionBadge>내 상황 체크해봐요</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="퇴직금 수급 조건을 갖추고 있죠. 아래 계산기로 예상 금액을 바로 살펴봐요."
        partialMatchText="일부 조건이 맞지 않을 수도 있으니, 고용노동부(1350) 상담을 먼저 받아봐요."
      />

      <Divider />

      {/* H2-2: 계산 방법 */}
      <H2>퇴직금 계산 방법, 공식은 하나예요</H2>
      <p style={body}>
        퇴직금 공식은 이에요: 1일 평균임금 × 30일 × 근속연수.
        쉽게 말하면 1년 근무할 때마다 월급 1개월치씩 쌓이는 구조죠.
        1일 평균임금은 퇴직 전 3개월 총임금 ÷ 그 기간 총 일수로 구하고요.
      </p>
      <p style={body}>
        고정 상여금이 있다면 연간 총액을 12로 나눠서 월 환산액으로 포함해야 해요.
        연간 600만원 상여금이라면 월 50만원이 평균임금에 더해지죠.
        상여금을 빠뜨리면 실제 퇴직금보다 수십~수백만원 적게 계산되는 경우가 생겨요.
      </p>

      <SectionBadge>퇴직금 예상 금액 계산기</SectionBadge>
      <Calculator
        sliders={CALC_SLIDERS}
        results={CALC_RESULTS}
        note="※ 월 평균임금 기준 간편 계산이에요. 상여금·고정수당 포함 시 실제 금액이 달라질 수도 있죠."
      />

      <CategoryButton label="퇴직금 정보" count={퇴직금_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />

      <Divider />

      {/* H2-3: 서류 */}
      <H2>퇴직금 받을 때 챙겨야 할 서류</H2>
      <p style={body}>
        퇴직금은 별도 신청 없이 퇴직하면 회사가 자동으로 지급해야 하는 의무가 있죠.
        그래도 금액 오류나 분쟁에 대비해 서류를 미리 확보해두는 게 좋죠.
        근로계약서로 입사일을 확정하고, 급여명세서로 평균임금을 직접 검산하면 되고요.
      </p>
      <p style={body}>
        퇴직금이 300만원을 넘으면 IRP 계좌로만 수령할 수 있는 구조예요.
        퇴사 전에 미리 은행이나 증권사 앱에서 개설하고 회사에 계좌번호를 알려줘야 지급이 늦어지지 않아요.
        4대보험 미가입자라면 근무 사실 증빙 서류를 따로 챙겨두는 게 필요하죠.
      </p>

      <SectionBadge>준비 서류 목록</SectionBadge>
      <DocTable docs={DOCS} />

      <Divider />

      {/* H2-4: 절차 */}
      <H2>퇴직금 받는 절차 5단계</H2>
      <p style={body}>
        퇴직금이 자동으로 들어오는 구조가 아니에요. 자격 확인부터 IRP 개설, 지급 여부 점검까지 직접 챙겨야 하는 단계가 있죠.
        순서대로 따라가면 빠뜨리는 부분 없이 처리할 수 있죠.
      </p>

      <Steps steps={STEPS} />

      <Divider />

      {/* H2-5: 주의사항 */}
      <H2>퇴직 전후 주의사항 체크리스트</H2>
      <p style={body}>
        실제로 퇴직금을 적게 받거나 못 받는 경우 대부분은 사전 준비 부족 때문이에요.
        상여금 환산을 빠뜨리거나 IRP 계좌를 늦게 개설하는 게 대표적이죠.
        퇴직 전에 아래 항목을 한 번씩 짚어두면 분쟁 없이 받을 수 있죠.
      </p>

      <SectionBadge>체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <GreenBox>
        연간 상여금 ÷ 12 = 월 환산액, 이 금액을 월 평균임금에 더해요.<br />
        연 600만원 상여금 기준 월 50만원 추가 → 3년 근속 시 퇴직금 150만원 이상 차이 나죠.<br />
        회사가 상여금을 빼고 계산했다면 이의를 제기할 수 있죠.
      </GreenBox>

      <Divider />

      {/* H2-6: FAQ */}
      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        퇴직금 기준에 관해 실제로 많이 나오는 질문들만 골랐어요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 근로자퇴직급여보장법을 바탕으로 작성됐어요. 제도 변경이 있을 수 있으니 최신 기준은 고용노동부(1350)에서 살펴봐요." />
    </ArticleLayout>
  );
}
