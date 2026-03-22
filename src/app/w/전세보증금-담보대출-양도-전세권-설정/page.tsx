"use client";

// Q1: 전세보증금 담보 대출 양도 전세권 설정 2026 info
// Q2: 전세보증금반환채권: 양도 가능하지만 임대인에게 통지하거나 승낙 필요
// Q3: 전세보증금반환채권: 양도 가능하지만 임대인에게 통지하거나 승낙 필요, 전세권 설정: 등기해야 대항력 생기며 제3자에게 권리 주장 가능, 실효성 낮음: 임대인이 우선 돌려받을 권리가 있어 담보로 불안정
// Q4: GreenBox + Checklist + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Checklist, FAQ, References, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const CHECKLIST = [
  "전세보증금반환채권: 양도 가능하지만 임대인에게 통지하거나 승낙 필요",
  "전세권 설정: 등기해야 대항력 생기며 제3자에게 권리 주장 가능",
  "실효성 낮음: 임대인이 우선 돌려받을 권리가 있어 담보로 불안정"
];

const FAQS = [
  { q: "전세보증금을 담보로 돈을 빌려주면 안전한가요?", a: "아니요, 안전하지 않아요. 전세보증금반환채권은 임대인이 세입자에게 돌려줘야 하는 돈인데, 채권양도나 전세권 설정 없이 담보로 잡으면 실질적으로 권리를 행사하기 어려워요." },
  { q: "전세보증금반환채권을 양도받으면 제가 받을 수 있나요?", a: "채권양도계약을 하고 임대인에게 통지하거나 승낙을 받으면 가능해요. 하지만 임대인이 승낙하지 않을 수 있고, 임대인 부도 시 선순위 채권자들에게 밀려날 수 있어요." },
  { q: "전세권 설정과 전세계약은 뭐가 다른가요?", a: "전세계약은 보증금을 맡기고 집을 빌리는 일반적인 계약이고, 전세권 설정은 등기부등본에 전세권을 등기해서 법적으로 강한 권리를 확보하는 거예요. 전세권은 대항력이 있어서 제3자에게도 권리 주장이 가능해요." }
];

const REFERENCES = [
  { category: "출처", items: [
      { label: "주택임대차보호법", url: "https://www.law.go.kr/법령/주택임대차보호법" },
      { label: "민법 제621조 (전세권)", url: "https://www.law.go.kr/법령/민법" }
  ]},
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>금융 · 경제</p>
      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        전세보증금 담보 대출 양도 전세권 설정 2026
      </h1>
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        지인이 전세보증금을 담보로 돈을 빌려달래요. 안전할까요? 전세보증금반환채권은 양도할 수 있지만 전세권 설정이나 채권양도 절차 없이는 담보로 활용하기 어려워요.
      </p>
      <Divider />
      <ArticleAd position="intro" />

      <H2>전세보증금반환채권: 양도 가능하지만 임대인에게 통지하거</H2>
      <p style={body}>전세보증금반환채권: 양도 가능하지만 임대인에게 통지하거나 승낙 필요</p>
      <GreenBox title="핵심 정리">
        전세보증금반환채권: 양도 가능하지만 임대인에게 통지하거나 승낙 필요<br />
        전세권 설정: 등기해야 대항력 생기며 제3자에게 권리 주장 가능<br />
        실효성 낮음: 임대인이 우선 돌려받을 권리가 있어 담보로 불안정
      </GreenBox>

      <CategoryButton label="금융 · 경제 정보" count={5} href="/category/금융" />
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
