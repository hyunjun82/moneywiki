"use client";
// Q1: 경매 낙찰 후 소유권이전등기를 어떻게 해야 하는지 모르는 사람
// Q2: 경매 등기 절차 이해하고 법원에 서류 제출 (또는 일반 매매면 인터넷등기소 이용)
// Q3: 법원촉탁 vs 직접신청 차이, 필요 서류, 말소 처리, 등기 확인 방법
// Q4: Steps + DocTable + BorderBox + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, DocTable, FAQ, References, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const STEPS_AUCTION = [
  {
    title: "매각대금 전액 납부",
    desc: "법원이 정한 납부기한 안에 매각대금을 전액 납부해요. 납부 즉시 해당 부동산의 소유권이 이전돼요. 이때부터 관리비·세금 등 비용도 매수인 부담이에요.",
    tip: "납부기한을 넘기면 보증금을 몰수당하고 재경매가 진행돼요",
  },
  {
    title: "취득세 신고 및 납부",
    desc: "부동산 취득일(매각대금 완납일)로부터 60일 이내에 취득세를 신고·납부해야 해요. 등기 전에 취득세를 먼저 내야 해서 이 순서를 꼭 지켜야 해요. 위택스(wetax.go.kr) 또는 관할 시·군·구청에서 납부 가능해요.",
    link: { label: "위택스에서 취득세 납부", href: "https://www.wetax.go.kr" },
  },
  {
    title: "법원에 서류 제출",
    desc: "매각대금 완납 후 법원 집행관실에 주민등록등본, 취득세 납부 영수증 등 필요 서류를 제출해요. 법원이 요청하는 서류 목록은 법원마다 조금 다를 수 있어요. 제출하면 법원이 알아서 등기소에 소유권이전등기를 촉탁해요.",
    tip: "법원에 서류 제출 전에 담당 계장에게 필요 서류를 전화로 미리 확인하면 헛걸음을 줄일 수 있어요",
  },
  {
    title: "등기 완료 및 등기부등본 확인",
    desc: "법원 촉탁으로 등기가 완료되면 등기필증이 발급돼요. 인터넷등기소(iros.go.kr)에서 등기부등본을 떼어 내 명의로 소유권이전등기가 됐는지, 말소되어야 할 권리가 제대로 지워졌는지 확인하세요.",
    link: { label: "인터넷등기소에서 등기부등본 확인", href: "https://www.iros.go.kr" },
  },
];

const DOCS = [
  { name: "주민등록등본", required: true, where: "주민센터 방문 또는 정부24 온라인 발급" },
  { name: "취득세 납부 영수증", required: true, where: "위택스(wetax.go.kr) 또는 관할 구청에서 납부 후 발급" },
  { name: "인감증명서", required: false, where: "주민센터 (법원에서 요청하는 경우에만)" },
  { name: "법인 서류 (법인 낙찰 시)", required: false, where: "법인등기부등본, 법인인감증명서" },
];

const FAQS = [
  {
    q: "경매 낙찰 후 등기는 직접 해야 하나요?",
    a: "직접 할 필요 없어요. 매각대금 완납 후 법원이 관할 등기소에 소유권이전등기를 촉탁해줘요. 매수인은 법원에 필요한 서류만 제출하면 돼요.",
  },
  {
    q: "경매 등기 후 선순위 근저당권은 어떻게 되나요?",
    a: "경매 개시 기준으로 매수인이 인수하지 않는 후순위 권리는 법원이 함께 말소해줘요. 등기 완료 후 등기부등본을 떼어서 불필요한 권리가 제대로 지워졌는지 꼭 확인하세요.",
  },
  {
    q: "일반 매매 등기는 어떻게 신청하나요?",
    a: "경매와 달리 일반 매매는 직접 신청해야 해요. 인터넷등기소(iros.go.kr)에서 e-form 양식을 작성해 온라인으로 신청하거나, 등기소에 직접 방문해 신청하면 돼요. 법무사를 이용하면 60만~150만 원 정도 수수료가 발생해요.",
  },
  {
    q: "등기 기한을 넘기면 어떻게 되나요?",
    a: "일반 매매의 경우 잔금 지급일로부터 60일 이내에 등기해야 해요. 기한을 넘기면 과태료가 부과돼요. 경매는 법원이 매각대금 완납 후 바로 촉탁하기 때문에 기한 걱정이 없어요.",
  },
  {
    q: "등기 비용이 얼마나 드나요?",
    a: "경매 등기는 법원 촉탁이라 별도 등기 신청 수수료는 없어요. 취득세만 내면 돼요. 일반 셀프등기는 등기신청 수수료 1만 8천 원과 취득세만 내면 되고, 법무사 이용 시 수수료 60만~150만 원이 추가돼요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "민사집행법 제135조: 소유권 취득 시기", url: "https://www.law.go.kr/법령/민사집행법" },
      { label: "부동산등기법: 등기 신청 방법", url: "https://www.law.go.kr/법령/부동산등기법" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "대법원 인터넷등기소", url: "https://www.iros.go.kr" },
      { label: "찾기쉬운 생활법령정보 — 부동산 경매", url: "https://www.easylaw.go.kr" },
      { label: "위택스 취득세 신고·납부", url: "https://www.wetax.go.kr" },
    ],
  },
];

const RELATED = [
  { slug: "부동산-경매-절차", title: "부동산 경매 절차 처음부터 끝까지", description: "입찰부터 매각대금 납부까지 단계별 절차를 정리했어요." },
  { slug: "소유권이전등기", title: "소유권이전등기 서류와 비용", description: "일반 매매 소유권이전등기에 필요한 서류와 절차예요." },
  { slug: "취득세-계산", title: "부동산 취득세 계산법", description: "주택 유형·금액별 취득세율과 계산 방법이에요." },
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>부동산 · 경매 · 등기</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        경매 부동산 등기 신청 방법<br />
        법원이 촉탁해줘서 직접 안 해도 돼요
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        경매로 낙찰받고 나서 등기를 직접 해야 하는지 헷갈리죠? 경매 부동산은 일반 매매와 달라요.
        <a href="https://www.law.go.kr/법령/민사집행법" style={{ color: "#1D9E75", textDecoration: "underline" }}>민사집행법</a>에 따라 법원이 관할 등기소에 소유권이전등기를 직접 촉탁해줘요.
        매수인은 법원에 서류만 제출하면 끝이에요. 후순위 권리 말소도 법원이 함께 처리해줘요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>경매 등기 vs 일반 매매 등기, 이렇게 달라요</H2>
      <p style={body}>
        경매와 일반 매매는 등기 방식 자체가 달라요. 경매는 법원이 알아서 등기소에 요청(촉탁)하고, 일반 매매는 매수인이 직접 신청해야 해요.
        내 상황이 어느 쪽인지 먼저 확인하세요.
      </p>

      <BorderBox>
        <strong>경매 부동산</strong>: 법원이 등기소에 소유권이전등기 촉탁 → 매수인은 법원에 서류만 제출<br />
        <strong>일반 매매</strong>: 매수인이 직접 인터넷등기소(iros.go.kr) 또는 등기소 방문 신청<br />
        <strong>공통</strong>: 취득세는 취득일로부터 60일 이내 직접 납부해야 해요
      </BorderBox>

      <GreenBox>
        경매 낙찰자는 등기 신청을 직접 할 필요가 없어요.<br />
        매각대금 완납 + 법원에 서류 제출 = 법원이 알아서 등기 처리
      </GreenBox>

      <Divider />

      <H2>경매 등기 처리 절차 4단계</H2>
      <p style={body}>
        매각대금 납부 후 법원에 서류를 제출하면 법원이 알아서 등기를 촉탁해줘요. 취득세 납부 순서를 반드시 지켜야 해요.
        서류 빠뜨리면 등기가 지연될 수 있어요.
      </p>

      <Steps steps={STEPS_AUCTION} />

      <CategoryButton label="부동산 정보" count={12} href="/category/부동산" />
      <RelatedArticles items={RELATED} />

      <Divider />

      <H2>법원에 제출할 서류</H2>
      <p style={body}>
        법원마다 요구 서류가 조금 다를 수 있어요. 사전에 담당 법원 집행관실에 전화로 확인하고 방문하면 헛걸음을 줄일 수 있어요.
        취득세 납부 영수증은 등기 전에 반드시 먼저 준비해야 해요.
      </p>

      <SectionBadge>서류 목록</SectionBadge>
      <DocTable docs={DOCS} />

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        경매 등기에 대해 실제로 많이 나오는 질문만 골랐어요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 민사집행법·부동산등기법을 바탕으로 작성됐어요. 법령 개정 시 기준이 달라질 수 있으니 최신 내용은 대법원 인터넷등기소 또는 관할 법원에서 확인하세요." />
    </ArticleLayout>
  );
}
