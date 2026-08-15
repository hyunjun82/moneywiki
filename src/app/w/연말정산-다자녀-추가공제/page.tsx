"use client";
// Q1. 자녀가 2명 이상인 부모가 연말정산에서 추가 공제를 받을 수 있는지 확인하려는 상황
// Q2. 자녀세액공제 금액을 확인하고 부양가족공제 신고서에 정확히 기재한다
// Q3. 2025년 귀속 자녀세액공제 금액(1명 25만, 2명 55만, 3명 95만), 기본공제 요건(20세 이하·100만 이하), 맞벌이 전략
// Q4. GreenBox(금액 정리) + BorderBox(맞벌이 전략) + Checklist(실수 체크) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Checklist, FAQ, SourceNote, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const CHECKLIST_ITEMS = [
  "자녀가 기본공제 대상(20세 이하, 연소득 100만원 이하)인지 확인",
  "맞벌이면 자녀를 한쪽으로 몰아서 공제받았는지 확인",
  "출산·입양한 자녀가 있으면 추가 세액공제(첫째 30만, 둘째 50만, 셋째 70만) 신청",
  "자녀가 아르바이트로 소득 100만원 넘었는지 확인 (넘으면 공제 불가)",
  "장애인 자녀는 나이 제한 없이 기본공제 가능한지 확인",
];

const FAQS = [
  {
    q: "2025년 귀속부터 자녀세액공제가 얼마나 올랐나요?",
    a: "1인당 10만원씩 올랐어요. 1명 25만원, 2명 55만원, 3명 95만원이에요. 이전보다 1명당 10만원 더 공제받는 거예요.",
  },
  {
    q: "맞벌이 부부는 자녀를 나눠서 공제받을 수 있나요?",
    a: "할 수는 있지만 불리해요. 자녀 2명을 각각 1명씩 나누면 각 25만원씩 총 50만원이에요. 한 명이 2명 다 공제받으면 55만원이라 5만원 더 유리해요.",
  },
  {
    q: "대학생 자녀도 공제 대상이에요?",
    a: "20세 이하면 대학생이어도 공제 대상이에요. 21세가 되는 해(2005년생 이전)부터는 기본공제 대상에서 빠져요. 다만 장애인이면 나이 제한이 없어요.",
  },
  {
    q: "출산·입양 세액공제는 뭔가요?",
    a: "2025년 귀속기간에 출생신고나 입양신고를 한 자녀가 있으면 별도로 받아요. 첫째 30만원, 둘째 50만원, 셋째 이상 70만원이에요.",
  },
  {
    q: "자녀세액공제랑 자녀장려금은 다른 건가요?",
    a: "완전히 달라요. 자녀세액공제는 연말정산에서 세금을 깎아주는 거고, 자녀장려금은 저소득 가구에 현금을 지급하는 별도 제도예요.",
  },
  {
    q: "아이가 아르바이트해서 소득이 생기면 어떻게 되나요?",
    a: "연간 소득금액이 100만원(근로소득만 있으면 총급여 500만원)을 넘으면 기본공제 대상에서 빠져요. 기본공제가 안 되면 자녀세액공제도 못 받아요.",
  },
];

const SOURCES = [
  { name: "소득세법 제59조의2", href: "https://www.law.go.kr/법령/소득세법" },
  { name: "국세청 연말정산 안내", href: "https://www.nts.go.kr/nts/cm/cntnts/cntntsView.do?mi=2304&cntntsId=238938" },
  { name: "홈택스 간소화서비스", href: "https://www.hometax.go.kr" },
];

const RELATED = [
  { slug: "연말정산-근로소득-범위", title: "근로소득 범위와 비과세 항목", description: "뭐가 과세되고 뭐가 안 되는지 정리." },
  { slug: "연말정산-문화비", title: "문화비 소득공제 30%", description: "도서·공연·영화 30% 공제 조건." },
  { slug: "연말정산-신용카드-공제-한도", title: "신용카드 공제 한도", description: "25% 초과분부터 시작, 카드별 공제율." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>연말정산 · 자녀공제 · 세액공제</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        자녀가 2명 이상이면 얼마나 공제받나요?<br />
        2025 자녀세액공제 금액과 조건
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        아이가 둘 이상이면 연말정산에서 세금을 꽤 아낄 수 있어요.
      </p>
      <p style={body}>
        2025년 귀속부터 자녀세액공제가 1인당 10만원씩 올랐어요.
        <a href="https://www.law.go.kr/법령/소득세법" style={{ color: "#1D9E75", textDecoration: "underline" }}>소득세법 제59조의2</a>에 따라
        8세 이상 20세 이하 기본공제 대상 자녀가 있으면 세금에서 직접 빼줘요.
        맞벌이라면 한쪽으로 몰아서 공제받는 게 유리하고요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>자녀세액공제, 얼마나 받나요?</H2>
      <p style={body}>
        자녀 수에 따라 금액이 달라지고, 많을수록 1인당 공제액이 커지는 구조예요.
      </p>

      <SectionBadge>2025년 귀속 금액</SectionBadge>
      <GreenBox title="자녀세액공제 금액 (2025년 귀속)">
        <p><strong>자녀 1명</strong> — 25만원</p>
        <p><strong>자녀 2명</strong> — 55만원 (1인당 27.5만원)</p>
        <p><strong>자녀 3명</strong> — 95만원 (3명째 40만원 추가)</p>
        <p><strong>자녀 4명</strong> — 135만원 (4명째 40만원 추가)</p>
      </GreenBox>
      <p style={body}>
        이건 <strong>세액공제</strong>라서 계산된 세금에서 직접 빼줘요.
        소득공제(과세표준을 줄이는 것)와 다르게 공제액이 곧 절세액이에요.
        자녀 3명이면 세금에서 95만원이 바로 빠지는 거예요.
      </p>

      <Divider />

      <H2>공제 대상 자녀 조건이 뭔가요?</H2>
      <p style={body}>
        모든 자녀가 다 되는 건 아니에요. 기본공제 대상이어야 해요.
      </p>
      <BorderBox>
        <p><strong>나이 요건</strong> — 8세 이상 20세 이하 (2005년생~2017년생, 2025년 귀속 기준)</p>
        <p><strong>소득 요건</strong> — 연간 소득금액 100만원 이하 (근로소득만 있으면 총급여 500만원 이하)</p>
        <p><strong>생계 요건</strong> — 주민등록상 같은 세대이거나 실제 부양 중</p>
        <p><strong>장애인 자녀</strong> — 나이 제한 없이 기본공제 대상</p>
      </BorderBox>

      <Divider />
      <ArticleAd position="mid" />

      <H2>맞벌이 부부, 누가 공제받는 게 유리할까요?</H2>
      <p style={body}>
        자녀를 나눠서 공제받으면 오히려 손해예요.
      </p>
      <BorderBox>
        <p><strong>자녀 2명을 나누면</strong> — 각 1명씩, 25만원 + 25만원 = 50만원</p>
        <p><strong>한 명이 2명 다 공제받으면</strong> — 55만원 (5만원 더 유리)</p>
        <p><strong>결론</strong> — 소득이 높은 쪽이 자녀 전체를 공제받는 게 유리해요. 세율이 높을수록 기본공제(1인당 150만원) 효과도 커지거든요.</p>
      </BorderBox>
      <p style={body}>
        출산·입양 세액공제(첫째 30만원, 둘째 50만원, 셋째 70만원)도 기본공제를 받는 쪽에서 함께 신청하세요.
      </p>

      <Divider />

      <H2>흔히 실수하는 부분을 체크하세요</H2>
      <p style={body}>
        해마다 같은 실수로 추징당하는 사례가 많아요.
      </p>

      <SectionBadge>실수 방지 체크</SectionBadge>
      <Checklist items={CHECKLIST_ITEMS} />

      <Divider />

      <CategoryButton label="연말정산" count={10} href="/category/연말정산" />
      <RelatedArticles items={RELATED} />

      <FAQ items={FAQS} />
      <Divider />
      <SourceNote sources={SOURCES} />
      <Disclaimer text="이 글은 2025년 귀속 연말정산 기준(소득세법)으로 작성했어요. 개인 상황에 따라 공제 여부가 달라질 수 있으니 홈택스 간소화서비스에서 확인하세요." />
    </ArticleLayout>
  );
}
