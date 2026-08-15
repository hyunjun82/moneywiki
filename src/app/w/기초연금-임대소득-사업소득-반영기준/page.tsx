"use client";
// Q1. 월세 수입이나 소규모 사업소득이 있는데, 이게 기초연금 소득인정액에 어떻게 잡히는지 몰라서 불안한 상황
// Q2. 임대소득·사업소득의 소득인정액 반영 방식을 이해하고, 내 소득 기준으로 수급 가능 여부를 판단하는 것
// Q3. (1) 임대소득 반영 방식(필요경비 공제) (2) 사업소득 반영 방식 (3) 이자·배당소득 반영 (4) 근로소득 공제와의 차이
// Q4. GreenBox(반영 기준 요약) + BorderBox(계산 예시) + FAQ

import Link from "next/link";
import {
  H2, GreenBox, BorderBox, Divider, body,
  FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 기초연금_SIDEBAR, 기초연금_HIGHLIGHT } from "@/data/기초연금-guide";

const FAQS = [
  {
    q: "월세 50만원 받으면 소득인정액에 50만원이 그대로 잡히나요?",
    a: "아니에요. 월세 수입에서 필요경비(수선비, 감가상각비 등)를 공제한 금액만 반영돼요. 실제 반영액은 월세 총액보다 적어요.",
  },
  {
    q: "임대소득에도 근로소득처럼 112만원 공제가 되나요?",
    a: "아니에요. 112만원+30% 공제는 근로소득에만 적용돼요. 임대소득은 필요경비만 공제되고 나머지가 전액 반영돼요.",
  },
  {
    q: "소규모 사업으로 월 100만원 벌면 기초연금 대상이 될 수 있나요?",
    a: "사업소득 100만원에서 필요경비를 공제하면 반영액이 줄어들어요. 다른 소득·재산 상황에 따라 충분히 대상이 될 수 있어요. 주민센터에서 모의계산을 받아보세요.",
  },
  {
    q: "이자소득이 연 240만원(월 20만원)이면 어떻게 반영되나요?",
    a: "이자소득은 연간 합계를 12로 나눈 월 소득(20만원)이 그대로 소득인정액에 반영돼요. 별도 공제가 없어요. 다만 이자를 발생시키는 예금 자체는 금융재산으로 잡히니 이중 반영은 아니에요.",
  },
  {
    q: "부동산을 팔아서 생긴 양도차익도 소득에 포함되나요?",
    a: "일시적 양도차익은 소득인정액에 직접 반영되지 않아요. 다만 양도 대금이 금융재산(예금)으로 남으면 금융재산에 포함돼요.",
  },
  {
    q: "폐업한 사업의 소득도 잡히나요?",
    a: "폐업 후에는 사업소득이 0원이에요. 단, 폐업 시점 이전의 소득이 국세청 자료에 남아 있으면 조사 시 반영될 수 있어요. 폐업 사실을 주민센터에 알려주면 정정돼요.",
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
      { label: "국세청: 사업소득 필요경비", url: "https://www.nts.go.kr" },
    ],
  },
];

const RELATED = [
  { slug: "기초연금-소득인정액-계산-공제항목", title: "소득인정액 계산과 공제항목", description: "소득인정액 전체 계산 구조를 정리했어요." },
  { slug: "기초연금-근로소득-공제기준-계산", title: "근로소득 공제 기준과 계산", description: "근로소득 공제(112만원+30%)는 이렇게 적용돼요." },
  { slug: "기초연금-금융재산-공제기준-계산", title: "금융재산 공제 기준", description: "이자소득을 발생시키는 금융재산 공제 기준이에요." },
];

export default function Page() {
  return (
    <ArticleLayout sidebar={<Sidebar heading="기초연금 가이드" items={기초연금_SIDEBAR} highlightSlugs={기초연금_HIGHLIGHT} currentSlug="기초연금-임대소득-사업소득-반영기준" />}>
      <nav style={{ fontSize: 13, color: "#6b7280", marginBottom: 8 }}>
        <Link href="/" style={{ color: "#6b7280" }}>홈</Link> &gt; <Link href="/w/기초연금" style={{ color: "#6b7280" }}>기초연금</Link> &gt; <span style={{ color: "#374151" }}>임대·사업소득</span>
      </nav>

      <h1 style={{ fontSize: 26, fontWeight: 800, color: "#111", lineHeight: 1.35, marginBottom: 4 }}>
        월세·이자 소득 있으면 기초연금?
      </h1>
      <p style={{ fontSize: 17, color: "#1D9E75", fontWeight: 600, marginBottom: 20 }}>
        임대소득·사업소득 반영 기준
      </p>

      <p style={body}>
        월세 수입이 있거나 작은 가게를 하고 있으면 "이 소득 때문에 기초연금 못 받는 거 아닌가" 걱정되죠. 임대소득과 사업소득은 근로소득과 공제 방식이 달라요. 근로소득처럼 112만원 기본공제가 없는 대신, 필요경비를 공제받을 수 있어요. 어떻게 반영되는지 정확히 알아야 대비할 수 있어요.
      </p>

      <ArticleAd position="intro" />
      <Divider />

      <H2>임대소득·사업소득·이자소득 반영 방식</H2>
      <p style={body}>
        기초연금에서 소득 유형별로 반영 방식이 달라요. <Link href="https://www.law.go.kr/법령/기초연금법시행령" style={{ color: "#1D9E75" }}>기초연금법 시행령 제2조</Link>에 따른 구분이에요.
      </p>

      <GreenBox>
        <strong>소득 유형별 반영 기준</strong><br /><br />
        <strong>임대소득</strong>: 월세 수입 - 필요경비(수선비, 감가상각 등) = 순소득 반영<br /><br />
        <strong>사업소득</strong>: 매출 - 필요경비 = 순소득 반영 (국세청 신고 자료 기준)<br /><br />
        <strong>이자·배당소득</strong>: 연간 합계 / 12 = 월 소득으로 환산, 전액 반영<br /><br />
        <strong>연금소득</strong>(국민연금·공무원연금): 전액 반영 (공제 없음)<br /><br />
        주의: 근로소득과 달리 112만원+30% 공제가 적용되지 않음
      </GreenBox>

      <p style={body}>
        근로소득은 공제가 크지만, 임대소득과 사업소득은 "필요경비"만 빼고 나머지가 반영돼요. 이 차이를 알아야 소득인정액을 정확하게 예측할 수 있어요.
      </p>

      <H2>임대소득 계산 예시</H2>
      <p style={body}>
        월세를 받고 있는 경우, 실제로 소득인정액에 얼마나 반영되는지 계산해볼게요.
      </p>

      <BorderBox>
        <strong>임대소득 계산 예시</strong><br /><br />
        <strong>사례 1</strong>: 원룸 1채 월세 40만원, 필요경비(수선비·감가상각 등) 월 10만원<br />
        순임대소득: 40만 - 10만 = 30만원/월 반영<br /><br />
        <strong>사례 2</strong>: 상가 월세 100만원, 필요경비 월 25만원<br />
        순임대소득: 100만 - 25만 = 75만원/월 반영<br /><br />
        <strong>사례 3</strong>: 전세 임대(월세 없음)<br />
        월세 수입이 없으면 임대소득 0원. 전세보증금은 금융재산으로 반영될 수 있음
      </BorderBox>

      <p style={body}>
        필요경비는 국세청 종합소득세 신고 자료를 기준으로 해요. 종합소득세 신고를 하지 않은 경우에는 보건복지부가 정한 기준 경비율을 적용해요.
      </p>

      <CategoryButton label="기초연금 가이드" count={기초연금_SIDEBAR.length} href="/w/기초연금" />
      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      <H2>사업소득이 있을 때 반영 방식</H2>
      <p style={body}>
        작은 가게나 개인 사업을 하는 경우 사업소득으로 분류돼요. 근로소득과 가장 큰 차이는 공제 구조예요.
      </p>
      <p style={body}>
        사업소득은 국세청에 신고한 종합소득세 자료(매출 - 필요경비 = 순소득)를 기준으로 반영돼요. 필요경비가 많을수록 순소득이 줄어들어 소득인정액이 낮아지죠.
      </p>
      <p style={body}>
        종합소득세 신고를 꼼꼼하게 하는 게 중요해요. 경비 처리를 제대로 안 하면 실제보다 소득이 높게 잡힐 수 있어요. 세무사 상담이 도움이 되는 경우가 많아요.
      </p>

      <H2>이자·배당소득과 금융재산의 관계</H2>
      <p style={body}>
        이자소득과 배당소득은 소득인정액에 별도로 반영돼요. 그런데 이자를 발생시키는 예금 자체도 <Link href="/w/기초연금-금융재산-공제기준-계산" style={{ color: "#1D9E75" }}>금융재산</Link>으로 잡히니 "이중 반영 아니냐"는 의문이 들 수 있어요.
      </p>
      <p style={body}>
        결론적으로 이중 반영은 아니에요. 금융재산은 재산의 소득환산액(원금 기준)에 포함되고, 이자소득은 소득평가액(수익 기준)에 포함돼요. 원금과 수익을 별도로 보는 구조예요.
      </p>
      <p style={body}>
        이자소득은 연간 합계를 12로 나눈 금액이 월 소득으로 반영돼요. 예를 들어 연 이자 120만원이면 월 10만원이 소득인정액에 더해지는 거예요. <Link href="/w/기초연금-소득인정액-계산-공제항목" style={{ color: "#1D9E75" }}>전체 소득인정액 계산</Link>에서 이 금액이 합산돼요.
      </p>

      <Divider />

      <H2>자주 묻는 질문</H2>
      <FAQ items={FAQS} />

      <Divider />
      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 기초연금법 시행령과 보건복지부 자료를 바탕으로 작성됐어요. 임대소득·사업소득의 필요경비는 개인 상황에 따라 달라지니 세무사 또는 주민센터에서 확인하세요." />
    </ArticleLayout>
  );
}
