"use client";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Calculator, EligibilityChecker, Steps, DocTable, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 퇴직금_SIDEBAR } from "@/data/퇴직금-guide";

// ─── 데이터 ──────────────────────────────────────────

const CHECK_ITEMS = [
  { id: "c1", label: "현직 공무원이고 퇴직 예정이에요" },
  { id: "c2", label: "공무원 신분으로 1년 이상 재직했어요" },
  { id: "c3", label: "공무원연금에 기여금을 납부해왔어요" },
  { id: "c4", label: "퇴직 후 퇴직급여(연금 또는 일시금)를 받으려 해요" },
];

const CALC_SLIDERS = [
  { id: "salary", label: "기준소득월액", min: 200, max: 800, step: 10, defaultValue: 400, format: (v: number) => `${v}만원` },
  { id: "years", label: "재직 기간", min: 5, max: 35, step: 1, defaultValue: 20, format: (v: number) => `${v}년` },
];

const CALC_RESULTS = [
  {
    label: "퇴직일시금 추정액",
    getValue: (v: Record<string, number>) => Math.round(v.salary * 10000 * v.years * 0.5),
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원`,
    highlight: true,
  },
  {
    label: "월 퇴직연금 추정액",
    getValue: (v: Record<string, number>) => Math.round(v.salary * 10000 * v.years * 0.018),
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원/월`,
  },
];

const DOCS = [
  { name: "퇴직급여청구서", required: true, where: "공무원연금공단 앱 또는 geps.or.kr" },
  { name: "신분증 (주민등록증 또는 운전면허증)", required: true, where: "본인 지참" },
  { name: "통장 사본 (본인 명의)", required: true, where: "은행 발급" },
  { name: "재직증명서 또는 경력증명서", required: true, where: "소속기관 인사부서" },
  { name: "기준소득확인서", required: false, where: "공무원연금공단 발급" },
];

const STEPS = [
  {
    title: "퇴직 신고 (소속기관 → 공무원연금공단)",
    desc: "퇴직 후 소속기관이 공무원연금공단에 자동으로 신고해요. 개인이 직접 신고할 필요는 없어요. 기관 인사팀에 자동 처리 여부를 미리 확인해두세요.",
    tip: "퇴직 예정이라면 인사팀에 퇴직 신고 일정을 미리 물어보세요",
  },
  {
    title: "연금 vs 일시금 선택",
    desc: "10년 이상 재직한 공무원은 퇴직연금(평생 매월 지급)과 퇴직일시금(한 번에 지급) 중 선택할 수 있어요. 건강 상태와 기대 수명, 퇴직 후 소득 계획을 종합해서 결정하세요. 선택 후 변경이 어렵기 때문에 신중해야 해요.",
    tip: "80세 이상 장수 가능성이 높다면 연금이 누적 금액 면에서 유리해요",
  },
  {
    title: "지급 신청",
    desc: "공무원연금공단 앱 또는 geps.or.kr에서 온라인으로 신청해요. 청구서, 신분증, 통장 사본을 준비해서 올리면 돼요. 방문 신청도 가능해요.",
    tip: "온라인 신청이 가장 빠르게 처리돼요",
    link: { label: "공무원연금공단 신청하기", href: "https://www.geps.or.kr" },
  },
  {
    title: "수령",
    desc: "신청 후 1~2개월 안에 지급돼요. 퇴직일시금은 일반 계좌로, 연금은 매월 지정 계좌로 입금돼요. 연금 수급 중 소득이 생기면 일부 감액될 수 있어요.",
    tip: "재취업 예정이라면 연금 감액 폭을 공단에 미리 문의하세요",
  },
];

const CHECKLIST = [
  "재직 기간 확인: 5년 미만은 일시금만 가능, 10년 이상은 연금 선택 가능",
  "기준소득월액 확인: 공무원연금공단 조회 서비스에서 직접 조회",
  "연금 vs 일시금 비교: 장기 수령 시 연금이 유리한 경우가 많아요",
  "소속기관 인사팀 확인: 퇴직 신고 자동 처리 여부 사전 확인",
  "유족연금 확인: 사망 시 배우자에게 지급 여부 확인",
  "재취업 계획 확인: 연금 수급 중 소득 발생 시 감액 폭 확인",
];

const FAQS = [
  {
    q: "공무원도 퇴직금을 받나요?",
    a: "받아요. 다만 일반 근로자의 퇴직금(근로자퇴직급여보장법)이 아니라 공무원연금법에 따른 퇴직급여를 받아요. 이름만 다를 뿐, 퇴직 시 받는 급여라는 점은 같아요.",
  },
  {
    q: "5년 미만 재직했을 때도 퇴직급여가 있나요?",
    a: "있어요. 재직 기간에 상관없이 퇴직일시금으로 받을 수 있어요. 연금은 10년 이상 재직해야 선택할 수 있어요.",
  },
  {
    q: "연금과 일시금 중 어떤 게 유리한가요?",
    a: "오래 살수록 연금이 유리해요. 건강 상태가 좋고 퇴직 후 다른 소득이 없다면 연금을 선택하는 게 일반적으로 더 유리해요. 반대로 목돈이 필요하거나 건강에 우려가 있다면 일시금도 고려할 수 있어요.",
  },
  {
    q: "퇴직 후 민간기업에 취업하면 연금을 계속 받을 수 있나요?",
    a: "받을 수 있지만 소득 수준에 따라 연금이 일부 감액돼요. 감액 폭은 소득과 연금 금액에 따라 달라지기 때문에 공무원연금공단(1588-4321)에 미리 문의하는 게 좋아요.",
  },
  {
    q: "퇴직급여 외에 받을 수 있는 급여가 있나요?",
    a: "퇴직수당, 사망조위금, 부조금 등 부가 급여가 있어요. 공무원연금공단 홈페이지(geps.or.kr)에서 급여 종류를 확인할 수 있어요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "공무원연금법: 퇴직급여 및 퇴직일시금", url: "https://www.law.go.kr/법령/공무원연금법" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "공무원연금공단: 퇴직급여 안내", url: "https://www.geps.or.kr" },
      { label: "인사혁신처: 공무원 퇴직 제도", url: "https://www.mpm.go.kr" },
    ],
  },
];

const RELATED = [
  { slug: "퇴직금-이란", title: "퇴직금이란 무엇인가요?", description: "일반 퇴직금 제도의 기본 개념 정리." },
  { slug: "퇴직금-제도-종류", title: "퇴직금 제도 종류 DB DC IRP", description: "일반 근로자 퇴직금 제도 비교." },
  { slug: "퇴직금-수령방법", title: "퇴직금 수령 방법", description: "일시금·IRP 이전 절차 안내." },
];

// ─── 페이지 ──────────────────────────────────────────

export default function Page() {
  return (
    <ArticleLayout
      sidebar={<Sidebar heading="퇴직금 가이드" items={퇴직금_SIDEBAR} currentSlug="공무원-퇴직금" />}
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>퇴직금 · 공무원 · 퇴직급여</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        공무원 퇴직금, 일반 직장인과 뭐가 다른가요?<br />
        퇴직급여 종류·계산법·수령 절차까지
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        공무원은 일반 퇴직금 대신 <a href="https://www.law.go.kr/법령/공무원연금법" style={{ color: "#1D9E75", textDecoration: "underline" }}>공무원연금법</a>에 따른 퇴직급여를 받아요.
        10년 이상 재직했다면 연금과 일시금 중 선택할 수 있고, 10년 미만이라도 퇴직일시금은 받을 수 있어요.
        신청 창구는 공무원연금공단(geps.or.kr)이에요.
        재직 기간별 수령 형태, 계산 방법, 신청 절차를 순서대로 정리했어요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>공무원 퇴직급여, 일반 퇴직금과 어떻게 다른가요?</H2>
      <p style={body}>
        일반 직장인은 근로자퇴직급여보장법에 따라 퇴직금을 받아요. 1년 이상 근무하면 30일치 평균임금을 근속연수에 곱해서 계산하죠.
        공무원은 공무원연금법이 적용되기 때문에 계산 방식도, 받는 창구도 달라요.
      </p>
      <p style={body}>
        가장 큰 차이는 연금 선택권이에요. 10년 이상 재직한 공무원은 매월 연금을 받을지, 한 번에 일시금으로 받을지 직접 선택할 수 있어요.
        5년 미만부터 10년 미만까지는 퇴직일시금만 가능해요.
      </p>

      <GreenBox title="재직 기간별 수령 형태">
        5년 미만: 퇴직일시금만 가능<br />
        5년 이상 ~ 10년 미만: 퇴직일시금만 가능<br />
        10년 이상: 퇴직연금(매월) 또는 퇴직일시금 선택 가능
      </GreenBox>

      <SectionBadge>내 상황 체크해보세요</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="공무원 퇴직급여 신청 준비가 된 상태예요. 아래 계산기로 예상 금액을 먼저 확인해보세요."
        partialMatchText="추가 확인이 필요해요. 공무원연금공단(1588-4321)에 문의하세요."
      />

      <Divider />

      <H2>퇴직급여 계산법, 얼마나 받을 수 있나요?</H2>
      <p style={body}>
        퇴직일시금은 기준소득월액 × 재직연수 × 일정 비율로 계산돼요.
        퇴직연금은 재직연수와 기준소득월액을 바탕으로 매월 지급 금액이 산정돼요.
        기준소득월액은 연간 소득을 12로 나눈 금액으로, 공무원연금공단에서 직접 조회할 수 있어요.
      </p>
      <p style={body}>
        아래 슬라이더로 기준소득월액과 재직 기간을 조정하면 추정치를 볼 수 있어요.
        실제 금액은 가입 이력, 기여금 납부 내역 등에 따라 달라지기 때문에 정확한 수치는 공무원연금공단에서 조회해야 해요.
      </p>

      <SectionBadge>공무원 퇴직급여 계산기</SectionBadge>
      <Calculator
        sliders={CALC_SLIDERS}
        results={CALC_RESULTS}
        note="※ 공무원연금법 기준 추정치. 실제 금액은 공무원연금공단(geps.or.kr)에서 정확하게 조회하세요."
      />

      <CategoryButton label="퇴직금 정보" count={퇴직금_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />

      <Divider />

      <H2>퇴직급여 신청에 필요한 서류</H2>
      <p style={body}>
        소속기관이 퇴직 신고를 대신 처리해주는 경우가 많아요.
        신고가 완료되면 퇴직급여 선택과 지급 신청은 본인이 직접 해야 해요.
        아래 서류를 미리 준비해두면 신청이 빠르게 처리돼요.
      </p>

      <SectionBadge>준비 서류 목록</SectionBadge>
      <DocTable docs={DOCS} />

      <BorderBox title="연금이 유리한 경우">
        건강 상태가 좋고 장수 가능성이 높을 때<br />
        퇴직 후 소득이 거의 없을 때 (감액 위험이 낮아요)<br />
        배우자가 있고 유족연금까지 고려할 때
      </BorderBox>

      <Divider />

      <H2>퇴직급여 신청 절차 4단계</H2>
      <p style={body}>
        소속기관 신고부터 수령까지 4단계예요.
        연금과 일시금 선택은 2단계에서 하게 되는데, 선택 후 변경이 어려우니 충분히 비교하고 결정하세요.
      </p>

      <Steps steps={STEPS} />

      <Divider />

      <H2>퇴직 전 챙겨야 할 것들</H2>
      <p style={body}>
        퇴직 전에 미리 챙겨두면 급여 수령이 훨씬 매끄러워져요.
        연금과 일시금은 한 번 선택하면 되돌리기 어렵기 때문에 충분히 비교하고 결정하세요.
      </p>

      <SectionBadge>준비 체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <GreenBox title="공무원연금 수급 중 재취업 시 주의사항">
        연금 수급 중 소득이 발생하면 연금이 일부 감액될 수 있어요.<br />
        감액 폭은 소득 수준에 따라 달라지기 때문에 공무원연금공단(1588-4321)에 미리 문의하세요.
      </GreenBox>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        공무원 퇴직급여에 대해 실제로 자주 나오는 질문만 골랐어요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 공무원연금법을 바탕으로 작성됐어요. 제도 변경이 있을 수 있으니, 최신 기준은 공무원연금공단(1588-4321)에서 확인하세요." />
    </ArticleLayout>
  );
}
