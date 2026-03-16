"use client";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  EligibilityChecker, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 퇴직금_SIDEBAR } from "@/data/퇴직금-guide";

// ─── 데이터 ──────────────────────────────────────────

const CHECK_ITEMS = [
  { id: "c1", label: "퇴직금을 일시금으로 받을 예정이에요" },
  { id: "c2", label: "연금 수령과 세금 차이가 궁금해요" },
  { id: "c3", label: "일시금 수령 후 세금 처리 방법을 알고 싶어요" },
  { id: "c4", label: "IRP에 넣었다가 나중에 일시금으로 뺄 수 있는지 궁금해요" },
];

const FAQS = [
  {
    q: "일시금으로 받으면 세금이 더 많은 건가요?",
    a: "연금 수령과 비교하면 그렇죠. 일시금은 퇴직소득세 100%를 내지만, 연금은 60~70%만 내면 되니까요.",
  },
  {
    q: "일시금 세금 신고를 별도로 해야 하나요?",
    a: "아니에요. 회사(또는 IRP 금융기관)가 원천징수해요. 세금을 뺀 금액이 입금되죠.",
  },
  {
    q: "IRP에 넣었다가 바로 일시금으로 빼도 되나요?",
    a: "가능해요. 다만 바로 인출하면 퇴직소득세가 원래대로 전액 부과돼서 절세 효과가 없어지죠.",
  },
  {
    q: "일시금과 연금을 섞어서 받을 수 있나요?",
    a: "IRP에서 일부를 일시금으로, 나머지를 연금으로 받을 수 있어요. 전략적으로 조합하면 절세에 도움이 되죠.",
  },
  {
    q: "일시금 수령 후 연말정산에 영향이 있나요?",
    a: "퇴직소득은 분류과세라서 근로소득과 합산되지 않아요. 연말정산에 직접적인 영향은 없죠.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "소득세법 제22조 — 퇴직소득의 범위", url: "https://www.law.go.kr/법령/소득세법" },
      { label: "소득세법 제146조의2 — 퇴직소득 원천징수", url: "https://www.law.go.kr/법령/소득세법" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "국세청 — 퇴직소득세 안내", url: "https://www.nts.go.kr" },
      { label: "금융감독원 — IRP 연금 수령 안내", url: "https://www.fss.or.kr" },
    ],
  },
];

const RELATED = [
  {
    slug: "퇴직금-일시금-수령-방법",
    title: "퇴직금 일시금 수령 방법",
    description: "일시금으로 퇴직금을 받는 구체적인 절차를 정리했어요.",
  },
  {
    slug: "퇴직금-연금-전환",
    title: "퇴직금 연금 전환, 어떻게 하나요?",
    description: "퇴직금을 연금으로 전환하는 절차와 세금 혜택을 정리했어요.",
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
          currentSlug="퇴직금-일시금-세금"
        />
      }
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>퇴직금 · 일시금 · 세금</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        퇴직금 일시금으로 받으면<br />
        세금이 더 많나요?
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        &ldquo;퇴직금을 한 번에 받고 싶은데, 세금이 더 많이 나오나요?&rdquo;<br />
        연금 수령과 비교하면 그래요. 일시금으로 받으면 퇴직소득세 <strong>100%</strong>를 내야 하지만, IRP에 넣고 연금으로 받으면 <strong>60~70%</strong>만 내면 되거든요.
        그래도 사정상 일시금이 필요한 경우가 있으니, 세금 차이와 절세 방법을 함께 정리해드릴게요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      {/* 섹션 1 */}
      <H2>퇴직금을 일시금으로 받으면 세금이 어떻게 되나요?</H2>
      <p style={body}>
        <a href="https://www.law.go.kr/법령/소득세법" style={{ color: "#1D9E75", textDecoration: "underline" }}>소득세법</a>에 따라 계산된 퇴직소득세 전액이 원천징수돼요. 회사가 퇴직금을 지급할 때 세금을 떼고 나머지를 통장에 넣어주죠. IRP를 거치지 않고 바로 받는 경우가 여기에 해당해요.
      </p>
      <p style={body}>
        퇴직소득세는 연분연승법으로 계산되기 때문에 근속연수가 길수록 실효세율이 낮아져요. 하지만 일시금 수령이라는 이유로 추가 세금이 붙는 건 아니에요. &ldquo;일시금이라서 불이익을 받는다&rdquo;기보다는 &ldquo;연금으로 받으면 혜택이 있다&rdquo;는 구조인 거죠.
      </p>
      <p style={body}>
        지방소득세(퇴직소득세의 10%)까지 합산한 금액이 실제 공제되는 세금이에요. 퇴직금 5,000만 원에 퇴직소득세가 150만 원이면, 지방소득세 15만 원을 더해 총 165만 원이 떼이고 4,835만 원이 입금되는 거죠.
      </p>

      <Divider />

      {/* 섹션 2 */}
      <H2>연금으로 나눠 받을 때와 비교하면?</H2>
      <p style={body}>
        IRP에 넣고 55세 이후 10년 이상 나눠 받으면 퇴직소득세의 <strong>60~70%</strong>만 부과돼요. 나머지 30~40%는 면제되는 셈이죠. 같은 퇴직금인데 세금이 30~40% 줄어드는 건 꽤 큰 차이예요.
      </p>
      <p style={body}>
        예를 들어 퇴직소득세가 200만 원이라면, 일시금으로 받으면 200만 원을 다 내지만, 연금으로 받으면 약 120~140만 원만 내면 돼요. 퇴직금이 클수록 절세 금액도 커지죠.
      </p>
      <p style={body}>
        다만 연금 수령에는 조건이 있어요. <strong>55세 이후</strong>에 <strong>10년 이상</strong> 나눠 받아야 하거든요. 10년 미만으로 받으면 감면율이 줄어들고, 55세 이전에 인출하면 일시금과 동일한 세금이 부과돼요.
      </p>

      <BorderBox title="세금 비교 예시 (퇴직소득세 200만 원 기준)">
        <strong>일시금 수령</strong> — 200만 원 전액 납부<br />
        <strong>연금 수령(10년 이상)</strong> — 약 120~140만 원 납부<br />
        <strong>절세 효과</strong> — 60~80만 원 절감
      </BorderBox>

      {/* ── 섹션 2 끝 → 버튼 + 관련 글 ── */}
      <CategoryButton label="퇴직금 정보" count={퇴직금_SIDEBAR.length} href="/category/퇴직금" />
      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      {/* 섹션 3 */}
      <H2>일시금 수령 시 절세 방법이 있나요?</H2>
      <p style={body}>
        일시금으로 받더라도 절세 여지가 있어요. 첫째, 퇴직금을 일단 <strong>IRP에 이체</strong>한 뒤, 필요한 만큼만 인출하는 거예요. IRP에 남아 있는 금액은 운용수익에 대해 과세이연(세금 유예)을 받을 수 있죠.
      </p>
      <p style={body}>
        둘째, <strong>일부는 연금, 일부는 일시금</strong>으로 나눠 받는 전략이에요. 당장 필요한 금액만 일시금으로 빼고, 나머지는 IRP에 두고 연금으로 받으면 연금 부분에 대해서는 세금 감면을 받을 수 있거든요.
      </p>
      <p style={body}>
        셋째, 퇴직 시기를 조절해서 <strong>근속연수를 늘리는 것</strong>도 방법이에요. 1년이라도 더 채우면 퇴직소득공제가 커지고 환산급여가 줄어들어서 세금이 낮아지죠. 일시금이든 연금이든 상관없이 적용되는 절세 방법이에요.
      </p>

      <Divider />

      {/* 섹션 4 */}
      <H2>IRP에 넣고 나중에 받는 게 유리한가요?</H2>
      <p style={body}>
        세금만 놓고 보면 <strong>유리해요</strong>. IRP에 넣어두면 퇴직소득세가 바로 원천징수되지 않고, 나중에 인출할 때 부과되거든요. 그 사이에 운용수익이 생기면 복리 효과까지 누릴 수 있죠.
      </p>
      <p style={body}>
        하지만 돈이 IRP에 묶이는 단점이 있어요. 55세 이전에 인출하면 퇴직소득세 전액 + 기타소득세(16.5%)가 추가될 수 있거든요. 당장 목돈이 필요한 상황이라면 IRP에 넣는 게 불리할 수 있죠.
      </p>
      <p style={body}>
        그래서 본인의 <strong>자금 상황</strong>을 먼저 판단해야 해요. 당장 쓸 돈이 아니라면 IRP에 넣어두는 게 절세 면에서 확실히 유리하고, 급하게 써야 한다면 일시금으로 받되 최소한의 세금만 내는 전략을 세우세요.
      </p>

      <Divider />

      {/* 섹션 5 */}
      <H2>일시금 수령 후 세금 신고는 어떻게 하나요?</H2>
      <p style={body}>
        별도 신고가 필요 없어요. 회사(또는 IRP 금융기관)가 퇴직소득세를 <strong>원천징수</strong>해서 국세청에 납부하거든요. 본인 통장에는 세금을 뺀 금액이 입금되죠.
      </p>
      <p style={body}>
        다만 같은 해에 두 군데 이상에서 퇴직금을 받았다면 다음 해 5월에 <strong>종합소득세 신고</strong>를 통해 퇴직소득을 합산 정산해야 해요. <a href="https://www.hometax.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>홈택스</a>에서 온라인으로 할 수 있고, 과다 납부 시 환급도 가능하죠.
      </p>
      <p style={body}>
        퇴직소득 원천징수영수증은 퇴직 시 회사에서 발급해줘요. 이 서류에 퇴직금 금액, 퇴직소득세, 지방소득세가 다 나와 있으니 꼭 보관하세요. 나중에 세금 환급이나 연금 수령 시 필요하거든요.
      </p>

      <SectionBadge>내 상황에 해당되는지 체크해보세요</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="일시금 세금이 걱정되시군요. IRP에 일단 넣고 필요한 만큼만 인출하는 전략을 검토해보세요."
        partialMatchText="일부만 해당돼요. 국세청(126)이나 금융기관에 상담을 받아보세요."
      />

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        퇴직금 일시금 세금에 대해 자주 나오는 질문이에요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 소득세법을 바탕으로 작성됐어요. 세법 개정이 있을 수 있으니, 최신 기준은 국세청(126) 또는 홈택스에서 확인하세요." />
    </ArticleLayout>
  );
}
