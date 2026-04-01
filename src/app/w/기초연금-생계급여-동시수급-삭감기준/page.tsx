"use client";
import { Divider } from "@/components/article-ui/Divider";
import { BorderBox } from "@/components/article-ui/BorderBox";

// Q1: 기초연금이랑 생계급여를 동시에 받고 있는데 혹시 깎이는 건 아닌지 걱정되는 어르신/보호자
// Q2: 동시 수급 가능 여부와 삭감 구조를 이해하고, 실제 수령액을 파악
// Q3: 기초연금이 소득으로 잡히는 구조, 생계급여 삭감 계산, 총수령액 변화
// Q4: GreenBox(결론) + BorderBox(계산 구조) + Checklist + FAQ

import Link from "next/link";
import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 기초연금_SIDEBAR, 기초연금_HIGHLIGHT } from "@/data/기초연금-guide";

const CHECKLIST_ITEMS = [
  "기초연금 수급 여부 확인 (매월 25일 입금)",
  "생계급여 산정 시 기초연금이 소득으로 반영되는지 주민센터에 확인",
  "기초연금 수급 후 생계급여 변동 통지서 확인",
  "총수령액(기초연금 + 생계급여)이 기존보다 줄지 않았는지 비교",
  "변동이 크면 주민센터에 이의 제기 가능",
];

const FAQS = [
  {
    q: "기초연금을 받으면 생계급여가 그만큼 줄어드나요?",
    a: "맞아요. 기초연금이 소득인정액에 포함되기 때문에 생계급여 산정 시 그만큼 차감되죠. 다만 총수령액은 기초연금 없을 때보다 같거나 약간 많아지는 구조예요.",
  },
  {
    q: "기초연금이랑 생계급여를 동시에 못 받는 건 아닌가요?",
    a: "동시에 받을 수 있어요. 기초연금은 별도 지급되고, 생계급여가 기초연금만큼 조정될 뿐이에요. 둘 다 매월 수령하는 건 가능하죠.",
  },
  {
    q: "기초연금을 포기하면 생계급여를 더 받을 수 있나요?",
    a: "이론적으로는 가능하지만 손해예요. 기초연금을 안 받으면 생계급여가 늘어나지만, 총합은 기초연금을 받을 때보다 줄어들거나 같아지거든요.",
  },
  {
    q: "부부가 둘 다 기초연금과 생계급여를 받으면 삭감이 더 큰가요?",
    a: "부부 각각의 기초연금이 소득으로 잡히니 삭감 폭은 커질 수 있어요. 하지만 기초연금 부부감액(각 20%)이 적용되고, 생계급여도 부부가구 기준으로 산정되기 때문에 개별 상황마다 달라지죠.",
  },
  {
    q: "생계급여 말고 주거급여나 의료급여도 영향받나요?",
    a: "주거급여와 의료급여는 별도 기준으로 산정돼서 기초연금 때문에 바로 탈락하지는 않아요. 다만 소득인정액이 올라가면 등급이 변동될 수 있으니 개별 확인이 필요하죠.",
  },
  {
    q: "삭감된 생계급여 금액은 어디서 확인하나요?",
    a: "주민센터에서 생계급여 결정통지서를 받을 수 있고, 복지로(bokjiro.go.kr)에서도 수급 이력을 조회할 수 있어요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "기초연금법 제3조: 수급권자 범위", url: "https://www.law.go.kr/법령/기초연금법" },
      { label: "국민기초생활보장법 제8조: 생계급여 산정", url: "https://www.law.go.kr/법령/국민기초생활보장법" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "보건복지부: 기초연금 제도 안내", url: "https://www.mohw.go.kr" },
      { label: "복지로: 생계급여 안내", url: "https://www.bokjiro.go.kr" },
    ],
  },
];

const RELATED = [
  {
    slug: "기초연금-수급자격-선정기준액-소득조건",
    title: "기초연금 수급자격 선정기준액",
    description: "기초연금 대상이 되는 소득인정액 기준을 자세히 정리했어요.",
  },
  {
    slug: "기초연금-감면혜택-추가지원",
    title: "기초연금 감면 혜택과 추가 지원",
    description: "기초연금 외에 받을 수 있는 추가 혜택을 한 번에 정리했어요.",
  },
  {
    slug: "기초연금-소득인정액-계산-공제항목",
    title: "기초연금 소득인정액 계산",
    description: "소득인정액이 어떻게 계산되는지 공제 항목까지 풀어놨어요.",
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
          currentSlug="기초연금-생계급여-동시수급-삭감기준"
        />
      }
    >
      <nav style={{ fontSize: 13, color: "#6b7280", marginBottom: 8 }}>
        <Link href="/" style={{ color: "#6b7280" }}>홈</Link> &gt;{" "}
        <Link href="/w/기초연금" style={{ color: "#6b7280" }}>기초연금</Link> &gt;{" "}
        <span style={{ color: "#374151" }}>생계급여 동시 수급</span>
      </nav>

      <h1 style={{ fontSize: 26, fontWeight: 800, color: "#111", lineHeight: 1.35, marginBottom: 4 }}>
        기초연금이랑 생계급여 같이 받으면 깎일까?
      </h1>
      <p style={{ fontSize: 17, color: "#1D9E75", fontWeight: 600, marginBottom: 20 }}>
        동시 수급 가능 여부와 삭감 기준
      </p>

      <p style={body}>
        기초연금을 새로 받게 됐는데, 그러면 지금 받고 있는 생계급여가 줄어드는 건 아닌지 불안하죠.
        &quot;하나 받으면 하나 깎이는 거 아니야?&quot;라는 걱정이 많고요.
      </p>
      <p style={body}>
        결론부터 말하면, <strong>기초연금과 생계급여는 동시에 받을 수 있어요.</strong>{" "}
        다만 기초연금이 소득으로 잡히기 때문에 생계급여가 그만큼 줄어드는 구조예요.
        <a href="https://www.law.go.kr/법령/국민기초생활보장법" style={{ color: "#1D9E75", textDecoration: "underline" }}>국민기초생활보장법 제8조</a>에 따라
        생계급여는 &quot;기준 중위소득 - 소득인정액&quot;으로 산정되니까, 기초연금이 소득인정액에 들어가면 생계급여가 조정되는 거죠.
      </p>

      <ArticleAd position="intro" />
      <Divider />

      <H2>동시 수급은 가능하지만 생계급여가 조정돼요</H2>
      <SectionBadge>삭감 구조</SectionBadge>

      <p style={body}>
        기초연금과 생계급여는 서로 다른 법률에 근거한 별개의 급여예요. 기초연금은 기초연금법, 생계급여는 국민기초생활보장법에 따라 지급되죠. 그래서 둘 다 수급 자격이 되면 동시에 받을 수 있어요.
      </p>
      <p style={body}>
        문제는 생계급여 산정 방식이에요. 생계급여는 &quot;기준 중위소득의 일정 비율 - 소득인정액&quot;으로 계산되는데, 기초연금 수령액이 소득인정액에 포함돼요. 그래서 기초연금을 받기 시작하면 소득인정액이 올라가고, 생계급여가 그만큼 줄어들죠.
      </p>
      <p style={body}>
        쉽게 말하면, 기초연금 349,360원을 받으면 생계급여가 비슷한 금액만큼 줄어드는 셈이에요. &quot;그럼 받으나 마나 아닌가?&quot; 싶지만, 총수령액은 기초연금을 안 받을 때보다 같거나 조금 더 많아지는 구조이기 때문에 기초연금을 포기할 이유는 없어요.
      </p>

      <GreenBox>
        기초연금 + 생계급여 = 동시 수급 가능<br />
        기초연금 수령액이 소득으로 반영 → 생계급여 삭감<br />
        총수령액은 기초연금 없을 때보다 같거나 약간 많음
      </GreenBox>

      <Divider />

      <H2>삭감 구조는 어떻게 되나요?</H2>
      <SectionBadge>계산 방법</SectionBadge>

      <p style={body}>
        생계급여 계산 공식을 보면 구조가 명확해져요.
        생계급여 = 생계급여 선정기준 - 소득인정액이죠. 여기서 소득인정액에 기초연금이 포함되는 거예요.
      </p>
      <p style={body}>
        예를 들어 기초연금을 받기 전 소득인정액이 50만 원이고, 1인 가구 생계급여 선정기준이 약 71만 원이라면 생계급여는 21만 원이에요.
        기초연금 349,360원을 받기 시작하면 소득인정액이 약 85만 원으로 올라가서, 생계급여 선정기준(71만 원)을 넘기게 되죠.
        이 경우 생계급여는 0원이 되지만, 기초연금 34만 원을 받으니 총수령액은 오히려 늘어나요.
      </p>
      <p style={body}>
        반대로 소득인정액이 아주 낮은 경우에는 기초연금을 더해도 선정기준 아래에 머물 수 있어서, 생계급여가 줄어들되 0원까지 가지는 않을 수도 있죠.
        개인마다 소득인정액이 다르기 때문에 정확한 삭감 금액은 주민센터에서 확인하는 게 가장 정확해요.
      </p>

      <BorderBox>
        <strong>삭감 공식</strong><br />
        생계급여 = 선정기준 - (기존 소득인정액 + 기초연금)<br />
        기초연금이 들어오면 소득인정액 상승 → 생계급여 감소<br />
        총수령(기초연금 + 생계급여)은 기존 총수령 이상 유지
      </BorderBox>

      <CategoryButton label="기초연금 정보" count={기초연금_SIDEBAR.length} href="/category/기초연금" />
      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      <H2>생계급여 수급자가 체크해야 할 것들</H2>
      <SectionBadge>수급 관리</SectionBadge>

      <p style={body}>
        기초연금을 새로 받게 되면 주민센터에서 생계급여 재산정 통보가 와요. 이때 삭감된 금액이 맞는지 꼭 확인하세요.
        산정이 잘못된 경우가 간혹 있고, 이의 제기로 바로잡을 수 있거든요.
      </p>
      <p style={body}>
        기초연금을 받더라도 생계급여 수급 자체에서 탈락하는 건 아니에요. 다만 소득인정액이 선정기준을 넘기면 생계급여가 0원이 되는 거죠. 의료급여나 주거급여는 별도 기준이라 함께 확인하는 게 좋아요.
      </p>
      <p style={body}>
        총수령액이 줄었다고 느껴지면 반드시 주민센터에 문의하세요. 기초연금 부부감액, 소득역전방지 감액 등이 겹치면 계산이 복잡해지기 때문에 담당자에게 내역을 정확히 확인받는 게 중요하죠.
      </p>

      <Checklist items={CHECKLIST_ITEMS} />

      <Divider />

      <H2>기초연금을 포기하면 생계급여가 더 나올까?</H2>

      <p style={body}>
        기초연금을 안 받으면 소득인정액이 낮아지니 생계급여가 늘어나는 건 맞아요. 하지만 늘어나는 생계급여 금액이 기초연금보다 적거나 같기 때문에, 총수령액으로 보면 기초연금을 받는 게 유리하죠.
      </p>
      <p style={body}>
        쉽게 비유하면 &quot;왼쪽 주머니에서 오른쪽 주머니로 옮기는&quot; 것에 가까워요. 기초연금을 받으면 생계급여가 줄지만, 기초연금이 그 자리를 채우니 손해는 아닌 셈이에요.
      </p>
      <p style={body}>
        예외적으로 기초연금이 소득인정액에 반영되면서 의료급여 등급이 변동되는 경우가 있을 수 있으니, 이런 상황이라면 주민센터에서 전체적인 수급 상황을 점검받는 게 좋죠.
      </p>

      <GreenBox>
        기초연금 포기 = 생계급여 증가분보다 기초연금이 크므로 총수령 감소<br />
        기초연금은 받는 게 유리 (총수령액 기준)<br />
        의료급여, 주거급여 등급 변동은 별도 확인 필요
      </GreenBox>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        기초연금과 생계급여 동시 수급에 대해 자주 나오는 질문이에요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2025년 기준 기초연금법과 국민기초생활보장법을 바탕으로 작성됐어요. 개인별 삭감 금액은 소득인정액에 따라 다르니, 주민센터에서 정확한 산정 내역을 확인하세요." />
    </ArticleLayout>
  );
}
