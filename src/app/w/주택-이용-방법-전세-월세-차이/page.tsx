"use client";

// Q1: 주택 이용 방법 전세 월세 반전세 차이 info
// Q2: 첫째: 전세, 월세, 반전세, 사글세 4가지 방법이 있어요
// Q3: 첫째: 전세, 월세, 반전세, 사글세 4가지 방법이 있어요, 둘째: 전세권은 등기가 필수, 월세는 선택이에요, 셋째: 보증금과 월세 조합으로 자신에게 맞는 방법 선택하세요
// Q4: GreenBox + Steps + Checklist + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const STEPS = [
  { title: "첫째: 전세, 월세, 반전세, 사글세 4가지 방법이 있", desc: "첫째: 전세, 월세, 반전세, 사글세 4가지 방법이 있어요" },
  { title: "둘째: 전세권은 등기가 필수, 월세는 선택이에요", desc: "둘째: 전세권은 등기가 필수, 월세는 선택이에요" },
  { title: "셋째: 보증금과 월세 조합으로 자신에게 맞는 방법 선택", desc: "셋째: 보증금과 월세 조합으로 자신에게 맞는 방법 선택하세요" },
];
const CHECKLIST = [
  "첫째: 전세, 월세, 반전세, 사글세 4가지 방법이 있어요",
  "둘째: 전세권은 등기가 필수, 월세는 선택이에요",
  "셋째: 보증금과 월세 조합으로 자신에게 맞는 방법 선택하세요"
];

const FAQS = [
  { q: "전세권 등기 안 하면 어떻게 되나요?", a: "전세권은 등기가 필수예요. 등기 안 하면 전세권이 성립되지 않아서 법적 보호를 못 받아요. 꼭 등기해야 해요." },
  { q: "반전세랑 월세랑 뭐가 다른가요?", a: "반전세는 보증금을 좀 많이 주고 월세를 적게 내는 방식이에요. 순수 월세는 보증금 적고 매달 내는 돈이 많죠." },
  { q: "사글세는 요즘도 쓰나요?", a: "요즘은 거의 안 써요. 월세를 한꺼번에 다 내는 방식인데, 집주인 입장에선 좋지만 세입자는 부담이 커서 잘 안 해요." }
];

const REFERENCES = [
  { category: "출처", items: [
      { label: "찾기쉬운 생활법령정보 - 부동산/임대차", url: "https://www.easylaw.go.kr/CSP/OnhunqueansInfoRetrieve.laf?onhunqnaAstSeq=84&onhunqueSeq=2482" }
  ]},
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>부동산 · 임대차</p>
      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        주택 이용 방법 전세 월세 반전세 차이
      </h1>
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        전세, 월세, 반전세 뭐가 다른지 헷갈리시죠? 각각의 차이점과 장단점을 쉽게 알려드려요.
      </p>
      <Divider />
      <ArticleAd position="intro" />

      <H2>첫째: 전세, 월세, 반전세, 사글세 4가지 방법이 있</H2>
      <p style={body}>첫째: 전세, 월세, 반전세, 사글세 4가지 방법이 있어요</p>
      <GreenBox title="핵심 정리">
        첫째: 전세, 월세, 반전세, 사글세 4가지 방법이 있어요<br />
        둘째: 전세권은 등기가 필수, 월세는 선택이에요<br />
        셋째: 보증금과 월세 조합으로 자신에게 맞는 방법 선택하세요
      </GreenBox>

      <CategoryButton label="부동산 · 임대차 정보" count={5} href="/category/부동산" />
      <RelatedArticles items={[]} />
      <Divider />

      <H2>둘째: 전세권은 등기가 필수, 월세는 선택이에</H2>
      <p style={body}>둘째: 전세권은 등기가 필수, 월세는 선택이에요</p>
      <Steps steps={STEPS} />
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
