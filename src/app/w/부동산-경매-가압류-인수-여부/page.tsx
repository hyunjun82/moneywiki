"use client";

// Q1. 경매 입찰하려는데 등기부등본에 가압류가 있어서, 낙찰 후 이게 나한테 넘어오는지 걱정되는 상황.
// Q2. 말소기준권리를 파악해서 가압류 인수 여부를 직접 판단하고, 안전하게 입찰하는 행동.
// Q3. 말소기준권리 개념, 선순위·후순위 구분법, 등기부등본 읽는 법, 인수 시 대응, 배당요구 요건.
// Q4. GreenBox(핵심 판단 기준) + BorderBox(실제 사례) + Steps(권리분석 순서) + Checklist(입찰 전 체크) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Steps, Checklist, Divider, body,
  FAQ, References, Disclaimer, ArticleAd,
  ArticleLayout, RelatedArticles,
} from "@/components/article-ui";

const FAQS = [
  {
    q: "가압류가 인수되면 구체적으로 뭘 떠안게 되나요?",
    a: "가압류 채권자에게 해당 금액을 갚아야 해요. 갚지 않으면 본압류로 전환되어 다시 경매에 넘어갈 수 있어요.",
  },
  {
    q: "등기부등본에서 가압류를 어떻게 찾나요?",
    a: "을구(소유권 외 권리)에서 '가압류' 항목을 찾으면 돼요. 접수일자로 순위를 판단해요.",
  },
  {
    q: "말소기준권리가 가압류 자체인 경우도 있나요?",
    a: "네, 있어요. 가압류가 가장 먼저 등기된 권리라면 말소기준권리가 돼요. 이 경우 매수인이 해당 가압류를 인수해요.",
  },
  {
    q: "선순위 가압류가 있으면 무조건 위험한가요?",
    a: "금액이 작고 매각가액에 충분히 반영되어 있다면 입찰할 수도 있어요. 다만 초보자라면 피하는 게 안전해요.",
  },
  {
    q: "권리분석 비용은 얼마 정도 드나요?",
    a: "경매 전문 법무사나 변호사에게 의뢰하면 건당 30~50만원 정도예요. 수천만원 손해를 막을 수 있으니 초보자에게 추천해요.",
  },
];

const REFERENCES = [
  {
    category: "공식 자료",
    items: [
      { label: "민사집행법", url: "https://www.law.go.kr/법령/민사집행법" },
      { label: "대법원 법원경매정보", url: "https://www.courtauction.go.kr" },
      { label: "찾기쉬운 생활법령정보 경매 권리분석", url: "https://easylaw.go.kr/CSP/CnpClsMain.laf?popMenu=ov&csmSeq=306&ccfNo=2&cciNo=1&cnpClsNo=2" },
    ],
  },
];

const RELATED = [
  { slug: "부동산-경매-절차-입찰-방법-낙찰-매각대금", title: "부동산 경매 절차", description: "입찰부터 낙찰·매각대금 납부까지 전체 흐름을 정리했어요." },
  { slug: "경매-권리분석-말소기준권리-인수-소멸", title: "경매 권리분석 완전 정리", description: "말소기준권리·인수·소멸 판단법을 사례별로 풀었어요." },
  { slug: "전세보증금-반환", title: "전세보증금 반환 청구", description: "경매와 전세보증금 반환의 관계, 우선변제권까지 다뤄요." },
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>부동산 · 경매 · 권리분석</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        경매 가압류, 인수될까 말소될까?<br />
        말소기준권리로 판단하는 방법
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        입찰하려는 부동산 등기부등본에 가압류가 적혀 있으면 덜컥 겁이 나죠?
        이 가압류가 낙찰 후 나한테 넘어오는지, 아니면 깨끗하게 사라지는지는
        '말소기준권리'를 기준으로 판단해요. 한 번만 이해하면 어렵지 않아요.
      </p>

      <ArticleAd position="intro" />

      <Divider />

      <H2>가압류가 뭐고 왜 위험한가요?</H2>
      <p style={body}>
        <a href="https://www.law.go.kr/법령/민사집행법" style={{ color: "#1D9E75", textDecoration: "underline" }}>민사집행법</a>에 따르면,
        가압류는 채권자가 채무자 재산을 임시로 묶어두는 조치예요.
        소송에서 이겨도 채무자가 재산을 빼돌리면 돈을 못 받으니까, 미리 묶어두는 거죠.
      </p>
      <p style={body}>
        경매에서 가압류가 중요한 이유는, 매수인에게 인수(승계)될 수도 있고 말소(소멸)될 수도 있기 때문이에요.
        인수되면 그 빚을 떠안게 되니까, 입찰 전 반드시 확인해야 해요.
      </p>

      <Divider />

      <H2>말소기준권리로 인수 여부를 판단해요</H2>
      <p style={body}>
        가압류가 인수되는지 말소되는지는 '말소기준권리'와의 순위로 결정돼요.
        말소기준권리보다 먼저 등기된 권리는 <strong>인수</strong>(선순위)되고,
        나중에 등기된 권리는 <strong>말소</strong>(후순위)돼요.
      </p>

      <GreenBox>
        말소기준권리가 되는 것들이에요.<br />
        · 저당권·근저당권<br />
        · 압류·가압류<br />
        · 경매개시결정등기<br />
        → 이 중 <strong>가장 먼저 등기된 권리</strong>가 말소기준권리예요.
      </GreenBox>

      <SectionBadge>사례로 이해하기</SectionBadge>
      <BorderBox>
        <strong>사례 A — 가압류 말소되는 경우</strong><br />
        2020년 근저당권 설정 → 2022년 가압류 등기 → 2024년 경매개시결정<br />
        말소기준권리: 2020년 근저당권<br />
        → 2022년 가압류는 후순위이므로 <strong>말소</strong>돼요.<br /><br />
        <strong>사례 B — 가압류 인수되는 경우</strong><br />
        2021년 가압류 등기 → 2023년 근저당권 설정 → 2025년 경매개시결정<br />
        말소기준권리: 2021년 가압류 (가장 먼저 등기)<br />
        → 매수인이 이 가압류를 <strong>인수</strong>해요.
      </BorderBox>

      <RelatedArticles items={RELATED} />

      <Divider />

      <H2>등기부등본으로 직접 판단하는 순서</H2>
      <p style={body}>
        등기부등본 을구를 펼치고, 아래 순서대로 따라가면 돼요.
      </p>

      <Steps steps={[
        "등기부등본 을구에서 모든 권리의 접수일자를 시간 순으로 나열",
        "저당권·근저당권·압류·가압류·경매개시결정 중 가장 먼저 등기된 권리 찾기 (→ 이게 말소기준권리)",
        "판단하려는 가압류의 접수일자와 말소기준권리 비교",
        "가압류가 말소기준권리보다 앞이면 인수, 뒤면 말소",
      ]} />

      <Divider />

      <H2>선순위 가압류를 인수하게 되면?</H2>
      <p style={body}>
        만약 선순위 가압류가 있는 물건을 낙찰받았다면 세 가지 방법이 있어요.
        첫째, 가압류 채권자와 협의해서 채무를 갚거나 감액받는 거예요.
        둘째, 가압류가 부당하다고 판단되면 취소 소송을 제기할 수 있어요.
        셋째, 매각가액에서 이미 공제되어 있다면 실질적 부담이 크지 않을 수도 있어요.
      </p>
      <p style={body}>
        다만 이런 과정은 시간과 비용이 많이 들어요.
        초보자라면 선순위 가압류가 있는 물건은 피하는 게 안전해요.
      </p>

      <SectionBadge>경매 입찰 전 체크리스트</SectionBadge>
      <Checklist items={[
        "등기부등본 을구에서 모든 권리 접수일자 정리",
        "말소기준권리 확정 (가장 먼저 등기된 담보·압류·가압류)",
        "선순위 가압류 유무 및 금액 확인",
        "배당요구 종기 확인 (후순위 가압류의 배당 참가 여부)",
        "초보라면 전문가(경매 법무사) 권리분석 의뢰",
      ]} />

      <Divider />

      <H2>자주 묻는 것들</H2>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 민사집행법과 대법원 경매 실무를 바탕으로 작성했어요. 개별 물건의 권리관계는 등기부등본과 매각물건명세서를 직접 확인하고, 필요하면 전문가 상담을 받아봐요." />
    </ArticleLayout>
  );
}
