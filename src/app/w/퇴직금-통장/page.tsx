"use client";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Calculator, EligibilityChecker, Steps, DocTable, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 퇴직금_SIDEBAR } from "@/data/퇴직금-guide";

const CHECK_ITEMS = [
  { id: "c1", label: "퇴직 예정이고 퇴직금이 300만원을 초과할 것 같아요" },
  { id: "c2", label: "IRP 계좌가 아직 없어요" },
  { id: "c3", label: "퇴직금을 세금 혜택을 받으면서 수령하고 싶어요" },
  { id: "c4", label: "퇴직 전에 미리 계좌 준비를 해두고 싶어요" },
];

const CALC_SLIDERS = [
  { id: "severance", label: "퇴직금 예상액", min: 100, max: 10000, step: 100, defaultValue: 2000, format: (v: number) => `${v.toLocaleString()}만원` },
  { id: "years", label: "연금 수령 기간", min: 10, max: 30, step: 1, defaultValue: 20, format: (v: number) => `${v}년` },
];

const CALC_RESULTS = [
  {
    label: "연금 수령 시 연간 수령액",
    getValue: (v: Record<string, number>) => Math.round(v.severance * 10000 / v.years),
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원/년`,
    highlight: true,
  },
  {
    label: "월 수령액 기준",
    getValue: (v: Record<string, number>) => Math.round(v.severance * 10000 / v.years / 12),
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원/월`,
  },
];

const DOCS = [
  { name: "신분증", required: true, where: "본인 지참" },
  { name: "공동인증서 또는 간편인증", required: true, where: "앱 또는 금융인증서" },
  { name: "기존 금융계좌 (이체용)", required: true, where: "본인 은행 계좌" },
  { name: "재직증명서 (일부 금융사 요구)", required: false, where: "회사 인사팀 발급" },
];

const STEPS = [
  {
    title: "IRP 계좌 개설",
    desc: "은행·증권사·보험사에서 IRP 계좌를 만들 수 있어요. 앱으로 신분증 촬영과 간편인증만으로 10분 이내 개설이 가능해요. 수수료가 낮은 증권사를 먼저 비교해보세요.",
    tip: "수수료 0% 상품도 있으니 퇴직금 수령만 목적이면 활용해보세요",
  },
  {
    title: "계좌번호 인사팀에 통보",
    desc: "개설 후 계좌번호(은행명·계좌번호·예금주명)를 인사팀에 문자나 메일로 알려줘요. 이 정보가 있어야 회사가 퇴직금을 이체할 수 있어요. 퇴직 전에 미리 전달해두는 게 좋아요.",
    tip: "문자나 메일로 전달해서 기록을 남겨두세요",
  },
  {
    title: "퇴직금 입금 확인",
    desc: "퇴직 후 14일 이내에 IRP 계좌에 입금됐는지 확인하세요. 14일이 지났는데 입금이 없으면 인사팀에 서면으로 지급 요청을 하고, 그래도 안 되면 고용노동부에 임금체불 진정을 내면 돼요.",
    tip: "14일 초과 시 연 20% 지연이자가 발생해요",
  },
  {
    title: "운용 방식 및 수령 선택",
    desc: "IRP에 들어온 퇴직금은 원리금보장형(예금)이나 실적배당형(ETF) 중 선택해서 운용할 수 있어요. 만 55세 이후부터 연금으로 수령하면 퇴직소득세가 30~40% 줄어요. 당장 필요하면 일시금 인출도 가능해요.",
    tip: "연금 수령 시 세금이 줄어들어 장기적으로 유리해요",
  },
];

const CHECKLIST = [
  "IRP 계좌 개설: 퇴직 전 미리 개설 (은행·증권사·보험사)",
  "수수료 비교: 금융기관별 IRP 수수료 차이 확인",
  "계좌번호 인사팀 통보: 문자나 메일로 기록 남기기",
  "예외 대상 확인: 55세 이상, 300만원 이하 등 IRP 면제 여부",
  "수령 방식 결정: 일시금 인출 vs 연금 수령 세금 비교",
];

const FAQS = [
  {
    q: "일반 예금 통장으로 퇴직금을 받을 수 있나요?",
    a: "원칙적으로 IRP 계좌로 받아야 해요. 다만 55세 이상 퇴직자, 퇴직금 300만원 이하, 기타 법정 예외에 해당하면 일반 통장으로 받을 수 있어요.",
  },
  {
    q: "IRP에 넣으면 바로 꺼낼 수 없나요?",
    a: "꺼낼 수 있어요. IRP에 입금된 후 일시금 인출을 신청하면 돼요. 다만 퇴직소득세가 원천징수되고, 연금으로 수령할 때의 세금 감면 혜택은 사라져요.",
  },
  {
    q: "IRP 계좌가 여러 개여도 되나요?",
    a: "여러 금융기관에 IRP를 개설할 수 있어요. 퇴직금은 한 곳의 IRP로만 받게 되니, 가장 유리한 계좌를 선택해서 회사에 알려주세요.",
  },
  {
    q: "통장 선택에 따라 세금이 달라지나요?",
    a: "IRP로 받으면 세금 이연·감면 혜택이 있고, 일반 통장으로 받으면 바로 퇴직소득세가 부과돼요. 퇴직금이 클수록 IRP 활용 여부에 따라 수십~수백만원의 절세가 가능해요.",
  },
  {
    q: "IRP 계좌를 만들었는데 퇴직금이 안 들어왔어요",
    a: "퇴직 후 14일 이내에 이체해야 해요. 14일이 지났는데 입금이 안 됐으면 인사팀에 문의하고, 그래도 안 되면 고용노동부에 임금체불 진정을 낼 수 있어요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "근로자퇴직급여 보장법: IRP 이체 의무", url: "https://www.law.go.kr/법령/근로자퇴직급여보장법" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "금융감독원: IRP 계좌 비교", url: "https://www.fss.or.kr" },
      { label: "고용노동부: 퇴직급여 안내", url: "https://www.moel.go.kr" },
    ],
  },
];

const RELATED = [
  { slug: "퇴직금-통장-만들기", title: "퇴직금 IRP 계좌 만들기", description: "IRP 계좌 개설 방법과 수수료 비교를 안내해요." },
  { slug: "퇴직금-지급-절차", title: "퇴직금 지급 절차", description: "퇴직일부터 IRP 입금까지 단계별로 정리했어요." },
  { slug: "퇴직금-지급-기한", title: "퇴직금 지급 기한 14일 원칙", description: "14일 초과 시 지연이자 청구 방법이에요." },
];

export default function Page() {
  return (
    <ArticleLayout
      sidebar={<Sidebar heading="퇴직금 가이드" items={퇴직금_SIDEBAR} currentSlug="퇴직금-통장" />}
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>퇴직금 · 통장 · IRP</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        퇴직금 통장, 어떤 계좌로 받아야 하나요?<br />
        IRP vs 일반 통장 차이와 세금 혜택
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        퇴직금을 월급 통장으로 받으면 안 되나요? 원칙적으로 안 돼요.
        2022년부터 퇴직금 300만원 초과 시 <a href="/w/퇴직금-통장-만들기" style={{ color: "#1D9E75", textDecoration: "underline" }}>IRP(개인형 퇴직연금) 계좌</a>로 받는 게 의무예요.
        IRP로 받으면 연금 수령 시 퇴직소득세가 30~40% 줄어드는 혜택도 있어요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>내 퇴직금은 어떤 통장으로 받아야 하나요?</H2>
      <p style={body}>
        크게 두 가지예요. IRP 계좌와 일반 예금 통장이에요. 원칙은 IRP이고, 일반 통장은 예외적으로만 가능해요.
        <a href="https://www.law.go.kr/법령/근로자퇴직급여보장법" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로자퇴직급여 보장법</a>에서 IRP 이체를 의무로 정하고 있어요.
      </p>
      <p style={body}>
        IRP는 은행, 증권사, 보험사에서 개설할 수 있어요.
        어디서 만들든 퇴직금 수령 기능은 동일하고, 차이가 나는 건 수수료와 운용 가능 상품이에요.
        IRP로 받으면 세금이 이연되고, 연금으로 수령하면 세금이 30~40% 줄어들어요.
      </p>

      <GreenBox title="퇴직금 수령 가능 통장">
        원칙: IRP(개인형 퇴직연금) 계좌<br />
        예외: 일반 예금 통장 (55세 이상, 300만원 이하 등)<br />
        IRP 장점: 세금 이연·감면, 운용 가능, 연금 수령 시 30~40% 세금 절감
      </GreenBox>

      <SectionBadge>내 상황 체크해보세요</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="IRP 계좌를 미리 개설해두세요. 퇴직 전에 준비하면 수령이 지연되지 않아요."
        partialMatchText="IRP 의무 여부를 먼저 확인하세요. 예외에 해당하면 일반 통장도 가능해요."
      />

      <Divider />

      <H2>IRP로 받으면 연금이 얼마나 될까요?</H2>
      <p style={body}>
        IRP에 들어온 퇴직금을 연금으로 수령하면 만 55세 이후 일정 기간 나눠 받을 수 있어요.
        퇴직금 규모와 수령 기간에 따라 월 수령액이 달라져요.
        연금으로 받으면 퇴직소득세가 30~40% 줄어드는 혜택이 있어요.
      </p>

      <SectionBadge>연금 수령 계산기</SectionBadge>
      <Calculator
        sliders={CALC_SLIDERS}
        results={CALC_RESULTS}
        note="※ 운용 수익 제외 단순 계산. 실제 수령액은 운용 성과에 따라 달라질 수 있어요."
      />

      <CategoryButton label="퇴직금 정보" count={퇴직금_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      <H2>IRP 계좌 개설에 필요한 서류</H2>
      <p style={body}>
        신분증 하나로 대부분 가능해요. 앱으로 개설하면 신분증 촬영과 간편인증만 있으면 돼요.
        재직증명서는 일부 금융사에서만 요구하니, 미리 해당 앱에서 확인해두세요.
      </p>

      <SectionBadge>준비 서류 목록</SectionBadge>
      <DocTable docs={DOCS} />

      <Divider />

      <H2>퇴직금 통장 준비부터 수령까지 4단계</H2>
      <p style={body}>
        IRP 개설 → 계좌번호 통보 → 입금 확인 → 운용·수령 방식 선택 순서예요.
        퇴직 전에 미리 준비해두면 14일 이내 수령이 훨씬 수월해져요.
      </p>

      <Steps steps={STEPS} />

      <Divider />

      <H2>퇴직금 통장 준비 체크리스트</H2>
      <p style={body}>
        IRP 계좌 미개설로 수령이 늦어지는 경우가 많아요.
        퇴직이 확정됐다면 이 체크리스트를 하나씩 확인해보세요.
      </p>

      <SectionBadge>체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <GreenBox title="IRP 수령이 일반 통장보다 세금에서 유리해요">
        IRP로 받으면 퇴직소득세가 이연되고, 연금으로 수령하면 30~40%가 줄어요.<br />
        당장 목돈이 필요하지 않다면 IRP를 유지하면서 연금으로 받는 게 절세에 유리해요.
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
