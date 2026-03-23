"use client";

// Q1. 기초연금을 받게 됐는데(또는 받을 예정인데) 정확히 얼마 받는지 알고 싶은 상황
// Q2. 단독·부부 각각 기초연금 수령액을 확인하고, 감액 사유를 이해해서 예상 금액을 파악할 수 있어야 함
// Q3. ① 기준연금액 349,360원 ② 부부감액 20% ③ 국민연금 연계감액 ④ 소득역전방지 감액 ⑤ 최소 지급액 50%
// Q4. GreenBox(수령액 요약) + BorderBox(감액 유형별 설명) + GreenBox(계산 예시) + FAQ

import Link from "next/link";
import {
  H2, GreenBox, BorderBox, Divider, body,
  FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 기초연금_SIDEBAR, 기초연금_HIGHLIGHT } from "@/data/기초연금-guide";

const FAQS = [
  {
    q: "기초연금 349,360원을 다 받는 사람은 얼마나 되나요?",
    a: "전체 수급자의 약 70% 정도가 기준연금액 전액을 받아요. 감액 없이 받으려면 국민연금 A급여액이 기준연금액의 150%(524,040원) 이하여야 하고, 소득역전방지 감액에도 해당하지 않아야 해요.",
  },
  {
    q: "부부가 둘 다 받으면 감액이 왜 되나요?",
    a: "부부가 한 지붕 아래 살면 생활비가 각각 사는 것보다 적게 드니까, 형평성 차원에서 20% 감액하는 거예요. 1인당 279,488원씩, 부부 합산 558,976원을 받게 돼요.",
  },
  {
    q: "국민연금을 월 50만원 받으면 기초연금은 얼마 받나요?",
    a: "국민연금 수령액이 아니라 A급여액으로 판단해요. A급여액이 524,040원(기준연금액의 150%) 이하이면 감액 없이 전액 받을 수 있어요. A급여액은 국민연금공단에서 확인할 수 있어요.",
  },
  {
    q: "기초연금이 매년 오르나요?",
    a: "매년 전국소비자물가변동률을 반영해서 기준연금액이 조정돼요. 2025년 334,810원에서 2026년 349,360원으로 약 4.3% 올랐어요.",
  },
  {
    q: "기초연금 받다가 소득이 늘면 어떻게 되나요?",
    a: "매년 소득·재산을 재조사해요. 소득인정액이 선정기준액을 넘으면 수급 자격이 정지돼요. 다시 기준 이하로 내려가면 재신청할 수 있어요.",
  },
];

const REFERENCES = [
  {
    category: "공식 자료",
    items: [
      { label: "보건복지부: 2026년 기초연금 기준연금액", url: "https://www.mohw.go.kr" },
      { label: "국민연금공단: 기초연금 안내", url: "https://www.nps.or.kr" },
      { label: "복지로: 기초연금", url: "https://www.bokjiro.go.kr" },
    ],
  },
  {
    category: "법령",
    items: [
      { label: "기초연금법 제5조(기초연금액 산정)", url: "https://www.law.go.kr/법령/기초연금법" },
    ],
  },
];

const RELATED = [
  { slug: "기초연금-부부-수령액-감액계산", title: "부부 기초연금 감액 계산", description: "부부가 둘 다 받을 때 감액 구조를 정리했어요." },
  { slug: "기초연금-최소지급액-감액사유", title: "기초연금 최소 지급액과 감액", description: "감액돼도 최소 얼마는 받을 수 있는지 정리했어요." },
  { slug: "기초연금-기준연금액-부가연금액-산정구조", title: "기준연금액과 부가연금액 차이", description: "기초연금 금액 산정 구조를 풀었어요." },
];

export default function Page() {
  return (
    <ArticleLayout sidebar={<Sidebar heading="기초연금 가이드" items={기초연금_SIDEBAR} highlightSlugs={기초연금_HIGHLIGHT} currentSlug="기초연금-수령액-단독-부부-계산법" />}>
      <nav style={{ fontSize: 13, color: "#6b7280", marginBottom: 8 }}>
        <Link href="/" style={{ color: "#6b7280" }}>홈</Link> &gt; <Link href="/w/기초연금" style={{ color: "#6b7280" }}>기초연금</Link> &gt; <span style={{ color: "#374151" }}>수령액</span>
      </nav>

      <h1 style={{ fontSize: 26, fontWeight: 800, color: "#111", lineHeight: 1.35, marginBottom: 4 }}>
        2026년 기초연금, 한 달에 얼마 받을까?
      </h1>
      <p style={{ fontSize: 17, color: "#1D9E75", fontWeight: 600, marginBottom: 20 }}>
        단독·부부 수령액과 계산법
      </p>

      <p style={body}>
        기초연금 자격이 된다는 건 알겠는데, 실제로 매달 얼마가 통장에 찍히는지 궁금하시죠. 2026년 기준연금액은 월 349,360원이에요. 하지만 모든 수급자가 이 금액을 다 받는 건 아니에요.
      </p>
      <p style={body}>
        부부감액, 국민연금 연계감액, 소득역전방지 감액 등 3가지 감액 요소가 있어서, 본인 상황에 따라 실제 수령액이 달라져요. 어떤 감액이 적용되는지 하나씩 풀어볼게요.
      </p>

      <ArticleAd position="intro" />
      <Divider />

      <H2>단독·부부 수령액, 2026년 기준</H2>
      <p style={body}>
        감액 없이 받을 수 있는 최대 금액은 단독 349,360원, 부부는 1인당 279,488원이에요. 부부 모두 수급자이면 각각 20%씩 감액되기 때문에 1인당 금액이 줄어들어요.
      </p>

      <GreenBox>
        <strong>2026년 기초연금 수령액</strong><br /><br />
        단독가구: 최대 월 349,360원<br />
        부부가구: 각각 20% 감액 → 1인당 월 279,488원<br />
        부부 합산: 월 558,976원<br /><br />
        지급일: 매월 25일 (주말·공휴일이면 앞당김)<br />
        기준연금액은 매년 물가상승률 반영하여 조정돼요
      </GreenBox>

      <p style={body}>
        단독가구로 349,360원 전액을 받으려면 국민연금 A급여액이 524,040원(기준연금액의 150%) 이하여야 하고, 소득인정액이 선정기준액에서 기준연금액을 뺀 값 이하여야 해요.
      </p>

      <Divider />

      <H2>감액이 되는 3가지 경우</H2>
      <p style={body}>
        기초연금은 세 가지 이유로 감액될 수 있어요. 모두 해당하지 않으면 전액을 받고, 하나라도 해당하면 감액된 금액을 받게 되죠.
      </p>

      <BorderBox>
        <strong>기초연금 감액 3가지</strong><br /><br />
        <strong>1. 부부감액 (20%)</strong><br />
        부부 모두 수급자이면 각각 20% 감액<br />
        349,360원 x 80% = 279,488원 (1인당)<br /><br />
        <strong>2. 국민연금 연계감액</strong><br />
        국민연금 A급여액이 기준연금액의 150%(524,040원) 초과 시<br />
        초과 구간에 따라 기초연금이 단계적으로 줄어듦<br />
        최대 감액 시에도 기준연금액의 50%(174,680원)는 보장<br /><br />
        <strong>3. 소득역전방지 감액</strong><br />
        소득인정액 + 기초연금 합계가 선정기준액을 넘을 때 적용<br />
        기준선 바로 아래 수급자보다 소득이 많아지는 걸 방지
      </BorderBox>

      <p style={body}>
        대부분의 수급자는 감액 없이 전액을 받아요. <Link href="/w/기초연금-연계감액-계산-A급여액" style={{ color: "#1D9E75", fontWeight: 600 }}>국민연금 연계감액</Link>이 적용되는 건 국민연금을 비교적 많이 받는 분에게 해당하는 이야기예요.
      </p>

      <CategoryButton label="기초연금 가이드" count={기초연금_SIDEBAR.length} href="/w/기초연금" />
      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      <H2>계산법, 내가 받을 금액 이렇게 계산해요</H2>
      <p style={body}>
        기초연금액은 기준연금액에서 감액 요소를 빼는 방식으로 산정돼요. 국민연금을 받지 않거나 적게 받는 분은 대부분 기준연금액 전액을 받아요.
      </p>

      <GreenBox>
        <strong>수령액 계산 예시</strong><br /><br />
        <strong>사례 1: 국민연금 없는 단독 수급자</strong><br />
        기초연금 = 349,360원 (전액)<br /><br />
        <strong>사례 2: 국민연금 월 40만원 받는 단독 수급자</strong><br />
        A급여액이 524,040원 이하이면 → 349,360원 (전액)<br /><br />
        <strong>사례 3: 부부 모두 수급, 국민연금 없음</strong><br />
        각각 349,360원 x 80% = 279,488원<br />
        부부 합산 558,976원
      </GreenBox>

      <p style={body}>
        국민연금 A급여액이 524,040원을 넘는 경우에만 연계감액이 시작돼요. A급여액은 국민연금 전체 수령액이 아니라 가입 기간 중 평균소득의 일부를 반영한 금액이에요. 국민연금공단(1355)에 전화하면 본인의 A급여액을 확인할 수 있어요.
      </p>

      <Divider />

      <H2>최소 지급액, 감액돼도 이만큼은 보장돼요</H2>
      <p style={body}>
        감액이 적용되더라도 기준연금액의 50%인 174,680원은 보장돼요. 아무리 국민연금을 많이 받아도, 기초연금 수급자격이 있는 한 최소 이 금액은 받을 수 있죠.
      </p>
      <p style={body}>
        <Link href="/w/기초연금-최소지급액-감액사유" style={{ color: "#1D9E75", fontWeight: 600 }}>최소 지급액과 감액 사유</Link>에서 더 자세히 확인할 수 있어요. 소득역전방지 감액은 별도 최소 보장이 적용되지 않으니 주의하세요.
      </p>
      <p style={body}>
        매년 물가상승률을 반영해서 기준연금액이 올라가니, 최소 지급액도 함께 올라가요. 2025년에는 최소 167,410원이었는데 2026년에는 174,680원으로 올랐어요.
      </p>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 보건복지부 고시 기준으로 작성했어요. 개인별 수령액은 국민연금 가입 이력, 소득인정액 등에 따라 달라지니 국민연금공단(1355) 또는 주민센터에서 정확히 확인하세요." />
    </ArticleLayout>
  );
}
