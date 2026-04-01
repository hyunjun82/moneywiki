"use client";
import { Divider } from "@/components/article-ui/Divider";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Calculator, EligibilityChecker, Steps, DocTable, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 퇴직금_SIDEBAR, 퇴직금_HIGHLIGHT } from "@/data/퇴직금-guide";

// ─── 데이터 ──────────────────────────────────────────

const CHECK_ITEMS = [
  { id: "c1", label: "회사가 파산·회생 절차 중이거나 사실상 폐업 상태예요" },
  { id: "c2", label: "퇴직 후 퇴직금을 한 푼도 받지 못했어요" },
  { id: "c3", label: "해당 사업장에서 4주 평균 주 15시간 이상 근무했어요" },
  { id: "c4", label: "퇴직한 날로부터 2년이 지나지 않았어요 (도산체당금 기준)" },
];

const CALC_SLIDERS = [
  { id: "salary", label: "월 평균 급여", min: 150, max: 600, step: 10, defaultValue: 300, format: (v: number) => `${v}만원` },
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
    label: "소액체당금 상한 (최대 1,000만원)",
    getValue: (v: Record<string, number>) => {
      const severance = Math.round(v.salary * 10000 * (v.months / 12));
      return Math.min(severance, 10000000);
    },
    format: (v: number) => `최대 ${Math.round(v / 10000).toLocaleString()}만원`,
  },
];

const DOCS = [
  { name: "체당금 지급 청구서", required: true, where: "근로복지공단 홈페이지 서식 다운로드" },
  { name: "신분증 + 본인 명의 통장 사본", required: true, where: "본인 지참" },
  { name: "근로 사실 확인 서류 (근로계약서·급여명세서·출퇴근 기록 중 1개 이상)", required: true, where: "본인 보관 또는 인사팀" },
  { name: "퇴직금 미지급 확인서 (임금체불 확인서)", required: true, where: "고용노동부 발급" },
  { name: "파산·회생 결정문 (법원 도산 체당금 신청 시)", required: false, where: "법원 또는 파산관재인" },
  { name: "사실상 도산 인정 결정문 (소액체당금 신청 시)", required: false, where: "관할 고용노동지청 발급" },
];

const STEPS = [
  {
    title: "고용노동부에 임금체불 진정 접수",
    desc: "퇴직금 미지급 사실을 고용노동부 민원마당(minwon.moel.go.kr)에서 온라인으로 신고해요. 회사가 폐업했거나 사장이 연락 두절이면 '사실상 도산 인정 신청'도 함께 요청하면 돼요.",
    tip: "진정 접수 후 임금체불 확인서를 발급받아야 체당금 신청이 가능해요",
    link: { label: "고용노동부 민원마당 바로가기", href: "https://minwon.moel.go.kr" },
  },
  {
    title: "도산 인정 확보 (사실상 도산 또는 법원 결정)",
    desc: "정식 파산·회생이면 법원 결정문이 나오면 돼요. 사장이 잠적하거나 사업 중단 상태라면 고용노동지청이 '사실상 도산'으로 인정해줘요. 인정 결정이 나야 체당금 신청 단계로 넘어갈 수 있어요.",
    tip: "사실상 도산 인정까지 보통 2~4주 걸려요",
  },
  {
    title: "근로복지공단에 체당금 신청",
    desc: "도산 인정 후 가까운 근로복지공단 지사를 방문하거나 홈페이지(comwel.or.kr)에서 온라인으로 청구해요. 체당금 청구서·신분증·통장 사본·임금체불 확인서류를 첨부하면 돼요.",
    tip: "서류 완비 시 보통 2~4주 내 입금돼요",
    link: { label: "근로복지공단 체당금 신청", href: "https://www.comwel.or.kr" },
  },
  {
    title: "우선변제권으로 잔액 추가 회수",
    desc: "체당금 상한을 초과하는 퇴직금이 남았다면 파산·회생 절차에서 채권자로 신고해요. 근로기준법 제38조에 따라 최종 3년분 퇴직금은 은행 담보채권보다도 우선 변제받을 수 있어요.",
    tip: "법률구조공단(132) 무료 법률 지원으로 채권 신고를 도움받을 수 있어요",
  },
];

const CHECKLIST = [
  "고용노동부 진정: 퇴직 후 3년 소멸시효 내 접수 (빠를수록 유리)",
  "사실상 도산 인정 신청: 사업 중단·연락 두절 증빙 자료 준비",
  "소액체당금: 법원 확정 없이 최대 1,000만원 한도로 신청 가능",
  "도산체당금: 퇴직 후 2년 내 신청 (소멸시효와 별도 주의)",
  "우선변제권: 파산 절차 채권 신고로 상한 초과분 추가 회수",
  "법률구조공단(132): 무료 법률 지원으로 채권 신고 절차 지원",
];

const FAQS = [
  {
    q: "체당금 신청 기한이 따로 있나요?",
    a: "도산체당금은 도산 인정일로부터 2년 이내, 소액체당금은 법원 확정일로부터 1년 이내 신청해야 해요. 퇴직금 청구권 소멸시효(3년)보다 짧은 경우가 많아서 최대한 빨리 움직이는 게 중요해요.",
  },
  {
    q: "소액체당금과 도산체당금이 뭐가 달라요?",
    a: "소액체당금은 법원 확정 없이도 최대 1,000만원 한도로 빠르게 받을 수 있는 제도예요. 도산체당금은 파산·회생이나 사실상 도산 인정 후 신청하고 상한액이 연령·근속에 따라 달라요. 둘 중 하나만 선택해서 받을 수 있어요.",
  },
  {
    q: "우선변제권이 있으면 퇴직금 전액을 받을 수 있나요?",
    a: "우선변제권은 다른 채권자보다 먼저 배당받는 권리예요. 회사에 남은 재산이 있어야 실제로 회수할 수 있어요. 재산이 없다면 우선변제권이 있어도 받지 못할 수 있어요.",
  },
  {
    q: "회사가 폐업 신고를 안 했는데도 신청할 수 있나요?",
    a: "가능해요. 법원 파산·회생 결정이 없어도 사장이 연락 두절이거나 사업장이 문을 닫았다면 고용노동지청이 '사실상 도산'으로 인정해줄 수 있어요. 고용노동부에 진정을 접수하면서 사실상 도산 인정도 함께 신청하세요.",
  },
  {
    q: "퇴직금 외에 밀린 임금도 체당금으로 받을 수 있나요?",
    a: "받을 수 있어요. 체당금은 퇴직금뿐 아니라 최종 3개월분 임금과 최종 3년분 퇴직금, 휴업수당을 포함해요. 미지급 임금이 있다면 퇴직금과 함께 신청하세요.",
  },
  {
    q: "체당금 신청 후 사업주에게 구상권이 생기나요?",
    a: "맞아요. 국가(근로복지공단)가 사업주 대신 체당금을 지급하면, 공단이 사업주에게 구상권을 행사해요. 근로자와는 상관없이 공단이 사업주에게 별도로 청구하는 절차예요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "임금채권보장법: 체당금 제도 전문", url: "https://www.law.go.kr/법령/임금채권보장법" },
      { label: "근로기준법 제38조: 임금 채권 우선변제", url: "https://www.law.go.kr/법령/근로기준법" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "근로복지공단: 체당금 신청 안내", url: "https://www.comwel.or.kr" },
      { label: "고용노동부 민원마당: 임금체불 신고", url: "https://minwon.moel.go.kr" },
      { label: "법률구조공단: 무료 법률 상담", url: "https://www.klac.or.kr" },
    ],
  },
];

const RELATED = [
  {
    slug: "회사-폐업-퇴직금",
    title: "회사 폐업 시 퇴직금 받는 법",
    description: "폐업 확정 전 퇴직금 확보 방법과 우선 순위.",
  },
  {
    slug: "대지급금-퇴직금-DB-DC-퇴직연금",
    title: "대지급금으로 퇴직금 받기",
    description: "DB형·DC형 퇴직연금에서 대지급금 적용 방법.",
  },
  {
    slug: "퇴직금-미지급-신고",
    title: "퇴직금 미지급 신고 방법",
    description: "고용노동부 신고 절차와 지연이자 청구까지.",
  },
];

// ─── 페이지 ──────────────────────────────────────────

export default function Page() {
  return (
    <ArticleLayout
      sidebar={<Sidebar heading="퇴직금 가이드" items={퇴직금_SIDEBAR} highlightSlugs={퇴직금_HIGHLIGHT} currentSlug="회사-폐업-퇴직금-체당금-신청-우선변제권" />}
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>퇴직금 · 체당금 · 우선변제권</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        회사 폐업 후 퇴직금을 못 받았나요?<br />
        체당금 신청부터 우선변제권 행사까지
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        회사가 폐업하면 퇴직금을 포기해야 한다고 생각하기 쉽죠.
        하지만 <a href="https://www.law.go.kr/법령/임금채권보장법" style={{ color: "#1D9E75", textDecoration: "underline" }}>임금채권보장법</a>에 따라
        국가가 사업주 대신 퇴직금을 지급하는 체당금 제도가 있어요.
        <a href="https://www.law.go.kr/법령/근로기준법" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로기준법 제38조</a>의 우선변제권을 더하면
        체당금 상한을 넘는 금액도 파산 절차에서 추가로 회수할 수 있고요.
        두 제도를 순서대로 활용하면 폐업 상황에서도 퇴직금을 최대한 지킬 수 있어요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>체당금 신청 자격, 내가 해당되나요?</H2>
      <p style={body}>
        체당금은 도산·폐업 상태의 사업장 근로자가 받을 수 있어요.
        일반체당금(도산체당금)은 법원 파산·회생 결정이나 사실상 도산 인정이 필요하고,
        소액체당금은 법원 확정 없이도 최대 1,000만원 한도로 신청할 수 있어요.
        아르바이트·단시간 근로자도 조건을 충족하면 신청할 수 있어요.
      </p>
      <p style={body}>
        가장 중요한 기준은 퇴직 후 신청 기한이에요.
        도산체당금은 도산 인정일로부터 2년, 소액체당금은 법원 확정일로부터 1년 이내 신청해야 해요.
        시간이 지날수록 증빙 서류를 구하기 어려워지니 폐업 소식을 들은 즉시 움직이는 게 맞아요.
      </p>

      <GreenBox>
        일반체당금: 파산·회생 결정 또는 사실상 도산 인정 필요, 연령·근속별 상한액 적용<br />
        소액체당금: 법원 확정 없이 신청 가능, 최대 1,000만원 한도, 절차 빠름<br />
        둘 중 하나만 선택해 수령 가능 (중복 수령 불가)
      </GreenBox>

      <SectionBadge>내 상황 체크해보세요</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="체당금 신청 조건을 갖추고 있어요. 아래 계산기로 예상 금액을 먼저 파악해보세요."
        partialMatchText="일부 조건이 맞지 않아요. 근로복지공단(1588-0075)에 전화해서 자격 여부를 확인하세요."
      />

      <Divider />

      <H2>퇴직금과 체당금 수령 예상액 확인하기</H2>
      <p style={body}>
        체당금으로 퇴직금 전액을 받을 수 있는지 먼저 파악해야 전략을 세울 수 있어요.
        소액체당금 상한은 1,000만원이고, 일반체당금 상한은 연령·근속에 따라 달라요.
        퇴직금이 상한액보다 많다면 우선변제권 행사까지 함께 진행해야 하죠.
      </p>
      <p style={body}>
        아래 슬라이더로 월 급여와 근속 기간을 조절해서 예상 금액을 확인해보세요.
        정확한 체당금 상한액은 근로복지공단(1588-0075)에 문의하는 게 정확해요.
      </p>

      <SectionBadge>퇴직금·체당금 예상 계산기</SectionBadge>
      <Calculator
        sliders={CALC_SLIDERS}
        results={CALC_RESULTS}
        note="※ 퇴직금 = 월 평균 급여 × 근속연수. 체당금 상한은 소액체당금 기준 참고용이며, 실제 한도는 연령·근속에 따라 달라요."
      />

      <CategoryButton label="퇴직금 정보" count={퇴직금_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />

      <Divider />

      <H2>체당금 신청에 필요한 서류</H2>
      <p style={body}>
        회사가 폐업하면 서류를 구하기 어려워져요.
        근로계약서·급여명세서·출퇴근 기록 중 하나라도 있으면 근무 사실을 입증할 수 있어요.
        카카오톡 급여 안내 메시지나 통장 이체 내역도 인정되는 경우가 많아요.
      </p>
      <p style={body}>
        임금체불 확인서는 고용노동부에 진정을 접수하면 발급받을 수 있어요.
        소액체당금 신청이라면 별도 도산 인정 결정문 없이도 신청이 가능해요.
      </p>

      <SectionBadge>준비 서류 목록</SectionBadge>
      <DocTable docs={DOCS} />

      <Divider />

      <H2>체당금 신청부터 우선변제권 행사까지 4단계</H2>
      <p style={body}>
        대부분 1~3단계에서 해결돼요.
        퇴직금이 체당금 상한액을 초과하는 경우에만 4단계 우선변제권 행사까지 진행하면 돼요.
        각 단계마다 소요 기간이 있으니 일찍 시작할수록 유리해요.
      </p>

      <Steps steps={STEPS} />

      <Divider />

      <H2>지금 당장 챙겨야 할 것들</H2>
      <p style={body}>
        소멸시효 3년이 지나면 퇴직금 청구권 자체가 사라져요.
        체당금 신청 기한은 그보다 더 짧은 경우도 있어서 폐업 소식을 들은 날부터 움직여야 해요.
        법률구조공단(132)은 무료로 법률 지원을 받을 수 있으니 부담 없이 전화해보세요.
      </p>

      <SectionBadge>준비 체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <GreenBox>
        최종 3개월분 임금: 은행 담보채권보다 우선 변제<br />
        최종 3년분 퇴직금: 은행 담보채권보다 우선 변제<br />
        이 범위를 넘는 금액은 일반 우선변제권 적용 (담보채권보다 후순위)
      </GreenBox>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        체당금 신청과 우선변제권에 대해 실제로 가장 많이 나오는 질문만 골랐어요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 임금채권보장법과 근로기준법을 바탕으로 작성됐어요. 제도 변경이 있을 수 있으니 최신 기준은 근로복지공단(1588-0075)에서 확인하세요." />
    </ArticleLayout>
  );
}
