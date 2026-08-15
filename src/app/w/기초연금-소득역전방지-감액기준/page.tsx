"use client";
// Q1. 기초연금을 받았더니 안 받는 사람보다 소득이 적어지는 역전 현상이 생겨서 이해가 안 되는 상황
// Q2. 소득역전 방지 감액이 왜 생기는지 이해하고, 내 소득인정액 기준으로 감액 여부를 판단하는 것
// Q3. (1) 소득역전 방지 감액의 정의와 계산 공식 (2) 선정기준액과의 관계 (3) 부부감액·연계감액과의 차이
// Q4. GreenBox(소득역전 방지 감액 공식) + BorderBox(계산 예시) + FAQ

import Link from "next/link";
import {
  H2, GreenBox, BorderBox, Divider, body,
  FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 기초연금_SIDEBAR, 기초연금_HIGHLIGHT } from "@/data/기초연금-guide";

const FAQS = [
  {
    q: "소득역전 방지 감액은 모든 수급자에게 적용되나요?",
    a: "아니에요. 소득인정액이 선정기준액에 가까운 사람에게만 적용돼요. 소득인정액이 선정기준액보다 충분히 낮으면 기초연금 전액을 받을 수 있어요.",
  },
  {
    q: "소득역전 방지 감액과 연계감액은 뭐가 다른가요?",
    a: "연계감액은 국민연금 A급여액이 많을 때 적용되는 거고, 소득역전 방지 감액은 소득인정액 + 기초연금 합계가 선정기준액을 넘을 때 적용돼요. 원인이 달라요.",
  },
  {
    q: "소득역전 방지 감액으로 기초연금이 0원이 될 수 있나요?",
    a: "아니에요. 최소 지급액(기준연금액의 10%, 약 34,936원)은 보장돼요. 감액이 아무리 많아도 이 금액 이하로는 내려가지 않아요.",
  },
  {
    q: "부부가구도 소득역전 방지 감액이 적용되나요?",
    a: "네, 부부가구에도 적용돼요. 부부의 소득인정액 합계 + 기초연금 합계가 부부 선정기준액(395만2천원)을 초과하면 초과분만큼 감액돼요.",
  },
  {
    q: "소득이 줄면 감액이 해제되나요?",
    a: "네, 기초연금은 매년 소득·재산을 재조사해요. 소득인정액이 줄어들면 감액이 해제되거나 줄어들 수 있어요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "기초연금법 제5조(기초연금액의 산정)", url: "https://www.law.go.kr/법령/기초연금법" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "보건복지부: 기초연금 안내", url: "https://www.mohw.go.kr" },
      { label: "복지로: 기초연금 모의계산", url: "https://www.bokjiro.go.kr" },
    ],
  },
];

const RELATED = [
  { slug: "기초연금-감액기준-A급여액-조회", title: "감액 기준과 A급여액 조회", description: "기초연금 감액 3가지 사유와 A급여액 조회 방법이에요." },
  { slug: "기초연금-소득인정액-계산-공제항목", title: "소득인정액 계산과 공제항목", description: "소득인정액 계산 방법과 공제항목 정리예요." },
  { slug: "기초연금-부부감액-20-기준-축소계획", title: "부부감액 20% 기준", description: "부부가 함께 받을 때 감액되는 기준이에요." },
];

export default function Page() {
  return (
    <ArticleLayout sidebar={<Sidebar heading="기초연금 가이드" items={기초연금_SIDEBAR} highlightSlugs={기초연금_HIGHLIGHT} currentSlug="기초연금-소득역전방지-감액기준" />}>
      <nav style={{ fontSize: 13, color: "#6b7280", marginBottom: 8 }}>
        <Link href="/" style={{ color: "#6b7280" }}>홈</Link> &gt; <Link href="/w/기초연금" style={{ color: "#6b7280" }}>기초연금</Link> &gt; <span style={{ color: "#374151" }}>소득역전 방지</span>
      </nav>

      <h1 style={{ fontSize: 26, fontWeight: 800, color: "#111", lineHeight: 1.35, marginBottom: 4 }}>
        기초연금 받으니까 오히려 손해?
      </h1>
      <p style={{ fontSize: 17, color: "#1D9E75", fontWeight: 600, marginBottom: 20 }}>
        소득역전 방지 감액 기준
      </p>

      <p style={body}>
        기초연금을 받았더니 안 받는 사람보다 총소득이 더 많아지는 상황, 이걸 "소득역전"이라고 해요. 이런 역전을 막기 위해 기초연금을 깎는 게 소득역전 방지 감액이에요. 선정기준액 근처에 있는 분들이 주로 해당되죠.
      </p>

      <ArticleAd position="intro" />
      <Divider />

      <H2>소득역전 방지 감액이 생기는 이유</H2>
      <p style={body}>
        기초연금은 소득인정액이 선정기준액(단독 247만원, 부부 395만2천원) 이하인 분에게 지급돼요. 그런데 소득인정액이 기준에 딱 걸리는 사람이 기초연금까지 받으면, 기준을 넘는 사람보다 총소득이 많아지는 역전이 생기죠.
      </p>
      <p style={body}>
        예를 들어 소득인정액이 240만원인 A씨는 기초연금 349,360원을 받아서 총 274만원이 돼요. 반면 소득인정액이 248만원인 B씨는 기준 초과로 기초연금을 못 받아서 248만원 그대로예요. A씨가 B씨보다 26만원이나 더 받게 되는 거죠.
      </p>
      <p style={body}>
        이런 불공평을 막기 위해 <Link href="https://www.law.go.kr/법령/기초연금법" style={{ color: "#1D9E75" }}>기초연금법 제5조</Link>에서 소득역전 방지 감액을 적용하고 있어요.
      </p>

      <H2>감액 계산 공식</H2>
      <p style={body}>
        소득역전 방지 감액의 계산은 단순해요. 소득인정액에 기초연금을 더한 금액이 선정기준액을 넘으면, 넘는 만큼만 깎는 거예요.
      </p>

      <GreenBox>
        <strong>소득역전 방지 감액 공식</strong><br /><br />
        감액 후 기초연금 = 선정기준액 - 소득인정액<br /><br />
        단독가구 예시:<br />
        소득인정액 230만원 → 기초연금 = 247만원 - 230만원 = 17만원<br />
        소득인정액 200만원 → 247만원 - 200만원 = 47만원 → 기준연금액(349,360원)이 더 적으니 전액 수령<br /><br />
        핵심: (소득인정액 + 기초연금) 합계가 선정기준액을 넘지 않도록 조정
      </GreenBox>

      <p style={body}>
        정리하면, 소득인정액이 선정기준액에서 기준연금액을 뺀 금액보다 높을 때 감액이 시작돼요. 단독가구 기준으로 소득인정액이 약 212만원 이상이면 소득역전 방지 감액 대상이 될 수 있어요.
      </p>

      <CategoryButton label="기초연금 가이드" count={기초연금_SIDEBAR.length} href="/w/기초연금" />
      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      <H2>실제 계산 예시</H2>
      <p style={body}>
        구체적인 숫자로 보면 더 이해가 쉬워요.
      </p>

      <BorderBox>
        <strong>단독가구 계산 예시 (2026년 기준)</strong><br /><br />
        <strong>사례 1</strong>: 소득인정액 235만원<br />
        기초연금 = 247만원 - 235만원 = 12만원 (감액 적용)<br />
        원래 349,360원을 받아야 하지만 12만원만 수령<br /><br />
        <strong>사례 2</strong>: 소득인정액 210만원<br />
        기초연금 = 247만원 - 210만원 = 37만원<br />
        기준연금액(349,360원)보다 크니 → 전액 349,360원 수령<br /><br />
        <strong>사례 3</strong>: 소득인정액 245만원<br />
        기초연금 = 247만원 - 245만원 = 2만원<br />
        하지만 최소 지급액(34,936원)이 보장되니 → 34,936원 수령
      </BorderBox>

      <p style={body}>
        사례 3처럼 계산 결과가 최소 지급액보다 적어도 34,936원은 보장돼요. 기초연금법에서 기준연금액의 10%를 최소로 보장하고 있기 때문이에요.
      </p>

      <H2>소득인정액을 낮추면 감액을 줄일 수 있어요</H2>
      <p style={body}>
        소득역전 방지 감액은 소득인정액이 높을수록 커져요. 그러니 <Link href="/w/기초연금-소득인정액-계산-공제항목" style={{ color: "#1D9E75" }}>소득인정액 계산에서 빠지는 공제항목</Link>을 꼼꼼히 확인하는 게 중요해요.
      </p>
      <p style={body}>
        근로소득 공제(112만원 + 30%), 금융재산 공제(2,000만원), 기본재산액 공제(대도시 1.35억) 등을 잘 적용하면 소득인정액이 생각보다 많이 낮아질 수 있어요. 주민센터에서 모의계산을 받아보는 게 가장 정확해요.
      </p>
      <p style={body}>
        특히 <Link href="/w/기초연금-근로소득-공제기준-계산" style={{ color: "#1D9E75" }}>근로소득 공제</Link>가 꽤 큰 편이라, 일을 하고 있더라도 기초연금 대상이 되는 경우가 많아요.
      </p>

      <Divider />

      <H2>자주 묻는 질문</H2>
      <FAQ items={FAQS} />

      <Divider />
      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 기초연금법과 보건복지부 자료를 바탕으로 작성됐어요. 소득인정액 산정은 개인 상황에 따라 달라지니 주민센터에서 정확하게 확인하세요." />
    </ArticleLayout>
  );
}
