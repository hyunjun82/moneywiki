"use client";
// Q1. 관심 있는 아파트 분양이 상한제 적용인지 아닌지 알고 싶고, 적용되면 뭐가 유리한지 궁금한 상황이에요.
// Q2. 분양가상한제 적용 여부를 확인하고, 청약 전략을 세우는 행동.
// Q3. 공공택지 vs 민간택지 차이, 민간택지 지정 요건(3개월 상승률 2배), 적용 제외 주택 4가지, 확인 방법, 장단점.
// Q4. GreenBox(핵심) + EligibilityChecker(적용 여부 확인) + BorderBox(제외 주택) + Checklist(확인사항) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  EligibilityChecker, Checklist,
  FAQ, References, Disclaimer, ArticleAd,
  ArticleLayout, RelatedArticles,
} from "@/components/article-ui";

const APPLY_CHECK = [
  { id: "public", label: "공공택지(신도시 등 정부 개발 택지)에서 분양하는 아파트예요" },
  { id: "designated", label: "국토교통부 장관이 분양가상한제 적용 지역으로 지정한 민간택지예요" },
  { id: "over30", label: "총 30세대 이상 공동주택이에요" },
  { id: "notExcluded", label: "도시형 생활주택, 재건축 조합원분, 경제자유구역 외자주택이 아니에요" },
];

const CONFIRM_CHECKLIST = [
  "분양 공고문 첫 페이지에서 '분양가상한제 적용' 여부를 확인했나요?",
  "공공택지인지 민간택지인지 확인했나요?",
  "국토교통부 공고에서 적용 지역 지정 현황을 확인했나요?",
  "적용 제외 주택(도시형 생활주택 등)에 해당하지 않는지 확인했나요?",
  "전매 제한 기간을 확인했나요? (상한제 적용 시 3~10년)",
];

const FAQS = [
  { q: "분양가상한제가 적용되면 무조건 싸게 살 수 있나요?", a: "주변 시세보다 낮게 책정되는 경우가 많아서 시세 차익을 기대할 수 있어요. 하지만 건설사가 마감재를 낮출 수 있다는 점은 고려하세요." },
  { q: "2026년 현재 적용 지역은 어디예요?", a: "서울 강남·서초·송파·용산 등 4곳의 투기과열지구 내 민간택지와 전국 공공택지에 적용돼요. 지역은 수시로 바뀌니 국토부 공고를 확인하세요." },
  { q: "분양가상한제 적용 주택은 전매 제한이 있나요?", a: "네, 적용 지역에 따라 3~10년 전매 제한이 붙어요. 상한제가 적용되지 않는 주택보다 제한이 길어요." },
  { q: "재건축 아파트도 상한제가 적용되나요?", a: "조합원 분양분은 제외돼요. 일반 분양분(조합원 아닌 사람에게 파는 물량)은 적용될 수 있어요." },
  { q: "민간택지 지정 요건이 정확히 뭔가요?", a: "지정 직전 3개월간 해당 지역 주택가격 상승률이 시·도 소비자물가 상승률의 2배를 초과해야 해요." },
  { q: "분양가상한제가 해제되면 어떻게 되나요?", a: "해제 후 분양하는 아파트는 건설사가 자유롭게 가격을 정해요. 기존에 상한제로 분양받은 주택의 전매 제한은 유지돼요." },
  { q: "적용 여부를 가장 빠르게 확인하는 방법은요?", a: "분양 공고문 첫 페이지에 명시돼 있어요. 공고문을 못 찾으면 해당 건설사나 분양 대행사에 전화하면 바로 알려줘요." },
];

const REFERENCES = [
  {
    category: "법령 및 공식 자료",
    items: [
      { label: "주택법 제57조~59조 (분양가상한제)", url: "https://www.law.go.kr/법령/주택법" },
      { label: "주택법 시행령", url: "https://www.law.go.kr/법령/주택법시행령" },
      { label: "국토교통부 (적용 지역 공고)", url: "https://www.molit.go.kr" },
    ],
  },
];

const RELATED = [
  { slug: "아파트-분양-절차", title: "아파트 분양 절차", description: "청약부터 계약까지 분양 전체 과정이에요." },
  { slug: "민영-주택-청약-조건", title: "민영 주택 청약 조건", description: "청약 가점제·추첨제 기준을 정리했어요." },
  { slug: "취득세-계산-세율-납부", title: "취득세 계산과 세율", description: "주택 취득세 세율·감면 조건이에요." },
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>부동산 · 분양 · 규제</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        분양가상한제, 내 아파트에 적용될까?<br />
        적용 기준과 제외 주택 조건
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        관심 있는 아파트가 분양가상한제 적용인지 아닌지에 따라 분양가와 전매 제한이 완전히 달라지죠.
        공공택지는 무조건 적용되고, 민간택지는 <a href="https://www.molit.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>국토교통부</a>가 지정한 지역만 적용돼요.
        <a href="https://www.law.go.kr/법령/주택법" style={{ color: "#1D9E75", textDecoration: "underline" }}>주택법</a> 기준으로 정리했어요.
      </p>

      <ArticleAd position="intro" />
      <Divider />

      {/* ── 섹션 1: 적용 여부 확인 ── */}
      <H2>우리 아파트에 적용되나요?</H2>
      <p style={body}>
        공공택지는 자동 적용이에요. 민간택지는 국토부 장관이 주거정책심의위원회 심의를 거쳐 지정한 지역에서만 적용돼요.
        아래 항목을 체크해보세요.
      </p>

      <SectionBadge>적용 여부 확인</SectionBadge>
      <EligibilityChecker
        items={APPLY_CHECK}
        allMatchText="분양가상한제 적용 대상이에요. 분양가가 시세보다 낮을 수 있지만 전매 제한이 있어요."
        partialMatchText="일부 조건만 해당돼요. 분양 공고문에서 적용 여부를 직접 확인하세요."
      />

      <RelatedArticles items={RELATED} />
      <Divider />

      {/* ── 섹션 2: 민간택지 지정 요건 ── */}
      <H2>민간택지는 어떤 기준으로 지정되나요?</H2>
      <p style={body}>
        핵심은 &lsquo;집값이 얼마나 급등했느냐&rsquo;예요. 지정 직전 3개월간 해당 지역 주택 가격 상승률이
        시·도 소비자물가 상승률의 2배를 초과하면 지정 대상이 돼요.
      </p>

      <GreenBox title="지정 요건 예시">
        서울시 물가상승률이 3%인데 강남구 아파트값이 3개월간 7% 올랐다면?<br />
        → 2배(6%) 초과 → 분양가상한제 지정 대상
      </GreenBox>

      <p style={body}>
        지정은 국토교통부가 수시로 해요. 부동산 시장이 안정되면 해제할 수 있고, 실제로 2025년 기준 서울 4곳만 남아 있어요.
        분양 전에 <a href="https://www.molit.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>국토교통부</a> 공고를 확인하는 게 중요해요.
      </p>

      <Divider />

      {/* ── 섹션 3: 적용 제외 주택 ── */}
      <H2>적용되지 않는 주택도 있나요?</H2>
      <p style={body}>
        상한제 지역 안에서도 예외가 있어요. 아래 4가지에 해당하면 분양가를 건설사가 자유롭게 정할 수 있어요.
      </p>

      <BorderBox>
        <b>도시형 생활주택</b>: 소형 주택이라 분양가가 상대적으로 낮아 제외돼요.<br /><br />
        <b>경제자유구역 외자유치 주택</b>: 외국 자본 유치 목적으로 규제를 풀어줘요.<br /><br />
        <b>재건축 조합원 분양분</b>: 기존 거주자가 다시 입주하는 물량이라 제외돼요. 일반 분양분은 적용 가능.<br /><br />
        <b>30세대 미만 소규모 주택</b>: 시장 영향이 작아서 제외돼요.
      </BorderBox>

      <Divider />

      {/* ── 섹션 4: 장단점과 확인법 ── */}
      <H2>상한제 적용 아파트, 유리한가요?</H2>
      <p style={body}>
        분양가가 시세보다 낮으니 청약 당첨만 되면 시세 차익을 기대할 수 있어요.
        그래서 경쟁률이 높아지죠. 반면 전매 제한(3~10년)이 있어서 단기 매도는 어려워요.
        건설사가 수익성 때문에 마감재를 줄일 수 있다는 점도 고려하세요.
      </p>

      <SectionBadge>분양 전 확인 체크리스트</SectionBadge>
      <Checklist items={CONFIRM_CHECKLIST} />

      <Divider />

      <H2>자주 묻는 질문</H2>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 주택법·주택법 시행령을 바탕으로 작성됐어요. 적용 지역은 수시로 변경되니 분양 전 국토교통부 공고를 확인하세요." />
    </ArticleLayout>
  );
}
