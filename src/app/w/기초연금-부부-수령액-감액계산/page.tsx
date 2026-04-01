"use client";
import { Divider } from "@/components/article-ui/Divider";
import { BorderBox } from "@/components/article-ui/BorderBox";

// Q1. 부부 둘 다 65세 이상인데 기초연금을 둘 다 받으면 감액된다고 해서, 얼마나 줄어드는지 궁금한 상황
// Q2. 부부 수령액과 감액 구조를 이해하고, 부부 합산 예상 금액을 파악할 수 있어야 함
// Q3. ① 부부감액 20% ② 1인당 279,488원 ③ 부부 합산 558,976원 ④ 부부가구 선정기준액 395만2천원 ⑤ 한 명만 수급 시 감액 없음
// Q4. GreenBox(부부 수령액 요약) + BorderBox(감액 계산 예시) + FAQ

import Link from "next/link";
import {
  H2, GreenBox, BorderBox, Divider, body,
  FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 기초연금_SIDEBAR, 기초연금_HIGHLIGHT } from "@/data/기초연금-guide";

const FAQS = [
  {
    q: "부부 중 한 명만 자격이 되면 감액이 없나요?",
    a: "맞아요. 한 명만 수급자이면 단독가구 기준이 적용돼서 349,360원 전액을 받을 수 있어요. 부부감액은 둘 다 수급자일 때만 적용돼요.",
  },
  {
    q: "부부감액 20%가 아까운데, 한 명이 포기하면 유리한가요?",
    a: "수학적으로는 불리해요. 한 명이 포기하면 349,360원만 받지만, 둘 다 받으면 감액돼도 합산 558,976원이에요. 포기할 이유가 없어요.",
  },
  {
    q: "별거 중인 부부도 부부감액이 적용되나요?",
    a: "법적으로 혼인 관계가 유지되고 있으면 부부감액이 적용돼요. 별거 중이라도 이혼하지 않았으면 부부가구로 산정하죠. 이혼 후에는 각각 단독가구가 돼요.",
  },
  {
    q: "사실혼 관계도 부부로 보나요?",
    a: "사실혼 관계도 부부가구로 산정해요. 주민등록상 동일 주소지에 거주하면서 사실혼 관계로 인정되면 부부가구 기준이 적용되고, 부부감액도 적용돼요.",
  },
  {
    q: "부부감액이 폐지될 수 있나요?",
    a: "국회에서 부부감액 폐지·축소 법안이 여러 번 발의됐어요. 아직 통과되지는 않았지만, 10%로 축소하거나 폐지하는 방향의 논의가 계속되고 있어요.",
  },
  {
    q: "배우자가 사망하면 바로 전액으로 바뀌나요?",
    a: "배우자 사망 후 단독가구로 전환되면 감액 없이 전액을 받게 돼요. 사망 신고 후 주민센터에 변경 신고를 하면 적용돼요. 변경된 달부터 전액 지급이에요.",
  },
];

const REFERENCES = [
  {
    category: "공식 자료",
    items: [
      { label: "보건복지부: 기초연금 부부감액 안내", url: "https://www.mohw.go.kr" },
      { label: "복지로: 기초연금 수령액", url: "https://www.bokjiro.go.kr" },
    ],
  },
  {
    category: "법령",
    items: [
      { label: "기초연금법 제8조(감액)", url: "https://www.law.go.kr/법령/기초연금법" },
    ],
  },
];

const RELATED = [
  { slug: "기초연금-수령액-단독-부부-계산법", title: "기초연금 수령액과 계산법", description: "단독·부부 전체 수령액 계산을 정리했어요." },
  { slug: "기초연금-부부감액-20-기준-축소계획", title: "부부감액 20% 기준과 축소 계획", description: "감액 축소·폐지 논의를 정리했어요." },
  { slug: "기초연금-부부가구-소득인정액-기준", title: "부부가구 소득인정액 기준", description: "부부가구의 소득인정액 산정 방법이에요." },
];

export default function Page() {
  return (
    <ArticleLayout sidebar={<Sidebar heading="기초연금 가이드" items={기초연금_SIDEBAR} highlightSlugs={기초연금_HIGHLIGHT} currentSlug="기초연금-부부-수령액-감액계산" />}>
      <nav style={{ fontSize: 13, color: "#6b7280", marginBottom: 8 }}>
        <Link href="/" style={{ color: "#6b7280" }}>홈</Link> &gt; <Link href="/w/기초연금" style={{ color: "#6b7280" }}>기초연금</Link> &gt; <span style={{ color: "#374151" }}>부부 감액</span>
      </nav>

      <h1 style={{ fontSize: 26, fontWeight: 800, color: "#111", lineHeight: 1.35, marginBottom: 4 }}>
        기초연금 부부가 둘 다 받으면?
      </h1>
      <p style={{ fontSize: 17, color: "#1D9E75", fontWeight: 600, marginBottom: 20 }}>
        부부 수령액과 감액 계산
      </p>

      <p style={body}>
        부부 둘 다 기초연금 자격이 되면 각각 받을 수 있는데, 한 가지 아쉬운 점이 있어요. 부부가 모두 수급자이면 각각 20%씩 감액되는 "부부감액" 제도가 있거든요.
      </p>
      <p style={body}>
        그래도 포기하면 손해예요. 감액돼도 부부 합산 금액은 단독 1명보다 훨씬 많으니까요. 정확히 얼마 받는지, 감액 구조가 어떻게 되는지 정리해볼게요.
      </p>

      <ArticleAd position="intro" />
      <Divider />

      <H2>부부 수령액, 2026년 기준 얼마일까?</H2>
      <p style={body}>
        2026년 기준연금액은 월 349,360원이에요. 부부 모두 수급자이면 각각 20% 감액해서 1인당 279,488원, 부부 합산 558,976원을 받게 돼요.
      </p>

      <GreenBox>
        <strong>2026년 기초연금 부부 수령액</strong><br /><br />
        단독 수급: 349,360원 (감액 없음)<br />
        부부 모두 수급: 각각 279,488원 (20% 감액)<br />
        부부 합산: 558,976원<br /><br />
        부부감액으로 줄어드는 금액: 1인당 69,872원<br />
        부부 합산 감액액: 139,744원
      </GreenBox>

      <p style={body}>
        부부감액은 기초연금법 제8조에 근거해요. 같이 사는 부부는 생활비가 각각 사는 것보다 적게 든다는 논리인데, 수급자 입장에서는 아쉬운 부분이죠.
      </p>

      <Divider />

      <H2>감액 계산, 이렇게 돼요</H2>
      <p style={body}>
        부부감액은 기준연금액에서 20%를 빼는 단순한 구조예요. 다만 국민연금 연계감액이 먼저 적용되고, 그 다음에 부부감액이 적용돼요.
      </p>

      <BorderBox>
        <strong>부부감액 계산 예시</strong><br /><br />
        <strong>사례 1: 부부 모두 국민연금 없음</strong><br />
        각각 349,360원 x 80% = 279,488원<br />
        부부 합산: 558,976원<br /><br />
        <strong>사례 2: 남편 국민연금 연계감액 적용, 아내 없음</strong><br />
        남편: 연계감액 후 금액 x 80% (부부감액 추가 적용)<br />
        아내: 349,360원 x 80% = 279,488원<br /><br />
        <strong>사례 3: 한 명만 수급자</strong><br />
        수급자: 349,360원 (부부감액 미적용)<br />
        비수급자: 0원
      </BorderBox>

      <p style={body}>
        연계감액과 부부감액이 동시에 적용되면 실제 수령액이 꽤 줄어들 수 있어요. 하지만 최소 지급액(기준연금액의 50%, 174,680원)은 보장되니, 이 금액 아래로는 내려가지 않아요.
      </p>

      <CategoryButton label="기초연금 가이드" count={기초연금_SIDEBAR.length} href="/w/기초연금" />
      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      <H2>부부감액이 없어지면 좋겠는데, 가능성은?</H2>
      <p style={body}>
        국회에서 부부감액 폐지·축소 법안이 여러 차례 발의됐어요. 20%를 10%로 줄이자는 안, 아예 폐지하자는 안 모두 나왔지만 아직 통과된 건 없어요.
      </p>
      <p style={body}>
        <Link href="/w/기초연금-부부감액-20-기준-축소계획" style={{ color: "#1D9E75", fontWeight: 600 }}>부부감액 축소 계획</Link>이 통과되면 부부 수급자에게 유리해져요. 다만 재원 문제와 형평성 논의가 맞물려 있어서 단기간에 폐지되기는 쉽지 않은 상황이에요.
      </p>
      <p style={body}>
        감액이 아쉽더라도, 한 명이 포기하는 건 절대 불리해요. 한 명 포기 시 349,360원 vs 둘 다 수급 시 558,976원이니까, 약 21만원 차이가 나죠. 무조건 둘 다 신청하는 게 맞아요.
      </p>

      <Divider />

      <H2>부부가구 선정기준액도 따로 있어요</H2>
      <p style={body}>
        부부가 함께 기초연금을 받으려면 부부가구 선정기준액 이하여야 해요. 2026년 기준 부부가구 선정기준액은 월 395만2천원으로, 단독가구(247만원)보다 높죠.
      </p>
      <p style={body}>
        부부가구의 소득인정액은 부부 소득·재산을 합산해서 계산해요. <Link href="/w/기초연금-부부가구-소득인정액-기준" style={{ color: "#1D9E75", fontWeight: 600 }}>부부가구 소득인정액 기준</Link>에서 합산 방법을 자세히 정리했어요.
      </p>
      <p style={body}>
        부부 중 한 명이 탈락하고 한 명만 수급자가 되면, 수급자는 단독가구 기준으로 전액(349,360원)을 받아요. 이 경우 부부감액은 적용되지 않아요.
      </p>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 기초연금법을 기준으로 작성했어요. 부부감액 비율이나 제도는 법 개정에 따라 변경될 수 있으니 보건복지부 발표를 확인하세요." />
    </ArticleLayout>
  );
}
