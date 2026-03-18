"use client";

import {
  H2, SectionBadge, GreenBox, BorderBox, Divider, body,
  Calculator, EligibilityChecker, Steps, DocTable, Checklist, FAQ, References, Disclaimer,
  ArticleLayout, Sidebar, CategoryButton, RelatedArticles, ArticleAd,
} from "@/components/article-ui";
import { 퇴직금_SIDEBAR } from "@/data/퇴직금-guide";

// ─── 데이터 ──────────────────────────────────────────

const CHECK_ITEMS = [
  { id: "c1", label: "퇴직일이 확정됐어요" },
  { id: "c2", label: "회사로부터 퇴직금 정산서를 아직 못 받았어요" },
  { id: "c3", label: "급여명세서 최근 3개월치를 준비할 수 있어요" },
  { id: "c4", label: "퇴직금이 300만원을 넘을 것 같아 IRP 계좌가 필요해요" },
];

const CALC_SLIDERS = [
  { id: "salary", label: "월 평균급여", min: 200, max: 800, step: 10, defaultValue: 300, format: (v: number) => `${v}만원` },
  { id: "years", label: "근속 기간", min: 1, max: 30, step: 1, defaultValue: 5, format: (v: number) => `${v}년` },
];

const CALC_RESULTS = [
  {
    label: "예상 퇴직금 (세전)",
    getValue: (v: Record<string, number>) => v.salary * 10000 * v.years,
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원`,
    highlight: true,
  },
  {
    label: "세후 예상 수령액 (퇴직소득세 약 3~5% 차감 기준)",
    getValue: (v: Record<string, number>) => Math.round(v.salary * 10000 * v.years * 0.96),
    format: (v: number) => `약 ${Math.round(v / 10000).toLocaleString()}만원`,
  },
];

const DOCS = [
  { name: "퇴직금 정산서 (평균임금 계산 내역 포함)", required: true, where: "회사 인사팀 요청 발급" },
  { name: "퇴직소득 원천징수영수증", required: true, where: "회사 인사팀 발급" },
  { name: "급여명세서 (최근 3개월)", required: true, where: "인사팀 또는 급여 앱 출력" },
  { name: "IRP 계좌번호 (퇴직금 300만원 초과 시)", required: true, where: "은행·증권사에서 개설" },
];

const STEPS = [
  {
    title: "정산서 발급 요청",
    desc: "퇴직일이 확정되면 인사팀에 퇴직금 정산서와 퇴직소득 원천징수영수증 발급을 서면으로 요청해요. 퇴직 2주 전에 요청하면 14일 지급 기한 안에 여유 있게 처리돼요.",
    tip: "정산서 발급은 법적 의무가 아니지만 요청하면 대부분 발급해줘요. 이메일로 요청하면 증거가 남아요",
  },
  {
    title: "정산서 숫자 직접 검증",
    desc: "1일 평균임금 = 3개월 총임금 ÷ 총 일수, 퇴직금 = 1일 평균임금 × 30 × 근속연수예요. 상여금 월 환산액(연간 상여금 ÷ 12)이 3개월 임금 합산에 포함됐는지가 핵심이에요.",
    tip: "상여금 환산 누락이 가장 흔한 실수예요. 포함 안 됐으면 재계산 요청할 수 있어요",
  },
  {
    title: "IRP 계좌번호 인사팀 전달",
    desc: "퇴직금이 300만원을 넘으면 IRP 계좌로만 수령할 수 있어요. 은행이나 증권사에서 IRP 계좌를 개설하고 계좌번호를 이메일·문자로 인사팀에 알려줘야 해요.",
    tip: "IRP 계좌는 하나만 있으면 돼요. 없다면 퇴직 전에 미리 개설해두세요",
    link: { label: "IRP 계좌 개설 방법 보기", href: "/w/퇴직금-IRP-계좌" },
  },
  {
    title: "입금 확인 및 이의 제기",
    desc: "IRP 계좌 또는 일반 계좌에 입금됐는지 확인해요. 금액이 다르면 즉시 인사팀에 재계산을 요청해요. 퇴직일로부터 14일이 지나도 지급되지 않으면 연 20% 지연이자를 청구할 수 있어요.",
    tip: "입금 후 퇴직소득 원천징수영수증과 금액이 일치하는지 꼭 맞춰보세요",
    link: { label: "퇴직금 지연이자 청구 방법", href: "/w/퇴직금-지연이자" },
  },
];

const CHECKLIST = [
  "정산서 발급 요청: 인사팀에 이메일 또는 서면으로",
  "상여금 월 환산 포함 여부: 연간 상여금 ÷ 12",
  "1일 평균임금 직접 계산: 3개월 총임금 ÷ 총 일수",
  "퇴직금 공식 적용: 1일 평균임금 × 30 × 근속연수",
  "IRP 계좌번호 인사팀에 이메일·문자 발송",
  "퇴직일로부터 14일 이내 입금 여부 확인",
];

const FAQS = [
  {
    q: "퇴직금 정산서는 꼭 받아야 하나요?",
    a: "법적 의무는 없지만 받는 게 훨씬 유리해요. 계산 내역을 직접 검증할 수 있고, 오류가 있을 때 증거가 돼요. 인사팀에 요청하면 대부분 발급해줘요.",
  },
  {
    q: "퇴직금이 예상보다 적게 왔어요",
    a: "급여명세서로 직접 계산해보세요. 상여금 월 환산 누락, 근속기간 계산 오류가 가장 흔한 원인이에요. 차이가 10만원 이상이면 인사팀에 재계산을 요청하고, 거부하면 고용노동부(1350)에 진정을 낼 수 있어요.",
  },
  {
    q: "퇴직금을 IRP가 아닌 일반 계좌로 받을 수 있나요?",
    a: "퇴직금이 300만원 이하면 일반 계좌로 받을 수 있어요. 300만원 초과면 의무적으로 IRP 계좌로만 수령해야 해요. 근로자퇴직급여보장법 제9조에 따른 규정이에요.",
  },
  {
    q: "14일이 지나도 퇴직금이 안 들어오면 어떻게 하나요?",
    a: "연 20% 지연이자가 자동으로 발생해요. 고용노동부 민원마당에서 온라인으로 진정을 낼 수 있어요. 진정 접수 후 평균 2~4주 내에 처리돼요.",
  },
  {
    q: "퇴직금 정산 후 세금은 어디서 처리되나요?",
    a: "회사가 퇴직금 지급 시 퇴직소득세를 원천징수하고 처리해요. 근로자 본인이 별도로 납부할 필요는 없어요. 퇴직소득 원천징수영수증을 발급해주니 금액을 확인해두세요.",
  },
  {
    q: "IRP로 받으면 세금이 줄어드나요?",
    a: "IRP로 받으면 수령 시점까지 퇴직소득세 납부가 미뤄지는 과세 이연 효과가 있어요. 나중에 연금으로 인출하면 연금소득세(3~5%)가 적용돼서 일시금 세율보다 유리해요.",
  },
];

const REFERENCES = [
  {
    category: "법령",
    items: [
      { label: "근로자퇴직급여보장법 제9조: 퇴직금 지급 기한 14일", url: "https://www.law.go.kr/법령/근로자퇴직급여보장법" },
      { label: "근로기준법 제37조: 퇴직금 지연이자 연 20%", url: "https://www.law.go.kr/법령/근로기준법" },
    ],
  },
  {
    category: "공식 자료",
    items: [
      { label: "고용노동부 민원마당: 퇴직금 진정 신청", url: "https://minwon.moel.go.kr" },
      { label: "고용노동부: 퇴직급여제도 안내", url: "https://www.moel.go.kr" },
    ],
  },
];

const RELATED = [
  { slug: "퇴직금-정산서", title: "퇴직금 정산서 항목별 확인 방법", description: "정산서 각 항목이 뭔지, 오류는 어떻게 잡는지 설명해요." },
  { slug: "퇴직금-계산법", title: "퇴직금 계산법과 공식", description: "평균임금 공식과 상여금 포함 여부까지 정리했어요." },
  { slug: "퇴직금-IRP-계좌", title: "IRP 계좌 개설 방법", description: "어느 은행이 유리한지, 개설 절차를 정리했어요." },
];

// ─── 페이지 ──────────────────────────────────────────

export default function Page() {
  return (
    <ArticleLayout
      sidebar={<Sidebar heading="퇴직금 가이드" items={퇴직금_SIDEBAR} currentSlug="퇴직금-정산" />}
    >
      <p style={{ fontSize: 13, color: "#1D9E75", fontWeight: 600, marginBottom: 10 }}>퇴직금 · 정산 · 절차</p>

      <h1 style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.45, marginBottom: 14 }}>
        퇴직금 정산, 어떻게 받아야 하죠?<br />
        정산서 검증부터 IRP 수령까지 4단계
      </h1>

      <p style={{ ...body, fontSize: 15, lineHeight: 2.1 }}>
        퇴직일이 확정되는 순간부터 회사는 14일 카운트다운에 들어가요.
        그냥 기다리다가 정산서 숫자만 믿으면 상여금 환산 누락이나 근속기간 오류로 수십만~수백만원을 덜 받는 경우가 꽤 있어요.
        <a href="https://www.law.go.kr/법령/근로자퇴직급여보장법" style={{ color: "#1D9E75", textDecoration: "underline" }}>근로자퇴직급여보장법</a> 기준으로 정산 요청부터 IRP 수령까지 4단계를 정리했어요.
      </p>

      <Divider />
      <ArticleAd position="intro" />

      {/* H2-1: 핵심 개념/자격 */}
      <H2>지금 퇴직금 정산이 필요한 상황인가요?</H2>
      <p style={body}>
        퇴직이 확정되면 회사는 퇴직일로부터 14일 이내에 퇴직금을 지급해야 해요.
        이 기한을 넘기면 연 20% 지연이자가 붙고, 고용노동부에 진정도 낼 수 있어요.
        기한 내에 받으려면 퇴직 2주 전부터 정산을 준비하는 게 좋아요.
      </p>
      <p style={body}>
        정산서를 받으면 그냥 믿지 말고 직접 계산해봐야 해요.
        상여금 월 환산이 빠진 경우가 실제로 많아요.
        연간 상여금 ÷ 12가 3개월 임금 합산에 포함됐는지 꼭 짚어봐요.
      </p>

      <GreenBox title="정산 전 핵심 체크 2가지">
        상여금 월 환산: 연간 상여금 ÷ 12 × 3개월분이 포함됐는지 확인<br />
        IRP 계좌: 퇴직금 300만원 초과 시 퇴직 전 미리 개설해서 인사팀에 번호 전달
      </GreenBox>

      <SectionBadge>내 상황 체크해보세요</SectionBadge>
      <EligibilityChecker
        items={CHECK_ITEMS}
        allMatchText="퇴직금 정산이 필요한 상황이에요. 아래 계산기로 예상 금액을 먼저 확인하고 정산 절차를 진행하세요."
        partialMatchText="상황이 다를 수 있어요. 고용노동부(1350) 상담을 받아보세요."
      />

      <Divider />

      {/* H2-2: 금액/계산 */}
      <H2>퇴직금 예상액 미리 계산해보세요</H2>
      <p style={body}>
        정산서를 받기 전에 내 예상 금액을 미리 계산해두면 정산서와 비교하기 쉬워요.
        퇴직금 공식은 1일 평균임금 × 30 × 근속연수예요.
        상여금이나 연차수당이 있으면 실제 금액이 계산기 결과보다 더 높을 수 있어요.
      </p>
      <p style={body}>
        차이가 10만원 이상이면 인사팀에 재계산을 요청하세요.
        계산 근거를 서면으로 남겨달라고 하면 더 꼼꼼하게 처리해줘요.
      </p>

      <SectionBadge>퇴직금 예상 계산기</SectionBadge>
      <Calculator
        sliders={CALC_SLIDERS}
        results={CALC_RESULTS}
        note="※ 월 평균급여 기준 간편 계산이에요. 상여금·연차수당이 포함되면 실제 금액이 더 높아요."
      />

      <CategoryButton label="퇴직금 정보" count={퇴직금_SIDEBAR.length} href="/category/고용" />
      <RelatedArticles items={RELATED} />
      <ArticleAd position="mid" />

      <Divider />

      {/* H2-3: 서류/증빙 */}
      <H2>정산에 필요한 서류 목록</H2>
      <p style={body}>
        퇴직금 정산에는 회사에서 받아야 하는 서류와 내가 챙겨야 하는 서류가 나뉘어요.
        급여명세서 3개월치는 계산 검증의 핵심이에요.
        퇴직금이 300만원을 넘으면 IRP 계좌번호를 인사팀에 미리 알려줘야 14일 기한 안에 이체가 가능해요.
      </p>

      <SectionBadge>준비 서류 목록</SectionBadge>
      <DocTable docs={DOCS} />

      <Divider />

      {/* H2-4: 절차/방법 */}
      <H2>퇴직금 정산 4단계 절차</H2>
      <p style={body}>
        정산 요청부터 수령까지 보통 2주면 충분해요.
        핵심은 정산서 수령 후 상여금 환산 포함 여부를 직접 계산해보는 거예요.
        이것만 놓치지 않으면 수십만~수백만원 차이를 막을 수 있어요.
      </p>

      <Steps steps={STEPS} />

      <Divider />

      {/* H2-5: 준비/주의사항 */}
      <H2>정산 전 체크리스트</H2>
      <p style={body}>
        정산 과정에서 가장 흔한 실수가 상여금 환산 누락이에요.
        항목을 하나씩 체크하면서 진행하면 오류를 잡기 쉬워요.
      </p>

      <SectionBadge>체크리스트</SectionBadge>
      <Checklist items={CHECKLIST} />

      <GreenBox title="상여금 환산이 빠지면 수백만원 차이가 나요">
        연간 상여금 ÷ 12 = 월 환산액, 이 금액이 3개월 임금 합산에 포함됐는지 꼭 짚어봐요.<br />
        포함 안 됐다면 인사팀에 재계산을 요청할 수 있어요. 거부하면 고용노동부(1350)에 진정을 낼 수 있고요.
      </GreenBox>

      <Divider />

      {/* H2-6: FAQ */}
      <H2>자주 묻는 것들</H2>
      <p style={{ ...body, marginBottom: 14 }}>
        퇴직금 정산에서 실제로 많이 나오는 질문만 골랐어요.
      </p>
      <FAQ items={FAQS} />

      <Divider />

      <References groups={REFERENCES} />
      <Disclaimer text="이 글은 2026년 3월 기준 근로자퇴직급여보장법·근로기준법을 바탕으로 작성됐어요. 제도 변경이 있을 수 있으니 최신 기준은 고용노동부(1350)에 직접 문의하세요." />
    </ArticleLayout>
  );
}
