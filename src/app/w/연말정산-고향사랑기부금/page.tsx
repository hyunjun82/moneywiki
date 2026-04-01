"use client";
import { Divider } from "@/components/article-ui/Divider";
import { BorderBox } from "@/components/article-ui/BorderBox";

// Q1. 연말정산 고향사랑기부금에 대해 알아보려는 상황
// Q2. 관련 정보를 확인하고 실행한다
// Q3. 10만원까지 전액 세액공제 + 답례품 30%로 실질 3만원 이득이에요., 2025년부터 연간 기부 한도가 500만원 → 2천만원으로 4배 확대됐어요.
// Q4. GreenBox + BorderBox + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  FAQ, SourceNote, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const FAQS = [
  { q: "10만원 기부하면 얼마나 이득이에요?", a: "10만원 전액 세액공제에 3만원 상당 답례품까지 받아서 실질 3만원 이득이에요." },
  { q: "내가 사는 지역에도 기부할 수 있나요?", a: "아니요. 본인 주소지가 아닌 다른 지자체에만 기부할 수 있어요." },
  { q: "기부영수증 따로 제출해야 하나요?", a: "아니요. 국세청에 자동 전송되니까 별도 제출 안 해도 돼요." },
  { q: "연말에 기부해도 올해 공제 되나요?", a: "네. 12월 31일까지 기부하면 해당 연도 연말정산에 반영돼요." },
  { q: "답례품은 어떻게 받아요?", a: "기부 후 고향사랑e음에서 포인트로 지역 특산품을 선택하면 집으로 배송돼요." },
];

const SOURCES = [
  { name: "고향사랑e음", href: "https://www.ilovegohyang.go.kr" },
  { name: "조세특례제한법 제58조", href: "https://www.law.go.kr/법령/조세특례제한법" },
];

const RELATED = [
  { slug: "연말정산-기부금-세액공제", title: "연말정산 기부금 세액공제", description: "관련 내용 정리." },
  { slug: "연말정산-특별재난지역-기부금", title: "연말정산 특별재난지역 기부금", description: "관련 내용 정리." },
  { slug: "연말정산", title: "연말정산", description: "관련 내용 정리." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>연말정산</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        연말정산 고향사랑기부금
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        10만원까지 전액 세액공제 + 답례품 30%로 실질 3만원 이득이에요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>10만원 기부하면 진짜 이득이에요?</H2>
      <p style={body}>10만원 기부 시: 세액공제 10만원(전액) + 답례품 3만원 = 총 13만원 혜택이에요. 10만원 냈는데 13만원 돌아오는 셈이니까 실질 3만원 이득이에요.</p>
      <GreenBox>
        10만원까지 전액 세액공제 + 답례품 30%로 실질 3만원 이득이에요.{"\n"}
        2025년부터 연간 기부 한도가 500만원 → 2천만원으로 4배 확대됐어요.{"\n"}
        특별재난지역은 10만원 초과분도 30% 공제율이 적용돼요.
      </GreenBox>
      <p style={body}>이게 바로 "연말정산 꿀팁"으로 불리는 이유예요. 기부도 하고 절세도 하고 특산품까지 받는 일석삼조예요. 10만원이라도 꼭 해보세요.</p>

      <CategoryButton label="연말정산" count={10} href="/category/%EC%97%B0%EB%A7%90%EC%A0%95%EC%82%B0" />
      <RelatedArticles items={RELATED} />

      <Divider />
      <H2>공제율이 어떻게 되죠?</H2>
      <p style={body}>10만원 이하: 전액 100% 세액공제예요. 10만원 기부하면 10만원 그대로 세금에서 빠져요.</p>
      <BorderBox>
        <strong>공제율이 어떻게 되죠?</strong><br />
        10만원 이하: 전액 100% 세액공제예요. 10만원 기부하면 10만원 그대로 세금에서 빠져요.<br />
        10만원 초과분: 일반 지역은 16.5%, 특별재난지역은 30% 세액공제예요.
      </BorderBox>
      <p style={body}>10만원 초과분: 일반 지역은 16.5%, 특별재난지역은 30% 세액공제예요.</p>

      <Divider />
      <H2>2025년부터 뭐가 달라졌어요?</H2>
      <p style={body}>연간 기부 한도: 500만원 → 2천만원으로 확대됐어요. 더 많이 기부하고 싶었던 분들에게 좋은 소식이에요.</p>
      <p style={body}>특별재난지역 공제율: 10만원 초과분 기준으로 16.5% → 30%로 상향됐어요. 재난 피해 지역 기부하면 혜택이 더 커요.</p>

      <Divider />
      <H2>연말정산 관련 자주 묻는 질문</H2>
      <p style={{ ...body, marginBottom: 14 }}>자주 궁금해하는 내용을 모았어요.</p>
      <FAQ items={FAQS} />

      <Divider />

      <SourceNote sources={SOURCES} />
      <Disclaimer text="이 글은 2026년 기준 관련 법령과 공식 자료를 바탕으로 작성했어요. 개별 상황에 따라 달라질 수 있으니 전문가 상담을 권해요." />
    </ArticleLayout>
  );
}
