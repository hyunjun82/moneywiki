"use client";

// Q1: 2026년 6월 청년미래적금 가입 조건과 정부 기여금 혜택 info
// Q2: 2026년 6월 출시, 만 19~34세 소득 6,000만원 이하면 가입 가능해요
// Q3: 2026년 6월 출시, 만 19~34세 소득 6,000만원 이하면 가입 가능해요, 정부 기여금 6~12%, 3년 만에 최대 2,200만원 만들 수 있어요, 청년도약계좌와 중복 불가, 갈아타기는 패널티 없이 가능해요
// Q4: GreenBox + Steps + Checklist + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const STEPS = [
  { title: "2026년 6월 출시, 만 19~34세 소득 6,000", desc: "2026년 6월 출시, 만 19~34세 소득 6,000만원 이하면 가입 가능해요" },
  { title: "정부 기여금 6~12%, 3년 만에 최대 2,200만원", desc: "정부 기여금 6~12%, 3년 만에 최대 2,200만원 만들 수 있어요" },
  { title: "청년도약계좌와 중복 불가, 갈아타기는 패널티 없이 가능", desc: "청년도약계좌와 중복 불가, 갈아타기는 패널티 없이 가능해요" },
];
const CHECKLIST = [
  "2026년 6월 출시, 만 19~34세 소득 6,000만원 이하면 가입 가능해요",
  "정부 기여금 6~12%, 3년 만에 최대 2,200만원 만들 수 있어요",
  "청년도약계좌와 중복 불가, 갈아타기는 패널티 없이 가능해요"
];

const FAQS = [
  { q: "청년미래적금 언제부터 가입할 수 있나요?", a: "2026년 6월에 출시 예정이에요. 정확한 날짜는 정부에서 5월쯤 발표할 거예요." },
  { q: "청년미래적금 청년도약계좌 동시 가입 되나요?", a: "안 돼요. 중복 가입은 불가능하고, 기존 청년도약계좌에서 청년미래적금으로 갈아타는 건 패널티 없이 가능해요." }
];

const REFERENCES = [
  { category: "출처", items: [
      { label: "기획재정부", url: "https://www.moef.go.kr" },
      { label: "금융위원회", url: "https://www.fsc.go.kr" }
  ]},
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>금융 · 경제</p>
      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        2026년 6월 청년미래적금 가입 조건과 정부 기여금 혜택
      </h1>
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        청년미래적금 2026년 6월 출시돼요. 3년 만에 2,200만원 만드는 조건과 기여금 6% 12% 차이를 알려드려요.
      </p>
      <Divider />
      <ArticleAd position="intro" />

      <H2>2026년 6월 출시, 만 19~34세 소득 6,000</H2>
      <p style={body}>2026년 6월 출시, 만 19~34세 소득 6,000만원 이하면 가입 가능해요</p>
      <GreenBox title="핵심 정리">
        2026년 6월 출시, 만 19~34세 소득 6,000만원 이하면 가입 가능해요<br />
        정부 기여금 6~12%, 3년 만에 최대 2,200만원 만들 수 있어요<br />
        청년도약계좌와 중복 불가, 갈아타기는 패널티 없이 가능해요
      </GreenBox>

      <CategoryButton label="금융 · 경제 정보" count={5} href="/category/금융" />
      <RelatedArticles items={[]} />
      <Divider />

      <H2>정부 기여금 6~12%, 3년 만에 최대 2,</H2>
      <p style={body}>정부 기여금 6~12%, 3년 만에 최대 2,200만원 만들 수 있어요</p>
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
