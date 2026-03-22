"use client";

// Q1. 퇴직연금을 한 번에 받고 싶은데 방법과 세금이 궁금한 상황이에요.
// Q2. 일시금 수령 조건·세금·절차를 파악하고 연금과 비교해서 유리한 방법을 선택하는 행동.
// Q3. 55세 이상 조건, 퇴직소득세 5~15%, 연금소득세 3.3~5.5%와 비교, 혼합 수령 가능, IRP 해지.
// Q4. GreenBox(핵심 조건) + BorderBox(세금 비교) + Steps(신청 절차) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Steps, Divider, body,
  FAQ, References, Disclaimer, ArticleAd,
  ArticleLayout, RelatedArticles,
} from "@/components/article-ui";

const FAQS = [
  { q: "55세 미만인데 일시금으로 받을 수 있나요?", a: "IRP로 이전된 후 55세가 되면 일시금으로 받을 수 있어요. 55세 전에 중도인출하면 기타소득세 16.5%가 부과돼요." },
  { q: "일시금 세금이 대략 얼마예요?", a: "퇴직소득세 실효세율이 보통 5~15%예요. 근속연수가 길수록 공제가 커서 세금이 줄어요." },
  { q: "일부만 일시금으로 받을 수 있나요?", a: "네. 일부는 일시금, 나머지는 연금으로 분할 수령 가능해요. 당장 필요한 금액만 일시금으로 받으면 세금을 아낄 수 있어요." },
  { q: "전액 일시금 받으면 IRP가 해지되나요?", a: "네, 전액 인출하면 IRP가 해지돼요. 일부만 인출하면 잔액은 유지돼요." },
  { q: "연금이 세금 면에서 얼마나 유리해요?", a: "연금소득세 3.3~5.5%로 퇴직소득세보다 낮아요. 2026년부터 20년 초과 수령 시 감면율이 50%까지 올라서 더 유리해졌어요." },
  { q: "퇴직 시점에 바로 일시금 받을 수 있나요?", a: "55세 이상이고 퇴직급여가 300만원 이하면 IRP 거치지 않고 바로 일시금 수령 가능해요. 그 외에는 IRP 이전 후 신청해야 해요." },
];

const REFERENCES = [
  {
    category: "법령·공식 자료",
    items: [
      { label: "근로자퇴직급여보장법", url: "https://www.law.go.kr/법령/근로자퇴직급여보장법" },
      { label: "소득세법", url: "https://www.law.go.kr/법령/소득세법" },
      { label: "금감원 통합연금포털", url: "https://100lifeplan.fss.or.kr" },
    ],
  },
];

const RELATED = [
  { slug: "퇴직연금-수령-세금", title: "퇴직연금 수령 세금", description: "일시금과 연금의 세금 차이를 자세히 비교해요." },
  { slug: "퇴직연금-수령-일시금-연금-비교", title: "퇴직연금 일시금 vs 연금 비교", description: "어떤 방법이 더 유리한지 비교해드려요." },
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>퇴직연금 · 수령</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        퇴직연금 일시금 수령<br />
        조건·세금·신청 방법
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        퇴직연금을 목돈으로 한 번에 받고 싶죠.
        55세 이상이면 일시금으로 받을 수 있는데, 퇴직소득세가 빠져요.
        연금으로 받는 것보다 세금이 더 많으니 신중하게 결정해야 해요.
      </p>

      <ArticleAd position="intro" />
      <Divider />

      <H2>일시금 수령 조건이 뭔가요?</H2>
      <p style={body}>
        <a href="https://www.law.go.kr/법령/근로자퇴직급여보장법" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로자퇴직급여보장법</a>에 따르면
        퇴직연금 일시금 수령에는 나이 조건이 있어요.
      </p>

      <GreenBox>
        일시금 수령 핵심 조건이에요.<br />
        · 55세 이상이면 일시금으로 받을 수 있어요<br />
        · 퇴직급여 300만원 이하면 IRP 없이 바로 수령 가능<br />
        · 55세 미만은 IRP로 이전 → 55세 후 일시금 신청<br />
        · 일부 일시금 + 일부 연금 혼합 수령도 가능해요
      </GreenBox>

      <RelatedArticles items={RELATED} />
      <Divider />

      <H2>일시금과 연금, 세금이 이렇게 달라요</H2>
      <p style={body}>
        같은 금액이라도 수령 방법에 따라 세금이 크게 달라져요.
        2026년부터 연금 수령 감면율이 더 확대됐어요.
      </p>

      <SectionBadge>세금 비교 (1억원·근속 20년 기준)</SectionBadge>
      <BorderBox>
        <strong>일시금 수령</strong><br />
        퇴직소득세 약 600만원 (실효세율 약 6%)<br />
        실수령액 약 9,400만원<br /><br />
        <strong>연금 수령 (10년간 연 1,000만원)</strong><br />
        연금소득세 연 55만원 x 10년 = 550만원<br />
        실수령액 약 9,450만원<br /><br />
        <strong>차이</strong>: 연금이 약 50만원 유리. 금액이 클수록 차이가 더 커져요.<br />
        2026년부터 20년 초과 연금 수령 시 감면율 최대 50%로 확대됐어요.
      </BorderBox>

      <Divider />

      <H2>일시금 이렇게 신청해요</H2>
      <p style={body}>
        퇴직연금을 가입한 금융기관에서 신청해요.
        앱이나 홈페이지에서 온라인으로 할 수 있어요.
      </p>

      <SectionBadge>신청 절차</SectionBadge>
      <Steps steps={[
        { title: "금융기관 앱·홈페이지 접속", desc: "퇴직연금 가입 금융기관의 앱이나 홈페이지에 로그인해요." },
        { title: "퇴직급여 수령 메뉴 선택", desc: "'퇴직급여 수령' 또는 '인출' 메뉴에서 수령 방법을 '일시금'으로 선택해요." },
        { title: "입금 계좌 정보 입력", desc: "일시금을 받을 본인 계좌 정보를 입력해요. 퇴직소득세가 원천징수된 후 입금돼요." },
        { title: "1~3영업일 내 입금", desc: "신청 후 1~3영업일이면 세금을 뺀 금액이 입금돼요." },
      ]} />

      <Divider />

      <H2>자주 묻는 것들</H2>
      <FAQ items={FAQS} />
      <Divider />
      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 소득세법과 퇴직급여보장법을 바탕으로 작성됐어요. 세율과 조건은 법령 개정 시 달라질 수 있으니 금감원 통합연금포털에서 최신 정보를 확인하세요." />
    </ArticleLayout>
  );
}
