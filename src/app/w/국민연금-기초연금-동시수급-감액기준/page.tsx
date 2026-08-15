"use client";
// Q1. 국민연금을 받고 있거나 받을 예정인데 기초연금도 받을 수 있는지, 감액되는지 궁금한 상황
// Q2. 동시 수급 가능 여부와 감액 기준을 이해하고, 본인이 감액 대상인지 판단한다
// Q2-1. 복지로 모의계산기 또는 주민센터 상담
// Q3. 동시 수급 가능(O), 감액 기준(국민연금 A급여액의 150%), 연계감액 계산, 감액 후 최소 금액
// Q4. GreenBox(동시 수급 결론) + BorderBox(감액 계산 예시) + FAQ

import Link from "next/link";
import {
  H2, GreenBox, BorderBox, Divider, body,
  FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 기초연금_SIDEBAR, 기초연금_HIGHLIGHT } from "@/data/기초연금-guide";

const FAQS = [
  {
    q: "국민연금을 30만원 받으면 기초연금이 깎이나요?",
    a: "국민연금 수령액 자체로 감액 여부가 결정되는 게 아니라, 국민연금의 A급여액(전체 가입자 평균소득 기반 산정)을 기준으로 해요. A급여액이 기준연금액(349,360원)의 150%인 약 52만4천원을 넘으면 감액이 시작돼요. 국민연금 30만원 정도면 대부분 감액 대상이 아니에요.",
  },
  {
    q: "연계감액이 뭔가요?",
    a: "국민연금의 A급여액(가입 기간 중 전체 가입자 평균소득 반영분)이 일정 기준을 넘으면 기초연금을 깎는 제도예요. 국민연금을 많이 받을수록 기초연금이 줄어드는 구조죠. 기초연금법 제5조에 근거해요.",
  },
  {
    q: "감액돼도 최소 얼마는 받나요?",
    a: "네, 기초연금에는 최소 지급액이 있어요. 감액 후에도 기준연금액의 50%(약 174,680원) 이하로는 내려가지 않아요. 아무리 국민연금을 많이 받아도 기초연금을 완전히 0원으로 깎지는 않죠.",
  },
  {
    q: "부부가 둘 다 국민연금과 기초연금을 받으면?",
    a: "부부 각각 국민연금 연계감액이 적용되고, 거기에 부부감액(20%)까지 추가돼요. 감액이 이중으로 적용될 수 있지만, 최소 지급액 이하로는 내려가지 않아요.",
  },
  {
    q: "국민연금을 일시금으로 받았는데 기초연금에 영향이 있나요?",
    a: "반환일시금으로 받은 경우에는 국민연금 수급자가 아니니까 연계감액 대상이 아니에요. 다만 일시금이 금융재산으로 잡혀서 소득인정액에 반영될 수 있으니 이건 별도로 계산해야 해요.",
  },
  {
    q: "국민연금 수령을 미루면(연기) 기초연금에 유리한가요?",
    a: "국민연금 수령 연기(연기연금)를 해도 A급여액은 바뀌지 않아요. A급여액은 가입 이력을 기반으로 산정하기 때문에, 연기한다고 기초연금 감액을 피할 수는 없어요.",
  },
];

const REFERENCES = [
  {
    category: "공식 자료",
    items: [
      { label: "보건복지부: 기초연금 감액 기준", url: "https://www.mohw.go.kr" },
      { label: "국민연금공단: 기초연금 연계 안내", url: "https://www.nps.or.kr" },
    ],
  },
  {
    category: "법령",
    items: [
      { label: "기초연금법 제5조 (기초연금액의 산정)", url: "https://www.law.go.kr/법령/기초연금법" },
      { label: "기초연금법 시행령 제4조", url: "https://www.law.go.kr/법령/기초연금법시행령" },
    ],
  },
];

const RELATED = [
  { slug: "기초연금-국민연금-차이비교-핵심정리", title: "기초연금과 국민연금 차이 비교", description: "두 제도의 핵심 차이를 정리했어요." },
  { slug: "기초연금-연계감액-계산-A급여액", title: "연계감액과 A급여액 계산법", description: "감액 계산이 어떻게 되는지 상세히 설명해요." },
  { slug: "기초연금-수령액-단독-부부-계산법", title: "기초연금 수령액 계산법", description: "실제로 얼마 받는지 계산하는 방법이에요." },
];

export default function Page() {
  return (
    <ArticleLayout sidebar={<Sidebar heading="기초연금 가이드" items={기초연금_SIDEBAR} highlightSlugs={기초연금_HIGHLIGHT} currentSlug="국민연금-기초연금-동시수급-감액기준" />}>
      <nav style={{ fontSize: 13, color: "#888", marginBottom: 12 }}>
        <Link href="/" style={{ color: "#888", textDecoration: "none" }}>홈</Link>
        {" > "}
        <Link href="/w/기초연금" style={{ color: "#888", textDecoration: "none" }}>기초연금</Link>
        {" > "}
        <span style={{ color: "#333" }}>동시 수급</span>
      </nav>

      <h1 style={{ fontSize: 26, fontWeight: 800, lineHeight: 1.45, marginBottom: 6 }}>
        국민연금이랑 기초연금 둘 다 받을 수 있을까?
      </h1>
      <p style={{ fontSize: 17, color: "#1D9E75", fontWeight: 600, marginBottom: 18 }}>
        동시 수급과 감액 기준
      </p>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        국민연금을 받고 있으면 기초연금은 못 받는 줄 아는 분이 많죠.
        결론부터 말하면 둘 다 받을 수 있어요.
        다만 국민연금 수령액에 따라 기초연금이 감액될 수 있고, 이걸 "연계감액"이라고 해요.
        어떤 경우에 감액되는지, 얼마나 깎이는지 정리했어요.
      </p>

      <ArticleAd position="intro" />
      <Divider />

      <H2>동시 수급, 가능해요</H2>
      <p style={body}>
        국민연금과 기초연금은 완전히 다른 제도예요.
        국민연금은 본인이 낸 보험료로 받는 거고, 기초연금은 국가 세금으로 65세 이상에게 주는 거죠.
        두 제도가 별개이기 때문에 동시에 받을 수 있어요.
      </p>
      <GreenBox>
        <strong>동시 수급 핵심 정리</strong><br />
        <br />
        국민연금 + 기초연금 동시 수급: 가능<br />
        단, 국민연금 A급여액이 기준연금액의 150%(약 52만4천원) 초과 시 감액<br />
        감액 후에도 최소 지급액(기준연금액의 50%, 약 174,680원) 보장<br />
        소득인정액이 선정기준액(단독 247만원) 이하여야 자격 유지
      </GreenBox>

      <H2>감액 기준, A급여액이 핵심</H2>
      <p style={body}>
        기초연금 감액은 국민연금 '수령액' 전체가 아니라 'A급여액'을 기준으로 해요.
        A급여액은 국민연금 중에서 "전체 가입자 평균소득"에 연동되는 부분만 따로 계산한 금액이에요.
        쉽게 말하면, 국민연금 수령액 중 일부(평균소득 반영분)만 감액 계산에 쓰이는 거죠.
      </p>
      <BorderBox>
        <strong>연계감액 계산 방법</strong><br />
        <br />
        <strong>A급여액이 기준연금액(349,360원)의 150% 이하</strong><br />
        → 감액 없음. 기초연금 전액 수령<br />
        <br />
        <strong>A급여액이 기준연금액의 150% 초과 ~ 200% 이하</strong><br />
        → 기준연금액에서 일부 감액<br />
        <br />
        <strong>A급여액이 기준연금액의 200% 초과</strong><br />
        → 최대 감액. 기준연금액의 50%(약 174,680원)까지 줄어들 수 있음<br />
        <br />
        본인의 A급여액은 국민연금공단(1355)에 전화하면 확인할 수 있어요.
      </BorderBox>
      <p style={body}>
        대부분의 국민연금 수급자는 A급여액이 기준 이하여서 감액 없이 기초연금을 받아요.
        <Link href="/w/기초연금-연계감액-계산-A급여액" style={{ color: "#1D9E75", textDecoration: "underline" }}>A급여액 계산 방법</Link>이 궁금하다면 별도 글에서 자세히 설명하고 있어요.
      </p>

      <CategoryButton label="기초연금 가이드" count={기초연금_SIDEBAR.length} href="/w/기초연금" />
      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />
      <Divider />

      <H2>감액돼도 최소 금액은 보장돼요</H2>
      <p style={body}>
        아무리 국민연금을 많이 받아도 기초연금이 0원이 되지는 않아요.
        기초연금법에서 최소 지급액을 보장하고 있거든요.
        2026년 기준으로 기준연금액의 50%인 약 174,680원이 최소 금액이에요.
      </p>
      <p style={body}>
        다만 여기에 부부감액(20%)이 추가로 적용될 수 있어요.
        <Link href="/w/기초연금-부부감액-20-기준-축소계획" style={{ color: "#1D9E75", textDecoration: "underline" }}>부부감액</Link>까지 적용되면 최소 금액이 더 낮아질 수 있죠.
        그래도 완전히 0원이 되는 경우는 없어요.
      </p>

      <H2>내가 감액 대상인지 확인하는 법</H2>
      <p style={body}>
        가장 빠른 방법은 국민연금공단(1355)에 전화해서 본인의 A급여액을 물어보는 거예요.
        A급여액을 알면 감액 여부를 바로 판단할 수 있어요.
      </p>
      <p style={body}>
        국민연금 월 수령액이 50만원 이하라면 대부분 감액 없이 기초연금을 받을 수 있어요.
        국민연금이 100만원 이상이면 감액 가능성이 높으니 꼭 확인해보세요.
        정확한 기초연금 금액은 복지로(bokjiro.go.kr) 모의계산기를 이용하면 나와요.
      </p>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        동시 수급과 감액 관련 자주 나오는 질문이에요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 기초연금법 기준으로 작성됐어요. A급여액과 감액 계산은 개인별로 다르니 국민연금공단(1355) 또는 주민센터에서 정확하게 확인하세요." />
    </ArticleLayout>
  );
}
