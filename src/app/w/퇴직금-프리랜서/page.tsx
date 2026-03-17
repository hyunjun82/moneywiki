"use client";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Calculator, EligibilityChecker, Steps, DocTable, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 퇴직금_SIDEBAR } from "@/data/퇴직금-guide";

const CHECK_ITEMS = [
  { id: "c1", label: "프리랜서로 계약했지만 회사 지시를 받고 일했어요" },
  { id: "c2", label: "출퇴근 시간이 정해져 있었어요" },
  { id: "c3", label: "1년 이상 같은 업체에서 일했어요" },
  { id: "c4", label: "다른 업체 일 없이 한 곳에만 전속으로 일했어요" },
];

const CALC_SLIDERS = [
  { id: "monthly", label: "월 평균 수입", min: 150, max: 600, step: 50, defaultValue: 250, format: (v: number) => `${v}만원` },
  { id: "years", label: "같은 업체 계약 기간", min: 1, max: 10, step: 1, defaultValue: 2, format: (v: number) => `${v}년` },
];

const CALC_RESULTS = [
  {
    label: "근로자 인정 시 예상 퇴직금",
    getValue: (v: Record<string, number>) => v.monthly * 10000 * v.years,
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원`,
    highlight: true,
  },
  {
    label: "연간 퇴직금 적립액",
    getValue: (v: Record<string, number>) => v.monthly * 10000,
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원/년`,
  },
];

const DOCS = [
  { name: "업무 지시 이메일·메신저 기록", required: true, where: "본인 보관 (카카오톡·슬랙·이메일)" },
  { name: "출퇴근 기록 또는 근태 관련 자료", required: true, where: "회사 시스템 또는 직접 기록" },
  { name: "용역 계약서 또는 세금계산서", required: false, where: "회사에서 수령한 계약서" },
  { name: "4대 보험 가입 여부 확인서", required: false, where: "국민건강보험공단 또는 근로복지공단" },
];

const STEPS = [
  {
    title: "근로자성 판단 기준 확인",
    desc: "계약 명칭이 '프리랜서'라도 실질적으로 사용자 지휘·감독 아래 근무했다면 근로자예요. 출퇴근 강제, 업무 방식 지시, 전속성(한 업체에서만 일함)이 핵심 기준이에요. 이 중 여러 가지 해당하면 근로자로 인정될 가능성이 커요.",
    tip: "대법원은 실질적 근로관계를 계약 형식보다 우선해요",
  },
  {
    title: "증거 수집",
    desc: "업무 지시 내용이 담긴 카카오톡·이메일·슬랙 메시지를 캡처해 보관해요. 출퇴근 기록, 업무 보고 내역, 회사 시스템 접근 기록도 증거가 돼요. 계약서에 근로자 관련 조항이 있으면 더욱 유리해요.",
    tip: "증거는 퇴직 전에 미리 저장해두세요",
  },
  {
    title: "고용노동부 진정",
    desc: "고용노동부에 퇴직금 청구 진정을 낼 수 있어요. 근로자성이 인정되면 퇴직금 지급 명령이 내려져요. 회사가 이의를 제기하면 노동위원회나 법원에서 다툴 수 있어요. 온라인 진정은 고용노동부 민원마당에서 가능해요.",
    tip: "진정은 무료이고 근로감독관이 직접 조사해줘요",
  },
  {
    title: "퇴직금 수령",
    desc: "근로자성이 인정되면 근속기간 전체에 대한 퇴직금을 받을 수 있어요. 300만원 초과 시 IRP 계좌로 수령해요. 퇴직소득세 원천징수 후 지급되고, 소멸시효 3년 이내에 청구해야 해요.",
    tip: "소멸시효 3년 이내라면 이미 퇴직 후에도 청구 가능해요",
  },
];

const CHECKLIST = [
  "근로자성 판단: 출퇴근 강제·업무 지시·전속성 여부",
  "증거 수집: 업무 지시 메시지·출퇴근 기록 저장",
  "고용노동부 진정: 민원마당에서 온라인 접수",
  "소멸시효: 퇴직 후 3년 이내 청구",
  "IRP 계좌: 300만원 초과 수령 시 필수",
];

const FAQS = [
  {
    q: "프리랜서 계약서를 썼는데 퇴직금을 받을 수 있나요?",
    a: "계약 명칭보다 실제 근무 형태가 중요해요. 회사 지시를 받고, 출퇴근이 강제됐고, 전속적으로 일했다면 근로자로 인정될 수 있어요. 대법원도 이 기준을 여러 차례 인정했어요.",
  },
  {
    q: "프리랜서 근로자성 판단 기준이 뭔가요?",
    a: "출퇴근 강제, 업무 방식·시간 지시, 전속성(한 곳에서만 일), 재료·장비 제공 여부, 보수의 성격(시급·월급) 등을 종합적으로 봐요. 여러 기준 중 상당수가 충족되면 근로자로 볼 수 있어요.",
  },
  {
    q: "특수고용직(보험설계사·학습지교사 등)도 퇴직금을 받나요?",
    a: "업종에 따라 달라요. 보험설계사, 골프장 경기보조원 등의 근로자성이 인정된 대법원 판례가 있어요. 개별 사안마다 판단이 달라지니 고용노동부에 상담을 받아보세요.",
  },
  {
    q: "퇴직금 청구 시 회사가 거부하면 어떻게 하나요?",
    a: "고용노동부에 진정을 내면 근로감독관이 조사해요. 근로자성이 인정되면 퇴직금 지급 명령이 내려지고, 불이행 시 형사 처벌 대상이 돼요.",
  },
  {
    q: "3.3% 원천징수를 했으면 근로자가 아닌가요?",
    a: "아니에요. 세금 처리 방식은 근로자성 판단에 영향을 주지 않아요. 사업소득세 3.3% 원천징수를 했더라도 실질적으로 근로자면 퇴직금 청구가 가능해요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "근로기준법 제2조: 근로자 정의", url: "https://www.law.go.kr/법령/근로기준법" },
      { label: "근로자퇴직급여보장법 제8조: 퇴직금 산정", url: "https://www.law.go.kr/법령/근로자퇴직급여보장법" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "고용노동부: 특수형태근로종사자 안내", url: "https://www.moel.go.kr" },
    ],
  },
];

const RELATED = [
  { slug: "프리랜서-퇴직금-지급기준", title: "프리랜서 퇴직금 지급기준", description: "근로자성 인정 기준을 상세히 설명해요." },
  { slug: "퇴직금-조건", title: "퇴직금 받는 조건", description: "1년 이상 주 15시간 요건과 예외예요." },
  { slug: "퇴직금-미지급-신고", title: "퇴직금 못 받았을 때", description: "고용노동부 진정 절차를 안내해요." },
];

export default function Page() {
  return (
    <ArticleLayout
      sidebar={<Sidebar heading="퇴직금 가이드" items={퇴직금_SIDEBAR} currentSlug="퇴직금-프리랜서" />}
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>퇴직금 · 프리랜서 · 근로자성</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        프리랜서도 퇴직금을 받을 수 있나요?<br />
        근로자성 판단 기준부터 청구 방법까지
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        계약서에 '프리랜서'라고 적혀 있어도 퇴직금을 받을 수 있는 경우가 있어요.
        실제로 회사의 지시를 받고, 출퇴근이 강제됐고, 1년 이상 일했다면 <a href="https://www.law.go.kr/법령/근로기준법" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로기준법</a>상 근로자로 볼 수 있기 때문이에요.
        계약 형식이 아니라 실질적인 근무 형태가 기준이에요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>언제 프리랜서도 퇴직금을 받을 수 있나요?</H2>
      <p style={body}>
        핵심은 실질이에요. 출퇴근 시간이 정해져 있고, 업무 방식을 지시받고, 그 업체에서만 전속으로 일했다면 근로자성이 인정될 수 있어요.
        대법원은 오래전부터 계약 명칭보다 실질적인 근로관계를 우선해요.
      </p>
      <p style={body}>
        반대로 여러 업체와 동시에 계약하고, 작업 방식을 스스로 결정하고, 자신의 장비를 사용한다면 근로자성이 부정될 수 있어요.
        3.3% 사업소득세를 냈다고 해도 근로자성 판단에는 영향이 없어요. 판단이 어려울 땐 <a href="/w/퇴직금-미지급-신고" style={{ color: "#1D9E75", textDecoration: "underline" }}>고용노동부에 진정</a>을 내면 근로감독관이 직접 조사해줘요.
      </p>

      <GreenBox title="근로자성 3대 핵심 기준">
        출퇴근 강제: 정해진 시간에 출근·퇴근 의무가 있어요<br />
        업무 지시: 업무 방식·절차를 사용자가 지시해요<br />
        전속성: 다른 업체 일 없이 한 곳에서만 일했어요
      </GreenBox>

      <SectionBadge>내 상황 체크해보세요</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="근로자성이 인정될 가능성이 높아요. 아래 계산기로 예상 퇴직금을 먼저 확인하세요."
        partialMatchText="근로자성 판단이 필요해요. 고용노동부(1350) 상담을 받아보세요."
      />

      <Divider />

      <H2>근로자 인정 시 예상 퇴직금 계산해보세요</H2>
      <p style={body}>
        근로자성이 인정되면 <a href="/w/퇴직금-계산-방법" style={{ color: "#1D9E75", textDecoration: "underline" }}>퇴직금은 평균임금 × 근속연수</a>로 계산돼요.
        프리랜서 계약 기간 전체가 근속기간으로 인정되기 때문에, 오래 일했을수록 받을 수 있는 금액이 커요.
        300만원 초과 시 IRP 계좌로 수령해야 해요.
      </p>

      <SectionBadge>예상 퇴직금 계산기</SectionBadge>
      <Calculator
        sliders={CALC_SLIDERS}
        results={CALC_RESULTS}
        note="※ 세전 기준. 실제 수령 시 퇴직소득세가 공제돼요."
      />

      <CategoryButton label="퇴직금 정보" count={퇴직금_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      <H2>근로자성 증명에 필요한 서류</H2>
      <p style={body}>
        고용노동부에 진정을 낼 때 증거가 중요해요. 특히 업무 지시가 담긴 메신저 기록은 근로자성을 입증하는 강력한 증거예요.
        퇴직 후에는 회사 시스템에 접근하기 어려우니, 재직 중에 미리 저장해두세요.
      </p>

      <SectionBadge>준비 서류 목록</SectionBadge>
      <DocTable docs={DOCS} />

      <Divider />

      <H2>프리랜서 퇴직금 청구 절차 4단계</H2>
      <p style={body}>
        처음부터 법원 소송을 할 필요는 없어요. 고용노동부 진정이 가장 빠르고 비용도 들지 않아요.
        근로감독관이 사실 조사를 하고, 근로자성이 인정되면 회사에 퇴직금 지급을 명령해요.
      </p>

      <Steps steps={STEPS} />

      <Divider />

      <H2>프리랜서 퇴직금 체크리스트</H2>
      <p style={body}>
        근로자성 인정부터 퇴직금 수령까지 놓치면 안 되는 항목들이에요.
        소멸시효 3년 이내라면 이미 퇴직한 뒤에도 청구할 수 있어요.
      </p>

      <SectionBadge>체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <GreenBox title="3.3% 원천징수를 했어도 퇴직금 청구 가능해요">
        세금 처리 방식은 근로자성 판단과 별개예요.<br />
        사업소득세 3.3%를 냈더라도 실질적으로 근로자였다면 퇴직금을 받을 수 있어요.
      </GreenBox>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        프리랜서 퇴직금에 대해 실제로 많이 나오는 질문만 골랐어요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 근로기준법과 대법원 판례를 바탕으로 작성됐어요. 개별 사안에 따라 결과가 달라질 수 있으니 전문 상담을 받아보세요." />
    </ArticleLayout>
  );
}
