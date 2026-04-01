"use client";
import { Divider } from "@/components/article-ui/Divider";
import { BorderBox } from "@/components/article-ui/BorderBox";

// Q1. 기초연금을 받고 있는데 주변보다 적게 받아서 왜 감액됐는지, 최소 얼마는 받을 수 있는지 알고 싶은 상황
// Q2. 감액 사유를 파악하고, 최소 보장 금액이 얼마인지 확인해서 이의신청 필요 여부를 판단할 수 있어야 함
// Q3. ① 감액 사유 3가지(부부·연계·소득역전) ② 최소 지급액 174,680원(기준연금액 50%) ③ 소득역전방지는 최소 보장 미적용 ④ 감액 확인 방법
// Q4. GreenBox(감액 사유 + 최소 지급액 요약) + BorderBox(사유별 감액 계산) + FAQ

import Link from "next/link";
import {
  H2, GreenBox, BorderBox, Divider, body,
  FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 기초연금_SIDEBAR, 기초연금_HIGHLIGHT } from "@/data/기초연금-guide";

const FAQS = [
  {
    q: "기초연금이 10만원대로 나오는데 정상인가요?",
    a: "국민연금 연계감액이 적용되면 최소 174,680원까지 줄어들 수 있어요. 소득역전방지 감액이 적용된 경우에는 이보다 더 적을 수 있어요. 통지서에 감액 사유가 적혀 있으니 확인해보세요.",
  },
  {
    q: "감액 사유를 어디서 확인하나요?",
    a: "기초연금 수급 결정 통지서에 산정 내역이 적혀 있어요. 주민센터에 방문하면 상세 내역을 확인할 수 있고, 복지로에서도 조회가 가능해요.",
  },
  {
    q: "국민연금을 많이 내서 감액되는 게 억울한데 방법이 없나요?",
    a: "현행법에서는 연계감액을 피할 수 있는 방법이 없어요. 다만 연계감액 폐지 논의가 국회에서 진행 중이에요. 폐지되면 국민연금 수령액과 관계없이 기초연금 전액을 받을 수 있게 돼요.",
  },
  {
    q: "최소 지급액 174,680원은 언제 바뀌나요?",
    a: "기준연금액이 매년 물가상승률 반영으로 오르면 최소 지급액도 함께 올라요. 최소 지급액은 항상 기준연금액의 50%로 계산돼요.",
  },
  {
    q: "부부감액과 연계감액이 동시에 적용될 수 있나요?",
    a: "될 수 있어요. 연계감액이 먼저 적용되고, 그 결과에 부부감액 20%가 추가로 적용돼요. 두 가지가 겹치면 수령액이 꽤 줄어들 수 있지만, 최소 174,680원은 보장돼요.",
  },
];

const REFERENCES = [
  {
    category: "공식 자료",
    items: [
      { label: "보건복지부: 기초연금 감액 기준", url: "https://www.mohw.go.kr" },
      { label: "국민연금공단: 기초연금 연계감액", url: "https://www.nps.or.kr" },
    ],
  },
  {
    category: "법령",
    items: [
      { label: "기초연금법 제5조(기초연금액 산정)", url: "https://www.law.go.kr/법령/기초연금법" },
      { label: "기초연금법 제8조(감액)", url: "https://www.law.go.kr/법령/기초연금법" },
    ],
  },
];

const RELATED = [
  { slug: "기초연금-수령액-단독-부부-계산법", title: "기초연금 수령액과 계산법", description: "단독·부부 전체 수령액을 정리했어요." },
  { slug: "기초연금-연계감액-계산-A급여액", title: "연계감액 A급여액 계산", description: "국민연금 연계감액 상세 구조예요." },
  { slug: "기초연금-소득역전방지-감액기준", title: "소득역전방지 감액 기준", description: "소득역전방지 감액이 적용되는 기준이에요." },
];

export default function Page() {
  return (
    <ArticleLayout sidebar={<Sidebar heading="기초연금 가이드" items={기초연금_SIDEBAR} highlightSlugs={기초연금_HIGHLIGHT} currentSlug="기초연금-최소지급액-감액사유" />}>
      <nav style={{ fontSize: 13, color: "#6b7280", marginBottom: 8 }}>
        <Link href="/" style={{ color: "#6b7280" }}>홈</Link> &gt; <Link href="/w/기초연금" style={{ color: "#6b7280" }}>기초연금</Link> &gt; <span style={{ color: "#374151" }}>최소 지급액</span>
      </nav>

      <h1 style={{ fontSize: 26, fontWeight: 800, color: "#111", lineHeight: 1.35, marginBottom: 4 }}>
        기초연금 34만원 다 못 받는 경우?
      </h1>
      <p style={{ fontSize: 17, color: "#1D9E75", fontWeight: 600, marginBottom: 20 }}>
        최소 지급액과 감액 사유
      </p>

      <p style={body}>
        주변에서 기초연금 34만원 받는다고 하는데, 본인은 20만원대밖에 안 나와서 의아하시죠. 기초연금은 모든 수급자가 같은 금액을 받는 게 아니에요. 감액 사유에 따라 금액이 달라져요.
      </p>
      <p style={body}>
        감액 사유는 크게 세 가지예요. 부부감액, 국민연금 연계감액, 소득역전방지 감액이죠. 각 감액이 왜 적용되는지, 최소 얼마까지는 보장되는지 정리해볼게요.
      </p>

      <ArticleAd position="intro" />
      <Divider />

      <H2>감액 사유, 왜 34만원을 다 못 받을까?</H2>
      <p style={body}>
        2026년 기준연금액은 월 349,360원이에요. 이 금액을 전액 받으려면 세 가지 감액 요소에 하나도 해당하지 않아야 해요.
      </p>

      <GreenBox>
        <strong>기초연금 감액 사유 3가지</strong><br /><br />
        1. 부부감액: 부부 모두 수급 시 각각 20% 감액 (→ 279,488원)<br />
        2. 국민연금 연계감액: A급여액이 524,040원 초과 시 단계 감액<br />
        3. 소득역전방지 감액: 소득인정액 + 기초연금 &gt; 선정기준액일 때<br /><br />
        최소 보장: 기준연금액의 50% = 174,680원<br />
        (단, 소득역전방지 감액은 최소 보장 미적용)
      </GreenBox>

      <p style={body}>
        대부분의 수급자(약 70%)는 감액 없이 전액을 받아요. 감액은 국민연금을 비교적 많이 받거나, 부부 모두 수급자이거나, 소득인정액이 선정기준액에 가까운 경우에 적용되죠.
      </p>

      <Divider />

      <H2>최소 지급액, 감액돼도 이만큼은 나와요</H2>
      <p style={body}>
        국민연금 연계감액이나 부부감액이 적용되더라도 기준연금액의 50%(174,680원)는 보장돼요. 이걸 최소 지급액이라고 하죠.
      </p>

      <BorderBox>
        <strong>감액별 최소 보장</strong><br /><br />
        <strong>부부감액</strong>: 기준연금액의 80% = 279,488원 (고정 비율)<br />
        <strong>연계감액</strong>: 감액 후에도 기준연금액의 50% = 174,680원 이상 보장<br />
        <strong>부부감액 + 연계감액</strong>: 두 감액 적용 후에도 174,680원 보장<br /><br />
        <strong>소득역전방지 감액</strong>: 최소 보장 미적용<br />
        → 이 경우 174,680원보다 적을 수 있음
      </BorderBox>

      <p style={body}>
        소득역전방지 감액은 최소 보장이 적용되지 않아요. 이건 선정기준액 경계에 있는 분들에게 적용되는 건데, 기초연금을 합산했을 때 기준선 바로 아래 비수급자보다 소득이 많아지는 걸 막기 위한 장치예요.
      </p>

      <CategoryButton label="기초연금 가이드" count={기초연금_SIDEBAR.length} href="/w/기초연금" />
      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      <H2>감액 사유별 상세 구조</H2>
      <p style={body}>
        <Link href="/w/기초연금-부부-수령액-감액계산" style={{ color: "#1D9E75", fontWeight: 600 }}>부부감액</Link>은 단순해요. 부부 모두 수급자이면 각각 20%를 빼는 거예요. 349,360원의 20%인 69,872원을 빼서 279,488원을 받게 되죠.
      </p>
      <p style={body}>
        <Link href="/w/기초연금-연계감액-계산-A급여액" style={{ color: "#1D9E75", fontWeight: 600 }}>국민연금 연계감액</Link>은 A급여액 기준으로 계산해요. A급여액이 기준연금액의 150%(524,040원)를 초과하면 초과 구간에 따라 기초연금이 줄어들어요. 최소 174,680원까지만 줄고 더 이하로는 안 내려가요.
      </p>
      <p style={body}>
        <Link href="/w/기초연금-소득역전방지-감액기준" style={{ color: "#1D9E75", fontWeight: 600 }}>소득역전방지 감액</Link>은 소득인정액이 선정기준액(247만원)에 가까운 분에게 적용돼요. (선정기준액 - 소득인정액)이 기준연금액보다 적으면, 그 차액만 기초연금으로 받게 되죠.
      </p>

      <Divider />

      <H2>내 감액 사유는 어디서 확인할까?</H2>
      <p style={body}>
        기초연금 수급 결정 통지서에 산정 내역이 기재돼 있어요. 통지서를 분실했으면 주민센터에 방문해서 재발급받거나, 복지로(bokjiro.go.kr)에서 수급 이력을 조회할 수 있어요.
      </p>
      <p style={body}>
        감액 금액이 잘못됐다고 생각되면 주민센터에 문의하세요. 소득인정액 계산 오류나 A급여액 반영 오류가 있을 수 있어요. 오류가 확인되면 소급해서 차액을 받을 수 있어요.
      </p>
      <p style={body}>
        매년 소득·재산을 재조사하니, 작년에 감액됐더라도 올해 소득이 줄었으면 감액이 해소될 수 있어요. 재조사는 별도 신청 없이 자동으로 진행돼요.
      </p>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 기초연금법을 기준으로 작성했어요. 감액 기준과 금액은 매년 조정되니 주민센터 또는 국민연금공단에서 최신 정보를 확인하세요." />
    </ArticleLayout>
  );
}
