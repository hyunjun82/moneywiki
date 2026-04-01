"use client";
import { Divider } from "@/components/article-ui/Divider";

// Q1. 기초연금 받던 부모님이 돌아가셔서 남은 연금을 받을 수 있는지 궁금한 상황
// Q2. 미지급 기초연금 청구서를 작성해서 주민센터에 제출한다
// Q2-1. 주민센터 창구에서 미지급분 청구 접수
// Q3. 청구 자격(유족 순위), 청구 기한(5년), 필요 서류, 지급 금액 산정, 신고 의무
// Q4. Steps(청구 절차) + GreenBox(핵심 요약) + Checklist(서류) + FAQ

import Link from "next/link";
import {
  H2, GreenBox, BorderBox, Divider, body,
  Steps, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 기초연금_SIDEBAR, 기초연금_HIGHLIGHT } from "@/data/기초연금-guide";

const CLAIM_DOCS = [
  "미지급 기초연금 청구서 (주민센터 비치)",
  "사망자(수급자) 사망진단서 또는 사망확인서",
  "청구인(유족) 신분증",
  "청구인 명의 통장 사본",
  "가족관계증명서 (사망자와의 관계 확인용)",
];

const CLAIM_STEPS = [
  {
    title: "사망 신고 (사망일로부터 1개월 이내)",
    desc: "수급자가 사망하면 가족이 주민센터에 사망 신고를 해요. 사망 신고를 하면 기초연금 수급 자격이 자동으로 상실 처리되죠. 사망 신고와 미지급분 청구를 같은 날에 할 수 있어요.",
    tip: "사망 신고가 늦어져도 미지급분 청구 기한(5년)에는 영향 없어요",
  },
  {
    title: "미지급분 확인",
    desc: "사망일이 속하는 달까지의 기초연금이 아직 지급되지 않은 금액이 미지급분이에요. 예를 들어 3월 10일에 사망했고 3월분 연금이 아직 입금 전이라면 3월분이 미지급분이 되죠.",
    tip: "25일 전에 사망하면 그 달 연금 전액이 미지급분이에요",
  },
  {
    title: "청구 서류 제출",
    desc: "주민센터에 미지급 기초연금 청구서와 서류를 제출해요. 청구인은 유족 순위(배우자 → 자녀 → 부모 → 손자녀 → 형제자매)에 따라 결정돼요. 같은 순위가 여러 명이면 대표 1명이 청구하면 돼요.",
    tip: "사망자와 같은 주소에 살던 가족이 우선이에요",
  },
  {
    title: "미지급분 수령",
    desc: "서류 확인 후 청구인 계좌로 미지급분이 입금돼요. 보통 2~4주 안에 처리되죠. 금액은 사망일이 속하는 달까지 일할 계산 없이 월 단위로 지급돼요.",
    tip: "사망일이 1일이든 30일이든 해당 월 전액을 받아요",
  },
];

const FAQS = [
  {
    q: "미지급분은 얼마나 되나요?",
    a: "사망자가 받던 월 기초연금 금액 기준이에요. 예를 들어 월 349,360원을 받던 분이 25일 지급 전에 돌아가셨다면 그 달 349,360원이 미지급분이에요. 이전 달에 미지급된 금액이 더 있다면 합산돼요.",
  },
  {
    q: "청구 기한이 5년이라는데, 정말인가요?",
    a: "네, 기초연금법에 따라 미지급 기초연금 청구권은 5년이에요. 사망일로부터 5년 이내에 청구하지 않으면 시효가 만료돼서 받을 수 없어요.",
  },
  {
    q: "유족 순위에서 배우자가 먼저인가요?",
    a: "네, 미지급분 수령 순위는 배우자 → 자녀 → 부모 → 손자녀 → 형제자매 순서예요. 다만 사망자와 생계를 같이 한(같은 주소) 가족이 같은 순위 내에서 우선이에요.",
  },
  {
    q: "사망 후에도 연금이 계속 입금됐으면 어떻게 되나요?",
    a: "사망 신고가 늦어서 사망 후에도 연금이 입금됐다면 초과분은 반환해야 해요. 주민센터에서 환수 절차를 안내받을 수 있어요. 미지급분과 환수분을 상계 처리하는 경우도 있죠.",
  },
  {
    q: "부부 수급자 중 한 분이 돌아가시면 나머지 분은?",
    a: "배우자가 사망하면 생존 배우자는 단독가구 기준으로 전환돼요. 부부감액(20%)이 해제되고 단독가구 금액(최대 349,360원)을 받게 되죠. 별도 신청 없이 자동 전환돼요.",
  },
  {
    q: "미지급분에 세금이 붙나요?",
    a: "기초연금은 비과세 소득이에요. 미지급분도 마찬가지로 세금이 붙지 않아요.",
  },
];

const REFERENCES = [
  {
    category: "공식 자료",
    items: [
      { label: "보건복지부: 기초연금 안내", url: "https://www.mohw.go.kr" },
      { label: "복지로: 기초연금 제도", url: "https://www.bokjiro.go.kr" },
    ],
  },
  {
    category: "법령",
    items: [
      { label: "기초연금법 제14조 (미지급 기초연금)", url: "https://www.law.go.kr/법령/기초연금법" },
      { label: "기초연금법 제15조 (환수)", url: "https://www.law.go.kr/법령/기초연금법" },
    ],
  },
];

const RELATED = [
  { slug: "기초연금-지급정지-사유-해제방법", title: "지급정지 사유와 해제 방법", description: "연금이 끊긴 이유를 확인하는 방법이에요." },
  { slug: "기초연금-지급일-입금기준", title: "기초연금 지급일은 매월 언제?", description: "매달 입금 날짜와 기준이에요." },
  { slug: "기초연금-신청방법-절차", title: "기초연금 신청 방법", description: "처음 신청하는 분을 위한 안내예요." },
];

export default function Page() {
  return (
    <ArticleLayout sidebar={<Sidebar heading="기초연금 가이드" items={기초연금_SIDEBAR} highlightSlugs={기초연금_HIGHLIGHT} currentSlug="기초연금-사망-미지급분-청구-기한" />}>
      <nav style={{ fontSize: 13, color: "#888", marginBottom: 12 }}>
        <Link href="/" style={{ color: "#888", textDecoration: "none" }}>홈</Link>
        {" > "}
        <Link href="/w/기초연금" style={{ color: "#888", textDecoration: "none" }}>기초연금</Link>
        {" > "}
        <span style={{ color: "#333" }}>사망 미지급분</span>
      </nav>

      <h1 style={{ fontSize: 26, fontWeight: 800, lineHeight: 1.45, marginBottom: 6 }}>
        기초연금 받던 분이 돌아가셨다면?
      </h1>
      <p style={{ fontSize: 17, color: "#1D9E75", fontWeight: 600, marginBottom: 18 }}>
        미지급분 청구와 기한
      </p>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        부모님이 기초연금을 받다가 돌아가셨는데, 마지막 달 연금은 어떻게 되는지 궁금하죠.
        아직 지급되지 않은 기초연금은 유족이 청구해서 받을 수 있어요.
        청구 기한은 사망일로부터 5년이고, 주민센터에서 간단하게 신청할 수 있어요.
      </p>

      <ArticleAd position="intro" />
      <Divider />

      <H2>미지급 기초연금이란</H2>
      <p style={body}>
        수급자가 사망하면 사망일이 속하는 달까지 기초연금을 받을 권리가 있어요.
        그런데 25일 전에 돌아가시면 그달 연금이 아직 입금 전이죠.
        이렇게 지급되지 않은 금액을 "미지급 기초연금"이라고 해요.
      </p>
      <GreenBox>
        <strong>미지급 기초연금 핵심</strong><br />
        <br />
        대상: 사망일이 속하는 달까지 미지급된 기초연금<br />
        청구 자격: 유족 (배우자 → 자녀 → 부모 → 손자녀 → 형제자매)<br />
        청구 기한: 사망일로부터 5년 이내<br />
        청구 장소: 읍면동 주민센터<br />
        과세 여부: 비과세 (세금 없음)
      </GreenBox>

      <H2>청구 절차 4단계</H2>
      <p style={body}>
        사망 신고와 함께 처리하면 한 번에 끝낼 수 있어요.
      </p>
      <Steps steps={CLAIM_STEPS} />

      <CategoryButton label="기초연금 가이드" count={기초연금_SIDEBAR.length} href="/w/기초연금" />
      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />
      <Divider />

      <H2>청구에 필요한 서류</H2>
      <p style={body}>
        아래 서류를 챙겨서 주민센터에 제출하면 돼요.
        청구서 양식은 주민센터에 비치돼 있어요.
      </p>
      <Checklist items={CLAIM_DOCS} />
      <p style={body}>
        가족관계증명서는 주민센터나 <Link href="https://www.gov.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>정부24</Link>에서 발급받을 수 있어요.
        사망진단서는 병원에서 발급하고, 사망 신고 시 이미 제출했다면 사본으로 대체할 수 있어요.
      </p>

      <H2>청구 기한 5년, 놓치면 소멸</H2>
      <p style={body}>
        미지급 기초연금 청구권은 사망일로부터 5년이에요.
        기초연금법 제14조에 명시된 기한이고, 5년이 지나면 청구할 수 없어요.
        금액이 크지 않더라도 빨리 청구하는 게 좋죠.
      </p>
      <p style={body}>
        사망 신고 시 주민센터 담당자가 미지급분 청구를 안내해주는 경우가 많아요.
        안내를 못 받았더라도 5년 이내면 언제든 청구할 수 있으니, 지금이라도 주민센터에 문의하세요.
      </p>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        미지급분 청구 관련 궁금한 점이에요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 기초연금법 기준으로 작성됐어요. 미지급분 금액과 절차는 개인 상황에 따라 다를 수 있으니 주민센터(129)에서 정확하게 확인하세요." />
    </ArticleLayout>
  );
}
