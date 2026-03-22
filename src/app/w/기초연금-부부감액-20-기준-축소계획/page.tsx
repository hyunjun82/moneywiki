"use client";

// Q1. 부부가 함께 기초연금을 받고 있는데, 왜 각각 20%씩 깎이는지 이유가 궁금하고 억울한 상황
// Q2. 부부감액이 적용되는 정확한 기준과 금액을 파악하고, 축소·폐지 논의 상황을 이해하는 것
// Q3. (1) 부부감액 20%의 법적 근거와 계산 방식 (2) 감액 후 실수령액 (3) 축소·폐지 논의 현황
// Q4. GreenBox(감액 후 금액 비교) + BorderBox(계산 방식) + FAQ

import Link from "next/link";
import {
  H2, GreenBox, BorderBox, Divider, body,
  FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 기초연금_SIDEBAR, 기초연금_HIGHLIGHT } from "@/data/기초연금-guide";

const FAQS = [
  {
    q: "부부 중 한 명만 기초연금을 받으면 감액되나요?",
    a: "한 명만 받으면 감액 없이 기준연금액 전액(최대 349,360원)을 받아요. 부부감액은 부부 모두 기초연금을 받을 때만 적용돼요.",
  },
  {
    q: "부부감액과 연계감액이 동시에 적용되나요?",
    a: "네, 동시에 적용될 수 있어요. 국민연금 수령액이 많으면 연계감액이 먼저 적용되고, 부부 모두 수급자이면 거기서 20%를 추가로 감액해요.",
  },
  {
    q: "부부감액 20%는 언제부터 시행됐나요?",
    a: "2014년 기초연금법 시행 때부터 적용됐어요. 기초연금법 제8조에 부부 모두 수급자인 경우 각각의 기초연금액에서 20%를 감액한다고 명시돼 있어요.",
  },
  {
    q: "부부감액을 피하려고 이혼하면 되나요?",
    a: "법적으로 이혼하면 부부감액은 적용되지 않아요. 하지만 위장이혼은 부정수급에 해당할 수 있고, 적발되면 환수 및 제재를 받을 수 있어요. 실제 생활관계도 확인 대상이에요.",
  },
  {
    q: "부부감액 폐지 논의가 국회에서 진행 중인가요?",
    a: "22대 국회에서 부부감액 폐지·축소 법안이 여러 건 발의된 상태예요. 다만 재정 부담 문제로 아직 통과되지 않았고, 단계적 축소(20% → 10% → 폐지)가 유력한 방향이에요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "기초연금법 제8조(기초연금액의 감액)", url: "https://www.law.go.kr/법령/기초연금법" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "보건복지부: 2026년 기초연금 안내", url: "https://www.mohw.go.kr" },
      { label: "복지로: 기초연금 신청", url: "https://www.bokjiro.go.kr" },
    ],
  },
];

const RELATED = [
  { slug: "기초연금-연계감액-계산-A급여액", title: "기초연금 연계감액 계산과 A급여액", description: "국민연금 때문에 기초연금이 줄어드는 연계감액 구조예요." },
  { slug: "기초연금-수령액-단독-부부-계산법", title: "기초연금 수령액 계산법", description: "단독·부부가구 수령액 계산 방법이에요." },
  { slug: "기초연금-소득역전방지-감액기준", title: "소득역전 방지 감액 기준", description: "기초연금 때문에 소득이 역전되는 경우 감액 기준이에요." },
];

export default function Page() {
  return (
    <ArticleLayout sidebar={<Sidebar heading="기초연금 가이드" items={기초연금_SIDEBAR} highlightSlugs={기초연금_HIGHLIGHT} currentSlug="기초연금-부부감액-20-기준-축소계획" />}>
      <nav style={{ fontSize: 13, color: "#6b7280", marginBottom: 8 }}>
        <Link href="/" style={{ color: "#6b7280" }}>홈</Link> &gt; <Link href="/w/기초연금" style={{ color: "#6b7280" }}>기초연금</Link> &gt; <span style={{ color: "#374151" }}>부부감액</span>
      </nav>

      <h1 style={{ fontSize: 26, fontWeight: 800, color: "#111", lineHeight: 1.35, marginBottom: 4 }}>
        기초연금 부부 감액 20%, 왜 깎일까?
      </h1>
      <p style={{ fontSize: 17, color: "#1D9E75", fontWeight: 600, marginBottom: 20 }}>
        감액 기준과 축소 계획
      </p>

      <p style={body}>
        부부가 함께 기초연금을 받으면 각각 20%씩 깎여요. 단독으로 받으면 349,360원인데, 부부 모두 받으면 1인당 279,488원으로 줄어들죠. "같이 받으면 왜 손해냐"는 불만이 많고, 국회에서도 폐지·축소 논의가 계속되고 있어요.
      </p>

      <ArticleAd position="intro" />
      <Divider />

      <H2>부부감액 20%, 얼마나 깎이나</H2>
      <p style={body}>
        부부가 모두 기초연금 수급자이면 각각의 기초연금액에서 20%를 빼요. <Link href="https://www.law.go.kr/법령/기초연금법" style={{ color: "#1D9E75" }}>기초연금법 제8조</Link>에 명시된 규정이에요.
      </p>

      <GreenBox>
        <strong>2026년 부부감액 계산</strong><br />
        기준연금액: 349,360원<br />
        부부감액: 349,360원 x 20% = 69,872원 감액<br />
        부부 1인당 수령액: 279,488원<br />
        부부 합산 수령액: 558,976원<br /><br />
        단독가구 수령액: 349,360원<br />
        부부가구 합산 차이: 349,360원 x 2 = 698,720원 → 558,976원 (139,744원 차이)
      </GreenBox>

      <p style={body}>
        단독가구 2명이 각각 받으면 합계 698,720원인데, 부부가구로 합산되면 558,976원이에요. 한 달에 약 14만원 차이가 나죠. 1년이면 약 168만원이에요.
      </p>

      <H2>왜 부부는 감액하는 걸까</H2>
      <p style={body}>
        정부가 부부감액을 적용하는 이유는 "생활비 절감 효과" 때문이에요. 혼자 사는 것보다 둘이 살면 주거비, 식비 등이 줄어든다는 논리죠. 국민연금에서도 유족연금 등에서 비슷한 감액 구조가 적용돼요.
      </p>
      <p style={body}>
        하지만 현실에서는 부부 모두 고령이면 의료비가 2배로 들고, 실제 생활비 절감 폭이 크지 않다는 반론이 많아요. 특히 저소득 노인 부부일수록 감액의 체감이 크죠.
      </p>
      <p style={body}>
        국제적으로 보면 OECD 국가 중 기초연금(공적부조)에서 부부감액을 적용하는 나라가 있지만, 감액률은 나라마다 달라요. 한국의 20%는 상대적으로 높은 편이에요.
      </p>

      <CategoryButton label="기초연금 가이드" count={기초연금_SIDEBAR.length} href="/w/기초연금" />
      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      <H2>축소·폐지 논의는 어디까지 왔나</H2>
      <p style={body}>
        22대 국회에서 부부감액 폐지·축소 관련 법안이 여러 건 발의됐어요. 주요 방향은 두 가지예요.
      </p>

      <BorderBox>
        <strong>국회 논의 방향</strong><br />
        1. 즉시 폐지안: 부부감액 20%를 바로 없애는 방안. 연간 추가 재정 약 7,000억원 예상<br />
        2. 단계적 축소안: 20% → 10% → 폐지로 단계적으로 줄이는 방안. 재정 부담 분산 목적<br /><br />
        현재 상태: 상임위 계류 중 (2026년 3월 기준)
      </BorderBox>

      <p style={body}>
        정부는 재정 부담을 이유로 즉시 폐지에는 신중한 입장이에요. 기초연금 수급자가 매년 늘어나고 있어서 추가 재정 확보가 쉽지 않다는 거죠. 하지만 여야 모두 "부부감액 축소"에는 공감하고 있어서 단계적 축소가 유력해요.
      </p>

      <H2>부부감액 외에 다른 감액도 겹칠 수 있어요</H2>
      <p style={body}>
        기초연금 감액은 부부감액만 있는 게 아니에요. <Link href="/w/기초연금-연계감액-계산-A급여액" style={{ color: "#1D9E75" }}>국민연금 연계감액</Link>과 <Link href="/w/기초연금-소득역전방지-감액기준" style={{ color: "#1D9E75" }}>소득역전 방지 감액</Link>이 동시에 적용될 수 있어요.
      </p>
      <p style={body}>
        예를 들어 국민연금을 월 80만원 받는 부부의 경우, 연계감액으로 기초연금이 줄어들고 거기서 부부감액 20%가 또 빠져요. 최악의 경우 기준연금액의 절반도 못 받을 수 있죠.
      </p>
      <p style={body}>
        다만 어떤 감액이 적용되든 최소 지급액(기준연금액의 10%, 약 34,936원)은 보장돼요. 아무리 감액이 겹쳐도 0원이 되지는 않아요.
      </p>

      <Divider />

      <H2>자주 묻는 질문</H2>
      <FAQ items={FAQS} />

      <Divider />
      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 기초연금법과 보건복지부 자료를 바탕으로 작성됐어요. 부부감액 축소·폐지 관련 법안은 국회 심의 중이라 변경될 수 있어요." />
    </ArticleLayout>
  );
}
