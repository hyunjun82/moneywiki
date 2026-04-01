"use client";
import { Divider } from "@/components/article-ui/Divider";
import { BorderBox } from "@/components/article-ui/BorderBox";

// Q1. 재개발 정비계획 변경 제안 관련 정보가 필요한 상황
// Q2. 핵심 내용 파악 → 조건·절차 확인 → 실행
// Q3. 자격 요건, 절차, 기한, 주의사항
// Q4. elig + GreenBox + BorderBox + FAQ

import {
  H2, GreenBox, BorderBox, Divider, body, FAQ, References, Disclaimer, ArticleLayout, RelatedArticles, ArticleAd, EligibilityChecker,
} from "@/components/article-ui";

const FAQS = [
  { q: "재개발 정비계획 주민이 직접 변경 제안할 수 있나요?", a: "네, 가능해요. 주민설명회에서 의견 제시하고, 공람 기간에 의견서 제출하면 돼요. 지방의회 의견청취 과정도 거치니까 적극 참여하세요." },
  { q: "정비계획 변경하는 데 얼마나 걸리나요?", a: "보통 3~4개월 걸리는데, 최근에는 절차 간소화로 1개월 만에 끝나는 경우도 있어요. 경미한 사항은 더 빨라요." },
  { q: "모든 변경 사항에 주민설명회가 필요한가요?", a: "아니에요. 대통령령으로 정한 경미한 사항은 주민설명회나 공람 절차 생략할 수 있어요." }
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
        재개발 정비계획 변경 제안<br />
        주민 가능 여부
      </h1>
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        우리 동네 재개발 진행 중인데 정비계획 바꾸고 싶으시죠? 주민설명회, 공람, 지방의회 의견청취 거쳐서 변경 제안 가능해요.
      </p>
      <Divider />
      <ArticleAd position="intro" />

      <H2>핵심부터 짚어볼게요</H2>
      <p style={body}>가장 중요한 내용을 먼저 정리했어요.</p>
      <GreenBox>
        우리 동네 재개발 진행 중인데 정비계획 바꾸고 싶으시죠? 주민설명회, 공람, 지방의회 의견청취 거쳐서 변경 제안 가능해요.
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
