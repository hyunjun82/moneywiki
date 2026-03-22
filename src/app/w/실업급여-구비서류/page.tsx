"use client";

// Q1. 이 키워드를 검색하는 사람은 지금 어떤 상황인가?
//     퇴사 후 고용센터에 실업급여 신청하러 가기 전에 필요한 서류를 확인하려는 상황
// Q2. 이 사람이 이 글을 읽고 나서 할 수 있어야 하는 행동은?
//     필수 서류 3가지(신분증, 통장사본, 워크넷 등록)를 챙겨서 고용센터를 방문한다
// Q3. 이 행동을 하려면 반드시 알아야 하는 정보는?
//     필수 서류 목록, 이직확인서 처리 확인, 자발적 퇴사 시 추가 서류, 통장 요건
// Q4. 이 정보를 가장 잘 전달하는 형태는?
//     DocTable(서류 목록) + Steps(준비 순서) + GreenBox(요약) + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Steps, DocTable, FAQ, SourceNote, Disclaimer,
  ArticleLayout, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";

const DOCS = [
  { name: "신분증 (주민등록증, 운전면허증, 여권)", required: true, where: "본인 지참" },
  { name: "워크넷 구직등록 확인증", required: true, where: "워크넷(work.go.kr) 온라인 등록" },
  { name: "통장 사본 (본인 명의)", required: true, where: "본인 복사 또는 모바일뱅킹 캡처" },
  { name: "이직확인서", required: false, where: "사업주 신고 완료 시 불필요 (고용24 조회)" },
  { name: "온라인 교육 이수증", required: false, where: "고용24(ei.go.kr)에서 출력" },
];

const STEPS = [
  {
    title: "워크넷에서 구직등록 완료",
    desc: "고용센터 방문 전에 워크넷(work.go.kr)에서 구직등록을 미리 해야 해요. 온라인으로 10분이면 끝나요. 현장 PC에서도 할 수 있지만 미리 하면 시간이 절약돼요.",
    link: { label: "워크넷 바로가기", href: "https://www.work.go.kr" },
  },
  {
    title: "이직확인서 처리 여부 확인",
    desc: "고용24(ei.go.kr)에 로그인해서 사업주가 이직확인서를 신고했는지 확인하세요. '처리 완료'면 따로 가져갈 필요 없어요. 미신고면 사업주에게 발급 요청하세요.",
    link: { label: "고용24 바로가기", href: "https://www.ei.go.kr" },
  },
  {
    title: "통장 사본 준비",
    desc: "실업급여를 받을 본인 명의 통장이에요. 통장 앞면 복사 또는 모바일뱅킹 캡처도 인정되는 경우가 많아요. 공동 명의나 가족 명의는 안 돼요.",
  },
  {
    title: "고용센터 방문 (본인 직접)",
    desc: "신분증, 워크넷 확인증, 통장 사본을 챙겨서 관할 고용센터를 방문하세요. 대리 신청은 안 돼요. 본인이 직접 가야 해요.",
  },
];

const FAQS = [
  {
    q: "서류를 빠뜨리면 어떻게 되나요?",
    a: "그날 접수가 안 돼요. 다시 방문해야 해서 하루를 날릴 수 있어요. 방문 전에 3가지(신분증, 워크넷 확인증, 통장 사본)만 꼭 확인하세요.",
  },
  {
    q: "통장 사본 대신 스마트폰 캡처도 되나요?",
    a: "고용센터마다 다르지만, 대부분 인정해줘요. 모바일뱅킹 앱에서 계좌번호와 예금주명이 보이는 화면을 캡처하면 돼요. 불안하면 통장을 직접 가져가세요.",
  },
  {
    q: "자발적 퇴사인데 실업급여를 받을 수 있나요?",
    a: "특정 사유가 있으면 가능해요. 질병·부상이면 진단서, 직장 내 괴롭힘이면 증거자료, 육아 사유면 가족관계증명서 등 추가 서류가 필요해요.",
  },
  {
    q: "이직확인서를 사업주가 안 내주면 어떻게 하나요?",
    a: "사업주는 퇴직 후 14일 이내에 이직확인서를 신고해야 해요. 안 해주면 고용센터에 요청하면 공단에서 사업주에게 독촉해요. 14일 넘기면 수급자가 직접 신고할 수 있어요.",
  },
  {
    q: "대리인이 서류를 제출할 수 있나요?",
    a: "수급자격 신청은 본인이 직접 방문해야 해요. 대리 신청이 안 돼요. 거동이 불편하면 사전에 고용센터(1350)에 문의해보세요.",
  },
  {
    q: "온라인 교육 이수증은 꼭 출력해 가야 하나요?",
    a: "대부분 안 가져가도 돼요. 고용센터 상담사가 시스템에서 직접 조회할 수 있어요. 하지만 불안하면 고용24에서 출력해서 가져가세요.",
  },
];

const SOURCES = [
  { name: "고용보험법 시행규칙", href: "https://www.law.go.kr/법령/고용보험법시행규칙" },
  { name: "고용24 실업급여 신청 안내", href: "https://www.ei.go.kr" },
];

const RELATED = [
  { slug: "실업급여-수급자격-인정", title: "실업급여 수급자격 신청 절차", description: "고용센터 방문 후 심사 과정과 기간." },
  { slug: "실업급여-실업신고", title: "워크넷 구직등록 방법", description: "구직등록 절차와 주의사항." },
  { slug: "실업급여-금액-계산", title: "실업급여 금액 계산", description: "내가 받을 수 있는 금액과 기간." },
];

export default function Page() {
  return (
    <ArticleLayout>
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>실업급여</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        실업급여 구비서류, 뭘 챙겨야 할까?<br />
        고용센터 방문 전 준비물 체크
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        고용센터 가려는데 뭘 가져가야 하는지 헷갈리시죠?
      </p>
      <p style={body}>
        필수는 3가지예요. 신분증, 통장 사본(본인 명의), 워크넷 구직등록 확인증이에요. 이 3가지 없으면 접수 자체가 안 돼요. 이직확인서는 사업주가 이미 신고했으면 따로 안 가져가도 돼요. 빠진 서류 있으면 그날 헛걸음이 되니까 방문 전에 꼭 확인하세요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>필요한 서류 목록</H2>
      <p style={body}>
        <a href="https://www.law.go.kr/법령/고용보험법시행규칙" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용보험법 시행규칙</a> 기준으로 정리했어요.
      </p>

      <SectionBadge>서류 목록</SectionBadge>
      <DocTable docs={DOCS} />

      <p style={body}>
        자발적 퇴사 예외 사유(질병, 육아, 괴롭힘 등)로 신청하는 경우에는 증빙 서류가 추가로 필요해요. 비자발적 이직이면 위 목록만으로 충분해요.
      </p>

      <CategoryButton label="실업급여 정보" count={8} href="/category/실업급여" />
      <RelatedArticles items={RELATED} />

      <Divider />

      <H2>서류 준비, 이 순서로 해요</H2>
      <p style={body}>
        방문 전에 미리 해두면 당일 한 번에 처리할 수 있어요.
      </p>

      <Steps steps={STEPS} />

      <Divider />

      <H2>이직확인서, 따로 준비해야 하나요?</H2>
      <p style={body}>
        사업주가 이미 신고했는지 먼저 확인해요.
      </p>

      <BorderBox>
        <strong><a href="https://www.ei.go.kr" style={{ color: "#1D9E75" }}>고용24</a>에 로그인 → 이직확인서 처리 여부 조회</strong><br /><br />
        &quot;처리 완료&quot; → 따로 지참 불필요 (공단 시스템에서 조회 가능){"\n"}
        &quot;미신고&quot; → 사업주에게 발급 요청 또는 고용센터에 요청{"\n"}<br />
        사업주가 14일 이내 미신고 시 → 수급자 본인이 직접 신고 가능{"\n"}
        이직 사유가 &quot;자발적 퇴사&quot;로 잘못 기재되면 수급자격 제한될 수 있으니 꼭 확인하세요
      </BorderBox>

      <Divider />

      <H2>구비서류, 이런 점이 궁금하죠</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        자주 나오는 질문들이에요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <SourceNote sources={SOURCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 고용보험법 시행규칙을 바탕으로 작성했어요. 고용센터마다 세부 요건이 다를 수 있으니 방문 전 1350(고용노동부)에 확인하세요." />
    </ArticleLayout>
  );
}
