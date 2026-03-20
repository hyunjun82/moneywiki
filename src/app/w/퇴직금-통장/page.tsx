"use client";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Calculator, EligibilityChecker, Steps, DocTable, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 퇴직금_SIDEBAR, 퇴직금_HIGHLIGHT } from "@/data/퇴직금-guide";

// ─── 데이터 ──────────────────────────────────────────

const CHECK_ITEMS = [
  { id: "c1", label: "퇴직금이 300만원을 초과할 것 같아요" },
  { id: "c2", label: "만 55세 미만이에요" },
  { id: "c3", label: "DC형·IRP형 퇴직연금이 아닌 DB형이나 퇴직금 제도 사업장에서 일해요" },
  { id: "c4", label: "IRP 계좌가 아직 없어요" },
];

const CALC_SLIDERS = [
  { id: "severance", label: "퇴직금 예상액", min: 100, max: 10000, step: 100, defaultValue: 3000, format: (v: number) => `${v.toLocaleString()}만원` },
  { id: "taxRate", label: "적용 세율 (근속연수 공제 후)", min: 1, max: 30, step: 1, defaultValue: 8, format: (v: number) => `${v}%` },
];

const CALC_RESULTS = [
  {
    label: "일시금 수령 시 퇴직소득세",
    getValue: (v: Record<string, number>) => Math.round(v.severance * 10000 * (v.taxRate / 100)),
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원`,
    highlight: true,
  },
  {
    label: "IRP 연금 수령 시 절감 세금 (30% 감면 기준)",
    getValue: (v: Record<string, number>) => Math.round(v.severance * 10000 * (v.taxRate / 100) * 0.3),
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원 절감`,
  },
];

const DOCS = [
  { name: "신분증 (주민등록증 또는 운전면허증)", required: true, where: "본인 지참" },
  { name: "공동인증서 또는 간편인증 (앱 개설 시)", required: true, where: "금융인증서 또는 카카오·네이버 인증" },
  { name: "기존 은행 계좌 (이체용)", required: true, where: "본인 명의 통장" },
  { name: "재직증명서 (일부 금융사 요구)", required: false, where: "회사 인사팀 발급" },
];

const STEPS = [
  {
    title: "IRP 계좌 개설",
    desc: "은행·증권사·보험사 어디서든 IRP를 개설할 수 있어요. 앱에서 신분증 촬영과 간편인증만으로 10분 이내 완료돼요. 수수료가 0%인 증권사 IRP를 먼저 비교해보세요.",
    tip: "퇴직금 수령만 목적이면 수수료 0% 상품이 유리해요",
  },
  {
    title: "IRP 계좌번호 인사팀에 전달",
    desc: "개설 후 은행명·계좌번호·예금주명을 문자나 이메일로 인사팀에 알려줘요. 이 정보가 있어야 회사가 퇴직금을 이체할 수 있어요. 퇴직 확정 전에 미리 전달해두는 게 좋아요.",
    tip: "문자나 이메일로 전달해서 기록을 남겨두세요",
  },
  {
    title: "퇴직 후 14일 이내 입금 확인",
    desc: "퇴직 후 14일 이내에 IRP 계좌에 입금됐는지 확인해요. 14일이 지났는데 입금이 없으면 인사팀에 서면으로 지급 요청을 하세요. 그래도 안 되면 고용노동부에 임금체불 진정을 낼 수 있어요.",
    tip: "14일 초과 지연분에는 연 20% 지연이자가 붙어요",
    link: { label: "고용노동부 민원신청", href: "https://minwon.moel.go.kr" },
  },
  {
    title: "수령 방식 선택 (일시금 vs 연금)",
    desc: "IRP에 들어온 퇴직금은 원리금보장형(예금)이나 실적배당형(ETF) 중 선택해 운용해요. 만 55세 이후 연금으로 받으면 퇴직소득세가 30~40% 줄어요. 당장 목돈이 필요하다면 일시금 인출도 가능해요.",
    tip: "연금으로 10년 이상 수령하면 세금이 40%까지 줄어요",
  },
];

const CHECKLIST = [
  "IRP 계좌 개설: 퇴직 전 미리 개설 (은행·증권사·보험사 중 수수료 비교)",
  "예외 대상 확인: 300만원 이하, 55세 이상은 일반 통장도 가능",
  "계좌번호 인사팀 통보: 문자·이메일로 기록 남기기",
  "입금 확인: 퇴직 후 14일 이내 IRP 계좌 입금 확인",
  "수령 방식 결정: 일시금 인출 vs 연금 수령 세금 비교 후 선택",
];

const FAQS = [
  {
    q: "월급 받던 일반 통장으로 퇴직금을 받아도 되나요?",
    a: "원칙적으로 안 돼요. 퇴직금 300만원 초과 시 IRP 계좌로 받는 게 의무예요. 다만 55세 이상 퇴직, 300만원 이하, 외국인 출국, 사망·장해 등 법정 예외에 해당하면 일반 통장으로 받을 수 있어요.",
  },
  {
    q: "IRP에 입금된 퇴직금을 바로 꺼낼 수 있나요?",
    a: "가능해요. IRP 입금 후 일시금 인출 신청을 하면 퇴직소득세를 원천징수한 뒤 지급돼요. 다만 연금 수령 시 받을 수 있는 30~40% 세금 감면 혜택은 사라지니 주의하세요.",
  },
  {
    q: "IRP 계좌가 여러 개여도 되나요?",
    a: "여러 금융기관에 IRP를 개설할 수 있어요. 퇴직금은 그중 하나의 IRP로만 받을 수 있어요. 수수료와 운용 상품을 비교해서 가장 유리한 계좌를 선택한 뒤 회사에 알려주세요.",
  },
  {
    q: "통장 종류에 따라 세금이 달라지나요?",
    a: "달라져요. IRP로 받으면 퇴직소득세 납부가 이연되고, 연금으로 수령 시 세금이 30~40% 줄어요. 일반 통장으로 받으면 수령 즉시 퇴직소득세가 부과돼요. 퇴직금이 클수록 차이가 커요.",
  },
  {
    q: "IRP 계좌를 만들었는데 퇴직금이 안 들어왔어요",
    a: "퇴직 후 14일 이내에 이체해야 해요. 14일이 지났다면 인사팀에 문의하고, 그래도 안 되면 고용노동부 임금체불 진정을 낼 수 있어요. 지연 기간만큼 연 20% 지연이자를 청구할 수 있어요.",
  },
  {
    q: "퇴직금 300만원 기준은 세전 금액인가요?",
    a: "세전 금액 기준이에요. 퇴직금 총액이 300만원을 초과하면 IRP 계좌로 받아야 해요. 세금을 떼고 나서 300만원이 남느냐 여부가 아니에요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "근로자퇴직급여 보장법: IRP 이체 의무 규정", url: "https://www.law.go.kr/법령/근로자퇴직급여보장법" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "금융감독원: IRP 계좌 비교 안내", url: "https://www.fss.or.kr" },
      { label: "고용노동부: 퇴직급여 제도 안내", url: "https://www.moel.go.kr" },
    ],
  },
];

const RELATED = [
  { slug: "퇴직금-통장-만들기", title: "퇴직금 IRP 계좌 개설 방법", description: "은행·증권사별 IRP 수수료 비교와 개설 절차예요." },
  { slug: "퇴직금-세금", title: "퇴직금 세금 계산 방법", description: "퇴직소득세 계산 공식과 절세 방법이에요." },
  { slug: "퇴직금-지급-기한", title: "퇴직금 지급 기한 14일 원칙", description: "14일 초과 시 지연이자 청구 방법이에요." },
];

// ─── 페이지 ──────────────────────────────────────────

export default function Page() {
  return (
    <ArticleLayout
      sidebar={<Sidebar heading="퇴직금 가이드" items={퇴직금_SIDEBAR} highlightSlugs={퇴직금_HIGHLIGHT} currentSlug="퇴직금-통장" />}
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>퇴직금 · IRP · 계좌 개설</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        퇴직금 통장, 어떤 계좌로 받아야 하나요?<br />
        IRP 의무와 300만원 기준, 계좌 개설 방법
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        퇴직금을 월급 통장으로 받으면 안 되나요? 원칙적으로 안 돼요.
        2022년부터 퇴직금 300만원 초과 시 <a href="/w/퇴직금-통장-만들기" style={{ color: "#1D9E75", textDecoration: "underline" }}>IRP(개인형 퇴직연금) 계좌</a>로 받는 게 의무예요.
        IRP로 받으면 세금이 이연되고, 연금으로 수령하면 퇴직소득세가 30~40% 줄어드는 혜택까지 받을 수 있어요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>퇴직금 IRP 의무 — 내가 해당되나요?</H2>
      <p style={body}>
        2022년 4월부터 퇴직금 300만원 초과 시 IRP 계좌 수령이 의무예요.
        <a href="https://www.law.go.kr/법령/근로자퇴직급여보장법" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로자퇴직급여 보장법 제9조</a>에서 정한 규정이에요.
        회사가 IRP 외 일반 통장으로 이체하면 법 위반이 돼요.
      </p>
      <p style={body}>
        예외는 딱 네 가지예요. 만 55세 이상 퇴직자, 퇴직금 300만원 이하, 외국인 근로자 출국, 사망·장해 등 법정 사유예요.
        이 중 하나에 해당하면 일반 예금 통장으로도 받을 수 있어요.
        나머지는 IRP 계좌를 미리 개설해두지 않으면 수령이 지연될 수 있어요.
      </p>

      <GreenBox>
        원칙: IRP(개인형 퇴직연금) 계좌 — 퇴직금 300만원 초과 시 의무<br />
        예외: 일반 예금 통장 — 55세 이상·300만원 이하·외국인 출국·법정 사유<br />
        IRP 장점: 퇴직소득세 이연, 연금 수령 시 30~40% 세금 감면
      </GreenBox>

      <SectionBadge>내 상황 체크해보세요</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="IRP 계좌를 미리 개설해두세요. 퇴직 전에 준비해야 수령이 지연되지 않아요."
        partialMatchText="IRP 의무 예외 여부를 먼저 확인하세요. 예외에 해당하면 일반 통장도 가능해요."
      />

      <Divider />

      <H2>IRP vs 일반 통장 — 세금 차이 계산</H2>
      <p style={body}>
        같은 퇴직금이라도 어떤 통장으로 받느냐에 따라 세금이 달라져요.
        일반 통장으로 받으면 수령 즉시 퇴직소득세가 부과되고, IRP로 받으면 세금 납부가 이연돼요.
        연금으로 수령하면 퇴직소득세가 30~40% 줄어드는 혜택이 추가돼요.
      </p>
      <p style={body}>
        퇴직소득세는 근속연수 공제 후 적용 세율이 달라지기 때문에, 퇴직금이 같아도 세금 차이는 수십만 원에서 수백만 원까지 날 수 있어요.
        아래 계산기로 내 상황에 맞는 세금을 먼저 확인해보세요.
      </p>

      <SectionBadge>세금 차이 계산기</SectionBadge>
      <Calculator
        sliders={CALC_SLIDERS}
        results={CALC_RESULTS}
        note="※ 퇴직소득세는 근속연수 공제 후 세율 기준. 실제 세금은 홈택스 퇴직소득세 계산기로 확인하세요."
      />

      <CategoryButton label="퇴직금 정보" count={퇴직금_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />

      <Divider />

      <H2>IRP 계좌 개설에 필요한 서류</H2>
      <p style={body}>
        신분증 하나로 대부분 가능해요. 앱으로 개설하면 신분증 촬영과 간편인증만으로 10분 이내 완료돼요.
        재직증명서는 일부 금융사에서만 요구하니, 해당 금융사 앱에서 미리 확인해두세요.
      </p>
      <p style={body}>
        은행은 앱·영업점 모두 가능하고, 증권사는 앱 개설이 빠르고 수수료도 낮은 편이에요.
        퇴직금 수령이 목적이라면 수수료 0% 상품이 있는 증권사 IRP를 먼저 비교해보세요.
      </p>

      <SectionBadge>준비 서류 목록</SectionBadge>
      <DocTable docs={DOCS} />

      <Divider />

      <H2>퇴직금 통장 준비부터 수령까지 4단계</H2>
      <p style={body}>
        IRP 개설 → 계좌번호 인사팀 통보 → 입금 확인 → 수령 방식 결정 순서예요.
        퇴직 전에 미리 IRP를 개설해두면 14일 이내 수령이 훨씬 수월해져요.
      </p>

      <Steps steps={STEPS} />

      <Divider />

      <H2>퇴직금 통장 준비 체크리스트</H2>
      <p style={body}>
        IRP 계좌를 미리 준비해두지 않아서 수령이 늦어지는 경우가 많아요.
        퇴직이 확정됐다면 아래 체크리스트를 하나씩 확인해보세요.
      </p>

      <SectionBadge>체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <GreenBox>
        IRP로 받으면 퇴직소득세 납부가 미뤄지고, 연금으로 수령하면 세금이 30~40% 줄어요.<br />
        당장 목돈이 필요하지 않다면 IRP를 유지하면서 55세 이후 연금으로 받는 게 절세에 유리해요.
      </GreenBox>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        퇴직금 통장에 대해 실제로 많이 나오는 질문만 골랐어요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 근로자퇴직급여 보장법을 바탕으로 작성됐어요. 금융 상품 조건은 변동될 수 있으니, 가입 금융기관에서 확인하세요." />
    </ArticleLayout>
  );
}
