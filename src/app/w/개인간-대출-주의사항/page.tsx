"use client";
// Q1. 개인간 대출에 대해 알아보려는 상황
// Q2. 관련 정보를 확인하고 실행한다
// Q3. 차용증 작성과 공증으로 법적 효력 확보해야 해요, 이자율은 최대 연 20%까지 가능해요
// Q4. GreenBox + BorderBox + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  FAQ, SourceNote, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const FAQS = [
  { q: "개인간 대출 이자율 제한이 있나요?", a: "연 20%가 최고예요. 이것보다 높게 약속해도 20%만 인정돼요." },
  { q: "개인간 대출 차용증 없이 빌려줘도 되나요?", a: "법적으로는 가능하지만 매우 위험해요. 나중에 증명할 방법이 없거든요." },
  { q: "개인간 대출 공증 비용은 얼마인가요?", a: "금액에 따라 다른데 천만 원 기준 약 3~5만 원 정도예요." },
  { q: "개인간 추가 궁금한 점이 있어요", a: "개별 상황에 따라 다를 수 있으니 관련 기관에 문의하세요." },
  { q: "개인간 추가 궁금한 점이 있어요", a: "개별 상황에 따라 다를 수 있으니 관련 기관에 문의하세요." },
];

const SOURCES = [
  { name: "이자제한법", href: "https://www.law.go.kr/법령/이자제한법" },
  { name: "민법", href: "https://www.law.go.kr/법령/민법" },
];

const RELATED = [
  { slug: "개인간-대출-주의사항", title: "개인간 대출 주의사항", description: "현재 글." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>금융</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        개인간 대출 주의사항
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        차용증 작성과 공증으로 법적 효력 확보해야 해요
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>개인간 대출이란</H2>
      <p style={body}>은행이나 금융회사가 아니라 개인끼리 돈을 빌려주고 받는 거예요. 가족, 친구, 지인 사이에서 이뤄지는 금전 거래죠.</p>
      <GreenBox>
        차용증 작성과 공증으로 법적 효력 확보해야 해요{"\n"}
        이자율은 최대 연 20%까지 가능해요{"\n"}
        변제 기한, 이자 지급 방식 명확히 정해야 해요
      </GreenBox>
      <p style={body}>법적으로는 '금전소비대차계약'이라고 해요. 돈을 빌려준 사람은 채권자, 빌린 사람은 채무자가 되는 거예요. 계약이니까 당연히 법적 효력이 있어요.</p>

      <CategoryButton label="금융" count={10} href="/category/%EA%B8%88%EC%9C%B5" />
      <RelatedArticles items={RELATED} />

      <Divider />
      <H2>차용증 작성이 필수인 이유</H2>
      <p style={body}>구두 약속만으로는 나중에 증명하기 어려워요. "빌려줬다", "안 빌렸다" 싸우게 되면 법원에서도 판단하기 힘들거든요.</p>
      <BorderBox>
        <strong>차용증 작성이 필수인 이유</strong><br />
        구두 약속만으로는 나중에 증명하기 어려워요. "빌려줬다", "안 빌렸다" 싸우게 되면 법원에서도 판단하기 힘들거든요.<br />
        차용증에는 이런 내용이 들어가야 해요. 빌려준 금액, 이자율, 변제 기한, 변제 방법이요. 채권자와 채무자의 이름, 주소, 주민등록번호도 명확히 적어야 해요.
      </BorderBox>
      <p style={body}>차용증에는 이런 내용이 들어가야 해요. 빌려준 금액, 이자율, 변제 기한, 변제 방법이요. 채권자와 채무자의 이름, 주소, 주민등록번호도 명확히 적어야 해요.</p>

      <Divider />
      <H2>이자율 제한 규정</H2>
      <p style={body}>개인간 대출도 이자제한법이 적용돼요. 최고 이자율은 연 20%예요. 그 이상 받기로 약속해도 법적으로 20%만 인정돼요.</p>
      <p style={body}>월 이자로 환산하면 약 1.67%예요. 천만 원 빌려주고 월 16만 7천 원까지 받을 수 있다는 뜻이에요. 이것보다 많이 받으면 초과분은 원금에 충당되고, 원금도 다 갚았으면 돌려줘야 해요.</p>

      <Divider />
      <H2>개인간 관련 자주 묻는 질문</H2>
      <p style={{ ...body, marginBottom: 14 }}>자주 궁금해하는 내용을 모았어요.</p>
      <FAQ items={FAQS} />

      <Divider />

      <SourceNote sources={SOURCES} />
      <Disclaimer text="이 글은 2026년 기준 관련 법령과 공식 자료를 바탕으로 작성했어요. 개별 상황에 따라 달라질 수 있으니 전문가 상담을 권해요." />
    </ArticleLayout>
  );
}
