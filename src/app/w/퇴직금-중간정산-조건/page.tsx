"use client";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  EligibilityChecker, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 퇴직금_SIDEBAR } from "@/data/퇴직금-guide";

// ─── 데이터 ──────────────────────────────────────────

const CHECK_ITEMS = [
  { id: "c1", label: "무주택자인데 주택을 구입하거나 전세 보증금이 필요해요" },
  { id: "c2", label: "본인 또는 부양가족이 6개월 이상 요양이 필요한 질병이 있어요" },
  { id: "c3", label: "천재지변(화재·수해 등)으로 심각한 재산 피해를 입었어요" },
  { id: "c4", label: "임금피크제 적용 또는 근로시간 단축으로 3개월 이상 임금이 감소했어요" },
];

const CHECKLIST = [
  "무주택 확인서 — 주민센터 또는 정부24에서 발급",
  "매매계약서 또는 전세계약서 — 주택 구입·전세 사유",
  "진단서 — 6개월 이상 요양 필요 명시 (질병·부상 사유)",
  "피해사실 확인서 — 천재지변 사유 (관할 지자체 발급)",
  "임금 감소 증빙 — 급여명세서 3개월분 (임금피크제 사유)",
];

const FAQS = [
  {
    q: "법정 사유에 해당하면 회사가 반드시 해줘야 하나요?",
    a: "네, 근로자퇴직급여 보장법 제8조에 따라 법정 사유가 있으면 사용자는 정당한 이유 없이 거부할 수 없어요. 거부하면 고용노동부에 진정을 제기할 수 있죠.",
  },
  {
    q: "전세 보증금도 주택 구입과 같은 사유로 인정되나요?",
    a: "인정돼요. 무주택자가 전세 보증금을 마련하기 위한 경우도 법정 사유에 포함되죠. 전세계약서와 무주택 확인서를 증빙으로 제출하면 돼요.",
  },
  {
    q: "배우자 명의 주택이 있으면 무주택자가 아닌가요?",
    a: "배우자 명의 주택이 있으면 무주택으로 보지 않아요. 근로자 본인뿐 아니라 세대원(배우자 포함) 전체가 무주택이어야 하죠.",
  },
  {
    q: "파산 선고를 받았는데 중간정산이 가능한가요?",
    a: "파산 선고나 개인회생 절차가 진행 중인 경우에도 법정 사유로 인정될 수 있어요. 법원의 파산 선고 결정문이 증빙서류가 되죠.",
  },
  {
    q: "중간정산 조건을 갖췄는데 회사가 모른다고 하면요?",
    a: "법정 사유와 증빙서류를 정리해서 서면으로 제출하세요. 그래도 거부하면 고용노동부(1350)에 상담받고, 필요하면 노동청에 진정을 넣으면 돼요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "근로자퇴직급여 보장법 제8조 — 퇴직금 중간정산", url: "https://www.law.go.kr/법령/근로자퇴직급여보장법" },
      { label: "근로자퇴직급여 보장법 시행령 제3조 — 중간정산 사유", url: "https://www.law.go.kr/법령/근로자퇴직급여보장법시행령" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "고용노동부 — 퇴직금 제도 안내", url: "https://www.moel.go.kr" },
    ],
  },
];

const RELATED = [
  {
    slug: "퇴직금-중간정산",
    title: "퇴직금 중간정산 전체 안내",
    description: "중간정산의 개념부터 신청 방법, 세금까지 한번에 정리했어요.",
  },
  {
    slug: "퇴직금-중간정산-주택구입",
    title: "중간정산 주택 구입 사유",
    description: "무주택 주택 구입으로 중간정산받는 조건과 절차를 안내해요.",
  },
  {
    slug: "퇴직금-중간정산-사유별-증빙서류",
    title: "중간정산 사유별 증빙서류",
    description: "각 법정 사유에 맞는 증빙서류를 구체적으로 정리했어요.",
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
          currentSlug="퇴직금-중간정산-조건"
        />
      }
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>퇴직금 · 중간정산 · 법정 조건</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        퇴직금 중간정산 조건,<br />
        어떤 경우에 가능한가요?
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        &ldquo;급하게 돈이 필요한데 퇴직금을 미리 꺼낼 수 있을까?&rdquo;<br />
        가능하지만 조건이 까다로워요.
        <a href="https://www.law.go.kr/법령/근로자퇴직급여보장법" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로자퇴직급여 보장법</a>이 정한 법정 사유에 해당해야만 중간정산을 받을 수 있죠.
        어떤 사유가 인정되고, 각 사유별로 무슨 서류가 필요한지 하나씩 짚어볼게요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      {/* 섹션 1 */}
      <H2>중간정산이 허용되는 법적 조건은?</H2>
      <p style={body}>
        <a href="https://www.law.go.kr/법령/근로자퇴직급여보장법시행령" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로자퇴직급여 보장법 시행령 제3조</a>에 법정 사유가 나열돼 있어요. 크게 다섯 가지로 나뉘죠. 무주택자의 <strong>주택 구입·전세 보증금</strong>, 본인·부양가족의 <strong>6개월 이상 요양</strong>, <strong>천재지변</strong> 피해, <strong>임금피크제·근로시간 단축</strong>으로 인한 임금 감소, 그리고 <strong>파산 선고·개인회생</strong>이에요.
      </p>
      <p style={body}>
        이 중 주택 구입이 실무에서 가장 많이 쓰이는 사유예요. 전세 보증금 마련도 같은 항목으로 인정되니까, 내 집 마련을 앞두고 있다면 해당 여부를 먼저 따져보세요. 무주택 확인서를 발급받아야 하는데, 정부24에서 온라인 발급이 가능하죠.
      </p>
      <p style={body}>
        질병·요양 사유는 단순 감기가 아니라 &ldquo;6개월 이상 장기 요양이 필요한 경우&rdquo;에 한해요. 의사 진단서에 요양 기간과 필요성이 명확히 적혀 있어야 하죠. 암, 뇌혈관질환, 심장질환 같은 중증 질환이 대표적이에요.
      </p>

      <GreenBox title="법정 사유 5가지">
        1. 무주택자 <strong>주택 구입 또는 전세 보증금</strong> 마련<br />
        2. 본인·부양가족 <strong>6개월 이상 요양</strong> (의사 진단서 필요)<br />
        3. <strong>천재지변</strong>으로 인한 재산 피해<br />
        4. <strong>임금피크제·근로시간 단축</strong>으로 3개월 이상 임금 감소<br />
        5. <strong>파산 선고 또는 개인회생</strong> 결정
      </GreenBox>

      <SectionBadge>내 상황에 해당되는지 체크해보세요</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="여러 법정 사유에 해당될 수 있어요. 가장 적합한 사유를 골라 증빙서류를 준비하세요."
        partialMatchText="해당 사유가 있으면 중간정산이 가능해요. 증빙서류를 갖춰서 회사에 신청하세요."
      />

      <Divider />

      {/* 섹션 2 */}
      <H2>무주택자 주택 구입이 조건인 이유는?</H2>
      <p style={body}>
        법이 중간정산을 허용한 취지가 &ldquo;근로자의 주거 안정&rdquo;이에요. 집이 없는 사람이 내 집을 마련할 때 목돈이 필요하니까, 퇴직금을 미리 꺼내 쓸 수 있도록 한 거죠. 그래서 이미 주택을 소유한 사람은 이 사유를 쓸 수 없어요.
      </p>
      <p style={body}>
        &ldquo;무주택&rdquo;의 기준이 중요해요. 본인뿐 아니라 세대원(배우자 포함) 전체가 주택을 소유하지 않아야 하죠. 분양권도 주택으로 간주돼요. 무주택 확인은 주민센터에서 &ldquo;주택 소유 여부 확인서&rdquo;를 발급받거나, 정부24에서 온라인으로 가능해요.
      </p>
      <p style={body}>
        전세 보증금을 내야 하는 경우도 같은 조건이에요. 기존 전세에서 보증금이 올라 추가 자금이 필요한 상황이라면, 전세계약서와 함께 보증금 인상분을 증명하면 되죠. 다만 월세 보증금은 금액이 소액인 경우 인정이 어려울 수 있어요.
      </p>

      <BorderBox title="주택 구입 중간정산 팁">
        매매계약서 날짜와 중간정산 신청일이 가까울수록 심사가 수월해요.<br />
        계약서 체결 전에 미리 회사 인사팀과 일정을 조율해두세요.<br />
        잔금 납부 전에 정산금을 받아야 하니 <strong>시간 여유</strong>를 두고 신청하세요.
      </BorderBox>

      {/* ── 섹션 2 끝 → 버튼 + 관련 글 ── */}
      <CategoryButton label="퇴직금 정보" count={퇴직금_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      {/* 섹션 3 */}
      <H2>질병·재난 같은 사유도 가능한가요?</H2>
      <p style={body}>
        가능해요. 본인 또는 부양가족이 <strong>6개월 이상 요양</strong>이 필요한 질병·부상을 앓고 있으면 중간정산 사유에 해당하죠. 암, 뇌출혈, 심근경색 같은 중증 질환이 대표적이에요. 의사 진단서에 &ldquo;6개월 이상 치료가 필요하다&rdquo;는 내용이 명확히 적혀야 해요.
      </p>
      <p style={body}>
        천재지변으로 큰 재산 피해를 입은 경우도 가능하죠. 홍수, 태풍, 화재 등으로 주거지가 파손되거나 생계가 어려워진 경우에 해당돼요. 관할 지방자치단체에서 발급하는 피해사실 확인서가 증빙이 되죠.
      </p>
      <p style={body}>
        파산 선고나 개인회생 절차도 법정 사유예요. 법원의 결정문을 증빙으로 제출하면 돼요. 다만 단순 채무가 많다는 이유만으로는 안 되고, 법원의 공식 결정이 있어야 인정받을 수 있죠.
      </p>

      <Divider />

      {/* 섹션 4 */}
      <H2>조건을 갖추면 회사가 반드시 해줘야 하나요?</H2>
      <p style={body}>
        법정 사유와 증빙서류를 갖췄다면 회사가 거부할 정당한 이유가 없어요. <a href="https://www.law.go.kr/법령/근로자퇴직급여보장법" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로자퇴직급여 보장법 제8조</a>에 따라 사용자는 근로자의 요구에 따라 정산해줘야 하죠. &ldquo;회사 사정이 어렵다&rdquo;는 이유만으로 거절하면 법 위반이 될 수 있어요.
      </p>
      <p style={body}>
        실무에서는 회사가 &ldquo;서류 보완&rdquo;을 요청하며 시간을 끄는 경우가 있죠. 이때는 고용노동부 상담(1350)을 통해 회사의 의무를 확인받고, 서면으로 정식 요청하는 게 효과적이에요.
      </p>
      <p style={body}>
        그래도 해결이 안 되면 관할 노동청에 진정을 제기할 수 있어요. 노동청에서 사실 조사를 거쳐 시정 지시를 내리면 회사가 따라야 하죠. 진정 절차는 온라인(고용노동부 민원마당)으로도 가능해요.
      </p>

      <SectionBadge>증빙서류 체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        퇴직금 중간정산 조건에 대해 자주 나오는 질문이에요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 근로자퇴직급여 보장법을 바탕으로 작성됐어요. 제도 변경이 있을 수 있으니, 최신 기준은 고용노동부(1350)에서 확인하세요." />
    </ArticleLayout>
  );
}
