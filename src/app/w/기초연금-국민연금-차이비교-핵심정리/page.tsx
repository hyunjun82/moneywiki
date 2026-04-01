"use client";
import { BorderBox } from "@/components/article-ui/BorderBox";

// Q1. 기초연금과 국민연금이 뭐가 다른지 헷갈리는 상황 (부모님 또는 본인 노후 준비)
// Q2. 두 제도의 차이를 이해하고, 본인(또는 부모님)에게 해당하는 제도를 파악한다
// Q2-1. 기초연금은 주민센터/복지로, 국민연금은 국민연금공단
// Q3. 재원(세금 vs 보험료), 대상(65세+저소득 vs 가입자), 금액, 신청방법, 동시수급 가능 여부
// Q4. GreenBox(핵심 차이 비교표 스타일) + BorderBox(각 제도 상세) + FAQ

import Link from "next/link";
import {
  H2, GreenBox, BorderBox, Divider, body,
  FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 기초연금_SIDEBAR, 기초연금_HIGHLIGHT } from "@/data/기초연금-guide";

const FAQS = [
  {
    q: "국민연금을 안 냈으면 기초연금도 못 받나요?",
    a: "아니에요. 기초연금은 국민연금 납부 여부와 관계없어요. 65세 이상이고 소득인정액이 기준 이하면 국민연금을 한 번도 안 낸 분도 받을 수 있어요.",
  },
  {
    q: "국민연금이 기초연금보다 많으면 기초연금은 필요 없나요?",
    a: "금액이 크다고 기초연금이 필요 없는 건 아니에요. 소득인정액 기준만 충족하면 둘 다 받을 수 있거든요. 기초연금은 추가 수입이니까 신청 자격이 되면 꼭 받으세요.",
  },
  {
    q: "기초연금은 내가 돈을 안 내도 되는 건가요?",
    a: "네, 맞아요. 기초연금은 국가 세금(일반 재정)으로 운영돼요. 본인이 보험료를 내지 않아도 자격만 되면 받을 수 있어요. 국민연금처럼 가입 기간이나 납부액이 없어도 돼요.",
  },
  {
    q: "주부(전업주부)도 기초연금을 받을 수 있나요?",
    a: "네, 전업주부도 65세 이상이고 소득인정액이 기준 이하면 기초연금을 받을 수 있어요. 국민연금은 가입 이력이 필요하지만, 기초연금은 그런 조건이 없어요.",
  },
  {
    q: "두 연금 합쳐서 최대 얼마까지 받을 수 있나요?",
    a: "국민연금은 가입 기간과 소득에 따라 금액이 다르고, 기초연금은 최대 349,360원(2026년 단독가구)이에요. 합산 금액에 상한선은 없지만, 국민연금이 많으면 기초연금이 감액될 수 있어요.",
  },
];

const REFERENCES = [
  {
    category: "공식 자료",
    items: [
      { label: "보건복지부: 기초연금 제도", url: "https://www.mohw.go.kr" },
      { label: "국민연금공단: 국민연금 안내", url: "https://www.nps.or.kr" },
    ],
  },
  {
    category: "법령",
    items: [
      { label: "기초연금법", url: "https://www.law.go.kr/법령/기초연금법" },
      { label: "국민연금법", url: "https://www.law.go.kr/법령/국민연금법" },
    ],
  },
];

const RELATED = [
  { slug: "국민연금-기초연금-동시수급-감액기준", title: "국민연금과 기초연금 동시 수급", description: "둘 다 받을 때 감액되는 기준이에요." },
  { slug: "기초연금-노령연금-용어차이-구분법", title: "기초연금과 노령연금 용어 차이", description: "헷갈리는 용어를 정리했어요." },
  { slug: "기초연금-수급자격-선정기준액-소득조건", title: "기초연금 수급자격과 선정기준액", description: "자격 조건을 자세히 설명해요." },
];

export default function Page() {
  return (
    <ArticleLayout sidebar={<Sidebar heading="기초연금 가이드" items={기초연금_SIDEBAR} highlightSlugs={기초연금_HIGHLIGHT} currentSlug="기초연금-국민연금-차이비교-핵심정리" />}>
      <nav style={{ fontSize: 13, color: "#888", marginBottom: 12 }}>
        <Link href="/" style={{ color: "#888", textDecoration: "none" }}>홈</Link>
        {" > "}
        <Link href="/w/기초연금" style={{ color: "#888", textDecoration: "none" }}>기초연금</Link>
        {" > "}
        <span style={{ color: "#333" }}>국민연금 차이</span>
      </nav>

      <h1 style={{ fontSize: 26, fontWeight: 800, lineHeight: 1.45, marginBottom: 6 }}>
        기초연금이랑 국민연금 뭐가 다를까?
      </h1>
      <p style={{ fontSize: 17, color: "#1D9E75", fontWeight: 600, marginBottom: 18 }}>
        차이 비교와 핵심 정리
      </p>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        기초연금, 국민연금, 노령연금... 이름이 비슷해서 헷갈리는 분이 정말 많죠.
        핵심만 말하면, 기초연금은 국가가 세금으로 65세 이상에게 주는 돈이고,
        국민연금은 본인이 낸 보험료를 나중에 돌려받는 거예요.
        완전히 다른 제도인데 이름 때문에 혼동이 생기는 거죠.
      </p>

      <ArticleAd position="intro" />
      <Divider />

      <H2>기초연금 vs 국민연금, 핵심 차이</H2>
      <p style={body}>
        두 제도의 가장 큰 차이는 "돈이 어디서 나오느냐"와 "누가 받느냐"예요.
        아래에서 한눈에 비교해보세요.
      </p>
      <GreenBox>
        <strong>기초연금 vs 국민연금 비교</strong><br />
        <br />
        <strong>재원</strong><br />
        기초연금: 국가 세금 (일반 재정) | 국민연금: 본인이 낸 보험료<br />
        <br />
        <strong>대상</strong><br />
        기초연금: 65세 이상 + 소득 하위 70% | 국민연금: 10년 이상 가입한 사람<br />
        <br />
        <strong>보험료 납부</strong><br />
        기초연금: 없음 (무료) | 국민연금: 월 소득의 9%<br />
        <br />
        <strong>금액 (2026년)</strong><br />
        기초연금: 최대 월 349,360원 | 국민연금: 가입 기간·소득에 따라 다름<br />
        <br />
        <strong>신청 장소</strong><br />
        기초연금: 주민센터, 복지로 | 국민연금: 국민연금공단<br />
        <br />
        <strong>동시 수급</strong><br />
        가능 (단, 국민연금 많으면 기초연금 감액 가능)
      </GreenBox>

      <H2>기초연금, 어떤 제도일까</H2>
      <p style={body}>
        기초연금은 2014년에 시작된 제도예요.
        국민연금을 가입하지 않았거나 가입했더라도 수령액이 적은 어르신을 위해 만들어졌죠.
        65세 이상 대한민국 국민 중 소득인정액이 선정기준액(단독 247만원, 부부 395.2만원) 이하면 받을 수 있어요.
      </p>
      <p style={body}>
        보험료를 내지 않아도 되고, 가입 기간도 없어요.
        나이와 소득 조건만 충족하면 누구나 신청할 수 있는 게 특징이에요.
        국민연금에 가입한 적 없는 전업주부, 자영업자 등도 대상이 되죠.
      </p>

      <CategoryButton label="기초연금 가이드" count={기초연금_SIDEBAR.length} href="/w/기초연금" />
      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />
      <Divider />

      <H2>국민연금, 어떤 제도일까</H2>
      <p style={body}>
        국민연금은 1988년부터 시행된 사회보험이에요.
        18세~60세 근로자와 사업자가 월 소득의 9%(사업장은 노사 반반)를 납부하고,
        65세부터(출생연도에 따라 다름) 연금으로 돌려받는 구조예요.
      </p>
      <BorderBox>
        <strong>국민연금 핵심 구조</strong><br />
        <br />
        가입 기간: 최소 10년 이상 납부해야 연금 수령 가능<br />
        수령 시기: 출생연도에 따라 62~65세부터<br />
        수령 금액: 가입 기간과 소득에 비례 (평균 월 60만원대)<br />
        납부 중단: 가능하지만 수령액이 줄어듦<br />
        <br />
        10년 미만 가입이면 일시금(반환일시금)으로 받을 수 있어요.
      </BorderBox>
      <p style={body}>
        국민연금은 내가 낸 만큼 돌려받는 구조라 "내 돈"이라는 성격이 강해요.
        반면 기초연금은 국가가 어르신의 노후를 보장하기 위해 지급하는 "복지"예요.
        성격이 완전히 다르기 때문에 <Link href="/w/국민연금-기초연금-동시수급-감액기준" style={{ color: "#1D9E75", textDecoration: "underline" }}>둘 다 받을 수 있는 거</Link>죠.
      </p>

      <H2>둘 다 받을 수 있지만 감액이 있을 수 있어요</H2>
      <p style={body}>
        국민연금을 받으면서 기초연금도 받을 수 있어요.
        다만 국민연금 수령액이 일정 기준을 넘으면 기초연금이 감액되는 "연계감액" 제도가 있어요.
      </p>
      <p style={body}>
        감액 기준은 국민연금의 A급여액(전체 가입자 평균소득 기반 금액)이 기준연금액의 150%(약 52만4천원)를 넘느냐예요.
        대부분의 국민연금 수급자는 이 기준 이하여서 감액 없이 기초연금을 받고 있어요.
        자세한 계산법은 <Link href="/w/기초연금-연계감액-계산-A급여액" style={{ color: "#1D9E75", textDecoration: "underline" }}>연계감액과 A급여액 계산</Link> 글에서 설명하고 있어요.
      </p>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        기초연금과 국민연금 차이에 대한 궁금한 점이에요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 기초연금법 및 국민연금법 기준으로 작성됐어요. 개인별 수급 자격과 금액은 상황에 따라 다르니 주민센터(129) 또는 국민연금공단(1355)에서 확인하세요." />
    </ArticleLayout>
  );
}
