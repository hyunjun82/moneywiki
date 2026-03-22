"use client";

// Q1. 전세 살다가 보증금 올려줬는데, 증액분도 기존 확정일자로 보호되는지 불안한 상황이에요.
// Q2. 증액계약서 작성 후 새 확정일자를 받아서 증액분도 우선변제권을 확보하는 행동.
// Q3. 증액분은 기존 확정일자로 보호 안 됨, 새 확정일자 필요, 기존 보증금 순위 유지, 소액보증금 최우선변제 별도.
// Q4. GreenBox(핵심 결론) + Steps(확정일자 받는 절차) + BorderBox(계산 예시) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Steps, Divider, body,
  FAQ, References, Disclaimer, ArticleAd,
  ArticleLayout, RelatedArticles,
} from "@/components/article-ui";

const FAQS = [
  {
    q: "전세금 올려준 건데 확정일자 안 받으면 어떻게 되나요?",
    a: "증액분은 우선변제권이 없어요. 집이 경매로 넘어가면 증액분은 후순위로 밀려서 못 받을 수 있어요. 기존 보증금만 원래 순위로 보호받아요.",
  },
  {
    q: "기존 1억에 확정일자 있었는데 2억으로 올렸어요. 어떻게 되나요?",
    a: "기존 1억은 원래 확정일자 날짜로 보호받고요. 증액한 1억은 새 확정일자 받은 날부터 보호돼요. 두 금액의 순위가 달라지는 거예요.",
  },
  {
    q: "확정일자는 어디서 받나요?",
    a: "주민센터에서 계약서 들고 가면 바로 찍어줘요. 인터넷등기소에서도 온라인으로 받을 수 있어요. 수수료는 600원이에요.",
  },
  {
    q: "묵시적 갱신이면 확정일자를 다시 받아야 하나요?",
    a: "보증금 변동 없이 묵시적 갱신됐다면 기존 확정일자가 유지돼요. 하지만 보증금이 올랐다면 증액분에 대해 새 확정일자가 필요해요.",
  },
  {
    q: "소액보증금 최우선변제와 우선변제권은 다른 건가요?",
    a: "달라요. 소액보증금 최우선변제는 확정일자 없이도 보호돼요. 하지만 보증금이 일정 금액 이하여야 하고, 경매 낙찰가의 1/2 범위에서만 받을 수 있어요.",
  },
  {
    q: "전세권 설정과 확정일자, 뭐가 나은가요?",
    a: "전세권 설정은 등기가 필요해서 집주인 동의가 필요하고 비용이 들어요. 확정일자는 600원이면 되니까 훨씬 간편해요. 보호 효과는 비슷해요.",
  },
],

STEPS = [
  { title: "증액계약서 작성", desc: "보증금 증액 내용이 담긴 계약서를 작성해요. 기존 계약서에 특약으로 추가하거나, 변경계약서를 따로 만들어도 돼요.", tip: "증액 금액, 날짜, 양측 서명이 꼭 있어야 해요" },
  { title: "주민센터 방문 또는 인터넷등기소 접속", desc: "증액계약서를 들고 가까운 주민센터에 가거나, 인터넷등기소(iros.go.kr)에서 온라인으로 신청해요.", tip: "온라인은 공동인증서가 필요해요" },
  { title: "확정일자 신청", desc: "증액계약서에 확정일자를 받아요. 수수료는 600원이에요. 주민센터는 즉시 발급, 온라인은 1~2일 걸려요." },
  { title: "계약서 보관", desc: "확정일자 받은 계약서를 분실하지 않게 보관해요. 원본은 자신이 갖고 사본 하나를 따로 보관하면 안전해요." },
];

const REFERENCES = [
  {
    category: "공식 자료",
    items: [
      { label: "주택임대차보호법 전문", url: "https://www.law.go.kr/법령/주택임대차보호법" },
      { label: "찾기쉬운 생활법령정보 — 보증금 보호", url: "https://easylaw.go.kr/CSP/CnpClsMain.laf?popMenu=ov&csmSeq=629&ccfNo=2&cciNo=3&cnpClsNo=1" },
    ],
  },
];

const RELATED = [
  { slug: "확정일자-받는-방법", title: "확정일자 받는 방법", description: "주민센터·인터넷등기소에서 확정일자 받는 절차예요." },
  { slug: "대항력-우선변제권", title: "대항력과 우선변제권 차이", description: "전입신고만으로 생기는 대항력과, 확정일자까지 갖춰야 하는 우선변제권을 비교해요." },
  { slug: "전세-보증금-반환", title: "전세 보증금 반환 절차", description: "계약 만료 후 보증금 못 돌려받을 때 대처법이에요." },
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>부동산 · 전세 · 임대차</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        보증금 올려줬는데 우선변제권은?<br />
        증액분 확정일자 받는 법
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        전세 살다가 집주인이 보증금 올려달라고 해서 올려주셨죠?
        "기존에 확정일자 받아뒀으니까 증액분도 자동으로 보호받겠지" 싶으실 텐데요.
        아니에요. 증액분은 별도로 확정일자를 받아야 우선변제권이 생겨요.
      </p>

      <ArticleAd position="intro" />

      <Divider />

      <H2>증액분은 왜 자동으로 보호 안 되나요?</H2>
      <p style={body}>
        <a href="https://www.law.go.kr/법령/주택임대차보호법" style={{ color: "#1D9E75", textDecoration: "underline" }}>주택임대차보호법 제3조의2</a>에 따르면
        우선변제권은 대항요건(전입신고 + 점유)과 확정일자를 갖춘 때 생겨요.
        기존 보증금에 대한 확정일자는 기존 금액만 보호하고, 증액된 부분은 별도의 확정일자가 필요해요.
      </p>

      <GreenBox>
        핵심 정리예요.<br />
        · 기존 보증금: 원래 확정일자 순위 <strong>그대로 유지</strong><br />
        · 증액분: 새 확정일자 받은 날부터 보호 시작<br />
        · 확정일자 안 받으면: 증액분은 <strong>우선변제권 없음</strong> (경매 시 후순위)
      </GreenBox>

      <RelatedArticles items={RELATED} />

      <Divider />

      <H2>확정일자 받는 절차</H2>
      <p style={body}>
        증액계약서만 준비하면 돼요. 주민센터 가면 그 자리에서 바로 받을 수 있고, 인터넷등기소에서 온라인 신청도 가능해요.
      </p>

      <SectionBadge>증액분 확정일자 받기</SectionBadge>
      <Steps steps={STEPS} />

      <Divider />

      <H2>기존 보증금과 증액분, 순위가 어떻게 나뉘나요?</H2>
      <p style={body}>
        경매로 넘어갔을 때 기존 보증금은 원래 확정일자 날짜 기준으로 배당받아요.
        증액분은 새 확정일자 날짜 기준이에요. 같은 세입자인데 보증금 안에서 순위가 갈리는 거죠.
      </p>

      <BorderBox>
        예시로 볼게요.<br /><br />
        <strong>기존 계약</strong>: 보증금 1억원 (2024.3.1 확정일자)<br />
        <strong>증액 후</strong>: 보증금 1억 5천만원 (2025.3.1 증액계약서 + 확정일자)<br /><br />
        → 1억원은 2024.3.1 순위로 배당<br />
        → 5천만원은 2025.3.1 순위로 배당<br /><br />
        만약 2024.6월에 근저당 2억이 설정됐다면?<br />
        → 기존 1억은 근저당보다 <strong>앞순위</strong> (보호됨)<br />
        → 증액 5천만은 근저당보다 <strong>뒷순위</strong> (못 받을 수 있음)
      </BorderBox>

      <p style={body}>
        그래서 증액 전에 등기부등본을 꼭 확인해야 해요.
        근저당이 많이 잡혀 있다면 증액분을 올려줄지 신중하게 판단하는 게 좋아요.
      </p>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 주택임대차보호법과 찾기쉬운 생활법령정보를 바탕으로 작성됐어요. 구체적인 분쟁은 법률 전문가 상담을 받아보는 게 정확해요." />
    </ArticleLayout>
  );
}
