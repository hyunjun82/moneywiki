"use client";

// Q1. 퇴직연금 수령 나이에 대해 알아보려는 상황
// Q2. 관련 정보를 확인하고 실행한다
// Q3. 퇴직연금은 55세부터 연금으로 받을 수 있어요., 퇴직 시점은 나이와 상관없이 수령 가능해요.
// Q4. GreenBox + BorderBox + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  FAQ, SourceNote, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const FAQS = [
  { q: "퇴직연금 몇 살부터 받아요?", a: "연금으로 받으려면 55세 이상이어야 해요. 퇴직 시점에 받는 건 나이 상관없어요." },
  { q: "55세 전에 퇴직하면 어떻게 해요?", a: "퇴직금이 IRP로 이전돼요. 55세까지 보관 후 연금으로 받거나, 법정 사유 시 중도인출해요." },
  { q: "연금 수령 기간은 얼마예요?", a: "10년 이상 나눠 받아야 연금소득세 혜택을 받아요. 기간은 본인이 설정해요." },
  { q: "60세에 퇴직해도 55세 조건 적용되나요?", a: "네. 55세 이상이면 바로 연금 수령 가능해요. 55세는 최소 나이 조건이에요." },
  { q: "조기수령할 수 있어요?", a: "55세 미만은 연금수령이 안 돼요. 법정 사유가 있으면 중도인출은 가능해요." },
];

const SOURCES = [
  { name: "근로자퇴직급여보장법", href: "https://www.law.go.kr/법령/근로자퇴직급여보장법" },
  { name: "고용노동부 퇴직연금제도", href: "https://www.moel.go.kr/policy/policyinfo/retire/list.do" },
];

const RELATED = [
  { slug: "퇴직연금-수령방법", title: "퇴직연금 수령방법", description: "관련 내용 정리." },
  { slug: "퇴직연금-수령-세금", title: "퇴직연금 수령 세금", description: "관련 내용 정리." },
  { slug: "퇴직연금", title: "퇴직연금", description: "관련 내용 정리." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>퇴직연금</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        퇴직연금 수령 나이
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        퇴직연금은 55세부터 연금으로 받을 수 있어요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>수령 나이 기준이에요</H2>
      <p style={body}>퇴직연금 수령 나이는 상황에 따라 달라요.</p>
      <GreenBox>
        퇴직연금은 55세부터 연금으로 받을 수 있어요.{"\n"}
        퇴직 시점은 나이와 상관없이 수령 가능해요.{"\n"}
        55세 미만 퇴직 시 IRP로 이전 후 55세에 연금수령해요.
      </GreenBox>
      <p style={body}>퇴직 시점: 나이 상관없이 퇴직하면 퇴직금을 받을 수 있어요. 단, 55세 미만이면 IRP로 이전해야 해요.</p>

      <CategoryButton label="퇴직연금" count={10} href="/category/%ED%87%B4%EC%A7%81%EC%97%B0%EA%B8%88" />
      <RelatedArticles items={RELATED} />

      <Divider />
      <H2>55세 미만 퇴직 시예요</H2>
      <p style={body}>55세 전에 퇴직하면 이렇게 돼요.</p>
      <BorderBox>
        <strong>55세 미만 퇴직 시예요</strong><br />
        55세 전에 퇴직하면 이렇게 돼요.<br />
        퇴직금이 IRP 계좌로 이전돼요. 바로 현금으로 못 받아요. IRP에 보관해두고 55세가 되면 연금으로 받아요. 급하면 법정 사유(주택구입, 의료비 등)로 중도인출할 수 있어요.
      </BorderBox>
      <p style={body}>퇴직금이 IRP 계좌로 이전돼요. 바로 현금으로 못 받아요. IRP에 보관해두고 55세가 되면 연금으로 받아요. 급하면 법정 사유(주택구입, 의료비 등)로 중도인출할 수 있어요.</p>

      <Divider />
      <H2>55세 이상 퇴직 시예요</H2>
      <p style={body}>55세 이상이면 선택지가 많아요.</p>
      <p style={body}>일시금으로 한 번에 받을 수 있어요. 퇴직소득세가 원천징수돼요. 연금으로 나눠 받을 수 있어요. 연금소득세가 적용돼서 세금이 적어요.</p>
      <p style={body}>세금 아끼려면 연금으로 받는 게 유리해요.</p>

      <Divider />
      <H2>퇴직연금 관련 자주 묻는 질문</H2>
      <p style={{ ...body, marginBottom: 14 }}>자주 궁금해하는 내용을 모았어요.</p>
      <FAQ items={FAQS} />

      <Divider />

      <SourceNote sources={SOURCES} />
      <Disclaimer text="이 글은 2026년 기준 관련 법령과 공식 자료를 바탕으로 작성했어요. 개별 상황에 따라 달라질 수 있으니 전문가 상담을 권해요." />
    </ArticleLayout>
  );
}
