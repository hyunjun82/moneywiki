"use client";
import { Divider } from "@/components/article-ui/Divider";
import { BorderBox } from "@/components/article-ui/BorderBox";

// Q1. 기초연금과 노령연금이 같은 건지 다른 건지 헷갈리는 상황
// Q2. 두 용어의 차이를 정확히 이해하고 본인에게 해당하는 제도를 구분한다
// Q2-1. 기초연금은 주민센터, 노령연금은 국민연금공단
// Q3. 기초연금=별도 제도, 노령연금=국민연금의 한 종류, 기초노령연금(구 명칭)과의 관계
// Q4. GreenBox(용어 정리) + BorderBox(역사 설명) + FAQ

import Link from "next/link";
import {
  H2, GreenBox, BorderBox, Divider, body,
  FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 기초연금_SIDEBAR, 기초연금_HIGHLIGHT } from "@/data/기초연금-guide";

const FAQS = [
  {
    q: "기초노령연금이랑 기초연금은 같은 건가요?",
    a: "비슷하지만 다른 제도예요. 기초노령연금은 2008~2014년에 운영됐고, 2014년에 기초연금법이 시행되면서 기초연금으로 바뀌었어요. 금액도 크게 올랐고, 대상도 확대됐어요.",
  },
  {
    q: "노령연금은 국민연금의 일부인가요?",
    a: "맞아요. 국민연금에는 노령연금, 장애연금, 유족연금 등 여러 종류가 있는데, 노령연금은 그 중에서 나이가 들어 받는 연금이에요. 국민연금법에 근거한 급여 중 하나죠.",
  },
  {
    q: "기초연금을 왜 노령연금이라고 부르는 사람이 있나요?",
    a: "2008~2014년에 '기초노령연금'이라는 이름으로 운영됐기 때문이에요. 이때의 기억 때문에 어르신들 사이에서 '노령연금'이라고 부르는 경우가 많은데, 정확히는 기초연금이에요.",
  },
  {
    q: "기초연금이랑 노령연금 둘 다 받을 수 있나요?",
    a: "네, 기초연금(국가 복지)과 노령연금(국민연금)은 별개 제도여서 둘 다 받을 수 있어요. 다만 국민연금 수령액에 따라 기초연금이 감액될 수 있어요.",
  },
  {
    q: "조기노령연금이랑 기초연금은 관계가 있나요?",
    a: "조기노령연금은 국민연금을 정상 수령 나이보다 최대 5년 일찍 받는 제도예요. 기초연금과는 전혀 다른 제도이고, 조기노령연금을 받아도 65세 이후 기초연금 자격에는 영향이 없어요.",
  },
  {
    q: "부모님이 '노령연금 신청한다'고 하면 뭘 도와드려야 하나요?",
    a: "문맥에 따라 다르지만, 65세 이상이고 소득이 적은 분이라면 기초연금을 말하는 걸 수 있어요. 주민센터에 가서 '기초연금'이라고 말하면 정확하게 안내받을 수 있어요. 국민연금 수령 관련이라면 국민연금공단(1355)에 문의하세요.",
  },
];

const REFERENCES = [
  {
    category: "공식 자료",
    items: [
      { label: "보건복지부: 기초연금 제도", url: "https://www.mohw.go.kr" },
      { label: "국민연금공단: 노령연금 안내", url: "https://www.nps.or.kr" },
    ],
  },
  {
    category: "법령",
    items: [
      { label: "기초연금법", url: "https://www.law.go.kr/법령/기초연금법" },
      { label: "국민연금법 제61조 (노령연금)", url: "https://www.law.go.kr/법령/국민연금법" },
    ],
  },
];

const RELATED = [
  { slug: "기초연금-국민연금-차이비교-핵심정리", title: "기초연금과 국민연금 차이 비교", description: "두 제도의 핵심 차이를 정리했어요." },
  { slug: "국민연금-기초연금-동시수급-감액기준", title: "국민연금과 기초연금 동시 수급", description: "둘 다 받을 때 감액되는 기준이에요." },
  { slug: "기초연금-신청방법-절차", title: "기초연금 신청 방법", description: "기초연금 신청 절차를 정리했어요." },
];

export default function Page() {
  return (
    <ArticleLayout sidebar={<Sidebar heading="기초연금 가이드" items={기초연금_SIDEBAR} highlightSlugs={기초연금_HIGHLIGHT} currentSlug="기초연금-노령연금-용어차이-구분법" />}>
      <nav style={{ fontSize: 13, color: "#888", marginBottom: 12 }}>
        <Link href="/" style={{ color: "#888", textDecoration: "none" }}>홈</Link>
        {" > "}
        <Link href="/w/기초연금" style={{ color: "#888", textDecoration: "none" }}>기초연금</Link>
        {" > "}
        <span style={{ color: "#333" }}>노령연금 차이</span>
      </nav>

      <h1 style={{ fontSize: 26, fontWeight: 800, lineHeight: 1.45, marginBottom: 6 }}>
        기초연금이랑 노령연금 같은 건가?
      </h1>
      <p style={{ fontSize: 17, color: "#1D9E75", fontWeight: 600, marginBottom: 18 }}>
        용어 차이와 구분법
      </p>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        "노령연금 신청하러 왔는데요" 하면 주민센터 직원이 "기초연금 말씀이세요, 국민연금 말씀이세요?" 하고 되물어요.
        이름이 비슷해서 헷갈리지만 완전히 다른 제도예요.
        기초연금은 국가가 세금으로 주는 복지이고, 노령연금은 국민연금 중 하나예요.
        어디서 이 용어 혼동이 시작됐는지까지 정리했어요.
      </p>

      <ArticleAd position="intro" />
      <Divider />

      <H2>기초연금, 노령연금, 기초노령연금 구분</H2>
      <p style={body}>
        세 가지 용어가 얽혀 있어서 헷갈리는 건 당연해요.
        하나씩 정리해볼게요.
      </p>
      <GreenBox>
        <strong>용어 한눈에 정리</strong><br />
        <br />
        <strong>기초연금</strong><br />
        2014년~ / 국가 세금으로 운영 / 65세 이상 소득 하위 70%<br />
        최대 월 349,360원 (2026년) / 신청: 주민센터·복지로<br />
        <br />
        <strong>노령연금</strong><br />
        1988년~ / 국민연금의 한 종류 / 10년 이상 가입자<br />
        가입 기간·소득에 따라 금액 다름 / 신청: 국민연금공단<br />
        <br />
        <strong>기초노령연금 (폐지)</strong><br />
        2008~2014년 / 기초연금의 이전 이름 / 현재는 기초연금으로 변경
      </GreenBox>
      <p style={body}>
        어르신들이 "노령연금"이라고 부르는 건 대부분 기초연금을 말하는 거예요.
        2008~2014년에 "기초노령연금"이라는 이름으로 운영됐기 때문에 그때 기억으로 부르는 경우가 많죠.
      </p>

      <H2>왜 이렇게 헷갈리게 됐을까</H2>
      <p style={body}>
        혼란의 원인은 제도 이름이 바뀐 역사 때문이에요.
        시간순으로 보면 이해가 쉬워요.
      </p>
      <BorderBox>
        <strong>연금 제도 변천사</strong><br />
        <br />
        1988년: 국민연금 시작 → "노령연금"은 국민연금의 급여 종류<br />
        2008년: 기초노령연금법 시행 → 65세 이상에게 소액 지급 시작<br />
        2014년: 기초연금법 시행 → 기초노령연금을 폐지하고 "기초연금"으로 대체<br />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;금액 대폭 인상(월 20만원→)<br />
        2026년: 기초연금 월 349,360원 / 국민연금 노령연금은 별도 운영 중
      </BorderBox>
      <p style={body}>
        "기초노령연금"이 "기초연금"으로 바뀌면서, 사라진 이름의 잔상이 남아 혼동이 생긴 거예요.
        국민연금의 "노령연금"과 이름이 겹치니까 더 헷갈리게 된 거죠.
      </p>

      <CategoryButton label="기초연금 가이드" count={기초연금_SIDEBAR.length} href="/w/기초연금" />
      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />
      <Divider />

      <H2>간단한 구분법</H2>
      <p style={body}>
        헷갈릴 때는 이렇게 구분하면 쉬워요.
      </p>
      <p style={body}>
        "내가(또는 부모님이) 보험료를 낸 적이 있나?" → 있으면 국민연금(노령연금)을 받을 자격이 있을 수 있어요.
        "65세 이상이고 소득이 많지 않나?" → 그러면 기초연금 대상일 수 있어요.
        두 가지 모두 해당되면 <Link href="/w/국민연금-기초연금-동시수급-감액기준" style={{ color: "#1D9E75", textDecoration: "underline" }}>둘 다 받을 수 있어요</Link>.
      </p>
      <p style={body}>
        주민센터에서 "기초연금"이라고 말하면 정확해요.
        국민연금공단에서 "노령연금"이라고 말하면 국민연금 이야기로 알아들어요.
        장소에 맞는 용어를 쓰면 의사소통이 훨씬 빨라지죠.
      </p>

      <H2>기초연금과 <Link href="/w/기초연금-국민연금-차이비교-핵심정리" style={{ color: "#1D9E75", textDecoration: "underline" }}>국민연금의 차이</Link>를 더 자세히</H2>
      <p style={body}>
        기초연금은 세금으로 운영되니까 보험료를 낸 적 없어도 받을 수 있어요.
        국민연금은 본인이 낸 보험료를 돌려받는 구조라 가입 이력이 필수예요.
        기초연금은 모든 수급자에게 비슷한 금액을 주지만, 국민연금은 내가 낸 만큼 차이가 나죠.
      </p>
      <p style={body}>
        한 가지 중요한 점은, 국민연금을 많이 받는다고 해서 기초연금을 아예 못 받는 건 아니라는 거예요.
        소득인정액이 선정기준액 이하이면 자격이 유지돼요.
        다만 국민연금의 A급여액이 높으면 기초연금이 감액될 수 있으니, 이 부분은 별도로 확인하는 게 좋아요.
      </p>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        용어 관련 궁금한 점을 모았어요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 기초연금법 및 국민연금법 기준으로 작성됐어요. 본인에게 해당하는 제도가 뭔지 모르겠다면 주민센터(129)에 전화하면 안내받을 수 있어요." />
    </ArticleLayout>
  );
}
