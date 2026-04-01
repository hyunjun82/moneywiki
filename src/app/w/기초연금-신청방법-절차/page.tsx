"use client";
import { Divider } from "@/components/article-ui/Divider";
import { BorderBox } from "@/components/article-ui/BorderBox";

// Q1. 65세가 됐거나 곧 되는 본인·가족이 기초연금을 받고 싶은데 어디서 어떻게 신청하는지 모르는 상황
// Q2. 주민센터 방문 또는 복지로 온라인으로 기초연금을 직접 신청한다
// Q2-1. 주민센터 창구 또는 복지로(bokjiro.go.kr) 신청 페이지
// Q3. 신청 채널(주민센터·복지로·국민연금공단), 신청 시기(65세 생일 1개월 전), 절차 4단계, 소요 기간(약 30일)
// Q4. Steps(절차) + GreenBox(신청 채널 요약) + BorderBox(준비물) + FAQ

import Link from "next/link";
import {
  H2, GreenBox, BorderBox, Divider, body,
  Steps, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 기초연금_SIDEBAR, 기초연금_HIGHLIGHT } from "@/data/기초연금-guide";

const STEPS = [
  {
    title: "신청 시기 확인 (65세 생일 1개월 전부터)",
    desc: "기초연금은 만 65세 생일이 속하는 달의 1개월 전부터 신청할 수 있어요. 예를 들어 4월 20일이 생일이면 3월 1일부터 가능하죠. 신청한 달부터 지급되기 때문에 생일 전에 미리 신청하는 게 유리해요.",
    tip: "생일이 지나서 신청하면 지난 달은 소급 지급이 안 돼요",
  },
  {
    title: "신청 채널 선택 (주민센터·복지로·국민연금공단)",
    desc: "가까운 읍면동 주민센터에 방문하거나, 복지로(bokjiro.go.kr)에서 온라인으로 신청할 수 있어요. 국민연금공단 지사에서도 신청을 받고 있어요. 온라인 신청은 공동인증서(구 공인인증서)가 필요하죠.",
    tip: "방문 신청이 가장 빠르고, 현장에서 서류 보완도 가능해요",
    link: { label: "복지로 온라인 신청", href: "https://www.bokjiro.go.kr" },
  },
  {
    title: "서류 제출 + 금융정보 제공 동의",
    desc: "신분증, 본인 명의 통장 사본, 금융정보 제공 동의서를 제출해요. 금융정보 제공 동의서에 서명하면 국민건강보험공단·금융기관 자료를 자동으로 조회해요. 별도로 소득 증빙 서류를 챙기지 않아도 되는 경우가 많아요.",
    tip: "임대차 계약서, 자동차 등록증은 재산 확인이 필요할 때 추가로 요청할 수 있어요",
  },
  {
    title: "소득·재산 조사 (약 30일 소요)",
    desc: "신청 후 시·군·구청에서 소득인정액을 산정해요. 근로소득, 공적연금, 금융재산, 부동산 등을 종합적으로 조사하죠. 보통 30일 안에 결과가 나오고, 추가 서류가 필요하면 담당자가 연락해요.",
    tip: "조사 기간에 연락이 없으면 정상 진행 중이에요",
  },
  {
    title: "결과 통보 + 매월 25일 지급 시작",
    desc: "수급 자격이 확인되면 신청한 달부터 소급해서 매월 25일에 입금돼요. 2026년 기준 단독가구 최대 월 349,360원이에요. 탈락하면 사유와 함께 안내문이 발송되고, 이의신청도 할 수 있어요.",
    tip: "25일이 주말·공휴일이면 그 직전 영업일에 입금돼요",
  },
];

const FAQS = [
  {
    q: "온라인 신청이랑 방문 신청 중 뭐가 나을까요?",
    a: "서류에 자신이 없거나 처음 신청하는 분은 주민센터 방문을 추천해요. 현장에서 담당자가 서류를 확인해주고, 부족한 것도 바로 안내받을 수 있거든요. 온라인은 공동인증서가 있고 서류 준비가 된 분에게 편리해요.",
  },
  {
    q: "65세가 지났는데 지금 신청해도 되나요?",
    a: "네, 65세가 지났어도 언제든 신청할 수 있어요. 다만 기초연금은 소급 지급이 안 돼서, 신청한 달부터 받게 돼요. 65세 생일이 2년 전이었더라도 그 2년치를 한꺼번에 받을 수는 없어요.",
  },
  {
    q: "신청하고 얼마나 기다려야 결과가 나오나요?",
    a: "보통 30일 이내에 결과가 나와요. 소득·재산 조사에 시간이 걸리기 때문이에요. 급한 경우 주민센터에 진행 상황을 문의할 수 있어요.",
  },
  {
    q: "신청이 반려되면 다시 신청할 수 있나요?",
    a: "네, 다시 신청할 수 있어요. 소득이나 재산 상황이 바뀌었다면 언제든 재신청이 가능하죠. 탈락 사유를 확인하고 소득인정액이 기준 이하로 내려갔을 때 다시 신청하면 돼요.",
  },
  {
    q: "부부가 함께 신청해야 하나요?",
    a: "부부 각각 개별적으로 신청해요. 다만 소득인정액 산정 시 부부 합산 기준(395만2천원)이 적용되죠. 한 명만 신청해도 되고, 두 분 다 신청할 수도 있어요.",
  },
  {
    q: "국민연금공단에서도 신청할 수 있다고요?",
    a: "맞아요. 국민연금공단 지사에서도 기초연금 신청을 받고 있어요. 국민연금과 기초연금을 동시에 상담받고 싶을 때 편리하죠.",
  },
];

const REFERENCES = [
  {
    category: "공식 자료",
    items: [
      { label: "복지로: 기초연금 안내", url: "https://www.bokjiro.go.kr" },
      { label: "보건복지부: 기초연금 제도 안내", url: "https://www.mohw.go.kr" },
      { label: "국민연금공단: 기초연금 신청", url: "https://www.nps.or.kr" },
    ],
  },
  {
    category: "법령",
    items: [
      { label: "기초연금법", url: "https://www.law.go.kr/법령/기초연금법" },
      { label: "기초연금법 시행규칙", url: "https://www.law.go.kr/법령/기초연금법시행규칙" },
    ],
  },
];

const RELATED = [
  { slug: "기초연금-신청서류-준비물", title: "기초연금 신청 서류와 준비물", description: "신청할 때 뭘 챙겨야 하는지 정리했어요." },
  { slug: "기초연금-대리신청-위임장-작성", title: "부모님 대신 대리신청하는 방법", description: "자녀가 대리로 신청할 때 필요한 서류예요." },
  { slug: "기초연금-소급지급-여부-손해", title: "늦게 신청하면 얼마나 손해일까?", description: "소급 지급이 안 되는 이유와 손해 금액이에요." },
];

export default function Page() {
  return (
    <ArticleLayout sidebar={<Sidebar heading="기초연금 가이드" items={기초연금_SIDEBAR} highlightSlugs={기초연금_HIGHLIGHT} currentSlug="기초연금-신청방법-절차" />}>
      <nav style={{ fontSize: 13, color: "#888", marginBottom: 12 }}>
        <Link href="/" style={{ color: "#888", textDecoration: "none" }}>홈</Link>
        {" > "}
        <Link href="/w/기초연금" style={{ color: "#888", textDecoration: "none" }}>기초연금</Link>
        {" > "}
        <span style={{ color: "#333" }}>신청 방법</span>
      </nav>

      <h1 style={{ fontSize: 26, fontWeight: 800, lineHeight: 1.45, marginBottom: 6 }}>
        기초연금 신청, 어디서 어떻게?
      </h1>
      <p style={{ fontSize: 17, color: "#1D9E75", fontWeight: 600, marginBottom: 18 }}>
        신청 방법과 절차
      </p>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        65세가 됐는데 기초연금을 어디서 신청해야 하는지 막막하죠.
        주민센터, 복지로, 국민연금공단 세 곳 중 편한 곳을 고르면 돼요.
        생일 한 달 전부터 신청할 수 있고, 서류 몇 가지만 챙기면 30분이면 끝나요.
        신청부터 결과까지 약 30일, 단계별로 하나씩 짚어볼게요.
      </p>

      <ArticleAd position="intro" />
      <Divider />

      <H2>신청할 수 있는 곳, 3가지 채널</H2>
      <p style={body}>
        기초연금 신청은 세 군데에서 할 수 있어요.
        각각 장단점이 다르니 본인 상황에 맞는 곳을 고르면 돼요.
      </p>
      <GreenBox>
        <strong>기초연금 신청 채널</strong><br />
        <br />
        1. 읍면동 주민센터 (행정복지센터) 방문<br />
        &nbsp;&nbsp;&nbsp;장점: 현장에서 서류 확인·보완 가능, 대기 시간 15~30분<br />
        <br />
        2. 복지로(bokjiro.go.kr) 온라인 신청<br />
        &nbsp;&nbsp;&nbsp;장점: 집에서 24시간 신청 가능, 공동인증서 필요<br />
        <br />
        3. 국민연금공단 지사 방문<br />
        &nbsp;&nbsp;&nbsp;장점: 국민연금 상담과 동시에 가능<br />
        <br />
        어느 채널로 신청해도 심사 과정과 결과는 동일해요.
      </GreenBox>
      <p style={body}>
        처음 신청하는 분이라면 주민센터 방문이 가장 편해요.
        담당 공무원이 서류를 확인해주고 부족한 부분을 바로 알려주거든요.
        온라인에 익숙하고 공동인증서가 있다면 복지로도 좋은 선택이에요.
      </p>

      <H2>신청 절차, 5단계로 정리</H2>
      <p style={body}>
        복잡해 보이지만 실제로는 서류 제출까지가 본인이 할 일이고, 나머지는 관청에서 알아서 처리해요.
        아래 순서대로 따라가면 돼요.
      </p>
      <Steps steps={STEPS} />

      <CategoryButton label="기초연금 가이드" count={기초연금_SIDEBAR.length} href="/w/기초연금" />
      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />
      <Divider />

      <H2>신청 시기를 놓치면 생기는 일</H2>
      <p style={body}>
        기초연금은 소급 지급이 안 돼요.
        65세 생일이 4월인데 7월에 신청하면 4~6월분은 받을 수 없어요.
        3개월 늦으면 약 105만원(349,360원 x 3개월)을 못 받는 셈이죠.
      </p>
      <p style={body}>
        그래서 <Link href="/w/기초연금-65세-신청시기-소급여부" style={{ color: "#1D9E75", textDecoration: "underline" }}>65세 생일 한 달 전에 미리 신청</Link>하는 게 중요해요.
        생일 전에 신청해도 실제 지급은 65세가 되는 달부터 시작돼요.
        미리 낸다고 손해 볼 건 없으니 빨리 낼수록 좋아요.
      </p>

      <H2>온라인 신청할 때 주의할 점</H2>
      <p style={body}>
        복지로 온라인 신청은 본인 인증이 핵심이에요.
        공동인증서(구 공인인증서)가 반드시 필요하고, 없으면 은행에서 먼저 발급받아야 해요.
      </p>
      <BorderBox>
        <strong>복지로 온라인 신청 순서</strong><br />
        <br />
        1. 복지로(bokjiro.go.kr) 접속 → 회원가입 또는 로그인<br />
        2. "서비스 신청" → "복지 서비스 신청" → "기초연금" 선택<br />
        3. 신청서 작성 (인적사항, 소득·재산 정보)<br />
        4. 금융정보 제공 동의서 전자서명<br />
        5. 통장 사본 이미지 첨부 → 신청 완료<br />
        <br />
        신청 후 진행 상황도 복지로에서 조회할 수 있어요.
      </BorderBox>
      <p style={body}>
        온라인 신청 중 오류가 나거나 막히면 복지로 고객센터(129)로 전화하면 안내받을 수 있어요.
        서류 이미지가 흐리면 반려될 수 있으니 사진을 선명하게 찍어서 올리는 게 좋아요.
      </p>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        기초연금 신청 전에 궁금한 점을 모았어요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 기초연금법 및 보건복지부 고시 기준으로 작성됐어요. 개인별 소득인정액은 상황에 따라 다르니 주민센터 또는 복지로(bokjiro.go.kr)에서 정확하게 확인하세요." />
    </ArticleLayout>
  );
}
