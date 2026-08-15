"use client";
// Q1. 어업용 면세유에 대해 알아보려는 상황
// Q2. 관련 정보를 확인하고 실행한다
// Q3. 면세유 공급카드 유효기간은 발급일로부터 1년이에요, 유효기간 내 미사용 시 재발급 받아야 해요
// Q4. GreenBox + BorderBox + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  FAQ, SourceNote, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const FAQS = [
  { q: "어업용 면세유 카드 유효기간 지나면 어떻게 되나요?", a: "카드가 무효돼요. 새로 발급받으려면 관할 세무서에 재신청해야 해요." },
  { q: "어업용 면세유는 1년에 얼마나 살 수 있나요?", a: "선박 톤수와 마력에 따라 달라요. 신고한 사용 예정량만큼 구매 가능해요." },
  { q: "어업용 면세유 남은 한도는 어디서 확인하나요?", a: "국세청 홈택스나 한국석유공사 페트로넷에서 조회할 수 있어요." },
  { q: "어업용 추가 궁금한 점이 있어요", a: "개별 상황에 따라 다를 수 있으니 관련 기관에 문의하세요." },
  { q: "어업용 추가 궁금한 점이 있어요", a: "개별 상황에 따라 다를 수 있으니 관련 기관에 문의하세요." },
];

const SOURCES = [
  { name: "교통·에너지·환경세법", href: "https://www.law.go.kr/법령/교통·에너지·환경세법" },
  { name: "한국석유공사", href: "https://www.petronet.co.kr" },
];

const RELATED = [
  { slug: "어업용-면세유-구입-기한", title: "어업용 면세유 구입 기한", description: "현재 글." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>금융</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        어업용 면세유 구입 기한
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        면세유 공급카드 유효기간은 발급일로부터 1년이에요
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>어업용 면세유 제도 교통에너지환경세법</H2>
      <p style={body}>어업에 사용하는 경유와 등유에 대해 세금을 면제해 주는 제도예요. 교통·에너지·환경세와 개별소비세, 교육세를 안 내니까 일반 유류보다 훨씬 저렴해요.</p>
      <GreenBox>
        면세유 공급카드 유효기간은 발급일로부터 1년이에요{"\n"}
        유효기간 내 미사용 시 재발급 받아야 해요{"\n"}
        연료 사용 신고는 매년 해야 해요
      </GreenBox>
      <p style={body}>면세 혜택을 받으려면 관할 세무서에 신청해서 면세유 공급카드를 발급받아야 해요. 이 카드로 지정 주유소에서 기름을 넣으면 세금 빠진 가격으로 살 수 있어요.</p>

      <CategoryButton label="금융" count={10} href="/category/%EA%B8%88%EC%9C%B5" />
      <RelatedArticles items={RELATED} />

      <Divider />
      <H2>어업용 면세유 카드 유효기간 1년</H2>
      <p style={body}>발급일로부터 1년이에요. 2026년 1월 15일에 카드를 받았으면 2027년 1월 14일까지 쓸 수 있는 거죠.</p>
      <BorderBox>
        <strong>어업용 면세유 카드 유효기간 1년</strong><br />
        발급일로부터 1년이에요. 2026년 1월 15일에 카드를 받았으면 2027년 1월 14일까지 쓸 수 있는 거죠.<br />
        유효기간이 지나면 카드가 자동으로 무효돼요. 주유소에서 카드를 넣어도 승인이 안 나와요. 그럼 다시 세무서에 가서 재발급 신청을 해야 해요.
      </BorderBox>
      <p style={body}>유효기간이 지나면 카드가 자동으로 무효돼요. 주유소에서 카드를 넣어도 승인이 안 나와요. 그럼 다시 세무서에 가서 재발급 신청을 해야 해요.</p>

      <Divider />
      <H2>어업용 면세유 사용 신고 1월 말</H2>
      <p style={body}>매년 1월 말까지 전년도 사용 실적을 신고해야 해요. 2025년에 쓴 면세유 양과 금액을 2026년 1월 말까지 세무서에 보고하는 거죠.</p>
      <p style={body}>신고하지 않으면 다음 해 면세유 공급이 중단될 수 있어요. 한번 볼까요. 2025년 실적을 신고 안 하면 2026년부터 면세유를 못 받을 수 있어요.</p>

      <Divider />
      <H2>어업용 관련 자주 묻는 질문</H2>
      <p style={{ ...body, marginBottom: 14 }}>자주 궁금해하는 내용을 모았어요.</p>
      <FAQ items={FAQS} />

      <Divider />

      <SourceNote sources={SOURCES} />
      <Disclaimer text="이 글은 2026년 기준 관련 법령과 공식 자료를 바탕으로 작성했어요. 개별 상황에 따라 달라질 수 있으니 전문가 상담을 권해요." />
    </ArticleLayout>
  );
}
