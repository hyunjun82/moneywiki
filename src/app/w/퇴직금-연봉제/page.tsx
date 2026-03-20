"use client";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Calculator, EligibilityChecker, Steps, DocTable, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 퇴직금_SIDEBAR, 퇴직금_HIGHLIGHT } from "@/data/퇴직금-guide";

// ─── 데이터 ──────────────────────────────────────────

const CHECK_ITEMS = [
  { id: "c1", label: "연봉제 근로계약서를 쓰고 입사했어요" },
  { id: "c2", label: "1년 이상 같은 회사에서 계속 근무했어요" },
  { id: "c3", label: "퇴직금을 한 번도 중간정산 받은 적 없어요" },
  { id: "c4", label: "근로계약서에 DC형 퇴직연금 조항이 없어요" },
];

const CALC_SLIDERS = [
  { id: "annual", label: "연봉 (세전)", min: 2400, max: 15000, step: 200, defaultValue: 4000, format: (v: number) => `${v.toLocaleString()}만원` },
  { id: "years", label: "근속 기간", min: 1, max: 30, step: 1, defaultValue: 3, format: (v: number) => `${v}년` },
];

const CALC_RESULTS = [
  {
    label: "예상 퇴직금 (연봉 ÷ 12 × 근속연수)",
    getValue: (v: Record<string, number>) => Math.round((v.annual * 10000 / 12) * v.years),
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원`,
    highlight: true,
  },
  {
    label: "월 환산 임금 (연봉 ÷ 12)",
    getValue: (v: Record<string, number>) => Math.round(v.annual * 10000 / 12),
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원/월`,
  },
];

const DOCS = [
  { name: "근로계약서 (연봉 명시본)", required: true, where: "입사 시 수령, 인사팀 요청" },
  { name: "급여명세서 최근 3개월치", required: true, where: "회사 인사팀 또는 급여 앱" },
  { name: "IRP 계좌번호 (퇴직금 300만원 초과 시)", required: true, where: "은행·증권사 개설 후 인사팀 제출" },
  { name: "퇴직금 포함 특약 조항 사본 (있는 경우)", required: false, where: "근로계약서 해당 페이지 복사" },
];

const STEPS = [
  {
    title: "근로계약서에서 퇴직금 관련 조항 찾기",
    desc: "계약서에 '연봉에 퇴직금 포함', 'DC형 퇴직연금', '퇴직급여 별도 적립' 같은 문구가 있는지 찾아봐요. 조항 유형에 따라 수령 방식이 달라지거든요. 아무런 조항이 없다면 일반 퇴직금 제도가 적용돼요.",
    tip: "계약서 원본이 없으면 인사팀에 교부 요청이 가능해요 — 법적으로 교부 의무가 있어요",
  },
  {
    title: "평균임금 직접 계산하기",
    desc: "퇴직 전 3개월 동안 받은 임금 합계를 그 기간 총 일수로 나눠요. 연봉 ÷ 12로 월 임금을 구하고 여기에 고정수당과 정기 상여금 월 환산액을 더해요. 이 1일 평균임금 × 30일 × 근속연수가 퇴직금이에요.",
    tip: "마지막 3개월 연봉이 높을수록 퇴직금도 커요 — 인상 직후 퇴직이 유리해요",
  },
  {
    title: "IRP 계좌 개설 후 번호 전달",
    desc: "퇴직금이 300만원을 넘으면 IRP(개인형 퇴직연금) 계좌로만 받아요. 퇴직 확정 전에 IRP 계좌를 만들어 계좌번호를 인사팀에 넘겨야 해요. 300만원 이하는 일반 계좌로도 받을 수 있어요.",
    tip: "IRP는 시중은행·증권사 어디서든 개설 가능해요. 수수료 0원 상품도 많아요",
    link: { label: "IRP 계좌 개설 방법 보기", href: "/w/퇴직금-IRP-계좌" },
  },
  {
    title: "퇴직 후 14일 이내 수령 확인",
    desc: "회사는 퇴직 후 14일 이내에 IRP 계좌로 퇴직금을 이체해야 해요. 이 기한을 넘기면 연 20%의 지연이자가 붙어요. 14일이 지나도 미입금이면 고용노동부 1350으로 진정을 낼 수 있어요.",
    tip: "퇴직 확정일 기준이에요 — 마지막 출근일이 아니에요",
    link: { label: "퇴직금 지급 기한 규정 보기", href: "/w/퇴직금-지급-기한" },
  },
];

const CHECKLIST = [
  "근로계약서에서 퇴직금 조항 여부 파악했어요",
  "DC형 퇴직연금 가입 여부 인사팀에 물어봤어요",
  "퇴직 전 3개월 급여명세서 3장 확보했어요",
  "상여금·고정수당 포함 여부로 평균임금 재계산했어요",
  "IRP 계좌 개설하고 계좌번호 인사팀에 전달했어요",
  "퇴직 후 14일 이내 입금 여부 달력에 표시해뒀어요",
];

const FAQS = [
  {
    q: "연봉에 퇴직금이 포함됐다고 했는데, 퇴직 시 또 받을 수 있나요?",
    a: "'연봉에 퇴직금 포함'이라는 약정만으로는 퇴직금 청구권이 소멸되지 않아요. 근로자퇴직급여보장법은 강행법규라서, 실제로 별도 적립이 없었다면 퇴직 시 추가 청구가 가능해요. 단, DC형 퇴직연금으로 매년 연봉의 1/12을 실제 적립한 경우는 별도 지급으로 인정돼요.",
  },
  {
    q: "연봉제 근로자의 퇴직금은 어떻게 계산하나요?",
    a: "퇴직 전 3개월 받은 임금 합계를 그 기간 총 일수로 나눠 1일 평균임금을 구해요. 1일 평균임금 × 30일 × 근속연수가 퇴직금이에요. 연봉 4,200만원에 3년 근속이면 약 1,050만원 정도예요. 상여금이 정기적으로 지급됐다면 월 환산해서 포함해야 해요.",
  },
  {
    q: "DC형 퇴직연금과 일반 퇴직금은 어떻게 다른가요?",
    a: "DC형(확정기여형)은 회사가 매년 연봉 1/12을 근로자 IRP 계좌에 적립하는 방식이에요. 퇴직 시 IRP에 쌓인 금액이 퇴직급여예요. 일반 퇴직금은 퇴직 시 한 번에 계산해서 지급해요. 두 방식 모두 받을 수 있는 건 아니고, 회사가 어떤 제도를 운영하는지에 따라 달라요.",
  },
  {
    q: "연봉이 인상됐으면 퇴직금도 올라가나요?",
    a: "맞아요. 퇴직금은 퇴직 직전 3개월 임금을 기준으로 계산해요. 연봉이 오른 상태에서 퇴직하면 높아진 평균임금이 적용돼서 퇴직금도 커져요. 반대로 임금이 줄었던 기간에 퇴직하면 퇴직금이 줄 수 있어요.",
  },
  {
    q: "성과급이나 상여금도 퇴직금 계산에 포함되나요?",
    a: "정기적으로 지급된 상여금은 포함돼요. 매달 또는 매 분기 고정으로 받았다면 월 환산 금액을 평균임금에 더해야 해요. 반면 비정기적인 인센티브나 일회성 성과급은 포함 여부가 법원 판례에 따라 다를 수 있어요. 고용노동부 1350에 개별 상담을 받아보는 게 정확해요.",
  },
  {
    q: "퇴직금 소멸시효가 3년이라고 하는데, 연봉제도 같은가요?",
    a: "동일해요. 연봉제든 월급제든 퇴직금 청구권 소멸시효는 퇴직일로부터 3년이에요. 3년이 지나면 청구권 자체가 사라지기 때문에, 퇴직금을 못 받았다면 빠르게 움직이는 게 좋아요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "근로자퇴직급여보장법 제8조: 퇴직금 산정 기준", url: "https://www.law.go.kr/법령/근로자퇴직급여보장법" },
      { label: "근로기준법 제2조: 평균임금 정의", url: "https://www.law.go.kr/법령/근로기준법" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "고용노동부: 퇴직금 산정 기준 안내", url: "https://www.moel.go.kr" },
      { label: "고용노동부 민원마당: 퇴직금 진정 신청", url: "https://minwon.moel.go.kr" },
    ],
  },
];

const RELATED = [
  { slug: "퇴직금-평균임금", title: "퇴직금 평균임금 계산 기준", description: "상여금 포함 방법과 계산 공식." },
  { slug: "퇴직금-상여금-포함", title: "상여금 퇴직금 포함 여부", description: "정기·비정기 상여금 구분 기준." },
  { slug: "퇴직금-IRP-계좌", title: "IRP 계좌 개설 방법", description: "은행·증권사 비교부터 개설까지." },
];

// ─── 페이지 ──────────────────────────────────────────

export default function Page() {
  return (
    <ArticleLayout
      sidebar={<Sidebar heading="퇴직금 가이드" items={퇴직금_SIDEBAR} highlightSlugs={퇴직금_HIGHLIGHT} currentSlug="퇴직금-연봉제" />}
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>퇴직금 · 연봉제 · 계산법</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        연봉에 퇴직금 포함이라고 했는데 따로 받을 수 있나요?<br />
        포함 약정 유효 여부부터 계산 방법까지
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        입사할 때 "연봉에 퇴직금 포함"이라는 말을 들었다면, 그 약정이 실제로 유효한지부터 따져봐야 해요.
        <a href="https://www.law.go.kr/법령/근로자퇴직급여보장법" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로자퇴직급여보장법 제8조</a>는 강행법규라서, 단순 포함 약정만으로는 <a href="/w/퇴직금-소멸시효" style={{ color: "#1D9E75", textDecoration: "underline" }}>퇴직금 청구권</a>이 사라지지 않아요.
        연봉제 근로자도 <a href="/w/퇴직금-평균임금" style={{ color: "#1D9E75", textDecoration: "underline" }}>평균임금</a> 계산 방식은 월급제와 똑같이 퇴직 전 3개월 기준이에요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>연봉 포함 약정, 정말 유효한가요?</H2>
      <p style={body}>
        근로계약서에 '연봉에 퇴직금 포함'이라고 적혀 있어도, 그게 퇴직금을 못 받는다는 뜻은 아니에요.
        <a href="https://www.law.go.kr/법령/근로자퇴직급여보장법" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로자퇴직급여보장법</a>은 계속근로기간 1년에 30일분 이상의 평균임금을 퇴직금으로 보장하도록 하고, 이 기준에 못 미치는 약정은 효력이 없어요.
        실제로 별도 적립이 없었다면 퇴직 시 추가 청구가 가능한 경우가 많아요.
      </p>
      <p style={body}>
        예외는 DC형(확정기여형) 퇴직연금이에요. 회사가 매년 연봉의 1/12을 근로자 IRP 계좌에 실제로 적립하고 있다면, 이건 별도 지급이 이뤄지는 거예요.
        계약서에 DC형 조항이 있는지 먼저 확인해봐요. '연봉 4,200만원(퇴직금 포함)'처럼 총액만 적혀 있고 별도 적립이 없었다면, 그 약정은 법적으로 효력이 약해요.
      </p>

      <GreenBox>
        단순 포함 약정만으로는 퇴직금 청구권이 사라지지 않아요<br />
        실제로 별도 적립이 없었다면 퇴직 시 추가 청구 가능해요<br />
        DC형으로 매년 연봉 1/12 적립한 경우만 별도 지급으로 인정돼요
      </GreenBox>

      <SectionBadge>내 상황 체크해보세요</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="일반 퇴직금 제도 적용 가능성이 높아요. 아래 계산기로 예상 금액을 먼저 파악해봐요."
        partialMatchText="상황에 따라 판단이 달라질 수 있어요. 고용노동부(1350) 또는 노무사 상담을 먼저 받아보세요."
      />

      <Divider />

      <H2>연봉 기준으로 퇴직금 계산해봐요</H2>
      <p style={body}>
        연봉제 근로자의 퇴직금은 '연봉 ÷ 12 × 근속연수'로 빠르게 추정할 수 있어요.
        이 공식은 상여금과 고정수당이 없다고 가정한 최솟값이에요. 정기 상여금이 있으면 실제 금액은 더 올라가요.
      </p>
      <p style={body}>
        연봉 4,200만원에 3년 근속이면 약 1,050만원이에요.
        연봉이 오르는 추세라면 마지막 3개월 기준 <a href="/w/퇴직금-평균임금" style={{ color: "#1D9E75", textDecoration: "underline" }}>평균임금</a>이 높아지기 때문에, 퇴직 시점이 인상 이후일수록 퇴직금도 커져요.
      </p>

      <SectionBadge>연봉제 퇴직금 계산기</SectionBadge>
      <Calculator
        sliders={CALC_SLIDERS}
        results={CALC_RESULTS}
        note="※ 상여금·고정수당 포함 시 실제 퇴직금이 이보다 높을 수 있어요."
      />

      <CategoryButton label="퇴직금 정보" count={퇴직금_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />

      <Divider />

      <H2>퇴직금 수령에 필요한 서류</H2>
      <p style={body}>
        연봉제 근로자가 퇴직금을 받을 때 가장 먼저 챙겨야 할 건 근로계약서예요.
        포함 조항이 있는지 없는지를 서류로 확인해야 수령 방식과 금액 계산 근거가 명확해져요.
      </p>
      <p style={body}>
        퇴직금이 300만원을 넘으면 <a href="/w/퇴직금-IRP-계좌" style={{ color: "#1D9E75", textDecoration: "underline" }}>IRP 계좌</a>로만 받을 수 있어요. 계좌번호를 인사팀에 미리 전달하지 않으면 이체가 늦어질 수 있으니, 퇴직 확정 전에 개설해두는 게 좋아요.
      </p>

      <SectionBadge>준비 서류 목록</SectionBadge>
      <DocTable docs={DOCS} />

      <Divider />

      <H2>퇴직금 받는 4단계 절차</H2>
      <p style={body}>
        약정 조항 확인부터 IRP 수령까지 4단계로 진행돼요.
        2단계 평균임금 계산에서 상여금 포함 여부로 금액이 수백만 원 차이날 수 있으니 직접 계산해보는 게 좋아요.
      </p>

      <Steps steps={STEPS} />

      <Divider />

      <H2>퇴직금 놓치지 않으려면</H2>
      <p style={body}>
        연봉제 퇴직금에서 실제로 많이 놓치는 부분은 DC형 적립 누락, 상여금 제외, IRP 계좌 미개설이에요.
        아래 항목을 하나씩 짚어가면 빠짐없이 챙길 수 있어요.
      </p>

      <SectionBadge>체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <GreenBox>
        회사가 매년 연봉 1/12을 IRP에 넣고 있는지 잔액 조회로 바로 확인할 수 있어요.<br />
        적립이 누락된 기간이 있으면 회사에 소급 청구가 가능해요.<br />
        <a href="/w/퇴직금-소멸시효" style={{ color: "#1D9E75", textDecoration: "underline" }}>퇴직금 소멸시효</a>는 연봉제도 퇴직일로부터 3년이에요.
      </GreenBox>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        연봉제 퇴직금에서 실제로 헷갈리는 부분들만 골랐어요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 근로자퇴직급여보장법과 근로기준법을 바탕으로 작성됐어요. 제도 변경이 있을 수 있으니 최신 기준은 고용노동부(1350)에서 확인해주세요." />
    </ArticleLayout>
  );
}
