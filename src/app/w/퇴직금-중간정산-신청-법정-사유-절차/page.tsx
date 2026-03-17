"use client";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Calculator, EligibilityChecker, Steps, DocTable, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 퇴직금_SIDEBAR } from "@/data/퇴직금-guide";

const CHECK_ITEMS = [
  { id: "c1", label: "무주택자이고 주택 구입 또는 전세 계약 예정이에요" },
  { id: "c2", label: "본인 또는 가족의 질병·부상으로 의료비가 필요해요" },
  { id: "c3", label: "파산 또는 개인회생 결정을 받았어요" },
  { id: "c4", label: "중간정산 후 근속 기간이 리셋된다는 걸 알고 있어요" },
];

const CALC_SLIDERS = [
  { id: "salary", label: "월 평균임금", min: 200, max: 700, step: 10, defaultValue: 300, format: (v: number) => `${v}만원` },
  { id: "years", label: "중간정산 신청 시점 근속 기간", min: 1, max: 20, step: 1, defaultValue: 5, format: (v: number) => `${v}년` },
];

const CALC_RESULTS = [
  {
    label: "중간정산 예상 금액",
    getValue: (v: Record<string, number>) => Math.round(v.salary * 10000 * v.years),
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원`,
    highlight: true,
  },
  {
    label: "중간정산 후 퇴직소득세 (근속 기간 짧아짐 주의)",
    getValue: (v: Record<string, number>) => {
      const base = v.salary * 10000 * v.years;
      const deduction = Math.min(v.years * 500000, 5000000);
      return Math.round(Math.max(0, base - deduction) * 0.06 * 1.1);
    },
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원`,
  },
];

const DOCS = [
  { name: "중간정산 신청서", required: true, where: "회사 인사팀 또는 자체 작성" },
  { name: "주택 매매계약서 또는 임대차계약서 (주택 사유)", required: false, where: "해당 계약서" },
  { name: "의사 진단서 또는 치료확인서 (의료비 사유)", required: false, where: "병원 발급" },
  { name: "파산·개인회생 결정문 사본 (해당 시)", required: false, where: "법원 발행" },
];

const STEPS = [
  {
    title: "법정 사유 해당 여부 확인",
    desc: "중간정산은 ①무주택자 주택 구입·임차 ②본인·배우자·부양가족 의료비 6개월치 월급 초과 ③파산·개인회생 ④천재지변·재해 등 법정 사유가 있어야 신청할 수 있어요(근로자퇴직급여보장법 시행령 제3조). 사유 없이 신청하면 불법이에요.",
    tip: "퇴직연금(DC형 등)의 경우 중간정산 대신 중도인출 제도를 이용해요",
  },
  {
    title: "회사에 신청서 제출",
    desc: "법정 사유를 증빙하는 서류와 중간정산 신청서를 인사팀에 제출해요. 회사가 승인하면 중간정산이 진행돼요. 회사는 중간정산을 거부할 수도 있어요: 법정 의무가 아니라 재량이에요.",
    tip: "회사 취업규칙에 중간정산 관련 규정이 있으면 먼저 확인하세요",
  },
  {
    title: "중간정산 후 근속 기간 리셋 이해",
    desc: "중간정산을 받으면 그 시점부터 근속 기간이 다시 시작돼요. 퇴직 시 퇴직금은 중간정산 이후 근무 기간만을 기준으로 계산해요. 근속 기간이 짧아지면 퇴직소득세 공제가 줄어들어 세금이 더 나올 수 있어요.",
    tip: "중간정산 후 최종 퇴직 시 세금이 더 나올 수 있으니 미리 계산해보세요",
  },
  {
    title: "세금 처리",
    desc: "중간정산금도 퇴직소득세 과세 대상이에요. 지급 시 회사가 원천징수해요. IRP로 받으면 과세 이연이 되지만, 현금으로 받으면 바로 세금을 내야 해요. 중간정산 후에도 IRP 계좌를 이용하면 절세 효과가 있어요.",
    tip: "중간정산 후 IRP 이전 여부를 금융사에 문의하세요",
  },
];

const CHECKLIST = [
  "법정 사유: 무주택 주택 구입, 의료비, 파산 등 7가지 중 해당 여부",
  "증빙 서류: 계약서·진단서 등 사유별 증빙 준비",
  "회사 승인: 중간정산은 회사 재량, 거부 가능",
  "근속 기간 리셋: 중간정산 후 퇴직금 계산 기간 다시 시작",
  "세금 주의: 근속 기간 짧아지면 퇴직소득세 증가 가능",
];

const FAQS = [
  {
    q: "중간정산을 회사가 거부할 수 있나요?",
    a: "맞아요. 법정 사유가 있어도 회사가 거부할 수 있어요. 중간정산은 근로자의 권리가 아니라 사용자의 재량이에요. 단, 취업규칙이나 단체협약에 중간정산 관련 규정이 있다면 그 기준을 따라야 해요.",
  },
  {
    q: "중간정산 후 퇴직금이 어떻게 달라지나요?",
    a: "중간정산 시점부터 근속 기간이 다시 카운트돼요. 퇴직 시 퇴직금은 중간정산 이후 근무 기간만 기준으로 계산해요. 중간정산 전 기간의 퇴직금은 이미 받았으니 포함되지 않아요.",
  },
  {
    q: "중간정산 후 IRP로 받을 수 있나요?",
    a: "원칙적으로 중간정산금도 300만원 초과 시 IRP로만 받아야 해요(2022년 4월 이후). IRP에 넣어두면 과세 이연 효과가 있어요.",
  },
  {
    q: "전세 계약 갱신도 중간정산 사유가 되나요?",
    a: "주거 안정을 위한 전세 계약 갱신은 사유에 포함될 수 있어요. 단, 무주택자가 주거 목적으로 임차계약을 맺는 경우가 기준이에요. 구체적인 사유는 회사 취업규칙과 법령을 함께 확인해야 해요.",
  },
  {
    q: "중간정산 사유 없이 신청하면 어떻게 되나요?",
    a: "법정 사유 없는 중간정산은 위법이에요. 회사가 사유 없이 중간정산을 해줬다면 나중에 퇴직금 지급 분쟁에서 문제가 될 수 있어요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "근로자퇴직급여보장법 시행령 제3조: 중간정산 법정 사유", url: "https://www.law.go.kr/법령/근로자퇴직급여보장법시행령" },
      { label: "근로자퇴직급여보장법 제8조: 퇴직금 산정 기준", url: "https://www.law.go.kr/법령/근로자퇴직급여보장법" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "고용노동부: 퇴직금 중간정산 안내", url: "https://www.moel.go.kr" },
    ],
  },
];

const RELATED = [
  { slug: "퇴직금-중간정산", title: "퇴직금 중간정산 완전 정리", description: "중간정산 요건과 절차를 자세히 설명해요." },
  { slug: "퇴직금-중간정산-세금", title: "퇴직금 중간정산 세금", description: "중간정산 시 퇴직소득세를 계산해요." },
  { slug: "퇴직금-중간정산-주택구입", title: "주택 구입 중간정산", description: "주택 구입 사유 중간정산 절차 안내." },
];

export default function Page() {
  return (
    <ArticleLayout
      sidebar={<Sidebar heading="퇴직금 가이드" items={퇴직금_SIDEBAR} currentSlug="퇴직금-중간정산-신청-법정-사유-절차" />}
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>퇴직금 · 중간정산 · 법정사유</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        퇴직금 중간정산 신청, 법정 사유와 절차는?<br />
        신청 조건부터 근속 기간 리셋 주의사항까지
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        퇴직금 중간정산은 무주택 주택 구입, 의료비 과다, 파산·개인회생 등 <a href="/w/퇴직금-중간정산" style={{ color: "#1D9E75", textDecoration: "underline" }}>법정 사유</a>가 있어야 신청할 수 있어요.
        사유 없는 중간정산은 위법이에요.
        중간정산 후 근속 기간이 리셋돼서 <a href="/w/퇴직금-세금" style={{ color: "#1D9E75", textDecoration: "underline" }}>퇴직소득세</a>가 더 나올 수 있으니 신청 전에 세금을 먼저 계산해보세요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>중간정산 신청 전 꼭 알아야 할 것들</H2>
      <p style={body}>
        중간정산은 근로자의 당연한 권리가 아니에요. 법정 사유가 있어야 하고, 회사가 승인해야 해요.
        법정 사유는 근로자퇴직급여보장법 시행령 제3조에 규정되어 있고, 주택 구입·임차, 의료비, 파산·개인회생, 재해 등이 포함돼요.
        사유를 입증하는 서류도 함께 제출해야 해요.
      </p>
      <p style={body}>
        중간정산 후 가장 주의할 점은 근속 기간 리셋이에요. 중간정산을 받은 시점부터 근속 기간이 다시 시작되므로, 최종 퇴직 시 퇴직금과 퇴직소득세 공제가 달라져요.
        특히 근속 기간이 짧아지면 퇴직소득세가 더 나올 수 있어요.
      </p>

      <GreenBox title="중간정산 법정 사유 7가지 (요약)">
        ① 무주택자 주택 구입·전세 계약<br />
        ② 의료비 (본인·배우자·부양가족, 6개월치 초과)<br />
        ③ 파산·개인회생 결정<br />
        ④ 천재지변·재해 ⑤ 학자금 ⑥ 기타 (시행령 제3조 전문)
      </GreenBox>

      <SectionBadge>내 상황 체크해보세요</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="중간정산 신청 사유에 해당해요. 아래 계산기로 예상 금액과 세금을 확인하세요."
        partialMatchText="사유가 법정 요건에 해당하는지 고용노동부(1350) 또는 노무사 상담을 권해요."
      />

      <Divider />

      <H2>중간정산 금액과 세금 계산</H2>
      <p style={body}>
        월 평균임금과 중간정산 신청 시점 근속 기간을 입력하면 예상 중간정산 금액과 퇴직소득세를 확인할 수 있어요.
        근속 기간이 짧을수록 세금 공제가 줄어 세금 부담이 커질 수 있어요.
      </p>

      <SectionBadge>중간정산 금액 계산기</SectionBadge>
      <Calculator
        sliders={CALC_SLIDERS}
        results={CALC_RESULTS}
        note="※ 추정치. 중간정산 후 퇴직소득세는 근속공제 적용으로 실제와 다를 수 있어요."
      />

      <CategoryButton label="퇴직금 정보" count={퇴직금_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      <H2>신청에 필요한 서류</H2>
      <p style={body}>
        사유별로 증빙 서류가 달라요. 주택 구입이라면 매매계약서, 의료비라면 진단서·치료확인서를 준비해야 해요.
        서류가 불완전하면 회사가 승인을 거부할 수 있어요.
      </p>

      <SectionBadge>준비 서류 목록</SectionBadge>
      <DocTable docs={DOCS} />

      <Divider />

      <H2>중간정산 신청 4단계</H2>
      <p style={body}>
        법정 사유 확인 → 신청서·증빙 제출 → 근속 기간 리셋 이해 → 세금 처리 순서예요.
        세금 영향을 미리 파악해야 손해가 없어요.
      </p>

      <Steps steps={STEPS} />

      <Divider />

      <H2>중간정산 신청 체크리스트</H2>
      <p style={body}>
        근속 기간 리셋과 세금 증가 가능성이 핵심 주의사항이에요. 신청 전에 꼭 계산해보세요.
      </p>

      <SectionBadge>체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <GreenBox title="중간정산 전에 세금 계산부터 하세요">
        근속 기간이 짧아지면 최종 퇴직 시 세금이 더 나올 수 있어요.<br />
        IRP로 받으면 과세 이연이 되니 세금 부담을 줄이는 방법도 있어요.
      </GreenBox>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        퇴직금 중간정산 신청 사유와 절차에 대해 실제로 많이 나오는 질문만 골랐어요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 근로자퇴직급여보장법과 시행령을 바탕으로 작성됐어요. 제도 변경이 있을 수 있으니 최신 기준은 고용노동부(1350)에서 확인하세요." />
    </ArticleLayout>
  );
}
