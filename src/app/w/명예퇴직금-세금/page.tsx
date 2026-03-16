"use client";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  EligibilityChecker, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 퇴직금_SIDEBAR } from "@/data/퇴직금-guide";

// ─── 데이터 ──────────────────────────────────────────

const CHECK_ITEMS = [
  { id: "c1", label: "명예퇴직 또는 희망퇴직을 앞두고 있어요" },
  { id: "c2", label: "명예퇴직금 세금이 일반 퇴직금과 다른지 궁금해요" },
  { id: "c3", label: "법정 퇴직금 외에 추가 위로금을 받을 예정이에요" },
  { id: "c4", label: "세금을 줄이는 방법을 찾고 있어요" },
];

const FAQS = [
  {
    q: "명예퇴직금 전체에 퇴직소득세가 적용되나요?",
    a: "퇴직 위로금까지 포함해서 퇴직소득으로 인정되는 경우가 많지만, 지급 근거와 성격에 따라 근로소득으로 분류될 수 있어요. 회사의 세무 처리 방식을 확인하세요.",
  },
  {
    q: "명예퇴직금이 많으면 세금도 많나요?",
    a: "금액이 클수록 높은 세율 구간에 걸릴 수 있어요. 하지만 연분연승법 덕분에 근속연수가 길면 실효세율이 크게 낮아지죠.",
  },
  {
    q: "명예퇴직금도 IRP에 넣을 수 있나요?",
    a: "퇴직소득으로 분류된 부분은 IRP에 이체할 수 있어요. 연금 수령 시 세금 감면을 받을 수 있죠.",
  },
  {
    q: "위로금이 근로소득으로 분류되면 불리한가요?",
    a: "근로소득세는 다른 소득과 합산되기 때문에 세율이 높아질 수 있어요. 퇴직소득으로 처리되는 게 유리하죠.",
  },
  {
    q: "명예퇴직 후 종합소득세 신고를 해야 하나요?",
    a: "퇴직소득은 분류과세라 별도 신고가 필요 없어요. 다만 위로금이 근로소득으로 처리된 경우 다음 해 5월에 종합소득세 신고가 필요할 수 있죠.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "소득세법 제22조 — 퇴직소득의 범위 (명예퇴직금 포함)", url: "https://www.law.go.kr/법령/소득세법" },
      { label: "소득세법 시행령 제42조의2 — 명예퇴직수당의 퇴직소득 해당 여부", url: "https://www.law.go.kr/법령/소득세법시행령" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "국세청 — 퇴직소득세 및 명예퇴직수당 안내", url: "https://www.nts.go.kr" },
      { label: "국세법령정보 — 명예퇴직금 관련 예규·판례", url: "https://taxlaw.nts.go.kr" },
    ],
  },
];

const RELATED = [
  {
    slug: "퇴직금-세금",
    title: "퇴직금 세금, 얼마나 떼이나요?",
    description: "퇴직소득세의 기본 구조와 계산 방법을 정리했어요.",
  },
  {
    slug: "퇴직금-세금-몇프로",
    title: "퇴직금 세금이 몇 퍼센트인지 계산하는 방법",
    description: "근속연수별 실효세율과 계산 구조를 설명해요.",
  },
  {
    slug: "퇴직금-IRP-이체-세금",
    title: "퇴직금 IRP 이체 시 세금 혜택",
    description: "IRP로 이체하면 퇴직소득세를 줄일 수 있어요.",
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
          currentSlug="명예퇴직금-세금"
        />
      }
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>퇴직금 · 명예퇴직 · 세금</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        명예퇴직금 세금<br />
        일반 퇴직금과 다른가요?
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        &ldquo;명예퇴직금을 받으면 세금이 더 많이 나오나요?&rdquo;<br />
        명예퇴직금에도 <strong>퇴직소득세</strong>가 붙어요. 다만 법정 퇴직금을 초과하는 추가 위로금의 성격에 따라 <strong>근로소득세</strong>로 과세될 수 있어서, 일반 퇴직금보다 세금 구조가 좀 더 복잡하죠.
        <a href="https://www.law.go.kr/법령/소득세법" style={{ color: "#1D9E75", textDecoration: "underline" }}>소득세법</a>과 시행령이 정한 기준에 따라 명예퇴직금 세금이 어떻게 달라지는지, 절세 방법은 뭔지 정리해드릴게요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      {/* 섹션 1 */}
      <H2>명예퇴직금에도 세금이 붙나요?</H2>
      <p style={body}>
        네, 붙어요. <a href="https://www.law.go.kr/법령/소득세법시행령" style={{ color: "#1D9E75", textDecoration: "underline" }}>소득세법 시행령 제42조의2</a>에 따르면, 명예퇴직수당은 원칙적으로 <strong>퇴직소득</strong>에 해당해요. 사용자(회사)가 근로자의 퇴직을 장려하기 위해 지급하는 금전이기 때문이죠.
      </p>
      <p style={body}>
        퇴직소득으로 분류되면 일반 퇴직금과 같은 연분연승법으로 세금을 계산해요. 근속연수가 길수록 세금이 줄어드는 구조이죠. 명예퇴직을 선택하는 사람 대부분이 장기 근속자이기 때문에, 실효세율이 꽤 낮은 편이에요.
      </p>
      <p style={body}>
        다만 주의할 점이 있어요. 명예퇴직금 중에서 &ldquo;퇴직 위로금&rdquo; 성격이 아니라 &ldquo;재직 중 성과 보상&rdquo; 성격이 강하면 <strong>근로소득</strong>으로 분류될 수 있거든요. 이 경우 다른 소득과 합산되어 세율이 높아질 수 있죠.
      </p>

      <Divider />

      {/* 섹션 2 */}
      <H2>일반 퇴직금과 세금이 다른 점은?</H2>
      <p style={body}>
        법정 퇴직금(근속연수 x 평균임금)에 대한 세금은 일반 퇴직금과 <strong>동일</strong>해요. 차이가 나는 건 법정 퇴직금을 초과하는 <strong>추가 지급분</strong>이에요. 이 부분의 세무 처리가 회사마다 다를 수 있거든요.
      </p>
      <p style={body}>
        대부분의 경우 추가 지급분도 퇴직소득으로 인정돼요. 회사의 명예퇴직 규정에 &ldquo;퇴직을 촉진하기 위한 수당&rdquo;으로 명시되어 있으면 퇴직소득이죠. 하지만 규정이 없거나, 특정 성과에 대한 보상이라면 근로소득으로 볼 여지가 있어요.
      </p>
      <p style={body}>
        근로소득으로 분류되면 그해 다른 소득과 <strong>합산 과세</strong>돼요. 예를 들어 퇴직 전 연봉이 6,000만 원이고 추가 위로금이 3,000만 원이라면, 근로소득 9,000만 원에 대해 세금을 계산하죠. 퇴직소득 분류보다 세금이 훨씬 많아질 수 있어요.
      </p>

      <BorderBox title="퇴직소득 vs 근로소득 분류 기준">
        <strong>퇴직소득</strong> — 퇴직 촉진 목적, 회사 규정에 명시, 근속연수 기반<br />
        <strong>근로소득</strong> — 재직 중 성과 보상 성격, 특정 업무 대가<br />
        <strong>확인 방법</strong> — 원천징수영수증의 소득 구분란 체크
      </BorderBox>

      {/* ── 섹션 2 끝 → 버튼 + 관련 글 ── */}
      <CategoryButton label="퇴직금 정보" count={퇴직금_SIDEBAR.length} href="/category/퇴직금" />
      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      {/* 섹션 3 */}
      <H2>명예퇴직금 세금 계산 방법은?</H2>
      <p style={body}>
        퇴직소득으로 분류된 금액은 일반 퇴직금과 동일한 <strong>연분연승법</strong>으로 계산해요. 법정 퇴직금과 명예퇴직 추가분을 합산한 총 퇴직급여에서 퇴직소득공제를 빼고, 근속연수로 나눈 뒤 세율을 적용하죠.
      </p>
      <p style={body}>
        명예퇴직금이 큰 편이라 일반 퇴직금보다 과세표준이 높아지는 경우가 많아요. 그만큼 높은 세율 구간에 걸릴 수 있지만, 장기 근속자라면 근속연수 효과로 상쇄되는 부분이 크죠. 20년 근속에 명예퇴직금 1억 원이면 실효세율이 3~5% 수준인 경우도 있어요.
      </p>
      <p style={body}>
        정확한 세금은 <a href="https://www.hometax.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>홈택스</a> 퇴직소득세 계산기에서 확인할 수 있어요. 총 퇴직급여(법정 + 추가분)와 근속연수를 입력하면 예상 세금이 나오죠. 추가분이 근로소득으로 분류된 경우에는 별도로 근로소득세를 계산해야 하니 주의하세요.
      </p>

      <Divider />

      {/* 섹션 4 */}
      <H2>명예퇴직금을 절세하는 방법이 있나요?</H2>
      <p style={body}>
        <strong>IRP에 이체하고 연금으로 수령</strong>하는 게 가장 효과적이에요. 퇴직소득으로 분류된 금액은 IRP에 넣을 수 있고, 55세 이후 연금으로 받으면 퇴직소득세의 30~40%를 절감할 수 있죠.
      </p>
      <p style={body}>
        명예퇴직금이 큰 금액일수록 IRP 절세 효과가 커져요. 퇴직소득세가 500만 원이면 IRP 연금 수령으로 150~200만 원을 아낄 수 있거든요. 당장 목돈이 필요하지 않다면 IRP를 적극 활용하세요.
      </p>
      <p style={body}>
        추가 위로금이 <strong>근로소득으로 분류</strong>될 것 같다면, 회사 인사팀이나 세무 담당자에게 퇴직소득으로 처리해달라고 요청할 수 있어요. 회사 규정에 명예퇴직수당이 명시되어 있으면 퇴직소득으로 인정받기 쉽죠. 세무사 상담을 통해 유리한 방향을 찾는 것도 좋은 방법이에요.
      </p>

      <Divider />

      {/* 섹션 5 */}
      <H2>명예퇴직금 수령 후 세금 신고는?</H2>
      <p style={body}>
        퇴직소득으로 처리된 부분은 회사가 <strong>원천징수</strong>해서 납부하기 때문에 별도 신고가 필요 없어요. 세금을 뺀 나머지가 통장에 입금되죠.
      </p>
      <p style={body}>
        다만 추가 위로금이 근로소득으로 처리된 경우에는 퇴직한 다음 해 <strong>5월 종합소득세 신고</strong>가 필요할 수 있어요. 같은 해에 다른 근로소득(퇴직 전 급여)과 합산해서 정산하죠. 과다 납부분이 있으면 환급받을 수 있어요.
      </p>
      <p style={body}>
        퇴직소득 원천징수영수증과 근로소득 원천징수영수증을 모두 보관해두세요. 나중에 세금 문제가 생기거나 환급 신청을 할 때 필수 서류예요. <a href="https://www.nts.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>국세청</a>(126)에서 세금 관련 무료 상담이 가능하니, 복잡한 부분은 전문가 도움을 받으세요.
      </p>

      <SectionBadge>내 상황에 해당되는지 체크해보세요</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="명예퇴직금 세금을 미리 확인하는 게 좋아요. 회사에 소득 분류(퇴직소득/근로소득)를 확인하고, IRP 절세를 검토하세요."
        partialMatchText="아직 정보가 부족해요. 회사 인사팀에 명예퇴직금 세무 처리 방식을 먼저 확인하세요."
      />

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        명예퇴직금 세금에 대해 자주 나오는 질문이에요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 소득세법을 바탕으로 작성됐어요. 세법 개정이 있을 수 있으니, 최신 기준은 국세청(126) 또는 홈택스에서 확인하세요." />
    </ArticleLayout>
  );
}
