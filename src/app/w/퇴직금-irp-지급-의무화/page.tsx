"use client";
import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Calculator, EligibilityChecker, Steps, DocTable, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 퇴직금_SIDEBAR } from "@/data/퇴직금-guide";

// ─── 데이터 ──────────────────────────────────────────

const CHECK_ITEMS = [
  { id: "c1", label: "퇴직금이 300만원을 초과해요" },
  { id: "c2", label: "퇴직일 기준 만 55세 미만이에요" },
  { id: "c3", label: "2022년 4월 14일 이후 퇴직 예정이에요" },
  { id: "c4", label: "IRP 계좌를 아직 개설하지 않았어요" },
];

const CALC_SLIDERS = [
  { id: "salary", label: "월 평균급여", min: 200, max: 600, step: 50, defaultValue: 300, format: (v: number) => `${v}만원` },
  { id: "years", label: "근속 기간", min: 1, max: 20, step: 1, defaultValue: 5, format: (v: number) => `${v}년` },
];

const CALC_RESULTS = [
  {
    label: "예상 퇴직금",
    getValue: (v: Record<string, number>) => v.salary * 10000 * v.years,
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원`,
    highlight: true,
  },
  {
    label: "IRP 의무 여부",
    getValue: (v: Record<string, number>) => v.salary * 10000 * v.years,
    format: (v: number) => v > 3000000 ? "300만원 초과 → IRP 필수" : "300만원 이하 → 일반계좌 가능",
  },
];

const DOCS = [
  { name: "신분증", required: true, where: "본인 지참" },
  { name: "공동인증서 또는 간편인증", required: true, where: "앱 또는 금융인증서" },
  { name: "기존 금융계좌 (이체용)", required: true, where: "본인 은행 계좌" },
  { name: "재직증명서 (일부 금융사 요구)", required: false, where: "회사 인사팀" },
];

const STEPS = [
  {
    title: "IRP 의무화 적용 여부 확인",
    desc: "2022년 4월 14일부터 퇴직금 300만원 초과 시 IRP로만 수령해야 해요. 300만원 이하는 일반 계좌도 가능해요. 55세 이상, 사망, 외국인 국외이주 등 예외 사유도 있어요.",
    tip: "300만원 기준은 세전 퇴직금 총액 기준이에요",
  },
  {
    title: "IRP 계좌 개설",
    desc: "퇴직 전에 은행·증권사·보험사 앱에서 IRP 계좌를 미리 개설해요. 10분 이내에 비대면으로 개설 가능해요. 수수료가 낮은 증권사를 추천해요.",
    tip: "퇴직 확정 전에 미리 만들어두면 지급 지연이 없어요",
  },
  {
    title: "계좌번호 인사팀에 통보",
    desc: "IRP 계좌번호(은행명, 계좌번호, 예금주명)를 인사팀에 문자나 메일로 알려줘요. 회사는 퇴직 후 14일 이내에 이 계좌로 이체해야 해요.",
    tip: "통보 기록을 메시지로 남겨두세요",
  },
  {
    title: "입금 확인 및 운용 지시",
    desc: "IRP 계좌에 퇴직금이 입금되면 어떻게 운용할지 선택해요. 원리금보장형(예금)과 실적배당형(ETF) 중 선택 가능해요. 55세 이후 연금으로 수령하면 퇴직소득세를 30% 절감해요.",
    tip: "운용 지시 안 하면 기본 원리금보장형으로 배정돼요",
  },
];

const CHECKLIST = [
  "300만원 초과 → IRP 필수 (2022.4.14~)",
  "IRP 계좌 개설: 퇴직 전 미리",
  "계좌번호 인사팀에 문자·메일 통보",
  "14일 이내 입금 확인",
  "연금 수령 선택 → 퇴직소득세 30% 절감",
];

const FAQS = [
  {
    q: "IRP 의무화는 언제부터인가요?",
    a: "2022년 4월 14일부터 퇴직금 300만원 초과 시 IRP 의무화가 시행됐어요.",
  },
  {
    q: "IRP 없이 받으면 어떻게 되나요?",
    a: "회사가 IRP 외 계좌로 지급하면 근로자퇴직급여보장법 위반이에요. 회사가 법적 책임을 져요.",
  },
  {
    q: "IRP 개설이 어려우면 어떻게 하나요?",
    a: "스마트폰 앱으로 10분이면 개설 가능해요. 앱이 어려우면 은행 방문으로도 개설할 수 있어요.",
  },
  {
    q: "IRP에 받은 돈을 바로 인출할 수 있나요?",
    a: "퇴직소득세를 납부하면 인출 가능해요. 55세 미만이면 기타소득세 16.5%가 추가될 수 있어요.",
  },
  {
    q: "회사가 IRP 이체를 거부하면?",
    a: "고용노동부(1350)에 신고하면 돼요. IRP 이외 계좌로 지급하거나 현금으로 주는 건 위법이에요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "근로자퇴직급여보장법 제9조: IRP 의무 이전", url: "https://www.law.go.kr/법령/근로자퇴직급여보장법" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "고용노동부: IRP 의무화 안내", url: "https://www.moel.go.kr" },
    ],
  },
];

const RELATED = [
  { slug: "퇴직금-irp-의무", title: "IRP 의무화 기준", description: "300만원 초과 시 IRP 필수 기준." },
  { slug: "퇴직금-IRP-계좌", title: "IRP 계좌 개설 방법", description: "은행·증권사 비교와 개설 절차." },
  { slug: "퇴직금-irp-의무-예외", title: "IRP 의무화 예외", description: "예외 적용 대상과 일반계좌 수령 조건." },
];

// ─── 페이지 ──────────────────────────────────────────

export default function Page() {
  return (
    <ArticleLayout
      sidebar={<Sidebar heading="퇴직금 가이드" items={퇴직금_SIDEBAR} currentSlug="퇴직금-irp-지급-의무화" />}
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>퇴직금 · IRP · 의무화</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        퇴직금 IRP 지급 의무화, 언제부터 어떻게 적용되나요?<br />
        2022년 4월 기준과 300만원 IRP 수령 절차
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        2022년 4월 14일부터 <a href="https://www.law.go.kr/법령/근로자퇴직급여보장법" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로자퇴직급여보장법 제9조</a> 개정으로
        퇴직금 300만원 초과 시 IRP(개인형 퇴직연금) 계좌로만 지급해야 해요.
        회사가 "IRP 계좌번호 주세요"라고 하는 이유가 바로 이거예요.
        IRP 계좌가 없으면 14일 법정 기한 안에 퇴직금 이체가 불가능해요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>IRP 의무화 해당 여부 확인</H2>
      <p style={body}>
        2022년 4월 14일 이후 퇴직하는 55세 미만 근로자 중 퇴직금이 300만원을 초과하면 IRP 의무 대상이에요.
        이 조건에 모두 해당하면 IRP 계좌 없이는 퇴직금을 받을 수 없어요.
      </p>
      <p style={body}>
        예외 조건은 세 가지예요. 55세 이상, 퇴직금 300만원 이하, 근로자 사망의 경우는 일반 계좌로 받을 수 있어요.
        외국인 근로자가 국외 이주하는 경우도 예외에 해당해요.
      </p>

      <GreenBox title="IRP 의무화 기준 (2022.4.14~)">
        의무 대상: 55세 미만 + 퇴직금 300만원 초과<br />
        예외 대상: 55세 이상 또는 퇴직금 300만원 이하 또는 사망
      </GreenBox>

      <SectionBadge>해당 여부 체크</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="IRP 의무 대상이에요. 퇴직 전에 IRP 계좌를 미리 개설해두세요. 아래 계산기로 퇴직금 금액도 확인해보세요."
        partialMatchText="일부 조건만 해당돼요. 나이와 퇴직금 금액을 정확히 확인하세요."
      />

      <Divider />

      <H2>퇴직금 규모로 IRP 의무 여부 확인</H2>
      <p style={body}>
        퇴직금은 '평균임금 × 30일 × 근속연수'로 계산해요. 월 급여와 근속 기간을 입력하면 예상 퇴직금과 IRP 의무 여부를 바로 확인할 수 있어요.
        300만원을 살짝 넘는 경우라도 IRP 의무가 적용되니, 애매하다면 미리 개설해두는 게 안전해요.
      </p>
      <p style={body}>
        예를 들어 월 250만원을 받고 13개월 근무했다면 퇴직금이 약 325만원으로 계산되고, 이 경우 IRP가 필수예요.
        정확한 금액은 회사에서 산출하지만 대략적인 규모를 미리 파악하면 준비가 수월해요.
      </p>

      <SectionBadge>퇴직금 IRP 의무 여부 계산기</SectionBadge>
      <Calculator
        sliders={CALC_SLIDERS}
        results={CALC_RESULTS}
        note="※ 퇴직금 300만원 초과 시 IRP 계좌 의무예요."
      />

      <CategoryButton label="퇴직금 정보" count={퇴직금_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      <H2>IRP 개설에 필요한 서류</H2>
      <p style={body}>
        IRP 계좌는 은행, 증권사, 보험사 어디서든 개설할 수 있어요. 비대면 앱 개설이 가장 빠르고 보통 10~15분이면 완료돼요.
        신분증과 인증 수단만 있으면 대부분 해결돼요.
      </p>
      <p style={body}>
        수수료 측면에서는 증권사 IRP가 유리한 경우가 많아요. 은행 IRP는 접근성이 좋고, 어디서 개설하든 퇴직금 수령 기능은 동일해요.
        일부 금융사는 재직증명서를 요구하기도 하니 인사팀에 미리 요청해두면 빠르게 처리할 수 있어요.
      </p>

      <SectionBadge>준비 서류 목록</SectionBadge>
      <DocTable docs={DOCS} />

      <Divider />

      <H2>IRP 수령 절차 4단계</H2>
      <p style={body}>
        퇴직금을 IRP로 받는 과정은 생각보다 단순해요. 미리 계좌를 개설해두고 계좌번호를 인사팀에 알려주면 회사가 14일 이내에 이체해요.
        이체 후 운용 방식만 결정하면 끝이에요.
      </p>
      <p style={body}>
        중요한 건 순서예요. 퇴직 확정 전에 IRP를 개설해두지 않으면 회사가 이체할 계좌가 없어서 지급이 늦어질 수 있어요.
        14일이 지나도 이체가 안 되면 <a href="/w/퇴직금-지연이자" style={{ color: "#1D9E75", textDecoration: "underline" }}>지연이자(연 20%)</a>를 청구할 수 있어요.
      </p>

      <Steps steps={STEPS} />

      <Divider />

      <H2>IRP 의무화 체크리스트</H2>
      <p style={body}>
        퇴직 준비 과정에서 놓치기 쉬운 항목들이에요. IRP 계좌 개설 시점이 특히 중요해요.
        퇴직이 확정된 시점에 바로 개설을 시작하세요.
      </p>
      <p style={body}>
        IRP에 퇴직금이 들어온 후 어떻게 운용할지도 미리 생각해두면 좋아요.
        55세 이전에 일시금으로 인출하면 퇴직소득세 전액을 내야 하지만, 55세 이후 연금으로 받으면 세금이 30% 줄어요.
      </p>

      <SectionBadge>체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <GreenBox title="IRP에서 연금으로 수령하면 세금이 30% 줄어요">
        55세 이후 10년 이상 나눠 받는 연금 방식으로 퇴직소득세를 절감할 수 있어요.
        지금 당장 쓸 계획이 없다면 연금 수령을 염두에 두세요.
      </GreenBox>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        IRP 의무화에 관해 자주 나오는 질문들이에요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 근로자퇴직급여보장법을 바탕으로 작성됐어요. 제도 변경이 있을 수 있으니 최신 기준은 고용노동부(1350)에서 확인하세요." />
    </ArticleLayout>
  );
}
