"use client";

// Q1: 재개발 분양신청 안하면 보상금 info
// Q2: 분양 안 받으면 현금청산으로 토지와 건물 감정평가액 받아요
// Q3: 분양 안 받으면 현금청산으로 토지와 건물 감정평가액 받아요, 주거이전비와 이사비는 별도로 지급돼요, 감정평가액에 불만 있으면 이의신청하거나 수용재결 신청 가능해요
// Q4: GreenBox + Steps + Checklist + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const STEPS = [
  { title: "분양 안 받으면 현금청산으로 토지와 건물 감정평가액 받", desc: "분양 안 받으면 현금청산으로 토지와 건물 감정평가액 받아요" },
  { title: "주거이전비와 이사비는 별도로 지급돼요", desc: "주거이전비와 이사비는 별도로 지급돼요" },
  { title: "감정평가액에 불만 있으면 이의신청하거나 수용재결 신청 ", desc: "감정평가액에 불만 있으면 이의신청하거나 수용재결 신청 가능해요" },
];
const CHECKLIST = [
  "분양 안 받으면 현금청산으로 토지와 건물 감정평가액 받아요",
  "주거이전비와 이사비는 별도로 지급돼요",
  "감정평가액에 불만 있으면 이의신청하거나 수용재결 신청 가능해요"
];

const FAQS = [
  { q: "재개발 보상금은 언제 받나요?", a: "보통 이주 시점에 일부 받고 나머지는 철거 후 정산해서 받아요. 조합마다 일정이 달라요." },
  { q: "감정평가 금액이 너무 낮은데 어떻게 하나요?", a: "30일 이내에 조합에 이의신청하거나 토지수용위원회에 수용재결 신청할 수 있어요." },
  { q: "세입자도 보상받을 수 있나요?", a: "네, 세입자는 주거이전비와 이사비 받을 수 있어요. 단 일정 조건 충족해야 해요." }
];

const REFERENCES = [
  { category: "출처", items: [
      { label: "도시 및 주거환경정비법", url: "https://www.law.go.kr/법령/도시및주거환경정비법" },
      { label: "찾기쉬운 생활법령정보", url: "https://www.easylaw.go.kr/CSP/CnpClsMain.laf?csmSeq=1168&ccfNo=3&cciNo=2&cnpClsNo=3" }
  ]},
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>부동산 · 임대차</p>
      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        재개발 분양신청 안하면 보상금
      </h1>
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        재개발 구역인데 분양 안 받으면 현금청산으로 토지와 건물 값 보상받아요. 이주비와 이사비도 따로 나와요.
      </p>
      <Divider />
      <ArticleAd position="intro" />

      <H2>분양 안 받으면 현금청산으로 토지와 건물 감정평가액 받</H2>
      <p style={body}>분양 안 받으면 현금청산으로 토지와 건물 감정평가액 받아요</p>
      <GreenBox title="핵심 정리">
        분양 안 받으면 현금청산으로 토지와 건물 감정평가액 받아요<br />
        주거이전비와 이사비는 별도로 지급돼요<br />
        감정평가액에 불만 있으면 이의신청하거나 수용재결 신청 가능해요
      </GreenBox>

      <CategoryButton label="부동산 · 임대차 정보" count={5} href="/category/부동산" />
      <RelatedArticles items={[]} />
      <Divider />

      <H2>주거이전비와 이사비는 별도로 지급돼요</H2>
      <p style={body}>주거이전비와 이사비는 별도로 지급돼요</p>
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
