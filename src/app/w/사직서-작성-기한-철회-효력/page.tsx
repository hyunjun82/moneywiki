"use client";

// Q1. 사직서 작성 기한 철회 효력 관련 정보가 필요한 상황
// Q2. 핵심 내용 파악 → 조건·절차 확인 → 실행
// Q3. 자격 요건, 절차, 기한, 주의사항
// Q4. elig + GreenBox + BorderBox + FAQ

import {
  H2, GreenBox, BorderBox, Divider, body, FAQ, References, Disclaimer, ArticleLayout, RelatedArticles, ArticleAd, EligibilityChecker,
} from "@/components/article-ui";

const FAQS = [
  { q: "사직서를 1주일 전에 내도 되나요?", a: "법적으로는 괜찮아요. 하지만 인수인계 차원에서 회사는 2주 이상을 권할 거고, 합의해지 청약이라면 회사 승낙이 필요해요." },
  { q: "사직서를 제출했는데 회사가 받아주지 않으면 어떻게 되나요?", a: "상관없어요. 민법에 따르면 사직 의사를 통보한 날부터 1개월이 지나면 자동으로 퇴직 처리돼요. 회사 승낙이 없어도 효력이 발생합니다." },
  { q: "사직서를 내고 나서 후회하면 철회할 수 있나요?", a: "경우에 따라 달라요. 회사가 아직 처리 안 했고, 회사에 손해가 없다면 철회 가능해요. 하지만 회사가 이미 승낙했거나 처리했다면 철회 어려워요." }
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
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>근로 · 노동</p>
      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        사직서 작성·기한·철회·효력<br />
        발생 시기
      </h1>
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        사직서는 2주에서 한 달 전에 제출하면 돼요. 철회는 회사가 받기 전이면 가능하지만, 받은 후엔 특별한 사정 없이 철회 못 해요.
      </p>
      <Divider />
      <ArticleAd position="intro" />

      <H2>핵심부터 짚어볼게요</H2>
      <p style={body}>가장 중요한 내용을 먼저 정리했어요.</p>
      <GreenBox>
        사직서는 2주에서 한 달 전에 제출하면 돼요. 철회는 회사가 받기 전이면 가능하지만, 받은 후엔 특별한 사정 없이 철회 못 해요.
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
