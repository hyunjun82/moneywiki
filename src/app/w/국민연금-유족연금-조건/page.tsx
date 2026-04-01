"use client";
import { BorderBox } from "@/components/article-ui/BorderBox";

// Q1. 국민연금 유족연금에 대해 알아보려는 상황
// Q2. 관련 정보를 확인하고 실행한다
// Q3. 국민연금 가입자가 사망하면 유족이 연금을 받을 수 있어요., 배우자, 자녀, 부모 순으로 받을 수 있어요.
// Q4. GreenBox + Steps + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  FAQ, SourceNote, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const FAQS = [
  { q: "유족연금 누가 받을 수 있나요?", a: "배우자, 자녀, 부모, 손자녀, 조부모 순으로 받을 수 있어요." },
  { q: "유족연금 얼마나 받나요?", a: "가입 기간에 따라 기본연금의 40~60%를 받아요." },
  { q: "배우자가 재혼하면 유족연금 끊기나요?", a: "네. 재혼하면 유족연금 수급권이 없어져요." },
  { q: "유족연금 언제까지 받나요?", a: "배우자는 재혼 전까지, 자녀는 만 19세까지 받아요." },
  { q: "유족연금 신청 어디서 해요?", a: "국민연금공단 지사에 방문하거나 온라인으로 신청해요." },
];

const SOURCES = [
  { name: "국민연금법", href: "https://www.law.go.kr/법령/국민연금법" },
  { name: "국민연금공단", href: "https://www.nps.or.kr" },
];

const RELATED = [
  { slug: "국민연금-조기수령-조건", title: "국민연금 조기수령 조건", description: "관련 내용 정리." },
  { slug: "국민연금-연기연금", title: "국민연금 연기연금", description: "관련 내용 정리." },
  { slug: "국민연금-분할연금", title: "국민연금 분할연금", description: "관련 내용 정리." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>세금</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        국민연금 유족연금 조건
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        국민연금 가입자가 사망하면 유족이 연금을 받을 수 있어요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>유족연금 받을 수 있는 조건</H2>
      <p style={body}>가입자 또는 수급자가 사망하면 유족이 받아요.</p>
      <GreenBox>
        국민연금 가입자가 사망하면 유족이 연금을 받을 수 있어요.{"\n"}
        배우자, 자녀, 부모 순으로 받을 수 있어요.{"\n"}
        기본연금의 40~60%를 받아요.
      </GreenBox>
      <p style={body}>유족연금을 받으려면 사망한 분이 다음 중 하나에 해당해야 해요:</p>

      <CategoryButton label="세금" count={10} href="/category/%EC%84%B8%EA%B8%88" />
      <RelatedArticles items={RELATED} />

      <Divider />
      <H2>유족연금 받을 수 있는 사람</H2>
      <p style={body}>배우자, 자녀, 부모 순서로 받아요.</p>
      <BorderBox>
        <strong>유족연금 받을 수 있는 사람</strong><br />
        배우자, 자녀, 부모 순서로 받아요.<br />
        유족연금은 누구나 받는 게 아니에요. 사망한 분과 생계를 같이 했던 가까운 가족이 받아요.
      </BorderBox>
      <p style={body}>유족연금은 누구나 받는 게 아니에요. 사망한 분과 생계를 같이 했던 가까운 가족이 받아요.</p>

      <Divider />
      <H2>유족연금 금액</H2>
      <p style={body}>가입 기간에 따라 기본연금의 40~60%를 받아요.</p>
      <p style={body}>유족연금은 사망한 분이 받았을(또는 받았을 것으로 계산되는) 기본연금의 일정 비율이에요.</p>
      <p style={body}>- 10년 미만: 기본연금의 40%
- 10년 이상 20년 미만: 기본연금의 50%
- 20년 이상: 기본연금의 60%</p>

      <Divider />
      <H2>국민연금 관련 자주 묻는 질문</H2>
      <p style={{ ...body, marginBottom: 14 }}>자주 궁금해하는 내용을 모았어요.</p>
      <FAQ items={FAQS} />

      <Divider />

      <SourceNote sources={SOURCES} />
      <Disclaimer text="이 글은 2026년 기준 관련 법령과 공식 자료를 바탕으로 작성했어요. 개별 상황에 따라 달라질 수 있으니 전문가 상담을 권해요." />
    </ArticleLayout>
  );
}
