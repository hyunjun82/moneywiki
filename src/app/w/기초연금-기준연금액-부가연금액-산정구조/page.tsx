"use client";
import { Divider } from "@/components/article-ui/Divider";
import { BorderBox } from "@/components/article-ui/BorderBox";

// Q1. 기초연금 관련 글을 읽다가 "기준연금액", "부가연금액" 용어가 나와서 뭔 차이인지 헷갈리는 상황
// Q2. 기준연금액과 부가연금액의 개념을 이해하고, 내 기초연금이 어떤 구조로 산정되는지 파악할 수 있어야 함
// Q3. ① 기준연금액 349,360원(최대 지급액) ② 부가연금액 = 기준연금액 - 국민연금 A급여분 ③ 국민연금 미가입자는 기준연금액 전액 ④ 산정 구조(A급여 연동)
// Q4. GreenBox(용어 정의 요약) + BorderBox(산정 구조 상세) + GreenBox(계산 예시) + FAQ

import Link from "next/link";
import {
  H2, GreenBox, BorderBox, Divider, body,
  FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 기초연금_SIDEBAR, 기초연금_HIGHLIGHT } from "@/data/기초연금-guide";

const FAQS = [
  {
    q: "국민연금을 안 냈으면 기준연금액을 다 받나요?",
    a: "맞아요. 국민연금 미가입자, 무연금자, 국민연금 월 수령액이 기준연금액의 150%(524,040원) 이하인 분은 기준연금액(349,360원) 전액을 받아요.",
  },
  {
    q: "부가연금액은 언제 적용되나요?",
    a: "국민연금 A급여액이 기준연금액의 150%(524,040원)를 초과하는 경우에 부가연금액이 적용돼요. 이때 기준연금액에서 A급여 반영분을 빼고 남은 금액이 부가연금액이에요.",
  },
  {
    q: "A급여액이 뭔가요?",
    a: "A급여는 국민연금의 균등 부분(소득재분배 기능)을 말해요. 가입자 전체의 평균소득을 기반으로 계산되는 부분이에요. 국민연금공단(1355)에 전화하면 본인의 A급여액을 확인할 수 있어요.",
  },
  {
    q: "부가연금액이 0원이 될 수 있나요?",
    a: "최소 기준연금액의 50%(174,680원)는 보장되니까, 부가연금액이 아무리 줄어도 174,680원 이하로는 내려가지 않아요.",
  },
  {
    q: "기준연금액은 매년 바뀌나요?",
    a: "매년 전국소비자물가변동률을 반영해서 조정돼요. 2025년 334,810원에서 2026년 349,360원으로 약 4.3% 올랐어요. 기준연금액이 오르면 부가연금액의 최소 보장액도 함께 올라요.",
  },
];

const REFERENCES = [
  {
    category: "공식 자료",
    items: [
      { label: "보건복지부: 기초연금 산정 기준", url: "https://www.mohw.go.kr" },
      { label: "국민연금공단: 기초연금 연계 안내", url: "https://www.nps.or.kr" },
    ],
  },
  {
    category: "법령",
    items: [
      { label: "기초연금법 제5조(기초연금액 산정)", url: "https://www.law.go.kr/법령/기초연금법" },
      { label: "기초연금법 시행령 제5조", url: "https://www.law.go.kr/법령/기초연금법시행령" },
    ],
  },
];

const RELATED = [
  { slug: "기초연금-수령액-단독-부부-계산법", title: "기초연금 수령액과 계산법", description: "단독·부부 수령액 전체 계산을 정리했어요." },
  { slug: "기초연금-연계감액-계산-A급여액", title: "연계감액 A급여액 계산", description: "A급여액 기반 연계감액 상세 구조예요." },
  { slug: "기초연금-최소지급액-감액사유", title: "최소 지급액과 감액 사유", description: "감액돼도 최소 얼마를 받는지 정리했어요." },
];

export default function Page() {
  return (
    <ArticleLayout sidebar={<Sidebar heading="기초연금 가이드" items={기초연금_SIDEBAR} highlightSlugs={기초연금_HIGHLIGHT} currentSlug="기초연금-기준연금액-부가연금액-산정구조" />}>
      <nav style={{ fontSize: 13, color: "#6b7280", marginBottom: 8 }}>
        <Link href="/" style={{ color: "#6b7280" }}>홈</Link> &gt; <Link href="/w/기초연금" style={{ color: "#6b7280" }}>기초연금</Link> &gt; <span style={{ color: "#374151" }}>산정 구조</span>
      </nav>

      <h1 style={{ fontSize: 26, fontWeight: 800, color: "#111", lineHeight: 1.35, marginBottom: 4 }}>
        기준연금액이랑 부가연금액 차이?
      </h1>
      <p style={{ fontSize: 17, color: "#1D9E75", fontWeight: 600, marginBottom: 20 }}>
        기초연금 금액 산정 구조
      </p>

      <p style={body}>
        기초연금 안내문을 읽다 보면 "기준연금액", "부가연금액"이라는 용어가 나와서 헷갈리시죠. 둘 다 기초연금 금액을 정하는 데 쓰이는 개념인데, 국민연금 가입 여부에 따라 적용이 달라져요.
      </p>
      <p style={body}>
        쉽게 말하면, 국민연금을 안 받거나 적게 받는 분은 "기준연금액" 전액을 받고, 국민연금을 많이 받는 분은 줄어든 "부가연금액"을 받는 구조예요.
      </p>

      <ArticleAd position="intro" />
      <Divider />

      <H2>기준연금액, 기초연금의 기본 금액이에요</H2>
      <p style={body}>
        기준연금액은 기초연금의 최대 지급액이에요. 2026년 기준 월 349,360원이고, 매년 물가상승률을 반영해서 조금씩 올라가요.
      </p>

      <GreenBox>
        <strong>기준연금액과 부가연금액 한눈에</strong><br /><br />
        <strong>기준연금액</strong>: 기초연금 최대 지급액 (2026년 월 349,360원)<br />
        → 국민연금 미가입자, A급여액 524,040원 이하인 분에게 적용<br /><br />
        <strong>부가연금액</strong>: 기준연금액에서 국민연금 연계분을 뺀 금액<br />
        → A급여액이 524,040원을 초과하는 분에게 적용<br />
        → 최소 174,680원(기준연금액의 50%) 보장
      </GreenBox>

      <p style={body}>
        전체 수급자의 약 70%는 기준연금액 전액을 받아요. 국민연금을 아예 안 받거나, 받더라도 연계감액 기준에 미치지 않는 분이 대부분이기 때문이에요.
      </p>

      <Divider />

      <H2>산정 구조, 국민연금과 어떻게 연결될까?</H2>
      <p style={body}>
        기초연금액은 국민연금 A급여액(균등 부분)을 기준으로 산정돼요. A급여는 국민연금의 소득재분배 기능을 담당하는 부분인데, 가입 기간과 전체 가입자 평균소득을 기반으로 계산되죠.
      </p>

      <BorderBox>
        <strong>기초연금 산정 구조</strong><br /><br />
        <strong>A급여액 524,040원 이하 (기준연금액 150% 이하)</strong><br />
        → 기초연금 = 기준연금액(349,360원) 전액 지급<br /><br />
        <strong>A급여액 524,040원 초과</strong><br />
        → 기초연금 = 기준연금액 - (A급여액 반영분)<br />
        → 이 결과값이 "부가연금액"<br />
        → 최소 174,680원(기준연금액 50%) 보장<br /><br />
        A급여액 확인: 국민연금공단 1355, 또는 내연금 알아보기(nps.or.kr)
      </BorderBox>

      <p style={body}>
        A급여액은 국민연금 전체 수령액과 다른 개념이에요. 국민연금이 월 50만원이라도 A급여액은 그보다 적을 수 있어요. <Link href="/w/기초연금-연계감액-계산-A급여액" style={{ color: "#1D9E75", fontWeight: 600 }}>A급여액 계산 방법</Link>에서 더 자세히 풀었어요.
      </p>

      <CategoryButton label="기초연금 가이드" count={기초연금_SIDEBAR.length} href="/w/기초연금" />
      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      <H2>계산 예시, 실제 금액은 이렇게 나와요</H2>
      <p style={body}>
        국민연금 가입 이력에 따라 기초연금이 어떻게 달라지는지 예시로 정리해볼게요.
      </p>

      <GreenBox>
        <strong>기초연금 산정 예시</strong><br /><br />
        <strong>사례 1: 국민연금 미가입자</strong><br />
        A급여액: 0원<br />
        기초연금 = 기준연금액 349,360원 (전액)<br /><br />
        <strong>사례 2: 국민연금 월 30만원, A급여액 40만원</strong><br />
        A급여액 40만원 &lt; 524,040원<br />
        기초연금 = 기준연금액 349,360원 (전액)<br /><br />
        <strong>사례 3: 국민연금 월 80만원, A급여액 60만원</strong><br />
        A급여액 60만원 &gt; 524,040원 → 연계감액 적용<br />
        기초연금 = 349,360원 - (A급여 반영분) = 부가연금액<br />
        최소 174,680원 보장
      </GreenBox>

      <p style={body}>
        사례 3처럼 국민연금을 비교적 많이 받는 분만 부가연금액이 적용돼요. 국민연금 월 수령액이 40~50만원 수준이면 대부분 기준연금액 전액을 받을 수 있어요.
      </p>

      <Divider />

      <H2>부가연금액이 적용되면 억울할까?</H2>
      <p style={body}>
        국민연금을 오래 냈는데 기초연금이 줄어드니 억울하다는 목소리가 많아요. 실제로 국민연금을 전혀 안 낸 분이 기초연금 전액을 받고, 성실하게 낸 분은 감액되는 구조이니까요.
      </p>
      <p style={body}>
        이 문제 때문에 <Link href="/w/기초연금-연계감액-폐지논의-현재기준" style={{ color: "#1D9E75", fontWeight: 600 }}>연계감액 폐지 논의</Link>가 계속 나오고 있어요. 폐지되면 국민연금 수령액과 관계없이 기준연금액 전액을 받게 되죠.
      </p>
      <p style={body}>
        현재로서는 부가연금액이 적용되더라도 국민연금 + 기초연금 합산 수령액은 기초연금만 받는 분보다 항상 많아요. 국민연금을 낸 게 손해인 건 아니에요. 다만 기초연금에서 감액되는 부분이 심리적으로 불만을 일으키는 거예요.
      </p>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 기초연금법을 기준으로 작성했어요. A급여액과 기초연금 산정 내역은 국민연금공단(1355)에서 정확히 확인할 수 있어요." />
    </ArticleLayout>
  );
}
