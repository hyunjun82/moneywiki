"use client";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  EligibilityChecker, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 퇴직금_SIDEBAR } from "@/data/퇴직금-guide";

const CHECK_ITEMS = [
  { id: "c1", label: "회사가 도산(파산·회생·폐업)해서 퇴직금을 못 받았어요" },
  { id: "c2", label: "퇴직연금(DB형 또는 DC형)에 가입돼 있었어요" },
  { id: "c3", label: "퇴직일이 도산 인정일 기준 6개월 전~2년 이내예요" },
  { id: "c4", label: "근로 사실을 입증할 서류가 있어요" },
];

const FAQS = [
  {
    q: "대지급금과 체당금은 같은 건가요?",
    a: "거의 같은 의미로 쓰여요. 임금채권보장법에서 공식 명칭은 '체당금'인데, 실무에서는 '대지급금'이라고도 불러요. 국가가 사업주 대신 지급한다는 점에서 동일한 제도이죠.",
  },
  {
    q: "DB형 퇴직연금인데 적립금이 부족하면 어떻게 되나요?",
    a: "DB형은 사업주가 운용 책임을 지기 때문에 적립금이 부족해도 퇴직금 전액을 지급해야 해요. 사업주가 도산하면 부족분을 대지급금으로 신청할 수 있죠.",
  },
  {
    q: "DC형이면 적립금을 그대로 받을 수 있나요?",
    a: "DC형은 개인 계좌에 적립된 금액을 그대로 받는 구조예요. 사업주가 도산해도 이미 적립된 금액은 근로자 명의 계좌에 있으니 안전하죠. 다만 미납된 부금이 있다면 대지급금으로 청구할 수 있어요.",
  },
  {
    q: "대지급금 신청 한도는 얼마인가요?",
    a: "퇴직금 대지급금 한도는 나이와 근속연수에 따라 다르지만, 최대 약 700만 원 수준이에요. 정확한 금액은 근로복지공단 홈페이지에서 확인하세요.",
  },
  {
    q: "퇴직연금 적립금과 대지급금을 둘 다 받을 수 있나요?",
    a: "퇴직연금에 이미 적립된 금액을 받고, 부족분(미납 부금분)만 대지급금으로 신청하는 구조예요. 중복 수령은 안 되지만, 미납분에 대해서는 별도 청구가 가능하죠.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "임금채권보장법 — 체당금(대지급금)", url: "https://www.law.go.kr/법령/임금채권보장법" },
      { label: "근로자퇴직급여 보장법 — DB형·DC형 퇴직연금", url: "https://www.law.go.kr/법령/근로자퇴직급여보장법" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "근로복지공단 — 대지급금 신청", url: "https://www.comwel.or.kr" },
      { label: "고용노동부 — 퇴직연금 안내", url: "https://www.moel.go.kr" },
    ],
  },
];

const RELATED = [
  {
    slug: "회사-폐업-퇴직금-체당금-신청-우선변제권",
    title: "회사 폐업 체당금 신청과 우선변제권",
    description: "체당금 신청 절차와 우선변제권 활용법을 정리했어요.",
  },
  {
    slug: "퇴직금-제도-종류",
    title: "퇴직금 제도 종류 DB DC IRP",
    description: "DB형, DC형, IRP의 차이와 특징을 정리했어요.",
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
          currentSlug="대지급금-퇴직금-DB-DC-퇴직연금"
        />
      }
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>퇴직금 · 대지급금 · DB형·DC형</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        대지급금으로 퇴직금 받기,<br />
        DB형·DC형 적용 방법은?
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        회사가 도산해서 퇴직금을 못 받았다면, 대지급금(체당금) 제도를 활용할 수 있어요.
        <a href="https://www.law.go.kr/법령/임금채권보장법" style={{ color: "#1D9E75", textDecoration: "underline" }}>임금채권보장법</a>에 따라 국가가 사업주 대신 퇴직금을 지급해주는 구조이죠.
        퇴직연금(DB형·DC형)에 가입돼 있었다면 적립금 수령과 대지급금 신청을 함께 진행할 수 있어요.
        대지급금의 정확한 의미, DB형과 DC형별 적용 방법, 신청 절차까지 하나씩 짚어볼게요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>대지급금이란 뭔가요?</H2>
      <p style={body}>
        대지급금은 사업주가 파산·회생·도산으로 임금과 퇴직금을 지급하지 못할 때, 국가가 대신 지급하는 돈이에요. 법률 용어로는 &ldquo;체당금&rdquo;이라고 하죠. <a href="https://www.comwel.or.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로복지공단</a>이 운영하고 있어요.
      </p>
      <p style={body}>
        국가가 먼저 근로자에게 지급한 뒤, 나중에 사업주에게 구상권을 행사하는 구조예요. 근로자 입장에서는 회사가 망해도 퇴직금을 받을 수 있는 안전장치이죠. 다만 상한액이 있어서 전액을 받지 못할 수도 있어요.
      </p>
      <p style={body}>
        대지급금은 퇴직금뿐 아니라 밀린 임금(최종 3개월분)과 휴업수당(최종 3개월분)도 지급 대상이에요. 퇴직금은 최종 3년치까지 지급되죠. 전부 합쳐서 신청하면 한 번에 처리돼요.
      </p>

      <Divider />

      <H2>DB형·DC형 퇴직연금도 대지급금 적용이 되나요?</H2>
      <p style={body}>
        적용 방식이 좀 달라요. <strong>DB형(확정급여형)</strong>은 사업주가 운용 책임을 지는 구조라서, 적립금이 부족하면 부족분을 사업주가 추가로 납부해야 해요. 사업주가 도산해서 추가 납부가 불가능하면 그 부족분을 대지급금으로 신청할 수 있죠.
      </p>
      <p style={body}>
        <strong>DC형(확정기여형)</strong>은 사업주가 매월 근로자 계좌에 부금을 넣는 구조예요. 이미 적립된 금액은 근로자 명의 계좌에 있으니 사업주 도산과 관계없이 안전하죠. 다만 사업주가 부금을 미납한 경우에는 미납분을 대지급금으로 청구할 수 있어요.
      </p>
      <p style={body}>
        <a href="https://www.law.go.kr/법령/근로자퇴직급여보장법" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로자퇴직급여 보장법</a>에 따라 퇴직연금 사업자(은행, 보험사 등)에게 적립금 현황을 조회할 수 있어요. 도산 전에 미리 확인해두면 대지급금 신청 시 어떤 금액을 청구해야 하는지 정확히 알 수 있죠.
      </p>

      <GreenBox title="DB형 vs DC형 대지급금 적용">
        <strong>DB형</strong>: 적립금 부족분 → 대지급금 신청 가능<br />
        <strong>DC형</strong>: 미납 부금분 → 대지급금 신청 가능 / 이미 적립분 → 그대로 수령
      </GreenBox>

      <SectionBadge>내 상황에 해당되는지 체크해보세요</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="4가지 다 해당되네요. 퇴직연금 적립금 확인과 대지급금 신청을 동시에 진행하세요."
        partialMatchText="일부만 해당돼요. 퇴직연금 가입 여부를 확인한 뒤 근로복지공단(1588-0075)에 상담받아보세요."
      />

      {/* ── 섹션 2 끝 → 버튼 + 관련 글 ── */}
      <CategoryButton label="퇴직금 정보" count={퇴직금_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      <H2>대지급금 신청 자격은?</H2>
      <p style={body}>
        도산 대지급금은 파산·회생 신청일 또는 사실상 도산 인정일 기준으로 퇴직일이 6개월 전~2년 이내인 근로자가 대상이에요. 6개월 전이란 도산 전에 이미 퇴직한 경우를 포함한다는 뜻이죠.
      </p>
      <p style={body}>
        사실상 도산(폐업·사업주 잠적 등)의 경우에는 먼저 고용노동부에 &ldquo;사실상 도산 인정&rdquo;을 신청해야 해요. 인정 결정이 나온 뒤 근로복지공단에 대지급금을 신청하는 순서이죠.
      </p>
      <p style={body}>
        퇴직연금 가입자라면 연금 사업자에게 적립금 현황을 먼저 조회하세요. <a href="/w/퇴직금-제도-종류" style={{ color: "#1D9E75", textDecoration: "underline" }}>퇴직금 제도 종류</a>에 따라 적립금을 직접 수령하고, 부족분(또는 미납분)만 대지급금으로 신청하는 게 효율적이에요.
      </p>

      <Divider />

      <H2>대지급금 신청 절차와 한도는?</H2>
      <p style={body}>
        근로복지공단 홈페이지나 가까운 지사에서 신청할 수 있어요. 필요 서류는 도산 확인 서류(파산 결정문 또는 사실상 도산 인정서), 신분증, 통장 사본, 퇴직금 미지급 확인 서류예요.
      </p>
      <p style={body}>
        퇴직금 대지급금 한도는 나이에 따라 달라지고, 최대 약 700만 원 수준이에요. 밀린 임금과 휴업수당도 별도 한도가 있으니, 퇴직금·임금·휴업수당을 합산하면 실제 수령액이 더 커질 수 있죠.
      </p>
      <p style={body}>
        서류 심사 후 보통 2~4주 안에 입금돼요. <a href="/w/회사-폐업-퇴직금-체당금-신청-우선변제권" style={{ color: "#1D9E75", textDecoration: "underline" }}>체당금 신청</a>과 동시에 <a href="/w/퇴직금-미지급-신고" style={{ color: "#1D9E75", textDecoration: "underline" }}>퇴직금 미지급 신고</a>도 함께 진행하면 절차가 빨라져요.
      </p>

      <Divider />

      <H2>대지급금 수령 후 추가 청구가 가능한가요?</H2>
      <p style={body}>
        대지급금 상한액을 초과하는 미지급 퇴직금이 있다면 파산 절차에서 채권 신고를 해서 배당받을 수 있어요. 근로기준법 제38조의 우선변제권이 적용되니까 다른 채권자보다 먼저 배당받을 수 있죠.
      </p>
      <p style={body}>
        사업주 개인 재산이 있다면 민사 소송으로 잔액을 회수하는 것도 가능해요. 법률 비용이 부담되면 대한법률구조공단(132)에서 무료 법률 지원을 받을 수 있죠.
      </p>
      <p style={body}>
        소멸시효가 퇴직일로부터 <strong>3년</strong>이니까, 대지급금 수령 후에도 잔액 청구를 3년 안에 진행해야 해요. 대지급금을 먼저 받아 당장의 생활을 안정시키고, 잔액은 차근차근 회수하는 전략이 현실적이에요.
      </p>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        대지급금과 퇴직연금에 대해 실제로 자주 나오는 질문만 골랐어요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 임금채권보장법과 근로자퇴직급여 보장법을 바탕으로 작성됐어요. 제도 변경이 있을 수 있으니, 최신 기준은 근로복지공단(1588-0075)에서 확인하세요." />
    </ArticleLayout>
  );
}
