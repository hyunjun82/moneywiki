"use client";
// Q1. 기초연금 신청하러 가려는데 뭘 가져가야 하는지 모르는 상황
// Q2. 필요한 서류를 빠짐없이 챙겨서 주민센터에 한 번에 접수한다
// Q2-1. 주민센터 창구 또는 복지로 서류 첨부 페이지
// Q3. 기본 서류(신분증·통장·동의서) + 상황별 추가 서류(임대차계약서·자동차등록증 등) + 온라인 신청 시 서류
// Q4. Checklist(서류 목록) + BorderBox(상황별 추가 서류) + GreenBox(요약)

import Link from "next/link";
import {
  H2, GreenBox, BorderBox, Divider, body,
  Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 기초연금_SIDEBAR, 기초연금_HIGHLIGHT } from "@/data/기초연금-guide";

const BASIC_DOCS = [
  "신분증 (주민등록증, 운전면허증, 여권 중 하나)",
  "본인 명의 통장 사본 (연금 입금용)",
  "금융정보 등 제공 동의서 (현장에서 작성 가능)",
  "기초연금 신청서 (현장에서 작성 가능)",
];

const EXTRA_DOCS = [
  "전·월세 계약서 (임차인인 경우)",
  "자동차 등록증 (본인 명의 차량이 있는 경우)",
  "사업자등록증 또는 소득금액증명원 (사업 소득이 있는 경우)",
  "부채 증명서류 (금융기관 대출 등 부채가 있는 경우)",
];

const FAQS = [
  {
    q: "통장 사본 대신 모바일 뱅킹 화면을 보여줘도 되나요?",
    a: "주민센터마다 다를 수 있지만, 대부분 통장 사본(종이)을 요구해요. 모바일 화면은 계좌번호 확인용으로만 쓰이는 경우가 많으니, 통장 사본을 미리 복사해 가는 게 확실해요.",
  },
  {
    q: "금융정보 제공 동의서는 미리 작성해 가야 하나요?",
    a: "아니에요, 주민센터에서 양식을 주고 현장에서 작성하면 돼요. 본인 서명만 하면 되니까 따로 준비할 필요 없어요. 온라인 신청이라면 전자서명으로 대체하죠.",
  },
  {
    q: "배우자 통장이나 자녀 통장으로 받을 수 있나요?",
    a: "원칙적으로 본인 명의 통장만 가능해요. 다만 성년후견인이 지정된 경우에는 후견인 명의 계좌로 받을 수 있어요. 이 경우 후견인 관련 서류가 추가로 필요하죠.",
  },
  {
    q: "서류가 부족하면 신청이 안 되나요?",
    a: "기본 서류(신분증, 통장)만 있으면 일단 접수는 돼요. 추가 서류가 필요하면 담당자가 나중에 안내해주고 보완 기한을 줘요. 서류가 부족하다고 돌려보내지는 않아요.",
  },
  {
    q: "온라인 신청 시 서류는 어떻게 제출하나요?",
    a: "복지로에서 온라인 신청할 때 통장 사본 이미지를 첨부해요. 스마트폰으로 찍어서 올리면 되고, 선명하게 찍어야 반려가 안 돼요. 금융정보 동의서는 전자서명으로 처리하죠.",
  },
];

const REFERENCES = [
  {
    category: "공식 자료",
    items: [
      { label: "복지로: 기초연금 신청 안내", url: "https://www.bokjiro.go.kr" },
      { label: "보건복지부: 기초연금 제도", url: "https://www.mohw.go.kr" },
    ],
  },
  {
    category: "법령",
    items: [
      { label: "기초연금법 시행규칙 제3조 (신청 서류)", url: "https://www.law.go.kr/법령/기초연금법시행규칙" },
    ],
  },
];

const RELATED = [
  { slug: "기초연금-신청방법-절차", title: "기초연금 신청 방법과 절차", description: "어디서 어떻게 신청하는지 단계별 정리예요." },
  { slug: "기초연금-대리신청-위임장-작성", title: "대리신청과 위임장 작성법", description: "부모님 대신 신청할 때 필요한 서류예요." },
  { slug: "기초연금-계좌변경-방법-절차", title: "기초연금 계좌 변경 방법", description: "입금 계좌를 바꿀 때 필요한 서류예요." },
];

export default function Page() {
  return (
    <ArticleLayout sidebar={<Sidebar heading="기초연금 가이드" items={기초연금_SIDEBAR} highlightSlugs={기초연금_HIGHLIGHT} currentSlug="기초연금-신청서류-준비물" />}>
      <nav style={{ fontSize: 13, color: "#888", marginBottom: 12 }}>
        <Link href="/" style={{ color: "#888", textDecoration: "none" }}>홈</Link>
        {" > "}
        <Link href="/w/기초연금" style={{ color: "#888", textDecoration: "none" }}>기초연금</Link>
        {" > "}
        <span style={{ color: "#333" }}>신청 서류</span>
      </nav>

      <h1 style={{ fontSize: 26, fontWeight: 800, lineHeight: 1.45, marginBottom: 6 }}>
        기초연금 신청할 때 뭘 가져갈까?
      </h1>
      <p style={{ fontSize: 17, color: "#1D9E75", fontWeight: 600, marginBottom: 18 }}>
        필수 서류와 준비물
      </p>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        기초연금 신청하러 주민센터에 갔다가 서류가 부족해서 다시 오는 분이 꽤 많아요.
        기본적으로 신분증, 통장 사본, 금융정보 동의서 세 가지만 있으면 접수는 돼요.
        다만 임대차 계약이나 자동차가 있으면 추가 서류가 필요할 수 있으니 미리 챙겨가면 한 번에 끝낼 수 있어요.
      </p>

      <ArticleAd position="intro" />
      <Divider />

      <H2>기본 서류 4가지 (필수)</H2>
      <p style={body}>
        아래 네 가지는 누구나 반드시 가져가야 해요.
        신청서와 동의서는 주민센터에서 양식을 주니까 미리 출력할 필요는 없어요.
      </p>
      <Checklist items={BASIC_DOCS} />
      <p style={body}>
        신분증은 주민등록증이 가장 무난하고, 운전면허증이나 여권도 돼요.
        통장 사본은 본인 명의 계좌여야 하고, 입출금 통장이든 예금 통장이든 상관없어요.
        <Link href="/w/기초연금-계좌변경-방법-절차" style={{ color: "#1D9E75", textDecoration: "underline" }}>나중에 계좌를 바꿀 수도</Link> 있으니 일단 아무 통장이나 가져가면 돼요.
      </p>

      <H2>상황별 추가 서류</H2>
      <p style={body}>
        본인 상황에 따라 추가로 필요한 서류가 달라져요.
        아래 항목 중 해당하는 게 있으면 같이 챙겨가세요.
      </p>
      <Checklist items={EXTRA_DOCS} />
      <BorderBox>
        <strong>이런 경우엔 이 서류가 필요해요</strong><br />
        <br />
        전세·월세 사는 경우 → 임대차 계약서 사본<br />
        본인 명의 자동차가 있는 경우 → 자동차 등록증<br />
        사업을 하거나 프리랜서인 경우 → 사업자등록증, 소득금액증명원<br />
        금융기관 대출이 있는 경우 → 부채 증명서 (은행 발급)<br />
        <br />
        해당 사항이 없으면 기본 서류만으로 충분해요.
      </BorderBox>

      <CategoryButton label="기초연금 가이드" count={기초연금_SIDEBAR.length} href="/w/기초연금" />
      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />
      <Divider />

      <H2>온라인 신청(복지로) 서류 준비</H2>
      <p style={body}>
        복지로에서 온라인 신청할 때는 서류를 이미지로 첨부해요.
        통장 사본을 스마트폰으로 찍어서 올리면 되는데, 계좌번호와 예금주가 선명하게 나와야 해요.
      </p>
      <p style={body}>
        금융정보 제공 동의서는 전자서명으로 대체하니까 별도로 준비할 필요 없어요.
        공동인증서(구 공인인증서)만 있으면 온라인으로 모든 절차를 끝낼 수 있죠.
        인증서가 없다면 거래 은행에서 먼저 발급받아야 해요.
      </p>

      <H2>서류 부족해도 일단 접수하세요</H2>
      <p style={body}>
        "서류가 다 준비 안 됐는데 신청해도 될까?" 걱정하는 분이 많은데, 기본 서류(신분증+통장)만 있으면 일단 접수는 돼요.
        추가 서류는 담당자가 안내해주고 보완 기한(보통 30일)을 줘요.
      </p>
      <p style={body}>
        중요한 건 <Link href="/w/기초연금-소급지급-여부-손해" style={{ color: "#1D9E75", textDecoration: "underline" }}>신청 시기</Link>예요.
        기초연금은 소급 지급이 안 되기 때문에, 서류가 완벽하지 않더라도 먼저 접수하고 나중에 보완하는 게 유리해요.
        접수일 기준으로 지급 시작 시점이 정해지거든요.
      </p>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        서류 관련해서 자주 나오는 질문이에요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 기초연금법 시행규칙 기준으로 작성됐어요. 지자체별로 추가 서류가 다를 수 있으니 방문 전에 주민센터에 전화로 확인하면 더 확실해요." />
    </ArticleLayout>
  );
}
