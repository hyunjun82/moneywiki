"use client";
import { BorderBox } from "@/components/article-ui/BorderBox";

// Q1. 국민연금을 열심히 냈는데 기초연금이 줄어들어서 억울하고, 정확히 얼마나 깎이는지 알고 싶은 상황
// Q2. 본인의 국민연금 수령액 기준으로 기초연금이 얼마나 감액되는지 직접 계산해볼 수 있는 것
// Q3. (1) A급여액의 정의와 2026년 기준액 (2) 연계감액 공식과 단계별 계산 (3) 감액 후 실수령액 예시
// Q4. GreenBox(A급여액 기준) + BorderBox(감액 공식) + 계산 예시 텍스트 + FAQ

import Link from "next/link";
import {
  H2, GreenBox, BorderBox, Divider, body,
  FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 기초연금_SIDEBAR, 기초연금_HIGHLIGHT } from "@/data/기초연금-guide";

const FAQS = [
  {
    q: "A급여액은 어디서 확인할 수 있나요?",
    a: "국민연금공단 홈페이지(nps.or.kr)나 고객센터(1355)에서 본인의 국민연금 가입 기간과 A급여액을 조회할 수 있어요. '내 연금 알아보기' 메뉴에서 확인하면 돼요.",
  },
  {
    q: "국민연금을 적게 받으면 연계감액이 안 되나요?",
    a: "네, 국민연금 수령액(A급여액 기준)이 기준연금액의 150%(524,040원) 이하이면 연계감액이 적용되지 않아요. 이 기준 이하라면 기초연금 전액을 받을 수 있어요.",
  },
  {
    q: "유족연금이나 장애연금도 연계감액 대상인가요?",
    a: "연계감액은 국민연금의 노령연금(본인 가입분)에만 적용돼요. 유족연금, 장애연금은 연계감액 대상이 아니에요. 다만 소득인정액 산정 시에는 반영돼요.",
  },
  {
    q: "연계감액과 부부감액이 동시에 적용되면 얼마 받나요?",
    a: "두 감액이 동시에 적용돼요. 예를 들어 연계감액으로 기초연금이 30만원이 됐는데 부부 모두 수급자이면, 30만원에서 20%를 추가로 빼서 24만원이 돼요.",
  },
  {
    q: "국민연금 수령을 포기하면 기초연금을 더 받을 수 있나요?",
    a: "국민연금 수령을 포기(정지)하면 연계감액은 적용되지 않아요. 하지만 국민연금 금액이 기초연금 감액분보다 훨씬 클 수 있으니, 포기하는 게 반드시 유리하지는 않아요. 신중하게 비교해봐야 해요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "기초연금법 제5조(기초연금액의 산정)", url: "https://www.law.go.kr/법령/기초연금법" },
      { label: "기초연금법 시행령 제4조(A급여액)", url: "https://www.law.go.kr/법령/기초연금법시행령" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "국민연금공단: 내 연금 알아보기", url: "https://www.nps.or.kr" },
      { label: "보건복지부: 기초연금 안내", url: "https://www.mohw.go.kr" },
    ],
  },
];

const RELATED = [
  { slug: "기초연금-감액기준-A급여액-조회", title: "감액 기준과 A급여액 조회 방법", description: "A급여액을 직접 조회하는 방법이에요." },
  { slug: "기초연금-연계감액-폐지논의-현재기준", title: "연계감액 폐지 논의와 현재 기준", description: "연계감액 폐지 논의가 어디까지 왔는지 정리했어요." },
  { slug: "기초연금-부부감액-20-기준-축소계획", title: "부부감액 20% 기준과 축소 계획", description: "부부감액이 적용되는 기준이에요." },
];

export default function Page() {
  return (
    <ArticleLayout sidebar={<Sidebar heading="기초연금 가이드" items={기초연금_SIDEBAR} highlightSlugs={기초연금_HIGHLIGHT} currentSlug="기초연금-연계감액-계산-A급여액" />}>
      <nav style={{ fontSize: 13, color: "#6b7280", marginBottom: 8 }}>
        <Link href="/" style={{ color: "#6b7280" }}>홈</Link> &gt; <Link href="/w/기초연금" style={{ color: "#6b7280" }}>기초연금</Link> &gt; <span style={{ color: "#374151" }}>연계감액</span>
      </nav>

      <h1 style={{ fontSize: 26, fontWeight: 800, color: "#111", lineHeight: 1.35, marginBottom: 4 }}>
        국민연금 많이 냈더니 기초연금이 줄었다면?
      </h1>
      <p style={{ fontSize: 17, color: "#1D9E75", fontWeight: 600, marginBottom: 20 }}>
        연계감액 계산과 A급여액
      </p>

      <p style={body}>
        국민연금을 성실히 납부한 사람일수록 기초연금이 줄어드는 구조, 바로 연계감액이에요. "열심히 낸 사람이 손해"라는 불만이 많죠. 정확히 어떤 기준으로, 얼마나 깎이는지 계산 방법을 알아야 내 수령액을 예측할 수 있어요.
      </p>

      <ArticleAd position="intro" />
      <Divider />

      <H2>연계감액이 뭔지 먼저 이해하기</H2>
      <p style={body}>
        연계감액은 국민연금을 많이 받는 사람의 기초연금을 줄이는 제도예요. <Link href="https://www.law.go.kr/법령/기초연금법" style={{ color: "#1D9E75" }}>기초연금법 제5조</Link>에 따라, 국민연금 급여액(A급여액)이 일정 기준을 넘으면 기초연금액이 단계적으로 감액돼요.
      </p>
      <p style={body}>
        여기서 핵심은 "A급여액"이에요. A급여액은 국민연금 전체 가입자의 평균소득월액을 기반으로 계산되는 금액이고, 국민연금 가입 기간이 길수록 커져요. 실제 국민연금 수령액 전체가 아니라 A급여액만 연계감액 판단에 사용돼요.
      </p>
      <p style={body}>
        쉽게 말하면, 국민연금 가입 기간이 길고 평균 소득이 높았던 사람일수록 A급여액이 크고, 기초연금 감액 폭도 커지는 구조예요.
      </p>

      <H2>A급여액 기준과 감액 시작 구간</H2>
      <p style={body}>
        2026년 기준, 연계감액이 시작되는 기준선은 기준연금액(349,360원)의 150%예요.
      </p>

      <GreenBox>
        <strong>2026년 연계감액 기준</strong><br />
        기준연금액: 349,360원<br />
        연계감액 시작선: 349,360원 x 150% = 524,040원<br /><br />
        A급여액이 524,040원 이하 → 감액 없음 (기초연금 전액 수령)<br />
        A급여액이 524,040원 초과 → 초과분에 따라 단계적 감액
      </GreenBox>

      <p style={body}>
        A급여액이 524,040원을 넘는 순간부터 기초연금이 줄어들기 시작해요. 초과하는 금액이 클수록 감액 폭도 커지죠.
      </p>

      <CategoryButton label="기초연금 가이드" count={기초연금_SIDEBAR.length} href="/w/기초연금" />
      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      <H2>연계감액 계산 공식</H2>
      <p style={body}>
        연계감액 계산은 A급여액 구간에 따라 달라져요. 기초연금법 시행령에 정해진 공식을 따르면 돼요.
      </p>

      <BorderBox>
        <strong>연계감액 공식</strong><br /><br />
        <strong>구간 1</strong>: A급여액이 기준연금액의 150% 초과 ~ 200% 이하<br />
        감액분 = (A급여액 - 기준연금액 x 150%) x 일정 비율<br /><br />
        <strong>구간 2</strong>: A급여액이 기준연금액의 200% 초과<br />
        감액 폭이 더 커짐<br /><br />
        최대 감액 한도: 기준연금액의 50% (174,680원)까지만 감액<br />
        → 아무리 국민연금을 많이 받아도 기초연금이 174,680원 이하로는 안 떨어짐
      </BorderBox>

      <p style={body}>
        실제 계산 예시로 보면 이해가 빨라요. 국민연금 A급여액이 60만원인 경우, 기준선 524,040원을 약 76,000원 초과하니 기초연금이 약 30만원대로 줄어들어요. A급여액이 100만원이면 감액이 커져서 기초연금이 약 17~18만원대가 돼요.
      </p>
      <p style={body}>
        정확한 금액은 <Link href="https://www.nps.or.kr" style={{ color: "#1D9E75" }}>국민연금공단</Link>에서 본인의 A급여액을 조회한 뒤 계산해봐야 해요. 복지로 모의계산기에서도 확인할 수 있어요.
      </p>

      <H2>연계감액이 불합리하다는 지적</H2>
      <p style={body}>
        연계감액의 가장 큰 문제는 "국민연금을 성실히 낸 사람이 손해 보는 구조"라는 거예요. 국민연금 보험료를 30년 넘게 납부한 사람은 A급여액이 높아서 기초연금이 크게 깎이죠.
      </p>
      <p style={body}>
        반면 국민연금에 아예 가입하지 않았거나 가입 기간이 짧은 사람은 연계감액 없이 기초연금 전액을 받아요. 결과적으로 국민연금을 안 낸 사람과 30년 낸 사람의 노후 소득 차이가 줄어드는 거죠.
      </p>
      <p style={body}>
        이런 이유로 <Link href="/w/기초연금-연계감액-폐지논의-현재기준" style={{ color: "#1D9E75" }}>연계감액 폐지 논의</Link>가 꾸준히 이루어지고 있어요. 다만 연간 추가 재정이 약 1조원 이상 필요해서 쉽게 결정되지 않고 있죠.
      </p>

      <Divider />

      <H2>자주 묻는 질문</H2>
      <FAQ items={FAQS} />

      <Divider />
      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 기초연금법과 보건복지부·국민연금공단 자료를 바탕으로 작성됐어요. A급여액은 매년 변동되니 국민연금공단에서 최신 금액을 확인하세요." />
    </ArticleLayout>
  );
}
