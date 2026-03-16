"use client";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  EligibilityChecker, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 퇴직금_SIDEBAR } from "@/data/퇴직금-guide";

// ─── 데이터 ──────────────────────────────────────────

const CHECK_ITEMS = [
  { id: "c1", label: "퇴직소득세가 어떻게 계산되는지 알고 싶어요" },
  { id: "c2", label: "일반 소득세와 뭐가 다른지 궁금해요" },
  { id: "c3", label: "세금 환급이 가능한지 알고 싶어요" },
  { id: "c4", label: "퇴직소득세를 줄이는 방법을 찾고 있어요" },
];

const FAQS = [
  {
    q: "퇴직소득세와 근로소득세가 같은 건가요?",
    a: "달라요. 기본세율 구간(6~45%)은 같지만, 퇴직소득세는 연분연승법으로 계산해서 실효세율이 훨씬 낮죠.",
  },
  {
    q: "퇴직소득세를 본인이 직접 신고해야 하나요?",
    a: "아니에요. 회사가 원천징수해서 납부하죠. 다만 IRP로 받은 뒤 인출할 때는 금융기관이 원천징수해요.",
  },
  {
    q: "퇴직소득세 환급은 어떤 경우에 가능한가요?",
    a: "IRP에 넣고 연금으로 받으면 퇴직소득세의 30~40%를 감면받아요. 이미 원천징수된 세금과의 차액이 환급되는 구조죠.",
  },
  {
    q: "퇴직소득세에 지방소득세도 붙나요?",
    a: "네, 퇴직소득세의 10%가 지방소득세로 추가 부과돼요. 합산 금액이 실제 납부할 세금이죠.",
  },
  {
    q: "퇴직금이 소액이면 세금이 0원일 수 있나요?",
    a: "가능해요. 퇴직소득공제가 퇴직금보다 크면 과세표준이 0이 돼서 세금이 나오지 않죠.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "소득세법 제22조 — 퇴직소득의 범위", url: "https://www.law.go.kr/법령/소득세법" },
      { label: "소득세법 제48조 — 퇴직소득공제", url: "https://www.law.go.kr/법령/소득세법" },
      { label: "소득세법 제55조 — 세율 구간 (6~45%)", url: "https://www.law.go.kr/법령/소득세법" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "국세청 — 퇴직소득세 계산 안내", url: "https://www.nts.go.kr" },
      { label: "홈택스 — 퇴직소득세 간이 계산기", url: "https://www.hometax.go.kr" },
    ],
  },
];

const RELATED = [
  {
    slug: "퇴직금-세금",
    title: "퇴직금 세금, 얼마나 떼이나요?",
    description: "퇴직소득세 기본 구조와 IRP 절세 방법을 정리했어요.",
  },
  {
    slug: "퇴직금-세금-환급",
    title: "퇴직금 세금 환급, 받을 수 있는 경우는?",
    description: "IRP 연금 수령이나 과다 원천징수 시 환급받는 방법이에요.",
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
          currentSlug="퇴직금-소득세"
        />
      }
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>퇴직금 · 소득세 · 계산법</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        퇴직금 소득세<br />
        어떻게 계산하나요?
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        &ldquo;퇴직금에서 소득세를 떼간다는데, 계산이 어떻게 되는 건지 모르겠어요.&rdquo;<br />
        퇴직금에 붙는 세금을 <strong>퇴직소득세</strong>라고 불러요. 월급에 붙는 근로소득세와 세율 구간은 같지만, 계산 방식이 완전히 달라요.
        <a href="https://www.law.go.kr/법령/소득세법" style={{ color: "#1D9E75", textDecoration: "underline" }}>소득세법</a>이 정한 &ldquo;연분연승법&rdquo; 덕분에 실효세율이 훨씬 낮아지죠.
        계산 공식, 일반 소득세와의 차이, 환급 가능성, 절세 방법까지 정리해드릴게요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      {/* 섹션 1 */}
      <H2>퇴직금에 소득세가 붙는 이유는?</H2>
      <p style={body}>
        퇴직금은 <a href="https://www.law.go.kr/법령/소득세법" style={{ color: "#1D9E75", textDecoration: "underline" }}>소득세법 제22조</a>에서 &ldquo;퇴직소득&rdquo;으로 분류돼요. 소득이 발생하면 세금을 매기는 게 소득세법의 기본 원칙이니까, 퇴직금에도 세금이 붙는 거죠.
      </p>
      <p style={body}>
        다만 퇴직금은 오랜 기간 일한 대가를 한꺼번에 받는 돈이에요. 이걸 그 해의 소득으로 합산해서 세금을 매기면 세율이 너무 높아지죠. 그래서 소득세법이 퇴직소득만을 위한 별도 계산 방식(연분연승법)을 만들어놓은 거예요.
      </p>
      <p style={body}>
        근로소득세는 매달 월급에서 떼지만, 퇴직소득세는 퇴직금을 지급할 때 <strong>한 번만</strong> 원천징수돼요. 회사가 세금을 계산해서 차감한 뒤 나머지를 지급하죠. 본인이 직접 세금 신고를 할 필요는 없어요.
      </p>

      <Divider />

      {/* 섹션 2 */}
      <H2>퇴직소득세 계산 공식은?</H2>
      <p style={body}>
        4단계로 이뤄져요. <strong>1단계</strong> — 퇴직급여액에서 퇴직소득공제를 빼요. 이걸 &ldquo;퇴직소득금액&rdquo;이라고 부르죠. 공제 금액은 근속연수에 따라 달라지는데, 연수가 길수록 커져요.
      </p>
      <p style={body}>
        <strong>2단계</strong> — 퇴직소득금액을 근속연수로 나눠서 &ldquo;환산급여&rdquo;를 구해요. <strong>3단계</strong> — 환산급여에서 환산급여공제를 빼고, 남은 &ldquo;환산과세표준&rdquo;에 기본세율(6~45%)을 적용하죠. 이렇게 나온 게 &ldquo;환산산출세액&rdquo;이에요.
      </p>
      <p style={body}>
        <strong>4단계</strong> — 환산산출세액에 근속연수를 다시 곱하면 최종 퇴직소득세가 나와요. 여기에 지방소득세(10%)를 더한 게 실제 납부액이죠. <a href="https://www.hometax.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>홈택스</a>에서 숫자만 넣으면 자동으로 계산되니, 공식을 외울 필요는 없어요.
      </p>

      <GreenBox title="계산 흐름 요약">
        퇴직급여액 - 퇴직소득공제 = 퇴직소득금액<br />
        퇴직소득금액 / 근속연수 = 환산급여<br />
        (환산급여 - 환산급여공제) x 세율 = 환산산출세액<br />
        환산산출세액 x 근속연수 = <strong>퇴직소득세</strong>
      </GreenBox>

      {/* ── 섹션 2 끝 → 버튼 + 관련 글 ── */}
      <CategoryButton label="퇴직금 정보" count={퇴직금_SIDEBAR.length} href="/category/퇴직금" />
      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      {/* 섹션 3 */}
      <H2>일반 소득세와 퇴직소득세가 다른 점은?</H2>
      <p style={body}>
        가장 큰 차이는 <strong>분류과세</strong>라는 점이에요. 근로소득·사업소득·이자소득 등은 합산해서 종합소득세로 과세하지만, 퇴직소득은 다른 소득과 합산하지 않고 <strong>별도로</strong> 세금을 계산하죠.
      </p>
      <p style={body}>
        두 번째 차이는 <strong>연분연승법</strong>이에요. 일반 소득세는 그해 벌어들인 소득에 바로 세율을 적용하지만, 퇴직소득세는 근속연수로 나눈 뒤 세율을 적용하고 다시 곱해요. 이 구조 때문에 누진세율의 부담이 크게 줄어들죠.
      </p>
      <p style={body}>
        세 번째는 <strong>공제 구조</strong>예요. 근로소득에는 근로소득공제·인적공제 등이 있고, 퇴직소득에는 퇴직소득공제·환산급여공제가 있어요. 퇴직소득공제가 상당히 넉넉해서, 소액 퇴직금은 세금이 0원인 경우도 있죠.
      </p>

      <Divider />

      {/* 섹션 4 */}
      <H2>소득세 계산 후 세금 환급이 가능한가요?</H2>
      <p style={body}>
        가능한 경우가 있어요. 대표적인 게 <strong>IRP에 넣고 연금으로 수령</strong>하는 경우예요. 퇴직금을 일시금으로 받을 때 원천징수된 퇴직소득세보다, 연금으로 수령할 때 부과되는 세금이 적으면 차액을 환급받을 수 있죠.
      </p>
      <p style={body}>
        IRP에서 연금 수령 시 퇴직소득세의 <strong>60~70%</strong>만 부과돼요. 이미 100% 원천징수가 됐다면 30~40%에 해당하는 금액이 환급되는 셈이죠. <a href="/w/퇴직금-세금-환급" style={{ color: "#1D9E75", textDecoration: "underline" }}>퇴직금 세금 환급</a>에서 구체적인 절차를 확인할 수 있어요.
      </p>
      <p style={body}>
        회사가 퇴직소득세를 과다하게 원천징수한 경우에도 환급이 가능해요. 이 경우 다음 해 5월 종합소득세 신고 시 퇴직소득세 정산을 하면 되죠. <a href="https://www.hometax.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>홈택스</a>에서 온라인으로 신고할 수 있어요.
      </p>

      <Divider />

      {/* 섹션 5 */}
      <H2>퇴직소득세를 줄이는 방법은?</H2>
      <p style={body}>
        첫 번째 방법은 <strong>IRP 활용</strong>이에요. 퇴직금을 IRP에 넣고 55세 이후 연금으로 10년 이상 나눠 받으면 퇴직소득세의 30~40%를 절감할 수 있죠. 가장 확실한 절세 수단이에요.
      </p>
      <p style={body}>
        두 번째는 <strong>근속연수 최대화</strong>예요. 근속연수가 1년 늘어나면 퇴직소득공제가 커지고 환산급여가 줄어들어서 세금이 낮아지거든요. 퇴직 시기를 조절할 수 있다면 연수를 채워보세요.
      </p>
      <p style={body}>
        세 번째는 <strong>세무 상담</strong>을 받는 거예요. 퇴직금 중간정산 이력이 있거나, 여러 직장에서 퇴직금을 받는 경우에는 계산이 복잡해지거든요. <a href="https://www.nts.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>국세청</a>(126)에서 무료 상담이 가능하고, 세무사 상담을 받으면 본인에게 유리한 수령 방식을 찾을 수 있죠.
      </p>

      <SectionBadge>내 상황에 해당되는지 체크해보세요</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="퇴직소득세 계산과 절세에 관심이 있으시군요. 홈택스 계산기로 예상 세금을 확인해보세요."
        partialMatchText="아직 정보가 부족해요. 퇴직금 예상 금액과 근속연수를 먼저 확인하세요."
      />

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        퇴직금 소득세에 대해 자주 나오는 질문이에요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 소득세법을 바탕으로 작성됐어요. 세법 개정이 있을 수 있으니, 최신 기준은 국세청(126) 또는 홈택스에서 확인하세요." />
    </ArticleLayout>
  );
}
