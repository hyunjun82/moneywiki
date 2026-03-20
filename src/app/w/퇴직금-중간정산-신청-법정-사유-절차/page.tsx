"use client";

// Q1. 회사를 그만두기 전인데 당장 목돈이 필요해서 퇴직금을 미리 받을 수 있는지 알아보는 상황이에요.
// Q2. 법정 사유에 해당하는지 판단하고, 해당하면 증빙서류를 갖춰서 회사에 신청하는 것.
// Q3. 법정 사유 7가지 목록, 사유별 증빙서류, 신청 절차 4단계, 근속 기간 리셋으로 인한 세금 증가.
// Q4. GreenBox(사유 목록), EligibilityChecker(해당 여부), Calculator(금액 계산), Steps(절차), DocTable(서류), Checklist(주의사항).
//
// MAP:
// - Q1 → 서론 톤: 돈이 급한 상황 공감, 하지만 조건이 있다는 긴장감
// - Q2 → H2 순서: 사유 확인 → 계산 → 서류 준비 → 신청 절차 → 체크리스트
// - Q3 → H2 개수/깊이: 사유(깊게) + 절차(깊게) + 주의사항(세금 리셋)
// - Q4 → 컴포넌트 배치: GreenBox, EligibilityChecker, Calculator, Steps, DocTable, Checklist

import { H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Calculator, EligibilityChecker, Steps, DocTable, Checklist,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd } from "@/components/article-ui";
import { FAQ } from "@/components/article-ui/FAQ";
import { References } from "@/components/article-ui/References";
import { Disclaimer } from "@/components/article-ui/Disclaimer";
import { 퇴직금_SIDEBAR, 퇴직금_HIGHLIGHT } from "@/data/퇴직금-guide";

// ─── 데이터 ──────────────────────────────────────────

const CHECK_ITEMS = [
  { id: "c1", label: "무주택자이고, 주택을 구입하거나 전세 계약을 체결했죠" },
  { id: "c2", label: "본인·배우자·부양가족의 의료비가 6개월치 월급을 넘었죠" },
  { id: "c3", label: "법원에서 파산 또는 개인회생 결정을 받았죠" },
  { id: "c4", label: "천재지변·재해로 재산 피해가 발생했죠" },
  { id: "c5", label: "임금피크제 적용으로 임금이 줄었죠" },
];

const CALC_SLIDERS = [
  { id: "salary", label: "월 평균임금", min: 200, max: 800, step: 10, defaultValue: 350, format: (v: number) => `${v}만원` },
  { id: "years", label: "중간정산 시점까지 근속 기간", min: 1, max: 30, step: 1, defaultValue: 5, format: (v: number) => `${v}년` },
];

const CALC_RESULTS = [
  {
    label: "중간정산 예상액",
    getValue: (v: Record<string, number>) => Math.round(v.salary * 10000 * v.years),
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원`,
    highlight: true,
  },
  {
    label: "퇴직소득세 추정 (근속공제 전)",
    getValue: (v: Record<string, number>) => {
      const base = v.salary * 10000 * v.years;
      const deduction = Math.min(v.years * 500000, 8000000);
      return Math.round(Math.max(0, base - deduction) * 0.06 * 1.1);
    },
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원 (IRP 이전 시 과세 이연)`,
  },
];

const DOCS = [
  { name: "중간정산 신청서", required: true, where: "회사 인사팀 또는 고용노동부 서식" },
  { name: "주택 매매계약서 또는 임대차계약서 (주택 구입·전세 사유)", required: false, where: "해당 계약서 원본" },
  { name: "의사 진단서 및 치료비 영수증 (의료비 사유)", required: false, where: "병원 발급" },
  { name: "파산 결정문 또는 개인회생 결정문 사본 (해당 시)", required: false, where: "법원 발행" },
  { name: "재해 증빙서류 (천재지변·재해 사유)", required: false, where: "관할 지자체·소방서 발급" },
  { name: "임금 조정 확인서 (임금피크제 사유)", required: false, where: "회사 인사팀" },
  { name: "IRP 계좌번호 (정산액 300만원 초과 시)", required: true, where: "은행·증권사 개설" },
];

const STEPS = [
  {
    title: "법정 사유 해당 여부 판단",
    desc: "중간정산은 근로자퇴직급여보장법 시행령 제3조에 열거된 사유가 있어야만 신청할 수 있죠. 주택 구입, 전세 계약, 의료비 과다, 파산·개인회생, 천재지변, 임금피크제가 주요 사유이고요. 사유에 해당하지 않으면 신청 자체가 불가하고, 회사가 해줬더라도 나중에 분쟁이 생길 수 있죠.",
    tip: "DC형 퇴직연금은 중간정산이 아닌 중도인출 제도를 이용해야 해요",
  },
  {
    title: "사유별 증빙서류 준비",
    desc: "사유를 입증하는 서류가 없으면 회사가 승인을 거부할 수 있죠. 주택 구입이라면 매매계약서, 의료비라면 진단서와 치료비 영수증, 파산이라면 법원 결정문이 필요하고요. 서류가 불완전하면 처음부터 다시 준비해야 해요.",
    tip: "증빙서류는 계약일·진단일과 신청 시점이 일치해야 해요",
  },
  {
    title: "회사에 신청서 제출",
    desc: "중간정산 신청서와 증빙서류를 인사팀에 제출해요. 회사는 사유가 법령에 맞으면 거부할 수 없어요. 승인 여부와 무관하게 제출 사실을 기록으로 남겨두세요. 정산액이 300만원을 넘으면 반드시 IRP 계좌로 받아야 해요.",
    tip: "내용증명 또는 수신 확인 형태로 제출 기록을 남기세요",
  },
  {
    title: "세금 원천징수 후 수령",
    desc: "승인되면 회사가 퇴직소득세를 원천징수하고 14일 이내에 지급해요. 중간정산 시점에 근속 기간이 리셋되기 때문에 나중에 최종 퇴직 시 퇴직소득세 공제가 줄어들 수 있죠. IRP로 받으면 과세 이연이 되니 세금 부담도 줄어요.",
    tip: "14일이 지나도 지급이 없으면 연 20% 지연이자를 청구할 수 있죠",
  },
];

const CHECKLIST = [
  "법정 사유: 시행령 제3조 7가지 중 해당 항목 점검",
  "증빙서류: 계약서·진단서·결정문 등 사유별 원본 준비",
  "신청서: 인사팀 양식 또는 고용노동부 표준 서식 수령",
  "IRP 계좌: 정산액 300만원 초과 시 사전 개설 필수",
  "근속 기간 리셋: 중간정산 후 퇴직소득세 공제 감소 인지",
  "14일 지급 기한: 지연 시 연 20% 지연이자 청구 가능",
];

const FAQS = [
  {
    q: "법정 사유가 있으면 회사가 반드시 승인해야 하나요?",
    a: "맞아요. 근로자퇴직급여보장법 시행령 제3조에 열거된 법정 사유에 해당하면 회사는 중간정산을 거부할 수 없어요. 단, 사유를 입증하는 서류를 함께 제출해야 해요. 서류 없이 신청하면 승인 거부가 가능해요.",
  },
  {
    q: "전세 보증금 인상분도 중간정산 사유가 되나요?",
    a: "가능해요. 주거 안정을 위해 무주택자가 전세 계약을 체결하거나 보증금을 올려야 하는 경우가 사유에 포함돼요. 임대차계약서와 증액 확인서를 증빙으로 준비하세요.",
  },
  {
    q: "중간정산 후 퇴직금 계산이 어떻게 달라지나요?",
    a: "중간정산 시점부터 근속 기간이 다시 시작돼요. 최종 퇴직 시 퇴직금은 중간정산 이후 기간만으로 계산하고요. 근속 기간이 짧아지면 퇴직소득세 공제(근속공제)가 줄어서 세금이 더 나올 수 있죠.",
  },
  {
    q: "300만원 이하면 IRP 없이 받을 수 있나요?",
    a: "맞아요. 2022년 4월 이후 기준으로 퇴직금이 300만원 이하인 경우 본인 계좌로 직접 수령이 가능해요. 300만원을 넘으면 반드시 IRP 계좌로 받아야 해요.",
  },
  {
    q: "사유 없이 중간정산을 받으면 어떻게 되나요?",
    a: "위법이에요. 사유 없이 중간정산을 한 경우, 해당 금액은 퇴직금 지급으로 인정되지 않을 수 있죠. 나중에 퇴직금 분쟁이 생기면 회사가 다시 지급해야 하는 상황이 될 수 있고요.",
  },
  {
    q: "임금피크제 적용으로 임금이 줄었는데 신청할 수 있나요?",
    a: "가능해요. 임금피크제 적용으로 임금이 줄어든 시점이 중간정산 사유가 돼요. 회사에서 임금 조정 확인서를 받아서 증빙으로 제출하면 돼요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "근로자퇴직급여보장법 시행령 제3조: 중간정산 허용 사유", url: "https://www.law.go.kr/법령/근로자퇴직급여보장법시행령" },
      { label: "근로자퇴직급여보장법 제8조: 퇴직금 중간정산 기준", url: "https://www.law.go.kr/법령/근로자퇴직급여보장법" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "고용노동부: 퇴직급여 중간정산 안내", url: "https://www.moel.go.kr" },
      { label: "고용노동부 민원마당: 중간정산 표준 서식", url: "https://minwon.moel.go.kr" },
    ],
  },
];

const RELATED = [
  { slug: "퇴직금-중간정산-조건", title: "퇴직금 중간정산 조건", description: "법정 사유 7가지와 해당 여부 체크." },
  { slug: "퇴직금-중간정산-사유별-증빙서류", title: "중간정산 사유별 증빙서류", description: "사유마다 준비해야 할 서류 목록." },
  { slug: "퇴직금-중간정산-세금", title: "중간정산 세금 계산", description: "근속 기간 리셋 후 퇴직소득세 변화." },
];

// ─── 페이지 ──────────────────────────────────────────

export default function Page() {
  return (
    <ArticleLayout
      sidebar={<Sidebar heading="퇴직금 가이드" items={퇴직금_SIDEBAR} highlightSlugs={퇴직금_HIGHLIGHT} currentSlug="퇴직금-중간정산-신청-법정-사유-절차" />}
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>퇴직금 · 중간정산 · 법정사유</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        퇴직금 중간정산, 아무때나 신청되지 않죠?<br />
        법정 사유 7가지와 신청 절차 완전 정리
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        퇴직금 중간정산은 <a href="/w/퇴직금-중간정산-조건" style={{ color: "#1D9E75", textDecoration: "underline" }}>법정 사유</a>가 있어야만 신청할 수 있죠.
        주택 구입, 전세 계약, 의료비 과다, 파산·개인회생, 천재지변, 임금피크제가 대표 사유이고요.
        사유가 있어도 증빙서류를 갖춰야 하고, 중간정산 후 근속 기간이 리셋돼서 <a href="/w/퇴직금-중간정산-세금" style={{ color: "#1D9E75", textDecoration: "underline" }}>퇴직소득세</a>가 늘어날 수 있으니 신청 전에 꼭 계산해봐야 해요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      <H2>어떤 사유가 법정 사유에 해당하나요?</H2>
      <p style={body}>
        퇴직금 중간정산은 <a href="/w/퇴직금-중간정산" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로자퇴직급여보장법</a> 시행령 제3조에서 허용 사유를 정해두고 있죠.
        이 사유에 해당하지 않으면 회사가 중간정산을 해줬더라도 나중에 법적 분쟁이 생길 수 있죠.
        사유별로 입증해야 하는 서류가 다르기 때문에 어떤 사유에 해당하는지 먼저 파악하는 게 중요해요.
      </p>
      <p style={body}>
        임금피크제 적용도 사유 중 하나이고요. 임금이 줄어든 시점에 중간정산을 신청할 수 있고, 회사에서 임금 조정 확인서를 받아서 증빙으로 내면 돼요.
        DC형 퇴직연금 가입자라면 중간정산이 아니라 중도인출 제도를 이용해야 해요.
      </p>

      <GreenBox>
        ① 무주택자가 주택을 구입할 때<br />
        ② 무주택자가 전세 계약을 체결할 때 (주거 목적)<br />
        ③ 본인·배우자·부양가족의 의료비가 6개월치 월급을 넘을 때<br />
        ④ 파산 또는 개인회생 결정을 받았을 때<br />
        ⑤ 천재지변·재해로 재산 피해가 생겼을 때<br />
        ⑥ 임금피크제 적용으로 임금이 줄었을 때<br />
        ⑦ 기타 고용노동부령으로 정하는 사유
      </GreenBox>

      <SectionBadge>내 상황 체크해봐요</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="중간정산 법정 사유에 해당해요. 아래 계산기로 예상 금액과 세금을 먼저 살펴보세요."
        partialMatchText="사유 해당 여부가 불분명하면 고용노동부(1350) 또는 노무사 상담을 권해요."
      />

      <Divider />

      <H2>중간정산 예상액과 세금, 미리 계산해봐요</H2>
      <p style={body}>
        중간정산 후에는 근속 기간이 리셋돼서 최종 퇴직 시 퇴직소득세 공제가 줄어요.
        지금 받는 금액과 나중에 늘어나는 세금을 비교해봐야 하죠.
        IRP 계좌로 받으면 과세 이연이 돼서 당장 세금을 내지 않아도 돼요.
      </p>

      <SectionBadge>중간정산 금액 계산기</SectionBadge>
      <Calculator
        sliders={CALC_SLIDERS}
        results={CALC_RESULTS}
        note="※ 월 평균임금 × 근속연수 추정치. 실제 금액은 인사팀 기준으로 다를 수 있고요. IRP 이전 시 퇴직소득세 과세 이연 가능."
      />

      <CategoryButton label="퇴직금 정보" count={퇴직금_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />

      <Divider />

      <H2>사유별로 준비해야 할 증빙서류</H2>
      <p style={body}>
        어떤 사유로 신청하느냐에 따라 준비해야 할 서류가 달라요.
        서류가 불완전하면 회사가 승인을 거부할 수 있고, 처음부터 다시 준비해야 할 수도 있죠.
        정산액이 300만원을 넘으면 IRP 계좌번호도 반드시 함께 제출해야 해요.
      </p>

      <SectionBadge>준비 서류 목록</SectionBadge>
      <DocTable docs={DOCS} />

      <BorderBox>
        <strong>증빙서류 제출 팁</strong><br />
        계약서나 진단서의 날짜가 신청 시점과 맞아야 해요. 이미 계약이 끝난 뒤에 신청하면 사유 인정이 거부될 수 있죠.
      </BorderBox>

      <Divider />

      <H2>신청 절차 4단계</H2>
      <p style={body}>
        사유 판단부터 수령까지 보통 2~4주 정도 걸려요.
        서류를 미리 준비해두면 더 빠르게 진행할 수 있고, 제출 기록을 남겨두는 게 나중을 위해서도 좋아요.
      </p>

      <Steps steps={STEPS} />

      <Divider />

      <H2>신청 전 꼭 챙겨야 할 체크리스트</H2>
      <p style={body}>
        근속 기간 리셋과 세금 증가 가능성이 핵심 주의사항이에요.
        지금 받는 금액이 나중에 늘어날 세금보다 크다면 신청이 유리하지만, 그렇지 않으면 손해가 날 수 있죠.
      </p>

      <SectionBadge>체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <GreenBox>
        근속 기간이 짧아지면 최종 퇴직 때 세금이 더 나와요.<br />
        IRP로 받으면 과세 이연이 되니, 수령 방법도 함께 고려해봐요.
      </GreenBox>

      <Divider />

      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        중간정산 법정 사유와 절차에 대해 실제로 많이 나오는 질문만 골랐어요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 근로자퇴직급여보장법 시행령 제3조를 바탕으로 작성됐어요. 제도 변경이 있을 수 있으니 최신 기준은 고용노동부(1350)에서 문의해봐요." />
    </ArticleLayout>
  );
}
