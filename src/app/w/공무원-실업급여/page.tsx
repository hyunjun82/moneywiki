"use client";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body, Calculator,
  EligibilityChecker, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 실업급여_SIDEBAR } from "@/data/실업급여-guide";

// ─── 데이터 ──────────────────────────────────────────

const CHECK_ITEMS = [
  { id: "c1", label: "공무원연금에 가입돼 있어요 (또는 가입했었어요)" },
  { id: "c2", label: "10년 이상 재직했어요 (퇴직연금 선택 가능)" },
  { id: "c3", label: "비자발적으로 퇴직했어요 (면직, 명예퇴직 등)" },
  { id: "c4", label: "퇴직수당 수급 대상이에요 (1년 이상 재직)" },
];

const CHECKLIST = [
  "본인이 고용보험 가입 대상인지 고용24에서 피보험자격 이력 조회",
  "공무원연금공단(1588-4321)에 퇴직급여 예상액 문의",
  "퇴직 후 5년 이내에 퇴직급여 청구 (기한 엄수)",
  "필요 서류: 퇴직증명서, 신분증 사본, 통장 사본",
  "민간 전직 시 고용보험 가입 여부와 피보험기간 180일 확인",
];

const FAQS = [
  {
    q: "공무원 15년 일하고 명예퇴직했는데, 실업급여를 받을 수 있나요?",
    a: "받을 수 없어요. 공무원은 고용보험 적용 제외 대상이라 실업급여 자체가 불가하죠. 대신 공무원연금에서 퇴직급여와 명예퇴직수당을 받을 수 있어요.",
  },
  {
    q: "임기제공무원으로 일했는데, 저도 실업급여 대상이 아닌가요?",
    a: "유형에 따라 달라요. 일반임기제공무원은 공무원연금 적용이라 대상이 아니지만, 한시임기제나 시간선택제 중 일부는 고용보험 가입 대상일 수 있죠. 인사담당자에게 확인해보세요.",
  },
  {
    q: "공무원 퇴직 후 민간기업에서 일하다 퇴사하면 실업급여를 받을 수 있나요?",
    a: "받을 수 있어요. 민간기업에서 고용보험에 가입해서 피보험기간 180일 이상을 채우면 돼요. 다만 공무원 재직기간은 고용보험 가입기간에 포함되지 않죠.",
  },
  {
    q: "공무원연금 퇴직급여는 언제까지 청구해야 하나요?",
    a: "퇴직 후 5년 이내에 청구해야 해요. 기한을 넘기면 수령이 어려워질 수 있으니 퇴직하면 바로 공무원연금공단에 신청하는 게 좋아요.",
  },
  {
    q: "군인도 공무원처럼 실업급여를 못 받나요?",
    a: "네, 군인도 마찬가지예요. 군인연금법에 따라 별도의 퇴직급여 제도가 적용되죠. 고용보험 적용 제외 대상이라 실업급여를 청구할 수 없어요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "고용보험법 — 적용 제외 대상 (공무원 포함)", url: "https://www.law.go.kr/법령/고용보험법" },
      { label: "공무원연금법 — 퇴직급여·퇴직수당 규정", url: "https://www.law.go.kr/법령/공무원연금법" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "공무원연금공단 — 퇴직급여 안내·신청", url: "https://www.geps.or.kr" },
      { label: "고용24 — 피보험자격 이력 조회", url: "https://www.ei.go.kr" },
    ],
  },
];

const RELATED = [
  {
    slug: "교사-실업급여",
    title: "교사 실업급여",
    description: "사립학교 교사와 공립학교 교사의 실업급여 적용이 다르죠.",
  },
  {
    slug: "고용보험-적용-제외",
    title: "고용보험 적용 제외 근로자",
    description: "공무원 외에 고용보험이 적용되지 않는 근로자 유형을 정리했어요.",
  },
  {
    slug: "실업급여-65세",
    title: "실업급여 65세 이상 수급",
    description: "65세 이후에도 실업급여를 받을 수 있는 경우와 대안을 정리했어요.",
  },
];

// ─── 페이지 ──────────────────────────────────────────

export default function Page() {
  return (
    <ArticleLayout
      sidebar={
        <Sidebar
          heading="실업급여 가이드"
          items={실업급여_SIDEBAR}
          currentSlug="공무원-실업급여"
        />
      }
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>실업급여 · 고용보험 · 공무원연금</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        공무원 퇴직하면 실업급여?<br />
        퇴직급여 종류와 금액 비교
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        &ldquo;공무원으로 오래 일하다가 퇴직했는데, 민간 친구처럼 실업급여를 받을 수 있을까?&rdquo;<br />
        결론부터 말하면, <strong>정규직 공무원은 실업급여를 받을 수 없어요.</strong><br /><br />
        <a href="https://www.law.go.kr/법령/고용보험법" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용보험법</a>에서
        공무원을 적용 제외 대상으로 정하고 있죠.
        대신 <a href="https://www.law.go.kr/법령/공무원연금법" style={{ color: "#1D9E75", textDecoration: "underline" }}>공무원연금법</a>에 따라
        퇴직급여, 퇴직수당, 명예퇴직수당 등 별도의 제도로 보장받게 돼요.
        재직 10년 이상이면 퇴직연금을 월 수령으로 선택할 수도 있어요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      {/* 섹션 1 — 왜 공무원은 실업급여가 없는지 */}
      <H2>공무원 퇴직급여는 실업급여와 뭐가 다른가요?</H2>
      <p style={body}>
        고용보험법은 공무원을 <strong>적용 제외</strong> 대상으로 규정하고 있죠. 공무원은 애초에 고용보험에 가입하지 않기 때문에 실업급여(구직급여)를 청구할 수 없어요. 군인, 사립학교 교직원도 마찬가지예요. 각각 군인연금, 사학연금이라는 별도 제도가 적용되니까요.
      </p>
      <p style={body}>
        이유는 간단해요. 공무원에게는 이미 <strong>공무원연금</strong>이라는 독자적인 사회보장 체계가 마련돼 있죠. 재직 중에 연금 기여금을 내고, 퇴직할 때 퇴직급여를 받는 구조예요. 고용보험과 공무원연금을 이중으로 적용할 필요가 없다는 게 법의 취지이기도 하고요.
      </p>
      <p style={body}>
        그래서 공무원이 퇴직하면 고용센터가 아니라 <a href="https://www.geps.or.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>공무원연금공단</a>에 급여를 청구해야 해요. 관할 기관 자체가 달라요. 실업급여와 공무원연금은 제도의 목적은 비슷하지만 운영 체계가 완전히 분리돼 있죠.
      </p>

      <GreenBox title="한눈에 비교: 실업급여 vs 공무원연금">
        민간 근로자 → 고용보험 가입 → 퇴직 시 실업급여(구직급여)<br />
        공무원 → 공무원연금 가입 → 퇴직 시 퇴직급여·퇴직수당<br />
        군인 → 군인연금 가입 → 퇴직 시 퇴직급여<br />
        사학 교직원 → 사학연금 가입 → 퇴직 시 퇴직급여
      </GreenBox>

      <SectionBadge>내 상황에 해당되는지 체크해보세요</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="4가지 다 해당되네요. 공무원연금 퇴직급여와 퇴직수당을 모두 청구할 수 있어요. 공무원연금공단(1588-4321)에 바로 문의하세요."
        partialMatchText="일부만 해당돼요. 퇴직급여 수령 방식이 달라질 수 있으니 공무원연금공단에 상담해보세요."
      />

      <Divider />

      {/* 섹션 2 — 공무원이 퇴직하면 받는 급여 */}
      <H2>퇴직급여 종류별 금액은 얼마나 되나요?</H2>
      <p style={body}>
        공무원연금에서 지급하는 급여는 크게 세 가지예요. 첫 번째는 <strong>퇴직급여</strong>예요. 재직기간 10년 이상이면 퇴직연금(매월 수령)과 퇴직일시금 중 선택할 수 있죠. 10년 미만이면 퇴직일시금만 받게 돼요. 재직기간 1년당 평균보수월액의 약 1개월분 정도가 쌓인다고 보면 이해가 쉬워요.
      </p>
      <p style={body}>
        두 번째는 <strong>퇴직수당</strong>이에요. 퇴직할 때 일시금으로 한 번에 지급되죠. 재직연수에 비례해서 계산되기 때문에 오래 근무할수록 금액이 커져요. 퇴직급여와 별도로 받는 거라서 둘 다 청구해야 하고요.
      </p>
      <p style={body}>
        세 번째는 <strong>명예퇴직수당</strong>이에요. 20년 이상 재직한 공무원이 정년 전에 자진 퇴직하면 받을 수 있죠. 남은 근무예정연수에 월봉급액을 곱해서 계산하기 때문에 정년까지 남은 기간이 길수록 유리해요. 다만 모든 명예퇴직에 수당이 나오는 건 아니고, 기관별로 선발 기준이 달라요.
      </p>

      <BorderBox title="퇴직급여 수령 방식">
        재직 10년 이상 → 퇴직연금(월 수령) 또는 퇴직일시금 <strong>선택</strong><br />
        재직 10년 미만 → 퇴직일시금만 수령 가능<br />
        퇴직수당 → 재직연수에 따라 <strong>일시금</strong> 별도 지급<br />
        명예퇴직수당 → 20년 이상 재직 + 정년 전 자진 퇴직 시 추가 지급
      </BorderBox>

      <CategoryButton label="실업급여 정보" count={실업급여_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      {/* 섹션 3 — 임기제공무원 예외 */}
      <H2>임기제공무원의 퇴직급여 적용 기준</H2>
      <p style={body}>
        임기제공무원은 유형에 따라 적용되는 제도가 달라요. <strong>일반임기제공무원</strong>은 공무원연금 적용 대상이에요. 정규직 공무원과 동일하게 고용보험에 가입하지 않기 때문에 실업급여를 받을 수 없죠.
      </p>
      <p style={body}>
        그런데 <strong>한시임기제공무원</strong>이나 <strong>시간선택제임기제공무원</strong> 중 일부는 상황이 달라요. 임용 조건에 따라 고용보험 가입 대상이 될 수 있죠. 본인이 어떤 유형인지 모르겠다면 소속 기관 인사담당자에게 직접 확인하는 게 가장 정확해요.
      </p>
      <p style={body}>
        본인이 고용보험에 가입돼 있는지 확인하는 방법도 간단하죠. <a href="https://www.ei.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용24</a>에 접속해서 피보험자격 이력을 조회하면 바로 나와요. 고용보험에 가입돼 있고 피보험기간 180일 이상이면 실업급여를 신청할 수 있어요.
      </p>

      <GreenBox title="임기제공무원 유형별 적용">
        일반임기제공무원 → 공무원연금 적용 (실업급여 대상 아님)<br />
        한시임기제공무원 → 임용 조건에 따라 고용보험 가입 가능<br />
        시간선택제임기제공무원 → 임용 조건에 따라 고용보험 가입 가능<br />
        확인 방법 → 고용24 피보험자격 이력 조회
      </GreenBox>

      <SectionBadge>민간 전직 시 체크포인트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <Divider />

      {/* 섹션 4 — 민간 전직 후 실업급여 */}
      <H2>민간 전직 시 실업급여와 퇴직급여 비교</H2>
      <p style={body}>
        공무원을 그만두고 민간기업에 취업하면 그때부터 고용보험에 가입돼요. 이후 민간에서 일하다가 퇴직하면 실업급여를 받을 수 있죠. 핵심은 <strong>민간 근무 기간 동안 고용보험 피보험기간 180일 이상</strong>을 채워야 한다는 점이에요.
      </p>
      <p style={body}>
        여기서 주의할 게 하나 있어요. 공무원으로 근무한 기간은 고용보험 가입기간에 <strong>포함되지 않아요</strong>. 공무원 20년 경력이 있어도 민간에서 새로 180일을 쌓아야 하죠. 공무원 재직기간과 민간 고용보험 기간은 완전히 별개의 제도이기 때문이에요.
      </p>
      <p style={body}>
        그렇다면 민간에서 180일을 못 채우고 퇴직하면요? 안타깝지만 실업급여 수급자격이 안 돼요. 이 경우에는 이전 공무원연금 퇴직급여가 유일한 안전망이 되죠. 민간 전직을 계획하고 있다면 최소 6개월 이상 근무할 수 있는 일자리를 찾는 게 중요해요.
      </p>

      <Divider />

      {/* 섹션 5 — 퇴직급여 신청 방법 */}
      <H2>퇴직급여 금액 조회하고 신청하세요</H2>
      <p style={body}>
        <a href="https://www.geps.or.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>공무원연금공단 홈페이지</a>에서 온라인으로 퇴직급여를 청구할 수 있어요. 퇴직증명서, 신분증 사본, 통장 사본이 필요하죠. 서류를 미리 준비해두면 신청 과정이 훨씬 빨라져요.
      </p>
      <p style={body}>
        반드시 기억해야 할 게 <strong>청구 기한</strong>이에요. 퇴직 후 5년 이내에 청구해야 하죠. 기한을 넘기면 수령이 어려워질 수 있으니 퇴직하면 바로 신청하는 게 좋아요. 온라인 신청이 어려우면 전국에 있는 공무원연금공단 지사를 직접 방문해도 돼요.
      </p>
      <p style={body}>
        퇴직급여 예상액이 궁금하다면 공무원연금공단 콜센터(<strong>1588-4321</strong>)에 전화하세요. 재직기간, 급여 등급에 따른 예상 수령액을 안내받을 수 있죠. 퇴직 전에 미리 확인해두면 퇴직 후 자금 계획을 세우기 훨씬 수월해요.
      </p>

      <BorderBox title="공무원연금 문의처">
        공무원연금공단 콜센터: <strong>1588-4321</strong><br />
        온라인 신청: <a href="https://www.geps.or.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>geps.or.kr</a><br />
        방문 신청: 전국 공무원연금공단 지사
      </BorderBox>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        공무원 실업급여와 퇴직급여에 대해 실제로 많이 물어보는 내용만 골랐어요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 고용보험법과 공무원연금법을 바탕으로 작성됐어요. 임기제공무원의 고용보험 적용 여부는 임용 조건에 따라 다르니, 소속 기관 인사담당자나 공무원연금공단(1588-4321)에 확인하세요." />
    </ArticleLayout>
  );
}
