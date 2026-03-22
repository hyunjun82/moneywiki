"use client";

// Q1. 신용등급이 낮은데 햇살론 특례보증으로 낮은 금리에 대출받을 수 있는지 궁금한 상황이에요.
// Q2. 자격 조건과 금리를 확인하고 서민금융진흥원에서 신청하는 행동.
// Q3. 금리 12.5%(일반)/9.9%(배려대상), 대상 기준, 한도 2,000만원, 신청 절차.
// Q4. GreenBox(금리 요약) + EligibilityChecker(자격 확인) + Steps(신청 절차) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  EligibilityChecker, Steps, FAQ, References, Disclaimer, ArticleAd,
  ArticleLayout, RelatedArticles,
} from "@/components/article-ui";

const ELIG_ITEMS = [
  { id: "credit", label: "신용점수 하위 20% 이하(6등급 이하)예요" },
  { id: "income", label: "연소득 3,500만원 이하예요" },
  { id: "debt", label: "기존 대출금이 1억원을 넘지 않아요" },
  { id: "purpose", label: "생활 안정 자금(긴급생활비, 의료비 등)이 필요해요" },
];

const APPLY_STEPS = [
  { title: "서민금융진흥원 방문 또는 전화", desc: "1397로 전화하거나 가까운 서민금융통합지원센터를 방문해요." },
  { title: "상담 및 자격 확인", desc: "소득·신용·기존 대출 현황을 상담해요." },
  { title: "신청서 작성", desc: "햇살론 특례보증 신청서와 서류를 제출해요.", tip: "신분증, 소득증빙, 주민등록등본 필요" },
  { title: "심사 및 대출 실행", desc: "보증서 발급 후 연계 금융기관에서 대출이 실행돼요." },
];

const FAQS = [
  { q: "금리가 진짜 12.5%로 내려간 건 맞나요?", a: "맞아요. 2026년부터 기존 15.9%에서 12.5%로 인하됐어요. 사회적 배려대상자(기초생활수급자·차상위 등)는 9.9%까지 낮아져요." },
  { q: "대출 한도는 얼마인가요?", a: "최대 2,000만원이에요. 소득 수준과 상환 능력에 따라 한도가 달라질 수 있어요." },
  { q: "상환 기간은 얼마인가요?", a: "최대 5년(60개월)이에요. 거치 기간은 6개월까지 가능해요." },
  { q: "신용등급이 더 낮으면 안 되나요?", a: "신용등급이 매우 낮아도 신청 가능해요. 다만 연체 이력이나 채무불이행 상태면 심사에서 탈락할 수 있어요." },
  { q: "온라인으로 신청할 수 있나요?", a: "서민금융진흥원 홈페이지(kinfa.or.kr)에서 사전 상담 예약이 가능해요. 최종 신청은 대면 상담이 필요해요." },
  { q: "햇살론과 햇살론 특례보증이 다른 건가요?", a: "네. 햇살론은 여러 종류가 있어요. 특례보증은 그중 가장 금리가 높지만 자격 요건이 완화된 상품이에요. 일반 햇살론보다 접근이 쉬워요." },
];

const REFERENCES = [
  { category: "공식 자료", items: [
    { label: "서민금융진흥원", url: "https://www.kinfa.or.kr" },
    { label: "금융위원회", url: "https://www.fsc.go.kr" },
  ]},
];

const RELATED = [
  { slug: "대출-갈아타기-조건", title: "대출 갈아타기 조건", description: "기존 고금리 대출을 저금리로 전환하는 방법이에요." },
  { slug: "긴급복지-생계지원금-신청-방법", title: "긴급복지 생계지원금 신청", description: "급한 생활비가 필요할 때 받을 수 있는 지원금이에요." },
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>복지 · 서민금융</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        햇살론 특례보증, 금리 12.5%로 대출받는 방법<br />
        신청 자격과 절차
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        신용등급이 낮아서 은행 대출이 안 되는데, 급하게 돈이 필요하죠? 햇살론 특례보증은 저신용자를 위한 정부 보증 대출이에요.
        2026년부터 금리가 15.9%에서 12.5%로 인하됐고, 배려대상자는 9.9%까지 가능해요.
      </p>

      <ArticleAd position="intro" />
      <Divider />

      <H2>금리가 얼마나 낮아졌나요?</H2>
      <p style={body}>
        <a href="https://www.fsc.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>금융위원회</a>가
        2026년 햇살론 특례보증 금리를 인하했어요. 불법 사금융 대신 이 제도를 이용하면 이자 부담이 크게 줄어요.
      </p>

      <GreenBox title="2026년 금리">
        · 일반: 연 12.5% (기존 15.9%에서 인하)<br />
        · 사회적 배려대상자: 연 9.9%<br />
        · 대출 한도: 최대 2,000만원<br />
        · 상환 기간: 최대 5년
      </GreenBox>

      <Divider />

      <H2>내가 대상인지 확인해보세요</H2>
      <EligibilityChecker
        items={ELIG_ITEMS}
        allMatchText="햇살론 특례보증 신청이 가능해요"
        partialMatchText="일부 조건이 충족되지 않아요"
      />

      <Divider />

      <H2>서민금융진흥원에서 이렇게 신청하세요</H2>
      <Steps steps={APPLY_STEPS} />

      <p style={body}>
        1397(서민금융콜센터)에 전화하면 가까운 지원센터 안내와 사전 상담을 받을 수 있어요. 온라인으로는 예약만 가능하고, 최종 신청은 대면이에요.
      </p>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <RelatedArticles items={RELATED} />
      <Disclaimer text="이 글은 2026년 금융위원회 발표를 기준으로 작성됐어요. 대출 조건과 금리는 변경될 수 있으니 서민금융진흥원(1397)에서 확인하세요." />
    </ArticleLayout>
  );
}
