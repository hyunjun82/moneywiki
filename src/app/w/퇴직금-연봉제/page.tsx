"use client";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 퇴직금_SIDEBAR } from "@/data/퇴직금-guide";

// ─── 데이터 ──────────────────────────────────────────

const FAQS = [
  {
    q: "연봉 계약서에 '퇴직금 포함'이라고 써 있으면 퇴직금을 못 받나요?",
    a: "받을 수 있어요. 퇴직금을 연봉에 포함해서 매월 나눠 지급하는 약정은 근로자퇴직급여보장법에 따라 무효예요. 퇴직 시 퇴직금을 별도로 청구할 수 있죠.",
  },
  {
    q: "연봉에 퇴직금이 포함됐다면, 매달 받은 돈은 돌려줘야 하나요?",
    a: "돌려줄 필요 없어요. 매월 지급된 금액은 급여로 간주되기 때문이죠. 퇴직 시 퇴직금은 별도로 계산해서 받으면 돼요.",
  },
  {
    q: "연봉이 4,000만 원이면 퇴직금은 얼마 정도 나오나요?",
    a: "1년 근무 기준으로 약 333만 원이에요. 연봉 4,000만 원 ÷ 12개월 = 월 약 333만 원이고, 이게 곧 1년치 퇴직금이 되죠. 실제로는 퇴직 전 3개월 평균임금으로 계산하기 때문에 상여금이나 수당에 따라 달라질 수 있어요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "근로자퇴직급여보장법 제4조 — 퇴직급여제도의 설정", url: "https://www.law.go.kr/법령/근로자퇴직급여보장법" },
      { label: "근로자퇴직급여보장법 제9조 — 퇴직금의 지급", url: "https://www.law.go.kr/법령/근로자퇴직급여보장법" },
    ],
  },
  {
    category: "판례",
    items: [
      { label: "대법원 — 퇴직금 분할 약정 무효 판결", url: "https://glaw.scourt.go.kr" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "고용노동부 — 퇴직급여 제도 안내", url: "https://www.moel.go.kr" },
    ],
  },
];

const RELATED = [
  {
    slug: "퇴직금-계산-방법",
    title: "퇴직금 계산 방법, 공식과 예시",
    description: "평균임금 기반 퇴직금 계산 공식과 상황별 예시를 정리했어요.",
  },
  {
    slug: "퇴직금-분할지급",
    title: "퇴직금 분할 지급, 동의하면 나중에 못 받나요?",
    description: "분할 지급 약정의 법적 효력과 대처법을 설명해요.",
  },
  {
    slug: "퇴직금-포기각서",
    title: "퇴직금 포기각서, 법적 효력이 있나요?",
    description: "퇴직금 포기각서의 유효성과 무효 사유를 안내해요.",
  },
];

// ─── 페이지 ──────────────────────────────────────────

export default function Page() {
  return (
    <ArticleLayout
      sidebar={
        <Sidebar
          heading="퇴직금 가이드"
          items={퇴직금_SIDEBAR}
          currentSlug="퇴직금-연봉제"
        />
      }
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>퇴직금 · 근로기준법 · 연봉제</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        연봉제 직장인,<br />
        퇴직금은 따로 받나요?
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        &ldquo;연봉에 퇴직금이 포함돼 있다고 하는데, 진짜인가요?&rdquo;<br />
        결론부터 말하면, <strong>연봉에 퇴직금을 포함하는 약정은 무효</strong>예요.
        <a href="https://www.law.go.kr/법령/근로자퇴직급여보장법" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로자퇴직급여보장법</a>은 퇴직금을 퇴직 시 일시금으로 지급하도록 규정하고 있어서, 매월 쪼개서 미리 주는 건 안 되죠.
        연봉제에서 퇴직금이 어떻게 계산되는지, &ldquo;퇴직금 포함 연봉&rdquo; 계약의 함정은 뭔지, 연봉 협상 때 꼭 확인해야 할 점까지 정리해드릴게요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      {/* 섹션 1 */}
      <H2>연봉제와 퇴직금, 무슨 관계인가요?</H2>
      <p style={body}>
        연봉제는 급여 지급 방식일 뿐이고, 퇴직금과는 별개의 문제예요. 연봉이 얼마든, 1년 이상 근무하고 주 15시간 이상 일했다면 퇴직금을 받을 권리가 생기죠. 연봉제라서 퇴직금이 없다는 말은 법적으로 근거가 없어요.
      </p>
      <p style={body}>
        혼동이 생기는 이유는 일부 회사가 &ldquo;퇴직금 포함 연봉&rdquo;이라는 개념을 쓰기 때문이에요. 예를 들어 연봉 3,600만 원에 퇴직금이 포함돼 있다며, 월 300만 원 중 퇴직금 명목으로 약 25만 원을 빼서 지급하는 식이죠. 하지만 이런 약정은 법적으로 무효예요.
      </p>
      <p style={body}>
        대법원도 &ldquo;퇴직금을 매월 분할하여 지급하기로 하는 약정은 근로자퇴직급여보장법에 반하여 무효&rdquo;라고 여러 차례 판시했어요. 회사가 어떤 이름을 붙이든, 퇴직금은 퇴직할 때 별도로 받아야 하죠.
      </p>

      <GreenBox title="핵심 결론">
        연봉제 = 급여 방식 / 퇴직금 = 퇴직 시 별도 지급<br />
        <strong>&ldquo;퇴직금 포함 연봉&rdquo; 약정은 무효</strong><br />
        연봉과 상관없이 1년 이상 근무하면 퇴직금 대상이에요.
      </GreenBox>

      <Divider />

      {/* 섹션 2 */}
      <H2>연봉에 퇴직금이 포함됐다고 하면 맞는 말인가요?</H2>
      <p style={body}>
        <strong>틀린 말</strong>이에요. <a href="https://www.law.go.kr/법령/근로자퇴직급여보장법" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로자퇴직급여보장법 제9조</a>는 퇴직금을 &ldquo;퇴직 시 일시금&rdquo;으로 지급하도록 규정하고 있어요. 매달 나눠서 미리 지급하는 건 이 규정에 반하기 때문에 무효예요.
      </p>
      <p style={body}>
        회사가 매달 &ldquo;퇴직금 명목&rdquo;으로 일정 금액을 지급했더라도, 그 돈은 법적으로 급여의 일부로 간주되죠. 퇴직할 때 퇴직금을 따로 계산해서 별도로 받아야 해요. 이미 받은 금액을 돌려줄 필요도 없고요.
      </p>
      <p style={body}>
        &ldquo;우리 회사는 원래 이렇게 해왔다&rdquo;는 항변도 통하지 않아요. 관행이 있더라도 강행규정(법이 반드시 지키라고 한 규정)에 반하면 무효죠. 입사 때 이런 조건에 동의했더라도 마찬가지예요. <a href="/w/퇴직금-분할지급" style={{ color: "#1D9E75", textDecoration: "underline" }}>퇴직금 분할 지급</a>의 법적 효력을 자세히 알아두면 도움이 되죠.
      </p>

      <BorderBox title="퇴직금 포함 연봉 계약서 예시">
        계약서: &ldquo;연봉 3,600만 원 (퇴직금 포함)&rdquo;<br />
        월 지급: 300만 원 (퇴직금 25만 원 포함)<br />
        → 이런 약정은 <strong>무효</strong>. 퇴직 시 퇴직금 별도 청구 가능.
      </BorderBox>

      {/* ── 섹션 2 끝 → 버튼 + 관련 글 ── */}
      <CategoryButton label="퇴직금 정보" count={퇴직금_SIDEBAR.length} href="/category/근로" />
      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      {/* 섹션 3 */}
      <H2>연봉제에서 퇴직금 계산은 어떻게 하나요?</H2>
      <p style={body}>
        퇴직금 계산 공식은 고용 형태와 관계없이 동일해요. <strong>퇴직 전 3개월 평균임금 × 30일 × (근속연수)</strong>가 기본 공식이죠. 연봉제 직장인이라면 월급을 기준으로 평균임금을 산출하면 돼요.
      </p>
      <p style={body}>
        예를 들어 연봉 4,800만 원인 직장인이 3년 근무 후 퇴직한다면, 월급은 400만 원이에요. 평균임금이 1일 약 13.3만 원이고, 퇴직금은 13.3만 원 × 30일 × 3년 = 약 1,200만 원이 되죠. 상여금이나 성과급이 포함되면 평균임금이 올라가서 퇴직금도 늘어요.
      </p>
      <p style={body}>
        주의할 점이 있어요. 평균임금이 통상임금보다 낮으면 통상임금을 기준으로 계산하죠. 퇴직 직전 3개월이 무급 휴직이나 비수기여서 급여가 적었다면, 통상임금으로 계산하는 게 유리해요. <a href="/w/퇴직금-계산-방법" style={{ color: "#1D9E75", textDecoration: "underline" }}>퇴직금 계산 방법</a>에서 상세 공식을 볼 수 있어요.
      </p>

      <Divider />

      {/* 섹션 4 */}
      <H2>연봉 협상 시 퇴직금을 확인해야 하는 이유는?</H2>
      <p style={body}>
        연봉 협상 때 &ldquo;퇴직금 포함&rdquo;이라는 문구가 들어가면, 실제 수령하는 월급이 줄어드는 효과가 있어요. 연봉 3,600만 원(퇴직금 포함)이면 실질 연봉은 약 3,270만 원 수준이 되는 셈이죠. 물론 이 약정이 무효이긴 하지만, 입사 시점에는 모르고 넘어가는 경우가 많아요.
      </p>
      <p style={body}>
        그래서 연봉 협상 때 &ldquo;이 연봉에 퇴직금이 포함된 건가요?&rdquo;를 반드시 물어봐야 해요. 포함됐다고 하면 &ldquo;법적으로 퇴직금 분할 약정은 무효이니, 퇴직금 별도인 연봉으로 계약하겠다&rdquo;고 요청하세요.
      </p>
      <p style={body}>
        계약서에 &ldquo;퇴직금 별도&rdquo;라는 문구가 명시되면 가장 좋아요. 나중에 퇴직할 때 분쟁을 사전에 막을 수 있죠. 계약서에 별도 표기가 없더라도 법적으로는 퇴직금이 별도이지만, 명시해두면 회사와의 불필요한 다툼을 줄일 수 있어요.
      </p>

      <Divider />

      {/* 섹션 5 */}
      <H2>퇴직금 포함 연봉 계약서, 유효한가요?</H2>
      <p style={body}>
        <strong>무효</strong>예요. 근로자퇴직급여보장법은 강행규정이기 때문에, 근로자와 사업주가 합의했더라도 법에 어긋나는 약정은 효력이 없죠. 대법원 판례도 일관되게 같은 입장이에요.
      </p>
      <p style={body}>
        무효인 약정에 따라 매달 &ldquo;퇴직금 명목&rdquo;으로 받은 돈은 급여로 간주돼요. 그래서 퇴직할 때 퇴직금을 다시 받더라도 &ldquo;이중 지급&rdquo;이 아니에요. 이미 받은 건 급여이고, 퇴직 시 받는 건 법정 퇴직금이니까요.
      </p>
      <p style={body}>
        회사가 퇴직금을 거부하면 <a href="/w/퇴직금-미지급-신고" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용노동부에 임금체불 진정</a>을 넣으세요. 지급 기한은 퇴직일로부터 <strong>14일</strong>이고, 기한을 넘기면 <strong>연 20%</strong> 지연이자가 붙죠. 소멸시효는 <strong>3년</strong>이니 퇴직 후 빨리 청구하는 게 안전해요.
      </p>

      <GreenBox title="연봉제 퇴직금 핵심 정리">
        &ldquo;퇴직금 포함 연봉&rdquo; 약정 → <strong>무효</strong> (강행규정 위반)<br />
        퇴직금은 퇴직 시 <strong>별도 일시금</strong>으로 지급<br />
        지급 기한 <strong>14일</strong> / 지연이자 <strong>연 20%</strong> / 소멸시효 <strong>3년</strong>
      </GreenBox>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        연봉제 퇴직금에 대해 실제로 자주 나오는 질문만 골랐어요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 근로자퇴직급여보장법을 바탕으로 작성됐어요. 제도 변경이 있을 수 있으니, 최신 기준은 고용노동부(1350)에서 확인하세요." />
    </ArticleLayout>
  );
}
