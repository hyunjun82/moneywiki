"use client";
import { Divider } from "@/components/article-ui/Divider";
import { BorderBox } from "@/components/article-ui/BorderBox";

// Q1. 65세 이상인데 아직 일하고 있어서, 근로소득 때문에 기초연금을 못 받을까 걱정되는 상황
// Q2. 근로소득 공제(112만원+30%)를 이해하고, 내 월급 기준으로 기초연금 수급 가능 여부를 판단하는 것
// Q3. (1) 근로소득 공제 구조(112만원 기본 + 30% 추가) (2) 공제 후 소득인정액 계산 (3) 일용직·파트타임 포함 여부
// Q4. GreenBox(공제 기준) + BorderBox(월급별 계산 예시) + FAQ

import Link from "next/link";
import {
  H2, GreenBox, BorderBox, Divider, body,
  FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 기초연금_SIDEBAR, 기초연금_HIGHLIGHT } from "@/data/기초연금-guide";

const FAQS = [
  {
    q: "일용직도 근로소득 공제를 받을 수 있나요?",
    a: "네, 일용직 소득도 근로소득에 포함돼서 동일한 공제(112만원 + 30%)가 적용돼요. 일용근로소득 지급명세서가 국세청에 신고되면 자동으로 반영돼요.",
  },
  {
    q: "파트타임으로 월 50만원 벌면 소득인정액에 얼마나 반영되나요?",
    a: "112만원 기본 공제 범위 안이라 근로소득 반영액이 0원이에요. 월 112만원 이하의 근로소득은 소득인정액에 전혀 반영되지 않아요.",
  },
  {
    q: "사업자등록을 하고 일하면 근로소득인가요?",
    a: "사업자등록이 있으면 사업소득으로 분류돼요. 사업소득에는 근로소득 공제(112만원+30%)가 적용되지 않으니 주의하세요. 사업소득은 별도의 필요경비를 공제해요.",
  },
  {
    q: "근로소득과 연금소득이 동시에 있으면 어떻게 계산하나요?",
    a: "근로소득에서 112만원+30% 공제를 적용하고, 연금소득(국민연금 등)은 전액 반영해서 합산해요. 두 소득의 공제 방식이 다르기 때문에 따로 계산한 후 합치는 거예요.",
  },
  {
    q: "근로소득이 줄면 기초연금을 다시 받을 수 있나요?",
    a: "네, 기초연금은 매년 소득·재산을 재조사해요. 소득이 줄어서 소득인정액이 선정기준액 이하가 되면 기초연금을 받을 수 있어요. 변동 사항이 있으면 주민센터에 알려주세요.",
  },
  {
    q: "퇴직금은 근로소득에 포함되나요?",
    a: "퇴직금은 일시금으로 받으면 금융재산으로 분류돼요. 퇴직연금(IRP 등)으로 받으면 연금소득으로 반영되고요. 근로소득으로 분류되지는 않아요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "기초연금법 시행령 제2조(소득의 범위)", url: "https://www.law.go.kr/법령/기초연금법시행령" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "보건복지부: 기초연금 소득 기준", url: "https://www.mohw.go.kr" },
      { label: "복지로: 기초연금 모의계산", url: "https://www.bokjiro.go.kr" },
    ],
  },
];

const RELATED = [
  { slug: "기초연금-소득인정액-계산-공제항목", title: "소득인정액 계산과 공제항목", description: "소득인정액 전체 계산 구조를 정리했어요." },
  { slug: "기초연금-임대소득-사업소득-반영기준", title: "임대소득·사업소득 반영 기준", description: "월세·사업소득이 있을 때 반영 방법이에요." },
  { slug: "기초연금-소득역전방지-감액기준", title: "소득역전 방지 감액 기준", description: "소득인정액이 높을 때 적용되는 감액이에요." },
];

export default function Page() {
  return (
    <ArticleLayout sidebar={<Sidebar heading="기초연금 가이드" items={기초연금_SIDEBAR} highlightSlugs={기초연금_HIGHLIGHT} currentSlug="기초연금-근로소득-공제기준-계산" />}>
      <nav style={{ fontSize: 13, color: "#6b7280", marginBottom: 8 }}>
        <Link href="/" style={{ color: "#6b7280" }}>홈</Link> &gt; <Link href="/w/기초연금" style={{ color: "#6b7280" }}>기초연금</Link> &gt; <span style={{ color: "#374151" }}>근로소득 공제</span>
      </nav>

      <h1 style={{ fontSize: 26, fontWeight: 800, color: "#111", lineHeight: 1.35, marginBottom: 4 }}>
        일하면서 기초연금 받을 수 있을까?
      </h1>
      <p style={{ fontSize: 17, color: "#1D9E75", fontWeight: 600, marginBottom: 20 }}>
        근로소득 공제 기준과 계산
      </p>

      <p style={body}>
        65세가 넘었는데 아직 일하고 있으면 "소득이 있으니 기초연금 못 받겠지" 하고 포기하는 분이 많아요. 하지만 근로소득은 112만원을 먼저 빼고 나머지의 30%를 또 빼줘요. 공제가 꽤 크기 때문에 월 200만원 이상 벌어도 기초연금 대상이 되는 경우가 많아요.
      </p>

      <ArticleAd position="intro" />
      <Divider />

      <H2>근로소득 공제 구조</H2>
      <p style={body}>
        기초연금 소득인정액 산정 시 근로소득에는 2단계 공제가 적용돼요. <Link href="https://www.law.go.kr/법령/기초연금법시행령" style={{ color: "#1D9E75" }}>기초연금법 시행령 제2조</Link>에 따른 규정이에요.
      </p>

      <GreenBox>
        <strong>근로소득 공제 (2026년 기준)</strong><br /><br />
        1단계: 112만원 기본 공제 (월 근로소득에서 112만원 차감)<br />
        2단계: 나머지 금액의 30% 추가 공제<br /><br />
        공식: (월 근로소득 - 112만원) x 70% = 소득인정액 반영분<br /><br />
        월 근로소득 112만원 이하: 반영 금액 0원<br />
        일용직, 파트타임, 정규직 모두 동일하게 적용
      </GreenBox>

      <p style={body}>
        핵심은 112만원까지는 아예 안 잡힌다는 거예요. 그리고 그 위의 금액도 70%만 반영되니 실제 소득보다 훨씬 적게 계산돼요.
      </p>

      <H2>월급별 소득인정액 계산 예시</H2>
      <p style={body}>
        월급 수준에 따라 실제 소득인정액에 얼마나 반영되는지 구체적으로 계산해볼게요.
      </p>

      <BorderBox>
        <strong>월 근로소득별 소득인정액 반영분</strong><br /><br />
        <strong>월 80만원</strong>: 112만원 이하 → 반영 0원<br />
        <strong>월 112만원</strong>: 112만원 이하 → 반영 0원<br />
        <strong>월 150만원</strong>: (150만 - 112만) x 70% = 26만6천원<br />
        <strong>월 200만원</strong>: (200만 - 112만) x 70% = 61만6천원<br />
        <strong>월 250만원</strong>: (250만 - 112만) x 70% = 96만6천원<br />
        <strong>월 300만원</strong>: (300만 - 112만) x 70% = 131만6천원
      </BorderBox>

      <p style={body}>
        월 200만원을 벌어도 소득인정액에는 약 62만원만 반영돼요. 다른 소득이나 재산이 많지 않다면 충분히 기초연금 대상이 될 수 있죠.
      </p>
      <p style={body}>
        단독가구 선정기준액이 247만원이니까, 근로소득만 있는 경우 월 약 465만원까지는 이론적으로 기초연금 수급이 가능해요. 물론 재산이나 다른 소득이 있으면 달라지지만요.
      </p>

      <CategoryButton label="기초연금 가이드" count={기초연금_SIDEBAR.length} href="/w/기초연금" />
      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      <H2>주의: 사업소득은 공제가 달라요</H2>
      <p style={body}>
        근로소득 공제(112만원+30%)는 "근로소득"에만 적용돼요. 사업자등록을 하고 사업을 하는 경우는 사업소득으로 분류되고, 공제 방식이 달라요.
      </p>
      <p style={body}>
        사업소득은 매출에서 필요경비를 공제한 금액이 소득인정액에 반영돼요. 근로소득처럼 112만원 기본공제가 적용되지 않으니 같은 금액을 벌어도 소득인정액이 더 높게 나올 수 있어요.
      </p>
      <p style={body}>
        <Link href="/w/기초연금-임대소득-사업소득-반영기준" style={{ color: "#1D9E75" }}>임대소득이나 사업소득이 있는 경우</Link>의 반영 기준은 별도로 확인해야 해요.
      </p>

      <H2>일하면서 기초연금 받는 게 손해인 경우는 없어요</H2>
      <p style={body}>
        간혹 "일하면 기초연금이 줄어드니 일 안 하는 게 낫다"고 생각하는 분이 있는데, 이건 오해예요.
      </p>
      <p style={body}>
        근로소득이 늘어도 기초연금이 줄어드는 폭보다 근로소득 증가분이 항상 더 커요. 일해서 번 돈의 70%만 소득인정액에 반영되니, 나머지 30%는 순수하게 소득이 늘어나는 거죠.
      </p>
      <p style={body}>
        <Link href="/w/기초연금-소득인정액-계산-공제항목" style={{ color: "#1D9E75" }}>전체 소득인정액 계산</Link>을 해보고, 일하면서 기초연금을 함께 받는 것이 가장 유리한 선택인지 확인해보세요.
      </p>

      <Divider />

      <H2>자주 묻는 질문</H2>
      <FAQ items={FAQS} />

      <Divider />
      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 기초연금법 시행령과 보건복지부 자료를 바탕으로 작성됐어요. 근로소득 공제 기준은 매년 조정될 수 있으니 최신 기준을 확인하세요." />
    </ArticleLayout>
  );
}
