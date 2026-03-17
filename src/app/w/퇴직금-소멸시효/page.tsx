"use client";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Calculator, EligibilityChecker, Steps, DocTable, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 퇴직금_SIDEBAR } from "@/data/퇴직금-guide";

const CHECK_ITEMS = [
  { id: "c1", label: "퇴직한 지 3년이 아직 안 됐어요" },
  { id: "c2", label: "퇴직금을 한 번도 받은 적이 없어요" },
  { id: "c3", label: "근무 사실을 증명할 수 있는 서류가 있어요" },
  { id: "c4", label: "회사에 지급을 요청했거나 내용증명을 보낸 적이 있어요" },
];

const CALC_SLIDERS = [
  { id: "amount", label: "미지급 퇴직금", min: 100, max: 10000, step: 100, defaultValue: 1000, format: (v: number) => `${v.toLocaleString()}만원` },
  { id: "monthsPassed", label: "퇴직 후 경과 개월", min: 1, max: 36, step: 1, defaultValue: 12, format: (v: number) => `${v}개월 (${36 - v}개월 남음)` },
];

const CALC_RESULTS = [
  {
    label: "소멸시효까지 남은 기간",
    getValue: (v: Record<string, number>) => Math.max(0, 36 - v.monthsPassed),
    format: (v: number) => v === 0 ? "소멸 임박!" : `약 ${v}개월`,
    highlight: true,
  },
  {
    label: "지연이자 (연 20% 기준)",
    getValue: (v: Record<string, number>) => {
      const days = Math.max(0, v.monthsPassed * 30 - 14);
      return Math.round(v.amount * 10000 * 0.2 * days / 365);
    },
    format: (v: number) => v === 0 ? "해당 없음" : `약 ${Math.round(v / 10000).toLocaleString()}만원`,
  },
];

const DOCS = [
  { name: "근로계약서", required: true, where: "인사팀 또는 입사 시 수령본" },
  { name: "퇴직일 증빙 (사직서·해고통지서)", required: true, where: "본인 보관 또는 인사팀" },
  { name: "급여명세서 또는 통장 내역", required: true, where: "회사 요청 또는 은행 앱" },
  { name: "지급 요청 기록 (내용증명·문자)", required: false, where: "본인 보관" },
];

const STEPS = [
  {
    title: "소멸시효 확인",
    desc: "퇴직일로부터 3년이에요. 퇴직일이 2023년 1월 1일이면 2026년 1월 1일 전에 청구해야 해요. 날짜가 촉박하다면 지금 당장 행동해야 해요.",
    tip: "내용증명 발송만으로도 시효를 6개월 중단시킬 수 있어요",
  },
  {
    title: "시효 중단 조치",
    desc: "소멸시효를 멈추려면 청구 행위가 필요해요. 내용증명 발송, 소송 제기, 지급명령 신청 중 하나만 해도 시효가 중단돼요. 이후 6개월 내에 소송을 제기해야 완전히 중단되죠.",
    tip: "우체국 내용증명은 법적 청구 의사 표명으로 인정돼요",
  },
  {
    title: "고용노동부 진정 접수",
    desc: "진정을 접수하면 시효 진행이 사실상 멈춰요. 진정 처리 기간은 1~3개월이지만, 접수된 사실 자체가 청구 의사를 증명해요. minwon.moel.go.kr에서 온라인 접수 가능해요.",
    tip: "진정은 무료이고 근로감독관이 직접 조사해줘요",
  },
  {
    title: "소송 또는 지급명령 신청",
    desc: "시효 내에 소송이나 지급명령 신청을 하면 시효가 완전히 중단돼요. 3,000만원 이하는 본인이 직접 가능하고, 인지대는 수만원 수준이에요.",
    tip: "대한법률구조공단(132)에서 무료 법률 지원",
  },
];

const CHECKLIST = [
  "퇴직일 정확히 확인: 3년 기산점",
  "소멸시효 만료일 계산: 퇴직일 + 3년",
  "시효 중단 조치: 내용증명 발송 또는 진정 접수",
  "지연이자 계산: 14일 초과분 연 20%",
  "서류 보관: 청구 증거 3년 이상 보관",
];

const FAQS = [
  {
    q: "소멸시효 3년이 지나면 절대 못 받나요?",
    a: "원칙적으로 청구권이 소멸해요. 다만 회사가 소멸시효를 모르고 지급한다면 유효한 변제가 돼요. 시효가 지났어도 상대방이 이의를 제기하지 않으면 받을 수 있는 경우도 있어요.",
  },
  {
    q: "내용증명을 보내면 소멸시효가 멈추나요?",
    a: "6개월 동안 일시 중단돼요. 중단된 상태에서 6개월 내에 소송이나 지급명령 신청을 해야 완전히 중단돼요.",
  },
  {
    q: "회사가 파산했어도 3년 시효가 적용되나요?",
    a: "적용돼요. 단, 체당금 제도로 정부에서 대신 받을 경우엔 별도 신청 기한이 있어요. 파산 선고일로부터 2년 내 신청해야 해요.",
  },
  {
    q: "퇴직금 일부만 받았는데 나머지도 3년 기준인가요?",
    a: "맞아요. 미지급 금액에 대한 청구권이 퇴직일로부터 3년이에요. 일부 지급이 있었더라도 나머지 미지급분 기산점은 퇴직일이에요.",
  },
  {
    q: "고용노동부에 진정을 넣으면 시효가 중단되나요?",
    a: "진정 접수는 시효 중단으로 인정받기 어려울 수 있어요. 확실한 방법은 내용증명 발송 후 소송 또는 지급명령 신청이에요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "근로기준법 제49조: 퇴직금 청구권 소멸시효 3년", url: "https://www.law.go.kr/법령/근로기준법" },
      { label: "민법 제174조: 시효 중단 사유 (최고)", url: "https://www.law.go.kr/법령/민법" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "고용노동부: 퇴직금 청구 안내", url: "https://www.moel.go.kr" },
      { label: "대한법률구조공단: 무료 법률 상담 (132)", url: "https://www.klac.or.kr" },
    ],
  },
];

const RELATED = [
  { slug: "퇴직금-미지급-신고", title: "퇴직금 미지급 신고 방법", description: "3년 안에 신고하는 방법을 단계별로 안내해요." },
  { slug: "퇴직금-지연이자", title: "퇴직금 지연이자 연 20% 받는 방법", description: "지연이자 계산과 청구 절차를 정리했어요." },
  { slug: "퇴직금-계산법", title: "퇴직금 계산법, 얼마나 받을까?", description: "내 퇴직금이 얼마인지 계산기로 확인해보세요." },
];

export default function Page() {
  return (
    <ArticleLayout
      sidebar={<Sidebar heading="퇴직금 가이드" items={퇴직금_SIDEBAR} currentSlug="퇴직금-소멸시효" />}
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>퇴직금 · 소멸시효 · 청구기한</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        퇴직금 소멸시효 3년, 언제까지 청구해야 하나요?<br />
        시효 중단 방법부터 절차까지
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        퇴직금 청구권은 퇴직일로부터 3년이 지나면 소멸해요.
        <a href="https://www.law.go.kr/법령/근로기준법" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로기준법 제49조</a>에 명시된 기한이에요.
        3년이 지나면 법적으로 청구할 수 없기 때문에, 아직 시효 내라면 지금 바로 행동해야 해요.
        <a href="/w/퇴직금-미지급-신고" style={{ color: "#1D9E75", textDecoration: "underline" }}>신고 방법</a>과 시효 중단 조치를 정리했어요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>지금 청구할 수 있는 상황인가요?</H2>
      <p style={body}>
        소멸시효는 퇴직일 당일부터 3년이에요. 퇴직금을 한 번도 받지 못했고, 아직 3년이 지나지 않았다면 청구가 가능해요.
        퇴직금 일부만 받았다면 나머지 미지급분도 퇴직일 기준 3년이에요.
      </p>
      <p style={body}>
        시효가 촉박하다면 지금 당장 내용증명을 발송해도 6개월 중단 효과가 있어요. 그 사이에 소송이나 지급명령 신청을 하면 시효가 완전히 중단돼요.
      </p>

      <GreenBox title="소멸시효 핵심 정리">
        기산점: 퇴직일 당일부터 3년<br />
        중단 방법: 내용증명 발송 (6개월 중단) → 소송/지급명령 신청<br />
        지연이자: 14일 초과 시 연 20%
      </GreenBox>

      <SectionBadge>내 상황 체크해보세요</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="지금 청구 가능해요. 남은 시효 기간을 확인하고 바로 행동하세요."
        partialMatchText="상황이 다를 수 있어요. 고용노동부(1350) 또는 법률구조공단(132)에 상담해보세요."
      />

      <Divider />

      <H2>소멸시효, 얼마나 남았을까?</H2>
      <p style={body}>
        퇴직 후 경과 기간과 미지급 퇴직금을 입력하면 남은 시효와 지연이자를 확인할 수 있어요.
        시효가 촉박할수록 빠른 행동이 필요해요.
        지연이자는 퇴직 후 14일을 초과한 시점부터 연 20%가 붙어요.
      </p>

      <SectionBadge>소멸시효 + 지연이자 확인기</SectionBadge>
      <Calculator
        sliders={CALC_SLIDERS}
        results={CALC_RESULTS}
        note="※ 퇴직금 청구권 소멸시효는 퇴직일부터 3년(근로기준법 제49조). 지연이자는 14일 초과분 연 20% 기준."
      />

      <CategoryButton label="퇴직금 정보" count={퇴직금_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      <H2>청구에 필요한 서류</H2>
      <p style={body}>
        서류가 없어도 진정이나 소송을 제기할 수 있지만, 서류가 있으면 처리가 빨라요.
        퇴직 직후에 아래 서류를 미리 보관해두는 게 좋아요.
      </p>

      <SectionBadge>준비 서류 목록</SectionBadge>
      <DocTable docs={DOCS} />

      <Divider />

      <H2>소멸시효 중단 및 청구 절차</H2>
      <p style={body}>
        시효가 임박했다면 단계를 건너뛰어도 돼요. 지금 당장 내용증명 발송 또는 소송 제기가 가장 확실한 방법이에요.
      </p>

      <Steps steps={STEPS} />

      <Divider />

      <H2>소멸시효 체크리스트</H2>
      <p style={body}>
        시효 관련해서 놓치면 영영 못 받을 수 있어요. 하나씩 확인해보세요.
      </p>

      <SectionBadge>시효 체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <GreenBox title="3년 시효가 임박했다면 지금 내용증명 발송">
        내용증명 발송만으로도 6개월 시효 중단 효과가 있어요.<br />
        "퇴직금 ○○만원 지급 요청, 이내 미지급 시 법적 조치 예정"이라는 내용이면 충분해요.<br />
        카카오 전자내용증명으로 10분 안에 발송할 수 있어요.
      </GreenBox>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        퇴직금 소멸시효에 대해 실제로 많이 나오는 질문만 골랐어요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 근로기준법과 민법을 바탕으로 작성됐어요. 제도 변경이 있을 수 있으니 최신 기준은 고용노동부(1350) 또는 법률구조공단(132)에서 확인하세요." />
    </ArticleLayout>
  );
}
