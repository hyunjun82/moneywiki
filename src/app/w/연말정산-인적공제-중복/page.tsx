"use client";

// Q1. 형제끼리 또는 맞벌이 부부끼리 부양가족을 중복 공제하면 어떻게 되는지 궁금한 상황
// Q2. 가족과 미리 상의해서 중복 공제를 방지하고, 소득 높은 쪽에서 공제받는다
// Q3. 중복 유형(형제·부부·이혼), 적발 방법(주민번호 전산 대조), 제재(추징+가산세), 예방법
// Q4. GreenBox로 제재 요약 + BorderBox로 중복 유형 + Checklist로 예방법

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Checklist, FAQ, SourceNote, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const CHECKLIST = [
  "연말 전에 형제·부부끼리 부양가족 배분 상의하기",
  "소득 높은 쪽에서 공제받으면 절세 효과 큼",
  "맞벌이 부부: 자녀는 한 사람만 등록 (2명이면 1명씩 가능)",
  "회사 제출 전에 부양가족 명단 가족과 공유해서 재확인",
  "적발 전에 수정신고하면 가산세 50% 감면",
  "홈택스에서 부양가족 등록 현황 수시 조회",
];

const FAQS = [
  { q: "부모님 한 분을 형제끼리 중복 공제하면 어떻게 되나요?", a: "둘 다 추징당해요. 누가 먼저 신고했는지는 상관없어요. 세금 + 부정과소신고 가산세 10%까지 합쳐서 물어야 해요." },
  { q: "맞벌이 부부가 자녀를 중복 공제하면요?", a: "마찬가지예요. 둘 다 추징돼요. 자녀 한 명은 한 사람에게만 등록해야 해요." },
  { q: "어떻게 적발되나요?", a: "국세청이 주민등록번호로 자동 전산 대조해요. 한 주민번호가 2개 이상의 연말정산에 부양가족으로 나오면 바로 걸려요. 보통 3~6월에 적발 통보가 와요." },
  { q: "이혼 후 양육비 내면 인적공제 받을 수 있나요?", a: "실제로 자녀와 함께 사는 쪽이 공제받아요. 양육비만 내는 쪽은 인적공제 대상이 아니에요. 둘 다 등록하면 중복으로 적발돼요." },
  { q: "적발되기 전에 수정신고하면 가산세를 줄일 수 있나요?", a: "네. 국세청 통보 전에 수정신고하면 부정과소신고 가산세가 50% 감면돼요. 발견 즉시 홈택스에서 수정하는 게 유리해요." },
  { q: "부양가족 공제 150만원이면 추징세금이 얼마예요?", a: "세율 구간에 따라 달라져요. 세율 24% 구간이면 36만원 세금 + 가산세 3.6만원 = 약 40만원을 물어야 해요." },
];

const SOURCES = [
  { name: "소득세법", href: "https://www.law.go.kr/법령/소득세법" },
  { name: "국세청 연말정산 안내", href: "https://www.nts.go.kr" },
  { name: "홈택스", href: "https://www.hometax.go.kr" },
];

const RELATED = [
  { slug: "연말정산-인적공제", title: "연말정산 인적공제", description: "기본공제·추가공제 대상과 금액." },
  { slug: "연말정산", title: "연말정산 공제 항목 정리", description: "소득공제부터 세액공제까지 전체 흐름." },
  { slug: "연말정산-부양가족-의료비-세액공제", title: "부양가족 의료비 세액공제", description: "나이·소득 무관 의료비 15% 공제." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>연말정산 · 인적공제 · 중복</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        부양가족 중복 공제하면 둘 다 추징돼요<br />
        연말정산 인적공제 중복 방지법
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        "부모님을 형제끼리 나눠서 공제받을 수 있나요?" 한 분을 둘 다 등록하면 큰일 나요.
      </p>
      <p style={body}>
        국세청은 <a href="https://www.law.go.kr/법령/소득세법" style={{ color: "#1D9E75", textDecoration: "underline" }}>소득세법</a>에 따라 주민등록번호로 전산 대조해서 중복 공제를 100% 적발해요.
        한 부양가족을 2명이 동시에 공제받으면 둘 다 세금을 토해내고, 10% 가산세까지 붙어요.
        미리 가족끼리 정해놓으면 간단히 예방할 수 있어요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>중복 공제되면 제재가 어떻게 되나요?</H2>
      <p style={body}>
        "누가 먼저 신고했느냐"는 상관없어요. 둘 다 불이익을 받아요.
      </p>

      <GreenBox>
        둘 다 추징: 중복 공제 금액에 대한 세금 전액 반환{"\n"}
        부정과소신고 가산세: 추가 세금의 10%{"\n"}
        적발 시기: 보통 3~6월 (전산 대조 결과 통보){"\n"}
        적발 방법: 주민등록번호 자동 전산 대조 (100% 적발)
      </GreenBox>

      <p style={body}>
        예를 들어 어머니를 형제가 중복 등록했다면, 인적공제 150만원에 세율 24% 적용 시
        형도 36만원 + 가산세 3.6만원, 동생도 36만원 + 가산세 3.6만원을 각각 내야 해요.
      </p>

      <CategoryButton label="연말정산 정보" count={12} href="/category/연말정산" />
      <RelatedArticles items={RELATED} />

      <Divider />

      <H2>어떤 경우에 중복이 생기나요?</H2>
      <p style={body}>
        의도하지 않아도 중복이 되는 경우가 꽤 많아요.
      </p>

      <BorderBox>
        <strong>형제끼리 부모님 중복</strong>: 형이 아버지, 동생이 어머니 각각 공제하는 건 OK. 어머니를 둘 다 등록하면 중복.{"\n\n"}
        <strong>맞벌이 부부 자녀 중복</strong>: 같은 자녀를 남편·아내 모두 등록하면 중복. 자녀 2명이면 1명씩 나눠 등록은 가능.{"\n\n"}
        <strong>이혼 후 자녀 중복</strong>: 양쪽 부모가 각자 자녀를 등록하면 중복. 실제 동거하는 쪽만 공제 가능.{"\n\n"}
        <strong>형제가 조부모님 중복</strong>: 부모님뿐 아니라 조부모님도 중복 적발 대상이에요.
      </BorderBox>

      <Divider />

      <H2>중복을 미리 막으려면</H2>
      <p style={body}>
        연말 전에 5분만 상의하면 수십만원을 아낄 수 있어요.
      </p>

      <SectionBadge>중복 방지 체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <Divider />
      <ArticleAd position="middle" />

      <H2>자주 묻는 질문</H2>
      <p style={{ ...body, marginBottom: 14 }}>인적공제 중복에 대해 많이 궁금해하는 것들이에요.</p>
      <FAQ items={FAQS} />

      <Divider />

      <SourceNote sources={SOURCES} />
      <Disclaimer text="이 글은 2025년 귀속(2026년 연말정산) 기준 소득세법을 바탕으로 작성했어요. 공제 요건·가산세율은 세법 개정에 따라 변경될 수 있으니 홈택스에서 최신 정보를 확인하세요." />
    </ArticleLayout>
  );
}
