"use client";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  EligibilityChecker, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 퇴직금_SIDEBAR } from "@/data/퇴직금-guide";

const CHECK_ITEMS = [
  { id: "c1", label: "회사가 폐업했거나 폐업 예정이에요" },
  { id: "c2", label: "1년 이상 근무하고 주 15시간 이상 일했어요" },
  { id: "c3", label: "퇴직금을 아직 받지 못했어요" },
  { id: "c4", label: "퇴직 후 아직 3년이 지나지 않았어요" },
];

const FAQS = [
  {
    q: "회사가 폐업하면 퇴직금을 아예 못 받나요?",
    a: "아니에요. 체당금(대지급금) 제도를 통해 퇴직금의 일부를 받을 수 있어요. 근로복지공단에 신청하면 되죠. 상한액이 있지만 상당 부분을 커버할 수 있어요.",
  },
  {
    q: "체당금과 대지급금은 같은 건가요?",
    a: "비슷한 제도예요. 체당금은 도산(파산·회생) 시, 대지급금은 사실상 도산(폐업·사업주 연락 두절 등) 시 적용돼요. 신청 절차가 약간 다르지만 목적은 동일하죠.",
  },
  {
    q: "사장이 잠적하면 어떻게 하나요?",
    a: "고용노동부에 '사실상 도산 인정' 신청을 하면 돼요. 사업주와 연락이 안 되고 사업 활동이 중단된 상태가 확인되면 체당금(대지급금)을 받을 수 있죠.",
  },
  {
    q: "체당금 상한액이 얼마인가요?",
    a: "나이와 근속연수에 따라 다르지만, 퇴직금 체당금은 최대 700만 원 수준이에요. 최신 상한액은 근로복지공단 홈페이지에서 확인하세요.",
  },
  {
    q: "체당금으로 전액을 받지 못하면 나머지는 어떻게 하나요?",
    a: "파산 절차에서 우선변제권을 행사해서 잔액을 회수할 수 있어요. 다만 회사에 남은 재산이 없으면 회수가 어려울 수 있죠. 법률구조공단(132)에서 무료 상담을 받아보세요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "임금채권보장법 — 체당금 제도", url: "https://www.law.go.kr/법령/임금채권보장법" },
      { label: "근로기준법 제38조 — 임금 우선변제", url: "https://www.law.go.kr/법령/근로기준법" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "근로복지공단 — 체당금 신청 안내", url: "https://www.comwel.or.kr" },
      { label: "고용노동부 — 사실상 도산 인정", url: "https://www.moel.go.kr" },
    ],
  },
];

const RELATED = [
  {
    slug: "회사-폐업-퇴직금-체당금-신청-우선변제권",
    title: "폐업 퇴직금 체당금 신청과 우선변제권",
    description: "체당금 신청 절차와 우선변제권 활용법을 정리했어요.",
  },
  {
    slug: "대지급금-퇴직금-DB-DC-퇴직연금",
    title: "대지급금으로 퇴직금 받기",
    description: "대지급금 제도와 DB형·DC형 적용 방법을 정리했어요.",
  },
  {
    slug: "퇴직금-미지급-신고",
    title: "퇴직금 미지급 신고 방법",
    description: "퇴직금을 안 주면 어디에 어떻게 신고하는지 정리했어요.",
  },
];

export default function Page() {
  return (
    <ArticleLayout
      sidebar={
        <Sidebar
          heading="퇴직금 가이드"
          items={퇴직금_SIDEBAR}
          currentSlug="회사-폐업-퇴직금"
        />
      }
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>퇴직금 · 폐업 · 체당금</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        회사 폐업 시 퇴직금,<br />
        정말 못 받나요?
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        다니던 회사가 갑자기 폐업하면 퇴직금을 포기해야 하나 싶죠.
        포기하지 마세요. 회사가 문을 닫아도 퇴직금을 받을 수 있는 길이 있어요.
        <a href="https://www.law.go.kr/법령/임금채권보장법" style={{ color: "#1D9E75", textDecoration: "underline" }}>임금채권보장법</a>에 따른 체당금(대지급금) 제도가 바로 그거예요.
        국가가 사업주 대신 퇴직금 일부를 지급해주는 구조이죠.
        체당금 신청 방법, 우선변제권, 전액 회수 가능성까지 하나씩 짚어볼게요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>회사가 폐업해도 퇴직금을 받을 수 있나요?</H2>
      <p style={body}>
        네, 받을 수 있어요. 임금채권보장법은 사업주가 파산하거나 사실상 도산한 경우, 국가가 미지급 임금과 퇴직금을 대신 지급하는 체당금 제도를 운영하고 있죠. <a href="https://www.comwel.or.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로복지공단</a>에 신청하면 돼요.
      </p>
      <p style={body}>
        체당금은 사업주가 파산 선고를 받았거나, 회생 절차가 진행 중이거나, 사실상 도산(사업 중단·연락 두절 등)이 확인된 경우에 신청할 수 있어요. 사실상 도산 인정은 고용노동부에 별도로 신청해야 하죠.
      </p>
      <p style={body}>
        체당금에는 상한액이 있어서 퇴직금 전액을 받지 못할 수도 있어요. 나이와 근속연수에 따라 다르지만, 퇴직금 체당금은 최대 700만 원 수준이에요. 상한액을 초과하는 금액은 파산 절차에서 우선변제권을 행사해 회수할 수 있죠.
      </p>

      <GreenBox title="회사 폐업 시 퇴직금 회수 경로">
        1. <strong>체당금(대지급금)</strong> — 근로복지공단 신청, 상한액 내 지급<br />
        2. <strong>우선변제권</strong> — 파산 절차에서 임금채권 우선 배당<br />
        3. <strong>민사 소송</strong> — 사업주 개인 재산으로 회수
      </GreenBox>

      <SectionBadge>내 상황에 해당되는지 체크해보세요</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="4가지 다 해당되네요. 체당금을 신청할 수 있어요. 근로복지공단에 문의하세요."
        partialMatchText="일부만 해당돼요. 체당금 신청 자격을 근로복지공단(1588-0075)에서 확인해보세요."
      />

      <Divider />

      <H2>체당금 제도가 뭔가요?</H2>
      <p style={body}>
        체당금은 사업주가 파산이나 도산으로 임금·퇴직금을 지급하지 못할 때 국가가 대신 지급하는 제도예요. 근로자가 받지 못한 금액을 먼저 지급하고, 나중에 국가가 사업주에게 구상권을 행사하는 구조이죠.
      </p>
      <p style={body}>
        도산 체당금과 일반 체당금 두 종류가 있어요. 도산 체당금은 파산·회생 절차가 진행 중인 경우에 적용되고, 일반 체당금(소액체당금)은 소송이나 노동부 확정 명령으로 미지급이 확인된 경우에 적용되죠.
      </p>
      <p style={body}>
        <a href="/w/회사-폐업-퇴직금-체당금-신청-우선변제권" style={{ color: "#1D9E75", textDecoration: "underline" }}>체당금 신청</a>은 근로복지공단(1588-0075)에서 할 수 있어요. 온라인 신청도 가능하고, 가까운 지사에 방문해도 돼요. 신청 후 서류 심사를 거쳐 보통 2~4주 안에 입금되죠.
      </p>

      {/* ── 섹션 2 끝 → 버튼 + 관련 글 ── */}
      <CategoryButton label="퇴직금 정보" count={퇴직금_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      <H2>체당금 신청 방법과 한도는?</H2>
      <p style={body}>
        근로복지공단 홈페이지나 가까운 지사에서 신청할 수 있어요. 필요 서류는 퇴직금 미지급 확인서(고용노동부 발급), 신분증, 통장 사본이에요. 파산·회생의 경우에는 법원의 파산 선고 결정문도 필요하죠.
      </p>
      <p style={body}>
        퇴직금 체당금 상한액은 나이에 따라 달라요. 30세 미만은 약 180만 원, 30~39세는 약 220만 원, 40세 이상은 약 260만 원(월 기준)이에요. 최종 한도는 근속연수에 따라 최대 700만 원 수준까지 올라가죠. 정확한 금액은 공단에서 확인하세요.
      </p>
      <p style={body}>
        사실상 도산의 경우에는 먼저 고용노동부에 &ldquo;사실상 도산 인정&rdquo;을 신청해야 해요. 인정 결정이 나온 뒤 근로복지공단에 체당금을 신청하는 순서이죠. 절차가 이중이라 시간이 좀 걸리지만, 포기하지 않으면 받을 수 있어요.
      </p>

      <Divider />

      <H2>사장이 연락이 안 될 때 어떻게 하나요?</H2>
      <p style={body}>
        사장이 잠적해도 퇴직금을 받을 수 있는 방법이 있어요. <a href="https://www.moel.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용노동부</a>에 &ldquo;사실상 도산 인정&rdquo;을 신청하면, 사업주와 연락이 안 되고 사업 활동이 중단된 상태임을 확인받을 수 있죠.
      </p>
      <p style={body}>
        사실상 도산 인정이 나오면 체당금을 신청할 수 있어요. 동시에 사업주에 대한 형사 고소(임금체불)도 진행할 수 있죠. 형사 절차가 진행되면 경찰이 사업주를 추적하게 돼요.
      </p>
      <p style={body}>
        증빙 자료를 미리 확보해두는 게 중요해요. 근로계약서, 급여명세서, 4대보험 가입 이력, 계좌 이체 내역 등을 모아두세요. 회사가 갑자기 문을 닫으면 서류를 구하기 어려워지니까, 일하는 동안 미리 복사해두는 게 안전하죠.
      </p>

      <Divider />

      <H2>폐업 후 퇴직금 회수 성공률은?</H2>
      <p style={body}>
        체당금 제도를 활용하면 상한액 범위 내에서 높은 확률로 받을 수 있어요. 근로복지공단 통계에 따르면 체당금 신청 건의 대부분이 지급 승인을 받고 있죠.
      </p>
      <p style={body}>
        상한액을 초과하는 금액 회수는 어려울 수 있어요. 파산 절차에서 <a href="/w/회사-폐업-퇴직금-체당금-신청-우선변제권" style={{ color: "#1D9E75", textDecoration: "underline" }}>우선변제권</a>을 행사하더라도 회사에 남은 재산이 없으면 배당받을 게 없거든요. 그래도 체당금만으로도 상당 부분을 커버할 수 있으니 반드시 신청하세요.
      </p>
      <p style={body}>
        <a href="/w/퇴직금-미지급-신고" style={{ color: "#1D9E75", textDecoration: "underline" }}>퇴직금 미지급 신고</a>와 체당금 신청을 동시에 진행하는 게 가장 효율적이에요. 소멸시효 3년 이내에 움직여야 하니까, 폐업 소식을 듣는 즉시 행동에 옮기세요.
      </p>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        회사 폐업 시 퇴직금에 대해 실제로 자주 나오는 질문만 골랐어요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 임금채권보장법과 근로기준법을 바탕으로 작성됐어요. 제도 변경이 있을 수 있으니, 최신 기준은 근로복지공단(1588-0075)에서 확인하세요." />
    </ArticleLayout>
  );
}
