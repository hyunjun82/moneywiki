"use client";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Calculator, EligibilityChecker, Steps, DocTable, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 퇴직금_SIDEBAR } from "@/data/퇴직금-guide";

const CHECK_ITEMS = [
  { id: "c1", label: "회사가 폐업했거나 사실상 사업을 중단했어요" },
  { id: "c2", label: "1년 이상 근무하고 주 15시간 이상 일했어요" },
  { id: "c3", label: "퇴직금을 아직 받지 못했어요" },
  { id: "c4", label: "퇴직 후 아직 3년이 지나지 않았어요" },
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
    label: "체당금 상한 (참고: 연령별 최대 700만원)",
    getValue: (v: Record<string, number>) => {
      const severance = Math.round(v.salary * 10000 * (v.months / 12));
      return Math.min(severance, 7000000);
    },
    format: (v: number) => `최대 ${Math.round(v / 10000).toLocaleString()}만원`,
  },
];

const DOCS = [
  { name: "근로계약서 또는 재직 증빙", required: true, where: "인사팀 또는 본인 보관본" },
  { name: "급여명세서 또는 통장 이체 내역", required: true, where: "은행 앱·인터넷뱅킹 출력" },
  { name: "퇴직금 미지급 확인서", required: true, where: "고용노동부 발급" },
  { name: "4대보험 가입 이력", required: false, where: "고용24(ei.go.kr) 무료 조회" },
  { name: "파산·회생 결정문 (도산 체당금 시)", required: false, where: "법원 또는 고용노동부" },
];

const STEPS = [
  {
    title: "고용노동부에 진정 접수",
    desc: "퇴직금 미지급 진정을 고용노동부 민원마당에서 온라인으로 접수해요. 사장이 잠적했다면 사실상 도산 인정 신청도 함께 하면 돼요. 진정이 접수되면 근로감독관이 조사에 들어가죠.",
    tip: "minwon.moel.go.kr에서 24시간 온라인 신청 가능해요",
  },
  {
    title: "사실상 도산 인정 획득",
    desc: "사업 중단·사장 연락 두절 등이 확인되면 고용노동부가 사실상 도산으로 인정해 줘요. 파산·회생 절차가 진행 중이라면 법원의 결정문이 이 역할을 하죠. 인정 결정이 나와야 체당금 신청이 가능해요.",
    tip: "인정 결정까지 보통 2~4주 소요돼요",
  },
  {
    title: "근로복지공단에 체당금 신청",
    desc: "도산 인정 결정 후 근로복지공단에 체당금 지급 청구서를 제출해요. 신분증, 통장 사본, 퇴직금 미지급 확인서류를 첨부하면 되죠. 온라인(공단 홈페이지) 또는 가까운 지사 방문 모두 가능해요.",
    tip: "서류 완비 시 보통 2~4주 안에 입금돼요",
  },
  {
    title: "우선변제권으로 잔액 회수",
    desc: "체당금 상한액을 초과하는 퇴직금이 남아 있다면 파산 절차에서 채권 신고를 해요. 근기법 제38조에 따라 임금·퇴직금은 최우선 변제 순위를 가져요. 남은 재산이 있으면 다른 채권자보다 먼저 배당받을 수 있죠.",
    tip: "법률구조공단(132) 무료 법률 지원을 받아보세요",
  },
];

const CHECKLIST = [
  "고용노동부 진정: 퇴직 후 3년 소멸시효 내 접수",
  "사실상 도산 인정: 사업 중단 증빙 자료 준비",
  "체당금 신청: 근로복지공단(1588-0075) 접수",
  "급여명세서·통장 내역: 퇴직금 산정 증빙 보관",
  "우선변제권: 파산 절차 채권 신고로 잔액 회수",
];

const FAQS = [
  {
    q: "회사가 폐업하면 퇴직금을 아예 못 받나요?",
    a: "아니에요. 임금채권보장법에 따른 체당금 제도를 통해 퇴직금의 일부를 받을 수 있어요. 근로복지공단에 신청하면 돼요.",
  },
  {
    q: "체당금 상한액은 얼마인가요?",
    a: "나이와 근속연수에 따라 다르지만 퇴직금 체당금은 최대 700만 원 수준이에요. 정확한 금액은 근로복지공단 홈페이지에서 확인하세요.",
  },
  {
    q: "사장이 잠적하면 어떻게 하나요?",
    a: "고용노동부에 사실상 도산 인정 신청을 하면 돼요. 사업주와 연락이 안 되고 사업 활동이 중단된 상태가 확인되면 체당금을 신청할 수 있어요.",
  },
  {
    q: "체당금으로 전액을 받지 못하면 나머지는 어떻게 하나요?",
    a: "파산 절차에서 우선변제권을 행사해서 잔액을 회수할 수 있어요. 다만 회사에 남은 재산이 없으면 회수가 어려울 수 있어요. 법률구조공단(132)에서 무료 상담을 받아보세요.",
  },
  {
    q: "체당금 신청 후 얼마나 걸리나요?",
    a: "서류가 완비되면 보통 2~4주 안에 입금돼요. 서류 보완이 필요하면 공단에서 연락이 오니 처음부터 빠짐없이 준비하세요.",
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
      { label: "근로복지공단: 체당금 신청 안내", url: "https://www.comwel.or.kr" },
      { label: "고용노동부 민원마당: 퇴직금 진정", url: "https://minwon.moel.go.kr" },
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
      sidebar={<Sidebar heading="퇴직금 가이드" items={퇴직금_SIDEBAR} currentSlug="회사-폐업-퇴직금" />}
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>퇴직금 · 폐업 · 체당금</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        회사 폐업 시 퇴직금,<br />
        체당금 신청으로 받는 방법
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        다니던 회사가 갑자기 폐업하면 퇴직금을 포기해야 하나 싶죠.
        포기하지 마세요. 회사가 문을 닫아도 퇴직금을 받을 수 있는 길이 있어요.
        <a href="https://www.law.go.kr/법령/임금채권보장법" style={{ color: "#1D9E75", textDecoration: "underline" }}>임금채권보장법</a>에 따른
        체당금(대지급금) 제도가 바로 그거예요.
        국가가 사업주 대신 퇴직금 일부를 지급해주는 구조죠.
        체당금 신청 방법부터 우선변제권, 잔액 회수까지 단계별로 정리했어요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>회사가 폐업해도 퇴직금을 받을 수 있는 조건</H2>
      <p style={body}>
        조건은 두 가지예요. 1년 이상 근무하고 주 15시간 이상 일했다면 폐업 여부와 관계없이 퇴직금 청구권이 생겨요.
        문제는 사업주가 지급할 능력이 없는 상황이기 때문에 체당금 제도를 활용해야 하죠.
      </p>
      <p style={body}>
        체당금은 회사가 파산·회생 절차를 밟고 있거나, 사실상 도산 상태(사업 중단·사장 잠적 등)가 확인된 경우에 신청할 수 있어요.
        소멸시효는 퇴직일로부터 3년이에요. 3년 안에 움직여야 해요.
      </p>

      <GreenBox title="폐업 시 퇴직금 회수 경로">
        체당금: 근로복지공단 신청, 상한액 내 지급<br />
        우선변제권: 파산 절차에서 임금채권 우선 배당<br />
        민사 소송: 사업주 개인 재산으로 추가 회수
      </GreenBox>

      <SectionBadge>내 상황 체크해보세요</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="체당금 신청 조건을 갖췄어요. 아래 계산기로 예상 금액을 확인해보세요."
        partialMatchText="일부 조건이 맞지 않아요. 근로복지공단(1588-0075)에 전화해서 자격 여부를 확인하세요."
      />

      <Divider />

      <H2>예상 퇴직금과 체당금 한도 계산하기</H2>
      <p style={body}>
        체당금으로 전액을 받을 수 있는지 먼저 파악해야 해요.
        퇴직금이 체당금 상한액(최대 700만 원 수준)보다 많다면 우선변제권으로 잔액을 추가로 회수해야 하죠.
        아래에서 월 급여와 근속 기간을 조절해보세요.
      </p>
      <p style={body}>
        체당금 상한액은 나이와 근속연수에 따라 달라져요.
        정확한 한도는 근로복지공단(1588-0075)에 문의하거나 공단 홈페이지에서 확인하세요.
      </p>

      <SectionBadge>퇴직금·체당금 계산기</SectionBadge>
      <Calculator
        sliders={CALC_SLIDERS}
        results={CALC_RESULTS}
        note="※ 체당금 상한은 참고용이에요. 실제 한도는 연령·근속연수에 따라 달라져요."
      />

      <CategoryButton label="퇴직금 정보" count={퇴직금_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      <H2>체당금 신청에 필요한 서류</H2>
      <p style={body}>
        회사가 폐업하면 서류를 구하기 어려워져요. 가능한 한 일하는 동안 미리 복사해두는 게 안전하죠.
        핵심은 실제 근무 사실과 퇴직금 미지급을 증빙하는 자료예요.
      </p>

      <SectionBadge>준비 서류 목록</SectionBadge>
      <DocTable docs={DOCS} />

      <BorderBox title="4대보험이 없어도 신청 가능해요">
        4대보험 미가입이어도 실제 근무 사실이 증명되면 체당금을 신청할 수 있어요.
        통장 이체 내역, 카카오톡 대화, 동료 근로자 증언도 증거가 돼요.
      </BorderBox>

      <Divider />

      <H2>단계별 체당금 신청 절차</H2>
      <p style={body}>
        체당금 신청은 고용노동부 진정부터 시작해요.
        대부분 2~3단계에서 해결되지만, 4단계까지 가더라도 포기하지 마세요.
      </p>

      <Steps steps={STEPS} />

      <Divider />

      <H2>지금 바로 챙겨야 할 것들</H2>
      <p style={body}>
        폐업 소식을 들으면 바로 움직여야 해요. 시간이 지날수록 서류를 구하기 어려워지고,
        소멸시효 3년이 지나면 청구권 자체가 사라지죠.
      </p>

      <SectionBadge>준비 체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

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
