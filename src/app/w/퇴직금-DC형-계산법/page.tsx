"use client";

// Q1. 이 키워드를 검색하는 사람은 지금 어떤 상황인가?
// → DC형 퇴직연금에 가입돼 있는데 퇴직하면 실제로 얼마를 받는지 모르는 직장인
// Q2. 이 사람이 이 글을 읽고 나서 할 수 있어야 하는 행동은?
// → 연봉·근속·수익률로 예상 수령액을 직접 계산하고, 지금 당장 운용 지시를 바꿀 수 있어야
// Q3. 이 행동을 하려면 반드시 알아야 하는 정보는?
// → 납입 원금(연봉÷12×근속), 운용수익 계산법, 운용 지시 방법, 퇴직 시 IRP 이전·세금 구조
// Q4. 이 정보를 가장 잘 전달하는 형태는?
// → 슬라이더 계산기(원금+수익 시뮬레이션) + Steps(운용→수령 절차) + Checklist(놓칠 것 방지)

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Calculator, EligibilityChecker, Steps, DocTable, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 퇴직금_SIDEBAR, 퇴직금_HIGHLIGHT } from "@/data/퇴직금-guide";

// ─── 데이터 ──────────────────────────────────────────

const CHECK_ITEMS = [
  { id: "c1", label: "회사가 DC형(확정기여형) 퇴직연금 제도를 채택했죠" },
  { id: "c2", label: "회사가 매년 내 IRP 계좌에 연봉의 1/12 이상을 납입했죠" },
  { id: "c3", label: "내가 직접 운용 지시를 내려 펀드나 예금으로 운용하고 있죠" },
  { id: "c4", label: "퇴직 시 IRP 계좌로 잔액 전액이 이전될 예정이죠" },
];

const CALC_SLIDERS = [
  {
    id: "annual",
    label: "연봉 (세전)",
    min: 2400, max: 15000, step: 200, defaultValue: 5000,
    format: (v: number) => `${v.toLocaleString()}만원`,
  },
  {
    id: "years",
    label: "근속 기간",
    min: 1, max: 35, step: 1, defaultValue: 5,
    format: (v: number) => `${v}년`,
  },
  {
    id: "rate",
    label: "연 운용 수익률 (예상)",
    min: 0, max: 10, step: 1, defaultValue: 3,
    format: (v: number) => `${v}%`,
  },
];

const CALC_RESULTS = [
  {
    label: "DC형 연간 납입 원금 (연봉÷12)",
    getValue: (v: Record<string, number>) => Math.round(v.annual * 10000 / 12),
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원/년`,
    highlight: true,
  },
  {
    label: "총 납입 원금 (운용수익 제외)",
    getValue: (v: Record<string, number>) => Math.round(v.annual * 10000 / 12) * v.years,
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원`,
  },
  {
    label: "단리 기준 운용수익 포함 예상액",
    getValue: (v: Record<string, number>) => {
      const annual = Math.round(v.annual * 10000 / 12);
      const principal = annual * v.years;
      const avgHoldingYears = v.years / 2;
      const interest = principal * (v.rate / 100) * avgHoldingYears;
      return Math.round(principal + interest);
    },
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원`,
  },
];

const DOCS = [
  { name: "운용 지시서 (상품 선택·변경)", required: true, where: "금융기관(은행·증권사·보험사) 앱 또는 창구" },
  { name: "IRP 계좌 (퇴직금 이전 수령용)", required: true, where: "은행·증권사·보험사 신규 개설" },
  { name: "근로계약서 또는 퇴직연금 가입 확인서", required: true, where: "회사 인사팀" },
  { name: "퇴직 확인서 (퇴직 시 제출)", required: false, where: "회사 인사팀 발급" },
];

const STEPS = [
  {
    title: "적립 금융기관 체크",
    desc: "회사 인사팀에 DC형 퇴직연금을 운용 중인 금융기관(은행·증권사·보험사)을 물어봐요. 해당 기관 앱에 로그인하면 현재 적립 잔액과 운용 상품 목록을 바로 볼 수 있죠.",
    tip: "인사팀에 '퇴직연금 운용 기관명과 계좌번호'를 요청해봐요",
  },
  {
    title: "운용 지시 선택",
    desc: "적립된 원금을 어떤 상품으로 운용할지 직접 결정해요. 원리금보장형(정기예금·ELB)과 실적배당형(ETF·TDF·펀드) 중 고를 수 있고요. 운용 지시를 하지 않으면 기본형(원리금보장) 상품으로 자동 배정돼요.",
    tip: "TDF(타깃데이트펀드)는 퇴직 시점이 가까울수록 자동으로 안전자산 비중이 높아지는 상품이에요",
  },
  {
    title: "퇴직 시 IRP 계좌로 이전",
    desc: "퇴직하면 DC형 계좌 전액이 본인 IRP 계좌로 자동 이전돼요. IRP 계좌가 없으면 퇴직 처리가 지연되니, 퇴직 전에 미리 개설해두는 게 좋죠. 이전된 금액은 IRP 계좌 안에서 계속 운용돼요.",
    tip: "IRP 계좌는 은행·증권사·보험사 어디서든 개설 가능해요. 수수료가 낮은 곳을 고르는 게 유리해요",
  },
  {
    title: "일시금 또는 연금 수령",
    desc: "IRP 잔액을 일시금으로 인출하면 퇴직소득세가 원천징수돼요. 55세 이후 연금으로 10년 이상 나눠 받으면 퇴직소득세의 30%(10년 초과 시 40%)를 줄일 수 있죠. 55세 이전 인출은 기타소득세 16.5%가 적용돼서 불리해요.",
    tip: "연금 수령 기간이 길수록 절세 효과가 커요",
  },
];

const CHECKLIST = [
  "DC형 여부 체크: 인사팀에 퇴직연금 제도 방식(DB/DC) 문의",
  "연간 납입 체크: 연봉 ÷ 12 이상이 실제로 납입됐는지 살펴봐요",
  "운용 지시: 원리금보장형 vs 실적배당형 선택 (방치 금지)",
  "IRP 계좌 사전 개설: 퇴직 직전 아닌 재직 중에 미리 만들기",
  "수령 방식 결정: 연금(55세 이후 10년 이상) vs 일시금 비교",
  "미납 여부 점검: 중도 퇴직·휴직 기간 납입 공백 살펴봐요",
];

const FAQS = [
  {
    q: "DC형과 DB형 중 어느 게 퇴직금이 더 많이 나오나요?",
    a: "임금 인상률이 높을수록 DB형이 유리해요. DC형은 운용 수익을 직접 가져가기 때문에 ETF 수익률이 임금 인상률보다 높으면 DC형이 더 많아질 수 있죠. 임금이 정체된 직장이라면 DC형을 적극 운용하는 게 유리한 경우가 많아요.",
  },
  {
    q: "회사가 납입 의무를 안 지키면 어떻게 해야 하나요?",
    a: "근로자퇴직급여보장법 제20조에 따라 사업주는 매년 연봉의 1/12 이상을 납입할 법적 의무가 있죠. 미납이 확인되면 고용노동부(1350)에 신고할 수 있고, 회사는 과태료 대상이 되죠. 미납 금액은 퇴직 시 추가 청구도 가능해요.",
  },
  {
    q: "운용 지시를 한 번도 안 했는데 괜찮나요?",
    a: "운용 지시를 하지 않으면 기본 원리금보장형 상품으로 자동 배정돼요. 원금 손실 위험은 없지만 수익률이 낮아 물가상승률에 못 미칠 수 있죠. 지금이라도 금융기관 앱에서 운용 지시를 바꿀 수 있고요.",
  },
  {
    q: "DC형은 중도 인출(중간정산)이 되나요?",
    a: "법정 사유에 해당할 때만 가능해요. 무주택자의 주택 구입, 주거 목적 전세 보증금, 본인·부양가족 의료비(6개월 이상 요양), 천재지변 등이 인정되죠. 중도 인출 시 퇴직소득세가 원천징수되고, 인출 후 해당 금액은 운용에서 빠져요.",
  },
  {
    q: "퇴직 후 DC형 잔액이 IRP로 이전됐는데, 바로 인출해도 되나요?",
    a: "가능해요. 다만 퇴직소득세가 원천징수돼요. 55세 이전에 인출하면 기타소득세 16.5%가 추가로 붙어서 손해죠. 여유가 있다면 55세 이후 연금으로 나눠 받는 방식이 세금을 30~40% 줄여줘요.",
  },
  {
    q: "DC형 적립금을 ETF로 운용하다가 손실이 나면 어떻게 되나요?",
    a: "DC형은 운용 손익이 전부 근로자 본인에게 귀속돼요. 손실이 나면 수령액이 원금보다 줄어들 수 있죠. DB형은 회사가 리스크를 부담하지만, DC형은 근로자가 직접 감당해요. 퇴직이 가까울수록 안전자산 비중을 높이는 게 좋아요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "근로자퇴직급여보장법 제20조: 확정기여형 사용자 부담금", url: "https://www.law.go.kr/법령/근로자퇴직급여보장법" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "고용노동부: 퇴직연금 제도 안내", url: "https://www.moel.go.kr" },
      { label: "금융감독원: 퇴직연금 비교 공시", url: "https://www.fss.or.kr" },
      { label: "금융감독원 통합연금포털: DC형 적립금 조회", url: "https://100lifeplan.fss.or.kr" },
    ],
  },
];

const RELATED = [
  { slug: "퇴직금-제도-종류", title: "퇴직금 제도 종류 DB형 vs DC형 비교", description: "어느 방식이 나에게 유리한지 한눈에 비교해요." },
  { slug: "db형-퇴직금-수령방법", title: "DB형 퇴직금 수령 방법", description: "확정급여형 수령 절차와 세금 계산." },
  { slug: "퇴직금-IRP-수령방법", title: "IRP 퇴직금 수령 방법", description: "일시금·연금 선택과 절세 전략." },
];

// ─── 페이지 ──────────────────────────────────────────

export default function Page() {
  return (
    <ArticleLayout
      sidebar={<Sidebar heading="퇴직금 가이드" items={퇴직금_SIDEBAR} highlightSlugs={퇴직금_HIGHLIGHT} currentSlug="퇴직금-DC형-계산법" />}
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>퇴직금 · DC형 퇴직연금 · 계산법</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        DC형 퇴직연금, 퇴직하면 얼마를 받나요?<br />
        납입 원금부터 운용수익 계산 방법까지
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        DC형(확정기여형) 퇴직연금은 회사가 매년 연봉의 1/12을 내 IRP 계좌에 넣고, 내가 직접 그 돈을 운용하는 방식이에요.
        퇴직 시 받는 금액은 납입 원금과 운용 수익의 합계라서, 어떤 상품을 골랐느냐에 따라 최종 수령액이 달라지죠.
        <a href="https://www.law.go.kr/법령/근로자퇴직급여보장법" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로자퇴직급여보장법 제20조</a>에 따라 사업주는 매년 연봉의 1/12 이상을 납입할 법적 의무가 있죠.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>DC형 퇴직연금, 내가 해당하나요?</H2>
      <p style={body}>
        DC형은 회사가 제도를 선택하고, 근로자 개인 IRP 계좌에 매년 납입하는 방식이에요.
        같은 회사라도 DB형을 쓰는 곳이 있고 DC형을 쓰는 곳이 있어서, 먼저 인사팀에 물어보는 게 첫 번째죠.
      </p>
      <p style={body}>
        DB형(확정급여형)은 회사가 퇴직금 운용을 책임지고 최종 평균임금 기준으로 지급해요.
        반면 DC형은 근로자가 직접 운용하고, 수익도 손실도 본인 몫이고요.
        임금 인상폭이 낮거나 ETF 투자에 관심 있는 분들에게 DC형이 유리할 수 있죠.
      </p>

      <GreenBox>
        연봉 ÷ 12 = 연간 납입액 (법정 최소 기준)<br />
        예: 연봉 6,000만원 → 연 500만원 IRP 계좌에 납입<br />
        운용 수익은 전부 근로자 본인 몫 (손실도 본인 부담)
      </GreenBox>

      <SectionBadge>내 상황 체크</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="DC형 퇴직연금 적용 대상이에요. 아래 계산기로 예상 수령액을 직접 계산해봐요."
        partialMatchText="회사 퇴직연금 방식을 인사팀에 먼저 물어봐요. DB형일 수도 있죠."
      />

      <Divider />

      <H2>DC형 예상 수령액 계산 방법</H2>
      <p style={body}>
        연봉과 근속 기간, 예상 수익률을 입력하면 DC형 기준 납입 원금과 운용수익 포함 예상액이 나와요.
        실적배당형 상품의 수익률은 보장이 아닌 예측치라서 실제와 다를 수 있죠.
        금융감독원 통합연금포털에서 실제 적립 잔액을 조회하는 게 가장 정확해요.
      </p>

      <SectionBadge>DC형 예상 수령액 계산기</SectionBadge>
      <Calculator
        sliders={CALC_SLIDERS}
        results={CALC_RESULTS}
        note="※ 단리 기준 개략 계산. 실제 수익률은 상품·시장에 따라 달라져요. 운용수익 0% 설정 시 순수 원금만 표시돼요."
      />

      <CategoryButton label="퇴직금 정보" count={퇴직금_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />

      <Divider />

      <H2>운용 지시와 퇴직 시 필요한 서류</H2>
      <p style={body}>
        DC형 퇴직연금을 제대로 운용하려면 가입 금융기관 앱에서 운용 지시를 직접 해야 해요.
        퇴직 시에는 IRP 계좌로 잔액이 이전되기 때문에, 퇴직 전에 IRP 계좌를 미리 개설해두는 게 유리하죠.
      </p>

      <SectionBadge>준비 서류 목록</SectionBadge>
      <DocTable docs={DOCS} />

      <Divider />

      <H2>DC형 운용부터 수령까지 4단계</H2>
      <p style={body}>
        DC형 퇴직연금은 적립만 되고 그냥 두면 수익률이 낮아지죠.
        아래 절차대로 따라가면 납입 원금을 최대한 불리고, 퇴직 후 세금도 줄일 수 있죠.
      </p>

      <Steps steps={STEPS} />

      <Divider />

      <H2>놓치면 손해 보는 DC형 체크리스트</H2>
      <p style={body}>
        DC형은 근로자가 직접 챙겨야 할 것들이 많아요.
        운용 지시 누락, IRP 계좌 미개설, 납입 공백 등은 퇴직 후 수령액에 직접 영향을 주죠.
      </p>

      <SectionBadge>체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <GreenBox>
        퇴직 직전 3개월 평균임금 × 근속연수가 DC형 잔액보다 크다면 DB형이 유리해요.
        반대로 ETF 수익률이 임금 인상률보다 높게 쌓였다면 DC형이 유리하고요.
        <a href="/w/퇴직금-제도-종류" style={{ color: "#1D9E75", textDecoration: "underline" }}>퇴직금 제도 종류 비교</a>에서 더 자세히 볼 수 있죠.
      </GreenBox>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        DC형 퇴직연금 계산법과 수령 방식에 대해 가장 많이 나오는 질문들이에요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 근로자퇴직급여보장법을 바탕으로 작성됐어요. 운용 상품별 수익률은 보장되지 않으며, 최신 제도 기준은 고용노동부(1350)에서 살펴봐요." />
    </ArticleLayout>
  );
}
