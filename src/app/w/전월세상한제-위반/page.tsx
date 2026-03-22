"use client";

// Q1. 전월세상한제 위반에 대해 알아보려는 상황
// Q2. 관련 정보를 확인하고 실행한다
// Q3. 5% 넘는 인상분은 법적으로 무효예요., 이미 냈어도 초과분은 돌려달라고 청구할 수 있어요.
// Q4. GreenBox + BorderBox + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  FAQ, SourceNote, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const FAQS = [
  { q: "5% 초과 인상하면 계약 자체가 무효인가요?", a: "아니요. 계약은 유효하고, 5% 초과한 부분만 무효예요." },
  { q: "이미 5% 넘게 냈는데 돌려받을 수 있나요?", a: "네. 계약 기간 중에 초과분 반환 청구할 수 있어요." },
  { q: "특약으로 5% 넘게 올리기로 했는데요?", a: "그 특약은 무효예요. 전월세상한제는 강행규정이라 합의해도 배제 못 해요." },
  { q: "전월세상한제 추가 궁금한 점이 있어요", a: "개별 상황에 따라 다를 수 있으니 관련 기관에 문의하세요." },
  { q: "전월세상한제 추가 궁금한 점이 있어요", a: "개별 상황에 따라 다를 수 있으니 관련 기관에 문의하세요." },
];

const SOURCES = [
  { name: "주택임대차보호법 제7조", href: "https://www.law.go.kr/법령/주택임대차보호법" },
];

const RELATED = [
  { slug: "부동산/전월세상한제", title: "전월세상한제", description: "관련 내용 정리." },
  { slug: "부동산/전월세상한제-계산", title: "전월세상한제 계산", description: "관련 내용 정리." },
  { slug: "부동산/임대차분쟁조정위원회", title: "임대차분쟁조정위원회", description: "관련 내용 정리." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>부동산</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        전월세상한제 위반
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        5% 넘는 인상분은 법적으로 무효예요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>전월세상한제 위반하면 어떻게 되나요</H2>
      <p style={body}>5% 넘는 부분은 법적으로 무효예요. 계약 자체가 무효가 아니라 초과분만 무효예요.</p>
      <GreenBox>
        5% 넘는 인상분은 법적으로 무효예요.{"\n"}
        이미 냈어도 초과분은 돌려달라고 청구할 수 있어요.{"\n"}
        특약으로 5% 넘게 올리기로 해도 그 특약은 무효예요.
      </GreenBox>
      <p style={body}>집주인이 2억 5천만원 달라고 해도 법적으로 유효한 건 2억 1천만원까지예요.</p>

      <CategoryButton label="부동산" count={10} href="/category/%EB%B6%80%EB%8F%99%EC%82%B0" />
      <RelatedArticles items={RELATED} />

      <Divider />
      <H2>전월세상한제 위반 이미 냈을 때</H2>
      <p style={body}>몰라서 5% 넘게 냈어요. 이러면요?</p>
      <BorderBox>
        <strong>전월세상한제 위반 이미 냈을 때</strong><br />
        몰라서 5% 넘게 냈어요. 이러면요?<br />
        돌려받을 수 있어요. 계약 기간 중에 초과분 반환 청구하면 돼요.
      </BorderBox>
      <p style={body}>돌려받을 수 있어요. 계약 기간 중에 초과분 반환 청구하면 돼요.</p>

      <Divider />
      <H2>전월세상한제 위반 특약</H2>
      <p style={body}>"우리끼리 5% 넘게 올리기로 합의했어요." 이런 특약 썼어도요?</p>
      <p style={body}>전월세상한제는 강행규정이에요. 당사자가 합의해도 배제할 수 없어요.</p>
      <p style={body}>집주인이 "특약 썼잖아요"라고 해도 법적으로 효력 없어요.</p>

      <Divider />
      <H2>전월세상한제 관련 자주 묻는 질문</H2>
      <p style={{ ...body, marginBottom: 14 }}>자주 궁금해하는 내용을 모았어요.</p>
      <FAQ items={FAQS} />

      <Divider />

      <SourceNote sources={SOURCES} />
      <Disclaimer text="이 글은 2026년 기준 관련 법령과 공식 자료를 바탕으로 작성했어요. 개별 상황에 따라 달라질 수 있으니 전문가 상담을 권해요." />
    </ArticleLayout>
  );
}
