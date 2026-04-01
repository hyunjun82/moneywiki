"use client";
import { BorderBox } from "@/components/article-ui/BorderBox";

// Q1. 기초연금 입금 계좌를 다른 은행이나 다른 통장으로 바꾸고 싶은 상황
// Q2. 주민센터 또는 복지로에서 계좌 변경 신청을 완료한다
// Q2-1. 주민센터 창구 또는 복지로 계좌 변경 메뉴
// Q3. 변경 가능 채널, 본인 명의만 가능, 적용 시점, 필요 서류
// Q4. Steps(절차) + GreenBox(핵심 요약) + FAQ

import Link from "next/link";
import {
  H2, GreenBox, BorderBox, Divider, body,
  Steps, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 기초연금_SIDEBAR, 기초연금_HIGHLIGHT } from "@/data/기초연금-guide";

const CHANGE_STEPS = [
  {
    title: "새 통장 준비 (본인 명의)",
    desc: "기초연금은 본인 명의 계좌로만 받을 수 있어요. 배우자나 자녀 명의 계좌는 안 되죠. 어떤 은행이든 상관없고, 입출금 통장이든 예금 통장이든 가능해요.",
    tip: "휴면 계좌나 정지된 계좌는 입금이 안 되니 상태를 확인하세요",
  },
  {
    title: "주민센터 방문 또는 복지로 접속",
    desc: "가까운 읍면동 주민센터에 방문하거나, 복지로(bokjiro.go.kr)에서 온라인으로 변경할 수 있어요. 방문 시 신분증과 새 통장 사본을 가져가면 되고, 온라인은 공동인증서가 필요해요.",
    tip: "국민연금공단 지사에서도 계좌 변경이 가능해요",
  },
  {
    title: "계좌 변경 신청서 작성",
    desc: "현장에서 '기초연금 계좌 변경 신청서'를 작성해요. 기존 계좌번호와 새 계좌번호, 은행명을 적으면 끝이에요. 온라인이면 복지로에서 직접 입력하면 돼요.",
    tip: "계좌번호를 정확히 적었는지 두 번 확인하세요",
  },
  {
    title: "변경 적용 확인",
    desc: "25일 전에 변경하면 그달 지급분부터 적용돼요. 25일 이후에 변경하면 다음 달부터 새 계좌로 입금되죠. 정상 변경됐는지 다음 지급일에 확인하면 돼요.",
    tip: "기존 계좌를 바로 해지하지 말고, 새 계좌로 입금 확인 후 해지하세요",
  },
];

const FAQS = [
  {
    q: "자녀 명의 계좌로 변경할 수 있나요?",
    a: "원칙적으로 안 돼요. 기초연금은 수급자 본인 명의 계좌로만 지급돼요. 다만 성년후견인이 지정된 경우에는 후견인 계좌로 변경할 수 있어요.",
  },
  {
    q: "계좌를 변경하면 이번 달 연금은 어디로 들어가나요?",
    a: "25일 전에 변경하면 이번 달부터 새 계좌로 입금돼요. 25일 이후에 변경하면 이번 달은 기존 계좌, 다음 달부터 새 계좌로 들어가요.",
  },
  {
    q: "통장을 잃어버렸는데 계좌 변경을 해야 하나요?",
    a: "통장을 분실해도 계좌 자체는 살아 있으니, 통장 재발급만 받으면 돼요. 계좌번호가 바뀌는 게 아니라서 별도로 변경 신청할 필요는 없어요. 다만 통장을 해지하고 새 통장을 만들었다면 계좌 변경 신청이 필요하죠.",
  },
  {
    q: "온라인으로 계좌 변경할 때 뭐가 필요하나요?",
    a: "복지로 회원가입 + 공동인증서가 필요해요. 로그인 후 '나의 복지' → '수급 관리' → '계좌 변경'에서 새 계좌 정보를 입력하면 돼요.",
  },
  {
    q: "다른 복지 급여도 한꺼번에 계좌를 바꿀 수 있나요?",
    a: "기초연금 계좌만 변경되고, 다른 복지 급여(생계급여, 장애인연금 등)는 각각 별도로 변경해야 해요. 주민센터에서 한 번에 신청하면 편해요.",
  },
];

const REFERENCES = [
  {
    category: "공식 자료",
    items: [
      { label: "복지로: 기초연금 수급 관리", url: "https://www.bokjiro.go.kr" },
      { label: "보건복지부: 기초연금 안내", url: "https://www.mohw.go.kr" },
    ],
  },
  {
    category: "법령",
    items: [
      { label: "기초연금법 시행규칙", url: "https://www.law.go.kr/법령/기초연금법시행규칙" },
    ],
  },
];

const RELATED = [
  { slug: "기초연금-지급일-입금기준", title: "기초연금 지급일은 매월 언제?", description: "매달 입금되는 날짜와 기준이에요." },
  { slug: "기초연금-지급정지-사유-해제방법", title: "지급정지 사유와 해제 방법", description: "입금이 안 될 때 확인할 사항이에요." },
  { slug: "기초연금-신청방법-절차", title: "기초연금 신청 방법과 절차", description: "처음 신청하는 분을 위한 안내예요." },
];

export default function Page() {
  return (
    <ArticleLayout sidebar={<Sidebar heading="기초연금 가이드" items={기초연금_SIDEBAR} highlightSlugs={기초연금_HIGHLIGHT} currentSlug="기초연금-계좌변경-방법-절차" />}>
      <nav style={{ fontSize: 13, color: "#888", marginBottom: 12 }}>
        <Link href="/" style={{ color: "#888", textDecoration: "none" }}>홈</Link>
        {" > "}
        <Link href="/w/기초연금" style={{ color: "#888", textDecoration: "none" }}>기초연금</Link>
        {" > "}
        <span style={{ color: "#333" }}>계좌 변경</span>
      </nav>

      <h1 style={{ fontSize: 26, fontWeight: 800, lineHeight: 1.45, marginBottom: 6 }}>
        기초연금 입금 계좌 바꾸려면?
      </h1>
      <p style={{ fontSize: 17, color: "#1D9E75", fontWeight: 600, marginBottom: 18 }}>
        계좌 변경 방법과 절차
      </p>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        기초연금 받는 통장을 바꾸고 싶은데 어떻게 해야 하는지 모르겠죠.
        주민센터 방문이나 복지로 온라인으로 간단하게 변경할 수 있어요.
        본인 명의 계좌만 가능하고, 변경 시점에 따라 적용 시기가 달라지니 미리 알아두면 좋아요.
      </p>

      <ArticleAd position="intro" />
      <Divider />

      <H2>계좌 변경 방법, 3가지 채널</H2>
      <p style={body}>
        계좌 변경은 신청보다 훨씬 간단해요.
        세 군데 중 편한 곳을 고르면 돼요.
      </p>
      <GreenBox>
        <strong>계좌 변경 채널</strong><br />
        <br />
        1. 읍면동 주민센터 방문 — 신분증 + 새 통장 사본<br />
        2. 복지로(bokjiro.go.kr) 온라인 — 공동인증서 필요<br />
        3. 국민연금공단 지사 방문 — 신분증 + 새 통장 사본<br />
        <br />
        본인 명의 계좌만 가능 (배우자·자녀 명의 불가)
      </GreenBox>

      <H2>계좌 변경 절차 4단계</H2>
      <p style={body}>
        아래 순서대로 하면 10분이면 끝나요.
      </p>
      <Steps steps={CHANGE_STEPS} />

      <CategoryButton label="기초연금 가이드" count={기초연금_SIDEBAR.length} href="/w/기초연금" />
      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />
      <Divider />

      <H2>변경 적용 시점이 중요해요</H2>
      <p style={body}>
        계좌를 바꾸는 타이밍에 따라 이번 달 연금이 어디로 들어갈지 달라져요.
        가장 안전한 방법은 <Link href="/w/기초연금-지급일-입금기준" style={{ color: "#1D9E75", textDecoration: "underline" }}>지급일(매월 25일)</Link> 직후에 변경하고, 다음 달부터 새 계좌로 받는 거예요.
      </p>
      <BorderBox>
        <strong>변경 시점별 적용 기준</strong><br />
        <br />
        25일 전에 변경 → 이번 달부터 새 계좌로 입금<br />
        25일 이후에 변경 → 다음 달부터 새 계좌로 입금<br />
        <br />
        기존 통장은 새 계좌로 입금 확인 후에 해지하세요.
        해지를 먼저 하면 입금이 반송될 수 있어요.
      </BorderBox>

      <H2>대리인이 계좌 변경할 수 있나요</H2>
      <p style={body}>
        본인이 직접 방문하기 어려우면 <Link href="/w/기초연금-대리신청-위임장-작성" style={{ color: "#1D9E75", textDecoration: "underline" }}>대리인이 변경</Link>할 수도 있어요.
        위임장, 양쪽 신분증, 새 통장 사본을 가져가면 돼요.
        다만 온라인(복지로) 대리 변경은 안 되고, 주민센터 방문만 가능하죠.
      </p>
      <p style={body}>
        성년후견인으로 지정된 경우에는 후견인 계좌로도 변경할 수 있어요.
        이 경우 후견인 증명 서류가 추가로 필요해요.
      </p>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        계좌 변경 관련 궁금한 점이에요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 기초연금법 시행규칙 기준으로 작성됐어요. 계좌 변경 적용 시점은 지자체별로 약간 다를 수 있으니 주민센터(129)에서 확인하세요." />
    </ArticleLayout>
  );
}
