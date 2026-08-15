"use client";
// Q1: 주택연금을 받고 있거나 가입 예정인데 기초연금도 같이 받을 수 있는지 궁금한 어르신
// Q2: 동시 수령 가능 여부 확인 + 우대형 주택연금 혜택 파악 + 유리한 선택
// Q3: 주택연금의 소득인정액 반영 방식, 우대형 주택연금 조건, 동시 수령 시 유불리
// Q4: GreenBox(결론) + BorderBox(비교) + EligibilityChecker(우대형 자격) + FAQ

import Link from "next/link";
import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  EligibilityChecker, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 기초연금_SIDEBAR, 기초연금_HIGHLIGHT } from "@/data/기초연금-guide";

const CHECK_ITEMS = [
  { id: "c1", label: "만 65세 이상이에요" },
  { id: "c2", label: "1.5억 원 이하 주택을 소유하고 있어요" },
  { id: "c3", label: "기초연금 수급자(또는 수급 예정자)예요" },
  { id: "c4", label: "부부 기준 1주택자예요" },
];

const FAQS = [
  {
    q: "주택연금 받으면 기초연금 소득인정액에 잡히나요?",
    a: "주택연금 수령액 자체는 부채로 처리되는 부분이 있어서 전액 소득으로 잡히지 않아요. 다만 주택 시가가 재산으로 반영되기 때문에 전체 소득인정액은 올라갈 수 있죠.",
  },
  {
    q: "우대형 주택연금은 일반형보다 얼마나 더 받나요?",
    a: "같은 주택 가격 기준으로 일반형 대비 월 수령액이 약 20% 더 많아요. 예를 들어 시가 1억 원 주택이면 일반형 월 약 40만 원, 우대형 월 약 48만 원 정도이죠. 주택 가격과 나이에 따라 차이가 나요.",
  },
  {
    q: "우대형 주택연금을 받다가 기초연금에서 탈락하면?",
    a: "기초연금 수급 자격을 잃으면 우대형 자격도 상실돼요. 이 경우 일반형 주택연금으로 전환되고 월 수령액이 줄어들죠.",
  },
  {
    q: "주택연금을 받으면 집을 팔 수 없나요?",
    a: "주택연금 가입 중에는 집을 팔 수 없어요. 매도하려면 주택연금을 해지하고 받은 금액을 정산해야 하죠. 해지 후에는 기초연금 소득인정액도 재산정되고요.",
  },
  {
    q: "부부가 각각 주택연금과 기초연금을 받을 수 있나요?",
    a: "주택연금은 주택 소유자(또는 배우자) 명의로 가입하고, 기초연금은 부부 각각 신청할 수 있어요. 다만 기초연금은 부부가구 소득인정액 합산 기준(395.2만 원)을 적용하죠.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "기초연금법 제3조: 수급권자 범위", url: "https://www.law.go.kr/법령/기초연금법" },
      { label: "한국주택금융공사법: 주택연금 근거", url: "https://www.law.go.kr/법령/한국주택금융공사법" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "한국주택금융공사: 주택연금 안내", url: "https://www.hf.go.kr" },
      { label: "복지로: 기초연금 신청", url: "https://www.bokjiro.go.kr" },
    ],
  },
];

const RELATED = [
  {
    slug: "기초연금-수급자격-선정기준액-소득조건",
    title: "기초연금 수급자격 선정기준액",
    description: "소득인정액 기준과 재산 반영 방식을 자세히 정리했어요.",
  },
  {
    slug: "기초연금-소득인정액-계산-공제항목",
    title: "기초연금 소득인정액 계산",
    description: "주택 등 재산이 소득인정액에 어떻게 반영되는지 풀어놨어요.",
  },
  {
    slug: "기초연금-감면혜택-추가지원",
    title: "기초연금 감면 혜택과 추가 지원",
    description: "기초연금 수급자가 받을 수 있는 추가 혜택을 한 번에 정리했어요.",
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
          currentSlug="기초연금-주택연금-동시수령-우대형혜택"
        />
      }
    >
      <nav style={{ fontSize: 13, color: "#6b7280", marginBottom: 8 }}>
        <Link href="/" style={{ color: "#6b7280" }}>홈</Link> &gt;{" "}
        <Link href="/w/기초연금" style={{ color: "#6b7280" }}>기초연금</Link> &gt;{" "}
        <span style={{ color: "#374151" }}>주택연금 동시 수령</span>
      </nav>

      <h1 style={{ fontSize: 26, fontWeight: 800, color: "#111", lineHeight: 1.35, marginBottom: 4 }}>
        주택연금 받으면서 기초연금도 될까?
      </h1>
      <p style={{ fontSize: 17, color: "#1D9E75", fontWeight: 600, marginBottom: 20 }}>
        동시 수령 조건과 우대형 주택연금 혜택
      </p>

      <p style={body}>
        집 한 채가 재산의 전부인데, 주택연금으로 생활비를 마련하면서 기초연금도 받을 수 있는지 궁금하죠.
        &quot;주택연금이 소득으로 잡히면 기초연금에서 탈락하는 거 아닌가?&quot; 걱정하는 분도 많고요.
      </p>
      <p style={body}>
        결론부터 말하면, <strong>주택연금과 기초연금은 동시에 받을 수 있어요.</strong>{" "}
        주택연금 수령액이 소득인정액에 전부 반영되는 게 아니라서, 기초연금 선정기준을 넘기지 않는 경우가 많거든요.
        게다가 기초연금 수급자는 <strong>우대형 주택연금</strong>에 가입하면 일반형보다 약 20% 더 많이 받을 수 있죠.
      </p>

      <ArticleAd position="intro" />
      <Divider />

      <H2>동시 수령이 가능한 이유</H2>
      <SectionBadge>소득인정액 반영</SectionBadge>

      <p style={body}>
        주택연금은 집을 담보로 매월 연금을 받는 제도예요. 핵심은 주택연금 수령액의 소득인정액 반영 방식이죠.
        주택연금으로 받는 돈은 일종의 대출(역모기지)이기 때문에, 받은 금액 중 일부가 부채로 처리돼요.
      </p>
      <p style={body}>
        주택 시가에서 주택연금 누적 인출액(부채)을 빼고 남은 순재산만 재산으로 잡히는 구조이죠.
        그래서 주택연금을 오래 받을수록 순재산이 줄어들고, 기초연금{" "}
        <Link href="/w/기초연금-소득인정액-계산-공제항목" style={{ color: "#1D9E75", textDecoration: "underline" }}>소득인정액</Link>도 낮아지는 효과가 있어요.
      </p>
      <p style={body}>
        시가 3억 원 이하 주택이라면 동시 수급 가능성이 높고, 시가가 높더라도 다른 소득이나 재산이 적으면 기준 이하가 될 수 있어요. 정확한 판단은 국민연금공단(1355)에서 모의 계산을 해보는 게 가장 빠르죠.
      </p>

      <GreenBox>
        주택연금 수령액은 부채로 처리 → 순재산만 소득인정액 반영<br />
        주택연금 오래 받을수록 순재산 감소 → 기초연금 유리<br />
        동시 수급 가능 여부는 전체 소득인정액으로 판단
      </GreenBox>

      <Divider />

      <H2>우대형 주택연금은 뭐가 다른가요?</H2>
      <SectionBadge>우대형 혜택</SectionBadge>

      <p style={body}>
        우대형 주택연금은 기초연금 수급자를 위한 특별 상품이에요.{" "}
        <a href="https://www.hf.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>한국주택금융공사</a>에서 운영하고,
        일반형 대비 월 수령액이 약 20% 더 많죠.
      </p>
      <p style={body}>
        가입 조건은 세 가지예요. 시가 1.5억 원 이하 주택 소유, 부부 기준 1주택, 기초연금 수급자(또는 수급 예정자)여야 하죠.
        이 세 조건을 모두 충족하면 우대형에 가입할 수 있어요.
      </p>
      <p style={body}>
        우대형의 장점은 단순히 월 수령액이 많다는 것만이 아니에요. 기초연금과 함께 받으면 매월 기초연금 약 35만 원 + 우대형 주택연금 수령액을 합산해서 안정적인 노후 소득을 확보할 수 있죠.
      </p>

      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="우대형 주택연금 가입 조건을 충족해요. 한국주택금융공사(1688-8114)에 상담 신청하세요."
        partialMatchText="일부 조건이 충족되지 않았어요. 체크 안 된 항목을 확인해 보세요."
      />

      <CategoryButton label="기초연금 정보" count={기초연금_SIDEBAR.length} href="/category/기초연금" />
      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      <H2>일반형 vs 우대형 어떤 게 유리할까?</H2>

      <p style={body}>
        우대형 자격이 되면 당연히 우대형이 유리해요. 같은 주택을 담보로 넣어도 월 수령액이 약 20% 더 많으니까요. 다만 우대형은 주택 시가 1.5억 원 이하라는 조건이 있어서 대상이 제한적이에요.
      </p>
      <p style={body}>
        시가 1.5억 원을 넘는 주택이라면 일반형으로 가입해야 하는데, 일반형이라도 주택연금 자체가 기초연금 탈락 사유가 되지는 않아요.
        오히려 주택연금 가입으로 주택 순재산이 줄어들면서 기초연금 수급에 유리해질 수 있죠.
      </p>
      <p style={body}>
        주의할 점은 우대형 가입 후 기초연금에서 탈락하면 우대형 자격도 상실되고 일반형으로 전환된다는 거예요. 전환되면 월 수령액이 줄어드니, 기초연금 수급 유지가 중요하죠.
      </p>

      <BorderBox>
        <strong>일반형</strong>: 시가 제한 없음, 월 수령액 기본<br />
        <strong>우대형</strong>: 시가 1.5억 이하 + 기초연금 수급자, 월 수령액 약 20% 증가<br />
        우대형 가입 후 기초연금 탈락 시 → 일반형으로 전환
      </BorderBox>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        주택연금과 기초연금 동시 수령에 대해 자주 나오는 질문이에요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2025년 기준 기초연금법과 한국주택금융공사 자료를 바탕으로 작성됐어요. 우대형 주택연금 세부 조건은 변경될 수 있으니, 한국주택금융공사(1688-8114)에 확인하세요." />
    </ArticleLayout>
  );
}
