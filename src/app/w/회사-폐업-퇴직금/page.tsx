"use client";

// Q1. 회사가 갑자기 폐업했거나 사장이 잠적해서 퇴직금을 한 푼도 못 받은 상황이고, 어디에 어떻게 신청해야 하는지 몰라 막막한 상태.
// Q2. 체당금을 근로복지공단에 신청해서 퇴직금(또는 최대 가능 금액)을 실제로 받아낸다.
// Q2-1. 근로복지공단 체당금 신청 페이지(comwel.or.kr) 또는 고용노동부 민원 신고 페이지(minwon.moel.go.kr)를 클릭.
// Q3. 체당금 신청 조건(1년 이상 근로·도산 요건), 사실상 도산 인정 절차, 체당금 상한액과 초과분 처리(우선변제권), 소멸시효 3년, 4대보험 미가입자도 신청 가능 여부.
// Q4. 조건 체커(내 상황 해당 여부) + 계산기(얼마 받을지) + 단계별 절차(Steps) + 서류 목록(DocTable) + FAQ.
//
// MAP:
// Q1 → 서론 첫 문장: "회사가 폐업했는데 퇴직금을 못 받으셨죠?"
// Q2 → H2 순서: 조건 → 계산 → 서류 → 절차 → 체크리스트 → FAQ (신청 완료까지 행동 순서)
// Q3 → H2 개수 5개·깊이: 도산 인정/소멸시효/4대보험 미가입/상한초과 처리 포함
// Q4 → EligibilityChecker + Calculator + DocTable + Steps + Checklist + FAQ

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Calculator, EligibilityChecker, Steps, DocTable, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 퇴직금_SIDEBAR, 퇴직금_HIGHLIGHT } from "@/data/퇴직금-guide";

// ─── 데이터 ──────────────────────────────────────────

const CHECK_ITEMS = [
  { id: "c1", label: "회사가 폐업했거나 사실상 사업 활동을 중단했어요" },
  { id: "c2", label: "1년 이상 계속 근로하고 주 15시간 이상 일했어요" },
  { id: "c3", label: "퇴직금을 아직 받지 못했어요" },
  { id: "c4", label: "퇴직일로부터 아직 3년이 지나지 않았어요" },
];

const CALC_SLIDERS = [
  { id: "salary", label: "월 평균 임금 (원)", min: 1000000, max: 8000000, step: 100000, defaultValue: 3000000, format: (v: number) => `${v.toLocaleString()}원` },
  { id: "years", label: "근속연수 (년)", min: 1, max: 30, step: 1, defaultValue: 3, format: (v: number) => `${v}년` },
];

const CALC_RESULTS = [
  {
    label: "퇴직금 예상액",
    getValue: (v: Record<string, number>) => Math.round((v.salary / 30) * 30 * v.years),
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원`,
    highlight: true,
  },
  {
    label: "체당금 예상 수령액 (상한 700만원 기준)",
    getValue: (v: Record<string, number>) => {
      const severance = Math.round((v.salary / 30) * 30 * v.years);
      return Math.min(severance, 7000000);
    },
    format: (v: number) => `최대 ${Math.round(v / 10000).toLocaleString()}만원 (연령·근속에 따라 다름)`,
  },
  {
    label: "체당금 초과분 (우선변제권으로 회수 필요)",
    getValue: (v: Record<string, number>) => {
      const severance = Math.round((v.salary / 30) * 30 * v.years);
      return Math.max(0, severance - 7000000);
    },
    format: (v: number) => v === 0 ? "해당 없음" : `약 ${Math.round(v / 10000).toLocaleString()}만원`,
  },
];

const DOCS = [
  { name: "근로계약서 사본", required: true, where: "회사 또는 본인 보관본" },
  { name: "급여명세서 또는 통장 입금 내역 (최근 3개월)", required: true, where: "은행 앱·인터넷뱅킹 출력" },
  { name: "퇴직금 미지급 확인서", required: true, where: "고용노동부 발급" },
  { name: "신분증 사본", required: true, where: "본인 지참" },
  { name: "통장 사본 (본인 명의)", required: true, where: "은행 발급" },
  { name: "4대보험 가입 이력 확인서", required: false, where: "고용24(ei.go.kr) 무료 조회" },
  { name: "파산·회생 결정문 (도산 체당금 해당 시)", required: false, where: "법원 또는 고용노동부" },
];

const STEPS = [
  {
    title: "고용노동부에 임금 체불 진정 접수",
    desc: "사업장 소재지 관할 고용노동부 지청에 퇴직금 미지급 진정을 접수해요. 고용24(minwon.moel.go.kr)에서 24시간 온라인 신고가 가능해요. 사장이 잠적했다면 사실상 도산 인정 신청도 함께 하면 돼요.",
    tip: "온라인 신고가 가장 빠르고 접수 즉시 관할 지청에 배분돼요",
    link: { label: "고용노동부 민원 신고", href: "https://minwon.moel.go.kr" },
  },
  {
    title: "사실상 도산 인정 받기",
    desc: "사업 중단·사장 연락 두절 등이 확인되면 고용노동부가 사실상 도산으로 인정해요. 파산·회생 절차가 진행 중이라면 법원 결정문이 이 역할을 해요. 이 인정 결정이 나와야 체당금 신청이 가능해요.",
    tip: "인정 결정까지 보통 2~4주 소요돼요",
  },
  {
    title: "근로복지공단에 체당금 신청",
    desc: "도산 인정 결정 후 근로복지공단(1588-0075)에 체당금 지급 청구서를 제출해요. 신분증, 통장 사본, 퇴직금 미지급 확인서류를 첨부하면 돼요. 공단 홈페이지(comwel.or.kr) 또는 가까운 지사 방문 모두 가능해요.",
    tip: "서류를 빠짐없이 갖추면 보통 2~4주 안에 입금돼요",
    link: { label: "근로복지공단 체당금 신청", href: "https://www.comwel.or.kr" },
  },
  {
    title: "우선변제권으로 잔액 추가 회수",
    desc: "체당금 상한액을 초과하는 퇴직금이 남아 있다면 파산 절차에서 채권 신고를 해요. 근로기준법 제38조에 따라 임금·퇴직금은 최우선 변제 순위라 다른 채권자보다 먼저 배당받을 수 있고요. 대한법률구조공단(132) 무료 법률 지원을 활용하면 돼요.",
    tip: "법률 지원이 필요하면 대한법률구조공단(132)에 먼저 연락하세요",
    link: { label: "대한법률구조공단", href: "https://www.klac.or.kr" },
  },
];

const CHECKLIST = [
  "고용노동부 진정: 퇴직 후 소멸시효 3년 내에 접수",
  "증빙 서류 확보: 폐업 전 근로계약서·급여명세서 미리 복사해두기",
  "4대보험 없어도 신청 가능: 통장 내역·카카오톡 대화도 증거",
  "체당금 신청: 근로복지공단(1588-0075) 접수 — 도산 인정 결정 후 가능",
  "체당금 상한 초과분: 파산 절차 채권 신고로 우선변제권 행사",
  "법률 지원: 대한법률구조공단(132) 무료 상담 활용",
];

const FAQS = [
  {
    q: "회사가 폐업하면 퇴직금을 아예 못 받나요?",
    a: "아니에요. 임금채권보장법에 따른 체당금 제도로 퇴직금 일부를 국가가 대신 지급해줘요. 근로복지공단에 신청하면 돼요.",
  },
  {
    q: "체당금 상한액은 얼마인가요?",
    a: "나이와 근속연수에 따라 달라요. 퇴직금 체당금은 최대 700만 원 수준이고요. 정확한 한도는 근로복지공단(1588-0075) 또는 공단 홈페이지에서 직접 물어보는 게 가장 빠르죠.",
  },
  {
    q: "사장이 잠적하면 어떻게 하나요?",
    a: "고용노동부에 사실상 도산 인정 신청을 하면 돼요. 사업주와 연락이 안 되고 사업 활동이 중단된 상태가 확인되면 체당금을 신청할 수 있죠.",
  },
  {
    q: "4대보험에 가입이 안 됐어도 체당금을 받을 수 있나요?",
    a: "받을 수 있죠. 4대보험 가입 여부가 아닌 실제 근무 사실이 기준이에요. 통장 입금 내역, 카카오톡 업무 대화, 동료 근로자 증언도 증거로 쓰이고요.",
  },
  {
    q: "체당금으로 전액을 못 받으면 나머지는 어떻게 하나요?",
    a: "파산 절차에서 우선변제권을 행사해서 잔액을 회수할 수 있죠. 임금·퇴직금은 근로기준법 제38조에 따라 최우선 변제 순위예요. 회사에 남은 재산이 있으면 다른 채권자보다 먼저 배당받고요.",
  },
  {
    q: "체당금 신청 후 얼마나 걸리나요?",
    a: "서류가 완비되면 보통 2~4주 안에 입금돼요. 서류 보완이 필요하면 공단에서 연락이 오고요. 처음부터 빠짐없이 준비하는 게 빠른 수령의 핵심이에요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "임금채권보장법: 체당금(대지급금) 제도", url: "https://www.law.go.kr/법령/임금채권보장법" },
      { label: "근로기준법 제38조: 임금 채권의 우선변제", url: "https://www.law.go.kr/법령/근로기준법" },
      { label: "근로자퇴직급여 보장법 제9조: 퇴직금 지급 기한", url: "https://www.law.go.kr/법령/근로자퇴직급여보장법" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "근로복지공단: 체당금(대지급금) 신청 안내", url: "https://www.comwel.or.kr" },
      { label: "고용노동부 민원마당: 임금 체불 신고", url: "https://minwon.moel.go.kr" },
    ],
  },
];

const RELATED = [
  { slug: "회사-폐업-퇴직금-체당금-신청-우선변제권", title: "폐업 퇴직금 체당금·우선변제권", description: "체당금 신청 절차와 우선변제권 활용법." },
  { slug: "대지급금-퇴직금-DB-DC-퇴직연금", title: "대지급금으로 퇴직금 받기", description: "대지급금 제도와 DB형·DC형 적용 방법." },
  { slug: "퇴직금-미지급-신고", title: "퇴직금 미지급 신고 방법", description: "고용노동부 신고부터 체불 해결까지." },
];

// ─── 페이지 ──────────────────────────────────────────

export default function Page() {
  return (
    <ArticleLayout
      sidebar={<Sidebar heading="퇴직금 가이드" items={퇴직금_SIDEBAR} highlightSlugs={퇴직금_HIGHLIGHT} currentSlug="회사-폐업-퇴직금" />}
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>퇴직금 · 폐업 · 체당금</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        회사가 폐업했는데 퇴직금을 못 받으셨죠?<br />
        체당금 신청 조건 · 절차 · 우선변제권
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        폐업 소식을 들었는데 퇴직금이 하나도 안 들어왔죠.
        <a href="https://www.law.go.kr/법령/임금채권보장법" style={{ color: "#1D9E75", textDecoration: "underline" }}>임금채권보장법</a>에 따른 체당금(대지급금) 제도로 국가가 사업주 대신 퇴직금을 지급해줘요.
        근로복지공단에 신청하면 되고, 사장이 잠적했어도 사실상 도산 인정을 받으면 신청이 가능해요.
        조건부터 절차, 상한 초과분 회수까지 순서대로 정리했어요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>폐업 퇴직금, 내가 체당금을 신청할 수 있나요?</H2>
      <p style={body}>
        체당금 신청의 기본 조건은 두 가지예요.
        1년 이상 계속 근로하고 주 15시간 이상 일했다면 폐업 여부와 무관하게 퇴직금 청구권이 생겨요.
        문제는 사업주가 지급 능력이 없는 상황이라 체당금 제도를 활용해야 하고요.
      </p>
      <p style={body}>
        체당금은 회사가 파산·회생 절차를 밟고 있거나 사실상 도산 상태(사업 중단·사장 잠적 등)가 확인된 경우에 신청이 가능해요.
        4대보험 미가입이어도 실제 근무 사실이 증명되면 신청이 가능하고요.
        소멸시효는 퇴직일로부터 3년이라 3년 안에 반드시 움직여야 해요.
      </p>

      <GreenBox>
        체당금: 근로복지공단 신청 → 상한액 내 국가 지급<br />
        우선변제권: 파산 절차 채권 신고 → 다른 채권자보다 먼저 배당<br />
        민사 소송: 사업주 개인 재산으로 잔액 추가 회수
      </GreenBox>

      <SectionBadge>내 상황 체크해보기</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="체당금 신청 조건을 갖췄어요. 아래 계산기로 예상 수령액을 먼저 파악해보세요."
        partialMatchText="조건 일부가 다를 수 있죠. 근로복지공단(1588-0075)에 전화해서 자격 여부를 물어보세요."
      />

      <Divider />

      <H2>체당금 예상 수령액 계산하기</H2>
      <p style={body}>
        체당금으로 퇴직금 전액을 받을 수 있는지 먼저 파악해야 해요.
        퇴직금이 체당금 상한액(최대 700만 원 수준)보다 많다면 초과분은 우선변제권으로 따로 회수해야 하고요.
        아래 슬라이더에서 월 평균 임금과 근속연수를 조정해보세요.
      </p>
      <p style={body}>
        체당금 상한액은 나이와 근속연수에 따라 달라져요.
        정확한 한도는 근로복지공단(1588-0075)에 전화하거나 공단 홈페이지에서 직접 물어보는 게 가장 빠르죠.
      </p>

      <SectionBadge>퇴직금·체당금 계산기</SectionBadge>
      <Calculator
        sliders={CALC_SLIDERS}
        results={CALC_RESULTS}
        note="※ 체당금 상한은 참고용이에요. 실제 한도는 연령·근속연수에 따라 달라져요. 정확한 금액은 근로복지공단에 직접 문의해요."
      />

      <CategoryButton label="퇴직금 정보" count={퇴직금_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />

      <Divider />

      <H2>체당금 신청에 필요한 서류</H2>
      <p style={body}>
        회사가 폐업하면 서류를 구하기 어려워져요. 재직 중에 미리 복사해두는 게 안전하고요.
        핵심 서류는 실제 근무 사실과 퇴직금 미지급을 증빙하는 자료예요.
        4대보험 미가입이어도 통장 이체 내역이나 카카오톡 업무 대화로 대체할 수 있죠.
      </p>

      <SectionBadge>준비 서류 목록</SectionBadge>
      <DocTable docs={DOCS} />

      <BorderBox>
        4대보험 가입 여부가 아닌 실제 근무 사실이 기준이에요.
        통장 입금 내역, 카카오톡 업무 대화, 동료 근로자 증언도 증거로 쓰이고요.
      </BorderBox>

      <Divider />

      <H2>폐업 후 체당금 신청 절차</H2>
      <p style={body}>
        고용노동부 진정 → 도산 인정 → 근로복지공단 체당금 신청 → 잔액 우선변제 순서예요.
        대부분 3단계까지에서 해결되고, 서류만 잘 갖추면 신청 후 2~4주 내에 입금돼요.
      </p>

      <Steps steps={STEPS} />

      <Divider />

      <H2>지금 바로 챙겨야 할 것들</H2>
      <p style={body}>
        폐업 소식을 들으면 바로 움직여야 해요.
        시간이 지날수록 서류를 구하기 어려워지고, 소멸시효 3년이 지나면 청구권 자체가 사라져요.
        아래 체크리스트를 기준으로 하나씩 챙기면 돼요.
      </p>

      <SectionBadge>준비 체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <GreenBox>
        근로기준법 제38조에 따라 임금과 퇴직금은 세금·보험료보다도 먼저 변제돼요.
        파산 재산이 남아 있다면 다른 채권자보다 먼저 배당받을 수 있죠.
      </GreenBox>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        회사 폐업 시 퇴직금과 체당금에 대해 실제로 많이 나오는 질문만 골랐어요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 임금채권보장법과 근로기준법을 바탕으로 작성됐어요. 제도 변경이 생길 수 있으니 최신 기준은 근로복지공단(1588-0075)에 직접 문의해요." />
    </ArticleLayout>
  );
}
