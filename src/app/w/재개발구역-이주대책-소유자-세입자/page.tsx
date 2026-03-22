"use client";

// Q1. 재개발구역 이주대책 소유자 세입자 관련 정보가 필요한 상황
// Q2. 핵심 내용 파악 → 조건·절차 확인 → 실행
// Q3. 자격 요건, 절차, 기한, 주의사항
// Q4. elig + GreenBox + BorderBox + FAQ

import {
  H2, GreenBox, BorderBox, Divider, body, FAQ, References, Disclaimer, ArticleLayout, RelatedArticles, ArticleAd, EligibilityChecker,
} from "@/components/article-ui";

const FAQS = [
  { q: "재개발 세입자도 보상 받나요?", a: "네, 받아요. 재개발구역 지정 공고일 3개월 전부터 거주했다면 가구원 수에 따라 4개월치 주거이전비를 받을 수 있어요." },
  { q: "재개발 지역 건물주는 어떤 보상 받나요?", a: "실제 거주했다면 임대주택 우선공급이나 주거이전비를 받을 수 있어요. 토지와 건물은 감정평가액으로 보상받고요." },
  { q: "무허가 건물에 세입자로 살았는데도 보상 되나요?", a: "무허가 건물이어도 공고일 1년 전부터 거주했다면 주거이전비를 받을 수 있어요. 다만 거주 사실을 입증할 자료가 필요해요." }
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
        재개발구역 이주대책 소유자<br />
        세입자 보상 2026
      </h1>
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        재개발구역으로 지정되면 토지·건물 소유자와 세입자 모두 이주대책이나 보상을 받을 수 있어요.
      </p>
      <Divider />
      <ArticleAd position="intro" />

      <H2>핵심부터 짚어볼게요</H2>
      <p style={body}>가장 중요한 내용을 먼저 정리했어요.</p>
      <GreenBox>
        재개발구역으로 지정되면 토지·건물 소유자와 세입자 모두 이주대책이나 보상을 받을 수 있어요.
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
