"use client";
// Q1. 임대차계약 집 압류 임차인 권리 관련 정보가 필요한 상황
// Q2. 핵심 내용 파악 → 조건·절차 확인 → 실행
// Q3. 자격 요건, 절차, 기한, 주의사항
// Q4. elig + GreenBox + BorderBox + FAQ

import {
  H2, GreenBox, BorderBox, Divider, body, FAQ, References, Disclaimer, ArticleLayout, RelatedArticles, ArticleAd, EligibilityChecker,
} from "@/components/article-ui";

const FAQS = [
  { q: "집이 압류되면 무조건 나가야 하나요?", a: "아니에요. 전입신고와 인도로 대항력 갖췄다면 경매로 집주인 바뀌어도 계속 살 수 있어요. 임대차 기간이 남아 있으면 그대로 유지돼요." },
  { q: "압류된 집 보증금은 어떻게 돌려받나요?", a: "대항력과 확정일자 모두 있으면 우선변제권으로 경매 대금에서 다른 채권자보다 먼저 보증금 받을 수 있어요. 배당 요구 신청하면 돼요." },
  { q: "경매 낙찰자가 집 비우라고 하면요?", a: "대항력 있으면 거절할 수 있어요. 낙찰자가 임대인 지위를 승계하니까 보증금 돌려줄 때까지 계속 거주 가능해요." }
];

const REFERENCES = [{ category: "참고", items: [{ label: "관련 법령·기관", url: "https://www.law.go.kr" }] }];
const RELATED: { slug: string; title: string; description: string }[] = [];

const CHECK_ITEMS = [
  { id: "c1", label: "기본 자격 요건에 해당한다" },
  { id: "c2", label: "신청 기한 내에 있다" },
  { id: "c3", label: "필요 서류를 준비할 수 있다" },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>부동산</p>
      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        임대차계약 집 압류<br />
        임차인 권리 보호
      </h1>
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        살고 있는 집이 압류됐는데 나가야 하나 걱정되시죠? 대항력 있으면 계속 살 수 있고, 보증금도 우선 받을 수 있어요.
      </p>
      <Divider />
      <ArticleAd position="intro" />

      <H2>핵심부터 짚어볼게요</H2>
      <p style={body}>가장 중요한 내용을 먼저 정리했어요.</p>
      <GreenBox>
        살고 있는 집이 압류됐는데 나가야 하나 걱정되시죠? 대항력 있으면 계속 살 수 있고, 보증금도 우선 받을 수 있어요.
      </GreenBox>

      <H2>내가 해당되는지 확인해보세요</H2>
      <p style={body}>아래 항목에 모두 해당하면 자격이 돼요.</p>
      <EligibilityChecker items={CHECK_ITEMS} allMatchText="조건을 충족해요!" partialMatchText="일부 미충족 항목이 있어요." />

      <H2>놓치기 쉬운 주의사항</H2>
      <p style={body}>꼭 확인해야 할 부분이에요.</p>
      <BorderBox>
        기한과 요건을 꼼꼼히 확인하세요. 개별 사안은 관할 기관이나 전문가 상담을 권장해요.
      </BorderBox>

      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />
      <Divider />

      <H2>자주 묻는 것들</H2>
      <FAQ items={FAQS} />
      <Divider />
      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 기준으로 작성됐어요. 법령·제도 변경에 따라 달라질 수 있으니 관할 기관에 확인하세요." />
    </ArticleLayout>
  );
}
