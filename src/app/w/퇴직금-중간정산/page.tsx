"use client";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  EligibilityChecker, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 퇴직금_SIDEBAR } from "@/data/퇴직금-guide";

// ─── 데이터 ──────────────────────────────────────────

const CHECK_ITEMS = [
  { id: "c1", label: "1년 이상 같은 회사에서 근무하고 있어요" },
  { id: "c2", label: "무주택자로 주택을 구입하려고 해요 (또는 전세 보증금이 필요해요)" },
  { id: "c3", label: "본인이나 가족이 6개월 이상 요양이 필요한 질병·부상이 있어요" },
  { id: "c4", label: "천재지변이나 기타 법정 사유에 해당하는 상황이에요" },
];

const CHECKLIST = [
  "중간정산 신청서 — 회사 양식 또는 자유 양식",
  "증빙서류 — 사유별로 다름 (주택구입: 매매계약서, 질병: 진단서 등)",
  "재직증명서 — 근속기간 확인용",
  "급여명세서 — 평균임금 산정 기준",
  "가족관계증명서 — 가족 질병·요양 사유인 경우",
];

const FAQS = [
  {
    q: "중간정산은 회사에 말하면 바로 해주나요?",
    a: "법정 사유가 있으면 회사는 거부할 수 없어요. 근로자퇴직급여 보장법 제8조에 따라 사용자가 '정당한 사유 없이' 거부하면 안 되죠. 다만 서류를 갖춰야 하니 준비부터 하세요.",
  },
  {
    q: "중간정산하면 퇴직금이 0부터 다시 쌓이나요?",
    a: "맞아요. 중간정산한 날이 새 기산점이 돼요. 이전 근속연수는 이미 정산받았으니까, 그 이후부터 새로 쌓이는 구조죠.",
  },
  {
    q: "중간정산을 여러 번 할 수 있나요?",
    a: "법정 사유가 또 생기면 가능해요. 다만 매번 증빙서류를 새로 제출해야 하고, 정산 시점마다 근속연수가 리셋되니까 최종 퇴직금이 줄어들 수 있죠.",
  },
  {
    q: "중간정산 시 세금이 불리하다던데 사실인가요?",
    a: "근속연수가 짧아지면서 퇴직소득세 공제가 줄어들 수 있어요. 장기근속 공제 혜택이 분산되기 때문이죠. 세금 차이를 미리 계산해보는 게 좋아요.",
  },
  {
    q: "DC형 퇴직연금인데 중간정산이 가능한가요?",
    a: "DC형은 중도인출이라는 별도 제도가 있어요. 법정 사유는 비슷하지만 절차가 다르니, 가입한 금융기관에 문의하세요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "근로자퇴직급여 보장법 제8조 — 퇴직금 중간정산 요건", url: "https://www.law.go.kr/법령/근로자퇴직급여보장법" },
      { label: "근로자퇴직급여 보장법 시행령 제3조 — 중간정산 사유", url: "https://www.law.go.kr/법령/근로자퇴직급여보장법시행령" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "고용노동부 — 퇴직금 중간정산 안내", url: "https://www.moel.go.kr" },
      { label: "고용노동부 민원마당 — 퇴직급여 관련 상담", url: "https://minwon.moel.go.kr" },
    ],
  },
];

const RELATED = [
  {
    slug: "퇴직금-중간정산-조건",
    title: "퇴직금 중간정산 조건 상세",
    description: "중간정산이 허용되는 법정 사유와 조건을 사유별로 자세히 정리했어요.",
  },
  {
    slug: "퇴직금-중간정산-세금",
    title: "중간정산 시 세금 계산",
    description: "중간정산하면 세금이 달라지는 이유와 계산 방법을 안내해요.",
  },
  {
    slug: "퇴직금-중간정산-후-퇴직금-계산",
    title: "중간정산 후 퇴직금 계산",
    description: "중간정산 후 최종 퇴직금이 어떻게 달라지는지 예시와 함께 설명해요.",
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
          currentSlug="퇴직금-중간정산"
        />
      }
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>퇴직금 · 중간정산 · 법정 사유</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        퇴직금 중간정산, 가능한 경우와<br />
        방법은?
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        &ldquo;집을 사야 하는데 퇴직금을 미리 받을 수 있나요?&rdquo;<br />
        가능하긴 하지만, 아무 때나 되는 건 아니에요.
        <a href="https://www.law.go.kr/법령/근로자퇴직급여보장법" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로자퇴직급여 보장법</a>에서 정한 법정 사유가 있어야만 중간정산을 받을 수 있죠.
        무주택 주택 구입, 장기 요양, 천재지변 등이 대표적이에요.
        지금부터 중간정산이 가능한 경우, 신청 방법, 세금 문제까지 차근차근 풀어드릴게요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      {/* 섹션 1 — 중간정산이 뭔가요? */}
      <H2>퇴직금 중간정산이 뭔가요?</H2>
      <p style={body}>
        퇴직금 중간정산이란 퇴직하기 전에 그동안 쌓인 퇴직금을 미리 받는 제도예요. 원래 퇴직금은 퇴사할 때 한 번에 받는 건데, 법이 정한 특별한 사유가 있으면 재직 중에도 정산받을 수 있죠.
      </p>
      <p style={body}>
        <a href="https://www.law.go.kr/법령/근로자퇴직급여보장법" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로자퇴직급여 보장법 제8조</a>가 근거 조항이에요. 2012년 법 개정 이후로 중간정산 사유가 대폭 제한됐죠. 예전에는 근로자가 원하면 비교적 쉽게 받을 수 있었지만, 지금은 법정 사유에 해당해야만 해요.
      </p>
      <p style={body}>
        중간정산을 받으면 그 시점까지의 퇴직금은 &ldquo;이미 정산 완료&rdquo;가 돼요. 이후 퇴직할 때는 중간정산일 다음 날부터 퇴직일까지만 다시 계산하죠. 근속연수가 리셋되는 구조라서 최종 퇴직금에 영향을 줄 수 있어요.
      </p>

      <GreenBox title="중간정산 핵심 정리">
        1. 퇴직 전에 쌓인 퇴직금을 <strong>미리 받는 제도</strong><br />
        2. <strong>법정 사유</strong>가 있어야만 가능 (2012년 개정 이후 제한)<br />
        3. 정산 후 근속연수가 <strong>리셋</strong>돼요
      </GreenBox>

      <SectionBadge>내 상황에 해당되는지 체크해보세요</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="법정 사유에 해당될 가능성이 높아요. 증빙서류를 준비해서 회사에 신청하세요."
        partialMatchText="일부만 해당돼요. 구체적인 사유와 증빙을 확인한 뒤 고용노동부(1350)에 상담해보세요."
      />

      <Divider />

      {/* 섹션 2 — 가능한 경우 */}
      <H2>중간정산이 가능한 경우는?</H2>
      <p style={body}>
        <a href="https://www.law.go.kr/법령/근로자퇴직급여보장법시행령" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로자퇴직급여 보장법 시행령 제3조</a>가 법정 사유를 열거하고 있어요. 가장 흔한 사유는 <strong>무주택자의 주택 구입</strong>이에요. 본인 명의 주택이 없는 상태에서 주택을 매수하거나 전세 보증금을 마련할 때 해당되죠.
      </p>
      <p style={body}>
        두 번째로 많은 사유는 <strong>본인·배우자·부양가족의 6개월 이상 요양</strong>이에요. 의사 진단서에 장기 요양이 필요하다는 내용이 있어야 하고, 치료비 부담이 크다는 점이 핵심이죠. 천재지변(화재, 수해 등)으로 피해를 입은 경우에도 가능해요.
      </p>
      <p style={body}>
        그 밖에 임금피크제로 급여가 줄어드는 경우, 근로시간 단축으로 3개월 이상 임금이 감소하는 경우도 법정 사유에 해당돼요. 회사가 퇴직연금 제도를 DB형에서 DC형으로 전환하면서 기존 퇴직금을 정산하는 경우도 중간정산의 한 형태죠.
      </p>

      <BorderBox title="법정 사유가 아니면 절대 안 되나요?">
        네, 2012년 법 개정 이후로는 법정 사유 없이 중간정산이 불가능해요.<br />
        &ldquo;생활비가 필요해서&rdquo;, &ldquo;투자하고 싶어서&rdquo; 같은 사유로는 받을 수 없죠.<br />
        회사가 자체적으로 해주더라도 법적으로 유효하지 않을 수 있어요.
      </BorderBox>

      {/* ── 섹션 2 끝 → 버튼 + 관련 글 ── */}
      <CategoryButton label="퇴직금 정보" count={퇴직금_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      {/* 섹션 3 — 세금 */}
      <H2>중간정산 시 세금은 어떻게 되나요?</H2>
      <p style={body}>
        중간정산을 받으면 그 금액에 대해 <strong>퇴직소득세</strong>가 부과돼요. 일반 퇴직금과 같은 방식으로 계산하지만, 근속연수가 짧아지면서 세금이 불리해질 수 있죠. 퇴직소득세는 근속연수가 길수록 공제 혜택이 커지는 구조거든요.
      </p>
      <p style={body}>
        예를 들어 10년 근무 후 퇴직하면 10년치 근속연수 공제를 한꺼번에 받아요. 그런데 5년 차에 중간정산하고 나머지 5년 후 퇴직하면, 각각 5년치 공제만 받게 되니까 합산 세금이 더 나올 수 있죠. <a href="/w/퇴직금-중간정산-세금" style={{ color: "#1D9E75", textDecoration: "underline" }}>중간정산 세금 계산</a>에서 자세한 계산법을 정리했어요.
      </p>
      <p style={body}>
        세금을 줄이고 싶다면 <a href="/w/퇴직금-IRP-계좌" style={{ color: "#1D9E75", textDecoration: "underline" }}>IRP 계좌</a>로 이체하는 방법이 있어요. 중간정산금을 IRP에 넣으면 퇴직소득세가 이연(뒤로 미뤄짐)되고, 나중에 연금으로 수령하면 세율이 더 낮아지죠. 금액이 크다면 반드시 검토해보세요.
      </p>

      <Divider />

      {/* 섹션 4 — 근속연수 리셋 */}
      <H2>중간정산 후 퇴직금 계산이 달라지나요?</H2>
      <p style={body}>
        달라져요. 중간정산한 날이 새 기산점이 되면서 근속연수가 리셋되죠. 이전 기간에 쌓인 퇴직금은 이미 받았으니, 그 이후부터 새로 누적되는 구조예요. 최종 퇴직할 때는 중간정산일 다음 날~퇴직일까지의 기간만 계산에 반영돼요.
      </p>
      <p style={body}>
        <a href="/w/퇴직금-중간정산-후-퇴직금-계산" style={{ color: "#1D9E75", textDecoration: "underline" }}>중간정산 후 퇴직금 계산</a>이 복잡해 보이지만 원리는 단순해요. (퇴직 전 3개월 평균임금) × (중간정산일 이후 근속일수 / 365)로 계산하면 되죠. 중간정산 이전의 임금 인상분은 이미 정산됐으니 반영되지 않아요.
      </p>
      <p style={body}>
        이런 구조 때문에 &ldquo;중간정산을 꼭 해야 하나?&rdquo;를 신중하게 판단해야 해요. 집을 사야 하는 급한 사정이 있다면 어쩔 수 없지만, 장기적으로 보면 퇴직금을 한꺼번에 받는 게 세금 면에서 유리할 수 있거든요. 상황에 맞게 비교해보세요.
      </p>

      <Divider />

      {/* 섹션 5 — 신청 방법 */}
      <H2>중간정산 신청 방법은?</H2>
      <p style={body}>
        회사에 중간정산 신청서를 제출하면 돼요. 양식이 따로 정해진 건 아니고, 회사 인사팀에서 자체 양식을 쓰는 경우가 많죠. 신청서에는 정산 사유, 정산 희망 금액, 증빙서류 목록을 적으면 돼요.
      </p>
      <p style={body}>
        증빙서류는 사유에 따라 달라요. 주택 구입이면 매매계약서와 무주택 확인서, 전세라면 전세계약서가 필요하죠. 질병·요양이면 의사 진단서와 치료비 영수증을 준비하세요. 서류가 불충분하면 회사가 보완을 요청할 수 있어요.
      </p>
      <p style={body}>
        법정 사유에 해당하면 회사는 거부할 수 없어요. 만약 거부하면 고용노동부(1350)에 상담을 받거나 노동청에 진정을 제기할 수 있죠. 처리 기간은 회사마다 다르지만, 보통 신청 후 1~2개월 내에 정산금이 지급돼요.
      </p>

      <SectionBadge>준비 서류 체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        퇴직금 중간정산에 대해 실제로 많이 나오는 질문을 골랐어요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 근로자퇴직급여 보장법을 바탕으로 작성됐어요. 제도 변경이 있을 수 있으니, 최신 기준은 고용노동부(1350)에서 확인하세요." />
    </ArticleLayout>
  );
}
