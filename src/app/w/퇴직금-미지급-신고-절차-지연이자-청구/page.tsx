"use client";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Calculator, EligibilityChecker, Steps, DocTable, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 퇴직금_SIDEBAR } from "@/data/퇴직금-guide";

const CHECK_ITEMS = [
  { id: "c1", label: "퇴직 후 14일이 지났는데 퇴직금이 안 들어왔어요" },
  { id: "c2", label: "회사에 요청했는데 계속 미루거나 거부하고 있어요" },
  { id: "c3", label: "3년 소멸시효가 아직 남아 있어요" },
  { id: "c4", label: "지급 요청 기록(문자·메일·카카오톡)이 있어요" },
];

const CALC_SLIDERS = [
  { id: "amount", label: "미지급 퇴직금", min: 100, max: 5000, step: 100, defaultValue: 500, format: (v: number) => `${v}만원` },
  { id: "days", label: "지연 일수", min: 15, max: 730, step: 5, defaultValue: 90, format: (v: number) => `${v}일` },
];

const CALC_RESULTS = [
  {
    label: "지연이자 (연 20%)",
    getValue: (v: Record<string, number>) => Math.round(v.amount * 10000 * 0.2 * v.days / 365),
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원`,
    highlight: true,
  },
  {
    label: "총 청구금액 (원금+이자)",
    getValue: (v: Record<string, number>) => {
      const interest = Math.round(v.amount * 10000 * 0.2 * v.days / 365);
      return v.amount * 10000 + interest;
    },
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원`,
  },
];

const DOCS = [
  { name: "퇴직사실 증빙 (사직서·해고통지서)", required: true, where: "직접 보관 또는 인사팀" },
  { name: "근로계약서", required: true, where: "입사 시 수령 · 인사팀 재발급" },
  { name: "급여명세서 (최근 3개월)", required: true, where: "회사 인사팀 요청" },
  { name: "지급 요청 기록 (문자·메일 캡처)", required: false, where: "직접 저장 보관" },
];

const STEPS = [
  {
    title: "14일 초과 여부와 지연이자 시작일 확인",
    desc: "퇴직일 기준으로 달력에서 14일을 세요. 주말·공휴일 포함 달력 기준이에요, 영업일 기준이 아니에요. 14일을 넘긴 그 다음 날부터 연 20% 지연이자가 발생하기 시작하죠. 퇴직일이 불분명하면 마지막 출근일 또는 사직서 수리일 기준으로 계산해요.",
    tip: "지연이자 시작일이 나중에 핵심 쟁점이 되니 정확히 메모해두세요",
  },
  {
    title: "내용증명에 지연이자 청구 명시",
    desc: "퇴직금 지급 요청과 함께 '14일 초과 시 연 20% 지연이자를 함께 청구할 예정'이라는 문장을 반드시 넣어 발송해요. 이 한 문장이 협상력을 크게 높여줘요. 카카오 전자내용증명이나 우체국 모두 가능하고, 발송 기록을 보관해두세요.",
    tip: "내용증명 발송만으로도 소멸시효가 6개월 중단돼요",
  },
  {
    title: "고용노동부 임금체불 진정 접수",
    desc: "내용증명 이후에도 지급이 없으면 관할 지방고용노동청에 임금체불 진정서를 접수해요. 온라인(고용노동부 민원마당)이나 방문 모두 무료예요. 진정서에 '지연이자 포함 청구'를 명시하면 근로감독관이 함께 조사하죠.",
    tip: "minwon.moel.go.kr → 민원신청 → 임금체불 진정으로 온라인 접수",
  },
  {
    title: "소액심판 또는 지급명령 신청",
    desc: "진정 결과에도 회사가 지급하지 않으면 법원에 소액심판 또는 지급명령을 신청해요. 3,000만원 이하는 변호사 없이 본인이 직접 가능하고, 인지대는 수만 원 수준이에요. 지연이자도 청구금액에 포함해서 소송할 수 있어요.",
    tip: "대한법률구조공단(132)에서 무료 법률 지원을 신청할 수 있어요",
  },
];

const CHECKLIST = [
  "퇴직일 기준 14일 초과 여부 확인 (달력 기준)",
  "소멸시효 3년: 퇴직일로부터 3년 내에 청구",
  "내용증명에 '연 20% 지연이자 청구' 명시",
  "지급 요청 기록 보존: 문자·메일·카카오톡 캡처",
  "폐업 시 체당금 제도 확인: 정부가 대신 지급",
];

const FAQS = [
  {
    q: "지연이자는 자동으로 받아지나요?",
    a: "자동으로 받아지지 않아요. 내용증명이나 노동청 진정 시 '연 20% 지연이자 포함'을 명시해야 청구가 가능해요. 빠뜨리면 원금만 받게 될 수 있어요.",
  },
  {
    q: "소멸시효 3년이 지나면 정말 못 받나요?",
    a: "법적 청구권이 소멸해요. 내용증명 발송, 소송 제기 등으로 시효를 중단시킬 수 있으니, 3년이 임박했다면 빨리 행동하는 게 중요해요.",
  },
  {
    q: "회사가 폐업했어도 지연이자 청구가 되나요?",
    a: "가능해요. 대표이사 개인에 대한 진정이 가능하고, 체당금 제도를 통해 정부에서 일부를 대신 지급받을 수 있어요. 지연이자는 별도 민사 청구가 필요할 수 있어요.",
  },
  {
    q: "노동청 진정 결과까지 얼마나 걸리나요?",
    a: "보통 1~3개월이에요. 사업주가 출석을 거부하거나 사건이 복잡하면 더 걸릴 수 있어요. 민사소송(6개월~1년)보다 훨씬 빠르죠.",
  },
  {
    q: "진정 접수 후 회사가 보복하면 어떻게 하나요?",
    a: "근로기준법 제104조가 신고를 이유로 한 불이익을 금지해요. 보복이 있으면 별도 진정을 접수할 수 있고, 처벌 대상이 돼요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "근로기준법 제36조: 퇴직 후 14일 이내 지급 의무", url: "https://www.law.go.kr/법령/근로기준법" },
      { label: "근로기준법 제37조: 지연이자 연 20% 이율", url: "https://www.law.go.kr/법령/근로기준법" },
      { label: "근로기준법 제109조: 임금체불 처벌 규정", url: "https://www.law.go.kr/법령/근로기준법" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "고용노동부 민원마당: 임금체불 온라인 진정 접수", url: "https://minwon.moel.go.kr" },
      { label: "대한법률구조공단: 무료 법률 지원 (132)", url: "https://www.klac.or.kr" },
    ],
  },
];

const RELATED = [
  { slug: "퇴직금-미지급-신고", title: "퇴직금 미지급 신고 방법", description: "관할 노동청에 임금체불 진정을 넣는 방법을 정리했어요." },
  { slug: "퇴직금-지연이자", title: "퇴직금 지연이자 연 20% 받는 방법", description: "14일 초과 미지급 시 지연이자 계산법과 청구 방법이에요." },
  { slug: "퇴직금-소멸시효", title: "퇴직금 소멸시효 3년, 지나면 정말 못 받나요?", description: "소멸시효 계산 기준과 중단 방법을 정리했어요." },
];

export default function Page() {
  return (
    <ArticleLayout
      sidebar={<Sidebar heading="퇴직금 가이드" items={퇴직금_SIDEBAR} currentSlug="퇴직금-미지급-신고-절차-지연이자-청구" />}
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>퇴직금 · 미지급신고 · 지연이자청구</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        퇴직금 미지급 신고 절차와 지연이자 청구 방법<br />
        내용증명 작성부터 노동청 진정까지 4단계
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        퇴직금을 14일 넘게 안 준다면 그 다음 날부터{" "}
        <a href="/w/퇴직금-지연이자" style={{ color: "#1D9E75", textDecoration: "underline" }}>연 20% 지연이자</a>가
        붙기 시작해요.{" "}
        <a href="https://www.law.go.kr/법령/근로기준법" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로기준법 제37조</a>에
        명시된 권리예요. 지연이자는 자동으로 받아지지 않아요. 내용증명에 청구 의사를 명시하고,
        그래도 안 주면 노동청 진정 → 소액심판 순서로 진행하면 돼요.
        절차 4단계와 지연이자 계산 방법을 함께 정리했어요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>지연이자까지 청구할 수 있는 상황인가요?</H2>
      <p style={body}>
        지연이자는 14일 초과 시점부터 자동으로 발생하지만, 직접 청구하지 않으면 원금만 받게 돼요.
        아래 항목으로 내 상황이 청구 가능한 상태인지 먼저 살펴봐요.
      </p>
      <p style={body}>
        소멸시효 3년이 지났다면 법적 청구권이 사라질 수 있어요. 아직 시효가 남아 있다면
        지금 바로 행동하는 게 중요하죠. 내용증명 발송만으로도 시효를 끊을 수 있어요.
      </p>

      <GreenBox title="지연이자 청구 핵심 조건">
        발생 시점: 퇴직 후 14일 초과 시점부터 자동 발생<br />
        이율: 연 20% (근로기준법 제37조 기준)<br />
        청구 방법: 내용증명·노동청 진정 시 지연이자 명시 필수
      </GreenBox>

      <SectionBadge>내 상황 체크해보세요</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="지연이자 포함 청구가 가능해요. 아래 절차를 따라 진행하세요."
        partialMatchText="상황에 따라 다를 수 있어요. 고용노동부(1350)에 먼저 상담하세요."
      />

      <Divider />

      <H2>지연이자가 얼마나 붙을까요?</H2>
      <p style={body}>
        퇴직금 500만원을 90일 미뤘다면 지연이자만 약 25만원이에요.
        미지급 기간이 길어질수록 이자도 쌓이기 때문에, 지연 일수를 정확히 기록해두세요.
      </p>
      <p style={body}>
        지연이자는 퇴직 후 14일 초과 시점부터 계산해요. 지급 기한 당일까지는 이자가 없고,
        14일을 넘긴 바로 다음 날부터 하루하루 쌓이는 구조예요.
      </p>

      <SectionBadge>지연이자 계산기</SectionBadge>
      <Calculator
        sliders={CALC_SLIDERS}
        results={CALC_RESULTS}
        note="※ 근로기준법 제37조 기준 연 20% 이율 적용. 퇴직 후 14일 초과 시점부터 계산."
      />

      <CategoryButton label="퇴직금 정보" count={퇴직금_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      <H2>신고에 필요한 서류</H2>
      <p style={body}>
        노동청 진정에는 서류가 많이 필요하지 않아요. 근로 사실과 미지급 사실만 증명하면 충분하죠.
        없는 서류가 있어도 통장 내역이나 문자 기록만으로 진행할 수 있어요.
      </p>

      <SectionBadge>제출 서류 목록</SectionBadge>
      <DocTable docs={DOCS} />

      <BorderBox title="서류를 회사에서 안 줄 때는?">
        4대보험 가입 이력은{" "}
        <a href="https://www.ei.go.kr" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용24</a>에서
        무료로 출력할 수 있어요. 근로 사실 증명은 동료 진술이나 카카오톡 대화로도 가능해요.
      </BorderBox>

      <Divider />

      <H2>미지급 신고 및 지연이자 청구 절차 4단계</H2>
      <p style={body}>
        대부분 2단계(내용증명)에서 해결돼요. 단계를 건너뛰지 않고 순서대로 가면
        증거도 쌓이고 협상력도 높아지죠.
      </p>

      <Steps steps={STEPS} />

      <Divider />

      <H2>청구 전 준비 체크리스트</H2>
      <p style={body}>
        서류와 증거를 미리 챙겨두면 진정 처리 속도가 빨라져요.
        특히 지급 요청 기록과 내용증명의 지연이자 명시는 꼭 확인하세요.
      </p>

      <SectionBadge>체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <GreenBox title="내용증명에 지연이자를 꼭 명시하세요">
        단순히 "퇴직금을 지급해 달라"는 내용만으로는 지연이자 청구 의사가 전달되지 않아요.<br />
        "14일 초과 분에 대해 연 20% 지연이자를 함께 청구할 예정"이라는 문장을 반드시 넣어야 해요.<br />
        이 한 문장이 협상력을 크게 높여줘요.
      </GreenBox>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        지연이자 청구 시 실제로 많이 나오는 질문만 골랐어요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 근로기준법을 바탕으로 작성됐어요. 제도 변경이 있을 수 있으니 최신 기준은 고용노동부(1350)에서 확인하세요." />
    </ArticleLayout>
  );
}
