"use client";

// Q1. 퇴직 후 14일이 지났는데 퇴직금이 입금되지 않아 회사에 연락했지만 계속 미루는 상황
// Q2. 노동청 임금체불 진정을 직접 접수해서 퇴직금을 돌려받는다
// Q2-1. 고용노동부 민원마당(minwon.moel.go.kr)에서 임금체불 진정 접수 버튼 클릭
// Q3. 신고 전 내 상황이 청구 가능한지(소멸시효 3년), 내용증명→진정→소송 순서, 준비 서류, 지연이자 20% 청구 방법, 회사 폐업 시 체당금
// Q4. EligibilityChecker(청구 가능 여부) + Steps(4단계 절차) + DocTable(서류) + Calculator(지연이자) + Checklist(놓치면 손해인 것들)
//
// MAP:
// Q1 → 서론: 14일 지났는데 안 들어온 상황 공감
// Q2 → H2 순서: 청구 가능 여부 먼저 → 신고 절차 → 서류 → 지연이자 → 주의사항
// Q3 → H2 5개 + FAQ
// Q4 → EligibilityChecker, Steps, DocTable, Calculator, Checklist

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Calculator, EligibilityChecker, Steps, DocTable, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 퇴직금_SIDEBAR, 퇴직금_HIGHLIGHT } from "@/data/퇴직금-guide";

// ─── 데이터 ──────────────────────────────────────────

const CHECK_ITEMS = [
  { id: "c1", label: "퇴직 후 14일이 지났는데 퇴직금이 안 들어왔어요" },
  { id: "c2", label: "퇴직일로부터 3년이 지나지 않았어요" },
  { id: "c3", label: "회사에 지급 요청했지만 무응답이거나 계속 미루는 중이에요" },
  { id: "c4", label: "근로 사실을 증명할 수 있는 기록이 하나라도 있죠" },
];

const CALC_SLIDERS = [
  { id: "amount", label: "미지급 퇴직금", min: 50, max: 5000, step: 50, defaultValue: 500, format: (v: number) => `${v.toLocaleString()}만원` },
  { id: "days", label: "지연 일수 (14일 초과 시점부터)", min: 15, max: 365, step: 5, defaultValue: 90, format: (v: number) => `${v}일` },
];

const CALC_RESULTS = [
  {
    label: "연 20% 지연이자",
    getValue: (v: Record<string, number>) => Math.round(v.amount * 10000 * 0.2 * v.days / 365),
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원`,
    highlight: true,
  },
  {
    label: "원금 + 지연이자 합계",
    getValue: (v: Record<string, number>) => {
      const interest = Math.round(v.amount * 10000 * 0.2 * v.days / 365);
      return v.amount * 10000 + interest;
    },
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원`,
  },
];

const DOCS = [
  { name: "근로계약서", required: true, where: "입사 시 수령 · 없으면 인사팀 재발급 요청" },
  { name: "최근 3개월 급여명세서", required: true, where: "회사 인사팀 또는 급여 이체 통장 내역으로 대체 가능" },
  { name: "퇴직 증빙 (사직서 또는 해고통지서)", required: true, where: "직접 보관 · 없으면 퇴직일 확인 문자도 가능" },
  { name: "통장 입금 내역 (퇴직금 미지급 확인)", required: true, where: "인터넷뱅킹 또는 은행 앱에서 출력" },
  { name: "지급 요청 문자·카톡·이메일 캡처", required: false, where: "직접 저장 · 보복 방지 및 진정 증거 역할" },
  { name: "내용증명 발송 기록", required: false, where: "우체국 또는 카카오 전자내용증명 앱" },
];

const STEPS = [
  {
    title: "문자·이메일로 지급 요청 기록 남기기",
    desc: "구두가 아닌 문자나 이메일로 '퇴직금을 언제 지급할 예정인지' 먼저 물어봐요. 카카오톡 대화도 법적 증거로 인정되고요. 요청 문자를 보낸 날짜, 내용, 수신 여부까지 캡처해서 보관해두면 나중에 진정 접수 시 핵심 증거가 되죠.",
    tip: "구두 요청만 했다면 지금 당장 문자로 다시 보내두는 게 좋아요",
  },
  {
    title: "내용증명 발송",
    desc: "문자 요청 후 무응답이면 내용증명을 보내요. '퇴직금 미지급으로 고용노동부에 신고할 예정'이라는 문장 하나면 충분하죠. 내용증명 발송만으로도 소멸시효 3년이 6개월 중단돼요. 카카오 전자내용증명은 앱에서 5분이면 보낼 수 있고요.",
    tip: "대부분 이 단계에서 회사가 지급하는 경우가 많아요",
  },
  {
    title: "고용노동부 임금체불 진정 접수",
    desc: "내용증명 이후에도 무응답이면 사업장 소재지 관할 지방고용노동청에 임금체불 진정서를 내요. 고용노동부 민원마당(minwon.moel.go.kr)에서 온라인으로 무료 접수할 수 있고요. 접수 후 근로감독관이 조사하고 보통 1~3개월 내에 결과가 나와요.",
    tip: "온라인 접수: minwon.moel.go.kr → 민원신청 → 임금체불 진정",
    link: { label: "민원마당 바로가기", href: "https://minwon.moel.go.kr" },
  },
  {
    title: "소액심판 또는 지급명령 (최후 수단)",
    desc: "진정 이후에도 회사가 지급하지 않으면 법원에 소액심판이나 지급명령을 신청해요. 3,000만원 이하는 변호사 없이 직접 소송이 가능하고, 인지대는 수만 원 수준이에요. 대한법률구조공단(전화 132)에서 무료 법률 지원도 받을 수 있죠.",
    tip: "지급명령은 소송보다 절차가 간단하고 결과가 빨리 나와요",
    link: { label: "대한법률구조공단", href: "https://www.klac.or.kr" },
  },
];

const CHECKLIST = [
  "퇴직일 기준 14일 초과 시점부터 지연이자(연 20%) 발생 날짜 꼭 기록해두기",
  "소멸시효 3년: 퇴직일로부터 3년 안에 청구해야 권리가 살아요",
  "근로계약서·급여명세서·퇴직 증빙 퇴직 즉시 챙겨두기",
  "지급 요청 기록 보관: 문자·카카오톡·이메일 캡처 저장",
  "지연이자 청구 명시: 진정 시 '연 20% 지연이자 포함' 문구 넣기",
  "회사 폐업 시: 체당금 제도로 정부가 일부를 대신 지급해줘요",
];

const FAQS = [
  {
    q: "퇴직금 미지급 신고는 어디에 하나요?",
    a: "사업장 소재지 관할 지방고용노동청에 임금체불 진정서를 내요. 방문, 우편, 온라인(고용노동부 민원마당) 모두 가능하고 무료죠. 사업장이 어디 있는지 모를 땐 고용노동부 고객센터(1350)에 전화하면 안내해줘요.",
  },
  {
    q: "신고하면 회사가 보복할 수 있나요?",
    a: "근로기준법 제104조가 신고를 이유로 한 불이익을 금지해요. 보복 행위가 있으면 별도로 진정을 접수할 수 있고, 사업주가 처벌 대상이 되죠. 신고자 신분도 원칙적으로 공개되지 않고요.",
  },
  {
    q: "신고 후 결과가 나오기까지 얼마나 걸리나요?",
    a: "보통 1~3개월이에요. 사건이 복잡하거나 사업주가 출석을 거부하면 더 걸릴 수 있죠. 민사소송(6개월~1년)보다 훨씬 빠른 편이에요.",
  },
  {
    q: "회사가 폐업했어도 신고할 수 있나요?",
    a: "신고는 가능해요. 대표이사 개인을 상대로 진정할 수 있죠. 체당금 제도를 통해 정부가 일부를 대신 지급해주는 경우도 있고요. 고용노동부(1350) 또는 근로복지공단에 먼저 상담해봐요.",
  },
  {
    q: "지연이자는 자동으로 받아지나요?",
    a: "자동이 아니에요. 내용증명 발송이나 노동청 진정 시 '연 20% 지연이자 포함'이라고 명시해야 청구가 가능하죠. 빠뜨리면 퇴직금 원금만 받고 끝날 수 있고요.",
  },
  {
    q: "근로계약서가 없어도 신고할 수 있나요?",
    a: "가능해요. 통장 입금 내역, 카카오톡 대화, 동료 증언, 4대보험 가입 이력 중 하나만 있어도 진정 접수는 할 수 있죠. 4대보험 가입 이력은 고용24(ei.go.kr)에서 무료로 출력할 수 있고요.",
  },
  {
    q: "진정 취하 후 다시 신고할 수 있나요?",
    a: "가능해요. 단, 소멸시효(3년)가 여전히 흐르고 있으니 주의해야 하죠. 합의 후 취하했는데 돈을 못 받은 경우라면 다시 진정을 접수할 수 있고, 이때 합의서와 이행 이력을 함께 내는 게 좋고요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "근로기준법 제36조: 퇴직 후 14일 이내 임금·퇴직금 지급 의무", url: "https://www.law.go.kr/법령/근로기준법" },
      { label: "근로기준법 제37조: 14일 초과 시 연 20% 지연이자 가산", url: "https://www.law.go.kr/법령/근로기준법" },
      { label: "근로기준법 제104조: 신고를 이유로 한 불이익 처우 금지", url: "https://www.law.go.kr/법령/근로기준법" },
      { label: "근로기준법 제109조: 임금체불 처벌 (3년 이하 징역·3,000만원 이하 벌금)", url: "https://www.law.go.kr/법령/근로기준법" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "고용노동부 민원마당: 임금체불 진정 온라인 접수", url: "https://minwon.moel.go.kr" },
      { label: "대한법률구조공단: 무료 법률 지원 (전화 132)", url: "https://www.klac.or.kr" },
      { label: "고용24: 4대보험 가입 이력 조회", url: "https://www.ei.go.kr" },
    ],
  },
];

const RELATED = [
  { slug: "퇴직금-지연이자", title: "퇴직금 지연이자 연 20% 받는 방법", description: "14일 초과 미지급 시 지연이자 계산법과 청구 방법이에요." },
  { slug: "퇴직금-미지급-지급받는-방법", title: "퇴직금 미지급, 받아내는 방법", description: "내용증명·진정·소송 단계별 실전 대응법이에요." },
  { slug: "회사-폐업-퇴직금", title: "회사 폐업해도 퇴직금 받을 수 있나요?", description: "체당금 제도로 정부가 대신 지급해주는 방법이에요." },
];

// ─── 페이지 ──────────────────────────────────────────

export default function Page() {
  return (
    <ArticleLayout
      sidebar={<Sidebar heading="퇴직금 가이드" items={퇴직금_SIDEBAR} highlightSlugs={퇴직금_HIGHLIGHT} currentSlug="퇴직금-미지급-신고" />}
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>퇴직금 · 미지급 · 신고절차</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        퇴직금을 못 받았는데 어디에 신고하나요?<br />
        내용증명부터 노동청 진정까지 단계별 방법
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        퇴직 후 14일이 지나도 퇴직금이 안 들어오면 <a href="https://www.law.go.kr/법령/근로기준법" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로기준법 제36조</a> 위반이에요.
        "자금이 없다", "나중에 준다"는 말로 미루는 건 법적으로 통하지 않아요.
        미지급 상태가 계속되면 <a href="/w/퇴직금-지연이자" style={{ color: "#1D9E75", textDecoration: "underline" }}>연 20% 지연이자</a>가 추가되고, 3년 이하 징역 또는 3,000만원 이하 벌금까지 회사에 부과될 수 있죠.
        내용증명 발송 → 노동청 진정 → 소액심판, 3단계 중 대부분은 2단계에서 해결되고요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      {/* H2-1: 청구 가능 여부 (질문형) */}
      <H2>지금 신고할 수 있는 상황인가요?</H2>
      <p style={body}>
        신고하기 전에 내 상황이 법적으로 청구 가능한 상태인지 먼저 봐야 해요.
        퇴직금 청구권은 퇴직일로부터 3년이 지나면 소멸시효가 끝나고, 그 안에 내용증명이나 진정을 접수해야 권리가 살죠.
      </p>
      <p style={body}>
        서류가 없어도 진정 접수는 할 수 있죠. 통장 입금 내역, 카카오톡 대화, 동료 증언 중 하나만 있어도 되고,
        4대보험 가입 이력은 <a href="https://www.ei.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용24</a>에서 무료로 출력할 수 있죠.
      </p>

      <GreenBox>
        법적 청구 가능: 퇴직 후 14일 초과 + 소멸시효 3년 이내<br />
        신고처: 사업장 소재지 관할 지방고용노동청 (온라인·방문 무료)<br />
        서류 없어도: 통장 내역·카톡 기록으로 접수 가능
      </GreenBox>

      <SectionBadge>내 상황 체크해봐요</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="지금 바로 신고 가능해요. 아래 절차를 단계별로 따라가봐요."
        partialMatchText="조건이 다를 수 있으니 고용노동부(1350)에 먼저 상담하는 게 좋아요."
      />

      <Divider />

      {/* H2-2: 신고 절차 (숫자형 단계 명시) */}
      <H2>퇴직금 미지급 신고 절차 4단계</H2>
      <p style={body}>
        4단계예요. 문자 요청 → 내용증명 → 노동청 진정 → 소액심판.
        대부분의 경우 2단계(내용증명)에서 해결되고, 단계를 건너뛰지 않고 순서대로 가야 증거도 쌓이고 협상력도 생기죠.
      </p>
      <p style={body}>
        회사가 응하지 않을 때만 다음 단계로 넘어가면 되고, 3단계 노동청 진정부터는 근로감독관이 회사를 직접 조사해요.
        진정 이후에도 버티는 사업주는 3년 이하 징역 또는 3,000만원 이하 벌금 처벌 대상이 되고요.
      </p>

      <Steps steps={STEPS} />

      <CategoryButton label="퇴직금 정보" count={퇴직금_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />

      <Divider />

      {/* H2-3: 서류 (경고형 퇴직 즉시 챙겨야 함) */}
      <H2>퇴직 당일에 안 챙기면 나중에 못 받는 서류들</H2>
      <p style={body}>
        노동청 진정에는 서류가 많지 않아도 되지만, 퇴직 직후에는 회사가 서류 제공에 협조할 가능성이 높아요.
        시간이 지날수록 요청이 어려워지고, 회사 시스템 접근이 막히는 경우도 생기죠.
      </p>
      <p style={body}>
        없는 서류가 있어도 통장 내역이나 카카오톡 기록만으로 진행할 수 있죠.
        근로 사실과 미지급 사실, 이 두 가지만 증명하면 충분하고요.
      </p>

      <SectionBadge>제출 서류 목록</SectionBadge>
      <DocTable docs={DOCS} />

      <BorderBox>
        통장 입금 내역 + 카카오톡 대화 + 동료 증언만 있어도 진정 접수는 할 수 있죠.
        4대보험 가입 이력은 <a href="https://www.ei.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용24</a>에서
        무료로 조회하고 출력할 수 있죠.
      </BorderBox>

      <Divider />

      {/* H2-4: 지연이자 (반전형 원금만 받으면 손해) */}
      <H2>원금만 받으면 손해예요, 지연이자도 청구해야 해요</H2>
      <p style={body}>
        퇴직금을 14일 넘겨 지급하면 그 초과 기간에 대해 <a href="/w/퇴직금-지연이자" style={{ color: "#1D9E75", textDecoration: "underline" }}>연 20% 지연이자</a>가 붙어요.
        퇴직금 500만원을 90일 미뤘다면 이자만 약 25만원을 더 청구할 수 있죠.
        기간이 길어질수록 이자도 늘어나니, 미지급 시작일(14일 초과 시점)을 정확히 기록해두는 게 중요해요.
      </p>
      <p style={body}>
        지연이자는 자동으로 받아지지 않아요. 내용증명이나 진정 접수 시 '연 20% 지연이자 포함'을 명시해야 청구가 가능하고,
        빠뜨리면 퇴직금 원금만 받고 끝나요.
      </p>

      <SectionBadge>지연이자 계산기</SectionBadge>
      <Calculator
        sliders={CALC_SLIDERS}
        results={CALC_RESULTS}
        note="※ 근로기준법 제37조 기준 연 20% 이율 적용. 퇴직 후 14일 초과 시점부터 계산해요."
      />

      <Divider />

      {/* H2-5: 체크리스트 (사례형 놓치면 청구권 소멸) */}
      <H2>소멸시효 3년, 놓치면 청구권이 사라져요</H2>
      <p style={body}>
        퇴직일로부터 3년이 지나면 법적으로 퇴직금을 청구할 수 없어요.
        당장 신고하기 어렵더라도 내용증명만 먼저 보내두면 시효가 6개월 중단되고, 그 사이에 준비할 수 있죠.
      </p>
      <p style={body}>
        아래 항목 중 하나라도 놓치면 받아야 할 돈을 못 받는 상황이 생겨요.
        특히 지연이자 청구 명시와 소멸시효 관리는 진정 전에 반드시 체크해봐요.
      </p>

      <SectionBadge>체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <GreenBox>
        퇴직금 청구권은 퇴직일로부터 3년이 지나면 소멸해요.<br />
        내용증명 발송만으로도 시효를 6개월 중단할 수 있죠.<br />
        당장 신고하기 어렵더라도 내용증명만이라도 먼저 보내두는 게 좋아요.
      </GreenBox>

      <Divider />

      {/* H2-6: FAQ */}
      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        퇴직금 미지급 신고할 때 실제로 많이 나오는 질문만 골랐어요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 근로기준법을 바탕으로 작성됐어요. 제도 변경이 있을 수 있으니 최신 기준은 고용노동부(1350)에서 대조해봐요." />
    </ArticleLayout>
  );
}
