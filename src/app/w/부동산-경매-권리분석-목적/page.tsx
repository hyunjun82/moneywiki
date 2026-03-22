"use client";

// Q1. 부동산 경매에 관심 있는데 "권리분석부터 하라"는 말을 듣고, 왜 해야 하는지 이해하고 싶은 상황이에요.
// Q2. 권리분석의 목적과 핵심(말소기준권리)을 이해하고, 경매 입찰 전 기본 점검을 할 수 있어요.
// Q3. 말소기준권리 개념, 인수vs말소 구분, 등기부 분석 3단계, 권리분석 안 하면 생기는 손해.
// Q4. GreenBox(핵심 개념) + Steps(3단계 분석 절차) + BorderBox(인수vs말소 비교) + FAQ

import {
  H2, GreenBox, BorderBox, Steps, Divider, body,
  FAQ, References, Disclaimer, ArticleAd,
  ArticleLayout, RelatedArticles,
} from "@/components/article-ui";

const FAQS = [
  {
    q: "권리분석 안 하고 입찰하면 어떻게 되나요?",
    a: "말소기준권리 이전의 전세권이나 대항력 있는 임차권을 인수하게 될 수 있어요. 3억에 낙찰받았는데 추가로 2억을 돌려줘야 하는 상황이 생길 수 있어요.",
  },
  {
    q: "말소기준권리가 정확히 뭔가요?",
    a: "경매의 원인이 된 (근)저당권, (가)압류, 경매개시결정등기 중 가장 먼저 등기된 권리예요. 이걸 기준으로 인수와 말소가 나뉘어요.",
  },
  {
    q: "등기부에 없는 권리도 분석해야 하나요?",
    a: "네. 전입세대 열람으로 대항력 있는 임차인을 확인해야 해요. 등기 안 돼 있어도 낙찰자에게 보증금 반환을 청구할 수 있어요.",
  },
  {
    q: "초보인데 권리분석 직접 하기 어려우면요?",
    a: "법무사나 경매 전문 컨설팅 업체에 의뢰할 수 있어요. 비용은 보통 30~50만원 정도고, 큰 손해를 예방하는 보험이라고 생각하면 돼요.",
  },
  {
    q: "법정지상권은 말소기준권리와 관계없나요?",
    a: "법정지상권과 분묘기지권은 등기 순위와 무관하게 매수인에게 인수돼요. 경매 물건에 이런 권리가 있으면 특히 주의해야 해요.",
  },
];

const REFERENCES = [
  {
    category: "공식 자료",
    items: [
      { label: "민사집행법 (법제처)", url: "https://www.law.go.kr/법령/민사집행법" },
      { label: "부동산 경매 절차 안내 (생활법령)", url: "https://easylaw.go.kr/CSP/CnpClsMain.laf?popMenu=ov&csmSeq=306&ccfNo=1&cciNo=1&cnpClsNo=1" },
    ],
  },
];

const RELATED = [
  { slug: "공인중개사-업무범위", title: "공인중개사 업무범위", description: "중개사의 역할과 책임 범위를 정리했어요." },
  { slug: "취득세-계산-세율-납부", title: "취득세 계산·세율·납부", description: "경매로 낙찰받아도 취득세는 내야 해요." },
];

const STEPS = [
  { title: "등기부등본 분석", desc: "갑구(소유권)와 을구(저당권 등)를 확인해요. 권리 설정 날짜와 순서를 파악하는 게 핵심이에요.", tip: "인터넷등기소에서 발급 가능해요" },
  { title: "말소기준권리 찾기", desc: "(근)저당권, (가)압류, 경매개시결정등기 중 가장 먼저 등기된 걸 찾아요. 이 권리 이전은 인수, 이후는 말소예요." },
  { title: "미등기 권리 확인", desc: "전입세대 열람으로 실거주자와 임차인을 확인해요. 대항력 있는 임차인은 등기 없어도 보증금을 청구할 수 있어요." },
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>부동산 · 경매 · 권리분석</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        부동산 경매 권리분석,<br />
        왜 해야 하고 어떻게 하나요?
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        경매 물건이 싸 보여서 입찰하려는데, "권리분석부터 해"라는 말을 듣죠?
        권리분석은 낙찰받은 뒤 내가 떠안을 부담이 얼마인지 미리 확인하는 작업이에요.
        이걸 건너뛰면 싸게 샀다고 좋아했는데 추가 비용이 더 나올 수 있어요.
      </p>

      <ArticleAd position="intro" />

      <Divider />

      <H2>권리분석의 목적, 무엇을 파악하는 건가요?</H2>
      <p style={body}>
        <a href="https://easylaw.go.kr/CSP/CnpClsMain.laf?popMenu=ov&csmSeq=306&ccfNo=2&cciNo=1&cnpClsNo=2" style={{ color: "#1D9E75", textDecoration: "underline" }}>부동산 경매</a>에서 권리분석은
        "이 물건을 낙찰받으면 어떤 권리를 내가 인수하고, 어떤 권리가 사라지는지"를 사전에 확인하는 절차예요.
      </p>

      <GreenBox>
        권리분석 핵심 개념: 말소기준권리<br />
        · (근)저당권, (가)압류, 경매개시결정등기 중 <strong>가장 먼저 등기된 권리</strong><br />
        · 말소기준권리 <strong>이전</strong> 설정 → 낙찰자가 <strong>인수</strong><br />
        · 말소기준권리 <strong>이후</strong> 설정 → 배당 후 <strong>말소</strong>
      </GreenBox>

      <p style={body}>
        쉽게 말하면 "이 집을 사면 추가로 얼마를 더 내야 하나?"를 미리 계산하는 거예요.
        말소기준권리를 찾으면 인수할 권리와 말소될 권리를 구분할 수 있어요.
      </p>

      <RelatedArticles items={RELATED} />

      <Divider />

      <H2>안 하면 어떤 손해가 생기나요?</H2>
      <p style={body}>
        권리분석 없이 입찰하면 예상 못한 비용이 터져요.
        3억에 낙찰받았는데, 말소기준권리보다 먼저 설정된 전세권 2억이 있으면
        낙찰대금 3억 + 전세금 2억 = 총 5억이 드는 거예요.
      </p>

      <BorderBox title="인수 vs 말소 구분">
        <strong>인수되는 권리</strong> (낙찰자 부담)<br />
        · 말소기준권리보다 선순위 전세권<br />
        · 대항력 있는 임차권 (등기 안 돼도 인수)<br />
        · 법정지상권, 분묘기지권 (순위 무관)<br /><br />
        <strong>말소되는 권리</strong> (배당 후 소멸)<br />
        · 말소기준권리 이후의 근저당권<br />
        · 말소기준권리 이후의 가압류<br />
        · 말소기준권리 이후의 전세권
      </BorderBox>

      <Divider />

      <H2>권리분석 3단계 절차</H2>
      <p style={body}>
        아래 세 단계를 거치면 낙찰 후 부담할 금액을 정확히 파악할 수 있어요.
      </p>

      <Steps steps={STEPS} />

      <p style={body}>
        처음이라 어렵게 느껴지면 법무사나 경매 컨설팅에 의뢰하는 것도 방법이에요.
        30~50만원 정도면 수천만원 손해를 예방할 수 있으니까요.
      </p>

      <Divider />

      <FAQ items={FAQS} />
      <Divider />
      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 법률 자문이 아니며, 개별 경매 물건마다 권리 관계가 달라요. 실제 입찰 전에는 반드시 전문가 확인을 받으세요." />
    </ArticleLayout>
  );
}
