"use client";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Calculator, EligibilityChecker, Steps, DocTable, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 퇴직금_SIDEBAR } from "@/data/퇴직금-guide";

const CHECK_ITEMS = [
  { id: "c1", label: "현직 공무원이고 퇴직 예정이에요" },
  { id: "c2", label: "공무원연금에 10년 이상 가입했어요" },
  { id: "c3", label: "연금과 일시금 중 어떤 게 유리한지 모르겠어요" },
  { id: "c4", label: "퇴직급여 신청 방법을 모르겠어요" },
];

const CALC_SLIDERS = [
  { id: "salary", label: "기준소득월액", min: 200, max: 800, step: 10, defaultValue: 400, format: (v: number) => `${v}만원` },
  { id: "years", label: "재직 기간", min: 5, max: 35, step: 1, defaultValue: 20, format: (v: number) => `${v}년` },
];

const CALC_RESULTS = [
  {
    label: "퇴직일시금 추정",
    getValue: (v: Record<string, number>) => Math.round(v.salary * 10000 * v.years * 0.5),
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원`,
    highlight: true,
  },
  {
    label: "월 퇴직연금 추정",
    getValue: (v: Record<string, number>) => Math.round(v.salary * 10000 * v.years * 0.018),
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원/월`,
  },
];

const DOCS = [
  { name: "공무원증 또는 재직증명서", required: true, where: "소속기관" },
  { name: "퇴직급여청구서", required: true, where: "공무원연금공단 앱·geps.or.kr" },
  { name: "기준소득확인서", required: true, where: "공무원연금공단" },
  { name: "통장 사본", required: true, where: "본인 지참" },
];

const STEPS = [
  {
    title: "공무원연금공단 퇴직 신고",
    desc: "퇴직 후 소속기관을 통해 공무원연금공단에 신고해요. 대부분의 기관에서 자동으로 처리해주기 때문에 개인이 직접 움직일 일은 생각보다 적어요.",
    tip: "자동 신고 여부는 소속 인사팀에 미리 확인하세요",
  },
  {
    title: "퇴직급여 수령 방식 선택",
    desc: "10년 이상 재직이면 퇴직연금 또는 퇴직일시금 중 선택할 수 있어요. 오래 살수록 연금이 유리하고, 목돈이 필요하면 일시금을 선택하면 돼요. 선택 후 변경이 어려우니 신중하게 결정하세요.",
    tip: "연금이 장기적으로 유리한 경우가 많아요",
  },
  {
    title: "지급 신청",
    desc: "공무원연금공단 앱 또는 geps.or.kr에서 온라인으로 신청해요. 퇴직급여청구서, 기준소득확인서, 통장 사본을 준비하면 되죠. 방문 신청도 가능해요.",
    tip: "geps.or.kr에서 온라인 신청 가능해요",
  },
  {
    title: "수령",
    desc: "신청 후 1~2개월 안에 지급돼요. 퇴직일시금은 일반 계좌로, 연금은 매월 지정 계좌로 입금돼요. 연금 수급 중 소득이 생기면 일부 감액될 수 있으니 공단에 미리 확인하세요.",
    tip: "연금 수급 중 재취업하면 감액될 수 있어요",
  },
];

const CHECKLIST = [
  "재직기간 확인: 5년 미만은 일시금만, 10년 이상은 연금 선택 가능",
  "기준소득월액 확인: 연금·일시금 계산 기준",
  "연금 vs 일시금 비교: 장기 수령 시 연금 유리",
  "공무원연금공단 신고: 소속기관 통해 처리 여부 확인",
  "유족연금: 사망 시 배우자에게 지급 여부 확인",
];

const FAQS = [
  {
    q: "공무원도 퇴직금을 받나요?",
    a: "받아요. 다만 근로기준법 퇴직금 대신 공무원연금법에 따른 퇴직급여를 받아요. 형태만 다를 뿐이에요.",
  },
  {
    q: "퇴직연금과 퇴직일시금 중 어떤 게 유리한가요?",
    a: "오래 살수록 연금이 유리해요. 80세까지 살면 연금이 일시금보다 수천만~수억 원 더 나올 수 있어요. 건강 상태와 퇴직 후 소득 계획을 함께 고려하세요.",
  },
  {
    q: "5년 미만 재직한 공무원도 퇴직급여가 있나요?",
    a: "있어요. 퇴직일시금으로 받을 수 있어요. 연금은 10년 이상 재직해야 받을 수 있어요.",
  },
  {
    q: "공무원 퇴직 후 민간기업에 취업하면 연금을 계속 받을 수 있나요?",
    a: "연금 수급 중 소득이 생기면 연금이 일부 감액될 수 있어요. 감액 폭을 미리 공무원연금공단(1588-4321)에 문의하는 게 좋아요.",
  },
  {
    q: "퇴직급여 외에 받을 수 있는 급여가 있나요?",
    a: "퇴직수당, 사망조위금, 부조금 등 부가 급여가 있어요. 공무원연금공단 홈페이지(geps.or.kr)에서 자세한 내용을 볼 수 있어요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "공무원연금법", url: "https://www.law.go.kr/법령/공무원연금법" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "공무원연금공단", url: "https://www.geps.or.kr" },
    ],
  },
];

const RELATED = [
  { slug: "퇴직금-조건", title: "퇴직금 받을 수 있는 조건", description: "1년·주 15시간 조건 완전 정리" },
  { slug: "퇴직금-수령방법", title: "퇴직금 수령 방법", description: "일시금·IRP 수령 절차 안내" },
  { slug: "퇴직금-제도-종류", title: "퇴직금 제도 종류 DB DC IRP", description: "퇴직금 제도 비교 정리" },
];

export default function Page() {
  return (
    <ArticleLayout
      sidebar={<Sidebar heading="퇴직금 가이드" items={퇴직금_SIDEBAR} currentSlug="공무원-퇴직금" />}
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>퇴직금 · 공무원 · 퇴직급여</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        공무원 퇴직금, 일반 직장인이랑 어떻게 다른가요?<br />
        퇴직급여 종류부터 수령 절차까지
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        공무원은 일반 퇴직금 대신 <a href="https://www.law.go.kr/법령/공무원연금법" style={{ color: "#1D9E75", textDecoration: "underline" }}>공무원연금법</a>에 따른 퇴직급여를 받아요.
        10년 이상 재직하면 연금과 일시금 중 선택할 수 있고,
        연금을 선택하면 평생 매월 받는 구조라 장기적으로는 훨씬 유리해요.
        신청 창구는 공무원연금공단(geps.or.kr)이에요.
        재직 기간별 수령 형태, 계산 방법, 신청 절차를 순서대로 정리했어요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>공무원 퇴직급여, 일반 퇴직금과 뭐가 다른가요?</H2>
      <p style={body}>
        일반 직장인은 근로기준법 퇴직금을 받아요. 1년 이상 일하면 30일치 평균임금을 근속연수에 곱해 받는 구조죠.
        공무원은 공무원연금법이 적용되기 때문에 계산 방식도, 받는 창구도 전혀 달라요.
      </p>
      <p style={body}>
        가장 큰 차이는 연금 선택권이에요. 10년 이상 재직한 공무원은 퇴직 후 매월 연금을 받을지, 한 번에 일시금으로 받을지 직접 선택할 수 있어요.
        일반 직장인에게는 없는 선택지죠.
        5년 미만이면 연금 선택권이 없고, 퇴직일시금만 받을 수 있어요.
      </p>

      <GreenBox title="재직 기간별 수령 형태">
        5년 미만: 퇴직일시금만 가능<br />
        5년 이상~10년 미만: 퇴직일시금만 가능<br />
        10년 이상: 퇴직연금 또는 퇴직일시금 선택 가능
      </GreenBox>

      <SectionBadge>내 상황 체크해보세요</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="퇴직급여 신청 준비가 된 상태예요. 아래 계산기로 예상 금액을 먼저 확인해보세요."
        partialMatchText="추가 확인이 필요해요. 공무원연금공단(1588-4321)에 문의하세요."
      />

      <Divider />

      <H2>퇴직급여 추정 계산기</H2>
      <p style={body}>
        기준소득월액과 재직 기간을 입력하면 퇴직일시금과 월 퇴직연금 추정액을 볼 수 있어요.
        기준소득월액은 연간 소득을 12로 나눈 금액이에요.
      </p>
      <p style={body}>
        실제 금액은 가입 기간, 기여금 납부 이력, 공무원 종류 등에 따라 달라지기 때문에
        정확한 수치는 공무원연금공단에서 직접 조회해야 해요.
      </p>

      <SectionBadge>공무원 퇴직급여 계산기</SectionBadge>
      <Calculator
        sliders={CALC_SLIDERS}
        results={CALC_RESULTS}
        note="※ 공무원연금법 기준 추정치. 실제 금액은 공무원연금공단(geps.or.kr)에서 확인하세요."
      />

      <CategoryButton label="퇴직금 정보" count={퇴직금_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      <H2>퇴직급여 신청에 필요한 서류</H2>
      <p style={body}>
        소속기관이 퇴직 신고를 대신 처리해주는 경우가 많아요.
        신고가 완료되면 퇴직급여 선택과 지급 신청을 본인이 직접 해야 하죠.
        아래 서류를 미리 준비해두면 신청이 빠르게 진행돼요.
      </p>

      <SectionBadge>준비 서류 목록</SectionBadge>
      <DocTable docs={DOCS} />

      <BorderBox title="연금 선택이 유리한 경우">
        건강 상태가 좋고 가족력상 장수 가능성이 높을 때<br />
        퇴직 후 소득이 거의 없을 때(감액 위험 낮음)<br />
        배우자가 있고 유족연금까지 고려할 때
      </BorderBox>

      <Divider />

      <H2>퇴직급여 신청 절차 4단계</H2>
      <p style={body}>
        공무원 퇴직급여 신청은 소속기관 신고부터 시작해서 공무원연금공단 지급까지 4단계예요.
        연금과 일시금 선택은 2단계에서 하게 되는데, 선택 후 변경이 어려우니 신중하게 결정하세요.
      </p>

      <Steps steps={STEPS} />

      <Divider />

      <H2>퇴직 전 체크리스트</H2>
      <p style={body}>
        퇴직 전에 미리 챙겨두면 급여 수령이 훨씬 매끄러워져요.
        연금과 일시금 선택은 되돌리기 어렵기 때문에 충분히 비교하고 결정하세요.
      </p>

      <SectionBadge>준비 체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        공무원 퇴직금에 대해 실제로 자주 나오는 질문만 골랐어요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 공무원연금법을 바탕으로 작성됐어요. 제도 변경이 있을 수 있으니, 최신 기준은 공무원연금공단(1588-4321)에서 확인하세요." />
    </ArticleLayout>
  );
}
