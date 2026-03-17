"use client";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Calculator, EligibilityChecker, Steps, DocTable, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 퇴직금_SIDEBAR } from "@/data/퇴직금-guide";

const CHECK_ITEMS = [
  { id: "c1", label: "퇴직연금 DC형(확정기여형)에 가입되어 있어요" },
  { id: "c2", label: "퇴직 전 DC 계좌 적립금을 확인하고 싶어요" },
  { id: "c3", label: "연금으로 받을지 일시금으로 받을지 고민 중이에요" },
  { id: "c4", label: "IRP 계좌로 이전하는 방법을 모르겠어요" },
];

const CALC_SLIDERS = [
  { id: "balance", label: "DC 계좌 잔액 (적립금)", min: 500, max: 10000, step: 100, defaultValue: 3000, format: (v: number) => `${v.toLocaleString()}만원` },
  { id: "years", label: "근속 기간", min: 1, max: 35, step: 1, defaultValue: 10, format: (v: number) => `${v}년` },
];

const CALC_RESULTS = [
  {
    label: "DC 일시금 수령액 (세전)",
    getValue: (v: Record<string, number>) => v.balance * 10000,
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원`,
    highlight: true,
  },
  {
    label: "연금 전환 시 절세 효과 (퇴직소득세 30% 감면 기준)",
    getValue: (v: Record<string, number>) => Math.round(v.balance * 10000 * 0.05 * 0.3),
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원 절세`,
  },
];

const DOCS = [
  { name: "IRP 계좌번호 (이전용)", required: true, where: "증권사·은행 앱 개설 후 확인" },
  { name: "DC 계좌 운용 현황", required: true, where: "가입 금융사 앱 또는 고객센터" },
  { name: "신분증", required: true, where: "본인 지참 또는 앱 인증" },
  { name: "퇴직 확인서", required: false, where: "회사 인사팀" },
];

const STEPS = [
  {
    title: "DC 계좌 잔액 확인",
    desc: "퇴직 전 가입 금융사 앱에서 DC 계좌 잔액을 확인해요. DC형은 근로자가 운용하므로 ETF, 펀드, 원리금보장형 등 운용 상품에 따라 잔액이 달라요. 퇴직 시점 평가금액이 수령액이에요.",
    tip: "운용 손실이 있을 수 있으니 퇴직 전에 안전 자산으로 전환하는 것도 방법이에요",
  },
  {
    title: "IRP 계좌로 이전 또는 일시금 신청",
    desc: "DC 계좌에서 IRP 계좌로 이전하거나 직접 일시금으로 수령할 수 있어요. 300만원 초과 퇴직급여는 IRP로만 받아야 해요(2022년 4월 의무화). 금융사 앱이나 지점에서 이전 신청하면 돼요.",
    tip: "같은 금융사 IRP로 이전하면 절차가 더 빠를 수 있어요",
  },
  {
    title: "퇴직 사실 금융사에 통보",
    desc: "퇴직이 확정되면 DC 계좌 가입 금융사에 퇴직 사실을 알려야 해요. 금융사는 회사의 마지막 부담금 이체를 확인한 뒤 이전 또는 지급 처리를 진행해요. 보통 영업일 기준 3~5일 소요돼요.",
    tip: "회사의 마지막 월 부담금이 이체됐는지도 확인하세요",
  },
  {
    title: "일시금 or 연금 선택",
    desc: "IRP로 이전된 금액은 55세 이후 연금으로 수령하면 퇴직소득세를 30~40% 감면받아요. 일시금으로 빼면 퇴직소득세를 한꺼번에 냅니다. 장기 보유를 고려한다면 IRP에서 ETF 운용도 가능해요.",
    tip: "10년 이상 연금 수령하면 40% 감면이에요",
  },
];

const CHECKLIST = [
  "DC 계좌 잔액: 퇴직 전 평가금액 확인",
  "IRP 계좌: 300만원 초과 시 미리 개설 필수",
  "마지막 부담금: 퇴직 달 부담금 이체 여부 확인",
  "운용 상품: 퇴직 전 안전 자산 전환 고려",
  "연금 수령: 55세 이후 10년 이상 받으면 세금 40% 감면",
];

const FAQS = [
  {
    q: "DC형은 회사가 얼마를 넣어주나요?",
    a: "법정 기준은 연간 임금의 1/12 이상이에요. 즉, 매달 월급의 1/12을 DC 계좌에 부담금으로 넣어줘요. 회사 규정이 더 높으면 그 기준을 따라요.",
  },
  {
    q: "DC 계좌에서 직접 현금으로 받을 수 있나요?",
    a: "300만원 초과 퇴직급여는 IRP 계좌로만 받아야 해요. 일반 통장이나 현금 수령은 위법이에요. 300만원 이하라면 일반 계좌로도 수령 가능해요.",
  },
  {
    q: "DC 운용 손실이 있으면 퇴직금이 줄어드나요?",
    a: "맞아요. DC형은 근로자가 운용 지시를 하기 때문에 손실이 나면 수령액이 줄어요. 법정 최저 기준(평균임금 × 근속연수)보다 낮으면 회사가 차액을 보전해야 해요.",
  },
  {
    q: "DC 계좌를 IRP 말고 다른 곳으로 이전할 수 있나요?",
    a: "퇴직 시 이전 가능한 곳은 IRP뿐이에요. 새 직장에서 DC형 퇴직연금에 가입하면 새 DC 계좌로 이전하는 것도 가능해요.",
  },
  {
    q: "DC형에서 연금으로 받으려면 어떻게 하나요?",
    a: "IRP로 이전된 잔액을 55세 이후 연금 수령 신청하면 돼요. 금융사 앱에서 연금 지급 신청을 하고 수령 기간(10년 이상 권장)을 설정하면 매월 연금처럼 받을 수 있어요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "근로자퇴직급여보장법 제20조: DC형 부담금 기준", url: "https://www.law.go.kr/법령/근로자퇴직급여보장법" },
      { label: "근로자퇴직급여보장법 제9조: IRP 이체 의무", url: "https://www.law.go.kr/법령/근로자퇴직급여보장법" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "금융감독원: 퇴직연금 통합공시", url: "https://www.fss.or.kr" },
      { label: "고용노동부: 퇴직연금 제도 안내", url: "https://www.moel.go.kr" },
    ],
  },
];

const RELATED = [
  { slug: "db형-퇴직금-수령방법", title: "DB형 퇴직금 수령 방법", description: "확정급여형 수령 절차와 IRP 이체를 설명해요." },
  { slug: "퇴직금-IRP-계좌", title: "IRP 계좌 개설 방법", description: "어느 금융사에서 만들지, 수수료 비교까지." },
  { slug: "퇴직금-세금", title: "퇴직금 세금, 얼마나 떼나요?", description: "DC형 퇴직급여의 퇴직소득세를 계산해요." },
];

export default function Page() {
  return (
    <ArticleLayout
      sidebar={<Sidebar heading="퇴직금 가이드" items={퇴직금_SIDEBAR} currentSlug="dc형-퇴직금-수령방법" />}
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>퇴직금 · DC형 · 수령방법</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        DC형 퇴직금(확정기여형), 어떻게 받나요?<br />
        잔액 확인부터 IRP 이전, 연금 선택까지
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        DC형(확정기여형) 퇴직연금은 회사가 매달 부담금을 넣어주면 근로자가 직접 운용하는 방식이에요.
        퇴직 시 DC 계좌 잔액이 수령액이고, 300만원 초과 시 <a href="/w/퇴직금-IRP-계좌" style={{ color: "#1D9E75", textDecoration: "underline" }}>IRP 계좌</a>로만 받을 수 있어요.
        <a href="/w/퇴직금-세금" style={{ color: "#1D9E75", textDecoration: "underline" }}>퇴직소득세</a>는 일시금보다 연금으로 받으면 30~40% 감면돼요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>DC형 퇴직금, 내 잔액이 수령액이에요</H2>
      <p style={body}>
        DC형은 근로자가 직접 운용하는 방식이라 수령액이 회사 부담금 + 운용 수익(또는 손실)으로 결정돼요.
        법정 기준(연간 임금 1/12 이상)보다 잔액이 낮으면 회사가 차액을 보전해야 하지만, 초과분은 근로자 몫이에요.
        퇴직 전에 가입 금융사 앱에서 잔액을 꼭 확인해두세요.
      </p>
      <p style={body}>
        DC형인지 DB형인지 헷갈리면 인사팀에 확인하거나 금융감독원 통합연금포털에서 조회할 수 있어요.
        회사에 따라 DB·DC 혼합 적용하는 경우도 있어요.
      </p>

      <GreenBox title="DC형 부담금 법정 기준">
        연간 임금 총액의 1/12 이상 → 사실상 매달 월급의 1/12<br />
        운용 수익 나면 잔액 증가, 손실 나면 잔액 감소<br />
        법정 최저 기준보다 낮으면 회사가 차액 보전 의무
      </GreenBox>

      <SectionBadge>내 상황 체크해보세요</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="DC형 퇴직급여 수령 절차를 시작할 수 있어요. 아래 계산기로 예상 금액을 확인하세요."
        partialMatchText="조건에 따라 절차가 달라질 수 있어요. 금융사 고객센터나 고용노동부(1350) 상담을 권해요."
      />

      <Divider />

      <H2>DC 계좌 잔액 기준 수령액 확인</H2>
      <p style={body}>
        DC 계좌 잔액과 근속 기간을 입력하면 세전 수령액과 연금 전환 시 절세 효과를 바로 확인할 수 있어요.
        운용 상품에 따라 실제 잔액은 다를 수 있으니 금융사 앱에서 최신 평가금액을 확인하세요.
      </p>

      <SectionBadge>DC형 수령액 계산기</SectionBadge>
      <Calculator
        sliders={CALC_SLIDERS}
        results={CALC_RESULTS}
        note="※ 세전 기준. 퇴직소득세 차감 전 금액이에요. 실제 잔액은 운용 수익·손실에 따라 달라요."
      />

      <CategoryButton label="퇴직금 정보" count={퇴직금_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      <H2>수령에 필요한 서류</H2>
      <p style={body}>
        DC형 수령의 핵심은 가입 금융사에 퇴직 사실을 알리고 IRP 이전을 신청하는 거예요.
        IRP 계좌를 미리 만들어두면 이전 처리가 빠르게 돼요.
      </p>

      <SectionBadge>준비 서류 목록</SectionBadge>
      <DocTable docs={DOCS} />

      <Divider />

      <H2>DC형 퇴직급여 수령 4단계</H2>
      <p style={body}>
        잔액 확인 → IRP 이전 신청 → 금융사 통보 → 연금/일시금 선택 순서예요.
        퇴직 전 안전 자산으로 전환해두면 손실 없이 수령할 수 있어요.
      </p>

      <Steps steps={STEPS} />

      <Divider />

      <H2>수령 전 체크리스트</H2>
      <p style={body}>
        운용 손실을 방지하려면 퇴직 전 안전 자산 전환을 먼저 챙기세요.
      </p>

      <SectionBadge>체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <GreenBox title="DC형도 연금 수령이 유리해요">
        IRP로 이전 후 55세 이후 10년 이상 연금으로 받으면 퇴직소득세 40% 감면이에요.<br />
        일시금으로 바로 빼면 세금을 전액 납부해야 해요.
      </GreenBox>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        DC형 퇴직급여 수령에 대해 실제로 많이 나오는 질문만 골랐어요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 근로자퇴직급여보장법을 바탕으로 작성됐어요. 제도 변경이 있을 수 있으니 최신 기준은 고용노동부(1350)에서 확인하세요." />
    </ArticleLayout>
  );
}
