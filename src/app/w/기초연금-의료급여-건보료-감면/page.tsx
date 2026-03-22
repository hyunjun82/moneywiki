"use client";

// Q1: 기초연금을 받고 있는데 병원비 혜택이 추가로 있는지 궁금한 어르신
// Q2: 의료급여 연계 구조와 건강보험료 감면 여부를 파악하고, 해당되면 신청
// Q3: 의료급여 1종/2종 유지 조건, 건보료 경감 대상, 병원비 본인부담 차이
// Q4: GreenBox(핵심) + BorderBox(비교표) + Checklist + FAQ

import Link from "next/link";
import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 기초연금_SIDEBAR, 기초연금_HIGHLIGHT } from "@/data/기초연금-guide";

const CHECKLIST_ITEMS = [
  "기초연금 수급 여부 확인 (수급 확인서 발급)",
  "의료급여 대상 여부 확인 (기초생활수급자만 해당)",
  "건강보험료 경감 대상 여부 확인 (국민건강보험공단 1577-1000)",
  "틀니, 임플란트 보험 적용 확인 (치과 방문 시 65세 이상 고지)",
  "국가건강검진 무료 대상 확인 (홀수/짝수 년도 교차)",
];

const FAQS = [
  {
    q: "기초연금 받으면 자동으로 건보료가 깎이나요?",
    a: "자동은 아니에요. 건강보험료 경감은 소득 수준에 따라 적용되는데, 기초연금 수급자라도 소득인정액 구간에 따라 경감율이 달라지죠. 국민건강보험공단에 직접 확인하는 게 정확해요.",
  },
  {
    q: "의료급여 1종이랑 2종 차이가 뭔가요?",
    a: "본인부담 비율이 달라요. 1종은 입원 시 본인부담 없고 외래는 1,000~2,000원이죠. 2종은 입원 10%, 외래 1,000~1,500원 정도예요. 1종이 혜택이 더 크고요.",
  },
  {
    q: "기초연금이랑 의료급여를 동시에 받을 수 있나요?",
    a: "받을 수 있어요. 기초생활수급자이면서 65세 이상이면 의료급여와 기초연금을 동시에 수급하죠. 기초연금이 소득으로 반영되어 생계급여가 조정될 수는 있지만 의료급여 자격은 유지돼요.",
  },
  {
    q: "건강보험 가입자인데 기초연금을 받으면 의료급여로 바뀌나요?",
    a: "아니에요. 기초연금만 받는다고 건강보험에서 의료급여로 전환되지 않아요. 의료급여는 기초생활수급자에게 적용되는 별도의 제도이죠.",
  },
  {
    q: "틀니나 임플란트 보험은 기초연금 수급자만 되나요?",
    a: "아니에요. 65세 이상이면 기초연금 수급 여부와 관계없이 건강보험 적용이 돼요. 틀니는 본인부담 30%, 임플란트는 평생 2개까지 보험 적용이죠.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "기초연금법 제3조: 수급권자 범위", url: "https://www.law.go.kr/법령/기초연금법" },
      { label: "의료급여법 제3조: 수급권자", url: "https://www.law.go.kr/법령/의료급여법" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "국민건강보험공단: 보험료 경감 안내", url: "https://www.nhis.or.kr" },
      { label: "복지로: 의료급여 안내", url: "https://www.bokjiro.go.kr" },
    ],
  },
];

const RELATED = [
  {
    slug: "기초연금-감면혜택-추가지원",
    title: "기초연금 감면 혜택과 추가 지원",
    description: "의료 외에 통신비, 교통비, 난방비까지 받을 수 있는 혜택을 정리했어요.",
  },
  {
    slug: "기초연금-생계급여-동시수급-삭감기준",
    title: "생계급여 동시 수급과 삭감 기준",
    description: "기초연금과 생계급여를 동시에 받을 때 삭감 구조를 정리했어요.",
  },
  {
    slug: "기초연금-수급자격-선정기준액-소득조건",
    title: "기초연금 수급자격 선정기준액",
    description: "기초연금 대상 여부를 소득인정액 기준으로 확인해 보세요.",
  },
];

export default function Page() {
  return (
    <ArticleLayout
      sidebar={
        <Sidebar
          heading="기초연금 가이드"
          items={기초연금_SIDEBAR}
          highlightSlugs={기초연금_HIGHLIGHT}
          currentSlug="기초연금-의료급여-건보료-감면"
        />
      }
    >
      <nav style={{ fontSize: 13, color: "#6b7280", marginBottom: 8 }}>
        <Link href="/" style={{ color: "#6b7280" }}>홈</Link> &gt;{" "}
        <Link href="/w/기초연금" style={{ color: "#6b7280" }}>기초연금</Link> &gt;{" "}
        <span style={{ color: "#374151" }}>의료급여 건보료 감면</span>
      </nav>

      <h1 style={{ fontSize: 26, fontWeight: 800, color: "#111", lineHeight: 1.35, marginBottom: 4 }}>
        기초연금 받으면 병원비 혜택도?
      </h1>
      <p style={{ fontSize: 17, color: "#1D9E75", fontWeight: 600, marginBottom: 20 }}>
        의료급여 연계 구조와 건보료 감면 조건
      </p>

      <p style={body}>
        기초연금 35만 원 받는 것까지는 좋은데, 병원비가 부담되죠.
        &quot;기초연금 받으면 병원비도 뭔가 혜택이 있지 않나?&quot; 궁금해하는 분이 많고요.
      </p>
      <p style={body}>
        기초연금 수급자라고 해서 자동으로 병원비 혜택이 생기는 건 아니에요. 하지만 <strong>기초생활수급자라면 의료급여가 유지</strong>되고,
        건강보험 가입자라면 소득 수준에 따라 <strong>건강보험료 경감</strong>을 받을 수 있죠.
        65세 이상이면 기초연금과 무관하게 틀니, 임플란트 보험 적용도 되고요.
      </p>

      <ArticleAd position="intro" />
      <Divider />

      <H2>의료급여 대상이면 병원비가 크게 줄어요</H2>
      <SectionBadge>의료급여 연계</SectionBadge>

      <p style={body}>
        의료급여는 기초생활수급자에게 적용되는 의료 지원 제도예요.{" "}
        <a href="https://www.law.go.kr/법령/의료급여법" style={{ color: "#1D9E75", textDecoration: "underline" }}>의료급여법 제3조</a>에 따라
        근로능력이 없는 수급자는 1종, 근로능력이 있는 수급자는 2종으로 분류되죠.
      </p>
      <p style={body}>
        의료급여 1종은 입원 시 본인부담이 없고, 외래 진료도 1,000~2,000원 수준이에요.
        2종은 입원 본인부담 10%, 외래 1,000~1,500원이죠.
        건강보험(입원 20%, 외래 30~60%)에 비하면 본인부담이 훨씬 적어요.
      </p>
      <p style={body}>
        기초연금을 받으면서 기초생활수급자 자격을 유지하고 있다면 의료급여도 그대로 유지돼요. 기초연금이 소득으로 잡혀서{" "}
        <Link href="/w/기초연금-생계급여-동시수급-삭감기준" style={{ color: "#1D9E75", textDecoration: "underline" }}>생계급여가 조정</Link>될 수는 있지만,
        의료급여 자격 자체가 박탈되지는 않죠.
      </p>

      <BorderBox>
        <strong>의료급여 1종</strong>: 입원 무료, 외래 1,000~2,000원<br />
        <strong>의료급여 2종</strong>: 입원 10%, 외래 1,000~1,500원<br />
        <strong>건강보험</strong>: 입원 20%, 외래 30~60%<br />
        기초생활수급자 + 기초연금 = 의료급여 유지
      </BorderBox>

      <Divider />

      <H2>건강보험료 감면은 어떻게 되나요?</H2>
      <SectionBadge>건보료 경감</SectionBadge>

      <p style={body}>
        의료급여가 아닌 건강보험 가입자라면, 소득 수준에 따라 건강보험료 경감 혜택을 받을 수 있어요.
        기초연금 수급자라는 이유만으로 자동 경감되지는 않지만, 소득 하위 구간에 해당하면 보험료가 줄어드는 구조이죠.
      </p>
      <p style={body}>
        지역가입자의 경우 재산이 적으면 보험료가 낮게 산정되고, 추가로 경감 혜택이 적용될 수 있어요.
        65세 이상 노인 중 소득 수준이 낮은 경우 최대 30%까지 경감받는 사례도 있죠.
      </p>
      <p style={body}>
        본인이 경감 대상인지는 <a href="https://www.nhis.or.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>국민건강보험공단</a>(1577-1000)에 전화하면 바로 확인할 수 있어요. 경감 대상이면 별도로 신청해야 적용되니 꼭 문의해 보세요.
      </p>

      <GreenBox>
        건강보험료 경감 = 소득 수준에 따라 자동 적용 또는 신청 필요<br />
        기초연금 수급 자체가 경감 조건은 아님 (소득 구간이 핵심)<br />
        확인: 국민건강보험공단 1577-1000
      </GreenBox>

      <CategoryButton label="기초연금 정보" count={기초연금_SIDEBAR.length} href="/category/기초연금" />
      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      <H2>65세 이상이면 누구나 받는 의료 혜택</H2>

      <p style={body}>
        기초연금이나 의료급여와 관계없이, 65세 이상이면 누구나 받을 수 있는 의료 혜택이 있어요.
        틀니는 7년에 한 번 건강보험이 적용돼서 본인부담 30%로 제작할 수 있고, 임플란트는 평생 2개까지 보험이 적용되죠.
      </p>
      <p style={body}>
        국가건강검진도 무료예요. 만 66세 이상은 2년마다 건강검진을 받을 수 있고, 암검진도 일정 나이 이상이면 무료로 제공되죠.
        검진 대상 연도는 짝수/홀수 출생연도에 따라 달라지니, 국민건강보험공단 홈페이지에서 확인하면 돼요.
      </p>
      <p style={body}>
        이런 혜택은 기초연금 수급 여부와 무관하게 65세 이상이면 모두 적용되니, 기초연금에서 탈락하더라도 의료 혜택은 유지된다는 점을 기억하세요.
      </p>

      <Checklist items={CHECKLIST_ITEMS} />

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        기초연금과 의료비 혜택에 대해 자주 나오는 질문이에요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2025년 기준 의료급여법과 건강보험 정책을 바탕으로 작성됐어요. 건강보험료 경감율과 의료급여 본인부담 기준은 매년 조정될 수 있으니, 국민건강보험공단(1577-1000)에 확인하세요." />
    </ArticleLayout>
  );
}
