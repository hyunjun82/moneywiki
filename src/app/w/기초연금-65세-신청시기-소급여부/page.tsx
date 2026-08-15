"use client";
// Q1. 곧 65세가 되는데 기초연금을 언제 신청해야 하는지, 늦게 내면 손해인지 궁금한 상황
// Q2. 정확한 신청 시기를 파악하고, 생일 전 미리 신청해서 연금을 한 달이라도 빨리 받을 수 있어야 함
// Q3. ① 생일 1개월 전 사전 신청 ② 신청한 달부터 지급(소급 없음) ③ 사전 신청 시 생일 달부터 지급 ④ 심사 기간 약 30일
// Q4. GreenBox(신청 시기 요약) + Steps(신청 절차) + BorderBox(소급 불가 주의) + FAQ

import Link from "next/link";
import {
  H2, GreenBox, BorderBox, Divider, body,
  Steps, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 기초연금_SIDEBAR, 기초연금_HIGHLIGHT } from "@/data/기초연금-guide";

const APPLY_STEPS = [
  {
    title: "생일 1개월 전 사전 신청",
    desc: "만 65세 생일이 속하는 달의 1개월 전부터 신청할 수 있어요. 예를 들어 5월 20일이 생일이면 4월 1일부터 가능하죠. 사전 신청하면 생일 달(5월)부터 바로 받을 수 있어요.",
    tip: "생일 당월에 신청해도 되지만, 사전 신청이 가장 유리해요",
  },
  {
    title: "주민센터·복지로·국민연금공단에서 신청",
    desc: "주민센터 방문, 복지로(bokjiro.go.kr) 온라인, 국민연금공단 지사 방문 중 편한 방법으로 신청하세요. 신분증, 통장 사본, 금융정보 제공 동의서가 필요해요.",
    link: { label: "복지로 온라인 신청", href: "https://www.bokjiro.go.kr" },
  },
  {
    title: "소득·재산 심사 (약 30일)",
    desc: "신청 후 소득인정액 심사가 진행돼요. 금융·부동산·소득 자료를 자동 조회하니 별도로 준비할 건 많지 않아요. 약 30일 정도 걸려요.",
  },
  {
    title: "수급 결정 후 매월 25일 지급",
    desc: "심사를 통과하면 신청한 달부터 기초연금이 산정돼요. 매월 25일에 지정 계좌로 입금되고, 첫 지급 시에는 밀린 분이 한꺼번에 나올 수 있어요.",
  },
];

const FAQS = [
  {
    q: "65세 생일이 지나고 나서 신청하면 어떻게 되나요?",
    a: "신청한 달부터 기초연금을 받게 돼요. 예를 들어 65세 생일이 3월인데 7월에 신청하면, 7월분부터 받아요. 3~6월분은 소급되지 않아서 4개월치를 못 받는 거예요.",
  },
  {
    q: "만 나이 기준인가요, 세는 나이 기준인가요?",
    a: "만 나이 기준이에요. 만 65세가 되는 생일이 기준이죠. 주민등록상 생년월일로 확인해요.",
  },
  {
    q: "사전 신청하면 심사가 64세 때 되는 건가요?",
    a: "맞아요. 64세 때 신청해도 심사가 진행되고, 65세 생일 달부터 지급이 결정돼요. 심사 기간 동안 65세가 되는 거라 문제없어요.",
  },
  {
    q: "심사에서 떨어져도 불이익이 있나요?",
    a: "전혀 없어요. 탈락해도 벌금이나 불이익은 없고, 소득·재산이 변하면 언제든 재신청할 수 있어요. 기각 이력이 불리하게 작용하지 않아요.",
  },
  {
    q: "이미 66세인데 지금 신청해도 되나요?",
    a: "물론 가능해요. 나이 제한 상한은 없어요. 다만 66세에 신청하면 66세 신청한 달부터 받는 거라, 65세 때 못 받은 분은 소급되지 않아요.",
  },
  {
    q: "배우자가 먼저 65세가 되면 따로 신청해야 하나요?",
    a: "배우자 각각 따로 신청해야 해요. 한 사람이 먼저 65세가 되면 먼저 신청하고, 나머지 배우자는 본인 65세 생일 전에 신청하면 돼요. 부부 모두 수급하면 각각 20% 감액이 적용돼요.",
  },
];

const REFERENCES = [
  {
    category: "공식 자료",
    items: [
      { label: "보건복지부: 기초연금 신청 안내", url: "https://www.mohw.go.kr" },
      { label: "복지로: 기초연금 온라인 신청", url: "https://www.bokjiro.go.kr" },
      { label: "국민연금공단: 기초연금", url: "https://www.nps.or.kr" },
    ],
  },
  {
    category: "법령",
    items: [
      { label: "기초연금법 제10조(신청)", url: "https://www.law.go.kr/법령/기초연금법" },
    ],
  },
];

const RELATED = [
  { slug: "기초연금-소급지급-여부-손해", title: "기초연금 소급 지급 여부", description: "늦게 신청하면 얼마나 손해인지 정리했어요." },
  { slug: "기초연금-신청방법-절차", title: "기초연금 신청 방법과 절차", description: "필요 서류와 신청 절차를 정리했어요." },
  { slug: "기초연금-수급자격-선정기준액-소득조건", title: "기초연금 수급자격과 선정기준액", description: "2026년 자격 조건을 한눈에 정리했어요." },
];

export default function Page() {
  return (
    <ArticleLayout sidebar={<Sidebar heading="기초연금 가이드" items={기초연금_SIDEBAR} highlightSlugs={기초연금_HIGHLIGHT} currentSlug="기초연금-65세-신청시기-소급여부" />}>
      <nav style={{ fontSize: 13, color: "#6b7280", marginBottom: 8 }}>
        <Link href="/" style={{ color: "#6b7280" }}>홈</Link> &gt; <Link href="/w/기초연금" style={{ color: "#6b7280" }}>기초연금</Link> &gt; <span style={{ color: "#374151" }}>신청 시기</span>
      </nav>

      <h1 style={{ fontSize: 26, fontWeight: 800, color: "#111", lineHeight: 1.35, marginBottom: 4 }}>
        기초연금, 65세 되면 바로 나올까?
      </h1>
      <p style={{ fontSize: 17, color: "#1D9E75", fontWeight: 600, marginBottom: 20 }}>
        신청 시기와 소급 여부
      </p>

      <p style={body}>
        곧 65세가 되시는데, 기초연금은 언제 신청해야 하는지 궁금하시죠. 생일이 되면 자동으로 나오는 건 아니에요. 직접 신청해야 하고, 신청 시기에 따라 받는 금액이 달라져요.
      </p>
      <p style={body}>
        핵심은 "소급이 안 된다"는 거예요. 65세 생일 후 6개월 뒤에 신청하면, 그 6개월치는 영원히 못 받아요. 그래서 생일 1개월 전에 미리 사전 신청하는 게 가장 유리하죠.
      </p>

      <ArticleAd position="intro" />
      <Divider />

      <H2>신청 시기, 생일 1개월 전이 최적이에요</H2>
      <p style={body}>
        기초연금은 만 65세 생일이 속하는 달의 1개월 전부터 신청할 수 있어요. 이걸 "사전 신청"이라고 해요. 사전 신청하면 생일 달부터 바로 기초연금을 받을 수 있어서 한 달도 손해 보지 않아요.
      </p>

      <GreenBox>
        <strong>기초연금 신청 시기</strong><br /><br />
        사전 신청: 65세 생일 1개월 전부터 가능<br />
        예시: 6월 15일 생일 → 5월 1일부터 신청 가능<br />
        지급 시작: 생일 달(6월)부터<br /><br />
        늦게 신청하면? 신청한 달부터 지급, 소급 없음
      </GreenBox>

      <p style={body}>
        사전 신청 기간에 신청하면 심사가 진행되는 동안 65세가 돼요. 심사 결과가 나오면 생일 달분부터 소급해서 첫 지급일에 한꺼번에 입금돼요.
      </p>

      <Divider />

      <H2>소급 여부, 늦게 신청하면 얼마나 손해일까?</H2>
      <p style={body}>
        기초연금은 신청한 달부터 지급이 시작돼요. 이전 달에 대해서는 소급 지급을 하지 않아요. 이게 가장 주의할 점이에요.
      </p>

      <BorderBox>
        <strong>소급 불가 사례</strong><br /><br />
        65세 생일: 2026년 3월<br />
        사전 신청(2월): 3월분부터 지급 → 손해 없음<br />
        생일 후 신청(3월): 3월분부터 지급 → 손해 없음<br />
        6개월 뒤 신청(9월): 9월분부터 지급 → 3~8월 6개월치 못 받음<br /><br />
        6개월 손해 금액: 349,360원 x 6 = 약 210만원<br />
        (2026년 기준연금액 기준, 단독가구 최대치)
      </BorderBox>

      <p style={body}>
        단독가구 기준으로 1년을 늦추면 약 419만원, 2년이면 약 839만원을 못 받는 거예요. "소급 안 된다"는 걸 모르고 몇 년 뒤에 신청해서 수백만원을 손해 보는 분이 실제로 많아요.
      </p>
      <p style={body}>
        <Link href="/w/기초연금-소급지급-여부-손해" style={{ color: "#1D9E75", fontWeight: 600 }}>소급 지급 관련 상세 내용</Link>에서 더 자세히 확인할 수 있어요.
      </p>

      <CategoryButton label="기초연금 가이드" count={기초연금_SIDEBAR.length} href="/w/기초연금" />
      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      <H2>신청 절차, 이렇게 진행돼요</H2>
      <p style={body}>
        신청은 주민센터 방문, 복지로 온라인, 국민연금공단 지사 방문 세 가지 방법이 있어요. 어디서 하든 결과는 같아요.
      </p>

      <Steps steps={APPLY_STEPS} />

      <Divider />

      <H2>사전 신청을 놓쳤다면?</H2>
      <p style={body}>
        생일이 이미 지났어도 지금 바로 신청하세요. 앞으로 받을 수 있는 금액은 빨리 신청할수록 많아지니까요. 과거분은 못 받지만, 지금부터라도 받는 게 중요해요.
      </p>
      <p style={body}>
        68세, 70세에 뒤늦게 신청하는 분도 있어요. 나이 상한은 없으니 언제든 신청 가능하죠. 다만 <Link href="/w/기초연금-신청방법-절차" style={{ color: "#1D9E75", fontWeight: 600 }}>신청 방법과 필요 서류</Link>를 미리 확인하고 가면 더 빨라요.
      </p>
      <p style={body}>
        주변에 65세 가까운 분이 계시면 사전 신청 제도를 꼭 알려주세요. 기초연금은 신청주의라서 본인이 신청하지 않으면 아무리 자격이 되어도 한 푼도 나오지 않아요.
      </p>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 기초연금법을 기준으로 작성했어요. 신청 시기와 지급 기준은 법 개정에 따라 변경될 수 있으니 복지로 또는 주민센터에서 최신 정보를 확인하세요." />
    </ArticleLayout>
  );
}
