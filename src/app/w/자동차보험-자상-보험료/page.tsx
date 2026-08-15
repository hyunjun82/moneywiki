"use client";
// Q1. 이 키워드를 검색하는 사람은 지금 어떤 상황인가?
//     자동차보험 갱신하면서 자상(자동차상해)과 자손(자기신체사고) 중 뭘 선택할지 보험료 차이가 궁금한 상황
// Q2. 이 사람이 이 글을 읽고 나서 할 수 있어야 하는 행동은?
//     보험료 차이와 보장 범위를 비교해서 자신에게 맞는 특약을 선택한다
// Q3. 이 행동을 하려면 반드시 알아야 하는 정보는?
//     보험료 차이(연 3~5만원), 보장 범위 차이(과실상계 여부), 가입 금액 기준, 어떤 사람에게 유리한지
// Q4. 이 정보를 가장 잘 전달하는 형태는?
//     GreenBox(결론 요약) + BorderBox(비교표) + Checklist(선택 기준) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Checklist, FAQ, SourceNote, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const CHECKLIST = [
  "운전 빈도가 높다면 자상(자동차상해) 추천",
  "가족과 함께 타는 경우가 많다면 자상이 유리",
  "보험료를 최소화하고 싶다면 자손도 고려",
  "기존 실손보험 보장 범위와 중복 여부 확인",
  "가입 한도는 보통 5천만원이면 충분",
];

const FAQS = [
  {
    q: "자상과 자손, 보험료 차이가 정확히 얼마나 나나요?",
    a: "운전 경력에 따라 다르지만 연간 3만~5만원 정도 차이예요. 신규 가입자는 약 5만원, 10년 이상 무사고자는 약 3만원 차이가 나요.",
  },
  {
    q: "자상은 과실 비율 상관없이 보상받는다는 게 무슨 뜻이에요?",
    a: "자손은 상대방 과실만큼만 보상하는데, 자상은 내가 100% 잘못한 사고여도 가입 한도 내에서 전액 보상해줘요. 치료비, 위자료, 휴업손해까지 과실 비율과 무관하게 받을 수 있어요.",
  },
  {
    q: "가입 한도는 얼마로 해야 하나요?",
    a: "대부분 3천만원, 5천만원, 1억원 중에 선택해요. 보통 5천만원이면 충분하다고 봐요. 큰 사고에 대비하고 싶다면 1억원도 고려할 만해요.",
  },
  {
    q: "실손보험이 있으면 자손만 들어도 되나요?",
    a: "실손보험은 치료비만 커버해요. 자상은 위자료, 휴업손해까지 보상하니까 실손보험과 별개로 판단하는 게 맞아요. 보장 범위가 달라요.",
  },
  {
    q: "자동차보험 갱신할 때 중간에 변경할 수 있나요?",
    a: "갱신 시점에 자유롭게 변경할 수 있어요. 갱신 전에 여러 보험사 견적을 비교해보면 10~20% 절약이 가능해요.",
  },
];

const SOURCES = [
  { name: "손해보험협회", href: "https://www.knia.or.kr" },
  { name: "금융감독원 보험상품 비교", href: "https://www.fss.or.kr" },
  { name: "캐롯손해보험 자상 vs 자손 비교", href: "https://blog.carrotins.com" },
];

const RELATED = [
  { slug: "5세대-실손보험-보장-내용", title: "5세대 실손보험 보장 내용", description: "2026년 5세대 실손보험 가입 전 알아야 할 것." },
  { slug: "5세대-실손보험-보험료-비교", title: "5세대 실손보험 보험료 비교", description: "보험사별 보험료 차이와 절약 팁." },
  { slug: "4대보험-공제액-계산", title: "4대보험 공제액 계산", description: "급여에서 빠지는 4대보험료 계산법." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>금융 · 자동차보험</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        자동차보험 자상 보험료, 자손과 얼마나 다를까?<br />
        보장 범위와 보험료 비교
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        자동차보험 갱신할 때 자상이랑 자손 중에 뭘 골라야 할지 고민이시죠?
      </p>
      <p style={body}>
        자상(자동차상해)은 자손(자기신체사고)보다 연간 3만~5만원 더 비싸지만, 보장 범위가 훨씬 넓어요. 과실 비율에 상관없이 치료비, 위자료, 휴업손해까지 한도 내에서 전액 보상받을 수 있어요. 보험료 차이와 보장 내용을 비교해서 나에게 맞는 특약을 고르는 방법을 정리했어요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>자상 vs 자손, 핵심 차이부터 봐요</H2>
      <p style={body}>
        이름은 비슷하지만 보상 방식이 완전히 달라요. 가장 큰 차이는 과실상계(과실 비율에 따라 보상을 줄이는 것) 적용 여부예요.
      </p>

      <GreenBox>
        자손(자기신체사고): 상해 등급별 한도 내 치료비만 보상, 과실상계 적용{"\n"}
        자상(자동차상해): 가입 한도 내 치료비+위자료+휴업손해, 과실상계 없음{"\n"}
        보험료 차이: 연간 3만~5만원 (자상이 더 비쌈){"\n"}
        가입 한도: 통상 3천만원 ~ 1억원
      </GreenBox>

      <p style={body}>
        9급 상해를 예로 들면, 자손은 240만원 한도에서 치료비만 받지만, 자상은 가입 한도(5천만원이라면) 안에서 치료비, 위자료, 휴업손해를 전부 받을 수 있어요. 큰 사고일수록 차이가 수천만원까지 벌어져요.
      </p>

      <CategoryButton label="금융 정보" count={10} href="/category/금융" />
      <RelatedArticles items={RELATED} />

      <Divider />

      <H2>보험료는 구체적으로 얼마 차이나나요?</H2>
      <p style={body}>
        운전 경력과 차종에 따라 달라지지만, 대략적인 범위는 이래요.
      </p>

      <BorderBox>
        <strong>경력별 연간 보험료 비교 (2026년 기준 추정)</strong><br /><br />
        <strong>신규 가입자</strong>: 자손 약 15만원 / 자상 약 20만원 (차이 약 5만원)<br />
        <strong>5년 무사고</strong>: 자손 약 12만원 / 자상 약 16만원 (차이 약 4만원)<br />
        <strong>10년 이상 무사고</strong>: 자손 약 10만원 / 자상 약 13만원 (차이 약 3만원)<br /><br />
        <em>출처: <a href="https://www.knia.or.kr" style={{ color: "#1D9E75" }}>손해보험협회</a> 통계 기준 추정치</em>
      </BorderBox>

      <p style={body}>
        월로 따지면 2,500~4,200원 차이예요. 커피 한 잔 값인데, 큰 사고가 나면 보상 차이가 수천만원이 될 수 있으니 비용 대비 효과가 큰 편이에요.
      </p>

      <Divider />

      <H2>자상과 자손, 어떤 걸 선택해야 할까?</H2>
      <p style={body}>
        상황에 따라 달라요. 아래 체크리스트로 판단해보세요.
      </p>

      <SectionBadge>선택 기준 체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <p style={body}>
        운전 빈도가 높고 가족과 함께 타는 경우가 많다면 자상이 확실히 유리해요. 혼자 가끔 타고 보험료를 아끼고 싶다면 자손도 나쁘지 않지만, 연 3~5만원 차이로 보장이 크게 달라지니 자상을 추천하는 전문가가 많아요.
      </p>

      <Divider />

      <H2>자상 보험료, 이런 점이 궁금하죠</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        자주 나오는 질문들을 모았어요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <SourceNote sources={SOURCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 손해보험 통계를 참고해 작성했어요. 실제 보험료는 보험사, 차종, 운전 경력에 따라 다를 수 있으니 여러 보험사 견적을 비교해보세요." />
    </ArticleLayout>
  );
}
