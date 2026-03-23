"use client";

// Q1: 부부가 함께 기초연금을 신청하려는데 소득을 합산하는지, 기준은 얼마인지 궁금한 어르신
// Q2: 부부가구 소득인정액 합산 구조를 이해하고, 둘 다 받을 수 있는지 판단
// Q3: 부부가구 선정기준(395.2만), 합산 방식, 부부감액 20%, 단독 vs 부부 비교
// Q4: GreenBox(핵심) + BorderBox(비교) + EligibilityChecker + FAQ

import Link from "next/link";
import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  EligibilityChecker, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 기초연금_SIDEBAR, 기초연금_HIGHLIGHT } from "@/data/기초연금-guide";

const CHECK_ITEMS = [
  { id: "c1", label: "부부 모두 만 65세 이상이에요" },
  { id: "c2", label: "부부 합산 소득인정액이 395.2만 원 이하예요" },
  { id: "c3", label: "직역연금(공무원연금 등) 수급자가 아니에요" },
  { id: "c4", label: "대한민국 국적이고 국내 거주 중이에요" },
];

const FAQS = [
  {
    q: "부부가 둘 다 기초연금을 받으면 각각 35만 원씩 70만 원인가요?",
    a: "아니에요. 부부 모두 수급하면 각각 20% 감액돼요. 2025년 기준으로 1인당 349,360원의 80%인 약 279,488원을 받게 되고, 부부 합산 약 558,976원이죠.",
  },
  {
    q: "배우자가 65세 미만이면 어떻게 되나요?",
    a: "65세 미만인 배우자는 기초연금 대상이 아니에요. 이 경우 65세 이상인 본인만 단독가구 기준(247만 원)이 아닌 부부가구 기준(395.2만 원)이 적용되죠. 배우자 소득·재산도 합산돼요.",
  },
  {
    q: "한 명만 신청해서 단독가구 기준을 받을 수 있나요?",
    a: "배우자가 있으면 한 명만 신청해도 부부가구로 분류돼요. 단독가구 기준을 적용받으려면 법률적으로 혼인 관계가 해소되어야 하죠.",
  },
  {
    q: "부부 중 한 명만 기초연금 대상이 되면?",
    a: "부부 합산 소득인정액이 395.2만 원 이하라도, 직역연금 수급 등 개인 사유로 한 명만 대상이 될 수 있어요. 이 경우 대상이 되는 한 명만 기초연금을 받고, 부부감액은 적용되지 않죠.",
  },
  {
    q: "사실혼 관계도 부부가구로 보나요?",
    a: "사실혼도 부부가구로 볼 수 있어요. 주민등록 주소지, 생활 실태 등을 조사해서 사실혼 관계로 판단되면 부부가구 기준이 적용되죠.",
  },
  {
    q: "부부감액 20%가 없어지는 건 언제인가요?",
    a: "부부 중 한 명이 수급에서 탈락하거나 사망하면 나머지 한 명은 단독가구로 전환돼요. 이때 부부감액이 해제되고 기준연금액 전액을 받게 되죠.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "기초연금법 제3조: 수급권자 범위", url: "https://www.law.go.kr/법령/기초연금법" },
      { label: "기초연금법 제8조: 기초연금액 산정", url: "https://www.law.go.kr/법령/기초연금법" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "보건복지부: 기초연금 제도 안내", url: "https://www.mohw.go.kr" },
      { label: "복지로: 기초연금 모의계산", url: "https://www.bokjiro.go.kr" },
    ],
  },
];

const RELATED = [
  {
    slug: "기초연금-부부감액-20-기준-축소계획",
    title: "부부감액 20% 기준",
    description: "부부감액이 왜 20%이고, 축소 논의는 어디까지 왔는지 정리했어요.",
  },
  {
    slug: "기초연금-소득인정액-계산-공제항목",
    title: "소득인정액 계산 공제항목",
    description: "소득인정액이 어떻게 계산되는지 공제 항목까지 풀어놨어요.",
  },
  {
    slug: "기초연금-수급자격-선정기준액-소득조건",
    title: "기초연금 수급자격 선정기준액",
    description: "단독/부부 선정기준액과 소득인정액 기준을 자세히 정리했어요.",
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
          currentSlug="기초연금-부부가구-소득인정액-기준"
        />
      }
    >
      <nav style={{ fontSize: 13, color: "#6b7280", marginBottom: 8 }}>
        <Link href="/" style={{ color: "#6b7280" }}>홈</Link> &gt;{" "}
        <Link href="/w/기초연금" style={{ color: "#6b7280" }}>기초연금</Link> &gt;{" "}
        <span style={{ color: "#374151" }}>부부가구 소득인정액</span>
      </nav>

      <h1 style={{ fontSize: 26, fontWeight: 800, color: "#111", lineHeight: 1.35, marginBottom: 4 }}>
        기초연금 배우자 소득도 합산될까?
      </h1>
      <p style={{ fontSize: 17, color: "#1D9E75", fontWeight: 600, marginBottom: 20 }}>
        부부가구 소득인정액 합산 기준과 감액 구조
      </p>

      <p style={body}>
        &quot;나는 소득이 적은데, 배우자가 연금을 받으면 내 기초연금에도 영향이 있나?&quot; 부부가 함께 기초연금을 신청할 때 가장 많이 하는 질문이죠.
      </p>
      <p style={body}>
        답부터 말하면, <strong>배우자 소득은 합산돼요.</strong>{" "}
        <a href="https://www.law.go.kr/법령/기초연금법" style={{ color: "#1D9E75", textDecoration: "underline" }}>기초연금법 제3조</a>에 따라
        배우자가 있으면 부부가구로 분류되고, 부부의 소득·재산을 합산해서 소득인정액을 산정하죠.
        2025년 부부가구 선정기준은 395.2만 원이에요.
      </p>
      <p style={body}>
        부부 모두 수급 대상이 되면 각각 기초연금을 받지만, 1인당 20% 부부감액이 적용돼요. 단독가구보다 총수령액은 많지만 1인당 금액은 줄어드는 구조이죠.
      </p>

      <ArticleAd position="intro" />
      <Divider />

      <H2>부부가구 소득인정액은 어떻게 합산되나요?</H2>
      <SectionBadge>합산 구조</SectionBadge>

      <p style={body}>
        부부가구 소득인정액은 부부 각각의 소득평가액과 재산의 소득환산액을 모두 더한 금액이에요.
        남편의 근로소득 + 아내의 연금소득 + 부부 공동 부동산 + 각자의 금융재산 등이 전부 합산되죠.
      </p>
      <p style={body}>
        단독가구 선정기준은 247만 원인데, 부부가구는 395.2만 원이에요.
        단순히 247만 x 2 = 494만 원이 아니라, 그보다 낮은 395.2만 원이 기준이죠.
        이건 부부가 함께 생활하면 생활비가 1인 가구의 2배까지는 안 든다는 규모의 경제를 반영한 거예요.
      </p>
      <p style={body}>
        그래서 부부 각각은 단독가구 기준으로 통과하더라도, 합산하면 부부가구 기준(395.2만 원)을 넘길 수 있어요.
        예를 들어 남편 소득인정액 200만 원 + 아내 소득인정액 200만 원 = 합산 400만 원이면, 부부가구 기준(395.2만 원)을 초과하는 거죠.
      </p>

      <GreenBox>
        부부가구 = 부부 소득·재산 합산으로 소득인정액 산정<br />
        2025년 선정기준: 단독 247만 원 / 부부 395.2만 원<br />
        각각 기준 이하라도 합산 시 기준 초과 가능
      </GreenBox>

      <Divider />

      <H2>부부감액 20%는 어떻게 적용되나요?</H2>
      <SectionBadge>감액 구조</SectionBadge>

      <p style={body}>
        부부 모두 기초연금 수급 대상이 되면, 각각 기준연금액의 20%를 감액해요.{" "}
        <a href="https://www.law.go.kr/법령/기초연금법" style={{ color: "#1D9E75", textDecoration: "underline" }}>기초연금법 제8조</a>에
        근거한 규정이죠.
      </p>
      <p style={body}>
        2025년 기준연금액 349,360원의 80%는 약 279,488원이에요.
        부부가 둘 다 받으면 279,488원 x 2 = 약 558,976원이 부부 합산 수령액이죠.
        단독가구 1인(349,360원)의 약 1.6배 수준이에요.
      </p>
      <p style={body}>
        부부 중 한 명만 수급하면{" "}
        <Link href="/w/기초연금-부부감액-20-기준-축소계획" style={{ color: "#1D9E75", textDecoration: "underline" }}>부부감액</Link>이 적용되지 않아요.
        한 명이 기준연금액 전액(349,360원)을 받고, 나머지 한 명은 수급하지 않는 거죠.
      </p>

      <BorderBox>
        <strong>단독가구</strong>: 349,360원 (감액 없음)<br />
        <strong>부부 모두 수급</strong>: 각 279,488원 (20% 감액), 합산 약 558,976원<br />
        <strong>부부 중 1명만 수급</strong>: 349,360원 (감액 없음)
      </BorderBox>

      <CategoryButton label="기초연금 정보" count={기초연금_SIDEBAR.length} href="/category/기초연금" />
      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      <H2>우리 부부, 기초연금 대상이 되나요?</H2>
      <SectionBadge>자격 확인</SectionBadge>

      <p style={body}>
        아래 체크리스트로 기본 자격을 확인해 보세요. 모두 해당되면 수급 가능성이 높지만, 정확한 소득인정액은 국민연금공단(1355)에서 모의계산을 해봐야 알 수 있어요.
      </p>
      <p style={body}>
        배우자가 공무원연금, 군인연금, 사학연금 등 직역연금을 받고 있으면 원칙적으로 기초연금 대상에서 제외돼요. 다만 직역연금 수급액이 기준 이하이거나 유족연금인 경우 등 예외가 있으니 개별 확인이 필요하죠.
      </p>
      <p style={body}>
        배우자가 아직 65세 미만이더라도 부부가구로 분류돼요. 배우자 소득·재산이 합산되고, 부부가구 선정기준(395.2만 원)이 적용되죠. 65세 미만 배우자는 기초연금을 받지 못하지만 본인의 기초연금 심사에는 영향을 줘요.
      </p>

      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="부부가구 기초연금 수급 가능성이 높아요. 정확한 소득인정액은 국민연금공단(1355)에서 확인하세요."
        partialMatchText="일부 조건이 충족되지 않았어요. 체크 안 된 항목을 확인해 보세요."
      />

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        부부가구 기초연금에 대해 자주 나오는 질문이에요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2025년 기준 기초연금법을 바탕으로 작성됐어요. 부부가구 소득인정액은 재산 상황에 따라 달라지니, 국민연금공단(1355) 모의계산을 받아보세요." />
    </ArticleLayout>
  );
}
