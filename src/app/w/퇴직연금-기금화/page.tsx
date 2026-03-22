"use client";

// Q1. 퇴직연금 기금화가 뭔지, 내 퇴직연금에 어떤 영향이 있는지 궁금한 상황이에요.
// Q2. 기금화 제도를 이해하고 본인 퇴직연금 운용 방식 변경 여부를 판단하는 행동.
// Q3. 기금화 개념, 기존 개별 운용 vs 통합 기금, 수익률 개선 기대 효과, 시행 일정.
// Q4. GreenBox(핵심 변경) + BorderBox(기존 vs 기금화 비교) + Checklist(확인사항) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Checklist, FAQ, References, Disclaimer, ArticleAd,
  ArticleLayout, RelatedArticles,
} from "@/components/article-ui";

const CHECK_ITEMS = [
  "내 퇴직연금이 DB형인지 DC형인지 확인",
  "현재 운용 수익률이 물가상승률(약 2~3%)을 넘는지 확인",
  "기금화 전환 시 기존 적립금 처리 방식 확인",
  "금융사에서 기금형 상품을 출시하면 비교 검토",
];

const FAQS = [
  { q: "퇴직연금 기금화가 뭔가요?", a: "개별 금융사가 각각 운용하던 퇴직연금을 하나의 큰 기금으로 통합 운용하는 거예요. 국민연금처럼 전문 기관이 대규모로 투자해서 수익률을 높이겠다는 취지예요." },
  { q: "기금화되면 내 퇴직연금은 어떻게 되나요?", a: "기존 적립금은 그대로 유지돼요. 기금화는 신규 적립분부터 적용될 가능성이 높고, 세부 사항은 법안 확정 후에 정해져요." },
  { q: "수익률이 진짜 좋아지나요?", a: "규모의 경제로 수수료가 낮아지고, 다양한 자산에 분산 투자할 수 있어서 개선 가능성이 높아요. 다만 보장은 없어요." },
  { q: "강제로 전환되나요?", a: "아직 확정된 건 아니에요. 선택형(기존 유지 or 기금 전환)으로 운영될 가능성이 높아요. 법안이 확정되면 상세 내용이 나와요." },
  { q: "언제부터 시행되나요?", a: "정부가 추진 중이지만 구체적 시행일은 아직 미정이에요. 국회 법안 통과가 필요해서 2026~2027년 중 결정될 가능성이 높아요." },
];

const REFERENCES = [
  { category: "공식 자료", items: [
    { label: "고용노동부", url: "https://www.moel.go.kr" },
    { label: "금융위원회", url: "https://www.fsc.go.kr" },
  ]},
];

const RELATED = [
  { slug: "퇴직연금-수령-일시금-연금-비교", title: "퇴직연금 일시금 vs 연금 수령", description: "수령 방식에 따른 세금 차이를 비교해보세요." },
  { slug: "퇴직연금-DB-DC-IRP-비교", title: "퇴직연금 DB DC IRP 비교", description: "퇴직연금 유형별 차이와 선택 기준이에요." },
  { slug: "퇴직연금-중도인출-서류", title: "퇴직연금 중도인출 서류", description: "급하게 퇴직연금을 빼야 할 때 필요한 서류예요." },
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>근로 · 퇴직연금</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        퇴직연금 기금화, 내 연금이 어떻게 바뀌나요?<br />
        제도 핵심과 수익률 변화
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        "퇴직연금 수익률이 1%대"라는 뉴스 보신 적 있죠? 정부가 이걸 개선하려고 기금화를 추진하고 있어요.
        개별 금융사가 따로 운용하던 걸 하나의 큰 기금으로 통합해서 규모의 경제를 만들겠다는 거예요.
      </p>

      <ArticleAd position="intro" />
      <Divider />

      <H2>기금화가 뭔가요? 지금이랑 뭐가 다른가요?</H2>
      <p style={body}>
        현재 퇴직연금은 은행·증권사·보험사가 각각 운용해요. 규모가 작다 보니 수수료가 높고 수익률이 낮아요. 기금화는 이걸 통합해서 대규모로 운용하는 방식이에요.
      </p>

      <BorderBox>
        <strong>현행 vs 기금화 비교</strong><br /><br />
        · 현행: 개별 금융사가 각각 운용 → 소규모 → 수수료 높음 → 수익률 1~2%대<br />
        · 기금화: 통합 기금으로 전문 운용 → 대규모 → 수수료 절감 → 수익률 개선 기대
      </BorderBox>

      <GreenBox title="핵심 포인트">
        규모의 경제로 수수료↓ + 다양한 자산 분산투자 → 수익률 개선 기대<br />
        국민연금 운용 방식과 유사한 구조예요
      </GreenBox>

      <Divider />

      <H2>내 퇴직연금은 어떻게 되나요?</H2>
      <p style={body}>
        기존 적립금은 그대로 유지될 가능성이 높아요. 기금화는 신규 적립분부터 적용되는 방향으로 논의되고 있어요.
        다만 법안이 아직 확정되지 않아서 세부 사항은 변동될 수 있어요.
      </p>

      <SectionBadge>지금 확인해볼 것들</SectionBadge>
      <Checklist items={CHECK_ITEMS} />

      <Divider />

      <H2>언제 시행되나요?</H2>
      <p style={body}>
        정부가 기금화를 추진하고 있지만, 국회 법안 통과가 필요해요. 2026~2027년 중 결정될 가능성이 높고, 구체적 전환 방식과 일정은 법안 확정 후에 나와요.
        급하게 뭔가를 바꿀 필요는 없지만, 관련 뉴스를 주시하는 게 좋아요.
      </p>

      <BorderBox>
        현재 상황: 정부 추진 중 → 국회 법안 심의 필요<br />
        예상 시행: 2026~2027년 중 결정 가능성<br />
        지금 해야 할 것: 내 퇴직연금 수익률 확인, 기금형 상품 출시 시 비교 검토
      </BorderBox>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <RelatedArticles items={RELATED} />
      <Disclaimer text="이 글은 2026년 정부 발표 자료를 기준으로 작성됐어요. 기금화 세부 내용은 법안 확정 전이라 변경될 수 있으니 고용노동부·금융위원회 공지를 확인하세요." />
    </ArticleLayout>
  );
}
