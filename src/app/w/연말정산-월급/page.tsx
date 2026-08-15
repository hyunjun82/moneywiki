"use client";
// Q1. 매달 월급에서 세금이 빠지는데 연말정산이랑 어떤 관계인지, 환급은 언제 들어오는지 궁금한 직장인.
// Q2. 원천징수 구조를 이해하고 환급·추가납부 결과를 예측해서 공제 항목을 챙기는 행동.
// Q3. 원천징수 = 매월 미리 떼기, 연말정산 = 1년 치 정산, 환급 시기(2~3월), 추가납부 시 월급 차감, 분할납부.
// Q4. GreenBox(핵심 구조) + BorderBox(계산 예시) + Checklist(환급 늘리기 전략) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Checklist, Divider, body,
  FAQ, References, Disclaimer, ArticleAd,
  ArticleLayout, RelatedArticles,
} from "@/components/article-ui";

const FAQS = [
  {
    q: "연말정산 환급금은 언제 들어오나요?",
    a: "보통 2월이나 3월 월급에 합쳐서 들어와요. 회사마다 다를 수 있으니 급여 담당자에게 확인하세요.",
  },
  {
    q: "환급 대신 세금을 더 내야 할 수도 있나요?",
    a: "네, 추가 납부세액이 나오면 월급에서 차감돼요. 금액이 크면 2~3개월 분할납부를 회사에 요청할 수 있어요.",
  },
  {
    q: "매월 떼는 세금은 어떻게 정해지나요?",
    a: "국세청 간이세액표를 기준으로 회사가 원천징수해요. 부양가족 수에 따라 달라져요.",
  },
  {
    q: "보너스에서도 세금을 떼나요?",
    a: "네, 상여금·보너스에서도 원천징수해요. 이것도 연말정산할 때 합산돼요.",
  },
  {
    q: "원천징수 비율을 높이면 환급이 많아지나요?",
    a: "맞아요. 회사에 원천징수 비율을 120%로 올려달라고 하면 매월 세금을 더 떼고, 연말에 환급이 커져요. 반대로 80%로 낮추면 매월 손에 쥐는 돈이 늘지만 연말에 추가납부할 수 있어요.",
  },
];

const REFERENCES = [
  {
    category: "공식 자료",
    items: [
      { label: "국세청 연말정산 안내", url: "https://www.nts.go.kr/nts/cm/cntnts/cntntsView.do?mi=6591&cntntsId=7870" },
      { label: "소득세법", url: "https://www.law.go.kr/법령/소득세법" },
      { label: "홈택스 간소화서비스", url: "https://www.hometax.go.kr" },
    ],
  },
];

const RELATED = [
  { slug: "연말정산", title: "연말정산 기본 가이드", description: "연말정산 전체 흐름과 핵심 공제 항목이에요." },
  { slug: "연말정산-신용카드등-사용액", title: "신용카드 소득공제", description: "카드 사용액 공제율·한도·계산법이에요." },
  { slug: "연말정산-교원", title: "교원 연말정산 특수 항목", description: "방과후수당·사학연금 등 교원만의 포인트예요." },
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>연말정산 · 월급 · 원천징수</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        연말정산이 월급에 어떻게 반영되나요?<br />
        원천징수·환급·추가납부 구조
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        매달 월급에서 세금을 떼가는데 <a href="/w/연말정산" style={{ color: "#1D9E75", textDecoration: "underline" }}>연말정산</a>은 왜 하는 걸까요?
        매월 미리 뗀 세금을 1년 치 실제 세금과 비교해서 정산하는 거예요.
        공제를 많이 받으면 2월 월급이 두둑해지고, 못 받으면 오히려 줄어들어요.
      </p>

      <ArticleAd position="intro" />

      <Divider />

      <H2>원천징수와 연말정산의 관계</H2>

      <GreenBox>
        <strong>흐름을 한 줄로 정리하면</strong><br />
        매월 급여에서 세금 미리 떼기(원천징수) → 12개월 합산 → 실제 세금과 비교(연말정산) → 차액 돌려받거나 더 내기
      </GreenBox>

      <p style={body}>
        회사는 <a href="https://www.nts.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>국세청</a> 간이세액표를 기준으로 매월 소득세를 떼요.
        월급 300만원이면 약 10만원 정도, 부양가족 수에 따라 달라져요.
        12개월 동안 뗀 총액이 실제 세금보다 많으면 돌려받고, 적으면 더 내는 구조예요.
      </p>

      <Divider />

      <H2>환급금은 2월 월급에 합쳐져요</H2>

      <BorderBox>
        <strong>환급 예시</strong><br /><br />
        · 평소 월급: 300만원<br />
        · 12개월 원천징수 합계: 120만원 (월 10만원 x 12)<br />
        · 연말정산 결과 실제 세금: 80만원<br />
        · 환급금: 120만 - 80만 = <strong>40만원</strong><br />
        · 2월 월급: 300만 + 40만 = <strong>340만원</strong>
      </BorderBox>

      <p style={body}>
        회사에 따라 3월에 지급하는 경우도 있어요.
        국세청이 환급 승인하면 회사가 본인 계좌로 입금해줘요.
      </p>

      <RelatedArticles items={RELATED} />

      <Divider />

      <H2>추가 납부세액, 월급에서 빠져요</H2>
      <p style={body}>
        세금을 덜 뗐으면 반대로 더 내야 해요. 이걸 추가 납부세액이라고 하는데,
        보통 2월 월급에서 차감돼요.
      </p>

      <BorderBox>
        <strong>추가납부 예시</strong><br /><br />
        · 12개월 원천징수 합계: 100만원<br />
        · 연말정산 결과 실제 세금: 130만원<br />
        · 추가 납부: <strong>30만원</strong><br />
        · 2월 월급: 300만 - 30만 = <strong>270만원</strong><br /><br />
        금액이 크면 회사에 요청해서 2~3개월 분할납부할 수 있어요.
      </BorderBox>

      <Divider />

      <H2>환급 늘리는 공제 항목 체크</H2>

      <SectionBadge>연말정산 전 체크리스트</SectionBadge>
      <Checklist items={[
        "신용카드 공제 — 총급여 25% 초과분부터 공제 시작",
        "의료비·교육비 세액공제 — 영수증 누락 확인",
        "부양가족 인적공제 — 부모님·자녀 1인당 150만원 소득공제",
        "월급명세서 보관 — 원천징수세액 합산해서 환급 예상액 계산",
        "원천징수 비율 조정 — 120%로 올리면 매월 더 떼고 환급 커짐",
      ]} />

      <p style={body}>
        <a href="/w/연말정산-신용카드등-사용액" style={{ color: "#1D9E75", textDecoration: "underline" }}>신용카드 공제</a>는
        체크카드(30%)가 신용카드(15%)보다 공제율이 2배 높아요.
        <a href="https://www.hometax.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>홈택스 간소화서비스</a>에서
        1월에 전년도 자료를 조회하고, 누락된 게 없는지 꼭 확인하세요.
      </p>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 국세청 연말정산 안내와 소득세법을 바탕으로 작성했어요. 원천징수 세액은 부양가족 수·급여에 따라 달라지니, 정확한 금액은 급여명세서로 확인해봐요." />
    </ArticleLayout>
  );
}
