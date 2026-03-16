"use client";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  EligibilityChecker, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 퇴직금_SIDEBAR } from "@/data/퇴직금-guide";

const CHECK_ITEMS = [
  { id: "c1", label: "회사가 파산·회생·폐업 상태예요" },
  { id: "c2", label: "퇴직금을 아직 받지 못했어요" },
  { id: "c3", label: "퇴직 후 2년(도산 체당금) 또는 3년(소멸시효) 이내예요" },
  { id: "c4", label: "근로 사실을 입증할 서류가 있어요" },
];

const FAQS = [
  {
    q: "체당금 신청은 어디에 하나요?",
    a: "근로복지공단(1588-0075)에 신청해요. 온라인(공단 홈페이지)이나 가까운 지사 방문 모두 가능하죠.",
  },
  {
    q: "우선변제권이 있으면 퇴직금을 전액 받을 수 있나요?",
    a: "우선변제권이 있어도 회사에 남은 재산이 없으면 전액 회수가 어려울 수 있어요. 우선변제권은 다른 채권자보다 먼저 배당받는 권리이지, 전액 보장은 아니죠.",
  },
  {
    q: "체당금 신청 후 얼마나 걸리나요?",
    a: "서류가 완비되면 보통 2~4주 안에 입금돼요. 서류 보완이 필요하면 더 걸릴 수 있으니, 처음부터 빠짐없이 준비하세요.",
  },
  {
    q: "체당금을 받은 후 추가로 청구할 수 있나요?",
    a: "체당금 상한액을 초과하는 미지급 퇴직금이 있다면 파산 절차에서 별도로 배당 청구를 할 수 있어요. 민사 소송으로 사업주 개인에게 청구하는 방법도 있죠.",
  },
  {
    q: "사실상 도산 인정은 어떻게 받나요?",
    a: "관할 고용노동지청에 '사실상 도산 인정' 신청서를 제출하면 돼요. 사업 중단, 사업주 연락 두절 등을 소명하는 자료를 첨부하세요. 인정 결정이 나오면 체당금 신청이 가능해져요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "임금채권보장법 — 체당금 제도", url: "https://www.law.go.kr/법령/임금채권보장법" },
      { label: "근로기준법 제38조 — 임금 우선변제", url: "https://www.law.go.kr/법령/근로기준법" },
      { label: "채무자 회생 및 파산에 관한 법률", url: "https://www.law.go.kr/법령/채무자회생및파산에관한법률" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "근로복지공단 — 체당금 신청", url: "https://www.comwel.or.kr" },
      { label: "고용노동부 — 사실상 도산 인정", url: "https://www.moel.go.kr" },
    ],
  },
];

const RELATED = [
  {
    slug: "회사-폐업-퇴직금",
    title: "회사 폐업 시 퇴직금 받는 법",
    description: "회사가 폐업해도 퇴직금을 받을 수 있는 방법을 정리했어요.",
  },
  {
    slug: "대지급금-퇴직금-DB-DC-퇴직연금",
    title: "대지급금으로 퇴직금 받기",
    description: "대지급금 제도와 DB형·DC형 퇴직연금 적용 방법을 정리했어요.",
  },
  {
    slug: "퇴직금-미지급-지급받는-방법",
    title: "퇴직금 미지급 시 받는 방법",
    description: "퇴직금을 못 받았을 때 가장 빠르게 지급받는 방법을 정리했어요.",
  },
];

export default function Page() {
  return (
    <ArticleLayout
      sidebar={
        <Sidebar
          heading="퇴직금 가이드"
          items={퇴직금_SIDEBAR}
          currentSlug="회사-폐업-퇴직금-체당금-신청-우선변제권"
        />
      }
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>퇴직금 · 체당금 · 우선변제권</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        회사 폐업 퇴직금 체당금 신청과<br />
        우선변제권
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        회사가 폐업했는데 퇴직금을 받지 못했다면, 체당금과 우선변제권을 활용할 수 있어요.
        <a href="https://www.law.go.kr/법령/임금채권보장법" style={{ color: "#1D9E75", textDecoration: "underline" }}>임금채권보장법</a>에 따라 국가가 사업주 대신 퇴직금을 지급하는 게 체당금이고,
        <a href="https://www.law.go.kr/법령/근로기준법" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로기준법 제38조</a>에 따라 다른 채권자보다 먼저 배당받는 권리가 우선변제권이에요.
        두 제도를 함께 활용하면 폐업 상황에서도 퇴직금을 최대한 회수할 수 있죠.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>체당금 제도가 정확히 뭔가요?</H2>
      <p style={body}>
        체당금은 사업주가 파산·회생·도산으로 임금과 퇴직금을 지급하지 못할 때, <a href="https://www.comwel.or.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로복지공단</a>이 사업주 대신 지급하는 제도예요. 국가가 먼저 근로자에게 지급하고, 나중에 사업주에게 구상권을 행사하는 구조이죠.
      </p>
      <p style={body}>
        도산 체당금과 일반 체당금(소액체당금) 두 종류가 있어요. 도산 체당금은 법원의 파산·회생 결정이 있거나 고용노동부의 사실상 도산 인정이 있는 경우에 신청할 수 있죠. 일반 체당금은 소송이나 확정 명령으로 미지급이 확인된 경우에 적용돼요.
      </p>
      <p style={body}>
        회사가 폐업한 경우 대부분 도산 체당금에 해당해요. 사장이 잠적했거나 사업장이 폐쇄됐다면 고용노동부에 &ldquo;사실상 도산 인정&rdquo;을 신청하면 되죠. 인정 결정이 나오면 바로 체당금을 신청할 수 있어요.
      </p>

      <Divider />

      <H2>우선변제권이란 뭔가요?</H2>
      <p style={body}>
        우선변제권은 근로자의 임금·퇴직금 채권이 다른 채권자보다 먼저 변제받는 권리예요. 근로기준법 제38조에 따라 최종 3개월분 임금과 최종 3년분 퇴직금은 질권·저당권보다도 우선해서 변제받을 수 있죠.
      </p>
      <p style={body}>
        쉽게 말하면 회사가 파산해서 남은 재산을 나눌 때, 은행 대출금보다 근로자의 밀린 임금과 퇴직금이 먼저 지급된다는 뜻이에요. 이 권리가 있기 때문에 회사에 남은 재산이 있다면 퇴직금 회수 가능성이 높아지죠.
      </p>
      <p style={body}>
        다만 회사에 남은 재산 자체가 없으면 우선변제권이 있어도 실질적으로 받기 어려울 수 있어요. 그래서 체당금으로 먼저 받을 수 있는 금액을 확보하고, 나머지를 우선변제권으로 회수하는 전략이 효과적이에요.
      </p>

      <GreenBox title="체당금 + 우선변제권 활용 전략">
        1단계: <strong>체당금 신청</strong> → 상한액 범위 내 빠르게 확보<br />
        2단계: <strong>우선변제권 행사</strong> → 파산 절차에서 잔액 회수<br />
        3단계: <strong>민사 소송</strong> → 사업주 개인 재산으로 나머지 회수
      </GreenBox>

      <SectionBadge>내 상황에 해당되는지 체크해보세요</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="4가지 다 해당되네요. 체당금 신청과 우선변제권 행사를 동시에 진행하세요."
        partialMatchText="일부만 해당돼요. 근로복지공단(1588-0075)에 전화해서 자격 여부를 먼저 확인하세요."
      />

      {/* ── 섹션 2 끝 → 버튼 + 관련 글 ── */}
      <CategoryButton label="퇴직금 정보" count={퇴직금_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      <H2>체당금 신청 자격과 한도는?</H2>
      <p style={body}>
        도산 체당금은 파산·회생 신청일 또는 사실상 도산 인정일 기준으로 퇴직일이 6개월 전~2년 이내인 근로자가 신청할 수 있어요. 6개월 전이라는 건 파산 신청 전 6개월 이내에 퇴직한 경우를 포함한다는 뜻이죠.
      </p>
      <p style={body}>
        퇴직금 체당금 한도는 나이에 따라 달라요. 연령별 월 상한액이 정해져 있고, 최대 3년분까지 지급돼요. 2026년 기준 퇴직금 체당금 최대 한도는 약 700만 원 수준이에요. 정확한 금액은 근로복지공단 홈페이지에서 확인하세요.
      </p>
      <p style={body}>
        일반 체당금(소액체당금)은 고용노동부의 체불 확인 명령이나 법원 판결이 있으면 신청할 수 있어요. 한도는 최대 1,000만 원이에요. 도산 체당금보다 절차가 좀 더 복잡하지만, 폐업 회사에 대해서도 적용 가능하죠.
      </p>

      <Divider />

      <H2>체당금 신청 절차는 어떻게 되나요?</H2>
      <p style={body}>
        먼저 고용노동부에 퇴직금 미지급 진정을 넣으세요. 사실상 도산의 경우 &ldquo;사실상 도산 인정&rdquo; 신청도 함께 하면 돼요. 파산·회생의 경우 법원의 결정문 사본을 준비하세요.
      </p>
      <p style={body}>
        도산 인정 결정(또는 파산 결정)이 나오면 근로복지공단에 체당금 지급 청구서를 제출해요. 신분증, 통장 사본, 퇴직금 미지급 확인서류를 함께 내면 되죠. 온라인이나 공단 지사 방문 모두 가능해요.
      </p>
      <p style={body}>
        공단이 서류를 심사하고, 문제가 없으면 2~4주 안에 지정 계좌로 입금돼요. 서류 보완이 필요하면 연락이 오니까, 처음부터 빠짐없이 준비하는 게 시간을 아끼는 방법이에요.
      </p>

      <Divider />

      <H2>체당금으로 퇴직금 전액을 받을 수 있나요?</H2>
      <p style={body}>
        상한액 이내라면 전액 받을 수 있어요. 하지만 퇴직금이 상한액을 초과하면 나머지는 별도로 회수해야 하죠. 파산 절차에서 채권 신고를 하면 우선변제권에 따라 배당받을 수 있어요.
      </p>
      <p style={body}>
        <a href="/w/대지급금-퇴직금-DB-DC-퇴직연금" style={{ color: "#1D9E75", textDecoration: "underline" }}>대지급금 제도</a>를 활용하는 것도 방법이에요. 퇴직연금(DB형, DC형)이 있었다면 별도 경로로 적립금을 수령할 수 있죠. 퇴직연금 가입 여부는 퇴직연금 사업자(은행, 보험사 등)에 확인하세요.
      </p>
      <p style={body}>
        사업주 개인 재산이 있다면 민사 소송으로 회수하는 방법도 있어요. 법률 비용이 부담되면 대한법률구조공단(132)에서 무료 법률 지원을 받을 수 있죠. 포기하지 않으면 회수 경로는 생각보다 다양해요.
      </p>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        회사 폐업 체당금과 우선변제권에 대해 실제로 자주 나오는 질문만 골랐어요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 임금채권보장법과 근로기준법을 바탕으로 작성됐어요. 제도 변경이 있을 수 있으니, 최신 기준은 근로복지공단(1588-0075)에서 확인하세요." />
    </ArticleLayout>
  );
}
