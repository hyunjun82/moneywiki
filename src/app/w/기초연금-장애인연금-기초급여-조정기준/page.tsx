"use client";
import { BorderBox } from "@/components/article-ui/BorderBox";

// Q1: 65세가 되면서 장애인연금과 기초연금이 중복되는데 어떻게 되는지 궁금한 중증장애인
// Q2: 65세 이후 장애인연금 기초급여가 기초연금으로 전환되는 구조를 이해하고 손해 여부 판단
// Q3: 기초급여 중단 + 기초연금 전환 구조, 부가급여 유지 여부, 실수령액 변화
// Q4: GreenBox(결론) + BorderBox(전환 구조) + Steps(대응) + FAQ

import Link from "next/link";
import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 기초연금_SIDEBAR, 기초연금_HIGHLIGHT } from "@/data/기초연금-guide";

const STEPS = [
  { title: "65세 도래 시점 확인", desc: "65세 생일이 속한 달부터 장애인연금 기초급여가 중단되고 기초연금으로 전환돼요." },
  { title: "기초연금 별도 신청", desc: "자동 전환이 아니에요. 65세 생일 전월부터 주민센터나 복지로에서 기초연금을 따로 신청해야 하죠." },
  { title: "부가급여 유지 확인", desc: "장애인연금 부가급여(약 8만~40만 원)는 65세 이후에도 계속 지급돼요." },
  { title: "실수령액 비교", desc: "기초급여가 기초연금으로 바뀌어도 금액은 비슷하고, 부가급여는 그대로 추가되니 큰 손해는 없어요." },
];

const FAQS = [
  {
    q: "65세가 되면 장애인연금이 끊기나요?",
    a: "전부 끊기는 건 아니에요. 장애인연금의 기초급여(최대 약 32만 원)만 중단되고, 기초연금(349,360원)으로 대체돼요. 부가급여는 65세 이후에도 계속 받을 수 있죠.",
  },
  {
    q: "기초연금은 자동으로 나오나요?",
    a: "아니에요. 기초연금은 별도로 신청해야 해요. 65세 생일 전월부터 주민센터, 국민연금공단 지사, 복지로에서 신청할 수 있죠. 신청 안 하면 수급이 안 돼요.",
  },
  {
    q: "장애인연금 부가급여는 얼마나 되나요?",
    a: "소득 수준에 따라 다른데, 기초생활수급자는 월 약 8만 원, 차상위는 약 7만 원 수준이에요. 이 금액은 65세 이후에도 장애인연금 부가급여로 계속 지급되죠.",
  },
  {
    q: "경증장애인도 같은 구조인가요?",
    a: "장애인연금은 중증장애인(종전 1~3급)만 대상이에요. 경증장애인은 장애인연금 대상이 아니라 이 조정 구조가 해당되지 않죠. 경증이면 기초연금만 별도로 신청하면 돼요.",
  },
  {
    q: "기초급여보다 기초연금이 더 많으면 이득인 건가요?",
    a: "네. 2025년 기준 기초연금(349,360원)이 장애인연금 기초급여(최대 약 32만 원)보다 조금 더 많아요. 여기에 부가급여까지 유지되니 65세 전환이 손해는 아닌 셈이죠.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "기초연금법 제3조: 수급권자 범위", url: "https://www.law.go.kr/법령/기초연금법" },
      { label: "장애인연금법 제4조: 수급권자", url: "https://www.law.go.kr/법령/장애인연금법" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "보건복지부: 장애인연금 제도 안내", url: "https://www.mohw.go.kr" },
      { label: "복지로: 장애인연금 신청", url: "https://www.bokjiro.go.kr" },
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
    description: "기초연금 수급자가 받을 수 있는 추가 혜택을 정리했어요.",
  },
  {
    slug: "기초연금-신청방법-절차",
    title: "기초연금 신청 방법",
    description: "주민센터와 온라인 신청 절차를 한 번에 정리했어요.",
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
          currentSlug="기초연금-장애인연금-기초급여-조정기준"
        />
      }
    >
      <nav style={{ fontSize: 13, color: "#6b7280", marginBottom: 8 }}>
        <Link href="/" style={{ color: "#6b7280" }}>홈</Link> &gt;{" "}
        <Link href="/w/기초연금" style={{ color: "#6b7280" }}>기초연금</Link> &gt;{" "}
        <span style={{ color: "#374151" }}>장애인연금 기초급여 조정</span>
      </nav>

      <h1 style={{ fontSize: 26, fontWeight: 800, color: "#111", lineHeight: 1.35, marginBottom: 4 }}>
        기초연금이랑 장애인연금 같이 받을 수 있을까?
      </h1>
      <p style={{ fontSize: 17, color: "#1D9E75", fontWeight: 600, marginBottom: 20 }}>
        기초급여 조정 구조와 부가급여 유지 기준
      </p>

      <p style={body}>
        중증장애인이 65세가 되면 갑자기 궁금해지죠. &quot;지금 받는 장애인연금은 어떻게 되지? 기초연금이랑 겹치면 하나를 포기해야 하나?&quot;
      </p>
      <p style={body}>
        결론부터 말하면, <strong>장애인연금의 기초급여가 기초연금으로 대체돼요.</strong>{" "}
        <a href="https://www.law.go.kr/법령/장애인연금법" style={{ color: "#1D9E75", textDecoration: "underline" }}>장애인연금법 제4조</a>에 따라
        65세가 되면 장애인연금 기초급여(최대 약 32만 원)가 중단되고, 대신 기초연금(349,360원)을 받게 되죠.
        장애인연금의 부가급여(약 8만~40만 원)는 65세 이후에도 계속 나와요.
      </p>

      <ArticleAd position="intro" />
      <Divider />

      <H2>65세에 기초급여가 기초연금으로 전환되는 구조</H2>
      <SectionBadge>조정 원리</SectionBadge>

      <p style={body}>
        장애인연금은 기초급여와 부가급여 두 파트로 나뉘어요. 기초급여는 소득 보전 목적이고, 부가급여는 장애로 인한 추가 비용 보전 목적이죠.
        65세가 되면 소득 보전 역할을 기초연금이 대신하니까, 장애인연금의 기초급여만 멈추고 기초연금이 그 자리를 채우는 거예요.
      </p>
      <p style={body}>
        부가급여는 &quot;장애로 인한 추가 비용&quot;을 보전하는 성격이라 기초연금과 중복되지 않아요.
        그래서 65세 이후에도 부가급여는 계속 나오죠. 기초생활수급자라면 약 8만 원, 차상위 계층이면 약 7만 원을 장애인연금 부가급여로 별도 수령할 수 있어요.
      </p>
      <p style={body}>
        핵심은 &quot;중단&quot;이 아니라 &quot;전환&quot;이라는 점이에요. 장애인연금 기초급여가 없어지는 대신 기초연금이 들어오니까, 총수령액은 비슷하거나 조금 늘어나는 구조이죠.
      </p>

      <GreenBox>
        65세 전: 장애인연금 기초급여(최대 약 32만) + 부가급여<br />
        65세 후: 기초연금(349,360원) + 장애인연금 부가급여(유지)<br />
        총수령액은 비슷하거나 약간 증가
      </GreenBox>

      <Divider />

      <H2>기초연금은 별도 신청이 필요해요</H2>
      <SectionBadge>신청 주의</SectionBadge>

      <p style={body}>
        가장 많이 실수하는 부분이 이거예요. 장애인연금을 받고 있으면 기초연금이 자동으로 나올 거라고 생각하는데, <strong>기초연금은 따로 신청해야 해요.</strong>
        65세 생일이 속한 달의 전월부터 신청할 수 있죠.
      </p>
      <p style={body}>
        신청 안 하면 장애인연금 기초급여는 끊기는데 기초연금은 안 나오는, 공백 상태가 생겨요.
        이 공백 기간에 대한 소급 지급도 안 되니 반드시 사전에 신청해야 하죠.
        주민센터, 국민연금공단 지사, 복지로(bokjiro.go.kr) 중 편한 곳에서 신청하면 돼요.
      </p>
      <p style={body}>
        서류는 기본적으로 신분증, 통장 사본, 금융정보등제공동의서가 필요하고요.
        장애인연금을 받고 있었다면 장애 관련 서류는 이미 시스템에 등록되어 있어서 추가 제출이 필요 없는 경우가 많아요.
      </p>

      <Steps steps={STEPS} />

      <CategoryButton label="기초연금 정보" count={기초연금_SIDEBAR.length} href="/category/기초연금" />
      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      <H2>부가급여가 유지되는 조건과 금액</H2>

      <p style={body}>
        장애인연금 부가급여는 소득 수준에 따라 금액이 달라져요. 기초생활수급자, 차상위 계층, 차상위 초과 등 구간별로 나뉘는데, 각 구간마다 정해진 금액을 매월 지급하죠.
      </p>
      <p style={body}>
        부가급여를 계속 받으려면 장애 등록이 유지되어야 해요. 중증장애인(종전 장애등급 1~3급) 등록이 해제되면 부가급여도 중단되죠. 65세 이후에도 장애 재판정이 진행될 수 있으니, 판정 시기를 미리 확인해 두세요.
      </p>
      <p style={body}>
        기초연금과 장애인연금 부가급여를 합산하면 65세 이전보다 총수령액이 줄어들지 않도록 제도가 설계되어 있어요. 만약 실수령이 줄었다면 산정 오류일 수 있으니 주민센터에 확인하는 게 좋죠.
      </p>

      <BorderBox>
        <strong>부가급여 유지 조건</strong><br />
        중증장애인 등록 유지 + 소득인정액 기준 충족<br />
        기초수급자: 약 8만 원 / 차상위: 약 7만 원 / 차상위 초과: 약 2만 원<br />
        65세 이후에도 장애인연금 부가급여로 별도 지급
      </BorderBox>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        장애인연금과 기초연금 중복 수급에 대해 자주 나오는 질문이에요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2025년 기준 기초연금법과 장애인연금법을 바탕으로 작성됐어요. 부가급여 금액은 매년 조정될 수 있으니, 복지로(bokjiro.go.kr)에서 최신 기준을 확인하세요." />
    </ArticleLayout>
  );
}
