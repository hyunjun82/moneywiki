"use client";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Calculator, EligibilityChecker, Steps, DocTable, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 퇴직금_SIDEBAR } from "@/data/퇴직금-guide";

const CHECK_ITEMS = [
  { id: "c1", label: "회사가 파산·회생·폐업 상태예요" },
  { id: "c2", label: "퇴직금을 아직 받지 못했어요" },
  { id: "c3", label: "퇴직 후 2년(도산 체당금) 또는 3년(소멸시효) 이내예요" },
  { id: "c4", label: "근로 사실을 입증할 서류가 있어요" },
];

const CALC_SLIDERS = [
  { id: "salary", label: "월 급여", min: 150, max: 600, step: 10, defaultValue: 300, format: (v: number) => `${v}만원` },
  { id: "months", label: "근속 기간", min: 12, max: 120, step: 1, defaultValue: 36, format: (v: number) => `${v}개월` },
];

const CALC_RESULTS = [
  {
    label: "예상 퇴직금",
    getValue: (v: Record<string, number>) => Math.round(v.salary * 10000 * (v.months / 12)),
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원`,
    highlight: true,
  },
  {
    label: "체당금 적용 상한 (최대 700만원)",
    getValue: (v: Record<string, number>) => {
      const severance = Math.round(v.salary * 10000 * (v.months / 12));
      return Math.min(severance, 7000000);
    },
    format: (v: number) => `최대 ${Math.round(v / 10000).toLocaleString()}만원`,
  },
];

const DOCS = [
  { name: "퇴직금 미지급 확인서", required: true, where: "고용노동부 발급" },
  { name: "근로계약서 또는 재직 증빙", required: true, where: "인사팀 또는 본인 보관본" },
  { name: "급여명세서 또는 통장 이체 내역", required: true, where: "은행 앱·인터넷뱅킹 출력" },
  { name: "신분증 + 통장 사본", required: true, where: "본인 지참" },
  { name: "파산·회생 결정문 (도산 체당금 시)", required: false, where: "법원 또는 고용노동부" },
];

const STEPS = [
  {
    title: "고용노동부에 진정 접수",
    desc: "퇴직금 미지급 진정을 고용노동부 민원마당에서 접수해요. 사장이 잠적했다면 사실상 도산 인정 신청도 함께 하면 돼요. 파산·회생 절차가 진행 중이라면 법원 결정문을 준비하면 되죠.",
    tip: "minwon.moel.go.kr에서 24시간 온라인 신청 가능해요",
  },
  {
    title: "사실상 도산 인정 또는 법원 결정 확보",
    desc: "사업 중단·사장 연락 두절 등이 확인되면 고용노동부가 사실상 도산으로 인정해 줘요. 파산·회생의 경우 법원의 결정문이 이 역할을 해요. 인정 결정이 나야 체당금 신청이 가능하죠.",
    tip: "인정 결정까지 보통 2~4주 소요돼요",
  },
  {
    title: "근로복지공단에 체당금 신청",
    desc: "도산 인정 후 근로복지공단에 체당금 지급 청구서를 제출해요. 신분증, 통장 사본, 퇴직금 미지급 확인서류를 첨부하면 돼요. 온라인(공단 홈페이지) 또는 가까운 지사 방문 모두 가능하죠.",
    tip: "서류 완비 시 보통 2~4주 안에 입금돼요",
  },
  {
    title: "우선변제권으로 잔액 회수",
    desc: "체당금 상한액을 초과하는 퇴직금이 남아 있다면 파산 절차에서 채권 신고를 해요. 근기법 제38조에 따라 최종 3년분 퇴직금은 최우선 변제 순위를 가지죠. 회사에 남은 재산이 있으면 다른 채권자보다 먼저 배당받아요.",
    tip: "법률구조공단(132) 무료 법률 지원을 활용해보세요",
  },
];

const CHECKLIST = [
  "고용노동부 진정: 퇴직 후 3년 소멸시효 내 접수",
  "사실상 도산 인정: 사업 중단 증빙 자료 준비",
  "체당금 신청: 근로복지공단(1588-0075) 접수",
  "우선변제권: 파산 절차 채권 신고로 잔액 회수",
  "법률구조공단(132): 무료 법률 지원 활용",
];

const FAQS = [
  {
    q: "체당금 신청은 어디에 하나요?",
    a: "근로복지공단(1588-0075)에 신청해요. 온라인(공단 홈페이지)이나 가까운 지사 방문 모두 가능하죠.",
  },
  {
    q: "우선변제권이 있으면 퇴직금을 전액 받을 수 있나요?",
    a: "우선변제권이 있어도 회사에 남은 재산이 없으면 전액 회수가 어려울 수 있어요. 우선변제권은 다른 채권자보다 먼저 배당받는 권리이지, 전액 보장은 아니에요.",
  },
  {
    q: "체당금 신청 후 얼마나 걸리나요?",
    a: "서류가 완비되면 보통 2~4주 안에 입금돼요. 서류 보완이 필요하면 더 걸릴 수 있으니, 처음부터 빠짐없이 준비하세요.",
  },
  {
    q: "체당금을 받은 후 추가로 청구할 수 있나요?",
    a: "상한액을 초과하는 미지급 퇴직금이 있다면 파산 절차에서 별도로 배당 청구를 할 수 있어요. 민사 소송으로 사업주 개인에게 청구하는 방법도 있죠.",
  },
  {
    q: "사실상 도산 인정은 어떻게 받나요?",
    a: "관할 고용노동지청에 사실상 도산 인정 신청서를 제출하면 돼요. 사업 중단·사업주 연락 두절 등을 소명하는 자료를 첨부하세요. 인정 결정이 나오면 체당금 신청이 가능해져요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "임금채권보장법: 체당금 제도", url: "https://www.law.go.kr/법령/임금채권보장법" },
      { label: "근로기준법 제38조: 임금 우선변제", url: "https://www.law.go.kr/법령/근로기준법" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "근로복지공단: 체당금 신청", url: "https://www.comwel.or.kr" },
      { label: "고용노동부 민원마당", url: "https://minwon.moel.go.kr" },
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
      sidebar={<Sidebar heading="퇴직금 가이드" items={퇴직금_SIDEBAR} currentSlug="회사-폐업-퇴직금-체당금-신청-우선변제권" />}
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>퇴직금 · 체당금 · 우선변제권</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        회사 폐업 퇴직금 체당금 신청과<br />
        우선변제권 활용법
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        회사가 폐업했는데 퇴직금을 받지 못했다면, 체당금과 우선변제권을 활용할 수 있어요.
        <a href="https://www.law.go.kr/법령/임금채권보장법" style={{ color: "#1D9E75", textDecoration: "underline" }}>임금채권보장법</a>에 따라
        국가가 사업주 대신 퇴직금을 지급하는 게 체당금이고,
        <a href="https://www.law.go.kr/법령/근로기준법" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로기준법 제38조</a>에 따라
        다른 채권자보다 먼저 배당받는 권리가 우선변제권이에요.
        두 제도를 함께 활용하면 폐업 상황에서도 퇴직금을 최대한 회수할 수 있어요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>체당금과 우선변제권, 뭐가 다른가요?</H2>
      <p style={body}>
        체당금은 국가(근로복지공단)가 사업주 대신 퇴직금을 먼저 지급해주는 제도예요.
        상한액이 있어서 퇴직금 전액을 받지 못할 수도 있지만, 절차가 빠르고 확실하죠.
        도산 체당금과 일반 체당금(소액체당금) 두 종류가 있어요.
      </p>
      <p style={body}>
        우선변제권은 회사의 남은 재산을 나눌 때 근로자 임금·퇴직금이 다른 채권보다 먼저 변제받는 권리예요.
        근기법 제38조에 따라 최종 3개월분 임금과 최종 3년분 퇴직금은 은행 담보권보다도 우선해요.
        회사에 남은 재산이 있다면 파산 절차에서 추가로 회수할 수 있죠.
      </p>

      <GreenBox title="체당금 + 우선변제권 활용 전략">
        1단계: 체당금 신청 - 상한액 범위 내 빠르게 확보<br />
        2단계: 우선변제권 행사 - 파산 절차에서 잔액 회수<br />
        3단계: 민사 소송 - 사업주 개인 재산으로 나머지 회수
      </GreenBox>

      <SectionBadge>내 상황 체크해보세요</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="체당금 신청과 우선변제권 행사가 가능해요. 아래 계산기로 예상 금액을 먼저 확인하세요."
        partialMatchText="일부 조건이 맞지 않아요. 근로복지공단(1588-0075)에 전화해서 자격 여부를 확인하세요."
      />

      <Divider />

      <H2>예상 퇴직금과 체당금 한도 확인하기</H2>
      <p style={body}>
        체당금으로 전액을 받을 수 있는지 먼저 파악해야 전략을 세울 수 있어요.
        퇴직금이 상한액(최대 700만 원 수준)보다 많다면 우선변제권 행사도 함께 진행해야 하죠.
        아래에서 월 급여와 근속 기간을 조절해보세요.
      </p>
      <p style={body}>
        체당금 상한액은 나이와 근속연수에 따라 달라지기 때문에 정확한 금액은 공단에 문의하세요.
        아래 수치는 참고용이에요.
      </p>

      <SectionBadge>퇴직금·체당금 한도 계산기</SectionBadge>
      <Calculator
        sliders={CALC_SLIDERS}
        results={CALC_RESULTS}
        note="※ 체당금 상한은 참고용이에요. 실제 한도는 연령·근속연수에 따라 달라지니 공단(1588-0075)에 확인하세요."
      />

      <CategoryButton label="퇴직금 정보" count={퇴직금_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      <H2>체당금 신청에 필요한 서류</H2>
      <p style={body}>
        회사가 폐업하면 서류 구하기가 어려워져요. 가능한 한 일하는 동안 미리 복사해두세요.
        핵심은 실제 근무 사실과 퇴직금 미지급을 입증하는 자료예요.
      </p>

      <SectionBadge>준비 서류 목록</SectionBadge>
      <DocTable docs={DOCS} />

      <Divider />

      <H2>체당금 신청부터 우선변제권 행사까지 4단계</H2>
      <p style={body}>
        체당금 신청은 고용노동부 진정 접수부터 시작돼요.
        대부분 2~3단계에서 해결되지만, 퇴직금이 상한액을 초과한다면 4단계까지 진행해야 해요.
      </p>

      <Steps steps={STEPS} />

      <Divider />

      <H2>지금 바로 챙겨야 할 것들</H2>
      <p style={body}>
        폐업 소식을 들으면 바로 움직여야 해요.
        소멸시효 3년이 지나면 퇴직금 청구권 자체가 사라지고,
        시간이 지날수록 증빙 자료를 구하기 어려워지죠.
      </p>

      <SectionBadge>준비 체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

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
