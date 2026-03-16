"use client";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  EligibilityChecker, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 퇴직금_SIDEBAR } from "@/data/퇴직금-guide";

// ─── 데이터 ──────────────────────────────────────────

const CHECK_ITEMS = [
  { id: "c1", label: "퇴직금 예상 금액을 알고 있어요" },
  { id: "c2", label: "근속연수(몇 년 일했는지)를 알고 있어요" },
  { id: "c3", label: "실효세율을 미리 계산해보고 싶어요" },
  { id: "c4", label: "세금을 줄이는 방법도 알고 싶어요" },
];

const FAQS = [
  {
    q: "퇴직금 세율이 고정이 아닌가요?",
    a: "맞아요, 고정이 아니에요. 연분연승법이라는 계산 방식 때문에 근속연수와 퇴직금 금액에 따라 실효세율이 달라지죠.",
  },
  {
    q: "퇴직금 3,000만 원이면 세금이 대략 얼마인가요?",
    a: "10년 근속 기준으로 퇴직소득세+지방소득세 합산 수십만 원 수준이에요. 근속연수에 따라 크게 달라지니 홈택스 계산기로 정확히 확인하세요.",
  },
  {
    q: "근속연수 5년과 20년의 세금 차이가 큰가요?",
    a: "크죠. 같은 퇴직금이라도 20년 근속이면 퇴직소득공제가 훨씬 크고 환산급여가 작아져서 세금이 확 줄어요.",
  },
  {
    q: "실효세율을 미리 알 수 있는 방법이 있나요?",
    a: "홈택스의 퇴직소득세 계산기에 퇴직금과 근속연수를 입력하면 예상 세금이 나와요. 실효세율은 세금/퇴직금으로 계산하면 되죠.",
  },
  {
    q: "퇴직금이 적으면 세금이 0원일 수 있나요?",
    a: "가능해요. 퇴직소득공제가 퇴직금보다 크면 과세표준이 0이 돼서 세금이 안 나오죠.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "소득세법 제48조 — 퇴직소득공제", url: "https://www.law.go.kr/법령/소득세법" },
      { label: "소득세법 제55조 — 소득세 세율 (6~45%)", url: "https://www.law.go.kr/법령/소득세법" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "국세청 — 퇴직소득세 안내", url: "https://www.nts.go.kr" },
      { label: "홈택스 — 퇴직소득세 간이 계산기", url: "https://www.hometax.go.kr" },
    ],
  },
];

const RELATED = [
  {
    slug: "퇴직금-세금",
    title: "퇴직금 세금, 얼마나 떼이나요?",
    description: "퇴직소득세의 기본 구조와 절세 방법을 정리했어요.",
  },
  {
    slug: "퇴직금-소득세",
    title: "퇴직금 소득세, 어떻게 계산하나요?",
    description: "퇴직소득세 계산 공식과 일반 소득세와의 차이를 설명해요.",
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
          currentSlug="퇴직금-세금-몇프로"
        />
      }
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>퇴직금 · 세금 · 세율 계산</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        퇴직금 세금이 몇 퍼센트인지<br />
        계산하는 방법
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        &ldquo;퇴직금에 세금이 몇 프로 붙는지 모르겠어요.&rdquo;<br />
        고정 세율이 아니에요. <a href="https://www.law.go.kr/법령/소득세법" style={{ color: "#1D9E75", textDecoration: "underline" }}>소득세법</a>은 &ldquo;연분연승법&rdquo;이라는 방식으로 퇴직소득세를 계산하는데, 근속연수가 길수록, 퇴직금이 작을수록 실효세율이 낮아지는 구조예요.
        &ldquo;그래서 내 퇴직금에는 몇 퍼센트가 붙는 건데?&rdquo; — 지금부터 계산 방법을 단계별로 알려드릴게요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      {/* 섹션 1 */}
      <H2>퇴직금 세율이 고정된 게 아닌가요?</H2>
      <p style={body}>
        아니에요. 월급에서 떼는 근로소득세는 세율표가 정해져 있지만, 퇴직소득세는 <strong>연분연승법</strong>이라는 특수한 계산 방식을 쓰기 때문에 사람마다 실효세율이 달라요.
      </p>
      <p style={body}>
        기본세율 자체는 6~45%로 근로소득세와 같은 구간을 쓰죠. 하지만 퇴직금 전체에 이 세율을 바로 적용하는 게 아니라, 근속연수로 나눈 금액(환산급여)에 적용한 뒤 다시 곱하기 때문에 실제 부담이 줄어드는 거예요.
      </p>
      <p style={body}>
        그 결과 실효세율(실제로 떼이는 비율)은 보통 <strong>1~10%</strong> 사이에요. 근속연수가 20년 이상이면 1~3%, 5년 이하이면 5~10% 수준이죠. 물론 퇴직금 금액에 따라 더 높아질 수 있고요.
      </p>

      <GreenBox title="실효세율 대략적 범위">
        <strong>근속 5년 이하</strong> — 실효세율 약 3~10%<br />
        <strong>근속 10~15년</strong> — 실효세율 약 2~6%<br />
        <strong>근속 20년 이상</strong> — 실효세율 약 1~4%
      </GreenBox>

      <Divider />

      {/* 섹션 2 */}
      <H2>퇴직소득세 계산 구조는 어떻게 되나요?</H2>
      <p style={body}>
        계산은 4단계예요. 먼저 퇴직급여액에서 <strong>퇴직소득공제</strong>를 빼요. 근속연수별 공제 금액은 소득세법 제48조에 나와 있죠. 5년 이하이면 연 100만 원, 10년 이하이면 연 200만 원(6년 차부터), 20년 이하이면 연 250만 원(11년 차부터) 식으로 구간별로 다르게 적용돼요.
      </p>
      <p style={body}>
        공제 후 금액을 <strong>근속연수</strong>로 나눠요. 이게 &ldquo;환산급여&rdquo;예요. 환산급여에서 다시 환산급여공제를 빼고, 남은 금액(환산과세표준)에 기본세율(6~45%)을 적용해요. 환산급여가 작을수록 낮은 세율 구간에 걸리죠.
      </p>
      <p style={body}>
        마지막으로 계산된 세금에 <strong>근속연수를 곱</strong>하면 퇴직소득세가 나와요. 여기에 지방소득세(퇴직소득세의 10%)를 더한 게 실제 납부액이죠. 복잡해 보이지만 <a href="https://www.hometax.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>홈택스</a> 계산기에 숫자만 넣으면 자동으로 나오니 직접 계산할 필요는 없어요.
      </p>

      {/* ── 섹션 2 끝 → 버튼 + 관련 글 ── */}
      <CategoryButton label="퇴직금 정보" count={퇴직금_SIDEBAR.length} href="/category/퇴직금" />
      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      {/* 섹션 3 */}
      <H2>근속연수에 따라 세율이 왜 달라지나요?</H2>
      <p style={body}>
        퇴직금은 오랜 기간 근무한 대가로 한꺼번에 받는 돈이에요. 이걸 1년 치 소득처럼 세금을 매기면 세율이 너무 높아지죠. 그래서 소득세법이 <strong>근속연수로 나눠서</strong> 1년 치 소득 수준으로 환산한 뒤 세금을 계산하는 거예요.
      </p>
      <p style={body}>
        20년 근속자가 퇴직금 6,000만 원을 받으면, 환산급여는 6,000만 / 20 = 300만 원이에요. 5년 근속자가 같은 6,000만 원을 받으면 환산급여가 1,200만 원이죠. 환산급여가 작을수록 낮은 세율이 적용되니까, 같은 퇴직금이라도 근속연수가 긴 사람이 세금이 적어요.
      </p>
      <p style={body}>
        퇴직소득공제도 근속연수가 길수록 커져요. 20년 근속이면 공제 금액만 3,500만 원인데, 5년 근속이면 500만 원이거든요. 공제와 환산 효과가 겹치면서, 장기 근속자의 실효세율은 1~2%대까지 내려가기도 하죠.
      </p>

      <Divider />

      {/* 섹션 4 */}
      <H2>실효세율을 미리 알 수 있나요?</H2>
      <p style={body}>
        <a href="https://www.hometax.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>홈택스</a>에서 &ldquo;퇴직소득 세액계산&rdquo; 메뉴를 이용하면 돼요. 퇴직급여액, 근속연수, 퇴직 시기를 입력하면 예상 퇴직소득세가 나오죠. 실효세율은 (퇴직소득세 / 퇴직금) x 100으로 계산하면 돼요.
      </p>
      <p style={body}>
        국세청 모바일 앱(손택스)에서도 간이 계산이 가능해요. 출퇴근길에 스마트폰으로 빠르게 확인할 수 있죠. 정확한 금액은 회사 인사팀에서 퇴직 시점에 산출해주지만, 미리 예상치를 알아두면 수령 후 자금 계획을 세우기 쉬워요.
      </p>
      <p style={body}>
        한 가지 주의할 점은 <strong>퇴직금 중간정산</strong>을 받은 이력이 있으면 계산이 달라져요. 중간정산 시 이미 세금을 납부했기 때문에, 최종 퇴직 시 남은 기간에 대해서만 세금을 계산하죠. 이 경우는 단순 계산기로는 정확하지 않으니 세무 상담을 받는 게 좋아요.
      </p>

      <Divider />

      {/* 섹션 5 */}
      <H2>세금을 최소화하는 방법은?</H2>
      <p style={body}>
        <strong>IRP에 넣고 연금으로 받는 게</strong> 가장 효과적이에요. IRP에서 연금 형태로 수령하면 퇴직소득세의 60~70%만 부과되죠. 30~40%를 절세할 수 있는 거예요. <a href="/w/퇴직금-세금-절세-방법-IRP-연말정산" style={{ color: "#1D9E75", textDecoration: "underline" }}>IRP 절세 방법</a>을 참고하세요.
      </p>
      <p style={body}>
        퇴직 시기를 조절할 수 있다면 <strong>근속연수를 1년이라도 더 채우는 게</strong> 유리해요. 근속연수가 1년 늘어나면 퇴직소득공제가 커지고 환산급여가 줄어드니까, 실효세율이 낮아지거든요.
      </p>
      <p style={body}>
        세금 문제로 고민이 되면 <a href="https://www.nts.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>국세청</a> 상담전화(126)에서 무료로 안내를 받을 수 있어요. &ldquo;내 퇴직금에 세금이 얼마나 나오는지&rdquo;, &ldquo;IRP로 받는 게 나은지&rdquo;까지 구체적으로 상담이 가능하죠.
      </p>

      <SectionBadge>내 상황에 해당되는지 체크해보세요</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="예상 세금을 미리 확인하고 싶으시군요. 홈택스 퇴직소득세 계산기에 입력해보세요."
        partialMatchText="아직 정보가 부족해요. 퇴직금 예상 금액과 근속연수를 먼저 확인하세요."
      />

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        퇴직금 세율에 대해 자주 나오는 질문이에요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 소득세법을 바탕으로 작성됐어요. 세법 개정이 있을 수 있으니, 최신 기준은 국세청(126) 또는 홈택스에서 확인하세요." />
    </ArticleLayout>
  );
}
