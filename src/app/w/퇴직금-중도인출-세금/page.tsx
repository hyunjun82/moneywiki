"use client";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  EligibilityChecker, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 퇴직금_SIDEBAR } from "@/data/퇴직금-guide";

// ─── 데이터 ──────────────────────────────────────────

const CHECK_ITEMS = [
  { id: "c1", label: "IRP에 퇴직금이 들어 있어요" },
  { id: "c2", label: "55세 이전에 돈을 인출해야 하는 상황이에요" },
  { id: "c3", label: "중도 인출 시 세금이 얼마나 나오는지 궁금해요" },
  { id: "c4", label: "세금 부담을 줄이면서 인출하는 방법을 찾고 있어요" },
];

const FAQS = [
  {
    q: "IRP에서 중도 인출하면 세금이 더 붙나요?",
    a: "퇴직금 부분은 퇴직소득세가 원래대로 부과되고, 운용수익 부분은 기타소득세(16.5%)가 추가돼요. 연금으로 받을 때보다 세금이 많아지죠.",
  },
  {
    q: "중도 인출 사유가 있으면 세금이 줄어드나요?",
    a: "법정 사유(무주택자 주택 구입, 6개월 이상 요양 등)에 해당하면 연금소득세(3.3~5.5%)만 내면 돼요. 사유 없이 빼면 기타소득세(16.5%)가 붙죠.",
  },
  {
    q: "퇴직금 전액을 중도 인출해도 되나요?",
    a: "가능하지만, 전액 인출하면 연금 수령 절세 혜택을 완전히 잃어요. 필요한 만큼만 빼는 게 유리하죠.",
  },
  {
    q: "중도 인출 후 다시 IRP에 넣을 수 있나요?",
    a: "한번 인출한 금액은 다시 퇴직금으로 넣을 수 없어요. 추가 납입은 가능하지만 퇴직소득 혜택이 아닌 연금저축 세액공제 대상이 되죠.",
  },
  {
    q: "DC형 퇴직연금도 중도 인출이 가능한가요?",
    a: "DC형은 법정 사유에 해당하면 중도 인출이 가능해요. DB형은 원칙적으로 불가능하죠.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "근로자퇴직급여보장법 제22조 — IRP 중도인출 사유", url: "https://www.law.go.kr/법령/근로자퇴직급여보장법" },
      { label: "소득세법 제22조 — 퇴직소득의 범위", url: "https://www.law.go.kr/법령/소득세법" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "금융감독원 — IRP 중도인출 안내", url: "https://www.fss.or.kr" },
      { label: "국세청 — 퇴직소득세 및 기타소득세 안내", url: "https://www.nts.go.kr" },
    ],
  },
];

const RELATED = [
  {
    slug: "퇴직금-중간정산-세금",
    title: "퇴직금 중간정산 세금 계산법",
    description: "재직 중 퇴직금 중간정산 시 세금이 어떻게 달라지는지 정리했어요.",
  },
  {
    slug: "irp-퇴직금-인출",
    title: "IRP 퇴직금 인출 방법과 조건",
    description: "IRP에서 퇴직금을 인출하는 방법과 필요 조건을 안내해요.",
  },
  {
    slug: "퇴직금-세금",
    title: "퇴직금 세금, 얼마나 떼이나요?",
    description: "퇴직소득세의 기본 구조와 계산 방법을 정리했어요.",
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
          currentSlug="퇴직금-중도인출-세금"
        />
      }
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>퇴직금 · 중도인출 · 세금</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        퇴직금 중도 인출<br />
        세금이 더 붙나요?
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        &ldquo;IRP에 퇴직금이 있는데 급하게 써야 해요. 빼면 세금이 많이 나오나요?&rdquo;<br />
        상황에 따라 달라요. 법정 사유가 있으면 <strong>연금소득세(3.3~5.5%)</strong>만 내면 되지만, 사유 없이 빼면 운용수익에 <strong>기타소득세(16.5%)</strong>가 추가되죠.
        <a href="https://www.law.go.kr/법령/근로자퇴직급여보장법" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로자퇴직급여보장법</a>이 정한 중도인출 사유, 세금 차이, 부담을 줄이는 방법까지 정리해드릴게요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      {/* 섹션 1 */}
      <H2>퇴직금 중도 인출 시 세금이 어떻게 되나요?</H2>
      <p style={body}>
        IRP에서 중도 인출하면 세금이 두 부분으로 나뉘어요. <strong>퇴직금 원금</strong>에 대해서는 퇴직소득세가 원래대로 부과되고, <strong>운용수익</strong>에 대해서는 기타소득세(16.5%)가 적용되죠.
      </p>
      <p style={body}>
        연금으로 받았으면 운용수익에 연금소득세(3.3~5.5%)만 내면 됐을 텐데, 중도 인출이라 기타소득세(16.5%)를 내는 거예요. 세율 차이가 3배 이상이니 손해가 크죠. 퇴직금 원금의 세금은 동일하지만 운용수익 부분에서 차이가 나는 거예요.
      </p>
      <p style={body}>
        다만 <strong>법정 사유</strong>에 해당하면 중도 인출이라도 연금소득세(3.3~5.5%)만 부과돼요. 무주택자의 주택 구입, 6개월 이상 요양, 개인회생·파산 등이 법정 사유이죠. 해당 사유가 있으면 세금 부담이 크게 줄어들어요.
      </p>

      <GreenBox title="중도 인출 세금 구조">
        <strong>퇴직금 원금</strong> — 퇴직소득세 (일시금과 동일)<br />
        <strong>운용수익 (법정 사유)</strong> — 연금소득세 3.3~5.5%<br />
        <strong>운용수익 (사유 없음)</strong> — 기타소득세 16.5%
      </GreenBox>

      <Divider />

      {/* 섹션 2 */}
      <H2>중도 인출 vs 만기 수령, 세금 차이는?</H2>
      <p style={body}>
        만기(55세 이후) 연금 수령이 가장 유리해요. 퇴직소득세의 60~70%만 내고, 운용수익에도 연금소득세(3.3~5.5%)만 적용되거든요. 중도 인출은 퇴직소득세 100% + 운용수익 기타소득세(16.5%)라서 세금 총액이 훨씬 커지죠.
      </p>
      <p style={body}>
        예를 들어 퇴직금 3,000만 원에 운용수익 300만 원이 쌓인 경우를 볼게요. 연금 수령이면 운용수익에 약 10~17만 원(3.3~5.5%)의 세금을 내지만, 사유 없는 중도 인출이면 약 49만 5,000원(16.5%)을 내야 하죠. 차이가 3~5배예요.
      </p>
      <p style={body}>
        퇴직금 원금 부분의 세금도 차이가 나요. 연금 수령이면 퇴직소득세의 60~70%만 내지만, 중도 인출이면 100%를 내거든요. 원금 + 수익 양쪽에서 모두 손해를 보는 거예요.
      </p>

      {/* ── 섹션 2 끝 → 버튼 + 관련 글 ── */}
      <CategoryButton label="퇴직금 정보" count={퇴직금_SIDEBAR.length} href="/category/퇴직금" />
      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      {/* 섹션 3 */}
      <H2>중도 인출 가능한 사유가 있나요?</H2>
      <p style={body}>
        <a href="https://www.law.go.kr/법령/근로자퇴직급여보장법" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로자퇴직급여보장법 제22조</a>에서 법정 사유를 정해놨어요. 대표적으로 <strong>무주택자의 주택 구입</strong>, <strong>6개월 이상 요양</strong>이 필요한 경우, <strong>개인회생·파산</strong> 결정을 받은 경우가 있죠.
      </p>
      <p style={body}>
        천재지변이나 그에 준하는 사유도 해당돼요. 이런 법정 사유에 해당하면 중도 인출이라도 <strong>연금소득세(3.3~5.5%)</strong>만 내면 돼요. 기타소득세(16.5%)가 적용되지 않으니 세금 부담이 크게 줄어들죠.
      </p>
      <p style={body}>
        법정 사유 없이 단순히 &ldquo;돈이 필요해서&rdquo;라는 이유로는 IRP 중도 인출이 <strong>원칙적으로 불가</strong>해요. 다만 퇴직금이 300만 원 이하인 소액의 경우에는 IRP를 거치지 않고 바로 수령할 수 있는 예외가 있죠. 금융기관에 확인해보세요.
      </p>

      <Divider />

      {/* 섹션 4 */}
      <H2>중도 인출 후 남은 금액 운용은?</H2>
      <p style={body}>
        일부만 인출하고 나머지는 IRP에 그대로 둘 수 있어요. 남은 금액은 계속 <strong>과세이연</strong> 상태로 운용되고, 나중에 연금으로 받으면 절세 혜택을 유지할 수 있죠.
      </p>
      <p style={body}>
        그래서 꼭 필요한 금액만 인출하고, 나머지는 IRP에 남겨두는 게 현명해요. 전액 인출하면 연금 수령 절세 혜택을 <strong>완전히 잃어버리</strong>거든요. 급한 돈이 500만 원이라면 500만 원만 빼고 나머지는 그대로 두세요.
      </p>
      <p style={body}>
        인출 후에도 IRP 계좌는 유지돼요. 추가 납입(연 최대 1,800만 원)을 계속할 수 있고, 세액공제 혜택도 받을 수 있죠. 중도 인출이 IRP 계좌 자체를 해지하는 건 아니라는 점을 기억하세요.
      </p>

      <Divider />

      {/* 섹션 5 */}
      <H2>세금 부담을 줄이면서 인출하는 방법은?</H2>
      <p style={body}>
        첫째, <strong>법정 사유</strong>에 해당하는지 먼저 확인하세요. 주택 구입, 장기 요양, 파산 등의 사유가 있으면 연금소득세(3.3~5.5%)만 내면 되니까 세금이 크게 줄어들어요. 해당 사유의 증빙서류를 금융기관에 제출하면 되죠.
      </p>
      <p style={body}>
        둘째, <strong>필요한 만큼만</strong> 인출하세요. 전액이 아니라 일부만 빼면 나머지에 대한 절세 혜택이 유지돼요. 인출 금액은 본인이 정할 수 있으니, 급한 돈만 최소한으로 빼는 게 유리하죠.
      </p>
      <p style={body}>
        셋째, <strong>55세에 가까운 경우</strong>라면 조금만 기다리는 것도 방법이에요. 55세가 넘으면 연금 수령이 가능해지니까요. 1~2년 차이로 세금이 수십만 원~수백만 원 달라질 수 있어요. <a href="https://www.fss.or.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>금융감독원</a>(1332)에서 본인 상황에 맞는 인출 전략을 상담받을 수 있죠.
      </p>

      <SectionBadge>내 상황에 해당되는지 체크해보세요</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="중도 인출을 고려하고 있군요. 법정 사유에 해당하는지 먼저 확인하고, 필요한 만큼만 인출하세요."
        partialMatchText="아직 정보가 부족해요. IRP 가입 금융기관이나 금융감독원(1332)에 상담을 받아보세요."
      />

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        퇴직금 중도인출 세금에 대해 자주 나오는 질문이에요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 근로자퇴직급여보장법과 소득세법을 바탕으로 작성됐어요. 제도 변경이 있을 수 있으니, 최신 기준은 금융감독원(1332) 또는 국세청(126)에서 확인하세요." />
    </ArticleLayout>
  );
}
