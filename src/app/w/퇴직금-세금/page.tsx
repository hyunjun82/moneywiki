"use client";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  EligibilityChecker, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 퇴직금_SIDEBAR } from "@/data/퇴직금-guide";

// ─── 데이터 ──────────────────────────────────────────

const CHECK_ITEMS = [
  { id: "c1", label: "퇴직금을 받을 예정이거나 이미 받았어요" },
  { id: "c2", label: "퇴직소득세가 얼마인지 알고 싶어요" },
  { id: "c3", label: "IRP로 받으면 세금이 달라지는지 궁금해요" },
  { id: "c4", label: "세금을 줄일 수 있는 방법을 찾고 있어요" },
];

const FAQS = [
  {
    q: "퇴직금에서 세금을 얼마나 떼나요?",
    a: "고정 세율이 아니에요. 근속연수와 퇴직금 금액에 따라 달라지죠. 근속연수가 길수록, 퇴직금이 적을수록 세율이 낮아요.",
  },
  {
    q: "퇴직금 1,000만 원이면 세금이 얼마인가요?",
    a: "근속연수에 따라 다르지만, 5년 근속 기준으로 퇴직소득세는 수만 원~수십만 원 수준이에요. 정확한 금액은 퇴직소득세 계산기를 이용하세요.",
  },
  {
    q: "회사에서 세금을 알아서 떼주나요?",
    a: "네, 회사가 원천징수해요. 퇴직금에서 퇴직소득세를 차감한 금액이 입금되죠.",
  },
  {
    q: "퇴직소득세를 나중에 돌려받을 수 있나요?",
    a: "IRP에 넣고 연금으로 수령하면 퇴직소득세의 60~70%만 내면 돼요. 사실상 환급 효과가 생기죠.",
  },
  {
    q: "퇴직금을 두 군데서 받으면 세금은 어떻게 되나요?",
    a: "각 회사에서 별도로 퇴직소득세를 원천징수해요. 다음 해 5월에 종합소득세 신고 시 합산 정산이 가능하죠.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "소득세법 제22조 — 퇴직소득의 범위", url: "https://www.law.go.kr/법령/소득세법" },
      { label: "소득세법 제48조 — 퇴직소득공제", url: "https://www.law.go.kr/법령/소득세법" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "국세청 — 퇴직소득세 안내", url: "https://www.nts.go.kr" },
      { label: "홈택스 — 퇴직소득세 계산기", url: "https://www.hometax.go.kr" },
    ],
  },
];

const RELATED = [
  {
    slug: "퇴직금-세금-몇프로",
    title: "퇴직금 세금이 몇 퍼센트인지 계산하는 방법",
    description: "퇴직소득세율이 고정이 아닌 이유와 실효세율 계산법을 정리했어요.",
  },
  {
    slug: "퇴직금-IRP-이체-세금",
    title: "퇴직금 IRP 이체 시 세금 혜택",
    description: "IRP로 이체하면 퇴직소득세를 30~40% 줄일 수 있어요.",
  },
  {
    slug: "퇴직금-세금-절세-방법-IRP-연말정산",
    title: "퇴직금 세금 줄이는 방법, IRP와 연말정산",
    description: "IRP 활용과 연말정산을 통한 퇴직금 절세 전략이에요.",
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
          currentSlug="퇴직금-세금"
        />
      }
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>퇴직금 · 세금 · 퇴직소득세</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        퇴직금 세금<br />
        얼마나 떼이나요?
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        &ldquo;퇴직금에서 세금을 떼간다는데, 얼마나 빠지는 거예요?&rdquo;<br />
        퇴직금에는 <strong>퇴직소득세</strong>가 붙어요. 일반 소득세와 다른 별도 계산 체계를 쓰고, <a href="https://www.law.go.kr/법령/소득세법" style={{ color: "#1D9E75", textDecoration: "underline" }}>소득세법</a>이 근속연수가 길수록 세금을 깎아주는 구조를 만들어놨죠.
        고정 세율이 아니라서 &ldquo;몇 퍼센트&rdquo;라고 딱 말하기 어렵지만, 계산 구조를 알면 미리 예상할 수 있어요.
        퇴직소득세 계산법, 근속연수별 차이, IRP 절세까지 한번에 정리해드릴게요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      {/* 섹션 1 */}
      <H2>퇴직금에도 세금이 붙나요?</H2>
      <p style={body}>
        네, 붙어요. 퇴직금은 <a href="https://www.law.go.kr/법령/소득세법" style={{ color: "#1D9E75", textDecoration: "underline" }}>소득세법 제22조</a>에서 &ldquo;퇴직소득&rdquo;으로 분류하고 있고, 여기에 <strong>퇴직소득세</strong>가 부과되죠. 월급에 붙는 근로소득세와는 계산 방법이 완전히 달라요.
      </p>
      <p style={body}>
        퇴직소득세의 핵심은 &ldquo;<strong>연분연승법</strong>&rdquo;이라는 계산 방식이에요. 쉽게 말하면, 퇴직금을 근속연수로 나눠서 1년 치 소득인 것처럼 세금을 매긴 뒤, 다시 근속연수를 곱하는 거죠. 이 구조 덕분에 일시에 큰 금액을 받아도 세금 부담이 완화돼요.
      </p>
      <p style={body}>
        회사가 퇴직금을 지급할 때 퇴직소득세를 <strong>원천징수</strong>해요. 본인이 따로 세금 신고를 할 필요 없이, 세금을 뺀 나머지 금액이 통장에 입금되죠. 다만 IRP로 받는 경우에는 세금 처리 방식이 달라지니, 뒤에서 자세히 설명할게요.
      </p>

      <GreenBox title="퇴직소득세 기본 구조">
        1. 퇴직금에서 <strong>퇴직소득공제</strong>를 빼요<br />
        2. 남은 금액을 근속연수로 나눠요 (연분)<br />
        3. 1년 치 기준으로 세율을 적용해요<br />
        4. 나온 세금에 근속연수를 다시 곱해요 (연승)
      </GreenBox>

      <Divider />

      {/* 섹션 2 */}
      <H2>퇴직소득세 계산 방법은?</H2>
      <p style={body}>
        <strong>1단계</strong>: 퇴직급여액에서 <strong>퇴직소득공제</strong>를 빼요. 근속연수에 따라 공제 금액이 달라지는데, 5년 이하는 근속연수 x 100만 원, 10년 이하는 500만 원 + (근속연수 - 5) x 200만 원 식으로 늘어나죠.
      </p>
      <p style={body}>
        <strong>2단계</strong>: 공제 후 금액을 근속연수로 나눠요. 이걸 &ldquo;환산급여&rdquo;라고 부르죠. 환산급여에서 다시 &ldquo;환산급여공제&rdquo;를 빼고, 여기에 기본세율(6~45%)을 적용해요. 환산급여가 작을수록 낮은 세율이 적용되니까, 근속연수가 길수록 유리해요.
      </p>
      <p style={body}>
        <strong>3단계</strong>: 계산된 세금에 근속연수를 다시 곱하면 최종 퇴직소득세가 나와요. 여기에 지방소득세(퇴직소득세의 10%)까지 더한 게 실제로 떼이는 금액이죠. 복잡하게 느껴지지만 <a href="https://www.hometax.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>홈택스</a> 퇴직소득세 계산기에 숫자만 넣으면 자동으로 나와요.
      </p>

      {/* ── 섹션 2 끝 → 버튼 + 관련 글 ── */}
      <CategoryButton label="퇴직금 정보" count={퇴직금_SIDEBAR.length} href="/category/퇴직금" />
      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      {/* 섹션 3 */}
      <H2>근속연수가 길수록 세금이 줄어드나요?</H2>
      <p style={body}>
        맞아요. 연분연승법의 핵심이 바로 이거예요. 같은 퇴직금 3,000만 원이라도 <strong>3년 근속</strong>과 <strong>10년 근속</strong>의 세금이 크게 달라지죠. 10년 근속이면 환산급여가 작아져서 낮은 세율이 적용되고, 퇴직소득공제 금액도 더 커져요.
      </p>
      <p style={body}>
        퇴직소득공제만 봐도 차이가 뚜렷해요. 5년 근속이면 공제 500만 원이지만, 20년 근속이면 공제가 3,500만 원까지 올라가거든요. 공제가 클수록 세금 매기는 기준 금액(과세표준)이 줄어드니까 세금이 적어지죠.
      </p>
      <p style={body}>
        그래서 퇴직 시기를 조절할 수 있다면 <strong>1년을 채우는 게</strong> 유리해요. 근속연수가 9년 11개월이라면 한 달만 더 다니면 10년이 돼서 공제 금액이 확 늘어나거든요. 물론 퇴직 시기를 자유롭게 정할 수 있을 때 이야기이지만요.
      </p>

      <Divider />

      {/* 섹션 4 */}
      <H2>IRP로 받으면 세금이 달라지나요?</H2>
      <p style={body}>
        달라져요. 퇴직금을 <strong>IRP(개인형 퇴직연금)</strong>로 받으면 퇴직소득세가 바로 원천징수되지 않아요. IRP 계좌에 이체된 후, 나중에 인출할 때 세금이 부과되죠. 여기서 절세 포인트가 생겨요.
      </p>
      <p style={body}>
        IRP에서 <strong>연금으로 수령</strong>(55세 이후, 10년 이상 분할)하면 퇴직소득세의 <strong>60~70%</strong>만 내면 돼요. 나머지 30~40%는 면제되는 셈이죠. 퇴직금이 클수록 절세 효과가 커져요.
      </p>
      <p style={body}>
        반대로 IRP에서 <strong>일시금으로 인출</strong>하면 퇴직소득세 전액을 내야 해요. 연금 수령 혜택이 사라지는 거죠. 그래서 당장 급하지 않다면 IRP에 넣어두고 연금으로 받는 게 세금 면에서 유리해요.
      </p>

      <BorderBox title="IRP 절세 효과 예시">
        퇴직소득세가 200만 원인 경우<br />
        <strong>일시금 수령</strong> — 200만 원 전액 납부<br />
        <strong>연금 수령(10년)</strong> — 약 120~140만 원만 납부 (30~40% 절감)
      </BorderBox>

      <Divider />

      {/* 섹션 5 */}
      <H2>세금을 줄일 수 있는 방법은?</H2>
      <p style={body}>
        가장 확실한 건 <strong>IRP에 넣고 연금으로 받는 것</strong>이에요. 위에서 설명한 대로 퇴직소득세의 30~40%를 아낄 수 있죠. <a href="/w/퇴직금-세금-절세-방법-IRP-연말정산" style={{ color: "#1D9E75", textDecoration: "underline" }}>IRP 세액공제</a> 혜택까지 합하면 절세 효과가 더 커져요.
      </p>
      <p style={body}>
        근속연수를 최대한 늘리는 것도 방법이에요. 앞서 말했듯이 근속연수가 1년 늘어나면 퇴직소득공제가 커지고, 환산급여가 작아져서 낮은 세율이 적용되거든요. 퇴직 시기를 조율할 수 있다면 연수를 채워보세요.
      </p>
      <p style={body}>
        퇴직금을 <strong>퇴직연금(DB형, DC형)</strong>으로 운용하고 있었다면, IRP로 이체하는 과정에서 추가적인 절세 전략을 세울 수 있어요. 자세한 방법은 <a href="/w/퇴직금-IRP-이체-세금" style={{ color: "#1D9E75", textDecoration: "underline" }}>퇴직금 IRP 이체 세금</a>을 참고하세요. 세무 상담이 필요하면 <a href="https://www.nts.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>국세청</a>(126)에서 무료 안내를 받을 수 있어요.
      </p>

      <SectionBadge>내 상황에 해당되는지 체크해보세요</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="퇴직금 세금이 궁금하시군요. 홈택스 퇴직소득세 계산기로 예상 세금을 확인하고, IRP 절세를 검토해보세요."
        partialMatchText="일부만 해당돼요. 국세청(126)에 상담을 받으면 본인 상황에 맞는 절세 방법을 안내받을 수 있어요."
      />

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        퇴직금 세금에 대해 자주 나오는 질문이에요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 소득세법을 바탕으로 작성됐어요. 세법 개정이 있을 수 있으니, 최신 기준은 국세청(126) 또는 홈택스에서 확인하세요." />
    </ArticleLayout>
  );
}
