"use client";

// Q1: 주택연금 3월 달라지는점 신청 전 확인사항 info
// Q2: 2026년 3월부터 주택연금 수령액이 평균 3.13% 인상돼요
// Q3: 2026년 3월부터 주택연금 수령액이 평균 3.13% 인상돼요, 초기보증료가 1.5%에서 1.0%로 낮아져 가입 부담이 줄어요, 우대형 혜택 확대는 6월부터 신규 가입자에게만 적용돼요
// Q4: GreenBox + Steps + Checklist + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const STEPS = [
  { title: "2026년 3월부터 주택연금 수령액이 평균 3.13% ", desc: "2026년 3월부터 주택연금 수령액이 평균 3.13% 인상돼요" },
  { title: "초기보증료가 1.5%에서 1.0%로 낮아져 가입 부담이", desc: "초기보증료가 1.5%에서 1.0%로 낮아져 가입 부담이 줄어요" },
  { title: "우대형 혜택 확대는 6월부터 신규 가입자에게만 적용돼요", desc: "우대형 혜택 확대는 6월부터 신규 가입자에게만 적용돼요" },
];
const CHECKLIST = [
  "2026년 3월부터 주택연금 수령액이 평균 3.13% 인상돼요",
  "초기보증료가 1.5%에서 1.0%로 낮아져 가입 부담이 줄어요",
  "우대형 혜택 확대는 6월부터 신규 가입자에게만 적용돼요"
];

const FAQS = [
  { q: "주택연금 3월 변경사항은 기존 가입자도 받나요?", a: "네, 수령액 3.13% 인상은 기존 가입자도 모두 적용돼요. 3월부터 자동으로 늘어난 금액을 받게 돼요." },
  { q: "주택연금 3월 신청하면 초기보증료 환급도 가능한가요?", a: "네, 3월부터 초기보증료 환급 기간이 3년에서 5년으로 확대돼요. 5년 안에 해지하면 환급받을 수 있어요." }
];

const REFERENCES = [
  { category: "출처", items: [
      { label: "금융위원회 - 주택연금 보장 확대 및 편의성 제고", url: "https://www.fsc.go.kr/no010101/86211" },
      { label: "한국주택금융공사 - 주택연금", url: "https://www.hf.go.kr/ko/sub03/sub03_01_01_01.do" },
      { label: "서울신문 - 주택연금 수령액 인상", url: "https://www.seoul.co.kr/news/economy/finance/2026/02/05/20260205500116" }
  ]},
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>부동산 · 임대차</p>
      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        주택연금 3월 달라지는점 신청 전 확인사항
      </h1>
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        2026년 3월부터 주택연금 수령액이 3.13% 인상된다는 거 아시나요? 초기보증료도 1.5%에서 1.0%로 낮아지고, 우대형 혜택도 확대돼요
      </p>
      <Divider />
      <ArticleAd position="intro" />

      <H2>2026년 3월부터 주택연금 수령액이 평균 3.13% </H2>
      <p style={body}>2026년 3월부터 주택연금 수령액이 평균 3.13% 인상돼요</p>
      <GreenBox title="핵심 정리">
        2026년 3월부터 주택연금 수령액이 평균 3.13% 인상돼요<br />
        초기보증료가 1.5%에서 1.0%로 낮아져 가입 부담이 줄어요<br />
        우대형 혜택 확대는 6월부터 신규 가입자에게만 적용돼요
      </GreenBox>

      <CategoryButton label="부동산 · 임대차 정보" count={5} href="/category/부동산" />
      <RelatedArticles items={[]} />
      <Divider />

      <H2>초기보증료가 1.5%에서 1.0%로 낮아져 가</H2>
      <p style={body}>초기보증료가 1.5%에서 1.0%로 낮아져 가입 부담이 줄어요</p>
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
      <Disclaimer text="이 글은 2026년 2월 기준 정보를 바탕으로 작성됐어요. 최신 정보는 관련 기관에서 직접 확인해보세요." />
    </ArticleLayout>
  );
}
