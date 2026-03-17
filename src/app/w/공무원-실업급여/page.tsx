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
      { label: "고용보험법: 적용 제외 대상 (공무원 포함)", url: "https://www.law.go.kr/법령/고용보험법" },
      { label: "공무원연금법: 퇴직급여·퇴직수당 규정", url: "https://www.law.go.kr/법령/공무원연금법" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "공무원연금공단: 퇴직급여 안내·신청", url: "https://www.geps.or.kr" },
      { label: "고용24: 피보험자격 이력 조회", url: "https://www.ei.go.kr" },
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
        &ldquo;20년 넘게 공직에 있다가 퇴직했는데, 실업급여를 신청하려고 보니까 안 된다고요?&rdquo;
      </p>
      <p style={body}>
        맞아요. 정규직 공무원은 실업급여를 받을 수 없어요.
        <a href="https://www.law.go.kr/법령/고용보험법" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용보험법</a>이
        공무원을 적용 제외 대상으로 정해놨거든요.
        고용보험에 가입한 적이 없으니, 구직급여 자체를 청구할 수가 없는 거예요.
      </p>
      <p style={body}>
        그렇다고 아무것도 못 받는 건 아니에요.
        <a href="https://www.law.go.kr/법령/공무원연금법" style={{ color: "#1D9E75", textDecoration: "underline" }}>공무원연금법</a>에 따라
        퇴직급여, 퇴직수당, 명예퇴직수당까지 별도 제도로 보장되죠.
        재직 10년 이상이면 퇴직연금을 매달 받는 방식도 선택할 수 있고요.
        어떤 급여를 얼마나 받을 수 있는지, 아래에서 바로 정리해드릴게요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      {/* 섹션 1: 공무원 퇴직급여 vs 실업급여 */}
      <H2>공무원 퇴직급여는 실업급여와 뭐가 다른가요?</H2>
      <p style={body}>
        민간 근로자는 고용보험에 가입하고, 퇴직하면 고용센터에서 실업급여를 받아요.
        공무원은 고용보험 대신 <strong>공무원연금</strong>에 가입하죠.
        재직하는 동안 매달 기여금을 내고, 퇴직할 때 그 적립금을 기반으로 퇴직급여를 받는 구조예요.
      </p>
      <p style={body}>
        왜 이중으로 안 되냐고요? 공무원연금 자체가 실업급여 역할까지 포함한 독자적인 사회보장 체계이기 때문이에요.
        고용보험과 공무원연금을 동시에 적용할 필요가 없다는 게 법의 취지죠.
        군인은 군인연금, 사립학교 교직원은 사학연금이 적용되는데 같은 논리예요.
      </p>
      <p style={body}>
        그래서 퇴직 후 찾아가야 할 곳도 달라요.
        민간 근로자는 고용센터에 가지만, 공무원은 <a href="https://www.geps.or.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>공무원연금공단</a>에 급여를 청구해야 하죠.
        제도 목적은 비슷하지만 운영 체계가 완전히 분리돼 있다는 점, 꼭 기억해두세요.
      </p>

      <GreenBox title="제도별 비교">
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

      {/* 섹션 2: 퇴직급여 종류별 금액 */}
      <H2>퇴직급여 종류별 금액은 얼마나 되나요?</H2>
      <p style={body}>
        공무원연금에서 지급하는 퇴직급여는 세 가지예요.
        첫째, <strong>퇴직급여</strong>. 재직기간 10년 이상이면 퇴직연금(매달 수령)과 퇴직일시금 중 하나를 고를 수 있죠.
        10년이 안 되면 퇴직일시금만 받게 되죠.
        1년 재직할 때마다 평균보수월액의 약 1개월분이 쌓인다고 보면 감이 올 거예요.
      </p>
      <p style={body}>
        둘째, <strong>퇴직수당</strong>이에요.
        퇴직할 때 한 번에 일시금으로 받는 돈이죠.
        재직연수에 비례해서 계산되니까 오래 근무할수록 금액이 커져요.
        퇴직급여와 별개이기 때문에 둘 다 따로 청구해야 해요.
      </p>
      <p style={body}>
        셋째, <strong>명예퇴직수당</strong>이에요.
        20년 이상 재직한 공무원이 정년 전에 자진 퇴직하면 받을 수 있죠.
        남은 근무예정연수에 월봉급액을 곱해서 계산하기 때문에, 정년까지 많이 남았을수록 금액이 커져요.
        다만 기관별로 선발 기준이 다르기 때문에, 모든 명예퇴직에 수당이 나오는 건 아니에요.
      </p>

      <BorderBox title="수령 방식 정리">
        재직 10년 이상 → 퇴직연금(월 수령) 또는 퇴직일시금 <strong>선택</strong><br />
        재직 10년 미만 → 퇴직일시금만 수령 가능<br />
        퇴직수당 → 재직연수에 따라 <strong>일시금</strong> 별도 지급<br />
        명예퇴직수당 → 20년 이상 재직 + 정년 전 자진 퇴직 시 추가 지급
      </BorderBox>

      <CategoryButton label="실업급여 정보" count={실업급여_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      {/* 섹션 3: 임기제공무원 적용 기준 */}
      <H2>임기제공무원의 퇴직급여 적용 기준</H2>
      <p style={body}>
        &quot;저는 정규직 공무원이 아니라 임기제인데, 저도 실업급여가 안 되나요?&quot;
        유형에 따라 다르게 적용돼요.
        <strong>일반임기제공무원</strong>은 정규직 공무원과 동일하게 공무원연금에 가입하기 때문에 실업급여 대상이 아니에요.
      </p>
      <p style={body}>
        반면 <strong>한시임기제공무원</strong>이나 <strong>시간선택제임기제공무원</strong>은 상황이 다를 수 있죠.
        임용 조건에 따라 고용보험 가입 대상이 되는 경우가 있죠.
        본인이 어떤 유형인지 잘 모르겠다면 소속 기관 인사담당자에게 직접 물어보는 게 가장 빨라요.
      </p>
      <p style={body}>
        확인하는 방법은 간단해요.
        <a href="https://www.ei.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용24</a>에 접속해서 피보험자격 이력을 조회하면 고용보험 가입 여부가 바로 나와요.
        가입돼 있고 피보험기간 180일 이상이면 실업급여를 신청할 수 있죠. <a href="/w/실업급여-계산기" style={{ color: "#1D9E75", textDecoration: "underline" }}>실업급여 계산기</a>로 예상 수급액을 뽑아보면 좋고요.
        가입 이력 자체가 없다면 공무원연금 쪽에서 퇴직급여를 받는 게 맞아요.
      </p>

      <GreenBox title="유형별 적용 제도">
        일반임기제공무원 → 공무원연금 적용 (실업급여 대상 아님)<br />
        한시임기제공무원 → 임용 조건에 따라 고용보험 가입 가능<br />
        시간선택제임기제공무원 → 임용 조건에 따라 고용보험 가입 가능<br />
        확인 방법 → 고용24 피보험자격 이력 조회
      </GreenBox>

      <SectionBadge>민간 전직 시 체크포인트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <Divider />

      {/* 섹션 4: 민간 전직 시 비교 */}
      <H2>민간 전직 시 실업급여와 퇴직급여 비교</H2>
      <p style={body}>
        공무원을 그만두고 민간기업에 취업하면, 그때부터 고용보험에 가입돼요.
        민간에서 일하다가 퇴직하면 비로소 실업급여를 받을 수 있는 거죠.
        핵심 조건은 민간 근무 기간 동안 <a href="/w/실업급여-피보험기간" style={{ color: "#1D9E75", textDecoration: "underline" }}>피보험기간</a> <strong>180일 이상</strong>을 채우는 거예요.
      </p>
      <p style={body}>
        주의할 점이 하나 있죠. 공무원으로 일한 기간은 고용보험 가입기간에 <strong>포함되지 않아요</strong>.
        공무원 20년 경력이 있더라도 민간에서 새로 180일을 쌓아야 하죠.
        두 제도가 완전히 분리돼 있기 때문이에요. 이 부분을 모르고 있다가 당황하는 분이 꽤 많아요.
      </p>
      <p style={body}>
        민간에서 180일을 못 채우고 퇴직하면 어떻게 될까요?
        안타깝지만 실업급여 수급자격이 안 돼요.
        이전에 받은 공무원연금 퇴직급여가 유일한 안전망이 되는 거죠.
        민간 전직을 계획하고 있다면 최소 6개월 이상 근무할 수 있는 일자리를 찾는 게 현실적인 전략이에요.
      </p>

      <Divider />

      {/* 섹션 5: 퇴직급여 금액 조회·신청 */}
      <H2>퇴직급여 금액 조회하고 신청하세요</H2>
      <p style={body}>
        퇴직급여 예상액부터 알고 싶다면 공무원연금공단 콜센터(<strong>1588-4321</strong>)에 전화하세요.
        재직기간과 급여 등급을 말하면 예상 수령액을 바로 안내받을 수 있죠.
        퇴직 전에 미리 확인해두면 퇴직 후 자금 계획을 세우기가 훨씬 수월하죠.
      </p>
      <p style={body}>
        실제 청구는 <a href="https://www.geps.or.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>공무원연금공단 홈페이지</a>에서 온라인으로 할 수 있죠.
        퇴직증명서, 신분증 사본, 통장 사본: 이 세 가지만 준비하면 되죠.
        온라인 신청이 어려우면 전국에 있는 공무원연금공단 지사에 직접 방문해도 돼요.
      </p>
      <p style={body}>
        꼭 기억해야 할 건 <strong>청구 기한</strong>이에요.
        퇴직 후 5년 이내에 청구해야 하거든요.
        기한을 넘기면 수령이 어려워질 수 있으니, 퇴직 직후에 바로 신청하는 게 가장 안전해요.
        서류만 미리 챙겨두면 신청 자체는 금방 끝나요.
      </p>

      <BorderBox title="문의처 안내">
        공무원연금공단 콜센터: <strong>1588-4321</strong><br />
        온라인 신청: <a href="https://www.geps.or.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>geps.or.kr</a><br />
        방문 신청: 전국 공무원연금공단 지사
      </BorderBox>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        공무원 퇴직급여와 실업급여에 대해 자주 나오는 질문이에요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 고용보험법과 공무원연금법을 바탕으로 작성됐어요. 임기제공무원의 고용보험 적용 여부는 임용 조건에 따라 다르니, 소속 기관 인사담당자나 공무원연금공단(1588-4321)에 확인하세요." />
    </ArticleLayout>
  );
}
