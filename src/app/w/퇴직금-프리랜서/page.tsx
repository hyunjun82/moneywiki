"use client";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Calculator, EligibilityChecker, Steps, DocTable, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 퇴직금_SIDEBAR, 퇴직금_HIGHLIGHT } from "@/data/퇴직금-guide";

// ─── 데이터 ──────────────────────────────────────────

const CHECK_ITEMS = [
  { id: "c1", label: "회사 지시에 따라 업무 방식·순서를 정했어요" },
  { id: "c2", label: "출퇴근 시간이 정해져 있었어요" },
  { id: "c3", label: "1년 이상 같은 업체에서만 전속으로 일했어요" },
  { id: "c4", label: "작업 도구·장비를 회사에서 제공받았어요" },
];

const CALC_SLIDERS = [
  { id: "monthly", label: "월 평균 수입", min: 150, max: 700, step: 50, defaultValue: 300, format: (v: number) => `${v}만원` },
  { id: "years", label: "같은 업체 계약 기간", min: 1, max: 10, step: 1, defaultValue: 3, format: (v: number) => `${v}년` },
];

const CALC_RESULTS = [
  {
    label: "근로자 인정 시 예상 퇴직금",
    getValue: (v: Record<string, number>) => v.monthly * 10000 * v.years,
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원`,
    highlight: true,
  },
  {
    label: "연간 퇴직금 적립액 (1년치)",
    getValue: (v: Record<string, number>) => v.monthly * 10000,
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원/년`,
  },
];

const DOCS = [
  { name: "업무 지시 메신저·이메일 기록 (카카오톡·슬랙 등)", required: true, where: "본인 캡처·저장" },
  { name: "출퇴근 기록 또는 근태 관련 자료", required: true, where: "회사 시스템 또는 직접 기록" },
  { name: "용역 계약서 또는 위탁계약서", required: false, where: "회사에서 수령한 계약서" },
  { name: "급여 입금 통장 거래내역", required: true, where: "인터넷뱅킹·앱 발급" },
  { name: "4대 보험 가입 여부 확인서 (해당자)", required: false, where: "국민건강보험공단 또는 근로복지공단" },
];

const STEPS = [
  {
    title: "근로자성 판단 기준 파악",
    desc: "계약 명칭이 '프리랜서'라도 실질적으로 지휘·감독 아래 근무했다면 근로기준법상 근로자예요. 출퇴근 강제 여부, 업무 방식 지시 여부, 전속성(한 업체에서만 일함), 작업 도구 제공 여부 4가지가 핵심이에요. 여러 항목이 해당될수록 근로자로 인정될 가능성이 커져요.",
    tip: "대법원은 계약 형식보다 실질적 근로관계를 우선 판단해요 (대법원 2006다49318)",
  },
  {
    title: "증거 수집 (퇴직 전 반드시)",
    desc: "업무 지시 내용이 담긴 카카오톡·이메일·슬랙 메시지를 캡처해서 저장해요. 출퇴근 기록, 업무 보고 내역, 회사 시스템 접근 기록도 강력한 증거예요. 급여 입금 통장 거래내역은 근무 기간과 수입 금액을 동시에 입증해줘요.",
    tip: "퇴직 후에는 회사 시스템 접근이 막히니 재직 중에 미리 저장하세요",
  },
  {
    title: "고용노동부 진정 접수",
    desc: "고용노동부 민원마당(minwon.moel.go.kr)에서 온라인으로 진정을 낼 수 있어요. 근로감독관이 사실 조사를 진행하고, 근로자성이 인정되면 사업주에게 퇴직금 지급 명령이 내려져요. 진정 접수는 무료예요.",
    tip: "1350(고용노동부 고객상담센터)에 먼저 전화 상담을 받으면 진정 방향을 잡기 쉬워요",
    link: { label: "고용노동부 민원마당 바로가기", href: "https://minwon.moel.go.kr" },
  },
  {
    title: "퇴직금 수령",
    desc: "근로자성이 인정되면 프리랜서 계약 기간 전체에 대한 퇴직금을 받을 수 있어요. 퇴직금이 300만원을 초과하면 IRP 계좌로 수령해야 해요. 퇴직소득세가 원천징수된 뒤 지급되고, 소멸시효 3년 이내에 청구해야 해요.",
    tip: "IRP로 수령하면 과세 이연 효과로 퇴직소득세를 나중에 낼 수 있어요",
  },
];

const CHECKLIST = [
  "근로자성 판단: 출퇴근 강제·업무 지시·전속성·도구 제공 여부 확인",
  "증거 수집: 업무 지시 메시지·통장 거래내역·출근 기록 저장",
  "3.3% 원천징수 여부 무관: 세금 처리 방식은 근로자성 판단에 영향 없음",
  "고용노동부 진정: 민원마당(minwon.moel.go.kr) 온라인 접수",
  "소멸시효: 퇴직일로부터 3년 이내 청구",
  "300만원 초과 수령 시 IRP 계좌 필수",
];

const FAQS = [
  {
    q: "프리랜서 계약서를 썼는데 퇴직금을 받을 수 있나요?",
    a: "계약 명칭보다 실제 근무 형태가 기준이에요. 회사 지시를 받고, 출퇴근이 강제됐고, 1년 이상 전속으로 일했다면 근로자로 인정될 수 있어요. 대법원도 계약 형식보다 실질적 관계를 우선해요.",
  },
  {
    q: "3.3% 원천징수를 했으면 근로자가 아닌가요?",
    a: "아니에요. 세금 처리 방식은 근로자성 판단과 별개예요. 사업소득세 3.3%를 냈더라도 실질적으로 근로자였다면 퇴직금 청구가 가능해요. 세무서에 납부한 세금도 환급받을 수 있는 경우가 있어요.",
  },
  {
    q: "근로자성 판단 기준이 뭔가요?",
    a: "출퇴근 강제, 업무 방식·시간 지시, 전속성(한 곳에서만 일함), 재료·장비 회사 제공, 보수의 성격(정기 지급 여부)을 종합적으로 봐요. 이 중 여러 항목이 해당되면 근로자로 인정돼요.",
  },
  {
    q: "특수고용직(보험설계사·학습지교사 등)도 퇴직금을 받나요?",
    a: "업종과 근무 형태에 따라 달라요. 보험설계사, 골프장 경기보조원 등은 근로자성이 인정된 대법원 판례가 있어요. 개별 사안마다 판단이 달라지니 고용노동부(1350)에 상담받는 게 빨라요.",
  },
  {
    q: "퇴직금 청구를 회사가 거부하면 어떻게 하나요?",
    a: "고용노동부에 진정을 내면 근로감독관이 직접 조사해요. 근로자성이 인정되면 지급 명령이 내려지고, 회사가 불이행하면 형사 처벌 대상이에요. 진정은 무료로 접수할 수 있어요.",
  },
  {
    q: "이미 퇴직한 뒤에도 청구할 수 있나요?",
    a: "퇴직일로부터 3년 이내라면 청구 가능해요. 소멸시효가 지나기 전에 빠르게 움직이는 게 중요해요. 증거가 있다면 퇴직 후에도 충분히 인정받을 수 있어요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "근로기준법 제2조: 근로자 정의", url: "https://www.law.go.kr/법령/근로기준법" },
      { label: "근로자퇴직급여보장법 제8조: 퇴직금 산정 기준", url: "https://www.law.go.kr/법령/근로자퇴직급여보장법" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "고용노동부: 특수형태근로종사자 안내", url: "https://www.moel.go.kr" },
      { label: "고용노동부 민원마당: 온라인 진정 접수", url: "https://minwon.moel.go.kr" },
    ],
  },
];

const RELATED = [
  { slug: "프리랜서-퇴직금-지급기준", title: "프리랜서 퇴직금 지급기준", description: "근로자성 인정 기준을 상세히 정리했어요." },
  { slug: "퇴직금-조건", title: "퇴직금 받는 조건", description: "1년 이상·주 15시간 요건과 예외 사항이에요." },
  { slug: "퇴직금-미지급-신고", title: "퇴직금 못 받았을 때 신고 방법", description: "고용노동부 진정 절차와 지연이자 청구법이에요." },
];

// ─── 페이지 ──────────────────────────────────────────

export default function Page() {
  return (
    <ArticleLayout
      sidebar={<Sidebar heading="퇴직금 가이드" items={퇴직금_SIDEBAR} highlightSlugs={퇴직금_HIGHLIGHT} currentSlug="퇴직금-프리랜서" />}
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>퇴직금 · 프리랜서 · 근로자성</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        프리랜서인데 퇴직금을 받을 수 있을까요?<br />
        근로자성 판단 기준부터 진정 절차까지
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        계약서에 '프리랜서'라고 적혀 있어도 퇴직금을 받을 수 있는 경우가 있어요.
        출퇴근이 정해져 있고, 회사 지시를 받고 일했고, 1년 이상 그 업체에서만 일했다면
        <a href="https://www.law.go.kr/법령/근로기준법" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로기준법</a>상 근로자로 볼 수 있거든요.
        계약 형식이 아니라 실질적인 근무 형태가 기준이에요.
        3.3% 세금을 냈다고 해도 마찬가지예요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>어떤 프리랜서가 퇴직금을 받을 수 있나요?</H2>
      <p style={body}>
        법원이 보는 기준은 딱 하나예요. 계약 형식이 아니라 실질적인 근로관계가 있었는지예요.
        출퇴근 시간이 강제되고, 업무 방식을 지시받고, 한 업체에서만 전속으로 일했다면 근로자성이 인정돼요.
        대법원도 이 기준으로 여러 차례 프리랜서의 근로자성을 인정한 판례가 있어요.
      </p>
      <p style={body}>
        반대로 여러 업체와 동시에 계약하고, 작업 방식을 스스로 결정하고, 본인 장비로 일했다면 근로자성이 부정될 수 있어요.
        3.3% 사업소득세를 낸 것은 근로자성 판단에 영향을 주지 않아요.
        세금 처리 방식과 실제 근무 형태는 별개거든요.
      </p>

      <GreenBox>
        출퇴근 강제: 정해진 시간에 출근·퇴근 의무가 있었어요<br />
        업무 지시: 업무 방식·절차·순서를 사용자가 지시했어요<br />
        전속성: 다른 업체 일 없이 한 곳에서만 일했어요
      </GreenBox>

      <SectionBadge>내 상황 체크해보세요</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="근로자성이 인정될 가능성이 높아요. 아래 계산기로 예상 퇴직금을 먼저 확인해보세요."
        partialMatchText="근로자성 판단이 필요한 상황이에요. 고용노동부(1350) 상담을 받아보세요."
      />

      <Divider />

      <H2>근로자 인정 시 퇴직금 예상액 계산</H2>
      <p style={body}>
        근로자성이 인정되면 <a href="/w/퇴직금-계산-방법" style={{ color: "#1D9E75", textDecoration: "underline" }}>퇴직금은 평균임금 × 근속연수</a>로 계산돼요.
        프리랜서 계약 기간 전체가 근속기간으로 인정되기 때문에, 오래 일했을수록 금액이 커져요.
        슬라이더로 월 수입과 계약 기간을 조정해서 예상액을 확인해보세요.
      </p>

      <SectionBadge>예상 퇴직금 계산기</SectionBadge>
      <Calculator
        sliders={CALC_SLIDERS}
        results={CALC_RESULTS}
        note="※ 세전 기준. 실제 수령 시 퇴직소득세가 공제돼요. 300만원 초과 시 IRP 계좌로 수령해야 해요."
      />

      <CategoryButton label="퇴직금 정보" count={퇴직금_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />

      <Divider />

      <H2>근로자성 입증에 필요한 서류</H2>
      <p style={body}>
        고용노동부에 진정을 낼 때 증거가 결정적이에요. 특히 업무 지시 내용이 담긴 메신저 기록은 근로자성을 입증하는 가장 강력한 증거예요.
        퇴직 후에는 회사 시스템 접근이 막히니, 재직 중에 미리 저장해두는 게 중요해요.
      </p>
      <p style={body}>
        급여가 정기적으로 입금된 통장 거래내역은 근무 기간과 보수 성격을 동시에 입증해줘요.
        계약서가 '위탁' 또는 '용역' 형태여도 진정 접수에는 문제없어요.
      </p>

      <SectionBadge>준비 서류 목록</SectionBadge>
      <DocTable docs={DOCS} />

      <Divider />

      <H2>프리랜서 퇴직금 청구 절차 4단계</H2>
      <p style={body}>
        처음부터 법원 소송을 할 필요는 없어요. 고용노동부 진정이 가장 빠르고, 비용도 들지 않아요.
        근로감독관이 직접 사실 조사를 하고, 근로자성이 인정되면 회사에 퇴직금 지급을 명령해요.
      </p>

      <Steps steps={STEPS} />

      <Divider />

      <H2>청구 전 놓치면 안 되는 체크리스트</H2>
      <p style={body}>
        소멸시효 3년이 지나면 청구가 막혀요. 퇴직 후에도 3년 안이라면 지금 바로 움직이세요.
        증거를 먼저 챙기고, 근로자성 판단 기준에 해당하는 항목을 하나씩 확인하면 돼요.
      </p>

      <SectionBadge>체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <GreenBox>
        세금 처리 방식은 근로자성 판단과 별개예요.<br />
        사업소득세 3.3%를 납부했더라도 실질적으로 근로자였다면 퇴직금을 청구할 수 있어요.
      </GreenBox>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        프리랜서 퇴직금에 대해 실제로 많이 나오는 질문만 골랐어요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 근로기준법과 대법원 판례를 바탕으로 작성됐어요. 개별 사안에 따라 결과가 달라질 수 있으니 고용노동부(1350) 전문 상담을 받아보세요." />
    </ArticleLayout>
  );
}
