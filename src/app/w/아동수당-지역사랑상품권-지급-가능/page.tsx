"use client";

// Q1. 지자체에서 아동수당을 상품권으로 준다는데 이게 합법인지, 거부할 수 있는지 확인하려는 보호자
// Q2. 상품권 지급 동의 여부를 결정하고, 원하면 현금으로 변경 신청한다
// Q3. 아동수당법 시행규칙 제8조(수급자 동의), 2026년 개정(연령 확대·인구감소지역 추가), 변경 절차
// Q4. GreenBox(결론) + BorderBox(2026 개정 비교표) + Steps(변경 절차) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, FAQ, SourceNote, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const STEPS = [
  {
    title: "현재 지급 방식을 확인하세요",
    desc: "복지로(bokjiro.go.kr)나 정부24(gov.kr)에서 아동수당 지급 내역을 조회할 수 있어요. 현금인지 상품권인지 확인하세요.",
    tip: "매월 25일 지급, 지자체별로 지급일이 다를 수 있어요",
  },
  {
    title: "관할 주민센터나 구청에 연락하세요",
    desc: "지급 방식을 바꾸고 싶으면 관할 주민센터나 구청 아동수당 담당부서에 변경 신청을 하면 돼요. 전화나 방문 모두 가능해요.",
    tip: "변경 신청은 매월 15일 전에 해야 당월 반영 가능",
  },
  {
    title: "다음 달부터 변경된 방식으로 받으세요",
    desc: "동의서를 제출하거나 철회하면 다음 지급월부터 바뀐 방식이 적용돼요. 상품권에서 현금으로, 현금에서 상품권으로 언제든 변경 가능해요.",
  },
];

const FAQS = [
  {
    q: "아동수당을 지역사랑상품권으로 받으면 손해인가요?",
    a: "액면가는 동일하고 지역 가맹점에서 현금처럼 쓸 수 있어요. 인구감소지역이면 상품권으로 받을 때 추가 금액(최대 3만원)이 붙어서 오히려 유리할 수 있어요.",
  },
  {
    q: "상품권 지급을 거부할 수 있나요?",
    a: "당연히 가능해요. 수급자가 동의해야만 상품권으로 지급돼요. 동의하지 않으면 계속 현금으로 받아요.",
  },
  {
    q: "상품권은 어디서 쓸 수 있나요?",
    a: "해당 지역의 가맹점(동네 슈퍼, 식당, 전통시장 등)에서 사용 가능해요. 대형마트나 온라인몰은 대부분 안 돼요.",
  },
  {
    q: "2026년부터 아동수당 대상이 넓어졌나요?",
    a: "네, 2026년부터 9세 미만까지로 확대됐고, 2030년까지 13세 미만으로 단계적으로 넓어져요. 2026년 1월분부터 소급 적용돼요.",
  },
  {
    q: "인구감소지역이면 얼마를 더 받나요?",
    a: "비수도권 기본 10만 5천원, 인구감소지역 우대 11만원, 특별 12만원이에요. 상품권 지급 시에는 각각 12만원, 13만원 상당으로 올라가요.",
  },
];

const SOURCES = [
  { name: "아동수당법 시행규칙", href: "https://www.law.go.kr/법령/아동수당법시행규칙" },
  { name: "보건복지부", href: "https://www.mohw.go.kr/menu.es?mid=a10711030100" },
  { name: "복지로", href: "https://www.bokjiro.go.kr" },
];

const RELATED = [
  { slug: "아동수당-신청-방법", title: "아동수당 신청 방법", description: "정부24, 복지로, 주민센터 신청 절차 정리." },
  { slug: "부모급여-신청", title: "부모급여 신청과 금액", description: "0~1세 100만원, 1~2세 50만원 지급 조건." },
  { slug: "양육수당-조건", title: "양육수당 지급 조건", description: "어린이집 미이용 시 받는 양육수당 안내." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>복지 · 아동수당 · 지급 방식</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        아동수당 지역사랑상품권으로 받아도 되나요?<br />
        지급 방식과 변경 방법
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        지자체에서 아동수당을 상품권으로 준다고 하는데, 이게 괜찮은 건지 궁금하시죠.
      </p>
      <p style={body}>
        결론부터 말하면 <strong>수급자가 동의하면 가능</strong>해요.
        <a href="https://www.law.go.kr/법령/아동수당법시행규칙" style={{ color: "#1D9E75", textDecoration: "underline" }}>아동수당법 시행규칙</a>에서
        수급자 동의 시 상품권 지급을 허용하고 있거든요. 원하지 않으면 현금으로 계속 받을 수 있어요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>상품권 지급, 법적 근거가 뭔가요?</H2>
      <p style={body}>
        아동수당은 원칙적으로 매월 25일에 수급자 계좌로 현금 입금돼요.
        그런데 시행규칙에서 예외를 두고 있어요.
      </p>

      <SectionBadge>법적 근거</SectionBadge>
      <GreenBox title="핵심 정리">
        <p><strong>원칙</strong> — 현금으로 수급자 지정 계좌에 입금</p>
        <p><strong>예외</strong> — 수급자가 동의하면 지역사랑상품권으로 지급 가능</p>
        <p><strong>핵심</strong> — 일방적으로 상품권으로 바꿀 수 없음. 반드시 동의 필요</p>
      </GreenBox>
      <p style={body}>
        지자체가 상품권 지급을 시행하려면 주민 의견을 듣고 조례를 만들어야 해요.
        동의서를 제출한 수급자만 상품권으로 받고, 나머지는 현금 유지예요.
      </p>

      <Divider />

      <H2>2026년 개정으로 뭐가 달라졌나요?</H2>
      <p style={body}>
        2026년 3월 아동수당법 개정안이 통과되면서 지급 대상과 금액이 크게 바뀌었어요.
      </p>

      <SectionBadge>2026년 개정 사항</SectionBadge>
      <BorderBox>
        <p><strong>지급 대상 확대</strong> — 2026년 9세 미만 → 2030년까지 13세 미만으로 단계 확대</p>
        <p><strong>수도권</strong> — 매월 10만원 (기존과 동일)</p>
        <p><strong>비수도권</strong> — 매월 10만 5천원</p>
        <p><strong>인구감소지역 우대</strong> — 매월 11만원 (상품권 시 12만원)</p>
        <p><strong>인구감소지역 특별</strong> — 매월 12만원 (상품권 시 13만원)</p>
        <p><strong>소급 적용</strong> — 2026년 1월분부터 소급 지급</p>
      </BorderBox>
      <p style={body}>
        인구감소지역에 살면 상품권으로 받을 때 추가 금액이 붙어서 현금보다 유리할 수 있어요.
        다만 상품권 사용처가 제한되니까 본인 생활 패턴에 맞춰서 결정하면 돼요.
      </p>

      <Divider />
      <ArticleAd position="mid" />

      <H2>지급 방식 변경은 이렇게 해요</H2>
      <p style={body}>
        상품권에서 현금으로, 현금에서 상품권으로 언제든 바꿀 수 있어요.
      </p>

      <SectionBadge>변경 절차</SectionBadge>
      <Steps steps={STEPS} />

      <Divider />

      <CategoryButton label="복지" count={6} href="/category/복지" />
      <RelatedArticles items={RELATED} />

      <FAQ items={FAQS} />
      <Divider />
      <SourceNote sources={SOURCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 아동수당법 및 시행규칙을 바탕으로 작성했어요. 지자체별 시행 시기와 세부 기준이 다를 수 있으니 관할 주민센터에서 확인하세요." />
    </ArticleLayout>
  );
}
