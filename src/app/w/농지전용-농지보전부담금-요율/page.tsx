"use client";

// Q1. 농지를 다른 용도로 쓰려는데 "부담금 얼마 내야 하지?" 계산하고 싶은 상황
// Q2. 내 농지 지역 확인 → 요율 적용 → 부담금 계산 → 납부
// Q3. 농업진흥지역 30% vs 비농업진흥지역 20%, 상한 5만원/㎡, 감면·면제 대상, 납부 방법
// Q4. GreenBox(요율 요약) + Calculator식 예시(BorderBox) + Steps(납부 절차) + FAQ

import {
  H2, GreenBox, BorderBox, Divider, body,
  Steps, FAQ, References, Disclaimer,
  ArticleLayout, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const PAY_STEPS = [
  {
    title: "농업진흥지역 여부 확인",
    desc: "농지공간포털(njy.mafra.go.kr)에서 내 농지가 농업진흥지역인지 확인해요. 지도에 주소를 입력하면 바로 나와요.",
    link: { label: "농지공간포털 바로가기", href: "https://njy.mafra.go.kr" },
  },
  {
    title: "개별공시지가 확인",
    desc: "부동산공시가격 알리미(realtyprice.kr)에서 개별공시지가를 확인해요. 부담금 계산의 기준이 되는 금액이에요.",
  },
  {
    title: "농지전용 허가 신청",
    desc: "관할 시·군·구청 농지 담당 부서에 농지전용 허가를 신청해요. 허가가 나면 부담금 고지서를 받게 돼요.",
  },
  {
    title: "부담금 납부",
    desc: "한국농어촌공사(fpc.ekr.or.kr)에서 납부해요. 고지서를 받은 날부터 30일 이내에 내야 하죠.",
    tip: "기한 넘기면 가산금이 붙고, 최악의 경우 허가가 취소돼요",
    link: { label: "농지보전부담금 납부", href: "https://fpc.ekr.or.kr" },
  },
];

const FAQS = [
  { q: "농업진흥지역이면 부담금이 더 비싼가요?", a: "네. 농업진흥지역은 30%, 비농업진흥지역은 20%예요. 농업 생산성이 높은 땅일수록 보호 가치가 커서 부담금도 높죠." },
  { q: "2024년에 요율이 바뀌었다던데요?", a: "맞아요. 2024년 7월 1일부터 비농업진흥지역 요율이 30%에서 20%로 인하됐어요. 연간 약 3,540억원의 부담 경감 효과가 있었죠." },
  { q: "부담금을 안 내도 되는 경우가 있나요?", a: "농업인 주택 신축, 농업생산 시설(축사, 창고), 공공시설(도로, 하천) 등은 감면이나 면제돼요." },
  { q: "개별공시지가가 높으면 부담금도 한도 없이 올라가나요?", a: "아니에요. ㎡당 5만원이 상한이에요. 공시지가가 아무리 높아도 5만원/㎡ 이상은 안 내요." },
  { q: "부담금 분할 납부가 가능한가요?", a: "부담금이 1,000만원을 초과하면 분할 납부를 신청할 수 있어요. 관할 시·군·구청에 문의하세요." },
  { q: "농지보전부담금은 어디에 쓰이나요?", a: "대체 농지 조성, 농업 기반 시설 개선, 농지 보전 사업에 사용돼요. 줄어드는 농지를 보전하기 위한 재원이에요." },
];

const REFERENCES = [
  {
    category: "법령·공식 자료",
    items: [
      { label: "농지법 제38조(농지보전부담금)", url: "https://www.law.go.kr/법령/농지법" },
      { label: "농림축산식품부 농지공간포털", url: "https://njy.mafra.go.kr" },
      { label: "한국농어촌공사 농지보전부담금", url: "https://fpc.ekr.or.kr" },
    ],
  },
];

const RELATED = [
  { slug: "농지전용-허가", title: "농지전용 허가 절차", description: "농지를 다른 용도로 쓰기 위한 허가 절차를 정리했어요." },
  { slug: "농지-상속-임대-가능-조건", title: "농지 상속 임대 조건", description: "상속받은 농지를 임대할 수 있는 조건이에요." },
  { slug: "취득세-계산-세율-납부", title: "취득세 계산과 세율", description: "부동산 취득 시 내는 취득세 계산 방법이에요." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>부동산 · 농지 · 부담금</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        농지보전부담금, 얼마나 내야 하나요?<br />
        요율 계산과 납부 방법
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        농지를 상속받았는데 농사 대신 주택을 짓거나 다른 용도로 쓰고 싶다면, 농지전용 허가를 받으면서 농지보전부담금을 내야 해요.
        <a href="https://www.law.go.kr/법령/농지법" style={{ color: "#1D9E75", textDecoration: "underline" }}>농지법 제38조</a>에 따라
        농업진흥지역은 공시지가의 30%, 비농업진흥지역은 20%예요. 상한은 ㎡당 5만원이에요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>요율, 한눈에 정리</H2>
      <p style={body}>
        내 농지가 어느 지역인지에 따라 부담금이 달라져요. 2024년 7월부터 비농업진흥지역 요율이 내려갔어요.
      </p>

      <GreenBox>
        <strong>농업진흥지역</strong>: 개별공시지가 x 30%<br />
        <strong>비농업진흥지역</strong>: 개별공시지가 x 20% (2024.7 인하)<br />
        <strong>상한</strong>: ㎡당 50,000원 (아무리 높아도 이 이상 안 내요)<br /><br />
        <strong>감면·면제</strong>: 농업인 주택 신축, 농업생산 시설, 공공시설 등
      </GreenBox>

      <H2>계산 예시</H2>
      <p style={body}>
        개별공시지가 10만원/㎡인 농지 300㎡를 전용한다고 가정해볼게요.
      </p>

      <BorderBox>
        <strong>농업진흥지역</strong><br />
        100,000원 x 300㎡ x 30% = <strong>9,000,000원</strong><br /><br />
        <strong>비농업진흥지역</strong><br />
        100,000원 x 300㎡ x 20% = <strong>6,000,000원</strong><br /><br />
        같은 농지라도 지역 지정에 따라 300만원 차이가 나요.<br />
        공시지가 20만원이면 농업진흥지역은 계산상 6만원/㎡지만 상한 5만원 적용돼요.
      </BorderBox>

      <H2>납부 절차, 4단계로 끝내요</H2>
      <p style={body}>
        먼저 내 농지 지역을 확인하고, 전용 허가 후 고지서를 받아 납부해요.
      </p>

      <Steps steps={PAY_STEPS} />

      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      <H2>자주 묻는 것들</H2>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 농지법 기준으로 작성됐어요. 공시지가와 감면 대상은 매년 변경될 수 있으니 관할 시·군·구청 농지 담당 부서에서 확인하세요." />
    </ArticleLayout>
  );
}
