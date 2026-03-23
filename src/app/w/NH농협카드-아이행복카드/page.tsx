"use client";

// Q1. 육아 중인데 NH농협카드 아이행복카드가 어떤 혜택이 있는지 궁금한 상황이에요.
// Q2. 할인 혜택을 확인하고 카드를 발급받는 행동.
// Q3. 어린이집·병원·온라인쇼핑 10% 할인, 전월 실적 조건, 발급 방법.
// Q4. GreenBox(혜택 요약) + BorderBox(실적 조건) + Steps(발급 절차) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, FAQ, References, Disclaimer, ArticleAd,
  ArticleLayout, RelatedArticles,
} from "@/components/article-ui";

const ISSUE_STEPS = [
  { title: "NH농협카드 앱 또는 홈페이지 접속", desc: "card.nonghyup.com 또는 NH앱카드에서 신청해요." },
  { title: "아이행복카드 선택", desc: "카드 상품 목록에서 아이행복카드를 선택해요." },
  { title: "신청서 작성", desc: "본인 인증 후 배송 주소를 입력하면 끝이에요.", tip: "연회비 무료, 신용/체크 선택 가능" },
];

const FAQS = [
  { q: "아이행복카드 연회비가 있나요?", a: "없어요. 국내·해외 모두 연회비 무료예요." },
  { q: "할인 한도가 있나요?", a: "월 할인 한도가 정해져 있어요. 전월 실적에 따라 한도가 달라지니 카드사에서 확인하세요." },
  { q: "어린이집 보육료도 10% 할인인가요?", a: "맞아요. 어린이집·유치원 보육료를 이 카드로 결제하면 10% 할인이 적용돼요." },
  { q: "체크카드로도 발급되나요?", a: "네. 신용카드와 체크카드 모두 발급 가능해요. 실적 조건 없이 혜택을 받으려면 체크카드도 좋은 선택이에요." },
  { q: "다른 아이행복카드와 뭐가 다른가요?", a: "카드사마다 할인 영역과 한도가 달라요. NH농협은 어린이집·온라인쇼핑·병원 10% 할인이 핵심이에요." },
];

const REFERENCES = [
  { category: "카드사", items: [
    { label: "NH농협카드", url: "https://card.nonghyup.com" },
  ]},
];

const RELATED = [
  { slug: "롯데카드-아이행복카드", title: "롯데카드 아이행복카드", description: "롯데카드 아이행복카드 혜택과 비교해보세요." },
  { slug: "아동수당-지역사랑상품권-지급", title: "아동수당 지역사랑상품권 지급", description: "아동수당이 상품권으로 나오는 지역도 있어요." },
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>복지 · 육아</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        NH농협카드 아이행복카드, 어떤 혜택이 있나요?<br />
        10% 할인 영역과 발급 방법
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        어린이집 보육료, 병원비, 온라인 쇼핑까지 10% 할인되는 카드가 있어요. NH농협 아이행복카드예요.
        연회비도 무료라서 육아 중이라면 한 장 만들어두면 좋아요.
      </p>

      <ArticleAd position="intro" />
      <Divider />

      <H2>핵심 혜택 3가지</H2>
      <p style={body}>
        이 카드의 핵심은 육아 관련 지출에서 10% 할인이에요. 카드사 앱에서 할인 내역을 바로 확인할 수 있어요.
      </p>

      <GreenBox title="주요 할인 혜택">
        · 어린이집·유치원 보육료: 10% 할인<br />
        · 온라인 쇼핑(대형몰): 10% 할인<br />
        · 병원·약국: 10% 할인<br />
        · 연회비: 무료
      </GreenBox>

      <Divider />

      <H2>실적 조건은 어떻게 되나요?</H2>
      <p style={body}>
        할인 혜택을 받으려면 전월 실적이 일정 금액 이상이어야 해요. 실적 구간에 따라 월 할인 한도가 달라져요.
      </p>

      <BorderBox>
        <strong>전월 실적별 할인 한도 (예시)</strong><br /><br />
        · 30만원 이상: 기본 할인 적용<br />
        · 50만원 이상: 할인 한도 확대<br />
        · 100만원 이상: 최대 할인 한도<br /><br />
        정확한 금액은 카드사 홈페이지에서 확인하세요.
      </BorderBox>

      <Divider />

      <H2>발급 방법</H2>
      <Steps steps={ISSUE_STEPS} />

      <Divider />

      <H2>자주 묻는 것들</H2>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <RelatedArticles items={RELATED} />
      <Disclaimer text="이 글은 2026년 NH농협카드 상품 정보를 기준으로 작성됐어요. 혜택과 실적 조건은 카드사 정책에 따라 변경될 수 있으니 card.nonghyup.com에서 확인하세요." />
    </ArticleLayout>
  );
}
