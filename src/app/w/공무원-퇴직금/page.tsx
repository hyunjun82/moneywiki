"use client";
import { H2, SectionBadge, GreenBox, BorderBox, Divider, body, Calculator, EligibilityChecker, Steps, DocTable, Checklist, FAQ, References, Disclaimer, ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd } from "@/components/article-ui";
import { 퇴직금_SIDEBAR } from "@/data/퇴직금-guide";

const CALC_SLIDERS = [
  { key: "salary", label: "기준소득월액", min: 300, max: 800, step: 10, defaultValue: 400, format: (v: number) => `${v}만원` },
  { key: "years", label: "재직 기간", min: 5, max: 35, step: 1, defaultValue: 20, format: (v: number) => `${v}년` },
];

const CALC_RESULTS = [
  {
    key: "result1",
    label: "퇴직일시금 추정",
    highlight: true,
    getValue: (v: Record<string, number>) => Math.round(v.salary * 10000 * v.years * 0.5),
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원`,
  },
  {
    key: "result2",
    label: "월 퇴직연금 추정",
    getValue: (v: Record<string, number>) => Math.round(v.salary * 10000 * v.years * 0.018),
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원/월`,
  },
];

const DOCS = [
  { name: "공무원증 또는 재직증명서", required: true, issuer: "소속기관" },
  { name: "퇴직급여청구서", required: true, issuer: "공무원연금공단" },
  { name: "기준소득확인서", required: true, issuer: "공무원연금공단" },
  { name: "통장사본", required: true, issuer: "본인" },
];

const STEPS_DATA = [
  {
    title: "공무원연금공단 퇴직 신고",
    desc: "퇴직 후 소속기관을 통해 공무원연금공단에 신고해요.",
    tip: "자동으로 신고되는 기관이 많아요",
  },
  {
    title: "퇴직급여 선택",
    desc: "10년 이상 재직이면 연금 또는 일시금을 선택할 수 있어요.",
    tip: "연금이 장기적으로 유리한 경우가 많아요",
  },
  {
    title: "지급 신청",
    desc: "공무원연금공단 앱 또는 방문으로 신청해요.",
    tip: "geps.or.kr에서 온라인 신청 가능해요",
  },
  {
    title: "수령",
    desc: "신청 후 1~2개월 내 지급돼요.",
    tip: "퇴직일시금은 일반 계좌, 연금은 매월 지정 계좌로 입금돼요",
  },
];

const CHECK_ITEMS = [
  "5년 이상 재직했어요",
  "연금보다 일시금을 원해요",
  "퇴직 전 기준소득을 알고 싶어요",
  "유족연금도 확인하고 싶어요",
];

const CHECKLIST_ITEMS = [
  "재직기간 확인 — 5년 미만은 일시금만",
  "기준소득월액 확인 — 연금 계산 기준",
  "연금 vs 일시금 비교 — 장기 수령 시 연금 유리",
  "공무원연금공단 신고 — 소속기관 통해 자동 처리",
  "유족연금 — 사망 시 배우자에게 지급",
];

const FAQS = [
  {
    q: "공무원도 퇴직금을 받나요?",
    a: "받아요. 다만 근로기준법 퇴직금 대신 공무원연금법에 따른 퇴직급여를 받아요. 형태만 다를 뿐이에요.",
  },
  {
    q: "퇴직연금과 퇴직일시금 중 어떤 게 유리한가요?",
    a: "오래 살수록 연금이 유리해요. 80세까지 살면 연금이 일시금보다 수천만~수억 원 더 나올 수 있어요.",
  },
  {
    q: "5년 미만 재직한 공무원도 퇴직금이 있나요?",
    a: "있어요. 퇴직일시금으로 받을 수 있어요. 연금은 10년 이상 재직해야 받을 수 있어요.",
  },
  {
    q: "공무원 퇴직 후 민간기업에 취업하면 연금을 계속 받을 수 있나요?",
    a: "연금 수급 중 소득이 생기면 연금이 일부 감액될 수 있어요. 공무원연금공단에 문의해 정확한 금액을 확인하는 게 좋아요.",
  },
  {
    q: "퇴직금 외에 받을 수 있는 급여가 있나요?",
    a: "퇴직수당, 사망조위금, 부조금 등 부가 급여가 있어요. 공무원연금공단 홈페이지(geps.or.kr)에서 자세한 내용을 볼 수 있어요.",
  },
];

const REFERENCES = [
  { label: "공무원연금법", url: "https://www.law.go.kr/법령/공무원연금법" },
  { label: "공무원연금공단", url: "https://www.geps.or.kr" },
];

const RELATED = [
  { slug: "퇴직금-조건", title: "퇴직금 받을 수 있는 조건", desc: "1년·주 15시간 조건" },
  { slug: "퇴직금-수령방법", title: "퇴직금 수령 방법", desc: "일시금·연금 비교" },
  { slug: "퇴직금-제도-종류", title: "퇴직금 제도 종류 DB DC IRP", desc: "제도 비교" },
];

const currentSlug = "공무원-퇴직금";

export default function Page() {
  return (
    <ArticleLayout
      sidebar={<Sidebar data={퇴직금_SIDEBAR} currentSlug={currentSlug} />}
    >
      {/* 브레드크럼 + 타이틀 */}
      <div style={{ marginBottom: 8 }}>
        <span style={{ ...body.small, color: "#6B7280" }}>퇴직금 · 공무원 · 퇴직급여</span>
      </div>
      <h1 style={{ fontSize: 26, fontWeight: 800, lineHeight: 1.35, marginBottom: 6, color: "#111827" }}>
        공무원 퇴직금, 일반 직장인이랑 어떻게 다른가요?
      </h1>
      <p style={{ ...body.small, color: "#6B7280", marginBottom: 20 }}>퇴직급여 종류부터 수령 절차까지</p>

      {/* 인트로 */}
      <p style={{ ...body.base, marginBottom: 8 }}>
        공무원은 일반 퇴직금 대신 공무원연금법에 따른 퇴직급여를 받아요. 10년 이상 재직하면 연금과 일시금 중 선택할 수 있어요. 연금을 선택하면 평생 매월 받는 구조라 장기적으로는 훨씬 유리해요.
      </p>
      <p style={{ ...body.base, marginBottom: 24 }}>
        신청 창구는 공무원연금공단(<a href="https://www.geps.or.kr" target="_blank" rel="noopener noreferrer" style={{ color: "#1D9E75" }}>geps.or.kr</a>)이에요. 소속기관이 퇴직 신고를 대신 처리해 주는 경우가 많아서 직접 움직여야 할 일은 생각보다 적어요.
      </p>

      <Divider />

      {/* 섹션 1: 일반 퇴직금과 뭐가 다른가요 */}
      <H2>일반 퇴직금과 뭐가 다른가요</H2>
      <p style={{ ...body.base, marginBottom: 12 }}>
        일반 직장인은 <a href="/w/퇴직금-조건" style={{ color: "#1D9E75" }}>근로기준법 퇴직금</a>을 받아요. 1년 이상 일하면 30일치 평균임금을 연수에 곱해 받는 구조예요. 공무원은 달라요. <a href="https://www.law.go.kr/법령/공무원연금법" target="_blank" rel="noopener noreferrer" style={{ color: "#1D9E75" }}>공무원연금법</a>이 적용되기 때문에 계산 방식도, 받는 창구도 전혀 달라요.
      </p>
      <p style={{ ...body.base, marginBottom: 12 }}>
        가장 큰 차이는 '연금 선택권'이에요. 10년 이상 재직한 공무원은 퇴직 후 매월 연금을 받을지, 한 번에 일시금으로 받을지 직접 선택할 수 있어요. 일반 직장인에게는 없는 선택지죠.
      </p>
      <p style={{ ...body.base, marginBottom: 12 }}>
        재직 기간이 5년 미만이면 연금 선택권이 없어요. 퇴직일시금만 받을 수 있어요. 5년 이상 10년 미만도 마찬가지로 일시금만 가능해요.
      </p>

      <GreenBox>
        <strong>재직 기간별 수령 형태</strong>
        <ul style={{ marginTop: 8, paddingLeft: 18 }}>
          <li style={{ marginBottom: 4 }}>5년 미만: 퇴직일시금만 가능</li>
          <li style={{ marginBottom: 4 }}>5년 이상 ~ 10년 미만: 퇴직일시금만 가능</li>
          <li>10년 이상: 퇴직연금 또는 퇴직일시금 선택 가능</li>
        </ul>
      </GreenBox>

      <Divider />

      {/* 섹션 2: 퇴직급여 추정 계산기 */}
      <H2>퇴직급여 추정 계산기</H2>
      <p style={{ ...body.base, marginBottom: 12 }}>
        기준소득월액과 재직 기간을 입력하면 퇴직일시금과 월 퇴직연금 추정액을 볼 수 있어요. 기준소득월액은 연간 소득을 12로 나눈 금액이에요.
      </p>
      <p style={{ ...body.base, marginBottom: 16 }}>
        실제 금액은 가입 기간, 기여금 납부 이력, 공무원 종류 등에 따라 달라지기 때문에 정확한 수치는 공무원연금공단에서 직접 조회해야 해요.
      </p>

      <Calculator
        sliders={CALC_SLIDERS}
        results={CALC_RESULTS}
        note="※ 공무원연금법 기준 추정치. 실제 금액은 공무원연금공단에서 확인하세요."
      />

      <CategoryButton slug="퇴직금" label="퇴직금 가이드 전체 보기" />
      <RelatedArticles items={RELATED} />

      <Divider />

      {/* 섹션 3: 연금 vs 일시금, 뭘 선택해야 하나요 */}
      <H2>연금 vs 일시금, 뭘 선택해야 하나요</H2>
      <p style={{ ...body.base, marginBottom: 12 }}>
        퇴직 직후 목돈이 필요하다면 일시금이 맞아요. 하지만 건강하고 오래 살 가능성이 높다면 연금이 훨씬 유리해요. 예를 들어 기준소득 400만원, 재직 25년이면 월 약 180만원을 매월 받는데, 이걸 20년(80세 기준) 받으면 4억 3,200만원이에요. 같은 조건의 일시금은 약 5억원이지만 연금에는 물가 연동 조정이 붙어요.
      </p>
      <p style={{ ...body.base, marginBottom: 12 }}>
        연금 수급 중 소득이 생기면 일부 감액돼요. <a href="/w/퇴직금-수령방법" style={{ color: "#1D9E75" }}>퇴직금 수령 방법</a>을 비교할 때 이 점도 함께 봐야 해요. 민간기업 재취업 예정이라면 감액 폭을 미리 공무원연금공단에 문의하는 게 좋아요.
      </p>

      <BorderBox>
        <strong>연금 선택이 유리한 경우</strong>
        <ul style={{ marginTop: 8, paddingLeft: 18 }}>
          <li style={{ marginBottom: 4 }}>건강 상태가 좋고 가족력상 장수 가능성이 높을 때</li>
          <li style={{ marginBottom: 4 }}>퇴직 후 소득이 거의 없을 때 (감액 위험 낮음)</li>
          <li>배우자가 있고 유족연금까지 고려할 때</li>
        </ul>
      </BorderBox>

      <p style={{ ...body.base, marginTop: 16, marginBottom: 12 }}>
        유족연금은 공무원이 사망하면 배우자에게 지급돼요. 일시금을 선택하면 유족연금이 없기 때문에 가족 상황도 고려해야 해요. 퇴직 후에는 선택을 바꾸기 어렵기 때문에 신중하게 결정해야 해요.
      </p>

      <EligibilityChecker
        title="내 상황 확인하기"
        items={CHECK_ITEMS}
      />

      <Divider />

      {/* 섹션 4: 신청 방법과 필요 서류 */}
      <H2>신청 방법과 필요 서류</H2>
      <p style={{ ...body.base, marginBottom: 12 }}>
        공무원 퇴직급여는 소속기관이 퇴직 신고를 공무원연금공단에 전달하는 방식으로 시작돼요. 대부분의 기관에서 자동으로 처리해 주기 때문에 개인이 직접 신고할 일은 거의 없어요.
      </p>
      <p style={{ ...body.base, marginBottom: 16 }}>
        신고가 완료되면 퇴직급여 선택과 지급 신청을 본인이 직접 해야 해요. 공무원연금공단 앱이나 geps.or.kr에서 온라인으로 신청할 수 있어요.
      </p>

      <Steps items={STEPS_DATA} />

      <p style={{ ...body.base, marginTop: 16, marginBottom: 16 }}>
        신청 시 아래 서류가 필요해요. 공무원연금공단 앱을 통해 신청하면 일부 서류는 전자 제출로 대체할 수 있어요.
      </p>

      <DocTable items={DOCS} />

      <p style={{ ...body.base, marginTop: 16, marginBottom: 8 }}>
        서류 준비가 됐다면 아래 체크리스트로 빠진 항목이 없는지 확인해 봐요.
      </p>

      <Checklist items={CHECKLIST_ITEMS} />

      <ArticleAd />

      <Divider />

      {/* FAQ */}
      <H2>자주 묻는 질문</H2>
      <FAQ items={FAQS} />

      <Divider />

      {/* 출처 */}
      <References items={REFERENCES} />

      <Disclaimer />
    </ArticleLayout>
  );
}
