"use client";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Calculator, EligibilityChecker, Steps, DocTable, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 퇴직금_SIDEBAR } from "@/data/퇴직금-guide";

const currentSlug = "퇴직금-DC형-계산법";

const CHECK_ITEMS = [
  { id: "c1", label: "회사가 DC형(확정기여형) 퇴직연금을 운영해요" },
  { id: "c2", label: "매년 IRP에 얼마가 적립되는지 알고 싶어요" },
  { id: "c3", label: "DC형과 DB형 중 어느 게 유리한지 모르겠어요" },
  { id: "c4", label: "퇴직 시 IRP 잔액을 어떻게 받는지 궁금해요" },
];

const CALC_SLIDERS = [
  {
    id: "annual",
    label: "연봉 (세전)",
    min: 2400, max: 12000, step: 200, defaultValue: 5000,
    format: (v: number) => `${v.toLocaleString()}만원`,
  },
  {
    id: "years",
    label: "근속 기간",
    min: 1, max: 30, step: 1, defaultValue: 5,
    format: (v: number) => `${v}년`,
  },
];

const CALC_RESULTS = [
  {
    label: "DC형 연간 적립액 (연봉÷12)",
    getValue: (v: Record<string, number>) => Math.round(v.annual * 10000 / 12),
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원/년`,
    highlight: true,
  },
  {
    label: "DC형 총 적립 원금 (운용수익 제외)",
    getValue: (v: Record<string, number>) => Math.round(v.annual * 10000 / 12) * v.years,
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원`,
  },
];

const DOCS = [
  { name: "퇴직연금 적립금 확인서", required: true, where: "금융기관(은행·증권사) 앱 또는 방문" },
  { name: "근로계약서 (DC형 명시 여부)", required: true, where: "인사팀" },
  { name: "IRP 계좌 (퇴직금 수령용)", required: true, where: "은행·증권사" },
  { name: "퇴직 확인서", required: false, where: "회사 인사팀" },
];

const STEPS = [
  {
    title: "DC형 적립 금융기관 확인",
    desc: "회사가 어느 금융기관에 DC형 퇴직연금을 적립했는지 인사팀에 확인해요. 은행·증권사·보험사 중 하나예요. 해당 기관 앱에서 적립금 잔액을 실시간으로 조회할 수 있어요.",
    tip: "인사팀에 '퇴직연금 운용 기관'을 물어보세요",
  },
  {
    title: "적립금 잔액 조회",
    desc: "DC형 퇴직연금 계좌에는 회사가 매년 연봉의 1/12 이상을 적립해야 해요. 운용 수익이 붙으면 잔액이 더 늘어날 수 있어요. 원리금보장형(예금)이나 실적배당형(ETF·펀드)으로 운용돼요.",
    tip: "ETF 운용 중이라면 시장 변동에 따라 잔액이 달라질 수 있어요",
  },
  {
    title: "퇴직 시 IRP 계좌로 이전",
    desc: "퇴직하면 DC형 계좌 잔액 전액이 본인 IRP 계좌로 이전돼요. IRP에서 일시금 인출 시 퇴직소득세가 원천징수돼요. 연금으로 10년 이상 수령하면 퇴직소득세의 30%를 절감해요.",
    tip: "IRP 계좌를 퇴직 전에 미리 만들어두세요",
  },
  {
    title: "일시금 또는 연금 수령 선택",
    desc: "IRP 잔액을 일시금으로 인출할 수도 있고, 55세 이후 연금으로 수령할 수도 있어요. 연금으로 나눠 받으면 세금이 줄고, 노후 수입이 안정적으로 생겨요. 연금 수령 기간이 10년 이상이면 절세 효과가 최대예요.",
    tip: "55세 이전 인출 시 기타소득세 16.5% 부과",
  },
];

const CHECKLIST = [
  "DC형 적립 금융기관 확인 — 인사팀 문의",
  "연간 적립액 — 연봉 ÷ 12 이상인지 확인",
  "운용 방식 — 원리금보장형 vs 실적배당형",
  "IRP 계좌 — 퇴직 전 미리 개설",
  "연금 수령 선택 — 10년 이상 시 세금 30% 절감",
];

const FAQS = [
  {
    q: "DC형 퇴직연금 적립금은 내가 직접 운용하나요?",
    a: "맞아요. DC형은 근로자 본인이 운용 지시를 해요. 원리금보장형(예금), 실적배당형(ETF·펀드) 중 선택할 수 있어요. 운용 지시를 안 하면 기본 원리금보장형으로 배정돼요.",
  },
  {
    q: "DC형과 DB형 중 어느 게 퇴직금이 더 많나요?",
    a: "임금 인상률이 높을수록 DB형이 유리해요. DC형은 운용 수익을 직접 가져가서 ETF 투자 시 DB형보다 많아질 수 있어요. 임금 인상이 낮은 회사에서는 DC형이 유리한 경우도 많아요.",
  },
  {
    q: "회사가 적립 의무를 안 지키면 어떻게 되나요?",
    a: "매년 연봉의 1/12 이상을 적립해야 하는 법적 의무가 있어요. 미적립 시 고용노동부에 신고할 수 있고, 회사는 과태료 대상이 돼요. 미적립 금액은 퇴직 시 추가 지급받을 수 있어요.",
  },
  {
    q: "DC형 퇴직연금도 IRP로 받아야 하나요?",
    a: "맞아요. 퇴직 시 DC형 잔액 전체가 자동으로 IRP로 이전돼요. IRP에서 일시금 인출 또는 연금 수령을 선택할 수 있어요.",
  },
  {
    q: "중도 인출(중간정산)이 가능한가요?",
    a: "DC형은 법정 사유에 해당하면 중도 인출이 가능해요. 주택 구입, 요양, 천재지변 등이 법정 사유예요. 중도 인출 시 퇴직소득세가 원천징수돼요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "근로자퇴직급여보장법 제20조 — DC형 사용자 부담금", url: "https://www.law.go.kr/법령/근로자퇴직급여보장법" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "고용노동부 — 퇴직연금제도 안내", url: "https://www.moel.go.kr" },
      { label: "금융감독원 — 퇴직연금 비교 공시", url: "https://www.fss.or.kr" },
    ],
  },
];

const RELATED = [
  { slug: "db형-퇴직금-수령방법", title: "DB형 퇴직금 수령 방법", description: "DB형 퇴직연금 수령 절차와 차이점." },
  { slug: "퇴직금-IRP-계좌", title: "IRP 계좌 개설 방법", description: "은행·증권사 비교와 개설 절차." },
  { slug: "퇴직금-세금", title: "퇴직금 세금, 얼마나 떼나요?", description: "IRP 연금 절세 효과를 계산해요." },
];

export default function Page() {
  return (
    <ArticleLayout
      sidebar={<Sidebar items={퇴직금_SIDEBAR} currentSlug={currentSlug} />}
    >
      {/* 타이틀 */}
      <div style={{ marginBottom: 24 }}>
        <p style={{ ...body.badge, marginBottom: 8 }}>퇴직금 · DC형 · 퇴직연금</p>
        <h1 style={body.h1}>
          DC형 퇴직연금, 퇴직하면 얼마를 받나요?
          <br />
          <span style={body.h1sub}>적립 방식부터 수령까지, DB형과 비교도 해드려요</span>
        </h1>
      </div>

      {/* 인트로 */}
      <p style={body.prose}>
        DC형 퇴직연금은 회사가 매년 연봉의 1/12을 IRP 계좌에 적립하는 방식이에요. 근로자 본인이 직접 그 돈을 운용하고, 퇴직 시 잔액을 통째로 가져가는 구조예요. DB형처럼 회사가 최종 퇴직금을 책임지는 게 아니라, 운용 결과에 따라 받는 금액이 달라질 수 있어요.
      </p>
      <p style={body.prose}>
        어느 금융기관에 적립됐는지, 지금 잔액이 얼마인지, 퇴직 시 어떻게 수령하는지 — 아래에서 단계별로 풀어드릴게요. DC형과 DB형 중 어느 쪽이 유리한지 비교도 해드려요.
      </p>

      <ArticleAd position="intro" />

      <Divider />

      {/* 섹션 1: DC형 적립 구조 */}
      <H2>DC형 퇴직연금, 어떻게 쌓이나요?</H2>

      <p style={body.prose}>
        <a href="/w/퇴직금-제도-종류" style={body.link}>근로자퇴직급여보장법 제20조</a>에 따라, DC형을 운영하는 회사는 매년 근로자 연봉의 1/12 이상을 IRP 계좌에 납입해야 해요. 이 의무를 지키지 않으면 고용노동부 과태료 대상이 되고, 미납금은 퇴직 시 추가 지급 청구가 가능해요.
      </p>

      <GreenBox>
        DC형 연간 적립 공식<br />
        연봉 ÷ 12 = 연간 적립액 (최소 기준)<br />
        예: 연봉 6,000만원 → 연 500만원 적립<br />
        운용 수익 발생 시 잔액이 더 늘어요 (근로자 몫)
      </GreenBox>

      <p style={body.prose}>
        DB형은 퇴직 직전 3개월 평균 임금 기준으로 계산하지만, DC형은 재직 중 매년 쌓인 원금과 운용 수익이 합산돼요. 임금 인상이 크지 않거나 ETF·펀드로 적극 운용하는 경우, DC형이 DB형보다 유리하게 나올 수 있어요.
      </p>

      <BorderBox>
        <strong>DC형 vs DB형 핵심 비교</strong><br />
        · DC형: 연봉 ÷ 12 매년 적립, 근로자 운용, 운용 결과 근로자 책임<br />
        · DB형: 퇴직 직전 3개월 평균임금 × 근속연수, 회사 운용, 최종 금액 회사 보장<br />
        · 임금 인상률 높음 → DB형 유리 / 임금 인상 낮고 ETF 운용 → DC형 유리
      </BorderBox>

      <p style={body.prose}>
        DC형 계좌는 본인이 직접 운용 지시를 해야 해요. 지시를 안 하면 원리금보장형(예금)으로 자동 배정돼요. ETF나 펀드를 선택하면 수익이 더 날 수 있지만, 원금 손실 가능성도 있으니 본인 성향에 맞게 고르는 게 중요해요.
      </p>

      <Divider />

      {/* 섹션 2: 계산기 */}
      <H2>내 DC형 적립금 예상액 계산해보세요</H2>

      <p style={body.prose}>
        연봉과 근속 기간을 입력하면 DC형 기준 연간 적립액과 총 원금이 나와요. 운용 수익은 포함하지 않으니, 실제 잔액은 이보다 많거나 적을 수 있어요. 금융기관 앱에서 실시간 잔액을 조회하는 게 가장 정확해요.
      </p>

      <Calculator
        sliders={CALC_SLIDERS}
        results={CALC_RESULTS}
        note="※ 운용 수익 미포함 원금 기준 계산. 실제 잔액은 금융기관 앱에서 조회하세요."
      />

      <p style={body.prose}>
        근속 5년이면 연봉 5,000만원 기준으로 원금만 약 2,083만원이 쌓여요. 여기에 운용 수익이 더해지면 최종 수령액이 달라져요. ETF 운용 중이라면 시장 상황에 따라 이 금액보다 많이 받을 수도 있어요.
      </p>

      <CategoryButton href="/w/퇴직금" label="퇴직금 가이드 전체 보기" />

      <RelatedArticles items={RELATED} />

      <ArticleAd position="mid" />

      <Divider />

      {/* 섹션 3: 서류 */}
      <H2>퇴직 시 필요한 서류</H2>

      <p style={body.prose}>
        DC형 퇴직연금을 수령하려면 IRP 계좌가 먼저 있어야 해요. 퇴직 직전에 IRP 계좌를 열어두지 않으면 수령 절차가 지연될 수 있어요. 아래 서류들을 미리 챙겨두면 퇴직 처리가 훨씬 수월해요.
      </p>

      <DocTable docs={DOCS} />

      <p style={body.prose}>
        퇴직연금 적립금 확인서는 금융기관 앱이나 영업점 방문으로 바로 발급받을 수 있어요. 잔액과 운용 현황, 미납 여부 등을 한번에 볼 수 있어서 퇴직 전 꼭 확인해두는 게 좋아요.
      </p>

      <Divider />

      {/* 섹션 4: 수령 절차 */}
      <H2>DC형 퇴직금 수령 절차 4단계</H2>

      <p style={body.prose}>
        DC형 퇴직금은 퇴직 시 자동으로 IRP로 이전돼요. 이 흐름을 미리 알아두면 퇴직 후에 당황하지 않아요. 특히 IRP 계좌 개설 여부와 연금 수령 방식 선택은 세금에 직접 영향을 줘서 사전에 결정해두는 게 유리해요.
      </p>

      <Steps steps={STEPS} />

      <p style={body.prose}>
        IRP로 이전된 잔액은 55세 이전에 꺼내면 기타소득세 16.5%가 붙어요. 55세 이후 연금으로 나눠 받으면 <a href="/w/퇴직금-소득세" style={body.link}>퇴직소득세의 30%를 감면</a>받아요. 수령 기간이 10년을 넘으면 감면율이 40%까지 올라가요.
      </p>

      <Divider />

      {/* 섹션 5: 체크리스트 */}
      <H2>DC형 퇴직연금 체크리스트</H2>

      <p style={body.prose}>
        DC형 퇴직연금은 본인이 챙겨야 할 것들이 DB형보다 많아요. 운용 지시부터 수령 방식 선택까지, 아래 목록대로 하나씩 확인하면 손해 없이 마무리할 수 있어요.
      </p>

      <Checklist items={CHECKLIST} />

      <GreenBox>
        ETF 운용 시 DB형보다 많아질 수 있어요<br />
        임금 인상이 연 3% 미만이고 ETF 연수익이 5% 이상이라면, DC형 잔액이 DB형 기준 퇴직금보다 많아질 수 있어요. 퇴직 전 두 방식을 비교해보는 게 좋아요.
      </GreenBox>

      <p style={body.prose}>
        체크리스트 중 IRP 계좌 개설이 제일 먼저예요. 퇴직 당일에 급하게 만들려면 시간이 부족할 수 있거든요. 퇴직 한 달 전부터 준비해두면 수령 지연 없이 진행돼요.
      </p>

      <EligibilityChecker
        title="DC형 퇴직연금 해당 여부 확인"
        items={CHECK_ITEMS}
      />

      <Divider />

      {/* 섹션 6: FAQ */}
      <H2>자주 묻는 것들</H2>

      <p style={body.prose}>
        DC형 퇴직연금을 처음 접하는 분들이 헷갈려하는 부분들을 모았어요. 운용 방식, DB형 비교, IRP 수령까지 핵심만 골라서 답변해드릴게요.
      </p>

      <FAQ items={FAQS} />

      <References groups={REFERENCES} />

      <Disclaimer />
    </ArticleLayout>
  );
}
