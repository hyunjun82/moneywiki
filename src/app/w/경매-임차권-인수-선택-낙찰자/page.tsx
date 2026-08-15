"use client";
// Q1. 경매 임차권 인수에 대해 알아보려는 상황
// Q2. 관련 정보를 확인하고 실행한다
// Q3. 말소기준권리보다 선순위 임차권은 낙찰자가 의무적으로 인수, 인수되는 임차권은 보증금 반환 의무 부담
// Q4. GreenBox + BorderBox + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  FAQ, SourceNote, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const FAQS = [
  { q: "경매로 낙찰받았는데 세입자 내보낼 수 있나요?", a: "말소기준권리보다 후순위 임차권은 소멸돼서 내보낼 수 있어요. 하지만 선순위 임차권은 인수해야 하니 못 내보내요." },
  { q: "인수되는 임차권 보증금 언제까지 돌려줘야 하나요?", a: "임대차 계약 만료일에 돌려줘야 해요. 못 주면 임차인이 강제집행할 수 있어요." },
  { q: "경매 권리분석 어떻게 하나요?", a: "법원 경매 사이트에서 매각물건명세서 확인하세요. 말소기준권리와 임차권 설정일 비교하면 돼요." },
  { q: "경매 추가 궁금한 점이 있어요", a: "개별 상황에 따라 다를 수 있으니 관련 기관에 문의하세요." },
  { q: "경매 추가 궁금한 점이 있어요", a: "개별 상황에 따라 다를 수 있으니 관련 기관에 문의하세요." },
];

const SOURCES = [
  { name: "민사집행법 제88조", href: "https://www.law.go.kr/법령/민사집행법" },
  { name: "주택임대차보호법", href: "https://www.law.go.kr/법령/주택임대차보호법" },
];

const RELATED = [
  { slug: "경매-매각허가결정-이의신청", title: "경매 매각허가결정 절차", description: "관련 내용 정리." },
  { slug: "대항력-요건-전입신고-점유", title: "대항력 요건", description: "관련 내용 정리." },
  { slug: "전세-보증금-반환-청구", title: "전세 보증금 반환 청구", description: "관련 내용 정리." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>부동산</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        경매 임차권 인수 선택 낙찰자 의무
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        말소기준권리보다 선순위 임차권은 낙찰자가 의무적으로 인수
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>경매 임차권 인수란</H2>
      <p style={body}>경매에서 부동산을 낙찰받으면, 그 집에 설정된 권리 중 일부는 사라지고 일부는 낙찰자가 떠안게 돼요. 사라지는 권리를 '말소되는 권리', 떠안는 권리를 '인수되는 권리'라고 해요.</p>
      <GreenBox>
        말소기준권리보다 선순위 임차권은 낙찰자가 의무적으로 인수{"\n"}
        인수되는 임차권은 보증금 반환 의무 부담{"\n"}
        입찰 전 권리분석으로 인수 임차권 반드시 확인
      </GreenBox>
      <p style={body}>민사집행법 제88조에 따르면, 매수인이 인수하지 않는 권리는 말소되고, 매각대금을 모두 낸 때에 매각의 목적인 권리를 취득해요. 여기서 인수되는 임차권이 문제가 되는 거죠.</p>

      <CategoryButton label="부동산" count={10} href="/category/%EB%B6%80%EB%8F%99%EC%82%B0" />
      <RelatedArticles items={RELATED} />

      <Divider />
      <H2>말소기준권리와 인수 임차권 판단</H2>
      <p style={body}>어떤 임차권이 인수되고 어떤 게 소멸되는지는 말소기준권리로 판단해요. 말소기준권리는 보통 저당권 또는 가압류예요.</p>
      <BorderBox>
        <strong>말소기준권리와 인수 임차권 판단</strong><br />
        어떤 임차권이 인수되고 어떤 게 소멸되는지는 말소기준권리로 판단해요. 말소기준권리는 보통 저당권 또는 가압류예요.<br />
        말소기준권리보다 선순위 임차권은 낙찰자가 인수해요. 말소기준권리보다 후순위 임차권은 소멸돼요.
      </BorderBox>
      <p style={body}>말소기준권리보다 선순위 임차권은 낙찰자가 인수해요. 말소기준권리보다 후순위 임차권은 소멸돼요.</p>

      <Divider />
      <H2>인수되는 임차권 유형</H2>
      <p style={body}>주택임대차보호법에 따르면 다음 3가지 경우 임차권이 낙찰자에게 인수돼요.</p>
      <p style={body}>전입신고하고 점유했지만 확정일자 안 받은 경우예요. 우선변제권은 없지만 대항력은 있어서 낙찰자가 인수해요.</p>
      <p style={body}>우선변제권을 행사하지 않은 임차권</p>

      <Divider />
      <H2>경매 관련 자주 묻는 질문</H2>
      <p style={{ ...body, marginBottom: 14 }}>자주 궁금해하는 내용을 모았어요.</p>
      <FAQ items={FAQS} />

      <Divider />

      <SourceNote sources={SOURCES} />
      <Disclaimer text="이 글은 2026년 기준 관련 법령과 공식 자료를 바탕으로 작성했어요. 개별 상황에 따라 달라질 수 있으니 전문가 상담을 권해요." />
    </ArticleLayout>
  );
}
