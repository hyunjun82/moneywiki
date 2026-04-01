"use client";
import { BorderBox } from "@/components/article-ui/BorderBox";

// Q1. 기초연금을 뒤늦게 알았거나 신청이 늦어져서, 이전 달 것도 받을 수 있는지 궁금한 상황
// Q2. 소급 지급이 안 되는 걸 이해하고, 최대한 빨리 신청해서 손해를 줄인다
// Q2-1. 주민센터 또는 복지로에서 바로 신청
// Q3. 소급 불가 원칙, 늦게 신청하면 생기는 손해 금액, 예외 없음, 65세 전 사전 신청 가능
// Q4. GreenBox(결론) + BorderBox(손해 계산 예시) + FAQ

import Link from "next/link";
import {
  H2, GreenBox, BorderBox, Divider, body,
  FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 기초연금_SIDEBAR, 기초연금_HIGHLIGHT } from "@/data/기초연금-guide";

const FAQS = [
  {
    q: "65세 때 몰라서 못 신청했는데, 67세에 신청하면 2년치를 받을 수 있나요?",
    a: "안 돼요. 기초연금은 신청한 달부터 지급이 시작돼요. 67세에 신청하면 67세 신청월부터 받고, 65~66세 동안 못 받은 건 소급되지 않아요. 기초연금법 제6조에 '신청일이 속하는 달'부터 지급한다고 명시돼 있어요.",
  },
  {
    q: "신청했는데 심사가 오래 걸리면 그 기간은 어떻게 되나요?",
    a: "심사에 30일 정도 걸리지만, 수급 자격이 확인되면 신청한 달부터 소급해서 첫 지급에 합산돼요. 심사 기간 때문에 손해 보는 건 아니에요.",
  },
  {
    q: "65세 생일 전에 미리 신청하면 더 빨리 받나요?",
    a: "더 빨리 받는 건 아니고, 65세 되는 달부터 받아요. 다만 미리 신청해두면 65세 첫 달부터 빠짐없이 받을 수 있으니 유리하죠. 생일 1개월 전부터 신청 가능해요.",
  },
  {
    q: "코로나 같은 특수한 상황에서도 소급 안 되나요?",
    a: "특별한 예외 규정은 없어요. 코로나 시기에도 소급 지급 규정은 변경되지 않았어요. 다만 거동이 어려운 경우 대리신청이 가능하니, 빨리 신청하는 게 최선이에요.",
  },
  {
    q: "기초생활수급자인데 기초연금도 소급 안 되나요?",
    a: "네, 기초생활수급자 여부와 관계없이 기초연금은 소급 지급이 안 돼요. 다만 기초생활수급자라면 이미 주민센터와 연계돼 있으니 담당자에게 기초연금도 함께 신청하겠다고 말하면 빠르게 처리돼요.",
  },
];

const REFERENCES = [
  {
    category: "공식 자료",
    items: [
      { label: "보건복지부: 기초연금 제도 안내", url: "https://www.mohw.go.kr" },
      { label: "복지로: 기초연금 신청", url: "https://www.bokjiro.go.kr" },
    ],
  },
  {
    category: "법령",
    items: [
      { label: "기초연금법 제6조 (지급 시기)", url: "https://www.law.go.kr/법령/기초연금법" },
    ],
  },
];

const RELATED = [
  { slug: "기초연금-신청방법-절차", title: "기초연금 신청 방법과 절차", description: "어디서 어떻게 신청하는지 단계별 정리예요." },
  { slug: "기초연금-65세-신청시기-소급여부", title: "65세 신청 시기와 소급 여부", description: "생일 전에 신청해야 하는 이유예요." },
  { slug: "기초연금-지급일-입금기준", title: "기초연금 지급일은 매월 언제?", description: "매달 입금되는 날짜와 기준이에요." },
];

export default function Page() {
  return (
    <ArticleLayout sidebar={<Sidebar heading="기초연금 가이드" items={기초연금_SIDEBAR} highlightSlugs={기초연금_HIGHLIGHT} currentSlug="기초연금-소급지급-여부-손해" />}>
      <nav style={{ fontSize: 13, color: "#888", marginBottom: 12 }}>
        <Link href="/" style={{ color: "#888", textDecoration: "none" }}>홈</Link>
        {" > "}
        <Link href="/w/기초연금" style={{ color: "#888", textDecoration: "none" }}>기초연금</Link>
        {" > "}
        <span style={{ color: "#333" }}>소급 지급</span>
      </nav>

      <h1 style={{ fontSize: 26, fontWeight: 800, lineHeight: 1.45, marginBottom: 6 }}>
        기초연금 늦게 신청하면 밀린 돈 받을까?
      </h1>
      <p style={{ fontSize: 17, color: "#1D9E75", fontWeight: 600, marginBottom: 18 }}>
        소급 지급 여부와 손해
      </p>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        65세가 한참 지났는데 이제야 기초연금을 알게 됐죠.
        결론부터 말하면, 기초연금은 소급 지급이 안 돼요.
        신청한 달부터 지급이 시작되기 때문에, 늦게 신청한 만큼 못 받는 돈이 생기죠.
        얼마나 손해인지, 어떻게 해야 하는지 정리했어요.
      </p>

      <ArticleAd position="intro" />
      <Divider />

      <H2>소급 지급이 안 되는 이유</H2>
      <p style={body}>
        기초연금법 제6조에 "기초연금은 신청일이 속하는 달부터 지급한다"고 명시돼 있어요.
        이건 국민연금이나 다른 복지 급여와 다른 점이에요.
        신청을 해야 자격 심사가 시작되고, 그 달부터 권리가 발생하는 구조죠.
      </p>
      <GreenBox>
        <strong>기초연금 지급 시작 시점</strong><br />
        <br />
        신청한 달부터 지급 시작 (소급 없음)<br />
        65세 생일 1개월 전부터 사전 신청 가능<br />
        심사 기간(약 30일)은 소급 처리 → 손해 없음<br />
        <br />
        신청하지 않은 기간은 어떤 사유로도 소급 지급 불가
      </GreenBox>

      <H2>늦게 신청하면 얼마나 손해일까</H2>
      <p style={body}>
        구체적인 금액으로 보면 손해가 체감될 거예요.
        2026년 기준 단독가구 최대 월 349,360원으로 계산해볼게요.
      </p>
      <BorderBox>
        <strong>늦은 신청에 따른 손해 금액 (2026년 기준)</strong><br />
        <br />
        1개월 늦게 신청 → 약 35만원 손해<br />
        3개월 늦게 신청 → 약 105만원 손해<br />
        6개월 늦게 신청 → 약 210만원 손해<br />
        1년 늦게 신청 → 약 419만원 손해<br />
        2년 늦게 신청 → 약 838만원 손해<br />
        <br />
        부부가구라면 각각 감액(20%)된 금액 기준이지만, 두 사람 합산이면 손해가 더 커요.
      </BorderBox>
      <p style={body}>
        2년 늦으면 838만원을 못 받는 셈이에요.
        이 돈은 어떤 방법으로도 돌려받을 수 없으니, 알게 된 시점에서 바로 <Link href="/w/기초연금-신청방법-절차" style={{ color: "#1D9E75", textDecoration: "underline" }}>신청</Link>하는 게 최선이에요.
      </p>

      <CategoryButton label="기초연금 가이드" count={기초연금_SIDEBAR.length} href="/w/기초연금" />
      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />
      <Divider />

      <H2>손해를 줄이는 방법</H2>
      <p style={body}>
        이미 늦었더라도 지금 당장 신청하는 게 유일한 방법이에요.
        내일 신청하면 오늘보다 하루 더 손해는 아니지만(월 단위 계산이니까), 이번 달 안에 신청해야 이번 달부터 받을 수 있어요.
      </p>
      <p style={body}>
        65세가 아직 안 됐다면 생일 1개월 전부터 사전 신청할 수 있어요.
        예를 들어 7월 생일이면 6월 1일부터 신청 가능하죠.
        사전 신청하면 65세 되는 달부터 바로 지급이 시작돼서 한 달도 빠짐없이 받을 수 있어요.
      </p>
      <p style={body}>
        서류가 완벽하지 않아도 일단 접수부터 하세요.
        접수일 기준으로 지급 시작 시점이 정해지니까, <Link href="/w/기초연금-신청서류-준비물" style={{ color: "#1D9E75", textDecoration: "underline" }}>서류는 나중에 보완</Link>해도 돼요.
      </p>

      <H2>다른 연금이나 급여도 소급이 안 되나요</H2>
      <p style={body}>
        국민연금 노령연금은 최대 5년치 소급이 가능한데, 기초연금은 그런 규정이 없어요.
        기초생활보장(생계급여)도 신청일 기준으로 지급하기 때문에 비슷한 구조죠.
      </p>
      <p style={body}>
        장애인연금도 마찬가지로 소급 지급이 안 돼요.
        복지 급여는 대부분 "신청주의"여서, 본인이 직접 신청해야 권리가 발생한다는 공통점이 있어요.
        그래서 자격이 되는 급여는 하나라도 빨리 신청하는 게 유리하죠.
      </p>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        소급 지급 관련 궁금한 점이에요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 기초연금법 기준으로 작성됐어요. 손해 금액은 2026년 기준연금액(349,360원)으로 단독가구 최대 수령액 기준이에요. 실제 수령액은 소득인정액에 따라 달라질 수 있어요." />
    </ArticleLayout>
  );
}
