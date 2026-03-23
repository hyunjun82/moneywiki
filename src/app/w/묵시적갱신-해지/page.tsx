"use client";

// Q1. 이 키워드를 검색하는 사람은 지금 어떤 상황인가?
//     → 묵시적갱신된 상태에서 이사를 가야 하는데, 바로 나갈 수 있는지, 통보 절차가 어떤지 모르는 상황이에요.
// Q2. 이 사람이 이 글을 읽고 나서 할 수 있어야 하는 행동은?
//     → 집주인에게 해지 통보를 하고, 3개월 뒤 보증금을 돌려받는 행동.
// Q3. 이 행동을 하려면 반드시 알아야 하는 정보는?
//     → 세입자만 해지 가능(집주인 불가), 통보 후 3개월 효력, 내용증명 방법, 보증금 반환 시점.
// Q4. 이 정보를 가장 잘 전달하는 형태는?
//     → Steps(해지 절차) + GreenBox(핵심 규칙) + BorderBox(내용증명 작성법) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  FAQ, References, Disclaimer, ArticleAd, Steps,
  ArticleLayout,
} from "@/components/article-ui";

const STEPS = [
  { title: "해지 의사 결정", desc: "묵시적갱신 상태에서 이사를 결정했다면, 집주인에게 해지를 통보해야 해요.", tip: "구두 통보도 유효하지만 증거가 남지 않아요." },
  { title: "내용증명 발송", desc: "우체국에서 내용증명을 보내세요. '묵시적갱신된 임대차계약을 해지한다'는 내용을 적어요.", tip: "문자·카톡도 되지만 내용증명이 법적으로 가장 확실해요." },
  { title: "3개월 대기", desc: "집주인이 통보를 받은 날부터 3개월이 지나면 계약 해지 효력이 발생해요." },
  { title: "보증금 정산·퇴거", desc: "해지 효력 발생일에 맞춰 보증금을 돌려받고 이사해요. 관리비, 공과금 정산도 함께 하세요." },
];

const FAQS = [
  {
    q: "집주인이 묵시적갱신 후 나가라고 할 수 있나요?",
    a: "안 돼요. 주택임대차보호법 제6조의2에 따라 세입자만 해지 통보를 할 수 있어요. 집주인은 세입자가 나가겠다고 하기 전까지 일방적으로 해지할 수 없어요.",
  },
  {
    q: "3개월 안 기다리고 바로 나갈 수 있나요?",
    a: "법적으로는 안 돼요. 통보 후 3개월이 지나야 해지 효력이 생겨요. 다만 집주인과 합의하면 기간을 앞당길 수 있어요.",
  },
  {
    q: "해지 통보는 문자로 해도 되나요?",
    a: "네, 문자나 카톡도 법적으로 유효해요. 다만 분쟁이 생길 수 있으니 내용증명이 가장 안전해요. 비용은 2,000~3,000원 정도예요.",
  },
  {
    q: "3개월 계산은 언제부터인가요?",
    a: "집주인이 해지 통보를 받은 날의 다음 날부터 3개월이에요. 내용증명이면 배달 완료일 다음 날부터 계산해요.",
  },
  {
    q: "묵시적갱신 중인데 전세금을 올려달라고 하면요?",
    a: "묵시적갱신된 계약은 이전과 동일한 조건이에요. 집주인이 일방적으로 전세금을 올릴 수 없어요.",
  },
  {
    q: "보증금은 정확히 언제 돌려받나요?",
    a: "해지 효력 발생일(통보 도달 후 3개월)에 돌려받아요. 실제로는 이사일에 맞춰 집주인과 협의하는 경우가 많아요.",
  },
];

const REFERENCES = [
  {
    category: "법령·정부 자료",
    items: [
      { label: "주택임대차보호법 제6조의2", url: "https://www.law.go.kr/법령/주택임대차보호법" },
      { label: "찾기쉬운 생활법령정보 — 묵시적갱신", url: "https://www.easylaw.go.kr/CSP/OnhunqueansInfoRetrieve.laf?onhunqnaAstSeq=84&onhunqueSeq=5312" },
      { label: "정부24 임대차계약 신고", url: "https://www.gov.kr" },
    ],
  },
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>부동산 · 임대차</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        묵시적갱신 후 이사 가려면?<br />
        해지 통보부터 보증금 반환까지
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        계약이 묵시적갱신됐는데 이사를 가야 해요.
        세입자는 언제든 해지 통보를 할 수 있고, 통보 후 3개월이 지나면 나갈 수 있어요.
        집주인은 일방적으로 나가라고 할 수 없어요.
      </p>

      <ArticleAd position="intro" />
      <Divider />

      <H2>묵시적갱신 해지, 핵심 규칙 3가지</H2>
      <p style={body}>
        <a href="https://www.law.go.kr/법령/주택임대차보호법" style={{ color: "#1D9E75", textDecoration: "underline" }}>주택임대차보호법 제6조의2</a>가
        묵시적갱신 후 해지 규칙을 정하고 있어요.
        세입자에게 유리한 조항이라 꼭 알아두세요.
      </p>

      <GreenBox>
        <strong>1.</strong> 세입자만 해지 통보 가능 (집주인은 불가)<br />
        <strong>2.</strong> 통보 후 3개월 지나면 해지 효력 발생<br />
        <strong>3.</strong> 묵시적갱신 중에도 2년간 거주할 권리 있음
      </GreenBox>

      <Divider />

      <H2>해지 절차는 어떻게 되나요?</H2>
      <p style={body}>
        해지 의사를 밝힌 뒤 3개월만 기다리면 돼요.
        가장 중요한 건 <strong>통보 증거를 남기는 것</strong>이에요.
        내용증명으로 보내면 나중에 분쟁이 생겨도 안전해요.
      </p>

      <SectionBadge>해지 절차 4단계</SectionBadge>
      <Steps steps={STEPS} />

      <Divider />

      <H2>내용증명은 어떻게 보내나요?</H2>
      <p style={body}>
        우체국에 가서 내용증명 양식을 받거나, 인터넷우체국에서 전자 내용증명을 보낼 수 있어요.
        비용은 2,000~3,000원 수준이에요. 같은 내용을 3부 작성해서 보내면 돼요.
      </p>

      <BorderBox title="내용증명 핵심 기재사항">
        · 임대차 목적물 주소<br />
        · 임대인·임차인 이름과 연락처<br />
        · "묵시적갱신된 임대차계약을 해지합니다"라는 문구<br />
        · 발송 날짜와 서명<br />
        · 보증금 반환 요청 내용
      </BorderBox>

      <p style={body}>
        <a href="/w/묵시적갱신" style={{ color: "#1D9E75", textDecoration: "underline" }}>묵시적갱신</a>이 되면 이전 계약과 동일한 조건으로 자동 연장돼요.
        <a href="/w/계약갱신청구권-기간" style={{ color: "#1D9E75", textDecoration: "underline" }}>계약갱신청구권</a>과는 별개 제도이니 헷갈리지 마세요.
      </p>

      <Divider />

      <FAQ items={FAQS} />
      <Divider />
      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 주택임대차보호법을 바탕으로 작성됐어요. 구체적인 분쟁은 법률구조공단(132)에 상담하세요." />
    </ArticleLayout>
  );
}
