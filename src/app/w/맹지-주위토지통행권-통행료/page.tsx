"use client";
import { Divider } from "@/components/article-ui/Divider";

// Q1: 맹지 주위토지통행권 통행료 보상 info
// Q2: 맹지 소유자는 주위 토지를 통행할 권리가 있어요
// Q3: 맹지 소유자는 주위 토지를 통행할 권리가 있어요, 통행으로 인한 손해는 보상해야 하지만 금액은 협의로 결정돼요, 토지 분할로 생긴 맹지는 통행료를 안 내도 돼요
// Q4: GreenBox + Checklist + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Checklist, FAQ, References, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const CHECKLIST = [
  "맹지 소유자는 주위 토지를 통행할 권리가 있어요",
  "통행으로 인한 손해는 보상해야 하지만 금액은 협의로 결정돼요",
  "토지 분할로 생긴 맹지는 통행료를 안 내도 돼요"
];

const FAQS = [
  { q: "맹지 통행권은 법적으로 인정되나요?", a: "네, 인정돼요. 민법 제219조에서 공로에 출입할 수 없는 토지 소유자는 주위 토지를 통행할 권리가 있다고 정해져 있어요." },
  { q: "통행료는 매달 내는 건가요?", a: "정해진 규칙은 없어요. 쌍방이 협의해서 월별, 연간, 일시불 등으로 정할 수 있어요. 합의가 안 되면 법원에서 결정해요." },
  { q: "통행지 소유자가 통행을 막으면 어떻게 하나요?", a: "법원에 통행권 확인 소송을 제기할 수 있어요. 승소하면 강제로 통행할 수 있고, 방해하면 손해배상을 청구할 수 있어요." }
];

const REFERENCES = [
  { category: "출처", items: [
      { label: "민법", url: "https://www.law.go.kr/법령/민법" },
      { label: "찾기쉬운 생활법령정보", url: "https://easylaw.go.kr" }
  ]},
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>부동산 · 임대차</p>
      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        맹지 주위토지통행권 통행료 보상
      </h1>
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        거주하는 집에서 공로까지 통로가 없는 맹지라면 옆 토지로 통행할 수 있는지, 통행료를 내야 하는지 알아봐요.
      </p>
      <Divider />
      <ArticleAd position="intro" />

      <H2>맹지 소유자는 주위 토지를 통행할 권리가 있어요</H2>
      <p style={body}>맹지 소유자는 주위 토지를 통행할 권리가 있어요</p>
      <GreenBox title="핵심 정리">
        맹지 소유자는 주위 토지를 통행할 권리가 있어요<br />
        통행으로 인한 손해는 보상해야 하지만 금액은 협의로 결정돼요<br />
        토지 분할로 생긴 맹지는 통행료를 안 내도 돼요
      </GreenBox>

      <CategoryButton label="부동산 · 임대차 정보" count={5} href="/category/부동산" />
      <RelatedArticles items={[]} />
      <Divider />

      <H2>꼭 체크해야 할 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>놓치기 쉬운 항목을 정리했어요.</p>
      <SectionBadge>체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />
      <Divider />

      <H2>자주 묻는 것들</H2>
      <FAQ items={FAQS} />
      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 1월 기준 정보를 바탕으로 작성됐어요. 최신 정보는 관련 기관에서 직접 확인해보세요." />
    </ArticleLayout>
  );
}
