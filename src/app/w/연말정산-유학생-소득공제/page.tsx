"use client";

// Q1. 연말정산 유학생 소득공제 관련 정보가 필요한 상황
// Q2. 핵심 내용 파악 → 조건·절차 확인 → 실행
// Q3. 자격 요건, 절차, 기한, 주의사항
// Q4. elig + GreenBox + BorderBox + FAQ

import {
  H2, GreenBox, BorderBox, Divider, body, FAQ, References, Disclaimer, ArticleLayout, RelatedArticles, ArticleAd, EligibilityChecker,
} from "@/components/article-ui";

const FAQS = [
  { q: "유학생 교육비 공제 한도가 얼마예요?", a: "자녀 1인당 연 300만원까지 세액공제 15% 받아요. 500만원 냈어도 300만원까지만 공제돼요." },
  { q: "어학연수 비용도 공제되나요?", a: "안 돼요. 정규 교육과정(초·중·고·대학)만 대상이에요. 어학원, 학원은 제외예요." },
  { q: "간소화 서비스에서 조회되나요?", a: "해외 교육비는 자동 조회 안 돼요. 학교에서 재학증명서, 납입증명서 받아서 회사에 직접 제출하세요." }
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
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>연말정산</p>
      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        연말정산 유학생 교육비<br />
        소득공제 완벽 가이드
      </h1>
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        해외 유학 중인 자녀 교육비도 연말정산에서 공제받을 수 있어요. 1인당 연 300만원 한도로 세액공제 15% 받아요.
      </p>
      <Divider />
      <ArticleAd position="intro" />

      <H2>핵심부터 짚어볼게요</H2>
      <p style={body}>가장 중요한 내용을 먼저 정리했어요.</p>
      <GreenBox>
        해외 유학 중인 자녀 교육비도 연말정산에서 공제받을 수 있어요. 1인당 연 300만원 한도로 세액공제 15% 받아요.
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
