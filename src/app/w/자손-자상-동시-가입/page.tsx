"use client";
import { BorderBox } from "@/components/article-ui/BorderBox";

// Q1. 자손 자상 동시 가입 관련 정보가 필요한 상황
// Q2. 핵심 내용 파악 → 조건·절차 확인 → 실행
// Q3. 자격 요건, 절차, 기한, 주의사항
// Q4. elig + GreenBox + BorderBox + FAQ

import {
  H2, GreenBox, BorderBox, Divider, body, FAQ, References, Disclaimer, ArticleLayout, RelatedArticles, ArticleAd, EligibilityChecker,
} from "@/components/article-ui";

const FAQS = [
  { q: "관련 문의는 어디로 하나요?", a: "관할 기관 고객센터로 전화하거나 방문 상담하면 돼요." },
  { q: "온라인으로 처리할 수 있나요?", a: "대부분 정부24나 관할 기관 홈페이지에서 온라인 처리가 가능해요." },
  { q: "처리 기간은 얼마나 걸리나요?", a: "보통 2~4주 정도 소요돼요. 서류 보완이 필요하면 더 걸릴 수 있어요." },
  { q: "대리 신청이 가능한가요?", a: "위임장과 신분증 사본이 있으면 가능한 경우가 많아요." },
  { q: "비용이 드나요?", a: "대부분 무료예요. 일부 수수료가 발생할 수 있어요." }
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
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>금융</p>
      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        자손 자상 중복:<br />
        동시 가입 되나요
      </h1>
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        자손과 자상을 둘 다 가입하면 보상을 2배로 받을 수 있을까요? 두 보장은 중복 가입이 불가능해요. 둘 중 하나만 선택해야 하는 이유를 알려드려요
      </p>
      <Divider />
      <ArticleAd position="intro" />

      <H2>핵심부터 짚어볼게요</H2>
      <p style={body}>가장 중요한 내용을 먼저 정리했어요.</p>
      <GreenBox>
        자손과 자상을 둘 다 가입하면 보상을 2배로 받을 수 있을까요? 두 보장은 중복 가입이 불가능해요. 둘 중 하나만 선택해야 하는 이유를 알려드려요
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
