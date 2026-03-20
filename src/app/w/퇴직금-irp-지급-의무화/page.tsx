"use client";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Calculator, EligibilityChecker, Steps, DocTable, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 퇴직금_SIDEBAR, 퇴직금_HIGHLIGHT } from "@/data/퇴직금-guide";

// ─── 데이터 ──────────────────────────────────────────

const CHECK_ITEMS = [
  { id: "c1", label: "2022년 4월 14일 이후에 퇴직했어요" },
  { id: "c2", label: "퇴직금이 300만원을 초과해요" },
  { id: "c3", label: "퇴직일 기준 만 55세 미만이에요" },
  { id: "c4", label: "사망·장해·외국인 국외이주 등 예외 사유가 없어요" },
];

const CALC_SLIDERS = [
  { id: "salary", label: "월 평균급여", min: 150, max: 700, step: 10, defaultValue: 300, format: (v: number) => `${v}만원` },
  { id: "years", label: "근속 기간", min: 1, max: 30, step: 1, defaultValue: 5, format: (v: number) => `${v}년` },
];

const CALC_RESULTS = [
  {
    label: "예상 퇴직금",
    getValue: (v: Record<string, number>) => v.salary * 10000 * v.years,
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원`,
    highlight: true,
  },
  {
    label: "IRP 의무 적용 여부",
    getValue: (v: Record<string, number>) => v.salary * 10000 * v.years,
    format: (v: number) => v > 3000000 ? "300만원 초과 → IRP 계좌 필수" : "300만원 이하 → 일반 계좌도 가능",
  },
];

const DOCS = [
  { name: "신분증 (주민등록증 또는 운전면허증)", required: true, where: "본인 지참" },
  { name: "공동인증서 또는 간편인증 (카카오·네이버)", required: true, where: "앱에서 발급" },
  { name: "본인 명의 기존 금융계좌", required: true, where: "이체 확인용" },
  { name: "재직증명서 (일부 금융사 요구)", required: false, where: "회사 인사팀 발급" },
];

const STEPS = [
  {
    title: "IRP 의무화 적용 여부 확인",
    desc: "퇴직금이 300만원을 초과하고, 만 55세 미만이라면 IRP 의무 대상이에요. 2022년 4월 14일 이후 퇴직자부터 적용돼요. 300만원 이하거나 55세 이상이면 일반 계좌로도 받을 수 있어요.",
    tip: "300만원 기준은 세전 퇴직금 총액 기준이에요",
  },
  {
    title: "퇴직 전 IRP 계좌 개설",
    desc: "퇴직 확정 전에 미리 은행·증권사·보험사 앱에서 IRP 계좌를 개설해요. 비대면으로 10분 이내에 가능해요. 개설을 늦추면 회사가 이체할 계좌가 없어서 지급이 14일을 넘길 수 있어요.",
    tip: "수수료가 낮은 증권사 IRP가 장기적으로 유리해요",
  },
  {
    title: "계좌번호 인사팀에 제출",
    desc: "IRP 계좌번호(은행명·계좌번호·예금주명)를 인사팀에 문자나 이메일로 전달해요. 회사는 퇴직일로부터 14일 이내에 해당 IRP 계좌로 퇴직금을 이체해야 해요.",
    tip: "전달 기록을 캡처해 두면 분쟁 시 증거가 돼요",
  },
  {
    title: "IRP 입금 확인 및 운용 선택",
    desc: "IRP 계좌에 퇴직금이 입금되면 운용 방식을 선택해요. 원리금보장형(예금·채권)과 실적배당형(ETF·펀드) 중 고를 수 있어요. 55세 이후 연금으로 받으면 퇴직소득세가 30% 줄어요.",
    tip: "운용 지시를 안 하면 기본 원리금보장형으로 배정돼요",
  },
];

const CHECKLIST = [
  "퇴직금 300만원 초과 + 55세 미만 → IRP 계좌 필수 (2022.4.14~)",
  "퇴직 확정 전에 IRP 계좌 미리 개설하기",
  "계좌번호를 인사팀에 문자·이메일로 전달하고 기록 보관",
  "퇴직일 기준 14일 이내 입금 여부 확인",
  "미입금 시 지연이자(연 20%) 청구 가능 — 고용노동부(1350) 신고",
  "55세 이후 연금 수령 선택 시 퇴직소득세 30% 절감",
];

const FAQS = [
  {
    q: "IRP 의무화는 정확히 언제부터 시작됐나요?",
    a: "2022년 4월 14일부터예요. 이날 이후 퇴직하는 근로자 중 퇴직금이 300만원을 초과하고 만 55세 미만이면 IRP 계좌로만 지급받을 수 있어요. 근로자퇴직급여보장법 제9조 개정으로 시행됐어요.",
  },
  {
    q: "회사가 IRP 말고 일반 계좌로 퇴직금을 보내면 어떻게 되나요?",
    a: "회사가 근로자퇴직급여보장법을 위반한 거예요. 이 경우 고용노동부(1350)에 신고할 수 있어요. 회사는 과태료 처분을 받을 수 있고, 퇴직금을 다시 IRP로 이전해야 해요.",
  },
  {
    q: "IRP 계좌가 없을 때 퇴직금은 어떻게 받나요?",
    a: "IRP 계좌를 먼저 개설해야 해요. 은행·증권사·보험사 앱에서 10분 이내로 개설 가능해요. 계좌 없이는 300만원 초과 퇴직금을 수령할 방법이 없어요.",
  },
  {
    q: "IRP에 들어온 퇴직금을 바로 인출할 수 있나요?",
    a: "퇴직소득세를 납부하면 인출할 수 있어요. 55세 미만 일시 인출 시에는 기타소득세 16.5%가 추가로 부과될 수 있어요. 55세 이후 연금으로 받으면 세금이 30% 줄어요.",
  },
  {
    q: "14일이 지나도 IRP에 입금이 안 되면 어떻게 하나요?",
    a: "지연이자(연 20%)를 청구할 수 있어요. 지급이 늦어지면 인사팀에 먼저 연락하고, 해결이 안 되면 고용노동부(1350)에 신고하세요. 지연 기간에 비례해 이자가 붙어요.",
  },
  {
    q: "55세 이상이거나 퇴직금이 300만원 이하면 어떻게 받나요?",
    a: "IRP 의무화 예외에 해당해요. 일반 은행 계좌로 바로 수령할 수 있어요. 단, 원한다면 IRP 계좌로 받는 것도 가능해요. IRP 이전 시 과세 이연 혜택이 있어서 세금을 나중에 납부할 수 있어요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "근로자퇴직급여보장법 제9조: 퇴직금 IRP 의무 이전", url: "https://www.law.go.kr/법령/근로자퇴직급여보장법" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "고용노동부: 퇴직급여 IRP 의무화 안내", url: "https://www.moel.go.kr" },
      { label: "금융감독원: IRP 계좌 개설 안내", url: "https://www.fss.or.kr" },
    ],
  },
];

const RELATED = [
  { slug: "퇴직금-irp-의무", title: "퇴직금 IRP 의무 기준", description: "300만원 초과 시 IRP 필수인 이유와 기준." },
  { slug: "퇴직금-IRP-이전-의무가입-세액공제-혜택", title: "IRP 세액공제 혜택", description: "IRP 이전 시 절세 혜택과 연금 수령 조건." },
  { slug: "퇴직금-지급-기한", title: "퇴직금 지급 기한 14일", description: "지연이자 청구 방법과 신고 절차." },
];

// ─── 페이지 ──────────────────────────────────────────

export default function Page() {
  return (
    <ArticleLayout
      sidebar={<Sidebar heading="퇴직금 가이드" items={퇴직금_SIDEBAR} highlightSlugs={퇴직금_HIGHLIGHT} currentSlug="퇴직금-irp-지급-의무화" />}
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>퇴직금 · IRP · 의무화</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        퇴직금 IRP로만 줘야 한다는데, 나도 해당되나요?<br />
        300만원 기준과 IRP 수령 절차
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        2022년 4월 14일부터 <a href="https://www.law.go.kr/법령/근로자퇴직급여보장법" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로자퇴직급여보장법 제9조</a>가 개정돼서
        퇴직금 300만원을 초과하면 IRP(개인형 퇴직연금) 계좌로만 받을 수 있어요.
        회사가 "IRP 계좌번호를 제출해 주세요"라고 요청하는 이유가 바로 이 법 때문이에요.
        IRP 계좌 없이는 퇴직금을 받을 수 없고, 회사는 퇴직일로부터 14일 내에 이체해야 해요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>내가 IRP 의무화 대상인지 확인하기</H2>
      <p style={body}>
        IRP 의무 대상은 세 가지 조건을 모두 충족하는 경우예요. 2022년 4월 14일 이후 퇴직, 퇴직금 300만원 초과, 만 55세 미만이에요.
        이 세 조건이 하나라도 빠지면 일반 계좌로도 수령할 수 있어요.
      </p>
      <p style={body}>
        예외 사유도 있어요. 근로자가 사망한 경우, 외국인이 국외로 이주하는 경우, 퇴직 후 개인파산·회생 절차에 들어간 경우는 일반 계좌로 수령이 가능해요.
        본인 상황이 예외에 해당하는지 아래에서 먼저 체크해보세요.
      </p>

      <GreenBox>
        의무 대상: 2022.4.14 이후 퇴직 + 퇴직금 300만원 초과 + 만 55세 미만<br />
        예외 대상: 55세 이상 / 퇴직금 300만원 이하 / 사망 / 외국인 국외이주 / 파산·회생
      </GreenBox>

      <SectionBadge>IRP 의무 대상 체크</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="IRP 의무 대상이에요. 퇴직 전에 IRP 계좌를 미리 개설해두세요. 아래 계산기로 퇴직금 규모도 바로 확인할 수 있어요."
        partialMatchText="일부 조건만 해당돼요. 나이와 퇴직금 금액을 정확히 파악한 뒤 IRP 개설 여부를 결정하세요."
      />

      <Divider />

      <H2>퇴직금 규모로 IRP 의무 여부 바로 계산</H2>
      <p style={body}>
        퇴직금 공식은 '평균임금 × 30일 × 근속연수'예요. 월 급여와 근속 기간을 입력하면 예상 퇴직금과 IRP 의무 적용 여부를 바로 볼 수 있어요.
        300만원을 조금 넘는 경우에도 IRP 의무가 적용되니, 애매하다면 미리 개설해두는 게 안전해요.
      </p>
      <p style={body}>
        예를 들어 월 250만원을 받고 13개월 근무했다면 퇴직금이 약 325만원으로 계산돼요.
        이 경우 300만원을 초과하기 때문에 IRP가 필수예요.
        정확한 금액은 회사가 산정하지만, 대략적인 규모를 미리 파악해두면 개설 타이밍을 놓치지 않아요.
      </p>

      <SectionBadge>퇴직금 IRP 의무 여부 계산기</SectionBadge>
      <Calculator
        sliders={CALC_SLIDERS}
        results={CALC_RESULTS}
        note="※ 평균임금 × 근속연수 기준 간편 계산이에요. 정확한 퇴직금은 회사에서 3개월 평균임금으로 산정해요."
      />

      <CategoryButton label="퇴직금 정보" count={퇴직금_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />

      <Divider />

      <H2>IRP 계좌 개설에 필요한 서류</H2>
      <p style={body}>
        IRP 계좌는 은행·증권사·보험사 어디서든 개설할 수 있어요. 비대면 앱 개설이 가장 빠르고, 신분증과 인증 수단만 있으면 10분 이내에 완료돼요.
        수수료 측면에서는 증권사 IRP가 낮은 경우가 많아요.
      </p>
      <p style={body}>
        일부 금융사는 재직증명서를 요구하기도 해요. 퇴직이 확정되기 전에 인사팀에 미리 발급 요청을 해두면 계좌 개설이 빨라요.
        계좌가 개설됐으면 계좌번호를 인사팀에 꼭 전달해야 해요.
      </p>

      <SectionBadge>IRP 개설 서류 목록</SectionBadge>
      <DocTable docs={DOCS} />

      <Divider />

      <H2>퇴직금 IRP 수령 절차 4단계</H2>
      <p style={body}>
        순서가 중요해요. IRP 계좌는 퇴직 확정 전에 미리 개설해야 해요. 퇴직일 이후에 개설하면 14일 기한이 이미 시작된 상태라 지급이 늦어질 수 있어요.
      </p>
      <p style={body}>
        계좌번호를 인사팀에 전달했으면 회사가 14일 이내에 이체해요.
        입금된 뒤 운용 방식을 선택하면 모든 절차가 끝나요.
        입금이 14일을 넘기면 <a href="/w/퇴직금-지연이자" style={{ color: "#1D9E75", textDecoration: "underline" }}>지연이자(연 20%)</a>를 청구할 수 있어요.
      </p>

      <Steps steps={STEPS} />

      <Divider />

      <H2>퇴직 전 IRP 준비 체크리스트</H2>
      <p style={body}>
        퇴직 준비에서 IRP 계좌 개설 타이밍을 놓치는 경우가 꽤 있어요. 퇴직이 결정된 시점에 바로 개설을 시작하면 지급 지연이 없어요.
      </p>
      <p style={body}>
        IRP에 퇴직금이 들어온 뒤 어떻게 운용할지도 미리 생각해두는 게 좋아요.
        55세 이전에 일시 인출하면 퇴직소득세 전액을 내야 하지만, 55세 이후 연금으로 받으면 세금이 30% 줄어요.
      </p>

      <SectionBadge>체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <GreenBox>
        55세 이후 10년 이상 연금 방식으로 수령하면 퇴직소득세를 30% 절감할 수 있어요.
        지금 당장 쓸 계획이 없다면 연금 수령을 미리 고려해 두세요.
      </GreenBox>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        IRP 의무화에 관해 실제로 많이 나오는 질문들이에요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 근로자퇴직급여보장법을 바탕으로 작성됐어요. 제도 변경이 있을 수 있으니 최신 기준은 고용노동부(1350)에서 직접 확인하세요." />
    </ArticleLayout>
  );
}
