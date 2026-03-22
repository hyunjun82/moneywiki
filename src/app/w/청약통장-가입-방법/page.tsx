"use client";

// Q1: 청약통장 가입 조건 방법 2026 info
// Q2: 주택청약종합저축은 누구나 가입 가능하나 청약 신청은 만 17세 이상
// Q3: 주택청약종합저축은 누구나 가입 가능하나 청약 신청은 만 17세 이상, 월 2만~50만원 납입 가능하며 2024년부터 최대 25만원까지 인정, 연 소득 7천만원 이하 무주택 세대주는 최대 120만원 소득공제
// Q4: GreenBox + Steps + Checklist + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const STEPS = [
  { title: "주택청약종합저축은 누구나 가입 가능하나 청약 신청은 만", desc: "주택청약종합저축은 누구나 가입 가능하나 청약 신청은 만 17세 이상" },
  { title: "월 2만~50만원 납입 가능하며 2024년부터 최대 2", desc: "월 2만~50만원 납입 가능하며 2024년부터 최대 25만원까지 인정" },
  { title: "연 소득 7천만원 이하 무주택 세대주는 최대 120만원", desc: "연 소득 7천만원 이하 무주택 세대주는 최대 120만원 소득공제" },
];
const CHECKLIST = [
  "주택청약종합저축은 누구나 가입 가능하나 청약 신청은 만 17세 이상",
  "월 2만~50만원 납입 가능하며 2024년부터 최대 25만원까지 인정",
  "연 소득 7천만원 이하 무주택 세대주는 최대 120만원 소득공제"
];

const FAQS = [
  { q: "청약통장 가입은 어디서 하나요?", a: "시중 은행 영업점이나 모바일 앱에서 가입할 수 있어요. 최초 입금 1만원 이상 필요하고, 신분증과 본인 명의 휴대폰만 있으면 5분이면 개설돼요." },
  { q: "청약통장 월 납입액은 얼마가 적당한가요?", a: "2024년 11월부터 월 25만원까지 인정되니까 여유 있으면 25만원 넣는 게 좋아요. 가점 올리는 데도 유리하고 소득공제도 최대로 받을 수 있어요." },
  { q: "청년주택드림 청약통장도 가입해야 하나요?", a: "19~34세 연소득 5천만원 이하 무주택자면 청년드림으로 가입하세요. 일반 청약보다 금리도 높고(연 4.5%) 이자 비과세 혜택도 있어요." }
];

const REFERENCES = [
  { category: "출처", items: [
      { label: "주택도시보증공사 청약 안내", url: "https://www.khug.or.kr" },
      { label: "국민은행 청약저축", url: "https://obank.kbstar.com" }
  ]},
];

export default function Page() {
  return (
    <ArticleLayout sidebar={null}>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>부동산 · 임대차</p>
      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        청약통장 가입 조건 방법 2026
      </h1>
      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        내 집 마련하려면 청약통장 필수인데요. 가입 조건부터 소득공제까지 2026년 기준으로 정리해드려요.
      </p>
      <Divider />
      <ArticleAd position="intro" />

      <H2>주택청약종합저축은 누구나 가입 가능하나 청약 신청은 만</H2>
      <p style={body}>주택청약종합저축은 누구나 가입 가능하나 청약 신청은 만 17세 이상</p>
      <GreenBox title="핵심 정리">
        주택청약종합저축은 누구나 가입 가능하나 청약 신청은 만 17세 이상<br />
        월 2만~50만원 납입 가능하며 2024년부터 최대 25만원까지 인정<br />
        연 소득 7천만원 이하 무주택 세대주는 최대 120만원 소득공제
      </GreenBox>

      <CategoryButton label="부동산 · 임대차 정보" count={5} href="/category/부동산" />
      <RelatedArticles items={[]} />
      <Divider />

      <H2>월 2만~50만원 납입 가능하며 2024년부터</H2>
      <p style={body}>월 2만~50만원 납입 가능하며 2024년부터 최대 25만원까지 인정</p>
      <Steps steps={STEPS} />
      <Divider />
      <H2>꼭 체크해야 할 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>놓치기 쉬운 항목을 정리했어요.</p>
      <SectionBadge>체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />
      <Divider />

      <H2>자주 묻는 것들</H2>
      <FAQ items={FAQS} />
      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 1월 기준 정보를 바탕으로 작성됐어요. 최신 정보는 관련 기관에서 직접 확인해보세요." />
    </ArticleLayout>
  );
}
