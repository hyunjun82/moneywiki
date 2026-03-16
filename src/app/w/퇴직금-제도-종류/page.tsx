"use client";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Calculator, EligibilityChecker, Steps, DocTable, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 퇴직금_SIDEBAR } from "@/data/퇴직금-guide";

const CHECK_ITEMS = [
  { id: "c1", label: "회사에서 DB형인지 DC형인지 선택하라고 했어요" },
  { id: "c2", label: "퇴직금과 퇴직연금의 차이를 모르겠어요" },
  { id: "c3", label: "어느 제도가 나한테 더 유리한지 알고 싶어요" },
  { id: "c4", label: "IRP가 뭔지, 어떻게 활용하는지 궁금해요" },
];

const CALC_SLIDERS = [
  { id: "salary", label: "현재 월 기본급", min: 200, max: 600, step: 50, defaultValue: 300, format: (v: number) => `${v}만원` },
  { id: "years", label: "예상 근속 기간", min: 1, max: 30, step: 1, defaultValue: 10, format: (v: number) => `${v}년` },
];

const CALC_RESULTS = [
  {
    label: "DB형 퇴직급여 (퇴직 시점 임금 기준)",
    getValue: (v: Record<string, number>) => v.salary * 10000 * v.years,
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원`,
    highlight: true,
  },
  {
    label: "DC형 적립 원금 (현재 임금 기준)",
    getValue: (v: Record<string, number>) => v.salary * 10000 * v.years,
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원 (운용수익 별도)`,
  },
];

const DOCS = [
  { name: "퇴직연금 규약 (회사 퇴직연금 제도 확인)", required: true, where: "회사 인사팀 또는 퇴직연금 금융기관" },
  { name: "퇴직연금 적립금 확인서", required: false, where: "금융기관 앱 또는 방문" },
  { name: "IRP 계좌 개설 서류", required: false, where: "은행·증권사" },
  { name: "퇴직급여 수급 신청서 (퇴직 시)", required: true, where: "금융기관 또는 회사 인사팀" },
];

const STEPS = [
  {
    title: "우리 회사 퇴직급여 제도 확인",
    desc: "퇴직금(법정 퇴직금), DB형(확정급여형), DC형(확정기여형) 중 어느 제도인지 인사팀에 확인해요. 중소기업은 법정 퇴직금, 대기업·중견기업은 DB형·DC형이 많아요. 제도에 따라 적립 방식과 수령 방법이 달라요.",
    tip: "인사팀에 '우리 회사 퇴직급여 유형'을 물어보세요",
  },
  {
    title: "DB형 vs DC형 장단점 비교",
    desc: "DB형은 퇴직 시점 임금 기준으로 계산해서, 임금 인상률이 높으면 유리해요. DC형은 매년 연봉의 1/12이 적립되고 본인이 운용해요. 임금 인상이 낮거나 ETF 투자로 수익을 올리면 DC형이 유리해요.",
    tip: "임금 인상률이 낮은 회사 = DC형 유리, 임금 인상률이 높은 회사 = DB형 유리",
  },
  {
    title: "IRP 계좌 개설 및 활용",
    desc: "IRP는 퇴직금 수령 계좌이면서 추가 납입도 가능한 계좌예요. 퇴직 시 퇴직금·퇴직연금이 자동으로 IRP로 이전돼요. 추가 납입하면 연 900만원 한도로 세액공제(16.5%)를 받을 수 있어요.",
    tip: "수수료가 낮은 증권사 IRP가 유리해요 (연 0.2~0.3%)",
  },
  {
    title: "퇴직 시 수령 방법 선택",
    desc: "IRP에서 일시금으로 인출하거나 연금으로 나눠 받을 수 있어요. 55세 이후 연금으로 10년 이상 수령하면 퇴직소득세의 30%를 절감해요. 일시금 인출 시에는 퇴직소득세를 전액 납부해요.",
    tip: "연금 수령을 선택하면 절세+노후 소득 두 가지 효과",
  },
];

const CHECKLIST = [
  "우리 회사 제도 확인 — 법정퇴직금·DB형·DC형",
  "DB형 = 퇴직 시점 임금 기준, DC형 = 매년 연봉÷12 적립",
  "IRP 계좌 — 수령 + 세액공제 이중 활용",
  "연금 수령 — 10년 이상 시 퇴직소득세 30% 절감",
  "수수료 비교 — 증권사 IRP 연 0.2~0.3%",
];

const FAQS = [
  {
    q: "퇴직금과 퇴직연금은 뭐가 다른가요?",
    a: "퇴직금은 회사가 보유하다가 퇴직 시 지급하는 방식이에요. 퇴직연금(DB형·DC형)은 금융기관에 미리 적립해두는 방식이에요. 회사가 망해도 퇴직연금은 금융기관에 있어서 더 안전해요.",
  },
  {
    q: "DB형과 DC형 중 어느 게 더 좋나요?",
    a: "회사마다 달라요. 임금 인상이 꾸준히 높다면 DB형이 유리해요. 임금 인상이 낮거나 직접 ETF 운용에 자신 있다면 DC형이 유리해요. 본인 상황에 맞게 선택하는 게 좋아요.",
  },
  {
    q: "DC형이면 회사가 퇴직금을 안 주나요?",
    a: "DC형은 회사가 매년 연봉의 1/12을 IRP(퇴직연금 계좌)에 적립해요. 퇴직 시 그 계좌 잔액이 퇴직급여예요. 회사가 퇴직 시 따로 지급하는 게 아니에요.",
  },
  {
    q: "IRP 계좌가 없으면 퇴직금을 못 받나요?",
    a: "퇴직금 300만원 초과 시 IRP 계좌로만 수령 가능해요. IRP 계좌를 미리 만들어두지 않으면 지급이 지연될 수 있어요. 퇴직 전에 미리 개설해두는 게 좋아요.",
  },
  {
    q: "IRP 세액공제는 얼마나 받을 수 있나요?",
    a: "IRP + 연금저축 합산 연 900만원까지 납입분에 대해 세액공제를 받아요. 소득 5,500만원 이하면 16.5%, 초과면 13.2%예요. 연 300만원 납입 시 약 49만원 환급이에요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "근로자퇴직급여보장법 — DB형·DC형 제도 구분", url: "https://www.law.go.kr/법령/근로자퇴직급여보장법" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "고용노동부 — 퇴직연금 제도 비교 안내", url: "https://www.moel.go.kr" },
      { label: "금융감독원 — 퇴직연금 비교공시", url: "https://www.fss.or.kr" },
    ],
  },
];

const RELATED = [
  { slug: "퇴직금-DC형-계산법", title: "DC형 퇴직연금 계산 방법", description: "DC형 적립 구조와 수령 절차." },
  { slug: "db형-퇴직금-수령방법", title: "DB형 퇴직금 수령 방법", description: "DB형 적립 구조와 수령 절차." },
  { slug: "퇴직금-IRP-계좌", title: "IRP 계좌 개설 방법", description: "은행·증권사 비교와 개설 절차." },
];

export default function Page() {
  const currentSlug = "퇴직금-제도-종류";

  return (
    <ArticleLayout
      sidebar={
        <Sidebar
          items={퇴직금_SIDEBAR}
          currentSlug={currentSlug}
        />
      }
    >
      {/* Breadcrumb */}
      <p style={{ fontSize: 13, color: "#6b7280", marginBottom: 8 }}>
        퇴직금 · 제도 · DB·DC·IRP
      </p>

      {/* H1 */}
      <h1 style={{ fontSize: 28, fontWeight: 700, lineHeight: 1.35, marginBottom: 8, color: "#111827" }}>
        퇴직금, 퇴직연금, IRP — 뭐가 다른가요?
        <br />
        <span style={{ fontSize: 18, fontWeight: 500, color: "#374151" }}>
          DB형·DC형 비교부터 내게 유리한 제도 선택까지
        </span>
      </h1>

      {/* Intro */}
      <p style={{ ...body, marginBottom: 12 }}>
        회사에 입사하거나 이직할 때 "DB형으로 할지, DC형으로 할지 선택하세요"라는 말을 들어본 적 있죠? 퇴직금, 퇴직연금, IRP — 이름은 비슷한데 뭐가 다른지 헷갈리는 분이 정말 많아요. 제도를 잘 모르고 선택하면 수백만원 차이가 날 수 있어요.
      </p>
      <p style={{ ...body, marginBottom: 12 }}>
        퇴직급여 제도는 크게 세 가지예요. 법정 퇴직금(회사가 직접 보유), DB형 퇴직연금(확정급여형, 금융기관 적립), DC형 퇴직연금(확정기여형, 매년 연봉÷12 적립)이에요. 여기에 IRP(개인형 퇴직연금)가 수령 창구이자 절세 도구로 연결돼요. 각 제도의 핵심 차이와 나에게 맞는 선택 방법을 아래에서 정리했어요.
      </p>

      {/* 해당 사항 체크 */}
      <SectionBadge text="해당 사항 체크" />
      <EligibilityChecker items={CHECK_ITEMS} />

      <ArticleAd position="intro" />

      <Divider />

      {/* H2-1 */}
      <H2>세 가지 제도, 어떻게 다른가요?</H2>
      <p style={{ ...body, marginBottom: 12 }}>
        법정 퇴직금은 회사가 퇴직금을 사내에 쌓아두다가 퇴직 시 지급하는 방식이에요. 회사가 도산하면 못 받을 위험이 있어요. 퇴직연금(DB형·DC형)은 외부 금융기관(은행·증권사)에 적립해두는 방식이라, 회사가 망해도 내 돈은 안전하게 보호돼요.
      </p>
      <p style={{ ...body, marginBottom: 16 }}>
        DB형(확정급여형)은 퇴직 시점의 평균임금을 기준으로 퇴직급여를 계산해요. 임금이 오를수록 퇴직급여도 커지는 구조예요. DC형(확정기여형)은 회사가 매년 연봉의 1/12을 내 계좌에 넣어주고, 내가 직접 ETF나 펀드로 운용해요. 같은 원금이라도 운용 결과에 따라 수령액이 달라지죠.
      </p>
      <GreenBox>
        <p style={{ fontWeight: 600, marginBottom: 8 }}>세 가지 제도 한눈에 비교</p>
        <ul style={{ paddingLeft: 16, lineHeight: 2 }}>
          <li><strong>법정 퇴직금</strong> — 회사가 직접 보유 → 회사 도산 시 위험, 소규모 사업장에 많아요</li>
          <li><strong>DB형 (확정급여형)</strong> — 금융기관 적립, 퇴직 시점 임금 기준 계산 → 임금 인상 높으면 유리</li>
          <li><strong>DC형 (확정기여형)</strong> — 금융기관 적립, 매년 연봉÷12 → 본인 운용, 임금 인상 낮을수록 유리</li>
        </ul>
      </GreenBox>

      <Divider />

      {/* H2-2 */}
      <H2>DB형 vs DC형 예상 수령액 비교</H2>
      <p style={{ ...body, marginBottom: 12 }}>
        DB형과 DC형의 원금은 현재 임금 기준으로 보면 같아 보여요. 하지만 DB형은 퇴직 시점의 임금이 기준이라, 임금이 많이 오른다면 DB형 수령액이 더 커요. 반대로 DC형은 운용 수익을 더하면 원금보다 훨씬 많이 받을 수도 있어요.
      </p>
      <p style={{ ...body, marginBottom: 16 }}>
        아래 계산기는 현재 임금 기준으로 퇴직급여 원금을 확인하는 도구예요. DB형은 퇴직 시점까지 임금 인상분이 반영되고, DC형은 이 원금에 운용 수익이 더해지는 구조예요. 내 회사 임금 인상률과 투자 성향을 함께 고려해서 제도를 선택하세요.
      </p>
      <Calculator sliders={CALC_SLIDERS} results={CALC_RESULTS} />

      <ArticleAd position="mid" />

      <Divider />

      {/* H2-3 */}
      <H2>퇴직급여 수령에 필요한 서류</H2>
      <p style={{ ...body, marginBottom: 12 }}>
        퇴직급여를 받으려면 미리 준비해야 할 서류가 있어요. 가장 중요한 건 우리 회사가 어떤 제도를 운용하는지 확인하는 퇴직연금 규약이에요. 인사팀이나 퇴직연금을 맡긴 금융기관에 요청하면 받을 수 있어요.
      </p>
      <p style={{ ...body, marginBottom: 16 }}>
        퇴직 전에 <a href="/w/퇴직금-IRP-계좌" style={{ color: "#1D9E75" }}>IRP 계좌</a>를 미리 개설해두면 퇴직 당일 바로 퇴직급여가 이전돼요. IRP 계좌가 없으면 300만원 초과 퇴직금은 지급이 지연될 수 있어서, 퇴직 예정이라면 미리 개설해두세요.
      </p>
      <DocTable docs={DOCS} />

      <Divider />

      {/* H2-4 */}
      <H2>퇴직급여 제도 활용 4단계</H2>
      <p style={{ ...body, marginBottom: 12 }}>
        퇴직급여 제도를 제대로 활용하려면 입사 시점부터 퇴직 후 수령까지 4단계가 있어요. 각 단계에서 놓치는 포인트가 있으면 수백만원 손해로 이어져요. 지금 어느 단계에 있는지 먼저 파악해두세요.
      </p>
      <p style={{ ...body, marginBottom: 16 }}>
        특히 IRP 계좌는 퇴직 전에 반드시 개설해둬야 해요. 퇴직 당일 갑자기 만들려고 하면 영업일 기준 처리 지연이 생길 수 있어요. 수수료가 낮은 증권사 IRP를 미리 개설해두면 절세와 수수료 절감 두 가지를 챙길 수 있어요.
      </p>
      <Steps steps={STEPS} />

      <Divider />

      {/* H2-5 */}
      <H2>퇴직급여 제도 체크리스트</H2>
      <p style={{ ...body, marginBottom: 12 }}>
        지금까지 설명한 내용을 빠르게 점검할 수 있는 체크리스트예요. 특히 IRP 세액공제는 재직 중에도 납입할 수 있어서, 퇴직과 무관하게 절세 효과를 누릴 수 있어요. 연봉 5,500만원 이하라면 납입액의 16.5%를 돌려받아요.
      </p>
      <p style={{ ...body, marginBottom: 16 }}>
        체크리스트를 보면서 빠진 단계가 있는지 짚어보세요. 제도 확인부터 IRP 개설, 수령 방법 선택까지 미리 해두면 퇴직할 때 당황하지 않아요.
      </p>
      <Checklist items={CHECKLIST} />
      <GreenBox style={{ marginTop: 16 }}>
        <p style={{ fontWeight: 600, marginBottom: 4 }}>IRP 세액공제 최대 절세 금액</p>
        <p style={{ lineHeight: 1.7 }}>
          연 900만원 납입 × 16.5%(소득 5,500만원 이하) = <strong>최대 148.5만원 환급</strong>이에요.<br />
          소득 5,500만원 초과라면 13.2% 적용, <strong>최대 118.8만원</strong>이에요.<br />
          IRP와 연금저축을 합산한 한도예요 (<a href="/w/퇴직금-IRP-계좌" style={{ color: "#1D9E75" }}>IRP 계좌 활용법</a> 참고).
        </p>
      </GreenBox>

      <CategoryButton category="퇴직금" slug={currentSlug} />
      <RelatedArticles articles={RELATED} />

      <Divider />

      {/* H2-6 */}
      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 16 }}>
        퇴직급여 제도에서 가장 많이 헷갈리는 질문들을 모았어요. 용어가 비슷해서 혼동하기 쉬운 부분 위주로 정리했어요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References sources={REFERENCES} />
      <Disclaimer />
    </ArticleLayout>
  );
}
