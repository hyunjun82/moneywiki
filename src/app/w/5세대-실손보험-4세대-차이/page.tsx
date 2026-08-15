"use client";
// Q1. 5세대 실손보험 4세대 차이 관련 정보가 필요한 상황
// Q2. 핵심 내용 파악 → 조건·절차 확인 → 실행
// Q3. 자격 요건, 절차, 기한, 주의사항
// Q4. compare + GreenBox + BorderBox + FAQ

import {
  H2, GreenBox, BorderBox, Divider, body, FAQ, References, Disclaimer, ArticleLayout, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { CompareTable } from "@/components/article-ui/CompareTable";

const FAQS = [
  { q: "관련 문의는 어디로 하나요?", a: "관할 기관 고객센터로 전화하거나 방문 상담하면 돼요." },
  { q: "온라인으로 처리할 수 있나요?", a: "대부분 정부24나 관할 기관 홈페이지에서 온라인 처리가 가능해요." },
  { q: "처리 기간은 얼마나 걸리나요?", a: "보통 2~4주 정도 소요돼요. 서류 보완이 필요하면 더 걸릴 수 있어요." },
  { q: "대리 신청이 가능한가요?", a: "위임장과 신분증 사본이 있으면 가능한 경우가 많아요." },
  { q: "비용이 드나요?", a: "대부분 무료예요. 일부 수수료가 발생할 수 있어요." }
];

const REFERENCES = [{ category: "참고", items: [{ label: "관련 법령·기관", url: "https://www.law.go.kr" }] }];
const RELATED: { slug: string; title: string; description: string }[] = [];

const COMPARE_ROWS = [
  { label: "적용 대상", optionA: "A 유형", optionB: "B 유형" },
  { label: "핵심 차이", optionA: "내용 A", optionB: "내용 B" },
  { label: "적용 기준", optionA: "기준 A", optionB: "기준 B" },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>보험</p>
      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        5세대 실손보험 차이:<br />
        4세대 비교
      </h1>
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        5세대 실손보험이 4세대랑 뭐가 다른지 궁금하신가요? 비급여 50% 축소, 도수치료 제외, 중증 보장 강화까지 핵심 차이를 정리해드려요.
      </p>
      <Divider />
      <ArticleAd position="intro" />

      <H2>핵심부터 짚어볼게요</H2>
      <p style={body}>가장 중요한 내용을 먼저 정리했어요.</p>
      <GreenBox>
        5세대 실손보험이 4세대랑 뭐가 다른지 궁금하신가요? 비급여 50% 축소, 도수치료 제외, 중증 보장 강화까지 핵심 차이를 정리해드려요.
      </GreenBox>

      <H2>핵심 차이를 비교해봐요</H2>
      <p style={body}>한눈에 차이를 확인할 수 있어요.</p>
      <CompareTable titleA="A 유형" titleB="B 유형" rows={COMPARE_ROWS} />

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
